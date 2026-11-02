# Dossier Book — interactive study book for Senior 5

Objective: turn the "Dossier Pedagógico Integral y Guía de Ejercitación Avanzada: Senior 5" (67 pages, 6 modules, 22 lessons) into an interactive, self-graded web book for phone and PC.
Branch: `main` (new repo) · Delivery: ask-on-risk · Test runner: Vitest (unit) + `astro build`.

## Specs

- S1 — Respect the Dossier: same modules, lesson order, titles, examples, exercises and answer key with justification. Source text: `source/dossier.txt`. User: "quiero respetar este Dosier". Theory is the exception (see L6): ultra simple, no filler intro, fixed sections Qué es / Cuándo se usa / Estructura (table with examples) / Reglas / Errores comunes, simplified with NotebookLM from the original sources. User: "la teoria deberia ser ultra sencilla de entender, sin escapar de la fuente original".
- S2 — Each lesson follows the Dossier flow: Theory → Examples → Exercises. User: "me gusta como explica antes, da un ejemplo y luego presenta los ejercicios".
- S3 — Theory must stay at hand while doing exercises (e.g. collapsible panel/drawer). User: "en el proyecto anterior de ingles me mata un poco no tener la teoria a la mano".
- S4 — Zero AI tokens at study time: exercises self-grade from data. Gap-fill and multiple choice are auto-checked; translations show the model answer and the student self-assesses. After answering, show the Dossier's justification.
- S5 — Works on phone and PC, comfortable to read (readable typography, dark mode). Installable/offline is a later task.
- S6 — Content separated from code: each lesson is a content file; one generic engine renders any lesson. Adding a lesson never touches engine code. User: "no quiero mezclar todo... algo limpio y de cero".
- S7 — Progress (answers, lesson completion) saved locally in the browser.
- S8 — Publish inside the existing `ingles-game` repo, same base URL, new path: `https://vazquezjoseluis0508.github.io/ingles-game/dossier/`. User: "en el mismo repo que ya teniamos el otro, es decir en una carpeta nueva [...] que esa una ruta distinta, la misma base de ruta". Source in `dossier-app/`, built site committed to `dossier/` (Pages legacy Jekyll build from `main` root).

## Tasks

| ID | Specs | Route | Status | Commit |
|---|---|---|---|---|
| T1 | S1-S7 | delegated (Sonnet, user request) | done — verifier: no blockers; RDD review unavailable | 8f99dba, 2f2ca70 |
| T2 | S1 | delegated (Sonnet) — convert remaining lessons, module by module | pending | — |
| T3 | S8 | inline — publish in ingles-game repo under /dossier/ | done — live 200, gap item graded on live page | 49b6d09, f646c5a |
| T4 | S6 | delegated (Haiku, user request) — README + content authoring guide | done | docs commit |
| T5 | S5 | later — PWA/offline | pending | — |

T1 scope: Astro scaffold, engine, Module I lesson 1.1 Passive Voice only.

## Log

- L1 (2026-11-01, user, verbatim): "me gusta la explicacion de este Dossier pedagojico, pero no tengo impresora para imprimir en un papel para hacer los ejercicios y o leerlos, y si me pongo a escribir no termino mas y quiero poder hacer estos ejercicios , me gusta como explica antes, da un ejemplo y luego presenta los ejercicios. esa forma me gusta y me parece atractiva. ahora, tengo mi celu y la compu para ayudarme, no quiero gastar tokens de AI, y estoy pensando en un nuevo sistema aparte , o tal ves un una nueva pagina web, para hacer esto, tipo libro de practica y estudio. me gustaria aprobechar las pantallas que es donde paso la mayor parte del dia ( aunque no me gusta ) el objetivo es aprender, y sentirme comodo estudiando, practicando los ejercicios. en el proyecto anterior de ingles me mata un poco no tener la teoria a la mano. [...] quiero que tu seas mi programador sr, ingeniero y mano derecha, el que orqueste a claude sonnet para programar y a haiku para documentar, de esa forma gastamos menos."
- L2 (2026-11-01, user): "tal ves algo limpio y de cero sea la mejor opcion [...] quiero respetar este Dosier. es como que quiero completar esto sin tener impresora y sin copiar todo, simplemente tenerlo asi como digiste, tipo libro interactivo, para resolver, que me ayude... a aprender". Deploy: GitHub Actions.
- L3: Decision — new repo `ingles-dossier`, Astro, separate from `ingles-game` (whose `app.js` is a 1529-line monolith). Dossier structure: each lesson = theory, examples, exercises (A gap-fill, B multiple choice, C translation), answer key with justification.
- L4 (2026-11-01): T1 verified by independent Sonnet verifier: S1-S4, S6-S8 pass, S5 not checked in browser. npm test 11/11, build OK. RDD: first commit exceeded lens context budget (lockfile + source text) → split into scaffold + engine commits; engine review granted by user but reviewer unavailable (`claude` CLI not in PATH). Advisories for later: duplicate heading ids (theory rendered twice), index-based progress keys, contractions must be listed in `answers`, `answer` index not bounded by schema. CI pinned to Node 24.
- L5 (2026-11-01, user, verbatim): "naa, no hagas tanto lio.. de ultima subilo y le cambiamos la ruta.. en el mismo repo que ya teniamos el otro, es decir en una carpeta nueva pienso.. no se, que esa una ruta distinta, la misma base de ruta". Moved source to `dossier-app/` in ingles-game (separate repo `Documents/ingles-dossier` left local, unused). GitHub Actions dropped: Pages uses legacy Jekyll from `main` root, so Astro builds to `../dossier` with `build.assets: "assets"`, and the lesson script lives in `LessonScript.astro` — Jekyll drops files/folders starting with "_".
- L6 (2026-11-02, user, verbatim excerpt): "primero eliminemos el ruido que no ayuda al alumno a aprender... y lo lleva solo a perder tiempo de lectura [...] la tabla de tiempo verbal + estructura fue de lo poco que me gusto [...] y a la seccion de reglas. la teoria deberia ser ultra sencilla de entender, sin escapar de la fuente original." Decision: theory re-generated per topic in NotebookLM with a fixed-format prompt; examples and exercises stay from the Dossier. Lesson 1.1 theory replaced (intro and "Marco Teórico" removed, articles rules kept). NotebookLM's causative-have and impersonal-passive parts belong to 1.2 and 1.3 (T2). Next prompts: one Dossier lesson per topic, "Cubrí SOLO este tema".
