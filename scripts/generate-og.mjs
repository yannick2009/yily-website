// Generates public/og.png (1200x630) from scripts/og-card.html.
// Usage: node scripts/generate-og.mjs
// Requires: puppeteer-core, pngjs (see package.json devDependencies).

import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { PNG } from "pngjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const W = 1200;
const H = 630;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
};

// Serve scripts/og-card.html at "/", public/ assets at their public paths.
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://127.0.0.1");
    let file;
    if (url.pathname === "/" || url.pathname === "/index.html") {
      file = path.join(ROOT, "scripts", "og-card.html");
    } else {
      file = path.join(ROOT, "public", url.pathname.slice(1));
    }
    const data = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("not found");
  }
});

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const port = server.address().port;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 300));

const fonts = await page.evaluate(() => ({
  inter: document.fonts.check('16px Inter'),
  serif: document.fonts.check('italic 16px "Instrument Serif"'),
  mono: document.fonts.check('16px "IBM Plex Mono"'),
}));
console.log("fonts:", JSON.stringify(fonts));

const shot = Buffer.from(await page.screenshot({ type: "png" }));
await browser.close();
server.close();

const png = PNG.sync.read(shot);
console.log("dims:", `${png.width}x${png.height}`);

await writeFile(path.join(ROOT, "public", "og.png"), shot);
console.log("wrote public/og.png");
