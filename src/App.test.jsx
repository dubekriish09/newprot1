import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "./App.jsx";

beforeEach(() => { window.location.hash = ""; window.scrollTo = () => {}; Element.prototype.scrollIntoView = () => {}; });

describe("App", () => {
  it("renders the home page with the calculator and a working estimate", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/make your roof/i);
    expect(screen.getByText("5.3 kW")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /skip to main content/i })).toBeInTheDocument();
  });

  it("shows the privacy notice on #/privacy and returns home", async () => {
    render(<App />);
    await act(async () => { window.location.hash = "#/privacy"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(screen.getByRole("heading", { name: /privacy notice/i, level: 1 })).toBeInTheDocument();
    expect(document.title).toMatch(/privacy notice/i);
    await act(async () => { window.location.hash = "#contact"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/make your roof/i);
  });

  it("contains no unfilled placeholder text", () => {
    const { container } = render(<App />);
    expect(container.textContent).not.toMatch(/YOUR-DOMAIN|before launch|starter site|demo/i);
  });
});
