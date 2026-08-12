"use client";

import { useCountdown } from "@/lib/hooks";
import { pad } from "@/lib/format";
import { Icon } from "./Icon";

/**
 * Flash-deal countdown. The deadline is derived on the client from a minutes
 * offset, which keeps SSR markup deterministic; each digit change re-triggers a
 * 150ms tick so the clock feels mechanical without being noisy.
 */
export function Countdown({
  minutes,
  variant = "chip",
  label = "Ends in",
}: {
  minutes: number;
  variant?: "chip" | "block";
  label?: string;
}) {
  const left = useCountdown(minutes);

  if (variant === "block") {
    const cells = left
      ? [
          { value: pad(left.h), unit: "hrs" },
          { value: pad(left.m), unit: "min" },
          { value: pad(left.s), unit: "sec" },
        ]
      : [
          { value: "--", unit: "hrs" },
          { value: "--", unit: "min" },
          { value: "--", unit: "sec" },
        ];

    return (
      <div className="flex items-center gap-2" role="timer" aria-live="off">
        {cells.map((cell) => (
          <div
            key={cell.unit}
            className="flex min-w-12 flex-col items-center rounded-tile border border-hairline bg-bg-deep px-2 py-1.5"
          >
            <span
              key={cell.value}
              className="animate-[tick_var(--ma-dur-fast)_var(--ma-ease-coin)] font-display text-base font-bold tabular-nums text-ink"
            >
              {cell.value}
            </span>
            <span className="pixel-label mt-0.5 text-ink-faint">{cell.unit}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <span
      role="timer"
      aria-live="off"
      className="inline-flex items-center gap-1.5 rounded-chip px-2 py-1 text-[0.6875rem] font-medium tabular-nums text-warn"
      style={{
        backgroundColor: "var(--ma-warn-soft)",
        boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--ma-warn) 30%, transparent)",
      }}
    >
      <Icon name="clock" size={12} />
      {label}{" "}
      {left ? (
        left.done ? (
          "00:00:00"
        ) : (
          `${pad(left.h)}:${pad(left.m)}:${pad(left.s)}`
        )
      ) : (
        <span className="opacity-60">--:--:--</span>
      )}
    </span>
  );
}
