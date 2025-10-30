"use client";
import { useState } from "react";

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [neg, setNeg] = useState("blurry, low quality");
  const [busy, setBusy] = useState<null | "preview" | "polish">(null);
  const [images, setImages] = useState<string[]>([]);
  const [seed, setSeed] = useState<number | "">(0);
  const [size, setSize] = useState("768x768");

  async function run(mode: "preview" | "polish") {
    setBusy(mode);
    setImages([]);
    const [w, h] = size.split("x").map((s) => parseInt(s, 10));
    const body = {
      prompt,
      negativePrompt: neg,
      width: w,
      height: h,
      seed: seed === "" ? null : Number(seed),
      mode,
    };
    try {
      const res = await fetch(`/api/${mode === "preview" ? "generate-fast" : "polish"}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await res.json();
      if (j?.images?.length) setImages(j.images);
      else alert(j?.error || "No images returned");
    } catch (e: any) {
      alert(e?.message || "Failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-[100dvh] bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div>
              <div className="text-sm uppercase tracking-wider text-neutral-400">Vision AI</div>
              <div className="text-base font-semibold">Create Studio</div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full text-sm border border-neutral-700 text-neutral-300">Demo mode</div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
            <label htmlFor="prompt" className="block text-sm text-neutral-300 mb-2">Prompt</label>
            <textarea
              id="prompt"
              placeholder="e.g. moody cinematic portrait of a cyberpunk astronaut"
              value={prompt}
              onChange={(e)=>setPrompt(e.target.value)}
              className="w-full min-h-[120px] rounded-xl bg-neutral-950 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-500/50"
            />

            <div className="mt-4">
              <label className="block text-sm mb-1">Negative prompt</label>
              <input
                value={neg}
                onChange={(e)=>setNeg(e.target.value)}
                className="w-full rounded-xl bg-neutral-950 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Seed</label>
                <input
                  type="number"
                  value={seed as number}
                  onChange={(e)=>setSeed(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-2 py-1.5"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Size</label>
                <select
                  value={size}
                  onChange={(e)=>setSize(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-2 py-1.5"
                >
                  <option value="768x768">Square 768</option>
                  <option value="1152x768">Landscape 1152×768</option>
                  <option value="896x1152">Portrait 896×1152</option>
                  <option value="1024x1024">XL 1024</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                disabled={!!busy}
                onClick={()=>run("preview")}
                className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 px-4 py-2.5 font-medium disabled:opacity-60"
              >
                {busy==="preview" ? "Preview…" : "Preview"}
              </button>
              <button
                disabled={!!busy}
                onClick={()=>run("polish")}
                className="flex-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 font-medium disabled:opacity-60"
              >
                {busy==="polish" ? "Polish…" : "Polish"}
              </button>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40 text-sm text-neutral-400">
            Use <span className="text-neutral-200 font-medium">Preview</span> for fast ideation, then <span className="text-neutral-200 font-medium">Polish</span> for the keeper.
          </div>
        </section>

        <section className="lg:col-span-7">
          <div className="min-h-[40vh] rounded-2xl border border-neutral-800 p-3 grid gap-3">
            {images.length===0 ? (
              <div className="h-full min-h-[40vh] border border-dashed border-neutral-800 rounded-xl flex items-center justify-center text-neutral-400">
                Your results appear here. Generate something awesome ✨
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {images.map((src, i)=>(
                  <img key={i} src={src} alt={`result-${i}`} className="w-full h-auto rounded-xl border border-neutral-800" />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
