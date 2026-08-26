import type { MetadataRoute } from "next";

const base = "https://prontowaregames.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "store",
    "deals",
    "new",
    "preorders",
    "charts",
    "platforms",
    "genres",
    "gift-cards",
    "about",
    "help",
    "contact",
    "press",
    "careers",
    "affiliates",
    "blog",
    "legal/terms",
    "legal/privacy",
    "legal/returns",
    "legal/cookies",
    "legal/imprint",
  ];

  return paths.map((path) => ({
    url: path ? `${base}/${path}` : base,
    lastModified: now,
    changeFrequency: path === "" || path === "store" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "store" ? 0.9 : 0.6,
  }));
}
