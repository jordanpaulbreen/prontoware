import { KeyGlow } from "./KeyGlow";

/**
 * Empty states are where the arcade DNA is loudest: a turning key-glow and an
 * "insert coin" style pixel line. Still one message, one action — never cute at
 * the cost of clarity.
 */
export function EmptyState({
  title,
  body,
  action,
  compact = false,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-card border border-hairline bg-card/60 text-center ${
        compact ? "gap-3 px-6 py-10" : "gap-4 px-6 py-16"
      }`}
    >
      <KeyGlow size={compact ? 34 : 46} turning />
      <span className="pixel-label text-ink-faint">no key found — insert coin</span>
      <h3 className="text-lg">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{body}</p>
      {action}
    </div>
  );
}
