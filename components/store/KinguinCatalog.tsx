import { trySearchProducts, type searchProducts } from "@/lib/kinguin";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { KinguinCard } from "@/components/store/KinguinCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type SearchArgs = Parameters<typeof searchProducts>[0];

const PAGE_SIZE = 24;

/** Server-rendered, paginated shelf of real Kinguin products with cover art. */
export async function KinguinCatalog({
  kicker,
  title,
  description,
  query,
  page = 1,
  basePath,
  preserveParams,
  maxRetailPrice,
}: {
  kicker?: string;
  title: string;
  description?: string;
  query: SearchArgs;
  page?: number;
  /** Route used to build pagination links, e.g. "/platforms/steam". */
  basePath?: string;
  /** Extra query params to keep on pagination links (e.g. the deals price cap). */
  preserveParams?: Record<string, string | number | undefined>;
  /** Retail (marked-up) price ceiling — filters out any card above the cap the
      buyer actually sees, since the API filters on the lower wholesale price. */
  maxRetailPrice?: number;
}) {
  const data = await trySearchProducts({ limit: PAGE_SIZE, page, ...query });
  let products = (data?.results ?? []).filter((p) => Boolean(p.coverImage));
  if (maxRetailPrice != null) products = products.filter((p) => p.price <= maxRetailPrice);

  const totalPages = data ? Math.max(1, Math.ceil(data.itemCount / PAGE_SIZE)) : 1;

  const hrefForPage = (n: number) => {
    if (!basePath) return "#";
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(preserveParams ?? {})) {
      if (v !== undefined && v !== "") params.set(k, String(v));
    }
    if (n > 1) params.set("page", String(n));
    const s = params.toString();
    return s ? `${basePath}?${s}` : basePath;
  };

  return (
    <Band>
      <Shell>
        <SectionHeading kicker={kicker} title={title} description={description} />
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <KinguinCard key={p.productId} product={p} />
              ))}
            </div>
            {basePath && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                {page > 1 && (
                  <Button variant="surface" size="sm" href={hrefForPage(page - 1)}>
                    <Icon name="chevronLeft" size={15} /> Previous
                  </Button>
                )}
                <span className="text-sm text-ink-muted">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Button variant="surface" size="sm" href={hrefForPage(page + 1)}>
                    Next <Icon name="chevronRight" size={15} />
                  </Button>
                )}
              </div>
            )}
          </>
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
