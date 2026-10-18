/** Forge · Strength Audit application emails. Copy: clients/forge/funnels/vsl-call/COPY.md */
import { emailShell } from '../../lib/resend';
const BRAND = 'Forge Fitness Online';
const FOOT = 'You applied for a Strength Audit with Forge Fitness Online. Reply to reach Daniel directly.';
const BUT: Record<string, string> = { back: 'old back', joint: 'shoulder or knee', travel: 'travels 2+ weeks a month', new: 'never lifted', none: 'no complication' };
export function applicationReceived(origin: string, lead: { name?: string }) {
  return [{ delayHours: 0, subject: 'Got it. Daniel’s reading your application.', html: emailShell({ brand: BRAND, heading: `Thanks${lead.name ? `, ${lead.name}` : ''}. Your application is with Daniel.`, body: `<p>If you haven’t picked a time yet, the calendar is below. Before the audit, write your last two weeks of training, one line each. “None” is fine.</p><p>— Daniel</p>`, cta: { label: 'Pick a time', href: new URL('/forge/vsl-call/book', origin).toString() }, footer: FOOT }) }];
}
export function applicationBrief(fields: Record<string, string | string[]>) {
  const buts = ([] as string[]).concat(fields.but ?? []).map((b) => BUT[b] ?? b).join(', ') || '—';
  const rows = ['age', 'but', 'back_seen', 'joint_seen', 'travel_weeks', 'recent', 'kit', 'hours', 'name', 'email', 'best_time'].map((k) => `<tr><td style="padding:4px 10px 4px 0;color:#777">${k}</td><td style="padding:4px 0"><strong>${([] as string[]).concat(fields[k] ?? '—').join(', ')}</strong></td></tr>`).join('');
  return { subject: `Strength Audit application: ${fields.name || '?'}, ${fields.age || '?'}, ${buts}`, html: `<div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;font-size:15px"><p>New application from the vsl-call funnel.</p><table>${rows}</table></div>` };
}
