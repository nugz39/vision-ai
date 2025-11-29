import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white/55 backdrop-blur-md" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-semibold text-black/55">
            <Link href="/privacy" className="hover:text-[#020617] hover:underline">Privacy</Link>
            <span className="text-black/30">•</span>
            <Link href="/content-policy" className="hover:text-[#020617] hover:underline">Content Policy</Link>
            <span className="text-black/30">•</span>
            <Link href="/contact" className="hover:text-[#020617] hover:underline">Contact</Link>
          </div>

          <div className="text-[12.5px] text-black/55">
            © 2025 Vision AI Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
