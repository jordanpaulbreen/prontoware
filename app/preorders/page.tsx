import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "Pre-orders" };

export default function PreordersPage() {
  return (
    <KinguinCatalog
      kicker="Coming soon"
      title="Pre-orders"
      description="Reserve upcoming titles — the key lands in your inbox the moment the game unlocks."
      query={{ name: "pre-order", sortBy: "bestselling", sortType: "desc" }}
    />
  );
}
