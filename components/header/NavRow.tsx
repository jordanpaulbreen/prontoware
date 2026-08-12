"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bySlug, discountOf, nav } from "@/lib/data";
import type { NavItem } from "@/lib/data";
import { useEscapeKey } from "@/lib/hooks";
import { Cover, CoverThumb } from "@/components/ui/Cover";
import { DiscountPill, InstantChip, PlatformChip } from "@/components/ui/Chips";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/ui/Price";

/**
 * Navigation organised the way gamers shop, with one dark mega-panel per entry.
 *
 * Interaction model: pointer users get hover-with-intent (a short close delay so
 * diagonal mouse paths don't snap the panel shut), keyboard users get
 * ArrowLeft/Right between triggers, Enter/Space to toggle, Escape to close and
 * return focus. Each trigger owns aria-expanded + aria-controls for its panel.
 */
export function NavRow() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const navRef = useRef<HTMLElement | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const close = useCallback(() => {
    cancelClose();
    setOpenId(null);
  }, []);

  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenId(null), 180);
  };

  useEscapeKey(() => {
    if (!openId) return;
    const index = nav.findIndex((item) => item.id === openId);
    close();
    triggers.current[index]?.focus();
  }, Boolean(openId));

  // Only one overlay at a time: moving focus out of the nav (into search, the
  // cart, or the page) dismisses the open panel.
  useEffect(() => {
    if (!openId) return;
    const onFocusIn = (event: FocusEvent) => {
      if (!navRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [openId, close]);

  const onTriggerKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const next =
        event.key === "ArrowRight"
          ? (index + 1) % nav.length
          : (index - 1 + nav.length) % nav.length;
      triggers.current[next]?.focus();
      if (openId) setOpenId(nav[next].id);
    }
    if (event.key === "ArrowDown" && nav[index].panel) {
      event.preventDefault();
      setOpenId(nav[index].id);
    }
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className="relative hidden lg:block"
      onPointerLeave={closeSoon}
    >
      <ul className="flex items-center gap-1">
        {nav.map((item, index) => {
          const open = openId === item.id;
          return (
            <li key={item.id}>
              <button
                ref={(node) => {
                  triggers.current[index] = node;
                }}
                type="button"
                aria-expanded={item.panel ? open : undefined}
                aria-controls={item.panel ? `ma-panel-${item.id}` : undefined}
                onPointerEnter={() => {
                  cancelClose();
                  if (item.panel) setOpenId(item.id);
                }}
                onFocus={() => {
                  cancelClose();
                  if (item.panel) setOpenId(item.id);
                }}
                onClick={() => setOpenId(open ? null : item.id)}
                onKeyDown={(event) => onTriggerKeyDown(event, index)}
                className={`group relative inline-flex h-11 items-center gap-1.5 rounded-tile px-3 text-sm font-medium transition-colors duration-[var(--ma-dur-base)] ${
                  open ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
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
                {item.panel && (
                  <Icon
                    name="chevronDown"
                    size={13}
                    className={`text-ink-faint transition-transform duration-[var(--ma-dur-base)] ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                )}
                {/* gradient active underline — the recurring brand thread */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 bottom-0 h-0.5 origin-left rounded-full bg-gradient-brand transition-transform duration-[var(--ma-dur-slow)] ease-arcade"
                  style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
                />
              </button>
            </li>
          );
        })}
      </ul>

      {nav.map(
        (item) =>
          item.panel &&
          openId === item.id && (
            <MegaPanel key={item.id} item={item} onPointerEnter={cancelClose} onClose={close} />
          ),
      )}
    </nav>
  );
}

function MegaPanel({
  item,
  onPointerEnter,
  onClose,
}: {
  item: NavItem;
  onPointerEnter: () => void;
  onClose: () => void;
}) {
  const panel = item.panel!;
  const featured = bySlug(panel.featured.slug);
  const rail = panel.railSlugs.map(bySlug).filter(Boolean);

  return (
    <div
      id={`ma-panel-${item.id}`}
      onPointerEnter={onPointerEnter}
      className="absolute left-0 top-full z-50 w-[min(72rem,calc(100vw-4rem))] animate-[panel-in_var(--ma-dur-slow)_var(--ma-ease-arcade)] pt-3"
    >
      <div className="scanlines overflow-hidden rounded-panel border border-hairline bg-surface shadow-panel">
        <span aria-hidden="true" className="scanlines-layer" />
        <div aria-hidden="true" className="hairline-gradient relative z-1" />

        <div className="relative z-1 grid gap-7 p-6 lg:grid-cols-[1fr_17rem]">
          <div>
            <div className="grid gap-7 sm:grid-cols-3">
              {panel.columns.map((column) => (
                <div key={column.title}>
                  <h3 className="pixel-label mb-3 text-cyan">{column.title}</h3>
                  <ul className="space-y-1">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href="#"
                          onClick={onClose}
                          className="group flex items-baseline justify-between gap-3 rounded-[6px] px-1.5 py-1.5 text-sm text-ink-muted transition-colors duration-[var(--ma-dur-fast)] hover:bg-card-hover hover:text-ink"
                        >
                          <span>{link.label}</span>
                          {link.note && (
                            <span className="shrink-0 text-[0.6875rem] text-ink-faint">
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

            {/* hot-right-now mini rail */}
            <div className="mt-6 border-t border-hairline pt-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="pixel-label text-gold">{panel.railTitle}</h3>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-xs text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
                >
                  See all <Icon name="chevronRight" size={13} />
                </a>
              </div>
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {rail.map((game) => (
                  <li key={game!.id}>
                    <a
                      href={`/game/${game!.slug}`}
                      className="group/card flex items-center gap-2.5 rounded-tile border border-transparent p-2 transition-colors duration-[var(--ma-dur-base)] hover:border-hairline hover:bg-card"
                    >
                      <CoverThumb
                        game={game!}
                        size={36}
                        className="transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:scale-105"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-medium text-ink">
                          {game!.title}
                        </span>
                        <Price
                          amount={game!.price}
                          size="sm"
                          gradientOnHover={false}
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* featured-deal tile */}
          {featured && (
            <a
              href={`/game/${featured.slug}`}
              className="group/card relative flex flex-col overflow-hidden rounded-card border border-hairline bg-card transition-[box-shadow,border-color,transform] duration-[var(--ma-dur-slow)] ease-arcade hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-glow"
            >
              <Cover game={featured} ratio="square" lockup={false} />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <span className="pixel-label rounded-[4px] bg-bg-deep/80 px-1.5 py-1 text-cyan backdrop-blur-sm">
                  {panel.featured.kicker}
                </span>
                {discountOf(featured) > 0 && <DiscountPill percent={discountOf(featured)} />}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <PlatformChip platform={featured.platform} />
                  {featured.instant && <InstantChip compactLabel />}
                </div>
                <h3 className="text-base leading-snug">{featured.title}</h3>
                <p className="text-xs leading-relaxed text-ink-muted">{panel.featured.blurb}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <Price amount={featured.price} oldAmount={featured.oldPrice} size="lg" />
                  {/* visual affordance only — the whole tile is the link */}
                  <span className="inline-flex h-9 items-center gap-1.5 rounded-tile border border-hairline-strong px-3 text-[0.8125rem] font-medium text-ink transition-colors duration-[var(--ma-dur-base)] group-hover/card:border-cyan group-hover/card:text-cyan">
                    Get the key
                    <Icon name="arrowRight" size={14} />
                  </span>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
