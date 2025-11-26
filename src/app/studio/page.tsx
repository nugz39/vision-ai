"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

function Chip({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-full px-3 py-1 text-[11px] font-medium"
      style={{
        color: "#C4B3D9",
        background: "rgba(0,0,0,0.28)",
        border: "1px solid rgba(197,107,251,0.30)",
      }}
    >
      {label}
    </button>
  );
}

export default function StudioPage() {
  const { isLoggedIn } = useAuth();
  const [mode, setMode] = useState<"Image" | "Video">("Image");
  const [prompt, setPrompt] = useState("");

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen w-full overflow-x-hidden">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex min-h-[60vh] items-center justify-center">
            <div
              className="w-full max-w-xl rounded-2xl border p-6 text-center"
              style={{
                borderColor: "rgba(197,107,251,0.28)",
                background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
                boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
              }}
            >
              <h1 className="text-2xl font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
                Unlock NaughtyBotty Studio
              </h1>
              <p className="mt-2 text-sm" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
                Start a free 3-day Studio trial or upgrade your plan to generate images and videos.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                <Link
                  href="/pricing"
                  className="h-11 rounded-full border px-6 py-2 text-sm font-semibold transition duration-200 ease-out hover:opacity-90"
                  style={{
                    borderColor: "rgba(197,107,251,0.35)",
                    color: "#F6F6F6",
                    background: "transparent",
                  }}
                >
                  View Pricing
                </Link>

                <Link
                  href="/login"
                  className="h-11 rounded-full px-6 py-2 text-sm font-semibold transition duration-200 ease-out hover:opacity-95"
                  style={{
                    color: "#F6F6F6",
                    background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
                    boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
                  }}
                >
                  Login / Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
          NaughtyBotty Studio
        </h1>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* Left: upload/generate + prompt */}
          <div
            className="rounded-2xl border p-4"
            style={{
              borderColor: "rgba(197,107,251,0.28)",
              background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
              boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
            }}
          >
            <div className="text-sm font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
              Upload / Generate
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("Image")}
                className="h-9 rounded-full px-4 text-xs font-semibold"
                style={{
                  color: "#F6F6F6",
                  background: mode === "Image" ? "linear-gradient(90deg,#ff3bff,#c56bfb)" : "rgba(0,0,0,0.28)",
                  border: "1px solid rgba(197,107,251,0.30)",
                }}
              >
                Image
              </button>
              <button
                type="button"
                onClick={() => setMode("Video")}
                className="h-9 rounded-full px-4 text-xs font-semibold"
                style={{
                  color: "#F6F6F6",
                  background: mode === "Video" ? "linear-gradient(90deg,#ff3bff,#c56bfb)" : "rgba(0,0,0,0.28)",
                  border: "1px solid rgba(197,107,251,0.30)",
                }}
              >
                Video
              </button>
            </div>

            <label className="mt-4 block text-xs font-medium" style={{ color: "#C4B3D9" }}>
              Prompt
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={8}
              className="mt-1 w-full resize-none rounded-xl border bg-black/30 p-3 outline-none"
              style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              placeholder="Describe the scene…"
            />

            <button
              type="button"
              className="mt-4 h-11 w-full rounded-xl text-sm font-semibold transition duration-200 ease-out hover:opacity-95"
              style={{
                color: "#F6F6F6",
                background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
                boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
              }}
            >
              Generate
            </button>
          </div>

          {/* Right: style chips + history placeholder */}
          <div className="space-y-5">
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: "rgba(197,107,251,0.28)",
                background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
                boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
              }}
            >
              <div className="text-sm font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
                Style selector
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Popular", "Soft Neon", "Cosmic", "Mystery", "Velvet", "Cyber", "Warm", "Shadow", "Ethereal"].map((x) => (
                  <Chip key={x} label={x} />
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: "rgba(197,107,251,0.28)",
                background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
                boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
              }}
            >
              <div className="text-sm font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
                History (placeholder)
              </div>
              <div className="mt-2 text-sm" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
                Your generations will appear here once the backend is connected.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
