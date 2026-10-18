/** Forge offer + proof data shared by every funnel. Copy source: clients/forge/funnels/<type>/COPY.md (numbers tagged [CLIENT] there). */
export const CTA = 'Start Forge 12 · $197';
export const GUARANTEE_SHORT = 'Week-Four Guarantee · instant access · three equipment tracks';

export const STACK = [
  { name: 'Forge 12: the 12-week program, three equipment tracks (gym, home rack, dumbbells or hotel)', why: 'The outcome. Three sessions a week, programmed for twelve weeks', value: '$147' },
  { name: 'The six lifts, filmed', why: 'Form cues for stiff hips and desk shoulders', value: '$47' },
  { name: 'The progression rule and the logbook', why: 'Removes every decision except showing up', value: '$27' },
  { name: 'The 8-minute warm-up and the week-7 deload', why: 'Fewer setbacks, so the twelve weeks finish', value: '$27' },
  { name: 'Weekly check-in for 12 weeks + private Q&A thread with Daniel', why: 'A coach who asks for your log', value: '$120' },
  { name: 'The “train around” table: backs, shoulders, knees', why: 'For the old injury', value: '$37', bonus: true },
  { name: 'The Hotel Gym Card', why: 'The same session on a different page', value: '$19', bonus: true },
  { name: 'The Plate Rule', why: 'Eating for strength without a diet, on one page', value: '$27', bonus: true },
];

/** Three client ledgers, week 1 → week 12. */
export const CLIENTS = [
  { who: 'Mark T.', meta: '47 · CFO · an old back', rows: [['Squat', '60 kg', '110 kg'], ['Deadlift', '70 kg', '130 kg'], ['Bench', '50 kg', '80 kg'], ['Waist', '98 cm', '92 cm']], q: 'I expected to be managed around my back. Instead it stopped hurting in week five.' },
  { who: 'James O.', meta: '41 · founder · hotel gyms three weeks a month', rows: [['Deadlift', '80 kg', '140 kg'], ['Press', '35 kg', '55 kg'], ['Squat', '70 kg', '115 kg'], ['Sessions', '—', '34 of 36']], q: 'The Hotel Gym Card is the reason I didn’t quit. Same session, different room.' },
  { who: 'Ravi S.', meta: '52 · surgeon · first time under a bar', rows: [['Pull-ups', '0', '6'], ['Squat', '40 kg', '90 kg'], ['Bench', '35 kg', '62.5 kg'], ['Resting HR', '72', '61']], q: 'Three sessions. That was the whole negotiation. I kept all of them.' },
].map((c) => ({ ...c, rows: c.rows.map(([name, before, after]) => ({ name, before, after })) }));

/** Twelve-week results for the ticker. */
export const RESULTS_12 = [
  { who: 'Mark, 47', lift: 'Deadlift', from: '70', to: '130 kg' },
  { who: 'James, 41', lift: 'Deadlift', from: '80', to: '140 kg' },
  { who: 'Ravi, 52', lift: 'Pull-ups', from: '0', to: '6' },
  { who: 'Mark, 47', lift: 'Squat', from: '60', to: '110 kg' },
  { who: 'James, 41', lift: 'Press', from: '35', to: '55 kg' },
  { who: 'Ravi, 52', lift: 'Squat', from: '40', to: '90 kg' },
];

export const MARK = [{ name: 'Squat', before: 60, after: 110 }, { name: 'Deadlift', before: 70, after: 130 }, { name: 'Bench', before: 50, after: 80 }, { name: 'Row', before: 45, after: 70 }, { name: 'Press', before: 30, after: 50 }, { name: 'Pull-ups', before: 0, after: 5, unit: 'reps' }];

export const PHASES = [
  { title: 'Foundation', weeks: [1, 4] as [number, number], body: 'Learn the six lifts with the filmed cues, find your starting weights, run the rule. Most men add 10 to 20 kg to their squat here.' },
  { title: 'Build', weeks: [5, 8] as [number, number], body: 'Loads climb. Week 7 is a programmed deload so the body consolidates instead of breaking. Where other programs lose people, this one lightens.' },
  { title: 'Consolidate', weeks: [9, 12] as [number, number], body: 'Heavier singles once a week, the assistance work that protects joints, and a week-12 test so you have numbers, not feelings.' },
];

export const MECHANISM = [
  { n: '3', unit: 'sessions', line: 'Full-body, a week. 48 hours between heavy days, so the next one is better than the last.' },
  { n: '45', unit: 'min', line: 'Warm-up, two main lifts, one assistance lift. Done before the 7 a.m. call.' },
  { n: '6', unit: 'lifts', line: 'Squat, bench, row, deadlift, press, pull-up. Nothing to learn twice.' },
  { n: '12', unit: 'weeks', line: 'Three phases, a deload in week 7, a test in week 12.' },
];
