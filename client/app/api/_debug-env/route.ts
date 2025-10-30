// client/app/api/_debug-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const raw = process.env.VISION_AI_HF_BASE || "";
  const isSpace = /\.hf\.space$/i.test(raw);
  const base = raw.replace(/\/+$/,"");
  const target = isSpace ? `${base}/generate` : "(inference-api mode)";

  return NextResponse.json({
    VISION_AI_HF_BASE: raw ? "(set)" : "(missing)",
    isSpace,
    target_url: target,
    has_token: !!process.env.HF_INFERENCE_TOKEN,
    model: process.env.VISION_AI_HF_MODEL || "(default: FLUX.1-schnell)",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "(unset)",
  });
}
