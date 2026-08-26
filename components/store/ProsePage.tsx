import { Band, Shell } from "@/components/ui/Section";

export type Section = { heading?: string; body: string[] };

/** Simple, readable long-form page used for legal and company content. */
export function ProsePage({
  kicker,
  title,
  intro,
  sections,
  updated,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  sections: Section[];
  updated?: string;
}) {
  return (
    <Band>
      <Shell className="max-w-3xl">
        {kicker && <p className="pixel-label mb-2 text-cyan">{kicker}</p>}
        <h1 className="text-3xl">{title}</h1>
        {updated && <p className="mt-2 text-xs text-ink-faint">Last updated: {updated}</p>}
        {intro && <p className="mt-4 text-base leading-relaxed text-ink-muted">{intro}</p>}
        <div className="mt-8 space-y-8">
          {sections.map((s, i) => (
            <section key={i}>
              {s.heading && <h2 className="mb-2 text-lg text-ink">{s.heading}</h2>}
              {s.body.map((p, j) => (
                <p key={j} className="mb-3 text-sm leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Shell>
    </Band>
  );
}
