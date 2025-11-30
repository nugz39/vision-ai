#!/usr/bin/env bash
set -euo pipefail

ROOT="$(pwd)"
echo "Project: $ROOT"

echo
echo "1) Removing Characters routes (Nova etc)..."
rm -rf "$ROOT/src/app/characters" || true

echo
echo "2) Replacing characters data with empty stub (no prompt-13..16 refs)..."
mkdir -p "$ROOT/src/data"
cat > "$ROOT/src/data/characters.ts" <<'TS'
/**
 * Vision AI: Characters removed.
 * This project is a premium multi-modal studio (not character-based).
 * Keep this stub only to prevent legacy imports from breaking builds.
 */
export type Character = {
  id: string;
  name: string;
  category?: string;
  style?: string;
  gender?: string;
  chats?: number;
  createdAt?: number;
  image?: string;
  tags?: string[];
  bio?: string;
  personalityTags?: string[];
};

export const characters: Character[] = [];
TS

echo
echo "3) Updating ShowcaseGrid to ONLY use prompt-01..12..."
mkdir -p "$ROOT/src/components/ui"
cat > "$ROOT/src/components/ui/ShowcaseGrid.tsx" <<'TSX'
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
TSX

echo
echo "4) Updating visionGallery to ONLY use prompts 01..12 (no /gallery/\${mode}/... paths)..."
mkdir -p "$ROOT/src/lib"
cat > "$ROOT/src/lib/visionGallery.ts" <<'TS'
export type VisionGalleryMode = "image" | "video" | "remix";
export type VisionGalleryItem = {
  id: string;
  mode: VisionGalleryMode;
  style: string;
  title: string;
  src: string; // must exist in /public
};

export const FALLBACK_THUMB = "/assets/gallery/prompt-01.png";

/**
 * Vision AI gallery uses ONLY the existing prompt-01..prompt-12 assets for now.
 * Keep it simple and brand-safe.
 */
export const VISION_GALLERY_ITEMS: VisionGalleryItem[] = [
  { id: "p01", mode: "image", style: "editorial", title: "Editorial Detail", src: "/assets/gallery/prompt-01.png" },
  { id: "p02", mode: "image", style: "minimal", title: "Landscape Plate", src: "/assets/gallery/prompt-02.png" },
  { id: "p03", mode: "image", style: "product", title: "Studio Still", src: "/assets/gallery/prompt-03.png" },
  { id: "p04", mode: "image", style: "editorial", title: "Soft Neon Portrait", src: "/assets/gallery/prompt-04.png" },
  { id: "p05", mode: "image", style: "product", title: "UI Mockup Look", src: "/assets/gallery/prompt-05.png" },
  { id: "p06", mode: "image", style: "minimal", title: "Architectural Minimal", src: "/assets/gallery/prompt-06.png" },
  { id: "p07", mode: "image", style: "neon", title: "Neon Product Frame", src: "/assets/gallery/prompt-07.png" },
  { id: "p08", mode: "remix", style: "vintage", title: "Vintage Film Feel", src: "/assets/gallery/prompt-08.png" },
  { id: "p09", mode: "video", style: "cinematic", title: "Cinematic Keyframe", src: "/assets/gallery/prompt-09.png" },
  { id: "p10", mode: "remix", style: "neon-grade", title: "Remix Grade Pass", src: "/assets/gallery/prompt-10.png" },
  { id: "p11", mode: "video", style: "abstract", title: "Abstract Neon Form", src: "/assets/gallery/prompt-11.png" },
  { id: "p12", mode: "video", style: "cinematic", title: "Motion Reference", src: "/assets/gallery/prompt-12.png" },
];

export function filterVisionGallery(params: {
  mode?: VisionGalleryMode;
  style?: string;
  q?: string;
}) {
  const { mode, style, q } = params;

  return VISION_GALLERY_ITEMS.filter((it) => {
    if (mode && it.mode !== mode) return false;
    if (style && it.style !== style) return false;
    if (q && !(it.title.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });
}
TS

echo
echo "5) Fix all fallbacks to ONLY use prompt-01..12..."

# a) api preview fallback
if [ -f "$ROOT/src/app/api/generate-preview/route.ts" ]; then
  perl -0777 -i -pe 's/(mode\s*===\s*["\047]video["\047]\s*\?\s*)["\047]\/assets\/gallery\/prompt-\d{2}\.png["\047](\s*:\s*)["\047]\/assets\/gallery\/prompt-\d{2}\.png["\047]/$1"\/assets\/gallery\/prompt-02.png"$2"\/assets\/gallery\/prompt-03.png"/g' "$ROOT/src/app/api/generate-preview/route.ts" || true
fi

# b) studio + preview components fallback to prompt-01 only
if [ -f "$ROOT/src/app/studio/StudioClient.tsx" ]; then
  perl -i -pe 's/\/assets\/gallery\/prompt-\d{2}\.png/\/assets\/gallery\/prompt-01.png/g if /setOutputUrl\(/' "$ROOT/src/app/studio/StudioClient.tsx" || true
fi

if [ -f "$ROOT/src/components/ui/GeneratorPreviewCard.tsx" ]; then
  perl -i -pe 's/\/assets\/gallery\/prompt-\d{2}\.png/\/assets\/gallery\/prompt-01.png/g if /setResultUrl\(/' "$ROOT/src/components/ui/GeneratorPreviewCard.tsx" || true
fi

echo
echo "6) Verification: show any remaining forbidden references..."
echo "-- Any prompt-13..16 left? --"
grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git -E "prompt-(13|14|15|16)\.png" "$ROOT" || echo "OK: none found."

echo
echo "-- Any /assets/characters/ left? --"
grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git -E "/assets/characters/" "$ROOT" || echo "OK: none found."

echo
echo "-- Any /gallery/\${mode}/ dynamic image paths left? --"
grep -RIn --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git -E "/gallery/\\\$\{mode\}" "$ROOT" || echo "OK: none found."

echo
echo "DONE."
