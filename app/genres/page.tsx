import type { Metadata } from "next";
import { genreOrder, genres, gamesByGenre } from "@/lib/data";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";

export const metadata: Metadata = { title: "All genres" };

export default function GenresPage() {
  return (
    <Band>
      <Shell>
        <SectionHeading kicker="Shop by genre" title="Find your next obsession" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {genreOrder.map((id) => {
            const g = genres[id];
            return (
              <a
                key={id}
                href={`/genres/${id}`}
                className="group rounded-card border border-hairline bg-surface p-5 hover:-translate-y-0.5 hover:border-hairline-strong"
              >
                <p className="font-medium text-ink group-hover:text-cyan">{g.name}</p>
                <p className="mt-1 text-sm text-ink-muted">{g.blurb}</p>
                <p className="mt-3 text-xs text-ink-faint">{gamesByGenre(id).length} keys</p>
              </a>
            );
          })}
        </div>
      </Shell>
    </Band>
  );
}
