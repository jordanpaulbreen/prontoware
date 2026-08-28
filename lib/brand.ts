/* Public brand + company facts. Safe to import in client and server components.
   Values come from NEXT_PUBLIC_* env with sensible fallbacks so the UI never
   renders an empty string. Keep every user-facing name/address in sync here. */

export const brand = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Prontoware Games",
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "prontowaregames.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prontowaregames.com",
  tagline: "Official game keys, delivered instantly",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@prontowaregames.com",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "info@prontowaregames.com",
} as const;

/** Legal entity — the same values must appear in footer, checkout and invoices. */
export const company = {
  legalName: "PRONTOWARE OÜ",
  regNumber: "17578967",
  address: "Tornimäe tn 7, 10145, Kesklinna linnaosa, Tallinn, Harju maakond, Estonia",
  country: "Estonia",
  // Prontoware acts as the seller/merchant of record for all key sales.
  merchantOfRecord: "PRONTOWARE OÜ",
} as const;

/** Single source of truth for policy numbers — reused across pages, FAQ, legal. */
export const policy = {
  refundDays: 14,
  warrantyMonths: 12,
  support: "24/7 email support",
  serviceFeePct: 0,
  deliveryTime: "under 60 seconds",
  currency: process.env.NEXT_PUBLIC_BASE_CURRENCY ?? "EUR",
} as const;
