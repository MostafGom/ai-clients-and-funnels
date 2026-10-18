---
name: photos
description: Source licensed photography for a client from Pexels — turn a shot brief into searches, show a contact sheet, download the picks into web/public/<slug>/photos/ with credits, and map them in photos.ts. Use whenever a funnel needs real imagery (heroes, proof, coach, product-in-use) or a page has no photo above the fold.
argument-hint: "<slug> \"<shot brief>\""
---

# /photos — shot brief → Pexels → client photo set

Needs `PEXELS_API_KEY` in `web/.dev.vars` (free: https://www.pexels.com/api/). If it's missing, stop and ask for it.

1. **Shot list first.** From `clients/<slug>/DESIGN-PLAN.md` (photography section) and the page maps, write the list:
   `name · role (hero / problem / mechanism / proof / coach / close) · orientation · subject + action + light + crop`.
   Heroes are landscape (min 2000px wide) with room for type on one side. Proof/portraits are portrait or square.
   Name files by subject (`deadlift.jpg`, `garage-rack.jpg`) and never by page.
2. **Search** each shot with 2–3 phrasings (concrete nouns and verbs, not adjectives:
   "man deadlift dark gym chalk", not "inspiring fitness"):
   `cd web && node scripts/photos.mjs search "<query>" --orientation landscape --out <scratchpad>/photos/<name>`
3. **Contact sheet.** Screenshot `<out>/contact.html` with Playwright (1440 wide) and look at it. Reject: shirtless
   or "ripped" stock, watermark-looking edits, wrong age for the persona, faces staring at the camera for action shots,
   busy backgrounds that leave no room for a headline, and anything already used by another client.
   Keep the set consistent in light, colour temperature and grain.
4. **Download** the picks: `node scripts/photos.mjs get <slug> <name> <id> "<used as>"`. This writes the jpg and
   upserts `CREDITS.md`.
5. **Map** each new file in `web/src/components/clients/<slug>/photos.ts` with a one-line comment describing the shot.
   Use photos with `width`/`height`, `loading="lazy"` below the fold and `fetchpriority="high"` on the hero.
6. Tell the user which shots are stand-ins for the client's real photography (it should be the same file names).
