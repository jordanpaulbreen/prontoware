import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { tryGetProduct } from "@/lib/kinguin";
import { bySlug, genres, platforms } from "@/lib/data";
import { Band, Shell } from "@/components/ui/Section";
import { Cover } from "@/components/ui/Cover";
import { Price } from "@/components/ui/Price";
import { Icon } from "@/components/ui/Icon";
import { PlatformChip, RegionChip, Rating } from "@/components/ui/Chips";
import { BuyPanel } from "@/components/store/BuyPanel";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { policy } from "@/lib/brand";

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const local = bySlug(id);
  if (local) return { title: local.title };
  const p = /^\d+$/.test(id) ? await tryGetProduct(id) : null;
  return { title: p?.name ?? "Game" };
}

function Assurances() {
  const items = [
    { icon: "bolt" as const, label: `Delivered ${policy.deliveryTime}` },
    { icon: "badge" as const, label: "Official authorised key" },
    { icon: "shield" as const, label: `${policy.refundDays}-day refund on unrevealed keys` },
    { icon: "chat" as const, label: policy.support },
  ];
  return (
    <ul className="mt-5 grid grid-cols-2 gap-3">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2 text-xs text-ink-muted">
          <Icon name={i.icon} size={15} className="text-cyan" />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

export default async function GamePage({ params }: { params: Promise<Params> }) {
  const { id } = await params;

  // Local demo catalogue uses slugs; Kinguin products use numeric ids.
  const local = bySlug(id);
  if (local) {
    return (
      <Band>
        <Shell>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <Cover game={local} ratio="wide" className="rounded-card" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <PlatformChip platform={local.platform} />
                <RegionChip region={local.region} />
              </div>
              <h1 className="mt-3 text-3xl">{local.title}</h1>
              <p className="mt-1 text-sm text-ink-muted">{local.studio}</p>
              <div className="mt-3">
                <Rating value={local.rating} reviews={local.reviews} />
              </div>
              <div className="mt-5 flex items-center gap-2">
                {local.genres.map((g) => (
                  <span key={g} className="rounded-chip bg-surface-2 px-2.5 py-1 text-xs text-ink-muted">
                    {genres[g].name}
                  </span>
                ))}
              </div>
              <div className="mt-6 rounded-card border border-hairline bg-surface p-5">
                <Price amount={local.price} oldAmount={local.oldPrice} size="xl" gradientOnHover={false} />
                <div className="mt-4">
                  <AddToCartButton slug={local.slug} preorder={local.preorder} />
                </div>
                <Assurances />
              </div>
            </div>
          </div>
        </Shell>
      </Band>
    );
  }

  if (!/^\d+$/.test(id)) notFound();
  const product = await tryGetProduct(id);
  if (!product) notFound();

  const platformName = product.platform;
  const inStock = product.qty > 0;

  return (
    <Band>
      <Shell>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-card border border-hairline bg-surface-2">
              {product.coverImage ? (
                <Image
                  src={product.coverImage}
                  alt={product.name}
                  fill
                  sizes="(max-width:1024px) 100vw, 640px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-ink-faint">
                  <Icon name="controller" size={48} />
                </div>
              )}
            </div>
            {product.screenshots.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {product.screenshots.slice(0, 8).map((src, i) => (
                  <div key={i} className="relative aspect-[16/9] overflow-hidden rounded-tile bg-surface-2">
                    <Image src={src} alt="" fill sizes="160px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            {product.description && (
              <div
                className="prose-invert mt-6 max-w-none text-sm leading-relaxed text-ink-muted [&_h2]:mt-4 [&_h2]:text-base [&_h2]:text-ink"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
            {product.activationDetails && (
              <div className="mt-6 rounded-card border border-hairline bg-surface p-4">
                <h2 className="mb-1 text-sm font-semibold text-ink">How to activate</h2>
                <p className="text-sm text-ink-muted">{product.activationDetails}</p>
              </div>
            )}
          </div>

          <div>
            <span className="inline-flex rounded-chip bg-surface-2 px-2.5 py-1 text-xs text-ink-muted">
              {platformName}
            </span>
            <h1 className="mt-3 text-3xl">{product.name}</h1>
            {product.regionalLimitations && (
              <p className="mt-1 text-sm text-ink-faint">Region: {product.regionalLimitations}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
              {product.genres.slice(0, 4).map((g) => (
                <span key={g} className="rounded-chip bg-surface-2 px-2.5 py-1">
                  {g}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <BuyPanel
                kinguinId={product.productId}
                title={product.name}
                platform={platformName}
                price={product.price}
                inStock={inStock}
              />
            </div>
            <Assurances />
          </div>
        </div>
      </Shell>
    </Band>
  );
}
