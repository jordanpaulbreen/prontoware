import Image from "next/image";
import visa from "@/app/assets/visa.svg";
import mastercard from "@/app/assets/mastercard.svg";
import pciDss from "@/app/assets/pci-dss.svg";

const marks = [
  { src: visa, label: "Visa" },
  { src: mastercard, label: "Mastercard" },
  { src: pciDss, label: "PCI DSS compliant" },
] as const;

/** Colored Visa / Mastercard / PCI-DSS marks. Used in footer and checkout. */
export function PaymentMarks({
  size = 34,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {marks.map((mark) => (
        <li
          key={mark.label}
          className="inline-flex items-center rounded-[6px] bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
        >
          <Image
            src={mark.src}
            alt={mark.label}
            height={size}
            width={Math.round(size * 1.808)}
            style={{ height: size, width: "auto" }}
          />
        </li>
      ))}
    </ul>
  );
}
