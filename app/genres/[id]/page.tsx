import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { genres, genreOrder } from "@/lib/data";
import type { GenreId } from "@/lib/types";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

type Params = { id: string };

export function generateStaticParams() {
  return genreOrder.map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const g = genres[id as GenreId];
  return { title: g ? `${g.name} games` : "Genre" };
}

export default async function GenrePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const g = genres[id as GenreId];
  if (!g) notFound();
  return (
    <KinguinCatalog
      kicker="Genre"
      title={g.name}
      description={g.blurb}
      query={{ genre: g.name, sortBy: "bestselling", sortType: "desc" }}
    />
  );
}
