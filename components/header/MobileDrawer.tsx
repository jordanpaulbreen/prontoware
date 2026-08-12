"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/data";
import { useBodyScrollLock, useEscapeKey } from "@/lib/hooks";
import { Icon } from "@/components/ui/Icon";
import { KeyGlow, Logo } from "@/components/ui/KeyGlow";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./TopStrip";
import { Button } from "@/components/ui/Button";

/**
 * Mobile navigation: a slide-in drawer with one accordion per shop dimension.
 * Focus moves into the drawer on open and back to the trigger on close; the
 * page behind is scroll-locked and the scrim closes on tap.
 */
export function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [section, setSection] = useState<string | null>("platforms");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(open);
  useEscapeKey(onClose, open);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Simple focus containment — Tab cycles inside the drawer while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute inset-y-0 right-0 flex w-[min(24rem,92vw)] animate-[drawer-in_var(--ma-dur-slow)_var(--ma-ease-arcade)] flex-col border-l border-hairline bg-bg"
      >
        <div className="flex items-center justify-between border-b border-hairline px-4 py-3.5">
          <Logo compact />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="press inline-flex size-10 items-center justify-center rounded-tile border border-hairline bg-surface-2 text-ink-muted hover:text-ink"
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="border-b border-hairline p-4">
          <SearchBar />
        </div>

        <div className="ma-scroll flex-1 overflow-y-auto">
          <ul className="p-2">
            {nav.map((item) => {
              const expanded = section === item.id;
              return (
                <li key={item.id} className="border-b border-hairline/70 last:border-0">
                  {item.panel ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={`ma-drawer-${item.id}`}
                        onClick={() => setSection(expanded ? null : item.id)}
                        className="flex w-full items-center justify-between gap-2 rounded-tile px-3 py-3.5 text-left text-[0.9375rem] font-medium text-ink"
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <span
                              className="pixel-label rounded-[4px] px-1 py-0.5"
                              style={{
                                color:
                                  item.badge === "hot" ? "var(--ma-magenta)" : "var(--ma-gold)",
                                backgroundColor:
                                  item.badge === "hot"
                                    ? "var(--ma-magenta-soft)"
                                    : "var(--ma-gold-soft)",
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </span>
                        <Icon
                          name="chevronDown"
                          size={16}
                          className={`text-ink-faint transition-transform duration-[var(--ma-dur-base)] ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        id={`ma-drawer-${item.id}`}
                        hidden={!expanded}
                        className="grid animate-[panel-in_var(--ma-dur-base)_var(--ma-ease-arcade)] gap-4 px-3 pb-4"
                      >
                        {item.panel.columns.map((column) => (
                          <div key={column.title}>
                            <h3 className="pixel-label mb-2 text-cyan">{column.title}</h3>
                            <ul className="space-y-0.5">
                              {column.links.map((link) => (
                                <li key={link.label}>
                                  <a
                                    href="#"
                                    onClick={onClose}
                                    className="flex items-baseline justify-between gap-3 rounded-[6px] px-2 py-2 text-sm text-ink-muted hover:bg-card-hover hover:text-ink"
                                  >
                                    {link.label}
                                    {link.note && (
                                      <span className="text-[0.6875rem] text-ink-faint">
                                        {link.note}
                                      </span>
                                    )}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <a
                      href="#"
                      onClick={onClose}
                      className="block rounded-tile px-3 py-3.5 text-[0.9375rem] font-medium text-ink"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-2 space-y-2 border-t border-hairline p-4">
            <a
              href="/account"
              className="flex items-center gap-3 rounded-tile border border-hairline bg-surface-2 px-3 py-3 text-sm font-medium text-ink"
            >
              <Icon name="user" size={17} className="text-ink-muted" />
              Account & orders
            </a>
            <a
              href="/wishlist"
              className="flex items-center gap-3 rounded-tile border border-hairline bg-surface-2 px-3 py-3 text-sm font-medium text-ink"
            >
              <Icon name="heart" size={17} className="text-ink-muted" />
              Wishlist
            </a>
          </div>
        </div>

        <div className="border-t border-hairline p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-ink-muted">
              <KeyGlow size={18} halo={false} />
              Keys in under 60 seconds
            </span>
            <ThemeToggle />
          </div>
          <Button href="/deals" className="w-full" sparkle>
            <Icon name="tag" size={16} />
            Tonight&apos;s deals
          </Button>
        </div>
      </div>
    </div>
  );
}
