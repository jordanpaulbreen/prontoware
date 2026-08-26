import type { Metadata } from "next";
import { brand, company } from "@/lib/brand";
import { ProsePage } from "@/components/store/ProsePage";

export const metadata: Metadata = { title: "Press kit" };

export default function PressPage() {
  return (
    <ProsePage
      kicker="Press"
      title="Press kit"
      intro={`Media resources and facts about ${brand.name}.`}
      sections={[
        { heading: "About", body: [`${brand.name} is an official game-key store operated by ${company.legalName}, ${company.country}. Keys are sourced from authorised distributors and delivered instantly.`] },
        { heading: "Media enquiries", body: [`For interviews, assets or quotes, contact ${brand.contactEmail}.`] },
        { heading: "Facts", body: [`Legal entity: ${company.legalName} · Reg. No. ${company.regNumber} · ${company.address}.`] },
      ]}
    />
  );
}
