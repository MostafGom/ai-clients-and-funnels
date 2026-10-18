#!/usr/bin/env node
// Pexels photo sourcing. Needs PEXELS_API_KEY (env or web/.dev.vars; free key at pexels.com/api).
//   node scripts/photos.mjs search "<query>" [--orientation landscape|portrait|square] [--n 24] [--out <dir>]
//     → <dir>/candidates.json + <dir>/contact.html (thumbnail grid with ids; screenshot it to choose)
//   node scripts/photos.mjs get <slug> <name> <pexelsId> "<used as>" [--w 2000]
//     → public/<slug>/photos/<name>.jpg + upserts the row in public/<slug>/photos/CREDITS.md
//   node scripts/photos.mjs fetch <slug> <name> <pexelsId> "<used as>" "<photographer>" [--w 2000]
//     → same, without an API key: downloads from the public Pexels image CDN. Find ids by searching
//       pexels.com (web search / page fetch) and credit the photographer shown on the photo page.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

const API = 'https://api.pexels.com/v1';
const [cmd, ...rest] = process.argv.slice(2);
const flags = {}; const args = [];
for (let i = 0; i < rest.length; i++) rest[i].startsWith('--') ? (flags[rest[i].slice(2)] = rest[++i]) : args.push(rest[i]);

function key() {
  if (process.env.PEXELS_API_KEY) return process.env.PEXELS_API_KEY;
  try {
    const m = readFileSync('.dev.vars', 'utf8').match(/^PEXELS_API_KEY=\s*"?([^"\n]+)"?/m);
    if (m) return m[1].trim();
  } catch {}
  console.error('PEXELS_API_KEY missing: add it to web/.dev.vars (free key at https://www.pexels.com/api/)');
  process.exit(1);
}
async function save(slug, name, id, usedAs, by, src) {
  const img = await fetch(src, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!img.ok || !img.headers.get('content-type')?.startsWith('image/')) throw new Error(`download ${id}: ${img.status}`);
  const dir = `public/${slug}/photos`; mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/${name}.jpg`, Buffer.from(await img.arrayBuffer()));
  const credits = `${dir}/CREDITS.md`;
  const row = `| ${name}.jpg | ${usedAs} | https://www.pexels.com/photo/${id}/ (${by}) |`;
  let md = existsSync(credits) ? readFileSync(credits, 'utf8') : `# Photo credits\n\n| File | Used as | Pexels photo |\n|---|---|---|\n`;
  const re = new RegExp(`^\\| ${name}\\.jpg \\|.*$`, 'm');
  if (re.test(md)) md = md.replace(re, row);
  else { const lines = md.split('\n'); const last = lines.findLastIndex((l) => l.startsWith('|')); lines.splice(last + 1, 0, row); md = lines.join('\n'); }
  writeFileSync(credits, md);
  console.log(`${dir}/${name}.jpg  ←  https://www.pexels.com/photo/${id}/ (${by})`);
}
async function api(path) {
  const r = await fetch(API + path, { headers: { Authorization: key() } });
  if (!r.ok) throw new Error(`Pexels ${r.status}: ${await r.text()}`);
  return r.json();
}

if (cmd === 'search') {
  const [query] = args; const out = flags.out ?? 'test-results/photos';
  const q = new URLSearchParams({ query, per_page: flags.n ?? '24', ...(flags.orientation && { orientation: flags.orientation }) });
  const { photos } = await api(`/search?${q}`);
  mkdirSync(out, { recursive: true });
  const rows = photos.map((p) => ({ id: p.id, w: p.width, h: p.height, by: p.photographer, alt: p.alt, url: p.url, thumb: p.src.medium }));
  writeFileSync(`${out}/candidates.json`, JSON.stringify(rows, null, 2));
  writeFileSync(`${out}/contact.html`, `<!doctype html><meta charset="utf-8"><title>${query}</title>
<style>body{margin:0;padding:12px;font:12px system-ui;background:#111;color:#eee;display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
figure{margin:0}img{width:100%;height:180px;object-fit:cover;display:block}figcaption{padding:4px 0}</style>
${rows.map((r) => `<figure><img src="${r.thumb}"><figcaption><b>${r.id}</b> ${r.w}×${r.h}<br>${(r.alt || '').slice(0, 70)}</figcaption></figure>`).join('\n')}`);
  for (const r of rows) console.log(`${r.id}\t${r.w}x${r.h}\t${r.by}\t${r.alt}`);
  console.log(`\n${out}/contact.html`);
} else if (cmd === 'get') {
  const [slug, name, id, usedAs = name] = args;
  const p = await api(`/photos/${id}`);
  await save(slug, name, id, usedAs, p.photographer, `${p.src.original}?auto=compress&cs=tinysrgb&w=${flags.w ?? 2000}`);
} else if (cmd === 'fetch') {
  const [slug, name, id, usedAs = name, by = 'Pexels'] = args;
  await save(slug, name, id, usedAs, by, `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${flags.w ?? 2000}`);
} else {
  console.log(readFileSync(new URL(import.meta.url)).toString().split('\n').slice(1, 7).join('\n'));
}
