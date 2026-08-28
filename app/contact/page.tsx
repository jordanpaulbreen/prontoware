import type { Metadata } from "next";
import { brand, company, policy } from "@/lib/brand";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <Band>
      <Shell className="max-w-3xl">
        <SectionHeading
          kicker="Support"
          title="Contact us"
          description={`Our team answers via ${policy.support}. Most first replies land in minutes.`}
        />
        <ContactForm />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-hairline bg-surface p-5">
            <span className="text-cyan"><Icon name="mail" size={22} /></span>
            <h2 className="mt-3 text-lg">Email</h2>
            <p className="mt-1 text-sm text-ink-muted">Best for order questions and refunds.</p>
            <a href={`mailto:${brand.contactEmail}`} className="mt-2 inline-block text-sm text-cyan hover:underline">
              {brand.contactEmail}
            </a>
          </div>
          <div className="rounded-card border border-hairline bg-surface p-5 text-sm text-ink-muted">
            <h2 className="mb-2 text-lg text-ink">Registered office</h2>
            <p>{company.legalName}</p>
            <p>Reg. No. {company.regNumber}</p>
            <p>{company.address}</p>
          </div>
        </div>
      </Shell>
    </Band>
  );
}
