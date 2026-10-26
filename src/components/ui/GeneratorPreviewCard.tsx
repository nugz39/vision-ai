"use client";

import * as React from "react";
import Link from "next/link";
import ModeTabs from "@/components/ui/ModeTabs";
import BluePurpleButton from "@/components/ui/BluePurpleButton";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type PreviewMode = "image" | "video" | "remix";

type Props = {
  className?: string;
};

export default function GeneratorPreviewCard({ className }: Props) {
  const [mode, setMode] = React.useState<PreviewMode>("image");
  const [prompt, setPrompt] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [resultUrl, setResultUrl] = React.useState<string | null>(null);
  const [resultType, setResultType] = React.useState<"image" | "video">("image");
  const resultObjectUrl = React.useRef<string | null>(null);

  React.useEffect(() => () => { if (resultObjectUrl.current) URL.revokeObjectURL(resultObjectUrl.current); }, []);

  const modeLabel = mode === "image" ? "Text → Image" : mode === "video" ? "Text → Video" : "Remix";
  const trimmed = prompt.trim();

  async function onGenerate() {
    setError(null);
    if (!trimmed) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    if (resultObjectUrl.current) URL.revokeObjectURL(resultObjectUrl.current);
    resultObjectUrl.current = null;
    setResultUrl(null);

    try {
      const res = await fetch("/api/generate-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, prompt: trimmed }),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        const message = contentType.includes("application/json")
          ? (await res.json().catch(() => null))?.error
          : null;
        throw new Error(typeof message === "string" ? message : "Generation failed");
      }
      if (contentType.startsWith("image/") || contentType.startsWith("video/")) {
        const blob = await res.blob();
        if (!blob.size) throw new Error("Empty generation response");
        const objectUrl = URL.createObjectURL(blob);
        resultObjectUrl.current = objectUrl;
        setResultType(contentType.startsWith("video/") ? "video" : "image");
        setResultUrl(objectUrl);
      } else if (contentType.includes("application/json")) {
        const data = await res.json() as { imageUrl?: string; videoUrl?: string; error?: string; ok?: boolean };
        if (data.ok === false || data.error) throw new Error(data.error || "Generation failed");
        const url = data.videoUrl || data.imageUrl;
        if (!url || !/^https:\/\//i.test(url)) throw new Error("Backend did not return a usable media URL");
        setResultType(data.videoUrl ? "video" : "image");
        setResultUrl(url);
      } else {
        throw new Error("Unsupported generation response");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const studioHref = `/studio?mode=${mode}${trimmed ? `&prompt=${encodeURIComponent(trimmed)}` : ""}&autogen=1`;

  return (
    <div className={cn("mx-auto w-full max-w-6xl", className)}>
      <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-sm">
        {/* pastel wash behind card (no left purple line) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,242,255,0.10),rgba(201,49,253,0.07),rgba(132,44,254,0.07))]" />
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#13DFFF]/14 blur-3xl" />
          <div className="absolute -right-28 -bottom-28 h-72 w-72 rounded-full bg-[#C931FD]/12 blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <ModeTabs
              value={mode}
              onChange={setMode}
              options={[
                { value: "image", label: "Text → Image" },
                { value: "video", label: "Text → Video" },
                { value: "remix", label: "Remix" },
              ]}
            />

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">Prompt</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to generate…"
                className="mt-3 w-full rounded-2xl border border-black/10 bg-white/85 p-4 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-black/10 focus:ring-4 focus:ring-[#842CFE]/10"
                rows={4}
              />
              <div className="mt-2 text-xs text-black/50">
                Tip: be specific about subject, lighting, composition, and style.
              </div>
              {error ? <div className="mt-2 text-xs font-semibold text-[#842CFE]">{error}</div> : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs font-semibold text-black/55">Mode: {modeLabel}</div>
              <BluePurpleButton type="button" onClick={onGenerate} loading={loading}>
                Generate
              </BluePurpleButton>
            </div>

            <div className="mt-2 overflow-hidden rounded-2xl border border-black/5 bg-white/70 shadow-sm">
              <div className="aspect-[16/9] w-full bg-black/[0.02]">
                {loading ? (
                  <div className="h-full w-full animate-pulse bg-[linear-gradient(90deg,rgba(19,223,255,0.08),rgba(201,49,253,0.06),rgba(132,44,254,0.06))]" />
                ) : resultUrl ? (
                  resultType === "video" ? (
                    <video src={resultUrl} controls playsInline className="h-full w-full object-contain" />
                  ) : (
                    <img src={resultUrl} alt="Generated preview output" className="h-full w-full object-contain" />
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-black/45">
                    Your preview will appear here
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-black/55">
                  Like this look? Open Studio to generate it there and refine/export.
                </div>
                <Link
                  href={studioHref}
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:shadow-md"
                >
                  Open in Studio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
