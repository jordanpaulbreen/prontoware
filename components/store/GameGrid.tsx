import type { Game } from "@/lib/types";
import { GameCard } from "@/components/cards/GameCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <EmptyState
        title="Nothing here yet"
        body="We're restocking this shelf. Browse the full store in the meantime."
        action={
          <Button href="/store" size="sm">
            Browse the store
          </Button>
        }
      />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {games.map((g) => (
        <GameCard key={g.id} game={g} />
      ))}
    </div>
  );
}
