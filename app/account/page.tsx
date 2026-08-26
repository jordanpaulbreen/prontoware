import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AccountDashboard({
  searchParams,
}: {
  searchParams: Promise<{ verify?: string }>;
}) {
  const user = (await getCurrentUser())!;
  const { verify } = await searchParams;
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: { items: true },
  }).catch(() => []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl">Hi {user.firstName} 👋</h1>
        <p className="mt-1 text-sm text-ink-muted">Here&apos;s what&apos;s happening in your account.</p>
      </div>

      {verify === "success" && (
        <p className="flex items-center gap-2 rounded-tile border border-deal/40 bg-deal/10 px-4 py-3 text-sm text-deal">
          <Icon name="check" size={16} /> Your email is verified. You&apos;re all set.
        </p>
      )}
      {!user.emailVerified && verify !== "success" && (
        <p className="flex items-center gap-2 rounded-tile border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold">
          <Icon name="mail" size={16} /> Please confirm your email — check your inbox for the link.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Wallet balance" value={`€${(user.balanceCents / 100).toFixed(2)}`} icon="bolt" href="/account/wallet" />
        <Stat label="Orders" value={String(orders.length)} icon="badge" href="/account/orders" />
        <Stat label="Member since" value={new Date(user.createdAt).getFullYear().toString()} icon="star" />
      </div>

      <div className="rounded-card border border-hairline bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg">Recent orders</h2>
          <a href="/account/orders" className="text-sm text-cyan hover:underline">View all</a>
        </div>
        {orders.length === 0 ? (
          <div className="py-8 text-center text-sm text-ink-muted">
            <p>No orders yet.</p>
            <Button href="/store" className="mt-4">Browse the store</Button>
          </div>
        ) : (
          <ul className="divide-y divide-hairline">
            {orders.map((o) => (
              <li key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div>
                  <p className="font-medium text-ink">Order {o.id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-ink-faint">
                    {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item(s)
                  </p>
                </div>
                <span className="font-semibold text-ink">
                  {o.currency} {(o.totalCents / 100).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: string;
  icon: "bolt" | "badge" | "star";
  href?: string;
}) {
  const inner = (
    <div className="rounded-card border border-hairline bg-surface p-5">
      <Icon name={icon} size={18} className="text-cyan" />
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  );
  return href ? <a href={href} className="block hover:brightness-110">{inner}</a> : inner;
}
