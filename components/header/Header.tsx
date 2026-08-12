"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/providers/StoreProvider";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/KeyGlow";
import { MiniCart } from "./MiniCart";
import { MobileDrawer } from "./MobileDrawer";
import { NavRow } from "./NavRow";
import { SearchBar } from "./SearchBar";
import { TopStrip } from "./TopStrip";

/**
 * Three-tier header: promo strip, main bar (logo · search · account cluster),
 * navigation row. Sticky, and it condenses on scroll — the promo strip lifts
 * away, the bar tightens and a blurred translucent background takes over, so
 * the store keeps its full navigation without eating the viewport.
 */
export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { wishlist } = useCart();

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-200 focus:h-auto focus:w-auto focus:rounded-tile focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:text-ink focus:shadow-panel"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-90 transition-[background-color,box-shadow,backdrop-filter] duration-[var(--ma-dur-slow)] ease-arcade ${
          condensed
            ? "bg-bg/82 shadow-panel backdrop-blur-xl"
            : "bg-bg"
        }`}
      >
        {/* promo strip collapses away as you scroll */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-[var(--ma-dur-slow)] ease-arcade ${
            condensed ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
          }`}
        >
          <TopStrip />
        </div>

        <div className="mx-auto w-full max-w-(--container-shell) px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center gap-3 transition-[padding] duration-[var(--ma-dur-slow)] ease-arcade sm:gap-5 ${
              condensed ? "py-2.5" : "py-3.5"
            }`}
          >
            <a
              href="/"
              aria-label="Midnight Arcade — home"
              className="shrink-0 rounded-tile px-0.5 py-1"
            >
              <Logo compact={condensed} />
            </a>

            <SearchBar className="hidden flex-1 md:block" />

            <div className="ml-auto flex items-center gap-2">
              <a
                href="/account"
                className="press hidden h-10 items-center gap-2 rounded-tile border border-hairline bg-surface-2 px-3 text-sm font-medium text-ink-muted hover:border-hairline-strong hover:text-ink sm:inline-flex"
              >
                <Icon name="user" size={17} />
                <span className="hidden lg:inline">Account</span>
              </a>

              <a
                href="/wishlist"
                aria-label={`Wishlist, ${wishlist.length} ${wishlist.length === 1 ? "game" : "games"}`}
                className="press relative hidden size-10 items-center justify-center rounded-tile border border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink sm:inline-flex"
              >
                <Icon name="heart" size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-chip bg-magenta px-1 text-[0.625rem] font-bold text-ink-invert">
                    {wishlist.length}
                  </span>
                )}
              </a>

              <MiniCart />

              <button
                type="button"
                onClick={() => setDrawer(true)}
                aria-label="Open navigation"
                aria-expanded={drawer}
                className="press inline-flex size-10 items-center justify-center rounded-tile border border-hairline bg-surface-2 text-ink-muted hover:text-ink lg:hidden"
              >
                <Icon name="menu" size={19} />
              </button>
            </div>
          </div>

          {/* search drops below the logo row on small screens */}
          <div className={`pb-3 md:hidden ${condensed ? "hidden" : "block"}`}>
            <SearchBar />
          </div>

          <div
            className={`hidden items-center justify-between transition-[height,opacity] duration-[var(--ma-dur-slow)] ease-arcade lg:flex ${
              condensed ? "h-11 opacity-100" : "h-12 opacity-100"
            }`}
          >
            <NavRow />

            <div className="flex items-center gap-4 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="bolt" size={14} className="text-instant" />
                Instant delivery
              </span>
              <span aria-hidden="true" className="h-3.5 w-px bg-hairline" />
              <span className="inline-flex items-center gap-1.5">
                <Icon name="star" size={14} className="text-gold" style={{ fill: "currentColor" }} />
                4.7 / 5 on Trustpilot
              </span>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="hairline-gradient" />
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}
