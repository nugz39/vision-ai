"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { NB_BRAND_LOGO_SRC } from "@/lib/branding";
import { NbButton } from "@/components/ui/NbButton";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/pricing", label: "Pricing" },
  { href: "/gallery", label: "Gallery" },
  { href: "/support", label: "Support" },
];

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function NavLink({ href, label }: NavItem) {
  const pathname = usePathname();
  const active = pathname === href;
  const onHome = pathname === "/";

  return (
    <Link
      href={href}
      className={clsx(
        "relative rounded-full px-3 py-2 text-[12px] font-semibold transition-colors",
        onHome ? (active ? "text-white" : "text-white/75 hover:text-white") : (active ? "text-[#020617]" : "text-black/55 hover:text-[#020617]")
      )}
    >
      {label}
      {/* Active underline only (no filled color box) */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-x-3 -bottom-1 h-px rounded-full transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{
          background:
            "linear-gradient(120deg,rgba(0,242,255,0.9),rgba(203,47,255,0.9),rgba(123,44,255,0.9))",
        }}
      />
    </Link>
  );
}

function NavbarImpl() {
  const router = useRouter();
  const onHome = usePathname() === "/";
  const [open, setOpen] = useState(false);

  // Per your request: top-right CTA always "Free trial" → /pricing, keep same green→cyan background
  const cta = { label: "Open Studio", href: "/studio" };

  return (
    <header
      className={onHome ? "sticky top-0 z-30 border-b border-white/10 bg-[#07111F] text-white" : "sticky top-0 z-30 border-b bg-white/90 backdrop-blur-xl"}
      style={{ borderColor: "rgba(2,6,23,0.10)" }}
    >
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Left: logo */}
          <button
            type="button"
            onClick={() => router.push("/")}
            aria-label="Vision AI home"
            className="flex items-center gap-3"
          >
            <img src={NB_BRAND_LOGO_SRC} alt="" className="h-11 w-11 rounded-xl object-contain sm:h-12 sm:w-12" />
            <span className={onHome ? "text-[21px] font-extrabold tracking-[-0.06em] text-white sm:text-2xl" : "text-[21px] font-extrabold tracking-[-0.06em] text-[#0B1D34] sm:text-2xl"}>Vision <span className="bg-gradient-to-r from-[#47D4D7] to-[#B48BEE] bg-clip-text text-transparent">AI</span></span>
          </button>

          {/* Right: wordmark next to Studio + nav + CTA */}
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 md:flex">
              {NAV.map((n) => (
                <NavLink key={n.href} {...n} />
              ))}
              <div className="ml-2">
                <NbButton variant="primary" size="md" onClick={() => router.push(cta.href)}>
                  {cta.label}
                </NbButton>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <NbButton variant="studio" size="sm" className="hidden sm:inline-flex" onClick={() => router.push(cta.href)}>
                {cta.label}
              </NbButton>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={onHome ? "rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white" : "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#12253D] shadow-sm"}
                style={{ borderColor: "rgba(2,6,23,0.12)" }}
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div
            className={onHome ? "mt-3 rounded-2xl border border-white/15 bg-[#101D2E] p-2 md:hidden" : "mt-3 rounded-2xl border bg-white/80 p-2 backdrop-blur-md md:hidden"}
            style={{ borderColor: "rgba(2,6,23,0.10)" }}
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={onHome ? "block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10" : "block rounded-xl px-3 py-2 text-sm font-semibold text-[#020617] hover:bg-black/[0.04]"}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default function Navbar() {
  return <NavbarImpl />;
}

export { NavbarImpl as Navbar };
