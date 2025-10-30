#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"; CLIENT="$ROOT/client"; SERVER="$ROOT/server"

# 1) Basic sanity
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || { echo "Not a git repo"; exit 2; }
mkdir -p "$CLIENT" "$SERVER"

# 2) Write minimal Next.js client (no ESM 'type: module', CJS next.config)
mkdir -p "$CLIENT/app/(site)/create" "$CLIENT/app/api/generate-fast" "$CLIENT/app/api/polish" "$CLIENT/components" "$CLIENT/lib" "$CLIENT/styles"
cat > "$CLIENT/package.json" <<'JSON'
{
  "name": "vision-ai-client",
  "private": true,
  "version": "0.1.0",
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": { "next": "14.2.14", "react": "18.3.1", "react-dom": "18.3.1" },
  "devDependencies": {
    "autoprefixer": "10.4.20", "postcss": "8.4.49", "tailwindcss": "3.4.13",
    "typescript": "5.6.3", "@types/node": "20.12.12", "@types/react": "18.3.3", "@types/react-dom": "18.3.0"
  }
}
JSON

cat > "$CLIENT/tsconfig.json" <<'JSON'
{ "compilerOptions": { "target": "ES2022", "lib": ["ES2022","DOM","DOM.Iterable"], "types": ["node","react","react-dom"],
  "strict": true, "noEmit": true, "esModuleInterop": true, "module": "ESNext", "moduleResolution": "Bundler",
  "resolveJsonModule": true, "isolatedModules": true, "jsx": "preserve", "baseUrl": ".", "paths": { "@/*": ["./*"] } },
  "include": ["next-env.d.ts","**/*.ts","**/*.tsx",".next/types/**/*.ts"], "exclude": ["node_modules"] }
JSON

cat > "$CLIENT/next-env.d.ts" <<'TS'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
TS

cat > "$CLIENT/next.config.cjs" <<'CJS'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.hf.space' }, { protocol: 'https', hostname: 'images.unsplash.com' }] }
};
module.exports = nextConfig;
CJS

cat > "$CLIENT/postcss.config.js" <<'JS'
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }
JS

cat > "$CLIENT/tailwind.config.ts" <<'TS'
import type { Config } from "tailwindcss"
const config: Config = { content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme: { extend: {} }, plugins: [] }
export default config
TS

cat > "$CLIENT/styles/globals.css" <<'CSS'
@tailwind base; @tailwind components; @tailwind utilities;
:root { color-scheme: dark; } body { @apply bg-neutral-950 text-neutral-100; }
CSS

mkdir -p "$CLIENT/app"
cat > "$CLIENT/app/layout.tsx" <<'TSX'
export const metadata = { metadataBase: new URL("https://vision-ai.com.au"), title: "Vision AI", description: "Create Studio" };
import "../styles/globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
TSX

cat > "$CLIENT/app/page.tsx" <<'TSX'
import Link from "next/link";
export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold">Vision AI</h1>
      <p className="mt-2 text-neutral-300">Fast, premium AI image generation.</p>
      <div className="mt-6">
        <Link href="/create" className="inline-block rounded-lg bg-white/10 px-4 py-2 hover:bg-white/15">Open Create Studio</Link>
      </div>
    </main>
  );
}
TSX

cat > "$CLIENT/lib/api.ts" <<'TS'
export const HF_BACKEND_BASE = process.env.VISION_AI_HF_BASE || "https://Nugz39-vision-ai-backend2.hf.space";
export type GenReq = { prompt: string; negativePrompt?: string; steps?: number; guidance?: number; seed?: number|null; width?: number; height?: number; sampler?: string; initImageDataUrl?: string|null; strength?: number|null; mode?: "preview"|"polish" };
export async function callHF(body: GenReq): Promise<string[]> {
  const r = await fetch(`${HF_BACKEND_BASE}/generate`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`HF generate failed ${r.status}`);
  const j = await r.json() as any;
  if (j.images?.length) return j.images;
  if (j.data_url) return [j.data_url];
  throw new Error(j.error || "No image");
}
TS

cat > "$CLIENT/app/(site)/create/page.tsx" <<'TSX'
"use client";
import { useEffect, useMemo, useState } from "react";
import { callHF, type GenReq } from "@/lib/api";
const styles = ["cinematic","studio","photo-real","portrait","anime","comic","neon","3D render","isometric","macro"];
export default function CreatePage() {
  const [prompt,setPrompt]=useState(""),[neg,setNeg]=useState("blurry, low quality"),[seed,setSeed]=useState<number|null>(null);
  const [lock,setLock]=useState(false),[size,setSize]=useState("768x768"),[busy,setBusy]=useState<""|"preview"|"polish">(""),[imgs,setImgs]=useState<string[]>([]);
  const [credits,setCredits]=useState(50),[adv,setAdv]=useState(false);
  useEffect(()=>{const v=localStorage.getItem("vision_ai_credits"); if(v) setCredits(parseInt(v,10));},[]);
  useEffect(()=>{localStorage.setItem("vision_ai_credits", String(credits));},[credits]);
  const [w,h]=useMemo(()=>{const [W,H]=size.split("x").map(n=>parseInt(n,10)); return [W,H] as const;},[size]);
  async function run(mode:"preview"|"polish"){
    if(!prompt.trim()) return; const cost=mode==="preview"?1:3; if(credits<cost){alert("Out of credits"); return;}
    setBusy(mode);
    try{
      const req: GenReq = { prompt, negativePrompt:neg, steps: mode==="preview"?12:30, guidance: mode==="preview"?3.5:6.5,
        width:w, height:h, sampler: mode==="preview"?"euler_a":"dpmpp_2m", seed: lock ? (seed ?? 0) : null, mode };
      const out = await callHF(req); setImgs(p=> out.concat(p).slice(0,12)); setCredits(c=>c-cost);
    }catch(e:any){ alert(e?.message||"Generate failed"); } finally{ setBusy(""); }
  }
  return (
    <div className="min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/85 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500" />
            <div><div className="text-sm uppercase tracking-wider text-neutral-400">Vision AI</div><div className="text-base font-semibold">Create Studio</div></div>
          </div>
          <div className="px-3 py-1 rounded-full text-sm border border-neutral-700 text-neutral-300">Credits: <span className="font-semibold">{credits}</span></div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
            <label className="block text-sm text-neutral-300 mb-2">Prompt</label>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="moody cinematic portrait of a cyberpunk astronaut" className="w-full min-h-[120px] rounded-xl bg-neutral-950 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-fuchsia-500/50" />
            <div className="mt-3 flex flex-wrap gap-2">{styles.map(s=>(<button key={s} onClick={()=>setPrompt(p=>p?`${p}, ${s}`:s)} className="px-3 py-1.5 rounded-full text-sm border border-neutral-700 text-neutral-300 hover:bg-neutral-800">{s}</button>))}</div>
            <div className="mt-4">
              <label className="block text-sm text-neutral-300 mb-2">Negative prompt</label>
              <input value={neg} onChange={e=>setNeg(e.target.value)} className="w-full rounded-xl bg-neutral-950 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/50"/>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Seed</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={seed ?? 0} onChange={e=>setSeed(Number(e.target.value)||0)} className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-2 py-1.5"/>
                  <button onClick={()=>setLock(v=>!v)} className="px-2 py-1.5 rounded-lg border border-neutral-700 text-neutral-300" aria-pressed={lock}>{lock?"🔒":"🔓"}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Size</label>
                <select value={size} onChange={e=>setSize(e.target.value)} className="w-full rounded-lg bg-neutral-950 border border-neutral-700 px-2 py-1.5">
                  <option value="768x768">Square 768</option>
                  <option value="896x1152">Portrait 896×1152</option>
                  <option value="1152x768">Landscape 1152×768</option>
                  <option value="1024x1024">XL 1024</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button disabled={!!busy} onClick={()=>run("preview")} className="flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 px-4 py-2.5 font-medium disabled:opacity-60">{busy==="preview"?"Preview…":"Preview"}</button>
              <button disabled={!!busy} onClick={()=>run("polish")} className="flex-1 rounded-xl bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 font-medium disabled:opacity-60">{busy==="polish"?"Polish…":"Polish"}</button>
            </div>
          </div>
        </section>
        <section className="lg:col-span-7">
          <div id="grid" className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {imgs.length===0 ? (
              <div className="col-span-full h-full min-h-[40vh] rounded-2xl border border-dashed border-neutral-800 flex items-center justify-center text-neutral-400">Your results appear here. Generate something awesome ✨</div>
            ) : imgs.map((src,i)=> (<img key={i} src={src} className="w-full h-auto rounded-xl border border-neutral-800" alt={`img-${i}`} />))}
          </div>
        </section>
      </main>
    </div>
  );
}
TSX

cat > "$CLIENT/app/create/page.tsx" <<'TSX'
export { default } from "../(site)/create/page";
TSX

# 3) Minimal backend placeholder now (we’ll flesh on HF later)
cat > "$SERVER/requirements.txt" <<'TXT'
fastapi==0.115.4
uvicorn[standard]==0.32.0
TXT

cat > "$SERVER/main.py" <<'PY'
from fastapi import FastAPI
app = FastAPI()
@app.get("/health") 
def health(): return {"ok": True}
PY

# 4) Install client deps and make first commit
cd "$CLIENT"
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock .next
npm install --no-fund --no-audit

cd "$ROOT"
git add -A
git commit -m "feat: minimal scaffold (Next.js client + stub server)" || true
git push -u origin "$(git rev-parse --abbrev-ref HEAD)" || true
echo "✅ Done. Client ready to build."
