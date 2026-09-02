import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "../../../components/LegalPage";

export const metadata: Metadata = { title: "Contact | Exclusive Plays" };

export default function Contact() {
  return (
    <LegalPage title="Contact" updated="2 September 2026">
      <p>
        One address, and I read it. There is no support desk and no ticket queue, which means you
        get me rather than a form.
      </p>

      <h2>Email</h2>
      <p>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Billing problems, access problems, or a question about a play. If something is wrong with
        your subscription, say so here before filing a chargeback and it will be faster.
      </p>

      <h2>My record</h2>
      <p>
        Every graded bet is public and I do not control the grading.{" "}
        <a href="https://getnexfuse.com/u/bretmcdermott" target="_blank" rel="noopener noreferrer">
          getnexfuse.com/u/bretmcdermott
        </a>
        . The figures on the home page are read from it directly, so they cannot drift from what
        actually happened.
      </p>

      <h2>What I am not</h2>
      <p>
        I am not a sportsbook and I do not take bets or hold money. I sell analysis. You place
        your own bets wherever you already do.
      </p>
    </LegalPage>
  );
}
