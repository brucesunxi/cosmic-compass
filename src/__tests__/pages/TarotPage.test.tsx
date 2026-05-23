/**
 * Tarot Reading Page Integration Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TarotPage from "@/app/reading/tarot/page";

describe("TarotPage", () => {
  it("renders the tarot page", () => {
    const { container } = render(<TarotPage />);
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toContain("AI");
    expect(h1?.textContent).toContain("Tarot");
  });

  it("renders all spread options", () => {
    render(<TarotPage />);
    expect(screen.getByText("Three Card Spread")).toBeInTheDocument();
    expect(screen.getByText("Celtic Cross")).toBeInTheDocument();
    expect(screen.getByText("Love Cross")).toBeInTheDocument();
    expect(screen.getByText("Career Path")).toBeInTheDocument();
  });

  it("defaults to Three Card Spread selected", () => {
    render(<TarotPage />);
    const threeCardBtn = screen.getByText("Three Card Spread");
    expect(threeCardBtn.className).toContain("cosmic");
  });

  it("has a draw cards button", () => {
    render(<TarotPage />);
    expect(screen.getByText("Draw the Cards")).toBeInTheDocument();
  });
});
