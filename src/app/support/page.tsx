"use client";

import React, { useMemo, useState } from "react";
import { NbButton } from "@/components/ui/NbButton";

type FAQ = {
  q: string;
  a: string;
};

const FAQS: FAQ[] = [
  { q: "How does the free trial work?", a: "You get 3 days of full Studio access. Cancel anytime." },
  { q: "What’s included in Pro?", a: "Higher credits, faster queues, and priority exports." },
  { q: "What’s included in Studio?", a: "Max credits, Studio quality presets, and advanced controls." },
  { q: "Can I cancel anytime?", a: "Yes. You can cancel any time from your account settings." },
  { q: "Do you support Image, Video, and Remix modes?", a: "Yes — the Studio includes Image generation, Video keyframe direction, and Remix restyling." },
  { q: "How do credits work?", a: "Credits are consumed per generation depending on mode and quality preset." },
  { q: "Can I use outputs commercially?", a: "Commercial usage depends on your plan and terms. See Terms for full details." },
  { q: "Where can I see examples of outputs?", a: "Use the Gallery to explore curated outputs across Image, Video, and Remix." },
];

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function SupportPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div
            className="rounded-3xl border bg-white/80 p-6 backdrop-blur-md"
            style={{
              borderColor: "rgba(2,6,23,0.10)",
              boxShadow: "0 18px 55px rgba(2,6,23,0.10), 0 0 18px rgba(0,242,255,0.10), 0 0 18px rgba(203,47,255,0.08)",
            }}
          >
            <div className="text-2xl font-semibold tracking-tight text-[#020617]">Support</div>
            <div className="mt-2 text-sm text-black/55">Search FAQs and get quick answers.</div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search (e.g. "billing", "trial", "credits")'
              className="mt-5 w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(0,242,255,0.35)]"
              style={{ borderColor: "rgba(2,6,23,0.10)" }}
            />

            <div className="mt-6 divide-y" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
              {filtered.map((f, idx) => {
                const isOpen = open === idx;
                return (
                  <div key={f.q} className="py-4">
                    <button
                      type="button"
                      onClick={() => setOpen((v) => (v === idx ? null : idx))}
                      className={clsx(
                        "flex w-full items-center justify-between gap-4 text-left",
                        "text-sm font-semibold text-[#020617]"
                      )}
                    >
                      <span>{f.q}</span>
                      <span className="text-black/55">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-sm leading-relaxed text-black/55">{f.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div
            className="rounded-3xl border p-6 backdrop-blur-md"
            style={{
              borderColor: "rgba(2,6,23,0.10)",
              background:
                "radial-gradient(circle at 25% 25%, rgba(0,242,255,0.14), transparent 55%), radial-gradient(circle at 70% 30%, rgba(203,47,255,0.12), transparent 58%), rgba(255,255,255,0.78)",
              boxShadow: "0 18px 55px rgba(2,6,23,0.10), 0 0 18px rgba(0,242,255,0.10), 0 0 18px rgba(203,47,255,0.08)",
            }}
          >
            <div className="text-lg font-semibold text-[#020617]">Contact</div>
            <div className="mt-2 text-sm text-black/55">Send a message and we’ll get back to you.</div>

            <div className="mt-5 grid gap-3">
              <input
                className="w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(0,242,255,0.35)]"
                style={{ borderColor: "rgba(2,6,23,0.10)" }}
                placeholder="Email"
              />
              <input
                className="w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(0,242,255,0.35)]"
                style={{ borderColor: "rgba(2,6,23,0.10)" }}
                placeholder="Subject"
              />
              <textarea
                rows={5}
                className="w-full resize-none rounded-2xl border bg-white/90 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[rgba(0,242,255,0.35)]"
                style={{ borderColor: "rgba(2,6,23,0.10)" }}
                placeholder="Message"
              />
            </div>

            <div className="mt-5">
              <NbButton variant="primary" size="lg" fullWidth onClick={() => {}}>
                Send message
              </NbButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
