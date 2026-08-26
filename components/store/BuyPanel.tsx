"use client";

import { useActionState } from "react";
import { buyProductAction, type CheckoutState } from "@/app/actions/checkout";
import { useAuth } from "@/components/providers/StoreProvider";
import { Price } from "@/components/ui/Price";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { company } from "@/lib/brand";

export function BuyPanel({
  kinguinId,
  title,
  platform,
  price,
  inStock,
}: {
  kinguinId: string;
  title: string;
  platform: string;
  price: number;
  inStock: boolean;
}) {
  const { user } = useAuth();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(buyProductAction, {
    ok: false,
  });

  if (state.ok) {
    return (
      <div className="rounded-card border border-deal/40 bg-deal/10 p-5">
        <p className="flex items-center gap-2 font-semibold text-deal">
          <Icon name="check" size={18} /> Purchase complete
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          Your key has been delivered by email and added to your library.
        </p>
        <Button href="/account/orders" className="mt-4" size="sm">
          View my keys
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-hairline bg-surface p-5">
      <div className="flex items-center justify-between">
        <Price amount={price} size="xl" gradientOnHover={false} />
        <span
          className={`inline-flex items-center gap-1 text-xs ${
            inStock ? "text-deal" : "text-ink-faint"
          }`}
        >
          <Icon name={inStock ? "bolt" : "clock"} size={13} />
          {inStock ? "In stock · instant" : "Restocking"}
        </span>
      </div>

      <form action={action} className="mt-4 space-y-3">
        <input type="hidden" name="kinguinId" value={kinguinId} />
        <input type="hidden" name="title" value={title} />
        <input type="hidden" name="platform" value={platform} />
        <input type="hidden" name="priceCents" value={Math.round(price * 100)} />

        <fieldset className="space-y-2">
          <label className="flex items-center gap-2 rounded-tile border border-hairline bg-surface-2 px-3 py-2.5 text-sm">
            <input type="radio" name="payment" value="card" defaultChecked className="accent-cyan" />
            <Icon name="badge" size={15} /> Pay by card (Visa / Mastercard)
          </label>
          <label className="flex items-center gap-2 rounded-tile border border-hairline bg-surface-2 px-3 py-2.5 text-sm">
            <input type="radio" name="payment" value="wallet" className="accent-cyan" />
            <Icon name="bolt" size={15} /> Pay from balance
          </label>
        </fieldset>

        <label className="flex items-start gap-2 text-xs text-ink-muted">
          <input type="checkbox" name="acceptTerms" className="mt-0.5 accent-cyan" required />
          <span>
            I agree to the{" "}
            <a href="/legal/terms" className="text-cyan hover:underline">Terms</a> and{" "}
            <a href="/legal/returns" className="text-cyan hover:underline">Refund Policy</a>. Seller
            of record: {company.merchantOfRecord}.
          </span>
        </label>

        {user ? (
          <Button type="submit" disabled={pending || !inStock} className="w-full" sparkle>
            <Icon name="cart" size={16} />
            {pending ? "Processing…" : "Buy now"}
          </Button>
        ) : (
          <Button href="/login" className="w-full">
            Log in to buy
          </Button>
        )}

        {state.error && <p className="text-xs text-magenta">{state.error}</p>}
      </form>

      <div className="mt-4 border-t border-hairline pt-4">
        <PaymentMarks size={24} />
        <p className="mt-2 flex items-center gap-1.5 text-[0.6875rem] text-ink-faint">
          <Icon name="shield" size={12} /> Secure checkout · PCI-DSS · no card details stored
        </p>
      </div>
    </div>
  );
}
