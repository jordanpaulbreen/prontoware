"use client";

import { useEffect, useState } from "react";
import { steps } from "@/lib/data";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { Icon, type IconName } from "@/components/ui/Icon";
import { KeyGlow } from "@/components/ui/KeyGlow";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

const icons: IconName[] = ["cart", "mail", "play"];

/**
 * Buy → Receive key instantly → Activate. The active step walks forward on a
 * timer (paused on hover, static under reduced motion) and the middle step turns
 * the key-glow, reusing the same motif as the checkout success animation.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => setActive((step) => (step + 1) % steps.length), 2800);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  return (
    <Band labelledBy="how-heading" tone="surface" texture className="border-y border-hairline">
      <Shell>
        <SectionHeading
          id="how-heading"
          kicker="how it works"
          title="Three steps, about ninety seconds"
          description="No downloads, no waiting on a human to approve anything."
        />

        <ol
          className="relative grid gap-4 lg:grid-cols-3 lg:gap-6"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* the thread connecting the three steps */}
          <span
            aria-hidden="true"
            className="hairline-gradient absolute left-0 right-0 top-11 hidden lg:block"
          />

          {steps.map((step, index) => {
            const on = index === active;
            return (
              <Reveal as="li" key={step.title} delay={index * 90}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-current={on}
                  className={`press relative flex h-full w-full flex-col items-start gap-3 rounded-card border p-5 text-left ${
                    on
                      ? "border-transparent bg-card shadow-glow ring-gradient"
                      : "border-hairline bg-card/60 hover:border-hairline-strong"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 items-center justify-center rounded-tile transition-colors duration-[var(--ma-dur-slow)]"
                      style={{
                        color: on ? "var(--ma-cyan)" : "var(--ma-ink-muted)",
                        backgroundColor: on ? "var(--ma-cyan-soft)" : "var(--ma-surface-2)",
                      }}
                    >
                      {index === 1 ? (
                        <KeyGlow size={22} turning={on} halo={false} />
                      ) : (
                        <Icon name={icons[index]} size={20} />
                      )}
                    </span>
                    <span className="pixel-label text-ink-faint">{step.label}</span>
                  </span>

                  <h3 className="text-lg leading-snug">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-muted">{step.body}</p>

                  {/* progress hairline that fills while this step is active */}
                  <span
                    aria-hidden="true"
                    className="mt-auto h-0.5 w-full overflow-hidden rounded-full bg-hairline"
                  >
                    <span
                      className="block h-full origin-left rounded-full bg-gradient-brand transition-transform duration-[var(--ma-dur-slower)] ease-arcade"
                      style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                    />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ol>
      </Shell>
    </Band>
  );
}
