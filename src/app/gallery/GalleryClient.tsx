"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  VISION_GALLERY_ITEMS,
  PLACEHOLDER_SRC,
  type VisionAspect,
  type VisionMode,
  type VisionQuality,
  type VisionStyle,
  type VisionUseCase,
  type VisionGalleryItem,
} from "@/lib/visionGallery";

type SortKey = "newest" | "oldest" | "popular";

const MODES: { key: VisionMode; label: string }[] = [
  { key: "image", label: "Image" },
  { key: "video", label: "Video" },
  { key: "remix", label: "Remix" },
];

const STYLES: { key: VisionStyle; label: string }[] = [
  { key: "minimal", label: "Minimal" },
  { key: "neon", label: "Neon" },
  { key: "cinematic", label: "Cinematic" },
  { key: "product", label: "Product" },
  { key: "editorial", label: "Editorial" },
  { key: "anime", label: "Anime" },
  { key: "3d", label: "3D" },
  { key: "vintage", label: "Vintage" },
  { key: "abstract", label: "Abstract" },
];

const USECASES: { key: VisionUseCase; label: string }[] = [
  { key: "ads", label: "Ads" },
  { key: "thumbnails", label: "Thumbnails" },
  { key: "social", label: "Social Posts" },
  { key: "product-shots", label: "Product Shots" },
  { key: "logos", label: "Logos" },
  { key: "posters", label: "Posters" },
  { key: "ui-mockups", label: "UI Mockups" },
  { key: "storyboards", label: "Storyboards" },
  { key: "moodboards", label: "Moodboards" },
];

const QUALITIES: { key: VisionQuality; label: string }[] = [
  { key: "fast", label: "Fast" },
  { key: "standard", label: "Standard" },
  { key: "ultra", label: "Ultra" },
];

const ASPECTS: { key: VisionAspect; label: string }[] = [
  { key: "1:1", label: "1:1" },
  { key: "4:5", label: "4:5" },
  { key: "16:9", label: "16:9" },
  { key: "9:16", label: "9:16" },
  { key: "custom", label: "Custom" },
];

export function GalleryClient() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const [modes, setModes] = useState<VisionMode[]>([]);
  const [styles, setStyles] = useState<VisionStyle[]>([]);
  const [useCases, setUseCases] = useState<VisionUseCase[]>([]);
  const [qualities, setQualities] = useState<VisionQuality[]>([]);
  const [aspects, setAspects] = useState<VisionAspect[]>([]);

  const [active, setActive] = useState<VisionGalleryItem | null>(null);

  const filtered = useMemo(() => {
    const nq = q.trim().toLowerCase();

    let items = VISION_GALLERY_ITEMS.filter((it) => {
      if (nq) {
        const hay = `${it.title} ${it.caption}`.toLowerCase();
        if (!hay.includes(nq)) return false;
      }
      if (modes.length && !modes.includes(it.mode)) return false;
      if (styles.length && !styles.includes(it.style)) return false;
      if (useCases.length && !useCases.includes(it.useCase)) return false;
      if (qualities.length && !qualities.includes(it.quality)) return false;
      if (aspects.length && !aspects.includes(it.aspect)) return false;
      return true;
    });

    items = items.sort((a, b) => {
      if (sort === "popular") return b.popularity - a.popularity;
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sort === "newest" ? db - da : da - db;
    });

    return items;
  }, [q, sort, modes, styles, useCases, qualities, aspects]);

  const clearAll = () => {
    setModes([]);
    setStyles([]);
    setUseCases([]);
    setQualities([]);
    setAspects([]);
    setQ("");
  };

  return (
    <section className="py-12 md:py-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Gallery</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">Browse outputs</h1>
            <p className="mt-2 text-base text-slate-600">
              These are slot placeholders. Drop your real files into{" "}
              <span className="font-semibold text-slate-700">/public/gallery/&lt;mode&gt;/&lt;style&gt;/01.png</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 rounded-xl bg-white px-3 text-sm text-slate-800 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Popular</option>
            </select>

            <button
              type="button"
              onClick={clearAll}
              className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 hover:text-slate-900"
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <div className="h-10 w-10 rounded-xl bg-[linear-gradient(120deg,rgba(0,242,255,0.18),rgba(203,47,255,0.14))]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search gallery…"
            className="h-10 w-full rounded-xl bg-transparent px-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <FilterGroup title="Type" items={MODES} selected={modes} setSelected={setModes} />
        <FilterGroup title="Style" items={STYLES} selected={styles} setSelected={setStyles} />
        <FilterGroup title="Use-case" items={USECASES} selected={useCases} setSelected={setUseCases} />
        <FilterGroup title="Quality" items={QUALITIES} selected={qualities} setSelected={setQualities} />
        <FilterGroup title="Aspect" items={ASPECTS} selected={aspects} setSelected={setAspects} />

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-900">No results</p>
            <p className="mt-2 text-sm text-slate-600">Try removing a filter or searching with fewer keywords.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => setActive(it)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-md ring-1 ring-slate-200 transition-all hover:-translate-y-[2px] hover:shadow-lg"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImg src={it.slotSrc} alt={it.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge text={it.mode.toUpperCase()} />
                    <Badge text={it.style.toUpperCase()} variant="soft" />
                  </div>
                </div>

                <div className="px-4 py-4">
                  <p className="text-sm font-semibold text-slate-900">{it.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{it.caption}</p>
                  <p className="mt-2 text-[11px] text-slate-400">{it.slotSrc}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={() => setActive(null)}>
          <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{active.title}</p>
                <p className="truncate text-sm text-slate-600">{active.caption}</p>
              </div>
              <button className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" onClick={() => setActive(null)}>
                Close
              </button>
            </div>

            <div className="grid gap-0 lg:grid-cols-2">
              <div className="p-5">
                <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
                  <SafeImg src={active.slotSrc} alt={active.title} className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-3 rounded-2xl bg-[#F7F8FB] p-4 ring-1 ring-slate-200/80">
                  <div className="flex flex-wrap gap-2">
                    <Badge text={active.mode.toUpperCase()} />
                    <Badge text={active.style.toUpperCase()} variant="soft" />
                    <Badge text={active.useCase.replace("-", " ").toUpperCase()} variant="soft" />
                    <Badge text={active.quality.toUpperCase()} variant="soft" />
                    <Badge text={active.aspect.toUpperCase()} variant="soft" />
                  </div>

                  <p className="text-sm text-slate-700">
                    Slot path: <span className="font-semibold">{active.slotSrc}</span>
                  </p>
                </div>

                <div className="mt-4 rounded-2xl p-[1px] bg-[linear-gradient(120deg,rgba(0,242,255,0.65),rgba(203,47,255,0.6))]">
                  <a href="/studio" className="block rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-slate-900 shadow-sm hover:shadow-md">
                    Open in Studio
                  </a>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Drop a real file into <span className="font-semibold">public{active.slotSrc}</span> and it will appear automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SafeImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [current, setCurrent] = useState(src);

  React.useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => setCurrent(PLACEHOLDER_SRC)}
    />
  );
}

function Badge({ text, variant }: { text: string; variant?: "soft" }) {
  const soft = variant === "soft";
  return (
    <span
      className={[
        "rounded-full px-2 py-1 text-[11px] font-semibold backdrop-blur",
        soft ? "bg-white/75 text-slate-700 ring-1 ring-slate-200" : "bg-white/85 text-slate-900 ring-1 ring-slate-200 shadow-sm",
      ].join(" ")}
      style={{ boxShadow: !soft ? "inset 0 0 0 1px rgba(0,242,255,0.35)" : undefined }}
    >
      {text}
    </span>
  );
}

function FilterGroup<T extends string>({
  title,
  items,
  selected,
  setSelected,
}: {
  title: string;
  items: { key: T; label: string }[];
  selected: T[];
  setSelected: (v: T[]) => void;
}) {
  const toggle = (key: T) => {
    setSelected(selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key]);
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs text-slate-500">{selected.length ? `${selected.length} selected` : "Any"}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => {
          const on = selected.includes(it.key);
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => toggle(it.key)}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
                on ? "text-slate-900 shadow-sm" : "text-slate-700 hover:text-slate-900",
              ].join(" ")}
              style={{
                background: on ? "linear-gradient(120deg, rgba(0,242,255,0.20), rgba(203,47,255,0.16))" : "white",
                boxShadow: on ? "inset 0 0 0 1px rgba(0,242,255,0.45)" : "inset 0 0 0 1px rgba(226,232,240,1)",
              }}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
