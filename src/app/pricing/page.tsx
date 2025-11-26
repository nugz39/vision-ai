"use client";

import Link from "next/link";

function TierCard({
  title,
  topRightStrike,
  priceMain,
  subtitle,
  bullets,
  ctaHref,
  ctaLabel,
  highlight,
}: {
  title: string;
  topRightStrike?: string;
  priceMain: string;
  subtitle?: string;
  bullets: string[];
  ctaHref: string;
  ctaLabel: string;
  highlight?: boolean;
}) {
  return (
    <div
      className="group relative flex h-full flex-col rounded-2xl border p-6 transition duration-200 ease-out hover:-translate-y-1"
      style={{
        borderColor: "rgba(197,107,251,0.25)",
        background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
        boxShadow: highlight
          ? "0 0 28px rgba(255,59,255,0.18), 0 16px 44px rgba(255,0,255,0.05)"
          : "0 16px 44px rgba(255,0,255,0.05)",
      }}
    >
      {topRightStrike && (
        <div className="absolute right-5 top-5 text-xs line-through opacity-80" style={{ color: "#C4B3D9" }}>
          {topRightStrike}
        </div>
      )}

      <div className="text-sm font-medium" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
        {title}
      </div>

      <div className="mt-2 text-3xl font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
        {priceMain}
      </div>

      {subtitle && (
        <div className="mt-2 text-sm" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
          {subtitle}
        </div>
      )}

      <ul className="mt-4 space-y-2 text-sm" style={{ fontFamily: "Inter, system-ui" }}>
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span style={{ color: "#c56bfb" }}>•</span>
            <span style={{ color: "#C4B3D9" }}>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <Link
          href={ctaHref}
          className="block h-11 w-full rounded-xl px-4 py-2 text-center text-sm font-semibold transition duration-200 ease-out hover:opacity-95"
          style={{
            color: "#F6F6F6",
            background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
            boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
          }}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const studioFeatures = [
    "Unlimited concurrent generations",
    "Exclusive studio-grade styles",
    "Priority queue / exports",
    "Early access to new features",
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
            Pricing
          </h1>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <TierCard
            title="Studio Free Trial (3 days)"
            topRightStrike="$39/mo"
            priceMain="Free Trial"
            subtitle="Then $39/mo Studio unless cancelled."
            bullets={studioFeatures}
            ctaHref="/signup?plan=trial"
            ctaLabel="Start 3-day Studio Trial"
            highlight
          />

          <TierCard
            title="Premium"
            priceMain="$19/mo"
            bullets={[
              "Unlock full-quality generations",
              "Faster queue priority",
              "High-priority support",
            ]}
            ctaHref="/signup?plan=premium"
            ctaLabel="Try Premium"
          />

          <TierCard
            title="Studio"
            priceMain="$39/mo"
            bullets={studioFeatures}
            ctaHref="/signup?plan=studio"
            ctaLabel="Try Studio"
          />
        </div>
      </div>
    </main>
  );
}
