#!/usr/bin/env node
// WCAG contrast check for a client token file. Usage: node design/contrast.mjs web/src/styles/clients/demo.css
// Understands oklch(), rgb(), and hex. Falls back to base.css defaults for tokens a client doesn't override.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const file = process.argv[2];
if (!file) { console.error('usage: node design/contrast.mjs <client.css>'); process.exit(2); }
const base = readFileSync(resolve(here, '../web/src/styles/base.css'), 'utf8');
const client = readFileSync(resolve(file), 'utf8');

const vars = (css) => Object.fromEntries([...css.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]).filter(([, v]) => v !== 'initial'));
const tokens = { ...vars(base), ...vars(client) };

function parse(v) {
  v = v.trim();
  let m;
  if ((m = v.match(/^#([0-9a-f]{3,8})$/i))) { let h = m[1]; if (h.length < 6) h = [...h].map((c) => c + c).join(''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); }
  if ((m = v.match(/^rgba?\(([^)]+)\)/))) return m[1].split(/[\s,\/]+/).slice(0, 3).map((n) => (n.endsWith('%') ? parseFloat(n) / 100 : parseFloat(n) / 255));
  if ((m = v.match(/^oklch\(([^)]+)\)/))) { const [L, C, H] = m[1].split(/[\s\/]+/).slice(0, 3).map((n, i) => (i === 0 && n.endsWith('%') ? parseFloat(n) / 100 : parseFloat(n))); return oklchToSrgb(L, C, H || 0); }
  throw new Error(`cannot parse color "${v}"`);
}
function oklchToSrgb(L, C, Hdeg) {
  const h = (Hdeg * Math.PI) / 180, a = C * Math.cos(h), b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, bb = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
  const gam = (x) => { x = Math.min(1, Math.max(0, x)); return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055; };
  return [gam(r), gam(g), gam(bb)];
}
const lum = ([r, g, b]) => { const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const ratio = (a, b) => { const [x, y] = [lum(parse(a)), lum(parse(b))]; return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

const pairs = [
  ['fg', 'bg', 4.5], ['fg', 'surface', 4.5], ['fg', 'surface-2', 4.5],
  ['fg-muted', 'bg', 4.5], ['fg-muted', 'surface', 4.5], ['fg-subtle', 'surface', 3],
  ['inverse-fg', 'inverse', 4.5], ['primary-fg', 'primary', 4.5], ['primary-fg', 'primary-hover', 4.5],
  ['primary', 'bg', 4.5], ['primary', 'primary-soft', 4.5], ['accent-fg', 'accent', 4.5],
  ['success', 'surface', 3], ['danger', 'surface', 4.5], ['border-strong', 'surface', 3], ['focus', 'bg', 3],
];
let fail = 0;
console.log(`Contrast report for ${file}\n`);
for (const [fg, bg, min] of pairs) {
  const a = tokens[`--color-${fg}`], b = tokens[`--color-${bg}`];
  if (!a || !b) { console.log(`  ?    ${fg} on ${bg}: token missing`); fail++; continue; }
  const r = ratio(a, b), ok = r >= min;
  if (!ok) fail++;
  console.log(`  ${ok ? 'PASS' : 'FAIL'} ${fg.padEnd(14)} on ${bg.padEnd(13)} ${r.toFixed(2).padStart(6)}  (min ${min})`);
}
console.log(`\n${fail === 0 ? 'All pairs pass.' : `${fail} pair(s) need attention.`}`);
process.exit(fail ? 1 : 0);
