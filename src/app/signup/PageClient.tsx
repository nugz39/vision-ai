"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NbButton } from "@/components/ui/NbButton";

type Plan = "trial" | "pro" | "studio";

const PLANS: Array<{ id: Plan; name: string; price: string; note: string; paid: boolean }> = [
  { id: "trial", name: "Free Trial", price: "$0", note: "3 days • cancel anytime", paid: false },
  { id: "pro", name: "Pro", price: "$29/mo", note: "Best for creators", paid: true },
  { id: "studio", name: "Studio", price: "$79/mo", note: "Best value for heavy output", paid: true },
];

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function PlanCard({
  active,
  title,
  price,
  note,
  onClick,
  tint,
}: {
  active?: boolean;
  title: string;
  price: string;
  note: string;
  tint?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx("w-full text-left rounded-3xl border p-5 transition-all hover:-translate-y-0.5")}
      style={{
        borderColor: active ? "rgba(0,242,255,0.40)" : "rgba(2,6,23,0.10)",
        background: tint
          ? "radial-gradient(circle at 25% 25%, rgba(0,242,255,0.12), transparent 55%), radial-gradient(circle at 70% 30%, rgba(203,47,255,0.10), transparent 58%), rgba(255,255,255,0.80)"
          : "rgba(255,255,255,0.80)",
        boxShadow:
          "0 18px 55px rgba(2,6,23,0.10), 0 0 18px rgba(0,242,255,0.10), 0 0 18px rgba(203,47,255,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[#020617]">{title}</div>
          <div className="mt-1 text-sm text-black/55">{note}</div>
        </div>
        <div className="text-lg font-semibold text-[#020617]">{price}</div>
      </div>
    </button>
  );
}

export default function SignupPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const initial = (sp.get("plan") as Plan) || "trial";
  const [plan, setPlan] = useState<Plan>(["trial","pro","studio"].includes(initial) ? initial : "trial");






  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">Signup</div>
        <div className="mt-2 text-3xl font-semibold tracking-tight text-[#020617]">Create your account</div>
        <div className="mt-3 text-sm text-black/55">Choose a plan and start generating.</div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="grid gap-4">
            {PLANS.map((p) => (
              <PlanCard
                key={p.id}
                active={plan === p.id}
                title={p.name}
                price={p.price}
                note={p.note}
                tint={p.id === "studio"}
                onClick={() => {
                  setPlan(p.id);
                  router.replace(`/signup?plan=${p.id}`);
                }}
              />
            ))}
            <div className="text-center text-sm text-black/55">
              <a href="/pricing" className="font-semibold text-black/70 hover:text-[#020617] hover:underline">
                Change plan →
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            className="rounded-3xl border bg-white/80 p-6 backdrop-blur-md"
            style={{
              borderColor: "rgba(2,6,23,0.10)",
              boxShadow: "0 18px 55px rgba(2,6,23,0.10), 0 0 18px rgba(0,242,255,0.10), 0 0 18px rgba(203,47,255,0.08)",
            }}
          >
            <div className="text-lg font-semibold text-[#020617]">Account</div>

            <div role="status" className="mt-5 rounded-2xl border border-black/10 bg-white/90 p-5 text-sm leading-relaxed text-slate-700">
              Account registration and secure checkout are not yet available. No payment information is collected on this page.
              Please check back when account creation is enabled.
            </div>
            <div className="mt-5">
              <NbButton variant="primary" size="lg" fullWidth disabled>
                Registration coming soon
              </NbButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
