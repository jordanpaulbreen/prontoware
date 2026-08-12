import { discountOf, topCharts } from "@/lib/data";
import { CoverThumb } from "@/components/ui/Cover";
import { DiscountPill, PlatformChip, Rating } from "@/components/ui/Chips";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

/**
 * Top 10 as a numbered list with oversized numerals — the top three carry the
 * brand gradient, the rest stay hairline-quiet so the ranking reads instantly.
 */
export function TopCharts() {
  return (
    <Band
      id="charts"
      labelledBy="charts-heading"
      tone="surface"
      texture
      className="border-y border-hairline"
    >
      <Shell>
        <SectionHeading
          id="charts-heading"
          kicker="top charts"
          title="What everyone's playing this week"
          description="Ranked by verified purchases and review score over the last seven days."
          action={{ label: "Top 100", href: "/charts" }}
        />

        <ol className="grid gap-1.5 sm:grid-cols-2 sm:gap-x-8">
          {topCharts.map((game, index) => {
            const rank = index + 1;
            const discount = discountOf(game);
            return (
              <Reveal as="li" key={game.id} delay={Math.min(index, 6) * 40}>
                <a
                  href={`/game/${game.slug}`}
                  className="group/card flex items-center gap-3 rounded-tile border border-transparent px-1.5 py-2.5 transition-[background-color,border-color] duration-[var(--ma-dur-base)] hover:border-hairline hover:bg-card sm:gap-4 sm:px-2.5"
                >
                  <span
                    aria-hidden="true"
                    className={`w-11 shrink-0 text-right font-display text-3xl font-bold leading-none tabular-nums sm:w-14 sm:text-[2.5rem] ${
                      rank <= 3 ? "text-gradient" : "text-ink-faint/60"
                    }`}
                  >
                    {String(rank).padStart(2, "0")}
                  </span>

                  <CoverThumb
                    game={game}
                    size={44}
                    className="transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:scale-105"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-ink transition-colors duration-[var(--ma-dur-base)] group-hover/card:text-cyan">
                      {game.title}
                    </span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-2">
                      <PlatformChip platform={game.platform} withName={false} />
                      <Rating value={game.rating} size={11} />
                    </span>
                  </span>

                  <span className="flex shrink-0 flex-col items-end gap-1">
                    <Price amount={game.price} oldAmount={game.oldPrice} size="md" />
                    {discount > 0 && <DiscountPill percent={discount} />}
                  </span>

                  <Icon
                    name="chevronRight"
                    size={15}
                    className="hidden shrink-0 text-ink-faint transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:translate-x-0.5 group-hover/card:text-cyan sm:block"
                  />
                </a>
              </Reveal>
            );
          })}
        </ol>
      </Shell>
    </Band>
  );
}
