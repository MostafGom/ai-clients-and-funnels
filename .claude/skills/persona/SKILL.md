---
name: persona
description: Build or sharpen a client's customer persona through a short interview and write clients/<slug>/persona.md (who, awareness level, pains, desires, objections, language, proof). Use before writing any funnel copy for a client.
argument-hint: "<slug>"
---

# /persona

Argument: `$ARGUMENTS` → `<slug>`. Read `clients/<slug>/persona.md`, `brand.md`, `offer.md` first.

Interview the user in two rounds of at most 4 questions each (skip anything already answered in the files):
1. Who exactly buys (role, business size, revenue, age), and where they currently are on the awareness ladder.
2. The 3 pains in the customer's own words; the 3 outcomes they'd pay for; the objections heard on sales calls.
3. The words/phrases customers actually use; what proof convinced recent buyers; what they tried before.

Write `clients/<slug>/persona.md` in the template's structure. Be specific and quotable — every line should be usable in copy. Add a final section **Copy angles**: 5 headline angles (outcome, mechanism, enemy, identity, speed) derived from the persona.
If the `marketing` plugin is available, optionally run `marketing:competitive-brief` for positioning gaps and link the result.
