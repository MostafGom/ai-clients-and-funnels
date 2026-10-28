# Brand brief — firstshares (First Shares)

## Pipeline

project-studio pipeline (`/brand:start firstshares`). States: todo · doing · done · approved · waived. Recorded
2026-10-28 from this client's files and git history; demo client, so the user acts as owner.

| Step | State | Date | By | Note |
| --- | --- | --- | --- | --- |
| brief | done | 2026-10-24 | user | this file + persona.md + offer.md |
| moodboard | done | 2026-10-24 | claude | Category: references screenshotted at 1440/390 |
| plan | done | 2026-10-24 | claude | DESIGN-PLAN.md; no recorded owner approval |
| concept | todo | | | pre-studio: pages were built without an A/B concept round |
| system | done | 2026-10-24 | claude | `web/src/styles/clients/firstshares.css`, `/firstshares/design-system`, contrast passes |
| imagery | done | 2026-10-24 | claude | Pexels stand-ins in `web/public/firstshares/photos/` (CREDITS.md) |
| pages | done | 2026-10-24 | claude | funnels: ebook, checkout |
| review | todo | | | run `/funnel-review firstshares <funnel>` (uses `/brand:review` + the CRO rubric) |

**Who**: First Shares, founded by Richard Hale (he/him), 54, a former Wall Street equity analyst and fund-product manager (19 years) who left in 2016 to teach plain investing to people the industry overlooks. Method: **The First Shares Setup**: three accounts, three funds, one automatic transfer, set up over six weeks and then left alone. Built for US salaried professionals aged 30–45 with cash sitting in savings. Education only: First Shares never sells funds, never takes commissions and never manages money.

**Category energy**: the moment a straight-talking insider draws the compounding curve on the whiteboard and the whole room goes "oh." The setting is a kitchen table on a Saturday morning, with a laptop, a mug and the brokerage app finally open, while the numbers make sense for once. It is not a private bank's marble lobby, and it's not a trader's six-monitor desk.

**Personality**:
- *Plain*: no jargon left unexplained. Every term is defined in one line the first time it appears.
- *Warm*: never talks down, never shames the late start. "You're not behind. You're starting."
- *Numerate*: shows the working. Real numbers, simple maths and illustrative charts, always labelled as illustrative.

**Voice**: second person, short sentences, an insider's authority with a teacher's patience. Verbs: open, move, set, automate, leave alone, start. Use: account, fund, Roth IRA, 401(k) match, index fund, "automatic transfer," "this Saturday," "in order." Ban: "get rich," "financial freedom," "passive income," "beat the market," "guaranteed returns," "secret," "hack," "crush," trading slang, rocket/moon emoji, exclamation marks, fake scarcity, any percentage return stated as an expectation.
Urgency only where it's real: a bonus window or enrolment price with the reason stated. The honest urgency is the cost of waiting, shown as labelled illustrative maths.
**Compliance in voice**: say "historically" and "illustrative" when showing growth, and write "we teach" instead of "we recommend." Testimonials describe actions, not gains.

**Visual direction: "Green Line."** Paper-white pages, deep money green for the one action per screen and for growth, and a sunrise-yellow highlighter on the words and numbers that matter. Display type is a confident grotesk with big tabular numerals set as graphics: $500/mo, 3 funds, 40 minutes, 6 weeks. Photography shows real 30–45-year-olds at kitchen tables, on sofas and with laptops, in daylight. Art is a hand-drawn-feeling compounding curve, a highlighter swipe, ledger rows and "account cards." References: Public.com / Robinhood (number-led clarity), Monzo / Wise (bright, human, plain-English), and Ramit Sethi / IWT (long-form direct-response sales pages).

**Do**: a photo of a real person in every hero; giant numerals; highlighter marks on key phrases; plain-English definitions in the margin; alternate paper / green / photo sections; 8–14px radii (friendly, not bubbly).
**Don't**: serif display, bone/brass "private bank" luxury, stock-market tickers and candlestick charts, suits and skylines, gold coins, piggy banks, glowing upward arrows, dark "trader" UI, gradients as decoration, identical card rows.

**Tokens**: `web/src/styles/clients/firstshares.css` · verified with `node design/contrast.mjs`
