# Brand brief — lumen (Lumen Sleep)

## Pipeline

project-studio pipeline (`/brand:start lumen`). States: todo · doing · done · approved · waived. Recorded
2026-10-28 from this client's files and git history; demo client, so the user acts as owner.

| Step | State | Date | By | Note |
| --- | --- | --- | --- | --- |
| brief | done | 2026-10-18 | user | this file + persona.md + offer.md |
| moodboard | todo |  |  | no Category section in the plan (pre-studio) |
| plan | done | 2026-10-18 | claude | DESIGN-PLAN.md; no recorded owner approval |
| concept | todo | | | pre-studio: pages were built without an A/B concept round |
| system | done | 2026-10-18 | claude | `web/src/styles/clients/lumen.css`, `/lumen/design-system`, contrast passes |
| imagery | done | 2026-10-18 | claude | Pexels stand-ins in `web/public/lumen/photos/` (CREDITS.md) |
| pages | done | 2026-10-18 | claude | funnels: ebook, calendar, vsl-call, vsl-checkout, checkout |
| review | todo | | | run `/funnel-review lumen <funnel>` (uses `/brand:review` + the CRO rubric) |

**Who**: Lumen Sleep, founded by Maya Lindqvist, certified pediatric sleep consultant, 2,300+ families since 2019. Method: "Gentle Timing" (wake windows + a 7-night bedtime reset), explicitly no cry-it-out.

**Personality**:
- *Playful* — we joke about the exhaustion because we've lived it. Night owls, tiny humans, the 4th lullaby.
- *Bold* — we make big, specific promises (7 nights) and we state them in the first line.
- *Kind* — never shame, never "you're doing it wrong". Guilt is the enemy, not the parent.

**Voice**: short, punchy sentences. Second person. One joke per screen, max. Specific numbers (7 nights, 11 hours, 10 minutes). Verbs: reset, sleep, breathe. Use: tiny human, night owl, bedtime reset, wake windows. Ban: "sleep train" as a verb in headlines, "cry it out" except to deny it, "mama" (use "you"), "hack", "secret", medical claims.

**Visual direction**: soft and organic. Cream paper background, warm whites, very rounded corners (pill buttons, 2rem cards), deep plum "night" for inverse bands with butter-yellow moon/stars motifs, coral primary for the one action per screen. Display face Fredoka (rounded, friendly, bold), body Nunito. Imagery: real tired-then-rested parents, baby monitor screenshots, hand-drawn stars and moons; no stock "sleeping baby in a basket".

**Do**: big friendly headlines, generous whitespace, one coral CTA per screen, yellow only for one-time offers and highlights, playful micro-copy under buttons.
**Don't**: red urgency, countdowns on lead-gen pages, clinical blue, tiny text, multiple CTAs, scare copy about development.

**Tokens**: `web/src/styles/clients/lumen.css` · verified with `node design/contrast.mjs`.
