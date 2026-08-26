import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/SimpleForms";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Log in — Prontoware Games" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <AuthShell title="Welcome back" subtitle="Log in to your Prontoware Games account.">
      <LoginForm />
    </AuthShell>
  );
}
