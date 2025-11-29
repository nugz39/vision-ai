import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-shell px-4 md:px-6 lg:px-8">
      {children}
    </main>
  );
}
