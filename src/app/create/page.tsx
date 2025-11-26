import { SectionHeader } from "@/components/ui/SectionHeader";
import { NbButton } from "@/components/ui/NbButton";
import { NbChip } from "@/components/ui/NbChip";
import { CharacterCard } from "@/components/ui/CharacterCard";
import { characters } from "@/data/characters";

export default function CreatePage() {
  const recommendations = characters.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 pb-4">
      <SectionHeader
        title="Your Naughty Creations"
        subtitle="Build, save, and curate your own synthetic characters."
        className="mb-4"
      />

      <div className="mb-4 flex flex-wrap gap-2 text-xs">
        <NbChip active>Created</NbChip>
        <NbChip>Liked</NbChip>
        <NbChip>Collection</NbChip>
      </div>

      <div className="mb-8 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-6 text-center text-sm text-nb-muted">
        <p className="text-base font-medium text-nb-text">No created characters yet.</p>
        <p className="mt-2">
          Craft your first NaughtyBotty character and keep them all to yourself.
        </p>
        <div className="mt-4 flex justify-center">
          <NbButton variant="primary">Create Your First Character</NbButton>
        </div>
      </div>

      <SectionHeader
        title="For you"
        subtitle="A few characters we think you might enjoy."
        className="mb-4"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
