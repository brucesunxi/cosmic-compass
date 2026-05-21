// Chinese BaZi (Four Pillars of Destiny) Engine

export interface BaZiPillar {
  heavenlyStem: string;
  earthlyBranch: string;
  element: string;
  hiddenStems: string[];
}

export interface BaZiChart {
  yearPillar: BaZiPillar;
  monthPillar: BaZiPillar;
  dayPillar: BaZiPillar;
  hourPillar: BaZiPillar;
  dayMaster: string; // Day Heavenly Stem - represents the self
  luckPillars: BaZiPillar[];
  summary: BaZiSummary;
}

export interface BaZiSummary {
  elementBalance: string;
  luckyElement: string;
  weakElement: string;
  personality: string;
  careerAdvice: string;
  loveAdvice: string;
  luckyDirections: string[];
  luckyColors: string[];
}

const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEM_ELEMENTS = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
const BRANCH_ELEMENTS: Record<string, string> = {
  "子": "Water", "丑": "Earth", "寅": "Wood", "卯": "Wood",
  "辰": "Earth", "巳": "Fire", "午": "Fire", "未": "Earth",
  "申": "Metal", "酉": "Metal", "戌": "Earth", "亥": "Water",
};

const STEM_EN: Record<string, string> = {
  "甲": "Jia (Yang Wood)", "乙": "Yi (Yin Wood)",
  "丙": "Bing (Yang Fire)", "丁": "Ding (Yin Fire)",
  "戊": "Wu (Yang Earth)", "己": "Ji (Yin Earth)",
  "庚": "Geng (Yang Metal)", "辛": "Xin (Yin Metal)",
  "壬": "Ren (Yang Water)", "癸": "Gui (Yin Water)",
};

const BRANCH_ANIMALS: Record<string, string> = {
  "子": "Rat 🐀", "丑": "Ox 🐂", "寅": "Tiger 🐅", "卯": "Rabbit 🐇",
  "辰": "Dragon 🐉", "巳": "Snake 🐍", "午": "Horse 🐎", "未": "Goat 🐐",
  "申": "Monkey 🐒", "酉": "Rooster 🐓", "戌": "Dog 🐕", "亥": "Pig 🐖",
};

const HIDDEN_STEMS: Record<string, string[]> = {
  "子": ["癸"], "丑": ["己", "癸", "辛"], "寅": ["甲", "丙", "戊"],
  "卯": ["乙"], "辰": ["戊", "乙", "癸"], "巳": ["丙", "庚", "戊"],
  "午": ["丁", "己"], "未": ["己", "丁", "乙"], "申": ["庚", "壬", "戊"],
  "酉": ["辛"], "戌": ["戊", "辛", "丁"], "亥": ["壬", "甲"],
};

function getYearStem(year: number): number {
  return (year - 4) % 10;
}

function getYearBranch(year: number): number {
  return (year - 4) % 12;
}

function getMonthStem(yearStem: number, month: number): number {
  // Simplified month stem calculation based on year stem
  const monthStemStart = (yearStem % 5) * 2;
  return (monthStemStart + month - 1) % 10;
}

function getMonthBranch(month: number): number {
  return (month + 1) % 12;
}

function getDayStemAndBranch(year: number, month: number, day: number): { stem: number; branch: number } {
  // Simplified day pillar calculation
  const daysFromStart = Math.floor(
    (year - 1900) * 365.25 + (month - 1) * 30.44 + day
  );
  return {
    stem: daysFromStart % 10,
    branch: daysFromStart % 12,
  };
}

function getHourStem(dayStem: number, hour: number): number {
  const hourBranch = Math.floor(hour / 2) % 12;
  const hourStemStart = (dayStem % 5) * 2;
  return (hourStemStart + hourBranch) % 10;
}

function getLuckElement(yearStem: number, gender: string, hour: number): string {
  // Simplified luck element calculation
  const isYang = yearStem % 2 === 0;
  const stemIndex = isYang ? (yearStem + 1) % 10 : (yearStem - 1 + 10) % 10;
  return STEM_ELEMENTS[stemIndex];
}

const personDescriptions: Record<string, string> = {
  "甲": "You are a natural leader with strong principles, like a towering tree. Independent and ambitious, you inspire others through your vision and integrity.",
  "乙": "Graceful and adaptable like a flowering vine, you navigate challenges with flexibility. Your strength lies in your ability to bend without breaking.",
  "丙": "Radiant like the sun, you bring warmth and light to everyone around you. Generous and charismatic, people naturally gravitate toward your energy.",
  "丁": "Like a candle in the darkness, your subtle brilliance illuminates truth. You are perceptive, passionate, and deeply sincere in your connections.",
  "戊": "Steady and reliable as a mountain, you provide stability for those around you. Your practical wisdom and patience make you a trusted advisor.",
  "己": "Nurturing like fertile soil, you support growth in others. Your quiet strength and attention to detail create lasting foundations.",
  "庚": "Sharp and determined like metal, you cut through obstacles with precision. Your courage and directness command respect in challenging situations.",
  "辛": "Refined and precious like jade, you possess both beauty and strength. Your artistic sensibilities and meticulous nature set you apart.",
  "壬": "Deep and powerful like the ocean, your emotions run profound. You possess wisdom beyond your years and a natural intuitive gift.",
  "癸": "Subtle and mysterious like gentle rain, you nourish without fanfare. Your intuition is your greatest gift, guiding you through life's complexities.",
};

export function calculateBaZi(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: string
): BaZiChart {
  const yearStem = getYearStem(year);
  const yearBranch = getYearBranch(year);
  const monthStem = getMonthStem(yearStem, month);
  const monthBranch = getMonthBranch(month);
  const dayPillars = getDayStemAndBranch(year, month, day);
  const hourBranch = Math.floor(hour / 2) % 12;
  const hourStem = getHourStem(dayPillars.stem, hour);

  const dayMasterElement = STEM_ELEMENTS[dayPillars.stem];

  const luckElement = getLuckElement(yearStem, gender, hour);

  // Generate luck pillars (10-year cycles, 8 pillars)
  const luckPillars: BaZiPillar[] = [];
  for (let i = 0; i < 8; i++) {
    const luckStem = (dayPillars.stem + i + 1) % 10;
    const luckBranch = (dayPillars.branch + i + 1) % 12;
    luckPillars.push({
      heavenlyStem: HEAVENLY_STEMS[luckStem],
      earthlyBranch: EARTHLY_BRANCHES[luckBranch],
      element: STEM_ELEMENTS[luckStem],
      hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[luckBranch]] || [],
    });
  }

  // Analyze element balance
  const elements = [STEM_ELEMENTS[yearStem], STEM_ELEMENTS[monthStem],
    dayMasterElement, STEM_ELEMENTS[hourStem]];
  const elementCount: Record<string, number> = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
  elements.forEach((e) => { elementCount[e]++; });

  const dominantElement = Object.entries(elementCount).sort((a, b) => b[1] - a[1])[0][0];
  const weakElement = Object.entries(elementCount).sort((a, b) => a[1] - b[1])[0][0];

  const pillar: (stemIndex: number, branchIndex: number) => BaZiPillar = (si, bi) => ({
    heavenlyStem: HEAVENLY_STEMS[si],
    earthlyBranch: EARTHLY_BRANCHES[bi],
    element: STEM_ELEMENTS[si],
    hiddenStems: HIDDEN_STEMS[EARTHLY_BRANCHES[bi]] || [],
  });

  return {
    yearPillar: pillar(yearStem, yearBranch),
    monthPillar: pillar(monthStem, monthBranch),
    dayPillar: pillar(dayPillars.stem, dayPillars.branch),
    hourPillar: pillar(hourStem, hourBranch),
    dayMaster: HEAVENLY_STEMS[dayPillars.stem],
    luckPillars,
    summary: {
      elementBalance: `Your chart shows a ${dominantElement}-dominant energy, with ${weakElement} being the element that needs nurturing. The Five Elements in your chart: Wood(${elementCount.Wood}), Fire(${elementCount.Fire}), Earth(${elementCount.Earth}), Metal(${elementCount.Metal}), Water(${elementCount.Water}).`,
      luckyElement: dominantElement,
      weakElement,
      personality: personDescriptions[HEAVENLY_STEMS[dayPillars.stem]] || "You possess a balanced and harmonious nature.",
      careerAdvice: getCareerAdvice(dayMasterElement, dominantElement),
      loveAdvice: getLoveAdvice(dayMasterElement),
      luckyDirections: getLuckyDirections(dominantElement),
      luckyColors: getLuckyColors(dominantElement),
    },
  };
}

function getCareerAdvice(dayMaster: string, lucky: string): string {
  const advice: Record<string, string> = {
    Wood: "Creative and growth-oriented careers suit you. Forestry, education, writing, or entrepreneurship align with your expanding energy.",
    Fire: "Careers that spark passion—entertainment, leadership, marketing, or technology. Your radiant energy thrives in dynamic environments.",
    Earth: "Stable, nurturing professions like real estate, agriculture, healthcare, or consulting. Your reliable nature builds lasting success.",
    Metal: "Precision-driven fields like finance, law, engineering, or surgery. Your sharp mind excels where accuracy matters.",
    Water: "Fluid careers involving communication, travel, spirituality, or research. Your adaptability opens doors in diverse fields.",
  };
  return advice[dayMaster] || "Follow your authentic path and balance will follow.";
}

function getLoveAdvice(element: string): string {
  const advice: Record<string, string> = {
    Wood: "Seek a partner who appreciates your growth-oriented nature. Relationships flourish when you find someone who grows alongside you.",
    Fire: "Your passionate heart needs a partner who can match your intensity. Learn to temper your fire with patience for lasting love.",
    Earth: "You love deeply and loyally. A partner who values stability and sincerity will cherish your unwavering commitment.",
    Metal: "Quality matters more than quantity in love. A relationship built on mutual respect and shared values will stand the test of time.",
    Water: "Your emotional depth requires a partner who can navigate the depths with you. True love comes when you feel safe being vulnerable.",
  };
  return advice[element] || "Balance your heart with wisdom, and love will find its way.";
}

function getLuckyDirections(element: string): string[] {
  const directions: Record<string, string[]> = {
    Wood: ["East", "Southeast"],
    Fire: ["South", "Southwest"],
    Earth: ["Center", "Northeast"],
    Metal: ["West", "Northwest"],
    Water: ["North", "East"],
  };
  return directions[element] || ["East", "South"];
}

function getLuckyColors(element: string): string[] {
  const colors: Record<string, string[]> = {
    Wood: ["Green", "Brown"],
    Fire: ["Red", "Purple", "Orange"],
    Earth: ["Yellow", "Beige", "Brown"],
    Metal: ["White", "Gold", "Silver"],
    Water: ["Blue", "Black", "Dark Gray"],
  };
  return colors[element] || ["Green", "Blue"];
}
