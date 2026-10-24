# Design plan — First Shares · "Green Line"

## Category
Energy: **the moment a straight-talking Wall Street insider draws the compounding curve on the whiteboard and the room goes "oh."** The setting is a kitchen table on a Saturday morning, not a marble lobby or a trader's desk.
References (moodboard Oct 2026, screenshots at 1440/390):
- **Wise**: loud green, heavy condensed display, a live number widget in the hero. Confident, plain English.
- **Acorns**: money green, an automated "potential" chart, a friendly character.
- **Betterment / Public / Robinhood**: a phone or dashboard mock carrying a big $ figure. Two of the three now use serif display.
- **Monzo**: full-bleed photo of a person, short bold sans headline.
- **IWT (Ramit Sethi)**: long-form direct-response sales pages, personal story, bold claims.

What the category expects, and we keep because it reads as legitimacy: green, big dollar numerals, a growth chart, rounded friendly UI, plain-English subheads, and a clear single CTA.
What everyone does that we break:
1. **The product mock.** Everyone sells an app screen. We sell a person who finally did it: real 30–45-year-olds at a kitchen table, in daylight.
2. **The projected-balance promise** ("Your potential $491,395"). Our chart is labelled *illustrative*, compares *starting at 35 vs 45*, and the line is drawn by hand like on a whiteboard. It's honest maths, and it's on the right side of compliance.
3. **The serif drift.** Public and Robinhood went editorial serif, which is the quiet-luxury trap. We stay grotesk, warm and loud.

## Subject
A six-week, self-paced course that gets a capable, embarrassed 30–45-year-old's savings out of a 0.5% account and into a simple, automated portfolio (three accounts, three funds, one automatic transfer), taught by Richard Hale, a former Wall Street analyst (19 years) who left to teach it plainly. The page has to make "I'm too late and I'll lose it" feel solved, then let them buy without feeling sold to.
Big idea: **You're not behind. You're starting. Three accounts, three funds, one automatic transfer.**

## Colour (named)
| Name | Hex | Role |
|---|---|---|
| Paper | `#FBFAF5` | Page background (dominant): warm off-white like exercise-book paper |
| Ink | `#13241B` | Body text: green-black, never pure black |
| Money green | `#0F6B3F` | The single action per screen, the "now" line on the chart, key numerals |
| Field | `#0B3D26` | Inverse bands (proof, the offer stack, closes); paper type on it |
| Sunrise | `#FFD84D` | Highlighter swipes on key phrases, the order bump, one-time offers. It's the hot moment, used once per screen |
| Mint | `#DDF1E3` | Tints, badges, the "graph paper" band, focus halo |
| Slate | `#6B7A72` | The "later" line on the chart, secondary marks |

## Type
**Bricolage Grotesque** 700/800 for display (opsz axis on), sentence case, line-height 0.95–1.0, tracking −0.02em. It runs 80–120px on desktop heroes and 46–56px at 390px. Dollar figures and counts are set huge in the display face as graphics.
**Inter** 400/500/600 for body at 17–18px, max 64ch. Tables and prices use `font-variant-numeric: tabular-nums`.
Why: the finance row of the pairing table (Inter, Manrope, Space Grotesk) reads cold and fintech. Bricolage keeps the grotesk legitimacy but has the warmth and slight quirk of a teacher's handwriting on the board.
Squint test at 390px: a heavy rounded grotesk with green and yellow highlighter reads "consumer money" (Wise and Monzo territory), not a gym, a spa or a bank.

## Photography (shot list → `/photos firstshares`)
Real people aged 30–45, diverse, at home in daylight, laptop or phone in hand, focused on the screen and not grinning at the camera. Warm, natural light. No suits, no skylines, no piggy banks, no stacks of cash.
| name | role | orient | brief |
|---|---|---|---|
| `kitchen-laptop` | checkout hero | landscape | person ~40 at a kitchen table with a laptop and mug, morning light, subject right third, room for type left |
| `couple-laptop` | ebook hero / problem | landscape | couple 30s–40s on a sofa looking at a laptop together, calm, daylight |
| `phone-sofa` | scene / problem | landscape | woman ~35 on a sofa looking at a phone, slightly unsure, evening lamp |
| `notebook-hands` | mechanism band | landscape | hands writing numbers in a notebook next to a laptop, overhead |
| `coach`, `coach-office` | founder | portrait + landscape | man ~55 in a suit, library office, confident and warm: authority (stand-in for the real founder photo) |
| `saturday` | close | landscape | person relaxed at a table with coffee, laptop closed, the "done" feeling |
| `proof-*` | ledger faces | square | 5–6 portraits of everyday 30–45 professionals (nurse, engineer, teacher…) |

## Art system (`web/src/components/clients/firstshares/`)
- `CompoundCurve` (art/): **the signature moment.** An SVG chart on a graph-paper grid. Two lines show $500/month starting at 35 (money green) vs at 45 (slate), drawn like a marker stroke as the section scrolls in. A counter ticks up to the illustrative difference at 65, and the label "Illustrative: 7% a year, not a forecast" is always visible. Fully drawn and static under reduced motion.
- `Highlight` (art/): an inline span with a sunrise highlighter swipe behind a key phrase (an SVG marker shape, not a flat box). Used at most once per section.
- `SetupStack`: three "account cards" stacked like a tidy hand of cards (401(k) match · Roth IRA · Brokerage), each with the one fund type that goes in it and a check when done. The mechanism visual.
- `MarginNote`: a teacher's aside in the margin (desktop) or inline (mobile). It defines one jargon word ("Expense ratio: what the fund charges you a year. Lower is better.").
- `GraphPaper`: a section wrapper with a faint grid made from the `border` token. It's the "whiteboard" band for mechanism and maths sections.
- `ProcessLedger`: proof as actions, not gains. Each row has a name, age, job, what they did and when ("Opened Roth IRA · week 2", "Automated $400/mo · week 4"), plus a photo.
- `CostOfWaiting`: a big-number band (the same $500/month, started 10 years later, illustrative), with the disclaimer attached.
- Shared data: `data.ts` (CTA text, the setup, the stack, ledgers, FAQ).

## Section maps (pattern per section; neighbours never repeat a pattern)
**ebook** `/`:
1. Split hero: `couple-laptop` photo with headline + form; cover of *The First $1,000 Plan* overlapping the photo edge.
2. Number wall (what's inside: 5 accounts compared · 3 fund types · 1 rule).
3. Graph-paper band: CompoundCurve (signature).
4. Coach story: Richard’s portrait bleeds off the edge, "19 years on Wall Street" as a number.
5. Proof: ProcessLedger, 3 rows.
6. FAQ (free? spam? advice?).
7. Photo close (`saturday`) with the second form.

**ebook** `/thanks`: field band, the guide cover, what to do in the next 10 minutes, a soft bridge to the course.

**checkout (sales page)**:
1. Full-bleed photo hero (`kitchen-laptop`), headline with a Highlight, CTA, proof strip ("1,240 accounts opened by students [CLIENT]").
2. Scene: `phone-sofa` split with the 9:40 p.m. "I opened the app and closed it again" story.
3. Myth wall: "too late", "need $10k first", "need to watch the markets", "it's all on YouTube", each struck through with the truth.
4. Mechanism: SetupStack (3 accounts · 3 funds · 1 transfer), with MarginNotes.
5. Graph-paper band: CompoundCurve, then CostOfWaiting.
6. Six-week timeline track (week 1 accounts → week 6 leave it alone).
7. Proof on field: ProcessLedger with photos.
8. Coach story: Richard, with the no-pitch promise ("we never sell funds or take commissions").
9. Who it's for / not for: honest; "not for traders, not for get-rich-quick".
10. Stack table + price + 30-day guarantee in one unit (paper card on field).
11. FAQ, built from the persona's objections.
12. Photo close.

**checkout `/checkout` · `/upsell` · `/downsell` · `/thanks`**: paper, two columns on desktop, a photo strip in the header, the order summary on a mint card, and the bump on sunrise. Upsell and downsell are one screen each: what it is, who it's for, one CTA, one decline link.

## Funnel conventions (Oct 2026 review: "looks like a website, no urgency, hero not a funnel hero")
- Funnel hero: callout pill, centered headline + sub, the CTA above the fold, then one offer card (coach photo + promise checklist + stats). No side-by-side "website" heroes.
- Opt-in is a squeeze: cover + form card in the first screen, bonus line, proof row.
- Honest urgency: the monthly cohort. Enrollment closes on the last day of the month (11:59 p.m. ET); a countdown bar under the demo banner and day/hour tiles on the offer. It never resets per visitor. The cohort bonus is the live kickoff call + the 401(k) Menu Decoder.
- The CTA repeats after every two sections (CtaBlock: button, friction line, deadline line), plus the sticky bar and a P.S. in the close.

## Motion
CompoundCurve draws on scroll; that's the signature, one per page. Highlighter swipes are static (no second motion moment). Buttons lift 1px on hover and press on click. Everything respects `prefers-reduced-motion`.

## What we removed
Phone and dashboard mockups · projected "your potential" balances · candlestick and ticker art · serif display · bone/brass private-bank luxury · suits, skylines, piggy banks, gold coins · glowing up-arrows · dark trader UI · identical three-icon feature rows · evergreen (per-visitor) countdown timers; the only timer is the real monthly cohort deadline.

## Compliance in design
- A footer disclaimer on every page: education, not investment advice; investing involves risk, including loss of principal; past performance doesn't guarantee future results.
- Every chart carries an always-visible "Illustrative" label with its assumption.
- Proof shows actions, never balances or returns.
