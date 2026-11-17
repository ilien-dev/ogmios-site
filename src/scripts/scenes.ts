// What each demo plays, step by step, on the real app. Every label comes from the app's
// own dictionary (public/demo/labels.*.json), so a scene follows the interface in the
// language of the page. A scene that loses its way throws, and the stage starts it over.

import type { Actor } from "./actor";

export type Scene = (a: Actor) => Promise<void>;

const named = (el: HTMLElement) => el.getAttribute("aria-label") ?? el.textContent ?? "";

/** A conversation: speak, ask for a word, end it, and read the feedback. */
const talk: Scene = async (a) => {
  await a.pause(900);
  await a.press(a.t("nav.groups.conversation"));
  await a.pause(1400);
  await a.press(a.t("home.continueLast"));
  await a.find("textarea");
  await a.pause(3800);

  // Speaks: the microphone writes what it hears into the box.
  await a.press(a.t("conversation.micHold"));
  await a.pause(5200);
  await a.press(a.t("conversation.micStop"));
  await a.pause(1700);
  await a.press(a.t("conversation.send"));
  await a.pause(5200);

  // Asks how to say something, in the learner's own language.
  await a.press(a.t("conversation.help"));
  const ask = await a.find<HTMLInputElement>("input", (el) => el.placeholder === a.t("conversation.helpField"));
  await a.type(ask, "estoy hasta arriba de trabajo");
  await a.press(a.t("conversation.helpAsk"));
  const option = await a.find("button", (el) => named(el).includes("on my plate"));
  await a.pause(900);
  await a.click(option);
  const box = await a.find<HTMLTextAreaElement>("textarea");
  await a.type(box, " this month, but we delivered on time.", 34);
  await a.press(a.t("conversation.send"));
  await a.pause(5200);

  // Ends the conversation: the feedback comes one card at a time.
  await a.press(a.t("conversation.end"));
  await a.sees(a.t("report.achievement.title"), 20000);
  await a.pause(3600);
  await a.press(a.t("report.next"));
  await a.sees(a.t("report.correction.fixPrompt"));
  await a.pause(1600);
  const fix = await a.find<HTMLInputElement>("main input");
  await a.type(fix, "I finished the report yesterday, so my boss was happy.", 36, true);
  await a.press(a.t("report.correction.check"));
  await a.pause(4200);
  await a.press(a.t("report.next"));
  await a.pause(3800);
  await a.press(a.t("report.next"));
  await a.pause(3800);
  a.rest();
  await a.pause(1500);
};

/** A book: the shelf, its chapters, the words of one, and a practice with its sentences. */
const book: Scene = async (a) => {
  await a.pause(900);
  await a.press(a.t("nav.entries.books"));
  await a.pause(2200);
  await a.click(await a.find("button, a", (el) => (el.textContent ?? "").includes("Lewis Carroll")));
  await a.pause(3200);

  // The chart of the book: one bar per chapter.
  await a.press(a.t("nav.entries.chapters"));
  await a.pause(2400);
  await a.click(await a.find("button", (el) => named(el).startsWith("III.")));
  await a.pause(2200);
  await a.click(await a.find("button", (el) => named(el).startsWith("I. ")));
  await a.pause(1600);
  await a.press(a.t("bookHome.study"));
  await a.pause(2600);

  // The words of the chapter; one of them the learner already knows.
  await a.click(await a.find("button", (el) => named(el) === a.t("books.chapter.know", { word: "marmalade" })));
  await a.pause(1800);
  await a.press(a.t("books.chapter.practise"));
  await a.pause(1800);
  await a.press(a.t("books.sitting.start"));

  for (const answer of ["madriguera", "caerse"]) {
    const field = await a.find<HTMLInputElement>("input", (el) => el.placeholder === a.t("books.sitting.answer"));
    await a.pause(1100);
    await a.type(field, answer, 70);
    await a.press(a.t("books.sitting.check"));
    await a.pause(4200);
    await a.press(a.t("books.sitting.next"));
  }
  await a.pause(1500);
  await a.press(a.t("books.sitting.hint"), false);
  await a.pause(1600);
  await a.press(a.t("books.sitting.dontKnow"), false);
  await a.pause(4200);
  a.rest();
  await a.pause(1500);
};

/** The daily review: the words that are due today come back. */
const review: Scene = async (a) => {
  await a.pause(900);
  await a.press(a.t("nav.entries.recall"), false);
  await a.pause(4000);
  a.rest();
  await a.pause(3000);
};

export const SCENES: Record<string, Scene> = { talk, book, review };
