import { trySearchProducts, type searchProducts } from "@/lib/kinguin";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { KinguinCard } from "@/components/store/KinguinCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type SearchArgs = Parameters<typeof searchProducts>[0];

/** Server-rendered shelf of real Kinguin products with cover art. */
export async function KinguinCatalog({
  kicker,
  title,
  description,
  query,
}: {
  kicker?: string;
  title: string;
  description?: string;
  query: SearchArgs;
}) {
  const data = await trySearchProducts({ limit: 24, ...query });
  const products = (data?.results ?? []).filter((p) => Boolean(p.coverImage));

  return (
    <Band>
      <Shell>
        <SectionHeading kicker={kicker} title={title} description={description} />
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p) => (
              <KinguinCard key={p.productId} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing here right now"
            body="This shelf is restocking. Browse the full store in the meantime."
            action={<Button href="/store" size="sm">Browse the store</Button>}
          />
        )}
      </Shell>
    </Band>
  );
}
