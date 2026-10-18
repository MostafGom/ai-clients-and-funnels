import type { APIContext } from 'astro';

/** Parse JSON or form bodies into a flat string record. */
export async function readBody(request: Request): Promise<Record<string, string>> {
  const all = await readBodyAll(request);
  return Object.fromEntries(Object.entries(all).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : v]));
}

/** Like readBody but keeps repeated fields (checkbox groups) as arrays. */
export async function readBodyAll(request: Request): Promise<Record<string, string | string[]>> {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const j = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(j).map(([k, v]) => [k, Array.isArray(v) ? v.map(String) : String(v ?? '')]));
  }
  const fd = await request.formData();
  const out: Record<string, string | string[]> = {};
  fd.forEach((v, k) => { const s = typeof v === 'string' ? v : ''; if (k in out) out[k] = ([] as string[]).concat(out[k], s); else out[k] = s; });
  return out;
}

export function wantsJson(request: Request): boolean {
  return (request.headers.get('accept') || '').includes('application/json');
}

/** Only allow same-origin relative paths for redirects. */
export function safePath(p: string | undefined, fallback: string): string {
  if (!p || !p.startsWith('/') || p.startsWith('//')) return fallback;
  return p;
}

export function respond(ctx: APIContext, ok: boolean, redirectTo: string, extra: Record<string, unknown> = {}, status = ok ? 200 : 400) {
  if (wantsJson(ctx.request)) {
    return new Response(JSON.stringify({ ok, redirect: redirectTo, ...extra }), { status, headers: { 'content-type': 'application/json' } });
  }
  return ctx.redirect(redirectTo, 303);
}

export function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

/**
 * Runtime env (Cloudflare bindings + secrets, e.g. STRIPE_PRICE_<CLIENT>_<KEY>).
 * Astro ≥6 removed `locals.runtime.env`; the Workers runtime exposes it via `cloudflare:workers`.
 * Falls back to import.meta.env when that module isn't available (plain node tooling).
 */
export async function runtimeEnv(_ctx?: APIContext): Promise<Record<string, unknown>> {
  try {
    const m = await import('cloudflare:workers');
    return (m.env ?? {}) as Record<string, unknown>;
  } catch {
    return import.meta.env as unknown as Record<string, unknown>;
  }
}
