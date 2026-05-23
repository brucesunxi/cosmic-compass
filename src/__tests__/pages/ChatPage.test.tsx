/**
 * Chat Page Integration Tests
 */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ChatPage from "@/app/chat/page";

// Mock scrollIntoView for jsdom
Element.prototype.scrollIntoView = jest.fn();

describe("ChatPage", () => {
  it("renders the chat page", () => {
    const { container } = render(<ChatPage />);
    // Title is split across elements, check the h1 exists
    const h1 = container.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toContain("Talk to the");
    expect(h1?.textContent).toContain("Universe");
  });

  it("renders all four character options", () => {
    render(<ChatPage />);
    expect(screen.getByText("Greek Oracle")).toBeInTheDocument();
    expect(screen.getByText("Daoist Sage")).toBeInTheDocument();
    expect(screen.getByText("Vedic Rishi")).toBeInTheDocument();
    expect(screen.getByText("Cosmic AI")).toBeInTheDocument();
  });

  it("shows a welcome message from the selected character", () => {
    render(<ChatPage />);
    // Welcome message text appears in the chat area (check by partial text)
    const messages = screen.getAllByText(/Ancient Prophet of Delphi/);
    expect(messages.length).toBeGreaterThanOrEqual(1);
  });

  it("has an input field and send button", () => {
    render(<ChatPage />);
    const input = screen.getByPlaceholderText(/Ask the Greek Oracle/);
    expect(input).toBeInTheDocument();
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("user can type a question", async () => {
    const user = userEvent.setup();
    render(<ChatPage />);

    const input = screen.getByPlaceholderText(/Ask the Greek Oracle/);
    await user.type(input, "What about my love life?");
    expect(input).toHaveValue("What about my love life?");
  });
});
