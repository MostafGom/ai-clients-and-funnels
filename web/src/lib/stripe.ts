import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from 'astro:env/server';
import { priceEnvName } from './clients';

/** Stripe client for Cloudflare Workers (fetch-based HTTP client). */
export function getStripe(): Stripe {
  if (!STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
  return new Stripe(STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
}

/** Resolve a price id for a client from the runtime env (STRIPE_PRICE_<CLIENT>_<KEY>). */
export function resolvePrice(env: Record<string, unknown>, client: string, key: string): string {
  const name = priceEnvName(client, key);
  const v = env[name];
  if (typeof v !== 'string' || !v) throw new Error(`Missing env ${name}`);
  return v;
}

/** Returns a URL string on the same origin, for success/cancel redirects. */
export function absoluteUrl(origin: string, path: string): string {
  return new URL(path, origin).toString();
}
