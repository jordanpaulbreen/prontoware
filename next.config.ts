import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Sharper renders for text-heavy key art; 75 (the default) looked soft.
    qualities: [90],
    remotePatterns: [
      { protocol: "https", hostname: "static.kinguin.net" },
      { protocol: "https", hostname: "images.kinguin.net" },
    ],
  },
};

export default nextConfig;
