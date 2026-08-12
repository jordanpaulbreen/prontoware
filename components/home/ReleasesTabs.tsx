"use client";

import { useId, useRef, useState } from "react";
import { newReleases, preorders } from "@/lib/data";
import { GameCard } from "@/components/cards/GameCard";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

const tabs = [
  {
    id: "new",
    label: "New releases",
    note: "Out now",
    games: newReleases.slice(0, 10),
    blurb: "Fresh keys, launch prices locked for the first 72 hours.",
  },
  {
    id: "pre",
    label: "Pre-orders",
    note: "Coming soon",
    games: preorders,
    blurb: "Your key is delivered the second the game unlocks — cancel any time before that.",
  },
] as const;

/**
 * New Releases and Pre-orders share one component and one grid. Full tab
 * semantics: roving tabindex, ArrowLeft/Right + Home/End, and a gradient
 * underline that slides to the active tab.
 */
export function ReleasesTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    let next = active;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  const current = tabs[active];

  return (
    <Band id="new" labelledBy="releases-heading">
      <Shell>
        <SectionHeading
          id="releases-heading"
          kicker="just landed"
          title="New releases & pre-orders"
          description={current.blurb}
          action={{ label: "Release calendar", href: "/calendar" }}
        />

        <Reveal className="mb-6">
          <div
            role="tablist"
            aria-label="Release type"
            onKeyDown={onKeyDown}
            className="inline-flex items-center gap-1 rounded-card border border-hairline bg-surface p-1"
          >
            {tabs.map((tab, index) => {
              const selected = index === active;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  role="tab"
                  id={`${baseId}-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`press relative inline-flex items-center gap-2 rounded-tile px-4 py-2.5 text-sm font-medium transition-colors duration-[var(--ma-dur-base)] ${
                    selected ? "text-ink" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {tab.label}
                  <span className="pixel-label text-ink-faint">{tab.note}</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-gradient-brand transition-transform duration-[var(--ma-dur-slow)] ease-arcade"
                    style={{ transform: selected ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </button>
              );
            })}

            <span aria-hidden="true" className="mx-1 h-5 w-px bg-hairline" />
            <span className="hidden items-center gap-1.5 px-2 text-xs text-ink-muted sm:inline-flex">
              <Icon name="bolt" size={13} className="text-instant" />
              {current.games.length} titles
            </span>
          </div>
        </Reveal>

        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`${baseId}-panel-${tab.id}`}
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={index !== active}
            tabIndex={0}
            className="animate-[panel-in_var(--ma-dur-slow)_var(--ma-ease-arcade)] rounded-tile focus-visible:outline-none"
          >
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {tab.games.map((game, gameIndex) => (
                <Reveal as="li" key={game.id} delay={Math.min(gameIndex, 9) * 50}>
                  <GameCard game={game} />
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </Shell>
    </Band>
  );
}
