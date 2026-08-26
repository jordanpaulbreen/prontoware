import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ProsePage } from "@/components/store/ProsePage";

export const metadata: Metadata = { title: "Affiliates & creators" };

export default function AffiliatesPage() {
  return (
    <ProsePage
      kicker="Partners"
      title="Affiliates & creators"
      intro={`Partner with ${brand.name} and earn on every key your audience buys.`}
      sections={[
        { heading: "How it works", body: ["Share your link, earn a commission on referred sales, and track everything in a simple dashboard."] },
        { heading: "Apply", body: [`Email ${brand.contactEmail} with your channel or site and typical audience, and we'll set you up.`] },
      ]}
    />
  );
}
