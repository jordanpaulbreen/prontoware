import { trySearchProducts } from "@/lib/kinguin";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";
import { KinguinCard } from "@/components/store/KinguinCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

/** Real Kinguin products with cover art, grouped into a few shelves. */
export async function KinguinFeatured() {
  const [bestsellers, newest] = await Promise.all([
    trySearchProducts({ sortBy: "bestselling", sortType: "desc", limit: 12 }),
    trySearchProducts({ sortBy: "createdAt", sortType: "desc", limit: 8 }),
  ]);

  const withArt = (list: typeof bestsellers) =>
    (list?.results ?? []).filter((p) => Boolean(p.coverImage));

  const top = withArt(bestsellers);
  const fresh = withArt(newest);

  if (top.length === 0 && fresh.length === 0) {
    return (
      <Band tone="surface">
        <Shell>
          <EmptyState
            title="Store is warming up"
            body="Live products will appear here as soon as the catalogue connects."
            action={<Button href="/store" size="sm">Open the store</Button>}
          />
        </Shell>
      </Band>
    );
  }

  return (
    <>
      {top.length > 0 && (
        <Band tone="surface">
          <Shell>
            <SectionHeading
              kicker="Bestselling now"
              title="Popular game keys"
              description="Official keys from authorised distributors — delivered instantly."
              action={{ label: "See all", href: "/store" }}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {top.map((p) => (
                <KinguinCard key={p.productId} product={p} />
              ))}
            </div>
          </Shell>
        </Band>
      )}

      {fresh.length > 0 && (
        <Band>
          <Shell>
            <SectionHeading
              kicker="Just added"
              title="New in store"
              action={{ label: "Browse new", href: "/new" }}
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {fresh.map((p) => (
                <KinguinCard key={p.productId} product={p} />
              ))}
            </div>
          </Shell>
        </Band>
      )}
    </>
  );
}
