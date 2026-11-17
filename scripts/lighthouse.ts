/// <reference types="bun" />
// Runs Lighthouse over the built site (start `bun run scripts/serve.ts` first) and prints the four
// scores of each page, for a phone and for a desktop. What an antivirus injects into local
// pages is blocked, so it is the site that is measured. Reports are kept in .lighthouse/.
//
//   bun run lighthouse            # http://localhost:4444
//   CHROME_PATH=... bun run lighthouse   # when Chrome is not where Lighthouse looks

import { $ } from "bun";
import { mkdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";

const base = (process.argv[2] ?? "http://localhost:4444").replace(/\/$/, "");
const out = resolve(import.meta.dir, "..", ".lighthouse");
mkdirSync(out, { recursive: true });

let worst = 100;
for (const path of ["/", "/es/"]) {
  for (const form of ["mobile", "desktop"]) {
    const name = `${path === "/" ? "en" : "es"}-${form}`;
    const file = join(out, `${name}.json`);
    const preset = form === "desktop" ? ["--preset=desktop"] : [];
    await $`bun x lighthouse ${base + path} ${preset} --quiet --blocked-url-patterns=${"*kaspersky-labs.com*"} --output=json --output-path=${file} --chrome-flags=${"--headless=new --no-sandbox"}`.quiet().nothrow();
    const report = JSON.parse(readFileSync(file, "utf8")) as {
      categories: Record<string, { score: number | null }>;
      audits: Record<string, { score: number | null; title: string; displayValue?: string; scoreDisplayMode: string }>;
    };
    const scores = ["performance", "accessibility", "best-practices", "seo"].map((key) => Math.round((report.categories[key]?.score ?? 0) * 100));
    worst = Math.min(worst, ...scores);
    console.log(`${name.padEnd(11)} performance ${scores[0]}  accessibility ${scores[1]}  best practices ${scores[2]}  seo ${scores[3]}`);
    for (const audit of Object.values(report.audits)) {
      if (audit.score !== null && audit.score < 0.9 && !["informative", "notApplicable", "manual"].includes(audit.scoreDisplayMode)) {
        console.log(`    ${audit.title}${audit.displayValue ? ` (${audit.displayValue})` : ""}`);
      }
    }
  }
}
process.exit(worst === 100 ? 0 : 1);
