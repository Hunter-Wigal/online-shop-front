import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { analyzer } from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), analyzer()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  // root: 'src',
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});
