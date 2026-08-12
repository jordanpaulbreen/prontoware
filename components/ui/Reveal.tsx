"use client";

import { useInView } from "@/lib/hooks";

/**
 * Staggered fade-up on scroll. One IntersectionObserver per block, disconnected
 * after the first hit, so long pages stay cheap. `prefers-reduced-motion` is
 * handled globally in globals.css — the element is simply visible.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger step in ms — keep under ~320ms so nothing feels slow. */
  delay?: number;
  as?: "div" | "li" | "section" | "article" | "span";
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      // @ts-expect-error — one ref type across the small set of allowed tags
      ref={ref}
      className={`reveal ${inView ? "revealed" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
