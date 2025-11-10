"use client";
import { useState, useRef } from "react";
import { generateImage, generateVideo, generateImg2Img } from "@/lib/api";

const TABS = ["Image", "Img2Img", "Video"];

export default function StudioPage() {
  const [tab, setTab] = useState("Image");

  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [outUrl, setOutUrl] = useState("");

  // Img2Img controls
  const [strength, setStrength] = useState(0.8);
  const [guidance, setGuidance] = useState(7.5);
  const [steps, setSteps] = useState(30);
  const fileRef = useRef(null);

  const runImage = async () => {
    try {
      setBusy(true); setError(""); setOutUrl("");
      const blob = await generateImage({
        prompt,
        width: 768, height: 768,
        num_inference_steps: 25, guidance_scale: 4.5,
      });
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError(String(e.message || e)); }
    finally { setBusy(false); }
  };

  const runVideo = async () => {
    try {
      setBusy(true); setError(""); setOutUrl("");
      const blob = await generateVideo({
        prompt,
        width: 512, height: 512,
        num_frames: 24, fps: 8, zoom_start: 1.0, zoom_end: 1.08, pan_x: 0, pan_y: 0,
      });
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError(String(e.message || e)); }
    finally { setBusy(false); }
  };

  const runImg2Img = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) { setError("Please choose an input image."); return; }
    try {
      setBusy(true); setError(""); setOutUrl("");
      const blob = await generateImg2Img({
        file,
        prompt,
        strength,
        guidance_scale: guidance,
        num_inference_steps: steps
      });
      setOutUrl(URL.createObjectURL(blob));
    } catch (e) { setError(String(e.message || e)); }
    finally { setBusy(false); }
  };

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Studio</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "8px 10px",
              borderRadius: 10,
              border: "1px solid #ddd",
              background: tab === t ? "#050505" : "#fff",
              color: tab === t ? "#fff" : "#050505",
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Prompt</label>
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what to create…"
        style={{ width: "100%", border: "1px solid #ddd", borderRadius: 10, padding: 12, marginBottom: 16 }}
      />

      {/* Img2Img controls */}
      {tab === "Img2Img" && (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Input Image</label>
            <input type="file" ref={fileRef} accept="image/*" style={{ display: "block", width: "100%" }} />
          </div>
          <div>
            <div style={{ marginBottom: 8 }}>Strength: {strength.toFixed(2)}</div>
            <input type="range" min="0.1" max="1.0" step="0.05"
              value={strength} onChange={e => setStrength(parseFloat(e.target.value))} />
            <div style={{ margin: "10px 0 8px" }}>Guidance: {guidance.toFixed(1)}</div>
            <input type="range" min="1" max="15" step="0.5"
              value={guidance} onChange={e => setGuidance(parseFloat(e.target.value))} />
            <div style={{ margin: "10px 0 8px" }}>Steps: {steps}</div>
            <input type="range" min="10" max="60" step="1"
              value={steps} onChange={e => setSteps(parseInt(e.target.value))} />
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {tab === "Image" && (
          <button onClick={runImage} disabled={busy}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#050505", color: "#fff" }}>
            {busy ? "Generating…" : "Generate Image"}
          </button>
        )}
        {tab === "Img2Img" && (
          <button onClick={runImg2Img} disabled={busy}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#050505", color: "#fff" }}>
            {busy ? "Transforming…" : "Generate from Image"}
          </button>
        )}
        {tab === "Video" && (
          <button onClick={runVideo} disabled={busy}
            style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #111", background: "#050505", color: "#fff" }}>
            {busy ? "Rendering…" : "Generate Video"}
          </button>
        )}
      </div>

      {/* Output */}
      {error && <p style={{ color: "#c00", fontSize: 13, marginBottom: 12 }}>{error}</p>}
      {outUrl && (
        tab === "Video" ? (
          <video controls src={outUrl} style={{ width: "100%", maxWidth: 640, borderRadius: 12, border: "1px solid #eee" }} />
        ) : (
          <img src={outUrl} alt="result" style={{ width: "100%", maxWidth: 640, borderRadius: 12, border: "1px solid #eee" }} />
        )
      )}
    </main>
  );
}
