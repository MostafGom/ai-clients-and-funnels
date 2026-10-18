/** Forge photo registry. Files in public/forge/photos/ (credits in CREDITS.md there). */
export const PHOTOS = {
  daniel: '/forge/photos/daniel.jpg',
  rack: '/forge/photos/rack.jpg',      // a man training at a home rack, low light
  desk: '/forge/photos/desk.jpg',      // the 3 p.m. slump: man at a desk, tired
  bar: '/forge/photos/bar.jpg',        // chalked hands on a loaded bar
} as const;
const CLIENTS: Record<string, string> = {
  'mark t.': 'mark.jpg', 'james o.': 'james.jpg', 'ravi s.': 'ravi.jpg', 'ben k.': 'ben.jpg', 'luca m.': 'luca.jpg', 'owen p.': 'owen.jpg', 'sam d.': 'sam.jpg', 'tom h.': 'tom.jpg',
};
export function clientPhoto(who: string): string | undefined {
  const key = who.split(',')[0].trim().toLowerCase();
  return CLIENTS[key] ? `/forge/photos/${CLIENTS[key]}` : undefined;
}
