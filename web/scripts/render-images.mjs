#!/usr/bin/env node
// Rasterises illustration pages to PNG. Usage: node scripts/render-images.mjs
// OG images: /lumen/og/<funnel> → public/lumen/og/<funnel>.png (1200×630)
// Ebook cover: first page of /lumen/reset/ → public/lumen/assets/bedtime-reset-cover.png
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
execSync('pnpm astro build', { stdio: 'inherit' });
const port = 4334; const srv = spawn('pnpm', ['wrangler', 'dev', '--port', String(port)], { stdio: 'ignore' });
const base = `http://localhost:${port}`;
for (let i = 0; i < 60; i++) { try { if ((await fetch(base + '/lumen/')).ok) break; } catch {} await new Promise((r) => setTimeout(r, 1000)); }
const b = await chromium.launch();
mkdirSync('public/lumen/og', { recursive: true });
for (const f of ['checkout', 'vsl-checkout', 'ebook', 'calendar', 'vsl-call', 'default']) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto(`${base}/lumen/og/${f}/`, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  await p.screenshot({ path: `public/lumen/og/${f}.png`, clip: { x: 0, y: 0, width: 1200, height: 630 } }); await p.close();
  console.log(`public/lumen/og/${f}.png`);
}
const c = await b.newPage({ viewport: { width: 900, height: 1300 }, deviceScaleFactor: 2 });
await c.goto(`${base}/lumen/reset/`, { waitUntil: 'networkidle' }); await c.evaluate(() => document.fonts.ready);
const cover = await c.$('section.page'); await cover.screenshot({ path: 'public/lumen/assets/bedtime-reset-cover.png' }); console.log('public/lumen/assets/bedtime-reset-cover.png');
await b.close(); srv.kill('SIGTERM'); try { execSync('pkill -f workerd'); } catch {}
