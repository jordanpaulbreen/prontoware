import type { MetadataRoute } from "next";

const base = "https://prontowaregames.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/checkout", "/cart", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
