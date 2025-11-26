"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_CHARACTERS, type Character, type CharacterStyle } from "@/data/characters";
import { CharacterCard } from "@/components/ui/CharacterCard";

type SortMode = "Popular" | "Newest";

const STYLES: Array<"All" | CharacterStyle> = ["All", "realistic", "stylised", "anime"];
const GENDERS: Array<"All" | "female"> = ["All", "female"];
const TAGS = ["Popular","Soft Neon","Cosmic","Mystery","Velvet","Cyber","Warm","Shadow","Ethereal"];

export default function Page() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState<"All" | "female">("All");
  const [style, setStyle] = useState<"All" | CharacterStyle>("All");
  const [sort, setSort] = useState<SortMode>("Popular");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(12);
  const loadMoreAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setVisibleCount(12), [search, gender, style, sort, selectedTags.join("|")]);

  const filteredSortedAll = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = ALL_CHARACTERS.filter((c) => {
      if (q && !c.name.toLowerCase().includes(q)) return false;
      if (gender !== "All" && c.gender !== gender) return false;
      if (style !== "All" && c.style !== style) return false;
      if (selectedTags.length && !selectedTags.every((t) => c.tags.includes(t))) return false;
      return true;
    });

    if (sort === "Popular") list = [...list].sort((a, b) => b.chats - a.chats);
    else list = [...list].sort((a, b) => b.createdAt - a.createdAt);

    return list;
  }, [search, gender, style, sort, selectedTags]);

  const visibleCharacters = useMemo(
    () => filteredSortedAll.slice(0, visibleCount),
    [filteredSortedAll, visibleCount]
  );

  const canLoadMore = visibleCount < filteredSortedAll.length;

  const onLoadMore = () => {
    const next = Math.min(visibleCount + 12, filteredSortedAll.length);
    setVisibleCount(next);
    setTimeout(() => loadMoreAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const clearFilters = () => {
    setSearch("");
    setGender("All");
    setStyle("All");
    setSort("Popular");
    setSelectedTags([]);
    setVisibleCount(12);
    setAdvancedOpen(false);
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ fontFamily: "Inter, system-ui", color: "#F6F6F6" }}>
            Explore Characters
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#C4B3D9", fontFamily: "Inter, system-ui" }}>
            Premium synthetic studio catalogue — search, filter, and load more.
          </p>
        </div>

        <div
          className="rounded-2xl border p-4"
          style={{
            borderColor: "rgba(197,107,251,0.28)",
            background: "linear-gradient(180deg, rgba(8,0,16,0.72), rgba(10,0,19,0.72))",
            boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
          }}
        >
          <div className="grid gap-3 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>Search</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a name…"
                className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              />
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              >
                {GENDERS.map((g) => <option key={g} value={g} style={{ color: "black" }}>{g}</option>)}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value as any)}
                className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              >
                {STYLES.map((s) => <option key={s} value={s} style={{ color: "black" }}>{s}</option>)}
              </select>
            </div>

            <div className="lg:col-span-3">
              <label className="text-xs font-medium" style={{ color: "#C4B3D9" }}>Sort</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="mt-1 h-11 w-full rounded-xl border bg-black/30 px-3 outline-none"
                style={{ borderColor: "rgba(197,107,251,0.30)", color: "#F6F6F6" }}
              >
                <option value="Popular" style={{ color: "black" }}>Popular</option>
                <option value="Newest" style={{ color: "black" }}>Newest</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TAGS.map((t) => {
              const active = selectedTags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTags((prev) => active ? prev.filter(x => x !== t) : [...prev, t])}
                  className="rounded-full px-3 py-1 text-[11px] font-medium transition duration-200 ease-out"
                  style={{
                    color: active ? "#F6F6F6" : "#C4B3D9",
                    background: active ? "linear-gradient(90deg,#ff3bff,#c56bfb)" : "rgba(0,0,0,0.28)",
                    border: "1px solid rgba(197,107,251,0.30)",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={clearFilters}
              className="h-11 rounded-full px-4 text-sm font-semibold transition duration-200 ease-out"
              style={{
                color: "#F6F6F6",
                background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
                boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
              }}
            >
              Clear Filters
            </button>

            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="h-11 rounded-full border px-4 text-sm font-semibold transition duration-200 ease-out hover:opacity-90"
              style={{ borderColor: "rgba(197,107,251,0.35)", color: "#F6F6F6" }}
            >
              Advanced
            </button>
          </div>

          <div
            className="overflow-hidden transition-[max-height,opacity] duration-200 ease-out"
            style={{ maxHeight: advancedOpen ? 220 : 0, opacity: advancedOpen ? 1 : 0 }}
          >
            <div className="mt-4 rounded-2xl border p-4"
              style={{ borderColor: "rgba(197,107,251,0.20)", background: "rgba(0,0,0,0.18)" }}
            >
              <div className="text-sm font-bold" style={{ color: "#F6F6F6", fontFamily: "Inter, system-ui" }}>
                Advanced filters (placeholder)
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Spice level", "Vibe", "Mood", "Energy"].map((x) => (
                  <button
                    key={x}
                    type="button"
                    className="rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      color: "#C4B3D9",
                      background: "rgba(0,0,0,0.28)",
                      border: "1px solid rgba(197,107,251,0.22)",
                    }}
                  >
                    {x} (soon)
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center grid + stable sizing */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {visibleCharacters.map((c: Character) => (
                <div key={c.id} className="min-w-0">
                  <CharacterCard character={c} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={loadMoreAnchorRef} />

        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={!canLoadMore}
            className="h-11 rounded-full px-6 text-sm font-semibold transition duration-200 ease-out disabled:cursor-not-allowed"
            style={{
              color: "#F6F6F6",
              background: "linear-gradient(90deg,#ff3bff,#c56bfb)",
              boxShadow: "0 14px 38px rgba(255,0,255,0.12)",
              opacity: canLoadMore ? 1 : 0.55,
            }}
          >
            {canLoadMore ? "Load More" : "No more characters yet"}
          </button>
        </div>
      </div>
    </main>
  );
}
