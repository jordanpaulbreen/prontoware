import type { Metadata } from "next";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { GiftCardsCatalog } from "@/components/store/GiftCardsCatalog";

export const metadata: Metadata = { title: "Gift cards" };

export default function GiftCardsPage() {
  return (
    <Band>
      <Shell>
        <SectionHeading
          kicker="Gifting"
          title="Gift cards"
          description="Steam, PlayStation, Xbox, Nintendo, Netflix, Spotify and more — delivered instantly by email. Filter by brand and amount to find the exact card you need."
        />
        <GiftCardsCatalog />
      </Shell>
    </Band>
  );
}
