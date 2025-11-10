export const metadata = {
  title: "Vision AI",
  description: "Where Imagination Meets Intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#fff", color: "#050505" }}>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px 20px",
            borderBottom: "1px solid #eee",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 20,
          }}
        >
          <a href="/" aria-label="Vision AI — Home" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="Vision AI" width={36} height={36} />
            <strong style={{ letterSpacing: 0.5 }}>Vision <span style={{ color: "#9FFF00" }}>AI</span></strong>
          </a>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="/" style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #ddd" }}>Home</a>
            <a href="/studio" style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #ddd" }}>Studio</a>
          </div>
          <div style={{ marginLeft: "auto", opacity: 0.6, fontSize: 12 }}>
            Backend: {process.env.NEXT_PUBLIC_VISION_AI_HF_BASE || "(not set)"}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
