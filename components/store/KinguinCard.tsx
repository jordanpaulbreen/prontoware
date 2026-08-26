import Image from "next/image";
import type { KinguinProduct } from "@/lib/kinguin";
import { Price } from "@/components/ui/Price";
import { Icon } from "@/components/ui/Icon";

export function KinguinCard({ product }: { product: KinguinProduct }) {
  const inStock = product.qty > 0;
  return (
    <a
      href={`/game/${product.kinguinId}`}
      className="group/card flex flex-col overflow-hidden rounded-card border border-hairline bg-surface transition-[border-color,transform] duration-[var(--ma-dur-base)] hover:-translate-y-0.5 hover:border-hairline-strong"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        {product.coverImage ? (
          <Image
            src={product.coverImage}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 300px"
            className="object-cover transition-transform duration-[var(--ma-dur-slow)] group-hover/card:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-faint">
            <Icon name="controller" size={32} />
          </div>
        )}
        <span className="absolute left-2 top-2 rounded-chip bg-bg/80 px-2 py-0.5 text-[0.625rem] font-medium text-ink backdrop-blur">
          {product.platform}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="line-clamp-2 text-sm font-medium text-ink group-hover/card:text-cyan">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[0.6875rem] text-ink-faint">
          {product.regionalLimitations && <span>{product.regionalLimitations}</span>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Price amount={product.price} size="md" />
          <span
            className={`inline-flex items-center gap-1 text-[0.6875rem] ${
              inStock ? "text-deal" : "text-ink-faint"
            }`}
          >
            <Icon name={inStock ? "bolt" : "clock"} size={12} />
            {inStock ? "In stock" : "Restocking"}
          </span>
        </div>
      </div>
    </a>
  );
}
