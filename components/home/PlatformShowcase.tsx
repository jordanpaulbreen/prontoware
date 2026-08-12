import { gamesByPlatform, platforms } from "@/lib/data";
import type { PlatformId } from "@/lib/types";
import { CoverThumb } from "@/components/ui/Cover";
import { Icon } from "@/components/ui/Icon";
import { Price } from "@/components/ui/Price";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

const featured: { id: PlatformId; blurb: string; count: string }[] = [
  { id: "steam", blurb: "The biggest shelf on the store", count: "8 412 keys" },
  { id: "playstation", blurb: "PS5 and PS4 codes, EU & US", count: "3 370 keys" },
  { id: "xbox", blurb: "Series X|S, One and Game Pass", count: "2 240 keys" },
  { id: "nintendo", blurb: "eShop codes for Switch", count: "980 keys" },
];

/**
 * Platform showcases: a panel per storefront, tinted with that platform's muted
 * token rather than the brand gradient — the gradient stays reserved for the
 * store's own voice.
 */
export function PlatformShowcase() {
  return (
    <Band labelledBy="platforms-heading">
      <Shell>
        <SectionHeading
          id="platforms-heading"
          kicker="by platform"
          title="Shop the shelf you actually play on"
          description="Every listing states the exact storefront and activation region before you pay."
        />

        <ul className="grid gap-4 sm:grid-cols-2">
          {featured.map((item, index) => {
            const meta = platforms[item.id];
            const picks = gamesByPlatform(item.id).slice(0, 3);
            return (
              <Reveal as="li" key={item.id} delay={index * 70}>
                <a
                  href={`/platform/${item.id}`}
                  className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-card p-5 transition-[transform,border-color,box-shadow] duration-[var(--ma-dur-slow)] ease-arcade hover:-translate-y-0.5 hover:shadow-glow"
                  style={{ ["--plat" as string]: meta.token }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-[var(--ma-dur-slow)] group-hover/card:opacity-100"
                    style={{
                      background: `radial-gradient(80% 100% at 100% 0%, color-mix(in srgb, ${meta.token} 16%, transparent) 0%, transparent 62%)`,
                    }}
                  />

                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span
                        aria-hidden="true"
                        className="mb-3 inline-flex size-10 items-center justify-center rounded-tile"
                        style={{
                          color: meta.token,
                          backgroundColor: `color-mix(in srgb, ${meta.token} 14%, transparent)`,
                          boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${meta.token} 30%, transparent)`,
                        }}
                      >
                        <Icon name="controller" size={19} />
                      </span>
                      <h3 className="text-lg">{meta.name}</h3>
                      <p className="mt-1 text-sm text-ink-muted">{item.blurb}</p>
                    </div>
                    <span className="pixel-label shrink-0 text-ink-faint">{item.count}</span>
                  </div>

                  <ul className="relative mt-5 space-y-1">
                    {picks.map((game) => (
                      <li
                        key={game.id}
                        className="flex items-center gap-3 rounded-tile px-1.5 py-1.5 transition-colors duration-[var(--ma-dur-fast)] group-hover/card:bg-card-hover"
                      >
                        <CoverThumb game={game} size={34} />
                        <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-ink">
                          {game.title}
                        </span>
                        <Price
                          amount={game.price}
                          size="sm"
                          gradientOnHover={false}
                        />
                      </li>
                    ))}
                  </ul>

                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors duration-[var(--ma-dur-base)] group-hover/card:text-cyan">
                    Browse {meta.name}
                    <Icon
                      name="arrowRight"
                      size={15}
                      className="transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover/card:translate-x-1"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Shell>
    </Band>
  );
}
