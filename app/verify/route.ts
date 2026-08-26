import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { brand } from "@/lib/brand";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.redirect(new URL("/account?verify=invalid", brand.url));

  const record = await prisma.token.findUnique({ where: { id: token } }).catch(() => null);
  if (!record || record.kind !== "verify" || record.expiresAt < new Date()) {
    return NextResponse.redirect(new URL("/account?verify=invalid", req.url));
  }
  await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: new Date() } });
  await prisma.token.delete({ where: { id: record.id } });
  return NextResponse.redirect(new URL("/account?verify=success", req.url));
}
