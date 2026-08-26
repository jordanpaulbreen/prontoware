"use client";

import { useState } from "react";
import { footerColumns, platforms, platformOrder } from "@/lib/data";
import { Icon } from "@/components/ui/Icon";
import { KeyGlow, Logo } from "@/components/ui/KeyGlow";
import { PaymentMarks } from "@/components/ui/PaymentMarks";
import { Reveal } from "@/components/ui/Reveal";
import { Shell } from "@/components/ui/Section";
import { ThemeToggle } from "@/components/header/TopStrip";
import { brand, company } from "@/lib/brand";
import { resolveLink } from "@/lib/links";

const socials: { label: string; icon: "discord" | "chat" | "send" | "play"; href: string }[] = [
  { label: "Discord", icon: "discord", href: "https://discord.gg/prontowaregames" },
  { label: "X", icon: "chat", href: "https://x.com/prontowaregames" },
  { label: "YouTube", icon: "play", href: "https://youtube.com/@prontowaregames" },
];

const legal = ["Privacy", "Terms", "Cookies", "Refund Policy", "Imprint"];

export function Footer() {
  return (
    <footer className="scanlines relative mt-4 border-t border-hairline bg-bg-deep">
      <span aria-hidden="true" className="scanlines-layer" />
      <div aria-hidden="true" className="hairline-gradient relative z-1" />

      <div className="relative z-1">
        <NewsletterBand />
        <LinkColumns />
        <TrustRow />
        <LegalBar />
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <Shell className="py-10 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_26rem] lg:items-center lg:gap-14">
        <Reveal>
          <Logo />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
            Official game keys, delivered the moment you pay. Built by people who have been
            buying keys at 2 a.m. for fifteen years.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-card border border-hairline bg-surface p-5">
            <span className="pixel-label mb-2 flex items-center gap-2 text-cyan">
              <KeyGlow size={18} halo={false} />
              deals drop at midnight
            </span>
            <h2 className="text-lg">Be first, every night</h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              One email, only when something worth buying goes live.
            </p>

            <form
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
                if (!email.trim()) return;
                setSent(true);
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative flex-1">
                  <label htmlFor="ma-newsletter" className="sr-only">
                    Email address
                  </label>
                  <Icon
                    name="mail"
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                  />
                  <input
                    id="ma-newsletter"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="h-11 w-full rounded-tile border border-hairline bg-surface-2 pl-10 pr-3 text-sm text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-[var(--ma-dur-base)] hover:border-hairline-strong focus:border-transparent focus-visible:shadow-[0_0_0_1px_var(--ma-cyan),0_0_22px_-6px_var(--ma-cyan-glow)]"
                  />
                </div>
                <button
                  type="submit"
                  className="press inline-flex h-11 items-center justify-center gap-2 rounded-tile bg-gradient-brand px-5 text-sm font-semibold text-ink-invert shadow-glow hover:brightness-110"
                >
                  <Icon name="bolt" size={16} />
                  Subscribe
                </button>
              </div>

              <p
                aria-live="polite"
                className={`mt-3 flex items-center gap-2 text-xs ${sent ? "text-deal" : "text-ink-faint"}`}
              >
                {sent ? (
                  <>
                    <Icon name="check" size={14} />
                    You&apos;re on the list — first drop lands at 00:00 CET.
                  </>
                ) : (
                  "No spam, unsubscribe in one click. See our privacy policy."
                )}
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

/* -------------------------------------------------------------------------- */

function LinkColumns() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div aria-hidden="true" className="hairline-gradient" />
      <Shell className="py-8 sm:py-10">
        <div className="grid gap-2 sm:grid-cols-3 sm:gap-8">
          {footerColumns.map((column) => {
            const expanded = open === column.title;
            return (
              <div key={column.title} className="border-b border-hairline pb-2 sm:border-0 sm:pb-0">
                {/* accordion trigger on mobile, plain heading from sm up */}
                <h2>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`ma-footer-${column.title}`}
                    onClick={() => setOpen(expanded ? null : column.title)}
                    className="flex w-full items-center justify-between py-3 text-left font-display text-sm font-bold tracking-tight text-ink sm:pointer-events-none sm:py-0"
                  >
                    {column.title}
                    <Icon
                      name="chevronDown"
                      size={16}
                      className={`text-ink-faint transition-transform duration-[var(--ma-dur-base)] sm:hidden ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h2>

                <ul
                  id={`ma-footer-${column.title}`}
                  className={`space-y-0.5 overflow-hidden sm:mt-4 sm:block sm:max-h-none ${
                    expanded ? "max-h-96 pb-2" : "max-h-0 sm:max-h-none"
                  } transition-[max-height] duration-[var(--ma-dur-slow)] ease-arcade`}
                >
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href={resolveLink(link)}
                        className="block rounded-[6px] py-1.5 text-sm text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Shell>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function TrustRow() {
  return (
    <>
      <div aria-hidden="true" className="hairline-gradient" />
      <Shell className="py-7">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <PaymentMarks size={30} />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="shield" size={14} className="text-deal" />
                Secure checkout · 3-D Secure · PCI DSS
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="badge" size={14} className="text-cyan" />
                Keys from authorised distributors
              </span>
            </div>
          </div>

          <ul className="flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="press inline-flex size-10 items-center justify-center rounded-tile border border-hairline bg-surface text-ink-muted hover:border-cyan hover:text-cyan"
                >
                  <Icon name={social.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </>
  );
}

/* -------------------------------------------------------------------------- */

function LegalBar() {
  return (
    <>
      <div aria-hidden="true" className="hairline-gradient" />
      <Shell className="py-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2 text-xs leading-relaxed text-ink-faint">
            <p>
              © {new Date().getFullYear()} {company.legalName} · Reg. No. {company.regNumber} ·{" "}
              {company.address}
            </p>
            <p>
              Contact:{" "}
              <a href={`mailto:${brand.contactEmail}`} className="hover:text-cyan">
                {brand.contactEmail}
              </a>
            </p>
            <p className="max-w-3xl">
              {platformOrder.map((id) => platforms[id].name).join(", ")} and all related marks are
              trademarks of their respective owners. {brand.name} is an independent retailer and
              is not affiliated with, endorsed or sponsored by any platform holder or publisher.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {legal.map((item) => (
            <li key={item}>
              <a
                href={resolveLink(item)}
                className="text-xs text-ink-muted transition-colors duration-[var(--ma-dur-base)] hover:text-cyan"
              >
                {item}
              </a>
            </li>
          ))}
          <li className="ml-auto">
            <span className="pixel-label text-ink-faint">press start · v1.0</span>
          </li>
        </ul>
      </Shell>
    </>
  );
}
