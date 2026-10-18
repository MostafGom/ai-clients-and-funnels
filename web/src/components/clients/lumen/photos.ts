/** Lumen photo registry. Files live in public/lumen/photos/ (credits in CREDITS.md there). Keyed by the person as named in copy. */
export const PHOTOS = {
  maya: '/lumen/photos/maya.jpg',
  night: '/lumen/photos/night.jpg',
  sofa: '/lumen/photos/sofa.jpg',
} as const;

const FAMILIES: Record<string, string> = {
  'jess m.': 'jess.jpg', 'ines r.': 'ines.jpg', 'kwame & lila': 'kwame-lila.jpg', 'hannah l.': 'hannah.jpg',
  'tom & grace': 'tom-grace.jpg', 'sofia b.': 'sofia.jpg', 'priya k.': 'priya.jpg', 'dana f.': 'dana.jpg',
};
/** "Hannah L., 8-month-old" → /lumen/photos/hannah.jpg (matches on the part before the comma). */
export function familyPhoto(who: string): string | undefined {
  const key = who.split(',')[0].trim().toLowerCase();
  return FAMILIES[key] ? `/lumen/photos/${FAMILIES[key]}` : undefined;
}
