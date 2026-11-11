// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Set SITE_URL at build time (for example https://yily.example.com) so that
  // canonical URLs and social images resolve to absolute addresses.
  site: "https://yily.dev",

  // Allow Astro to fetch and optimize remote images (GitHub contributor avatars).
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
});
