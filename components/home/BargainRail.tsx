"use client";

import { useState } from "react";
import { bargainsUnder10, bargainsUnder5 } from "@/lib/data";
import { GameCard } from "@/components/cards/GameCard";
import { PixelPrice } from "@/components/ui/Price";
import { Rail } from "@/components/ui/Rail";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

const buckets = [
  { id: "10", label: "Under €10", cap: 10, games: bargainsUnder10 },
  { id: "5", label: "Under €5", cap: 5, games: bargainsUnder5 },
] as const;

/** Bargain bin — the one place the pixel face is allowed on the price tag. */
export function BargainRail() {
  const [active, setActive] = useState(0);
  const bucket = buckets[active];

  return (
    <Band tone="surface" texture labelledBy="bargains-heading" className="border-y border-hairline">
      <Shell>
        <SectionHeading
          id="bargains-heading"
          kicker="the bargain bin"
          title="Coin-sized prices"
          description="Complete games for less than a coffee. Same official keys, same instant delivery."
          action={{ label: "All bargains", href: "/deals/bargains" }}
        />

        <Reveal className="mb-5 flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label="Price bucket"
            className="inline-flex rounded-chip border border-hairline bg-bg p-1"
          >
            {buckets.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={`press rounded-chip px-4 py-2 text-sm font-medium transition-colors duration-[var(--ma-dur-base)] ${
                  index === active
                    ? "bg-gradient-brand text-ink-invert shadow-glow-sm"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-2 text-xs text-ink-muted">
            from <PixelPrice amount={Math.min(...bucket.games.map((g) => g.price))} /> ·{" "}
            {bucket.games.length} titles
          </span>
        </Reveal>

        <Reveal delay={60}>
          <Rail label={bucket.label} itemClass="w-[calc(50%-0.375rem)] sm:w-52 lg:w-56">
            {bucket.games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Rail>
        </Reveal>
      </Shell>
    </Band>
  );
}
