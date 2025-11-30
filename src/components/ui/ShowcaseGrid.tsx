"use client";

import * as React from "react";

type ShowcaseItem = {
  title: string;
  caption: string;
  src: string;
  href?: string;
  badge: "Image" | "Video" | "Remix";
};

const ITEMS: ShowcaseItem[] = [
  { title: "Neon Product Frame", caption: "Campaign-ready product photography.", src: "/assets/gallery/prompt-07.png", href: "/gallery?mode=image&style=neon", badge: "Image" },
  { title: "Architectural Minimal", caption: "Clean forms, calm editorial tone.", src: "/assets/gallery/prompt-06.png", href: "/gallery?mode=image&style=minimal", badge: "Image" },
  { title: "Cinematic Keyframe", caption: "Storyboard-ready shot direction.", src: "/assets/gallery/prompt-09.png", href: "/gallery?mode=video&style=cinematic", badge: "Video" },
  { title: "UI Mockup Look", caption: "Modern UI / product interface shots.", src: "/assets/gallery/prompt-05.png", href: "/gallery?mode=image&style=product", badge: "Image" },
  { title: "Soft Neon Portrait", caption: "Commercial-grade lighting & grade.", src: "/assets/gallery/prompt-04.png", href: "/gallery?mode=image&style=editorial", badge: "Image" },
  { title: "Remix Grade Pass", caption: "Same frame, fresher lighting.", src: "/assets/gallery/prompt-10.png", href: "/gallery?mode=remix&style=neon-grade", badge: "Remix" },
  { title: "Abstract Neon Form", caption: "Premium abstract motion still.", src: "/assets/gallery/prompt-11.png", href: "/gallery?mode=video&style=abstract", badge: "Video" },
  { title: "Vintage Film Feel", caption: "Warm tone + subtle grain.", src: "/assets/gallery/prompt-08.png", href: "/gallery?mode=remix&style=vintage", badge: "Remix" },
  { title: "Studio Still", caption: "High-key product lighting.", src: "/assets/gallery/prompt-03.png", href: "/gallery?mode=image&style=product", badge: "Image" },
  { title: "Clean Landscape Plate", caption: "Great for hero backgrounds.", src: "/assets/gallery/prompt-02.png", href: "/gallery?mode=image&style=minimal", badge: "Image" },
  { title: "Editorial Detail", caption: "Premium mainstream styling.", src: "/assets/gallery/prompt-01.png", href: "/gallery?mode=image&style=editorial", badge: "Image" },
  { title: "Motion Reference", caption: "Video keyframe-style output.", src: "/assets/gallery/prompt-12.png", href: "/gallery?mode=video&style=cinematic", badge: "Video" },
];

export function ShowcaseGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ITEMS.map((item) => (
        <a
          key={item.title}
          href={item.href || "/gallery"}
          className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition-all hover:-translate-y-[2px] hover:shadow-lg"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={item.src}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-white/80 px-2 py-1 text-[11px] font-semibold text-slate-800 backdrop-blur ring-1 ring-slate-200">
                {item.badge}
              </span>
            </div>
          </div>
          <div className="px-4 py-4">
            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.caption}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
