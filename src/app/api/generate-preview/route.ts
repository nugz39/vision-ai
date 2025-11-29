import { NextRequest } from "next/server";
import { z } from "zod";
import { hfGenerateImage } from "@/lib/hfRouter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BodySchema = z.object({
  mode: z.enum(["image", "video", "remix"]).default("image"),
  prompt: z.string().min(1, "Prompt is required").max(2000, "Prompt too long"),

  // optional knobs
  width: z.number().int().min(256).max(1536).optional(),
  height: z.number().int().min(256).max(1536).optional(),
  num_inference_steps: z.number().int().min(1).max(80).optional(),
  guidance_scale: z.number().min(0).max(30).optional(),
  seed: z.number().int().min(0).max(2147483647).optional(),
  negative_prompt: z.string().max(2000).optional(),

  // UI metadata (safe to ignore on backend for now)
  style: z.string().max(80).optional(),
  quality: z.string().max(40).optional(),
  aspectRatio: z.string().max(16).optional(),
});

function bytesToDataUrl(bytes: Uint8Array, contentType?: string) {
  const ct = contentType || "image/png";
  const b64 = Buffer.from(bytes).toString("base64");
  return `data:${ct};base64,${b64}`;
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);

    if (!parsed.success) {
      return Response.json(
        { ok: false, error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }

    const {
      mode,
      prompt,
      width = 768,
      height = 960,
      num_inference_steps = 30,
      guidance_scale = 7.5,
      seed,
      negative_prompt,
    } = parsed.data;

    // Placeholder for Video/Remix until wired
    if (mode !== "image") {
      const fallback =
        mode === "video" ? "/assets/gallery/prompt-02.png" : "/assets/gallery/prompt-03.png";
      return Response.json({ ok: true, imageUrl: fallback }, { status: 200 });
    }

    const payload: any = {
      inputs: prompt,
      parameters: {
        width,
        height,
        num_inference_steps,
        guidance_scale,
      },
    };

    if (typeof seed === "number") payload.parameters.seed = seed;
    if (typeof negative_prompt === "string" && negative_prompt.trim().length > 0) {
      payload.parameters.negative_prompt = negative_prompt.trim();
    }

    const { bytes, contentType } = await hfGenerateImage(payload);
    const imageUrl = bytesToDataUrl(bytes, contentType);

    return Response.json({ ok: true, imageUrl }, { status: 200 });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: e?.message ?? "Generation failed" },
      { status: 500 }
    );
  }
}
