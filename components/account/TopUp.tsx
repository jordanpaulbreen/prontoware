"use client";

import { useActionState, useState } from "react";
import { topUpAction } from "@/app/actions/wallet";
import { Button } from "@/components/ui/Button";

const presets = [10, 20, 50, 100];

export function TopUp() {
  const [state, action, pending] = useActionState(topUpAction, { ok: false });
  const [amount, setAmount] = useState("20");

  return (
    <form action={action} className="rounded-card border border-hairline bg-surface p-5">
      <h2 className="text-lg">Top up your wallet</h2>
      <p className="mt-1 text-sm text-ink-muted">Add credit and check out in one tap next time.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setAmount(String(p))}
            className={`h-10 rounded-tile border px-4 text-sm font-medium ${
              amount === String(p)
                ? "border-cyan bg-cyan-soft text-cyan"
                : "border-hairline bg-surface-2 text-ink-muted hover:text-ink"
            }`}
          >
            €{p}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-faint">€</span>
          <input
            name="amount"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="h-11 w-32 rounded-tile border border-hairline bg-surface-2 pl-7 pr-3 text-sm text-ink focus:border-cyan focus:outline-none"
          />
        </div>
        <Button type="submit" disabled={pending || !amount || Number(amount) <= 0}>
          {pending ? "Adding…" : "Add funds"}
        </Button>
      </div>
      {state.error && <p className="mt-2 text-xs text-magenta">{state.error}</p>}
      {state.ok && <p className="mt-2 text-xs text-deal">Funds added to your wallet.</p>}
    </form>
  );
}
