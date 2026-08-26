import type { Metadata } from "next";
import { platformOrder, platforms, gamesByPlatform } from "@/lib/data";
import { Band, Shell, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = { title: "All platforms" };

export default function PlatformsPage() {
  return (
    <Band>
      <Shell>
        <SectionHeading
          kicker="Shop by platform"
          title="Every store, one checkout"
          description="Official keys for Steam, Epic, Xbox, PlayStation, Nintendo and more."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {platformOrder.map((id) => {
            const p = platforms[id];
            return (
              <a
                key={id}
                href={`/platforms/${id}`}
                className="group flex flex-col gap-3 rounded-card border border-hairline bg-surface p-5 hover:-translate-y-0.5 hover:border-hairline-strong"
              >
                <span
                  className="inline-flex size-10 items-center justify-center rounded-tile"
                  style={{ backgroundColor: `color-mix(in srgb, ${p.token} 16%, transparent)`, color: p.token }}
                >
                  <Icon name="controller" size={20} />
                </span>
                <div>
                  <p className="font-medium text-ink group-hover:text-cyan">{p.name}</p>
                  <p className="text-xs text-ink-faint">
                    {gamesByPlatform(id).length} keys · {p.short}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Shell>
    </Band>
  );
}
