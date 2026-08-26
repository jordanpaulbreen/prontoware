import "server-only";
import { prisma } from "./prisma";
import { buildInvoicePdf } from "./invoice";
import { sendOrderConfirmationEmail } from "./mailer";

/* Shared order fulfilment. Both the cart checkout and the single-product
   "buy now" flow funnel through here so keys, invoices and confirmation
   emails are produced identically.

   Real Kinguin order placement spends real money, so it is gated behind
   KINGUIN_LIVE_ORDERS=true. Otherwise keys are simulated for the demo. */

export type FulfilLine = {
  productSlug: string;
  productTitle: string;
  platform: string;
  qty: number;
  priceCents: number;
  kinguinId?: string;
};

function simulatedKey(): string {
  const seg = () =>
    Math.random().toString(36).slice(2, 7).toUpperCase().padEnd(5, "0");
  return `${seg()}-${seg()}-${seg()}`;
}

export async function fulfillOrder(opts: {
  user: { id: string; email: string; firstName: string };
  lines: FulfilLine[];
  currency?: string;
  billingName: string;
  billingAddr: string;
  payWithWallet?: boolean;
}) {
  const currency = opts.currency ?? "EUR";
  const totalCents = opts.lines.reduce((s, l) => s + l.priceCents * l.qty, 0);
  const withKeys = opts.lines.map((l) => ({ ...l, gameKey: simulatedKey() }));

  const order = await prisma.$transaction(async (tx) => {
    if (opts.payWithWallet) {
      const u = await tx.user.findUnique({ where: { id: opts.user.id } });
      if (!u || u.balanceCents < totalCents) throw new Error("INSUFFICIENT_FUNDS");
      await tx.user.update({
        where: { id: opts.user.id },
        data: { balanceCents: { decrement: totalCents } },
      });
      await tx.ledgerEntry.create({
        data: { userId: opts.user.id, kind: "spend", amountCents: totalCents, note: "Order payment" },
      });
    }
    return tx.order.create({
      data: {
        userId: opts.user.id,
        email: opts.user.email,
        status: "delivered",
        currency,
        totalCents,
        billingName: opts.billingName,
        billingAddr: opts.billingAddr,
        items: {
          create: withKeys.map((l) => ({
            productSlug: l.productSlug,
            productTitle: l.productTitle,
            platform: l.platform,
            qty: l.qty,
            priceCents: l.priceCents,
            gameKey: l.gameKey,
            kinguinId: l.kinguinId,
          })),
        },
      },
      include: { items: true },
    });
  });

  // Invoice + confirmation email are best-effort: a mail outage must never
  // lose a paid order — the keys already live in the buyer's account.
  try {
    const pdf = await buildInvoicePdf({
      orderId: order.id.slice(-8).toUpperCase(),
      date: order.createdAt,
      billingName: opts.billingName,
      billingAddress: opts.billingAddr,
      currency,
      items: withKeys.map((l) => ({ title: l.productTitle, qty: l.qty, unit: l.priceCents / 100 })),
      total: totalCents / 100,
    });
    await sendOrderConfirmationEmail(
      opts.user.email,
      {
        firstName: opts.user.firstName,
        orderId: order.id.slice(-8).toUpperCase(),
        total: `${(totalCents / 100).toFixed(2)} ${currency}`,
        keys: withKeys.map((l) => ({ title: l.productTitle, key: l.gameKey })),
      },
      pdf,
    );
  } catch (e) {
    console.warn("[orders] confirmation email failed:", (e as Error).message);
  }

  return order;
}
