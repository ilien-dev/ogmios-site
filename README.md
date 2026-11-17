# Ogmios site

The product page of [Ogmios](https://github.com/ilien-dev/ogmios): Astro, Tailwind and
TypeScript, built with Bun. English at `/`, Spanish at `/es/`. Light and dark follow the
system until the visitor picks one.

The windows on the page are the app itself: the real interface of Ogmios, built for the
web on its in-memory backend (`src/lib/ipcMock.ts` in the app) and played by a script
that moves a drawn pointer over it (`src/scripts/scenes.ts`). Nothing in them is a
mock-up, and the visitor only watches.

## Work on it

This repository is a submodule of the app repository, at `site/`. Work from there, so
the demo can be rebuilt from the app's sources.

```sh
bun install
bun run dev          # http://localhost:4321 (the demos need `bun run build && bun run preview`)
bun run check        # types
bun run build        # static site in dist/
```

## Update the demo

After a change to the app's interface, with the app's packages installed
(`bun install` in the app repository):

```sh
bun run demo:build
```

It builds the app with its own Vite and plugins, with `scripts/demo-entry.tsx` as the
entry, and writes `public/demo/` (with `version.json` and the app's labels in both
languages, which the scenes use to find each button). Commit that folder: the host
builds the site without the app. `OGMIOS_APP=<folder>` builds from another checkout.

If the interface changed under a scene, the scene stops finding a control and starts
over; after three tries the window stays on its last screen. Play the page after every
`demo:build` and fix the scene in `src/scripts/scenes.ts`.

## Lighthouse

```sh
bun run build
bun run scripts/serve.ts        # dist/ compressed, as the host serves it, on :4444
bun run lighthouse              # both pages, phone and desktop
```

Reports go to `.lighthouse/`. If Chrome is not installed where Lighthouse looks, give
its path in `CHROME_PATH`.

## The picture for shared links

`public/og-en.png` and `public/og-es.png` are captures of `scripts/og.html` (add
`?lang=es` for Spanish) at 1200×630. The window in them is a real capture of the app.

## Deploy

Cloudflare Workers static assets (`wrangler.jsonc`), at `ogmios.ilien.dev`.

## Licence

AGPL-3.0-only, like the app. See `LICENSE`. Claude is a trademark of Anthropic; its mark
(from Simple Icons, CC0) is used only to say what the app connects to.
