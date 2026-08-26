"use client";

import { useCart } from "@/components/providers/StoreProvider";
import { bySlug } from "@/lib/data";
import { GameCard } from "@/components/cards/GameCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export function WishlistView() {
  const { wishlist } = useCart();
  const items = wishlist.map(bySlug).filter(Boolean);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your wishlist is empty"
        body="Tap the heart on any game to save it here and get a price-drop alert."
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
      {items.map((g) => (
        <GameCard key={g!.id} game={g!} />
      ))}
    </div>
  );
}
