import { NextResponse } from "next/server";
import { verifyMailer } from "@/lib/mailer";

export const dynamic = "force-dynamic";

/** Verifies the SMTP connection/credentials (port 587 STARTTLS). */
export async function GET() {
  try {
    await verifyMailer();
    return NextResponse.json({ ok: true, transport: "smtp", port: 587 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: (e as Error).message },
      { status: 503 },
    );
  }
}
