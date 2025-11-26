"use client";

import { useMemo, useState } from "react";
import type { Character } from "@/data/characters";
import { CharacterCard } from "@/components/ui/CharacterCard";

export function CharacterGrid({
  batches,
  initialBatches = 1,
}: {
  batches: Character[][];
  initialBatches?: number;
}) {
  const [visibleBatches, setVisibleBatches] = useState(initialBatches);

  const visibleCharacters = useMemo(
    () => batches.slice(0, visibleBatches).flat(),
    [batches, visibleBatches]
  );

  const hasMore = visibleBatches < batches.length;

  return (
    <div className="w-full max-w-full">
      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleCharacters.map((c) => (
          <div key={c.id} className="min-w-0">
            <CharacterCard character={c} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleBatches((v) => Math.min(v + 1, batches.length))}
            className="rounded-full border px-5 py-2 text-sm transition duration-200 ease-out"
            style={{
              borderColor: "rgba(197,107,251,0.40)",
              color: "#F4ECFF",
              background: "linear-gradient(180deg,#0A0013,#120021)",
              boxShadow: "0 14px 38px rgba(255,0,255,0.05)",
            }}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
