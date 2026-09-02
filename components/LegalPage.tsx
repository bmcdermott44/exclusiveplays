import Image from "next/image";
import Link from "next/link";

/**
 * Shell for the legal pages. Same ground, same type, same restraint as the landing page: someone
 * who lands here from a checkout should not feel handed off to a different site.
 *
 * These exist for three reasons and only one of them is legal. Whop and every other processor
 * that will touch a handicapping service requires them. Browsers score a brand new domain with a
 * payment button and no policies as a likely throwaway, which is what got the site flagged.
 * And a buyer deciding whether to trust a stranger with money reads them.
 */
export const CONTACT_EMAIL = "TBD@exclusiveplays.com"; // TODO: Bret's real business address

export default function LegalPage({
  title, updated, children,
}: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <main>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-7">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={512} height={512} className="h-12 w-12" />
          <span className="display text-xl tracking-tight">Exclusive Plays</span>
        </Link>
        <Link href="/" className="text-sm" style={{ color: "var(--muted)" }}>
          Back
        </Link>
      </header>

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-6">
        <h1 className="display text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
          Last updated {updated}
        </p>
        <div className="legal mt-10 space-y-6 text-base leading-relaxed">{children}</div>
      </article>

      <footer
        className="mx-auto max-w-3xl border-t px-6 py-10 text-sm"
        style={{ borderColor: "rgba(240,240,240,0.09)", color: "var(--muted)" }}
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/">Home</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/refunds">Refunds</Link>
          <Link href="/legal/contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
