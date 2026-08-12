import { platforms } from "@/lib/data";
import type { PlatformId, Region } from "@/lib/types";
import { Icon } from "./Icon";

const chipBase =
  "inline-flex items-center gap-1.5 rounded-chip border px-2.5 py-1 text-[0.6875rem] font-medium leading-none whitespace-nowrap";

/** Platform chips are deliberately quieter than the brand gradient. */
export function PlatformChip({
  platform,
  withName = true,
  className = "",
}: {
  platform: PlatformId;
  withName?: boolean;
  className?: string;
}) {
  const meta = platforms[platform];
  return (
    <span
      className={`${chipBase} ${className}`}
      style={{
        color: meta.token,
        borderColor: `color-mix(in srgb, ${meta.token} 38%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${meta.token} 12%, transparent)`,
      }}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full"
        style={{ backgroundColor: meta.token }}
      />
      {withName ? meta.name : meta.short}
    </span>
  );
}

export function GenreTag({ label }: { label: string }) {
  return (
    <span className="rounded-chip bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-ink-muted">
      {label}
    </span>
  );
}

export function RegionChip({ region }: { region: Region }) {
  return (
    <span
      className={`${chipBase} border-hairline bg-surface-2 text-ink-muted`}
      title={
        region === "Global"
          ? "Activates on accounts in any region"
          : `Activates only on ${region} accounts`
      }
    >
      <Icon name="globe" size={11} />
      {region}
    </span>
  );
}

export function DiscountPill({ percent, big = false }: { percent: number; big?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-chip font-display font-bold leading-none text-deal ${
        big ? "px-3 py-1.5 text-sm" : "px-2 py-1 text-xs"
      }`}
      style={{
        backgroundColor: "var(--ma-deal-soft)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--ma-deal) 34%, transparent)",
      }}
    >
      −{percent}%
    </span>
  );
}

export function InstantChip({ compactLabel = false }: { compactLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-instant">
      <Icon name="bolt" size={13} />
      {compactLabel ? "Instant" : "Instant delivery"}
    </span>
  );
}

export function BestsellerBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-chip px-2 py-1 text-[0.6875rem] font-semibold leading-none text-gold"
      style={{
        backgroundColor: "var(--ma-gold-soft)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--ma-gold) 32%, transparent)",
      }}
    >
      <Icon name="star" size={11} />
      Bestseller
    </span>
  );
}

export function Rating({
  value,
  reviews,
  size = 12,
}: {
  value: number;
  reviews?: number;
  size?: number;
}) {
  const rounded = Math.round(value * 2) / 2;
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="star"
            size={size}
            className="text-gold"
            style={{
              fill: star <= rounded ? "currentColor" : "transparent",
              opacity: star <= rounded ? 1 : 0.34,
            }}
          />
        ))}
      </span>
      <span className="text-[0.6875rem] font-medium text-ink-muted">
        {value.toFixed(1)}
        {reviews !== undefined && (
          <span className="text-ink-faint"> ({reviews.toLocaleString("en-GB")})</span>
        )}
      </span>
      <span className="sr-only">
        Rated {value.toFixed(1)} out of 5
        {reviews !== undefined ? ` from ${reviews} reviews` : ""}
      </span>
    </span>
  );
}
