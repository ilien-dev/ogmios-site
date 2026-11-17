/// <reference types="bun" />
// Builds the real interface of Ogmios for the web and puts it in public/demo.
//
// Runs from the site folder inside the app repository (the site is a submodule at
// `site/`), with the app's own Vite, plugins and sources: only the entry changes, to
// `scripts/demo-entry.tsx`. The output is committed, so the site builds without the app.
// To build from another checkout of the app, give its folder in OGMIOS_APP.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const site = resolve(import.meta.dir, "..");
const app = resolve(process.env.OGMIOS_APP ?? join(site, ".."));
const entry = join(site, "scripts", "demo-entry.tsx");
// The entry lives in the site, outside the app: the page asks for it by this name.
const ENTRY_ID = "/@ogmios-demo-entry.tsx";
const out = join(site, "public", "demo");

if (!existsSync(join(app, "src", "main.tsx")) || !existsSync(join(app, "node_modules", "vite"))) {
  console.error("The app was not found next to the site, or its packages are not installed: run `bun install` in the ogmios repository first.");
  process.exit(1);
}

const load = (path: string) => import(pathToFileURL(path).href);
const vite = await load(join(app, "node_modules", "vite", "dist", "node", "index.js"));
const appConfig = (await load(join(app, "vite.config.ts"))).default({ command: "build", mode: "production" });

process.chdir(app);
await vite.build(
  vite.mergeConfig(appConfig, {
    root: app,
    base: "/demo/",
    configFile: false,
    publicDir: false,
    logLevel: "warn",
    build: { outDir: out, emptyOutDir: true, target: "es2022", chunkSizeWarningLimit: 2000 },
    plugins: [
      {
        name: "ogmios-demo-entry",
        resolveId: (id: string) => (id === ENTRY_ID ? entry : null),
        transformIndexHtml: {
          order: "pre",
          handler: (html: string) =>
            html
              .replace("/src/main.tsx", ENTRY_ID)
              .replace("<title>", '<meta name="robots" content="noindex" />\n    <title>'),
        },
      },
    ],
  }),
);

// The PDF reader is only loaded when a learner opens a PDF, which the demo never does.
for (const file of readdirSync(join(out, "assets"))) {
  if (file.startsWith("pdf")) rmSync(join(out, "assets", file));
}

// The words of the interface, by their key: the script that plays the demo finds each
// button by the label the app gives it, in the language of the page.
function flatten(node: unknown, prefix = "", into: Record<string, string> = {}): Record<string, string> {
  if (typeof node === "string") into[prefix] = node;
  else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) flatten(value, prefix ? `${prefix}.${key}` : key, into);
  }
  return into;
}
for (const lang of ["en", "es"]) {
  const words = (await load(join(app, "src", "lib", "i18n", `${lang}.ts`)))[lang];
  writeFileSync(join(out, `labels.${lang}.json`), JSON.stringify(flatten(words)));
}

const version = (JSON.parse(readFileSync(join(app, "package.json"), "utf8")) as { version: string }).version;
// Browsers keep the page of the demo for an hour: the site asks for it with this
// fingerprint, so a new build is never served stale.
const build = createHash("sha256").update(readFileSync(join(out, "index.html"))).digest("hex").slice(0, 12);
writeFileSync(join(out, "version.json"), JSON.stringify({ version, build }) + "\n");
console.log(`Demo of Ogmios ${version} written to public/demo`);
