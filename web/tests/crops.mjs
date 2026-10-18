// node tests/crops.mjs <path> <width> <h1,h2,...>  → viewport-height crops of a page for close review
import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const [path, w = '1440', cuts = '0', base = 'http://localhost:4321'] = process.argv.slice(2);
const width = Number(w), tops = cuts.split(',').map(Number);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width, height: 900 } });
await p.goto(base + path, { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(800);
await p.evaluate(() => document.querySelector('astro-dev-toolbar')?.remove());
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 220)); } window.scrollTo(0, 0); });
await p.waitForTimeout(1800);
const dir = `tests/__review__/crops`; mkdirSync(dir, { recursive: true });
const h = await p.evaluate(() => document.body.scrollHeight);
for (const t of tops) { const file = `${dir}/${path.replace(/\W+/g, '_')}_${width}_${t}.png`; await p.screenshot({ path: file, fullPage: true, clip: { x: 0, y: t, width, height: Math.min(1100, h - t) } }); console.log(file); }
await b.close();
