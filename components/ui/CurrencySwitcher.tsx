"use client";

import { useCurrency } from "@/components/providers/StoreProvider";
import { currencies } from "@/lib/data";
import type { CurrencyCode } from "@/lib/format";

/** Header currency selector — changing it re-prices every <Price> live. */
export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <label className={`inline-flex items-center ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="h-10 cursor-pointer rounded-tile border border-hairline bg-surface-2 px-2.5 text-sm font-medium text-ink-muted hover:border-hairline-strong hover:text-ink focus:border-cyan focus:outline-none"
        aria-label="Select currency"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} {c.symbol.trim()}
          </option>
        ))}
      </select>
    </label>
  );
}
