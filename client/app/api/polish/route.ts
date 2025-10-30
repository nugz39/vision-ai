import { NextResponse } from "next/server";
import { proxyGenerate, type GenReq } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const b = (await req.json()) as Partial<GenReq>;
    const images = await proxyGenerate({
      prompt: b.prompt || "",
      negativePrompt: b.negativePrompt || "",
      width: b.width ?? 1024,
      height: b.height ?? 1024,
      steps: b.steps ?? 30,
      guidance: b.guidance ?? 6.5,
      seed: b.seed ?? null,
      mode: "polish",
    });
    return NextResponse.json({ images });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Polish failed" }, { status: 500 });
  }
}
