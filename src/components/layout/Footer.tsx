import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#07111F] text-[#B8C8DA]" style={{ borderColor: "rgba(2,6,23,0.10)" }}>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] font-semibold text-[#B8C8DA]">
            <Link href="/privacy" className="hover:text-white hover:underline">Privacy</Link>
            <span className="text-white/30">•</span>
            <Link href="/content-policy" className="hover:text-white hover:underline">Content Policy</Link>
            <span className="text-white/30">•</span>
            <Link href="/contact" className="hover:text-white hover:underline">Contact</Link>
          </div>

          <div className="text-[12.5px] text-[#B8C8DA]">
            © 2026 Vision AI Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
