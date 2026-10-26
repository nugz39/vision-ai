import Link from "next/link";

const plans = [
 {name:"Free",regular:0,launch:0,featured:false,description:"Try the creative tools",features:["3 image generations, once per account","1 short video preview, subject to backend availability","Buy image or video credit packs when your allowance runs out","No subscription required"]},
 {name:"Creator",regular:15,launch:3.75,featured:false,description:"For occasional creators",features:["Monthly image credit allowance (to be finalised)","Optional video credit packs","Purchase extra image credits anytime","Access to core creative tools"]},
 {name:"Pro",regular:29,launch:7.25,featured:true,description:"For regular creators",features:["Higher monthly image allowance (to be finalised)","Optional video credit packs","Purchase extra credits without upgrading","Enhanced generation options as available"]},
 {name:"Studio",regular:69,launch:17.25,featured:false,description:"For frequent creative work",features:["Highest monthly image allowance (to be finalised)","Video credits available separately","Purchase additional credits on demand","Advanced features as they become available"]}
];
export default function PricingPage(){
 return <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
 <div className="text-center">
  <p className="text-xs font-bold uppercase tracking-[.24em] text-[#8CC9F3]">Vision AI launch offer</p>
  <h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Create more. Spend less.</h1>
  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#B3C6DB]">Start with three free images. Upgrade when you&apos;re ready, or top up with image and video credits.</p>
  <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-[#578BC7]/45 bg-[#142842] px-5 py-4 text-sm leading-6 text-[#D9EBFF]"><strong className="text-white">Planned launch special: 75% off</strong> your first monthly subscription payment. Standard monthly rates apply from month two. The offer is not yet active; billing and generation allowances must be finalised before launch.</div>
 </div>
 <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{plans.map(p=><article key={p.name} className={`flex flex-col rounded-[1.7rem] border p-6 ${p.featured?"border-[#608BCE] bg-[linear-gradient(145deg,#172F4C,#1C2040)]":"border-white/15 bg-[#101F32]"}`}>
  <div className="flex items-center justify-between gap-2"><span className="text-xs font-bold uppercase tracking-[.18em] text-[#8CBDEA]">{p.name}</span>{p.featured&&<span className="rounded-full bg-[#315D92] px-3 py-1 text-[11px] font-bold text-white">Popular</span>}</div>
  <p className="mt-4 min-h-10 text-sm text-[#B5C7DA]">{p.description}</p>
  <div className="mt-5 text-4xl font-extrabold tracking-[-.05em] text-white">A${p.launch.toFixed(2)}<span className="ml-1 text-sm font-medium tracking-normal text-[#AFC2D7]">{p.regular===0?"":"/mo"}</span></div>
  {p.regular>0?<p className="mt-2 text-xs text-[#B5C7DA]"><span className="line-through">A${p.regular.toFixed(2)}/mo</span> · first month only</p>:<p className="mt-2 text-xs text-[#B5C7DA]">Limited free allowance</p>}
  <ul className="mt-7 flex-1 space-y-4">{p.features.map(x=><li key={x} className="flex gap-3 text-sm leading-6 text-[#D5E3F2]"><span className="text-[#6CB8E3]">✧</span><span>{x}</span></li>)}</ul>
  <div className="mt-8 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-[#D5E3F2]">Coming soon</div>
 </article>)}</div>
 <section className="mt-12 grid gap-5 md:grid-cols-2">
  <div className="rounded-[1.7rem] border border-white/15 bg-[#101F32] p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8CBDEA]">Image credits</p><h2 className="mt-3 text-2xl font-bold text-white">Need more than 3 images?</h2><p className="mt-3 text-sm leading-7 text-[#B5C7DA]">Purchase extra image credits without changing plans. Credit-pack sizes and prices will be announced after generation costs are verified.</p><div className="mt-6 rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-[#D5E3F2]">Image credit packs — coming soon</div></div>
  <div className="rounded-[1.7rem] border border-white/15 bg-[#101F32] p-7"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#8CBDEA]">Video credits</p><h2 className="mt-3 text-2xl font-bold text-white">Create more video.</h2><p className="mt-3 text-sm leading-7 text-[#B5C7DA]">Video uses a separate credit balance. Additional video credits can be purchased as needed. Preview length, generation limits and pricing will be set after backend testing.</p><div className="mt-6 rounded-full border border-white/20 px-5 py-3 text-center text-sm font-semibold text-[#D5E3F2]">Video credit packs — coming soon</div></div>
 </section>
 <p className="mt-9 text-center text-sm text-[#AFC2D7]">Subscriptions and credit purchases are not yet available. <Link href="/support" className="font-semibold text-[#8CC9F3] hover:underline">Questions? Visit Support →</Link></p>
 </main>
}