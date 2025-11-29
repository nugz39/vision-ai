"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NbButton } from "@/components/ui/NbButton";

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Card({
  children,
  tint,
}: {
  children: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <div
      className={clsx(
        "group h-full rounded-3xl border bg-white/80 p-6 backdrop-blur-md transition-all hover:-translate-y-0.5 flex flex-col"
      )}
      style={{
        borderColor: "rgba(2,6,23,0.10)",
        background: tint
          ? "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.76)), radial-gradient(circle at 25% 25%, rgba(0,242,255,0.12), transparent 55%), radial-gradient(circle at 70% 30%, rgba(203,47,255,0.10), transparent 58%)"
          : "rgba(255,255,255,0.80)",
        boxShadow:
          "0 18px 55px rgba(2,6,23,0.10), 0 0 20px rgba(0,242,255,0.10), 0 0 20px rgba(203,47,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export default function PricingPage() {
  const router = useRouter();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">Pricing</div>
        <div className="mt-2 text-3xl font-semibold tracking-tight text-[#020617]">Plans that scale with output</div>
        <div className="mt-3 text-sm text-black/55">Premium controls with neon pastel finish.</div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3 items-stretch">
        {/* Trial */}
        <Card>
          <div>
            <div className="text-sm font-semibold text-[#020617]">Free Trial</div>
            <div className="mt-2 text-3xl font-semibold text-[#020617]">$0</div>
            <div className="mt-1 text-sm text-black/55">3 days</div>

            <ul className="mt-6 space-y-2 text-sm text-black/55">
              <li>• Full Studio access</li>
              <li>• Credits included</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <NbButton variant="primary" size="lg" fullWidth onClick={() => router.push("/signup?plan=trial")}>
              Start free trial
            </NbButton>
          </div>
        </Card>

        {/* Pro */}
        <Card>
          <div>
            <div className="text-sm font-semibold text-[#020617]">Pro</div>
            <div className="mt-2 text-3xl font-semibold text-[#020617]">
              $29<span className="text-base font-semibold text-black/55">/mo</span>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-black/55">
              <li>• Higher monthly credits</li>
              <li>• Faster queues</li>
              <li>• Priority exports</li>
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <NbButton variant="primary" size="lg" fullWidth onClick={() => router.push("/signup?plan=pro")}>
              Continue with Pro
            </NbButton>
          </div>
        </Card>

        {/* Studio (light tint) */}
        <Card tint>
          <div>
            <div className="text-sm font-semibold text-[#020617]">Studio</div>
            <div className="mt-2 text-3xl font-semibold text-[#020617]">
              $79<span className="text-base font-semibold text-black/55">/mo</span>
            </div>
            <div className="mt-1 text-sm text-black/55">Best value for teams & heavy output</div>

            <ul className="mt-6 space-y-2 text-sm text-black/55">
              <li>• Max credits + priority</li>
              <li>• Studio quality presets</li>
              <li>• Advanced control access</li>
            </ul>
          </div>

          <div className="mt-auto pt-7">
            <NbButton variant="primary" size="lg" fullWidth onClick={() => router.push("/signup?plan=studio")}>
              Upgrade to Studio
            </NbButton>
          </div>
        </Card>
      </div>

      <div className="mt-10 text-center text-sm text-black/55">
        Have more questions?{" "}
        <Link href="/support" className="font-semibold text-black/70 hover:text-[#020617] hover:underline">
          Visit Support →
        </Link>
      </div>
    </main>
  );
}
