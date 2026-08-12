"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCart } from "@/components/providers/StoreProvider";
import { bySlug, discountOf, genres, heroSlides, heroSpotlights } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import type { Game } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import {
  DiscountPill,
  GenreTag,
  InstantChip,
  PlatformChip,
  Rating,
  RegionChip,
} from "@/components/ui/Chips";
import { Cover } from "@/components/ui/Cover";
import { Countdown } from "@/components/ui/Countdown";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/ui/Price";
import { withAlpha } from "@/lib/cover";

const ROTATE_MS = 7000;

/**
 * The hero is an event, not a banner: one cinematic feature slot with the cover
 * art bleeding into the indigo base, flanked by a compact spotlight stack.
 *
 * It auto-rotates, pauses on hover/focus and on an explicit pause button, never
 * auto-rotates under prefers-reduced-motion, and is swipeable on touch. The
 * live region announces slide changes for screen reader users.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const touchX = useRef<number | null>(null);
  const { add, toggleWish, wishlist } = useCart();

  const go = useCallback(
    (direction: 1 | -1) =>
      setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length),
    [],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(1), ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, go]);

  const slide = heroSlides[index];
  const discount = discountOf(slide);
  const wished = wishlist.includes(slide.slug);

  return (
    <section
      aria-label="Featured games"
      aria-roledescription="carousel"
      className="scanlines relative overflow-hidden pt-6 pb-10 sm:pt-8"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <span aria-hidden="true" className="scanlines-layer" />

      {/* ambient wash sampled from the active cover — the room lighting up */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-[28rem] transition-[background] duration-[700ms] ease-arcade"
        style={{
          background: `radial-gradient(60% 60% at 50% 40%, ${withAlpha(slide.art.dominant, 0.22)} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-1 mx-auto w-full max-w-(--container-shell) px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.62fr)_minmax(0,1fr)] lg:gap-5">
          {/* ---------------- feature slot ---------------- */}
          <div
            className="group/card relative overflow-hidden rounded-hero border border-hairline bg-card shadow-card"
            onTouchStart={(event) => {
              touchX.current = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const delta = event.changedTouches[0].clientX - touchX.current;
              if (Math.abs(delta) > 48) go(delta < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <div
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
            >{`Slide ${index + 1} of ${heroSlides.length}: ${slide.title}`}</div>

            {/* stacked covers crossfade so nothing ever pops */}
            <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/9]">
              {heroSlides.map((item, itemIndex) => (
                <div
                  key={item.id}
                  aria-hidden={itemIndex !== index}
                  className="absolute inset-0 transition-opacity duration-[700ms] ease-arcade"
                  style={{ opacity: itemIndex === index ? 1 : 0 }}
                >
                  <Cover
                    game={item}
                    ratio="wide"
                    lockup={false}
                    eager={itemIndex === 0}
                    glowStrength={0.7}
                    className="size-full"
                  />
                </div>
              ))}

              {/* vignette into the indigo base */}
              <span
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--ma-card) 4%, color-mix(in srgb, var(--ma-card) 72%, transparent) 38%, transparent 78%), linear-gradient(to right, color-mix(in srgb, var(--ma-card) 78%, transparent) 0%, transparent 62%)",
                }}
              />
            </div>

            {/* copy sits on the vignette, never on raw artwork */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pixel-label rounded-[4px] bg-bg-deep/70 px-2 py-1.5 text-cyan backdrop-blur-sm">
                  headline release
                </span>
                <PlatformChip platform={slide.platform} />
                {slide.genres.slice(0, 2).map((genre) => (
                  <GenreTag key={genre} label={genres[genre].name} />
                ))}
                <RegionChip region={slide.region} />
              </div>

              <h1 className="mt-3 max-w-2xl text-[2rem] leading-[0.98] sm:text-5xl lg:text-[3.5rem]">
                {slide.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Rating value={slide.rating} reviews={slide.reviews} size={13} />
                <InstantChip />
                {slide.flashMinutes && <Countdown minutes={slide.flashMinutes} />}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  {discount > 0 && <DiscountPill percent={discount} big />}
                  <Price
                    amount={slide.price}
                    oldAmount={slide.oldPrice}
                    size="xl"
                    gradientOnHover={false}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button size="lg" sparkle onClick={() => add(slide.slug)}>
                    <Icon name="bolt" size={18} />
                    Get the key
                  </Button>
                  <Button
                    size="lg"
                    variant="surface"
                    ariaLabel={wished ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => toggleWish(slide.slug)}
                    className="px-4"
                  >
                    <Icon
                      name="heart"
                      size={18}
                      className={wished ? "text-magenta" : ""}
                      style={{ fill: wished ? "currentColor" : "transparent" }}
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* carousel controls */}
            <div className="absolute right-4 top-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
                className="press inline-flex size-9 items-center justify-center rounded-tile border border-hairline bg-bg-deep/70 text-ink-muted backdrop-blur-sm hover:text-ink"
              >
                <Icon name={paused ? "play" : "minus"} size={15} />
              </button>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="press hidden size-9 items-center justify-center rounded-tile border border-hairline bg-bg-deep/70 text-ink-muted backdrop-blur-sm hover:text-ink sm:inline-flex"
              >
                <Icon name="chevronLeft" size={15} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="press hidden size-9 items-center justify-center rounded-tile border border-hairline bg-bg-deep/70 text-ink-muted backdrop-blur-sm hover:text-ink sm:inline-flex"
              >
                <Icon name="chevronRight" size={15} />
              </button>
            </div>

            <div className="absolute bottom-3 right-4 flex items-center gap-1.5 sm:bottom-4">
              {heroSlides.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(itemIndex)}
                  aria-label={`Show ${item.title}`}
                  aria-current={itemIndex === index}
                  className="press h-1.5 rounded-full transition-all duration-[var(--ma-dur-slow)] ease-arcade"
                  style={{
                    width: itemIndex === index ? 28 : 10,
                    backgroundImage:
                      itemIndex === index ? "var(--gradient-brand)" : undefined,
                    backgroundColor:
                      itemIndex === index ? undefined : "var(--ma-hairline-strong)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* ---------------- spotlight stack ---------------- */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3.5">
            {heroSpotlights.map((spot) => {
              const game = bySlug(spot.slug);
              if (!game) return null;
              return <SpotlightTile key={spot.slug} game={game} kind={spot.kind} note={spot.note} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function SpotlightTile({ game, kind, note }: { game: Game; kind: string; note: string }) {
  const discount = discountOf(game);

  return (
    <a
      href={`/game/${game.slug}`}
      className="group/card relative flex flex-1 items-center gap-3.5 overflow-hidden rounded-card border border-hairline bg-card p-3 shadow-card transition-[transform,border-color,box-shadow] duration-[var(--ma-dur-slow)] ease-arcade hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-glow lg:p-3.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-[var(--ma-dur-slow)] group-hover/card:opacity-100"
        style={{
          background: `radial-gradient(70% 120% at 0% 100%, ${withAlpha(game.art.dominant, 0.26)} 0%, transparent 68%)`,
        }}
      />

      <Cover
        game={game}
        ratio="portrait"
        lockup={false}
        className="relative w-20 shrink-0 rounded-tile lg:w-[5.5rem]"
      />

      <span className="relative min-w-0 flex-1">
        <span className="pixel-label text-gold">{kind}</span>
        <span className="mt-1.5 block truncate font-display text-[0.9375rem] font-bold tracking-tight text-ink">
          {game.title}
        </span>
        <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
          <PlatformChip platform={game.platform} withName={false} />
          <span className="text-[0.6875rem] text-ink-faint">{note}</span>
        </span>
        <span className="mt-2 flex items-center gap-2">
          <Price amount={game.price} oldAmount={game.oldPrice} size="md" />
          {discount > 0 && <DiscountPill percent={discount} />}
        </span>
      </span>

      <Icon
        name="chevronRight"
        size={16}
        className="relative shrink-0 text-ink-faint transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:translate-x-0.5 group-hover/card:text-cyan"
      />
    </a>
  );
}
