"use client";

import { useCart, useCurrency } from "@/components/providers/StoreProvider";
import { money } from "@/lib/format";
import { CoverThumb } from "@/components/ui/Cover";
import { PlatformChip } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export function CartView() {
  const { lines, subtotal, remove, count } = useCart();
  const { currency } = useCurrency();

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        body="Browse the store and your keys will land here, ready to check out."
        action={
          <Button href="/store" size="sm">
            Browse the store
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <ul className="space-y-2 rounded-card border border-hairline bg-surface p-2">
        {lines.map((line) => (
          <li key={line.game.slug} className="flex items-center gap-3 rounded-tile p-2 hover:bg-card-hover">
            <CoverThumb game={line.game} size={52} />
            <div className="min-w-0 flex-1">
              <a href={`/game/${line.game.slug}`} className="text-sm font-medium text-ink hover:text-cyan">
                {line.game.title}
              </a>
              <div className="mt-1 flex items-center gap-2">
                <PlatformChip platform={line.game.platform} withName={false} />
                <span className="text-xs text-ink-faint">×{line.qty}</span>
              </div>
            </div>
            <span className="font-display font-bold text-ink">
              {money(line.game.price * line.qty, currency)}
            </span>
            <button
              type="button"
              onClick={() => remove(line.game.slug)}
              aria-label={`Remove ${line.game.title}`}
              className="press rounded-[6px] p-1.5 text-ink-faint hover:text-error"
            >
              <Icon name="close" size={16} />
            </button>
          </li>
        ))}
      </ul>

      <aside className="h-fit rounded-card border border-hairline bg-surface p-5">
        <h2 className="text-lg">Order summary</h2>
        <div className="mt-4 flex items-baseline justify-between border-b border-hairline pb-3 text-sm">
          <span className="text-ink-muted">
            {count} {count === 1 ? "item" : "items"} · VAT included
          </span>
          <span className="font-display text-xl font-bold text-gradient">
            {money(subtotal, currency)}
          </span>
        </div>
        <Button href="/checkout" className="mt-4 w-full">
          <Icon name="bolt" size={16} /> Proceed to checkout
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.6875rem] text-ink-faint">
          <Icon name="shield" size={12} /> Keys delivered by email in under 60 seconds
        </p>
      </aside>
    </div>
  );
}
