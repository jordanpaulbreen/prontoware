"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Button } from "./Button";

const STORAGE_KEY = "pw-cookie-consent";

/** Persistent cookie-consent banner. Choice is stored in localStorage so it
    never reappears once the visitor has accepted or declined. */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* private mode — banner simply shows each visit */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-100 mx-auto max-w-2xl animate-[panel-in_var(--ma-dur-base)_var(--ma-ease-arcade)] rounded-card border border-hairline-strong bg-surface/95 p-4 shadow-panel backdrop-blur-xl sm:inset-x-auto sm:right-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-cyan">
          <Icon name="shield" size={20} />
        </span>
        <div className="flex-1 text-sm">
          <p className="text-ink">
            We use cookies to keep you signed in, remember your cart and currency, and understand how
            the store is used. See our{" "}
            <a href="/legal/cookies" className="text-cyan hover:underline">
              Cookie Policy
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide("accepted")}>
              Accept all
            </Button>
            <Button size="sm" variant="surface" onClick={() => decide("declined")}>
              Decline non-essential
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
