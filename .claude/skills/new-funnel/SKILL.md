---
name: new-funnel
description: Build a funnel for a client at full depth — strategy plan, complete copy, then pages designed from the client's DESIGN-PLAN with client-specific components, emails, and a critique pass. Types: ebook, calendar, vsl-call, vsl-checkout, checkout. Use when a client needs a new funnel or one rebuilt from scratch.
argument-hint: "<slug> <ebook|calendar|vsl-call|vsl-checkout|checkout>"
---

# /new-funnel — strategy → copy → design → build → critique

Arguments: `$ARGUMENTS` → `<slug> <type>`. Reference implementation: `clients/lumen/funnels/checkout/` + `web/src/pages/lumen/checkout/`.

## 0. Preconditions (stop and say what's missing otherwise)
`clients/<slug>/persona.md`, `brand.md`, `offer.md`, `DESIGN-PLAN.md` filled; theme in `web/src/styles/clients/<slug>.css` passing `node design/contrast.mjs`; client-specific art in `web/src/components/clients/<slug>/`.

## 1. PLAN.md → `clients/<slug>/funnels/<type>/PLAN.md`
Read `funnels/playbooks/awareness-stages.md`, `offer-stack.md`, and the architecture playbook for the type (`sales-page-architecture.md` or `vsl-script.md`). Write: traffic & awareness stage, Big Idea, named mechanism, offer stack table with values and anchors, objection map → section, proof plan (exists / client must supply / how shown), page map with the copy job of every section, events, emails, open client inputs.

## 2. COPY.md → `clients/<slug>/funnels/<type>/COPY.md`
Every headline (5 angles, one chosen, hand-wrapped), every section in full prose, CTA wording kept identical through the flow, FAQ from the persona's real objections, upsell/downsell reasons-why, emails (subject ×2, preview, body, timing, exit). Lengths: sales page 2,500–3,500 words; VSL script 1,800–2,200; opt-in 500–800; upsell 400–600; email 150–300. Use `marketing:draft-content` and `brand-voice:brand-voice-enforcement`. Tag every unverified number `[CLIENT]`. For VSL types also write `VSL-SCRIPT.md` in the playbook format.

## 3. Build
Pages in `web/src/pages/<slug>/<type>/`. Compose from `web/src/components/clients/<slug>/` first, shared primitives second. Follow the DESIGN-PLAN's wireframe for the page template, its one orchestrated motion moment, and its "what we removed" list. Render `[CLIENT]` claims with `<ClaimFlag />`. VSL pages use `ScriptedVSL` fed by `loadVslScript()` until the client's video exists. Add emails to `web/src/emails/<slug>/` and wire them (lead API or Stripe webhook). Register the type in `clients.ts` and price keys in `.dev.vars.example`.

## 4. Critique (fix, don't list)
`pnpm --dir web check && pnpm --dir web test`; `node web/tests/review.mjs <slug> <type>`; `node web/tests/crops.mjs /<slug>/<type> 1440 <offsets>` and read the crops; run `funnels/playbooks/review-rubric.md` A–G. Apply fixes, re-capture, then commit.
