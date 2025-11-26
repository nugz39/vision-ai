"use client";

import { useState } from "react";
import { NbButton } from "@/components/ui/NbButton";
import { NbChip } from "@/components/ui/NbChip";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Mode = "image" | "video";

export default function GeneratePage() {
  const [mode, setMode] = useState<Mode>("image");
  const [presetMode, setPresetMode] = useState<"presets" | "edit">("presets");
  const [hasCharacter, setHasCharacter] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-4">
      <SectionHeader
        title="Generate"
        subtitle="Pick a character, then shape the vibe of your next scene."
        className="mb-4"
      />

      <div className="mb-4 inline-flex rounded-full bg-nb-bg-soft/80 p-1 text-xs">
        <button
          className={`flex-1 rounded-full px-3 py-1 font-medium ${
            mode === "image" ? "bg-nb-pink text-nb-bg" : "text-nb-muted hover:text-nb-text"
          }`}
          onClick={() => setMode("image")}
        >
          Image
        </button>
        <button
          className={`flex-1 rounded-full px-3 py-1 font-medium ${
            mode === "video" ? "bg-nb-pink text-nb-bg" : "text-nb-muted hover:text-nb-text"
          }`}
          onClick={() => setMode("video")}
        >
          Video
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <NbChip active={presetMode === "presets"} onClick={() => setPresetMode("presets")}>
          Presets
        </NbChip>
        <NbChip active={presetMode === "edit"} onClick={() => setPresetMode("edit")}>
          Image Edit
        </NbChip>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          className="h-32 rounded-2xl border border-nb-pink bg-nb-bg-soft/90 p-4 text-left text-sm text-nb-text shadow-nb-soft"
          onClick={() => setHasCharacter(true)}
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-nb-pink">Required</p>
          <p className="mt-1 text-base font-medium">Select Character</p>
          <p className="mt-2 text-xs text-nb-muted">
            Choose who stars in this scene before anything else.
          </p>
          {hasCharacter && <p className="mt-2 text-xs text-nb-cyan">✓ Character selected (placeholder)</p>}
        </button>

        <button className="h-32 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-4 text-left text-sm text-nb-text">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-nb-muted">Optional</p>
          <p className="mt-1 text-base font-medium">Pose</p>
          <p className="mt-2 text-xs text-nb-muted">Pick a pose or camera angle.</p>
        </button>

        <button className="h-32 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-4 text-left text-sm text-nb-text">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-nb-muted">Optional</p>
          <p className="mt-1 text-base font-medium">Background</p>
          <p className="mt-2 text-xs text-nb-muted">Neon city, private club, or cosmic.</p>
        </button>

        <button className="h-32 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-4 text-left text-sm text-nb-text">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-nb-muted">Optional</p>
          <p className="mt-1 text-base font-medium">Outfit &amp; Style</p>
          <p className="mt-2 text-xs text-nb-muted">Choose overall style and wardrobe vibe.</p>
        </button>
      </div>

      <p className="mt-4 text-xs text-nb-muted">
        Full-screen pickers come next. This rebuild locks the structure + theme.
      </p>

      <div className="mt-6">
        <NbButton variant="primary" size="lg" fullWidth disabled={!hasCharacter}>
          {mode === "image" ? "Generate 10 Images" : "Generate Scene"}
        </NbButton>
        {!hasCharacter && (
          <p className="mt-2 text-xs text-nb-danger">Select a character first to unlock generation.</p>
        )}
      </div>
    </div>
  );
}
