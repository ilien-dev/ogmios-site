// Starts each stage of the page: the real interface of Ogmios (public/demo, built from
// the app by `bun run demo:build`) inside its frame, played by a scene. The visitor only
// watches: the frame takes no pointer and no focus.

import demoInfo from "../../public/demo/version.json";
import { Actor, Lost, type Labels } from "./actor";
import { SCENES } from "./scenes";

// The fingerprint of the build (scripts/build-demo.ts): a browser that kept an older demo
// in its cache asks for the new one instead of reusing it.
const BUILD = (demoInfo as { build?: string }).build ?? "";
/** How many times in a row a scene may lose its way before the stage gives up. */
const TRIES = 3;

const labels = new Map<string, Promise<Labels>>();
function labelsFor(lang: string): Promise<Labels> {
  let found = labels.get(lang);
  if (!found) {
    found = fetch(`/demo/labels.${lang}.json?v=${BUILD}`).then((answer) => answer.json() as Promise<Labels>);
    labels.set(lang, found);
  }
  return found;
}

function themeNow(): string {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

/** The window of the app is drawn at its real size and scaled as a whole to fit. */
function fit(view: HTMLElement): void {
  const apply = () => {
    const width = Number(getComputedStyle(view).getPropertyValue("--w")) || 1180;
    view.style.setProperty("--s", String(view.clientWidth / width));
  };
  new ResizeObserver(apply).observe(view);
  apply();
}

/** Resolves while the stage is on screen and the tab is the one being looked at. */
function watcher(stage: HTMLElement): () => Promise<void> {
  let onScreen = false;
  let waiting: (() => void)[] = [];
  const release = () => {
    if (!onScreen || document.hidden) return;
    waiting.forEach((resolve) => resolve());
    waiting = [];
  };
  new IntersectionObserver(
    (entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      release();
    },
    { threshold: 0.15 },
  ).observe(stage);
  document.addEventListener("visibilitychange", release);
  return () =>
    new Promise<void>((resolve) => {
      if (onScreen && !document.hidden) resolve();
      else waiting.push(resolve);
    });
}

function load(frame: HTMLIFrameElement, lang: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Lost("the demo did not load")), 20000);
    frame.addEventListener(
      "load",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
    frame.src = `/demo/?mock=ready&ui=${lang}&theme=${themeNow()}&v=${BUILD}`;
  });
}

async function play(stage: HTMLElement, view: HTMLElement, frame: HTMLIFrameElement, pointer: HTMLElement): Promise<void> {
  const scene = SCENES[stage.dataset.scene ?? ""];
  const lang = stage.dataset.lang === "es" ? "es" : "en";
  if (!scene) return;
  const visible = watcher(stage);
  const words = await labelsFor(lang);
  let failures = 0;
  while (failures < TRIES) {
    try {
      await visible();
      delete stage.dataset.ready;
      await load(frame, lang);
      const actor = new Actor(frame, pointer, words, visible);
      // The rail of the app is there once it has opened.
      await actor.find("nav button, aside button", () => true, 15000);
      stage.dataset.ready = "";
      await scene(actor);
      failures = 0;
    } catch (error) {
      if (error instanceof Lost) console.debug("Ogmios demo:", stage.dataset.scene, error.message);
      else console.error("Ogmios demo:", error);
      failures += 1;
    }
    delete pointer.dataset.on;
  }
  // The scene could not be played: the window keeps the last thing it showed.
  stage.dataset.ready = "";
  void view;
}

function init(): void {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  for (const stage of document.querySelectorAll<HTMLElement>("[data-stage]")) {
    const view = stage.querySelector<HTMLElement>("[data-view]");
    const frame = stage.querySelector<HTMLIFrameElement>("iframe");
    const pointer = stage.querySelector<HTMLElement>("[data-pointer]");
    const button = stage.querySelector<HTMLButtonElement>("[data-play]");
    const loading = stage.querySelector<HTMLElement>("[data-loading]");
    if (!view || !frame || !pointer) continue;
    fit(view);
    const start = () => void play(stage, view, frame, pointer);

    // Who asked for less motion starts the demo themselves.
    if (reduced && button) {
      button.hidden = false;
      if (loading) loading.hidden = true;
      button.addEventListener(
        "click",
        () => {
          button.hidden = true;
          if (loading) loading.hidden = false;
          start();
        },
        { once: true },
      );
      continue;
    }

    // The app is loaded when its window is about to be seen, and never before the page
    // itself has finished loading.
    const seen = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        seen.disconnect();
        start();
      },
      { rootMargin: "300px" },
    );
    seen.observe(stage);
  }

  // The theme of the page is the theme of every window on it.
  new MutationObserver(() => {
    for (const frame of document.querySelectorAll<HTMLIFrameElement>("[data-stage] iframe")) {
      const root = frame.contentDocument?.documentElement;
      if (root) root.dataset.theme = themeNow();
    }
  }).observe(document.documentElement, { attributeFilter: ["data-theme"] });
}

// The demo never competes with the page itself: it starts at the visitor's first move
// (a pointer, a key, a scroll or a touch), or a few seconds after the page has loaded for
// who only looks.
const FIRST_MOVE = ["pointermove", "pointerdown", "keydown", "scroll", "touchstart"];
let started = false;
function begin(): void {
  if (started) return;
  started = true;
  FIRST_MOVE.forEach((type) => removeEventListener(type, begin));
  init();
}
FIRST_MOVE.forEach((type) => addEventListener(type, begin, { passive: true }));
const later = () => setTimeout(begin, 6000);
if (document.readyState === "complete") later();
else addEventListener("load", later, { once: true });
