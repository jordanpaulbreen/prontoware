import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand, company, policy } from "@/lib/brand";
import { ProsePage, type Section } from "@/components/store/ProsePage";

type Params = { slug: string };

const UPDATED = "2026-08-01";
const entity = `${company.legalName} (Reg. No. ${company.regNumber}), ${company.address}`;

const pages: Record<string, { title: string; kicker: string; intro: string; sections: Section[] }> = {
  terms: {
    title: "Terms of Service",
    kicker: "Legal",
    intro: `These terms govern your use of ${brand.name}, operated by ${entity}. By placing an order you agree to them.`,
    sections: [
      { heading: "1. Who we are", body: [`${brand.name} is a trading name of ${company.legalName}, a company registered in ${company.country} under number ${company.regNumber}. ${company.legalName} is the seller and Merchant of Record for every order.`] },
      { heading: "2. Digital products", body: ["We sell digital game keys and codes. Each product page states the platform, edition and activation region before purchase. Keys are delivered by email and to your account library."] },
      { heading: "3. Payment & pricing", body: [`Prices are shown inclusive of any applicable VAT and we charge no additional processing fees (service fee: ${policy.serviceFeePct}%). Payment is taken at checkout by card or from your wallet balance.`] },
      { heading: "4. Delivery", body: [`Keys are delivered ${policy.deliveryTime} in most cases. Pre-ordered keys are delivered when the title unlocks.`] },
      { heading: "5. Refunds", body: [`Unrevealed keys can be refunded within ${policy.refundDays} days. See our Refund Policy for full details.`] },
      { heading: "6. Contact", body: [`Questions about these terms: ${brand.contactEmail}.`] },
    ],
  },
  returns: {
    title: "Refund & Return Policy",
    kicker: "Legal",
    intro: `How refunds and replacements work at ${brand.name}.`,
    sections: [
      { heading: "Right of withdrawal", body: [`You may request a refund on any unrevealed key within ${policy.refundDays} days of purchase. Once a key has been revealed, the statutory right of withdrawal for digital content no longer applies.`] },
      { heading: "Faulty keys", body: [`If a key does not work, contact us within the ${policy.warrantyMonths}-month warranty period and we will replace it or refund you in full.`] },
      { heading: "How to request", body: [`Email ${brand.contactEmail} or use ${policy.support} with your order number. Refunds are returned to your original payment method or wallet.`] },
    ],
  },
  warranty: {
    title: "Key Warranty",
    kicker: "Legal",
    intro: `Every key sold by ${brand.name} is covered by a ${policy.warrantyMonths}-month warranty.`,
    sections: [
      { heading: "What's covered", body: [`If a key is invalid, already used, or region-locked in a way not stated on the product page, we replace it or refund you within ${policy.warrantyMonths} months of purchase.`] },
      { heading: "How to claim", body: [`Contact ${brand.contactEmail} with your order number and a short description of the issue.`] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    kicker: "Legal",
    intro: `${entity} is the data controller for personal data processed through ${brand.name}.`,
    sections: [
      { heading: "Data we collect", body: ["Account details (name, email, address, phone, date of birth), order history and payment metadata. We never store full card numbers."] },
      { heading: "How we use it", body: ["To create your account, process orders, deliver keys, send transactional email, and meet legal and tax obligations."] },
      { heading: "Your rights", body: [`You may access, correct or delete your data. Contact ${brand.contactEmail}.`] },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    kicker: "Legal",
    intro: "How and why we use cookies.",
    sections: [
      { heading: "Essential cookies", body: ["Keep you signed in and remember your cart and currency. These are required for the store to work."] },
      { heading: "Analytics", body: ["Help us understand how the store is used so we can improve it. You can decline these in the cookie banner."] },
    ],
  },
  payment: {
    title: "Payment Policy",
    kicker: "Legal",
    intro: "Accepted methods and security.",
    sections: [
      { heading: "Accepted methods", body: ["We accept Visa and Mastercard, and payment from your wallet balance."] },
      { heading: "Security", body: ["All card payments are processed over a PCI-DSS compliant, 3-D Secure connection. We do not store card details on our servers."] },
      { heading: "Currency", body: [`Prices are charged in ${policy.currency}. Other currencies shown are indicative conversions.`] },
    ],
  },
  shipping: {
    title: "Delivery Policy",
    kicker: "Legal",
    intro: "All products are digital — there is no physical shipping.",
    sections: [
      { heading: "Digital delivery", body: [`Keys are delivered by email and to your account library, usually ${policy.deliveryTime} after payment clears.`] },
      { heading: "Pre-orders", body: ["Pre-ordered keys are delivered automatically the moment the title unlocks."] },
    ],
  },
  imprint: {
    title: "Imprint",
    kicker: "Legal",
    intro: "Company information.",
    sections: [
      { heading: "Operator", body: [company.legalName, `Registration number: ${company.regNumber}`, company.address, `Email: ${brand.contactEmail}`] },
      { heading: "Merchant of Record", body: [`${company.merchantOfRecord} is the seller and Merchant of Record for all orders placed on ${brand.name}.`] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = pages[slug];
  return { title: p?.title ?? "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = pages[slug];
  if (!p) notFound();
  return (
    <ProsePage kicker={p.kicker} title={p.title} intro={p.intro} sections={p.sections} updated={UPDATED} />
  );
}
