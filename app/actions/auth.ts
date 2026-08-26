"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, startSession, endSession } from "@/lib/auth";
import { registerSchema, loginSchema, forgotSchema, resetSchema } from "@/lib/validation";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "@/lib/mailer";
import { brand } from "@/lib/brand";

export type ActionState = { ok: boolean; error?: string; fieldErrors?: Record<string, string> };

function zodErrors(issues: readonly { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const i of issues) fieldErrors[String(i.path[0])] = i.message;
  return fieldErrors;
}

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = registerSchema.safeParse({ ...raw, acceptTerms: raw.acceptTerms === "on" || raw.acceptTerms === "true" });
  if (!parsed.success) return { ok: false, fieldErrors: zodErrors(parsed.error.issues) };
  const d = parsed.data;

  const exists = await prisma.user.findUnique({ where: { email: d.email.toLowerCase() } });
  if (exists) return { ok: false, fieldErrors: { email: "This email is already registered" } };

  const user = await prisma.user.create({
    data: {
      email: d.email.toLowerCase(),
      passwordHash: await hashPassword(d.password),
      firstName: d.firstName,
      lastName: d.lastName,
      phone: d.phone,
      dateOfBirth: new Date(d.dateOfBirth),
      street: d.street,
      city: d.city,
      country: d.country,
      postcode: d.postcode,
    },
  });

  const token = await prisma.token.create({
    data: { userId: user.id, kind: "verify", expiresAt: new Date(Date.now() + 24 * 3600 * 1000) },
  });
  const url = `${brand.url}/verify?token=${token.id}`;
  try {
    await sendVerificationEmail(user.email, user.firstName, url);
  } catch (e) {
    console.warn("[register] verification email failed:", (e as Error).message);
  }

  await startSession(user.id);
  return { ok: true };
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Enter your email and password" };
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { ok: false, error: "Invalid email or password" };
  }
  await startSession(user.id);
  return { ok: true };
}

export async function logoutAction() {
  await endSession();
  redirect("/");
}

export async function forgotAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = forgotSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: "Enter a valid email" };
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  // Always report success to avoid leaking which emails exist.
  if (user) {
    const token = await prisma.token.create({
      data: { userId: user.id, kind: "reset", expiresAt: new Date(Date.now() + 3600 * 1000) },
    });
    try {
      await sendPasswordResetEmail(user.email, user.firstName, `${brand.url}/reset-password?token=${token.id}`);
    } catch (e) {
      console.warn("[forgot] reset email failed:", (e as Error).message);
    }
  }
  return { ok: true };
}

export async function resetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = resetSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, fieldErrors: zodErrors(parsed.error.issues) };
  const token = await prisma.token.findUnique({ where: { id: parsed.data.token } });
  if (!token || token.kind !== "reset" || token.expiresAt < new Date()) {
    return { ok: false, error: "This reset link is invalid or has expired" };
  }
  await prisma.user.update({
    where: { id: token.userId },
    data: { passwordHash: await hashPassword(parsed.data.password) },
  });
  await prisma.token.delete({ where: { id: token.id } });
  return { ok: true };
}
