import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";
import { retailToWholesale } from "@/lib/kinguin";

export const metadata: Metadata = { title: "Deals & flash sales" };

type SearchParams = { [key: string]: string | string[] | undefined };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const max = Number(first(sp.max)) || undefined;
  const page = Math.max(1, Number(first(sp.page)) || 1);

  return (
    <KinguinCatalog
      kicker="Save now"
      title={max ? `Deals under €${max}` : "Best-value keys"}
      description="Great prices on official keys — the cheapest keys in the store first."
      query={{
        priceTo: max ? retailToWholesale(max) : undefined,
        sortBy: "kinguinId",
        sortType: "asc",
      }}
      page={page}
      basePath="/deals"
      preserveParams={{ max }}
      maxRetailPrice={max}
    />
  );
}
