import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React configuration. No extra plugins needed —
// all effects are hand-rolled with CSS + the Canvas API.
export default defineConfig({
  plugins: [react()],
});
