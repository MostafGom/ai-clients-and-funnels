import type { APIContext } from 'astro';

/** Parse JSON or form bodies into a flat string record. */
export async function readBody(request: Request): Promise<Record<string, string>> {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const j = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(j).map(([k, v]) => [k, String(v ?? '')]));
  }
  const fd = await request.formData();
  const out: Record<string, string> = {};
  fd.forEach((v, k) => (out[k] = typeof v === 'string' ? v : ''));
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

/** Runtime env (Cloudflare bindings + secrets) with a safe fallback for `astro dev`. */
export function runtimeEnv(ctx: APIContext): Record<string, unknown> {
  return (ctx.locals as any)?.runtime?.env ?? (import.meta.env as Record<string, unknown>);
}
