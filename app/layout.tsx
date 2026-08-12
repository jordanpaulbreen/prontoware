import type { Metadata, Viewport } from "next";
import { Inter, Silkscreen, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { BrandDefs } from "@/components/ui/BrandDefs";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

/* Display face: techy-playful, set large with tight tracking. */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

/* UI/body face: neutral and quiet. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Pixel accent: tiny flavour labels only — never body copy. */
const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Midnight Arcade — official game keys, delivered instantly",
  description:
    "Buy official Steam, Epic, Xbox, PlayStation and Nintendo keys at midnight prices. Instant email delivery, authorised distributors, 24/7 support.",
  applicationName: "Midnight Arcade",
  openGraph: {
    title: "Midnight Arcade — official game keys, delivered instantly",
    description:
      "Deals drop at midnight. Official keys, instant delivery, secure payment, 24/7 support.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0B1E" },
    { media: "(prefers-color-scheme: light)", color: "#F4F2FD" },
  ],
  colorScheme: "dark light",
};

/**
 * Dark is the default and primary theme, so the pre-hydration script only has to
 * opt *into* light when the visitor has previously chosen it — no flash, and no
 * layout work before paint.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("ma-theme");if(t==="light"){document.documentElement.dataset.theme="light"}else{document.documentElement.dataset.theme="dark"}}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable} ${silkscreen.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <StoreProvider>
          <BrandDefs />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
