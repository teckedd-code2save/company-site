import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins class names and filters falsy values", () => {
    expect(cn("a", null, undefined, false, "b")).toBe("a b");
  });

  it("merges conflicting Tailwind classes with the last one winning", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("returns an empty string when given no inputs", () => {
    expect(cn()).toBe("");
  });
});
