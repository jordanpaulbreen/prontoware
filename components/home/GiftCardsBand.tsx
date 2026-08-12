"use client";

import { useState } from "react";
import { giftCards, platforms } from "@/lib/data";
import { useCurrency } from "@/components/providers/StoreProvider";
import { moneyRound } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { KeyGlow } from "@/components/ui/KeyGlow";
import { Reveal } from "@/components/ui/Reveal";
import { Band, SectionHeading, Shell } from "@/components/ui/Section";

/** Gift-cards band: pick a wallet, pick an amount, send it at midnight. */
export function GiftCardsBand() {
  const { currency } = useCurrency();
  const [picked, setPicked] = useState<Record<string, number>>({
    steam: 20,
    playstation: 25,
    xbox: 25,
    nintendo: 25,
  });

  return (
    <Band id="giftcards" labelledBy="gift-heading" tone="bg">
      <Shell>
        <div className="scanlines overflow-hidden rounded-panel border border-hairline bg-surface">
          <span aria-hidden="true" className="scanlines-layer" />
          <div aria-hidden="true" className="hairline-gradient relative z-1" />

          <div className="relative z-1 grid gap-8 p-6 sm:p-8 lg:grid-cols-[22rem_1fr] lg:gap-10">
            <Reveal>
              <span className="pixel-label mb-3 flex items-center gap-2 text-cyan">
                <KeyGlow size={20} halo={false} />
                gift a key
              </span>
              <h2 id="gift-heading" className="text-2xl sm:text-[2rem]">
                Wallet top-ups, delivered on the dot
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Send credit by email in seconds, or schedule it to land at midnight on the day
                that matters. Add a message and we&apos;ll print it on the card.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  "No expiry date, no hidden fees",
                  "Schedule delivery to the minute",
                  "Works alongside any regional account",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-deal" />
                    {line}
                  </li>
                ))}
              </ul>
              <Button href="/giftcards" className="mt-6" sparkle>
                <Icon name="gift" size={17} />
                Send a gift card
              </Button>
            </Reveal>

            <ul className="grid gap-3 sm:grid-cols-2">
              {giftCards.map((card, index) => {
                const meta = platforms[card.platform];
                const amount = picked[card.platform] ?? card.amounts[0];
                return (
                  <Reveal as="li" key={card.platform} delay={index * 60}>
                    <div
                      className="group/card relative flex h-full flex-col overflow-hidden rounded-card border border-hairline bg-card p-4 transition-[border-color,box-shadow] duration-[var(--ma-dur-slow)] hover:shadow-glow"
                      style={{
                        backgroundImage: `radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, ${meta.token} 14%, transparent) 0%, transparent 60%)`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-2 text-sm font-semibold"
                          style={{ color: meta.token }}
                        >
                          <Icon name="controller" size={16} />
                          {meta.name}
                        </span>
                        <span className="pixel-label text-ink-faint">wallet</span>
                      </div>

                      <span className="mt-4 font-display text-3xl font-bold tracking-tight text-ink">
                        {moneyRound(amount, currency)}
                      </span>

                      <div
                        role="group"
                        aria-label={`${meta.name} gift card amount`}
                        className="mt-3 flex flex-wrap gap-1.5"
                      >
                        {card.amounts.map((value) => (
                          <button
                            key={value}
                            type="button"
                            aria-pressed={value === amount}
                            onClick={() =>
                              setPicked((current) => ({ ...current, [card.platform]: value }))
                            }
                            className={`press rounded-chip border px-2.5 py-1.5 text-xs font-medium ${
                              value === amount
                                ? "border-cyan/60 bg-cyan-soft text-cyan"
                                : "border-hairline bg-surface-2 text-ink-muted hover:text-ink"
                            }`}
                          >
                            {moneyRound(value, currency)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Shell>
    </Band>
  );
}
