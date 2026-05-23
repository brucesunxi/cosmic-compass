import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingNav } from "@/components/FloatingNav";
import { Stars } from "@/components/Stars";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cosmic Compass — Multi-Culture AI Fortune Telling",
    template: "%s | Cosmic Compass",
  },
  description:
    "Discover your destiny across cultures. AI-powered Western astrology, Chinese BaZi, Vedic astrology, and Tarot — all in one cosmic platform.",
  keywords: [
    "astrology", "horoscope", "fortune telling", "tarot", "bazi",
    "vedic astrology", "western astrology", "chinese astrology",
    "soulmate", "birth chart", "ai astrology", "online fortune",
  ],
  authors: [{ name: "Cosmic Compass" }],
  creator: "Cosmic Compass",
  publisher: "Cosmic Compass",
  metadataBase: new URL("https://cosmic-compass-seven.vercel.app"),
  openGraph: {
    title: "Cosmic Compass — Your Universal Fortune Guide",
    description:
      "One question, four answers. Compare Western astrology, Chinese BaZi, Vedic wisdom, and Tarot — all powered by AI.",
    type: "website",
    siteName: "Cosmic Compass",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmic Compass — Your Universal Fortune Guide",
    description:
      "One question, four answers. Compare Western astrology, Chinese BaZi, Vedic wisdom, and Tarot — all powered by AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} min-h-screen font-sans antialiased`}>
        <Stars />
        <Header />
        <ErrorBoundary>
          <main className="relative z-10 pb-24">{children}</main>
        </ErrorBoundary>
        <FloatingNav />
      </body>
    </html>
  );
}
