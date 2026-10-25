# Feature: Content reinforcement from NotebookLM dossier

**Objective:** Add more cards, more exercises and per-class theory to every existing deck, using the NotebookLM dossier the user generated from the course sources.

**Problem:** Decks have 4–25 cards and quizzes only 3–10 questions; several decks only have multiple-choice. Concepts are not reinforced enough.

**Why:** The user wants each concept well reinforced, strictly within the topics seen in class.

## Scope
- Source: `sources/notebooklm-dossier-senior5.md` (verbatim copy of the dossier, for provenance).
- Add cards (from the dossier examples) and quiz questions (from its exercises) to the 19 existing decks, plus a `theory` block per class (`unit.json`).
- Topics confirmed in the course notes and included: articles (grammar/articles.md), used to / be used to / get used to (grammar/preferences-and-habits.md), -ed/-ing feelings (vocabulary/feelings.md), judicial process (vocabulary/crime-and-punishment.md).
- Excluded (not in the course notes): adjective order, the + adjective, "The Necklace" comparison, "cyberchondria".

## Constraints
- Existing ids never change; new ids unique (validator enforces).
- Every answer is checked before loading; ambiguous or wrong items are fixed or dropped and listed below.
- EN→ES translations are not loaded as questions (free Spanish text cannot be graded); they may become cards.
- Bump the service worker cache so the new `data.js` reaches the browser.

## Tasks
| ID | Description | Route | Status | Commit |
|----|-------------|-------|--------|--------|
| T0 | Save dossier source + RED test: every thematic quiz ≥ 12 questions incl. typing, every deck ≥ 10 cards | delegated (fork writer) | pending | |
| T1 | Clase 1 decks (passive, causative, impersonal passive, identity theft, Way Up to Heaven) + theory | delegated | pending | |
| T2 | Clase 2 (reporting verbs) + Clase 3 (headlines, media people, media adjectives, connectors) + theory | delegated | pending | |
| T3 | Clase 4 decks (speaking phrases, speaking papers, past modals, should have, would rather, crime vocab, criminals & verbs, rob vs steal, Lamb to the Slaughter) + theory; SW bump | delegated | pending | |

## Acceptance criteria
- `node game/tools/build-content.cjs` passes; `--check` in sync.
- `node --test "game/tests/*.test.cjs"` passes, including the new coverage test.
- Every deck ≥ 10 cards; every thematic quiz ≥ 12 questions with at least one typing question.
- Dropped/fixed items listed in Progress.

## Checks
- `node --test "game/tests/*.test.cjs"`
- `node game/tools/build-content.cjs --check`

## Delivery strategy
ask-on-risk. Mostly data (JSON); authored code is a small test + SW bump.

## Progress
- Branch `feat/content-reinforcement` created from `feat/content-model` (fb102fc).
- T0: dossier saved verbatim to `sources/notebooklm-dossier-senior5.md`; coverage test added to `game/tests/content.test.cjs`.
  - RED observed: `node --test "game/tests/*.test.cjs"` -> 25 pass, 1 fail (coverage: decks under 10 cards, quizzes under 12 questions). Expected red until T3.

## Next step
T1.
