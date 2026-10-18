# Funnel plan — forge / calendar (sell the Strength Audit → book → confirmed)

## Traffic & stage
- Source: **warm.** Guide thanks page, nurture emails 4–5, the guide's page 11, the "Apply for coaching" button on the sales page, referrals.
- Awareness: **solution-aware with a complication.** He has the guide or the program in mind; his week has a "but": an old injury, three weeks a month in hotels, never been under a bar, or he's over 50 and wants someone to watch his form before he loads it. He wants a competent adult to look at his specific situation.
- What the call sells (on the call): Forge 12 with 1:1 coaching ($1,500 / 12 weeks) for the complicated cases; Forge 12 self-paced ($197) for everyone else. The page sells **the audit**, only.

## Big idea
**Twenty minutes, one plan written for you.** A working session with an output: the audit card (your three lifts to start with, the swap for your injury, your week, your first four weeks' loads). Not a sales call.

## Objection map → section
| Objection | Answered |
|---|---|
| "It's a sales pitch." | Hero sub, the 20-minute timeline, FAQ 1 (one honest sentence about coaching) |
| "My case is too specific." | The "but" list, three call stories |
| "I don't have time." | 20 minutes, phone or video, 6 a.m. and lunchtime slots, reschedule in one tap |
| "Who is he?" | Daniel block (short) |
| "I'll be judged for being out of shape." | Voice: "we start from where you are, not where you were" |

## Proof plan
Three one-line call stories (Luca, Sam, Tom) [CLIENT] · Daniel's credentials [CLIENT] · true scarcity: six audits a week [CLIENT].

## Page map
`/forge/calendar` — Onyx hero: kicker, headline, sub naming the "buts", CTA → `/book`, scarcity; **the audit card** (what you leave with). Bone: what happens in 20 minutes (three steps with minutes) → three call stories → Daniel (short) → FAQ (4) → Onyx close with CTA. Sticky CTA.
`/forge/calendar/book` — Cal.com embed, "last step", what to have ready (your last two weeks of training in one line each, any injury, your equipment).
`/forge/calendar/confirmed` — prep checklist, SessionPlanner preset, "reschedule from the invite".

## Events
`cta_click`, `booking_started`, `booking_confirmed`.

## Emails (Cal.com webhook, shared endpoint `/api/webhooks/cal?client=forge`)
Prep on booking · 1-hour reminder · cancellation with rebook link. Copy in COPY.md.

## Open client inputs
Cal.com link and webhook secret · confirm six audits a week · three real call stories · coaching offer for the call script.
