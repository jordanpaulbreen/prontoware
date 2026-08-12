import { coverSrc, withAlpha } from "@/lib/cover";
import type { Game } from "@/lib/types";

type Ratio = "portrait" | "wide" | "square";

const geometry: Record<Ratio, { w: number; h: number; className: string }> = {
  portrait: { w: 600, h: 800, className: "aspect-[3/4]" },
  wide: { w: 1200, h: 675, className: "aspect-[16/9]" },
  square: { w: 600, h: 600, className: "aspect-square" },
};

/**
 * Cover-art-first: the artwork is the only saturated colour in a card, and the
 * ambient glow underneath is sampled from the artwork's dominant colour, so a
 * grid of covers lights the indigo base like screens in a dark room.
 */
export function Cover({
  game,
  ratio = "portrait",
  lockup = true,
  eager = false,
  className = "",
  glowStrength = 0.55,
}: {
  game: Game;
  ratio?: Ratio;
  lockup?: boolean;
  eager?: boolean;
  className?: string;
  glowStrength?: number;
}) {
  const geo = geometry[ratio];

  return (
    <div className={`relative overflow-hidden ${geo.className} ${className}`}>
      <img
        src={coverSrc(game.art, geo.w, geo.h)}
        alt={`${game.title} cover art`}
        width={geo.w}
        height={geo.h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        className="size-full object-cover"
      />

      {/* artwork-derived ambient light */}
      <span
        aria-hidden="true"
        className="cover-glow"
        style={{ ["--cover-glow" as string]: withAlpha(game.art.dominant, glowStrength) }}
      />

      {lockup && (
        <>
          {/* scrim so the lockup stays legible over bright artwork */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
            style={{
              background: "linear-gradient(to top, rgb(8 6 20 / 0.82), transparent)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3">
            <span className="pixel-label text-ink-on-art/60">{game.studio}</span>
            <span className="font-display text-[0.9375rem] font-bold uppercase leading-[1.05] tracking-tight text-ink-on-art drop-shadow-[0_2px_10px_rgb(0_0_0/0.6)]">
              {game.title}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

/** Tiny cover for rails, search results, mini-cart and chart lists. */
export function CoverThumb({
  game,
  size = 44,
  className = "",
}: {
  game: Game;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={coverSrc(game.art, 120, 160)}
      alt=""
      width={size}
      height={Math.round((size * 4) / 3)}
      loading="lazy"
      decoding="async"
      className={`shrink-0 rounded-[6px] object-cover ${className}`}
      style={{ width: size, height: Math.round((size * 4) / 3) }}
    />
  );
}
