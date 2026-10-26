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
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-5 sm:px-6 sm:pt-8">
        {/* HERO — mobile-first editorial layout */}
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_90%_12%,rgba(180,149,255,0.22),transparent_50%),radial-gradient(ellipse_at_5%_60%,rgba(0,205,229,0.12),transparent_55%),#F9FBFF] px-5 pb-8 pt-16 sm:px-10 sm:pt-20 lg:px-14 lg:py-24">
          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <div className="max-w-[680px]">
              <div className="inline-flex items-center rounded-full border border-[#9BDAE3]/70 bg-[#E7FAF9]/75 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#267E85] sm:text-xs">
                YOUR CREATIVE AI STUDIO
              </div>
              <h1 className="mt-8 text-[clamp(3.25rem,8.5vw,6.1rem)] font-extrabold leading-[0.99] tracking-[-0.065em] text-[#081A30]">
                Your ideas.
                <br />
                <span className="bg-gradient-to-r from-[#129BDF] via-[#20B5CE] to-[#7E38E8] bg-clip-text text-transparent">Without limits.</span>
              </h1>
              <p className="mt-7 max-w-[590px] text-[17px] leading-[1.75] text-[#526578] sm:text-xl">
                Create striking images, explore cinematic video and shape your next idea in one intuitive AI workspace.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/studio" className="inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#0E9DE5] via-[#16B9D2] to-[#8437E7] px-8 text-base font-bold text-white shadow-[0_12px_32px_rgba(18,151,199,0.22)] transition hover:-translate-y-0.5 hover:shadow-xl">
                  Start creating <span aria-hidden="true" className="ml-2">→</span>
                </Link>
                <Link href="/gallery" className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#D5DDE6] bg-white px-8 text-base font-bold text-[#13243B] shadow-sm transition hover:bg-slate-50">
                  Explore the gallery
                </Link>
              </div>
              <p className="mt-7 text-sm leading-relaxed text-[#607386]">One creative space for images, motion and fresh perspectives.</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#35C5E0]/15 to-[#AF70F5]/15 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-2 shadow-[0_25px_70px_rgba(22,41,81,0.14)]">
                <div className="relative aspect-[4/4.3] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4] lg:aspect-[4/5]">
                  <img src="/assets/branding/hero-panel.png" alt="Abstract luminous visual created for Vision AI" className="h-full w-full object-cover" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/85 px-4 py-2 text-xs font-bold tracking-wide text-[#203149] shadow-sm backdrop-blur-md">Imagine · Create · Refine</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODES */}
        <section className="mt-20">
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
