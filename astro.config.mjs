// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), svelte(), icon({ iconDir: "src/assets/icons" })],

  adapter: node({
    mode: "standalone",
  }),

  output: "server",

  server: {
    host: "0.0.0.0",
  },
});
