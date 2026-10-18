# Email sequences per funnel (Resend; nurture scheduled at opt-in with `scheduledAt`)

Every email: subject ≤ 50 chars (2 options), preview text 40–90 chars that doesn't repeat the subject, one job, one CTA, 150–300 words, plain text feel, signed by the founder, exit rule.

| Funnel | Sequence | Emails | Timing | Exit |
|---|---|---|---|---|
| ebook | Delivery + nurture | 1 delivery, then 5: value (the chart), pain (the 2 a.m. story), mechanism + proof, social proof, offer | 0h, +1d, +2d, +4d, +6d, +8d | buys or books |
| calendar / vsl-call | Call reminders | confirm, prep (24h before), 1h before, no-show rebook | event-based | attended |
| checkout / vsl-checkout | Abandoned checkout | "left something", objection answer + guarantee | +1h, +24h | purchased |
| checkout / vsl-checkout | Onboarding | welcome + night 1, night 3 check-in, night 7 + review ask | 0h, +2d, +6d | — |
| upsell declined | Soft follow-up | one email, the downsell again with the guarantee | +3d | purchased |

Write them in `clients/<slug>/funnels/<type>/COPY.md` under "Emails"; implement in `web/src/emails/<slug>/`.
