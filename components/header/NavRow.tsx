import Link from "next/link";
import { nav } from "@/lib/data";

const HREFS: Record<string, string> = {
  platforms: "/platforms",
  genres: "/genres",
  deals: "/deals",
  new: "/new",
  preorders: "/preorders",
  charts: "/charts",
  giftcards: "/gift-cards",
};

/** Top-level navigation. Each entry links straight to its real catalog page. */
export function NavRow() {
  return (
    <nav aria-label="Main" className="relative hidden lg:block">
      <ul className="flex items-center gap-1">
        {nav.map((item) => {
          const href = HREFS[item.id] ?? "/store";
          return (
            <li key={item.id}>
              <Link
                href={href}
                className="group relative inline-flex h-11 items-center gap-1.5 rounded-tile px-3 text-sm font-medium text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-ink"
              >
                {item.label}
                {item.badge && (
                  <span
                    className="pixel-label rounded-[4px] px-1 py-0.5"
                    style={{
                      color: item.badge === "hot" ? "var(--ma-magenta)" : "var(--ma-gold)",
                      backgroundColor:
                        item.badge === "hot" ? "var(--ma-magenta-soft)" : "var(--ma-gold-soft)",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-brand transition-transform duration-[var(--ma-dur-slow)] ease-arcade group-hover:scale-x-100"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
