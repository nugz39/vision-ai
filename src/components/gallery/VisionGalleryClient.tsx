"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModeTabs, { ModeTabsOption } from "@/components/ui/ModeTabs";
import StylePillsRow from "@/components/ui/StylePillsRow";
import PrimaryGradientButton from "@/components/ui/PrimaryGradientButton";
import {
  AnyStyle,
  FALLBACK_THUMB,
  GalleryItem,
  GalleryMode,
  getItemsFor,
  getStylesForMode,
  isGalleryMode,
  modeLabel,
  slugifyStyle,
  styleFromSlug,
} from "@/lib/visionGallery";

type Props = {
  initialMode?: string;
  initialStyleSlug?: string;
};

const MODE_OPTIONS: ModeTabsOption<GalleryMode>[] = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
  { value: "remix", label: "Remix" },
];

function OverlayChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
      {text}
    </span>
  );
}

function Modal({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: GalleryItem | null;
  onClose: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !item) return null;

  const qp = new URLSearchParams();
  qp.set("mode", item.mode);
  qp.set("style", String(item.style));
  qp.set("seed", String(item.seed));
  qp.set("prompt", item.prompt);
  const studioHref = `/studio?${qp.toString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0"
        onClick={onClose}
        style={{
          background: "rgba(2,6,23,0.22)",
          backdropFilter: "blur(12px)",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[70vw] overflow-hidden rounded-3xl border bg-white/90 shadow-[0_30px_90px_rgba(2,6,23,0.25)] backdrop-blur-md max-sm:max-w-[90vw]"
        style={{ borderColor: "rgba(2,6,23,0.12)" }}
      >
        <div className="flex items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
          <div className="text-sm font-semibold text-[#0B1220]">
            {modeLabel(item.mode)} — {String(item.style)}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border bg-white/70 px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-white"
            style={{ borderColor: "rgba(2,6,23,0.12)" }}
          >
            Close
          </button>
        </div>

        <div className="p-5">
          <div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
            <div className="aspect-[16/10] w-full overflow-hidden bg-black/[0.02]">
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMB;
                }}
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border bg-white/80 p-4" style={{ borderColor: "rgba(2,6,23,0.10)", boxShadow: "0 10px 24px rgba(2,6,23,0.06)" }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">Details</div>

                <div className="mt-2 text-sm text-[#0B1220]">
                  <div className="font-semibold">{item.caption}</div>
                  <div className="mt-2 text-xs text-black/55">
                    <span className="font-semibold text-[#0B1220]">Seed:</span> {item.seed}
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border bg-white/70 p-4" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">Prompt</div>
                  <div className="mt-2 text-sm leading-relaxed text-[#0B1220]">{item.prompt}</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="rounded-2xl border bg-white/80 p-4" style={{ borderColor: "rgba(2,6,23,0.10)", boxShadow: "0 10px 24px rgba(2,6,23,0.06)" }}>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-black/55">Action</div>

                <div className="mt-4">
                  <PrimaryGradientButton className="w-full" onClick={() => router.push(studioHref)}>
                    Open in Studio with these settings
                  </PrimaryGradientButton>
                </div>

                <div className="mt-3 text-xs font-semibold text-black/55">
                  Deep link:
                  <div className="mt-1 break-all font-mono text-[11px] text-black/45">{studioHref}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisionGalleryClient({ initialMode, initialStyleSlug }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modeFromQuery = searchParams.get("mode") ?? undefined;
  const styleFromQuery = searchParams.get("style") ?? undefined;

  const modeInit: GalleryMode = isGalleryMode(modeFromQuery)
    ? modeFromQuery
    : isGalleryMode(initialMode)
    ? initialMode
    : "image";

  const [mode, setMode] = useState<GalleryMode>(modeInit);

  const styles = useMemo(() => getStylesForMode(mode), [mode]);

  const styleInit = useMemo(() => {
    const slug = styleFromQuery || initialStyleSlug || slugifyStyle(String(styles[0]));
    return styleFromSlug(mode, slug) ?? styles[0];
  }, [mode, styleFromQuery, initialStyleSlug, styles]);

  const [activeStyle, setActiveStyle] = useState<AnyStyle>(styleInit);

  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const items = useMemo(() => getItemsFor(mode, activeStyle), [mode, activeStyle]);
  const shown = items.slice(0, visible);

  useEffect(() => {
    const valid = getStylesForMode(mode);
    if (!valid.includes(activeStyle)) setActiveStyle(valid[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    const styleSlug = slugifyStyle(String(activeStyle));
    const qp = new URLSearchParams();
    qp.set("mode", mode);
    qp.set("style", styleSlug);
    const nextUrl = `/gallery?${qp.toString()}`;
    if (pathname !== "/gallery" || searchParams.toString() !== qp.toString()) {
      router.replace(nextUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, activeStyle]);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#0B1220] sm:text-5xl">Gallery</h1>
        <p className="mt-3 text-sm leading-relaxed text-black/55 sm:text-base">
          Explore organised, style-based outputs. <span className="font-semibold text-[#0B1220]">12 thumbnails per style</span>.
        </p>
      </div>

      <div className="mt-8">
        <ModeTabs value={mode} onChange={setMode} options={MODE_OPTIONS} />
      </div>

      <div className="mt-4">
        <StylePillsRow
          value={String(activeStyle) as any}
          onChange={(s) => setActiveStyle(s as AnyStyle)}
          options={styles.map(String) as any}
        />
      </div>

      <section className="mt-8">
        <div className="grid gap-5 [grid-auto-rows:1fr] grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((it) => (
            <button
              key={it.id}
              type="button"
              onClick={() => setSelected(it)}
              className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute left-3 top-3 z-10">
                <OverlayChip text={`${modeLabel(it.mode)} — ${String(it.style)}`} />
              </div>

              <div className="aspect-[4/5] w-full overflow-hidden bg-black/[0.02]">
                <img
                  src={it.src}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_THUMB;
                  }}
                />
              </div>

              <div className="px-4 pb-4 pt-3">
                <div className="text-sm font-semibold text-[#0B1220]">{it.title}</div>
                <div className="mt-1 text-[12px] text-black/55">{it.caption}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <PrimaryGradientButton onClick={() => setVisible(12)}>Load more</PrimaryGradientButton>
        </div>
      </section>

      <Modal open={!!selected} item={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
