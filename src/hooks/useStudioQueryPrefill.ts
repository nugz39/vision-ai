"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export type StudioMode = "image" | "video" | "remix";

export function useStudioQueryPrefill(opts: {
  setMode?: (m: StudioMode) => void;
  setPrompt?: (p: string) => void;
  setSelectedCharacterId?: (id: string) => void;
  setAspect?: (a: string) => void;
  setSeed?: (n: number) => void;
}) {
  const sp = useSearchParams();

  useEffect(() => {
    const mode = (sp.get("mode") as StudioMode | null) ?? null;
    const character = sp.get("character");
    const prompt = sp.get("prompt");
    const aspect = sp.get("aspect");
    const seedRaw = sp.get("seed");

    if (mode && opts.setMode) opts.setMode(mode);
    if (character && opts.setSelectedCharacterId) opts.setSelectedCharacterId(character);
    if (prompt && opts.setPrompt) opts.setPrompt(decodeURIComponent(prompt));
    if (aspect && opts.setAspect) opts.setAspect(aspect);
    if (seedRaw && opts.setSeed) {
      const n = Number(seedRaw);
      if (!Number.isNaN(n)) opts.setSeed(n);
    }
    // only run when query changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp]);
}
