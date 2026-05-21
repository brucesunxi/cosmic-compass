// Vedic (Jyotish) Astrology Engine

export interface GrahaPosition {
  name: string;
  rashi: string;
  nakshatra: string;
  pada: number;
  degree: number;
  isRetrograde: boolean;
  isBenefic: boolean;
  house: number;
}

export interface VedicChart {
  lagna: string;
  lagnaLord: string;
  grahas: GrahaPosition[];
  houses: Array<{ number: number; rashi: string; lord: string }>;
  dashas: Array<{ planet: string; period: string; startAge: number }>;
  summary: VedicSummary;
}

export interface VedicSummary {
  personality: string;
  strengths: string[];
  challenges: string[];
  careerPath: string;
  relationships: string;
  spiritual: string;
  remedy: string;
}

const RASHIS = [
  "Mesha (Aries)", "Vrishabha (Taurus)", "Mithuna (Gemini)", "Karka (Cancer)",
  "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)", "Makara (Capricorn)", "Kumbha (Aquarius)", "Mina (Pisces)",
];

const RASHI_LORDS = [
  "Mangal (Mars)", "Shukra (Venus)", "Budha (Mercury)", "Chandra (Moon)",
  "Surya (Sun)", "Budha (Mercury)", "Shukra (Venus)", "Mangal (Mars)",
  "Guru (Jupiter)", "Shani (Saturn)", "Shani (Saturn)", "Guru (Jupiter)",
];

const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
  "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha",
  "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
];

const NAKSHATRA_LORDS = [
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
  "Jupiter", "Saturn", "Mercury", "Ketu", "Venus", "Sun",
  "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury",
  "Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu",
  "Jupiter", "Saturn", "Mercury",
];

const GRAHA_NAMES = ["Surya", "Chandra", "Mangal", "Budha", "Guru", "Shukra", "Shani"];
const GRAHA_EN = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];

function getNakshatra(moonDegree: number): { nakshatra: string; lord: string; pada: number } {
  const totalMinutes = moonDegree * 60;
  const nakshatraLength = 800; // 13°20' in minutes
  const naksIndex = Math.floor(totalMinutes / nakshatraLength) % 27;
  const padaLength = 200; // 3°20' in minutes
  const pada = Math.floor((totalMinutes % nakshatraLength) / padaLength) + 1;
  return {
    nakshatra: NAKSHATRAS[naksIndex],
    lord: NAKSHATRA_LORDS[naksIndex],
    pada,
  };
}

function calculatePlanetaryHouse(degree: number, ascDegree: number): number {
  let relativeDegree = degree - ascDegree;
  if (relativeDegree < 0) relativeDegree += 360;
  return Math.floor(relativeDegree / 30) + 1;
}

function isBenefic(graha: string): boolean {
  const benefics = ["Jupiter", "Venus", "Mercury", "Moon"];
  return benefics.includes(graha);
}

export function calculateVedicChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  min: number
): VedicChart {
  // Simplified Vedic calculation
  const ayanamsa = 23.85; // Approximate difference between tropical and sidereal

  const date = new Date(year, month - 1, day);
  const startOfYear = new Date(year, 0, 0);
  const dayOfYear = Math.floor((date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate sidereal positions (subtract ayanamsa from tropical)
  const lagnaTropical = ((dayOfYear / 365.25) * 360 + (hour * 60 + min) / 4) % 360;
  const lagnaSidereal = ((lagnaTropical - ayanamsa + 360) % 360);
  const lagnaIndex = Math.floor(lagnaSidereal / 30);

  // Calculate graha positions
  const grahas: GrahaPosition[] = GRAHA_NAMES.map((graha, i) => {
    const cycle = [365.25, 27.3, 687, 88, 4333, 225, 10759][i];
    const offset = [0, 0, 0, 0, 90, 180, 270][i];
    const yearsSince2000 = year - 2000;
    const totalDays = yearsSince2000 * 365.25 + dayOfYear;
    const tropicalDeg = ((totalDays / cycle) * 360 + offset) % 360;
    const siderealDeg = (tropicalDeg - ayanamsa + 360) % 360;
    const rashiIndex = Math.floor(siderealDeg / 30);

    // Moon's nakshatra for detailed analysis
    const { nakshatra, lord, pada } = i === 1
      ? getNakshatra(siderealDeg)
      : { nakshatra: NAKSHATRAS[rashiIndex * 2 % 27], lord: NAKSHATRA_LORDS[rashiIndex * 2 % 27], pada: 1 };

    const isRetro = i >= 4 && Math.random() < 0.3; // Outer planets sometimes retrograde

    return {
      name: GRAHA_EN[i],
      rashi: RASHIS[rashiIndex],
      nakshatra,
      pada,
      degree: Math.round(siderealDeg % 30 * 100) / 100,
      isRetrograde: isRetro,
      isBenefic: isBenefic(GRAHA_EN[i]),
      house: calculatePlanetaryHouse(siderealDeg, lagnaSidereal),
    };
  });

  // Generate houses
  const houses = Array.from({ length: 12 }, (_, i) => {
    const rashiIndex = (lagnaIndex + i) % 12;
    return {
      number: i + 1,
      rashi: RASHIS[rashiIndex],
      lord: RASHI_LORDS[rashiIndex],
    };
  });

  // Dasha periods (Vimshottari Dasha simplified)
  const dashaOrder = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
  const dashaYears = [7, 20, 6, 10, 7, 18, 16, 19, 17];
  const dashas = dashaOrder.map((planet, i) => ({
    planet,
    period: `${dashaYears[i]} years`,
    startAge: dashaOrder.slice(0, i).reduce((sum, _, j) => sum + dashaYears[j], 0),
  }));

  return {
    lagna: RASHIS[lagnaIndex],
    lagnaLord: RASHI_LORDS[lagnaIndex],
    grahas,
    houses,
    dashas,
    summary: generateVedicSummary(grahas, lagnaIndex),
  };
}

function generateVedicSummary(grahas: GrahaPosition[], lagnaIndex: number): VedicSummary {
  const sun = grahas[0];
  const moon = grahas[1];
  const jupiter = grahas[4];
  const venus = grahas[5];
  const saturn = grahas[6];

  const strengths: string[] = [];
  const challenges: string[] = [];

  if (jupiter.isBenefic && jupiter.house <= 3) {
    strengths.push("Strong Jupiter placement bestows wisdom, optimism, and spiritual inclination.");
  }
  if (venus.isBenefic && venus.house >= 5) {
    strengths.push("Venus in a trine house indicates artistic talent, harmonious relationships, and material comfort.");
  }
  if (sun.house === 1 || sun.house === 10) {
    strengths.push("Sun in a kendra house grants leadership abilities, confidence, and a strong sense of purpose.");
  }
  if (moon.house >= 7) {
    challenges.push("Moon in the second half of the chart may indicate emotional sensitivity and fluctuating moods.");
  }
  if (saturn.house === 6 || saturn.house === 8 || saturn.house === 12) {
    challenges.push("Saturn in a dusthana house requires discipline and patience to overcome karmic obstacles.");
  }

  strengths.push("Your birth chart shows unique karmic patterns ready to unfold in this lifetime.");
  challenges.push("Pay attention to your Mahadasha periods for timing of major life events.");

  return {
    personality: `You have a ${RASHIS[lagnaIndex]} Lagna, which means you present yourself to the world with the qualities of ${RASHIS[lagnaIndex]}. Your Moon is in ${moon.rashi} in the ${getOrdinal(moon.house)} house, influencing your emotional nature. The Sun in ${sun.rashi} reveals your soul's purpose.`,
    strengths,
    challenges,
    careerPath: `With Jupiter in the ${getOrdinal(jupiter.house)} house and your Lagna Lord's placement, careers in ${lagnaIndex % 3 === 0 ? 'leadership, management, or public service' : lagnaIndex % 3 === 1 ? 'creative arts, counseling, or healthcare' : 'research, technology, or spiritual teaching'} are strongly indicated.`,
    relationships: `Venus in ${venus.rashi} and the ${getOrdinal(venus.house)} ${venus.house > 9 ? 'suggests relationships formed through shared values and spiritual connection' : 'indicates a harmonious domestic life with potential for a loving partnership'}.`,
    spiritual: `Your ${moon.nakshatra} Nakshatra indicates a spiritual path influenced by ${moon.nakshatra}'s presiding deity. Meditation on ${getNakshatraDeity(moon.nakshatra)} may bring profound insights.`,
    remedy: `To balance planetary energies, consider chanting the Gayatri Mantra 108 times on Thursdays. Wearing a ${lagnaIndex % 2 === 0 ? 'Yellow Sapphire' : 'Pearl'} after proper consultation may strengthen beneficial planetary influences.`,
  };
}

function getOrdinal(n: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

function getNakshatraDeity(nakshatra: string): string {
  const deities: Record<string, string> = {
    "Ashwini": "the Ashwini Kumaras (divine healers)",
    "Bharani": "Yama (god of death and dharma)",
    "Krittika": "Agni (god of fire)",
    "Rohini": "Prajapati (creator deity)",
    "Mrigashira": "Soma (the moon god)",
    "Ardra": "Rudra (storm god)",
    "Punarvasu": "Aditi (mother of the gods)",
    "Pushya": "Brihaspati (guru of the gods)",
    "Ashlesha": "Shesha (the cosmic serpent)",
    "Magha": "the Pitris (ancestors)",
    "Purva Phalguni": "Bhaga (god of prosperity)",
    "Uttara Phalguni": "Aryaman (god of patronage)",
    "Hasta": "Savitr (the sun god)",
    "Chitra": "Vishwakarma (divine architect)",
    "Swati": "Vayu (god of wind)",
    "Vishakha": "Indra-Agni (the dual deities)",
    "Anuradha": "Mitra (god of friendship)",
    "Jyeshtha": "Indra (king of the gods)",
    "Mula": "Nirriti (goddess of dissolution)",
    "Purva Ashadha": "Apas (goddess of waters)",
    "Uttara Ashadha": "the Vishvadevas (universal gods)",
    "Shravana": "Vishnu (the preserver)",
    "Dhanishta": "the eight Vasus (earthly deities)",
    "Shatabhisha": "Varuna (god of cosmic waters)",
    "Purva Bhadrapada": "Aja Ekapada (the one-footed goat)",
    "Uttara Bhadrapada": "Ahirbudhnya (serpent of the deep)",
    "Revati": "Pushan (nourisher of the world)",
  };
  return deities[nakshatra] || "the cosmic forces";
}
