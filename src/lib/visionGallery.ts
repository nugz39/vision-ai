export type VisionMode = "image" | "video" | "remix";
export type VisionStyle =
  | "minimal"
  | "neon"
  | "cinematic"
  | "product"
  | "editorial"
  | "anime"
  | "3d"
  | "vintage"
  | "abstract";

<<<<<<< HEAD
export type VisionUseCase =
  | "ads"
  | "thumbnails"
  | "social"
  | "product-shots"
  | "logos"
  | "posters"
  | "ui-mockups"
  | "storyboards"
  | "moodboards";

export type VisionQuality = "fast" | "standard" | "ultra";
export type VisionAspect = "1:1" | "4:5" | "16:9" | "9:16" | "custom";

export type VisionGalleryItem = {
  id: string;
  title: string;
  caption: string;

  /**
   * The FINAL slot where the real image/video thumbnail will live.
   * You will later drop files into /public/gallery/<mode>/<style>/<nn>.png
   */
  slotSrc: string;

  mode: VisionMode;
  style: VisionStyle;
  useCase: VisionUseCase;
  quality: VisionQuality;
  aspect: VisionAspect;

  popularity: number;
  createdAt: string; // ISO date for sorting
};

export const PLACEHOLDER_SRC = "/assets/placeholders/vision-placeholder.png";

const slot = (mode: VisionMode, style: VisionStyle, nn: string) =>
  `/gallery/${mode}/${style}/${nn}.png`;

// Minimal starter set (you can expand this list later)
export const VISION_GALLERY_ITEMS: VisionGalleryItem[] = [
  { id: "img-neon-01", title: "Neon Product Frame", caption: "Campaign-ready product photography.", slotSrc: slot("image","neon","01"), mode:"image", style:"neon", useCase:"ads", quality:"ultra", aspect:"4:5", popularity: 90, createdAt:"2025-11-22" },
  { id: "img-min-01", title: "Architectural Minimal", caption: "Clean forms, calm editorial tone.", slotSrc: slot("image","minimal","01"), mode:"image", style:"minimal", useCase:"posters", quality:"standard", aspect:"4:5", popularity: 68, createdAt:"2025-11-23" },
  { id: "vid-cin-01", title: "Cinematic Keyframe", caption: "Storyboard-ready shot direction.", slotSrc: slot("video","cinematic","01"), mode:"video", style:"cinematic", useCase:"storyboards", quality:"standard", aspect:"16:9", popularity: 85, createdAt:"2025-11-20" },
  { id: "img-pro-01", title: "UI Mockup Look", caption: "Modern UI / product interface shots.", slotSrc: slot("image","product","01"), mode:"image", style:"product", useCase:"ui-mockups", quality:"standard", aspect:"16:9", popularity: 81, createdAt:"2025-11-24" },
  { id: "img-ed-01", title: "Editorial Still", caption: "Premium mainstream styling (brand-safe).", slotSrc: slot("image","editorial","01"), mode:"image", style:"editorial", useCase:"social", quality:"standard", aspect:"4:5", popularity: 92, createdAt:"2025-11-28" },
  { id: "rmx-neon-01", title: "Neon Grade Remix", caption: "Same frame, fresher lighting + grade.", slotSrc: slot("remix","neon","01"), mode:"remix", style:"neon", useCase:"thumbnails", quality:"fast", aspect:"1:1", popularity: 71, createdAt:"2025-11-19" },
  { id: "vid-abs-01", title: "Abstract Motion Plate", caption: "Premium abstract energy plate.", slotSrc: slot("video","abstract","01"), mode:"video", style:"abstract", useCase:"moodboards", quality:"standard", aspect:"16:9", popularity: 77, createdAt:"2025-11-18" },
  { id: "rmx-vin-01", title: "Vintage Film Feel", caption: "Warm tone + subtle grain.", slotSrc: slot("remix","vintage","01"), mode:"remix", style:"vintage", useCase:"social", quality:"standard", aspect:"4:5", popularity: 63, createdAt:"2025-11-21" },
];
=======
export type AnyStyle =
  | "all"
  | "minimal"
  | "neon"
  | "cinematic"
  | "product"
  | "editorial"
  | "anime"
  | "3d"
  | "vintage"
  | "abstract";

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  src: string;        // public/...
  mode: GalleryMode;
  style: Exclude<AnyStyle, "all">;
  popularity?: number;
  createdAt?: string;
  prompt?: string;
  seed?: number;
};

export const FALLBACK_THUMB = "/assets/gallery/prompt-01.png";

/**
 * IMPORTANT: you said only prompt-01..prompt-12 are valid placeholders right now.
 * So we ONLY reference those here (no 13–16, no /gallery/... dynamic paths).
 */
const ITEMS: GalleryItem[] = [
  { id: "img-01", title: "Editorial Still",       caption: "Brand-safe premium look.",      src: "/assets/gallery/prompt-01.png", mode: "image", style: "editorial" },
  { id: "img-02", title: "Architectural Minimal", caption: "Clean forms, calm tone.",      src: "/assets/gallery/prompt-02.png", mode: "image", style: "minimal"   },
  { id: "img-03", title: "Neon Product Frame",    caption: "Campaign-ready product shot.", src: "/assets/gallery/prompt-03.png", mode: "image", style: "neon"      },
  { id: "img-04", title: "UI Mockup Look",        caption: "Modern product visuals.",      src: "/assets/gallery/prompt-04.png", mode: "image", style: "product"   },

  { id: "vid-01", title: "Cinematic Keyframe",    caption: "Storyboard-ready direction.",  src: "/assets/gallery/prompt-05.png", mode: "video", style: "cinematic" },
  { id: "vid-02", title: "Abstract Motion Plate", caption: "Premium abstract energy.",     src: "/assets/gallery/prompt-06.png", mode: "video", style: "abstract"  },
  { id: "vid-03", title: "Soft Neon Scene",       caption: "Commercial lighting & grade.",src: "/assets/gallery/prompt-07.png", mode: "video", style: "neon"      },
  { id: "vid-04", title: "Minimal Sequence",      caption: "Clean motion composition.",   src: "/assets/gallery/prompt-08.png", mode: "video", style: "minimal"   },

  { id: "rmx-01", title: "Vintage Film Feel",     caption: "Warm tone + subtle grain.",   src: "/assets/gallery/prompt-09.png", mode: "remix", style: "vintage"   },
  { id: "rmx-02", title: "Neon Grade Remix",      caption: "Fresh lighting pass.",        src: "/assets/gallery/prompt-10.png", mode: "remix", style: "neon"      },
  { id: "rmx-03", title: "Cinematic Pass",        caption: "Film-like rolloff.",          src: "/assets/gallery/prompt-11.png", mode: "remix", style: "cinematic" },
  { id: "rmx-04", title: "Editorial Regrade",     caption: "Sharper whites, premium.",    src: "/assets/gallery/prompt-12.png", mode: "remix", style: "editorial" },
];

export function isGalleryMode(v: unknown): v is GalleryMode {
  return v === "image" || v === "video" || v === "remix";
}

export function modeLabel(mode: GalleryMode): string {
  if (mode === "image") return "Image";
  if (mode === "video") return "Video";
  return "Remix";
}

/** ✅ These two MUST exist because your Gallery client imports them */
export function slugifyStyle(style: string): string {
  return (style || "")
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-");
}

export function styleFromSlug(slug: string): AnyStyle {
  const s = slugifyStyle(slug);
  if (s === "" || s === "all") return "all";
  if (s === "3d" || s === "three-d" || s === "3-d") return "3d";

  const allowed: AnyStyle[] = ["minimal","neon","cinematic","product","editorial","anime","3d","vintage","abstract","all"];
  return allowed.includes(s as AnyStyle) ? (s as AnyStyle) : "all";
}

export function getStylesForMode(mode: GalleryMode): AnyStyle[] {
  const styles = Array.from(new Set(ITEMS.filter(i => i.mode === mode).map(i => i.style)));
  return ["all", ...styles];
}

export function getItemsFor(mode: GalleryMode, style: AnyStyle = "all"): GalleryItem[] {
  const base = ITEMS.filter(i => i.mode === mode);
  return style === "all" ? base : base.filter(i => i.style === style);
}
>>>>>>> 0a0e86a (Fix gallery build: restore visionGallery exports)
