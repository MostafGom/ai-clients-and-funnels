# Funnel plan — lumen / ebook (free guide opt-in → thanks → nurture)

## Traffic & stage
- Source: **cold.** Instagram/TikTok organic and paid, Pinterest, parenting Facebook groups, the free "bedtime calculator" shared by parents. Visitor is on a phone, probably at nap time or after midnight.
- Awareness: **problem-aware / unaware of the mechanism.** They know the nights are bad. They don't know it's timing. The page must give an immediate, personal win (tonight's bedtime) before asking for anything.

## Big idea
**"What time should your baby go to bed tonight?"** The hook is a tool, not a promise. The WakeWindowDial answers a question they actually have, in ten seconds, then the guide is the obvious next step.

## The lead magnet: The 7-Night Bedtime Reset (free, 14 pages)
What it is: the wake-window chart by age, the 10-minute bedtime script, a night-by-night seven-night plan (the "lite" version of the paid method), the 2 a.m. decision tree (short form), the five mistakes, and what to do on night eight. Written in full in GUIDE.md; rendered at `/lumen/reset/` and printed to `public/lumen/assets/bedtime-reset.pdf`.
Why it converts to the program: it works for most families on nights one and two, which makes the full method (naps, response plan in depth, community, Q&A, age tracks) credible. The guide ends with the Clarity Call and the program, not a hard sell.

## Objection map → where
| Objection | Answered |
|---|---|
| "Another PDF I won't read." | Hero: 12-minute read, use it tonight; dial gives value before the download |
| "I don't want to cry it out." | Kicker + inside-the-guide list + FAQ 1 |
| "My baby is different." | Chart covers 4 months–3 years; FAQ 2 |
| "Is this spam?" | Consent line: one guide, five short emails, unsubscribe in one tap |
| "Who is she?" | Maya block |

## Proof plan
2,300+ families [CLIENT] · three one-line testimonials from the guide (not the program) [CLIENT] · Maya's credentials [CLIENT].

## Page map & copy jobs
`/lumen/ebook` — night hero: kicker, headline, WakeWindowDial with the opt-in form inside its result (age is passed to the email) → paper: "Inside the Reset" as four illustrated spreads → Maya → three testimonials → three FAQs → night close with a second form.
`/lumen/ebook/thanks` — delivery confirmation + direct download + 90-second scripted "while it downloads" note from Maya (ScriptedVSL, short) + one next step: the Sleep Clarity Call.
`/lumen/reset/` — the guide as a designed, printable page (noindex). `pnpm pdf` renders it.

## Events
`dial_used`, `lead_captured` (with `age`), `guide_downloaded`, `vsl_play` (thanks), `cta_click` (call).

## Emails (Resend, scheduled at opt-in)
Delivery (0h) → Nurture 1 (+1d, the chart) → 2 (+2d, the 2 a.m. story) → 3 (+4d, mechanism + Jess's log) → 4 (+6d, Ines's twins, the Q&A) → 5 (+8d, the method, guarantee, direct CTA). Exit: purchase or booking (manual for now; Resend scheduled emails can be cancelled by id [CLIENT: store ids when a CRM exists]).

## Open client inputs
Real testimonials for the free guide · Maya's photo and credentials · confirm the age chart values with Maya (they're mainstream wake-window ranges, but she signs them) · the Cal.com link.
