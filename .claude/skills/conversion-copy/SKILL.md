---
name: conversion-copy
description: Direct-response copy for funnel pages and emails — big idea, headline angles, proof-first ordering, offer stack, objection mapping, honest urgency, CTA microcopy — written in the client's voice. Use when writing or sharpening any COPY.md, headline, VSL script, upsell, or email, or when copy feels flat, generic, or "too calm to convert".
argument-hint: "<slug> <funnel> [write|sharpen]"
---

# /conversion-copy

Inputs: `clients/<slug>/persona.md` (language, objections, proof), `offer.md`, `brand.md` (voice and bans),
the playbooks in `funnels/playbooks/` (architecture, offer stack, VSL, awareness). This skill adds the craft layer
on top of those playbooks; it doesn't replace them.

## 1. Big idea (one sentence, before any section)
`[Specific outcome] for [specific person] without [the thing they believe is required], because [named mechanism].`
If a competitor could say it unchanged, it isn't a big idea yet.

## 2. Headlines: write 8 and pick 1
Angles: outcome+timeframe · identity ("stronger at 45 than at 30") · enemy/myth · mechanism · specific number ·
question the reader is already asking · objection flip · story opener. Score each 1–5 on specificity, belief and
voice fit; ≤ 14 words; hand-wrap for the display face. Subheads carry the *how* and *who*.

## 3. Order: proof before promises
Hero → specific proof within the first scroll (a named result with a number) → problem scene → mechanism →
more proof → offer → risk reversal → FAQ → close. On start pages the first proof shows up above the fold or directly under it.

## 4. Specificity pass
Replace every adjective with a number, a name, a time or a place. "Get stronger" becomes "add 40 kg to your deadlift in 12 weeks [CLIENT]".
Tag every unverified figure `[CLIENT]` in COPY.md.

## 5. Objection map
List the persona's top 6 objections → the section that answers each → the proof used. Anything left unanswered is a gap.

## 6. Honest urgency
Use only real constraints: cohort start dates, coaching capacity, bonus deadlines, price rises that will happen.
Never fake timers. Say *why* the limit exists.

## 7. CTA microcopy
Verb + outcome ("Start my 12 weeks", not "Submit"). Keep the same wording through the flow. Add a friction-reducer
line under it (time to complete, guarantee, what happens next).

## 8. Voice pass
Run `brand-voice:brand-voice-enforcement` against `brand.md`. Energy comes from short sentences, strong verbs and numbers,
not from hype words. Read it aloud.

## sharpen mode
Take the existing COPY.md and keep its structure where it works. Rewrite the headlines (step 2), move proof up (step 3),
do the specificity pass and the urgency/CTA passes, then show a before→after table of the 10 biggest changes.
