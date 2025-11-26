"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);

  // Always start empty on mount
  useEffect(() => {
    setEmail("");
    setPw("");
    setPw2("");
    setErr(null);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!email.includes("@")) return setErr("Please enter a valid email.");
    if (pw.length < 6) return setErr("Password must be at least 6 characters.");
    if (pw !== pw2) return setErr("Passwords do not match.");

    setErr("Signup is frontend-only right now (backend coming next).");
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex justify-center">
          <div
            className="w-full max-w-lg rounded-2xl border p-6"
            style={{
              borderColor: "rgba(197,107,251,0.28)",
              background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
              boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
            }}
          >
            <h1 className="text-2xl font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
              Create Your NaughtyBotty Account
            </h1>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>
                  Email
                </label>
                <input
                  name="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>
                  Password
                </label>
                <input
                  name="new-password"
                  type="password"
                  value={pw || ""}
                  onChange={(e) => setPw(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>
                  Confirm password
                </label>
                <input
                  name="confirm-password"
                  type="password"
                  value={pw2 || ""}
                  onChange={(e) => setPw2(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  autoComplete="new-password"
                />
              </div>

              {err && (
                <div
                  className="rounded-xl border px-3 py-2 text-sm"
                  style={{
                    borderColor: "rgba(197,107,251,0.20)",
                    background: "rgba(0,0,0,0.18)",
                    color: "#C4B3D9",
                  }}
                >
                  {err}
                </div>
              )}

              <button
                type="submit"
                className="h-11 w-full rounded-xl text-sm font-semibold transition duration-200 ease-out hover:opacity-95"
                style={{
                  color: "#F6F6F6",
                  background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
                  boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
                }}
              >
                Create account
              </button>

              <div className="text-sm" style={{ color: "#C4B3D9" }}>
                Already have an account?{" "}
                <Link href="/login" className="hover:underline" style={{ color: "#F6F6F6" }}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
