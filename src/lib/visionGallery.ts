export type GalleryMode = "image" | "video" | "remix";

export const IMAGE_STYLES = [
  "Minimal",
  "Neon",
  "Cinematic",
  "Product",
  "Editorial",
  "Anime",
  "3D",
  "Abstract",
  "Vintage",
  "Storybook Illustration",
  "Premium Animated 3D Render",
] as const;

export const VIDEO_STYLES = [
  "Minimal",
  "Neon",
  "Cinematic",
  "Editorial",
  "Anime Motion",
  "3D Motion",
  "Abstract Motion",
  "Storybook Motion Style",
  "Premium Animated Feature Style",
] as const;

export const REMIX_STYLES = [
  "Clean commercial grade",
  "Cyberpunk / neon grade",
  "Soft pastel grade",
  "High-contrast fashion",
  "Film emulation (Kodak-style)",
  "Black & white / mono",
  "VHS / analog",
  "Grainy indie film",
  "Warm sunset grade",
  "Cool studio grade",
  "High-key beauty",
  "Moody low-key",
  "Whimsical Storybook Grade",
  "Premium Animated Feature Grade",
] as const;

export type ImageStyle = (typeof IMAGE_STYLES)[number];
export type VideoStyle = (typeof VIDEO_STYLES)[number];
export type RemixStyle = (typeof REMIX_STYLES)[number];
export type AnyStyle = ImageStyle | VideoStyle | RemixStyle;

export type GalleryItem = {
  id: string;
  mode: GalleryMode;
  style: AnyStyle;
  src: string; // /gallery/<mode>/<styleSlug>/<NN>.png
  prompt: string;
  title: string;
  caption: string;
  seed: number;
};

export const ALL_MODES: GalleryMode[] = ["image", "video", "remix"];

export function getStylesForMode(mode: GalleryMode): readonly AnyStyle[] {
  if (mode === "image") return IMAGE_STYLES;
  if (mode === "video") return VIDEO_STYLES;
  return REMIX_STYLES;
}

export function isGalleryMode(x: string | undefined | null): x is GalleryMode {
  return x === "image" || x === "video" || x === "remix";
}

export function modeLabel(mode: GalleryMode) {
  return mode === "image" ? "Image" : mode === "video" ? "Video" : "Remix";
}

/** Lowercase; replace "&" and "/" with spaces; remove punctuation; collapse to hyphen */
export function slugifyStyle(style: string) {
  return style
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\//g, " ")
    .replace(/\(|\)|:|,|’|—|–|\.|!/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function styleFromSlug(mode: GalleryMode, slug: string | undefined | null): AnyStyle | null {
  if (!slug) return null;
  const styles = getStylesForMode(mode);
  const found = styles.find((s) => slugifyStyle(s) === slug);
  return found ?? null;
}

function captionFor(mode: GalleryMode, style: AnyStyle) {
  if (mode === "image") return `Brand-safe still • ${String(style)} grade`;
  if (mode === "video") return `Keyframe thumbnail • ${String(style)} motion look`;
  return `Remix pass • ${String(style)} treatment`;
}

function promptFor(mode: GalleryMode, style: AnyStyle, i: number) {
  const n = i + 1;
  if (mode === "image") {
    return `(${style}) Premium still: modern product hero shot, studio lighting, clean background, editorial polish. Variation ${n}.`;
  }
  if (mode === "video") {
    return `(${style}) Motion keyframe concept: cinematic framing, edit-friendly storyboard frames, clean and brand-safe. Variation ${n}.`;
  }
  return `(${style}) Remix: preserve subject, transform grade to "${style}", premium commercial finish. Variation ${n}.`;
}

export const FALLBACK_THUMB = "/assets/gallery/prompt-01.png";

export function getItemsFor(mode: GalleryMode, style: AnyStyle): GalleryItem[] {
  const styleSlug = slugifyStyle(style);
  return Array.from({ length: 12 }).map((_, i) => {
    const nn = String(i + 1).padStart(2, "0");
    const seed = 41000 + i * 97;
    return {
      id: `${mode}:${styleSlug}:${nn}`,
      mode,
      style,
      seed,
      src: `/gallery/${mode}/${styleSlug}/${nn}.png`,
      title: `${modeLabel(mode)} • ${String(style)} • ${nn}`,
      caption: captionFor(mode, style),
      prompt: promptFor(mode, style, i),
    };
  });
}
