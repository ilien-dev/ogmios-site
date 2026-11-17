import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ogmios.ilien.dev",
  output: "static",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  build: { inlineStylesheets: "always" },
  vite: {
    plugins: [tailwindcss()],
  },
});
