import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "Top charts" };

export default function ChartsPage() {
  return (
    <KinguinCatalog
      kicker="This week"
      title="Top charts"
      description="The most-bought keys on the store right now."
      query={{ sortBy: "bestselling", sortType: "desc" }}
    />
  );
}
