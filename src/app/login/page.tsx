"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { loginDev, logout, isLoggedIn } = useAuth();

  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  // Always start empty on mount (prevents any accidental carryover)
  useEffect(() => {
    setUser("");
    setPw("");
    setMsg(null);
  }, []);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    const ok = loginDev(user.trim(), pw); // dev login logic unchanged
    setMsg(ok ? "Login success." : "Invalid credentials.");
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
              Login
            </h1>

            <form onSubmit={onLogin} className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>
                  Username
                </label>
                <input
                  name="username"
                  value={user || ""}
                  onChange={(e) => setUser(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  autoComplete="username"
                />
              </div>

              <div>
                <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={pw || ""}
                  onChange={(e) => setPw(e.target.value)}
                  className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                  style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
                  autoComplete="current-password"
                />
              </div>

              {msg && (
                <div
                  className="rounded-xl border px-3 py-2 text-sm"
                  style={{
                    borderColor: "rgba(197,107,251,0.20)",
                    background: "rgba(0,0,0,0.18)",
                    color: "#C4B3D9",
                  }}
                >
                  {msg}
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
                Login
              </button>

              <div className="flex gap-2">
                <Link
                  href="/studio"
                  className="h-11 w-full rounded-xl border px-4 py-2 text-center text-sm font-semibold transition duration-200 ease-out hover:opacity-90"
                  style={{ borderColor: "rgba(197,107,251,0.35)", color: "#F6F6F6" }}
                >
                  Go to Studio
                </Link>

                <button
                  type="button"
                  onClick={() => logout()}
                  className="h-11 w-full rounded-xl border px-4 py-2 text-sm font-semibold transition duration-200 ease-out hover:opacity-90"
                  style={{ borderColor: "rgba(197,107,251,0.35)", color: "#F6F6F6" }}
                >
                  Logout
                </button>
              </div>

              <div className="text-sm" style={{ color: "#C4B3D9" }}>
                Need an account?{" "}
                <Link href="/signup" className="hover:underline" style={{ color: "#F6F6F6" }}>
                  Create one
                </Link>
              </div>

              {isLoggedIn && (
                <div className="text-xs" style={{ color: "#C4B3D9" }}>
                  You are logged in (dev session).
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
