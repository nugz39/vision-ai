import { Suspense } from "react";
import StudioClient from "./StudioClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-black/55">Loading Studio…</div>}>
      <StudioClient />
    </Suspense>
  );
}
