"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useStudioQueryPrefill } from "@/hooks/useStudioQueryPrefill";

type Mode = "image" | "video" | "remix";

type GenResult = {
  id: string;
  mode: Mode;
  prompt: string;
  character?: string;
  aspect?: string;
  seed?: number | null;
  url?: string | null; // blob URL
  createdAt?: string;
  error?: string;
};

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function aspectToSize(aspect: string) {
  switch (aspect) {
    case "16:9":
      return { width: 1024, height: 576 };
    case "1:1":
      return { width: 768, height: 768 };
    case "4:5":
    default:
      return { width: 768, height: 960 };
  }
}

export default function StudioClient() {
  // ---- local "auth"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasStudioAccess, setHasStudioAccess] = useState(false);

  useEffect(() => {
    try {
      const li = localStorage.getItem("nb_logged_in") === "true";
      const sa = localStorage.getItem("nb_studio_access") === "true";
      setIsLoggedIn(li);
      setHasStudioAccess(li && sa);
    } catch {}
  }, []);

  // ---- studio state
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>("nova");
  const [aspect, setAspect] = useState<string>("4:5");
  const [seed, setSeed] = useState<number>(20251201);

  const [steps, setSteps] = useState<number>(30);
  const [guidance, setGuidance] = useState<number>(7.5);

  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenResult[]>([]);
  const [active, setActive] = useState<GenResult | null>(null);

  const canGenerate = prompt.trim().length > 0 && !isGenerating;

  // ---- Prefill from URL query (uses useSearchParams internally)
  useStudioQueryPrefill({
    setMode: (m) => setMode(m),
    setPrompt: (p) => setPrompt(p),
    setSelectedCharacterId: (id) => setSelectedCharacterId(id),
    setAspect: (a) => setAspect(a),
    setSeed: (n) => setSeed(n),
  });

  // clean up blob URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      for (const r of results) {
        if (r.url?.startsWith("blob:")) URL.revokeObjectURL(r.url);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  async function onGenerate() {
    if (!canGenerate) return;

    if (mode !== "image") {
      const fail: GenResult = {
        id: `err_${Date.now()}`,
        mode,
        prompt,
        character: selectedCharacterId,
        aspect,
        seed,
        error: "This backend endpoint currently supports Image generation only.",
        createdAt: new Date().toISOString(),
      };
      setResults((prev) => [fail, ...prev]);
      setActive(fail);
      return;
    }

    setIsGenerating(true);
    try {
      const { width, height } = aspectToSize(aspect);

      const r = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          width,
          height,
          num_inference_steps: steps,
          guidance_scale: guidance,
          seed,
        }),
      });

      const ct = r.headers.get("content-type") || "";

      if (!r.ok && ct.includes("application/json")) {
        const data = await r.json().catch(() => ({}));
        const errMsg = data?.error || data?.message || `Generate failed (${r.status})`;
        const fail: GenResult = {
          id: `err_${Date.now()}`,
          mode,
          prompt,
          character: selectedCharacterId,
          aspect,
          seed,
          error: errMsg,
          createdAt: new Date().toISOString(),
        };
        setResults((prev) => [fail, ...prev]);
        setActive(fail);
        return;
      }

      if (!r.ok) {
        const fail: GenResult = {
          id: `err_${Date.now()}`,
          mode,
          prompt,
          character: selectedCharacterId,
          aspect,
          seed,
          error: `Generate failed (${r.status})`,
          createdAt: new Date().toISOString(),
        };
        setResults((prev) => [fail, ...prev]);
        setActive(fail);
        return;
      }

      if (ct.startsWith("image/") || ct.includes("octet-stream")) {
        const bytes = await r.arrayBuffer();
        const blob = new Blob([bytes], { type: ct.startsWith("image/") ? ct : "image/png" });
        const url = URL.createObjectURL(blob);

        const ok: GenResult = {
          id: `gen_${Date.now()}`,
          mode,
          prompt,
          character: selectedCharacterId,
          aspect,
          seed,
          url,
          createdAt: new Date().toISOString(),
        };

        setResults((prev) => [ok, ...prev]);
        setActive(ok);
        return;
      }

      const text = await r.text().catch(() => "");
      const fail: GenResult = {
        id: `err_${Date.now()}`,
        mode,
        prompt,
        character: selectedCharacterId,
        aspect,
        seed,
        error: `Unexpected response (${ct || "no content-type"}): ${text.slice(0, 120)}`,
        createdAt: new Date().toISOString(),
      };
      setResults((prev) => [fail, ...prev]);
      setActive(fail);
    } catch (e: any) {
      const fail: GenResult = {
        id: `err_${Date.now()}`,
        mode,
        prompt,
        character: selectedCharacterId,
        aspect,
        seed,
        error: e?.message ?? "Network error",
        createdAt: new Date().toISOString(),
      };
      setResults((prev) => [fail, ...prev]);
      setActive(fail);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
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
              href="/login?next=/studio"
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
          <section className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-[#F4ECFF] md:text-4xl">
              NaughtyBotty Studio
            </h1>
            <p className="mt-2 text-sm text-[#C4B3D9]">Synthetic-only. No real-person deepfakes.</p>
          </section>

          <div className="mb-6 flex flex-wrap gap-2">
            {([
              { k: "image", t: "Image" },
              { k: "video", t: "Video" },
              { k: "remix", t: "Remix" },
            ] as const).map((m) => {
              const activeTab = mode === m.k;
              return (
                <button
                  key={m.k}
                  type="button"
                  onClick={() => setMode(m.k)}
                  className={clsx(
                    "h-10 rounded-full px-4 text-sm font-semibold transition",
                    activeTab
                      ? "bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] text-white shadow-[0_0_20px_rgba(255,59,255,0.20)]"
                      : "border border-white/10 bg-white/5 text-[#F4ECFF] hover:bg-white/10"
                  )}
                >
                  {m.t}
                </button>
              );
            })}
          </div>

          <section className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-3xl border border-white/10 bg-black/20 p-5 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
              <div className="text-sm font-semibold text-[#F4ECFF]">Create a new scene</div>

              <label className="mt-4 block text-xs font-semibold text-[#C4B3D9]">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={
                  mode === "video"
                    ? "Describe the scene and motion… (backend coming)"
                    : mode === "remix"
                      ? "Describe how you want to remix… (backend coming)"
                      : "Describe the scene…"
                }
                className="mt-2 min-h-[140px] w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-[#F4ECFF] outline-none placeholder:text-[#C4B3D9]/60 focus:border-[#c56bfb]/50"
              />

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

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs font-semibold text-[#C4B3D9]">Steps</div>
                  <input
                    type="number"
                    value={steps}
                    onChange={(e) => setSteps(Number(e.target.value || 1))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                  />
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <div className="text-xs font-semibold text-[#C4B3D9]">Guidance</div>
                  <input
                    type="number"
                    step="0.1"
                    value={guidance}
                    onChange={(e) => setGuidance(Number(e.target.value || 0))}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="text-xs font-semibold text-[#C4B3D9]">Seed</div>
                <input
                  type="number"
                  value={seed}
                  onChange={(e) => setSeed(Number(e.target.value || 0))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-[#F4ECFF] outline-none focus:border-[#c56bfb]/50"
                />
              </div>

              <button
                type="button"
                disabled={!canGenerate}
                onClick={onGenerate}
                className={clsx(
                  "mt-5 inline-flex h-11 w-full items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition",
                  canGenerate
                    ? "bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] shadow-[0_0_30px_rgba(255,59,255,0.22)] hover:brightness-110"
                    : "cursor-not-allowed bg-white/10 text-white/50"
                )}
              >
                {isGenerating ? "Generating…" : mode === "video" ? "Generate Video" : mode === "remix" ? "Generate Remix" : "Generate"}
              </button>

              {active?.error && (
                <div className="mt-4 rounded-2xl border border-[#ff3bff]/30 bg-[#ff3bff]/10 p-4 text-sm text-[#F4ECFF]">
                  {active.error}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
              <div className="text-sm font-semibold text-[#F4ECFF]">Preview</div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <div className="aspect-[4/5] w-full">
                  {active?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={active.url} alt="Generated" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#C4B3D9]">
                      {active ? "No preview (yet)." : "Generate to see output."}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-xs text-[#C4B3D9]">
                {active?.createdAt ? `Last: ${new Date(active.createdAt).toLocaleString()}` : "—"}
              </div>

              <div className="mt-5 text-sm font-semibold text-[#F4ECFF]">History</div>
              <div className="mt-3 space-y-2">
                {results.length === 0 ? (
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-[#C4B3D9]">
                    No generations yet.
                  </div>
                ) : (
                  results.slice(0, 10).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setActive(r)}
                      className={clsx(
                        "w-full rounded-xl border bg-black/15 p-3 text-left transition",
                        active?.id === r.id ? "border-[#c56bfb]/50" : "border-white/10 hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-semibold text-[#F4ECFF]">
                          {r.mode.toUpperCase()} • {r.character ?? "—"} • {r.aspect ?? "—"}
                        </div>
                        <div className="text-[10px] text-[#C4B3D9]">
                          {r.createdAt ? new Date(r.createdAt).toLocaleTimeString() : ""}
                        </div>
                      </div>
                      <div className="mt-1 line-clamp-2 text-xs text-[#C4B3D9]">{r.prompt}</div>
                      {r.error && <div className="mt-1 text-xs text-[#F4ECFF]">⚠ {r.error}</div>}
                    </button>
                  ))
                )}
              </div>

              <div className="mt-5">
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
