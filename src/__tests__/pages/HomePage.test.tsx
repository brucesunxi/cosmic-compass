/**
 * Home Page Integration Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("HomePage", () => {
  it("renders the hero title", () => {
    render(<HomePage />);
    expect(screen.getByText("Your Destiny")).toBeInTheDocument();
  });

  it("renders 'Across Cultures'", () => {
    render(<HomePage />);
    expect(screen.getByText("Across Cultures")).toBeInTheDocument();
  });

  it("renders the feature description", () => {
    render(<HomePage />);
    expect(
      screen.getByText(/One question, four answers/)
    ).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<HomePage />);
    expect(screen.getByText("Get Your Reading")).toBeInTheDocument();
    expect(screen.getByText("Talk to AI")).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<HomePage />);
    expect(screen.getByText("Multi-Cultural Wisdom")).toBeInTheDocument();
    expect(screen.getByText("AI Fortune Chat")).toBeInTheDocument();
    expect(screen.getByText("Fortune Pet")).toBeInTheDocument();
  });

  it("renders section headings", () => {
    render(<HomePage />);
    expect(screen.getByText("Live Global Fortune Map")).toBeInTheDocument();
    expect(screen.getByText("Quick Reading")).toBeInTheDocument();
    expect(screen.getByText("Today's Cosmic Pulse")).toBeInTheDocument();
  });
});
