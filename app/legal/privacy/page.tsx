import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "../../../components/LegalPage";

export const metadata: Metadata = { title: "Privacy | Exclusive Plays" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="2 September 2026">
      <p>
        Short version: this site does not ask you for anything. There is no account, no signup
        form and no newsletter. If you buy, the processor handles your details, not me.
      </p>

      <h2>What this site collects</h2>
      <p>
        <strong>Nothing you type.</strong> There is no form on this site. It is a single page
        that displays my betting record and links to a checkout hosted elsewhere.
      </p>
      <p>
        The host, Vercel, keeps standard server logs to serve the page and stop abuse. Those
        include your IP address, browser and the page you requested. I do not use them to build a
        profile of you and I do not sell them.
      </p>

      <h2>My record</h2>
      <p>
        The figures on the home page are read live from my public Nexfuse profile. That request
        goes from the server, not your browser, so visiting this site does not tell Nexfuse
        anything about you.
      </p>

      <h2>If you buy</h2>
      <p>
        Payment is handled by a third party processor. They collect what they need to take
        payment and to meet their own legal obligations, under their privacy policy rather than
        this one. <strong>Your card details never touch this site.</strong> I see that you
        subscribed and how to reach you, and nothing more.
      </p>

      <h2>Cookies</h2>
      <p>
        This site sets no advertising or tracking cookies. The checkout may set its own once you
        get there.
      </p>

      <h2>Your rights</h2>
      <p>
        Ask me what I hold about you and I will tell you. Ask me to delete it and I will, except
        where I have to keep payment records for tax. Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Children</h2>
      <p>This service is for adults. It is not directed at anyone under 18.</p>
    </LegalPage>
  );
}
