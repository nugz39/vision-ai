"use client";

import clsx from "clsx";

interface NbChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function NbChip({ active, className, children, ...props }: NbChipProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nb-bg",
        active
          ? "border-nb-pink bg-nb-pink/20 text-nb-pink"
          : "border-nb-border text-nb-muted hover:border-nb-pink-soft hover:text-nb-pink-soft",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
