import Link from "next/link";
import StudioGradientShell from "@/components/layout/StudioGradientShell";
import GeneratorPreviewCard from "@/components/ui/GeneratorPreviewCard";

type ModeCard = {
  id: "image" | "video" | "remix";
  title: string;
  description: string;
  thumb: string;
  studioHref: string;
};

const MODE_CARDS: ModeCard[] = [
  {
    id: "image",
    title: "Image",
    description: "Generate studio-grade visuals for ads, decks, and socials.",
    thumb: "/assets/gallery/prompt-01.png",
    studioHref: "/studio?mode=image&style=neon",
  },
  {
    id: "video",
    title: "Video",
    description: "Create motion keyframes and guidance for edits and cuts.",
    thumb: "/assets/gallery/prompt-02.png",
    studioHref: "/studio?mode=video&style=cinematic",
  },
  {
    id: "remix",
    title: "Remix",
    description: "Re-style and re-grade existing assets instantly.",
    thumb: "/assets/gallery/prompt-03.png",
    studioHref: "/studio?mode=remix&style=soft-pastel-grade",
  },
];

type ShowcaseItem = {
  title: string;
  caption: string;
  src: string;
  href: string;
  badge: "Image" | "Video" | "Remix";
};

const SHOWCASE: ShowcaseItem[] = [
  { title: "Neon Product Frame", caption: "Campaign-ready product photography.", src: "/assets/gallery/prompt-07.png", href: "/gallery?mode=image&style=neon", badge: "Image" },
  { title: "Architectural Minimal", caption: "Clean forms, calm editorial tone.", src: "/assets/gallery/prompt-06.png", href: "/gallery?mode=image&style=minimal", badge: "Image" },
  { title: "Cinematic Keyframe", caption: "Storyboard-ready shot direction.", src: "/assets/gallery/prompt-09.png", href: "/gallery?mode=video&style=cinematic", badge: "Video" },
  { title: "UI Mockup Look", caption: "Modern UI / product interface shots.", src: "/assets/gallery/prompt-05.png", href: "/gallery?mode=image&style=product", badge: "Image" },
  { title: "Soft Neon Portrait", caption: "Commercial-grade lighting & grade.", src: "/assets/gallery/prompt-04.png", href: "/gallery?mode=image&style=editorial", badge: "Image" },
  { title: "Cyber Grade Remix", caption: "Same subject, fresher lighting.", src: "/assets/gallery/prompt-10.png", href: "/gallery?mode=remix&style=cyberpunk-neon-grade", badge: "Remix" },
  { title: "Abstract Neon Form", caption: "Premium abstract motion still.", src: "/assets/gallery/prompt-11.png", href: "/gallery?mode=video&style=abstract-motion", badge: "Video" },
  { title: "Vintage Film Feel", caption: "Kodak-like warmth and grain.", src: "/assets/gallery/prompt-08.png", href: "/gallery?mode=remix&style=film-emulation-kodak-style", badge: "Remix" },
  { title: "Studio Still", caption: "High-key product lighting.", src: "/assets/gallery/prompt-04.png", href: "/gallery?mode=image&style=product", badge: "Image" },
];

function OverlayChip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-slate-800 shadow-sm">
      {text}
    </span>
  );
}

/** Match Support "Send message" gradient for primary buttons in Home */
const supportGradientBtn =
  "relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[0.01em] text-white " +
  "bg-gradient-to-r from-[#13DFFF] via-[#C931FD] to-[#842CFE] " +
  "shadow-[0_12px_30px_rgba(132,44,254,0.22)] " +
  "transition-transform duration-150 ease-out will-change-transform " +
  "hover:scale-[1.02] hover:shadow-[0_16px_44px_rgba(19,223,255,0.18)] hover:brightness-[1.03] " +
  "active:scale-[0.995] active:brightness-[0.95] " +
  "before:pointer-events-none before:absolute before:inset-[-2px] before:rounded-full before:opacity-0 before:transition-opacity before:duration-150 " +
  "before:bg-[linear-gradient(90deg,rgba(19,223,255,0.0),rgba(19,223,255,0.12),rgba(201,49,253,0.10),rgba(132,44,254,0.10),rgba(132,44,254,0.0))] " +
  "hover:before:opacity-100";

export default function Page() {
  return (
    <StudioGradientShell>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:py-14">
        {/* HERO */}
        <section className="grid items-center gap-8 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl text-center lg:text-left">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">
              PREMIUM MULTI-MODAL AI STUDIO
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#0B1220] sm:text-5xl lg:text-6xl">
              Build premium
              <br />
              visuals in minutes.
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-black/55 sm:text-base">
              Vision AI Studio is a clean, fast workflow for images, video keyframes and remixes—built for creators who ship.
            </p>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/studio" className={supportGradientBtn}>
                Open Studio
              </Link>
              <Link
                href="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 hover:shadow-md"
              >
                View pricing
              </Link>
            </div>

            <div className="mt-3 text-center text-xs font-semibold text-black/55 sm:text-left">
              No calls. No meetings. Cancel anytime.
            </div>
          </div>

          {/* HERO IMAGE PANEL (same size as before) */}
          <div className="relative mx-auto h-[340px] w-full max-w-xl overflow-hidden rounded-3xl border border-black/5 bg-white/60 shadow-sm">
            <img
              src="/assets/branding/hero-panel.png"
              alt="Vision AI hero visual"
              className="h-full w-full object-cover"
            />
            {/* keep a *very* soft wash so it still feels on-brand */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(19,223,255,0.08),rgba(201,49,253,0.06),rgba(132,44,254,0.06))]" />
          </div>
        </section>

        {/* MODES */}
        <section className="mt-14">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">Modes</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1220] sm:text-4xl">
              Choose your workflow
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {MODE_CARDS.map((m) => (
              <div
                key={m.id}
                className="flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-black/5 bg-white/75 shadow-sm"
              >
                <div className="p-6">
                  <div className="text-xl font-semibold text-[#0B1220]">{m.title}</div>
                  <div className="mt-2 text-sm leading-relaxed text-black/55">{m.description}</div>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
                    <div className="aspect-[16/10] w-full bg-black/[0.02]">
                      <img src={m.thumb} alt={`${m.title} thumbnail`} className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-6 pt-0">
                  <div className="flex justify-center">
                    <Link href={m.studioHref} className={`${supportGradientBtn} w-full`}>
                      Open in Studio
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GENERATOR PREVIEW */}
        <section className="mt-14">
          <GeneratorPreviewCard className="mx-auto max-w-6xl" />
        </section>

        {/* SHOWCASE */}
        <section className="mt-14">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/55">Generator showcase</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#0B1220] sm:text-4xl">
                Curated outputs across modes
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/55 sm:text-base">
                Explore a curated set of image, video, and remix outputs from Vision AI.
              </p>
            </div>

            <Link href="/gallery?mode=image&style=neon" className="hidden text-sm font-semibold text-slate-800 hover:underline sm:inline">
              See more in Gallery →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SHOWCASE.slice(0, 9).map((s, idx) => (
              <Link
                key={`${s.title}-${idx}`}
                href={s.href}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute left-3 top-3 z-10">
                  <OverlayChip text={s.badge} />
                </div>

                <div className="aspect-[4/5] w-full overflow-hidden bg-black/[0.02]">
                  <img src={s.src} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>

                <div className="px-4 pb-4 pt-3">
                  <div className="text-sm font-semibold text-[#0B1220]">{s.title}</div>
                  <div className="mt-1 text-[12px] text-black/55">{s.caption}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/gallery?mode=image&style=neon" className="text-sm font-semibold text-slate-800 hover:underline">
              See more in Gallery →
            </Link>
          </div>
        </section>
      </main>
    </StudioGradientShell>
  );
}
