"use client";

import clsx from "clsx";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "soft";
type Size = "sm" | "md" | "lg";

interface NbButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function NbButton({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: NbButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nb-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-nb-bg disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<Variant, string> = {
    primary: "bg-nb-pink text-nb-bg shadow-nb-soft hover:bg-nb-pink-soft",
    secondary:
      "border border-nb-pink text-nb-text hover:border-nb-pink-soft hover:text-nb-pink-soft",
    ghost: "text-nb-muted hover:text-nb-pink-soft hover:bg-nb-bg-soft/60",
    soft: "bg-nb-bg-soft text-nb-text border border-nb-border hover:border-nb-pink-soft",
  };

  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-2.5 text-sm",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}
