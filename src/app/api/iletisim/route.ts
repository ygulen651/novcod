import { NextResponse } from "next/server";
import { validateContact, type ContactValues } from "@/lib/contact";

/** CONTACT_WEBHOOK_URL tanımlı değilse form bu adrese istek göndermez, e-posta akışını kullanır. */
export async function POST(request: Request) {
  const target = process.env.CONTACT_WEBHOOK_URL;
  if (!target) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const data = (await request.json().catch(() => null)) as (ContactValues & { website?: string }) | null;
  if (!data) return NextResponse.json({ error: "invalid" }, { status: 400 });
  if (data.website) return NextResponse.json({ ok: true });

  const values: ContactValues = {
    name: String(data.name ?? ""),
    subject: String(data.subject ?? ""),
    phone: String(data.phone ?? ""),
    email: String(data.email ?? ""),
    message: String(data.message ?? ""),
  };
  const errors = validateContact(values);
  if (Object.keys(errors).length) return NextResponse.json({ error: "invalid", errors }, { status: 422 });

  const forwarded = await fetch(target, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(values),
  }).catch(() => null);

  if (!forwarded?.ok) return NextResponse.json({ error: "upstream" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
