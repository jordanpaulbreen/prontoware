"use client";

import { useMemo, useState } from "react";
import { giftCards } from "@/lib/data";
import { Price } from "@/components/ui/Price";
import { Icon } from "@/components/ui/Icon";
import { EmptyState } from "@/components/ui/EmptyState";

type Card = { key: string; brand: string; token: string; amount: number };

const allAmounts = Array.from(
  new Set(giftCards.flatMap((gc) => gc.amounts)),
).sort((a, b) => a - b);

/** Self-contained, genuinely filterable gift-card catalogue. The brand and
    amount controls narrow the cards shown on this page — no store-search
    redirect, so picking "Steam €20" shows exactly Steam €20. */
export function GiftCardsCatalog() {
  const [brand, setBrand] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  const cards = useMemo<Card[]>(() => {
    const flat: Card[] = giftCards.flatMap((gc) =>
      gc.amounts.map((a) => ({ key: gc.key, brand: gc.name, token: gc.token, amount: a })),
    );
    return flat.filter(
      (c) => (!brand || c.key === brand) && (amount == null || c.amount === amount),
    );
  }, [brand, amount]);

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          aria-label="Brand"
          className="h-11 rounded-tile border border-hairline bg-surface-2 px-3 text-sm text-ink focus:border-cyan focus:outline-none"
        >
          <option value="">All brands</option>
          {giftCards.map((gc) => (
            <option key={gc.key} value={gc.key}>
              {gc.name}
            </option>
          ))}
        </select>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAmount(null)}
            className={`h-11 rounded-tile border px-4 text-sm font-medium ${
              amount == null
                ? "border-cyan text-cyan"
                : "border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink"
            }`}
          >
            Any amount
          </button>
          {allAmounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              className={`h-11 rounded-tile border px-4 text-sm font-medium ${
                amount === a
                  ? "border-cyan text-cyan"
                  : "border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink"
              }`}
            >
              €{a}
            </button>
          ))}
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={`${c.key}-${c.amount}`}
              className="flex items-center justify-between rounded-card border border-hairline bg-surface p-5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex size-10 items-center justify-center rounded-tile"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${c.token} 16%, transparent)`,
                    color: c.token,
                  }}
                >
                  <Icon name="gift" size={18} />
                </span>
                <div>
                  <h2 className="text-sm font-medium text-ink">{c.brand}</h2>
                  <p className="text-xs text-ink-faint">Delivered by email · instant</p>
                </div>
              </div>
              <Price amount={c.amount} size="md" gradientOnHover={false} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No cards match"
          body="Try a different brand or amount."
        />
      )}
    </>
  );
}
