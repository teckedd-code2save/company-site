import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom does not implement these browser APIs. The sr/ components guard their
// animation/media paths with them; these stubs keep render tests deterministic
// (observers never fire, media never "plays", matchMedia always reports the
// non-reduced-motion default).
if (typeof window.matchMedia !== "function") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}

class IntersectionObserverStub {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds: ReadonlyArray<number> = [];

  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = () => [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverStub,
});

class ResizeObserverStub {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: ResizeObserverStub,
});

// jsdom does not implement media playback. ProductsPage renders <video>
// slots whose effect calls play()/pause() on mount; without a mock, play()
// returns undefined and the `.catch()` chain throws.
Object.defineProperty(HTMLMediaElement.prototype, "play", {
  configurable: true,
  value: vi.fn().mockResolvedValue(undefined),
});
Object.defineProperty(HTMLMediaElement.prototype, "pause", {
  configurable: true,
  value: vi.fn(),
});
