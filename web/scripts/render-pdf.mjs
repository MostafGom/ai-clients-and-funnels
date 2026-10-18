#!/usr/bin/env node
// Renders a prerendered page to PDF. Usage: node scripts/render-pdf.mjs /lumen/reset/ public/lumen/assets/bedtime-reset.pdf
// Builds first, serves dist with wrangler on a spare port, prints with Chromium, then stops the server.
import { spawn, execSync } from 'node:child_process';
import { chromium } from '@playwright/test';
const [path, out] = process.argv.slice(2);
if (!path || !out) { console.error('usage: node scripts/render-pdf.mjs <path> <out.pdf>'); process.exit(2); }
execSync('pnpm astro build', { stdio: 'inherit' });
const port = 4333;
const srv = spawn('pnpm', ['wrangler', 'dev', '--port', String(port)], { stdio: 'ignore' });
const url = `http://localhost:${port}${path}`;
for (let i = 0; i < 60; i++) { try { const r = await fetch(url); if (r.ok) break; } catch {} await new Promise((r) => setTimeout(r, 1000)); }
const b = await chromium.launch(); const p = await b.newPage();
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await b.close(); srv.kill('SIGTERM'); try { execSync('pkill -f workerd'); } catch {}
console.log(`PDF written to ${out}`);
