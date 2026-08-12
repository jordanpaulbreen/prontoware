import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

/** Page-wide horizontal rhythm. Every band uses this shell. */
export function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-(--container-shell) px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
  action,
  id,
}: {
  kicker?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  id?: string;
}) {
  return (
    <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
      <div className="max-w-2xl">
        {kicker && (
          <span className="pixel-label mb-2.5 flex items-center gap-2 text-cyan">
            <span aria-hidden="true" className="size-1.5 bg-magenta" />
            {kicker}
          </span>
        )}
        <h2 id={id} className="text-2xl leading-tight sm:text-[2rem]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-[0.9375rem]">
            {description}
          </p>
        )}
      </div>

      {action && (
        <a
          href={action.href}
          className="group inline-flex items-center gap-2 rounded-tile px-1 py-1 text-sm font-medium text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
        >
          {action.label}
          <Icon
            name="arrowRight"
            size={16}
            className="transition-transform duration-[var(--ma-dur-base)] ease-arcade group-hover:translate-x-1"
          />
        </a>
      )}
    </Reveal>
  );
}

/** The recurring brand thread. */
export function GradientRule({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`hairline-gradient w-full ${className}`} />;
}

/** Section band with the barely-there CRT texture. */
export function Band({
  children,
  tone = "bg",
  texture = false,
  className = "",
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  tone?: "bg" | "surface" | "deep";
  texture?: boolean;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    bg: "bg-bg",
    surface: "bg-surface",
    deep: "bg-bg-deep",
  }[tone];

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${texture ? "scanlines" : ""} ${tones} py-section ${className}`}
    >
      {texture && <span aria-hidden="true" className="scanlines-layer" />}
      <div className="relative z-1">{children}</div>
    </section>
  );
}
