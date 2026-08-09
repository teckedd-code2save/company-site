import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Mirrors groundcontrol/vitest.config.ts (same repo family): jsdom env,
// globals enabled, `@` alias → ./src. jest-dom matchers are registered in
// vitest.setup.ts.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
