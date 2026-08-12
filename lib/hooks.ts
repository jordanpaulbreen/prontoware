"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True once the element has scrolled into view — drives every fade-up. */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08, ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);

  return { ref, inView };
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

type Remaining = { h: number; m: number; s: number; done: boolean };

/**
 * Countdown for flash deals. The deadline is resolved on the client from a
 * minutes offset so server and client markup never disagree.
 */
export function useCountdown(minutesFromNow: number) {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState<Remaining | null>(null);

  useEffect(() => {
    setDeadline(Date.now() + minutesFromNow * 60_000);
  }, [minutesFromNow]);

  useEffect(() => {
    if (!deadline) return;
    const tick = () => {
      const ms = deadline - Date.now();
      if (ms <= 0) {
        setLeft({ h: 0, m: 0, s: 0, done: true });
        return;
      }
      setLeft({
        h: Math.floor(ms / 3_600_000),
        m: Math.floor((ms % 3_600_000) / 60_000),
        s: Math.floor((ms % 60_000) / 1000),
        done: false,
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  return left;
}

/** Animated count-up that only runs once the number is on screen. */
export function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduced]);

  return value;
}

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const onPointer = (event: PointerEvent) => {
      const node = ref.current;
      if (node && !node.contains(event.target as Node)) handler();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [ref, handler, enabled]);
}

export function useEscapeKey(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [handler, enabled]);
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Adds the coin-drop squash class for the length of one press. */
export function useCoinPress(duration = 220) {
  const [pressing, setPressing] = useState(false);
  const timer = useRef<number | null>(null);

  const press = useCallback(() => {
    setPressing(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPressing(false), duration);
  }, [duration]);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  return { pressing, press };
}

/** Horizontal rail plumbing: arrow state + scroll-by-page. */
export function useRail<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState({ start: true, end: false });

  const sync = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setState({ start: node.scrollLeft <= 8, end: node.scrollLeft >= max - 8 });
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Rails always start at the first card: the mobile-first negative-margin
    // padding can otherwise leave a stale scroll offset after the breakpoint
    // styles kick in, clipping the first cover.
    node.scrollLeft = 0;
    sync();
    node.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      node.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = useCallback((direction: 1 | -1) => {
    const node = ref.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.round(node.clientWidth * 0.82), behavior: "smooth" });
  }, []);

  return { ref, ...state, scrollBy };
}
