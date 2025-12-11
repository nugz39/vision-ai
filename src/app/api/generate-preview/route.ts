import { NextRequest, NextResponse } from "next/server";

type PreviewMode = "image" | "video" | "remix";

interface PreviewRequestBody {
  mode?: PreviewMode;
  prompt?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

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
      ${BACKEND_BASE}/generate_video
    );
  }

  // image + remix share the same text->image endpoint for now
  return (
    process.env.VISION_AI_GENERATE_API ??
    ${BACKEND_BASE}/generate
  );
}

export async function POST(req: NextRequest) {
  let body: PreviewRequestBody;

  try {
    body = (await req.json()) as PreviewRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const mode = (body.mode ?? "image") as PreviewMode;
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
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-vision-mode": mode,
      },
      body: JSON.stringify(payload),
    });

    const contentType = backendResp.headers.get("content-type") ?? "";

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

    // Fallback: raw proxy
    const buf = Buffer.from(await backendResp.arrayBuffer());
    return new NextResponse(buf, {
      status: backendResp.status,
      headers: {
        "content-type": contentType || "application/octet-stream",
      },
    });
  } catch (err) {
    console.error("[VISION AI] /api/generate-preview error:", err);
    return NextResponse.json(
      {
        error: "Preview generation error",
        details:
          err instanceof Error ? err.message : "Unknown error calling backend",
      },
      { status: 502 }
    );
  }
}