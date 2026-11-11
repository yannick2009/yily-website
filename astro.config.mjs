// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Set SITE_URL at build time (for example https://yily.example.com) so that
  // canonical URLs and social images resolve to absolute addresses.
  site: process.env.SITE_URL ?? undefined,
});
