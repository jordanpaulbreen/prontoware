import { Band, Shell } from "@/components/ui/Section";

export default function Loading() {
  return (
    <Band>
      <Shell>
        <div className="mb-6 h-8 w-64 animate-pulse rounded-tile bg-surface-2" />
        <div className="mb-8 h-11 w-full max-w-xl animate-pulse rounded-tile bg-surface-2" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-card border border-hairline bg-surface"
            >
              <div className="aspect-[8/7] animate-pulse bg-surface-2" />
              <div className="space-y-2 p-3.5">
                <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-surface-2" />
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </Band>
  );
}
