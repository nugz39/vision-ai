"use client";

import React from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function StylePillsRow<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (s: T) => void;
  options: readonly T[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {options.map((label) => {
        const active = label === value;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={cn(
              "rounded-full px-4 py-1 text-sm transition",
              active
                ? "bg-gradient-to-r from-[#46e6ff] via-[#9b5bff] to-[#ff4fd8] font-semibold text-white shadow-md hover:shadow-lg hover:brightness-110"
                : "border border-black/5 bg-white font-medium text-slate-800 shadow-sm hover:bg-slate-50 hover:shadow-md"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
