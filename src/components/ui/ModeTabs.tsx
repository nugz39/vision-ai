"use client";

import * as React from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export type ModeTabsOption<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value: T;
  onChange: (v: T) => void;
  options: ModeTabsOption<T>[];
  className?: string;
  activeVariant?: "studio" | "support";
};

export default function ModeTabs<T extends string>({
  value,
  onChange,
  options,
  className,
  activeVariant = "studio",
}: Props<T>) {
  const activeClasses =
    activeVariant === "support"
      ? "border-transparent bg-gradient-to-r from-[#13DFFF] via-[#C931FD] to-[#842CFE] text-white shadow-md hover:shadow-lg hover:brightness-[1.03]"
      : "border-transparent bg-gradient-to-r from-[#46e6ff] via-[#9b5bff] to-[#ff4fd8] text-white shadow-md hover:shadow-lg hover:brightness-[1.03]";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-full px-4 py-1 text-sm transition",
              "outline-none focus-visible:ring-4 focus-visible:ring-[#842CFE]/15",
              active
                ? activeClasses
                : "border border-black/5 bg-white text-slate-800 shadow-sm hover:bg-slate-50 hover:shadow-md"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
