"use client";

import React from "react";

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

const ACTIVE_GRADIENT =
  "linear-gradient(120deg, rgba(0,242,255,1) 0%, rgba(122,246,60,1) 45%, rgba(203,47,255,1) 100%)";

export type ModeOption<T extends string> = {
  value: T;
  label: string;
};

export default function ModeToggle<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T;
  onChange: (next: T) => void;
  options: ModeOption<T>[];
  className?: string;
}) {
  return (
    <div className={clsx("flex flex-wrap items-center gap-2", className)}>
      {options.map((opt) => {
        const active = opt.value === value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={clsx(
              "relative rounded-full px-3 py-2 text-[12px] font-semibold transition-all",
              "hover:-translate-y-[1px] active:translate-y-0",
              active ? "text-white" : "text-black/70"
            )}
            style={{
              background: active ? ACTIVE_GRADIENT : "rgba(255,255,255,0.86)",
              border: "1px solid rgba(2,6,23,0.10)",
              boxShadow: active
                ? "0 14px 34px rgba(2,6,23,0.14), 0 0 22px rgba(0,242,255,0.18), 0 0 18px rgba(203,47,255,0.14)"
                : "0 10px 22px rgba(2,6,23,0.08)",
              filter: "brightness(1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget.style.filter as any) = "brightness(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style.filter as any) = "brightness(1)";
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
