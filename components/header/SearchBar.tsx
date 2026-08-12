"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { games, genres, platforms } from "@/lib/data";
import { useEscapeKey, useOnClickOutside } from "@/lib/hooks";
import { CoverThumb } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/ui/Price";
import { Skeleton } from "@/components/ui/Skeleton";
import { PlatformChip } from "@/components/ui/Chips";

const popular = ["Neon Requiem", "horror", "under €10", "Steam", "pre-orders"];

/**
 * Instant search with a combobox pattern: the input owns aria-activedescendant,
 * the dropdown is a listbox of options, and Arrow/Enter/Escape all work without
 * a pointer. Results are local, with a short simulated latency so the shimmer
 * skeleton is part of the real experience rather than a demo-only state.
 */
export function SearchBar({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const wrapper = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(wrapper, () => setOpen(false), open);
  useEscapeKey(() => {
    setOpen(false);
    inputRef.current?.blur();
  }, open);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return games
      .filter(
        (game) =>
          game.title.toLowerCase().includes(q) ||
          game.studio.toLowerCase().includes(q) ||
          platforms[game.platform].name.toLowerCase().includes(q) ||
          game.genres.some((genre) => genres[genre].name.toLowerCase().includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(id);
  }, [query]);

  useEffect(() => setCursor(-1), [query]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || !results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => (c <= 0 ? results.length - 1 : c - 1));
    } else if (event.key === "Enter" && cursor >= 0) {
      window.location.href = `/game/${results[cursor].slug}`;
    }
  };

  // ⌘/Ctrl+K focuses search from anywhere, as gamers expect from a launcher.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const showPanel = open;

  return (
    <div ref={wrapper} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="group relative flex items-center"
      >
        <label htmlFor="ma-search" className="sr-only">
          Search games, platforms and genres
        </label>
        <Icon
          name="search"
          size={17}
          className="pointer-events-none absolute left-3.5 text-ink-faint transition-colors duration-[var(--ma-dur-base)] group-focus-within:text-cyan"
        />
        <input
          id="ma-search"
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="ma-search-results"
          aria-autocomplete="list"
          aria-activedescendant={cursor >= 0 ? `ma-search-option-${cursor}` : undefined}
          autoComplete="off"
          placeholder="Search 14 000+ keys — try “Neon Requiem”"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-11 w-full rounded-tile border border-hairline bg-surface-2 pl-10.5 pr-24 text-sm text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--ma-dur-base)] hover:border-hairline-strong focus:border-transparent focus-visible:shadow-[0_0_0_1px_var(--ma-cyan),0_0_22px_-6px_var(--ma-cyan-glow)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 hidden items-center gap-1 rounded-[6px] border border-hairline bg-bg-deep px-1.5 py-1 md:flex"
        >
          <span className="pixel-label text-ink-faint">ctrl</span>
          <span className="pixel-label text-ink-faint">k</span>
        </span>
      </form>

      {showPanel && (
        <div
          id="ma-search-results"
          className="absolute inset-x-0 top-full z-60 mt-2 animate-[panel-in_var(--ma-dur-base)_var(--ma-ease-arcade)] overflow-hidden rounded-panel border border-hairline bg-surface shadow-panel"
        >
          <div aria-hidden="true" className="hairline-gradient" />

          {!query.trim() && (
            <div className="p-4">
              <span className="pixel-label text-ink-faint">popular right now</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {popular.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="press rounded-chip border border-hairline bg-surface-2 px-2.5 py-1.5 text-xs text-ink-muted hover:border-cyan hover:text-cyan"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && loading && (
            <div className="space-y-2 p-3">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-3 p-1">
                  <Skeleton className="h-14 w-10.5" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3.5 w-2/5" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-4 w-14" />
                </div>
              ))}
            </div>
          )}

          {query.trim() && !loading && results.length > 0 && (
            <>
              <ul role="listbox" aria-label="Search results" className="max-h-96 overflow-y-auto p-2">
                {results.map((game, index) => (
                  <li key={game.id} role="none">
                    <a
                      id={`ma-search-option-${index}`}
                      role="option"
                      aria-selected={index === cursor}
                      href={`/game/${game.slug}`}
                      onMouseEnter={() => setCursor(index)}
                      className={`flex items-center gap-3 rounded-tile p-2 transition-colors duration-[var(--ma-dur-fast)] ${
                        index === cursor ? "bg-card-hover" : ""
                      }`}
                    >
                      <CoverThumb game={game} size={40} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">
                          {game.title}
                        </span>
                        <span className="mt-1 flex items-center gap-2">
                          <PlatformChip platform={game.platform} />
                          <span className="text-[0.6875rem] text-ink-faint">{game.region}</span>
                        </span>
                      </span>
                      <Price
                        amount={game.price}
                        oldAmount={game.oldPrice}
                        size="sm"
                        gradientOnHover={false}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`/search?q=${encodeURIComponent(query)}`}
                className="flex items-center justify-between border-t border-hairline px-4 py-3 text-xs font-medium text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
              >
                See all results for “{query.trim()}”
                <Icon name="arrowRight" size={15} />
              </a>
            </>
          )}

          {query.trim() && !loading && results.length === 0 && (
            <div className="flex items-center gap-3 px-4 py-6">
              <span className="pixel-label text-ink-faint">no match</span>
              <p className="text-sm text-ink-muted">
                Nothing for “{query.trim()}”. Try a platform, a genre, or a studio name.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
