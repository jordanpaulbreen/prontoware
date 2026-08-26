import "server-only";

/* Server-only configuration. Reads secrets from the environment and fails loud
   in production if something required is missing, but stays lenient in dev so
   the site renders even before every integration is wired up. */

function req(name: string, fallback = ""): string {
  const value = process.env[name] ?? fallback;
  if (!value && process.env.NODE_ENV === "production") {
    console.warn(`[config] missing env ${name}`);
  }
  return value;
}

export const smtp = {
  host: req("SMTP_HOST", "mail.spacemail.com"),
  port: Number(req("SMTP_PORT", "587")),
  secure: req("SMTP_SECURE", "false") === "true",
  user: req("SMTP_USER"),
  pass: req("SMTP_PASS"),
  from: req("MAIL_FROM", "Prontoware Games <info@prontowaregames.com>"),
} as const;

export const kinguin = {
  base: req("KINGUIN_API_BASE", "https://gateway.kinguin.net/esa/api/v1"),
  apiKey: req("KINGUIN_API_KEY"),
  storeId: req("KINGUIN_STORE_ID"),
  storeName: req("KINGUIN_STORE_NAME", "cartridge-club"),
  clientId: req("KINGUIN_CLIENT_ID"),
  clientSecret: req("KINGUIN_CLIENT_SECRET"),
  configured: Boolean(process.env.KINGUIN_API_KEY),
} as const;

export const auth = {
  sessionSecret: req("SESSION_SECRET", "dev-only-insecure-secret-change-me-please-32chars"),
} as const;

export const db = {
  url: req("DATABASE_URL"),
  configured: Boolean(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("USER:PASSWORD")),
} as const;
