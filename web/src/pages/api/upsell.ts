import type { APIRoute } from 'astro';
import { getClient } from '../../lib/clients';
import { getStripe, resolvePrice } from '../../lib/stripe';
import { readBody, safePath, runtimeEnv } from './_utils';

export const prerender = false;

/** One-click charge of the payment method saved during Checkout. */
export const POST: APIRoute = async (ctx) => {
  const body = await readBody(ctx.request);
  const next = safePath(body.next, '/');
  const decline = safePath(body.decline, '/');
  const back = new URL(ctx.request.headers.get('referer') || decline, ctx.url.origin);
  try {
    const client = getClient(body.client);
    const stripe = getStripe();
    if (!body.session_id) throw new Error('missing session_id');

    const session = await stripe.checkout.sessions.retrieve(body.session_id, { expand: ['payment_intent'] });
    const pi = session.payment_intent;
    if (!pi || typeof pi === 'string') throw new Error('no payment intent on session');
    const customer = typeof session.customer === 'string' ? session.customer : session.customer?.id;
    const paymentMethod = typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method?.id;
    if (!customer || !paymentMethod) throw new Error('no saved payment method');

    const priceId = resolvePrice(runtimeEnv(ctx), client.slug, body.price);
    const price = await stripe.prices.retrieve(priceId);
    if (!price.unit_amount) throw new Error('price has no unit_amount');

    await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: price.currency,
      customer,
      payment_method: paymentMethod,
      off_session: true,
      confirm: true,
      description: `${client.name} — ${body.kind} (${body.price})`,
      metadata: { client: client.slug, funnel: body.funnel || '', kind: body.kind || '', price: priceId, parent_session: session.id },
    });
    return ctx.redirect(next, 303);
  } catch (err) {
    console.error('[upsell]', err);
    back.searchParams.set('error', 'payment');
    return ctx.redirect(back.pathname + back.search, 303);
  }
};
