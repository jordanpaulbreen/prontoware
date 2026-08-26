import type { Metadata } from "next";
import { brand, company, policy } from "@/lib/brand";
import { ProsePage } from "@/components/store/ProsePage";

export const metadata: Metadata = { title: `About ${brand.name}` };

export default function AboutPage() {
  return (
    <ProsePage
      kicker="Company"
      title={`About ${brand.name}`}
      intro={`${brand.name} is a digital game-key store operated by ${company.legalName}, based in ${company.country}. We sell official keys from authorised distributors, delivered instantly.`}
      sections={[
        { heading: "What we do", body: [`We make buying official game keys fast and safe. Every product page states the platform, edition and region up front, and keys arrive by email ${policy.deliveryTime}.`] },
        { heading: "Why buyers trust us", body: [`Official keys only, secure PCI-DSS payment, a ${policy.warrantyMonths}-month key warranty, and ${policy.support}.`] },
        { heading: "The company", body: [`${company.legalName}, Reg. No. ${company.regNumber}. ${company.address}. Contact us any time at ${brand.contactEmail}.`] },
      ]}
    />
  );
}
