import { NbButton } from "@/components/ui/NbButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-4">
      <SectionHeader
        title="Chat"
        subtitle="Start a private conversation with your favourite NaughtyBotty."
        className="mb-4"
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <NbButton variant="primary">New Chat</NbButton>
        <NbButton variant="secondary">Group Chat</NbButton>
      </div>

      <div className="mt-6 rounded-2xl border border-nb-border bg-nb-bg-soft/80 p-6 text-center text-sm text-nb-muted">
        <p className="text-base font-medium text-nb-text">No chats yet.</p>
        <p className="mt-2">
          Start a private chat with a fantasy character and keep it between you and your screen.
        </p>
        <div className="mt-4 flex justify-center">
          <NbButton variant="primary">Create Your First Chat</NbButton>
        </div>
      </div>
    </div>
  );
}
