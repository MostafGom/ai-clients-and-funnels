---
name: new-funnel
description: Generate a funnel for a client from a blueprint — ebook, calendar, vsl-call, vsl-checkout, or checkout. Writes the copy brief to clients/<slug>/funnels/<type>.md and the Astro pages under web/src/pages/<slug>/<type>/ using the shared components and the client's tokens. Use when a client needs a new funnel or a funnel rebuilt from scratch.
argument-hint: "<slug> <ebook|calendar|vsl-call|vsl-checkout|checkout>"
---

# /new-funnel

Arguments: `$ARGUMENTS` → `<slug> <type>`.

1. Preconditions: client registered in `web/src/lib/clients.ts`, theme exists, `clients/<slug>/persona.md` and `offer.md` are filled. If not, say what's missing and stop.
2. Read `funnels/blueprints/<type>/BLUEPRINT.md`, the persona, brand, and offer files. Read the demo implementation `web/src/pages/demo/<type>/` as the structural reference (components, props, page order).
3. Write the copy brief `clients/<slug>/funnels/<type>.md`: 3 headline options (pick one), subheadline, bullets, proof to use (only claims the client has given; mark placeholders clearly as `[PLACEHOLDER]`), CTA labels, offer/price keys, page map. Use the `marketing:draft-content` skill for copy and `brand-voice:brand-voice-enforcement` if a voice profile exists.
4. Generate the pages in `web/src/pages/<slug>/<type>/` mirroring the demo file set, with `client="<slug>"`, the funnel's paths, the client's copy. Only shared components from `web/src/components/`; no new raw styles. For upsell/downsell use `bare`. For VSLs set `revealAfter` to the offer moment the user gives (ask if unknown).
5. Add `'<type>'` to the client's `funnels` array in `web/src/lib/clients.ts`. Add the funnel's Stripe price keys to `web/.dev.vars.example` if the type sells.
6. `pnpm --dir web check && pnpm --dir web build`, then `pnpm --dir web test -g "<slug> <type>"` for screenshots. Fix any failure.
7. Finish with `/funnel-review <slug> <type>` suggestions and the list of `[PLACEHOLDER]` items the client must supply.
