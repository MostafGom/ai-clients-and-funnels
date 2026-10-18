import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface VslSlide { text: string; seconds: number }
export interface VslChapter { title: string; at: number; art?: string; reveal: boolean; slides: VslSlide[]; words: number }
export interface VslScript { chapters: VslChapter[]; totalSeconds: number; words: number; revealAt: number | null }

/** Reading pace, not speaking pace: 2.2 s base + 0.12 s per word, clamped to 3–5 s per slide. */
const slideSeconds = (words: number) => Math.min(5, Math.max(3, Math.round((2.2 + words * 0.12) * 10) / 10));

/**
 * Parses clients/<slug>/funnels/<type>/VSL-SCRIPT.md:
 *   ## [m:ss] Chapter title
 *   > art: moon        > reveal
 *   One paragraph per slide.
 * Slide duration = slideSeconds(words) (3–5 s). Chapters keep their written timestamps as recording targets.
 */
export function loadVslScript(relPath: string): VslScript {
  const file = resolve(process.cwd(), '..', relPath);
  const md = readFileSync(file, 'utf8');
  const chapters: VslChapter[] = [];
  let cur: VslChapter | null = null;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    const h = line.match(/^##\s*\[(\d+):(\d\d)\]\s*(.+)$/);
    if (h) { cur = { title: h[3].trim(), at: Number(h[1]) * 60 + Number(h[2]), reveal: false, slides: [], words: 0 }; chapters.push(cur); continue; }
    if (!cur || !line || line.startsWith('#')) continue;
    if (line.startsWith('>')) {
      const d = line.replace(/^>\s*/, '');
      if (/^reveal/i.test(d)) cur.reveal = true;
      const a = d.match(/^art:\s*(\S+)/i); if (a) cur.art = a[1];
      continue;
    }
    const words = line.split(/\s+/).length;
    cur.slides.push({ text: line, seconds: slideSeconds(words) });
    cur.words += words;
  }
  const totalSeconds = chapters.reduce((t, c) => t + c.slides.reduce((x, s) => x + s.seconds, 0), 0);
  const words = chapters.reduce((t, c) => t + c.words, 0);
  const reveal = chapters.find((c) => c.reveal);
  let revealAt: number | null = null;
  if (reveal) { revealAt = 0; for (const c of chapters) { if (c === reveal) break; revealAt += c.slides.reduce((x, s) => x + s.seconds, 0); } }
  return { chapters, totalSeconds, words, revealAt };
}

export const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
