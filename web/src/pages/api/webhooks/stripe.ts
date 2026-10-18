import type { APIRoute } from 'astro';
import { STRIPE_WEBHOOK_SECRET } from 'astro:env/server';
import { getStripe } from '../../../lib/stripe';
import { getClient } from '../../../lib/clients';
import { sendEmail, sendSequence, emailShell } from '../../../lib/resend';
import * as lumenCheckout from '../../../emails/lumen/checkout';
import * as forgeCheckout from '../../../emails/forge/checkout';

/** Per-client email sequences keyed by slug. Add new clients here. */
const SEQUENCES: Record<string, { onboarding: (origin: string) => any[]; abandoned: (origin: string) => any[] }> = {
  lumen: { onboarding: lumenCheckout.onboarding, abandoned: lumenCheckout.abandonedCheckout },
  forge: { onboarding: forgeCheckout.onboarding, abandoned: forgeCheckout.abandonedCheckout },
};

export const prerender = false;

/**
 * Stripe → us. Register the endpoint URL in the Stripe dashboard for
 * `checkout.session.completed` and `payment_intent.succeeded`.
 */
export const POST: APIRoute = async ({ request, url }) => {
  if (!STRIPE_WEBHOOK_SECRET) return new Response('webhook secret not configured', { status: 500 });
  const sig = request.headers.get('stripe-signature');
  if (!sig) return new Response('missing signature', { status: 400 });
  const stripe = getStripe();
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(await request.text(), sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response(`invalid signature: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const slug = s.metadata?.client;
    const email = s.customer_details?.email;
    if (slug && email) {
      const client = getClient(slug);
      const seq = SEQUENCES[slug];
      if (seq) { await sendSequence(email, seq.onboarding(url.origin).map((e) => ({ ...e, replyTo: client.supportEmail }))); }
      else await sendEmail({
        to: email,
        subject: `Your order with ${client.name} is confirmed`,
        replyTo: client.supportEmail,
        html: emailShell({
          brand: client.name,
          heading: 'Order confirmed',
          body: `<p>Thank you. Your payment was received and you’ll get access details shortly.</p>`,
          footer: `Questions? Reply to this email or write to ${client.supportEmail}.`,
        }),
      });
    }
  }
  if (event.type === 'checkout.session.expired') {
    const s = event.data.object;
    const slug = s.metadata?.client;
    const email = s.customer_details?.email;
    const seq = slug && SEQUENCES[slug];
    if (seq && email) {
      const client = getClient(slug);
      await sendSequence(email, seq.abandoned(url.origin).map((e) => ({ ...e, replyTo: client.supportEmail })));
    }
  }
  return new Response(JSON.stringify({ received: true }), { headers: { 'content-type': 'application/json' } });
};
