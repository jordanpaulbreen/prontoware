import "server-only";
import { kinguin as cfg } from "./config";

/* Kinguin ESA Integration API client.
   Docs: https://www.kinguin.net/dev-portal  ·  Base: /esa/api/v1
   Auth: X-Api-Key header. All calls are server-side only. */

export type KinguinProduct = {
  kinguinId: number;
  productId: string;
  name: string;
  originalName?: string;
  description?: string;
  coverImage?: string;
  screenshots: string[];
  platform: string;
  genres: string[];
  developers: string[];
  publishers: string[];
  releaseDate?: string;
  qty: number;
  price: number; // EUR
  regionalLimitations?: string;
  regionId?: string;
  languages: string[];
  activationDetails?: string;
};

type ListResult = { results: KinguinProduct[]; itemCount: number; page: number };

function headers() {
  return { "X-Api-Key": cfg.apiKey, "Content-Type": "application/json" } as const;
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${cfg.base}${path}`, {
    ...init,
    headers: { ...headers(), ...(init?.headers ?? {}) },
    // cache product reads at the edge for a minute; mutations pass no-store
    next: init?.method && init.method !== "GET" ? undefined : { revalidate: 60 },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Kinguin ${res.status} ${path}: ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

function normalize(raw: Record<string, unknown>): KinguinProduct {
  const images = (raw.images ?? {}) as Record<string, unknown>;
  const cover = (images.cover ?? {}) as Record<string, string>;
  const screenshots = Array.isArray(images.screenshots)
    ? (images.screenshots as Record<string, string>[]).map((s) => s.url || s.thumbnail).filter(Boolean)
    : [];
  const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
  return {
    kinguinId: Number(raw.kinguinId ?? raw.productId ?? 0),
    productId: String(raw.productId ?? raw.kinguinId ?? ""),
    name: String(raw.name ?? raw.originalName ?? "Untitled"),
    originalName: raw.originalName as string | undefined,
    description: raw.description as string | undefined,
    coverImage: cover.url || cover.thumbnail || undefined,
    screenshots,
    platform: String(raw.platform ?? "Steam"),
    genres: arr(raw.genres),
    developers: arr(raw.developers),
    publishers: arr(raw.publishers),
    releaseDate: raw.releaseDate as string | undefined,
    qty: Number(raw.qty ?? 0),
    price: Number(raw.price ?? 0),
    regionalLimitations: raw.regionalLimitations as string | undefined,
    regionId: raw.regionId ? String(raw.regionId) : undefined,
    languages: arr(raw.languages),
    activationDetails: raw.activationDetails as string | undefined,
  };
}

export async function searchProducts(params: {
  page?: number;
  limit?: number;
  name?: string;
  platform?: string;
  genre?: string;
  priceFrom?: number;
  priceTo?: number;
  sortBy?: string;
  sortType?: "asc" | "desc";
} = {}): Promise<ListResult> {
  const q = new URLSearchParams();
  q.set("page", String(params.page ?? 1));
  q.set("limit", String(params.limit ?? 24));
  if (params.name) q.set("name", params.name);
  if (params.platform) q.set("platform", params.platform);
  if (params.genre) q.set("genre", params.genre);
  if (params.priceFrom != null) q.set("priceFrom", String(params.priceFrom));
  if (params.priceTo != null) q.set("priceTo", String(params.priceTo));
  // The API only accepts sortBy = "kinguinId" | "updatedAt"; map friendlier
  // intents ("bestselling", "createdAt", …) onto the freshest-first proxy.
  if (params.sortBy) {
    const sortBy = params.sortBy === "kinguinId" ? "kinguinId" : "updatedAt";
    q.set("sortBy", sortBy);
    q.set("sortType", params.sortType ?? "desc");
  }

  const data = await api<{ results?: Record<string, unknown>[]; item_count?: number }>(
    `/products?${q.toString()}`,
  );
  return {
    results: (data.results ?? []).map(normalize),
    itemCount: data.item_count ?? 0,
    page: params.page ?? 1,
  };
}

export async function getProduct(kinguinId: number | string): Promise<KinguinProduct> {
  const data = await api<Record<string, unknown>>(`/products/${kinguinId}`);
  return normalize(data);
}

/** Create an order for the given products. Returns the Kinguin order id. */
export async function createKinguinOrder(
  products: { kinguinId: number; qty: number; price: number }[],
): Promise<string> {
  const data = await api<{ orderId: string }>(`/order`, {
    method: "POST",
    body: JSON.stringify({ products }),
    headers: {},
  });
  return data.orderId;
}

/** Dispatch + fetch keys for a paid order. */
export async function getOrderKeys(
  orderId: string,
): Promise<{ kinguinId: number; name: string; serial: string }[]> {
  await api(`/order/${orderId}/dispatch`, { method: "POST", body: "{}" }).catch(() => null);
  const data = await api<{ keys?: { kinguinId: number; name: string; serial: string }[] }>(
    `/order/${orderId}/keys`,
    { headers: {}, method: "GET" },
  );
  return data.keys ?? [];
}

/** Safe wrapper — returns null instead of throwing when the API is unavailable. */
export async function trySearchProducts(params: Parameters<typeof searchProducts>[0]) {
  if (!cfg.configured) return null;
  try {
    return await searchProducts(params);
  } catch (e) {
    console.warn("[kinguin] search failed:", (e as Error).message);
    return null;
  }
}

export async function tryGetProduct(id: number | string) {
  if (!cfg.configured) return null;
  try {
    return await getProduct(id);
  } catch (e) {
    console.warn("[kinguin] product failed:", (e as Error).message);
    return null;
  }
}
