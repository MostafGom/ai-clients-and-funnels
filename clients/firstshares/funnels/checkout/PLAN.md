# Funnel plan — firstshares / checkout (sales page → checkout + bump → upsell → downsell → thanks)

## Traffic & stage
- **Sources:**
  - **Warm:** ebook leads from emails 5 and 6, and the course card on the ebook thanks page. They know Richard and the order.
  - **Cold retargeting:** visitors who saw the chart but didn't opt in.
  - **Podcast and YouTube** mentions with a direct link.
- **Awareness:** solution-aware ("I need the accounts set up, in order") and partly product-aware. The page has to turn *"I could do this from the free guide"* into *"I want it done, with someone showing me each screen."* It also has to answer "what if I lose money" honestly.

## Big idea
**"You're not behind. You're starting."** In six weeks the savings that have been sitting still are set up properly (three accounts, three fund types, one automatic transfer) and then left alone. You don't watch markets and you don't pick stocks. Because **the order does the work, not the picks.**

## Named mechanism
**The First Shares Setup**: 3 accounts · 3 fund types · 1 automatic transfer, over 6 weeks:
- Week 1: The money map
- Week 2: Accounts open
- Week 3: The three funds
- Week 4: The transfer
- Week 5: A bad year
- Week 6: Leave it alone

## Offer stack (the main offer, $297)
| Item | Why it matters | Value |
|---|---|---|
| First Shares: the six-week course (22 short lessons, screen-recorded walkthroughs) `[CLIENT]` | The outcome: the setup done, in order | $297 |
| The Money Map worksheet | Emergency fund, debt and "invest" numbers in 20 minutes | $27 |
| Screen-by-screen account walkthroughs (Fidelity, Schwab, Vanguard) `[CLIENT]` | The step where people freeze, done with you | $97 |
| The Bad-Year Plan (written in week 5) | The reason people sell low, removed in advance | $47 |
| The Students' Q&A library (searchable) | Your question has probably been answered | $47 |
| **Bonus:** the 401(k) Menu Decoder | Picking from your employer's fund list | $27 |
| **Bonus:** the Partner Conversation script | Getting on the same page at home | $17 |
| **Total value** | | **$559** |
| **Price today** | | **$297, one payment** |

- **Anchor:** $559 stack value.
- **Comparison:** an hourly fee-only planner at $200–400 per hour `[CLIENT: verify range]`. Note that a course isn't personal advice; this is a cost comparison, not like-for-like.
- **Bump ($47):** the Portfolio Kit: setup spreadsheet, contribution planner, account checklists. Normally $77 `[CLIENT]`.
- **Upsell ($197):** First Shares Live, 3 months of group Q&A calls every two weeks with Richard. Normally $390 `[CLIENT]`.
- **Downsell ($67):** the Q&A Replay Library, every past call indexed by question. Normally $127 `[CLIENT]`.
- **Guarantee:** 30 days. Work through it, and if your first account isn't open and funded, email for a full refund.

## Objection map → section
| Objection | Answered in | Proof |
|---|---|---|
| "It's free on YouTube / I have the free guide." | Myth wall #4; Comparison; FAQ 1 | Marcus (robo dropout), Mei (YouTube freeze) |
| "No time." | Six-week track ("about 90 minutes a week"); FAQ 3 | Denise's three Saturdays |
| "Hype / what's the catch?" | Richard block (the no-pitch promise); Who it's NOT for; disclaimer | Founder story, 0 commissions |
| "What if I lose money?" | Mechanism; CostOfWaiting caveat; Week 5 (A bad year); FAQ 2 | Honest risk lines |
| "Too late / too little money." | Myth wall #1 and #2; chart | Illustrative maths |
| "Is this advice?" | FAQ 4; footer disclaimer | — |

## Proof plan
| Proof | Status | How it's shown |
|---|---|---|
| Student actions (Denise, Marcus, Mei + Karen, David, Andre) | Demo; client supplies real stories with consent | ProcessLedger on field + proof strip |
| Accounts opened by students, e.g. "1,240" | `[CLIENT]` | Hero proof strip |
| Richard’s story | Persona; client confirms | RichardStory |
| Illustrative maths | Computed, labelled | CompoundCurve |

## Page map & copy jobs
**`/firstshares/checkout`** (sales page):
1. **Full-bleed photo hero** (kitchen-laptop): name the reader, the promise, CTA, and a proof strip with a named action.
2. **Scene** (phone-sofa, split): the 9:40 p.m. moment, so they feel seen.
3. **Myth wall**: kill the four beliefs keeping them in cash.
4. **Mechanism**: SetupStack + MarginNotes. The whole portfolio, made small.
5. **GraphPaper**: CompoundCurve, then the cost-of-waiting turn, with the risk caveat.
6. **Timeline track**: six weeks, about 90 minutes a week.
7. **Proof on field**: ProcessLedger, six people's actions.
8. **Richard**: someone like me, and the no-pitch promise.
9. **Who it's for / not for**: honest disqualification.
10. **Offer**: stack table + price + guarantee in one unit.
11. **FAQ**.
12. **Photo close** (saturday).

**`/checkout`**: order summary (mint), what happens in the next 10 minutes, one quote, the guarantee, and CheckoutForm with the bump on sunrise.
**`/upsell`**: First Shares Live.
**`/downsell`**: the Replay Library.
**`/thanks`**: welcome, the first lesson, what arrives when, and add "Saturday setup" to the calendar.

## Events
`checkout_started`, `bump_toggled`, `offer_accepted` / `offer_declined` (OneClickOffer), `curve_drawn`, `cta_click` (placement), `saturday_added_to_calendar`.

## Emails (Stripe webhook)
- **Abandoned checkout:** 0h "Your seat is still open", then +23h "The guarantee, in full".
- **Onboarding:** 0h "Lesson 1 is 12 minutes", +72h "The money map", +144h "Week 2: the 40 minutes".

## Open client inputs
Lesson count and walkthrough brokerages · real student stories with consent · the accounts-opened number · stack values · planner fee range · member-area URL · Stripe prices · counsel review of the guarantee wording and disclaimers.
