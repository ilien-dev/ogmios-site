// The entry of the demo build: the real interface of Ogmios on its in-memory backend
// (`src/lib/ipcMock.ts`), started with a learner who already has a book. The page that
// frames it says which language and theme to show, in the query string.
import { mock, readyProfile } from "@/lib/ipcMock";

const query = new URLSearchParams(location.search);
const ui = query.get("ui") === "es" ? "es" : "en";
const theme = query.get("theme") === "dark" ? "dark" : "light";

// Framed in the page, the app is only watched: it never takes the focus, which would pull
// the keyboard and the scroll of the page into the demo.
if (window.top !== window) {
  HTMLElement.prototype.focus = () => {};
  // The same for scrolling: asked to bring something into view, the browser would also
  // scroll the page that frames the app. Here only the app's own panes move.
  Element.prototype.scrollIntoView = function scrollInsideTheApp(this: Element, arg?: boolean | ScrollIntoViewOptions): void {
    let pane = this.parentElement;
    while (pane && !(pane.scrollHeight > pane.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(pane).overflowY))) {
      pane = pane.parentElement;
    }
    if (!pane) return;
    const options = typeof arg === "object" ? arg : {};
    const block = options.block ?? (arg === false ? "end" : "start");
    const box = this.getBoundingClientRect();
    const view = pane.getBoundingClientRect();
    let top = box.top - view.top;
    if (block === "end") top = box.bottom - view.bottom;
    else if (block === "center") top = box.top + box.height / 2 - (view.top + view.height / 2);
    else if (block === "nearest") top = box.top < view.top ? box.top - view.top : Math.max(0, box.bottom - view.bottom);
    pane.scrollBy({ top, ...(options.behavior ? { behavior: options.behavior } : {}) });
  };
}

try {
  localStorage.setItem("ogmios.theme", theme);
} catch {
  // Without storage the app follows the system, and the page sets the theme itself.
}
await mock("save_profile", { profile: { ...readyProfile(), uiLang: ui } });
await import("@/main");
document.documentElement.dataset.theme = theme;
