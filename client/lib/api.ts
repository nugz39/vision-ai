export type GenReq = {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance?: number;
  seed?: number | null;
  mode: "preview" | "polish";
  // optional for img2img later:
  initImageDataUrl?: string | null;
  strength?: number | null;
};

const HF_BASE =
  process.env.VISION_AI_HF_BASE ||
  process.env.NEXT_PUBLIC_BACKEND_BASE ||
  ""; // set this on Vercel later

/**
 * Calls your FastAPI backend /generate and normalizes the response to an array of data URLs.
 * Expected backend response shape (any of):
 *  - { images: string[] }                 // preferred
 *  - { data_url: string }                 // single image data URL
 *  - { base64_png: string }               // base64 body (we wrap to data URL)
 */
export async function proxyGenerate(body: GenReq): Promise<string[]> {
  if (!HF_BASE) {
    throw new Error(
      "Backend base URL not configured. Set VISION_AI_HF_BASE or NEXT_PUBLIC_BACKEND_BASE."
    );
  }

  const res = await fetch(`${HF_BASE.replace(/\/+$/,"")}/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    let detail = "";
    try { detail = await res.text(); } catch {}
    throw new Error(`Backend error ${res.status}${detail ? `: ${detail}` : ""}`);
  }

  let j: any = null;
  try { j = await res.json(); } catch {}

  if (j?.images && Array.isArray(j.images)) return j.images;
  if (j?.data_url) return [String(j.data_url)];
  if (j?.base64_png) return [`data:image/png;base64,${j.base64_png}`];

  // Some backends return raw bytes; if so, fallback to blob->dataURL
  const ct = res.headers.get("content-type") || "";
  if (!j && ct.startsWith("image/")) {
    const blob = await res.blob();
    const data = await blobToDataUrl(blob);
    return [data];
  }

  throw new Error("Backend returned an unrecognized payload.");
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(String(fr.result));
    fr.onerror = reject;
    fr.readAsDataURL(blob);
  });
}

