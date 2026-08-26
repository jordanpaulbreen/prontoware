"use client";

import { useActionState } from "react";
import { checkoutAction, type CheckoutState } from "@/app/actions/checkout";
import { useCart, useCurrency, type PublicUser } from "@/components/providers/StoreProvider";
import { money } from "@/lib/format";
import { company } from "@/lib/brand";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { EmptyState } from "@/components/ui/EmptyState";

export function CheckoutForm({ user }: { user: PublicUser & { billingAddr: string } }) {
  const { lines, subtotal, count } = useCart();
  const { currency } = useCurrency();
  const [state, action, pending] = useActionState<CheckoutState, FormData>(checkoutAction, {
    ok: false,
  });

  const walletBalance = user.balanceCents / 100;
  const items = JSON.stringify(lines.map((l) => ({ slug: l.game.slug, qty: l.qty })));

  if (state.ok) {
    return (
      <div className="rounded-card border border-deal/40 bg-deal/10 p-8 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-deal/20 text-deal">
          <Icon name="check" size={28} />
        </div>
        <h2 className="mt-4 text-2xl">Order confirmed</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Your keys have been delivered by email and added to your library. A PDF invoice is attached
          to your confirmation email.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button href="/account/orders">View my keys</Button>
          <Button href="/store" variant="surface">
            Keep shopping
          </Button>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Nothing to check out"
        body="Your cart is empty. Add a key to continue."
        action={
          <Button href="/store" size="sm">
            Browse the store
          </Button>
        }
      />
    );
  }

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <input type="hidden" name="items" value={items} />

      <div className="space-y-5">
        <section className="rounded-card border border-hairline bg-surface p-5">
          <h2 className="text-lg">Billing details</h2>
          <p className="mt-3 text-sm text-ink">
            {user.firstName} {user.lastName}
          </p>
          <p className="whitespace-pre-line text-sm text-ink-muted">{user.billingAddr}</p>
          <p className="mt-1 text-sm text-ink-faint">{user.email}</p>
          <a href="/account" className="mt-2 inline-block text-xs text-cyan hover:underline">
            Edit in account settings
          </a>
        </section>

        <section className="rounded-card border border-hairline bg-surface p-5">
          <h2 className="text-lg">Payment method</h2>
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-3 rounded-tile border border-hairline bg-surface-2 px-4 py-3 text-sm">
              <input type="radio" name="payment" value="card" defaultChecked className="accent-cyan" />
              <span className="flex-1">Credit / debit card</span>
              <PaymentMarks size={22} />
            </label>
            <label className="flex items-center gap-3 rounded-tile border border-hairline bg-surface-2 px-4 py-3 text-sm">
              <input
                type="radio"
                name="payment"
                value="wallet"
                className="accent-cyan"
                disabled={walletBalance < subtotal}
              />
              <span className="flex-1">
                Balance
                <span className="ml-2 text-xs text-ink-faint">
                  {money(walletBalance, currency)} available
                </span>
              </span>
              <Icon name="bolt" size={18} className="text-deal" />
            </label>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[0.6875rem] text-ink-faint">
            <Icon name="shield" size={12} /> PCI-DSS compliant · 3-D Secure · no card details stored
          </p>
        </section>
      </div>

      <aside className="h-fit rounded-card border border-hairline bg-surface p-5">
        <h2 className="text-lg">Order summary</h2>
        <ul className="mt-4 space-y-2 border-b border-hairline pb-3 text-sm">
          {lines.map((l) => (
            <li key={l.game.slug} className="flex justify-between gap-2">
              <span className="truncate text-ink-muted">
                {l.game.title} ×{l.qty}
              </span>
              <span className="text-ink">{money(l.game.price * l.qty, currency)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-sm text-ink-muted">
            Total ({count}) · VAT incl.
          </span>
          <span className="font-display text-xl font-bold text-gradient">
            {money(subtotal, currency)}
          </span>
        </div>

        <label className="mt-4 flex items-start gap-2 text-xs text-ink-muted">
          <input type="checkbox" name="acceptTerms" className="mt-0.5 accent-cyan" required />
          <span>
            I agree to the{" "}
            <a href="/legal/terms" className="text-cyan hover:underline">Terms of Service</a> and{" "}
            <a href="/legal/returns" className="text-cyan hover:underline">Refund Policy</a>.
          </span>
        </label>

        <Button type="submit" disabled={pending} className="mt-4 w-full" sparkle>
          {pending ? "Processing…" : `Pay ${money(subtotal, currency)}`}
        </Button>

        {state.error && <p className="mt-2 text-xs text-magenta">{state.error}</p>}

        <p className="mt-4 border-t border-hairline pt-4 text-[0.6875rem] leading-relaxed text-ink-faint">
          Seller &amp; Merchant of Record: {company.merchantOfRecord}, {company.address}. Reg.{" "}
          {company.regNumber}.
        </p>
      </aside>
    </form>
  );
}
