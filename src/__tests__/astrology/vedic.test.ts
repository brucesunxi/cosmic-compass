/**
 * Vedic Astrology Engine — TDD Tests
 */
import { calculateVedicChart } from "@/lib/astrology/vedic";

describe("Vedic Astrology Engine", () => {
  describe("calculateVedicChart", () => {
    it("returns lagna (ascendant)", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.lagna).toBeTruthy();
      expect(chart.lagnaLord).toBeTruthy();
    });

    it("returns 7 grahas (planets)", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.grahas).toHaveLength(7);
    });

    it("each graha has required fields", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      chart.grahas.forEach((g) => {
        expect(g.name).toBeTruthy();
        expect(g.rashi).toBeTruthy();
        expect(g.nakshatra).toBeTruthy();
        expect(g.pada).toBeGreaterThanOrEqual(1);
        expect(g.pada).toBeLessThanOrEqual(4);
        expect(typeof g.isRetrograde).toBe("boolean");
        expect(typeof g.isBenefic).toBe("boolean");
        expect(g.house).toBeGreaterThanOrEqual(1);
        expect(g.house).toBeLessThanOrEqual(12);
      });
    });

    it("returns 12 houses", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.houses).toHaveLength(12);
    });

    it("houses increment from lagna", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.houses[0].number).toBe(1);
      expect(chart.houses[11].number).toBe(12);
    });

    it("returns dasha periods", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.dashas.length).toBe(9);
      chart.dashas.forEach((d) => {
        expect(d.planet).toBeTruthy();
        expect(d.period).toBeTruthy();
        expect(typeof d.startAge).toBe("number");
      });
    });

    it("returns summary with all sections", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      expect(chart.summary.personality).toBeTruthy();
      expect(chart.summary.strengths.length).toBeGreaterThan(0);
      expect(chart.summary.challenges.length).toBeGreaterThan(0);
      expect(chart.summary.careerPath).toBeTruthy();
      expect(chart.summary.relationships).toBeTruthy();
      expect(chart.summary.spiritual).toBeTruthy();
      expect(chart.summary.remedy).toBeTruthy();
    });

    it("produces consistent results for same input", () => {
      const chart1 = calculateVedicChart(2000, 1, 1, 0, 0);
      const chart2 = calculateVedicChart(2000, 1, 1, 0, 0);
      expect(chart1.lagna).toBe(chart2.lagna);
      expect(chart1.grahas[0].rashi).toBe(chart2.grahas[0].rashi);
    });

    it("graha names are correct", () => {
      const chart = calculateVedicChart(1995, 6, 15, 12, 0);
      const expectedNames = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
      chart.grahas.forEach((g, i) => {
        expect(g.name).toBe(expectedNames[i]);
      });
    });
  });
});
