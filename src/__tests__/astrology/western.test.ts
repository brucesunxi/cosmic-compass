/**
 * Western Astrology Engine — TDD Tests
 */
import { calculateBirthChart, getWesternHoroscope } from "@/lib/astrology/western";

describe("Western Astrology Engine", () => {
  describe("calculateBirthChart", () => {
    it("returns correct number of planets", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      expect(chart).toBeDefined();
      expect(chart.sun).toBeDefined();
      expect(chart.moon).toBeDefined();
      expect(chart.mercury).toBeDefined();
      expect(chart.venus).toBeDefined();
      expect(chart.mars).toBeDefined();
      expect(chart.jupiter).toBeDefined();
      expect(chart.saturn).toBeDefined();
    });

    it("returns 12 houses", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      expect(chart.houses).toHaveLength(12);
    });

    it("houses have correct structure", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      chart.houses.forEach((house) => {
        expect(house.number).toBeGreaterThanOrEqual(1);
        expect(house.number).toBeLessThanOrEqual(12);
        expect(house.sign).toBeTruthy();
        expect(typeof house.degree).toBe("number");
      });
    });

    it("returns ascendant and midheaven", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      expect(chart.ascendant).toBeTruthy();
      expect(chart.midheaven).toBeTruthy();
    });

    it("planets have valid degrees (0-30)", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      const planets = [chart.sun, chart.moon, chart.mercury, chart.venus,
        chart.mars, chart.jupiter, chart.saturn];
      planets.forEach((p) => {
        expect(p.degree).toBeGreaterThanOrEqual(0);
        expect(p.degree).toBeLessThan(30);
      });
    });

    it("ascendant changes with time of day", () => {
      const morning = calculateBirthChart(1995, 6, 15, 6, 0).ascendant;
      const evening = calculateBirthChart(1995, 6, 15, 18, 0).ascendant;
      // Different times should give different ascendants
      expect(morning).not.toBe(evening);
    });

    it("handles different date inputs consistently", () => {
      const chart1 = calculateBirthChart(1990, 1, 1, 0, 0);
      const chart2 = calculateBirthChart(1990, 1, 1, 0, 0);
      expect(chart1.sun.sign).toBe(chart2.sun.sign);
      expect(chart1.moon.sign).toBe(chart2.moon.sign);
    });
  });

  describe("getWesternHoroscope", () => {
    it("returns daily, love, and career readings", () => {
      const chart = calculateBirthChart(1995, 6, 15, 12, 0);
      const horoscope = getWesternHoroscope(chart);
      expect(horoscope.daily).toBeTruthy();
      expect(horoscope.love).toBeTruthy();
      expect(horoscope.career).toBeTruthy();
    });

    it("returns non-empty readings for any valid chart", () => {
      const dates = [
        [1990, 3, 21, 8, 30],
        [2000, 7, 4, 14, 15],
        [1985, 11, 11, 22, 45],
        [2005, 2, 28, 6, 0],
        [1978, 9, 1, 18, 30],
      ];
      dates.forEach(([y, m, d, h, min]) => {
        const chart = calculateBirthChart(y, m, d, h, min);
        const horoscope = getWesternHoroscope(chart);
        expect(horoscope.daily.length).toBeGreaterThan(10);
        expect(horoscope.love.length).toBeGreaterThan(10);
        expect(horoscope.career.length).toBeGreaterThan(10);
      });
    });
  });
});
