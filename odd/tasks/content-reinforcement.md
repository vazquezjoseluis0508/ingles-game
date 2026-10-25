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
| T0 | Save dossier source + RED test: every thematic quiz ≥ 12 questions incl. typing, every deck ≥ 10 cards | delegated (fork writer) | done | d566e78 |
| T1 | Clase 1 decks (passive, causative, impersonal passive, identity theft, Way Up to Heaven) + theory | delegated | done | (this commit) |
| T2 | Clase 2 (reporting verbs) + Clase 3 (headlines, media people, media adjectives, connectors) + theory | delegated | done | (this commit) |
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

- T1 (clase1): cards / questions added — passive-voice +15 / +10 (23 cards, 15 Q), causative-have +10 / +11 (18, 16), impersonal-passive +11 / +11 (19, 16), identity-theft-vocab +9 / +10 (16, 14), story-way-up-to-heaven +9 / +9 (16, 13). Theory block added to clase1.
  - Dropped: identity theft MC3 ("malicious fraud software", wrong) and everything about cyberchondria (not in course notes); Way Up gap 1 (flight/train ambiguous), gaps 4-5 and MC3/MC5 (adjective order, the + adjective), MC4 ("The Necklace"); Way Up examples 5 and 8 (story details not verifiable in course notes); causative MC3 ("had got ... compromised", unnatural); passive translation 2 (too many valid phrasings); all EN→ES translations.
  - Fixed: passive gap 5 also accepts "will be informed"; Way Up gap 2 accepts "delay" or "torment"; Way Up example 6 translation ("metallic") and example 9 ("a elegant") rewritten; several ES→EN translations turned into cards.
  - Added within the material (not in the dossier) to reach 12+ questions: Way Up "pleasure", "late", "faint noise" and two vocab typing items; identity theft "security breach"/"scammer" typing.
  - Test fix: the "no theory -> no button" test now deletes clase1 theory in its fixture (clase1 now has theory).
  - Checks: `build-content.cjs` valid + `--check` in sync; `node --test "game/tests/*.test.cjs"` -> 25 pass, 1 fail (coverage, expected until T3; remaining thin decks are in clase2-4).

- T2 (clase2 + clase3): reporting-verbs +10 / +12 (22 cards, 17 Q), headlines +6 / +15 (14, 18), media-people +7 / +12 (16, 15), media-adjectives +8 / +9 (13, 12), writing-connectors +3 / +10 (13, 14). Theory blocks added to clase2 and clase3.
  - Course notes checked (writings/structures.md, vocabulary/media-and-journalism.md, grammar/reporting-and-impersonal-passive.md). Out of the course lists, so dropped: connectors although / even though / despite / in spite of / furthermore / as well as / consequently / therefore / owing to / due to (all of dossier 3.3 exercises except the However/Nevertheless gap); media adjectives unreliable / outdated (gap 5, MC2, MC5, examples 6-7); media people correspondent, sub-editor, recruitment advisor (examples 8-10); reporting verb warn (example 2).
  - Fixed: "sensationalist" changed to the course word "sensational"; reporting MC1 uses advise instead of warn; headline gap 2 accepts "has been discovered", gap 4 accepts "found"; media-people gap 1 accepts paparazzo / paparazzi.
  - Written within course connectors (dossier sentences reused): 10 writing-connector questions and 3 cards. Added course headline words axe / quiz / row / vow / bid as questions.
  - quality.test caught 3 typing prompts exposing the answer (rv-q7, headlines-q6, headlines-q10): rv-q7 prompt reworded, the two headline items turned into gap-fill.
  - Checks: build valid + `--check` in sync; tests -> 25 pass, 1 fail (coverage, expected until T3).

## Next step
T3.
