"use client";

import * as React from "react";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function PrimaryGradientButton({
  className,
  loading,
  disabled,
  children,
  ...rest
}: Props) {
  const isDisabled = Boolean(disabled || loading);

  return (
    <button
      {...rest}
      disabled={isDisabled}
      className={cn(
        // sizing + typography (consistent everywhere)
        "relative inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[0.01em] text-white",
        "transition-transform duration-150 ease-out will-change-transform",
        // Vision AI gradient (exact)
        "bg-[linear-gradient(90deg,#00F2FF,#7AF63C,#CB2FFF)]",
        // glow ring + hover / active behavior
        "shadow-[0_12px_30px_rgba(203,47,255,0.18)]",
        "hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(0,242,255,0.20)] hover:brightness-[1.03]",
        "active:scale-[0.995] active:brightness-[0.95]",
        // subtle ring on hover (no color shift)
        "before:pointer-events-none before:absolute before:inset-[-2px] before:rounded-full before:opacity-0 before:transition-opacity before:duration-150",
        "before:bg-[linear-gradient(90deg,rgba(0,242,255,0.0),rgba(0,242,255,0.10),rgba(203,47,255,0.10),rgba(203,47,255,0.0))]",
        "hover:before:opacity-100",
        // disabled
        isDisabled && "cursor-not-allowed opacity-60 hover:scale-100 hover:brightness-100 hover:shadow-[0_12px_30px_rgba(203,47,255,0.18)] hover:before:opacity-0",
        className
      )}
    >
      {loading ? (
        <>
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          <span>Generating…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
