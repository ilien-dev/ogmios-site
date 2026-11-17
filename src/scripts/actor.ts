// The hand that plays a demo: it finds a control of the real app inside its frame, moves
// the drawn pointer to it and acts on it the way a person would, one step at a time.

export type Labels = Record<string, string>;

/** Raised when a step cannot find what it needs: the scene starts over. */
export class Lost extends Error {}

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export class Actor {
  private x = 0.5;
  private y = 0.6;

  constructor(
    private readonly frame: HTMLIFrameElement,
    private readonly pointer: HTMLElement,
    readonly labels: Labels,
    /** Resolves while the stage can be seen; a hidden demo does not play. */
    private readonly visible: () => Promise<void>,
  ) {}

  get doc(): Document {
    const doc = this.frame.contentDocument;
    if (!doc) throw new Lost("the frame is gone");
    return doc;
  }

  /** The label of the app for a key of its dictionary, with its placeholders filled. */
  t(key: string, values: Record<string, string | number> = {}): string {
    const text = this.labels[key];
    if (text === undefined) throw new Lost(`no label ${key}`);
    return text.replace(/\{\{(\w+)\}\}/g, (_, name: string) => String(values[name] ?? ""));
  }

  async pause(ms: number): Promise<void> {
    await this.visible();
    await wait(ms);
  }

  private shown(el: Element): boolean {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  /** The first element the selector finds that passes the test, once it is on screen. */
  async find<T extends HTMLElement = HTMLElement>(
    selector: string,
    test: (el: T) => boolean = () => true,
    timeout = 9000,
  ): Promise<T> {
    const until = Date.now() + timeout;
    for (;;) {
      await this.visible();
      const found = [...this.doc.querySelectorAll<T>(selector)].find((el) => this.shown(el) && test(el));
      if (found) return found;
      if (Date.now() > until) throw new Lost(`not found: ${selector}`);
      await wait(120);
    }
  }

  /** A button or link by the words on it or by its accessible name. */
  button(label: string, exact = true): Promise<HTMLElement> {
    const match = (text: string | null) => {
      const value = (text ?? "").trim();
      return exact ? value === label : value.startsWith(label);
    };
    return this.find("button, a, [role=button]", (el) => match(el.getAttribute("aria-label")) || match(el.textContent));
  }

  /** Waits until some text is on the page of the app. */
  async sees(text: string, timeout = 12000): Promise<void> {
    const until = Date.now() + timeout;
    while (!(this.doc.body.textContent ?? "").includes(text)) {
      if (Date.now() > until) throw new Lost(`never saw: ${text}`);
      await this.pause(150);
    }
  }

  /** Brings an element into the window of the app without moving the page around it. */
  private async reveal(el: HTMLElement): Promise<void> {
    const view = this.doc.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    if (rect.top >= 60 && rect.bottom <= view - 40) return;
    let parent = el.parentElement;
    while (parent && parent.scrollHeight <= parent.clientHeight + 1) parent = parent.parentElement;
    if (!parent) return;
    parent.scrollBy({ top: rect.top + rect.height / 2 - view / 2, behavior: "smooth" });
    await wait(650);
  }

  /** Moves the pointer over an element, at the pace of a hand. */
  async point(el: HTMLElement): Promise<void> {
    await this.visible();
    await this.reveal(el);
    const rect = el.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / this.doc.documentElement.clientWidth;
    const y = (rect.top + rect.height / 2) / this.doc.documentElement.clientHeight;
    const time = Math.round(380 + Math.hypot(x - this.x, y - this.y) * 900);
    this.x = x;
    this.y = y;
    this.pointer.style.transitionDuration = `${time}ms`;
    this.pointer.style.left = `${x * 100}%`;
    this.pointer.style.top = `${y * 100}%`;
    this.pointer.dataset.on = "";
    await wait(time + 140);
  }

  async click(el: HTMLElement): Promise<void> {
    await this.point(el);
    this.pointer.dataset.down = "";
    await wait(130);
    el.click();
    delete this.pointer.dataset.down;
    await wait(260);
  }

  async press(label: string, exact = true): Promise<void> {
    await this.click(await this.button(label, exact));
  }

  /** Writes into a field letter by letter, through the setter React listens to. */
  async type(el: HTMLInputElement | HTMLTextAreaElement, text: string, perLetter = 42, replace = false): Promise<void> {
    await this.click(el);
    const view = this.doc.defaultView;
    if (!view) throw new Lost("the frame is gone");
    const proto = el.tagName === "TEXTAREA" ? view.HTMLTextAreaElement.prototype : view.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (!setter) throw new Lost("no setter");
    // What the field already holds stays, unless the hand is to write over it.
    const before = replace ? "" : el.value;
    for (let i = 1; i <= text.length; i += 1) {
      await this.visible();
      setter.call(el, before + text.slice(0, i));
      el.dispatchEvent(new view.Event("input", { bubbles: true }));
      await wait(perLetter + (text[i - 1] === " " ? 30 : 0));
    }
    await wait(350);
  }

  /** Takes the pointer away, as when the hand rests. */
  rest(): void {
    delete this.pointer.dataset.on;
  }
}
