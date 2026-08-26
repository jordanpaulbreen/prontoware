import { platformOrder, platforms, trustRibbon } from "@/lib/data";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Section";

/** Platform quick-rail — the first thing most shoppers reach for. */
export function PlatformQuickRail() {
  return (
    <Shell>
      <Reveal>
        <ul
          aria-label="Shop by platform"
          className="ma-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
        >
          {platformOrder.map((id) => {
            const meta = platforms[id];
            return (
              <li key={id} className="shrink-0">
                <a
                  href={`/platforms/${id}`}
                  className="press group inline-flex items-center gap-2.5 rounded-chip border border-hairline bg-surface-2 px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink"
                  style={{ ["--chip" as string]: meta.token }}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-6 items-center justify-center rounded-[7px] transition-transform duration-[var(--ma-dur-base)] ease-coin group-hover:scale-110"
                    style={{
                      color: meta.token,
                      backgroundColor: `color-mix(in srgb, ${meta.token} 16%, transparent)`,
                    }}
                  >
                    <Icon name="controller" size={14} />
                  </span>
                  {meta.name}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Shell>
  );
}

/** Trust ribbon — four promises, gradient hairline above. */
export function TrustRibbon() {
  return (
    <Shell className="mt-8">
      <Reveal delay={80}>
        <div className="overflow-hidden rounded-card border border-hairline bg-surface">
          <div aria-hidden="true" className="hairline-gradient" />
          <ul className="grid divide-hairline sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
            {trustRibbon.map((item, index) => (
              <li
                key={item.label}
                className={`flex items-center gap-3 px-4 py-4 sm:px-5 ${
                  index < 2 ? "border-b border-hairline lg:border-b-0" : ""
                } ${index === 2 ? "border-b border-hairline sm:border-b-0" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-tile text-cyan"
                  style={{ backgroundColor: "var(--ma-cyan-soft)" }}
                >
                  <Icon name={item.icon as IconName} size={17} />
                </span>
                <span className="text-[0.8125rem] font-medium leading-snug text-ink">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Shell>
  );
}
