import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "Top charts" };

type SearchParams = { [key: string]: string | string[] | undefined };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ChartsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(first(sp.page)) || 1);

  return (
    <KinguinCatalog
      kicker="This week"
      title="Top charts"
      description="The store's most-stocked keys, ranked by catalogue standing."
      query={{ sortBy: "kinguinId", sortType: "desc" }}
      page={page}
      basePath="/charts"
    />
  );
}
