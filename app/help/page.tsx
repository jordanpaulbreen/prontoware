import type { Metadata } from "next";
import { platformOrder, platforms, faqs } from "@/lib/data";
import { policy } from "@/lib/brand";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Help centre" };

const activatable = platformOrder.filter((id) => ["steam", "epic", "xbox", "playstation", "nintendo"].includes(id));

export default function HelpPage() {
  return (
    <Band>
      <Shell className="max-w-3xl">
        <SectionHeading
          kicker="Help centre"
          title="How can we help?"
          description={`Activation guides, refunds and ${policy.support}.`}
        />

        <h2 className="mb-3 text-lg">Activation guides</h2>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
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

        <h2 className="mb-3 text-lg">Frequently asked</h2>
        <ul className="space-y-3">
          {faqs.map((f) => (
            <li key={f.q} className="rounded-card border border-hairline bg-surface p-4">
              <p className="font-medium text-ink">{f.q}</p>
              <p className="mt-1 text-sm text-ink-muted">{f.a}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-card border border-hairline bg-surface p-5 text-sm text-ink-muted">
          Still stuck? <a href="/contact" className="text-cyan hover:underline">Contact us</a> — we answer via {policy.support}.
        </div>
      </Shell>
    </Band>
  );
}
