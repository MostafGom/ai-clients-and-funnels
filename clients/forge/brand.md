# Brand brief — forge (Forge Fitness Online)

## Pipeline

project-studio pipeline (`/brand:start forge`). States: todo · doing · done · approved · waived. Recorded
2026-10-28 from this client's files and git history; demo client, so the user acts as owner.

| Step | State | Date | By | Note |
| --- | --- | --- | --- | --- |
| brief | done | 2026-10-18 | user | this file + persona.md + offer.md |
| moodboard | done | 2026-10-19 | claude | Category: energy, references, expects/breaks in the plan |
| plan | done | 2026-10-19 | claude | DESIGN-PLAN.md; no recorded owner approval |
| concept | todo | | | pre-studio: pages were built without an A/B concept round |
| system | done | 2026-10-19 | claude | `web/src/styles/clients/forge.css`, `/forge/design-system`, contrast passes |
| imagery | done | 2026-10-19 | claude | Pexels stand-ins in `web/public/forge/photos/` (CREDITS.md) |
| pages | done | 2026-10-19 | claude | funnels: ebook, calendar, vsl-call, vsl-checkout, checkout |
| review | todo | | | run `/funnel-review forge <funnel>` (uses `/brand:review` + the CRO rubric) |

**Who**: Forge Fitness Online, founded by Daniel Reyes, strength coach (15 years; former physiotherapist, 1,900+ clients since 2011). Method: **The Forge Protocol**: three 45-minute sessions a week, six fundamental lifts, autoregulated progression, 12-week cycles. Built for men 35–50.

**Category energy**: a serious barbell gym at 6 a.m. Iron, chalk, the sound of a plate going on the bar. It's not a commercial gym full of mirrors, and it's not a wellness spa either. (Redesign Oct 2026: the first brief read as quiet luxury and gave the funnels no fitness energy.)

**Personality**:
- *Direct*: short declarative sentences. Numbers over adjectives. Says what happens and when.
- *Strong*: confident without shouting. The energy comes from verbs, numbers and imagery, not hype words.
- *Respectful*: speaks to a capable adult with a full life. Never shames, never says "excuses".

**Voice**: second person, short paragraphs, punchy headlines (often a number plus an outcome). Verbs: lift, load, add, build, train, recover. Use: session, lift, kilos, 12 weeks, "train around", the bar. Ban: "crush", "beast", "grind", "shred", "no excuses", "hack", "insane", transformation-photo language, exclamation marks, fake scarcity.
Urgency only where it's real: cohort start dates, the week-four guarantee window, bonus deadlines, with the reason stated.

**Visual direction: Iron & Chalk.** Iron-dark pages with chalk-white type. Signal orange is the single action per screen; plate yellow is for highlights and one-time offers. Big condensed uppercase display (Barlow Condensed 800) set tight, with Inter Tight for body. Full-bleed photography of real men lifting (deadlift, squat, press, row) in dark gyms and garage racks, with hard light and chalk. Numbers set huge as graphics: kilos, weeks, minutes. Art: barbell plates, bar sleeves, kilo numerals, a 12-week track, plate-colour data marks. One signature motion per page (plates load onto the bar).

**Do**: a photo of lifting in every hero; giant numerals; hard edges (2–6px radii); dense proof (ledgers, kilos); alternate iron / chalk / photo sections; uppercase display.
**Don't**: serif display, pastel, gradients-as-decoration, lightning bolts, neon glow, shirtless "ripped" stock, countdown timers, emoji, identical card rows.

**Tokens**: `web/src/styles/clients/forge.css` · verified with `node design/contrast.mjs`.
