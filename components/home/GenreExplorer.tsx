"use client";

import { useEffect, useMemo, useState } from "react";
import { games, genreOrder, genres } from "@/lib/data";
import type { GenreId } from "@/lib/types";
import { GameCard } from "@/components/cards/GameCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/Icon";

/**
 * Genre explorer: multi-select chips filtering a live preview grid. Selecting a
 * chip shows the shimmer skeleton for a beat — the same loading state a real
 * fetch would use — then swaps in results. Zero matches is where the arcade
 * empty state (turning key, "insert coin") does its work.
 */
export function GenreExplorer() {
  const [selected, setSelected] = useState<GenreId[]>(["action"]);
  const [loading, setLoading] = useState(false);

  const results = useMemo(() => {
    if (!selected.length) return [];
    return games
      .filter((game) => selected.every((genre) => game.genres.includes(genre)))
      .slice(0, 5);
  }, [selected]);

  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(id);
  }, [selected]);

  const toggle = (id: GenreId) =>
    setSelected((current) =>
      current.includes(id) ? current.filter((g) => g !== id) : [...current, id],
    );

  const label = selected.length
    ? selected.map((id) => genres[id].name).join(" + ")
    : "Nothing selected";

  return (
    <Band id="genres" labelledBy="genres-heading">
      <Shell>
        <SectionHeading
          id="genres-heading"
          kicker="genre explorer"
          title="Find your next late-night obsession"
          description="Stack genres to narrow it down. The preview updates as you go."
        />

        <Reveal className="mb-5">
          <div
            role="group"
            aria-label="Filter by genre"
            className="flex flex-wrap items-center gap-2"
          >
            {genreOrder.map((id) => {
              const on = selected.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(id)}
                  title={genres[id].blurb}
                  className={`press inline-flex items-center gap-2 rounded-chip border px-3.5 py-2 text-sm font-medium ${
                    on
                      ? "border-transparent bg-gradient-brand-soft text-ink shadow-glow-sm"
                      : "border-hairline bg-surface-2 text-ink-muted hover:border-hairline-strong hover:text-ink"
                  }`}
                >
                  {on && <Icon name="check" size={13} className="text-cyan" />}
                  {genres[id].name}
                </button>
              );
            })}

            {selected.length > 0 && (
              <button
                type="button"
                onClick={() => setSelected([])}
                className="press rounded-chip px-3 py-2 text-xs font-medium text-ink-faint hover:text-ink"
              >
                Clear
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={80} className="mb-4 flex items-center gap-3">
          <span className="pixel-label text-cyan">{label}</span>
          <span aria-hidden="true" className="hairline-gradient flex-1" />
          <span className="text-xs text-ink-muted" aria-live="polite">
            {loading ? "Loading…" : `${results.length} shown`}
          </span>
        </Reveal>

        {loading ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {[0, 1, 2, 3, 4].map((key) => (
              <li key={key}>
                <CardSkeleton />
              </li>
            ))}
          </ul>
        ) : results.length ? (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {results.map((game, index) => (
              <Reveal as="li" key={game.id} delay={index * 50}>
                <GameCard game={game} />
              </Reveal>
            ))}
          </ul>
        ) : (
          <EmptyState
            title={selected.length ? "No key matches that combo" : "Pick a genre to start"}
            body={
              selected.length
                ? "That mix is a little too specific. Drop a genre and the shelf fills back up."
                : "Choose one or more genres above and the preview grid fills instantly."
            }
            action={
              selected.length ? (
                <Button variant="outline" size="sm" onClick={() => setSelected(["action"])}>
                  <Icon name="refresh" size={15} />
                  Reset filters
                </Button>
              ) : undefined
            }
          />
        )}
      </Shell>
    </Band>
  );
}
