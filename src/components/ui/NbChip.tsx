"use client";

import clsx from "clsx";

interface NbChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function NbChip({ active, className, children, ...props }: NbChipProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FF]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F8FB]",
        active
          ? "text-slate-900 shadow-sm bg-[linear-gradient(120deg,rgba(0,242,255,0.22)_0%,rgba(203,47,255,0.18)_55%,rgba(0,242,255,0.22)_100%)] border border-transparent"
          : "border border-slate-300 bg-white text-slate-600 hover:text-slate-900 hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
