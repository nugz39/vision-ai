"use client";
import { useMemo, useState } from "react";
import Link from "next/link";

const faqs = [
  {q:"Can I try image generation?",a:"The Studio includes a preview-generation interface. Generation availability depends on the connected service."},
  {q:"Does Vision AI support video?",a:"The Studio has a video mode. Output depends on the connected generation backend; video generation is not guaranteed to be available."},
  {q:"How does Remix work?",a:"Remix is an experimental workflow. Image uploads are not yet sent to the backend, so uploading a reference image does not currently transform that image."},
  {q:"Are subscriptions and free trials available?",a:"Registration, subscriptions, billing and credit balances are not yet active. Pricing information is provisional until checkout is enabled."},
  {q:"Where can I explore examples?",a:"Visit the Gallery to browse curated examples of visual styles."},
  {q:"Can I use outputs commercially?",a:"Usage rights depend on the applicable generation model and its terms. Check those terms before commercial use."}
];
export default function SupportPage(){
 const [query,setQuery]=useState("");
 const [open,setOpen]=useState<number|null>(null);
 const filtered=useMemo(()=>faqs.filter(f=>(f.q+" "+f.a).toLowerCase().includes(query.toLowerCase())),[query]);
 return <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
   <p className="text-xs font-bold uppercase tracking-[.22em] text-[#7CB6E4]">We're here to help</p>
   <h1 className="mt-3 text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Support &amp; answers.</h1>
   <p className="mt-4 max-w-2xl text-base leading-7 text-[#B2C4D8]">Find clear answers about the Vision AI workspace and its current capabilities.</p>
   <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
     <section className="rounded-[1.8rem] border border-white/15 bg-[#101F32] p-6 sm:p-8">
       <label htmlFor="faq-search" className="text-xs font-bold uppercase tracking-[.15em] text-[#AFC2D7]">Search questions</label>
       <input id="faq-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search topics..." className="mt-3 w-full rounded-xl border border-white/15 bg-[#081626] px-4 py-4 text-white outline-none placeholder:text-[#8195AD] focus:border-[#4B91CF]" />
       <div className="mt-6 divide-y divide-white/10">{filtered.map((f,i)=><div key={f.q} className="py-5"><button type="button" onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center justify-between gap-4 text-left text-[15px] font-semibold text-white"><span>{f.q}</span><span className="text-[#8BBBE9]">{open===i?"−":"+"}</span></button>{open===i&&<p className="mt-3 text-sm leading-7 text-[#B2C4D8]">{f.a}</p>}</div>)}{filtered.length===0&&<p className="py-6 text-sm text-[#B2C4D8]">No matching questions.</p>}</div>
     </section>
     <aside className="h-fit overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#101F32]">
       <img src="/assets/vision-ai-new/astronaut.webp" alt="Cinematic astronaut artwork" className="aspect-[16/10] w-full object-cover"/>
       <div className="p-7"><h2 className="text-2xl font-bold text-white">Explore what’s possible.</h2><p className="mt-3 text-sm leading-7 text-[#B2C4D8]">Discover creative examples or open the Studio to explore its tools.</p><Link href="/gallery" className="mt-6 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Explore gallery →</Link></div>
     </aside>
   </div>
 </main>
}