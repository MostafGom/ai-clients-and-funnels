/** Lumen · calendar funnel emails, sent from the Cal.com webhook. Copy: clients/lumen/funnels/calendar/COPY.md */
import { emailShell } from '../../lib/resend';
const BRAND = 'Lumen Sleep';
const FOOT = 'You booked a Sleep Clarity Call with Lumen Sleep. Reply to reach Maya directly.';
const sign = '<p>— Maya</p>';

export function prepEmail(whenText: string, rescheduleUrl?: string) {
  return { subject: 'Your Clarity Call is booked. Two things before it.', html: emailShell({ brand: BRAND, heading: `See you on ${whenText}. Here’s the prep.`, body: `<p>Hi, it’s Maya. Thanks for booking. I read these before every call so we start with answers, not questions.</p><p>Before we talk:</p><ol><li>Log the next three nights, one line each: bedtime, asleep by, every waking.</li><li>Write down the one thing you’d most like to be different by next week.</li></ol><p>Reply to this email with both and I’ll have a draft plan ready when we start.${rescheduleUrl ? ` If nap time moves, <a href="${rescheduleUrl}">reschedule here</a>.` : ' If nap time moves, reschedule from the invite.'}</p>${sign}`, footer: FOOT }) };
}
export function reminderEmail(joinUrl?: string) {
  return { subject: 'Your call with Maya is in an hour', html: emailShell({ brand: BRAND, heading: 'Grab your log and a cup of something.', body: `<p>See you in an hour. Have your three-night log and your one question nearby. ${joinUrl ? `<a href="${joinUrl}">Here’s the link.</a>` : 'The link is in your calendar invite.'}</p><p>If today fell apart, reschedule from the invite, no need to explain.</p>${sign}`, footer: FOOT }) };
}
export function cancelledEmail(bookUrl: string) {
  return { subject: 'No problem. Rebook when the nights allow.', html: emailShell({ brand: BRAND, heading: 'The link is here whenever you’re ready.', body: `<p>Your call is cancelled, no questions asked. When you’re ready, the calendar is below. And if you’d rather not talk at all, the free Reset is still the best place to start.</p>${sign}`, cta: { label: 'Pick a new time', href: bookUrl }, footer: FOOT }) };
}
