import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genres, genreOrder } from "@/lib/data";
import type { GenreId } from "@/lib/types";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

type Params = { id: string };
type SearchParams = { [key: string]: string | string[] | undefined };
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function generateStaticParams() {
  return genreOrder.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const g = genres[id as GenreId];
  return { title: g ? `${g.name} games` : "Genre" };
}

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}) {
  const { id } = await params;
  const g = genres[id as GenreId];
  if (!g) notFound();
  const page = Math.max(1, Number(first((await searchParams).page)) || 1);
  return (
    <KinguinCatalog
      kicker="Genre"
      title={g.name}
      description={g.blurb}
      query={{ genre: g.name, sortBy: "updatedAt", sortType: "desc" }}
      page={page}
      basePath={`/genres/${id}`}
    />
  );
}
