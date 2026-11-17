// The motion of the page itself: blocks that come in and leave as they are scrolled past,
// the theme switch, the ring that follows the pointer, and the pattern that changes state.

/** A block waits below, comes in when it is seen, and goes up when it is left behind. */
function reveals(): void {
  const blocks = document.querySelectorAll<HTMLElement>("[data-rv]");
  if (!("IntersectionObserver" in window)) {
    blocks.forEach((block) => block.setAttribute("data-in", ""));
    return;
  }
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const block = entry.target;
        if (entry.isIntersecting) {
          block.setAttribute("data-in", "");
          block.removeAttribute("data-out");
        } else {
          block.removeAttribute("data-in");
          block.toggleAttribute("data-out", entry.boundingClientRect.top < 0);
        }
      }
    },
    { threshold: 0.06 },
  );
  blocks.forEach((block) => seen.observe(block));
}

function theme(): void {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  if (!button) return;
  const sync = () => button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
  sync();
  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("ogmios.site.theme", next);
    } catch {
      // Without storage the choice lasts for this visit.
    }
    sync();
  });
  // Until the visitor chooses, the page follows the system.
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
    let chosen: string | null = null;
    try {
      chosen = localStorage.getItem("ogmios.site.theme");
    } catch {
      chosen = null;
    }
    if (chosen) return;
    root.dataset.theme = event.matches ? "dark" : "light";
    sync();
  });
}

/** A ring follows a real pointer and says what is under it: something to press, to type
    in, or to read more about. Touch screens and reduced motion go without it. */
function cursor(): void {
  const ring = document.querySelector<HTMLElement>("[data-cursor]");
  if (!ring || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let x = 0;
  let y = 0;
  let queued = false;
  addEventListener(
    "pointermove",
    (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      const target = event.target instanceof Element ? event.target.closest("a, button, summary, input, [data-help]") : null;
      ring.dataset.kind = !target ? "" : target.matches("input") ? "text" : target.matches("[data-help]") ? "help" : "act";
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        ring.classList.remove("hidden");
        ring.style.transform = `translate(${x}px, ${y}px)`;
      });
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => ring.classList.add("hidden"));
}

/** The pattern of the memory block moves through its states, and relapses once. */
function memory(): void {
  const block = document.querySelector<HTMLElement>("[data-memory]");
  if (!block || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let step = 0;
  setInterval(() => {
    if (document.hidden) return;
    step = (step + 1) % 5;
    block.dataset.step = String(step);
  }, 2800);
}

/** A command of the install block is copied with one press. */
function copy(): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? "");
        button.dataset.done = "";
        setTimeout(() => delete button.dataset.done, 1800);
      } catch {
        // The command stays on screen to be selected by hand.
      }
    });
  }
}

reveals();
theme();
cursor();
memory();
copy();
