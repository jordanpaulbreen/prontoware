import { Hero } from "@/components/hero/Hero";
import { PlatformQuickRail, TrustRibbon } from "@/components/hero/HeroExtras";
import { DealsRail } from "@/components/home/DealsRail";
import { TopCharts } from "@/components/home/TopCharts";
import { ReleasesTabs } from "@/components/home/ReleasesTabs";
import { GenreExplorer } from "@/components/home/GenreExplorer";
import { BargainRail } from "@/components/home/BargainRail";
import { PlatformShowcase } from "@/components/home/PlatformShowcase";
import { GiftCardsBand } from "@/components/home/GiftCardsBand";
import { HowItWorks } from "@/components/home/HowItWorks";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { TrustBand } from "@/components/home/TrustBand";
import { FaqAccordion } from "@/components/home/FaqAccordion";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformQuickRail />
      <TrustRibbon />

      <DealsRail />
      <TopCharts />
      <ReleasesTabs />
      <GenreExplorer />
      <BargainRail />
      <PlatformShowcase />
      <GiftCardsBand />
      <HowItWorks />
      <BenefitsGrid />
      <TrustBand />
      <FaqAccordion />
    </>
  );
}
