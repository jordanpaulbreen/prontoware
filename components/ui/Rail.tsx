"use client";

import { useRail } from "@/lib/hooks";
import { Icon } from "./Icon";

/**
 * Horizontal rail with snap scrolling. On mobile it is a plain swipe area with
 * an edge-fade hint; from `sm` up, arrow buttons appear and disable themselves
 * at the ends. Keyboard users can tab straight through the cards.
 */
export function Rail({
  children,
  label,
  itemClass = "w-[calc(50%-0.375rem)] sm:w-56 lg:w-60",
  className = "",
}: {
  children: React.ReactNode[];
  label: string;
  itemClass?: string;
  className?: string;
}) {
  const { ref, start, end, scrollBy } = useRail<HTMLUListElement>();

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={ref}
        aria-label={label}
        className="ma-scroll -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 pb-3 sm:mx-0 sm:gap-4 sm:px-0"
      >
        {children.map((child, index) => (
          <li key={index} className={`shrink-0 snap-start ${itemClass}`}>
            {child}
          </li>
        ))}
      </ul>

      {/* edge fades — pure decoration, they never eat pointer events */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-4 w-8 bg-linear-to-r from-bg to-transparent transition-opacity duration-[var(--ma-dur-slow)] sm:hidden"
        style={{ opacity: start ? 0 : 1 }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -right-4 w-8 bg-linear-to-l from-bg to-transparent transition-opacity duration-[var(--ma-dur-slow)] sm:hidden"
        style={{ opacity: end ? 0 : 1 }}
      />

      <div className="mt-1 hidden justify-end gap-2 sm:flex">
        <RailArrow direction="left" disabled={start} onClick={() => scrollBy(-1)} label={`Scroll ${label} left`} />
        <RailArrow direction="right" disabled={end} onClick={() => scrollBy(1)} label={`Scroll ${label} right`} />
      </div>
    </div>
  );
}

function RailArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="press inline-flex size-9 items-center justify-center rounded-tile border border-hairline bg-surface-2 text-ink-muted hover:border-cyan hover:text-cyan disabled:opacity-35 disabled:hover:border-hairline disabled:hover:text-ink-muted"
    >
      <Icon name={direction === "left" ? "chevronLeft" : "chevronRight"} size={16} />
    </button>
  );
}
