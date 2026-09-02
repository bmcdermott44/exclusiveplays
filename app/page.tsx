import Image from "next/image";
// Exclusive Plays. One page, one job: make a stranger believe the record, then send them to checkout.
//
// Copy rules for this site, set by James 2026-08-25:
//   no em dashes, no emoji, no rounded feature cards, no stock-phrase marketing voice.
// Everything is first person because people buy plays from a person, not from a brand.
//
// The numbers below are Bret's REAL graded record from Nexfuse as of 2026-08-25. They are the
// entire pitch and they must never be rounded in his favour or quietly left stale.

import { getRecord, RECORD_STATIC_EXPORT as RECORD_STATIC } from "../lib/record";

/**
 * WIRING THE CHECKOUT — two lines, both here.
 *
 * 1. WHOP_CHECKOUT: paste the Whop product URL, e.g. "https://whop.com/exclusive-plays/".
 * 2. PRICE: the monthly figure shown above the button.
 *
 * Until WHOP_CHECKOUT is set, every button scrolls to the pricing section instead of leading to
 * a dead link, so the page can go live and collect interest before payments exist. Once it is a
 * real URL the buttons open it in a new tab on their own -- nothing else needs touching.
 *
 * Whop rather than Stripe or PayPal on purpose: both of those onboard a handicapping business
 * happily and then close the account or hold the funds once they classify it, which happens after
 * money is already moving. Whop's underwriting expects this business.
 *
 * Whichever is used, the account belongs to Bret and his entity, never James or Fusetek --
 * chargebacks, the 1099-K and merchant-of-record liability follow whoever signed up.
 */
const WHOP_CHECKOUT = "";                     // <- paste the Whop product URL here
const PRICE = "$TBD";                         // <- and the monthly price here

const CHECKOUT = WHOP_CHECKOUT || "#pricing";
const CHECKOUT_IS_LIVE = Boolean(WHOP_CHECKOUT);
// An external checkout opens in a new tab so the reader does not lose the page they were sold on.
const checkoutLinkProps = CHECKOUT_IS_LIVE
  ? { target: "_blank" as const, rel: "noopener noreferrer" }
  : {};

export default async function Home() {
  const RECORD = { ...(await getRecord()), ...RECORD_STATIC };

  return (
    <main>
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7">
        {/* Badge beside the wordmark rather than replacing it: the mark carries recognition,
            the words carry the name to anyone seeing it for the first time. */}
        <span className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={56}
            height={56}
            priority
            className="h-14 w-14"
          />
          <span className="display text-2xl tracking-tight">Exclusive Plays</span>
        </span>
        <a
          href={CHECKOUT}
          {...checkoutLinkProps}
          className="rounded-full px-5 py-2 text-sm font-bold text-[var(--ink)] transition hover:brightness-110"
          style={{ background: "var(--gold)" }}
        >
          Get the plays
        </a>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-10 sm:pt-16">
        {/* The badge at a size it was drawn for. In the header it is a recognition mark at 56px,
            where its inner wordmark cannot be read; here it is the mark itself. */}
        <Image
          src="/logo.png"
          alt="Exclusive Plays"
          width={512}
          height={512}
          priority
          className="mb-7 h-28 w-28 sm:h-36 sm:w-36"
        />

        <p
          className="text-sm font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--gold)" }}
        >
          Bret McDermott
        </p>

        <h1 className="display mt-5 text-5xl leading-[1.05] sm:text-7xl">
          I lose most of my bets
          <br />
          and I&apos;m up{" "}
          <span style={{ color: "var(--gold)" }} className="tnum">
            {RECORD.units.replace("+", "")} units
          </span>
          .
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          Win rate is the stat everyone advertises and it is the one that tells you the least.
          I hit {RECORD.winRate} of my plays. I take prices nobody else wants, and over{" "}
          <span className="text-[var(--paper)]">{RECORD.picks} graded bets</span> that has returned{" "}
          <span className="text-[var(--paper)]">{RECORD.roi}</span>.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={CHECKOUT}
          {...checkoutLinkProps}
            className="rounded-full px-8 py-4 text-base font-bold text-[var(--ink)] transition hover:brightness-110"
            style={{ background: "var(--gold)" }}
          >
            Get today&apos;s plays
          </a>
          <a
            href="#record"
            className="text-base font-semibold underline underline-offset-4"
            style={{ color: "var(--muted)" }}
          >
            See the full record first
          </a>
        </div>
      </section>

      {/* ── The record ──────────────────────────────────────────── */}
      <section
        id="record"
        className="border-y"
        style={{ borderColor: "rgba(240,240,240,0.09)", background: "var(--ink-2)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="display text-3xl sm:text-4xl">The record, in full</h2>
          <p className="mt-3 max-w-xl" style={{ color: "var(--muted)" }}>
            Since {RECORD.since}. Every play below was posted before the game started and graded
            off the final score. Losses included, because leaving them out is the whole trick
            everyone else is running.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            <Figure label="Graded plays" value={String(RECORD.picks)} />
            <Figure
              label="Record"
              value={`${RECORD.wins}-${RECORD.losses}-${RECORD.pushes}`}
            />
            <Figure label="Win rate" value={RECORD.winRate} muted />
            <Figure label="Units won" value={RECORD.units} gold />
          </div>

          <p className="mt-12 max-w-2xl text-lg leading-relaxed">
            A {RECORD.winRate} win rate looks bad until you see the prices. Betting favourites at heavy juice
            can win 60% and lose money all year. I would rather be wrong more often and get paid
            properly when I am right.
          </p>
        </div>
      </section>

      {/* ── Verification ────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="display text-3xl sm:text-4xl">
          You do not have to take my word for any of it
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          Every play I make is posted to Nexfuse before the game starts, timestamped, and graded
          automatically off the box score. I cannot delete a loss. I cannot edit a price after
          the fact. The number you see is the number I actually ran.
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
          Screenshots can be faked. That is why I do not use them.
        </p>
        <a
          href={RECORD.profile}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block border-b-2 pb-1 text-lg font-semibold"
          style={{ borderColor: "var(--plum)" }}
        >
          Check my record on Nexfuse
        </a>
      </section>

      {/* ── What you get ────────────────────────────────────────── */}
      <section
        className="border-y"
        style={{ borderColor: "rgba(240,240,240,0.09)", background: "var(--ink-2)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="display text-3xl sm:text-4xl">What you actually get</h2>
          <ol className="mt-10 space-y-8">
            <Item n="1" title="Every play, before the game">
              Posted with the price I got and the reasoning behind it. No vague leans, no
              &quot;I liked it&quot; after the fact.
            </Item>
            <Item n="2" title="The thinking, not just the pick">
              Why the number is wrong, what I expect the market to do, and what would change my
              mind. You should be able to disagree with me.
            </Item>
            <Item n="3" title="The losses, same day, same place">
              Graded and posted whether they hit or not. If a week goes badly you will hear about
              it from me before you hear about it from anyone else.
            </Item>
          </ol>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────── */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="display text-3xl sm:text-4xl">Join</h2>
        <p className="mt-4 max-w-xl" style={{ color: "var(--muted)" }}>
          Cancel whenever you want. No contracts, no upsell calls, no lifetime packages.
        </p>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-16">
          <div>
            <div className="display tnum text-6xl" style={{ color: "var(--gold)" }}>
              {PRICE}
            </div>
            <div className="mt-2 text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              per month
            </div>
          </div>
          <a
            href={CHECKOUT}
          {...checkoutLinkProps}
            className="inline-block rounded-full px-8 py-4 text-center text-base font-bold text-[var(--ink)] transition hover:brightness-110"
            style={{ background: "var(--gold)" }}
          >
            Start now
          </a>
        </div>
      </section>

      {/* ── Legal ───────────────────────────────────────────────── */}
      <footer
        className="border-t"
        style={{ borderColor: "rgba(240,240,240,0.09)", background: "var(--ink-2)" }}
      >
        <div className="mx-auto max-w-5xl px-6 py-14">
          <p className="max-w-3xl text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            You must be 18 or older. Exclusive Plays sells sports analysis and opinion. Nothing
            here is a guarantee of any result, and no outcome is promised or implied. Past
            performance does not predict future performance. Betting involves risk and you can
            lose money. Never wager more than you can afford to lose. Access is delivered
            immediately on purchase and is non-refundable once delivered.
          </p>
          <p className="mt-6 text-sm" style={{ color: "var(--muted)" }}>
            If gambling is a problem for you, call 1-800-GAMBLER.
          </p>
          <div
            className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-8 text-sm"
            style={{ borderColor: "rgba(240,240,240,0.09)", color: "var(--muted)" }}
          >
            <span className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="" width={28} height={28} className="h-7 w-7 opacity-90" />
              <span className="display text-lg text-[var(--paper)]">Exclusive Plays</span>
            </span>
            <span>Record verified on Nexfuse, updated live. {RECORD.since} to present.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Figure({
  label,
  value,
  gold,
  muted,
}: {
  label: string;
  value: string;
  gold?: boolean;
  muted?: boolean;
}) {
  return (
    <div>
      <div
        className="display tnum text-4xl sm:text-5xl"
        style={{ color: gold ? "var(--gold)" : muted ? "var(--muted)" : "var(--paper)" }}
      >
        {value}
      </div>
      <div
        className="mt-3 text-xs font-bold uppercase tracking-[0.18em]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </div>
    </div>
  );
}

function Item({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-6">
      <span
        className="display tnum shrink-0 text-3xl leading-none"
        style={{ color: "var(--plum)" }}
      >
        {n}
      </span>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
          {children}
        </p>
      </div>
    </li>
  );
}
