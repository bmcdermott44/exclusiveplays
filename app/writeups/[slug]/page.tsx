import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getPosts, prettyDate } from "../../../lib/content";

export const revalidate = 900;

export function generateStaticParams() {
  return getPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);
  if (!post) return { title: "Not found | Exclusive Plays" };
  return {
    title: `${post.title} | Exclusive Plays`,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article" },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={512} height={512} className="h-12 w-12" />
          <span className="display text-xl tracking-tight">Exclusive Plays</span>
        </Link>
        <Link href="/writeups" className="text-sm" style={{ color: "var(--muted)" }}>
          All write-ups
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <p className="text-sm" style={{ color: "var(--muted)" }}>{prettyDate(post.date)}</p>
        <h1 className="display mt-3 text-4xl leading-tight sm:text-5xl">{post.title}</h1>
        <div className="legal mt-10 space-y-6 text-lg leading-relaxed"
             dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

        <div className="mt-14 border-t pt-8" style={{ borderColor: "rgba(240,240,240,0.09)" }}>
          <Link href="/" className="text-sm font-bold" style={{ color: "var(--gold)" }}>
            See the record
          </Link>
        </div>
      </article>
    </main>
  );
}
