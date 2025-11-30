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
