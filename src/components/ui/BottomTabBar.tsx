"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const tabs = [
  { href: "/", label: "Explore", icon: "🏙️" },
  { href: "/chat", label: "Chat", icon: "💬" },
  { href: "/create", label: "Create", icon: "✨" },
  { href: "/generate", label: "Generate", icon: "🎬" },
  { href: "/my-ai", label: "My AI", icon: "👤" },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-nb-border bg-nb-bg-elevated/95 px-2 py-2 text-[11px] text-nb-muted backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-1">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={clsx(
                "flex flex-1 flex-col items-center rounded-full px-2 py-1 transition",
                active ? "bg-nb-pink/15 text-nb-pink" : "hover:bg-nb-bg-soft hover:text-nb-text"
              )}
              aria-label={tab.label}
            >
              <span aria-hidden="true" className="text-base">{tab.icon}</span>
              <span className="mt-0.5 truncate">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
