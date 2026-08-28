"use server";

import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import { brand } from "@/lib/brand";

export type ContactState = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

const contactSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Required"),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)"),
});

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] = i.message;
    return { ok: false, fieldErrors };
  }
  const d = parsed.data;

  try {
    await sendMail({
      to: brand.supportEmail,
      subject: `Contact form: ${d.subject}`,
      html: `<p><strong>From:</strong> ${escapeHtml(d.name)} &lt;${escapeHtml(d.email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(d.subject)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(d.message)}</p>`,
    });
  } catch (e) {
    console.warn("[contact] send failed:", (e as Error).message);
    return { ok: false, error: "We couldn't send your message right now. Please email us directly." };
  }

  return { ok: true };
}
