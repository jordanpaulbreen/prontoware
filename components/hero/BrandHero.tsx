import { brand, policy } from "@/lib/brand";
import { Shell } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Brand-led hero — no demo products, links straight into the live catalogue. */
export function BrandHero() {
  const points = [
    { icon: "bolt" as const, label: `Delivered ${policy.deliveryTime}` },
    { icon: "badge" as const, label: "Official authorised keys" },
    { icon: "shield" as const, label: "Secure PCI-DSS payment" },
  ];
  return (
    <section aria-label="Welcome" className="scanlines relative overflow-hidden py-14 sm:py-20">
      <span aria-hidden="true" className="scanlines-layer" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-32 h-[28rem]"
        style={{
          background:
            "radial-gradient(55% 55% at 50% 40%, color-mix(in srgb, var(--ma-cyan) 18%, transparent) 0%, transparent 70%)",
        }}
      />
      <Shell className="relative z-1 max-w-3xl text-center">
        <span className="pixel-label mb-4 inline-flex items-center gap-2 text-cyan">
          <span aria-hidden="true" className="size-1.5 bg-magenta" />
          {brand.tagline}
        </span>
        <h1 className="text-4xl leading-[1.02] sm:text-6xl">
          Official game keys,
          <br />
          <span className="text-gradient">delivered instantly</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
          Buy Steam, Epic, Xbox, PlayStation and Nintendo keys at great prices. Every key is sourced
          from authorised distributors and lands in your inbox in seconds.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" href="/store">
            <Icon name="controller" size={18} /> Browse the store
          </Button>
          <Button size="lg" variant="surface" href="/deals">
            Tonight&apos;s deals
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          {points.map((p) => (
            <li key={p.label} className="inline-flex items-center gap-2">
              <Icon name={p.icon} size={16} className="text-cyan" />
              {p.label}
            </li>
          ))}
        </ul>
      </Shell>
    </section>
  );
}
