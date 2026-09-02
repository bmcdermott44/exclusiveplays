import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "../../../components/LegalPage";

export const metadata: Metadata = { title: "Refunds | Exclusive Plays" };

export default function Refunds() {
  return (
    <LegalPage title="Refund policy" updated="2 September 2026">
      <p>
        Stated plainly, because a policy you have to hunt for is a policy designed to catch you
        out.
      </p>

      <h2>Plays are non-refundable once delivered</h2>
      <p>
        The product is information and it cannot be returned. Once you have seen a play, you have
        had the thing you paid for, whether it wins or loses.{" "}
        <strong>A losing week is not grounds for a refund.</strong> I lose most of my bets. That
        is on the front page in the largest type on the site, and it is the whole basis of what I
        sell.
      </p>

      <h2>What I will refund</h2>
      <ul>
        <li>You were charged twice for the same period.</li>
        <li>You were charged after cancelling.</li>
        <li>You paid and never got access.</li>
        <li>I stop posting plays during a period you paid for.</li>
      </ul>
      <p>Email me and I will sort it out. I would rather refund you than argue.</p>

      <h2>Cancelling</h2>
      <p>
        Cancel any time through the payment processor. You keep access until the end of the
        period you have already paid for, and you are not billed again. I do not pro-rate part of
        a period.
      </p>

      <h2>Chargebacks</h2>
      <p>
        Email me before you file one. A chargeback on a delivered information product costs me a
        fee and generally fails, and it ends your access permanently. Almost anything is faster
        to fix directly.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. I answer.
      </p>
    </LegalPage>
  );
}
