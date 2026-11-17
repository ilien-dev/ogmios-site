// Every visible text of the site, in English and Spanish. Facts come from the app's
// README and docs/SPEC.md; nothing here is a claim the app does not back. The two
// languages are written for their own readers, with the words each one searches for
// ("practice speaking English with AI", "English conversation practice", "learn English
// vocabulary from books"; "practicar inglés hablando con IA", "conversación en inglés",
// "aprender vocabulario en inglés leyendo"), not translated line by line.

export type Lang = "en" | "es";

export const LINKS = {
  repo: "https://github.com/ilien-dev/ogmios",
  releases: "https://github.com/ilien-dev/ogmios/releases/latest",
  windows: "https://github.com/ilien-dev/ogmios/releases/latest/download/Ogmios_x64-setup.exe",
  releasesAll: "https://github.com/ilien-dev/ogmios/releases",
  issues: "https://github.com/ilien-dev/ogmios/issues",
  license: "https://github.com/ilien-dev/ogmios/blob/main/LICENSE",
};

interface Item {
  title: string;
  body: string;
}

export interface Strings {
  lang: Lang;
  htmlLang: string;
  title: string;
  description: string;
  skip: string;
  seo: {
    alternateName: string;
    subCategory: string;
    requirements: string;
    features: string[];
    keywords: string[];
    ogAlt: string;
  };
  nav: { label: string; talk: string; books: string; review: string; memory: string; claude: string; faq: string };
  langSwitch: { label: string; other: string; otherLong: string; otherHref: string };
  theme: { label: string };
  download: string;
  stage: { loading: string; play: string };
  hero: {
    pillTag: string;
    pill: string;
    titleA: string;
    titleMark: string;
    titleB: string;
    lead: string;
    primary: string;
    secondary: string;
    needs: string;
    stageLabel: string;
    stageCaption: string;
  };
  factsLabel: string;
  facts: string[];
  idea: { eye: string; titleA: string; titleMark: string; lead: string; points: string[]; zero: string };
  talk: {
    eye: string;
    title: string;
    lead: string;
    tiles: [Item, Item, Item, Item];
    heard: string;
    ask: string;
    goal: string;
    said: string;
    better: string;
  };
  books: {
    eye: string;
    titleA: string;
    titleMark: string;
    titleB: string;
    lead: string;
    stageLabel: string;
    stageCaption: string;
    steps: Item[];
    gloss: [string, string];
    readTitle: string;
    readBody: string;
  };
  review: {
    eye: string;
    titleA: string;
    titleMark: string;
    lead: string;
    partner: string;
    chatNote: string;
    daysLabel: string;
    days: { n: string; label: string }[];
  };
  memory: { eye: string; title: string; lead: string; patternNote: string; states: { name: string; rule: string }[]; relapse: string };
  compare: { eye: string; title: string; lead: string; head: [string, string, string]; rows: [string, string, string][] };
  claude: { eye: string; title: string; lead: string; badge: string; ways: (Item & { tag: string })[]; notes: Item[] };
  yours: { eye: string; title: string; items: Item[] };
  install: {
    eye: string;
    title: string;
    lead: string;
    mac: Item;
    win: Item & { action: string };
    copy: string;
    copied: string;
    after: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { title: string; lead: string; mac: string; win: string; github: string; version: string; note: string };
  footer: {
    tagline: string;
    product: string;
    project: string;
    help: string;
    source: string;
    releases: string;
    license: string;
    issues: string;
    install: string;
    legal: string;
  };
}

export const en: Strings = {
  lang: "en",
  htmlLang: "en",
  title: "Practice English Speaking with Claude AI | Ogmios, Free App",
  description:
    "Free, open-source desktop app to practice English speaking with Claude AI. Feedback after the conversation, not during. Vocabulary from your own books.",
  skip: "Skip to content",
  seo: {
    alternateName: "Ogmios English conversation practice",
    subCategory: "English conversation practice and vocabulary",
    requirements: "An Anthropic API key or an installed Claude Code",
    features: [
      "English conversation practice by voice or text with Claude",
      "No corrections during the conversation; short feedback at the end",
      "Memory of recurring mistakes across conversations",
      "Vocabulary from your own EPUB and PDF books, chapter by chapter",
      "Daily review with spaced repetition",
      "Speech recognition on your own computer",
      "All data stored locally",
    ],
    keywords: [
      "practice speaking English with AI",
      "English conversation practice app",
      "AI English speaking partner",
      "learn English vocabulary from books",
      "spaced repetition vocabulary",
      "open source language learning app",
      "Claude English practice",
    ],
    ogAlt: "Ogmios: a conversation in English with an AI partner, and the vocabulary of a book",
  },
  nav: { label: "Sections", talk: "Conversation", books: "Books", review: "Daily review", memory: "Memory", claude: "Claude", faq: "Questions" },
  langSwitch: { label: "Ver esta página en español", other: "ES", otherLong: "Español", otherHref: "/es/" },
  theme: { label: "Dark theme" },
  download: "Download",
  stage: { loading: "Opening Ogmios…", play: "Play the demo" },
  hero: {
    pillTag: "Open source",
    pill: "Free app. You bring your own Claude",
    titleA: "Practice English speaking with AI, without",
    titleMark: "interruptions",
    titleB: "",
    lead: "Ogmios is a free, open-source desktop app for macOS and Windows. You talk or type with Claude and nobody corrects you mid-sentence. Afterwards you get one thing to focus on and at most two smaller corrections, in your own language. With your own books, you learn each chapter's vocabulary before you read it.",
    primary: "Download for macOS and Windows",
    secondary: "View on GitHub",
    needs: "Needs your own Claude: an Anthropic API key or Claude Code",
    stageLabel:
      "The app playing by itself: a spoken conversation in English with the AI partner, a question about how to say something, and the feedback at the end.",
    stageCaption: "This is the app itself, playing a sample conversation. Nothing here is a mock-up.",
  },
  factsLabel: "At a glance",
  facts: ["macOS and Windows", "Your API key or your Claude Code", "Speech to text on your computer", "Your data stays local", "English and Spanish interface"],
  idea: {
    eye: "The idea",
    titleA: "Speak first. Fix things",
    titleMark: "afterwards.",
    lead: "When someone corrects you in the middle of a sentence, you stop thinking about what you wanted to say. Ogmios keeps the two apart. During the conversation you only talk. When it ends, you see what is worth working on.",
    points: ["Your partner never corrects during the conversation", "One focus and at most two details per conversation", "The vocabulary comes from the book you choose"],
    zero: "interruptions while you speak",
  },
  talk: {
    eye: "English conversation practice",
    title: "An AI partner that never corrects you mid-sentence",
    lead: "Pick a topic and a level, from beginner to advanced. Your partner asks, listens and follows what you say, like someone who is curious about you.",
    tiles: [
      {
        title: "Your voice stays on your computer",
        body: "Hold the microphone and speak. Speech turns into text on your machine, and you can edit it before you send it. Editing never counts as a mistake.",
      },
      { title: "“How do I say…?”", body: "Type it in your language and get a few ways to say it in English, without leaving the conversation." },
      { title: "Minutes spoken", body: "The goal counts what you say, so ten minutes of silence count for nothing. Reach it or stop early; there is no penalty." },
      {
        title: "Little feedback, well chosen",
        body: "At the end you see what went well, one thing to work on and at most two details, explained in your own language. You try to fix your sentence before the answer shows.",
      },
    ],
    heard: "This is what was heard. Change what you like.",
    ask: "estoy hasta arriba de trabajo",
    goal: "You reached your goal. Keep going or see feedback?",
    said: "What you said",
    better: "Better",
  },
  books: {
    eye: "Learn English vocabulary from books",
    titleA: "The words of",
    titleMark: "your book",
    titleB: ", before you read it",
    lead: "Add an EPUB or a PDF and Ogmios prepares it chapter by chapter. You learn the words you don't know with the book's own sentences, and then you read.",
    stageLabel:
      "The app playing by itself: the shelf of books, the chapters of Alice's Adventures in Wonderland, the words of the first chapter and a practice with sentences from the book.",
    stageCaption: "From the shelf to a practice: the book, its chapters, the words of one, and questions with the book's sentences.",
    steps: [
      { title: "Put a book on your shelf", body: "Any EPUB or PDF in English. Ogmios splits it into chapters and keeps your place." },
      { title: "See each chapter at a glance", body: "A bar per chapter shows how ready you are to read it: ready, still learning, or not prepared yet." },
      { title: "Choose what to learn", body: "Each chapter lists its words with their translation and how often they appear. Mark the ones you already know and they stay out." },
      { title: "Practise with real sentences", body: "Every word is asked with a sentence from the book, into your language and back into English. Ask for a hint and it comes letter by letter." },
    ],
    gloss: ["peeped: looked quickly", "burning with curiosity: very curious"],
    readTitle: "Then read, and notice what you learned",
    readBody:
      "In the text of a chapter, the words you have learned are underlined in their own colour. Rest the pointer on one to see what it meant. You can also translate the chapter sentence by sentence, or train your ear with dictations from it.",
  },
  review: {
    eye: "Daily review with spaced repetition",
    titleA: "Words come back just before",
    titleMark: "you forget them",
    lead: "A word you learned returns after one day, then three, a week, three weeks and two months. Get it right and it moves up a step; miss it and it moves down one.",
    partner: "Partner · AI",
    chatNote: "Your partner also uses the words closest to being forgotten in your conversations, without pointing at them. Saying one yourself counts for two steps.",
    daysLabel: "When a learned word comes back",
    days: [
      { n: "1", label: "tomorrow" },
      { n: "3", label: "3 days" },
      { n: "7", label: "1 week" },
      { n: "21", label: "3 weeks" },
      { n: "60", label: "2 months" },
    ],
  },
  memory: {
    eye: "A memory of your mistakes",
    title: "An error memory that tracks your recurring mistakes",
    lead: "A mistake you repeat becomes a pattern with a state. You work on one focus at a time until it moves, and your partner steers the next conversations towards it.",
    patternNote: "A pattern, on its way",
    states: [
      { name: "Detected", rule: "It showed up in a conversation" },
      { name: "In focus", rule: "Chosen as your one focus" },
      { name: "Improving", rule: "Right 40 to 79% of the time" },
      { name: "Mastered", rule: "Right 80% of the time, in 3 conversations" },
    ],
    relapse: "Slip on a mastered pattern in a conversation and it goes back in focus. Drills alone never earn “mastered”.",
  },
  compare: {
    eye: "Compared with a chat",
    title: "How Ogmios differs from practising English with ChatGPT or Claude directly",
    lead: "You can practise in any AI chat, and many people do. These are the things you would have to set up and keep track of yourself.",
    head: ["", "A general AI chat", "Ogmios"],
    rows: [
      ["The instructions", "You write the prompt, each time", "Built in: topic, level and how long to talk"],
      ["Corrections", "When you ask, often in the middle of the chat", "Only at the end: one focus, at most two details"],
      ["Your recurring mistakes", "Yours to notice and write down", "Kept in an error memory that steers the next conversations"],
      ["New vocabulary", "Whatever comes up", "The words of your own books, reviewed on a schedule"],
    ],
  },
  claude: {
    eye: "Works with Claude",
    title: "Bring your own Claude: an API key or Claude Code",
    lead: "The partner you talk to, the feedback and the preparation of each chapter are done by Claude, the AI model made by Anthropic. Ogmios does not include it: you connect yours, in one of two ways.",
    badge: "Bring your own Claude",
    ways: [
      {
        title: "An Anthropic API key",
        tag: "Recommended",
        body: "You create a key in the Anthropic Console and paste it once. Ogmios keeps it in your system's keychain and you pay Anthropic for what you use.",
      },
      {
        title: "Your Claude Code",
        tag: "With a subscription",
        body: "If you already use Claude Code, Ogmios runs the claude you installed and signed in to. It never sees your credentials. Anthropic may limit subscription use in third-party apps, so this way can stop working at any time.",
      },
    ],
    notes: [
      { title: "What it costs", body: "Ogmios is free. A 20-minute conversation costs roughly $0.20 with Sonnet 5 on the API. That is an estimate, not a measurement." },
      { title: "What reaches Claude", body: "The text of your conversations and, when you prepare a chapter, the text of that chapter. Your audio never leaves your computer." },
    ],
  },
  yours: {
    eye: "Yours",
    title: "Your data stays on your computer",
    items: [
      { title: "Stored on your computer", body: "Conversations, recordings, books and progress live in a file on your machine." },
      { title: "Open source", body: "AGPL-3.0. Every line and every prompt is there to read." },
      { title: "No Ogmios account", body: "There is nothing to sign up for here. The only account involved is your own with Anthropic." },
      { title: "In your language", body: "The interface is in English and Spanish, and explanations come in your native language." },
    ],
  },
  install: {
    eye: "Install",
    title: "Download Ogmios for macOS and Windows",
    lead: "It installs like any other desktop app. There is no mobile or web version. On first launch it asks for your level and how you want to connect Claude.",
    mac: { title: "macOS", body: "For Apple Silicon Macs, with Homebrew. Paste this in Terminal:" },
    win: {
      title: "Windows",
      body: "Download the installer from the latest release and run it. It is not signed yet, so SmartScreen warns about it: choose More info, then Run anyway.",
      action: "Download for Windows",
    },
    copy: "Copy",
    copied: "Copied",
    after: "After that Ogmios updates itself: it checks for a new release when it starts.",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Is there a free AI to practice English speaking?",
        a: "Ogmios itself is free and open source. The AI behind it is Claude, which you connect with your own Anthropic API key or your own Claude Code, so you pay Anthropic for what you use. With the API, a 20-minute conversation costs roughly $0.20 with Sonnet 5, by our estimate.",
      },
      {
        q: "Can I practice English with Claude?",
        a: "Yes. Ogmios is built for that. Claude plays a conversation partner at your level, writes the feedback when you finish and prepares the vocabulary of your books. You need an Anthropic API key or Claude Code installed.",
      },
      {
        q: "How is Ogmios different from practising English with ChatGPT or Claude directly?",
        a: "In a chat you write the prompt, ask for corrections and keep track of your own mistakes. Ogmios has the conversation set up for you, holds every correction until the end, remembers the mistakes you repeat and brings them back in later conversations.",
      },
      {
        q: "Does the AI correct my mistakes while I speak?",
        a: "No. Your partner only talks with you. When the conversation ends you get what went well, one thing to work on and at most two details, with the explanation in your native language.",
      },
      {
        q: "How do I practice English speaking alone, without a partner?",
        a: "Open Ogmios, pick a topic and talk. You can hold the microphone and speak, or type. The partner asks follow-up questions, so the conversation keeps going for as long as you want.",
      },
      {
        q: "I'm afraid to speak English. Can I practise without being judged?",
        a: "Nobody is listening except the app, and it does not interrupt or correct you while you talk. You can edit what you said before sending it, and editing never counts against you. The feedback at the end is short on purpose.",
      },
      {
        q: "Can I learn English vocabulary from my own books?",
        a: "Yes. Add the book as an EPUB or PDF. Ogmios prepares each chapter and lists the words you probably don't know. You mark the ones you do, practise the rest with sentences from the book, and then read the chapter.",
      },
      {
        q: "What is spaced repetition, and how does Ogmios use it?",
        a: "It means reviewing a word at growing intervals, just before you would forget it. In Ogmios a learned word comes back after 1, 3, 7, 21 and 60 days in the daily review. A right answer moves it up a step and a wrong one moves it down.",
      },
      {
        q: "Does Ogmios work on Windows and Mac? Is there a mobile app?",
        a: "There are releases for Windows and for macOS on Apple Silicon. There is no mobile app and no web version.",
      },
      {
        q: "Is my voice or my conversation sent anywhere?",
        a: "Speech recognition runs on your computer and the audio stays there. Conversations, books and progress are stored locally. The text of your conversations, and of the chapters you prepare, is sent to Claude to get the replies.",
      },
    ],
  },
  cta: {
    title: "Your next conversation starts here",
    lead: "Download Ogmios, connect your Claude and talk for ten minutes. Or open the first chapter of your book.",
    mac: "macOS",
    win: "Windows",
    github: "View on GitHub",
    version: "Version",
    note: "updates itself",
  },
  footer: {
    tagline: "English conversation practice with Claude, on your own computer.",
    product: "The app",
    project: "Project",
    help: "Start",
    source: "Source on GitHub",
    releases: "Releases",
    license: "AGPL-3.0 licence",
    issues: "Report a problem",
    install: "Install",
    legal:
      "Ogmios is an independent open-source project. It is not affiliated with, endorsed by or sponsored by Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC. The sample book in the demos is Alice's Adventures in Wonderland by Lewis Carroll, in the public domain.",
  },
};

export const es: Strings = {
  lang: "es",
  htmlLang: "es",
  title: "Practicar inglés hablado con IA (Claude) | Ogmios, gratis",
  description:
    "App de escritorio gratuita y de código abierto para practicar inglés hablado con Claude. Feedback al final, no a media frase. Vocabulario de tus libros.",
  skip: "Saltar al contenido",
  seo: {
    alternateName: "Ogmios, práctica de conversación en inglés",
    subCategory: "Práctica de conversación en inglés y vocabulario",
    requirements: "Una API key de Anthropic o Claude Code instalado",
    features: [
      "Práctica de conversación en inglés por voz o texto con Claude",
      "Sin correcciones durante la charla; feedback breve al final",
      "Memoria de los errores que se repiten entre charlas",
      "Vocabulario de tus propios libros en EPUB y PDF, capítulo a capítulo",
      "Repaso diario con repetición espaciada",
      "Reconocimiento de voz en tu propia computadora",
      "Todos los datos guardados en local",
    ],
    keywords: [
      "practicar inglés hablando con IA",
      "app para practicar conversación en inglés",
      "hablar inglés con inteligencia artificial",
      "aprender vocabulario en inglés con libros",
      "repetición espaciada vocabulario inglés",
      "app de idiomas de código abierto",
      "practicar inglés con Claude",
    ],
    ogAlt: "Ogmios: una conversación en inglés con un compañero de IA y el vocabulario de un libro",
  },
  nav: { label: "Secciones", talk: "Conversación", books: "Libros", review: "Repaso diario", memory: "Memoria", claude: "Claude", faq: "Preguntas" },
  langSwitch: { label: "See this page in English", other: "EN", otherLong: "English", otherHref: "/" },
  theme: { label: "Tema oscuro" },
  download: "Descargar",
  stage: { loading: "Abriendo Ogmios…", play: "Ver la demo" },
  hero: {
    pillTag: "Código abierto",
    pill: "App gratis. Tú pones tu propio Claude",
    titleA: "Practica inglés hablado con IA, sin que",
    titleMark: "te interrumpan",
    titleB: "",
    lead: "Ogmios es una app de escritorio gratuita y de código abierto para Mac y Windows. Hablas o escribes con Claude y nadie te corrige a media frase. Al terminar recibes una cosa para trabajar y como mucho dos correcciones menores, en tu idioma. Con tus propios libros, aprendes el vocabulario de cada capítulo antes de leerlo.",
    primary: "Descargar para macOS y Windows",
    secondary: "Ver en GitHub",
    needs: "Necesita tu propio Claude: una API key de Anthropic o Claude Code",
    stageLabel:
      "La app funcionando sola: una conversación hablada en inglés con el compañero de IA, una consulta de cómo se dice algo y el feedback al final.",
    stageCaption: "Esta es la app de verdad, reproduciendo una charla de ejemplo. Nada de lo que ves es una maqueta.",
  },
  factsLabel: "De un vistazo",
  facts: ["macOS y Windows", "Tu API key o tu Claude Code", "Voz a texto en tu computadora", "Tus datos se quedan en local", "Interfaz en español e inglés"],
  idea: {
    eye: "La idea",
    titleA: "Hablar primero. Corregir",
    titleMark: "después.",
    lead: "Cuando alguien te corrige a mitad de frase, dejas de pensar en lo que querías decir. Ogmios separa las dos cosas. Durante la charla solo hablas. Al terminar, ves qué vale la pena trabajar.",
    points: ["Tu compañero nunca corrige durante la charla", "Un foco y como mucho dos detalles por charla", "El vocabulario sale del libro que tú eliges"],
    zero: "interrupciones mientras hablas",
  },
  talk: {
    eye: "Práctica de conversación en inglés",
    title: "Una IA para practicar speaking que no te corrige a media frase",
    lead: "Eliges un tema y un nivel, de básico a avanzado. Tu compañero pregunta, escucha y sigue lo que dices, como alguien que tiene curiosidad por ti.",
    tiles: [
      {
        title: "Tu voz se queda en tu computadora",
        body: "Mantén pulsado el micrófono y habla. La voz se convierte en texto en tu máquina y puedes editarlo antes de enviarlo. Editar nunca cuenta como error.",
      },
      { title: "«¿Cómo digo…?»", body: "Escríbelo en tu idioma y recibe varias formas de decirlo en inglés, sin salir de la charla." },
      { title: "Minutos hablados", body: "La meta cuenta lo que dices, así que diez minutos en silencio no suman. Puedes llegar a ella o parar antes; no hay castigo." },
      {
        title: "Poco feedback, bien elegido",
        body: "Al final ves lo que salió bien, una cosa para trabajar y como mucho dos detalles, explicados en tu idioma. Primero intentas arreglar tu frase y luego aparece la respuesta.",
      },
    ],
    heard: "Esto es lo que se oyó. Cambia lo que quieras.",
    ask: "estoy hasta arriba de trabajo",
    goal: "Llegaste a tu meta. ¿Seguir o ver feedback?",
    said: "Lo que dijiste",
    better: "Mejor",
  },
  books: {
    eye: "Aprende vocabulario en inglés con libros",
    titleA: "Las palabras de",
    titleMark: "tu libro",
    titleB: ", antes de leerlo",
    lead: "Añades un EPUB o un PDF y Ogmios lo prepara capítulo a capítulo. Aprendes las palabras que no conoces con las frases del propio libro, y después lees.",
    stageLabel:
      "La app funcionando sola: la estantería de libros, los capítulos de Alice's Adventures in Wonderland, las palabras del primer capítulo y una práctica con frases del libro.",
    stageCaption: "De la estantería a la práctica: el libro, sus capítulos, las palabras de uno y preguntas con frases del libro.",
    steps: [
      { title: "Pon un libro en tu estantería", body: "Cualquier EPUB o PDF en inglés. Ogmios lo divide en capítulos y recuerda por dónde vas." },
      { title: "Mira cada capítulo de un vistazo", body: "Una barra por capítulo te dice qué tan listo estás para leerlo: listo, aprendiendo o sin preparar." },
      { title: "Elige qué aprender", body: "Cada capítulo lista sus palabras con su traducción y cuántas veces aparecen. Marca las que ya sabes y quedan fuera." },
      { title: "Practica con frases reales", body: "Cada palabra se pregunta con una frase del libro, hacia tu idioma y de vuelta al inglés. Si pides una pista, llega letra a letra." },
    ],
    gloss: ["se había asomado", "muerta de curiosidad"],
    readTitle: "Después lees, y notas lo que aprendiste",
    readBody:
      "En el texto de un capítulo, las palabras que ya aprendiste van subrayadas con su propio color. Deja el cursor sobre una para ver qué significaba. También puedes traducir el capítulo frase a frase o entrenar el oído con dictados sacados de él.",
  },
  review: {
    eye: "Repaso diario con repetición espaciada",
    titleA: "Las palabras vuelven justo antes de que",
    titleMark: "se te olviden",
    lead: "Una palabra que aprendiste regresa al día siguiente, luego a los tres días, a la semana, a las tres semanas y a los dos meses. Si aciertas sube un escalón; si fallas baja uno.",
    partner: "Compañero · IA",
    chatNote: "Tu compañero también usa en tus charlas las palabras más cerca de olvidarse, sin señalarlas. Decir una tú vale dos escalones.",
    daysLabel: "Cuándo vuelve una palabra aprendida",
    days: [
      { n: "1", label: "mañana" },
      { n: "3", label: "3 días" },
      { n: "7", label: "1 semana" },
      { n: "21", label: "3 semanas" },
      { n: "60", label: "2 meses" },
    ],
  },
  memory: {
    eye: "Una memoria de tus errores",
    title: "Una memoria de errores que sigue los fallos que repites",
    lead: "Un error que repites se vuelve un patrón con su estado. Trabajas un foco a la vez hasta que avanza, y tu compañero lleva las siguientes charlas hacia él.",
    patternNote: "Un patrón, en camino",
    states: [
      { name: "Detectado", rule: "Apareció en una charla" },
      { name: "En foco", rule: "Elegido como tu único foco" },
      { name: "Mejorando", rule: "Bien entre el 40 y el 79 % de las veces" },
      { name: "Dominado", rule: "Bien el 80 % de las veces, en 3 charlas" },
    ],
    relapse: "Si fallas en una charla algo que ya dominabas, vuelve a estar en foco. «Dominado» nunca se gana solo con ejercicios.",
  },
  compare: {
    eye: "Frente a un chat",
    title: "En qué se diferencia de practicar inglés con ChatGPT o con Claude directamente",
    lead: "Se puede practicar en cualquier chat de IA, y mucha gente lo hace. Esto es lo que tendrías que preparar y llevar tú por tu cuenta.",
    head: ["", "Un chat de IA general", "Ogmios"],
    rows: [
      ["Las instrucciones", "Escribes el prompt tú, cada vez", "Ya vienen: tema, nivel y cuánto hablar"],
      ["Las correcciones", "Cuando las pides, a menudo en medio de la charla", "Solo al final: un foco y como mucho dos detalles"],
      ["Los errores que repites", "Te toca notarlos y apuntarlos", "Quedan en una memoria que guía las siguientes charlas"],
      ["El vocabulario nuevo", "El que vaya saliendo", "Las palabras de tus propios libros, repasadas con calendario"],
    ],
  },
  claude: {
    eye: "Funciona con Claude",
    title: "Usa tu propio Claude: una API key o Claude Code",
    lead: "El compañero con el que hablas, el feedback y la preparación de cada capítulo los hace Claude, el modelo de IA de Anthropic. Ogmios no lo incluye: tú conectas el tuyo, de una de estas dos formas.",
    badge: "Trae tu propio Claude",
    ways: [
      {
        title: "Una API key de Anthropic",
        tag: "Recomendado",
        body: "Creas una clave en la consola de Anthropic y la pegas una vez. Ogmios la guarda en el llavero de tu sistema y le pagas a Anthropic por lo que uses.",
      },
      {
        title: "Tu Claude Code",
        tag: "Con suscripción",
        body: "Si ya usas Claude Code, Ogmios ejecuta el claude que tú instalaste y en el que iniciaste sesión. Nunca ve tus credenciales. Anthropic puede limitar el uso de la suscripción en apps de terceros, así que esta vía puede dejar de funcionar en cualquier momento.",
      },
    ],
    notes: [
      { title: "Cuánto cuesta", body: "Ogmios es gratis. Una charla de 20 minutos cuesta alrededor de 0,20 USD con Sonnet 5 en la API. Es una estimación, no una medición." },
      { title: "Qué llega a Claude", body: "El texto de tus charlas y, cuando preparas un capítulo, el texto de ese capítulo. Tu audio nunca sale de tu computadora." },
    ],
  },
  yours: {
    eye: "Tuyo",
    title: "Tus datos se quedan en tu computadora",
    items: [
      { title: "Guardado en tu computadora", body: "Charlas, grabaciones, libros y progreso viven en un archivo de tu máquina." },
      { title: "Código abierto", body: "AGPL-3.0. Puedes leer cada línea y cada prompt." },
      { title: "Sin cuenta de Ogmios", body: "Aquí no hay nada en lo que registrarse. La única cuenta que interviene es la tuya con Anthropic." },
      { title: "En tu idioma", body: "La interfaz está en español e inglés, y las explicaciones llegan en tu idioma nativo." },
    ],
  },
  install: {
    eye: "Instalar",
    title: "Descarga Ogmios para Mac y Windows",
    lead: "Se instala como cualquier otro programa de PC o Mac. No hay versión para el celular ni para el navegador. La primera vez te pregunta tu nivel y cómo quieres conectar Claude.",
    mac: { title: "macOS", body: "Para Mac con Apple Silicon, con Homebrew. Pega esto en la Terminal:" },
    win: {
      title: "Windows",
      body: "Descarga el instalador de la última versión y ejecútalo. Todavía no está firmado, así que SmartScreen avisa: elige Más información y luego Ejecutar de todas formas.",
      action: "Descargar para Windows",
    },
    copy: "Copiar",
    copied: "Copiado",
    after: "Después Ogmios se actualiza solo: busca una versión nueva cada vez que arranca.",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Ogmios es gratis?",
        a: "La app es gratuita y de código abierto. La IA que usa es Claude, que conectas con tu propia API key de Anthropic o con tu Claude Code, así que le pagas a Anthropic por lo que uses. Con la API, una charla de 20 minutos cuesta alrededor de 0,20 USD con Sonnet 5, según nuestra estimación.",
      },
      {
        q: "¿Se puede aprender inglés con Claude?",
        a: "Sí. Ogmios está hecho para eso. Claude hace de compañero de conversación a tu nivel, escribe el feedback cuando terminas y prepara el vocabulario de tus libros. Necesitas una API key de Anthropic o tener Claude Code instalado.",
      },
      {
        q: "¿En qué se diferencia de practicar inglés con ChatGPT?",
        a: "En un chat tú escribes el prompt, pides las correcciones y llevas la cuenta de tus errores. Ogmios ya trae la charla preparada, guarda todas las correcciones para el final, recuerda los errores que repites y los trae de vuelta en charlas posteriores.",
      },
      {
        q: "¿La IA me corrige mientras hablo?",
        a: "No. Tu compañero solo conversa contigo. Cuando termina la charla recibes lo que salió bien, una cosa para trabajar y como mucho dos detalles, con la explicación en tu idioma nativo.",
      },
      {
        q: "¿Cómo practicar speaking en inglés solo, sin compañero?",
        a: "Abre Ogmios, elige un tema y habla. Puedes mantener pulsado el micrófono y hablar, o escribir. El compañero te hace más preguntas, así que la conversación sigue todo el tiempo que quieras.",
      },
      {
        q: "¿Cómo perder el miedo a hablar inglés?",
        a: "Ogmios no promete quitarlo, pero te deja practicar sin público: solo escucha la app, y no te interrumpe ni te corrige mientras hablas. Puedes editar lo que dijiste antes de enviarlo, y editar nunca cuenta en tu contra. El feedback del final es corto a propósito.",
      },
      {
        q: "¿Se puede aprender inglés leyendo libros? ¿Puedo usar los míos?",
        a: "Sí. Añade tu libro en EPUB o PDF. Ogmios prepara cada capítulo y lista las palabras que seguramente no conoces. Marcas las que sí, practicas el resto con frases del libro y después lees el capítulo.",
      },
      {
        q: "¿Qué es la repetición espaciada y cómo la usa Ogmios?",
        a: "Es repasar una palabra a intervalos cada vez más largos, justo antes de olvidarla. En Ogmios una palabra aprendida vuelve al día 1, 3, 7, 21 y 60 en el repaso diario. Un acierto la sube un escalón y un fallo la baja.",
      },
      {
        q: "¿Funciona en Windows y Mac? ¿Hay app para el celular?",
        a: "Hay versiones para Windows y para Mac con Apple Silicon. No hay app para el celular ni versión web.",
      },
      {
        q: "¿Mi voz o mis conversaciones salen de mi computadora?",
        a: "El reconocimiento de voz corre en tu computadora y el audio se queda ahí. Las charlas, los libros y el progreso se guardan en local. El texto de tus charlas, y el de los capítulos que preparas, se envía a Claude para obtener las respuestas.",
      },
    ],
  },
  cta: {
    title: "Tu próxima charla empieza aquí",
    lead: "Descarga Ogmios, conecta tu Claude y habla diez minutos. O abre el primer capítulo de tu libro.",
    mac: "macOS",
    win: "Windows",
    github: "Ver en GitHub",
    version: "Versión",
    note: "se actualiza sola",
  },
  footer: {
    tagline: "Práctica de conversación en inglés con Claude, en tu propia computadora.",
    product: "La app",
    project: "Proyecto",
    help: "Empezar",
    source: "Código en GitHub",
    releases: "Versiones",
    license: "Licencia AGPL-3.0",
    issues: "Reportar un problema",
    install: "Instalar",
    legal:
      "Ogmios es un proyecto independiente de código abierto. No está afiliado a Anthropic ni cuenta con su respaldo o patrocinio. Claude y Claude Code son marcas de Anthropic, PBC. El libro de ejemplo de las demos es Alice's Adventures in Wonderland, de Lewis Carroll, de dominio público.",
  },
};
