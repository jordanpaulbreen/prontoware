"use client";

import { useRef, useState } from "react";
import { useCart, useCurrency } from "@/components/providers/StoreProvider";
import { money } from "@/lib/format";
import { useEscapeKey, useOnClickOutside } from "@/lib/hooks";
import { CoverThumb } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlatformChip } from "@/components/ui/Chips";

/**
 * Cart trigger with count badge. The panel opens on hover for pointer users and
 * on click/focus for everyone else, which keeps it reachable by keyboard and on
 * touch where hover never fires.
 */
export function MiniCart() {
  const { lines, count, subtotal, remove, lastAdded } = useCart();
  const { currency } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useOnClickOutside(wrapper, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

  const openNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  return (
    <div
      ref={wrapper}
      className="relative"
      onPointerEnter={openNow}
      onPointerLeave={closeSoon}
      onFocus={openNow}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
        className="press relative inline-flex size-10 items-center justify-center rounded-tile border border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink"
      >
        <Icon name="cart" size={18} />
        {count > 0 && (
          <span
            className={`absolute -right-1.5 -top-1.5 inline-flex min-w-5 items-center justify-center rounded-chip bg-gradient-brand px-1 text-[0.625rem] font-bold text-ink-invert shadow-glow-sm ${
              lastAdded ? "animate-[pulse-once_var(--ma-dur-slow)_var(--ma-ease-coin)]" : ""
            }`}
          >
            {count}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Mini cart"
          className="absolute right-0 top-full z-60 mt-2 w-[22rem] animate-[panel-in_var(--ma-dur-base)_var(--ma-ease-arcade)] overflow-hidden rounded-panel border border-hairline bg-surface shadow-panel"
        >
          <div aria-hidden="true" className="hairline-gradient" />

          {lines.length === 0 ? (
            <div className="p-3">
              <EmptyState
                compact
                title="Your cart is empty"
                body="Pick a key and it lands in your inbox seconds after checkout."
                action={
                  <Button size="sm" href="/deals">
                    Browse tonight's deals
                  </Button>
                }
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-4 pb-2 pt-3.5">
                <span className="pixel-label text-ink-faint">your keys</span>
                <span className="text-xs text-ink-muted">
                  {count} {count === 1 ? "item" : "items"}
                </span>
              </div>

              <ul className="max-h-72 overflow-y-auto px-2">
                {lines.map((line) => (
                  <li
                    key={line.game.slug}
                    className="flex items-center gap-3 rounded-tile p-2 transition-colors duration-[var(--ma-dur-fast)] hover:bg-card-hover"
                  >
                    <CoverThumb game={line.game} size={38} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{line.game.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <PlatformChip platform={line.game.platform} withName={false} />
                        <span className="text-[0.6875rem] text-ink-faint">×{line.qty}</span>
                      </div>
                    </div>
                    <span className="font-display text-sm font-bold text-ink">
                      {money(line.game.price * line.qty, currency)}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(line.game.slug)}
                      aria-label={`Remove ${line.game.title} from cart`}
                      className="press rounded-[6px] p-1 text-ink-faint hover:text-error"
                    >
                      <Icon name="close" size={14} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-2 border-t border-hairline p-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-xs text-ink-muted">Subtotal · VAT included</span>
                  <span className="font-display text-lg font-bold text-gradient">
                    {money(subtotal, currency)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button href="/cart" variant="surface" size="sm" className="flex-1">
                    View cart
                  </Button>
                  <Button href="/checkout" size="sm" className="flex-1">
                    <Icon name="bolt" size={15} />
                    Checkout
                  </Button>
                </div>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[0.6875rem] text-ink-faint">
                  <Icon name="shield" size={12} />
                  Keys delivered by email in under 60 seconds
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
