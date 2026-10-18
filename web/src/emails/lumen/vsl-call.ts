/** Lumen · vsl-call application emails. Copy: clients/lumen/funnels/vsl-call/COPY.md */
import { emailShell } from '../../lib/resend';
const BRAND = 'Lumen Sleep';
const FOOT = 'You applied for a Sleep Clarity Call with Lumen Sleep. Reply to reach Maya directly.';
const BUT: Record<string, string> = { twins: 'twins', reflux: 'reflux', daycare: 'daycare', sibling: 'sibling in the room', travel: 'travel soon', none: 'no complication' };

export function applicationReceived(origin: string, lead: { name?: string }) {
  return [{ delayHours: 0, subject: 'Got it. Maya’s reading your application.', html: emailShell({ brand: BRAND, heading: `Thanks${lead.name ? `, ${lead.name}` : ''}. Your application is with Maya.`, body: `<p>If you haven’t picked a time yet, the calendar is below. Before the call, log the next three nights in one line each: bedtime, asleep by, every waking.</p><p>— Maya</p>`, cta: { label: 'Pick a time', href: new URL('/lumen/vsl-call/book', origin).toString() }, footer: FOOT }) }];
}

/** Internal brief to Maya. `to` comes from the client registry's supportEmail until a dedicated inbox exists. */
export function applicationBrief(fields: Record<string, string | string[]>) {
  const buts = ([] as string[]).concat(fields.but ?? []).map((b) => BUT[b] ?? b).join(', ') || '—';
  const rows = ['age', 'but', 'twins_room', 'daycare_days', 'bedtime', 'wakings', 'tried', 'name', 'email', 'best_time'].map((k) => `<tr><td style="padding:4px 10px 4px 0;color:#777">${k}</td><td style="padding:4px 0"><strong>${([] as string[]).concat(fields[k] ?? '—').join(', ')}</strong></td></tr>`).join('');
  return { subject: `Clarity Call application: ${fields.name || '?'}, ${fields.age || '?'}, ${buts}`, html: `<div style="font-family:-apple-system,Segoe UI,Inter,sans-serif;font-size:15px"><p>New application from the vsl-call funnel.</p><table>${rows}</table></div>` };
}
