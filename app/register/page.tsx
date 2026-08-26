import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Create account — Prontoware Games" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/account");
  return (
    <AuthShell title="Create your account" subtitle="Instant keys, order history and member deals.">
      <RegisterForm />
    </AuthShell>
  );
}
