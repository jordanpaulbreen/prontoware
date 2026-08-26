import type { Metadata } from "next";
import { trySearchProducts } from "@/lib/kinguin";
import { platformOrder, platforms } from "@/lib/data";
import { KinguinCard } from "@/components/store/KinguinCard";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Store" };

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const q = first(sp.q)?.trim() ?? "";
  const platform = first(sp.platform) ?? "";
  const max = Number(first(sp.max)) || undefined;
  const page = Math.max(1, Number(first(sp.page)) || 1);

  const kinguin = await trySearchProducts({
    name: q || undefined,
    platform: platform || undefined,
    priceTo: max,
    page,
    limit: 24,
    sortBy: "bestselling",
  });

  const totalPages = kinguin ? Math.max(1, Math.ceil(kinguin.itemCount / 24)) : 1;

  // Only real Kinguin products that actually carry cover art.
  const products = (kinguin?.results ?? []).filter((p) => Boolean(p.coverImage));

  const buildHref = (overrides: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams();
    const merged = { q, platform, max, page, ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v !== undefined && v !== "" && !(k === "page" && v === 1)) params.set(k, String(v));
    }
    const s = params.toString();
    return s ? `/store?${s}` : "/store";
  };

  return (
    <Band>
      <Shell>
        <SectionHeading
          kicker="Browse the store"
          title="Every key, one search away"
          description="Official keys for Steam, Epic, Xbox, PlayStation and Nintendo — delivered to your inbox in under 60 seconds."
        />

        <form method="get" action="/store" className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-56">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint">
              <Icon name="search" size={16} />
            </span>
            <input
              name="q"
              defaultValue={q}
              placeholder="Search games…"
              className="h-11 w-full rounded-tile border border-hairline bg-surface-2 pl-10 pr-3 text-sm text-ink focus:border-cyan focus:outline-none"
            />
          </div>
          <select
            name="platform"
            defaultValue={platform}
            className="h-11 rounded-tile border border-hairline bg-surface-2 px-3 text-sm text-ink focus:border-cyan focus:outline-none"
          >
            <option value="">All platforms</option>
            {platformOrder.map((id) => (
              <option key={id} value={platforms[id].name}>
                {platforms[id].name}
              </option>
            ))}
          </select>
          <Button type="submit">Search</Button>
        </form>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <KinguinCard key={p.productId} product={p} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                {page > 1 && (
                  <Button variant="surface" size="sm" href={buildHref({ page: page - 1 })}>
                    <Icon name="chevronLeft" size={15} /> Previous
                  </Button>
                )}
                <span className="text-sm text-ink-muted">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Button variant="surface" size="sm" href={buildHref({ page: page + 1 })}>
                    Next <Icon name="chevronRight" size={15} />
                  </Button>
                )}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No matching keys"
            body={
              q
                ? `We couldn't find anything for “${q}”. Try a different title or clear your filters.`
                : "No products are available right now. Please check back shortly."
            }
            action={
              <Button href="/store" variant="surface" size="sm">
                Clear search
              </Button>
            }
          />
        )}
      </Shell>
    </Band>
  );
}
