"use client";

import { useCoinPress } from "@/lib/hooks";
import { PixelSparkle } from "./PixelSparkle";

type Variant = "gradient" | "outline" | "ghost" | "surface";
type Size = "sm" | "md" | "lg";

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8125rem] gap-1.5 rounded-tile",
  md: "h-11 px-5 text-sm gap-2 rounded-tile",
  lg: "h-13 px-7 text-base gap-2.5 rounded-card",
};

const variants: Record<Variant, string> = {
  gradient:
    "bg-gradient-brand text-ink-invert font-semibold shadow-glow hover:shadow-glow-strong hover:brightness-110",
  outline:
    "border border-hairline-strong text-ink hover:border-cyan hover:bg-cyan-soft font-medium",
  ghost: "text-ink-muted hover:text-ink hover:bg-surface-2 font-medium",
  surface:
    "bg-surface-2 text-ink border border-hairline hover:border-hairline-strong hover:bg-card-hover font-medium",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  /** Fires a one-shot pixel sparkle on press — reserved for add-to-cart. */
  sparkle?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "gradient",
  size = "md",
  href,
  className = "",
  sparkle = false,
  onClick,
  type = "button",
  ariaLabel,
  disabled,
}: Props) {
  const { pressing, press } = useCoinPress();

  const classes = [
    "relative inline-flex items-center justify-center select-none press",
    "disabled:opacity-50 disabled:pointer-events-none",
    sizes[size],
    variants[variant],
    pressing ? "press-active" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handle = () => {
    press();
    onClick?.();
  };

  const inner = (
    <>
      {children}
      {sparkle && pressing && <PixelSparkle />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={handle} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={handle}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}

/** Square icon button — header cluster, rail arrows, card wishlist. */
export function IconButton({
  children,
  label,
  onClick,
  href,
  active = false,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  className?: string;
}) {
  const { pressing, press } = useCoinPress(180);
  const classes = [
    "relative inline-flex size-10 items-center justify-center rounded-tile border press",
    active
      ? "border-cyan/60 bg-cyan-soft text-cyan"
      : "border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink",
    pressing ? "press-active" : "",
    className,
  ].join(" ");

  const handle = () => {
    press();
    onClick?.();
  };

  if (href) {
    return (
      <a href={href} aria-label={label} title={label} className={classes} onClick={handle}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" aria-label={label} title={label} className={classes} onClick={handle}>
      {children}
    </button>
  );
}
