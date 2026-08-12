# Midnight Arcade

Storefront UI for a game-keys / digital-games shop — the glow of a late-night gaming session,
refined. Deep midnight-indigo world, cover art as the only saturated colour, and one signature
magenta→cyan neon gradient used with discipline.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · zero UI dependencies.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## The design direction

| | |
| --- | --- |
| **Feeling** | a dark room lit only by a screen, seconds before a game launches |
| **Structure** | modern, clean, conversion-focused — cover-art-first commerce |
| **Arcade DNA** | pixel micro-details, CRT texture, "insert coin" flavour — seasoning only |
| **Deliberately not** | military/armory terminal · clean light retail · generic dark-neon crypto template |

Retro touches appear exclusively in micro-interactions, tiny pixel labels, and empty states. The
gradient is reserved for primary CTAs, active states, the logo glow, key highlights and price
emphasis — never as a background wash.

## Token system

Everything lives in [`app/globals.css`](app/globals.css). Two layers:

1. **`:root` / `[data-theme="light"]`** — raw `--ma-*` values. Dark is the primary, first-class
   theme; light re-binds every single name (cool lavender-white base, indigo ink, tamed gradient).
2. **`@theme inline`** — maps those onto Tailwind tokens, so flipping `data-theme` re-themes every
   utility live with no recompilation and no duplicate class sets.

No component declares a raw hex, px radius, duration or easing curve.

| Group | Tokens |
| --- | --- |
| Surfaces | `bg`, `bg-deep`, `surface`, `surface-2`, `card`, `card-hover`, `overlay` |
| Ink | `ink`, `ink-muted`, `ink-faint`, `ink-invert`, `ink-on-art` |
| Signature gradient | `magenta`, `cyan`, `*-soft` (hover fills), `*-glow` (neon edges), `--gradient-brand`, `--gradient-hairline` |
| Accent | `gold`, `gold-soft` |
| Semantic | `deal`, `warn`, `error`, `instant` (+ `-soft` variants) |
| Platforms | `steam`, `epic`, `xbox`, `playstation`, `nintendo`, `ea`, `ubisoft` — muted by design, never louder than the brand |
| Lines | `hairline`, `hairline-strong` |
| Radii | `radius-chip/tile/card/panel/hero` (12–24px) |
| Elevation | `shadow-card`, `shadow-panel`, `shadow-glow-sm/glow/glow-strong` — soft neon edges instead of heavy drop shadows |
| Motion | `ease-arcade`, `ease-coin`, `--ma-dur-fast/base/slow/slower/reveal` (150–620ms) |
| Type | `font-display` (Space Grotesk), `font-sans` (Inter), `font-pixel` (Silkscreen — micro-labels only) |
| Layout | `--container-shell`, `spacing-section`, `spacing-rail`, `spacing-cover` |

### Signature utilities

`text-gradient` (with a solid colour fallback underneath) · `bg-gradient-brand` ·
`hairline-gradient` · `ring-gradient` · `scanlines` + `scanlines-layer` · `cover-glow` ·
`pixel-label` · `press` / `press-active` (coin-drop) · `reveal` / `revealed` · `skeleton`.

## Recurring motifs

- **The key-glow** — a gradient keycap glyph in the logo, loading and empty states, and success
  moments ([`components/ui/KeyGlow.tsx`](components/ui/KeyGlow.tsx)). Its gradients are defined once
  in [`BrandDefs.tsx`](components/ui/BrandDefs.tsx) and referenced by id.
- **Cover-art-first cards** — the artwork's dominant colour drives the card's ambient glow, so a
  grid of covers lights the indigo base like screens in a dark room.
- **Scanline/CRT micro-texture** — hero and section bands only, felt rather than seen.
- **Gradient hairlines** — dividers and active-tab underlines as the brand thread.
- **Arcade micro-interactions** — coin-drop button squash, one-shot wishlist heart pulse, pixel
  sparkle on add-to-cart, mechanical countdown ticks. All 150–250ms.

## Structure

```
app/            layout (fonts, theme bootstrap), homepage composition, 404
components/
  header/       top strip · search with instant results · mini-cart · mega-panel nav · mobile drawer
  hero/         cinematic feature carousel + spotlight stack, platform rail, trust ribbon
  cards/        GameCard (the one product card) + GameRow
  home/         deals rail · top charts · releases tabs · genre explorer · bargain bin ·
                platform showcases · gift cards · how it works · benefits · trust · FAQ
  footer/       newsletter · link columns (mobile accordions) · trust row · legal bar
  ui/           tokens-only primitives: Button, Chips, Cover, Countdown, CountUp, Rail,
                Reveal, Section, Skeleton, EmptyState, Icon, KeyGlow, PixelSparkle
  providers/    theme · currency · cart & wishlist
lib/            catalogue data, procedural cover art, formatting, hooks
```

### Cover art

The store ships without third-party artwork, so every cover is a deterministic SVG generated in
[`lib/cover.ts`](lib/cover.ts) and served as a data URI through a plain `<img>` — lazy-loaded,
`decoding="async"`, fixed intrinsic size (no CLS), no network round-trip. Each game declares a
`base`/`dominant`/`accent` palette plus one of six compositions, and `dominant` is what the card's
ambient glow is sampled from. Swapping in real artwork means replacing `Cover`'s `src` and keeping
the `--cover-glow` variable.

## Accessibility

- Every text/background pair clears WCAG AA, including 11px meta text (`ink-faint` is 4.9:1 on
  cards, 5.3:1 on the light base). Gradient text always has a solid fallback colour underneath.
- Text on gradient fills uses `ink-invert` — deep indigo on the bright dark-theme ramp, white on
  the tamed light-theme ramp — because white on magenta does not reach 4.5:1.
- One focus treatment site-wide: a cyan `focus-visible` ring with a background-coloured inset.
- Mega-menu triggers carry `aria-expanded` + `aria-controls` and support ArrowLeft/Right/Down,
  Escape (returns focus); tabs use a roving tabindex with Arrow/Home/End; accordions and the FAQ
  expose `aria-expanded` + labelled regions; search is a full combobox with
  `aria-activedescendant`; the mobile drawer is a modal dialog with focus containment and a scroll
  lock; the hero carousel is pausable, swipeable and announces slide changes via a live region.
- `prefers-reduced-motion` is honoured globally: animations collapse, reveals render visible, and
  the hero and how-it-works strips stop auto-advancing.

## Performance notes

- Server Components by default; `"use client"` only where interaction demands it.
- Reveals use one IntersectionObserver per block, disconnected after the first hit.
- Glows are `opacity`/`transform`/`box-shadow` only — no filters, no layout thrash.
- Countdowns resolve their deadline on the client from a minutes offset, so SSR markup is
  deterministic and hydration never mismatches.

Content, prices, studios and titles are fictional. Platform names appear only as marks of their
respective owners, with the disclaimer in the footer.
# midnight-arcade
