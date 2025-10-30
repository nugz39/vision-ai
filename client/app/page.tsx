import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Vision AI</h1>
      <p className="mt-2 text-neutral-300">Create stunning images fast.</p>
      <div className="mt-6">
        <Link href="/create" className="rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20">
          Go to Create Studio →
        </Link>
      </div>
    </main>
  );
}
