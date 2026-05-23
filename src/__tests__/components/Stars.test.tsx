/**
 * Stars Background Component Tests
 */
import "@testing-library/jest-dom";
import { render, act } from "@testing-library/react";
import { Stars } from "@/components/Stars";

describe("Stars", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders star elements after mount", () => {
    const { container } = render(<Stars />);

    // Wait for useEffect to run
    act(() => {
      jest.advanceTimersByTime(100);
    });

    const stars = container.querySelectorAll(".animate-twinkle");
    expect(stars.length).toBe(80);
  });

  it("stars have inline styles set after mount", () => {
    const { container } = render(<Stars />);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    const firstStar = container.querySelector(".animate-twinkle");
    expect(firstStar).toBeInTheDocument();
    expect(firstStar).toHaveAttribute("style");
  });
});
