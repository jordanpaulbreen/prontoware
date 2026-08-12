"use client";

import { useCurrency } from "@/components/providers/StoreProvider";
import { money } from "@/lib/format";

/**
 * Price emphasis is one of the few places the brand gradient is allowed: the
 * current price picks up the ramp on card hover, while the struck-through old
 * price stays muted.
 */
export function Price({
  amount,
  oldAmount,
  size = "md",
  gradientOnHover = true,
}: {
  amount: number;
  oldAmount?: number;
  size?: "sm" | "md" | "lg" | "xl";
  gradientOnHover?: boolean;
}) {
  const { currency } = useCurrency();

  const scale = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-3xl sm:text-4xl",
  }[size];

  return (
    <span className="inline-flex items-baseline gap-2">
      {oldAmount && (
        <span className="text-xs text-ink-faint line-through decoration-ink-faint/70">
          {money(oldAmount, currency)}
        </span>
      )}
      <span
        className={`font-display font-bold tracking-tight text-ink ${scale} ${
          gradientOnHover
            ? "transition-colors duration-[var(--ma-dur-base)] group-hover/card:text-gradient"
            : ""
        }`}
      >
        {money(amount, currency)}
      </span>
    </span>
  );
}

/** Pixel-face price tag — flavour reserved for deal cards. */
export function PixelPrice({ amount }: { amount: number }) {
  const { currency } = useCurrency();
  return (
    <span
      className="pixel-label rounded-[4px] px-1.5 py-1 text-deal"
      style={{
        backgroundColor: "var(--ma-deal-soft)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--ma-deal) 30%, transparent)",
      }}
    >
      {money(amount, currency)}
    </span>
  );
}
