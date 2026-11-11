// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Canonical production URL — powers canonical links, og:image and the sitemap.
  site: "https://yily.dev",

  integrations: [sitemap()],

  // Allow Astro to fetch and optimize remote images (GitHub contributor avatars).
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
});
