import type { APIRoute } from 'astro';
import { getClient } from '../../../lib/clients';
import { sendEmail } from '../../../lib/resend';
import { runtimeEnv } from '../_utils';
import * as lumenCal from '../../../emails/lumen/calendar';
import * as forgeCal from '../../../emails/forge/calendar';

export const prerender = false;

/**
 * Cal.com → us. Add `https://<site>/api/webhooks/cal?client=lumen` in Cal.com (Settings → Developer → Webhooks)
 * for BOOKING_CREATED and BOOKING_CANCELLED, with secret CAL_WEBHOOK_SECRET_<CLIENT>.
 * Cal.com signs the raw body with HMAC-SHA256 in `x-cal-signature-256`.
 */
const EMAILS: Record<string, typeof lumenCal> = { lumen: lumenCal, forge: forgeCal };

async function verify(secret: string, body: string, sig: string | null): Promise<boolean> {
  if (!sig) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(body));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex === sig.toLowerCase();
}

export const POST: APIRoute = async (ctx) => {
  const slug = ctx.url.searchParams.get('client') || '';
  let client; try { client = getClient(slug); } catch { return new Response('unknown client', { status: 400 }); }
  const emails = EMAILS[slug];
  if (!emails) return new Response('no emails for client', { status: 200 });
  const env = await runtimeEnv(ctx);
  const secret = env[`CAL_WEBHOOK_SECRET_${slug.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`];
  const raw = await ctx.request.text();
  if (typeof secret === 'string' && secret && !(await verify(secret, raw, ctx.request.headers.get('x-cal-signature-256')))) return new Response('bad signature', { status: 401 });

  const evt = JSON.parse(raw) as { triggerEvent: string; payload: { startTime?: string; attendees?: { email: string; name?: string; timeZone?: string }[]; rescheduleLink?: string; videoCallData?: { url?: string }; metadata?: { videoCallUrl?: string } } };
  const attendee = evt.payload?.attendees?.[0];
  if (!attendee?.email) return new Response('no attendee', { status: 200 });
  const origin = ctx.url.origin;

  if (evt.triggerEvent === 'BOOKING_CREATED') {
    const start = evt.payload.startTime ? new Date(evt.payload.startTime) : null;
    const whenText = start ? start.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: attendee.timeZone || 'UTC' }) : 'your call';
    await sendEmail({ to: attendee.email, replyTo: client.supportEmail, ...emails.prepEmail(whenText, evt.payload.rescheduleLink) });
    if (start && start.getTime() - Date.now() > 65 * 60_000) {
      const at = new Date(start.getTime() - 60 * 60_000).toISOString();
      await sendEmail({ to: attendee.email, replyTo: client.supportEmail, scheduledAt: at, ...emails.reminderEmail(evt.payload.videoCallData?.url || evt.payload.metadata?.videoCallUrl) });
    }
  }
  if (evt.triggerEvent === 'BOOKING_CANCELLED') {
    await sendEmail({ to: attendee.email, replyTo: client.supportEmail, ...emails.cancelledEmail(new URL(`/${slug}/calendar/book`, origin).toString()) });
  }
  return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json' } });
};
