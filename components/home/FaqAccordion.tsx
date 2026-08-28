"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

/**
 * FAQ accordion — one open at a time, buttons carry aria-expanded and control
 * their region, and the answer height animates through a grid-rows trick so it
 * stays smooth without measuring anything in JavaScript.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Band labelledBy="faq-heading">
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-14">
          <div>
            <SectionHeading id="faq-heading" kicker="questions" title="Everything about keys" />
            <Reveal delay={80}>
              <div className="rounded-card border border-hairline bg-card p-5">
                <p className="text-sm leading-relaxed text-ink-muted">
                  Still stuck? Our support team is online all night and answers in about four minutes.
                </p>
                <Button variant="outline" size="sm" className="mt-4" href="/support">
                  <Icon name="chat" size={15} />
                  Talk to support
                </Button>
              </div>
            </Reveal>
          </div>

          <ul className="divide-y divide-hairline overflow-hidden rounded-card border border-hairline bg-surface">
            {faqs.map((faq, index) => {
              const expanded = open === index;
              return (
                <li key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`${baseId}-answer-${index}`}
                      id={`${baseId}-question-${index}`}
                      onClick={() => setOpen(expanded ? null : index)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-[var(--ma-dur-base)] hover:bg-card-hover"
                    >
                      <span
                        aria-hidden="true"
                        className="pixel-label w-6 shrink-0 text-ink-faint"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-[0.9375rem] font-bold tracking-tight text-ink">
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`inline-flex size-7 shrink-0 items-center justify-center rounded-[8px] border transition-[transform,color,border-color,background-color] duration-[var(--ma-dur-slow)] ease-arcade ${
                          expanded
                            ? "rotate-180 border-cyan/60 bg-cyan-soft text-cyan"
                            : "border-hairline text-ink-muted"
                        }`}
                      >
                        <Icon name="chevronDown" size={14} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`${baseId}-answer-${index}`}
                    role="region"
                    aria-labelledby={`${baseId}-question-${index}`}
                    className="grid transition-[grid-template-rows] duration-[var(--ma-dur-slow)] ease-arcade"
                    style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-15 text-sm leading-relaxed text-ink-muted">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Shell>
    </Band>
  );
}
