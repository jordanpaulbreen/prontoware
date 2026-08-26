import type { Metadata } from "next";
import { Band, Shell } from "@/components/ui/Section";
import { CartView } from "@/components/store/CartView";

export const metadata: Metadata = { title: "Your cart" };

export default function CartPage() {
  return (
    <Band>
      <Shell className="max-w-4xl">
        <h1 className="mb-6 text-2xl">Your cart</h1>
        <CartView />
      </Shell>
    </Band>
  );
}
