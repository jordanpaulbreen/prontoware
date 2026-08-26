import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const user = (await getCurrentUser())!;
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl">Orders &amp; keys</h1>

      {orders.length === 0 ? (
        <div className="rounded-card border border-hairline bg-surface py-12 text-center">
          <p className="text-sm text-ink-muted">You haven&apos;t bought any keys yet.</p>
          <Button href="/store" className="mt-4">Browse the store</Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="rounded-card border border-hairline bg-surface p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
                <div>
                  <p className="font-semibold text-ink">Order {o.id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-ink-faint">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-chip bg-deal/15 px-2.5 py-1 text-xs font-medium capitalize text-deal">
                    {o.status}
                  </span>
                  <span className="font-semibold text-ink">
                    {o.currency} {(o.totalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
              <ul className="space-y-2">
                {o.items.map((it) => (
                  <li key={it.id} className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="text-ink">{it.productTitle}</span>
                    {it.gameKey ? (
                      <code className="rounded bg-surface-2 px-2 py-1 font-mono text-xs text-cyan">
                        {it.gameKey}
                      </code>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
                        <Icon name="clock" size={13} /> Delivering…
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
