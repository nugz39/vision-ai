import { SectionHeader } from "@/components/ui/SectionHeader";
import { NbChip } from "@/components/ui/NbChip";
import { NbButton } from "@/components/ui/NbButton";
import { CharacterCard } from "@/components/ui/CharacterCard";
import { characters } from "@/data/characters";

export default function MyAiPage() {
  const forYou = characters.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-4">
      <SectionHeader
        title="Your Naughty Characters"
        subtitle="All your synthetic favourites in one private space."
        className="mb-4"
      />

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <NbChip active>Created</NbChip>
        <NbChip>Liked</NbChip>
        <NbChip>Collection</NbChip>
      </div>

      <div className="mb-8 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-6 text-center text-sm text-nb-muted">
        <p className="text-base font-medium text-nb-text">Nothing here yet.</p>
        <p className="mt-2">
          Generate a character in the studio, then they&apos;ll show up here for quick access.
        </p>
        <div className="mt-4 flex justify-center">
          <NbButton variant="primary">Open the Studio</NbButton>
        </div>
      </div>

      <SectionHeader
        title="For you"
        subtitle="A few characters to start your collection."
        className="mb-4"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {forYou.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
