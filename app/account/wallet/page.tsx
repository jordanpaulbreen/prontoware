import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TopUp } from "@/components/account/TopUp";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
  const user = (await getCurrentUser())!;
  const ledger = await prisma.ledgerEntry
    .findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 30 })
    .catch(() => []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Balance</h1>

      <div className="rounded-card border border-hairline bg-gradient-to-br from-surface to-surface-2 p-6">
        <p className="text-xs uppercase tracking-wide text-ink-faint">Available balance</p>
        <p className="mt-1 text-4xl font-bold text-ink">€{(user.balanceCents / 100).toFixed(2)}</p>
      </div>

      <TopUp />

      <div className="rounded-card border border-hairline bg-surface p-5">
        <h2 className="mb-3 text-lg">Transaction history</h2>
        {ledger.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-muted">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-hairline">
            {ledger.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="text-ink">{e.note}</p>
                  <p className="text-xs text-ink-faint">{new Date(e.createdAt).toLocaleString()}</p>
                </div>
                <span className={e.kind === "topup" ? "font-semibold text-deal" : "font-semibold text-magenta"}>
                  {e.kind === "topup" ? "+" : "−"}€{(e.amountCents / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
