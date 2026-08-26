import { BrandHero } from "@/components/hero/BrandHero";
import { PlatformQuickRail, TrustRibbon } from "@/components/hero/HeroExtras";
import { KinguinFeatured } from "@/components/store/KinguinFeatured";
import { GiftCardsBand } from "@/components/home/GiftCardsBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function HomePage() {
  return (
    <>
      <BrandHero />
      <PlatformQuickRail />
      <TrustRibbon />

      <KinguinFeatured />

      <HowItWorks />
      <BenefitsGrid />
      <GiftCardsBand />
      <FaqAccordion />
    </>
  );
}
