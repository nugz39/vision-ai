"use client";

import { useMemo, useState } from "react";
import { NbButton } from "@/components/ui/NbButton";

type Mode = "txt2img" | "txt2video" | "img2img";

type ShowcaseItem = {
  id: string;
  mode: Mode;
  src: string;
  title: string;
  subtitle: string;
};

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  // TEXT → IMAGE
  {
    id: "t2i-01",
    mode: "txt2img",
    src: "/assets/gallery/prompt-01.png",
    title: "Stylised portrait render",
    subtitle: "Prompt-only, cinematic lighting",
  },
  {
    id: "t2i-02",
    mode: "txt2img",
    src: "/assets/gallery/prompt-02.png",
    title: "Neon studio concept",
    subtitle: "Crisp whites, cyan & magenta accent glow",
  },
  {
    id: "t2i-03",
    mode: "txt2img",
    src: "/assets/gallery/prompt-03.png",
    title: "Experimental frame",
    subtitle: "Prompt-driven exploration",
  },
  {
    id: "t2i-04",
    mode: "txt2img",
    src: "/assets/gallery/prompt-04.png",
    title: "Hero shot mock",
    subtitle: "High-contrast focal subject",
  },
  {
    id: "t2i-05",
    mode: "txt2img",
    src: "/assets/gallery/prompt-05.png",
    title: "Studio-grade detail",
    subtitle: "Fine structure & texture",
  },
  {
    id: "t2i-06",
    mode: "txt2img",
    src: "/assets/gallery/prompt-06.png",
    title: "Concept art variation",
    subtitle: "Fast iteration from one prompt",
  },
  {
    id: "t2i-07",
    mode: "txt2img",
    src: "/assets/gallery/prompt-07.png",
    title: "Moodboard frame",
    subtitle: "Creative reference output",
  },
  {
    id: "t2i-08",
    mode: "txt2img",
    src: "/assets/gallery/prompt-08.png",
    title: "Promo-ready still",
    subtitle: "Clean focal composition",
  },

  // TEXT → VIDEO (represented as keyframe-style stills)
  {
    id: "t2v-01",
    mode: "txt2video",
    src: "/assets/gallery/prompt-09.png",
    title: "Opening frame",
    subtitle: "Text-to-video storyboard keyframe",
  },
  {
    id: "t2v-02",
    mode: "txt2video",
    src: "/assets/gallery/prompt-10.png",
    title: "Motion beat",
    subtitle: "Designed for smooth interpolation",
  },
  {
    id: "t2v-03",
    mode: "txt2video",
    src: "/assets/gallery/prompt-11.png",
    title: "Transition frame",
    subtitle: "Bridging two visual ideas",
  },
  {
    id: "t2v-04",
    mode: "txt2video",
    src: "/assets/gallery/prompt-12.png",
    title: "Closing shot",
    subtitle: "Final hero moment",
  },

  // IMAGE → IMAGE (REMIX)
  {
    id: "i2i-01",
    mode: "img2img",
    src: "/assets/gallery/prompt-13.png",
    title: "Style transfer pass",
    subtitle: "Remix from base source",
  },
  {
    id: "i2i-02",
    mode: "img2img",
    src: "/assets/gallery/prompt-14.png",
    title: "Lighting remix",
    subtitle: "Same subject, different light",
  },
  {
    id: "i2i-03",
    mode: "img2img",
    src: "/assets/gallery/prompt-15.png",
    title: "Color-grade variation",
    subtitle: "Palette-only adjustments",
  },
  {
    id: "i2i-04",
    mode: "img2img",
    src: "/assets/gallery/prompt-16.png",
    title: "Final polish pass",
    subtitle: "Remixed for delivery",
  },
];

export function ShowcaseGrid({ mode }: { mode: Mode }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const batchSize = 6;

  const items = useMemo(
    () => SHOWCASE_ITEMS.filter((item) => item.mode === mode),
    [mode]
  );

  const visibleItems = items.slice(0, visibleCount);
  const canLoadMore = visibleCount < items.length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-nb-border bg-nb-bg-elevated shadow-nb-soft"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-nb-bg-elevated via-nb-bg-elevated/95 to-transparent" />
            </div>
            <div className="space-y-1 px-3 py-3">
              <p className="text-xs font-semibold text-nb-text">
                {item.title}
              </p>
              <p className="text-[11px] text-nb-muted">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      {canLoadMore && (
        <div className="flex justify-center">
          <NbButton
            variant="primary"
            size="md"
            onClick={() => setVisibleCount((v) => v + batchSize)}
          >
            Load more
          </NbButton>
        </div>
      )}
    </div>
  );
}
