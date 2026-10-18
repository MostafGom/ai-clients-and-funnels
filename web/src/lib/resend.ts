import { Resend } from 'resend';
import { RESEND_API_KEY, RESEND_FROM } from 'astro:env/server';

export function getResend(): Resend | null {
  if (!RESEND_API_KEY) return null;
  return new Resend(RESEND_API_KEY);
}

export interface SendArgs { to: string; subject: string; html: string; replyTo?: string; /** ISO date or natural language ('in 2 days'); Resend schedules up to 30 days out. */ scheduledAt?: string; text?: string }

export async function sendEmail(args: SendArgs): Promise<{ ok: boolean; id?: string; error?: string }> {
  const resend = getResend();
  if (!resend || !RESEND_FROM) return { ok: false, error: 'Resend not configured' };
  const { data, error } = await resend.emails.send({ from: RESEND_FROM, ...args });
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}

export async function addContact(audienceId: string, email: string, firstName?: string) {
  const resend = getResend();
  if (!resend) return;
  await resend.contacts.create({ audienceId, email, firstName, unsubscribed: false }).catch(() => {});
}

/** Send a sequence: each step has a delay in hours from now. Returns ids (or errors) per step. */
export async function sendSequence(to: string, steps: { subject: string; html: string; text?: string; delayHours: number; replyTo?: string }[]) {
  const out = [];
  for (const st of steps) {
    const when = new Date(Date.now() + st.delayHours * 3_600_000).toISOString();
    out.push(await sendEmail({ to, subject: st.subject, html: st.html, text: st.text, replyTo: st.replyTo, scheduledAt: st.delayHours > 0 ? when : undefined }));
  }
  return out;
}

/** Minimal, inbox-safe HTML wrapper for transactional emails. */
export function emailShell(opts: { brand: string; heading: string; body: string; cta?: { label: string; href: string }; footer: string }) {
  const cta = opts.cta
    ? `<p style="margin:28px 0"><a href="${opts.cta.href}" style="background:#111;color:#fff;text-decoration:none;padding:14px 22px;border-radius:10px;font-weight:600;display:inline-block">${opts.cta.label}</a></p>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#f6f6f4;font-family:-apple-system,Segoe UI,Inter,sans-serif;color:#1a1a1a">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px">
    <p style="font-weight:700;letter-spacing:.02em;color:#555;font-size:13px;text-transform:uppercase">${opts.brand}</p>
    <h1 style="font-size:26px;line-height:1.2;margin:12px 0 20px">${opts.heading}</h1>
    <div style="font-size:16px;line-height:1.6">${opts.body}</div>${cta}
    <p style="font-size:12px;color:#777;line-height:1.5;margin-top:40px">${opts.footer}</p>
  </div></body></html>`;
}
