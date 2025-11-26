import Link from "next/link";
import { notFound } from "next/navigation";
import { getCharacterById } from "@/data/characters";

export default function CharacterDetail({ params }: { params: { id: string } }) {
  const c = getCharacterById(params.id);
  if (!c) notFound();

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/" className="text-sm hover:underline" style={{ color: "rgba(196,179,217,1)" }}>
          ← Back to explore
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(197,107,251,0.30)" }}>
            <div className="aspect-[4/5] w-full">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold" style={{ color: "#F6F6F6", fontFamily: "Poppins, Inter, system-ui" }}>
              {c.name}
            </h1>
            <div className="mt-2 text-sm" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
              {c.style} • {c.gender} • {c.category} • {c.chats.toLocaleString()} chats
            </div>

            <div className="mt-6 rounded-2xl border p-4"
              style={{
                borderColor: "rgba(197,107,251,0.20)",
                background: "rgba(0,0,0,0.18)",
                boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
              }}
            >
              <div className="text-sm leading-relaxed" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
                {c.bio ?? "Bio coming soon."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
