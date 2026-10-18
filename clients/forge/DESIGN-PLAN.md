# Design plan — Forge Fitness Online

## Subject
An online strength program for men 35–50 who run companies and families. The page's job: make a capable, skeptical, tired man believe that three calm sessions a week, programmed properly, will make him stronger than he was at 30, and let him buy without feeling sold to.
The subject's world: a quiet gym at 6 a.m. before the office; a home rack in the garage; a hotel gym at 9 p.m.; a logbook; chalk; the number on the bar going up. Big idea: **strength, unhurried.**

## Color (named)
| Name | Hex | Role |
|---|---|---|
| Onyx | `#141416` | Dominant surface: hero, proof, close |
| Graphite | `#1F1F24` | Raised panels on Onyx |
| Bone | `#F3EFE6` | Reading paper |
| Linen | `#FBF9F4` | Cards on paper |
| Brass | `#C9A227` | Hairline rules, numerals, one-time offers. Never a button on paper |
| Copper | `#8A4A12` | The single action per screen |
| Slate | `#8A94A6` | Secondary text on Onyx, "before" marks in ledgers |
| Moss | `#4F7A5B` | "lift went up" marks, success |

Why this isn't the default: no near-black with an acid accent. Onyx is warm-neutral, the accent is brass used as a rule and a numeral, not a glow; the CTA is copper, not the accent.

## Type
Cormorant Garamond 600/700 for display at 72–104px: a true serif with real italics, used for headlines and large numerals. Manrope 400/600/700 for body at 18px (max 68ch). Scale: 16 · 18 · 22 · 28 · 36 · 48 · 64 · 96. Headlines hand-wrapped. Numerals are part of the design (week numbers, kilos).

## Layout templates
Sales page: Onyx hero (headline, sub, CTA, LiftLedger) → hairline → Bone reading blocks → Onyx proof band with three client ledgers → Bone stack/price/guarantee/FAQ → Onyx close. Dividers are 1px brass hairlines, never curves.
Checkout / thanks: Bone only, two columns on desktop.
VSL: Onyx full-bleed stage.
Opt-in: Onyx hero holding the SessionPlanner; Bone body shows the guide's spreads.

## Illustration system (`web/src/components/clients/forge/art/`)
Rule (brass hairline with optional centered numeral) · Monogram (F in a thin circle) · Plates (thin-line barbell-plate marks as decoration) · LiftLedger (six lifts, week 1 vs week 12, bars fill once on view: the one motion moment) · WeekRibbon (12 numerals, phases marked) · SessionPlanner (interactive: days available + goal + equipment → a 3-session week in minutes, the opt-in hook) · LedgerCard (a client's numbers as a table: lift, before, after) · PortraitSlot reused from the shared pattern.

## Motion
LiftLedger fills once on scroll. Nothing else moves unless touched. No hero animation: stillness is the point.

## What we removed
Countdowns · stars and glows · transformation photos · all-caps labels · neon · rounded pill cards (radii are small here: 4–12px) · exclamation marks.
