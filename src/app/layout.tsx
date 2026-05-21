import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingNav } from "@/components/FloatingNav";
import { Stars } from "@/components/Stars";

export const metadata: Metadata = {
  title: "Cosmic Compass — Your Universal Fortune Guide",
  description:
    "Discover your destiny across cultures. AI-powered Western astrology, Chinese BaZi, Vedic astrology, and Tarot — all in one cosmic platform.",
  keywords: [
    "astrology", "horoscope", "fortune telling", "tarot", "bazi",
    "vedic astrology", "western astrology", "chinese astrology",
    "soulmate", "birth chart",
  ],
  openGraph: {
    title: "Cosmic Compass — Your Universal Fortune Guide",
    description:
      "Discover your destiny across cultures. AI-powered multi-system fortune telling.",
    type: "website",
    siteName: "Cosmic Compass",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <Stars />
        <Header />
        <main className="relative z-10 pb-24">{children}</main>
        <FloatingNav />
      </body>
    </html>
  );
}
