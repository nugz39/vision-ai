import VisionGalleryClient from "@/components/gallery/VisionGalleryClient";

export default function Page({
  params,
  searchParams,
}: {
  params: { mode: string; style: string };
  searchParams?: { mode?: string; style?: string };
}) {
  return (
    <VisionGalleryClient
      initialMode={params.mode}
      initialStyleSlug={params.style}
      initialQueryMode={searchParams?.mode}
      initialQueryStyle={searchParams?.style}
    />
  );
}
