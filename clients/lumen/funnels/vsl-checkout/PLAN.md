# Funnel plan — lumen / vsl-checkout (scripted VSL → checkout → upsell → downsell)

## Traffic & stage
- Source: **cold to lukewarm.** Paid social (Instagram/Facebook/TikTok ads to parents of 4-month to 3-year-olds), parenting-group shares, YouTube pre-roll. The visitor has 20 seconds of patience and a phone in one hand.
- Awareness: **problem-aware.** They know the baby won't sleep and that "sleep training" exists; they don't know the mechanism and they fear crying. The video must teach before it sells. Nothing about the offer is visible until the reveal chapter.
- Promise the ad made (assumed): "Why your baby wakes at 2 a.m. (14-minute training)". The page's first screen repeats it.

## Big idea
Same as the sales page: **timing, not tears.** The VSL version adds a personal narrative spine: Maya's own 3 a.m., the stopwatch, night six.

## Script structure (see VSL-SCRIPT.md)
Hook 0:00 → Maya's night 0:45 → The lie 2:30 → The mechanism 4:00 (dial) → Proof 7:00 (logs) → The offer 9:15 **(reveal)** → Guarantee & objections 11:45 → Close 13:15. ~1,950 words, ~13 min at 150 wpm.

## Page map & copy jobs
`/lumen/vsl-checkout` — plum full-bleed stage. Kicker (who it's for) + headline (the promise of the video) + ScriptedVSL + under-video line (length, "no sound needed", proof). Below, hidden until the reveal: compressed offer (stack table + price), guarantee, three fast proofs (MonitorFrames + one-line quotes), six FAQs, close. Sticky CTA appears only after reveal.
`/checkout`, `/upsell`, `/downsell`, `/thanks` — same architecture as the checkout funnel with `funnel="vsl-checkout"` and VSL-specific first lines ("You watched the training. Night one is tonight.").

## Offer, bump, upsell, downsell, guarantee
Identical to `../checkout/PLAN.md` (same price keys, same stack, same guarantee).

## Events
`vsl_play`, `vsl_chapter` (each), `vsl_cta_revealed`, `vsl_complete`, `cta_click`, `checkout_started`, `bump_toggled`, `offer_accepted/declined`.

## Emails
Shared with checkout (abandoned ×2, onboarding ×3). No separate sequence.

## When the client records the real video
Replace `<ScriptedVSL>` with `<VideoPlayer provider=… src=… revealAfter={555} caption="13 min · sound on">` (555 s = reveal chapter start). Keep VSL-SCRIPT.md as the brief. Poster: illustrated night sky with Maya's photo slot.

## Open client inputs
Record the video from VSL-SCRIPT.md · Maya's photo · the three families' logs · verify every `[CLIENT]` number carried from the sales page.
