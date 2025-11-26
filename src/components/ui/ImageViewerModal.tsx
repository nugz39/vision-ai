"use client";

import { useEffect } from "react";

export function ImageViewerModal({
  open,
  src,
  title,
  onClose,
}: {
  open: boolean;
  src?: string | null;
  title?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[101] w-full max-w-4xl overflow-hidden rounded-2xl border border-[#c56bfb]/40 bg-gradient-to-b from-[#0A0013] to-[#120021] shadow-[0_0_60px_rgba(255,59,255,0.18)]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="text-sm font-semibold text-[#F4ECFF]">{title ?? "Preview"}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-[#F4ECFF] hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="p-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/10 bg-black/20">
            {src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={title ?? ""} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-[#C4B3D9]">
                Image placeholder
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
