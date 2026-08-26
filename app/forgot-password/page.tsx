import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/SimpleForms";

export const metadata: Metadata = { title: "Reset password — Prontoware Games" };

export default function ForgotPage() {
  return (
    <AuthShell title="Forgot your password?" subtitle="We'll email you a link to set a new one.">
      <ForgotForm />
    </AuthShell>
  );
}
