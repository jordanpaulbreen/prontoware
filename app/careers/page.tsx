import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ProsePage } from "@/components/store/ProsePage";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <ProsePage
      kicker="Company"
      title="Careers"
      intro={`We're a small, remote-friendly team building ${brand.name}. We hire for curiosity and care.`}
      sections={[
        { heading: "Open roles", body: ["We don't have any open positions right now, but we're always happy to hear from great people."] },
        { heading: "Get in touch", body: [`Send a short intro and your portfolio or CV to ${brand.contactEmail} and we'll keep you in mind.`] },
      ]}
    />
  );
}
