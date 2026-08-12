"use client";

import { useCountUp, useInView } from "@/lib/hooks";
import { group } from "@/lib/format";

/** Orders-served style counter — animates once, when it first scrolls in. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const value = useCountUp(to, inView);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {group(value)}
      {suffix}
    </span>
  );
}
