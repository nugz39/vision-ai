export function BrandWatermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src="/assets/branding/naughtybotty-logo.png"
          alt=""
          draggable={false}
          className="select-none"
          style={{
            width: "85vw",
            height: "auto",
            opacity: 0.45,        // MUCH stronger / clearly visible
            filter: "blur(10px)", // 8–12px
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </div>
  );
}
