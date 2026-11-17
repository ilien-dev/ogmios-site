// The pages that answer one search each: practising English with Claude, and learning
// vocabulary from books. Each is written for its own readers in each language, from the
// same facts as the home page (the app's README and docs/SPEC.md). Nothing is claimed
// that the app does not do.

import type { Lang } from "./strings";

export interface Topic {
  /** Which demo plays on the page, and which capture stands for it without scripts. */
  scene: "talk" | "book";
  /** Where the page lives in each language. */
  paths: Record<Lang, string>;
  title: string;
  description: string;
  eye: string;
  h1: string;
  lead: string;
  stageLabel: string;
  stageCaption: string;
  howTitle: string;
  howLead: string;
  steps: { title: string; body: string }[];
  sections: { title: string; body: string[] }[];
  shots: { src: string; alt: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaLead: string;
  ctaAction: string;
  other: { label: string; text: string };
  back: string;
}

const CLAUDE = { en: "/practice-english-with-claude/", es: "/es/practicar-ingles-con-claude/" };
const BOOKS = { en: "/learn-english-vocabulary-from-books/", es: "/es/aprender-ingles-leyendo-libros/" };

export const topics: Record<Lang, { claude: Topic; books: Topic }> = {
  en: {
    claude: {
      scene: "talk",
      paths: CLAUDE,
      title: "Practice English with Claude AI: Free Desktop App | Ogmios",
      description:
        "How to use Claude to practice English conversation: a free, open-source desktop app with a partner at your level, feedback at the end and a memory of your mistakes.",
      eye: "Practice English with Claude",
      h1: "Practice English with Claude",
      lead: "Claude is good at conversation, which makes it a good partner for English practice. Ogmios is a free, open-source desktop app that sets that practice up for you: a partner at your level, corrections held until you finish, and a memory of the mistakes you repeat.",
      stageLabel: "The app playing by itself: a spoken English conversation with Claude as the partner, and the feedback when it ends.",
      stageCaption: "The app itself, playing a sample conversation with Claude.",
      howTitle: "How to use Claude to practice English",
      howLead: "With Ogmios there is no prompt to write. A conversation goes like this.",
      steps: [
        { title: "Connect your Claude", body: "Paste an Anthropic API key, or let Ogmios use the Claude Code you already have installed." },
        { title: "Pick a topic and a level", body: "Basic, intermediate or advanced. Claude adapts its vocabulary, its questions and how much it expects you to say." },
        { title: "Speak or type", body: "Hold the microphone and talk, or write. Your speech turns into text on your computer and you can edit it before sending." },
        { title: "Ask when you are stuck", body: "“How do I say…?” takes a phrase in your language and gives you a few ways to say it in English." },
        { title: "End it and read the feedback", body: "What went well, one thing to work on and at most two details, explained in your native language." },
      ],
      sections: [
        {
          title: "Why not just chat with Claude?",
          body: [
            "You can, and many people do. In a chat you write the instructions yourself, you have to ask for corrections, and they arrive in the middle of what you were saying. Nothing keeps track of the mistakes you made last week.",
            "Ogmios does those parts. Claude never corrects during the conversation. When you finish, the app picks the one mistake that matters most and shows it to you with your own sentence, so you can try to fix it first. A mistake you repeat becomes a pattern, and the next conversations are steered so that you need that structure again.",
          ],
        },
        {
          title: "What you need, and what it costs",
          body: [
            "Ogmios is free and open source. Claude is not included: you connect your own. The recommended way is an Anthropic API key, which is pay-as-you-go. A 20-minute conversation costs roughly $0.20 with Sonnet 5, by our estimate.",
            "If you use Claude Code, Ogmios can run the claude you installed and signed in to. It never sees your credentials. Anthropic may limit subscription use in third-party apps, so that way can stop working at any time.",
          ],
        },
        {
          title: "What Claude sees",
          body: [
            "The text of your conversations and, if you use the books, the text of the chapters you prepare. Your voice is turned into text on your computer and the audio stays there. Conversations and progress are stored in a file on your machine. There is no Ogmios account.",
          ],
        },
      ],
      shots: [
        { src: "conversation", alt: "An English conversation with Claude in Ogmios: the partner asks about a small win at work and the learner answers" },
        { src: "feedback", alt: "Feedback after the conversation: the learner's sentence, their own fix and a short explanation in Spanish" },
      ],
      faqTitle: "Questions about practising English with Claude",
      faq: [
        {
          q: "Can I learn English with Claude?",
          a: "You can practise it. Claude holds a conversation at your level, and Ogmios adds what a chat lacks: feedback held until the end, a memory of your recurring mistakes and vocabulary from your own books.",
        },
        {
          q: "Do I need a paid Claude plan?",
          a: "You need an Anthropic API key, which you pay for as you use it, or Claude Code installed and signed in. The API key is the recommended way.",
        },
        { q: "Does Ogmios work with ChatGPT or other models?", a: "No. Ogmios works only with Claude." },
        {
          q: "Is Ogmios made by Anthropic?",
          a: "No. Ogmios is an independent open-source project. It is not affiliated with or endorsed by Anthropic.",
        },
      ],
      ctaTitle: "Have your first conversation with Claude",
      ctaLead: "Download Ogmios for macOS or Windows, connect your Claude and talk for ten minutes.",
      ctaAction: "Download Ogmios",
      other: { label: "Also in Ogmios", text: "Learn English vocabulary from your own books" },
      back: "All about Ogmios",
    },
    books: {
      scene: "book",
      paths: BOOKS,
      title: "Learn English Vocabulary from Your Own Books | Ogmios",
      description:
        "Add an EPUB or PDF and learn each chapter's words with the book's own sentences before you read it. Daily review with spaced repetition. Free and open source.",
      eye: "Learn English by reading books",
      h1: "Learn English vocabulary from the books you want to read",
      lead: "Reading in English is slow when every page has words you don't know. Ogmios, a free and open-source desktop app, prepares your book chapter by chapter: you learn the words first, with the book's own sentences, and then you read.",
      stageLabel:
        "The app playing by itself: the shelf of books, the chapters of Alice's Adventures in Wonderland, the words of the first chapter and a practice with sentences from the book.",
      stageCaption: "The app itself, going from the shelf to a vocabulary practice.",
      howTitle: "How to learn vocabulary from a book",
      howLead: "From adding the book to reading it.",
      steps: [
        { title: "Add your book", body: "Any EPUB or PDF in English. Ogmios splits it into chapters." },
        { title: "Prepare a chapter", body: "The app lists the words of the chapter you probably don't know yet, with their translation and how often they appear." },
        { title: "Leave out what you know", body: "Mark a word as known and it never comes back." },
        { title: "Practise with the book's sentences", body: "Each word is asked with a sentence from the book, into your language and back into English. A hint comes letter by letter." },
        { title: "Read the chapter", body: "A bar per chapter shows when you are ready. In the text, the words you learned are underlined." },
        { title: "Review a little every day", body: "Learned words come back after 1, 3, 7, 21 and 60 days." },
      ],
      sections: [
        {
          title: "It is not a tap-to-translate reader",
          body: [
            "Many reading apps translate a word when you tap it. That keeps you reading, and it also means meeting the same word ten times and looking it up ten times.",
            "Ogmios works the other way round. You learn the chapter's words before you open it, with the sentences they appear in, so the reading itself goes without stopping.",
          ],
        },
        {
          title: "How to remember new words from books",
          body: [
            "A word you have learned comes back just before you would forget it: the next day, then after three days, a week, three weeks and two months. A right answer moves it up a step and a wrong one moves it down. This is spaced repetition, and the app keeps the calendar for you.",
            "A word that keeps resisting comes back sooner, and you can write your own trick to remember it, which the app shows you the next time you miss it.",
            "The words also leave the book. In your English conversations, the partner uses the ones you are closest to forgetting, without pointing at them. Saying one yourself counts for two steps.",
          ],
        },
        {
          title: "More to do with the same chapter",
          body: [
            "Translate it sentence by sentence, into your language and back into English. Practise the sentence structures it uses. Train your ear with dictations taken from it.",
          ],
        },
      ],
      shots: [
        { src: "book", alt: "A book in Ogmios: a bar for each chapter of Alice's Adventures in Wonderland and the words of the first chapter" },
        { src: "practice", alt: "A vocabulary practice in Ogmios: the word “rabbit hole”, the learner's translation and the verdict" },
      ],
      faqTitle: "Questions about learning vocabulary from books",
      faq: [
        { q: "Which book formats does Ogmios read?", a: "EPUB and PDF, in English." },
        {
          q: "Does the text of my book leave my computer?",
          a: "The book is stored on your computer. When you prepare a chapter, the text of that chapter is sent to Claude, the AI that picks and translates its words.",
        },
        {
          q: "Can I use the books without the conversations?",
          a: "Yes. The book and the conversation are separate sections of the app. You still need to connect your own Claude, because it prepares the chapters.",
        },
        {
          q: "What level of English do I need to read a book this way?",
          a: "Any level at which you want to read that book. The app proposes the words you probably don't know at your level, and you leave out the ones you do.",
        },
      ],
      ctaTitle: "Open the first chapter of your book",
      ctaLead: "Download Ogmios for macOS or Windows, connect your Claude and add an EPUB or a PDF.",
      ctaAction: "Download Ogmios",
      other: { label: "Also in Ogmios", text: "Practice English conversation with Claude" },
      back: "All about Ogmios",
    },
  },
  es: {
    claude: {
      scene: "talk",
      paths: CLAUDE,
      title: "Practicar inglés con Claude: app de escritorio gratis | Ogmios",
      description:
        "Cómo usar Claude para practicar conversación en inglés: una app gratuita y de código abierto con un compañero a tu nivel, feedback al final y memoria de tus errores.",
      eye: "Practicar inglés con Claude",
      h1: "Practica inglés con Claude",
      lead: "Claude conversa bien, y eso lo hace un buen compañero para practicar inglés. Ogmios es una app de escritorio gratuita y de código abierto que te deja esa práctica lista: un compañero a tu nivel, las correcciones guardadas hasta que terminas y una memoria de los errores que repites.",
      stageLabel: "La app funcionando sola: una conversación hablada en inglés con Claude como compañero y el feedback al terminar.",
      stageCaption: "La app de verdad, reproduciendo una charla de ejemplo con Claude.",
      howTitle: "Cómo usar Claude para practicar inglés",
      howLead: "Con Ogmios no hay que escribir ningún prompt. Una charla va así.",
      steps: [
        { title: "Conecta tu Claude", body: "Pega una API key de Anthropic, o deja que Ogmios use el Claude Code que ya tienes instalado." },
        { title: "Elige un tema y un nivel", body: "Básico, intermedio o avanzado. Claude adapta su vocabulario, sus preguntas y cuánto espera que digas." },
        { title: "Habla o escribe", body: "Mantén pulsado el micrófono y habla, o escribe. Tu voz se convierte en texto en tu computadora y puedes editarlo antes de enviarlo." },
        { title: "Pregunta cuando te atores", body: "«¿Cómo digo…?» toma una frase en tu idioma y te da varias formas de decirla en inglés." },
        { title: "Termina y lee el feedback", body: "Lo que salió bien, una cosa para trabajar y como mucho dos detalles, explicados en tu idioma nativo." },
      ],
      sections: [
        {
          title: "¿Por qué no chatear con Claude y ya?",
          body: [
            "Se puede, y mucha gente lo hace. En un chat las instrucciones las escribes tú, las correcciones hay que pedirlas y llegan en medio de lo que estabas diciendo. Nadie lleva la cuenta de los errores que cometiste la semana pasada.",
            "Ogmios hace esa parte. Claude nunca corrige durante la charla. Al terminar, la app elige el error que más importa y te lo muestra con tu propia frase, para que primero intentes arreglarlo tú. Un error que repites se vuelve un patrón, y las siguientes charlas se llevan hacia donde vuelves a necesitar esa estructura.",
          ],
        },
        {
          title: "Qué necesitas y cuánto cuesta",
          body: [
            "Ogmios es gratis y de código abierto. Claude no viene incluido: conectas el tuyo. La vía recomendada es una API key de Anthropic, que se paga por uso. Una charla de 20 minutos cuesta alrededor de 0,20 USD con Sonnet 5, según nuestra estimación.",
            "Si usas Claude Code, Ogmios puede ejecutar el claude que tú instalaste y en el que iniciaste sesión. Nunca ve tus credenciales. Anthropic puede limitar el uso de la suscripción en apps de terceros, así que esa vía puede dejar de funcionar en cualquier momento.",
          ],
        },
        {
          title: "Qué ve Claude",
          body: [
            "El texto de tus charlas y, si usas los libros, el texto de los capítulos que preparas. Tu voz se convierte en texto en tu computadora y el audio se queda ahí. Las charlas y el progreso se guardan en un archivo de tu máquina. No existe una cuenta de Ogmios.",
          ],
        },
      ],
      shots: [
        { src: "conversation", alt: "Una conversación en inglés con Claude en Ogmios: el compañero pregunta por un pequeño logro en el trabajo y la persona responde" },
        { src: "feedback", alt: "El feedback después de la charla: la frase de la persona, su propia corrección y una explicación corta en español" },
      ],
      faqTitle: "Preguntas sobre practicar inglés con Claude",
      faq: [
        {
          q: "¿Se puede aprender inglés con Claude?",
          a: "Se puede practicar. Claude sostiene una conversación a tu nivel, y Ogmios añade lo que a un chat le falta: el feedback guardado para el final, una memoria de los errores que repites y el vocabulario de tus propios libros.",
        },
        {
          q: "¿Necesito un plan de pago de Claude?",
          a: "Necesitas una API key de Anthropic, que pagas según la usas, o tener Claude Code instalado y con la sesión iniciada. La API key es la vía recomendada.",
        },
        { q: "¿Ogmios funciona con ChatGPT u otros modelos?", a: "No. Ogmios funciona solo con Claude." },
        {
          q: "¿Ogmios es de Anthropic?",
          a: "No. Ogmios es un proyecto independiente de código abierto. No está afiliado a Anthropic ni cuenta con su respaldo.",
        },
      ],
      ctaTitle: "Ten tu primera charla con Claude",
      ctaLead: "Descarga Ogmios para Mac o Windows, conecta tu Claude y habla diez minutos.",
      ctaAction: "Descargar Ogmios",
      other: { label: "También en Ogmios", text: "Aprende inglés leyendo tus propios libros" },
      back: "Todo sobre Ogmios",
    },
    books: {
      scene: "book",
      paths: BOOKS,
      title: "Aprender inglés leyendo libros: vocabulario de tus libros | Ogmios",
      description:
        "Añade un EPUB o un PDF y aprende las palabras de cada capítulo con las frases del propio libro antes de leerlo. Repaso diario con repetición espaciada. Gratis.",
      eye: "Aprender inglés leyendo libros",
      h1: "Aprende inglés leyendo los libros que quieres leer",
      lead: "Leer en inglés se hace lento cuando en cada página hay palabras que no conoces. Ogmios, una app de escritorio gratuita y de código abierto, prepara tu libro capítulo a capítulo: primero aprendes las palabras, con las frases del propio libro, y después lees.",
      stageLabel:
        "La app funcionando sola: la estantería de libros, los capítulos de Alice's Adventures in Wonderland, las palabras del primer capítulo y una práctica con frases del libro.",
      stageCaption: "La app de verdad, de la estantería a una práctica de vocabulario.",
      howTitle: "Cómo aprender el vocabulario de un libro",
      howLead: "Desde que añades el libro hasta que lo lees.",
      steps: [
        { title: "Añade tu libro", body: "Cualquier EPUB o PDF en inglés. Ogmios lo divide en capítulos." },
        { title: "Prepara un capítulo", body: "La app lista las palabras del capítulo que seguramente aún no conoces, con su traducción y cuántas veces aparecen." },
        { title: "Deja fuera lo que ya sabes", body: "Marcas una palabra como sabida y no vuelve." },
        { title: "Practica con las frases del libro", body: "Cada palabra se pregunta con una frase del libro, hacia tu idioma y de vuelta al inglés. La pista llega letra a letra." },
        { title: "Lee el capítulo", body: "Una barra por capítulo te dice cuándo estás listo. En el texto, las palabras que aprendiste van subrayadas." },
        { title: "Repasa un poco cada día", body: "Las palabras aprendidas vuelven a los 1, 3, 7, 21 y 60 días." },
      ],
      sections: [
        {
          title: "No es un lector que traduce al tocar",
          body: [
            "Muchas apps de lectura traducen una palabra cuando la tocas. Eso te mantiene leyendo, y también hace que te cruces diez veces con la misma palabra y la busques diez veces.",
            "Ogmios lo hace al revés. Aprendes las palabras del capítulo antes de abrirlo, con las frases donde aparecen, y así la lectura va sin paradas.",
          ],
        },
        {
          title: "Cómo recordar las palabras nuevas de un libro",
          body: [
            "Una palabra que ya aprendiste vuelve justo antes de que la olvides: al día siguiente, luego a los tres días, a la semana, a las tres semanas y a los dos meses. Un acierto la sube un escalón y un fallo la baja. Eso es la repetición espaciada, y el calendario lo lleva la app.",
            "Una palabra que se resiste vuelve antes, y puedes escribir tu propio truco para recordarla; la app te lo muestra la próxima vez que la falles.",
            "Las palabras también salen del libro. En tus charlas en inglés, el compañero usa las que estás más cerca de olvidar, sin señalarlas. Decir una tú vale dos escalones.",
          ],
        },
        {
          title: "Más cosas con el mismo capítulo",
          body: ["Tradúcelo frase a frase, hacia tu idioma y de vuelta al inglés. Practica las estructuras que usa. Entrena el oído con dictados sacados de él."],
        },
      ],
      shots: [
        { src: "book", alt: "Un libro en Ogmios: una barra por cada capítulo de Alice's Adventures in Wonderland y las palabras del primero" },
        { src: "practice", alt: "Una práctica de vocabulario en Ogmios: la palabra «rabbit hole», la traducción de la persona y el veredicto" },
      ],
      faqTitle: "Preguntas sobre aprender inglés con libros",
      faq: [
        { q: "¿Qué formatos de libro lee Ogmios?", a: "EPUB y PDF, en inglés." },
        {
          q: "¿El texto de mi libro sale de mi computadora?",
          a: "El libro se guarda en tu computadora. Cuando preparas un capítulo, el texto de ese capítulo se envía a Claude, la IA que elige y traduce sus palabras.",
        },
        {
          q: "¿Puedo usar los libros sin las charlas?",
          a: "Sí. El libro y la conversación son secciones separadas de la app. Igual necesitas conectar tu propio Claude, porque es el que prepara los capítulos.",
        },
        {
          q: "¿Qué nivel de inglés necesito para leer un libro así?",
          a: "El nivel con el que quieras leer ese libro. La app propone las palabras que seguramente no conoces a tu nivel, y tú dejas fuera las que sí.",
        },
      ],
      ctaTitle: "Abre el primer capítulo de tu libro",
      ctaLead: "Descarga Ogmios para Mac o Windows, conecta tu Claude y añade un EPUB o un PDF.",
      ctaAction: "Descargar Ogmios",
      other: { label: "También en Ogmios", text: "Practica conversación en inglés con Claude" },
      back: "Todo sobre Ogmios",
    },
  },
};
