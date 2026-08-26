import "server-only";
import nodemailer from "nodemailer";
import { smtp } from "./config";
import { brand, company } from "./brand";

let cached: nodemailer.Transporter | null = null;

function transport() {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port, // 587
    secure: smtp.secure, // false => STARTTLS on 587
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    requireTLS: !smtp.secure,
  });
  return cached;
}

/** Verifies the SMTP connection/credentials. Used by the health route. */
export async function verifyMailer() {
  return transport().verify();
}

type Mail = { to: string; subject: string; html: string; attachments?: nodemailer.SendMailOptions["attachments"] };

export async function sendMail({ to, subject, html, attachments }: Mail) {
  const info = await transport().sendMail({
    from: smtp.from,
    to,
    subject,
    html: shell(html),
    attachments,
  });
  return info;
}

/* ---- shared layout ---- */
function shell(inner: string) {
  return `<div style="font-family:Inter,Arial,sans-serif;background:#0e0b1e;color:#eeecfa;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#171331;border-radius:16px;overflow:hidden;border:1px solid #2a2450">
      <div style="padding:22px 28px;border-bottom:1px solid #2a2450;font-size:20px;font-weight:700">
        🎮 ${brand.name}
      </div>
      <div style="padding:28px;line-height:1.6;font-size:15px">${inner}</div>
      <div style="padding:18px 28px;border-top:1px solid #2a2450;font-size:12px;color:#9b93c7">
        ${company.legalName} · Reg. ${company.regNumber}<br/>${company.address}<br/>
        <a href="mailto:${brand.contactEmail}" style="color:#56e1ff">${brand.contactEmail}</a>
      </div>
    </div>
  </div>`;
}

const btn = (href: string, label: string) =>
  `<a href="${href}" style="display:inline-block;background:linear-gradient(90deg,#e93d82,#56e1ff);color:#0e0b1e;font-weight:700;padding:12px 22px;border-radius:10px;text-decoration:none">${label}</a>`;

/* ---- templates ---- */
export function sendVerificationEmail(to: string, firstName: string, url: string) {
  return sendMail({
    to,
    subject: `Confirm your ${brand.name} account`,
    html: `<p>Hi ${firstName},</p>
      <p>Welcome to ${brand.name}. Confirm your email address to activate your account:</p>
      <p style="margin:22px 0">${btn(url, "Confirm my email")}</p>
      <p style="color:#9b93c7;font-size:13px">If you didn't create this account, you can ignore this email.</p>`,
  });
}

export function sendPasswordResetEmail(to: string, firstName: string, url: string) {
  return sendMail({
    to,
    subject: `Reset your ${brand.name} password`,
    html: `<p>Hi ${firstName},</p>
      <p>We received a request to reset your password. This link expires in 1 hour:</p>
      <p style="margin:22px 0">${btn(url, "Reset password")}</p>
      <p style="color:#9b93c7;font-size:13px">Didn't request this? Your password is unchanged.</p>`,
  });
}

export function sendOrderConfirmationEmail(
  to: string,
  opts: { firstName: string; orderId: string; total: string; keys: { title: string; key: string }[] },
  invoicePdf?: Buffer,
) {
  const rows = opts.keys
    .map(
      (k) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #2a2450">${k.title}</td>
         <td style="padding:8px 0;border-bottom:1px solid #2a2450;font-family:monospace;color:#56e1ff">${k.key}</td></tr>`,
    )
    .join("");
  return sendMail({
    to,
    subject: `Your ${brand.name} order ${opts.orderId} — keys inside`,
    html: `<p>Hi ${opts.firstName},</p>
      <p>Thanks for your order. Here ${opts.keys.length === 1 ? "is your key" : "are your keys"}:</p>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">${rows}</table>
      <p>Order total: <strong>${opts.total}</strong></p>
      <p style="color:#9b93c7;font-size:13px">Your PDF invoice is attached. Keys are also in your library.</p>`,
    attachments: invoicePdf
      ? [{ filename: `invoice-${opts.orderId}.pdf`, content: invoicePdf, contentType: "application/pdf" }]
      : undefined,
  });
}
