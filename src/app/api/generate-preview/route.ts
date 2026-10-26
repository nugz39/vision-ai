import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type PreviewMode = "image" | "video" | "remix";

const PreviewSchema = z.object({
  mode: z.enum(["image", "video", "remix"]).default("image"),
  prompt: z.string().trim().min(1).max(2000),
  width: z.number().int().min(256).max(1536).optional(),
  height: z.number().int().min(256).max(1536).optional(),
});

const BACKEND_BASE =
  process.env.VISION_AI_BACKEND_BASE ??
  process.env.VISION_AI_HF_BASE ??
  "https://Nugz39-vision-ai-backend.hf.space";

/**
 * For previews we hit your real backend:
 * - image / remix -> /generate
 * - video         -> /generate_video
 */
function getPreviewUrl(mode: PreviewMode): string {
  if (mode === "video") {
    return (
      process.env.VISION_AI_VIDEO_API ??
      `${BACKEND_BASE}/generate_video`
    );
  }

  // image + remix share the same text->image endpoint for now
  return (
    process.env.VISION_AI_GENERATE_API ??
    `${BACKEND_BASE}/generate`
  );
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = PreviewSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid prompt and generation settings." }, { status: 400 });
  }
  const body = parsed.data;
  const mode: PreviewMode = body.mode;
  const url = getPreviewUrl(mode);

  // Build a "preview-safe" payload – smaller + faster
  const payload: Record<string, unknown> = {
    prompt: body.prompt ?? "",
    width: body.width ?? 768,
    height: body.height ?? 768,
    num_inference_steps: 16,
    guidance_scale: 4.5,
  };

  try {
    const backendResp = await fetch(url, {
      signal: AbortSignal.timeout(90000),
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-vision-mode": mode,
      },
      body: JSON.stringify(payload),
    });

    const contentType = backendResp.headers.get("content-type") ?? "";
    if (!backendResp.ok) {
      console.error("[VISION AI] Preview backend returned", backendResp.status);
      return NextResponse.json({ error: "Generation service is unavailable. Please try again." }, { status: 502 });
    }

    // Most common: backend returns raw image / webp bytes
    if (contentType.startsWith("image/") || contentType.startsWith("video/")) {
      const buf = Buffer.from(await backendResp.arrayBuffer());
      return new NextResponse(buf, {
        status: backendResp.status,
        headers: {
          "content-type": contentType,
        },
      });
    }

    // JSON payload (if you ever change the backend to return metadata)
    if (contentType.includes("application/json")) {
      const data = await backendResp.json();
      return NextResponse.json(data, { status: backendResp.status });
    }

    return NextResponse.json({ error: "Generation service returned an unsupported format." }, { status: 502 });
  } catch (err) {
    console.error("[VISION AI] /api/generate-preview error:", err);
    return NextResponse.json(
      {
        error: "Preview generation failed. Please try again.",
      },
      { status: 502 }
    );
  }
}