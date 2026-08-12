/**
 * One hidden SVG holding the shared brand gradients, mounted once in the root
 * layout. Every key-glow, star and sparkle references these by id, so the
 * signature magenta→cyan ramp exists exactly once in the document and follows
 * the active theme through its token stops.
 */
export function BrandDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <linearGradient id="ma-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ma-magenta)" }} />
          <stop offset="1" style={{ stopColor: "var(--ma-cyan)" }} />
        </linearGradient>
        <linearGradient id="ma-grad-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--ma-cyan)" }} />
          <stop offset="1" style={{ stopColor: "var(--ma-magenta)" }} />
        </linearGradient>
        <radialGradient id="ma-grad-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--ma-cyan)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--ma-magenta)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
    </svg>
  );
}
