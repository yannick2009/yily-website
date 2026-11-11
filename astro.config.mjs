// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://yily.dev",

  integrations: [sitemap()],

  // Allow Astro to fetch and optimize remote images (GitHub contributor avatars).
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
});
