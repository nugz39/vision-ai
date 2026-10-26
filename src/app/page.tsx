import Link from "next/link";
import GeneratorPreviewCard from "@/components/ui/GeneratorPreviewCard";

const gallery = [
  { src: "/assets/vision-ai-new/cinematic-car.webp", title: "Creative campaigns", tag: "Image" },
  { src: "/assets/vision-ai-new/astronaut.webp", title: "Cinematic stories", tag: "Video" },
  { src: "/assets/vision-ai-new/mountain-cabin.webp", title: "Beautiful environments", tag: "Image" },
  { src: "/assets/vision-ai-new/fantasy-world.webp", title: "Editorial visions", tag: "Remix" },
];
const tools = [
  { icon: "▧", title: "Images", desc: "Turn a written idea into distinctive, polished visuals.", href: "/studio?mode=image", color: "text-[#366AD4]" },
  { icon: "▷", title: "Video", desc: "Explore cinematic scenes and motion in one workspace.", href: "/studio?mode=video", color: "text-[#009DAB]" },
  { icon: "✧", title: "Remix", desc: "Experiment with fresh styles and creative directions.", href: "/studio?mode=remix", color: "text-[#8A4CE6]" },
  { icon: "✦", title: "Creative tools", desc: "Fine-tune your vision with intuitive studio controls.", href: "/studio", color: "text-[#148E9E]" },
];
const primary = "inline-flex min-h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#087EAC] via-[#2469B7] to-[#7140B6] px-8 text-[15px] font-bold text-white shadow-[0_12px_28px_rgba(26,67,133,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(26,67,133,0.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#337BB5]";
const secondary = "inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 bg-white/[0.06] px-8 text-[15px] font-semibold text-white transition hover:bg-white/[0.13]";

export default function Page() {
  return (
    <main className="bg-[#F8FAFD]">
      <section className="relative isolate overflow-hidden bg-[#07111F] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_35%,rgba(100,55,178,0.42),transparent_45%),radial-gradient(ellipse_at_62%_65%,rgba(0,132,187,0.25),transparent_55%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 pb-12 pt-16 sm:px-10 sm:pt-24 lg:min-h-[650px] lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.34em] text-[#C0D4E9] sm:text-xs">Premium multi-modal AI studio</div>
            <h1 className="text-[clamp(3.5rem,8.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.065em]">
              Your ideas.<br /><span className="bg-gradient-to-r from-[#3AD3DC] via-[#718DF2] to-[#C579EA] bg-clip-text text-transparent">Without limits.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.7] text-[#D3E0EE] sm:text-xl">
              Create striking images, explore cinematic video and reimagine your ideas with the power of AI. One creative space, endless possibilities.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/studio" className={primary}>Open Studio <span aria-hidden="true" className="ml-3">→</span></Link>
              <Link href="/gallery" className={secondary}>Explore gallery</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs font-medium text-[#C7D8E8]">
              <span>✧ Creative freedom</span><span>◇ Beautiful visual results</span><span>∞ Images, video &amp; more</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[590px] lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-5 rounded-full bg-gradient-to-tr from-[#0DA6CF]/20 to-[#9B59DA]/30 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-3 [transform:rotate(-2deg)] sm:gap-4">
              <div className="space-y-3 pt-10 sm:space-y-4">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/20 shadow-2xl"><img src="/assets/vision-ai-new/cinematic-car.webp" alt="Creative image example" className="aspect-[4/5] w-full object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-[#07111F]/80 px-3 py-1 text-xs font-semibold backdrop-blur">Images</span></div>
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/20 shadow-2xl"><img src="/assets/vision-ai-new/mountain-cabin.webp" alt="Creative landscape example" className="aspect-[5/4] w-full object-cover" /></div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/20 shadow-2xl"><img src="/assets/vision-ai-new/astronaut.webp" alt="Cinematic creative example" className="aspect-[5/4] w-full object-cover" /><span className="absolute bottom-3 right-3 rounded-full bg-[#07111F]/80 px-3 py-1 text-xs font-semibold backdrop-blur">Video</span></div>
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/20 shadow-2xl"><img src="/assets/vision-ai-new/fantasy-world.webp" alt="Artistic portrait example" className="aspect-[4/5] w-full object-cover" /><span className="absolute bottom-3 right-3 rounded-full bg-[#07111F]/80 px-3 py-1 text-xs font-semibold backdrop-blur">Remix</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="mb-9"><div className="text-xs font-bold uppercase tracking-[0.25em] text-[#698097]">Everything in one place</div><h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em] text-[#0C1A2C] sm:text-5xl">Create without the complexity.</h2></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map(t => <Link key={t.title} href={t.href} className="group rounded-[1.6rem] border border-[#E8ECF4] bg-white p-7 shadow-[0_10px_35px_rgba(24,45,78,0.04)] transition hover:-translate-y-1 hover:shadow-xl">
            <div className={`text-4xl font-bold ${t.color}`}>{t.icon}</div><h3 className="mt-7 text-xl font-bold text-[#0D2036]">{t.title}</h3><p className="mt-3 min-h-16 text-sm leading-relaxed text-[#667589]">{t.desc}</p><span className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E0E6EF] text-[#346EAA] transition group-hover:bg-[#EAF4FC]">→</span>
          </Link>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {gallery.map(g => <div key={g.title} className="group relative overflow-hidden rounded-[1.4rem]"><img src={g.src} alt={g.title} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute bottom-3 left-3 rounded-full bg-[#07111F]/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{g.tag}</span></div>)}
        </div>
        <div className="lg:pl-10">
          <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#72849A]">Built for creators and businesses</div>
          <h2 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] text-[#0D1C30] sm:text-5xl">Professional results.<br />Made simple.</h2>
          <p className="mt-6 text-base leading-[1.85] text-[#607287]">Whether you are creating content, building a brand or exploring something new, Vision AI brings your ideas to life with a focused creative workspace.</p>
          <ul className="mt-7 space-y-4 text-sm font-medium text-[#273C52]"><li>✧ Explore distinct visual styles</li><li>◇ Create for campaigns, stories and personal projects</li><li>✦ Refine ideas with flexible creative controls</li><li>∞ Move between image and video workflows</li></ul>
          <Link href="/studio" className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-[#C9D5E3] bg-white px-7 text-sm font-bold text-[#15314C] transition hover:bg-[#EAF2FA]">Explore the Studio →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_100%_100%,rgba(53,146,200,0.35),transparent_45%),#0B1522] px-7 py-12 text-white sm:px-12 sm:py-16">
          <div className="text-xs font-bold uppercase tracking-[0.28em] text-[#B9C9DB]">How it works</div>
          <div className="mt-3 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><h2 className="max-w-xl text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">From idea to incredible in three simple steps.</h2><Link href="/studio" className={primary}>Open Studio →</Link></div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[["01","Describe your vision","Start with a prompt and the scene you imagine."],["02","Choose your direction","Select a mode, style and creative settings."],["03","Generate and refine","See the result, adjust and keep exploring."]].map(([n,t,d])=><div key={n} className="border-t border-white/20 pt-5"><span className="text-2xl font-light text-[#73C6EB]">{n}</span><h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-2 text-sm leading-relaxed text-[#B8C9DA]">{d}</p></div>)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-10"><div className="mb-8 text-center"><div className="text-xs font-bold uppercase tracking-[0.25em] text-[#72849A]">Try the workspace</div><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#0C1A2C] sm:text-4xl">Bring your next idea to life.</h2></div><GeneratorPreviewCard /></section>
    </main>
  );
}
