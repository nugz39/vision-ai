"use client";
import { useState } from "react";

export default function UnlockPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    const body = new FormData();
    body.set("password", password);
    const res = await fetch("/unlock", { method: "POST", body });
    if (res.ok) {
      const next = new URLSearchParams(window.location.search).get("next") || "/";
      window.location.href = next;
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j?.error || "Invalid password");
    }
  }

  return (
    <main
      style={{
        minHeight: "100dvh",
        width: "100%",
        display: "grid",
        placeItems: "center",
        backgroundImage: 'url("/vision-ai-lock.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#ffffff",
        padding: "24px"
      }}
    >
      <form
        onSubmit={onSubmit}
        aria-label="Enter site password"
        style={{
          width: "min(440px, 92vw)",
          display: "flex",
          gap: 10,
          padding: 10,
          borderRadius: 12,
          background: "rgba(255,255,255,0.85)",
          border: "1px solid #e6eef2",
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
          backdropFilter: "blur(2px)"
        }}
      >
        <input
          type="password"
          placeholder="Password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
          style={{
            flex: 1,
            height: 48,
            padding: "0 14px",
            borderRadius: 10,
            border: "1px solid #cfe3ea",
            outline: "none",
            fontSize: 16
          }}
        />
        <button
          type="submit"
          style={{
            height: 48,
            padding: "0 18px",
            borderRadius: 10,
            border: "1px solid #bde27b",
            background: "#9FFF00",
            color: "#061a22",
            fontWeight: 700
          }}
        >
          Enter
        </button>
      </form>

      {error && (
        <p style={{
          position: "fixed",
          bottom: 16,
          left: 0,
          right: 0,
          textAlign: "center",
          color: "#c62828",
          fontWeight: 600
        }}>
          {error}
        </p>
      )}
    </main>
  );
}
