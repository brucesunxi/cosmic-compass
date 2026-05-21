// AI Tarot Engine

export interface TarotCard {
  id: number;
  name: string;
  arcana: "major" | "minor";
  suit?: "wands" | "cups" | "swords" | "pentacles";
  number?: number;
  meaningUpright: string;
  meaningReversed: string;
  keywords: string[];
  element?: string;
}

export interface TarotSpread {
  name: string;
  description: string;
  positions: string[];
  cardCount: number;
}

export interface TarotReading {
  spread: TarotSpread;
  cards: Array<{
    card: TarotCard;
    position: string;
    reversed: boolean;
    interpretation: string;
  }>;
  overallMessage: string;
}

const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Fool", arcana: "major", meaningUpright: "New beginnings, innocence, spontaneity, free spirit", meaningReversed: "Recklessness, risk-taking, holding back", keywords: ["beginnings", "innocence", "freedom"], element: "Air" },
  { id: 1, name: "The Magician", arcana: "major", meaningUpright: "Willpower, skill, resourcefulness, manifestation", meaningReversed: "Trickery, manipulation, untapped talents", keywords: ["power", "skill", "manifestation"], element: "Air" },
  { id: 2, name: "The High Priestess", arcana: "major", meaningUpright: "Intuition, mystery, the subconscious mind", meaningReversed: "Secrets, withdrawal, silence", keywords: ["intuition", "mystery", "wisdom"], element: "Water" },
  { id: 3, name: "The Empress", arcana: "major", meaningUpright: "Femininity, abundance, nature, nurturing", meaningReversed: "Creative block, dependence, emptiness", keywords: ["abundance", "nurturing", "beauty"], element: "Earth" },
  { id: 4, name: "The Emperor", arcana: "major", meaningUpright: "Authority, structure, stability, protection", meaningReversed: "Tyranny, rigidity, lack of discipline", keywords: ["authority", "structure", "power"], element: "Fire" },
  { id: 5, name: "The Hierophant", arcana: "major", meaningUpright: "Tradition, spiritual wisdom, conformity", meaningReversed: "Rebellion, unconventionality, ignorance", keywords: ["tradition", "wisdom", "guidance"], element: "Earth" },
  { id: 6, name: "The Lovers", arcana: "major", meaningUpright: "Love, harmony, relationships, choices", meaningReversed: "Disharmony, imbalance, misalignment", keywords: ["love", "choices", "harmony"], element: "Air" },
  { id: 7, name: "The Chariot", arcana: "major", meaningUpright: "Willpower, determination, victory, control", meaningReversed: "Lack of direction, aggression, defeat", keywords: ["victory", "willpower", "control"], element: "Water" },
  { id: 8, name: "Strength", arcana: "major", meaningUpright: "Inner strength, courage, compassion, patience", meaningReversed: "Self-doubt, weakness, insecurity", keywords: ["courage", "patience", "inner strength"], element: "Fire" },
  { id: 9, name: "The Hermit", arcana: "major", meaningUpright: "Soul-searching, introspection, solitude", meaningReversed: "Isolation, loneliness, withdrawal", keywords: ["wisdom", "solitude", "introspection"], element: "Earth" },
  { id: 10, name: "Wheel of Fortune", arcana: "major", meaningUpright: "Change, cycles, destiny, turning point", meaningReversed: "Bad luck, resistance to change, setbacks", keywords: ["change", "cycles", "luck"], element: "Air" },
  { id: 11, name: "Justice", arcana: "major", meaningUpright: "Fairness, truth, law, cause and effect", meaningReversed: "Injustice, dishonesty, imbalance", keywords: ["justice", "truth", "balance"], element: "Air" },
  { id: 12, name: "The Hanged Man", arcana: "major", meaningUpright: "Surrender, new perspective, pause", meaningReversed: "Delay, resistance, stalling", keywords: ["surrender", "pause", "perspective"], element: "Water" },
  { id: 13, name: "Death", arcana: "major", meaningUpright: "Transformation, endings, change, renewal", meaningReversed: "Resistance to change, stagnation", keywords: ["transformation", "endings", "renewal"], element: "Water" },
  { id: 14, name: "Temperance", arcana: "major", meaningUpright: "Balance, moderation, patience, harmony", meaningReversed: "Imbalance, excess, conflict", keywords: ["balance", "moderation", "patience"], element: "Fire" },
  { id: 15, name: "The Devil", arcana: "major", meaningUpright: "Bondage, materialism, shadow self", meaningReversed: "Release, enlightenment, freedom", keywords: ["shadow", "bondage", "materialism"], element: "Earth" },
  { id: 16, name: "The Tower", arcana: "major", meaningUpright: "Sudden change, upheaval, revelation", meaningReversed: "Avoidance of disaster, delayed change", keywords: ["upheaval", "revelation", "change"], element: "Fire" },
  { id: 17, name: "The Star", arcana: "major", meaningUpright: "Hope, faith, purpose, inspiration", meaningReversed: "Despair, hopelessness, discouragement", keywords: ["hope", "inspiration", "healing"], element: "Air" },
  { id: 18, name: "The Moon", arcana: "major", meaningUpright: "Illusion, fear, the unconscious, intuition", meaningReversed: "Release of fear, clarity, understanding", keywords: ["illusion", "intuition", "fear"], element: "Water" },
  { id: 19, name: "The Sun", arcana: "major", meaningUpright: "Success, joy, vitality, confidence", meaningReversed: "Temporary depression, lack of success", keywords: ["success", "joy", "vitality"], element: "Fire" },
  { id: 20, name: "Judgement", arcana: "major", meaningUpright: "Reflection, inner calling, rebirth", meaningReversed: "Self-doubt, denial, failure to learn", keywords: ["rebirth", "calling", "judgment"], element: "Fire" },
  { id: 21, name: "The World", arcana: "major", meaningUpright: "Completion, accomplishment, travel", meaningReversed: "Incompletion, delays, stagnation", keywords: ["completion", "wholeness", "travel"], element: "Earth" },
];

const MINOR_ARCANA: Record<string, TarotCard[]> = {
  wands: [
    { id: 100, name: "Ace of Wands", arcana: "minor", suit: "wands", number: 1, meaningUpright: "New inspiration, creative spark, potential", meaningReversed: "Delays, lack of motivation, obstacles", keywords: ["inspiration", "new beginnings", "creativity"], element: "Fire" },
    { id: 101, name: "Two of Wands", arcana: "minor", suit: "wands", number: 2, meaningUpright: "Planning, future vision, bold decisions", meaningReversed: "Fear of unknown, lack of planning", keywords: ["planning", "decisions", "future"], element: "Fire" },
    { id: 102, name: "Three of Wands", arcana: "minor", suit: "wands", number: 3, meaningUpright: "Expansion, progress, foresight", meaningReversed: "Obstacles, delays, frustration", keywords: ["expansion", "progress", "exploration"], element: "Fire" },
    { id: 103, name: "Four of Wands", arcana: "minor", suit: "wands", number: 4, meaningUpright: "Celebration, harmony, homecoming", meaningReversed: "Tension, lack of harmony, cancelled plans", keywords: ["celebration", "home", "harmony"], element: "Fire" },
    { id: 104, name: "Five of Wands", arcana: "minor", suit: "wands", number: 5, meaningUpright: "Competition, conflict, tension", meaningReversed: "Avoidance of conflict, cooperation", keywords: ["competition", "conflict", "challenge"], element: "Fire" },
    { id: 105, name: "Six of Wands", arcana: "minor", suit: "wands", number: 6, meaningUpright: "Victory, recognition, public success", meaningReversed: "Failure, lack of recognition, fall from grace", keywords: ["victory", "recognition", "success"], element: "Fire" },
    { id: 106, name: "Seven of Wands", arcana: "minor", suit: "wands", number: 7, meaningUpright: "Defensiveness, standing ground, challenge", meaningReversed: "Giving up, overwhelmed, surrender", keywords: ["defense", "perseverance", "challenge"], element: "Fire" },
    { id: 107, name: "Eight of Wands", arcana: "minor", suit: "wands", number: 8, meaningUpright: "Speed, movement, rapid progress", meaningReversed: "Delays, frustration, resistance", keywords: ["speed", "progress", "action"], element: "Fire" },
    { id: 108, name: "Nine of Wands", arcana: "minor", suit: "wands", number: 9, meaningUpright: "Resilience, persistence, last stand", meaningReversed: "Exhaustion, burnout, giving up", keywords: ["resilience", "persistence", "caution"], element: "Fire" },
    { id: 109, name: "Ten of Wands", arcana: "minor", suit: "wands", number: 10, meaningUpright: "Burden, responsibility, hard work", meaningReversed: "Release, delegation, lightening load", keywords: ["burden", "responsibility", "stress"], element: "Fire" },
    { id: 110, name: "Page of Wands", arcana: "minor", suit: "wands", number: 11, meaningUpright: "Enthusiasm, exploration, free spirit", meaningReversed: "Lack of direction, setbacks", keywords: ["enthusiasm", "exploration", "curiosity"], element: "Fire" },
    { id: 111, name: "Knight of Wands", arcana: "minor", suit: "wands", number: 12, meaningUpright: "Courage, adventure, impulsiveness", meaningReversed: "Recklessness, haste, burnout", keywords: ["adventure", "courage", "passion"], element: "Fire" },
    { id: 112, name: "Queen of Wands", arcana: "minor", suit: "wands", number: 13, meaningUpright: "Confidence, determination, warmth", meaningReversed: "Jealousy, selfishness, insecurity", keywords: ["confidence", "warmth", "determination"], element: "Fire" },
    { id: 113, name: "King of Wands", arcana: "minor", suit: "wands", number: 14, meaningUpright: "Leadership, vision, entrepreneur", meaningReversed: "Ruthlessness, high expectations, overbearing", keywords: ["leadership", "vision", "power"], element: "Fire" },
  ],
  cups: [
    { id: 200, name: "Ace of Cups", arcana: "minor", suit: "cups", number: 1, meaningUpright: "New love, emotional beginning, intuition", meaningReversed: "Emotional emptiness, blocked feelings", keywords: ["love", "emotion", "new beginnings"], element: "Water" },
    { id: 201, name: "Two of Cups", arcana: "minor", suit: "cups", number: 2, meaningUpright: "Partnership, mutual attraction, unity", meaningReversed: "Breakup, imbalance, separation", keywords: ["partnership", "love", "connection"], element: "Water" },
    { id: 202, name: "Three of Cups", arcana: "minor", suit: "cups", number: 3, meaningUpright: "Friendship, celebration, community", meaningReversed: "Overindulgence, gossip, isolation", keywords: ["friendship", "celebration", "joy"], element: "Water" },
    { id: 203, name: "Four of Cups", arcana: "minor", suit: "cups", number: 4, meaningUpright: "Contemplation, apathy, meditation", meaningReversed: "New perspective, awareness, action", keywords: ["contemplation", "apathy", "reassessment"], element: "Water" },
    { id: 204, name: "Five of Cups", arcana: "minor", suit: "cups", number: 5, meaningUpright: "Grief, loss, disappointment", meaningReversed: "Acceptance, moving on, forgiveness", keywords: ["grief", "loss", "regret"], element: "Water" },
    { id: 205, name: "Six of Cups", arcana: "minor", suit: "cups", number: 6, meaningUpright: "Nostalgia, childhood memories, innocence", meaningReversed: "Moving forward, leaving the past", keywords: ["nostalgia", "memories", "innocence"], element: "Water" },
    { id: 206, name: "Seven of Cups", arcana: "minor", suit: "cups", number: 7, meaningUpright: "Choices, illusions, fantasy", meaningReversed: "Clarity, focus, realistic goals", keywords: ["choices", "illusions", "options"], element: "Water" },
    { id: 207, name: "Eight of Cups", arcana: "minor", suit: "cups", number: 8, meaningUpright: "Letting go, walking away, seeking truth", meaningReversed: "Fear of change, clinging, avoidance", keywords: ["letting go", "search", "departure"], element: "Water" },
    { id: 208, name: "Nine of Cups", arcana: "minor", suit: "cups", number: 9, meaningUpright: "Wishes fulfilled, satisfaction, contentment", meaningReversed: "Dissatisfaction, unfulfilled wishes", keywords: ["fulfillment", "satisfaction", "wishes"], element: "Water" },
    { id: 209, name: "Ten of Cups", arcana: "minor", suit: "cups", number: 10, meaningUpright: "Emotional fulfillment, happy family, bliss", meaningReversed: "Broken home, disharmony, shattered dreams", keywords: ["happiness", "family", "fulfillment"], element: "Water" },
    { id: 210, name: "Page of Cups", arcana: "minor", suit: "cups", number: 11, meaningUpright: "Creative inspiration, intuitive messages", meaningReversed: "Emotional immaturity, creative block", keywords: ["creativity", "intuition", "curiosity"], element: "Water" },
    { id: 211, name: "Knight of Cups", arcana: "minor", suit: "cups", number: 12, meaningUpright: "Romance, charm, following dreams", meaningReversed: "Jealousy, unrealistic dreams, moodiness", keywords: ["romance", "charm", "dreams"], element: "Water" },
    { id: 212, name: "Queen of Cups", arcana: "minor", suit: "cups", number: 13, meaningUpright: "Compassion, emotional depth, nurturing", meaningReversed: "Emotional insecurity, codependency", keywords: ["compassion", "nurturing", "intuition"], element: "Water" },
    { id: 213, name: "King of Cups", arcana: "minor", suit: "cups", number: 14, meaningUpright: "Emotional balance, wisdom, diplomacy", meaningReversed: "Moodiness, emotional manipulation", keywords: ["wisdom", "balance", "compassion"], element: "Water" },
  ],
  swords: [
    { id: 300, name: "Ace of Swords", arcana: "minor", suit: "swords", number: 1, meaningUpright: "Clarity, truth, mental breakthrough", meaningReversed: "Confusion, misinformation, deception", keywords: ["truth", "clarity", "breakthrough"], element: "Air" },
    { id: 301, name: "Two of Swords", arcana: "minor", suit: "swords", number: 2, meaningUpright: "Difficult decisions, stalemate, avoidance", meaningReversed: "Lesser of two evils, information revealed", keywords: ["decision", "stalemate", "balance"], element: "Air" },
    { id: 302, name: "Three of Swords", arcana: "minor", suit: "swords", number: 3, meaningUpright: "Heartbreak, sorrow, pain", meaningReversed: "Healing, forgiveness, release of pain", keywords: ["heartbreak", "pain", "sorrow"], element: "Air" },
    { id: 303, name: "Four of Swords", arcana: "minor", suit: "swords", number: 4, meaningUpright: "Rest, meditation, recuperation", meaningReversed: "Restlessness, burnout, stress", keywords: ["rest", "meditation", "recovery"], element: "Air" },
    { id: 304, name: "Five of Swords", arcana: "minor", suit: "swords", number: 5, meaningUpright: "Conflict, defeat, self-interest", meaningReversed: "Reconciliation, making amends", keywords: ["conflict", "defeat", "tension"], element: "Air" },
    { id: 305, name: "Six of Swords", arcana: "minor", suit: "swords", number: 6, meaningUpright: "Transition, moving forward, leaving behind", meaningReversed: "Resistance to change, emotional baggage", keywords: ["transition", "moving on", "journey"], element: "Air" },
    { id: 306, name: "Seven of Swords", arcana: "minor", suit: "swords", number: 7, meaningUpright: "Deception, strategy, stealth", meaningReversed: "Confession, coming clean, conscience", keywords: ["deception", "strategy", "secrecy"], element: "Air" },
    { id: 307, name: "Eight of Swords", arcana: "minor", suit: "swords", number: 8, meaningUpright: "Feeling trapped, self-imposed restriction", meaningReversed: "Freedom, release, empowerment", keywords: ["restriction", "fear", "trap"], element: "Air" },
    { id: 308, name: "Nine of Swords", arcana: "minor", suit: "swords", number: 9, meaningUpright: "Anxiety, worry, nightmares", meaningReversed: "Relief, hope, letting go of fear", keywords: ["anxiety", "worry", "fear"], element: "Air" },
    { id: 309, name: "Ten of Swords", arcana: "minor", suit: "swords", number: 10, meaningUpright: "Rock bottom, betrayal, painful ending", meaningReversed: "Recovery, survival, lesson learned", keywords: ["ending", "betrayal", "pain"], element: "Air" },
    { id: 310, name: "Page of Swords", arcana: "minor", suit: "swords", number: 11, meaningUpright: "Curiosity, new ideas, mental energy", meaningReversed: "Gossip, hasty words, cynicism", keywords: ["curiosity", "ideas", "communication"], element: "Air" },
    { id: 311, name: "Knight of Swords", arcana: "minor", suit: "swords", number: 12, meaningUpright: "Action, ambition, drive, determination", meaningReversed: "Rush, burnout, lack of direction", keywords: ["action", "ambition", "determination"], element: "Air" },
    { id: 312, name: "Queen of Swords", arcana: "minor", suit: "swords", number: 13, meaningUpright: "Independent, clear thinking, just", meaningReversed: "Cold-hearted, bitter, harsh judgment", keywords: ["wisdom", "independence", "justice"], element: "Air" },
    { id: 313, name: "King of Swords", arcana: "minor", suit: "swords", number: 14, meaningUpright: "Intellectual power, truth, authority", meaningReversed: "Abuse of power, manipulation, tyranny", keywords: ["authority", "truth", "power"], element: "Air" },
  ],
  pentacles: [
    { id: 400, name: "Ace of Pentacles", arcana: "minor", suit: "pentacles", number: 1, meaningUpright: "New financial beginning, prosperity, abundance", meaningReversed: "Lost opportunity, financial setback", keywords: ["prosperity", "new beginnings", "abundance"], element: "Earth" },
    { id: 401, name: "Two of Pentacles", arcana: "minor", suit: "pentacles", number: 2, meaningUpright: "Balance, juggling priorities, adaptability", meaningReversed: "Overwhelm, imbalance, disorganization", keywords: ["balance", "adaptability", "priority"], element: "Earth" },
    { id: 402, name: "Three of Pentacles", arcana: "minor", suit: "pentacles", number: 3, meaningUpright: "Teamwork, collaboration, skill building", meaningReversed: "Lack of teamwork, disregard for skills", keywords: ["teamwork", "skill", "collaboration"], element: "Earth" },
    { id: 403, name: "Four of Pentacles", arcana: "minor", suit: "pentacles", number: 4, meaningUpright: "Security, conservation, control", meaningReversed: "Greed, materialism, stinginess", keywords: ["security", "control", "stability"], element: "Earth" },
    { id: 404, name: "Five of Pentacles", arcana: "minor", suit: "pentacles", number: 5, meaningUpright: "Financial hardship, isolation, worry", meaningReversed: "Recovery, spiritual richness, finding help", keywords: ["hardship", "poverty", "isolation"], element: "Earth" },
    { id: 405, name: "Six of Pentacles", arcana: "minor", suit: "pentacles", number: 6, meaningUpright: "Generosity, charity, sharing wealth", meaningReversed: "Strings attached, inequality, debt", keywords: ["generosity", "sharing", "charity"], element: "Earth" },
    { id: 406, name: "Seven of Pentacles", arcana: "minor", suit: "pentacles", number: 7, meaningUpright: "Patience, long-term view, investment", meaningReversed: "Impatience, wasted effort, bad investments", keywords: ["patience", "growth", "investment"], element: "Earth" },
    { id: 407, name: "Eight of Pentacles", arcana: "minor", suit: "pentacles", number: 8, meaningUpright: "Apprenticeship, skill development, craftsmanship", meaningReversed: "Perfectionism, lack of dedication", keywords: ["skill", "craft", "dedication"], element: "Earth" },
    { id: 408, name: "Nine of Pentacles", arcana: "minor", suit: "pentacles", number: 9, meaningUpright: "Luxury, self-sufficiency, financial security", meaningReversed: "Financial setbacks, living beyond means", keywords: ["luxury", "abundance", "self-sufficiency"], element: "Earth" },
    { id: 409, name: "Ten of Pentacles", arcana: "minor", suit: "pentacles", number: 10, meaningUpright: "Legacy, inheritance, family wealth", meaningReversed: "Family disputes, financial loss, bankruptcy", keywords: ["legacy", "wealth", "family"], element: "Earth" },
    { id: 410, name: "Page of Pentacles", arcana: "minor", suit: "pentacles", number: 11, meaningUpright: "Ambition, learning, manifestation", meaningReversed: "Procrastination, lack of progress", keywords: ["ambition", "learning", "dedication"], element: "Earth" },
    { id: 411, name: "Knight of Pentacles", arcana: "minor", suit: "pentacles", number: 12, meaningUpright: "Hard work, reliability, responsibility", meaningReversed: "Stubbornness, laziness, stagnation", keywords: ["reliability", "hard work", "responsibility"], element: "Earth" },
    { id: 412, name: "Queen of Pentacles", arcana: "minor", suit: "pentacles", number: 13, meaningUpright: "Nurturing, abundance, practicality", meaningReversed: "Neglect, financial insecurity, smothering", keywords: ["nurturing", "practicality", "abundance"], element: "Earth" },
    { id: 413, name: "King of Pentacles", arcana: "minor", suit: "pentacles", number: 14, meaningUpright: "Wealth, business success, leadership", meaningReversed: "Greed, financial mismanagement, stubbornness", keywords: ["wealth", "success", "leadership"], element: "Earth" },
  ],
};

const allCards: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...Object.values(MINOR_ARCANA).flat(),
];

export const SPREADS: TarotSpread[] = [
  {
    name: "Three Card Spread",
    description: "Past · Present · Future — quick clarity on any situation",
    positions: ["Past", "Present", "Future"],
    cardCount: 3,
  },
  {
    name: "Celtic Cross",
    description: "Deep dive into your situation — the classic comprehensive spread",
    positions: ["Present", "Challenge", "Past", "Future", "Above", "Below", "Self", "Environment", "Hopes & Fears", "Outcome"],
    cardCount: 10,
  },
  {
    name: "Love Cross",
    description: "Focus on matters of the heart — what's really happening in your love life",
    positions: ["You", "Your Partner", "Relationship", "Challenge", "Outcome"],
    cardCount: 5,
  },
  {
    name: "Career Path",
    description: "Professional guidance — your calling, challenges, and growth",
    positions: ["Your Position", "Goal", "Obstacle", "Advice", "Outcome"],
    cardCount: 5,
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getInterpretation(card: TarotCard, position: string, reversed: boolean): string {
  const meaning = reversed ? card.meaningReversed : card.meaningUpright;
  const orientation = reversed ? "reversed" : "upright";

  const positionContexts: Record<string, string> = {
    Past: "This card represents energies from your past that are influencing your current situation. ",
    Present: "This card reflects your current circumstances and the energies at play right now. ",
    Future: "This card shows the trajectory you're on and potential outcomes ahead. ",
    "You": "This card represents your current state of being and inner energy. ",
    "Your Partner": "This card reflects the energy of your partner or the relationship dynamics. ",
    Relationship: "This card shows the nature of your relationship connection. ",
    Challenge: "This card highlights the obstacles or lessons you're facing. ",
    Above: "This represents your conscious goals and aspirations. ",
    Below: "This reveals your subconscious foundation and hidden influences. ",
    Self: "This card reflects your role in the current situation. ",
    Environment: "This shows how others perceive you and the external influences. ",
    "Hopes & Fears": "This reveals your deepest wishes and anxieties about the situation. ",
    Outcome: "This indicates the most likely outcome based on current energies. ",
    Advice: "The universe's guidance for navigating this situation. ",
    "Your Position": "This shows where you currently stand in your career journey. ",
    Goal: "This represents the aspirations driving your professional path. ",
    Obstacle: "This reveals what's blocking your professional growth. ",
    Love: "This card speaks to the matters of the heart. ",
    Career: "This card addresses your professional journey. ",
    Growth: "This points toward areas of potential expansion. ",
  };

  const context = positionContexts[position] || "This card offers insight into your situation. ";
  const keywords = card.keywords.slice(0, 2).join(" and ");

  return `${context}The ${card.name} appears ${orientation}, suggesting ${keywords}. In its ${orientation} position, ${meaning}.`;
}

function getOverallMessage(cards: Array<{ card: TarotCard; reversed: boolean }>): string {
  const uprightCount = cards.filter((c) => !c.reversed).length;
  const reversedCount = cards.filter((c) => c.reversed).length;

  const majorCount = cards.filter((c) => c.card.arcana === "major").length;
  const suits = cards.map((c) => c.card.suit).filter(Boolean);
  const uniqueSuits = [...new Set(suits)];

  let message = "The cards reveal a story of ";

  if (majorCount >= 3) {
    message += "significant life transitions and karmic lessons. Major Arcana dominance suggests you're in a powerful period of soul growth. ";
  } else if (uniqueSuits.length >= 3) {
    message += "balance across different areas of your life. ";
  } else if (uniqueSuits.length === 1 && uniqueSuits[0]) {
    const elementMessages: Record<string, string> = {
      wands: "intense creative and passionate energy. Fire dominates — take inspired action but avoid burnout. ",
      cups: "deep emotional and relational currents. Water flows — trust your feelings but maintain boundaries. ",
      swords: "mental clarity and necessary confrontation. Air moves — speak your truth with compassion. ",
      pentacles: "practical matters and material growth. Earth grounds — build steadily and patiently. ",
    };
    message += elementMessages[uniqueSuits[0]] || "focused energy in one area of life. ";
  } else {
    message += "a journey with both light and shadow, opportunities and challenges. ";
  }

  if (reversedCount > uprightCount) {
    message += "Many cards appear reversed, suggesting inner work and healing are needed before external progress can manifest.";
  } else if (uprightCount > reversedCount) {
    message += "The predominance of upright cards indicates energies are flowing freely — the universe supports your path forward.";
  } else {
    message += "There is balance between opposing forces. The outcome depends on your choices and awareness.";
  }

  return message;
}

export function drawTarotReading(spreadName: string): TarotReading {
  const spread = SPREADS.find((s) => s.name === spreadName) || SPREADS[0];

  // Shuffle and draw
  const shuffled = shuffleArray(allCards);
  const drawn = shuffled.slice(0, spread.cardCount);

  const reading = drawn.map((card, i) => {
    const reversed = Math.random() < 0.35; // ~35% chance of reversed
    return {
      card,
      position: spread.positions[i] || `Position ${i + 1}`,
      reversed,
      interpretation: getInterpretation(card, spread.positions[i] || "", reversed),
    };
  });

  return {
    spread,
    cards: reading,
    overallMessage: getOverallMessage(reading),
  };
}
