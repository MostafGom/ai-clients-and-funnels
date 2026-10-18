# Funnel plan — lumen / calendar (sell the call → book → confirmed)

## Traffic & stage
- Source: **warm.** Ebook thanks page, nurture emails, the guide's page 12, Instagram bio for "book a call", referrals from parents in the community.
- Awareness: **solution-aware with a "but".** They have the Reset or know of it; their nights have a complication (twins, reflux, daycare, a sibling, travel, two kids). They want a human to look at their specific situation before they commit to anything.
- What the call sells (on the call, not on the page): 4-week 1:1 coaching at $1,200 [CLIENT] for complicated cases; the $497 method for everyone else. The page sells **the call**, and only the call.

## Big idea
**Twenty minutes, one plan for your baby.** The call is a working session with an output (a written plan for tonight), not a sales conversation. The page makes the output tangible: a filled-in "plan card" the visitor can picture leaving with.

## Objection map → section
| Objection | Answered |
|---|---|
| "It's a sales call." | Hero sub + "what happens in 20 minutes" + FAQ 1 (one sentence about coaching, if it fits) |
| "My situation is too specific for a free call." | The "but" list in the hero; the three call stories |
| "I don't have time / nap times are chaos." | 20 minutes, phone or video, nap-friendly slots, reschedule in one tap |
| "Who is she?" | Maya block (short; the ebook page carries the long version) |
| "I'll be judged." | Voice: no judgment; "we've heard it all and lived most of it" |

## Proof plan
Three one-line stories from calls (Hannah, Tom & Grace, Ines) [CLIENT] · Maya's credentials [CLIENT] · true scarcity: 8 calls a week [CLIENT confirm].

## Page map & copy jobs
`/lumen/calendar` — night hero: kicker, headline, sub naming the "buts", CTA → `/book`, scarcity line; the **plan card** illustration (what you leave with). Paper: "what happens in 20 minutes" as a three-step timeline with minutes → three call stories → Maya (short) → FAQ (4) → night close with CTA. Sticky CTA on mobile.
`/lumen/calendar/book` — Cal.com inline embed, "step 2 of 2", one-line expectation, what to have ready (a 3-night log).
`/lumen/calendar/confirmed` — what's next: prep checklist (3 nights of log, one question), the bedtime dial preset for tonight, add-to-calendar handled by Cal.com, "reschedule from the invite".

## Events
`cta_click` (hero/close/sticky), `booking_started` (embed loaded), `booking_confirmed` (Cal.com event → redirect to confirmed).

## Emails
Cal.com sends the invite and its own reminders. Our side, via `/api/webhooks/cal` on `BOOKING_CREATED`: the **prep email** immediately (what to log, the one question) and a **1-hour-before reminder** (scheduled from the booking start time, Resend `scheduledAt`). On `BOOKING_CANCELLED`: a one-line "rebook when you're ready" email. [CLIENT: add the webhook URL in Cal.com → Developer → Webhooks.]

## Open client inputs
Cal.com link and webhook secret · confirm 8 calls/week · three real call stories · exact coaching offer and price for the call script.
