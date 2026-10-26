import Link from "next/link";
const plans=[
 {name:"Trial",price:"$0",term:"Proposed 3-day trial",details:["Explore the creative workspace","Image and video modes","Account setup pending"]},
 {name:"Pro",price:"$29",term:"Proposed monthly pricing",details:["Designed for regular creators","Planned enhanced generation access","Subscription setup pending"]},
 {name:"Studio",price:"$79",term:"Proposed monthly pricing",details:["Designed for demanding workflows","Planned advanced controls","Subscription setup pending"]}
];
export default function PricingPage(){
 return <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
 <div className="text-center"><p className="text-xs font-bold uppercase tracking-[.25em] text-[#80BDE8]">Vision AI plans</p><h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] text-white sm:text-6xl">Create on your terms.</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#B3C6DB]">We&apos;re preparing account registration and subscriptions. The plans below are proposed and cannot yet be purchased.</p></div>
 <div className="mt-12 grid gap-5 md:grid-cols-3">{plans.map((p,i)=><article key={p.name} className={`flex flex-col rounded-[1.8rem] border p-7 sm:p-8 ${i===1?"border-[#5987C5] bg-[linear-gradient(145deg,#152B48,#171C39)]":"border-white/15 bg-[#101F32]"}`}>
 <div className="text-xs font-bold uppercase tracking-[.2em] text-[#8CBDEA]">{p.name}</div><div className="mt-6 text-5xl font-extrabold tracking-[-.05em] text-white">{p.price}<span className="ml-1 text-sm font-medium tracking-normal text-[#AFC2D7]">{i===0?"":"/mo"}</span></div><p className="mt-3 text-sm text-[#B5C7DA]">{p.term}</p><ul className="mt-9 flex-1 space-y-4">{p.details.map(x=><li key={x} className="flex gap-3 text-sm leading-6 text-[#D5E3F2]"><span className="text-[#6CB8E3]">✧</span>{x}</li>)}</ul><div className="mt-10 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-[#D5E3F2]">Coming soon</div></article>)}</div>
 <p className="mt-10 text-center text-sm text-[#AFC2D7]">Questions about availability? <Link href="/support" className="font-semibold text-[#8CC9F3] hover:underline">Visit Support →</Link></p>
 </main>
}