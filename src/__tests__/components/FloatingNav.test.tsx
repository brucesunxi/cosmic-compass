/**
 * FloatingNav Component Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { FloatingNav } from "@/components/FloatingNav";

jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("FloatingNav", () => {
  it("renders all five navigation items", () => {
    render(<FloatingNav />);
    const labels = ["Home", "Reading", "Chat", "Social", "Profile"];
    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("highlights the active route", () => {
    render(<FloatingNav />);
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveClass("text-cosmic-300");
  });
});
