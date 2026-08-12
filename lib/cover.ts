import type { CoverArt } from "./types";

/**
 * Procedural cover art.
 *
 * The store ships without third-party artwork, so every "cover" is generated as
 * a tiny deterministic SVG and served as a data URI through a plain <img> —
 * which keeps it lazy-loadable, decode-async and free of network round-trips,
 * while still giving each game a dominant colour that the card's ambient glow
 * is derived from (see the `cover-glow` utility).
 */

/** Turns #RRGGBB into an rgb(...) with alpha, so glows stay token-driven. */
export function withAlpha(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgb(${r} ${g} ${b} / ${alpha})`;
}

/** Shortest side — radii key off this so wide hero art keeps its composition. */
/** Opaque blend of two hexes — the base gradient must never be translucent, or
 *  covers wash out against the light theme's white cards. */
function mix(hexA: string, hexB: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(hexA);
  const [r2, g2, b2] = parse(hexB);
  const channel = (a: number, b: number) =>
    Math.round(a + (b - a) * t)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(r1, r2)}${channel(g1, g2)}${channel(b1, b2)}`;
}

type Geometry = { w: number; h: number; s: number };

const layers: Array<(a: CoverArt, g: Geometry, id: string) => string> = [
  // 0 — horizon: a rising sun over a dark ridge
  (a, { w, h, s }, id) => `
    <circle cx="${w * 0.5}" cy="${h * 0.52}" r="${s * 0.3}" fill="url(#sun${id})"/>
    <circle cx="${w * 0.5}" cy="${h * 0.52}" r="${s * 0.3}" fill="none"
      stroke="${a.accent}" stroke-opacity=".5" stroke-width="${s * 0.008}"/>
    <path d="M0 ${h * 0.72} L${w * 0.24} ${h * 0.58} L${w * 0.42} ${h * 0.7} L${w * 0.62} ${h * 0.5} L${w * 0.82} ${h * 0.68} L${w} ${h * 0.6} L${w} ${h} L0 ${h} Z"
      fill="${a.base}" fill-opacity=".92"/>
    <g fill="${a.accent}" fill-opacity=".7">
      <rect x="${w * 0.14}" y="${h * 0.18}" width="${s * 0.018}" height="${s * 0.018}"/>
      <rect x="${w * 0.78}" y="${h * 0.12}" width="${s * 0.018}" height="${s * 0.018}"/>
      <rect x="${w * 0.62}" y="${h * 0.24}" width="${s * 0.013}" height="${s * 0.013}"/>
      <rect x="${w * 0.3}" y="${h * 0.3}" width="${s * 0.013}" height="${s * 0.013}"/>
    </g>`,

  // 1 — grid: a perspective floor running to a glowing vanishing point
  (a, { w, h, s }, id) => {
    const vpx = w * 0.5;
    const vpy = h * 0.46;
    const verticals = Array.from({ length: 11 }, (_, i) => {
      const x = (w / 10) * i;
      return `<line x1="${vpx}" y1="${vpy}" x2="${x * 1.6 - w * 0.3}" y2="${h}" />`;
    }).join("");
    const horizontals = Array.from({ length: 7 }, (_, i) => {
      const t = (i + 1) / 8;
      const y = vpy + (h - vpy) * t * t;
      return `<line x1="0" y1="${y}" x2="${w}" y2="${y}" />`;
    }).join("");
    return `
      <g stroke="${a.dominant}" stroke-opacity=".42" stroke-width="${s * 0.005}">${verticals}${horizontals}</g>
      <circle cx="${vpx}" cy="${vpy}" r="${s * 0.38}" fill="url(#orb${id})"/>
      <rect x="0" y="${vpy - s * 0.005}" width="${w}" height="${s * 0.01}" fill="${a.accent}" fill-opacity=".8"/>`;
  },

  // 2 — velocity: hard diagonal light trails
  (a, { w, h }) => {
    const bars = [0.1, 0.26, 0.4, 0.58, 0.74, 0.88]
      .map((t, i) => {
        const x = w * t;
        const width = w * (i % 2 ? 0.05 : 0.02);
        const fill = i % 3 === 0 ? a.dominant : a.accent;
        const op = i % 2 ? 0.55 : 0.28;
        return `<rect x="${x}" y="${-h * 0.2}" width="${width}" height="${h * 1.5}" fill="${fill}" fill-opacity="${op}"/>`;
      })
      .join("");
    return `
      <g transform="rotate(-24 ${w / 2} ${h / 2})">${bars}</g>
      <path d="M0 ${h * 0.78} L${w} ${h * 0.52} L${w} ${h * 0.62} L0 ${h * 0.9} Z"
        fill="${a.dominant}" fill-opacity=".85"/>
      <path d="M0 ${h * 0.92} L${w} ${h * 0.64} L${w} ${h * 0.68} L0 ${h * 0.97} Z"
        fill="${a.accent}" fill-opacity=".6"/>`;
  },

  // 3 — cabinet: concentric rings with pixel confetti
  (a, { w, h, s }, id) => {
    const rings = [0.46, 0.36, 0.25, 0.15]
      .map(
        (r, i) =>
          `<circle cx="${w * 0.5}" cy="${h * 0.46}" r="${s * r}" fill="none" stroke="${
            i % 2 ? a.accent : a.dominant
          }" stroke-opacity="${0.28 + i * 0.16}" stroke-width="${s * 0.015}"/>`,
      )
      .join("");
    const pixels = [
      [0.18, 0.2],
      [0.82, 0.26],
      [0.24, 0.76],
      [0.74, 0.8],
      [0.5, 0.14],
      [0.12, 0.52],
      [0.88, 0.6],
    ]
      .map(
        ([x, y], i) =>
          `<rect x="${w * x}" y="${h * y}" width="${s * 0.038}" height="${s * 0.038}" fill="${
            i % 2 ? a.dominant : a.accent
          }" fill-opacity=".8"/>`,
      )
      .join("");
    return `${rings}
      <circle cx="${w * 0.5}" cy="${h * 0.46}" r="${s * 0.11}" fill="url(#orb${id})"/>
      ${pixels}`;
  },

  // 4 — tide: layered soft waves
  (a, { w, h, s }) => {
    const waves = [0.5, 0.62, 0.74, 0.86]
      .map(
        (t, i) =>
          `<path d="M0 ${h * t} Q ${w * 0.26} ${h * (t - 0.08)} ${w * 0.5} ${h * t} T ${w} ${h * (t - 0.04)} L${w} ${h} L0 ${h} Z"
            fill="${i % 2 ? a.dominant : a.accent}" fill-opacity="${0.16 + i * 0.16}"/>`,
      )
      .join("");
    return `
      <circle cx="${w * 0.72}" cy="${h * 0.24}" r="${s * 0.13}" fill="${a.accent}" fill-opacity=".65"/>
      ${waves}`;
  },

  // 5 — rift: a fractured seam bleeding light
  (a, { w, h, s }, id) => `
    <path d="M${w * 0.46} 0 L${w * 0.56} ${h * 0.28} L${w * 0.44} ${h * 0.5} L${w * 0.6} ${h * 0.74} L${w * 0.5} ${h}
      L${w * 0.62} ${h} L${w * 0.72} ${h * 0.72} L${w * 0.56} ${h * 0.46} L${w * 0.68} ${h * 0.24} L${w * 0.58} 0 Z"
      fill="url(#rift${id})"/>
    <g stroke="${a.dominant}" stroke-opacity=".45" stroke-width="${s * 0.006}" fill="none">
      <path d="M${w * 0.5} ${h * 0.3} L${w * 0.2} ${h * 0.42}"/>
      <path d="M${w * 0.52} ${h * 0.56} L${w * 0.86} ${h * 0.44}"/>
      <path d="M${w * 0.48} ${h * 0.8} L${w * 0.18} ${h * 0.9}"/>
    </g>
    <circle cx="${w * 0.52}" cy="${h * 0.5}" r="${s * 0.55}" fill="url(#orb${id})" opacity=".7"/>`,
];

export function coverSvg(art: CoverArt, w = 600, h = 800): string {
  const id = `${art.pattern}${w}`;
  const geo = { w, h, s: Math.min(w, h) };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
<defs>
<linearGradient id="bg${id}" x1="0" y1="0" x2="0.4" y2="1">
<stop offset="0" stop-color="${art.base}"/>
<stop offset=".55" stop-color="${mix(art.base, art.dominant, 0.3)}"/>
<stop offset="1" stop-color="${art.base}"/>
</linearGradient>
<radialGradient id="sun${id}" cx=".5" cy=".5" r=".5">
<stop offset="0" stop-color="${art.dominant}"/>
<stop offset=".7" stop-color="${withAlpha(art.dominant, 0.55)}"/>
<stop offset="1" stop-color="${withAlpha(art.dominant, 0)}"/>
</radialGradient>
<radialGradient id="orb${id}" cx=".5" cy=".5" r=".5">
<stop offset="0" stop-color="${withAlpha(art.dominant, 0.95)}"/>
<stop offset="1" stop-color="${withAlpha(art.dominant, 0)}"/>
</radialGradient>
<linearGradient id="rift${id}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${art.accent}"/>
<stop offset="1" stop-color="${art.dominant}"/>
</linearGradient>
<linearGradient id="vig${id}" x1="0" y1="0" x2="0" y2="1">
<stop offset=".45" stop-color="${withAlpha(art.base, 0)}"/>
<stop offset="1" stop-color="${withAlpha(art.base, 0.96)}"/>
</linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#bg${id})"/>
${layers[art.pattern](art, geo, id)}
<rect width="${w}" height="${h}" fill="url(#vig${id})"/>
</svg>`;
}

/** Data URI for <img src>. Small enough to inline, no network hop. */
export function coverSrc(art: CoverArt, w = 600, h = 800): string {
  return `data:image/svg+xml,${encodeURIComponent(coverSvg(art, w, h).replace(/\n/g, ""))}`;
}
