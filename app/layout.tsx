import { getRecord } from "../lib/record";
import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-body",
});

// Metadata is generated, not typed out, so the description can never drift from the page. It
// claimed "36% win rate, up 28 units" long after the page itself read 37.8% and +50.01 -- the
// figures that actually reach X, iMessage and Google were the stale ones.
export async function generateMetadata(): Promise<Metadata> {
  const r = await getRecord();
  const pitch = `${r.winRate} win rate. Up ${r.units.replace("+", "")} units at ${r.roi} ROI. ` +
    "Every pick posted before the game and graded automatically.";
  return {
    title: "Exclusive Plays | Bret McDermott",
    description:
      `Sports plays from a bettor who wins ${r.winRate} of the time and is up ${r.units.replace("+", "")} units. ` +
      "Every pick is posted before the game and graded automatically, so the record is public and cannot be edited.",
    metadataBase: new URL("https://exclusiveplays.com"),
    alternates: { canonical: "https://exclusiveplays.com" },
    // The badge, so a shared link and a browser tab both carry the mark.
    icons: { icon: "/icon.png", apple: "/apple-touch-icon.png" },
    openGraph: {
      title: "Exclusive Plays | Bret McDermott",
      description: pitch,
      url: "https://exclusiveplays.com",
      siteName: "Exclusive Plays",
      locale: "en_US",
      type: "website",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "Exclusive Plays" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Exclusive Plays | Bret McDermott",
      description: pitch,
      images: ["/logo.png"],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
