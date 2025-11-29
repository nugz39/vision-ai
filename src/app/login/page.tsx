"use client";

import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { NbButton } from "@/components/ui/NbButton";

export default function LoginPage() {
  return (
    <PageShell>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Welcome back
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Sign in to Vision AI
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Continue your projects in Vision AI Studio.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Mock login — wire up auth here.");
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none focus:border-[#00F2FF] focus:ring-4 focus:ring-[#00F2FF]/20"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none focus:border-[#00F2FF] focus:ring-4 focus:ring-[#00F2FF]/20"
              />
            </div>

            <NbButton variant="primary" size="lg" fullWidth>
              Sign in
            </NbButton>

            <p className="text-sm text-slate-500">3-day free trial. Cancel anytime.</p>
          </form>

          <p className="mt-5 text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-semibold text-slate-900 hover:underline">
              Start your free trial
            </Link>
            .
          </p>
        </div>
      </section>
    </PageShell>
  );
}
