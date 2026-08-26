"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrency } from "@/components/providers/StoreProvider";
import { platformOrder, platforms } from "@/lib/data";
import { rates } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Store search + filters. The price cap is entered in the shopper's selected
    currency and converted to the EUR the catalogue is priced in before it hits
    the server, so the filter always matches the prices shown on the cards. */
export function StoreFilters({
  q,
  platform,
  max,
}: {
  q: string;
  platform: string;
  max?: number; // EUR
}) {
  const router = useRouter();
  const { currency } = useCurrency();
  const { rate, symbol, suffix } = rates[currency];

  const [query, setQuery] = useState(q);
  const [plat, setPlat] = useState(platform);
  const [maxInput, setMaxInput] = useState(max ? String(Math.round(max * rate)) : "");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (plat) params.set("platform", plat);
    const displayMax = Number(maxInput);
    if (displayMax > 0) params.set("max", String(Math.round(displayMax / rate)));
    const s = params.toString();
    router.push(s ? `/store?${s}` : "/store");
  }

  return (
    <form onSubmit={submit} className="mb-8 flex flex-wrap items-center gap-3">
      <div className="relative min-w-56 flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
          <Icon name="search" size={16} />
        </span>
        <input
          name="q"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search games…"
          className="h-11 w-full rounded-tile border border-hairline bg-surface-2 pl-10 pr-3 text-sm text-ink focus:border-cyan focus:outline-none"
        />
      </div>

      <select
        value={plat}
        onChange={(e) => setPlat(e.target.value)}
        aria-label="Platform"
        className="h-11 rounded-tile border border-hairline bg-surface-2 px-3 text-sm text-ink focus:border-cyan focus:outline-none"
      >
        <option value="">All platforms</option>
        {platformOrder.map((id) => (
          <option key={id} value={platforms[id].name}>
            {platforms[id].name}
          </option>
        ))}
      </select>

      <div className="relative w-36">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-faint">
          {suffix ? "≤" : `≤ ${symbol}`}
        </span>
        <input
          inputMode="decimal"
          value={maxInput}
          onChange={(e) => setMaxInput(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="Max price"
          aria-label={`Maximum price in ${currency}`}
          className={`h-11 w-full rounded-tile border border-hairline bg-surface-2 pr-3 text-sm text-ink placeholder:text-ink-faint focus:border-cyan focus:outline-none ${
            suffix ? "pl-8" : "pl-10"
          }`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-faint">
            {symbol.trim()}
          </span>
        )}
      </div>

      <Button type="submit">Search</Button>
    </form>
  );
}
