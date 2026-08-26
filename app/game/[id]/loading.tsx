import { Band, Shell } from "@/components/ui/Section";

export default function Loading() {
  return (
    <Band>
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="aspect-[8/7] w-full animate-pulse rounded-card bg-surface-2" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[16/9] animate-pulse rounded-tile bg-surface-2" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-tile bg-surface-2" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-surface-2" />
            <div className="h-40 w-full animate-pulse rounded-card bg-surface-2" />
            <div className="h-11 w-full animate-pulse rounded-tile bg-surface-2" />
          </div>
        </div>
      </Shell>
    </Band>
  );
}
