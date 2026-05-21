// Western Astrology Engine
// Simplified planet sign and house calculation

export interface PlanetPosition {
  name: string;
  sign: string;
  degree: number;
  house?: number;
  retrograde: boolean;
  glyph: string;
}

export interface House {
  number: number;
  sign: string;
  degree: number;
}

export interface BirthChart {
  sun: PlanetPosition;
  moon: PlanetPosition;
  mercury: PlanetPosition;
  venus: PlanetPosition;
  mars: PlanetPosition;
  jupiter: PlanetPosition;
  saturn: PlanetPosition;
  houses: House[];
  ascendant: string;
  midheaven: string;
}

const SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const SIGN_GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

const PLANET_GLYPHS: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀",
  Mars: "♂", Jupiter: "♃", Saturn: "♄",
};

// Simplified planetary positions based on birth date
function calculatePlanetPosition(dayOfYear: number, year: number, planet: string): PlanetPosition {
  // Base planetary cycles (in degrees per day, simplified)
  const cycles: Record<string, { period: number; offset: number }> = {
    Sun: { period: 365.25, offset: 0 },
    Moon: { period: 27.3, offset: 0 },
    Mercury: { period: 88, offset: 0 },
    Venus: { period: 225, offset: 0 },
    Mars: { period: 687, offset: 0 },
    Jupiter: { period: 4333, offset: 0 },
    Saturn: { period: 10759, offset: 0 },
  };

  const cycle = cycles[planet];
  if (!cycle) throw new Error(`Unknown planet: ${planet}`);

  const yearsSince2000 = year - 2000;
  const totalDays = yearsSince2000 * 365.25 + dayOfYear;
  const rawDegrees = ((totalDays / cycle.period) * 360 + cycle.offset) % 360;
  const degree = rawDegrees < 0 ? rawDegrees + 360 : rawDegrees;

  const signIndex = Math.floor(degree / 30);
  const degInSign = degree % 30;

  // Retrograde logic for outer planets
  let retrograde = false;
  if (["Mars", "Jupiter", "Saturn"].includes(planet)) {
    const retrogadePeriod = Math.sin((totalDays / cycle.period) * Math.PI * 2);
    retrograde = retrogadePeriod > 0.7 || retrogadePeriod < -0.7;
  }

  return {
    name: planet,
    sign: SIGNS[signIndex],
    degree: Math.round(degInSign * 100) / 100,
    retrograde,
    glyph: PLANET_GLYPHS[planet] || "☉",
  };
}

function getDayOfYear(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getAscendant(hour: number, min: number): string {
  // Simplified ascendant based on time of day
  const totalMinutes = hour * 60 + min;
  const index = Math.floor((totalMinutes / 1440) * 12) % 12;
  return SIGNS[index];
}

export function calculateBirthChart(
  year: number,
  month: number,
  day: number,
  hour: number,
  min: number
): BirthChart {
  const date = new Date(year, month - 1, day);
  const dayOfYear = getDayOfYear(date);

  const planets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
  const positions: PlanetPosition[] = planets.map((p) =>
    calculatePlanetPosition(dayOfYear, year, p)
  );

  const ascendantSign = getAscendant(hour, min);
  const ascIndex = SIGNS.indexOf(ascendantSign);

  // Generate houses starting from ascendant
  const houses: House[] = Array.from({ length: 12 }, (_, i) => {
    const signIndex = (ascIndex + i) % 12;
    return {
      number: i + 1,
      sign: SIGNS[signIndex],
      degree: Math.round(Math.random() * 28 + 1),
    };
  });

  // Midheaven (MC) - 10th house cusp
  const mcSign = houses[9].sign;

  return {
    sun: positions[0],
    moon: positions[1],
    mercury: positions[2],
    venus: positions[3],
    mars: positions[4],
    jupiter: positions[5],
    saturn: positions[6],
    houses,
    ascendant: ascendantSign,
    midheaven: mcSign,
  };
}

export function getWesternHoroscope(birthChart: BirthChart): {
  daily: string;
  love: string;
  career: string;
} {
  const sunSign = birthChart.sun.sign;
  const moonSign = birthChart.moon.sign;
  const asc = birthChart.ascendant;

  const readings: Record<string, { daily: string; love: string; career: string }> = {
    Aries: {
      daily: "Mars energizes your ambition today. Channel this fire into creative projects rather than confrontations. The universe supports bold moves.",
      love: "Venus hints at a magnetic connection. Your confidence attracts admirers, but ensure you're truly available emotionally.",
      career: "Jupiter's transit through your 10th house amplifies career opportunities. A leadership role may be on the horizon.",
    },
    Taurus: {
      daily: "Venus blesses your senses today. Find joy in simple pleasures. Financial insights come during quiet moments.",
      love: "Stability calls. A partnership deepens through shared routines. Don't resist vulnerability—it strengthens your bond.",
      career: "Saturn rewards your patience. A long-term project shows its value. Consider investments in sustainable ventures.",
    },
    Gemini: {
      daily: "Mercury sharpens your wit. Communication flows effortlessly, making today perfect for negotiations and creative writing.",
      love: "Your charm is magnetic. A playful exchange could evolve into something deeper. Keep an open mind about unexpected connections.",
      career: "Networking pays off. Your adaptability in meetings impresses decision-makers. A collaborative project needs your input.",
    },
    Cancer: {
      daily: "The Moon heightens your intuition. Trust that gut feeling about a situation you've been overthinking.",
      love: " Emotional honesty deepens intimacy. Share what's in your heart—your vulnerability is your strength today.",
      career: "Your nurturing nature creates harmony at work. A colleague appreciates your support. Home-based projects thrive.",
    },
    Leo: {
      daily: "The Sun amplifies your natural charisma. You're in the spotlight—use it to inspire others and showcase your talents.",
      love: "Passion ignites. Your warmth draws people closer, but ensure admiration doesn't overshadow genuine connection.",
      career: "Your leadership shines. A presentation or pitch captures attention. Recognition from higher-ups is imminent.",
    },
    Virgo: {
      daily: "Mercury in your sign sharpens analysis. Detail-oriented work flows easily, but don't let perfectionism block progress.",
      love: "Thoughtful gestures speak louder than grand declarations. A small act of service means more than you realize.",
      career: "Your precision is valued. A complex problem yields to your systematic approach. Health and wellness projects benefit.",
    },
    Libra: {
      daily: "Venus brings harmony to your relationships. A difficult conversation finds balance. Seek beauty in your surroundings.",
      love: "Partnership takes center stage. Whether single or attached, the universe nudges you toward meaningful connection.",
      career: "Diplomacy is your superpower. Mediate a workplace disagreement. Creative partnerships flourish now.",
    },
    Scorpio: {
      daily: "Pluto transforms hidden areas of your life. Face a truth you've been avoiding—the release brings renewal.",
      love: "Intensity rises. A relationship deepens through shared vulnerability. Trust the process, even when it feels raw.",
      career: "Your investigative skills uncover valuable information. Research projects yield breakthroughs. Strategic planning succeeds.",
    },
    Sagittarius: {
      daily: "Jupiter expands your horizons. Travel or study beckons. A philosophical insight shifts your perspective on a nagging issue.",
      love: "Adventure fuels romance. Shared exploration—whether physical or intellectual—strengthens your bond.",
      career: "Opportunity arrives from abroad or through higher education. Your optimism attracts support from unexpected sources.",
    },
    Capricorn: {
      daily: "Saturn reminds you of your capabilities. Structure and discipline today lay the foundation for future success.",
      love: "Commitment matters. A serious conversation about the future strengthens your foundation. Patience brings lasting rewards.",
      career: "Your ambition is recognized. A leadership role or promotion awaits. Systematic effort beats shortcuts every time.",
    },
    Aquarius: {
      daily: "Uranus brings unexpected insights. An unconventional approach solves a persistent problem. Embrace your uniqueness.",
      love: "Friendship is the foundation of romance. A connection that begins in a group setting could become significant.",
      career: "Innovation is your edge. Your forward-thinking ideas attract attention. Technology or social impact projects gain momentum.",
    },
    Pisces: {
      daily: "Neptune heightens creativity and intuition. Artistic expression flows naturally. Pay attention to dreams and synchronicities.",
      love: "Romance feels like a dream. Your compassionate nature attracts deep connections. Set gentle boundaries where needed.",
      career: "Your creative vision sets you apart. An artistic project finds its audience. Trust your intuitive guidance in decisions.",
    },
  };

  const defaultReading = {
    daily: "The stars align in your favor today. Trust the journey and embrace the unknown.",
    love: "Love moves in mysterious ways. Stay open to unexpected encounters.",
    career: "Professional growth comes through perseverance. Your efforts will soon be rewarded.",
  };

  return readings[sunSign] || defaultReading;
}
