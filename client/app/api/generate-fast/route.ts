import { NextResponse } from "next/server";
import { proxyGenerate, type GenReq } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const b = (await req.json()) as Partial<GenReq>;
    const images = await proxyGenerate({
      prompt: b.prompt || "",
      negativePrompt: b.negativePrompt || "",
      width: b.width ?? 768,
      height: b.height ?? 768,
      steps: b.steps ?? 12,
      guidance: b.guidance ?? 3.5,
      seed: b.seed ?? null,
      mode: "preview",
    });
    return NextResponse.json({ images });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Generate failed" }, { status: 500 });
  }
}
