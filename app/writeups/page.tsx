import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPosts, prettyDate } from "../../lib/content";

export const metadata: Metadata = {
  title: "Write-ups | Exclusive Plays",
  description: "How I think about prices, and why a low win rate is not the problem people assume.",
};

export const revalidate = 900;

export default function Writeups() {
  const posts = getPosts();
  return (
    <main>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={512} height={512} className="h-12 w-12" />
          <span className="display text-xl tracking-tight">Exclusive Plays</span>
        </Link>
        <Link href="/" className="text-sm" style={{ color: "var(--muted)" }}>Back</Link>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <h1 className="display text-4xl leading-tight sm:text-5xl">Write-ups</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          Free to read. The plays themselves are for members, but how I think about them is not a
          secret.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12" style={{ color: "var(--muted)" }}>Nothing posted yet.</p>
        ) : (
          <div className="mt-12 space-y-10">
            {posts.map(p => (
              <article key={p.slug} className="border-t pt-8"
                       style={{ borderColor: "rgba(240,240,240,0.09)" }}>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{prettyDate(p.date)}</p>
                <h2 className="display mt-2 text-2xl sm:text-3xl">
                  <Link href={`/writeups/${p.slug}`}>{p.title}</Link>
                </h2>
                {p.summary && (
                  <p className="mt-3 leading-relaxed" style={{ color: "var(--muted)" }}>{p.summary}</p>
                )}
                <Link href={`/writeups/${p.slug}`} className="mt-4 inline-block text-sm font-bold"
                      style={{ color: "var(--gold)" }}>
                  Read it
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
