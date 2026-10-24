/** First Shares data shared by every funnel. Copy source: clients/firstshares/funnels/<type>/COPY.md (numbers tagged [CLIENT] there). Education only. */
export const SETUP = {
  accounts: [
    { n: '1', name: '401(k), up to the match', what: 'The free money first. Most people leave part of it on the table.', fund: 'a low-cost target-date or broad index fund from your plan’s menu' },
    { n: '2', name: 'Roth IRA', what: 'Tax-free growth, and you choose what goes in.', fund: 'a total US stock index fund + a total international index fund' },
    { n: '3', name: 'Brokerage', what: 'For what’s left after the first two are full.', fund: 'the same funds, plus a bond index fund as you get closer to needing it' },
  ],
  transfer: 'One automatic transfer on payday. Then you leave it alone.',
};

/** Process proof: actions taken, never balances or returns. All [CLIENT] until verified. */
export const LEDGERS = [
  { who: 'Denise R.', meta: '41 · ICU nurse · $38k in savings', steps: [{ week: 'Week 1', did: 'Raised 401(k) to the full match' }, { week: 'Week 2', did: 'Opened a Roth IRA' }, { week: 'Week 4', did: 'Automated $400 a month' }], q: 'I’d been “about to start” for six years. It took three Saturdays.' },
  { who: 'Marcus T.', meta: '44 · civil engineer · robo-advisor dropout', steps: [{ week: 'Week 1', did: 'Found out what his old account held' }, { week: 'Week 3', did: 'Moved to three funds' }, { week: 'Week 5', did: 'Set $750 a month, payday +1' }], q: 'For the first time I can explain what I own and why.' },
  { who: 'Mei C.', meta: '34 · UX designer · froze at the fund screen', steps: [{ week: 'Week 2', did: 'Opened a Roth IRA' }, { week: 'Week 2', did: 'Bought her first two funds' }, { week: 'Week 6', did: 'Wrote her one-page plan' }], q: 'I stopped checking the app every day. That was the real win.' },
];

/** More student actions for the sales page (six-card proof on field). All [CLIENT]. */
export const LEDGERS_MORE = [
  { who: 'Karen L.', meta: '45 · pharmacist · 401(k) in cash for 9 years', steps: [{ week: 'Week 1', did: 'Found her 401(k) sitting in the cash option' }, { week: 'Week 3', did: 'Moved it to a target-date fund' }, { week: 'Week 4', did: 'Raised her contribution by 2%' }], q: 'Nine years in the cash option. Nobody told me it was a choice.' },
  { who: 'David P.', meta: '36 · project manager · card balance first', steps: [{ week: 'Week 1', did: 'Paid off the card before anything else' }, { week: 'Week 2', did: 'Opened a Roth IRA' }, { week: 'Week 4', did: 'Automated $250 a month' }], q: 'Week 1 told me not to invest yet. That’s when I trusted it.' },
  { who: 'Andre M.', meta: '39 · PE teacher · 403(b) never touched', steps: [{ week: 'Week 2', did: 'Claimed the full district match' }, { week: 'Week 2', did: 'Opened a Roth IRA' }, { week: 'Week 5', did: 'Wrote his bad-year plan' }], q: 'Both accounts run themselves now. I check once a year.' },
];

export const CTA = 'Start the six-week setup · $297';
export const FRICTION = 'One payment · instant access · 30-day guarantee';

/** The six weeks, about 90 minutes each. */
export const WEEKS = [
  { n: 1, title: 'The money map', body: 'How much stays as an emergency fund, what debt goes first, and the number you’ll invest. 20 minutes with the worksheet.' },
  { n: 2, title: 'Accounts open', body: '401(k) set to the match, Roth IRA opened. Screen-by-screen walkthroughs for the big brokerages.' },
  { n: 3, title: 'The three funds', body: 'What each fund type does, the four numbers to check, and how to choose from your 401(k) menu.' },
  { n: 4, title: 'The transfer', body: 'The day after payday, an amount you won’t stop. Set in two places, then forgotten.' },
  { n: 5, title: 'A bad year', body: 'You write your plan before you need it: what you’ll do and what you won’t when it goes red.' },
  { n: 6, title: 'Leave it alone', body: 'One check-in a year, the 1% raise and rebalancing. Your one-page plan, printed.' },
];

/** Offer stack: values are [CLIENT]. */
export const STACK = [
  { name: 'First Shares: the six-week course', why: '22 short lessons, the setup done in order', value: '$297' },
  { name: 'Screen-by-screen account walkthroughs', why: 'Fidelity, Schwab and Vanguard: the step where people freeze', value: '$97' },
  { name: 'The Money Map worksheet', why: 'Emergency fund, debt and “invest” numbers in 20 minutes', value: '$27' },
  { name: 'The Bad-Year Plan', why: 'Written in week 5, before you need it', value: '$47' },
  { name: 'The students’ Q&A library', why: 'Searchable. Your question has probably been answered', value: '$47' },
  { name: 'The 401(k) Menu Decoder', why: 'Choosing from your employer’s fund list', value: '$27', bonus: true },
  { name: 'The Partner Conversation script', why: 'Getting on the same page at home', value: '$17', bonus: true },
];
