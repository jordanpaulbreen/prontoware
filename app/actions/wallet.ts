"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function topUpAction(_prev: { ok: boolean; error?: string }, formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Please log in" };

  const amount = Number(formData.get("amount"));
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1000) {
    return { ok: false, error: "Enter an amount between 1 and 1000" };
  }
  const cents = Math.round(amount * 100);

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { balanceCents: { increment: cents } } }),
    prisma.ledgerEntry.create({
      data: { userId: user.id, kind: "topup", amountCents: cents, note: "Wallet top-up" },
    }),
  ]);

  revalidatePath("/account/wallet");
  return { ok: true };
}
