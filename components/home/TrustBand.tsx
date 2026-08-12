import { testimonials } from "@/lib/data";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Chips";
import { Reveal } from "@/components/ui/Reveal";
import { Band, Shell } from "@/components/ui/Section";

const stats = [
  { value: 2148903, label: "keys delivered", suffix: "" },
  { value: 38402, label: "verified reviews", suffix: "" },
  { value: 58, label: "seconds median delivery", suffix: "s" },
];

/** Numbers count up once on scroll; quotes stay plain and specific. */
export function TrustBand() {
  return (
    <Band tone="deep" texture labelledBy="trust-heading" className="border-y border-hairline">
      <Shell>
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="pixel-label mb-2.5 flex items-center gap-2 text-cyan">
              <span aria-hidden="true" className="size-1.5 bg-magenta" />
              trusted after midnight
            </span>
            <h2 id="trust-heading" className="text-2xl sm:text-[2rem]">
              Two million keys and counting
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-card border border-hairline bg-surface px-4 py-3">
            <Rating value={4.7} size={14} />
            <span aria-hidden="true" className="h-6 w-px bg-hairline" />
            <span className="text-xs leading-tight text-ink-muted">
              Excellent
              <br />
              on Trustpilot
            </span>
          </div>
        </Reveal>

        <ul className="mb-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal as="li" key={stat.label} delay={index * 80}>
              <div className="rounded-card border border-hairline bg-surface p-5">
                <span className="block font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-1.5 block text-sm text-ink-muted">{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <ul className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 80}>
              <figure className="flex h-full flex-col gap-4 rounded-card border border-hairline bg-surface p-5">
                <Icon name="chat" size={18} className="text-cyan" />
                <blockquote className="flex-1 text-sm leading-relaxed text-ink">
                  “{item.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-hairline pt-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-9 items-center justify-center rounded-full bg-gradient-brand-soft font-display text-sm font-bold text-ink"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{item.name}</span>
                    <span className="block text-[0.6875rem] text-ink-faint">{item.meta}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </Band>
  );
}
