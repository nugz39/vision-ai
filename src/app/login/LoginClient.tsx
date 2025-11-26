"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function LoginClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const next = useMemo(() => sp.get("next") || "/studio", [sp]);

  const [username, setUsername] = useState<string>(""); // NO PREFILL
  const [password, setPassword] = useState<string>(""); // NO PREFILL
  const [error, setError] = useState<string>("");

  function setAuthState(opts: { loggedIn: boolean; studioAccess: boolean; user?: string }) {
    try {
      localStorage.setItem("nb_logged_in", opts.loggedIn ? "true" : "false");
      localStorage.setItem("nb_studio_access", opts.studioAccess ? "true" : "false");
      if (opts.user) localStorage.setItem("nb_user", opts.user);
      if (!opts.loggedIn) localStorage.removeItem("nb_user");
    } catch {
      // ignore
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const u = username.trim();
    const p = password;

    // DEV LOGIN (must be typed by user; NO autofill by app)
    if (u === "creator" && p === "admin") {
      setAuthState({ loggedIn: true, studioAccess: true, user: "creator" });
      router.push(next);
      router.refresh();
      return;
    }

    // Placeholder "normal login" (logged in, but no studio access)
    if (u.length > 0 && p.length > 0) {
      setAuthState({ loggedIn: true, studioAccess: false, user: u });
      router.push(next);
      router.refresh();
      return;
    }

    setError("Please enter your username and password.");
  }

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/20 p-7 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
        <h1 className="text-2xl font-semibold text-[#F4ECFF]">Login</h1>
        <p className="mt-2 text-sm text-[#C4B3D9]">Enter your details to access NaughtyBotty.</p>

        {error && (
          <div className="mt-4 rounded-2xl border border-[#ff3bff]/30 bg-[#ff3bff]/10 px-4 py-3 text-sm text-[#F4ECFF]">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-[#C4B3D9]">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              spellCheck={false}
              className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-[#F4ECFF] outline-none placeholder:text-[#C4B3D9]/60 focus:border-[#c56bfb]/50"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#C4B3D9]">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              type="password"
              className="mt-2 h-11 w-full rounded-2xl border border-white/10 bg-black/25 px-4 text-sm text-[#F4ECFF] outline-none placeholder:text-[#C4B3D9]/60 focus:border-[#c56bfb]/50"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#ff3bff] to-[#c56bfb] px-6 text-sm font-semibold text-white shadow-[0_0_30px_rgba(255,59,255,0.22)] hover:brightness-110"
          >
            Login
          </button>
        </form>

        <div className="mt-5 text-center text-sm text-[#C4B3D9]">
          No account?{" "}
          <Link href="/signup" className="font-semibold text-[#F4ECFF] hover:underline">
            Create one
          </Link>
        </div>
      </section>
    </main>
  );
}
