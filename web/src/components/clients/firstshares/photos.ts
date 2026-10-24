/** First Shares photo registry. Files in public/firstshares/photos/ (credits in CREDITS.md there). Pexels stand-ins: swap in real photos under the same names. */
export const PHOTOS = {
  kitchenLaptop: '/firstshares/photos/kitchen-laptop.jpg',   // woman ~30s at a kitchen counter on a laptop, morning; subject right, room left (landscape)
  coupleLaptop: '/firstshares/photos/couple-laptop.jpg',     // couple on a sofa smiling at a laptop, daylight (landscape)
  couplePlanning: '/firstshares/photos/couple-planning.jpg', // couple at the table with laptop and paperwork, focused (landscape)
  phoneSofa: '/firstshares/photos/phone-sofa.jpg',           // woman on a couch looking at her phone in a dim room, unsure (landscape)
  notebookHands: '/firstshares/photos/notebook-hands.jpg',   // writing numbers in a notebook next to a laptop (landscape)
  coach: '/firstshares/photos/coach.jpg',                    // founder stand-in: Richard Hale, blue suit, library office (portrait)
  coachOffice: '/firstshares/photos/coach-office.jpg',       // founder stand-in: same, arms crossed by the bookshelf (landscape)
  saturday: '/firstshares/photos/saturday.jpg',              // woman in yellow with coffee and laptop, bright kitchen: the "done" feeling (landscape)
} as const;
const PEOPLE: Record<string, string> = {
  'denise r.': 'denise.jpg', 'marcus t.': 'marcus.jpg', 'karen l.': 'karen.jpg', 'david p.': 'david.jpg', 'mei c.': 'mei.jpg', 'andre m.': 'andre.jpg',
};
export function personPhoto(who: string): string | undefined {
  const key = who.split(',')[0].trim().toLowerCase();
  return PEOPLE[key] ? `/firstshares/photos/${PEOPLE[key]}` : undefined;
}
