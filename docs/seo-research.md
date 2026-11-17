# Ogmios: SEO and discoverability research (landing page EN/ES + GitHub README)

Research date: 2026-11-16/17. Scope: how people search for this kind of app, what they expect, who ranks, and what Ogmios should publish.

## 0. Method and how to read the labels

- **[V]** = verified, with the source (URL or command) next to it.
- **[I]** = my inference from the verified data. Treat as a recommendation, not a fact.
- **No search volumes are given anywhere.** I had no keyword-volume tool. "Demand" below means only: Google autocomplete returns the phrase (so people type it), and/or many sites compete for it in the SERP.
- Sources used:
  - Google autocomplete, endpoint `suggestqueries.google.com/complete/search?client=firefox&hl=<en|es>&gl=<us|mx|es>&q=<seed>`. About 190 seeds. Seeds that return nothing are reported as such; an empty result means Google has no stored completion for that exact phrasing.
  - SERPs through the Svipall search tool (DuckDuckGo HTML engine, which is Bing-backed). **Not Google SERPs.** Rankings on Google will differ in order, though the set of players is very similar.
  - Competitor pages fetched live (title, meta description, H1, H2, JSON-LD).
  - GitHub via `gh` (`gh search repos`, `gh repo view`, `gh api search/repositories?q=topic:<t>`).
- **Not obtained:** Google "People also ask" boxes and Google "related searches". Google SERPs were not scraped, and the Bing SERP fetch returned unrelated results for three of four queries (bot handling), so I discarded it. Question-style queries below come from autocomplete and from the FAQ blocks competitors publish in their own FAQPage markup (both verified), not from PAA.
- **Process note:** the first two autocomplete batches (about 110 seeds) were fetched with plain `curl`/Python against the Google suggest endpoint instead of the Svipall tool. Only generic keyword strings were sent, no user or project data. The remaining batch went through the `svipall` CLI.
- Current repo state [V, `gh repo view ilien-dev/ogmios`]: description empty, no topics, no homepage URL, 0 stars, licence AGPL-3.0.

---

## 1. How people search

### 1.1 The dominant pattern (both languages)

[V, autocomplete] Almost every head query gets the same four modifiers appended by Google, in this order of frequency:

1. **free / gratis** (first or second suggestion for nearly every seed)
2. **online** ("free online", "gratis online")
3. **app** ("app", "app free", "app download", "for pc")
4. **reddit** (EN only: people want an unsponsored opinion)

Examples [V]:
- `practice english speaking with ai` → "… free", "… online free", "… reddit", "… app"
- `ai english tutor` → "… free", "… free app", "… app", "… free online", "… loora"
- `ai english speaking partner` → "… free", "… free online", "… free download", "… free app"
- `practicar inglés con ia` → "… gratis", "… gratis online", "… google", "… gemini", "… gratis speaking", "… hablando"
- `ia para practicar inglés` → "… speaking", "… gratis", "… conversacional gratis", "… hablado gratis", "… oral"

[I] Consequence: the page must answer "is it free?" in the first screen, honestly (see section 5.6). It is the single most-asked thing.

### 1.2 English clusters

**A. Head terms (too competitive, do not expect to rank; use them as the page's topic vocabulary)**

| Query | Evidence |
| --- | --- |
| practice english speaking with ai | [V] autocomplete; SERP is 10 dedicated products (SmallTalk2Me, Speakflew, Speak with AI, EnglishPal, fluentwith, Talkfirst, speakingpractice.ai, LinguaLive, TalkSmart, British Council) |
| ai english tutor | [V] autocomplete; SERP dominated by Langua, ELSA, Loora, comparison blogs |
| english speaking practice app | [V] autocomplete incl. "free download for pc", "for windows 10", "offline" |
| english conversation practice | [V] autocomplete: "free", "pdf", "topics", "app", "ai" |
| ai english conversation / ai english speaking partner | [V] autocomplete |
| open source language learning app | [V] autocomplete; SERP = github.com/topics/language-learning, Vuizur/awesome-language-learning, OpenKoto, LibHunt, AlternativeTo |
| spaced repetition vocabulary app | [V] autocomplete; SERP = listicles (Ling, Lingopie, Laxu) |

**B. Mid-tail (possible over time, with exact-match sections)**

| Query | Evidence |
| --- | --- |
| practice english with ai tutor free / practice english conversation with ai | [V] autocomplete |
| talk to ai in english / speak english with ai | [V] autocomplete |
| best ai for english speaking practice (free) | [V] autocomplete; a listicle intent, we cannot rank but can be *listed* (section 5.5) |
| english speaking practice app for pc / for windows 10 / free download for pc | [V] autocomplete. SERP mixes Microsoft Store listings and listicles. [I] Desktop is a real differentiator: almost every competitor is mobile or browser |
| learn english by reading books / … app / … free | [V] autocomplete; SERP = Lingible, englishreading.app, Bookory, English Book Reader |
| how to learn vocabulary from books / how to remember words from books | [V] autocomplete |
| advanced english speaking practice / english conversation practice c1 / for advanced learners | [V] autocomplete |
| open source ai language learning app / open source ai language tutor / ai language tutor github / english tutor ai github | [V] autocomplete |
| lingq open source alternative / readlang open source alternative / duolingo alternative open source | [V] autocomplete |
| speak app alternative / praktika alternative free / talkpal alternative free / elsa speak alternative | [V] autocomplete |

**C. Long-tail we can realistically win (few or no dedicated products in the SERP)**

| Query | Evidence | Why winnable |
| --- | --- | --- |
| practice english with claude | [V] autocomplete | [V] SERP: blog posts with prompts, two YouTube videos, two Claude Code skills. **No app.** |
| learn english with claude / claude ai to learn english / learn english with claude code | [V] autocomplete | same SERP shape |
| claude english tutor / claude ai english tutor / claude english teacher (skill) | [V] autocomplete | [V] SERP for "Claude English tutor app": a Poe bot, claude.com/download, Claude Code skills. No desktop app |
| claude language learning app / … tutor / … prompt / … skill | [V] autocomplete | |
| how to use claude to learn english | [V] autocomplete | answerable by a how-to section or FAQ |
| ai english tutor open source / open source english learning app | [V] autocomplete | [V] SERP has small GitHub repos (EchoWise 5 stars, Discute 90) on page 1: GitHub repos rank here with few stars |
| open source ai english speaking practice (desktop) | [V] SERP | [V] EchoWise (5 stars) is result #1. A well-described repo ranks |
| english speaking practice app for pc (free) | [V] autocomplete | [I] few native desktop apps; Microsoft Store listings rank |
| ai english tutor that doesn't correct / feedback after the conversation | [V] autocomplete returns **nothing** for these phrasings | [I] nobody searches for the feature by name. It is a conversion argument, not a keyword. Phrase it as the benefit people do search for: fear of speaking, speaking without being judged |
| how to stop being afraid to speak english / how to overcome fear of speaking english | [V] autocomplete | [V] Univerbal's H1 is "Speak without feeling judged for your mistakes": same angle |
| how to practice english speaking alone (at home without a partner) | [V] autocomplete | informational; good FAQ/blog target |
| vocabulary from your own books / EPUB + spaced repetition | [V] autocomplete returns nothing for "spaced repetition from ebooks", "learn vocabulary from epub", "app to learn words from books", "vocabulary app for readers" | [I] no stored demand for these exact phrasings; people reach this via "learn english by reading books app" and "how to learn vocabulary from books" |
| bring your own api key … language | [V] autocomplete returns nothing | [I] a developer-audience term; useful on GitHub (`byok` topic has 1,550 repos), not in Google |

**D. Question-style queries (for FAQ + FAQPage)** [V, autocomplete unless noted]

- is there a free ai to practice english speaking (online)?
- what is the best free ai to practice english speaking? / what is the best free ai english tutor app?
- which ai is best for english speaking practice (free)?
- can i practice english (speaking) with ai? / with chatgpt? / with gemini?
- is chatgpt good for practicing english? / for learning english?
- how to use claude to learn english
- how to practice english speaking with ai (for free) / best way to practice english speaking with ai
- how to practice english speaking alone at home without a partner
- how to stop being afraid to speak english / how to overcome fear of speaking english
- can i learn english by reading books? / does reading books improve english? / does reading novels improve spoken english?
- how to learn vocabulary from books / how to remember (new) words from books
- what is spaced repetition? / what is the best spaced repetition app?
- is speak app worth it? / is praktika worth it? (comparison intent)
- "What's the difference between English conversation practice with AI and using ChatGPT?" [V, fluentwith.com FAQPage]; "How is Speak different from a general AI chatbot?" [V, speak.com FAQPage]

### 1.3 Spanish clusters

[V] Spanish autocomplete is richer than English for this topic and is heavily "gratis"-driven. Note the vocabulary: users say **"speaking"** as a loanword, plus **"inglés hablado"**, **"conversacional"**, **"oral"**, **"conversar"**. They write without accents; Google treats both spellings as one.

**A. Head terms (too competitive)**

| Query | Evidence |
| --- | --- |
| practicar inglés con ia (gratis / online / hablando) | [V] autocomplete; SERP: SmallTalk2Me/es, Langua blog, angloeducativo, Gliglish, Learna |
| ia para practicar inglés (speaking / gratis / conversacional / hablado / oral) | [V] autocomplete |
| ia para aprender inglés (gratis / hablando / desde cero) | [V] autocomplete |
| hablar inglés con ia (gratis / online) | [V] autocomplete |
| app para practicar inglés (hablando / con ia / conversacional / con nativos) | [V] autocomplete |
| practicar speaking inglés (online gratis / con ia) | [V] autocomplete |
| aprender inglés con ia gratis | [V] autocomplete |

**B. Mid-tail**

| Query | Evidence |
| --- | --- |
| mejor ia para practicar inglés / … speaking / … conversaciones en inglés | [V] autocomplete; SERP = listicles (Langua, BeConfident ×3, Papora, Speaklay) |
| conversar en inglés con ia / conversación en inglés con ia / practicar conversación en inglés con ia gratis | [V] autocomplete |
| tutor de inglés ia (gratis) / tutor personal de inglés ia / profesor de inglés ia | [V] autocomplete |
| aprender inglés leyendo libros (gratis / app) / aprender inglés con libros app | [V] autocomplete; SERP = Leevo, 2Books, LingoSeven, Storyteller, LangOrbit, readingcorner.uk, SpeakAlong |
| programa para aprender inglés en pc / pc sin internet | [V] autocomplete |
| alternativa a duolingo (gratis) | [V] autocomplete |
| repetición espaciada app | [V] autocomplete |
| practicar inglés hablado (gratis / online) | [V] autocomplete |

**C. Long-tail we can realistically win**

| Query | Evidence | Note |
| --- | --- | --- |
| aprender inglés con claude / aprender ingles con claude ai / puedo aprender ingles con claude / prompt para aprender ingles con claude | [V] autocomplete | [V] SERP: only tutorials and prompt lists (claudebuilders.es, claudio.academy, soypablocarballo.com, Vaughan blog). No app |
| cómo usar claude para aprender inglés | [V] autocomplete | how-to section |
| practicar inglés con chatgpt (… conversacional, prompt para …) | [V] autocomplete | comparison FAQ: "¿en qué se diferencia de usar ChatGPT o Claude directamente?" |
| cómo practicar speaking solo / como practicar ingles solo | [V] autocomplete | |
| cómo perder el miedo a hablar inglés / como perder la verguenza de hablar en ingles | [V] autocomplete | the emotional angle that matches "never corrects you mid-conversation" |
| app para guardar palabras en ingles / como recordar (nuevas) palabras en ingles | [V] autocomplete | books + review section |
| ia para hablar inglés en tiempo real / fluido | [V] autocomplete | do not target "en tiempo real": Ogmios is turn-based with an editable transcript |
| código abierto / software libre para aprender inglés | [V] autocomplete returns **nothing** | [I] Spanish speakers do not search the open-source angle. In ES lead with "gratis", "para PC/Mac", "sin suscripción"; mention "código abierto" as proof, not as the hook |
| ia para practicar inglés sin suscripción / sin registrarse / pc | [V] autocomplete returns nothing | [I] not stored queries, but they are the expectation behind "gratis" |

**D. Question-style (ES)** [V, autocomplete unless noted]

- cuál es la mejor ia para practicar inglés (gratis / conversacional / hablado)?
- cuál es la mejor ia para practicar speaking en inglés?
- cómo practicar inglés con ia (gratis)? / cómo puedo practicar mi inglés con ia?
- cómo practicar speaking en inglés con ia? / … con chatgpt? / … solo?
- se puede aprender inglés con ia (gratis)? / con chat gpt? / con gemini?
- puedo aprender inglés con claude? / puedo practicar ingles con chatgpt?
- cómo usar claude para aprender inglés / cómo usar la ia para aprender inglés
- cómo aprender inglés leyendo libros? / se puede aprender ingles con libros?
- cómo recordar palabras en inglés?
- cómo perder el miedo a hablar inglés?
- "¿Es gratis?", "¿Qué nivel de inglés necesito?", "¿Cómo se aprende inglés leyendo libros?", "¿En qué funciona?" [V, langorbit.com/es FAQPage]

---

## 2. What searchers expect to find

Derived from autocomplete modifiers [V] and from what the ranking pages put in their title/description/H1 [V, section 3].

| Expectation | Evidence | What Ogmios must show above the fold |
| --- | --- | --- |
| **Is it free?** | [V] "free/gratis" is the top modifier everywhere. Ranking titles lead with it: "Free English Speaking Practice with AI" (Speakflew), "Free AI English Speaking Practice" (SmallTalk2Me), "… Free Voice Practice" (fluentwith) | "Free and open source. You bring your own Anthropic API key (pay Anthropic for what you use) or your own Claude Code." One line, no asterisk |
| **No signup / no account** | [V] autocomplete "ai english speaking practice free without login", "chatgpt english without registration"; Speakflew meta: "Free, no signup, no account"; SpeakAlong: "Sin cuentas, sin suscripciones" | [I] "No Ogmios account. Your data stays on your computer." Confirm wording against the app (an Anthropic account is still needed for the key) |
| **Which platforms / is there a download?** | [V] "app", "app download", "free download for pc", "for windows 10", "programa … en pc" | Two download buttons: macOS (Apple Silicon) and Windows, visible without scrolling. Say plainly there is no mobile or web version |
| **Does it actually talk? Voice?** | [V] "speaking", "hablando", "hablado", "oral", "voice" modifiers | "Speak or type. Speech-to-text runs on your machine." Do not imply a live voice call |
| **Will it correct me? How?** | [V] every competitor description mentions feedback ("instant feedback", "feedback inmediato", "corrects mistakes"). Univerbal H1: "Speak without feeling judged for your mistakes" | State the difference in one sentence: no corrections during the conversation; afterwards one focus and at most two minor corrections, explained in your language |
| **How is it different from ChatGPT / Claude itself?** | [V] FAQ on fluentwith and speak.com; autocomplete "practice english with chatgpt", "practicar ingles con chatgpt", "prompt para …" | A short comparison block: a chat forgets your mistakes and you must write the prompt; Ogmios keeps an error memory and steers the next conversations |
| **Comparison with paid apps** | [V] "speak app alternative", "praktika alternative free", "talkpal alternative free", "is speak app worth it" | A factual comparison table limited to what is verifiable (price model, platform, open source, when feedback is given). No disparagement, no invented numbers |
| **Level** | [V] "b1", "b2", "c1", "advanced", "desde cero"; LangOrbit FAQ "¿Qué nivel de inglés necesito?" | Say who it is for. If the facts do not define supported levels, say "you choose a level" and do not promise beginner courses |
| **Privacy** | [V] Loora FAQ "Is it safe to talk to an AI English speaking partner?"; Speakflew FAQ "How is my speech processed?"; Plumb/Sprigo/HiKid lead with "private", "on-device" | "Audio is transcribed locally and never leaves your computer; the text of the conversation is sent to Anthropic to get the reply; everything is stored locally." Accurate, and stronger than competitors' claims |
| **Demo / what does it look like?** | [V] every ranking page has screenshots or a try-now widget; Sprigo's README opens with a screenshot grid | Real screenshots or a short screen recording in the first screen. (Project rule on record: real captures, never AI-generated images) |
| **Reading / books** | [V] ES and EN "learn english by reading books app"; expected: tap-to-translate, flashcards, own books | Ogmios is different (prepared chapter vocabulary, practise each word with sentences from the book, then read). Say that explicitly so nobody expects a tap-to-translate reader |

[I] Things searchers expect that Ogmios does **not** offer, and should say so rather than hide: mobile app, browser version, zero cost with no key, pronunciation scoring, exam prep (IELTS/TOEFL), languages other than English as target. Saying it filters bad-fit visitors and protects the bounce rate.

---

## 3. Competitors and how they are found

### 3.1 Commercial (all fetched live 2026-11-16) [V]

| Product / URL | `<title>` | Meta description | H1 | Clear keyword targets | JSON-LD |
| --- | --- | --- | --- | --- | --- |
| Speak · speak.com | Speak - The language learning app that gets you speaking | Speak is an AI-powered language learning company focused on helping learners build spoken fluency through speaking practice, personalized feedback, and structured lessons. | Good things happen when we Speak | language learning app, speaking practice, spoken fluency | Organization, WebSite, SoftwareApplication+MobileApplication, FAQPage (12 Q) |
| ELSA Speak · elsaspeak.com/en | The world's best way to improve your English speaking \| ELSA Speak | ELSA Speak is an AI-powered English learning app that helps you improve speaking, pronunciation, and fluency. … | #1 AI English Speaking App for Fluency and Confidence | AI English speaking app, pronunciation, AI tutor, role-play | none found |
| Praktika · praktika.ai | Praktika - Learn and speak new languages with AI tutors | Learn and speak new languages with AI tutors. Private-tutor quality with the convenience of an app. | Learn a new language with AI tutors | AI tutors, learn/speak languages | MobileApplication, Offer, Organization |
| Talkpal · talkpal.ai | AI Language Teacher - Talkpal | Talkpal is an AI language learning app for speaking practice in 130+ languages. Practice real conversations with natural AI voice — free for 14 days. | The fun and effective way to learn a language with AI! | AI language teacher, AI language learning app, speaking practice | SoftwareApplication, AggregateRating, FAQPage, BreadcrumbList |
| Langua · languatalk.com/try-langua | Meet Langua, the world's most advanced AI language coach • LanguaTalk | Become fluent faster with hands-free speaking practice tailored to your level & interests. Chat with AI that sounds human & get detailed feedback. | Meet Langua, the world's most advanced AI language coach | AI language coach, speaking practice, feedback; separate landing "AI English Tutor for Speaking Practice & Fluency" at /ai-english-tutor | none found |
| Gliglish · gliglish.com | Gliglish · Learn languages by speaking with AI | SPEAK your languages for FREE with the 1st AI-based language teacher | (none extracted) | learn languages by speaking with AI, free; ES page "Aprende idiomas hablando con IA" | Organization, WebSite |
| Loora · loora.ai | Loora - Your Personal AI English Tutor | Unlock your full potential with Loora, a personalized English learning app with your very own AI English tutor. Improve your English speaking with AI Today! | Unlock your full potential with your very own AI English tutor | AI English tutor (exact match ×3), English speaking with AI | Organization, WebSite, FAQPage (8 Q) |
| Univerbal · univerbal.app | Univerbal \| AI Language Tutor for Real Conversation Practice | Univerbal is your AI language tutor for real conversation practice and fluency. Choose from 100+ scenarios, get instant feedback … Try for free! | Speak without feeling judged for your mistakes | AI language tutor, conversation practice; emotional H1 | FAQPage (8 Q) |
| Duolingo Max · duolingo.com/max | Duolingo - The world's most popular way to learn | Free, fun, and effective courses in languages and more. … | (none) | brand; the /max URL serves the generic home metadata | Organization |
| LingQ · lingq.com/en | Learn Languages Online with Real Content \| LingQ Language App | LingQ is a language learning platform that teaches through authentic content: podcasts, books, videos and more. | (none) | learn languages with real content | SoftwareApplication, AggregateRating, Offer |
| Readlang · readlang.com | Learn a Language by Reading \| Readlang | Language learning through reading. Click to translate words, practice with smart flashcards, and read in 100+ languages. | Learn a language reading what you love | learn a language by reading, flashcards | SoftwareApplication, Offer, Review |
| Language Reactor · languagereactor.com | Language Reactor | Language Reactor: your language learning toolbox. Discover, understand, and learn from native materials, including Netflix and YouTube. … | (none) | brand, Netflix/YouTube | none |

Adjacent small players that actually rank for our target phrases [V]:

| Product / URL | `<title>` | Meta description | H1 |
| --- | --- | --- | --- |
| fluentwith.com | Practice English Speaking with AI - Free Voice Practice | Practice English speaking with AI. Voice-to-voice conversation practice with personalized feedback and drills. Free. | Speak English with confidence. |
| speakflew.com | Free English Speaking Practice with AI — Speakflew | Practice everyday English with short speaking games, answer review, and another try. Free, no signup, no account. | Speak English in everyday situations. |
| smalltalk2.me | Free AI English Speaking Practice — CEFR Level Test, IELTS & Mock Interview \| SmallTalk2Me | Five simple steps to improve your spoken English faster than a traditional tutor … | Free AI English Speaking Practice |
| lingible.app/learn-english | Learn English by Reading Books with Translation \| Lingible | Learn English by reading classics and simplified A2–B1 books with instant word translation into your language, AI grammar help, and flashcards. | Learn English by reading real books |
| bookory.net | Bookory - Vocabulary Learning App for Readers | Premium vocabulary learning app for serious readers. Build your vocabulary with smart flashcards, spaced repetition, and book integration. | Build Your Vocabulary While Reading |
| langorbit.com/es | Aprende inglés con libros reales e historias \| LangOrbit | Historias sobre lo que te interesa, libros reales con traducción y una lección diaria que te devuelve cada palabra antes de que la olvides. | Aprende inglés leyendo lo que te gusta. Y que las palabras nuevas se te queden. |
| speakalong.app (ES) | SpeakAlong — Ahora gratis y de código abierto | 49 audiolibros graduados para aprender inglés. Sin cuentas, sin suscripciones. Descárgalo para macOS, Windows o Linux. | (none) |
| mehmetozer.dev/sprigo | Sprigo: a free, open-source AI language tutor that runs locally | (the page's meta description is the author's CV text, a mistake on their side) | Sprigo |

Patterns [I, from the table]:
- The pages that rank for the head phrase put the **exact phrase in the title, first** ("Practice English Speaking with AI - …", "Free English Speaking Practice with AI — …"), then the brand. Big brands lead with the brand because they can.
- Titles carry one modifier from section 1.1 ("Free").
- FAQPage markup is used by 9 of the 20 pages fetched; SoftwareApplication (or Mobile/WebApplication) by 9. AggregateRating appears on Talkpal, LingQ, Bookory: we must not copy that (no ratings exist).
- Nobody in the commercial set says "open source", "desktop", "your own API key", "Claude", or "feedback only after the conversation". Those are free positioning space.

### 3.2 Open-source GitHub projects [V, `gh repo view <repo> --json description,stargazerCount,repositoryTopics` + README via `gh api repos/<repo>/readme`, 2026-11-16]

| Repo | Stars | Description | Topics | README opening line |
| --- | --- | --- | --- | --- |
| hujiulin/EchoWise (closest: Tauri desktop, English, never interrupts) | 5 | Just talk. An open-source desktop AI companion for English speaking & listening practice. | ai, ai-companion, azure-openai, cross-platform, desktop-app, english-learning, language-learning, llm, local-first, open-source, openai, react, rust, speaking-practice, speech-to-text, tauri, text-to-speech, typescript, voice-assistant | "An open-source, cross-platform desktop AI companion for English speaking & listening practice." |
| artcc/freelingo (AGPL, error memory, Anthropic/Ollama) | 288 | Open-source, self-hosted AI language learning platform with local or cloud LLMs, CEFR study plans, an AI tutor, voice conversations, flashcards, and spaced repetition. | nextjs, python, self-hosted, ai-tutor, cefr, docker-compose, edtech, fastapi, flashcards, language-learning, listening-practice, llm, ollama, personalized-learning, spaced-repetition, speaking-practice, speech-to-text, text-to-speech | "FreeLingo is an open-source language learning platform with a structured A1–C2 curriculum and an AI tutor, Lingu." |
| liou666/polyglot | 2,590 | 🤖️ Cross-platform AI language practice app （跨平台AI语言练习应用） | azure, chatgpt, electron, polyglot, tts, openai | "跨平台AI语言练习应用" (last push 2025-09-03) |
| ozerozdas/sprigo (Tauri desktop, local model) | 23 | A local-first language-learning app for the desktop. Lessons, stories and conversation practice are generated by an AI model running on your own machine. | ai-tutor, desktop-app, duolingo-alternative, english-learning, language-learning, lm-studio, local-first, local-llm, offline-first, ollama, privacy, react, speech-recognition, tauri, whisper, ai, conversation-practice, language-learning-app, llm, whisper-cpp | README opens with a screenshot grid |
| likebeans/ChatterPal | 35 | Self-hosted English speaking practice with guided conversations, recording confirmation, feedback, and spaced review. React + FastAPI. | english-learning, fastapi, language-learning, python, react, self-hosted, spaced-repetition, speaking-practice, speech-recognition, text-to-speech, typescript, whisper | Chinese |
| xiaochong/hi-kid (desktop, kids) | 1,186 | HiKid - Your AI English Pal. A desktop app built with React and TypeScript, targeting children in non-English-speaking countries who want to practice English speaking and listening. | ai, english-learning, kids-education, local-ai, offline-ai, speaking-practice, voice-chat | "HiKid is a completely free, forever free open-source desktop app designed for kids …" |
| Chuloo/mural (iPhone/Android, BYOK OpenAI) | 1,818 | The language app you eventually delete. A native iPhone companion for learning through conversation. | ios, language-learning, open-source, swiftui | "Mural is a native iPhone and Android app for learning through conversation." |
| speaktosi/ai-english-tutor | 1 | Free, open-source AI English tutor for Windows with a real-time MuseTalk talking-head teacher. … Self-host it (MIT), bring your own LLM key. … | ai-teacher, ai-english-tutor, bring-your-own-key, conversation-practice, english-tutor, english-speaking-practice, free-ai-english-tutor, spoken-english, windows-app, open-source, … | "# SpeakTosi Mini — Free Open-Source AI English Tutor with a Real-Time Talking-Head Teacher" (the most SEO-shaped README H1 in the set) |
| isa-aguilar/poligloti | 1 | poligloti: a patient AI language teacher that never judges you. Practice speaking out loud without an audience, get gentle corrections, and let it remember what you already know. … | ai-tutor, cefr, language-learning, language-tutor, llm, local-first, ollama, privacy, self-hosted, speaking-practice, speech-to-text, … | "poligloti is a patient AI language teacher for speaking practice." |
| tianmind-studio/english-coach | 29 | Claude Code skill for learning English through real conversations, corrections, and micro-lessons. | claude-code, claude-skill, english-learning, language-learning, ai-coach, anthropic, esl | ranks on page 1 for "practice English with Claude" |
| LuteOrg/lute-v3 (reading) | 1,621 | LUTE = Learning Using Texts: learn languages through reading. | language-learning, lute | |
| simjanos-dev/LinguaCafe (reading) | 1,485 | LinguaCafe is a self-hosted software that helps language learners read foreign languages. | language-learning, anki, dictionary, japanese, jellyfin, jmdict, language, self-hosting, translation | "… helps language learners acquire vocabulary by reading." |
| FreeLanguageTools/vocabsieve (EPUB → Anki) | 552 | Simple sentence mining tool for language learning | language-learning, python, sentence-mining, spaced-repetition, anki, epub | |
| mengxi-ream/read-frog | 10,464 | 🐸 Read Frog - Open-source AI language learning & flashcards, an Immersive Translate alternative … | browser-extension, language-learning, english-learning, anki, flashcards, open-source, spaced-repetition, … (20) | #1 in `topic:language-learning` |

Other verified facts about GitHub in this space:
- [V, `gh search repos --topic speaking-practice --sort stars`] The `speaking-practice` topic has only 114 repos; the top five are Echo-Loop (4,774), hi-kid (1,186), freelingo (288), Mimora (38), ChatterPal (35). **A repo with ~40 stars is on the first screen of that topic.**
- [V, `gh search repos --topic conversation-practice`] 11 repos; #1 has 23 stars (sprigo). Ogmios appears on the first page of this topic the day the topic is added.
- [V, `gh search repos --topic english-speaking`] 16 repos; #1 has 6 stars.
- [V] `gh search repos "language tutor claude"` returns 3 repos, all 0 stars. `"practice english" claude in:name,description` returns 7, best has 3 stars. Nobody owns "English + Claude + desktop app" on GitHub.
- [V] The DuckDuckGo SERP for "open source AI English speaking practice app desktop" puts hujiulin/EchoWise (5 stars) at #1 and 5uru/Discute at #2, because their GitHub description matches the query words. GitHub's page title is `owner/repo: description`, so **the repo description is the Google title**.

---

## 4. GitHub discoverability

### 4.1 Topic sizes [V, `gh api "search/repositories?q=topic:<t>&per_page=1" --jq .total_count`, 2026-11-16]

| Topic | Repos | Read |
| --- | --- | --- |
| language-learning | 5,135 | The hub topic. `github.com/topics/language-learning` itself ranks #1 on DDG for "open source language learning app" [V]. Mandatory |
| english-learning | 2,473 | Mandatory. Mostly Chinese-audience projects; an English-described repo stands out |
| english | 4,136 | Broad, low cost |
| spaced-repetition | 3,690 | Books feature |
| vocabulary | 2,046 | Books feature |
| flashcards | 3,554 | Only if the review screen is honestly flashcard-like; otherwise skip |
| epub | 3,756 | Books are EPUB (verified in code: `src-tauri/src/books/epub.rs`) |
| ai-tutor | 954 | Good size, direct intent |
| speaking-practice | 114 | Small and winnable (see 3.2) |
| conversation-practice | 11 | Instantly visible |
| learn-english | 56 | Small; top repos are big (TypeWords 11,982, awesome-english 4,561) |
| english-speaking | 16 | Instantly visible |
| esl | 283 | |
| language-learning-app | 37 | #1 has 65 stars |
| vocabulary-builder | 170 | optional |
| language-tutor | 12 | optional |
| speech-to-text | 15,348 | Feature topic |
| local-first | 34,575 | Feature topic; used by EchoWise, sprigo, poligloti |
| byok | 1,550 | Matches "bring your own key"; there is also `bring-your-own-key` (149) |
| claude | 70,145 | Large, relevant |
| anthropic | 30,520 | Relevant |
| claude-ai | 5,227 | optional |
| claude-code | 121,428 | Do **not** use as a main topic: the app is not a Claude Code tool; it only can run through it |
| tauri | 21,620 | Stack topic; also the route into awesome-tauri |
| desktop-app | 34,237 | |
| open-source | 86,499 | Used by several peers |
| ai-english-tutor / english-speaking-practice / language-learning-tools | 1 / 1 / 0 | Dead topics, skip |
| extensive-reading / comprehensible-input / sentence-mining | 2 / 43 / 55 | Niche; `comprehensible-input` optional |

### 4.2 Recommended repo description (347 characters, counted)

> Practice English speaking with AI: open-source desktop app (macOS, Windows) for English conversation practice with Claude. Local speech-to-text, feedback after the conversation instead of mid-sentence, an error memory for recurring mistakes, and vocabulary from your own books with spaced repetition. Bring your own Anthropic API key. Local-first.

[I] Why this shape: GitHub search matches name, description and topics; Google shows `ilien-dev/ogmios: <description>` as the title, truncated at roughly 60 characters, so the first ~45 characters must be the query: "Practice English speaking with AI: open-source desktop app". Every later clause is a keyword people or GitHub search actually use (English conversation practice, Claude, speech-to-text, spaced repetition, Anthropic API key, local-first).

Shorter variant if 350 feels heavy in the sidebar (176 chars):
> Practice English speaking with AI: open-source desktop app for English conversation practice with Claude. Feedback after, never mid-sentence. Vocabulary from your own books.

Also set **Website** to the landing page URL (the About-box link is a followed link from a high-authority domain, and it is where README readers convert).

### 4.3 Recommended topics (20, the GitHub maximum)

```
language-learning  english-learning  speaking-practice  conversation-practice
ai-tutor  learn-english  english  esl
spaced-repetition  vocabulary  epub
claude  anthropic  byok
speech-to-text  local-first  desktop-app  tauri
language-learning-app  open-source
```

Swap candidates if one must go: `english-speaking`, `vocabulary-builder`, `llm`, `claude-ai`. Command:

```
gh repo edit ilien-dev/ogmios --add-topic language-learning,english-learning,speaking-practice,conversation-practice,ai-tutor,learn-english,english,esl,spaced-repetition,vocabulary,epub,claude,anthropic,byok,speech-to-text,local-first,desktop-app,tauri,language-learning-app,open-source
```

### 4.4 What the README's first screen must contain

[I, based on what ranks in 3.2 and on how GitHub/Google read a README]

1. **H1 with the keyword, not only the name.** Now: `# Ogmios`. Proposed: `# Ogmios: practice English speaking with AI (Claude)`. Google uses the description for the title, but the README H1 and first paragraph are the page body it scores.
2. **One-sentence definition in the first 160 characters** containing: English speaking/conversation practice, AI, Claude, open source, desktop, macOS and Windows. This sentence becomes the search snippet. Example: "Ogmios is a free, open-source desktop app for macOS and Windows to practise spoken English with Claude, Anthropic's AI. You talk, nobody corrects you mid-sentence, and afterwards you get one thing to focus on."
3. **A real screenshot or short GIF** directly under it (conversation, report, book practice). Real captures only.
4. **Download buttons / links** for macOS and Windows above the fold, plus a link to the landing page.
5. **Language switch**: `English | Español` linking to `README.es.md`. A Spanish README is a second indexable page for the ES queries, and three of the peers above do the same for Chinese.
6. **Feature bullets with the searched nouns in bold**: conversation practice, feedback after the session, error memory, vocabulary from your own books, spaced repetition (1, 3, 7, 21, 60 days), local speech-to-text, bring your own key. The current README never mentions the Books feature: add it, it carries a whole keyword cluster.
7. **"What you need" line**: an Anthropic API key or your own Claude Code. Stating the cost model early prevents the "is it really free?" bounce.
8. **A short "How it compares" or FAQ section** lower down using the real questions from 1.2-D (GitHub READMEs do rank for question queries).
9. Keep British spelling consistent if you like, but include the American "practice" at least in the H1/description: [V] autocomplete lists both "practice english speaking with ai" and "practise english speaking with ai"; the "practice" form is the main one.
10. Releases: keep publishing tagged releases with notes. A recent `pushed`/release date is a ranking input in GitHub's "best match" and "recently updated" sorts.

---

## 5. Recommendations

### 5.1 English landing page (`/`)

**Primary keyword:** `practice English speaking with AI`
[I] It is the phrase every ranking title uses and Google's autocomplete root. We will not rank for the bare phrase; we rank for it **plus** the qualifiers nobody else has: Claude, open source, desktop.

**Secondary keywords (7):**
1. practice English with Claude
2. AI English tutor (open source)
3. English conversation practice (app)
4. open source language learning app
5. English speaking practice app for PC / Mac / Windows
6. learn English by reading books (app)
7. spaced repetition vocabulary

**Long-tail phrases (15):**
1. practice English conversation with AI
2. learn English with Claude
3. Claude AI English tutor
4. how to use Claude to learn English
5. open source AI English tutor
6. open source AI language tutor
7. AI English speaking partner (free)
8. English speaking practice app for PC free download
9. AI English tutor with your own API key
10. practice English speaking alone at home without a partner
11. how to stop being afraid to speak English
12. advanced English speaking practice (C1)
13. how to learn vocabulary from books
14. how to remember new words from books
15. Speak app alternative / Praktika alternative free (comparison section only)

**`<title>` (59 chars):**
`Practice English Speaking with Claude AI | Ogmios, Free App`

Fallback without the Claude name in the title (60 chars): `Practice English Speaking with AI | Ogmios, Free Desktop App`

**Meta description (151 chars):**
`Free, open-source desktop app to practice English speaking with Claude AI. Feedback after the conversation, not during. Vocabulary from your own books.`

**H1:** `Practice English speaking with AI, without interruptions`

**Sub-headline (first paragraph, answers section 2):** Free, open-source desktop app for macOS and Windows. Talk or type with Claude; nobody corrects you mid-sentence. After the conversation you get one thing to focus on and at most two minor corrections, in your own language. Bring your own Anthropic API key or your own Claude Code.

**H2 outline:**
1. English conversation practice with an AI partner that never corrects you mid-sentence
2. A short report after every conversation: one focus, two minor corrections
3. An error memory that tracks your recurring mistakes (detected → in focus → improving → mastered)
4. Learn English vocabulary from your own books, with spaced repetition
5. Speak or type: speech-to-text runs on your computer
6. Bring your own Claude: Anthropic API key or Claude Code
7. Private by design: your data stays on your machine
8. How Ogmios compares with ChatGPT voice, Duolingo and paid AI tutors
9. Download Ogmios for macOS and Windows (free, open source, AGPL-3.0)
10. Frequently asked questions

**FAQ (10, phrased as real queries; answers must stay within the facts):**
1. Is there a free AI to practice English speaking? (answer honestly: the app is free; Claude usage is paid through your own key)
2. Can I practice English with Claude?
3. How is Ogmios different from practicing English with ChatGPT or Claude directly?
4. Does the AI correct my mistakes while I speak?
5. How do I practice English speaking alone, without a partner?
6. I'm afraid to speak English. Will this help me practise without being judged? (describe the mechanism; promise no outcome)
7. Can I learn English vocabulary from my own books?
8. What is spaced repetition, and how does Ogmios use it?
9. Does Ogmios work on Windows and Mac? Is there a mobile app?
10. Is my voice or my conversation sent anywhere?

### 5.2 Spanish landing page (`/es/`)

**Palabra clave principal:** `practicar inglés con IA`

**Palabras clave secundarias (8):**
1. ia para practicar inglés speaking
2. hablar inglés con ia
3. practicar inglés hablado / practicar speaking
4. conversar en inglés con ia
5. tutor de inglés con ia
6. aprender inglés con Claude
7. aprender inglés leyendo libros (app)
8. app para practicar inglés (para PC)

**Frases de cola larga (15):**
1. practicar conversación en inglés con ia
2. ia para practicar inglés conversacional
3. app para practicar inglés hablando
4. cómo practicar speaking en inglés con ia
5. cómo practicar speaking solo
6. cómo perder el miedo a hablar inglés
7. cómo usar Claude para aprender inglés
8. puedo aprender inglés con Claude
9. programa para aprender inglés en pc
10. mejor ia para practicar inglés (aparecer en comparativas, no posicionar)
11. practicar inglés con ChatGPT (sección comparativa)
12. cómo aprender inglés leyendo libros
13. cómo recordar palabras en inglés
14. app para guardar palabras en inglés
15. repetición espaciada (app)

**`<title>` (57 caracteres):**
`Practicar inglés hablado con IA (Claude) | Ogmios, gratis`

Alternativa (57): `Practicar inglés con IA: conversación con Claude | Ogmios`

**Meta description (152 caracteres):**
`App de escritorio gratuita y de código abierto para practicar inglés hablado con Claude. Feedback al final, no a media frase. Vocabulario de tus libros.`

**H1:** `Practica inglés hablado con IA, sin que te interrumpan`

**Esquema de H2:**
1. Conversación en inglés con una IA que no te corrige a media frase
2. Al terminar, un reporte corto: un foco y dos correcciones menores, en tu idioma
3. Una memoria de errores que sigue tus fallos recurrentes hasta dominarlos
4. Aprende vocabulario en inglés leyendo tus propios libros, con repetición espaciada
5. Habla o escribe: la voz se transcribe en tu computadora
6. Usa tu propio Claude: clave de API de Anthropic o Claude Code
7. Tus datos se quedan en tu equipo
8. En qué se diferencia de ChatGPT, Duolingo y los tutores de IA de pago
9. Descarga Ogmios para Mac y Windows (gratis y de código abierto)
10. Preguntas frecuentes

**Preguntas frecuentes (10):**
1. ¿Cuál es la mejor IA para practicar inglés hablado? (respuesta honesta: depende; para quién sirve Ogmios y para quién no)
2. ¿Ogmios es gratis?
3. ¿Se puede aprender inglés con Claude?
4. ¿En qué se diferencia de practicar inglés con ChatGPT?
5. ¿La IA me corrige mientras hablo?
6. ¿Cómo practicar speaking en inglés solo, sin compañero?
7. ¿Cómo perder el miedo a hablar inglés?
8. ¿Se puede aprender inglés leyendo libros? ¿Puedo usar mis propios libros?
9. ¿Funciona en Windows y Mac? ¿Hay app para el celular?
10. ¿Mi voz o mis conversaciones salen de mi computadora?

[I] Spanish style notes: write neutral Latin American Spanish (tú, never vosotros; this is already a project rule, commit 60cf46e). Use "computadora" on the page; "PC" and "Mac" as the platform words people type. Keep "speaking" as a loanword at least once: it is how users search [V].

### 5.3 schema.org

| Type | Where | Fields (only verifiable ones) |
| --- | --- | --- |
| `SoftwareApplication` | both pages | `name`, `description`, `applicationCategory: "EducationalApplication"`, `operatingSystem: "macOS, Windows"`, `offers: { price: "0", priceCurrency: "USD" }`, `license: https://www.gnu.org/licenses/agpl-3.0.html`, `softwareVersion`, `downloadUrl`, `codeRepository`-style link via `sameAs: https://github.com/ilien-dev/ogmios`, `inLanguage: ["en","es"]`, `isAccessibleForFree: true`, `softwareRequirements: "Anthropic API key or Claude Code"`, `screenshot` |
| `FAQPage` | both pages | the 10 questions, text identical to the visible FAQ. [I] Google restricted FAQ rich results to a narrow set of sites in 2023, so do not expect the expandable SERP feature; the markup still helps Bing and AI answer engines, and 9 of 20 competitor pages use it [V] |
| `WebSite` + `Organization` (or `Person` as publisher) | home | `name`, `url`, `sameAs` GitHub |
| `SoftwareSourceCode` | optional | `codeRepository`, `programmingLanguage`, `license` |
| `BreadcrumbList` | only if more pages are added | |
| `HowTo` | optional, for "how to use Claude to learn English" section | SmallTalk2Me uses HowTo [V] |

**Do not add:** `AggregateRating`, `Review`, `aggregateRating` inside SoftwareApplication. There are no ratings; inventing them violates Google's structured-data policy.

### 5.4 Technical levers that need no backlinks

[I unless marked]
1. **hreflang**, reciprocal, on both pages: `<link rel="alternate" hreflang="en" href="…/">`, `hreflang="es" href="…/es/"`, `hreflang="x-default" href="…/"`. Plus a self-referencing `<link rel="canonical">` on each. Set `<html lang="en">` / `<html lang="es">`.
2. **Static HTML.** Title, description, H1, body text and JSON-LD must be in the served HTML, not injected by JavaScript.
3. **sitemap.xml** with both URLs and `xhtml:link` alternates; **robots.txt** pointing to it. Verify the site in Google Search Console and Bing Webmaster Tools and submit the sitemap.
4. **Open Graph / Twitter card** per language (`og:locale` en_US / es_MX or es_419, `og:image` a real screenshot at 1200×630).
5. **One URL per intent later** (only if you want more surface): `/practice-english-with-claude`, `/learn-english-vocabulary-from-books`, `/es/practicar-ingles-con-claude`, `/es/aprender-ingles-leyendo-libros`. Each is a SERP with no dedicated app today [V, 1.2-C and 1.3-C]. Do not create thin pages; each needs real content and screenshots.
6. **Descriptive anchor and alt text**: download buttons "Download Ogmios for Windows", screenshots with alt text that names what is shown ("Ogmios report after an English conversation: one focus and two minor corrections").
7. **Link the GitHub repo ⇄ site both ways** (repo Website field, README link, site footer). 
8. **GitHub Releases as download target**: release titles like "Ogmios 0.16.0 for macOS and Windows" get indexed.
9. **Fast page**: single static page, system fonts or one self-hosted font, compressed real screenshots (AVIF/WebP), no third-party scripts.

### 5.5 Places to be listed (free, no popularity needed)

| Where | Evidence it matters | Action |
| --- | --- | --- |
| GitHub topics (4.3) | [V] topic pages rank in web search; small topics list us on page 1 immediately | set today |
| **Vuizur/awesome-language-learning** (237 stars, CC0) | [V] ranks #2 on DDG for "open source language learning app"; its "Chatbots" section contains exactly one entry (ChatGPT) | PR adding Ogmios under Chatbots. Note: last push 2025-10-06 and 76 open issues/PRs, so a merge may be slow |
| IgnacioLD/awesome-language-learning (17 stars, pushed 2026-10-30) | [V] active | PR |
| yvoronoy/awesome-english (4,561 stars, pushed 2026-11-10) | [V] top of `topic:learn-english` | PR under tools/apps, if its contribution rules accept apps (not checked) |
| tauri-apps/awesome-tauri (8,177 stars) | [V] exists and is active; lists Tauri apps | PR under Applications (check its inclusion criteria first; not read) |
| yatsyk/awesome-byok-apps (46 stars) | [V] "A curated list of apps you can use with your own AI API key" | PR |
| **AlternativeTo** | [V] its pages rank for "Praktika alternatives", "ELSA Speak alternatives", "Loora free alternatives", "open source Duolingo alternatives". On the Loora free-alternatives page the top open-source suggestion is Artikulate, a pronunciation trainer: the open-source filter is nearly empty in this category | Create the Ogmios entry (licence Open Source, platforms Mac + Windows), then add it as an alternative to Speak, Praktika, Loora, ELSA Speak, Talkpal, Duolingo, LingQ, Readlang |
| LibHunt | [V] "Top 23 language-learning Open-Source Projects" ranks; it is generated from GitHub topics | automatic once topics are set; ranking inside is by stars |
| Product Hunt | [I] standard launch venue; not checked for this category | launch once the landing page and screenshots are ready |
| Hacker News "Show HN", r/languagelearning, r/EnglishLearning, r/opensource, r/ClaudeAI | [V] "reddit" is a top autocomplete modifier (EN), i.e. people look for Reddit threads on this exact question | post once, honestly, following each community's self-promotion rules (not checked) |
| Homebrew cask (already exists as a tap) | [I] | keep; a cask in the official homebrew-cask repo would add a formulae.brew.sh page, but that repo has notability requirements |
| winget / Microsoft Store | [V] Microsoft Store listings rank for "english speaking practice app for pc" queries (EasySpeak, Hello English, 沉浸口语) | consider a winget manifest; a Store listing needs a signed installer |
| Spanish-language Claude tutorials | [V] claudebuilders.es, claudio.academy, soypablocarballo.com rank for "aprender inglés con Claude" | they are the natural places to be mentioned; outreach is optional |

### 5.6 Claims we must NOT make

Everything below is either outside the supplied facts or contradicted by them.

1. **"Free" without qualification.** The app costs nothing; using it requires a paid Anthropic API key or the user's own Claude Code. [V] searchers who type "free/gratis" expect zero cost. Always pair "free" with "bring your own Anthropic API key" in the same sentence or the next. Never "100% free", "totally free", "free forever", "no cost".
2. **Ratings, reviews, testimonials, user counts, download counts, "trusted by", "#1", "best", "most advanced".** None exist. No `AggregateRating`.
3. **Learning outcomes or speed**: "become fluent", "learn X times faster", "proven", "scientifically proven", "guaranteed". The spec cites research for design choices; that does not support outcome claims about Ogmios.
4. **Affiliation with Anthropic.** Say "works with Claude, Anthropic's AI" and add "Ogmios is an independent project, not affiliated with or endorsed by Anthropic." Do not use Anthropic or Claude logos as if official. Do not name the product "Claude English Tutor".
5. **"Use your Claude subscription" as a promise.** The README itself warns that Anthropic may limit subscription use in third-party apps. Say "your own installed Claude Code" and keep the caveat; lead with the API key.
6. **"Offline" or "works without internet".** Speech-to-text is local, but Claude needs a connection.
7. **"Nothing leaves your computer" / "100% private".** Accurate version: audio is transcribed locally and stays local; data is stored locally; the conversation text is sent to Anthropic (API or Claude Code) to generate replies.
8. **Linux.** The spec mentions Linux, but the stated facts and release channel are macOS and Windows. On macOS the README says Apple Silicon: do not imply Intel Macs.
9. **Mobile or web version.** None.
10. **Other target languages.** Target language is English only. "Any native language" refers to the explanations.
11. **Pronunciation scoring, accent training, exam prep (IELTS/TOEFL/Cambridge), CEFR certification or level testing, real-time voice calls, a human-sounding voice.** Not in the facts. (The spec mentions an optional local read-aloud voice; it is not in the fact list, so leave it out of marketing copy until confirmed.)
12. **A price per session as fact.** The README's "$0.20 for 20 minutes" is labelled an estimate. If kept, keep the label and the model name; better to link to Anthropic's pricing.
13. **Book formats beyond what ships.** Code shows EPUB (`src-tauri/src/books/epub.rs`). Do not write "any ebook", "PDF", "Kindle" unless confirmed.
14. **Comparative claims about competitors' quality or prices** that are not sourced on the page. Prices in the spec's table are the author's notes from September 2026, not re-verified here.
15. **"No signup"** needs care: no Ogmios account exists by design (all data local), but an Anthropic account does. Say "no Ogmios account".
16. **Signed/verified installer.** The README says the Windows installer is unsigned and SmartScreen warns. Do not hide it; say it next to the download button.

---

## 6. Priority order

1. Set the GitHub description, topics and Website field (5 minutes; makes the repo findable in topics with 11 to 114 repos immediately).
2. Rewrite the README first screen (H1 with keyword, definition sentence, screenshot, downloads, Books feature, `README.es.md`).
3. Ship the two landing pages with the titles, descriptions, H1/H2, FAQ, JSON-LD and hreflang above.
4. Search Console + Bing Webmaster verification and sitemap.
5. AlternativeTo entry and the awesome-list PRs.
6. Later, only with real content: the per-intent pages in 5.4 item 5.

## 7. Gaps in this research

- No search volumes; no Google SERP positions; no People-also-ask data (see section 0).
- SERPs are from one engine (DuckDuckGo/Bing index) on one day, from one location.
- Contribution rules of the awesome lists, Product Hunt and subreddits were not read.
- Competitor prices were not re-verified.
- Spanish autocomplete was sampled for Mexico (`gl=mx`) and briefly Spain (`gl=es`); the head suggestions were the same in both, with Spain adding exam levels (B1/B2/C1 Cambridge).
