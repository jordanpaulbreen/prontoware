export type CurrencyCode = "EUR" | "USD" | "GBP" | "PLN";

/** Indicative rates — a real store would fetch these; the UI only needs shape. */
export const rates: Record<CurrencyCode, { rate: number; symbol: string; suffix?: boolean }> =
  {
    EUR: { rate: 1, symbol: "€" },
    USD: { rate: 1.08, symbol: "$" },
    GBP: { rate: 0.85, symbol: "£" },
    PLN: { rate: 4.31, symbol: " zł", suffix: true },
  };

export function money(amount: number, code: CurrencyCode = "EUR"): string {
  const { rate, symbol, suffix } = rates[code];
  const value = (amount * rate).toFixed(2);
  return suffix ? `${value}${symbol}` : `${symbol}${value}`;
}

/** Whole-number variant for gift-card denominations and filter labels. */
export function moneyRound(amount: number, code: CurrencyCode = "EUR"): string {
  const { rate, symbol, suffix } = rates[code];
  const value = Math.round(amount * rate);
  return suffix ? `${value}${symbol}` : `${symbol}${value}`;
}

/** 1234567 → "1 234 567" (thin, locale-neutral grouping). */
export function group(value: number): string {
  return value.toLocaleString("en-GB").replace(/,/g, " ");
}

export function compact(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return String(value);
}

/** 214 → "3h 34m" for flash-deal copy outside the live countdown. */
export function minutesLabel(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");
