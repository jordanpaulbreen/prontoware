import type { Metadata } from "next";
import { trySearchProducts, retailToWholesale } from "@/lib/kinguin";
import { KinguinCard } from "@/components/store/KinguinCard";
import { StoreFilters } from "@/components/store/StoreFilters";
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
    priceTo: max ? retailToWholesale(max) : undefined,
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

        <StoreFilters q={q} platform={platform} max={max} />

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
