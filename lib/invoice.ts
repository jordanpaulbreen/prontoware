import "server-only";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { company, brand } from "./brand";

export type InvoiceData = {
  orderId: string;
  date: Date;
  billingName: string;
  billingAddress: string;
  currency: string;
  items: { title: string; qty: number; unit: number }[];
  total: number;
};

/** Generates a simple, self-contained PDF invoice as a Buffer. */
export async function buildInvoicePdf(data: InvoiceData): Promise<Buffer> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]); // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.09, 0.07, 0.15);
  const muted = rgb(0.4, 0.4, 0.5);
  let y = 800;

  const text = (s: string, x: number, size = 10, f = font, color = ink) =>
    page.drawText(s, { x, y, size, font: f, color });

  text(brand.name, 40, 20, bold);
  y -= 18;
  text("Official game keys", 40, 10, font, muted);
  text("INVOICE", 460, 20, bold);
  y -= 30;

  text(`${company.legalName} · Reg. No. ${company.regNumber}`, 40, 9, font, muted);
  y -= 12;
  text(company.address, 40, 9, font, muted);
  y -= 12;
  text(`Merchant of Record: ${company.merchantOfRecord}`, 40, 9, font, muted);
  y -= 26;

  text(`Invoice: ${data.orderId}`, 40, 10, bold);
  text(`Date: ${data.date.toISOString().slice(0, 10)}`, 320, 10);
  y -= 18;
  text("Billed to:", 40, 10, bold);
  y -= 13;
  text(data.billingName, 40, 10);
  y -= 12;
  data.billingAddress.split("\n").forEach((line) => {
    text(line, 40, 10, font, muted);
    y -= 12;
  });
  y -= 14;

  // table header
  page.drawRectangle({ x: 40, y: y - 4, width: 515, height: 20, color: rgb(0.95, 0.95, 0.98) });
  text("Item", 46, 10, bold);
  text("Qty", 380, 10, bold);
  text("Price", 470, 10, bold);
  y -= 24;

  const sym = data.currency;
  for (const it of data.items) {
    text(it.title.slice(0, 48), 46, 10);
    text(String(it.qty), 384, 10);
    text(`${(it.unit * it.qty).toFixed(2)} ${sym}`, 470, 10);
    y -= 18;
  }

  y -= 8;
  page.drawLine({ start: { x: 40, y }, end: { x: 555, y }, thickness: 0.6, color: muted });
  y -= 20;
  text("Total (incl. VAT where applicable)", 300, 11, bold);
  text(`${data.total.toFixed(2)} ${sym}`, 470, 11, bold);
  y -= 40;
  text(`Thank you for shopping with ${brand.name}. Support: ${brand.contactEmail}`, 40, 9, font, muted);

  const bytes = await pdf.save();
  return Buffer.from(bytes);
}
