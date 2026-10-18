import type { APIRoute } from 'astro';
import { getClient } from '../../lib/clients';
import { getStripe, resolvePrice, absoluteUrl } from '../../lib/stripe';
import { readBody, safePath, runtimeEnv } from './_utils';

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const body = await readBody(ctx.request);
  const cancel = safePath(body.cancel, '/');
  try {
    const client = getClient(body.client);
    const env = runtimeEnv(ctx);
    const stripe = getStripe();
    const success = safePath(body.success, `/${client.slug}`);

    const line_items = [{ price: resolvePrice(env, client.slug, body.price || 'main'), quantity: 1 }];
    if (body.bump) line_items.push({ price: resolvePrice(env, client.slug, body.bump), quantity: 1 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      customer_creation: 'always',
      // Save the card so upsell/downsell pages can charge it with one click.
      payment_intent_data: { setup_future_usage: 'off_session', metadata: { client: client.slug, funnel: body.funnel || '' } },
      allow_promotion_codes: true,
      success_url: absoluteUrl(ctx.url.origin, success) + '?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: absoluteUrl(ctx.url.origin, cancel),
      metadata: { client: client.slug, funnel: body.funnel || '', bump: body.bump || '' },
    });
    return ctx.redirect(session.url!, 303);
  } catch (err) {
    console.error('[checkout]', err);
    const u = new URL(cancel, ctx.url.origin);
    u.searchParams.set('error', 'checkout');
    return ctx.redirect(u.pathname + u.search, 303);
  }
};
