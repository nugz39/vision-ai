import { Suspense } from "react";
import VisionGalleryClient from "@/components/gallery/VisionGalleryClient";

export default function Page({
  params,
}: {
  params: { mode: string; style: string };
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-black/55">Loading gallery…</div>}>
      <VisionGalleryClient initialMode={params.mode} initialStyleSlug={params.style} />
    </Suspense>
  );
}
