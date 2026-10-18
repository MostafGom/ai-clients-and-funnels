# Funnel plan — forge / vsl-checkout (scripted VSL → checkout → upsell → downsell)

## Traffic & stage
- Source: **cold to lukewarm.** LinkedIn and YouTube pre-roll aimed at men 35–50 ("why your back hurts at 45", "strength after 40"), podcast mentions, retargeting of guide readers.
- Awareness: **problem-aware.** He knows he's weaker and stiffer than he was; he does not know that volume is the wrong lever. The video teaches the three-lever mechanism before any offer appears.
- Ad promise (assumed): "The least training that makes a 45-year-old stronger (9-minute video)."

## Big idea
Same as the sales page: **volume isn't the lever, progression is**, told as Daniel's physio-room story: the men whose backs stopped hurting were the ones training less, better.

## Script structure (VSL-SCRIPT.md)
Hook 0:00 → Daniel's room 0:40 → the lie ("you need to do more") 2:00 → the three levers 3:30 → what twelve weeks looks like (Mark, James, Ravi) 6:00 → Forge 12 **(reveal)** 7:45 → the guarantee and objections 9:30 → close 10:45. ~1,500 spoken words; the scripted player runs about 6 minutes.

## Page map
`/forge/vsl-checkout` — Onyx stage: kicker, headline, ScriptedVSL with chapter art (Plates, LiftLedger, Monogram, LedgerCard), under-video line. Hidden until reveal: stack, three ledger cards, guarantee, six FAQs, close, sticky CTA.
`/checkout`, `/upsell`, `/downsell`, `/thanks` — as the checkout funnel with `funnel="vsl-checkout"` and video-specific first lines.

## Offer, bump, upsell, downsell, guarantee
Identical to `../checkout/PLAN.md`.

## Events
`vsl_play`, `vsl_chapter`, `vsl_cta_revealed`, `vsl_complete`, `cta_click`, `checkout_started`, `bump_toggled`, `offer_accepted/declined`.

## Emails
Shared with the checkout funnel.

## When Daniel records the video
Replace `<ScriptedVSL>` with `<VideoPlayer provider=… src=… revealAfter={…}>` at the reveal chapter's timestamp. Poster: the rack photo.
