import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

// Smoke test for the lightweight pathname router in App.tsx: "/" mounts the
// Home page, "/products" mounts the ProductsPage. Both are static content —
// no network calls, no timers (jsdom stubs in vitest.setup.ts keep the
// observer-driven Autopilot section inert and deterministic).
describe("App", () => {
  it("renders the home page with brand, navigation, hero, and footer", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Serendepify home" })).toBeInTheDocument();
    // Both the nav CTA and the hero CTA link out to GroundControl; their
    // accessible name includes the ↗ glyph, so match with a regex.
    expect(screen.getAllByRole("link", { name: /Open GroundControl/ })).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Autopilot" })).toBeInTheDocument();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Software that keeps your software running.",
    );

    expect(screen.getByText(/© 2026 Serendepify · Accra, Ghana/)).toBeInTheDocument();
  });

  it("renders the products page at /products", () => {
    window.history.pushState({}, "", "/products");
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent(/One company thesis\.\s*GroundControl at the centre\./);

    // Product index cards are driven by PRODUCT_MEDIA + product list.
    expect(screen.getByRole("heading", { level: 2, name: "GroundControl" })).toBeInTheDocument();
  });
});
