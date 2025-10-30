// client/lib/api.ts
export type GenReq = {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  guidance?: number;
  seed?: number | null;
  mode?: "preview" | "polish";
  initImageDataUrl?: string | null;
  strength?: number | null;
};

// Normalized config
const RAW_BASE = process.env.VISION_AI_HF_BASE?.trim() || "";
const HF_TOKEN  = process.env.HF_INFERENCE_TOKEN?.trim() || "";
const IS_SPACE  = /\.hf\.space$/i.test(RAW_BASE);
const BASE = RAW_BASE.replace(/\/+$/,""); // strip trailing slash

function spaceUrl(path: string) {
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * proxyGenerate:
 *  - If VISION_AI_HF_BASE ends with `.hf.space`, POST to `${BASE}/generate`.
 *  - Otherwise, use Hugging Face Inference API (requires HF_INFERENCE_TOKEN).
 */
export async function proxyGenerate(req: GenReq): Promise<string[]> {
  const body = {
    prompt: req.prompt,
    negative_prompt: req.negativePrompt || "",
    width: req.width ?? 768,
    height: req.height ?? 768,
    steps: req.steps ?? (req.mode === "polish" ? 30 : 12),
    guidance: req.guidance ?? (req.mode === "polish" ? 6.5 : 3.5),
    seed: req.seed ?? null,
    init_image: req.initImageDataUrl ?? null,
    strength: req.strength ?? null,
    mode: req.mode || "preview",
  };

  if (!BASE) {
    throw new Error("VISION_AI_HF_BASE is not set.");
  }

  if (IS_SPACE) {
    // Hugging Face Space (FastAPI/Fast UI) path
    const url = spaceUrl("/generate");
    const r = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const t = await r.text().catch(()=>"");
      throw new Error(`Space error ${r.status}: ${t}`);
    }
    const j = await r.json().catch(() => ({}));
    if (j?.data_url) return [j.data_url];
    if (j?.base64_png) return [`data:image/png;base64,${j.base64_png}`];
    if (Array.isArray(j?.images) && j.images.length) return j.images;
    throw new Error("Space response did not contain images.");
  }

  // Hugging Face Inference API
  if (!HF_TOKEN) {
    throw new Error("HF_INFERENCE_TOKEN is required when VISION_AI_HF_BASE is not a .hf.space URL.");
  }
  const model = process.env.VISION_AI_HF_MODEL || "black-forest-labs/FLUX.1-schnell";
  const url = "https://api-inference.huggingface.co/models/" + model;
  const payload = {
    inputs: req.prompt,
    parameters: {
      negative_prompt: req.negativePrompt || "",
      width: body.width,
      height: body.height,
      guidance_scale: body.guidance,
      num_inference_steps: body.steps,
      seed: body.seed ?? undefined,
    },
    options: { wait_for_model: true },
  };
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${HF_TOKEN}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const t = await r.text().catch(()=>"");
    throw new Error(`HF Inference error ${r.status}: ${t}`);
  }
  // Some models return an array of image bytes; some return single
  const ct = r.headers.get("content-type") || "";
  if (ct.startsWith("image/")) {
    const buf = Buffer.from(await r.arrayBuffer());
    return [`data:${ct};base64,${buf.toString("base64")}`];
  }
  const j = await r.json();
  if (Array.isArray(j) && j[0]?.blob) {
    const b64 = j[0].blob; // depends on model/server
    return [`data:image/png;base64,${b64}`];
  }
  throw new Error("HF Inference response did not contain image bytes.");
}
