import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "../../../components/LegalPage";

export const metadata: Metadata = { title: "Terms | Exclusive Plays" };

export default function Terms() {
  return (
    <LegalPage title="Terms of service" updated="2 September 2026">
      <p>
        These terms cover exclusiveplays.com and anything you buy through it. Buying a package
        means you accept them. If you do not, do not buy.
      </p>

      <h2>What you are buying</h2>
      <p>
        <strong>Sports analysis and opinion.</strong> I post my own bets before the games start
        and you get to see them. That is the entire product. You are not buying a service that
        places bets, holds money, or manages an account for you, and nothing here is financial,
        investment or legal advice.
      </p>

      <h2>No guarantees</h2>
      <p>
        <strong>Nothing here is a guarantee of any result.</strong> No outcome is promised or
        implied. My record is public and it is the only claim I make, and past performance does
        not predict future performance. Betting involves risk and you can lose money. Never
        wager more than you can afford to lose.
      </p>

      <h2>Age and eligibility</h2>
      <p>
        You must be <strong>18 or older</strong>, or the legal age where you live, whichever is
        higher. You are responsible for knowing whether sports betting is legal where you are. I
        do not check, and buying a package does not make anything legal that is not.
      </p>

      <h2>Your access</h2>
      <ul>
        <li>Access is for you. Do not share, resell, screenshot or repost the plays.</li>
        <li>Sharing paid plays ends your access with no refund.</li>
        <li>I can decline or end anyone&apos;s access, and will refund unused time if I do.</li>
      </ul>

      <h2>Payment</h2>
      <p>
        Payments are handled by a third party processor, not by me directly. Your card details
        never reach this site. Subscriptions renew until you cancel, and you can cancel any time
        through the processor. See the <a href="/legal/refunds">refund policy</a>.
      </p>

      <h2>Liability</h2>
      <p>
        I am not liable for money you lose betting, for bets you place based on anything I post,
        or for the service being unavailable. You place your own bets and you own the outcome.
      </p>

      <h2>Changes</h2>
      <p>
        I may update these terms. The date at the top is when they last changed. Continuing to
        use the service after a change means you accept it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
