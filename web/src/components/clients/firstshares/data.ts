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
