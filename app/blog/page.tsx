import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Band>
      <Shell className="max-w-3xl">
        <SectionHeading
          kicker="Editorial"
          title={`The ${brand.name} blog`}
          description="Buying guides, release round-ups and deal alerts."
        />
        <EmptyState
          title="First posts coming soon"
          body="We're writing our first buying guides and release round-ups. Check back shortly."
          action={
            <Button href="/store" size="sm">
              Browse the store
            </Button>
          }
        />
      </Shell>
    </Band>
  );
}
