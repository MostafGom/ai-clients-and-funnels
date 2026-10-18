#!/usr/bin/env node
// Funnel review harness: node tests/review.mjs <client> <funnel-type> [baseURL]
// For every page of the funnel, at 390x844 and 1440x900: console errors, h1 count, horizontal
// overflow, unlabeled inputs, focus visibility for the first 8 tabbable elements, autoplaying
// iframes, images without dimensions, font preconnect, and a full-page screenshot.
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const [slug, type, base = 'http://localhost:4321'] = process.argv.slice(2);
if (!slug || !type) { console.error('usage: node tests/review.mjs <client> <funnel-type> [baseURL]'); process.exit(2); }

const PAGES = {
  ebook: ['', 'thanks'], calendar: ['', 'book', 'confirmed'], 'vsl-call': ['', 'apply', 'book', 'confirmed'],
  'vsl-checkout': ['', 'checkout', 'upsell', 'downsell', 'thanks'], checkout: ['', 'checkout', 'upsell', 'downsell', 'thanks'],
};
const pages = PAGES[type];
if (!pages) { console.error(`unknown funnel type ${type}`); process.exit(2); }
const viewports = { mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const outDir = `tests/__review__/${slug}/${type}`;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const findings = [];
for (const page of pages) {
  const path = `/${slug}/${type}${page ? '/' + page : ''}`;
  for (const [vp, size] of Object.entries(viewports)) {
    const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const console_ = [];
    p.on('console', (m) => { if (['error', 'warning'].includes(m.type())) console_.push(`${m.type()}: ${m.text()}`); });
    p.on('pageerror', (e) => console_.push(`pageerror: ${e.message}`));
    const res = await p.goto(base + path, { waitUntil: 'domcontentloaded' });
    await p.waitForTimeout(600);
    const r = await p.evaluate(() => {
      const q = (s) => [...document.querySelectorAll(s)];
      const inputs = q('main input:not([type=hidden]):not([type=checkbox]), main select, main textarea').filter((i) => i.offsetParent !== null || i.type === 'text');
      const unlabeled = inputs.filter((i) => !(i.labels && i.labels.length) && !i.getAttribute('aria-label') && !i.getAttribute('aria-labelledby') && i.name !== 'website').map((i) => i.name || i.id || i.tagName);
      return {
        title: document.title,
        h1: q('main h1:not([data-calendar] *)').length,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        unlabeled,
        autoplayIframes: q('iframe[src*="autoplay=1"], iframe[src*="autoPlay=true"]').length,
        imgsNoSize: q('img').filter((i) => !i.getAttribute('width') && !i.getAttribute('height') && !i.className.includes('absolute')).length,
        preconnect: !!document.querySelector('link[rel=preconnect][href*="fonts.gstatic"]') || !document.querySelector('link[href*="fonts.googleapis"]'),
        ctas: q('main a, main button').filter((el) => /(^|\s)bg-(primary|accent)(\s|$)/.test(el.className) && el.offsetParent !== null).map((el) => el.textContent.trim().replace(/\s+/g, ' ')),
        headline: document.querySelector('main h1')?.textContent.trim().replace(/\s+/g, ' '),
        meta: document.querySelector('meta[name=description]')?.content?.length ?? 0,
        noindex: !!document.querySelector('meta[name=robots][content*=noindex]'),
        rawColors: q('main [style]').filter((el) => /#[0-9a-f]{3,8}|rgb\(/i.test(el.getAttribute('style'))).length,
      };
    });
    // Focus visibility: tab through the first 8 focusable elements and check outline/box-shadow changes.
    const focusIssues = [];
    for (let i = 0; i < 8; i++) {
      await p.keyboard.press('Tab');
      const f = await p.evaluate(() => {
        const el = document.activeElement; if (!el || el === document.body || el.tagName.toLowerCase() === 'astro-dev-toolbar') return null;
        const cs = getComputedStyle(el);
        const visible = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none';
        return { tag: el.tagName.toLowerCase(), text: (el.textContent || el.getAttribute('aria-label') || el.name || '').trim().slice(0, 30), visible };
      });
      if (f && !f.visible) focusIssues.push(`${f.tag} "${f.text}"`);
    }
    const shot = `${outDir}/${page || 'index'}.${vp}.png`;
    await p.screenshot({ path: shot, fullPage: true });
    findings.push({ path, vp, status: res?.status(), ...r, console: console_, focusIssues, shot });
    await ctx.close();
  }
}
await browser.close();

for (const f of findings) {
  const issues = [];
  if (f.status !== 200) issues.push(`HTTP ${f.status}`);
  if (f.h1 !== 1) issues.push(`${f.h1} h1`);
  if (f.overflow) issues.push('horizontal overflow');
  if (f.unlabeled.length) issues.push(`unlabeled inputs: ${f.unlabeled.join(', ')}`);
  if (f.autoplayIframes) issues.push('autoplaying iframe');
  if (f.imgsNoSize) issues.push(`${f.imgsNoSize} img without dimensions`);
  if (!f.preconnect) issues.push('fonts not preconnected');
  if (f.rawColors) issues.push(`${f.rawColors} inline raw colors`);
  if (f.console.length) issues.push(`console: ${f.console.join(' | ').slice(0, 200)}`);
  if (f.focusIssues.length) issues.push(`no visible focus: ${f.focusIssues.join(', ')}`);
  if (f.ctas.length > 3) issues.push(`${f.ctas.length} primary/accent CTAs`);
  if (!f.noindex && f.meta < 50) issues.push(`meta description ${f.meta} chars`);
  console.log(`\n${f.path} [${f.vp}] ${issues.length ? '✗' : '✓'}`);
  console.log(`  h1: ${f.headline}`);
  console.log(`  CTAs: ${f.ctas.join(' | ') || '(none)'}`);
  for (const i of issues) console.log(`  - ${i}`);
}
console.log(`\nScreenshots in ${outDir}/`);
