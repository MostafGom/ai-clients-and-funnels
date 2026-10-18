/** Forge · Strength Audit emails, sent from the Cal.com webhook. Copy: clients/forge/funnels/calendar/COPY.md */
import { emailShell } from '../../lib/resend';
const BRAND = 'Forge Fitness Online';
const FOOT = 'You booked a Strength Audit with Forge Fitness Online. Reply to reach Daniel directly.';
const sign = '<p>— Daniel</p>';
export function prepEmail(whenText: string, rescheduleUrl?: string) {
  return { subject: 'Your Strength Audit is booked. Two things before it.', html: emailShell({ brand: BRAND, heading: `See you on ${whenText}.`, body: `<p>It’s Daniel. Thanks for booking. I read these before every audit so we start with a plan, not a questionnaire.</p><p>Before we talk:</p><ol><li>Your last two weeks of training, one line each. “None” is fine.</li><li>Anything that hurts, and what you’ve been told about it.</li><li>Your equipment and the hours you actually have.</li></ol><p>Reply with those and I’ll have a draft ready when we start.${rescheduleUrl ? ` If work moves, <a href="${rescheduleUrl}">reschedule here</a>.` : ' If work moves, reschedule from the invite.'}</p>${sign}`, footer: FOOT }) };
}
export function reminderEmail(joinUrl?: string) {
  return { subject: 'Your audit with Daniel is in an hour', html: emailShell({ brand: BRAND, heading: 'Have your two weeks and your equipment list nearby.', body: `<p>See you in an hour. ${joinUrl ? `<a href="${joinUrl}">Here’s the link.</a>` : 'The link is in your calendar invite.'}</p><p>If today fell apart, reschedule from the invite, no need to explain.</p>${sign}`, footer: FOOT }) };
}
export function cancelledEmail(bookUrl: string) {
  return { subject: 'No problem. Rebook when the week allows.', html: emailShell({ brand: BRAND, heading: 'The calendar is here when you’re ready.', body: `<p>Your audit is cancelled, no questions asked. When you’re ready, the calendar is below. And if you’d rather start on your own, the 3-Session Week is still the right first step.</p>${sign}`, cta: { label: 'Pick a new time', href: bookUrl }, footer: FOOT }) };
}
