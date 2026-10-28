---
name: funnel-review
description: Review a client's funnel in a real browser at mobile and desktop widths — brand fit, token-only styling, conversion (CRO) checklist, accessibility, performance hints — and report ranked findings with fixes. Use before sending traffic, after copy or design changes, or when asked how a funnel looks.
argument-hint: "<slug> <funnel-type>"
---

# /funnel-review

Arguments: `$ARGUMENTS` → `<slug> <type>`. Pages come from `FUNNELS[type].pages` in `web/src/lib/funnels.ts`.

1. Start the dev server if not running: `pnpm --dir web astro dev --background` (check `astro dev status`).
2. For each page, with the Playwright MCP: open at 390×844 and 1440×900, full-page screenshot, check console errors, confirm exactly one `h1`, no horizontal scroll, every form has labels, every interactive element has a visible focus state (Tab through the first 8).
3. **CRO checklist** per page: headline states outcome + for whom; one primary CTA per screen (the harness flags two within 0.8 viewport; sticky excluded); proof within first viewport on start pages; friction (fields, steps) justified; price anchoring present on offer pages; thank-you pages push exactly one next step; upsell/downsell have a clear decline path.
4. **Art direction**: score the brand plugin's `references/checklist.md` + `references/domains/funnel/checklist.md` from the screenshots (or run `/brand:review <slug> <paths>` for lint, contrast and the checklists together) (category squint, photo in first viewport, adjacent-section variety, signature moment).
5. **Brand**: compare against `clients/<slug>/brand.md` do/don't list; raw colours via the brand plugin's `scripts/ui-lint.mjs` (scope from `.claude/studio.json`).
6. **Performance**: fonts preconnected, VSL click-to-play (no autoplaying iframe), images sized, no layout shift on reveal.
7. Report: ranked findings (severity: blocks launch / should fix / polish), each with the file and a concrete fix. Offer to apply. Use `design:design-critique`, `design:accessibility-review`, and `searchfit-seo:on-page-seo` for depth where useful.
