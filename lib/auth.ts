import "server-only";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { auth as authConfig } from "./config";
import { prisma } from "./prisma";

const SESSION_COOKIE = "pw_session";
const secret = new TextEncoder().encode(authConfig.sessionSecret);
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function hashPassword(plain: string) {
  return bcrypt.hash(plain, 12);
}

export function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

async function signToken(userId: string) {
  return new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secret);
}

export async function startSession(userId: string) {
  const token = await signToken(userId);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Returns the signed-in user (without passwordHash) or null. Never throws. */
export async function getCurrentUser() {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, secret);
    const uid = payload.uid as string | undefined;
    if (!uid) return null;
    const user = await prisma.user.findUnique({ where: { id: uid } });
    if (!user) return null;
    const { passwordHash: _omit, ...safe } = user;
    return safe;
  } catch {
    return null;
  }
}

export type SessionUser = NonNullable<Awaited<ReturnType<typeof getCurrentUser>>>;
