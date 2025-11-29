"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "studio";

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

interface NbButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function NbButton({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  style,
  children,
  ...props
}: NbButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-nb-cyan/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed";

  const sizes: Record<NonNullable<NbButtonProps["size"]>, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-sm",
  };

  const common =
    "shadow-[0_16px_40px_rgba(2,6,23,0.10),0_1px_0_rgba(2,6,23,0.04)] hover:shadow-[0_18px_52px_rgba(2,6,23,0.14),0_0_24px_rgba(0,242,255,0.14)] hover:-translate-y-0.5 active:translate-y-0";

  const isPrimary = variant === "primary";
  const isStudio = variant === "studio";

  const variantClass = (() => {
    if (variant === "secondary")
      return "border border-black/10 bg-white/90 text-[#020617] hover:border-black/15";
    if (variant === "ghost") return "text-black/60 hover:text-[#020617] hover:bg-black/[0.04]";
    if (variant === "primary" || variant === "studio") return clsx("text-white", common);
    return "";
  })();

  const gradient = isStudio
    ? "linear-gradient(120deg,#7AF63C,#00F2FF)"
    : "linear-gradient(120deg,#00F2FF,#CB2FFF,#7B2CFF)";

  return (
    <button
      className={clsx(base, sizes[size], variantClass, fullWidth && "w-full", className)}
      style={{
        ...(isPrimary || isStudio ? { background: gradient } : {}),
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
