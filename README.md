# Yily website

Landing page for [Yily](https://github.com/yannick2009/yily), a lightweight,
self-hosted secret manager. The site is English-first; translations can be added
later.

## Stack

- [Astro](https://astro.build): static site, no client framework
- Self-hosted Inter, Instrument Serif and IBM Plex Mono (no third-party font
  requests)
- Hand-written CSS + SVG animations, no animation library

## Development

```bash
nix develop          # Node.js and project tooling
npm install
npm run dev          # http://localhost:4321
```

The agent workflow uses the background dev server:

```bash
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

## Build

```bash
npm run build        # static output in dist/
npm run preview
```

The canonical URL is defined by `site` in [`astro.config.mjs`](astro.config.mjs).
Canonical links, Open Graph URLs and the sitemap are derived from it.

## Deployment

The production site is served by Railway (Railpack static serving). Two root files
control how the `dist/` output is served:

- `Staticfile` keeps SPA-style index fallback off, so unknown paths return a real
  404 instead of the homepage with a 200 status.
- `Caddyfile` adds long-lived caching for content-hashed assets, revalidation for
  HTML, and serves `dist/404.html` with a 404 status.

Keep both files when deploying. Removing them restores Railway's default SPA
fallback (every unknown path returns the homepage with a 200 status).

## Structure

```text
src/
├── components/      # one component per page section + shared icons
├── layouts/         # document head, fonts, metadata
├── pages/           # index page and client-side interactions
└── styles/          # design tokens, base styles, shared utilities
public/
├── fonts/           # self-hosted woff2 files
├── logo.svg         # full wordmark
├── favicon.ico      # multi-resolution transparent logo icon
├── favicon.svg      # transparent full-logo SVG icon
├── favicon-32.png   # small PNG fallback
├── apple-touch-icon.png
└── og.png           # 1200×630 social image
```

Design tokens, typography and shared utilities live in
[`src/styles/global.css`](src/styles/global.css). Content for each section lives
in its component under [`src/components/`](src/components).

## Notes

- SDK code snippets are API design previews. The REST endpoint and CLI are
  available today.
- The hero recreates the real Yily Variables screen with demo data; the eye
  controls reveal values with the same 20-second countdown.
- UI icons use Heroicons v2 outline, the same source as the Yily client. Brand
  logos (GitHub, Go, Rust, Java, JavaScript, Python) remain their official marks.
- The retrieval diagram and hero demo respect `prefers-reduced-motion`.
- The production build is fully static. No runtime API calls are made by the
  site.
- Bundled fonts are OFL-licensed; see
  [`public/fonts/OFL.txt`](public/fonts/OFL.txt). Language logos come from
  [Simple Icons](https://simpleicons.org) (CC0).
