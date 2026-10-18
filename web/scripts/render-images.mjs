#!/usr/bin/env node
// Rasterises share images and guide covers to PNG. Usage: node scripts/render-images.mjs
// Add a client here when its /<slug>/og/[funnel] page and/or printable guide exist.
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const FUNNELS = ['checkout', 'vsl-checkout', 'ebook', 'calendar', 'vsl-call', 'default'];
const OG = { lumen: FUNNELS, forge: FUNNELS };
const COVERS = [
  { page: '/lumen/reset/', out: 'public/lumen/assets/bedtime-reset-cover.png' },
  { page: '/forge/guide/', out: 'public/forge/assets/three-session-week-cover.png' },
];

execSync('pnpm astro build', { stdio: 'inherit' });
const port = 4334; const srv = spawn('pnpm', ['wrangler', 'dev', '--port', String(port)], { stdio: 'ignore' });
const base = `http://localhost:${port}`;
for (let i = 0; i < 60; i++) { try { if ((await fetch(base + '/')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 1000)); }
const b = await chromium.launch();
for (const [slug, funnels] of Object.entries(OG)) {
  mkdirSync(`public/${slug}/og`, { recursive: true });
  for (const f of funnels) {
    const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await p.goto(`${base}/${slug}/og/${f}/`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `public/${slug}/og/${f}.png`, clip: { x: 0, y: 0, width: 1200, height: 630 } }); await p.close();
    console.log(`public/${slug}/og/${f}.png`);
  }
}
for (const c of COVERS) {
  const p = await b.newPage({ viewport: { width: 900, height: 1300 }, deviceScaleFactor: 2 });
  await p.goto(base + c.page, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
  const cover = await p.$('section.page'); await cover.screenshot({ path: c.out }); await p.close(); console.log(c.out);
}
await b.close(); srv.kill('SIGTERM'); try { execSync('pkill -f workerd'); } catch {}
