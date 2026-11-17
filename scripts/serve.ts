/// <reference types="bun" />
// Serves dist/ the way the host does: compressed, with the cache headers of
// public/_headers. Lighthouse is run against
// this (scripts/lighthouse.ts), so the scores are those of the deployed page and not of a
// development server.
//
//   bun run scripts/serve.ts [port]

import { extname, join, resolve } from "node:path";

const root = resolve(import.meta.dir, "..");
const dist = join(root, "dist");
const port = Number(process.argv[2] ?? 4444);

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};
const TEXT = new Set([".html", ".js", ".css", ".json", ".svg", ".xml", ".txt"]);

Bun.serve({
  port,
  async fetch(request) {
    const url = new URL(request.url);
    let path = decodeURIComponent(url.pathname);
    if (path.endsWith("/")) path += "index.html";
    const file = Bun.file(join(dist, path));
    if (!(await file.exists())) return new Response("Not found", { status: 404 });
    const ext = extname(path);
    const headers = new Headers({ "Content-Type": TYPES[ext] ?? "application/octet-stream" });
    const long = path.startsWith("/_astro/") || path.startsWith("/fonts/") || path.startsWith("/demo/assets/");
    headers.set("Cache-Control", long ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate");
    if (TEXT.has(ext) && (request.headers.get("accept-encoding") ?? "").includes("gzip")) {
      headers.set("Content-Encoding", "gzip");
      return new Response(Bun.gzipSync(new Uint8Array(await file.arrayBuffer())), { headers });
    }
    return new Response(file, { headers });
  },
});
console.log(`http://localhost:${port}`);
