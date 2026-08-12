import { benefits } from "@/lib/data";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

/** Four promises. Hover lifts the card and warms its icon plate. */
export function BenefitsGrid() {
  return (
    <Band labelledBy="benefits-heading">
      <Shell>
        <SectionHeading
          id="benefits-heading"
          kicker="why midnight"
          title="Built for people who buy keys at 2 a.m."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <Reveal as="li" key={benefit.title} delay={index * 70}>
              <div className="group/card relative flex h-full flex-col gap-3 overflow-hidden rounded-card border border-hairline bg-card p-5 transition-[transform,border-color,box-shadow] duration-[var(--ma-dur-slow)] ease-arcade hover:-translate-y-1 hover:border-hairline-strong hover:shadow-glow">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 -top-16 h-32 opacity-0 transition-opacity duration-[var(--ma-dur-slow)] group-hover/card:opacity-100"
                  style={{
                    background:
                      "radial-gradient(50% 100% at 50% 100%, var(--ma-cyan-glow) 0%, transparent 70%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="relative inline-flex size-11 items-center justify-center rounded-tile text-cyan transition-transform duration-[var(--ma-dur-base)] ease-coin group-hover/card:scale-110"
                  style={{ backgroundColor: "var(--ma-cyan-soft)" }}
                >
                  <Icon name={benefit.icon as IconName} size={20} />
                </span>
                <h3 className="relative text-base">{benefit.title}</h3>
                <p className="relative text-sm leading-relaxed text-ink-muted">{benefit.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Shell>
    </Band>
  );
}
