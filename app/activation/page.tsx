import type { Metadata } from "next";
import { platformOrder, platforms } from "@/lib/data";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Activation guides" };

const activatable = platformOrder.filter((id) =>
  ["steam", "epic", "xbox", "playstation", "nintendo"].includes(id),
);

export default function ActivationPage() {
  return (
    <Band>
      <Shell className="max-w-3xl">
        <SectionHeading
          kicker="Activation guides"
          title="Redeem your key in under a minute"
          description="Pick your platform for step-by-step instructions on activating the key from your order."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {activatable.map((id) => (
            <a
              key={id}
              href={`/help/activate/${id}`}
              className="flex items-center gap-2 rounded-tile border border-hairline bg-surface p-3 text-sm hover:border-cyan hover:text-cyan"
            >
              <Icon name="controller" size={16} />
              {platforms[id].name}
            </a>
          ))}
        </div>
        <div className="mt-8 rounded-card border border-hairline bg-surface p-5 text-sm text-ink-muted">
          Can&apos;t find your platform?{" "}
          <a href="/contact" className="text-cyan hover:underline">
            Contact us
          </a>{" "}
          and we&apos;ll walk you through it.
        </div>
      </Shell>
    </Band>
  );
}
