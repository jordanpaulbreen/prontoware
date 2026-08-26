"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { games, platforms } from "@/lib/data";
import { fulfillOrder } from "@/lib/orders";

export type CheckoutState = { ok: boolean; error?: string; orderId?: string };

function billingFrom(user: {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
}) {
  return {
    name: `${user.firstName} ${user.lastName}`.trim(),
    addr: [user.street, `${user.postcode} ${user.city}`.trim(), user.country]
      .filter(Boolean)
      .join("\n"),
  };
}

/** Cart checkout — pays from wallet or simulated card, delivers keys + invoice. */
export async function checkoutAction(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Please log in to complete your purchase." };

  if (formData.get("acceptTerms") !== "on") {
    return { ok: false, error: "Please accept the Terms & Refund Policy to continue." };
  }

  let items: { slug: string; qty: number }[] = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { ok: false, error: "Your cart could not be read. Please try again." };
  }
  if (items.length === 0) return { ok: false, error: "Your cart is empty." };

  const lines = items
    .map(({ slug, qty }) => {
      const g = games.find((x) => x.slug === slug);
      if (!g) return null;
      return {
        productSlug: g.slug,
        productTitle: g.title,
        platform: platforms[g.platform].name,
        qty: Math.max(1, qty),
        priceCents: Math.round(g.price * 100),
      };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  if (lines.length === 0) return { ok: false, error: "Your cart is empty." };

  const payWithWallet = formData.get("payment") === "wallet";
  const billing = billingFrom(user);

  try {
    const order = await fulfillOrder({
      user: { id: user.id, email: user.email, firstName: user.firstName },
      lines,
      billingName: billing.name,
      billingAddr: billing.addr,
      payWithWallet,
    });
    revalidatePath("/account/orders");
    revalidatePath("/account/wallet");
    return { ok: true, orderId: order.id };
  } catch (e) {
    if ((e as Error).message === "INSUFFICIENT_FUNDS") {
      return { ok: false, error: "Not enough wallet balance. Top up or pay by card." };
    }
    return { ok: false, error: "We couldn't complete your order. Please try again." };
  }
}

/** Single-product buy — used on Kinguin product pages. */
export async function buyProductAction(
  _prev: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Please log in to buy this key." };

  if (formData.get("acceptTerms") !== "on") {
    return { ok: false, error: "Please accept the Terms & Refund Policy to continue." };
  }

  const priceCents = Math.round(Number(formData.get("priceCents")) || 0);
  const title = String(formData.get("title") ?? "").slice(0, 200);
  const platform = String(formData.get("platform") ?? "Steam").slice(0, 40);
  const kinguinId = String(formData.get("kinguinId") ?? "") || undefined;
  const slug = String(formData.get("slug") ?? kinguinId ?? "product");

  if (!title || priceCents <= 0) return { ok: false, error: "This product is unavailable." };

  const payWithWallet = formData.get("payment") === "wallet";
  const billing = billingFrom(user);

  try {
    const order = await fulfillOrder({
      user: { id: user.id, email: user.email, firstName: user.firstName },
      lines: [{ productSlug: slug, productTitle: title, platform, qty: 1, priceCents, kinguinId }],
      billingName: billing.name,
      billingAddr: billing.addr,
      payWithWallet,
    });
    revalidatePath("/account/orders");
    revalidatePath("/account/wallet");
    return { ok: true, orderId: order.id };
  } catch (e) {
    if ((e as Error).message === "INSUFFICIENT_FUNDS") {
      return { ok: false, error: "Not enough wallet balance. Top up or pay by card." };
    }
    return { ok: false, error: "We couldn't complete your order. Please try again." };
  }
}
