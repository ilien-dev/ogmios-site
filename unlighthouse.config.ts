// Unlighthouse scans every page of the site with Lighthouse and gathers the results in one
// report: `bun run audit` for the deployed site, `bun run audit http://localhost:4444` for
// a local build (scripts/serve.ts). Chrome is found by itself, or given in CHROME_PATH.
import { defineUnlighthouseConfig } from "unlighthouse/config";

export default defineUnlighthouseConfig({
  site: "https://ogmios.ilien.dev",
  // The demo is the built app, kept out of search engines: it is not a page of the site.
  scanner: { exclude: ["/demo/*"], samples: 3, device: "mobile", throttle: true, sitemap: true, ignoreI18nPages: false },
  // What an antivirus injects into every page of the machine that runs the scan is not the
  // site: without this, its scripts are measured as ours.
  lighthouseOptions: { blockedUrlPatterns: ["*kaspersky-labs.com*"] },
  puppeteerOptions: process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  ci: { budget: { performance: 90, accessibility: 100, "best-practices": 95, seo: 100 }, buildStatic: false },
  outputPath: ".lighthouse/unlighthouse",
});
