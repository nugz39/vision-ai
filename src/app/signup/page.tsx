import { Suspense } from "react";
import PageClient from "./PageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-16 text-sm text-black/55">Loading…</div>}>
      <PageClient />
    </Suspense>
  );
}
