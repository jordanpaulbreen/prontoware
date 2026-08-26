"use client";

import { useActionState } from "react";
import { loginAction, forgotAction, resetAction, type ActionState } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const field =
  "h-11 w-full rounded-tile border border-hairline bg-surface-2 px-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-cyan focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-medium text-ink-muted";
const card = "rounded-card border border-hairline bg-surface p-6 sm:p-8 space-y-4";
const init: ActionState = { ok: false };

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, init);
  if (state.ok) {
    if (typeof window !== "undefined") window.location.href = "/account";
  }
  return (
    <form action={action} className={card}>
      <div>
        <label className={labelCls} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className={labelCls} htmlFor="password">Password</label>
          <a href="/forgot-password" className="text-xs text-cyan hover:underline">Forgot?</a>
        </div>
        <input id="password" name="password" type="password" autoComplete="current-password" className={field} />
      </div>
      {state.error && <p className="text-xs text-magenta">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? "Signing in…" : "Log in"}</Button>
      <p className="text-center text-xs text-ink-faint">
        New here? <a href="/register" className="text-cyan hover:underline">Create an account</a>
      </p>
    </form>
  );
}

export function ForgotForm() {
  const [state, action, pending] = useActionState(forgotAction, init);
  if (state.ok) {
    return (
      <div className={`${card} text-center`}>
        <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-deal/15 text-deal">
          <Icon name="mail" size={24} />
        </div>
        <p className="text-sm text-ink-muted">
          If an account exists for that email, we&apos;ve sent a password reset link. It expires in 1 hour.
        </p>
        <Button href="/login" variant="outline" className="w-full">Back to login</Button>
      </div>
    );
  }
  return (
    <form action={action} className={card}>
      <div>
        <label className={labelCls} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" />
      </div>
      {state.error && <p className="text-xs text-magenta">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? "Sending…" : "Send reset link"}</Button>
    </form>
  );
}

export function ResetForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetAction, init);
  if (state.ok) {
    return (
      <div className={`${card} text-center`}>
        <div className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-deal/15 text-deal">
          <Icon name="check" size={24} />
        </div>
        <p className="text-sm text-ink-muted">Your password has been reset. You can now log in.</p>
        <Button href="/login" className="w-full">Log in</Button>
      </div>
    );
  }
  return (
    <form action={action} className={card}>
      <input type="hidden" name="token" value={token} />
      <div>
        <label className={labelCls} htmlFor="password">New password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" className={field} placeholder="At least 8 characters" />
        {state.fieldErrors?.password && <p className="mt-1 text-xs text-magenta">{state.fieldErrors.password}</p>}
      </div>
      {state.error && <p className="text-xs text-magenta">{state.error}</p>}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? "Saving…" : "Set new password"}</Button>
    </form>
  );
}
