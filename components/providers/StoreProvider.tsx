"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import type { CurrencyCode } from "@/lib/format";
import { games } from "@/lib/data";
import type { Game } from "@/lib/types";

/* --------------------------------------------------------------------------
   Theme — dark is first class, light is a full token re-bind
   -------------------------------------------------------------------------- */

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export const THEME_STORAGE_KEY = "ma-theme";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // The inline script in <head> has already set data-theme; read it back so
  // React state matches the DOM without a flash.
  useEffect(() => {
    const attr = document.documentElement.dataset.theme;
    if (attr === "light" || attr === "dark") setTheme(attr);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        /* private mode — theme simply won't persist */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

/* --------------------------------------------------------------------------
   Currency
   -------------------------------------------------------------------------- */

const CurrencyContext = createContext<{
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
}>({ currency: "EUR", setCurrency: () => {} });

export const useCurrency = () => useContext(CurrencyContext);

/* --------------------------------------------------------------------------
   Cart + wishlist
   -------------------------------------------------------------------------- */

export type CartLine = { game: Game; qty: number };

type CartState = { lines: CartLine[]; wishlist: string[]; lastAdded: string | null };

type CartAction =
  | { type: "add"; slug: string }
  | { type: "remove"; slug: string }
  | { type: "wish"; slug: string }
  | { type: "clear-flash" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const game = games.find((g) => g.slug === action.slug);
      if (!game) return state;
      const existing = state.lines.find((l) => l.game.slug === action.slug);
      return {
        ...state,
        lastAdded: action.slug,
        lines: existing
          ? state.lines.map((l) =>
              l.game.slug === action.slug ? { ...l, qty: l.qty + 1 } : l,
            )
          : [...state.lines, { game, qty: 1 }],
      };
    }
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.game.slug !== action.slug) };
    case "wish":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.slug)
          ? state.wishlist.filter((s) => s !== action.slug)
          : [...state.wishlist, action.slug],
      };
    case "clear-flash":
      return { ...state, lastAdded: null };
    default:
      return state;
  }
}

const initialState: CartState = {
  // Two lines pre-seeded so the mini-cart and the count badge have something
  // to show in this UI-only build.
  lines: [
    { game: games[0], qty: 1 },
    { game: games[13], qty: 1 },
  ],
  wishlist: ["hollow-lantern", "eclipse-warden"],
  lastAdded: null,
};

const CartContext = createContext<{
  lines: CartLine[];
  count: number;
  subtotal: number;
  wishlist: string[];
  lastAdded: string | null;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggleWish: (slug: string) => void;
}>({
  lines: [],
  count: 0,
  subtotal: 0,
  wishlist: [],
  lastAdded: null,
  add: () => {},
  remove: () => {},
  toggleWish: () => {},
});

export const useCart = () => useContext(CartContext);

/* --------------------------------------------------------------------------
   Single mount point
   -------------------------------------------------------------------------- */

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currency, setCurrencyState] = useState<CurrencyCode>("EUR");

  const add = useCallback((slug: string) => dispatch({ type: "add", slug }), []);
  const remove = useCallback((slug: string) => dispatch({ type: "remove", slug }), []);
  const toggleWish = useCallback((slug: string) => dispatch({ type: "wish", slug }), []);

  // The "added to cart" flash only lives long enough for the sparkle.
  useEffect(() => {
    if (!state.lastAdded) return;
    const id = window.setTimeout(() => dispatch({ type: "clear-flash" }), 1400);
    return () => window.clearTimeout(id);
  }, [state.lastAdded]);

  const setCurrency = useCallback((code: CurrencyCode) => setCurrencyState(code), []);

  const cartValue = useMemo(
    () => ({
      lines: state.lines,
      count: state.lines.reduce((sum, l) => sum + l.qty, 0),
      subtotal: state.lines.reduce((sum, l) => sum + l.qty * l.game.price, 0),
      wishlist: state.wishlist,
      lastAdded: state.lastAdded,
      add,
      remove,
      toggleWish,
    }),
    [state, add, remove, toggleWish],
  );

  const currencyValue = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency]);

  return (
    <ThemeProvider>
      <CurrencyContext.Provider value={currencyValue}>
        <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
      </CurrencyContext.Provider>
    </ThemeProvider>
  );
}
