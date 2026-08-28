import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { platforms, platformOrder } from "@/lib/data";
import type { PlatformId } from "@/lib/types";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

type Params = { id: string };
type SearchParams = { [key: string]: string | string[] | undefined };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function generateStaticParams() {
  return platformOrder.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const p = platforms[id as PlatformId];
  return { title: p ? `${p.name} keys` : "Platform" };
}

export default async function PlatformPage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const p = platforms[id as PlatformId];
  if (!p) notFound();
  const page = Math.max(1, Number(first((await searchParams).page)) || 1);
  return (
    <KinguinCatalog
      kicker="Platform"
      title={`${p.name} keys`}
      description={`Official ${p.name} keys, delivered to your inbox in under 60 seconds.`}
      query={{ platform: p.name, sortBy: "updatedAt", sortType: "desc" }}
      page={page}
      basePath={`/platforms/${id}`}
    />
  );
}
