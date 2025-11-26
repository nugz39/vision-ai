"use client";

import { useEffect, useMemo, useState } from "react";

export function AuthModal({
  mode,
  onClose,
  onAuthed,
  switchTo,
}: {
  mode: null | "login" | "signup";
  onClose: () => void;
  onAuthed: (email: string) => void;
  switchTo: (m: "login" | "signup") => void;
}) {
  const isOpen = mode !== null;

  const title = useMemo(() => (mode === "signup" ? "Create account" : "Login"), [mode]);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [ageOk, setAgeOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setErr(null);
    setSuccess(false);
    // keep email if user flips modes; reset passwords
    setPw("");
    setPw2("");
    setAgeOk(false);
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const validateEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!validateEmail(email)) return setErr("Enter a valid email.");
    if (pw.length < 8) return setErr("Password must be at least 8 characters.");

    if (mode === "signup") {
      if (!ageOk) return setErr("You must confirm you are 18+.");
      if (pw2 !== pw) return setErr("Passwords do not match.");
    }

    setSuccess(true);
    // quick success animation then auth
    setTimeout(() => onAuthed(email), 650);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/65" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl border p-5 shadow-2xl"
        style={{
          borderColor: "rgba(197,107,251,0.40)",
          background: "linear-gradient(180deg,#0A0013,#120021)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xl font-semibold" style={{ color: "#F6F6F6", fontFamily: "Poppins, Inter, system-ui" }}>
              {title}
            </div>
            <div className="mt-1 text-sm" style={{ color: "rgba(196,179,217,1)", fontFamily: "Inter, system-ui" }}>
              Neon studio access, synced across devices.
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full px-2 py-1 text-sm hover:opacity-80"
            style={{ color: "#F6F6F6" }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <label className="text-xs" style={{ color: "rgba(196,179,217,1)" }}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 outline-none"
              style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              placeholder="you@domain.com"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs" style={{ color: "rgba(196,179,217,1)" }}>Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 outline-none"
              style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              placeholder="••••••••"
            />
          </div>

          {mode === "signup" && (
            <>
              <div>
                <label className="text-xs" style={{ color: "rgba(196,179,217,1)" }}>Confirm password</label>
                <input
                  type="password"
                  value={pw2}
                  onChange={(e) => setPw2(e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-black/30 px-3 py-2 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  placeholder="••••••••"
                />
              </div>

              <label className="flex items-center gap-2 text-sm" style={{ color: "#F6F6F6" }}>
                <input
                  type="checkbox"
                  checked={ageOk}
                  onChange={(e) => setAgeOk(e.target.checked)}
                />
                I confirm I am 18+
              </label>
            </>
          )}

          {err && (
            <div className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: "rgba(255,59,255,0.35)", color: "#F6F6F6", background: "rgba(255,59,255,0.08)" }}>
              {err}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2 font-semibold transition duration-200 ease-out active:scale-[0.99]"
            style={{
              color: "#F6F6F6",
              background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
              boxShadow: "0 14px 38px rgba(255,0,255,0.15)",
              fontFamily: "Poppins, Inter, system-ui",
            }}
          >
            {success ? "Success ✓" : mode === "signup" ? "Join Free" : "Login"}
          </button>

          <div className="text-center text-sm" style={{ color: "rgba(196,179,217,1)" }}>
            {mode === "signup" ? (
              <button type="button" onClick={() => switchTo("login")} className="hover:underline">
                Already have an account? Login
              </button>
            ) : (
              <button type="button" onClick={() => switchTo("signup")} className="hover:underline">
                New here? Create an account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
