import { NextResponse } from "next/server";
import { verifyMailer } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/** Verifies the SMTP connection/credentials (port 587 STARTTLS). */
export async function GET() {
  try {
    await verifyMailer();
    return NextResponse.json({ ok: true, transport: "smtp", port: 587 });
  } catch (e) {
    // Log details server-side; keep the public response free of host/credential hints.
    console.error("[health/mail] SMTP verify failed:", (e as Error).message);
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
