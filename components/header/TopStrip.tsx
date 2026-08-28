"use client";

import { useTheme } from "@/components/providers/StoreProvider";
import { promoStrip } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";

/** Slim top strip: rotating promo, currency, theme. Hidden on small screens. */
export function TopStrip() {
  return (
    <div className="hidden border-b border-hairline bg-bg-deep/80 lg:block">
      <div className="mx-auto flex h-9 w-full max-w-(--container-shell) items-center justify-between px-6 lg:px-8">
        <PromoRotator />
        <div className="flex items-center gap-1">
          <a
            href="/support"
            className="rounded-tile px-2.5 py-1 text-xs text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-ink"
          >
            Help centre
          </a>
          <a
            href="/activation"
            className="rounded-tile px-2.5 py-1 text-xs text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-ink"
          >
            Activation guides
          </a>
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-hairline" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

/**
 * The promo rotates through four lines with a vertical marquee. It is a single
 * decorative element for screen readers — the first line is announced and the
 * rest are duplicated content, so the list is aria-hidden and one static copy
 * is exposed.
 */
function PromoRotator() {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="pixel-label text-cyan">now playing</span>
      <span className="sr-only">{promoStrip[0]}</span>
      <div aria-hidden="true" className="h-4 overflow-hidden">
        <ul className="animate-[marquee-up_16s_var(--ma-ease-arcade)_infinite]">
          {promoStrip.map((line) => (
            <li key={line} className="flex h-4 items-center text-ink-muted">
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`press inline-flex items-center gap-1.5 rounded-tile px-2.5 py-1 text-xs font-medium text-ink-muted hover:bg-surface-2 hover:text-ink ${className}`}
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} size={14} />
      <span className="pixel-label">{theme === "dark" ? "night" : "day"}</span>
    </button>
  );
}
