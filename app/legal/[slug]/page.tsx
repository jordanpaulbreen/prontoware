import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand, company } from "@/lib/brand";
import { ProsePage, type Section } from "@/components/store/ProsePage";

type Params = { slug: string };

// Effective date of the published policy set.
const UPDATED = "2026-08-27";
const email = brand.contactEmail;
const entity = `${company.legalName}, an Estonian private limited company registered under number ${company.regNumber}, with its registered address at ${company.address}`;

const pages: Record<string, { title: string; kicker: string; intro: string; sections: Section[] }> = {
  terms: {
    title: "Terms and Conditions",
    kicker: "Legal",
    intro: `These Terms and Conditions govern access to and use of ${brand.domain}, the creation and use of customer accounts, and purchases of digital products from ${company.legalName}. By using the website or placing an order, you agree to these Terms. If you do not agree, you must not use the website or purchase a product.`,
    sections: [
      { heading: "1. About us and these Terms", body: [
        `The website is operated by ${entity} ("Prontoware", "we", "us" or "our").`,
        `You may contact us at ${email}. These Terms apply to consumers purchasing for personal, non-commercial use. They do not create rights for resellers, professional traders or persons acquiring products on behalf of a business.`,
        "The Refund, Cancellation and Withdrawal Policy, Digital Delivery Policy, Privacy Policy, Cookie Policy, Complaints and Dispute Resolution Procedure and Product-Specific Terms form part of the contractual framework and should be read together with these Terms.",
      ] },
      { heading: "2. Definitions", body: [
        "• Account means a registered customer profile on the website.",
        "• Activation Platform means a third-party platform, account, application, console, storefront or service on which a Product is redeemed, activated or used.",
        "• Consumer means a natural person acting for purposes outside that person's trade, business, craft or profession.",
        "• Digital Key means a code, link, credential or other digital means used to redeem or access a Product.",
        "• Order means a request submitted through the website to purchase one or more Products.",
        "• Product means a game, software licence, subscription code, gift card, wallet top-up or other digital product offered on the website.",
        "• Product Page means the website page describing a particular Product, including its platform, region, language, compatibility and activation information.",
      ] },
      { heading: "3. Eligibility and permitted territories", body: [
        "You may use the website and purchase Products only if you are at least 18 years old, have legal capacity to enter into a binding contract and use a payment method that you are authorised to use. By placing an Order, you confirm that these requirements are met.",
        "The website is not available for purchases from the following countries or territories: Sudan; Democratic Republic of the Congo; Iran; Mali; Myanmar (Burma); North Korea; South Sudan; Syria; Yemen; Afghanistan; Belarus; Central African Republic; Cuba; Haiti; Iraq; Russia; Somalia; Venezuela; and Zimbabwe.",
        "We may refuse or restrict access, delivery or payment where required by applicable law, sanctions, export-control rules, publisher restrictions, Activation Platform rules or fraud-prevention measures. Availability of the website in a location does not guarantee that every Product can be activated there.",
      ] },
      { heading: "4. Our role and the Products", body: [
        "Prontoware sells Products in its own name and is the seller under the consumer contract. We use third-party catalogue, licensing, inventory and fulfilment services to obtain product information and Digital Keys. Those service providers do not replace Prontoware as the seller to you.",
        "Products are licensed, not sold as ownership of the underlying game, software, content, platform or intellectual property. Your right to use a Product is subject to the licence terms of the relevant publisher, developer, issuer or Activation Platform.",
        "We do not offer pre-orders. A Product displayed on the website is intended for delivery after successful payment, subject to inventory, verification and the other conditions in these Terms.",
      ] },
      { heading: "5. Product information and purchase checks", body: [
        "Before ordering, you must review the Product Page and verify that the Product is suitable for you. In particular, you must check:",
        "• the exact title, edition and included content;",
        "• the required Activation Platform and account;",
        "• the permitted activation region and any location restrictions;",
        "• supported device, operating system and hardware requirements;",
        "• supported languages and content rating;",
        "• whether an internet connection, recurring third-party account or additional software is required;",
        "• any expiry, redemption window or issuer restrictions disclosed on the Product Page; and",
        "• any terms presented by the publisher, issuer or Activation Platform.",
        "Images, trailers, screenshots and logos are illustrative. The written Product Page, edition name, platform and region information determine what is included. Minor differences in packaging images do not affect the Digital Product supplied.",
        "We take reasonable care to keep catalogue information accurate, but information supplied through publishers and catalogue providers may change. If a material error affects an Order before delivery, we may correct it and ask whether you wish to proceed, or cancel the Order and refund the amount paid.",
      ] },
      { heading: "6. Accounts", body: [
        "You may create an Account to place and manage Orders. You must provide accurate, current and complete information and keep it updated. One person must not create or use multiple Accounts to evade purchase limits, promotions, verification or enforcement measures.",
        "You are responsible for maintaining the confidentiality of your login credentials and for activity carried out through your Account. You must notify us promptly if you suspect unauthorised access, loss of credentials or compromise of a Digital Key.",
        "An Account is personal and may not be sold, transferred, shared commercially or used to purchase Products for resale. We may require reasonable verification before changing account details, releasing Order information or processing a sensitive request.",
      ] },
      { heading: "7. Prices, currencies and taxes", body: [
        "Products may be offered in EUR, GBP or USD. The currency displayed and confirmed at checkout is the currency of the Order. Your card issuer may apply exchange rates, foreign-transaction fees or other charges that are outside our control.",
        `The final amount payable to Prontoware is shown before the Order is submitted. ${company.legalName} is not registered for VAT and does not display a VAT registration number. Where any tax, levy or charge must legally be collected by us, it will be reflected in the final price or otherwise disclosed before payment.`,
        "We may change prices at any time before an Order is accepted. A price change does not affect an Order already confirmed. If a price is clearly incorrect and the error could reasonably have been recognised, we may reject or cancel the affected Order and refund any amount received.",
      ] },
      { heading: "8. Orders and contract formation", body: [
        "The website guides you through the Order process and allows you to review the selected Products, price, currency and essential restrictions before payment. You are responsible for correcting errors before submitting the Order.",
        "Submitting an Order is an offer to purchase. An on-screen acknowledgement or payment authorisation does not by itself mean that the Order has been accepted. A binding contract is formed when we send an Order confirmation stating that the Product has been accepted for delivery, or when we make the Digital Key available, whichever occurs first.",
        "We may reject or cancel an Order before delivery where:",
        "• payment is declined, reversed, unauthorised or cannot be verified;",
        "• the Product or a valid Digital Key is unavailable;",
        "• the Product is restricted in the customer's location or Activation Platform region;",
        "• the Order breaches purchase limits, these Terms or applicable law;",
        "• information provided in the Order is incomplete, inconsistent or reasonably suspected to be false;",
        "• the Order is affected by a material pricing, catalogue or technical error; or",
        "• fraud, sanctions, security or chargeback risk requires cancellation.",
        "If we cancel an Order after receiving cleared funds and before valid delivery, we will refund the relevant amount to the original payment method, subject to legal and technical processing times.",
      ] },
      { heading: "9. Payment", body: [
        "Payment may be made using Visa or Mastercard where available at checkout. Payment is processed by third-party payment service providers and financial institutions. Their security checks, authorisation rules and processing times may apply.",
        "You confirm that you are authorised to use the selected payment method and authorise the payment of the final Order total. We may receive limited payment information such as transaction status, card type, masked card details, issuer country and risk signals, but full card credentials are handled by payment service providers.",
        "An authorisation hold is not necessarily a completed charge. If an Order is rejected, the release of a pending authorisation may depend on your bank or card issuer.",
      ] },
      { heading: "10. Immediate digital delivery", body: [
        "After successful payment and any required checks, the Digital Key is made available in the customer's Account and is also sent to the email address used for the Order. The delivery email serves as an Order confirmation and may contain the Digital Key or the information needed to access it.",
        "At checkout, you will be asked to expressly request immediate performance and acknowledge that, once supply of the digital content begins, you lose the statutory right to withdraw solely because you changed your mind. This does not remove legal remedies for a Product that is not supplied, is invalid, is materially misdescribed or otherwise fails to conform to the contract.",
        "Delivery and troubleshooting are governed in more detail by the Digital Delivery Policy.",
      ] },
      { heading: "11. Withdrawal, cancellation and refunds", body: [
        "Consumers may have a statutory right to withdraw from a distance contract within 14 days. For digital content not supplied on a tangible medium, that right may be lost once supply begins with the consumer's prior express consent and acknowledgement of the loss of the right.",
        "Because Products are intended for immediate digital delivery and Digital Keys are displayed and emailed after payment, a change-of-mind refund will generally not be available after supply has begun. A request made before delivery will be considered if the Order can still be stopped.",
        "Nothing in these Terms limits mandatory rights relating to non-conforming digital content. The Refund, Cancellation and Withdrawal Policy explains eligibility, evidence, remedies and the request process.",
      ] },
      { heading: "12. Product conformity and legal remedies", body: [
        "We are responsible for supplying a Product that corresponds to the contract. If a Digital Key is invalid, already used before delivery, materially different from the Product ordered, or cannot be activated despite compliance with the disclosed requirements, contact us promptly and provide the requested evidence.",
        "Depending on the circumstances and applicable law, an appropriate remedy may include technical assistance, replacement with a valid equivalent Digital Key, a price reduction, cancellation or a refund. We may first take reasonable steps to verify the issue with the relevant licensing or fulfilment provider.",
        "A Product is not non-conforming merely because you dislike it, your equipment does not meet disclosed requirements, you selected the wrong platform or region, an external account is suspended for reasons unrelated to the Product, or the publisher later changes an online feature, except where mandatory law provides otherwise.",
      ] },
      { heading: "13. Product-specific conditions", body: [
        "Different Product categories carry different activation and use rules. Games and software usually require a specified Activation Platform; subscription codes may add a fixed period to an eligible account; gift cards and wallet top-ups may be limited by issuer, region, currency, account type and redemption rules.",
        "The Product-Specific Terms form part of these Terms. If a Product Page contains a specific condition that is consistent with mandatory law, that condition applies to the relevant Product. If there is a conflict, mandatory consumer law prevails, followed by the specific Product Page, the Product-Specific Terms and then these general Terms.",
      ] },
      { heading: "14. Acceptable use", body: [
        "You must use the website, Accounts and Products lawfully and only for personal, non-commercial purposes. You must not:",
        "• purchase or attempt to purchase Products for resale, brokering, arbitrage or other commercial distribution;",
        "• use stolen, unauthorised or fraudulently obtained payment credentials;",
        "• use bots, scripts, scraping, automated checkout or other automated means to access the website or acquire inventory;",
        "• circumvent purchase limits, territorial restrictions, security controls or verification measures;",
        "• use a false location, identity or account information to obtain a Product not available to you;",
        "• probe, scan, disrupt or attempt to gain unauthorised access to the website, an Account or connected system;",
        "• share, publish, sell or transfer an unredeemed Digital Key except where the Product expressly permits gifting;",
        "• submit false refund, non-delivery, fraud or chargeback claims; or",
        "• use the website or a Product in breach of law, sanctions, export controls or third-party licence terms.",
      ] },
      { heading: "15. Fraud prevention, verification and chargebacks", body: [
        "We may use proportionate automated and manual checks to prevent fraud, unauthorised payments, account takeover, resale and abuse. An Order may be delayed, limited, rejected or cancelled while a check is completed.",
        "If we request verification, you should provide only the information requested through the designated channel. We will not ask you to send a complete payment card number, card security code or account password by email.",
        "Before initiating a chargeback, you should contact us so that we can investigate the Order. We may contest a chargeback using relevant Order, delivery, activation, account and communication records. A fraudulent or abusive chargeback may result in suspension of the Account and recovery of amounts lawfully due.",
      ] },
      { heading: "16. Promotions and purchase limits", body: [
        "Promotions, discounts and coupons may be subject to additional conditions, validity periods, product exclusions, customer limits and territorial restrictions. Unless stated otherwise, promotions cannot be combined, transferred, exchanged for cash or applied retrospectively.",
        "We may correct, withdraw or cancel a promotion affected by a technical error, fraud or misuse, without affecting a completed Order except where the Order itself resulted from an obvious error or unlawful conduct.",
      ] },
      { heading: "17. Intellectual property", body: [
        "The website, its design, text, databases, software, graphics and branding are owned by or licensed to Prontoware and are protected by intellectual property laws. Product names, publisher marks, platform marks and related materials belong to their respective owners.",
        "You receive a limited, revocable, non-exclusive right to access the website for personal shopping and account management. You may not reproduce, modify, distribute, reverse engineer, commercially exploit or create derivative works from the website except to the extent expressly permitted by law.",
      ] },
      { heading: "18. Third-party platforms and services", body: [
        "Activation and use of a Product may require a third-party account and acceptance of third-party terms. Prontoware does not control the continued availability, account rules, technical environment or online features of an Activation Platform.",
        "We are not responsible for a third party's suspension of your account, refusal to accept incorrect account details, changes to services or enforcement of its terms, unless the issue results from our failure to supply the Product in conformity with the contract. Nothing in this section excludes liability that cannot lawfully be excluded.",
      ] },
      { heading: "19. Website availability and changes", body: [
        "We aim to keep the website available and accurate but do not guarantee uninterrupted access. Maintenance, security incidents, supplier outages, network failures or events outside reasonable control may temporarily affect catalogue display, checkout, Account access or delivery.",
        "We may update, suspend or discontinue website features. Such changes do not remove rights relating to a completed Order or a Product already supplied.",
      ] },
      { heading: "20. Suspension and termination", body: [
        "You may request closure of your Account by contacting us. We may restrict, suspend or terminate access where we reasonably believe that you have materially breached these Terms, created a security or fraud risk, used the website unlawfully, or where restriction is required by law.",
        "Where appropriate, we will give notice and an opportunity to explain. Immediate action may be taken where necessary to prevent fraud, protect users or systems, comply with law, or preserve evidence. Account closure does not automatically delete transaction records that we must retain and does not affect accrued rights or obligations.",
      ] },
      { heading: "21. Liability", body: [
        "Nothing in these Terms excludes or limits liability for fraud, fraudulent misrepresentation, intentional misconduct, death or personal injury caused by negligence, mandatory consumer rights, or any other liability that cannot lawfully be excluded or limited.",
        "Subject to the preceding paragraph and to the extent permitted by law, Prontoware is not liable for indirect or unforeseeable loss, loss caused by your failure to follow disclosed activation or security requirements, business loss arising from personal-use Products, or failure of a third-party platform unrelated to non-conformity of the Product supplied by us.",
        "You remain responsible for losses directly caused by your unlawful use, fraud or deliberate material breach, to the extent permitted by applicable law. Any limitation in these Terms applies only to the extent it is fair, valid and enforceable against a Consumer.",
      ] },
      { heading: "22. Privacy", body: [
        "We process personal data in accordance with the Privacy Policy and use cookies and similar technologies as described in the Cookie Policy. Payment, licensing, fulfilment, hosting and communication providers may process data as necessary to complete Orders, operate the website, prevent fraud and comply with law.",
      ] },
      { heading: "23. Complaints and customer support", body: [
        `Questions, technical issues and complaints should be sent to ${email}. Include the Order number, Account email, Product and a clear description of the issue. Do not send complete card credentials, passwords or unrelated identity documents.`,
        "We aim to resolve complaints directly and will provide a written response within the period required by Estonian law. The Complaints and Dispute Resolution Procedure contains further details, including information about the Estonian Consumer Disputes Committee.",
      ] },
      { heading: "24. Governing law and jurisdiction", body: [
        "These Terms and consumer contracts with Prontoware are governed by the laws of Estonia. This choice does not deprive a Consumer of mandatory protections granted by the law of the country in which the Consumer habitually resides where those protections apply irrespective of the chosen law.",
        "Disputes should first be submitted to Prontoware. A Consumer may use an applicable out-of-court dispute resolution body or bring proceedings before a court having jurisdiction under applicable law. Estonian courts have jurisdiction to the extent that a different forum is not required or available under mandatory consumer law.",
      ] },
      { heading: "25. Changes to these Terms", body: [
        "We may update these Terms to reflect legal, technical, security or business changes. The updated version applies from the stated effective date. Changes do not retroactively alter a completed Order unless required by law or expressly agreed with you.",
        "If a material change affects ongoing Account use, we may provide reasonable notice through the website, Account or email. Continued use after the effective date constitutes acceptance only where that method is legally valid.",
      ] },
      { heading: "26. General provisions", body: [
        "If any provision is held invalid or unenforceable, the remaining provisions continue in effect. A failure or delay in enforcing a right is not a waiver. We may transfer our rights or obligations only where the transfer does not reduce mandatory guarantees benefiting the Consumer. You may not transfer an Order or Account except where we expressly permit it.",
        "These Terms are available in English. If a translation is provided for convenience, the English version prevails to the extent permitted by law, without limiting rights that require information in another language.",
      ] },
      { heading: "27. Company information", body: [
        `• Legal name: ${company.legalName}`,
        `• Registration number: ${company.regNumber}`,
        `• Registered address: ${company.address}`,
        `• Website: ${brand.domain}`,
        `• Email: ${email}`,
      ] },
    ],
  },
  returns: {
    title: "Refund, Cancellation and Withdrawal Policy",
    kicker: "Legal",
    intro: "This Policy explains when an Order may be cancelled, when a Consumer may withdraw from a distance contract, and how Prontoware handles refunds and remedies for digital Products. It forms part of the Terms and Conditions.",
    sections: [
      { heading: "1. Scope", body: [
        "This Policy applies to games, software licences, subscription codes, gift cards, wallet top-ups and other digital Products purchased directly from Prontoware through the website. It does not govern purchases made from another seller or claims against an Activation Platform.",
        "Nothing in this Policy excludes or restricts mandatory consumer rights. Where applicable law grants a more favourable remedy, that law prevails.",
      ] },
      { heading: "2. Fourteen-day right of withdrawal", body: [
        "A Consumer entering into a distance contract may generally have 14 days to withdraw without giving a reason. Different rules apply once supply of digital content not provided on a tangible medium begins.",
        "Before immediate delivery, the checkout will ask you to expressly request that supply begin during the withdrawal period and to acknowledge that you lose the right to withdraw once supply begins. This consent and acknowledgement are recorded with the Order and confirmed in the Order communication.",
      ] },
      { heading: "3. Immediate supply and loss of the change-of-mind right", body: [
        "Products are intended for immediate supply after successful payment and any required verification. Supply begins when the Digital Key, code, link or other means of access is made available in the Account or sent to the Order email address so that no further action by Prontoware is required to make it accessible.",
        "After supply has begun with the required consent and acknowledgement, you cannot withdraw solely because you changed your mind. This applies even if you have not redeemed or activated the Digital Key, because the confidential digital value has already been disclosed to you.",
        "Loss of the change-of-mind right does not affect remedies for non-delivery, an invalid or previously used key, material misdescription or other lack of conformity.",
      ] },
      { heading: "4. Cancellation before delivery", body: [
        "You may request cancellation before a Product is delivered. We will cancel and refund the Order if the delivery process can still be stopped and the Digital Key or other access means has not been disclosed or made available.",
        "Because delivery is automated and normally begins shortly after payment, we cannot guarantee that a cancellation request will be received in time.",
      ] },
      { heading: "5. Situations that may qualify for a remedy", body: [
        "Contact us if any of the following occurs:",
        "• the Order was paid but the Product was not delivered within a reasonable time;",
        "• the Digital Key was invalid when first supplied;",
        "• the Digital Key had already been redeemed before it reached you;",
        "• the Product supplied is materially different from the title, edition, platform or region confirmed in the Order;",
        "• the Digital Key cannot be activated despite your compliance with the disclosed platform, region, account and technical requirements;",
        "• the same Order was charged more than once;",
        "• we cancelled the Order or confirmed that a valid replacement cannot be supplied; or",
        "• another remedy is required by applicable consumer law.",
        "Depending on the issue, we may provide troubleshooting, a valid replacement, completion of delivery, a proportionate price reduction, cancellation or a refund. Replacement or correction may be offered first where that remedy is lawful, available and does not cause unreasonable inconvenience.",
      ] },
      { heading: "6. Situations that do not normally qualify for a refund", body: [
        "Subject always to mandatory law, a refund will not normally be available where:",
        "• you changed your mind after immediate supply began with your consent;",
        "• you ordered the wrong Product, edition, platform, region, language or quantity despite correct information being displayed before purchase;",
        "• your device or operating system does not meet the disclosed requirements;",
        "• you cannot use the Product because your Activation Platform account is restricted, suspended, incorrectly configured or located in an unsupported region;",
        "• you dislike the Product, gameplay, features or performance but the Product conforms to its description and mandatory quality requirements;",
        "• you disclosed, sold, transferred, published or otherwise compromised the Digital Key after delivery;",
        "• you used a VPN, false location or other method to circumvent a regional restriction;",
        "• an online feature is later changed or discontinued by a publisher for reasons unrelated to conformity at delivery; or",
        "• you request a refund for a Product obtained through fraud, payment abuse or a breach of the Terms.",
        "This section does not prevent a remedy where the Product Page was inaccurate, required information was omitted, the Product was defective or mandatory law otherwise requires a remedy.",
      ] },
      { heading: "7. Evidence and troubleshooting", body: [
        "To investigate a claim, we may reasonably request:",
        "• the Order number and email address used for the Order;",
        "• the Product and Activation Platform concerned;",
        "• the exact error message and the time of the activation attempt;",
        "• a screenshot showing the error, with unrelated personal information removed;",
        "• confirmation of the Activation Platform account region; and",
        "• permission to verify the Digital Key's status with the relevant licensing or fulfilment provider.",
        "Do not send passwords, complete payment card details, card security codes or unrelated identity documents. We may ask you to complete reasonable troubleshooting steps before deciding the claim.",
      ] },
      { heading: "8. Games and software", body: [
        "A valid game or software key is not refundable merely because it has not yet been redeemed after disclosure. If the key is invalid or materially misdescribed, we will investigate and provide an appropriate remedy.",
        "Technical problems caused by hardware, drivers, operating systems, third-party mods or unsupported configurations are not defects in the Digital Key. Where the underlying Product itself is defective under applicable law, statutory remedies remain available.",
      ] },
      { heading: "9. Subscription codes", body: [
        "After a subscription code is disclosed or redeemed, it is generally not refundable for change of mind. Eligibility requirements, supported account type, region, duration and any restrictions for existing subscribers must be checked before purchase.",
        "Prontoware does not control renewal or billing arrangements entered into separately with an Activation Platform. A fixed-term code purchased from us does not itself authorise Prontoware to charge recurring payments unless the checkout expressly states otherwise.",
      ] },
      { heading: "10. Gift cards and wallet top-ups", body: [
        "Gift cards and wallet top-ups represent digital value subject to the issuer's terms, account, region and currency rules. Once the code or value has been disclosed or credited, it is generally not refundable, exchangeable for cash or transferable through Prontoware, except where required by law or where the code was invalid or materially misdescribed.",
        "We cannot reverse value after it has been redeemed to an Activation Platform account. If you redeemed it to the wrong eligible account, you must contact the issuer, although the issuer may be unable to reverse the transaction.",
      ] },
      { heading: "11. How to request a cancellation, refund or remedy", body: [
        `Send the request to ${email} using the subject line "Refund request" or "Product issue". Include the Order number, Account email, Product, date of purchase, issue and requested outcome.`,
        "Requests should be made promptly after the issue is discovered. Prompt notice helps us verify key status and prevent further use. Delay does not remove rights where applicable law provides a longer claim period.",
      ] },
      { heading: "12. Decision and refund method", body: [
        "We will assess the Order, delivery records, key status, Product information and evidence supplied. We may consult the relevant licensing, catalogue or fulfilment provider. We will communicate the outcome in writing.",
        "An approved monetary refund is issued to the original payment method unless applicable law requires or permits another method agreed with you. We do not provide cash refunds. Bank and card processing times are outside our direct control.",
        "If only part of an Order is affected, the remedy may be limited to that Product. Discounts applied to a multi-item Order may be allocated proportionately when calculating the refundable amount.",
      ] },
      { heading: "13. Unauthorised payments and chargebacks", body: [
        "If you believe a payment was unauthorised, contact your card issuer and notify us promptly. We may restrict the Account and Digital Keys while the claim is investigated to prevent further loss.",
        "A chargeback is not a substitute for a good-faith refund request. We may provide relevant Order, consent, delivery and activation records to payment participants when responding to a chargeback. Fraudulent or duplicative recovery attempts may result in Account suspension and lawful recovery action.",
      ] },
      { heading: "14. Complaints and statutory rights", body: [
        "If you disagree with the outcome, submit a written complaint under the Complaints and Dispute Resolution Procedure. Consumers may also have access to the Estonian Consumer Disputes Committee, an applicable cross-border consumer centre or a competent court.",
      ] },
      { heading: "15. Contact", body: [
        `• Company: ${company.legalName}`,
        `• Registration number: ${company.regNumber}`,
        `• Email: ${email}`,
        `• Address: ${company.address}`,
      ] },
    ],
  },
  delivery: {
    title: "Digital Delivery Policy",
    kicker: "Legal",
    intro: "This Policy explains how digital Products are delivered, how customers should protect and activate Digital Keys, and what to do if delivery is delayed or unsuccessful. No physical goods are shipped.",
    sections: [
      { heading: "1. Digital-only delivery", body: [
        "All Products sold through the website are supplied digitally. We do not send discs, printed cards, boxes or other physical media. References to delivery mean electronic supply of a Digital Key, code, link, credential or other means of access.",
      ] },
      { heading: "2. Delivery methods", body: [
        "Following successful payment and any required Order checks, delivery is made through both of the following methods:",
        "• the Digital Key or access information is displayed in the customer's Account; and",
        "• an Order confirmation containing the Digital Key or access information is sent to the email address used for the Order.",
        "The Account and email records should be retained for future reference. Access to an Order email or Account does not replace the need to redeem and securely store the Product in accordance with the Activation Platform's rules.",
      ] },
      { heading: "3. Delivery timing", body: [
        "Delivery is normally initiated promptly after successful payment. Some Orders may require additional automated or manual review for payment, fraud, sanctions, location, inventory or security reasons.",
        "A delivery estimate is not a guarantee where delay results from verification, a supplier or Activation Platform outage, inaccurate customer information, network failure or an event outside reasonable control. If we cannot deliver within a reasonable time, you may request cancellation and a refund.",
      ] },
      { heading: "4. Order confirmation", body: [
        "The Order confirmation will identify the seller, Order, Product, price and currency and will confirm immediate digital supply. It may also record the customer's express request for immediate performance and acknowledgement concerning the right of withdrawal.",
        "You should review the confirmation promptly and report any discrepancy before redeeming the Digital Key.",
      ] },
      { heading: "5. Customer responsibilities", body: [
        "You are responsible for:",
        "• providing a complete and accessible email address;",
        "• maintaining secure access to the Account and email inbox;",
        "• checking the Product title, edition, platform, region, language and requirements before payment;",
        "• ensuring that the Activation Platform account is eligible and correctly configured;",
        "• checking spam, junk and filtered folders if the email is not visible;",
        "• redeeming and safeguarding the Digital Key without unreasonable delay; and",
        "• contacting us promptly if the Order information or Digital Key appears incorrect.",
      ] },
      { heading: "6. Activation", body: [
        "Activation takes place on the platform specified on the Product Page. You may need to create or sign in to a third-party account, install an application, accept the publisher's or platform's terms and enter the Digital Key exactly as supplied.",
        "A Digital Key intended for one platform, region, currency or account type may not work on another. Prontoware cannot move a redeemed Product between third-party accounts or reverse an activation completed on the wrong eligible account.",
      ] },
      { heading: "7. If the delivery email does not arrive", body: [
        "If the email is not visible after a reasonable period:",
        "• check the Order history and key display in your Account;",
        "• check spam, junk, quarantine and promotional folders;",
        "• confirm that the Account email address is correct;",
        "• allow for temporary mail-provider delays; and",
        `• contact ${email} with the Order number if the Product is not available by either delivery method.`,
        "We may resend the confirmation or correct delivery to a verified email address. For security, we may require confirmation that the requester controls the Account or original Order email.",
      ] },
      { heading: "8. Invalid or previously used Digital Keys", body: [
        "If an Activation Platform reports that a Digital Key is invalid or already used, do not repeatedly publish or share the key. Record the exact error, date, time, platform and account region and contact us promptly.",
        "We may verify the key's issuance and activation status with the relevant licensing or fulfilment provider. If the key was invalid or used before delivery, we will provide an appropriate remedy under the Refund, Cancellation and Withdrawal Policy.",
      ] },
      { heading: "9. Security of Digital Keys", body: [
        "A Digital Key is a confidential bearer credential. Anyone who obtains it may be able to redeem its value. After delivery, you must not publish it, send it to an untrusted person, enter it on an unofficial website or expose it in a public screenshot.",
        "We are not responsible for redemption by another person where the key was compromised through the customer's Account, email, device or voluntary disclosure, unless the compromise resulted from a breach for which we are legally responsible.",
      ] },
      { heading: "10. Inventory and third-party dependencies", body: [
        "Product information and Digital Keys are obtained through third-party catalogue, licensing and fulfilment services. Delivery may also depend on payment networks, email systems and Activation Platforms.",
        "If a valid key becomes unavailable after payment, we may delay briefly while attempting to complete delivery. If completion is not possible within a reasonable time, we will cancel the affected Product and refund the amount paid.",
      ] },
      { heading: "11. No physical delivery or pre-orders", body: [
        "No physical shipping address is required for delivery, although billing or location information may be processed for payment, fraud, legal and regional eligibility purposes. Shipping fees do not apply.",
        "Prontoware does not offer pre-orders. A listing should not be interpreted as a commitment to deliver at a future release date.",
      ] },
      { heading: "12. Delivery records", body: [
        "We keep proportionate records of Order acceptance, consent, email dispatch, Account availability, key allocation and related technical events. These records may be used to provide support, verify delivery, prevent fraud, resolve disputes and comply with legal obligations.",
      ] },
      { heading: "13. Contact", body: [
        `For delivery assistance, contact ${email} and include the Order number, Account email, Product and a concise description of the issue. Never send a password, complete payment card number or card security code.`,
      ] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    kicker: "Legal",
    intro: `This Privacy Policy explains how ${company.legalName} collects, uses, shares and protects personal data when you visit ${brand.domain}, create an Account, place an Order or contact us. It also explains your data-protection rights.`,
    sections: [
      { heading: "1. Controller", body: [
        `The controller of personal data described in this Policy is ${company.legalName}, registration number ${company.regNumber}, registered at ${company.address}.`,
        `Privacy enquiries and rights requests may be sent to ${email}. This address is monitored for data-protection matters.`,
      ] },
      { heading: "2. Scope", body: [
        "This Policy applies to personal data processed through the website, Accounts, Orders, support communications and related fraud-prevention and operational activities. It does not govern independent processing by an Activation Platform, publisher, card issuer or other third party acting as its own controller.",
      ] },
      { heading: "3. Personal data we collect", body: [
        "Depending on how you use the website, we may collect:",
        "• identity and contact data, such as name, email address, billing country and Account identifiers;",
        "• Account data, such as login records, password hash, settings and Account status;",
        "• Order data, such as Products, Digital Keys allocated to the Order, price, currency, discounts, delivery status and Order history;",
        "• limited payment data, such as payment status, card type, masked card details, issuer country, transaction reference and risk signals;",
        "• technical data, such as IP address, device, browser, operating system, timestamps, security logs and website events;",
        "• location and eligibility indicators inferred from IP address, billing information or payment data where needed for regional restrictions, sanctions and fraud prevention;",
        "• support and complaint data, including messages, evidence, screenshots and the outcome of a request;",
        "• consent records, including acceptance of Terms and the request for immediate supply of digital content; and",
        "• cookie and similar-technology data described in the Cookie Policy.",
        "We do not need full payment card credentials to provide ordinary customer support. Complete card numbers and card security codes are processed through payment service providers and should never be sent to us by email.",
      ] },
      { heading: "4. How we obtain personal data", body: [
        "We obtain data directly from you when you create an Account, place an Order or contact us; automatically from your device and use of the website; and from payment, fraud-prevention, licensing, catalogue, fulfilment, email and technical service providers involved in the transaction.",
        "We may also receive activation or key-status information from a licensing or fulfilment provider when necessary to investigate a delivery, refund, fraud or conformity claim.",
      ] },
      { heading: "5. Purposes and legal bases", body: [
        "5.1 Performance of a contract. We process data to create and administer Accounts, process payments, accept or reject Orders, allocate and deliver Digital Keys, provide support, handle cancellations and refunds, and enforce the Terms. Without necessary data, we may be unable to provide the requested Product or service.",
        "5.2 Legal obligations. We process and retain data where required for accounting, tax, consumer protection, sanctions, fraud reporting, regulatory requests, dispute handling and other legal obligations.",
        "5.3 Legitimate interests. We process data where necessary for legitimate interests that are not overridden by your rights, including securing the website, preventing fraud and resale, verifying delivery, improving operational reliability, establishing or defending legal claims, and maintaining business records.",
        "5.4 Consent. Where processing legally requires consent, we ask for it separately. At the Effective Date, we do not use personal data for advertising, behavioural analytics or newsletter marketing. Contractual consent to immediate digital supply is recorded for consumer-law purposes and is distinct from data-protection consent.",
      ] },
      { heading: "6. Accounts and Orders", body: [
        "Account data is used to authenticate you, display Order history and Digital Keys, maintain security and respond to requests. Order data is used to form and perform the contract, confirm delivery, provide remedies and comply with recordkeeping obligations.",
        "We may link multiple Orders, devices, payment references or Accounts where reasonably necessary to identify fraud, account takeover, purchase-limit evasion or unauthorised resale.",
      ] },
      { heading: "7. Payments", body: [
        "Payments are processed by payment service providers and financial institutions. They may act as processors for some activities and as independent controllers for regulatory, fraud-prevention and payment-network obligations.",
        "We receive only the payment and risk information needed to determine whether an Order succeeded, reconcile transactions, process refunds and respond to disputes. We do not publish provider names in this Policy; the categories and purposes of recipients are described below.",
      ] },
      { heading: "8. Fraud, security and eligibility checks", body: [
        "We may evaluate transaction, Account, device, IP, country, payment and behavioural signals to detect unauthorised use, false location, sanctions risk, resale, automated purchasing and chargeback abuse. Checks may be automated, manual or a combination of both.",
        "A check may result in a delay, request for proportionate verification, purchase limit, rejection or cancellation. We do not make decisions producing legal or similarly significant effects based solely on automated processing where applicable law prohibits doing so without safeguards.",
      ] },
      { heading: "9. Customer support and complaints", body: [
        "We use correspondence and supporting evidence to authenticate requests, diagnose technical problems, investigate Digital Keys, decide refunds, respond to complaints and establish or defend claims. Please remove unrelated personal data from screenshots and do not send sensitive information that we have not requested.",
      ] },
      { heading: "10. Cookies and similar technologies", body: [
        "We use strictly necessary cookies and similar technologies for security, authentication, cart, checkout, session management and preference functions. At the Effective Date, we do not use advertising, behavioural analytics or newsletter-tracking cookies. Further information is provided in the Cookie Policy.",
      ] },
      { heading: "11. Recipients of personal data", body: [
        "We may disclose personal data, on a need-to-know basis, to the following categories of recipients:",
        "• payment service providers, acquiring banks, card networks and financial institutions;",
        "• catalogue, licensing, Digital Key inventory and fulfilment providers;",
        "• hosting, cloud infrastructure, cybersecurity and website maintenance providers;",
        "• email delivery and customer-support service providers;",
        "• professional advisers, auditors, insurers and debt-recovery providers where necessary;",
        "• competent public authorities, courts, regulators and law-enforcement bodies where disclosure is required or legally justified; and",
        "• a purchaser, successor or adviser involved in a genuine corporate transaction, subject to appropriate confidentiality and legal safeguards.",
        "We do not sell personal data. We require service providers acting on our behalf to process data only under appropriate instructions and security obligations.",
      ] },
      { heading: "12. International transfers", body: [
        "Some service providers or their infrastructure may be located outside the European Economic Area. Where personal data is transferred internationally, we use a lawful transfer mechanism, such as an adequacy decision, standard contractual clauses or another safeguard recognised by data-protection law.",
        `You may request information about the applicable transfer safeguard by contacting ${email}, subject to lawful confidentiality limitations.`,
      ] },
      { heading: "13. Retention", body: [
        "We retain personal data only for as long as necessary for the relevant purpose, including contract performance, security, fraud prevention, customer support, accounting and legal claims.",
        "• Account data is generally retained while the Account remains active and for a limited period afterwards where needed for security, disputes or legal obligations.",
        "• Order, payment-status, delivery and accounting records are retained for the period required by applicable law, which may extend for several years after the transaction.",
        "• Support and complaint records are retained for the time reasonably needed to resolve the issue and manage limitation, regulatory and evidentiary periods.",
        "• Security and technical logs are retained for a shorter period unless an event requires preservation for investigation or a legal claim.",
        "• Consent and contract-acceptance records are retained for as long as needed to demonstrate the transaction and comply with legal obligations.",
        "When data is no longer required, it is deleted, anonymised or securely isolated until deletion is technically completed.",
      ] },
      { heading: "14. Security", body: [
        "We use appropriate technical and organisational measures designed to protect personal data against accidental or unlawful destruction, loss, alteration, disclosure or access. Measures may include access control, encryption in transit, credential protection, logging, backups, provider due diligence and incident response.",
        "No online system is completely secure. You must use a strong, unique password, protect your email Account and notify us promptly of suspected unauthorised access.",
      ] },
      { heading: "15. Your rights", body: [
        "Subject to the conditions and exceptions in applicable law, you may have the right to:",
        "• obtain information about processing and access your personal data;",
        "• correct inaccurate or incomplete data;",
        "• request deletion of data;",
        "• restrict processing;",
        "• object to processing based on legitimate interests;",
        "• receive certain data in a structured, commonly used and machine-readable format;",
        "• withdraw consent at any time where processing is based on consent;",
        "• obtain safeguards relating to certain solely automated decisions; and",
        "• lodge a complaint with a competent supervisory authority.",
        `Send a rights request to ${email}. We may request proportionate information to verify identity and protect the Account. We normally respond within one month, subject to lawful extensions for complex or multiple requests.`,
        "Deletion is not absolute. We may retain data required for accounting, fraud prevention, legal claims, compliance and the protection of other persons' rights.",
      ] },
      { heading: "16. Children", body: [
        "The website and Products are offered only to persons aged 18 or over. We do not knowingly offer Accounts or Products to children. If you believe that a person under 18 has provided personal data, contact us so that we can investigate and take appropriate action.",
      ] },
      { heading: "17. Supervisory authority", body: [
        "You may lodge a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon) or another competent supervisory authority, particularly in the country of your habitual residence, place of work or alleged infringement.",
        "• Estonian Data Protection Inspectorate",
        "• Address: Tatari 39, 10134 Tallinn, Estonia",
        "• Website: aki.ee",
        "We encourage you to contact us first so that we can try to resolve the concern directly.",
      ] },
      { heading: "18. Changes to this Policy", body: [
        "We may update this Policy to reflect changes in law, services, providers or processing. The revised version will state its effective date. Where required, we will provide additional notice or request consent before a materially different use of personal data.",
      ] },
      { heading: "19. Contact", body: [
        `• Controller: ${company.legalName}`,
        `• Registration number: ${company.regNumber}`,
        `• Address: ${company.address}`,
        `• Email: ${email}`,
      ] },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    kicker: "Legal",
    intro: `This Cookie Policy explains how Prontoware uses cookies and similar technologies on ${brand.domain}. It should be read with the Privacy Policy.`,
    sections: [
      { heading: "1. What cookies are", body: [
        "Cookies are small text files stored on a browser or device when a website is visited. Similar technologies include local storage, session storage and other device-based identifiers used to remember information or support a website function.",
      ] },
      { heading: "2. Our current use of cookies", body: [
        "At the Effective Date, we use cookies and similar technologies only where necessary to operate, secure and deliver the website and requested e-commerce functions. We do not use advertising, behavioural analytics or newsletter-tracking cookies.",
        "Strictly necessary technologies may be set without consent where the law permits because the website, Account, cart, checkout or security function requested by the user cannot operate properly without them.",
      ] },
      { heading: "3. Strictly necessary purposes", body: [
        "Necessary cookies and similar technologies may be used to:",
        "• maintain a secure browsing or checkout session;",
        "• remember cart contents and Order progress;",
        "• authenticate a signed-in customer and protect an Account;",
        "• balance traffic and maintain website reliability;",
        "• detect fraud, abuse, automated access and security threats;",
        "• remember essential settings, including currency or cookie preferences;",
        "• prevent duplicate form submissions and maintain transaction integrity; and",
        "• enable payment and digital delivery functions requested by the customer.",
      ] },
      { heading: "4. Session and persistent technologies", body: [
        "Session cookies generally expire when the browsing session ends. Persistent cookies remain until their configured expiry or until they are deleted. The duration depends on the necessary function, security configuration and service provider.",
        "We review retention settings so that necessary cookies remain only as long as reasonably required for their function. Current cookie identifiers and browser-visible expiry information can be inspected through browser privacy or storage settings and, where available, the website's Cookie Settings interface.",
      ] },
      { heading: "5. Third-party necessary technologies", body: [
        "Some necessary technologies may be set or read by providers supporting payment, security, hosting, Account authentication, checkout or digital delivery. These providers process information only for relevant operational, security and legal purposes, subject to their role and applicable law.",
        "A provider may act as an independent controller for payment-network, fraud-prevention or regulatory activities. Further information about recipient categories and international transfers is provided in the Privacy Policy.",
      ] },
      { heading: "6. No advertising or analytics cookies", body: [
        "We do not currently use cookies to build advertising profiles, show targeted advertising, measure advertising campaigns, track newsletter engagement or perform behavioural analytics.",
        "If we introduce a non-essential category in the future, we will update this Policy and, where required, request consent before the relevant technology is activated. Refusing non-essential cookies will not prevent access to core shopping functions, although an optional feature may be unavailable.",
      ] },
      { heading: "7. Managing cookies", body: [
        "You can use browser settings to view, block or delete cookies and site data. Blocking strictly necessary cookies may prevent login, cart, checkout, payment or security functions from working correctly.",
        "Where a Cookie Settings interface is displayed, it can be used to review or change consent choices for any non-essential technologies. Browser controls may need to be applied separately on each device and browser.",
      ] },
      { heading: "8. Changes to this Policy", body: [
        `We may update this Policy when our website, technology or legal requirements change; the effective date identifies the current version. If non-essential cookies are introduced, we will use consent controls where required. Questions may be sent to ${email}.`,
      ] },
    ],
  },
  complaints: {
    title: "Complaints and Dispute Resolution Procedure",
    kicker: "Legal",
    intro: "This Procedure explains how a Consumer can submit a complaint about the website, an Account, an Order, digital delivery, a Product or a refund decision and how Prontoware will respond.",
    sections: [
      { heading: "1. Contact us first", body: [
        `We aim to resolve issues directly. Send a written complaint to ${email}. A complaint may be submitted in English and should be sent from the email address associated with the Order or Account where possible.`,
      ] },
      { heading: "2. Information to include", body: [
        "To help us investigate efficiently, include:",
        "• your name and contact email;",
        "• the Order number and purchase date, if applicable;",
        "• the Product and Activation Platform concerned;",
        "• a clear description of what happened and when;",
        "• the outcome you are requesting;",
        "• relevant error messages or screenshots with unrelated personal data removed; and",
        "• copies of earlier correspondence relevant to the complaint.",
        "Do not send Account passwords, complete payment card numbers, card security codes or unrelated identity documents.",
      ] },
      { heading: "3. Acknowledgement and response period", body: [
        "We will register the complaint and may acknowledge receipt or request missing information. We will provide a written response within 15 days after receiving a sufficiently clear complaint, as required by Estonian consumer rules, or explain why additional time or information is reasonably needed where the law permits.",
      ] },
      { heading: "4. Investigation", body: [
        "We may review Order, consent, payment-status, delivery, Account, support and key-status records. Where necessary, we may consult payment, licensing, catalogue, fulfilment or technical providers while limiting shared data to what is relevant.",
        "You should cooperate with reasonable troubleshooting and verification. We will not reject a legitimate complaint merely because a specific document is unavailable if the transaction and issue can be established by other reasonable evidence.",
      ] },
      { heading: "5. Possible outcomes", body: [
        "Depending on the facts and applicable law, we may:",
        "• explain the Order or policy position;",
        "• complete or resend digital delivery;",
        "• provide activation or technical guidance;",
        "• replace an invalid or non-conforming Digital Key;",
        "• correct Account or Order information;",
        "• apply a proportionate price reduction;",
        "• cancel the affected Product and issue a refund;",
        "• maintain the original decision with reasons; or",
        "• take another remedy required by law.",
      ] },
      { heading: "6. Internal review", body: [
        "If you disagree with the first response, reply and identify the part you dispute, the evidence you believe was overlooked and the outcome sought. Where appropriate, the matter will be reviewed by a person who was not responsible for the initial decision.",
      ] },
      { heading: "7. Estonian Consumer Disputes Committee", body: [
        "If a Consumer and Prontoware cannot resolve a contractual dispute, the Consumer may be entitled to apply to the Estonian Consumer Disputes Committee (Tarbijavaidluste komisjon), an independent and impartial out-of-court dispute resolution body.",
        "• Consumer Disputes Committee / Consumer Protection and Technical Regulatory Authority",
        "• Address: Endla 10A, 10122 Tallinn, Estonia",
        "• Website: ttja.ee",
        "The Consumer should first have submitted the complaint to Prontoware and allowed an opportunity to respond. The Committee's competence and procedural requirements are determined by applicable law and its own rules.",
      ] },
      { heading: "8. Cross-border consumer assistance", body: [
        "A Consumer residing in another European Union or European Economic Area country may seek information or assistance from the European Consumer Centre in the country of residence where the dispute is cross-border and within the network's competence.",
        "The former European Commission Online Dispute Resolution platform has been discontinued and is therefore not identified as a complaint channel in this Procedure.",
      ] },
      { heading: "9. Courts and mandatory rights", body: [
        "Using this Procedure or an out-of-court body does not remove the right to bring a claim before a competent court. Estonian law applies as stated in the Terms and Conditions, without depriving a Consumer of mandatory protections applicable in the country of habitual residence.",
      ] },
      { heading: "10. Complaint records and privacy", body: [
        "We retain complaint records for the period reasonably necessary to resolve the matter, comply with legal obligations, identify recurring issues and establish or defend claims. Personal data is processed under the Privacy Policy.",
      ] },
      { heading: "11. Contact information", body: [
        `• Company: ${company.legalName}`,
        `• Registration number: ${company.regNumber}`,
        `• Email: ${email}`,
        `• Registered address: ${company.address}`,
      ] },
    ],
  },
  "product-terms": {
    title: "Product-Specific Terms",
    kicker: "Legal",
    intro: "These Product-Specific Terms supplement the general Terms and Conditions and apply according to the category of digital Product purchased. The Product Page and Order confirmation identify the Product, edition, Activation Platform, region and other material conditions.",
    sections: [
      { heading: "1. General rules for all Products", body: [
        "Every Product is digital and is supplied as a licence, code, digital value or means of access. No ownership of the underlying game, software, service, brand or intellectual property is transferred.",
        "Before purchase, you must check the exact Product, platform, account requirements, region, currency, language, compatibility and any disclosed expiry or redemption restrictions. Use is also subject to the relevant publisher's, developer's, issuer's or Activation Platform's terms.",
      ] },
      { heading: "2. Games", body: [
        "A game Product normally consists of a Digital Key used to add a specified title or edition to an eligible Activation Platform account. Unless the Product Page states otherwise:",
        "• the key is valid for one activation or one eligible account;",
        "• the game is for personal, non-commercial use;",
        "• online play and features may require internet access and a third-party account;",
        "• download size, system requirements and supported devices are determined by the publisher or platform;",
        "• downloadable content may require ownership of a compatible base game on the same platform and region; and",
        "• age ratings and content notices should be reviewed before activation.",
        "Publisher updates, servers, anti-cheat systems and online features are managed by third parties. This does not affect statutory remedies if the Product supplied by Prontoware was non-conforming at the relevant time.",
      ] },
      { heading: "3. Software", body: [
        "Software Products provide a licence or subscription entitlement for the edition and term shown on the Product Page. Activation may be limited by device count, operating system, account, region or use type.",
        "Unless expressly identified as a commercial or business licence, software is supplied for the Consumer's personal use. Updates, cloud features, support and compatibility are governed by the software publisher's terms and lifecycle policies.",
        "You must not reverse engineer, bypass technical protection, share licence credentials or use the software beyond the rights granted, except where applicable law expressly permits an act despite contractual restrictions.",
      ] },
      { heading: "4. Subscription codes", body: [
        "A subscription code adds the stated subscription period or entitlement to an eligible third-party account. Before purchase, check:",
        "• whether the code is for new subscribers, existing subscribers or both;",
        "• whether a payment method must be linked to the Activation Platform account;",
        "• whether the code stacks with an existing subscription;",
        "• the supported region and Account country;",
        "• the subscription tier and included services; and",
        "• any redemption deadline shown on the Product Page.",
        "A fixed-term code does not itself create recurring billing by Prontoware. The Activation Platform may offer or apply renewal under a separate arrangement between you and that platform. You are responsible for reviewing and managing any third-party renewal setting.",
      ] },
      { heading: "5. Gift cards", body: [
        "A gift card code provides digital value for use with the issuer or Activation Platform identified on the Product Page. It is not a bank account, payment account or general-purpose payment instrument provided by Prontoware.",
        "• The card may be limited to a country, region, currency, platform or account type.",
        "• The issuer may require a minimum age, account verification or acceptance of issuer terms.",
        "• A code normally cannot be redeemed in parts unless the issuer permits it.",
        "• After redemption, the balance is held and administered by the issuer, not Prontoware.",
        "• Gift card value is not exchangeable for cash through Prontoware except where required by law.",
      ] },
      { heading: "6. Wallet top-ups", body: [
        "A wallet top-up credits the stated amount or value to an eligible platform wallet after redemption. You must match the platform, account region and wallet currency. Currency conversion or cross-region redemption may be unavailable even where the displayed monetary values appear similar.",
        "Once value has been credited to an account, Prontoware cannot transfer it to another account, reverse an incorrect eligible redemption or control how the platform applies the balance. Any use, expiry, inactivity or refund rules for the credited balance are determined by the issuer and applicable law.",
      ] },
      { heading: "7. Regions, countries and Activation Platforms", body: [
        "A Product described as global may still be unavailable in locations restricted by law, sanctions, the website's permitted-territory rules or Activation Platform policy. A Product described for a specific region must be activated and used only as permitted by the Product Page and platform rules.",
        "You must not use a VPN, false address, mismatched payment information or other method to circumvent a Product restriction. A Product correctly supplied for the region stated in the Order is not defective because it cannot be activated in another region.",
      ] },
      { heading: "8. Languages and compatibility", body: [
        "Supported languages, devices and operating systems are those stated on the Product Page or by the applicable publisher or platform. A language may apply to interface, audio or subtitles and may not cover all three.",
        "Compatibility depends on the customer's device and environment. Meeting minimum requirements does not guarantee a particular frame rate, performance level or compatibility with third-party modifications, peripherals or unsupported operating systems.",
      ] },
      { heading: "9. Expiry and redemption windows", body: [
        "A Digital Key should be redeemed promptly. Where the Product Page or issuer states an expiry or redemption deadline, that condition forms part of the Product description. Prontoware does not impose an undisclosed expiry on an otherwise valid key.",
        "If a publisher or issuer later announces a deadline outside our control, we will take reasonable steps to communicate material information available to us, but customers remain responsible for monitoring the relevant Activation Platform after activation.",
      ] },
      { heading: "10. Delivery and disclosure", body: [
        "Product codes are displayed in the Account and sent by email after successful payment and any required verification. Once disclosed, the confidential value can be used and the change-of-mind withdrawal right may be lost as explained at checkout and in the Refund, Cancellation and Withdrawal Policy.",
      ] },
      { heading: "11. Redemption problems", body: [
        "If a code is rejected, first confirm the exact platform, region, account country, characters and eligibility requirements. If the problem continues, contact us before purchasing a replacement or sharing the code.",
        "We may verify issuance and redemption status with the relevant licensing or fulfilment provider. A valid replacement or another legal remedy will be provided where the Product supplied was non-conforming.",
      ] },
      { heading: "12. Refunds", body: [
        "Product-specific restrictions do not override mandatory consumer rights. Change-of-mind refunds are generally unavailable after immediate disclosure with the required consent and acknowledgement. Invalid, previously used, materially misdescribed or undelivered Products are handled under the Refund, Cancellation and Withdrawal Policy.",
      ] },
      { heading: "13. Gifting and transfers", body: [
        "A Product may be given to another adult only where the Product Page and issuer terms permit gifting and the recipient is eligible for the platform, region and Product. You remain responsible for checking eligibility before disclosing the Digital Key.",
        "Products may not be purchased for resale, brokerage, commercial distribution or organised exchange. Prontoware does not support secondary-market transfers and cannot guarantee a key after it has been disclosed outside the original Order relationship.",
      ] },
      { heading: "14. Third-party terms", body: [
        "Activation Platforms, publishers and issuers may apply separate licence, acceptable-use, privacy, security, refund and account rules. You should review those terms before activation. If a third-party term conflicts with a mandatory consumer right owed by Prontoware as seller, the mandatory right prevails in the relationship between you and Prontoware.",
      ] },
      { heading: "15. Order of precedence", body: [
        "For a particular Product, the following order applies to the extent the documents are consistent with mandatory law:",
        "• mandatory applicable law;",
        "• the Order confirmation and specific Product Page information;",
        "• these Product-Specific Terms;",
        "• the Refund, Cancellation and Withdrawal Policy and Digital Delivery Policy; and",
        "• the general Terms and Conditions.",
      ] },
      { heading: "16. Contact", body: [
        `Questions about a Product's platform, region, account eligibility or redemption should be sent to ${email} before purchase where the Product Page does not provide sufficient information.`,
      ] },
    ],
  },
  imprint: {
    title: "Imprint",
    kicker: "Legal",
    intro: "Company information for the operator of this website.",
    sections: [
      { heading: "Operator", body: [
        `• Legal name: ${company.legalName}`,
        `• Registration number: ${company.regNumber}`,
        `• Registered address: ${company.address}`,
        `• Website: ${brand.domain}`,
        `• Email: ${email}`,
      ] },
      { heading: "Merchant of Record", body: [
        `${company.merchantOfRecord} sells Products in its own name and is the seller and Merchant of Record for all Orders placed on ${brand.name}. ${company.legalName} is not registered for VAT and does not display a VAT registration number.`,
      ] },
      { heading: "Governing law", body: [
        "The website and consumer contracts are governed by the laws of Estonia, without depriving a Consumer of mandatory protections applicable in the country of habitual residence. See the Terms and Conditions and Complaints and Dispute Resolution Procedure for details.",
      ] },
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
