import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="relative mx-auto w-full max-w-6xl px-4 py-10">
          <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-black/20 p-7 shadow-[0_0_26px_rgba(255,0,255,0.06)]">
            <div className="text-sm text-[#C4B3D9]">Loading…</div>
          </section>
        </main>
      }
    >
      <LoginClient />
    </Suspense>
  );
}
