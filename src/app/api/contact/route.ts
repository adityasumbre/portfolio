import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * ── How this stays honest ────────────────────────────────────────────────
 * This route ONLY returns { ok: true } after an email provider has accepted
 * the message. If no provider is configured it returns code "not_configured",
 * and the UI switches to a mailto: fallback instead of pretending it worked.
 *
 * ── To enable real email delivery ────────────────────────────────────────
 * 1. Create a free account at https://resend.com and verify a sending domain
 *    (or use their onboarding@resend.dev address for testing).
 * 2. Add these environment variables (locally in .env.local, and in your
 *    Vercel project settings for production):
 *
 *      RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
 *      CONTACT_TO_EMAIL=you@yourdomain.com
 *      CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain.com>
 *
 * That's it — the form starts sending real emails with no code changes.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function asTrimmedString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_json" },
      { status: 400 },
    );
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const subject = asTrimmedString(body.subject, 200);
  const message = asTrimmedString(body.message, 5000);

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (subject.length < 3) errors.subject = "Please add a short subject.";
  if (message.length < 10) errors.message = "Please write a little more detail.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, code: "validation", errors },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // No provider configured — the client falls back to mailto:.
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("Contact email rejected:", response.status, detail);
      return NextResponse.json(
        { ok: false, code: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return NextResponse.json(
      { ok: false, code: "send_failed" },
      { status: 502 },
    );
  }
}
