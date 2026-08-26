import type { Metadata } from "next";
import { giftCards, platforms } from "@/lib/data";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "Gift cards" };

export default function GiftCardsPage() {
  return (
    <Band>
      <Shell>
        <SectionHeading
          kicker="Gifting"
          title="Gift cards & wallet top-ups"
          description="Send Steam, PlayStation, Xbox and Nintendo credit by email — delivered instantly."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {giftCards.map((gc) => {
            const p = platforms[gc.platform];
            return (
              <div key={gc.platform} className="rounded-card border border-hairline bg-surface p-5">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex size-9 items-center justify-center rounded-tile"
                    style={{ backgroundColor: `color-mix(in srgb, ${p.token} 16%, transparent)`, color: p.token }}
                  >
                    <Icon name="gift" size={18} />
                  </span>
                  <h2 className="text-lg">{p.name}</h2>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {gc.amounts.map((a) => (
                    <a
                      key={a}
                      href={`/store?q=${encodeURIComponent(p.name + " gift card")}`}
                      className="inline-flex h-11 items-center rounded-tile border border-hairline bg-surface-2 px-4 text-sm font-medium text-ink hover:border-cyan hover:text-cyan"
                    >
                      €{a}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Shell>
    </Band>
  );
}
