import React from "react";

export default function StudioGradientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfcff]">
      {/* Studio-style pastel wash (use this wrapper anywhere you want Studio-identical brightness) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-220px] top-[-220px] h-[640px] w-[640px] rounded-full blur-3xl"
          style={{ background: "rgba(0,242,255,0.14)" }}
        />
        <div
          className="absolute right-[-260px] top-[-120px] h-[680px] w-[680px] rounded-full blur-3xl"
          style={{ background: "rgba(203,47,255,0.12)" }}
        />
        <div
          className="absolute left-[20%] bottom-[-320px] h-[760px] w-[760px] rounded-full blur-3xl"
          style={{ background: "rgba(155,91,255,0.10)" }}
        />
        <div
          className="absolute right-[10%] bottom-[-360px] h-[820px] w-[820px] rounded-full blur-3xl"
          style={{ background: "rgba(122,246,60,0.08)" }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
