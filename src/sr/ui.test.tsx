import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { LogoMark, Wordmark } from "./ui";

describe("brand primitives", () => {
  it("renders the wordmark with the coral period", () => {
    render(<Wordmark />);
    // The coral period is its own nested span; match the direct text node,
    // then assert the full text content including the period.
    const wordmark = screen.getByText("serendepify");
    expect(wordmark).toHaveTextContent("serendepify.");
  });

  it("renders the logo mark as an accessible-hidden SVG at the requested size", () => {
    render(<LogoMark size={32} />);

    const svg = document.querySelector("svg[aria-hidden='true']");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });
});
