---
name: verify
description: Verify changes in this repo before declaring work done or committing — astro check against the known baseline, Playwright funnel tests, production build, smoke checks of the changed client's pages, contrast and the funnel harness, and a diff review against the project rules. Use after any change.
---

# Verify

Run from the repo root (`${CLAUDE_SKILL_DIR}/../../..`), in order, and report each result in a table.

1. **Types:** `pnpm --dir web check`. Baseline: **0** errors. Any error is new: show it.
2. **Tests:** `pnpm --dir web test` (every registered funnel page at 390 and 1440). Report passed/total.
3. **Build:** `pnpm --dir web build`.
4. **Smoke** (dev server up: `pnpm --dir web dev`, port 4321). For each client touched, every page must return 200:
   ```bash
   for p in / /<slug>/ /<slug>/design-system/ /<slug>/<funnel>/ ; do printf '%s ' "$p"; curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:4321$p"; done
   ```
   Funnel pages per type are in `web/src/lib/funnels.ts`; each client's funnels are in `web/src/lib/clients.ts`.
   Also hit any route you added.
5. **Contrast** (theme changed): the brand plugin's `scripts/contrast.mjs --slug <slug>` — all required pairs pass.
6. **Funnel harness** (a funnel's pages changed): `node web/tests/review.mjs <slug> <funnel>` — h1, overflow at 390px,
   labels, focus, CTA crowding.
7. **Diff review** against CLAUDE.md "Rules" and `.claude/rules/`: tokens only (no hex or raw palette in pages),
   one `<h1>`, no navigation on funnel pages, API routes `prerender = false`, secrets from `astro:env/server`,
   unverified numbers tagged `[CLIENT]` in COPY.md only.
8. UI changed? `/brand:review <slug>` (or at least the brand plugin's `scripts/ui-lint.mjs`), and `/funnel-review
   <slug> <funnel>` before sending traffic.

A green run is not proof: the checks only cover what they were written for. Say what wasn't covered.
