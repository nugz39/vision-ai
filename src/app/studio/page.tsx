"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useStudioQueryPrefill } from "@/hooks/useStudioQueryPrefill";

type Mode = "image" | "video" | "remix";

type Toast = { show: boolean; msg: string };

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function StudioPage() {
  // ---- local "auth" (non-invasive placeholder; easy to swap later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasStudioAccess, setHasStudioAccess] = useState(false);

  useEffect(() => {
    try {
      const li = localStorage.getItem("nb_logged_in") === "true";
      const sa = localStorage.getItem("nb_studio_access") === "true";
      setIsLoggedIn(li);
      setHasStudioAccess(li && sa);
    } catch {
      // ignore
    }
  }, []);

  // ---- studio state
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>("nova");
  const [aspect, setAspect] = useState<string>("4:5");
  const [seed, setSeed] = useState<number>(20251201);

  const [toast, setToast] = useState<Toast>({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    window.setTimeout(() => setToast({ show: false, msg: "" }), 2200);
  };

  // ---- Prefill from URL query (Nova page links here)
  useStudioQueryPrefill({
    setMode: (m) => setMode(m),
    setPrompt: (p) => setPrompt(p),
    setSelectedCharacterId: (id) => setSelectedCharacterId(id),
    setAspect: (a) => setAspect(a),
    setSeed: (n) => setSeed(n),
  });

  const canGenerate = prompt.trim().length > 0;

  const characterOptions = useMemo(
    () => [
      { id: "nova", label: "Nova" },
      { id: "luxe", label: "Luxe" },
      { id: "cipher", label: "Cipher" },
      { id: "aria", label: "Aria" },
      { id: "vega", label: "Vega" },
      { id: "ember", label: "Ember" },
      { id: "onyx", label: "Onyx" },
      { id: "seraph", label: "Seraph" },
      { id: "dahlia", label: "Dahlia" },
      { id: "nyx", label: "Nyx" },
      { id: "solaris", label: "Solaris" },
      { id: "faye", label: "Faye" },
      { id: "riven", label: "Riven" },
      { id: "astra", label: "Astra" },
      { id: "echo", label: "Echo" },
      { id: "marrow", label: "Marrow" },
    ],
    []
  );

  // Keep the watermark position consistent by leaving layout alone (BrandWatermark is global)
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-xs font-semibold text-[#F4ECFF] shadow-[0_0_30px_rgba(255,59,255,0.18)] backdrop-blur">
          {toast.msg}
        </div>
      )}

      {/* Locked State */}
      {!isLoggedIn || !hasStudioAccess ? (
        <section className="mx-auto max-w-2xl rounded-3xl border border-[#c56bfb]/40 bg-gradient-to-b from-[#0A0013] to-[#120021] p-8 text-center shadow-[0_0_70px_rgba(255,59,255,0.12)]">
          <h1 className="text-3xl font-semibold tracking-tight text-[#F4ECFF] md:text-4xl">
            Unlock NaughtyBotty Studio
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#C4B3D9]">
            Start a free 3-day Studio trial or upgrade your plan to generate images and videos.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#c56bfb]/50 bg-white/5 px-6 text-sm font-semibold text-[#F4ECFF] hover:bg-white/10"
            >
              View Pricing
            </Link>
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,59,255,0.22)] hover:brightness-110"
            >
              Login / Create account
            </Link>
          </div>

          <div className="mt-6 text-xs text-[#C4B3D9]">
            Studio presets from character pages will auto-fill once you unlock access.
          </div>
        </section>
      ) : (
        <>
          {/* Header */}
          <section className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-[#F4ECFF] md:text-4xl">NaughtyBotty Studio</h1>
            <p className="mt-2 text-sm text-[#C4B3D9]">
              Synthetic-only. No real-person deepfakes. Generation hooks will connect to backend later.
            </p>
          </section>

          {/* Mode tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {([
              { k: "image", t: "Image" },
              { k: "video", t: "Video" },
              { k: "remix", t: "Remix" },
            ] as const).map((m) => {
              const active = mode === m.k;
              return (
                <button
                  key={m.k}
                  type="button"
                  onClick={() => setMode(m.k)}
                  className={clsx(
                    "h-10 rounded-full px-4 text-sm font-semibold transition",
                    active
                      ? "bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] text-white shadow-[0_0_20px_rgba(255,59,255,0.20)]"
                      : "border border-white/10 bg-white/5 text-[#F4ECFF] hover:bg-white/10"
                  )}
                >
                  {m.t}
                </button>
              );
            })}
          </div>

          {/* Workspace */}
          <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Left */}
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
              <div className="text-sm font-semibold text-[#F4ECFF]">Create a new scene</div>

              {/* Prompt */}
              <label className="mt-4 block text-xs font-semibold text-[#C4B3D9]">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === "video"
                    ? "Describe the scene and motion…"
                    : mode === "remix"
                      ? "Describe how you want to remix the base image…"
                      : "Describe the scene…"
                }
                className="mt-2 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-[#F4ECFF] outline-none placeholder:text-[#C4B3D9]/60 focus:border-[#c56bfb]/50"
              />

              {/* Mode-specific controls */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs font-semibold text-[#C4B3D9]">Character</div>
                  <select
                    value={selectedCharacterId}
                    onChange={(e) => setSelectedCharacterId(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                  >
                    {characterOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs font-semibold text-[#C4B3D9]">Aspect ratio</div>
                  <select
                    value={aspect}
                    onChange={(e) => setAspect(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                  >
                    <option value="4:5">4:5 (portrait)</option>
                    <option value="16:9">16:9 (landscape)</option>
                    <option value="1:1">1:1 (square)</option>
                  </select>
                </div>
              </div>

              {/* Remix / Video extras */}
              {mode === "video" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="text-xs font-semibold text-[#C4B3D9]">Duration</div>
                    <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none">
                      <option>3s</option>
                      <option>5s</option>
                      <option>8s</option>
                    </select>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <div className="text-xs font-semibold text-[#C4B3D9]">Model</div>
                    <select className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none">
                      <option>Studio v1 (placeholder)</option>
                      <option>Studio v2 (placeholder)</option>
                    </select>
                  </div>
                </div>
              )}

              {mode === "remix" && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs font-semibold text-[#C4B3D9]">Strength</div>
                  <input type="range" min={0} max={100} defaultValue={60} className="mt-3 w-full" />
                  <div className="mt-2 text-xs text-[#C4B3D9]">0 = subtle, 100 = full transformation (placeholder)</div>
                </div>
              )}

              {/* Seed */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="text-xs font-semibold text-[#C4B3D9]">Seed</div>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value || 0))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                />
              </div>

              {/* Generate */}
              <button
                type="button"
                disabled={!canGenerate}
                onClick={() => showToast("Generation will be wired to the backend later.")}
                className={clsx(
                  "mt-5 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition",
                  canGenerate
                    ? "bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] shadow-[0_0_30px_rgba(255,59,255,0.22)] hover:brightness-110"
                    : "cursor-not-allowed bg-white/10 text-white/50"
                )}
              >
                {mode === "video" ? "Generate Video" : mode === "remix" ? "Generate Remix" : "Generate"}
              </button>
            </div>

            {/* Right Panels */}
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
              <div className="text-sm font-semibold text-[#F4ECFF]">Controls</div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="text-xs font-semibold text-[#C4B3D9]">Style</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Realistic", "Stylised", "Anime", "Neon", "Cyber", "Ethereal"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => showToast(`Style "${t}" selected (placeholder).`)}
                      className="h-9 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold text-[#F4ECFF] hover:bg-white/10"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="text-xs font-semibold text-[#C4B3D9]">Background presets</div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {["Neon Rooftop", "Holo Lounge", "City Alley", "Digital Skyline"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => showToast(`Background "${t}" selected (placeholder).`)}
                      className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left text-xs font-semibold text-[#F4ECFF] hover:bg-white/10"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="text-xs font-semibold text-[#C4B3D9]">History</div>
                <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-[#C4B3D9]">
                  Placeholder history panel (will show generated items later).
                </div>
              </div>

              <div className="mt-4 text-xs text-[#C4B3D9]">
                Tip: Nova preset links will prefill prompt, aspect, seed, and mode automatically.
              </div>

              <div className="mt-4">
                <Link
                  href="/characters/nova"
                  className="inline-flex h-10 w-full items-center justify-center rounded-full border border-[#c56bfb]/50 bg-white/5 text-xs font-semibold text-[#F4ECFF] hover:bg-white/10"
                >
                  Back to Nova Profile
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
