import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "Deals & flash sales" };

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const maxRaw = Array.isArray(sp.max) ? sp.max[0] : sp.max;
  const max = Number(maxRaw) || undefined;

  return (
    <KinguinCatalog
      kicker="Save now"
      title={max ? `Deals under €${max}` : "Best-value keys"}
      description="Great prices on official keys, sorted by what buyers are grabbing right now."
      query={{ priceTo: max, sortBy: "bestselling", sortType: "desc" }}
    />
  );
}
