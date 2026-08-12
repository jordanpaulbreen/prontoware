import type { SVGProps } from "react";

/** Every glyph in the store — one component, stroke-based, currentColor only. */
const paths = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 4.5 4.5",
  cart: "M3 4h2.2l2.3 10.4a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.5L20.5 8H7M10 20.5h.01M17 20.5h.01",
  heart:
    "M12 20s-7-4.3-7-9.3A3.7 3.7 0 0 1 12 8a3.7 3.7 0 0 1 7 2.7c0 5-7 9.3-7 9.3Z",
  user: "M4.5 20a7.5 7.5 0 0 1 15 0M12 4a3.8 3.8 0 1 0 0 7.6A3.8 3.8 0 0 0 12 4Z",
  bolt: "M13.5 3 5 13.6h5l-1.2 7.4L18 10.4h-5L13.5 3Z",
  shield: "M12 3.2 5 6v6c0 4.3 3 7.4 7 8.8 4-1.4 7-4.5 7-8.8V6l-7-2.8Zm-2.6 8.6 2 2 3.7-3.8",
  badge:
    "M12 3.2l2.2 1.5 2.6-.3 1 2.5 2.2 1.4-.7 2.6.7 2.6-2.2 1.4-1 2.5-2.6-.3L12 20.8l-2.2-1.5-2.6.3-1-2.5-2.2-1.4.7-2.6L4 10.3l2.2-1.4 1-2.5 2.6.3L12 3.2Zm-2.2 8.5 1.9 1.9 3.6-3.7",
  star: "M12 3.6l2.6 5.3 5.9.9-4.2 4.1 1 5.9-5.3-2.8-5.3 2.8 1-5.9L3.5 9.8l5.9-.9L12 3.6Z",
  chat: "M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.2-2.9-.5L4.5 20l1.1-3.3A6.3 6.3 0 0 1 4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5Z",
  chevronDown: "M6 9.5l6 6 6-6",
  chevronRight: "M9.5 5.5l6.5 6.5-6.5 6.5",
  chevronLeft: "M14.5 5.5 8 12l6.5 6.5",
  arrowRight: "M4.5 12h15m-6-6.5L20 12l-6.5 6.5",
  sun: "M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.5 1.5m11.2 11.2 1.5 1.5m0-14.2-1.5 1.5M6.4 17.6l-1.5 1.5",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M4 7h16M4 12h16M4 17h16",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  clock: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3.8V12l3 2",
  globe: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-8 8h16M12 4c2.2 2.3 3.3 5 3.3 8s-1.1 5.7-3.3 8c-2.2-2.3-3.3-5-3.3-8S9.8 6.3 12 4Z",
  controller:
    "M7.5 8h9a4.5 4.5 0 0 1 4.4 5.5l-.5 2.3A2.6 2.6 0 0 1 16 17l-1.4-2h-5.2L8 17a2.6 2.6 0 0 1-4.4-1.2l-.5-2.3A4.5 4.5 0 0 1 7.5 8Zm.5 3v2.4M6.8 12.2h2.4m5.6-.6h.01m2 1.6h.01",
  gift: "M4 10h16v9.5H4V10Zm0-3.5h16V10H4V6.5ZM12 6.5V20m0-13.5c-1.6-3-5.6-2.4-5.6 0m5.6 0c1.6-3 5.6-2.4 5.6 0",
  tag: "M4 11.5 11.5 4H20v8.5L12.5 20 4 11.5Zm11.5-3.2h.01",
  discord:
    "M8.5 7.5c2.3-.7 4.7-.7 7 0 1.6 2.1 2.5 4.6 2.5 7.3-1.3 1-2.8 1.7-4.4 2l-.8-1.4a10 10 0 0 0 1.6-.8m-6.6.8-.8 1.4A12 12 0 0 1 3 14.8c0-2.7.9-5.2 2.5-7.3m3.4 6.3h.01m6.2 0h.01",
  send: "M4 12 20 5l-7 15-2.6-5.6L4 12Z",
  play: "M8.5 5.5 18 12l-9.5 6.5v-13Z",
  sparkle: "M12 4v5m0 6v5m-4-8H3m18 0h-5M7.5 7.5l2.5 2.5m4 4 2.5 2.5m0-9-2.5 2.5m-4 4L7.5 16.5",
  refresh: "M20 8a8 8 0 1 0 .8 6M20 3.5V8h-4.5",
  mail: "M3.5 6.5h17v11h-17v-11Zm0 .5 8.5 6 8.5-6",
} as const;

export type IconName = keyof typeof paths;

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export function Icon({ name, size = 20, ...rest }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={paths[name]} />
    </svg>
  );
}
