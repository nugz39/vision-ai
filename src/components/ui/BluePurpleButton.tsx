"use client";

import * as React from "react";
import clsx from "clsx";

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  loading?: boolean;
};

export default function BluePurpleButton({ className, loading, disabled, children, ...rest }: Props) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={clsx(
        "inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold tracking-tight text-white shadow-sm transition",
        "focus:outline-none focus:ring-4 focus:ring-[rgba(0,242,255,0.18)]",
        "hover:brightness-[1.03] hover:shadow-md active:brightness-95",
        isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      style={{
        background: "linear-gradient(90deg, #00F2FF, #7AF63C, #CB2FFF)",
      }}
    >
      {loading ? "Generating…" : children}
    </button>
  );
}
