import type { Metadata } from "next";
import { Band, Shell } from "@/components/ui/Section";
import { WishlistView } from "@/components/store/WishlistView";

export const metadata: Metadata = { title: "Wishlist" };

export default function WishlistPage() {
  return (
    <Band>
      <Shell>
        <h1 className="mb-6 text-2xl">Your wishlist</h1>
        <WishlistView />
      </Shell>
    </Band>
  );
}
