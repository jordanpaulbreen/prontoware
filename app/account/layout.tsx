import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import { Shell } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";

const links = [
  { href: "/account", label: "Dashboard", icon: "controller" as const },
  { href: "/account/orders", label: "Orders & keys", icon: "bolt" as const },
  { href: "/account/wallet", label: "Balance", icon: "badge" as const },
  { href: "/wishlist", label: "Wishlist", icon: "heart" as const },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <Shell className="py-10">
      <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 rounded-card border border-hairline bg-surface p-4">
            <p className="text-xs text-ink-faint">Signed in as</p>
            <p className="truncate text-sm font-semibold text-ink">
              {user.firstName} {user.lastName}
            </p>
            <p className="truncate text-xs text-ink-muted">{user.email}</p>
          </div>
          <nav className="space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="flex items-center gap-2.5 rounded-tile px-3 py-2.5 text-sm text-ink-muted hover:bg-surface-2 hover:text-ink"
              >
                <Icon name={l.icon} size={16} />
                {l.label}
              </a>
            ))}
            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-2.5 rounded-tile px-3 py-2.5 text-left text-sm text-ink-muted hover:bg-surface-2 hover:text-magenta"
              >
                <Icon name="arrowRight" size={16} />
                Log out
              </button>
            </form>
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </Shell>
  );
}
