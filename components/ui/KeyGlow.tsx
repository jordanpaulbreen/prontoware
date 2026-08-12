/**
 * THE KEY-GLOW — the store's recurring mark.
 *
 * A keycap whose shaft carries the magenta→cyan gradient. It appears in the
 * logo, in loading states, in the checkout success animation ("unlocking") and
 * in every empty state, which is what makes the identity ownable.
 */
export function KeyGlow({
  size = 28,
  turning = false,
  halo = true,
  className = "",
}: {
  size?: number;
  /** Slow rotate — used for loading and empty states. */
  turning?: boolean;
  halo?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {halo && (
        <span
          aria-hidden="true"
          className="absolute inset-[-45%] rounded-full animate-[glow-breathe_5s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, var(--ma-cyan-glow) 0%, transparent 68%)",
          }}
        />
      )}
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={`relative ${turning ? "animate-[key-turn_1.6s_var(--ma-ease-arcade)_infinite]" : ""}`}
        style={{ transformOrigin: "70% 30%" }}
      >
        {/* keycap ring */}
        <circle
          cx="15.6"
          cy="8.4"
          r="4.4"
          stroke="url(#ma-grad)"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <circle cx="15.6" cy="8.4" r="1.35" fill="url(#ma-grad)" />
        {/* shaft + teeth, drawn on a pixel grid for the arcade DNA */}
        <path
          d="M12.5 11.5 4.6 19.4"
          stroke="url(#ma-grad-v)"
          strokeWidth="2.1"
          strokeLinecap="round"
        />
        <path
          d="M7.4 16.6l2.1 2.1M5.6 18.4l2.1 2.1"
          stroke="url(#ma-grad-v)"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Wordmark + mark, used in the header and the footer. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="group/logo inline-flex items-center gap-2.5">
      <KeyGlow size={compact ? 24 : 30} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-tight text-ink ${
            compact ? "text-[1.0625rem]" : "text-xl"
          }`}
        >
          Midnight<span className="text-gradient"> Arcade</span>
        </span>
        {!compact && (
          <span className="pixel-label mt-1 text-ink-faint transition-colors duration-[var(--ma-dur-slow)] group-hover/logo:text-cyan">
            insert coin
          </span>
        )}
      </span>
    </span>
  );
}
