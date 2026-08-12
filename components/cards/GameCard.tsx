"use client";

import { useState } from "react";
import { useCart } from "@/components/providers/StoreProvider";
import { discountOf, genres, platforms } from "@/lib/data";
import { useCoinPress } from "@/lib/hooks";
import type { Game } from "@/lib/types";
import {
  BestsellerBadge,
  DiscountPill,
  GenreTag,
  InstantChip,
  PlatformChip,
  Rating,
  RegionChip,
} from "@/components/ui/Chips";
import { Countdown } from "@/components/ui/Countdown";
import { Cover, CoverThumb } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { PixelSparkle } from "@/components/ui/PixelSparkle";
import { Price } from "@/components/ui/Price";

/**
 * THE product card — one component for every grid, rail and panel in the store.
 *
 * Cover art leads, the artwork's own glow lights the card on hover, and the
 * commerce layer (price, delivery, region) sits on the calm indigo surface
 * underneath. The add-to-cart action reveals on hover from `sm` up and is
 * permanently visible on touch, where hover does not exist.
 */
export function GameCard({
  game,
  eager = false,
  showCountdown = true,
}: {
  game: Game;
  eager?: boolean;
  showCountdown?: boolean;
}) {
  const { add, wishlist, toggleWish } = useCart();
  const { pressing, press } = useCoinPress();
  const [wishPulse, setWishPulse] = useState(false);
  const discount = discountOf(game);
  const wished = wishlist.includes(game.slug);

  const handleAdd = () => {
    press();
    add(game.slug);
  };

  const handleWish = () => {
    toggleWish(game.slug);
    setWishPulse(true);
    window.setTimeout(() => setWishPulse(false), 300);
  };

  return (
    <article className="group/card press relative flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-card shadow-card hover:-translate-y-1 hover:border-hairline-strong hover:shadow-glow">
      <div className="relative">
        <Cover game={game} eager={eager} />

        {/* the cover's glow intensifies as the pointer arrives */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--ma-dur-slow)] ease-arcade group-hover/card:opacity-100"
          style={{
            background: `radial-gradient(120% 90% at 50% 110%, color-mix(in srgb, ${platforms[game.platform].token} 0%, transparent), transparent 70%)`,
            boxShadow: "inset 0 -40px 60px -30px var(--ma-cyan-glow)",
          }}
        />

        <div className="absolute inset-x-2.5 top-2.5 flex items-start justify-between gap-2">
          <span className="flex flex-col items-start gap-1.5">
            <PlatformChip platform={game.platform} withName={false} />
            {game.bestseller && <BestsellerBadge />}
          </span>
          {discount > 0 && <DiscountPill percent={discount} />}
        </div>

        {/* hover actions */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-end justify-between gap-2 sm:translate-y-[130%] sm:opacity-0 sm:transition-all sm:duration-[var(--ma-dur-slow)] sm:ease-arcade sm:group-hover/card:translate-y-0 sm:group-hover/card:opacity-100 sm:group-focus-within/card:translate-y-0 sm:group-focus-within/card:opacity-100">
          <button
            type="button"
            onClick={handleAdd}
            className={`press relative inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-tile bg-gradient-brand text-[0.8125rem] font-semibold text-ink-invert shadow-glow hover:brightness-110 ${
              pressing ? "press-active" : ""
            }`}
          >
            <Icon name="cart" size={15} />
            {game.preorder ? "Pre-order" : "Add to cart"}
            {pressing && <PixelSparkle />}
          </button>
          <button
            type="button"
            onClick={handleWish}
            aria-pressed={wished}
            aria-label={wished ? `Remove ${game.title} from wishlist` : `Add ${game.title} to wishlist`}
            className={`press inline-flex size-9 items-center justify-center rounded-tile border backdrop-blur-sm ${
              wished
                ? "border-magenta/60 bg-magenta-soft text-magenta"
                : "border-hairline-strong bg-bg-deep/70 text-ink-muted hover:text-ink"
            }`}
          >
            <Icon
              name="heart"
              size={16}
              className={wishPulse ? "animate-[pulse-once_var(--ma-dur-slow)_var(--ma-ease-coin)]" : ""}
              style={{ fill: wished ? "currentColor" : "transparent" }}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex flex-wrap items-center gap-1.5">
          {game.genres.slice(0, 2).map((genre) => (
            <GenreTag key={genre} label={genres[genre].name} />
          ))}
          <RegionChip region={game.region} />
        </div>

        <h3 className="text-[0.9375rem] leading-snug">
          <a
            href={`/game/${game.slug}`}
            className="line-clamp-2 rounded-[4px] transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
          >
            {game.title}
          </a>
        </h3>

        <Rating value={game.rating} reviews={game.reviews} />

        {showCountdown && game.flashMinutes && (
          <Countdown minutes={game.flashMinutes} label="" />
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <Price amount={game.price} oldAmount={game.oldPrice} size="lg" />
          {game.preorder ? (
            <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-gold">
              <Icon name="clock" size={13} />
              {game.releaseLabel}
            </span>
          ) : (
            game.instant && <InstantChip compactLabel />
          )}
        </div>
      </div>
    </article>
  );
}

/** Compact horizontal variant — mini-cart lines, chart lists, search results. */
export function GameRow({
  game,
  index,
  action,
  thumbSize = 40,
}: {
  game: Game;
  index?: number;
  action?: React.ReactNode;
  thumbSize?: number;
}) {
  return (
    <div className="group/card flex items-center gap-3 rounded-tile p-2 transition-colors duration-[var(--ma-dur-base)] hover:bg-card-hover">
      {index !== undefined && (
        <span className="w-7 shrink-0 text-right font-display text-lg font-bold tabular-nums text-ink-faint">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <CoverThumb
        game={game}
        size={thumbSize}
        className="transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:scale-105"
      />
      <div className="min-w-0 flex-1">
        <a
          href={`/game/${game.slug}`}
          className="line-clamp-1 text-sm font-medium text-ink transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
        >
          {game.title}
        </a>
        <div className="mt-1 flex items-center gap-2">
          <PlatformChip platform={game.platform} withName={false} />
          <Rating value={game.rating} size={11} />
        </div>
      </div>
      {action ?? <Price amount={game.price} oldAmount={game.oldPrice} size="sm" />}
    </div>
  );
}
