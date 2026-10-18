# Design plan — Forge Fitness Online · "Iron & Chalk"

## Category
Energy: **a serious barbell gym at 6 a.m.** References: Rogue Fitness (product pages: dark, condensed caps, kit photography),
Barbell Medicine / Stronger by Science program pages (numbers and programming as proof), Nike Training (photo-led, huge type).
The category expects real lifting photography, numbers, an athletic display face, and dark surfaces.
What everyone does that we break: shirtless "after" photos and shouted hype. We show kilos going up for a 44-year-old with a job instead.

## Subject
An online strength program for men aged 35–50 who run companies and families. The page has to make a capable, skeptical, tired man believe that
three 45-minute sessions a week, programmed properly, will make him stronger than he was at 30, then let him buy without feeling hustled.
The big idea: **stronger at 45 than you were at 30.**

## Colour (named)
| Name | Hex | Role |
|---|---|---|
| Iron | `#0E0E0F` | Page background (dominant) |
| Graphite / Gunmetal | `#18181B` / `#222226` | Cards, inputs, raised panels |
| Chalk | `#F2F0EB` | Type on iron; the "chalk paper" band (`bg-inverse`) for reading-heavy sections |
| Signal | `#FF5A1F` | The single action per screen, key numerals, the loaded plate |
| Plate yellow | `#F5C518` | Highlights, the order bump, one-time offers, the demo bar |
| Steel | `#9AA3AD` | Secondary marks, "before" bars |
| Green | `#5CC27F` | "Lift went up" |

## Type
**Barlow Condensed 800** (plus 800 italic for motion words) for display, uppercase, line-height 0.86–0.95, at 96–152px on desktop heroes
and 56–64px at 390px. Numerals go in the display face. **Inter Tight** 400/500/600 for body at 17–18px, max 64ch.
Labels are Inter Tight 600 uppercase with wide tracking, used sparingly (one per section at most).

## Photography (shot list → `/photos forge`)
Real men in their late 30s to 50s, dark gyms or garage racks, hard side light, chalk, no shirtless shots, eyes on the bar rather than the camera.
deadlift (hero) · squat (hero alt) · overhead-press · barbell-row · chalk-hands · garage-rack · hotel-gym · plates-loading (close-up) ·
coach-cue (Daniel spotting/cueing) · logbook · the 6:40 p.m. desk scene. Current stand-ins: `rack.jpg` (squat), `bar.jpg` (bench), `daniel.jpg`, `desk.jpg`.

## Art system (`web/src/components/clients/forge/`)
- `PhotoHero`: full-bleed photo, iron scrim on the copy side, stacked uppercase headline, CTA, proof strip pinned to the bottom.
- `PlateLoader`: **the signature moment.** A barbell SVG where plates slide onto the sleeve as the section scrolls into view and a kilo counter
  ticks up (e.g. 60 → 140 kg). Static and fully loaded under reduced motion.
- `NumberWall`: 3 SESSIONS · 45 MIN · 6 LIFTS · 12 WEEKS as giant numerals with one-line captions.
- `ResultsTicker`: a marquee of client results ("MARK, 44 · DEADLIFT 100 → 150 KG"). Pauses on hover/focus.
- `IronBand` (replaces OnyxBand): the section wrapper, `tone="iron" | "graphite" | "chalk"`, with an optional plate-edge top rule.
- Restyled: `LiftLedger` (orange after-bars, display numerals), `LedgerCard`, `StackTable`, `FaqList`, `SessionPlanner` (graphite card, orange result),
  `WeekRibbon` (a 12-week track: phase blocks, scrolls sideways on mobile), `Plates`.
- Composed sections: `VslStage` (iron stage + dim photo + chalkboard ScriptedVSL; art keys `plates` · `numbers` · `ledger`),
  `CoachStory` (portrait bleeding off the edge + credentials as numbers), `ClientLedgers` (three week-1→12 cards), `ProofWall`
  (one huge quote on signal + small cards), `OfferBlock` (stack → price → guarantee on chalk, optional 1:1 coaching).
  Shared offer/proof data: `data.ts` (CTA, stack, clients, ticker results, mechanism numbers, phases).
- Retired: `Monogram`, brass `Rule`, `OnyxBand`.
- Printable guide (`/forge/guide`): iron cover, content pages on chalk paper (text tokens remapped to ink inside the page).

## Section maps (pattern per section; neighbours never repeat a pattern)
**ebook** `/` · Tool hero over photo (headline + SessionPlanner + form) → ResultsTicker → Number wall (what's in the guide) → chalk band: the guide's spreads as a split with the cover →
Coach story (portrait bleeding off the edge, credentials as numbers) → Proof wall (3 quotes, mixed sizes) → FAQ → Photo close with the second form.
**checkout (sales page)** · Full-bleed photo hero + proof strip → ResultsTicker → Scene (the 6:40 p.m. desk, split) → Myth wall → Number wall (mechanism) →
PlateLoader (the rule: add when clean) → 12-week timeline track → Proof: ledger cards on iron → Coach story → Who it's for / not for → Stack table + price + guarantee (chalk) → FAQ → Photo close.
**vsl-checkout** · Stage hero (VSL) + proof strip → Number wall → Ledger proof → Stack + price + guarantee → FAQ → Photo close.
**vsl-call** · Stage hero → who the call is for (split with photo) → Ledger proof → apply CTA close on photo.
**calendar** · Split hero (photo + audit card) → what happens in 20 minutes (3-step timeline track) → Coach story → proof → FAQ → photo close.
Checkout / upsell / downsell / thanks: iron, two columns on desktop, one photo strip in the header, chalk card for the order summary.

## Motion
PlateLoader fills on scroll (signature). LiftLedger bars fill once. ResultsTicker drifts. Buttons get a hard offset shadow and press down on click.
Everything respects `prefers-reduced-motion`.

## What we removed
Serif display · bone paper · brass hairlines · "stillness is the point" · flat text-only heroes · photos buried below the fold · identical spread cards · the monogram.
