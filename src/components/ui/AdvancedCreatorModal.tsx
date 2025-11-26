"use client";

export function AdvancedCreatorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/65" onClick={onClose} />
      <div
        className="relative w-full max-w-lg rounded-2xl border p-5 shadow-2xl"
        style={{
          borderColor: "rgba(197,107,251,0.40)",
          background: "linear-gradient(180deg,#0A0013,#120021)",
          boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold" style={{ color: "#F6F6F6", fontFamily: "Poppins, Inter, system-ui" }}>
              Advanced creator (coming soon)
            </div>
            <div className="mt-2 text-sm leading-relaxed" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
              Here you’ll be able to fine-tune AI scenes with detailed controls. For now, use the filters above and the Generate button to preview the studio.
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm hover:opacity-80"
            style={{ color: "#F6F6F6" }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
