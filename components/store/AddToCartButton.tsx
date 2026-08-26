"use client";

import { useCart } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function AddToCartButton({ slug, preorder }: { slug: string; preorder?: boolean }) {
  const { add } = useCart();
  return (
    <div className="flex gap-2">
      <Button onClick={() => add(slug)} sparkle className="flex-1">
        <Icon name="cart" size={16} />
        {preorder ? "Pre-order" : "Add to cart"}
      </Button>
      <Button href="/checkout" variant="surface" className="flex-1">
        Checkout
      </Button>
    </div>
  );
}
