import { SectionHeader } from "@/components/ui/SectionHeader";
import { NbButton } from "@/components/ui/NbButton";

const plans = [
  {
    name: "Starter",
    price: "Free",
    bullets: ["Limited daily generations", "Basic chat with characters", "Standard queue times"],
  },
  {
    name: "Premium",
    price: "$19 / month",
    bullets: ["Higher monthly image credits", "Longer, richer chat sessions", "Faster generation priority"],
    highlight: true,
  },
  {
    name: "Studio",
    price: "$39 / month",
    bullets: ["For power users and creators", "Extra credits and priority slots", "Early access to new styles"],
  },
];

export default function UpgradePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pb-4">
      <SectionHeader
        title="Upgrade to NaughtyBotty Premium"
        subtitle="Unlock more scenes, more control, and priority access."
        className="mb-6"
      />

      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border bg-nb-bg-soft/80 p-4 text-sm ${
              plan.highlight ? "border-nb-pink shadow-nb-soft" : "border-nb-border"
            }`}
          >
            <h3 className="font-display text-base font-semibold text-nb-text">{plan.name}</h3>
            <p className="mt-1 text-sm text-nb-pink">{plan.price}</p>
            <ul className="mt-3 space-y-1 text-xs text-nb-muted">
              {plan.bullets.map((b) => (
                <li key={b}>• {b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <NbButton variant="primary" size="lg" fullWidth>
          Upgrade Now
        </NbButton>
        <p className="mt-2 text-center text-xs text-nb-muted">
          Private &amp; secure • Cancel anytime • Synthetic-only content
        </p>
      </div>
    </div>
  );
}
