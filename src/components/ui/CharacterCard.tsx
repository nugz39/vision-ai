"use client";

import Link from "next/link";
import { useState } from "react";
import type { Character } from "@/data/characters";

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 21s-7.2-4.35-9.6-8.4C.7 9.6 2.4 6.6 5.7 6.1c1.7-.25 3.2.5 4.1 1.7.9-1.2 2.4-1.95 4.1-1.7 3.3.5 5 3.5 3.3 6.5C19.2 16.65 12 21 12 21z" />
    </svg>
  );
}

export function CharacterCard({ character }: { character: Character }) {
  const [imgError, setImgError] = useState(false);
  const styleTags = `${character.style} • ${character.gender}`;

  return (
    <Link href={`/characters/${character.id}`} className="block w-full max-w-full">
      <div
        className="group relative w-full overflow-hidden rounded-2xl transition duration-200 ease-out"
        style={{
          background: "linear-gradient(180deg,#080010,#0A0012)",
          boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: "0 0 0 1px rgba(197,107,251,0.40)" }} />
        <div
          className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition duration-200 ease-out group-hover:opacity-100"
          style={{ background: "linear-gradient(90deg,#ff3bff,#c56bfb)" }}
        />

        <div className="relative z-10 transform transition duration-200 ease-out group-hover:scale-[1.02]">
          {/* 3:4 image area */}
          <div className="relative aspect-[3/4] w-full">
            {!imgError ? (
              <img
                src={character.image}
                alt={character.name}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition duration-200 ease-out group-hover:brightness-[1.08]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="rounded-xl border border-dashed px-4 py-3 text-center"
                  style={{ borderColor: "rgba(197,107,251,0.35)", color: "#C4B3D9" }}
                >
                  <div className="text-xs" style={{ color: "#F6F6F6" }}>Image missing</div>
                  <div className="mt-1 text-[11px]">/public/assets/gallery</div>
                </div>
              </div>
            )}

            {/* Category pill */}
            <div className="absolute right-3 top-3">
              <div
                className="rounded-full px-3 py-1 text-[11px]"
                style={{
                  color: "#F6F6F6",
                  background: "rgba(10,0,19,0.72)",
                  border: "1px solid rgba(197,107,251,0.40)",
                  backdropFilter: "blur(6px)",
                }}
              >
                {character.category}
              </div>
            </div>

            {/* Bottom gradient overlay */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.82) 0%, rgba(10,0,19,0.58) 45%, rgba(10,0,19,0.00) 100%)",
              }}
            />

            {/* Name + tags */}
            <div className="absolute bottom-3 left-3 leading-tight">
              <div className="text-sm font-semibold" style={{ color: "#F6F6F6", fontFamily: "Poppins, Inter, system-ui" }}>
                {character.name}
              </div>
              <div className="mt-0.5 text-[12px]" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
                {styleTags}
              </div>
            </div>

            {/* Heart count */}
            <div className="absolute bottom-3 right-3">
              <div
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                style={{
                  color: "#C4B3D9",
                  background: "rgba(10,0,19,0.60)",
                  border: "1px solid rgba(197,107,251,0.30)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <HeartIcon className="h-3.5 w-3.5" />
                {character.chats.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 cursor-pointer" />
      </div>
    </Link>
  );
}
