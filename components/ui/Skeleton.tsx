/** Shimmer loader used by the search dropdown and the live genre preview. */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`skeleton relative block rounded-[8px] ${className}`}
    >
      <span className="absolute inset-0 animate-[shimmer_1.4s_linear_infinite] bg-linear-to-r from-transparent via-white/6 to-transparent" />
    </span>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-card border border-hairline bg-card p-2.5">
      <Skeleton className="aspect-[3/4] w-full rounded-tile" />
      <div className="space-y-2 p-1.5 pt-3">
        <Skeleton className="h-3.5 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-5 w-1/2" />
      </div>
    </div>
  );
}
