/**
 * AI Tarot Engine — TDD Tests
 */
import { drawTarotReading, SPREADS } from "@/lib/astrology/tarot";

describe("AI Tarot Engine", () => {
  describe("SPREADS", () => {
    it("has 4 predefined spreads", () => {
      expect(SPREADS.length).toBe(4);
    });

    it("each spread has required fields", () => {
      SPREADS.forEach((spread) => {
        expect(spread.name).toBeTruthy();
        expect(spread.description).toBeTruthy();
        expect(spread.positions.length).toBeGreaterThan(0);
        expect(spread.cardCount).toBeGreaterThan(0);
        expect(spread.positions.length).toBe(spread.cardCount);
      });
    });
  });

  describe("drawTarotReading", () => {
    it("returns correct number of cards for each spread", () => {
      SPREADS.forEach((spread) => {
        const reading = drawTarotReading(spread.name);
        expect(reading.cards.length).toBe(spread.cardCount);
      });
    });

    it("each card has required fields", () => {
      const reading = drawTarotReading("Three Card Spread");
      reading.cards.forEach((c) => {
        expect(c.card.name).toBeTruthy();
        expect(c.card.arcana).toBeDefined();
        expect(c.position).toBeTruthy();
        expect(typeof c.reversed).toBe("boolean");
        expect(c.interpretation).toBeTruthy();
      });
    });

    it("drawing is random (two draws are likely different)", () => {
      // Draw multiple readings and expect at least some variation
      const readings = Array.from({ length: 10 }, () => drawTarotReading("Three Card Spread"));
      const firstCards = readings[0].cards.map((c) => c.card.id).join(",");
      const allSame = readings.every(
        (r) => r.cards.map((c) => c.card.id).join(",") === firstCards
      );
      // Over 10 draws, the chance of all being identical is astronomically low
      expect(allSame).toBe(false);
    });

    it("defaults to first spread (Three Card) when unknown spread requested", () => {
      const reading = drawTarotReading("NonExistentSpread");
      expect(reading.spread.name).toBe(SPREADS[0].name);
      expect(reading.cards.length).toBe(3);
    });

    it("position values match the spread's positions", () => {
      const spread = SPREADS[0]; // Three Card: Past, Present, Future
      const reading = drawTarotReading(spread.name);
      reading.cards.forEach((c, i) => {
        expect(spread.positions).toContain(c.position);
      });
    });

    it("returns overall message", () => {
      const reading = drawTarotReading("Celtic Cross");
      expect(reading.overallMessage).toBeTruthy();
      expect(reading.overallMessage.length).toBeGreaterThan(20);
    });

    it("all cards are unique within a single reading (no duplicates)", () => {
      const reading = drawTarotReading("Celtic Cross");
      const cardIds = reading.cards.map((c) => c.card.id);
      const uniqueIds = new Set(cardIds);
      expect(uniqueIds.size).toBe(cardIds.length);
    });
  });
});
