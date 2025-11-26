import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{
        borderColor: "rgba(197,107,251,0.18)",
        background: "rgba(6,0,14,0.85)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div
            className="text-[12.5px]"
            style={{ color: "rgba(184,165,255,0.60)", fontFamily: "Inter, system-ui" }}
          >
            © 2025 NaughtyBotty. Synthetic-only studio.
          </div>
          <div
            className="text-[12.5px]"
            style={{ color: "rgba(184,165,255,0.60)", fontFamily: "Inter, system-ui" }}
          >
            No real-person deepfakes. All content is synthetic and labelled.
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {[
              ["Support", "/support"],
              ["Terms of Use", "/terms"],
              ["Privacy Policy", "/privacy"],
              ["Content Policy", "/content-policy"],
            ].map(([label, href], i) => (
              <span key={href} className="inline-flex items-center gap-3">
                <Link
                  href={href}
                  className="text-[12.5px] hover:underline"
                  style={{ color: "rgba(184,165,255,0.60)", fontFamily: "Inter, system-ui" }}
                >
                  {label}
                </Link>
                {i < 3 && <span style={{ color: "rgba(184,165,255,0.35)" }}>•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
