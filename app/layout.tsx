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

export const metadata: Metadata = {
  title: "Exclusive Plays | Bret McDermott",
  description:
    "Sports plays from a bettor who wins 36% of the time and is up 28 units. Every pick is posted before the game and graded automatically, so the record is public and cannot be edited.",
  metadataBase: new URL("https://exclusiveplays.com"),
  alternates: { canonical: "https://exclusiveplays.com" },
  openGraph: {
    title: "Exclusive Plays | Bret McDermott",
    description:
      "36% win rate. Up 28 units. Every pick posted before the game and graded automatically.",
    url: "https://exclusiveplays.com",
    siteName: "Exclusive Plays",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Plays | Bret McDermott",
    description:
      "36% win rate. Up 28 units. Every pick posted before the game and graded automatically.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
