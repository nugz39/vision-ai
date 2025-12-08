import VisionGalleryClient from "@/components/gallery/VisionGalleryClient";

export default async function Page({
  params,
}: {
  params: Promise<{ mode: string; style: string }>;
}) {
  const { mode, style } = await params;

  return <VisionGalleryClient {...({ initialMode: mode, initialStyle: style } as any)} />;
}
