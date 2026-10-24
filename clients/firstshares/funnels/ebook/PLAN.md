# Funnel plan — firstshares / ebook (free guide opt-in → thanks → nurture → course)

## Traffic & stage
- **Source: cold.** Meta and YouTube pre-roll aimed at 30–45 salaried US professionals, Reddit (r/personalfinance) sponsored posts, podcast mentions, and shares of the compounding chart. They open it on a phone in the evening, once the kids are down.
- **Awareness: problem-aware, solution-confused.** They know the savings account is losing ground and that they "should be investing." What they don't have is an order to do things in. The page answers the question they're actually asking, "where does my first $1,000 go, and in what order?", before it asks for an email.

## Big idea
**"It's not which fund. It's the order."**
Late starters stall because they try to pick the "best" investment before they've set up the accounts. *The First $1,000 Plan* gives them the order: match, Roth, brokerage. That's three accounts, three fund types and one automatic transfer, so the first $1,000 goes in this month and the rest follows on its own.

## Named mechanism
**The First Shares Setup**: 3 accounts (401(k) to the match → Roth IRA → brokerage), 3 fund types (US stock index · international stock index · bond index), and 1 rule (*automate before you optimise*).

## The lead magnet: *The First $1,000 Plan* (free, 8 pages, PDF)
Contents:
1. The cost of waiting, illustrated.
2. The order: where the first $1,000 goes, then the next.
3. The 5 accounts compared on one page: 401(k), Roth IRA, traditional IRA, HSA, brokerage.
4. The 3 fund types and the four numbers to check on any fund.
5. The one rule, and how to set up the automatic transfer.
6. The Saturday checklist.
7. What to do in a bad year.

It's written in GUIDE.md, rendered at `/firstshares/guide/` and printed to `public/firstshares/assets/first-1000-plan.pdf`.
Why it converts: the guide gets the first account open. The course is the full six weeks: the walkthroughs, the spreadsheet, the rebalancing and the bad-year plan.

## Objection map → where it's answered
| Objection | Answered in | Proof used |
|---|---|---|
| "I'm too late." | Hero kicker; CompoundCurve band ("the best time was 10 years ago, the second best is this month") | Illustrative maths |
| "What if I lose it?" | Number wall (rule card); FAQ 2; guide p. 7 (the bad-year plan) | Plain maths, honest risk line |
| "It's all free on YouTube." | Hero sub ("one order, not 30 hours"); FAQ 1 | Mei's ledger (froze for a year on YouTube) |
| "No time." | Number wall ("40 minutes for the first account") | Denise's ledger |
| "Is this hype / what's the catch?" | Richard block (the no-pitch promise); consent line; FAQ 3 | Founder story; "we never sell funds" |
| "Spam." | Consent line: one PDF, five short emails, one-click unsubscribe | — |

## Proof plan
| Proof | Status | Shown as |
|---|---|---|
| Richard’s story (19 years on Wall Street, what the industry sells vs what people need) | Persona; client must confirm | Coach story |
| Reader actions (Denise, Marcus, Mei) | Demo; client must supply real ones | ProcessLedger (paper) |
| Reader count, e.g. "11,400 downloads" | `[CLIENT]` | Hero proof strip |
| Compounding maths | Computed, labelled illustrative | CompoundCurve |

## Page map & copy jobs
**`/firstshares/ebook`**
1. **Split hero**: couple-laptop photo; the guide cover overlaps its edge. Copy job: name the reader and the question ("where does it go first?"), promise the order, and capture the email. A proof strip runs under it.
2. **Number wall**: 5 · 3 · 1 · 40. Copy job: what's in the guide, as numbers, and kill the "no time" objection.
3. **GraphPaper + CompoundCurve** (the signature). Copy job: make the cost of waiting felt, honestly, then turn "too late" into "this month."
4. **Inside the guide**: the cover plus the page list. Copy job: make it tangible.
5. **Coach story**: Richard. Copy job: "someone like me started late," and the no-pitch promise.
6. **ProcessLedger** (paper). Copy job: three people who started, in actions.
7. **FAQ**. Copy job: the free-vs-paid, risk, catch and spam objections.
8. **Photo close** (`saturday`) with the second form. Copy job: "this Saturday."

**`/firstshares/ebook/thanks`**: delivery, the direct download, "do this in the next 10 minutes" (three steps), and a soft bridge to the course.
**`/firstshares/guide/`**: the printable guide (noindex).

## Events
`lead_captured` (from OptInForm), `curve_drawn` (signature), `guide_downloaded`, `cta_click` (placement).

## Emails (Resend, scheduled at opt-in)
Delivery (0h) → 1 (+1d: the order) → 2 (+2d: Richard’s two lost years) → 3 (+4d: the one rule, and Denise) → 4 (+6d: a bad year, and where the guide ends) → 5 (+8d: the course + the 30-day guarantee).

## Open client inputs
Richard’s real photo and story sign-off · real reader stories (actions, with consent) · the download count · compliance review of the guide and disclaimer by the client's counsel · the course price confirmed.
