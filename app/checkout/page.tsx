import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Band, Shell } from "@/components/ui/Section";
import { CheckoutForm } from "@/components/store/CheckoutForm";

export const metadata: Metadata = { title: "Checkout" };
export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/checkout");

  const billingAddr = [
    user.street,
    `${user.postcode} ${user.city}`.trim(),
    user.country,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <Band>
      <Shell className="max-w-5xl">
        <h1 className="mb-6 text-2xl">Secure checkout</h1>
        <CheckoutForm
          user={{
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            balanceCents: user.balanceCents,
            billingAddr,
          }}
        />
      </Shell>
    </Band>
  );
}
