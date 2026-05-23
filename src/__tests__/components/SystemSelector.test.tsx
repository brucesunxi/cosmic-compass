/**
 * SystemSelector Component Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SystemSelector } from "@/components/SystemSelector";

// Mock next/navigation Link
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock lucide-react
jest.mock("lucide-react", () => ({
  Sun: () => <div data-testid="icon-sun" />,
  Star: () => <div data-testid="icon-star" />,
  Moon: () => <div data-testid="icon-moon" />,
  Diamond: () => <div data-testid="icon-diamond" />,
  Sparkles: () => <div data-testid="icon-sparkles" />,
}));

describe("SystemSelector", () => {
  const expectedSystems = [
    "Western Astrology",
    "Chinese BaZi",
    "Vedic Astrology",
    "Tarot",
  ];

  it("renders all four fortune systems", () => {
    render(<SystemSelector />);
    expectedSystems.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("renders descriptions for each system", () => {
    render(<SystemSelector />);
    expect(screen.getByText(/Sun signs, planets/)).toBeInTheDocument();
    expect(screen.getByText(/Four Pillars/)).toBeInTheDocument();
    expect(screen.getByText(/Ancient Indian/)).toBeInTheDocument();
    expect(screen.getByText(/AI-powered card spreads/)).toBeInTheDocument();
  });

  it("renders correct number of system links", () => {
    const { container } = render(<SystemSelector />);
    const links = container.querySelectorAll("a");
    expect(links.length).toBe(4);
  });

  it("each system has a call-to-action", () => {
    render(<SystemSelector />);
    const ctaButtons = screen.getAllByText("Try now");
    expect(ctaButtons.length).toBe(4);
  });
});
