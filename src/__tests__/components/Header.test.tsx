/**
 * Header Component Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/Header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Header", () => {
  it("renders the site name", () => {
    render(<Header />);
    expect(screen.getByText("Cosmic Compass")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Readings")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Header />);
    expect(screen.getByText("Universal Fortune Guide")).toBeInTheDocument();
  });
});
