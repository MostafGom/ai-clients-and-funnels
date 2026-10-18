---
name: art-direction
description: Art-direct a client's funnels so they look made for that business, not assembled from a kit — category-fit typography, a mood board from real reference pages, a section-pattern library to compose from, and an anti-template checklist every page must pass. Use before writing or rewriting a DESIGN-PLAN, before building or redesigning funnel pages, and when a funnel "looks templated", "has no energy", or "doesn't fit the niche".
argument-hint: "<slug> [moodboard|plan|check <funnel>]"
---

# /art-direction — make it belong to the category

Read `clients/<slug>/persona.md`, `brand.md`, `offer.md` first. Then `references/patterns.md` and
`references/type-pairings.md`. Load the `frontend-design` skill for craft.

## moodboard
1. Name the **category energy** in one line. It's what the buyer feels walking into the best place of this kind,
   e.g. "a serious barbell gym at 6 a.m.", "a quiet clinic". Brand adjectives aren't enough on their own: a design
   can be "calm" and still be wrong for a gym.
2. Pick 5–8 reference pages *from the category and one level above it* (leading brands, top course or program sales pages,
   equipment brands). Screenshot each one at 1440 and 390 with Playwright into the scratchpad and look at them.
3. Write down what the category *expects* (keep these, because they read as legitimacy) and what everyone does
   (break one or two of these on purpose, because that's what makes it distinctive). Record both in DESIGN-PLAN.md under `## Category`.

## plan
Write or rewrite `clients/<slug>/DESIGN-PLAN.md`:
- **Category & energy** (from the moodboard), with 3 references named.
- **Type**: chosen from `type-pairings.md` for the category, with a reason. Do a squint test: at 390px, could the headline
  font belong to a competitor in a *different* category? If so, change it.
- **Colour**: named hexes with roles; one hot moment per screen.
- **Photography**: a shot list (feeds `/photos`). Every start page needs a photo or a subject-specific visual in the first viewport.
- **Signature moment** per funnel: one interaction or motion that only this client would have (e.g. plates loading
  onto a bar as you scroll, a sleep curve settling). Respect `prefers-reduced-motion`.
- **Section map per funnel**: composed from `patterns.md`, with the pattern named for each section. Every section names its
  copy job too.
- **What we removed**.

## check <funnel>
Screenshot every page (390 + 1440) and score `references/checklist.md`. Any failure is a fix, not a note.
