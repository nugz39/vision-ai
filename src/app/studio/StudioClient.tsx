"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import BluePurpleButton from "@/components/ui/BluePurpleButton";

type Mode = "image" | "video" | "remix";

const IMAGE_STYLES = ["Minimal", "Neon", "Cinematic", "Product", "Editorial", "Anime", "3D", "Abstract", "Vintage"];
const VIDEO_STYLES = ["Minimal", "Neon", "Cinematic", "Editorial", "Anime Motion", "3D Motion", "Abstract Motion"];
const REMIX_STYLES = [
  "Clean commercial grade",
  "Cyberpunk / neon grade",
  "Soft pastel grade",
  "High-contrast fashion",
  "Film emulation (Kodak-style)",
  "Black & white / mono",
  "VHS / analog",
  "Grainy indie film",
  "Warm sunset grade",
  "Cool studio grade",
  "High-key beauty",
  "Moody low-key",
];

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Tab({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full px-3 py-2 text-[12px] font-semibold transition-all",
        active ? "text-white" : "text-[#AFC2D7] hover:text-white"
      )}
      style={{
        border: "1px solid rgba(151,183,228,0.18)",
        background: active
          ? "linear-gradient(120deg,rgba(0,242,255,0.20),rgba(203,47,255,0.16),rgba(123,44,255,0.14))"
          : "rgba(255,255,255,0.80)",
        boxShadow: active ? "0 10px 24px rgba(2,6,23,0.08)" : undefined,
      }}
    >
      {children}
    </button>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all",
        active ? "text-white" : "text-[#AFC2D7] hover:text-white"
      )}
      style={{
        border: active ? "1px solid rgba(61,151,220,0.45)" : "1px solid rgba(151,183,228,0.18)",
        background: active ? "rgba(0,242,255,0.10)" : "rgba(255,255,255,0.80)",
      }}
    >
      {children}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#AFC2D7]">{children}</div>;
}

function aspectToWH(aspect: "1:1" | "4:5" | "16:9" | "9:16") {
  // stay within your API allowlist (256–1536)
  switch (aspect) {
    case "1:1":
      return { width: 1024, height: 1024 };
    case "16:9":
      return { width: 1280, height: 720 };
    case "9:16":
      return { width: 720, height: 1280 };
    default:
      return { width: 768, height: 960 }; // 4:5
  }
}

export default function StudioClient() {
  const sp = useSearchParams();
  const { isLoggedIn } = useAuth();

  const initialMode = (sp.get("mode") as Mode) || "image";
  const safeMode: Mode = (["image", "video", "remix"] as const).includes(initialMode as any) ? initialMode : "image";

  const [mode, setMode] = useState<Mode>(safeMode);
  const [prompt, setPrompt] = useState(
    sp.get("prompt")
      ? decodeURIComponent(sp.get("prompt") as string)
      : "Premium product photo, clean studio lighting, pastel wash background, high detail."
  );

  const styles = useMemo(
    () => (mode === "video" ? VIDEO_STYLES : mode === "remix" ? REMIX_STYLES : IMAGE_STYLES),
    [mode]
  );
  const [style, setStyle] = useState<string>("Neon");

  const [quality, setQuality] = useState<"Fast" | "Standard" | "Ultra">("Standard");
  const [aspect, setAspect] = useState<"1:1" | "4:5" | "16:9" | "9:16">("4:5");

  // Image-only
  const [seed, setSeed] = useState<string>("");

  // Video-only
  const [duration, setDuration] = useState<number>(5);
  const [motion, setMotion] = useState<number>(55);
  const [keyframeIntensity, setKeyframeIntensity] = useState<number>(60);

  // Remix-only (front-end only for now)
  const [uploadName, setUploadName] = useState<string>("");
  const [strength, setStrength] = useState<number>(55);

  // Output
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [outputType, setOutputType] = useState<"image" | "video">("image");
  const objectUrlRef = useRef<string | null>(null);
  useEffect(() => () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); }, []);

  const canGenerate = useMemo(() => {
    if (mode === "remix") return uploadName.length > 0 || prompt.trim().length > 0;
    return prompt.trim().length > 0;
  }, [mode, prompt, uploadName]);

  async function onGenerate() {
    setGenError(null);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setOutputUrl(null);

    // validate
    if (mode !== "remix" && prompt.trim().length === 0) {
      setGenError("Please enter a prompt.");
      return;
    }
    if (mode === "remix" && uploadName.length === 0 && prompt.trim().length === 0) {
      setGenError("Upload an image or enter an optional prompt for Remix.");
      return;
    }

    setGenLoading(true);

    try {
      const { width, height } = aspectToWH(aspect);

      const body: any = {
        mode,
        prompt: prompt.trim() || "Remix with a premium cinematic grade.",
        style,
        quality,
        aspectRatio: aspect,
        width,
        height,
      };

      // optional knobs
      const s = seed.trim();
      if (mode === "image" && s && /^\d+$/.test(s)) body.seed = Number(s);

      // Keep these in payload now (backend can ignore for video/remix)
      if (mode === "video") {
        body.duration = duration;
        body.motion = motion;
        body.keyframeIntensity = keyframeIntensity;
      }
      if (mode === "remix") {
        body.strength = strength;
        body.uploadName = uploadName; // placeholder metadata only
      }

      const res = await fetch("/api/generate-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const contentType = res.headers.get("content-type") || "";
      if (!res.ok) {
        const data = contentType.includes("application/json") ? await res.json().catch(() => null) : null;
        throw new Error(typeof data?.error === "string" ? data.error : "Generation failed");
      }
      if (contentType.startsWith("image/") || contentType.startsWith("video/")) {
        const blob = await res.blob();
        if (!blob.size) throw new Error("Empty generation response");
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setOutputType(contentType.startsWith("video/") ? "video" : "image");
        setOutputUrl(url);
      } else if (contentType.includes("application/json")) {
        const data = await res.json() as { imageUrl?: string; videoUrl?: string; error?: string; ok?: boolean };
        if (data.ok === false || data.error) throw new Error(data.error || "Generation failed");
        const url = data.videoUrl || data.imageUrl;
        if (!url || !/^https:\/\//i.test(url)) throw new Error("No usable media returned");
        setOutputType(data.videoUrl ? "video" : "image");
        setOutputUrl(url);
      } else {
        throw new Error("Unsupported generation response");
      }
    } catch (e: any) {
      setGenError(e?.message || "Something went wrong. Please try again.");
    } finally {
      setGenLoading(false);
    }
  }

  // Autogenerate when coming from homepage preview (?autogen=1)
  const didAuto = useRef(false);
  useEffect(() => {
    const autogen = sp.get("autogen");
    if (autogen === "1" && !didAuto.current) {
      didAuto.current = true;
      // allow first paint so UI is stable
      setTimeout(() => {
        onGenerate();
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#AFC2D7]">Studio</div>
          <div className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">Create without limits</div>
          <div className="mt-2 text-sm text-[#AFC2D7]">Bring your vision to life with precise creative controls.</div>
        </div>

        {isLoggedIn ? (
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full border bg-[#101F32] px-3 py-2 text-[12px] font-semibold text-[#AFC2D7]"
              style={{ borderColor: "rgba(151,183,228,0.18)" }}
            >
              Account status unavailable
            </span>
            <span
              className="rounded-full border bg-[#101F32] px-3 py-2 text-[12px] font-semibold text-[#AFC2D7]"
              style={{ borderColor: "rgba(151,183,228,0.18)" }}
            >
              Credit balance unavailable
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        <Tab active={mode === "image"} onClick={() => setMode("image")}>Image</Tab>
        <Tab active={mode === "video"} onClick={() => setMode("video")}>Video</Tab>
        <Tab active={mode === "remix"} onClick={() => setMode("remix")}>Remix</Tab>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-12">
        {/* Controls */}
        <div className="lg:col-span-7">
          <div
            className="rounded-[1.7rem] border bg-[#101F32] p-6 backdrop-blur-md"
            style={{
              borderColor: "rgba(151,183,228,0.18)",
              boxShadow:
                "0 18px 55px rgba(151,183,228,0.18), 0 0 22px rgba(0,242,255,0.12), 0 0 22px rgba(203,47,255,0.10)",
            }}
          >
            {/* Prompt / Upload */}
            {mode === "remix" ? (
              <>
                <Label>Image upload</Label>
                <label
                  className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border bg-[#0A1728] text-white placeholder:text-[#7F94AD] px-4 py-8 text-center"
                  style={{ borderColor: "rgba(151,183,228,0.18)" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setUploadName(e.target.files?.[0]?.name || "")}
                  />
                  <div className="text-sm font-semibold text-white">Drop an image or click to upload</div>
                  <div className="mt-1 text-[12px] text-[#AFC2D7]">PNG/JPG • front-end only for now</div>
                  {uploadName ? <div className="mt-3 text-[12px] font-semibold text-white">{uploadName}</div> : null}
                </label>

                <div className="mt-5">
                  <Label>Prompt (optional)</Label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    className="mt-2 w-full resize-none rounded-2xl border bg-[#0A1728] text-white placeholder:text-[#7F94AD] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(61,151,220,0.45)]"
                    style={{ borderColor: "rgba(151,183,228,0.18)" }}
                    placeholder="Optional: describe the new look…"
                  />
                </div>
              </>
            ) : (
              <>
                <Label>Prompt</Label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={5}
                  className="mt-2 w-full resize-none rounded-2xl border bg-[#0A1728] text-white placeholder:text-[#7F94AD] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(61,151,220,0.45)]"
                  style={{ borderColor: "rgba(151,183,228,0.18)" }}
                  placeholder={mode === "video" ? "Describe the scene + motion…" : "Describe the visual you want…"}
                />
              </>
            )}

            {/* Styles */}
            <div className="mt-6">
              <Label>Styles</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {styles.map((s) => (
                  <Chip key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Chip>
                ))}
              </div>
            </div>

            {/* Mode-specific controls */}
            {mode === "image" ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <Label>Quality</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["Fast","Standard","Ultra"] as const).map((q) => (
                      <Chip key={q} active={quality === q} onClick={() => setQuality(q)}>
                        {q === "Ultra" ? "Ultra (Studio)" : q}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Aspect ratio</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["1:1","4:5","16:9","9:16"] as const).map((a) => (
                      <Chip key={a} active={aspect === a} onClick={() => setAspect(a)}>{a}</Chip>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label>Seed</Label>
                  <input
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="mt-2 w-full rounded-2xl border bg-[#0A1728] text-white placeholder:text-[#7F94AD] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(61,151,220,0.45)]"
                    style={{ borderColor: "rgba(151,183,228,0.18)" }}
                    placeholder="Optional numeric seed (e.g. 12345)"
                  />
                </div>
              </div>
            ) : null}

            {mode === "video" ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <Label>Duration (seconds)</Label>
                  <input
                    type="number"
                    min={3}
                    max={10}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value || 5))}
                    className="mt-2 w-full rounded-2xl border bg-[#0A1728] text-white placeholder:text-[#7F94AD] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(61,151,220,0.45)]"
                    style={{ borderColor: "rgba(151,183,228,0.18)" }}
                  />
                </div>
                <div>
                  <Label>Aspect ratio</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["1:1","4:5","16:9","9:16"] as const).map((a) => (
                      <Chip key={a} active={aspect === a} onClick={() => setAspect(a)}>{a}</Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Motion strength</Label>
                  <input type="range" min={0} max={100} value={motion} onChange={(e) => setMotion(Number(e.target.value))} className="mt-3 w-full" />
                  <div className="mt-1 text-[12px] text-[#AFC2D7]">{motion}%</div>
                </div>
                <div>
                  <Label>Keyframe intensity</Label>
                  <input type="range" min={0} max={100} value={keyframeIntensity} onChange={(e) => setKeyframeIntensity(Number(e.target.value))} className="mt-3 w-full" />
                  <div className="mt-1 text-[12px] text-[#AFC2D7]">{keyframeIntensity}%</div>
                </div>
              </div>
            ) : null}

            {mode === "remix" ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label>Strength</Label>
                  <input type="range" min={0} max={100} value={strength} onChange={(e) => setStrength(Number(e.target.value))} className="mt-3 w-full" />
                  <div className="mt-1 text-[12px] text-[#AFC2D7]">{strength}%</div>
                </div>
              </div>
            ) : null}

            {/* Generate */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs font-semibold text-[#AFC2D7]">
                {genError ? <span className="text-[#842CFE]">{genError}</span> : "Ready when you are."}
              </div>
              <BluePurpleButton type="button" onClick={onGenerate} loading={genLoading} disabled={!canGenerate}>
                Generate
              </BluePurpleButton>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-5">
          <div
            className="relative overflow-hidden rounded-[1.7rem] border bg-[#101F32] p-4 backdrop-blur-md"
            style={{
              borderColor: "rgba(151,183,228,0.18)",
              boxShadow:
                "0 18px 55px rgba(151,183,228,0.18), 0 0 22px rgba(0,242,255,0.10), 0 0 22px rgba(203,47,255,0.08)",
            }}
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 bg-[#0A1728]">
              {genLoading ? (
                <div className="h-full w-full animate-pulse bg-[linear-gradient(90deg,rgba(19,223,255,0.08),rgba(201,49,253,0.06),rgba(132,44,254,0.06))]" />
              ) : outputUrl ? (
                outputType === "video" ? (
                  <video src={outputUrl} controls playsInline className="h-full w-full object-contain" />
                ) : (
                  <img src={outputUrl} alt="Generated Studio output" className="h-full w-full object-contain" />
                )
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-[#AFC2D7]">
                  Output will appear here
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <div className="text-xs font-semibold text-[#AFC2D7]">Mode: {mode.toUpperCase()} • Style: {style}</div>
              <div className="text-xs text-[#AFC2D7]">{aspect} • {quality}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
