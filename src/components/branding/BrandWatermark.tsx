import { NB_BRAND_LOGO_SRC } from "@/lib/branding";

export function BrandWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* ultra-subtle halo glow */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            width: "min(88vw, 1100px)",
            height: "min(88vw, 1100px)",
            background:
              "radial-gradient(circle at 35% 38%, rgba(0,242,255,0.12), transparent 62%), radial-gradient(circle at 68% 58%, rgba(203,47,255,0.11), transparent 64%), radial-gradient(circle at 52% 70%, rgba(122,246,60,0.10), transparent 66%)",
            opacity: 0.55,
          }}
        />
        {/* watermark (2× larger, opacity super low) */}
        <img
          src={NB_BRAND_LOGO_SRC}
          alt=""
          draggable={false}
          className="select-none"
          style={{
            width: "min(76vw, 980px)",
            height: "auto",
            opacity: 0.03,
            filter: "blur(0.15px)",
          }}
        />
      </div>
    </div>
  );
}
