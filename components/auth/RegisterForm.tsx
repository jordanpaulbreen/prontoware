"use client";

import { useActionState, useState } from "react";
import { registerAction, type ActionState } from "@/app/actions/auth";
import { countries } from "@/lib/countries";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const steps = ["Account", "About you", "Address", "Review"] as const;

// Which step each field lives on, so a validation error can point the user back to it.
const fieldStep: Record<string, number> = {
  email: 0, password: 0,
  firstName: 1, lastName: 1, phone: 1, dateOfBirth: 1,
  street: 2, city: 2, postcode: 2, country: 2,
  acceptTerms: 3,
};
const fieldLabel: Record<string, string> = {
  email: "Email", password: "Password",
  firstName: "First name", lastName: "Last name", phone: "Phone number", dateOfBirth: "Date of birth",
  street: "Street", city: "City", postcode: "Postal code", country: "Country",
  acceptTerms: "Terms and conditions",
};

const field =
  "h-11 w-full rounded-tile border border-hairline bg-surface-2 px-3.5 text-sm text-ink placeholder:text-ink-faint focus:border-cyan focus:outline-none";
const labelCls = "mb-1.5 block text-xs font-medium text-ink-muted";

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(registerAction, {
    ok: false,
  });
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({
    email: "", password: "", firstName: "", lastName: "", phone: "",
    dateOfBirth: "", street: "", city: "", country: "EE", postcode: "",
  });
  const [accepted, setAccepted] = useState(false);

  const set = (k: string, v: string) => setValues((p) => ({ ...p, [k]: v }));
  const err = (k: string) => state.fieldErrors?.[k];

  if (state.ok) {
    return (
      <div className="rounded-card border border-hairline bg-surface p-8 text-center">
        <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-full bg-deal/15 text-deal">
          <Icon name="check" size={28} />
        </div>
        <h1 className="text-xl">Account created</h1>
        <p className="mt-2 text-sm text-ink-muted">
          We sent a confirmation email to <strong>{values.email}</strong>. Check your inbox to
          verify your address.
        </p>
        <Button href="/account" className="mt-6">
          Go to my account
        </Button>
      </div>
    );
  }

  const canNext =
    (step === 0 && values.email && values.password.length >= 8) ||
    (step === 1 && values.firstName && values.lastName && values.phone && values.dateOfBirth) ||
    (step === 2 && values.street && values.city && values.country && values.postcode);

  return (
    <div className="rounded-card border border-hairline bg-surface p-6 sm:p-8">
      {/* stepper */}
      <ol className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i <= step ? "bg-gradient-brand text-ink-invert" : "bg-surface-2 text-ink-faint"
              }`}
            >
              {i + 1}
            </span>
            <span className={`hidden text-xs sm:inline ${i === step ? "text-ink" : "text-ink-faint"}`}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1 bg-hairline" />}
          </li>
        ))}
      </ol>

      <form action={formAction}>
        {/* every field is always in the DOM (hidden) so the final submit carries all steps */}
        <div className={step === 0 ? "space-y-4" : "hidden"}>
          <div>
            <label className={labelCls} htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" className={field}
              value={values.email} onChange={(e) => set("email", e.target.value)} placeholder="you@example.com" />
            {err("email") && <p className="mt-1 text-xs text-magenta">{err("email")}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="new-password" className={field}
              value={values.password} onChange={(e) => set("password", e.target.value)} placeholder="At least 8 characters" />
            {err("password") && <p className="mt-1 text-xs text-magenta">{err("password")}</p>}
          </div>
        </div>

        <div className={step === 1 ? "space-y-4" : "hidden"}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="firstName">First name</label>
              <input id="firstName" name="firstName" className={field} value={values.firstName}
                onChange={(e) => set("firstName", e.target.value)} />
              {err("firstName") && <p className="mt-1 text-xs text-magenta">{err("firstName")}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="lastName">Last name</label>
              <input id="lastName" name="lastName" className={field} value={values.lastName}
                onChange={(e) => set("lastName", e.target.value)} />
              {err("lastName") && <p className="mt-1 text-xs text-magenta">{err("lastName")}</p>}
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" className={field} value={values.phone}
              onChange={(e) => set("phone", e.target.value)} placeholder="+372 5123 4567" />
            {err("phone") && <p className="mt-1 text-xs text-magenta">{err("phone")}</p>}
          </div>
          <div>
            <label className={labelCls} htmlFor="dateOfBirth">Date of birth</label>
            <input id="dateOfBirth" name="dateOfBirth" type="date" className={field} value={values.dateOfBirth}
              onChange={(e) => set("dateOfBirth", e.target.value)} />
            {err("dateOfBirth") && <p className="mt-1 text-xs text-magenta">{err("dateOfBirth")}</p>}
          </div>
        </div>

        <div className={step === 2 ? "space-y-4" : "hidden"}>
          <div>
            <label className={labelCls} htmlFor="street">Street</label>
            <input id="street" name="street" autoComplete="address-line1" className={field}
              value={values.street} onChange={(e) => set("street", e.target.value)} />
            {err("street") && <p className="mt-1 text-xs text-magenta">{err("street")}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="city">City</label>
              <input id="city" name="city" autoComplete="address-level2" className={field}
                value={values.city} onChange={(e) => set("city", e.target.value)} />
              {err("city") && <p className="mt-1 text-xs text-magenta">{err("city")}</p>}
            </div>
            <div>
              <label className={labelCls} htmlFor="postcode">Postal code</label>
              <input id="postcode" name="postcode" autoComplete="postal-code" className={field}
                value={values.postcode} onChange={(e) => set("postcode", e.target.value)} />
              {err("postcode") && <p className="mt-1 text-xs text-magenta">{err("postcode")}</p>}
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="country">Country</label>
            <select id="country" name="country" className={field} value={values.country}
              onChange={(e) => set("country", e.target.value)}>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>{c.name}</option>
              ))}
            </select>
            {err("country") && <p className="mt-1 text-xs text-magenta">{err("country")}</p>}
          </div>
        </div>

        <div className={step === 3 ? "space-y-4" : "hidden"}>
          <dl className="divide-y divide-hairline rounded-tile border border-hairline text-sm">
            {[
              ["Email", values.email],
              ["Name", `${values.firstName} ${values.lastName}`],
              ["Phone", values.phone],
              ["Date of birth", values.dateOfBirth],
              ["Address", `${values.street}, ${values.city} ${values.postcode}, ${
                countries.find((c) => c.code === values.country)?.name ?? values.country
              }`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                <dt className="text-ink-faint">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>

          <label className="flex items-start gap-3 text-sm text-ink-muted">
            <input type="checkbox" name="acceptTerms" checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-[var(--ma-magenta)]" />
            <span>
              I read and agree to the{" "}
              <a href="/legal/terms" className="text-cyan hover:underline">terms and conditions</a>{" "}
              and <a href="/legal/privacy" className="text-cyan hover:underline">privacy policy</a>.
            </span>
          </label>
          {err("acceptTerms") && <p className="text-xs text-magenta">{err("acceptTerms")}</p>}
          {state.error && <p className="text-xs text-magenta">{state.error}</p>}

          {/* Errors on earlier steps are otherwise hidden — surface them here so the
              user knows why the account wasn't created and can jump back to fix it. */}
          {(() => {
            const problems = Object.entries(state.fieldErrors ?? {}).filter(
              ([k]) => k !== "acceptTerms",
            );
            if (problems.length === 0) return null;
            return (
              <div className="rounded-tile border border-magenta/40 bg-magenta/10 p-3 text-xs text-magenta">
                <p className="font-medium">Please fix these before creating your account:</p>
                <ul className="mt-1.5 space-y-1">
                  {problems.map(([k, message]) => (
                    <li key={k}>
                      <button
                        type="button"
                        onClick={() => setStep(fieldStep[k] ?? 0)}
                        className="underline hover:no-underline"
                      >
                        {fieldLabel[k] ?? k}
                      </button>
                      {`: ${message}`}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })()}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={() => setStep((s) => s - 1)}>Back</Button>
          ) : (
            <span className="text-xs text-ink-faint">
              Already have an account? <a href="/login" className="text-cyan hover:underline">Log in</a>
            </span>
          )}

          {step < 3 ? (
            <Button type="button" onClick={() => canNext && setStep((s) => s + 1)} disabled={!canNext}>
              Continue
            </Button>
          ) : (
            <Button type="submit" disabled={!accepted || pending}>
              {pending ? "Creating…" : "Create account"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
