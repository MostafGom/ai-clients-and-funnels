# Design plan — Lumen Sleep

## Subject
A pediatric sleep consultancy selling a 7-night method to exhausted parents of 4-month to 3-year-olds.
The page's job: make a tired parent at 11 p.m. believe tonight can be different, and act.
The subject's world: the nursery at night. The baby-monitor glow. The moon through a gap in the curtain.
The sleep log stuck to the fridge. The phone screen at 2 a.m. Wake windows. "Night 3."
Big idea: **the night, made friendly.** The dark is where the product lives, so the design lives there too.

## Color (named)
| Name | Hex | Role |
|---|---|---|
| Night Plum | `#2E2350` | Dominant surface for hero and closing bands, VSL stage, monitor screens |
| Moonmilk | `#FFF7EC` | Paper: reading surface for long copy |
| Butter Moon | `#F6D35C` | The moon, stars, one-time offers, highlights. Never a button on paper |
| Coral Sunrise | `#C2412A` | The single action per screen |
| Dusk Lilac | `#B9A7E6` | Secondary text and lines on plum; "before" bars in sleep logs |
| Sage Dawn | `#2F7A58` | "Slept through" states; "after" bars; success copy |

Why this isn't the default: the dominant surface is plum, not cream. Cream is the reading paper between night bands. Coral appears once per screen. Yellow is reserved for the moon and for the one-time offer so it keeps its meaning.

## Type
Fredoka 600/700 for display. It is rounded and warm; at 72–96px it reads as a children's-book title without being childish.
Nunito 400/700 for body at 18px; muted text at 16px. Line length ≤ 70ch. Scale: 16 · 18 · 22 · 28 · 36 · 48 · 64 · 88.
Headlines are wrapped by hand (`<br>`) so the line breaks land on the beat: "Your baby, asleep in ten minutes. / Seven nights from now."

## Layout templates
Sales page (checkout, vsl-checkout below the reveal):
```
┌────────────────────────────────────────────┐  NIGHT (plum, starfield, moon rising)
│ kicker · for parents of 4mo–3yr            │
│ HEADLINE (88px, 3 lines, hand-wrapped)     │
│ subhead names the mechanism                │
│ [ Start tonight · $497 ]  risk line        │
│         ── NightLog peeking in ──          │
└──────────── cloud edge ────────────────────┘
  PAPER (moonmilk)  the scene · the real problem (dial) · why what you tried failed
  PAPER             meet Maya (portrait slot, left) · the method night by night (ribbon)
┌──────────── wave edge ─────────────────────┐  NIGHT  proof: 3 case studies with monitor frames
└────────────────────────────────────────────┘
  PAPER             the stack (table) · for/not for · price (two cards, one highlighted)
  PAPER             guarantee (butter frame) · FAQ (plain list, no accordion chrome)
┌────────────────────────────────────────────┐  NIGHT  close: "Tonight is night one." + CTA
└────────────────────────────────────────────┘
```
Checkout / thanks: paper only, one column on mobile, summary left / form right on desktop. No night band (focus).
VSL: plum full-bleed stage; the slide is the page. Everything below is hidden until the reveal.
Opt-in (ebook): night hero holds the WakeWindowDial; paper body shows the guide's spreads.

## Illustration system (`web/src/components/clients/lumen/art/`)
StarField · Moon (phases) · NightLog (7-night before/after) · WakeWindowDial (interactive) · MonitorFrame · CloudEdge / WaveEdge · NightRibbon · PortraitSlot. Hand-drawn feel: slightly irregular strokes, no gradients except the night sky, no drop shadows on art.

## Motion (one orchestrated moment per page)
- Sales page: the NightLog fills from "before" to "after" once, when it scrolls into view.
- Hero: the moon rises 24px over 1.2s on load.
- VSL: slides advance; the offer reveals.
- Everything else moves only when touched. `prefers-reduced-motion` disables all three.

## What we removed
ALL-CAPS kickers · "A · B · C" proof strings · 01/02/03 on benefit cards · fade-up on every section ·
identical rounded cards in a 3-up grid · countdown timers on lead-gen pages · the "→" in copy ·
the cream+serif+terracotta look (demo client) · stock video IDs.
