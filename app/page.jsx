export default function HomePage() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>
        Vision <span style={{ color: "#9FFF00" }}>AI</span>
      </h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        From Text to Vision — AI for Creators.
      </p>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        {[
          "ultra-detailed cyberpunk city at dusk, neon lights, rain reflections",
          "photoreal portrait, koala with aviators, golden hour, 85mm",
          "woodland cottage, glowing windows, volumetric light, misty forest",
          "macro shot of a watch mechanism, bokeh, studio lighting",
          "surreal desert with glass monolith, long shadows, blue hour",
          "food photography, burger on wooden board, steam, shallow depth of field"
        ].map((p, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 12, padding: 12 }}>
            <div style={{ height: 140, border: "1px dashed #ddd", borderRadius: 8, marginBottom: 10, background: "#fafafa" }} />
            <div style={{ fontSize: 12, opacity: 0.8 }}>{p}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <a href="/studio" style={{ background: "#050505", color: "#fff", padding: "10px 14px", borderRadius: 10, border: "1px solid #111" }}>
          Generate Now
        </a>
      </div>
    </main>
  );
}
