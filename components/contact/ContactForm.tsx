"use client";

import { useActionState } from "react";
import { sendContactMessage, type ContactState } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const field =
  "h-11 w-full rounded-tile border border-hairline bg-surface-2 px-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-cyan focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-medium text-ink-muted";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContactMessage,
    { ok: false },
  );
  const err = (k: string) => state.fieldErrors?.[k];

  if (state.ok) {
    return (
      <div className="rounded-card border border-hairline bg-surface p-6 text-center">
        <div className="mx-auto mb-3 inline-flex size-12 items-center justify-center rounded-full bg-deal/15 text-deal">
          <Icon name="check" size={24} />
        </div>
        <h2 className="text-lg">Message sent</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Thanks for reaching out — we&apos;ll reply by email shortly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-card border border-hairline bg-surface p-5 sm:p-6">
      <h2 className="text-lg">Send us a message</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Questions, feedback or a problem with an order — tell us and we&apos;ll get back to you by
        email.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">Your name</label>
          <input id="name" name="name" className={field} placeholder="Jane Doe" />
          {err("name") && <p className="mt-1 text-xs text-magenta">{err("name")}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={field} placeholder="you@example.com" />
          {err("email") && <p className="mt-1 text-xs text-magenta">{err("email")}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="subject">Subject</label>
        <input id="subject" name="subject" className={field} placeholder="How can we help?" />
        {err("subject") && <p className="mt-1 text-xs text-magenta">{err("subject")}</p>}
      </div>

      <div className="mt-4">
        <label className={labelCls} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded-tile border border-hairline bg-surface-2 px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-cyan focus:outline-none"
          placeholder="Give us as much detail as you can…"
        />
        {err("message") && <p className="mt-1 text-xs text-magenta">{err("message")}</p>}
      </div>

      {state.error && <p className="mt-3 text-xs text-magenta">{state.error}</p>}

      <Button type="submit" className="mt-5" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
