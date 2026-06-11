import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),
  ],
  // The proxy configuration was causing an infinite loop during local
  // development because requests to `/api/*` were being proxied back to
  // the same dev server.  Vercel dev already serves the API functions
  // under `/api`, so the proxy is unnecessary and leads to hanging
  // requests.  Removing the proxy restores the expected behaviour.
});
