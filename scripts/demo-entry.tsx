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
}

try {
  localStorage.setItem("ogmios.theme", theme);
} catch {
  // Without storage the app follows the system, and the page sets the theme itself.
}
await mock("save_profile", { profile: { ...readyProfile(), uiLang: ui } });
await import("@/main");
document.documentElement.dataset.theme = theme;
