/** Forge photo registry. Files in public/forge/photos/ (credits in CREDITS.md there). */
export const PHOTOS = {
  daniel: '/forge/photos/daniel.jpg',
  rack: '/forge/photos/rack.jpg',      // a man training at a home rack, low light
  desk: '/forge/photos/desk.jpg',      // the 3 p.m. slump: man at a desk, tired
  bar: '/forge/photos/bar.jpg',        // bench press under the bar, dark gym
  deadlift: '/forge/photos/deadlift.jpg',            // man ~40 setting up a deadlift, warm low light (landscape, subject centre-right)
  deadliftLockout: '/forge/photos/deadlift-lockout.jpg', // deadlift lockout facing camera, dark gym
  deadliftGrip: '/forge/photos/deadlift-grip.jpg',   // hands and feet at the bar, dark
  press: '/forge/photos/press.jpg',                  // mature lifter, barbell in the front rack
  chalkCoach: '/forge/photos/chalk-coach.jpg',       // mature lifter clapping chalk, yellow gym
  chalkHands: '/forge/photos/chalk-hands.jpg',       // chalking hands at the rack (portrait)
  barGrip: '/forge/photos/bar-grip.jpg',             // close-up of hands gripping the bar
  plates: '/forge/photos/plates.jpg',                // loaded bar on the floor, dark
  plateKg: '/forge/photos/plate-kg.jpg',             // 15 kg plates close-up (portrait)
  garageRack: '/forge/photos/garage-rack.jpg',       // home power rack, dark
} as const;
const CLIENTS: Record<string, string> = {
  'mark t.': 'mark.jpg', 'james o.': 'james.jpg', 'ravi s.': 'ravi.jpg', 'ben k.': 'ben.jpg', 'luca m.': 'luca.jpg', 'owen p.': 'owen.jpg', 'sam d.': 'sam.jpg', 'tom h.': 'tom.jpg',
};
export function clientPhoto(who: string): string | undefined {
  const key = who.split(',')[0].trim().toLowerCase();
  return CLIENTS[key] ? `/forge/photos/${CLIENTS[key]}` : undefined;
}
