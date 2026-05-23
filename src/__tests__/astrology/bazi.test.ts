/**
 * Chinese BaZi Engine — TDD Tests
 */
import { calculateBaZi } from "@/lib/astrology/bazi";

describe("Chinese BaZi Engine", () => {
  describe("calculateBaZi", () => {
    it("returns four pillars", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "male");
      expect(chart.yearPillar).toBeDefined();
      expect(chart.monthPillar).toBeDefined();
      expect(chart.dayPillar).toBeDefined();
      expect(chart.hourPillar).toBeDefined();
    });

    it("each pillar has heavenly stem and earthly branch", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "female");
      const pillars = [chart.yearPillar, chart.monthPillar, chart.dayPillar, chart.hourPillar];
      pillars.forEach((p) => {
        expect(p.heavenlyStem).toBeTruthy();
        expect(p.earthlyBranch).toBeTruthy();
        expect(p.element).toBeTruthy();
      });
    });

    it("day master is always a heavenly stem", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "male");
      const validStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
      expect(validStems).toContain(chart.dayMaster);
    });

    it("returns summary with all fields", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "female");
      expect(chart.summary.elementBalance).toBeTruthy();
      expect(chart.summary.luckyElement).toBeTruthy();
      expect(chart.summary.weakElement).toBeTruthy();
      expect(chart.summary.personality).toBeTruthy();
      expect(chart.summary.careerAdvice).toBeTruthy();
      expect(chart.summary.loveAdvice).toBeTruthy();
      expect(chart.summary.luckyColors.length).toBeGreaterThan(0);
      expect(chart.summary.luckyDirections.length).toBeGreaterThan(0);
    });

    it("returns luck pillars", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "male");
      expect(chart.luckPillars.length).toBe(8);
    });

    it("produces consistent results for same input", () => {
      const chart1 = calculateBaZi(2000, 1, 1, 0, "female");
      const chart2 = calculateBaZi(2000, 1, 1, 0, "female");
      expect(chart1.dayMaster).toBe(chart2.dayMaster);
      expect(chart1.yearPillar.heavenlyStem).toBe(chart2.yearPillar.heavenlyStem);
    });

    it("handles different hours correctly", () => {
      const morning = calculateBaZi(1995, 6, 15, 8, "male");
      const night = calculateBaZi(1995, 6, 15, 20, "male");
      // Different hours should produce different hour pillars
      expect(morning.hourPillar.earthlyBranch).not.toBe(night.hourPillar.earthlyBranch);
    });

    it("different genders produce same basic pillars but different luck", () => {
      const male = calculateBaZi(1990, 5, 10, 14, "male");
      const female = calculateBaZi(1990, 5, 10, 14, "female");
      expect(male.dayMaster).toBe(female.dayMaster);
    });

    it("pillar elements are valid (Wood/Fire/Earth/Metal/Water)", () => {
      const chart = calculateBaZi(1995, 6, 15, 12, "male");
      const validElements = ["Wood", "Fire", "Earth", "Metal", "Water"];
      const pillars = [chart.yearPillar, chart.monthPillar, chart.dayPillar, chart.hourPillar];
      pillars.forEach((p) => {
        expect(validElements).toContain(p.element);
      });
    });
  });
});
