import type { Metadata } from "next";
import { KinguinCatalog } from "@/components/store/KinguinCatalog";

export const metadata: Metadata = { title: "New releases" };

export default function NewReleasesPage() {
  return (
    <KinguinCatalog
      kicker="Fresh keys"
      title="New releases"
      description="The latest official keys added to the store."
      query={{ sortBy: "createdAt", sortType: "desc" }}
    />
  );
}
