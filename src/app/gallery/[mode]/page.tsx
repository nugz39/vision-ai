import VisionGalleryClient from "@/components/gallery/VisionGalleryClient";

export default function Page({ params }: { params: { mode: string } }) {
  return <VisionGalleryClient initialMode={params.mode} />;
}
