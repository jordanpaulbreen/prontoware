import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "New releases" };

type SearchParams = { [key: string]: string | string[] | undefined };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function NewReleasesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(first(sp.page)) || 1);

  return (
    <KinguinCatalog
      kicker="Fresh keys"
      title="New releases"
      description="The latest official keys added to the store."
      query={{ sortBy: "updatedAt", sortType: "desc" }}
      page={page}
      basePath="/new"
    />
  );
}
