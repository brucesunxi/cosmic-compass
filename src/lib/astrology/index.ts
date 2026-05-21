export { calculateBirthChart, getWesternHoroscope } from "./western";
export type { BirthChart, PlanetPosition } from "./western";

export { calculateBaZi } from "./bazi";
export type { BaZiChart, BaZiPillar, BaZiSummary } from "./bazi";

export { calculateVedicChart } from "./vedic";
export type { VedicChart, GrahaPosition, VedicSummary } from "./vedic";

export { drawTarotReading, SPREADS } from "./tarot";
export type { TarotCard, TarotSpread, TarotReading } from "./tarot";

// Unified reading interface
export interface UnifiedReading {
  western: ReturnType<typeof import("./western").getWesternHoroscope>;
  bazi: import("./bazi").BaZiChart;
  vedic: import("./vedic").VedicChart;
  tarot: import("./tarot").TarotReading;
}

export function getDailyFortune(): { message: string; sign: string; lucky: string } {
  const messages = [
    "The universe is aligning in your favor. Trust the journey.",
    "A sudden opportunity will present itself. Stay alert.",
    "Your intuition is especially strong today. Listen to that inner voice.",
    "Someone from your past may re-enter your life with an important message.",
    "Financial abundance is flowing toward you. Be open to receiving.",
    "A creative breakthrough is imminent. Make space for inspiration.",
    "Today favors bold decisions. The stars support courageous action.",
    "Patience will be rewarded. What you've been waiting for is approaching.",
    "A meaningful conversation will shift your perspective on a key issue.",
    "Self-care is not selfish. The universe asks you to nurture yourself today.",
  ];

  const signs = [
    "🌞", "🌙", "⭐", "✨", "🌊", "🔥", "💫", "🌟", "🌿", "🌈",
  ];

  return {
    message: messages[Math.floor(Math.random() * messages.length)],
    sign: signs[Math.floor(Math.random() * signs.length)],
    lucky: String(Math.floor(Math.random() * 9) + 1),
  };
}
