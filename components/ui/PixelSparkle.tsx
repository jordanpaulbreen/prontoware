/**
 * A one-shot pixel burst: eight 3px squares thrown outward on a diagonal grid.
 * Used for add-to-cart only, ~420ms, pointer-events off, GPU-cheap (transform
 * and opacity only). The whole thing is decorative.
 */
const shards = [
  { x: -18, y: -14 },
  { x: 16, y: -18 },
  { x: 22, y: 8 },
  { x: -22, y: 6 },
  { x: -8, y: -22 },
  { x: 10, y: 20 },
  { x: -14, y: 18 },
  { x: 26, y: -4 },
];

export function PixelSparkle() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
      {shards.map((shard, index) => (
        <span
          key={index}
          className="absolute left-1/2 top-1/2 size-[3px] animate-[sparkle_var(--ma-dur-slower)_var(--ma-ease-arcade)_forwards]"
          style={
            {
              backgroundColor: index % 2 ? "var(--ma-cyan)" : "var(--ma-gold)",
              "--sx": `${shard.x}px`,
              "--sy": `${shard.y}px`,
              animationDelay: `${index * 18}ms`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
