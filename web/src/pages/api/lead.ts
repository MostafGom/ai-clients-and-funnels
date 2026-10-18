import type { APIRoute } from 'astro';
import { getClient } from '../../lib/clients';
import { sendEmail, sendSequence, addContact, emailShell } from '../../lib/resend';
import { LEAD_SEQUENCES, INTERNAL_NOTIFY } from '../../emails';
import { readBody, readBodyAll, respond, safePath, isEmail } from './_utils';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const all = await readBodyAll(ctx.request);
  const body = Object.fromEntries(Object.entries(all).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v])) as Record<string, string>;
  const email = (body.email || '').trim().toLowerCase();
  const name = (body.name || '').trim();
  const redirect = safePath(body.redirect, '/');

  // Honeypot: bots fill the hidden "website" field.
  if (body.website) return respond(ctx, true, redirect);
  if (!isEmail(email)) return respond(ctx, false, redirect, { error: 'Please enter a valid email.' });

  let client;
  try { client = getClient(body.client); } catch { return respond(ctx, false, redirect, { error: 'Unknown client' }); }

  const magnet = client.leadMagnet;
  const origin = ctx.url.origin;
  const tasks: Promise<unknown>[] = [];

  const sequence = LEAD_SEQUENCES[client.slug]?.[body.funnel];
  if (sequence) {
    tasks.push(sendSequence(email, sequence(origin, { email, name: name || undefined, age: body.age || undefined, kit: body.kit || undefined }).map((s) => ({ ...s, replyTo: client.supportEmail }))));
  } else if (body.funnel === 'ebook' && magnet) {
    tasks.push(
      sendEmail({
        to: email,
        subject: `Your copy of ${magnet.title}`,
        replyTo: client.supportEmail,
        html: emailShell({
          brand: client.name,
          heading: `Here’s ${magnet.title}`,
          body: `<p>${name ? `Hi ${name}, ` : ''}thanks for grabbing the guide. Click below to download it, and keep an eye on your inbox over the next few days for the follow-up.</p>`,
          cta: { label: 'Download the guide', href: new URL(magnet.downloadUrl, origin).toString() },
          footer: `You received this because you requested ${magnet.title} from ${client.name}. Reply to this email with any questions.`,
        }),
      }),
    );
  }
  if (client.resendAudienceId) tasks.push(addContact(client.resendAudienceId, email, name || undefined));
  const notify = INTERNAL_NOTIFY[client.slug]?.[body.funnel];
  if (notify) { const n = notify(all); tasks.push(sendEmail({ to: client.supportEmail, replyTo: email, subject: n.subject, html: n.html })); }

  const results = await Promise.allSettled(tasks);
  const failed = results.find((r) => r.status === 'rejected' || (r.status === 'fulfilled' && (r.value as any)?.ok === false));
  if (failed) console.warn('[lead] delivery issue', failed);

  return respond(ctx, true, redirect);
};
