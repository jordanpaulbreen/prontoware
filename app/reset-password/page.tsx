import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetForm } from "@/components/auth/SimpleForms";

export const metadata: Metadata = { title: "Set a new password — Prontoware Games" };

export default async function ResetPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <AuthShell title="Set a new password">
      {token ? (
        <ResetForm token={token} />
      ) : (
        <p className="rounded-card border border-hairline bg-surface p-6 text-center text-sm text-ink-muted">
          This reset link is invalid. Request a new one from the{" "}
          <a href="/forgot-password" className="text-cyan hover:underline">forgot password</a> page.
        </p>
      )}
    </AuthShell>
  );
}
