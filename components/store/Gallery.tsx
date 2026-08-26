"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Product gallery: a main cover plus screenshot thumbnails, any of which opens
    a full-screen lightbox. Escape or a click on the backdrop closes it. */
export function Gallery({
  cover,
  screenshots,
  title,
}: {
  cover?: string;
  screenshots: string[];
  title: string;
}) {
  const shots = screenshots.slice(0, 8);
  const all = [cover, ...shots].filter(Boolean) as string[];
  const [zoom, setZoom] = useState<string | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <>
      {cover ? (
        <button
          type="button"
          onClick={() => setZoom(cover)}
          aria-label="Zoom cover image"
          className="group relative block aspect-[16/9] w-full overflow-hidden rounded-card border border-hairline bg-surface-2"
        >
          <Image
            src={cover}
            alt={title}
            fill
            sizes="(max-width:1024px) 100vw, 640px"
            className="object-contain"
            priority
          />
          <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-chip bg-bg/80 px-2 py-1 text-[0.625rem] text-ink opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
            <Icon name="search" size={12} /> Zoom
          </span>
        </button>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center rounded-card border border-hairline bg-surface-2 text-ink-faint">
          <Icon name="controller" size={48} />
        </div>
      )}

      {shots.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {shots.map((src, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setZoom(src)}
              aria-label={`Zoom screenshot ${i + 1}`}
              className="relative aspect-[16/9] overflow-hidden rounded-tile bg-surface-2 transition-[border-color] hover:ring-1 hover:ring-cyan"
            >
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-200 flex items-center justify-center bg-overlay p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-tile border border-hairline bg-surface text-ink"
          >
            <Icon name="close" size={20} />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-4xl">
            <Image
              src={zoom}
              alt={title}
              width={1600}
              height={900}
              className="mx-auto h-auto max-h-[85vh] w-auto rounded-card object-contain"
            />
          </div>
          {all.length > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
              {all.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoom(src);
                  }}
                  aria-label="View image"
                  className={`size-2 rounded-full ${src === zoom ? "bg-cyan" : "bg-ink-faint"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
