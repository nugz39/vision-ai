"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NB_BRAND_LOGO_SRC } from "@/lib/branding";
import { useAuth } from "@/hooks/useAuth";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-sm transition duration-200 ease-out hover:opacity-90"
      style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}
    >
      {label}
      <span
        className="absolute left-3 right-3 -bottom-1 h-[2px] rounded-full transition-opacity"
        style={{
          background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
          opacity: active ? 1 : 0,
        }}
      />
    </Link>
  );
}

export function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const onLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b backdrop-blur"
      style={{
        borderColor: "rgba(197,107,251,0.18)",
        background: "rgba(10,0,19,0.72)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div
            className="h-10 w-10 overflow-hidden rounded-full border"
            style={{
              borderColor: "rgba(197,107,251,0.35)",
              boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
              background: "rgba(0,0,0,0.25)",
            }}
          >
            <img src={NB_BRAND_LOGO_SRC} alt="NaughtyBotty" className="h-full w-full object-cover" />
          </div>

          <div className="leading-tight">
            <div className="text-sm font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
              NaughtyBotty
            </div>
            <div className="text-[11px]" style={{ color: "rgba(196,179,217,1)", fontFamily: "Inter, system-ui" }}>
              Synthetic Studio
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <NavLink href="/" label="Explore" />
          <NavLink href="/pricing" label="Pricing" />
          <NavLink href="/studio" label="Studio" />
        </nav>

        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="rounded-full border px-4 py-2 text-sm transition duration-200 ease-out hover:opacity-90"
              style={{
                borderColor: "rgba(197,107,251,0.35)",
                color: "#F6F6F6",
                background: "transparent",
              }}
            >
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border px-4 py-2 text-sm transition duration-200 ease-out hover:opacity-90"
              style={{
                borderColor: "rgba(197,107,251,0.35)",
                color: "#F6F6F6",
                background: "transparent",
              }}
            >
              Logout
            </button>
          )}

          <Link
            href="/signup"
            className="rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ease-out"
            style={{
              color: "#F6F6F6",
              background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
              boxShadow: "0 14px 38px rgba(255,0,255,0.15)",
            }}
          >
            Join Free
          </Link>
        </div>
      </div>
    </header>
  );
}
