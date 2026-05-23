/**
 * BirthChartForm Component Tests
 */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BirthChartForm } from "@/components/BirthChartForm";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("BirthChartForm", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders all input fields", () => {
    render(<BirthChartForm />);
    expect(screen.getByPlaceholderText("1995")).toBeInTheDocument();
    expect(screen.getByText("Month")).toBeInTheDocument();
    expect(screen.getByText("Day")).toBeInTheDocument();
    expect(screen.getByText("Hour (24h)")).toBeInTheDocument();
    expect(screen.getByText("Minute")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<BirthChartForm />);
    expect(screen.getByText("Reveal My Fortune")).toBeInTheDocument();
  });

  it("has system select with all options", () => {
    render(<BirthChartForm />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("All Systems 🔄")).toBeInTheDocument();
    expect(screen.getByText("Western")).toBeInTheDocument();
    expect(screen.getByText("Chinese BaZi")).toBeInTheDocument();
    expect(screen.getByText("Vedic")).toBeInTheDocument();
  });

  it("navigates to compare page with default values on submit", async () => {
    const user = userEvent.setup();
    render(<BirthChartForm />);
    const button = screen.getByText("Reveal My Fortune");
    await user.click(button);
    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("/reading/compare?year=1995&month=6&day=15&hour=12&min=0")
    );
  });

  it("navigates to specific system page when a system is selected", async () => {
    const user = userEvent.setup();
    render(<BirthChartForm />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "western" } });

    const button = screen.getByText("Reveal My Fortune");
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining("/reading/western?")
    );
  });
});
