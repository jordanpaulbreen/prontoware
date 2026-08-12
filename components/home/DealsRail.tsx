import { deals, flashDeals } from "@/lib/data";
import { GameCard } from "@/components/cards/GameCard";
import { Rail } from "@/components/ui/Rail";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { Countdown } from "@/components/ui/Countdown";
import { Icon } from "@/components/ui/Icon";

/** Flash deals first, then everything else discounted 30%+. */
const ordered = [...flashDeals, ...deals.filter((game) => !game.flashMinutes)].slice(0, 10);

export function DealsRail() {
  return (
    <Band id="deals" labelledBy="deals-heading" tone="bg">
      <Shell>
        <SectionHeading
          id="deals-heading"
          kicker="deals drop at midnight"
          title="Tonight's flash deals"
          description="Prices reset at 00:00 CET. When a timer runs out, the price goes back up — no extensions."
          action={{ label: "All deals", href: "/deals" }}
        />

        <Reveal delay={60} className="mb-5">
          <div className="flex flex-wrap items-center gap-3 rounded-card border border-hairline bg-surface p-3.5 sm:gap-5 sm:px-5">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
              <span
                aria-hidden="true"
                className="inline-flex size-8 items-center justify-center rounded-tile text-warn"
                style={{ backgroundColor: "var(--ma-warn-soft)" }}
              >
                <Icon name="clock" size={16} />
              </span>
              Next price reset
            </span>
            <Countdown minutes={186} variant="block" />
            <p className="text-xs leading-relaxed text-ink-muted sm:ml-auto sm:max-w-xs">
              {flashDeals.length} flash titles live right now, up to 78% off official keys.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Rail label="Flash deals">
            {ordered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </Rail>
        </Reveal>
      </Shell>
    </Band>
  );
}
