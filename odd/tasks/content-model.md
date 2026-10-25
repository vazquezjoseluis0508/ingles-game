# Feature: Content model (content/ per class, theory with images, validation)

**Objective:** Move all game content out of the hand-edited `game/data.js` into per-class files under `game/content/`, validated by a build script that generates `game/data.js`, and add a theory screen with class images.

**Problem:** Adding a class today means editing a 1.4k-line JS file; there is no place for theory or class photos, and nothing validates the data.

**Why:** The user adds content from the PC after each class (decision: files in the repo, not Supabase). NotebookLM summaries/exercises will be converted into these files. Supabase (Phase B) comes later, only for accounts and progress sync.

## Scope
- `game/content/` is the source of truth; `game/data.js` becomes a generated file (do not edit by hand).
- One folder per class (unit): `game/content/<unitId>/unit.json` + `images/`.
- Build script validates and generates `game/data.js` (keeps `file://` working and the app loading code unchanged).
- Theory screen per class showing summary text and images.

## Constraints
- Card, deck, quiz and question ids MUST stay identical (progress in localStorage is keyed by them).
- Generated `window.GAME_DATA` must deep-equal the current one after migration (same order).
- No npm dependencies; Node built-ins only. Vanilla JS app stays framework-free.
- `conversations.js` is out of scope.

## Tasks
| ID | Description | Route | Status | Commit |
|----|-------------|-------|--------|--------|
| T1 | Migration: split current `data.js` into `game/content/`; build script regenerates `data.js`; deep-equal check | delegated (writer: 2+ non-trivial files) | done | 42b3293 |
| T2 | Validation: schema checks (required fields, unique ids, quiz types/answers, deck refs, image files exist) + `--check` sync mode + node tests | delegated | done | 3d4c87f | |
| T3 | Theory: `theory` block in `unit.json`, theory screen in unit view, SW cache bump, `game/content/README.md` guide | delegated | done | |

## Acceptance criteria
- `node game/tools/build-content.cjs` regenerates `game/data.js` from `game/content/`; output deep-equals the pre-migration data.
- Invalid content fails the build with a clear message (file + field).
- `node --test game/tests/` passes, including a sync test (generated data.js matches content).
- A class with `theory` shows a "Teoría" entry with its images; classes without theory are unaffected.

## Checks
- `node --test "game/tests/*.test.cjs"` (Node 24: the bare directory form fails)
- `node game/tools/build-content.cjs --check`

## Delivery strategy
ask-on-risk. Forecast: migration moves ~1.4k lines of data (mostly generated/moved, not authored); authored code ~400–600 lines.

## Progress
- Branch `feat/content-model` created from `main` (21b363f).
- T1: one-shot migration (scratchpad script, not committed) split `data.js` into `game/content/{meta.json,final-exam.json,claseN/unit.json}`. Thematic quizzes live in their unit's `unit.json` (`quizzes` array, stripped from the generated unit); the global quiz order is kept via `meta.json` `quizOrder` (quizzes not listed are appended in unit order). Units are ordered by `date` (tie: folder name). Card-field docs moved to `game/content/README.md`.
  - Deep-equal: regenerated `GAME_DATA` vs original saved JSON -> `assert.deepStrictEqual` OK; `JSON.stringify` output identical too (key order preserved).
  - `node --test "game/tests/*.test.cjs"` -> 12 pass, 0 fail.
  - Note: on Node 24, `node --test game/tests/` fails (the directory is resolved as a module path); use the glob form `node --test "game/tests/*.test.cjs"`.
- T2: `validate(content)` in `game/tools/build-content.cjs` collects all errors as `<file>: <field path> <problem>` and the CLI exits 1. Rules derived from current data: required non-empty strings for unit (id, name, date YYYY-MM-DD, emoji; id must equal folder name), deck (id, name, emoji, color, description, cards), card (id, en, es, note, emoji, tag), quiz (id, name, emoji, description, difficulty, deckId, questions), question (id, type, prompt, correct, explanation, points > 0); `type` in gap-fill/multiple-choice/typing; gap-fill and multiple-choice need >= 2 options containing `correct` (typing may carry `options: []`, as 12 current questions do); quiz `deckId` and final-exam question `deckId` must reference an existing deck; `meta.quizOrder` ids must exist. Ids are unique globally across units, decks, cards, quizzes and questions (verified: 326 ids, 0 collisions today). `--check` validates and compares with `data.js` (CRLF-normalized, since git autocrlf is on) without writing.
  - RED observed: `node --test game/tests/content.test.cjs` -> 1 pass, 8 fail before `validate`/`--check` existed.
  - GREEN: `node --test "game/tests/*.test.cjs"` -> 21 pass, 0 fail. `node game/tools/build-content.cjs --check` -> exit 0; appending a line to data.js -> exit 1 "out of sync".
- T3: optional `theory` block (`summary` and/or `images[{file, caption?}]`) in `unit.json`; validation requires image paths relative to the unit folder (no `..`, absolute or backslash paths) and existing files; the build rewrites `images/x.jpg` to `content/<unit>/images/x.jpg`. `renderUnitView` shows a "📖 Teoría" button only when the unit has theory; `renderTheory(id)` renders escaped summary (blank line = paragraph, newline = `<br>`, `**bold**`), lazy images with captions and "← Volver" to the class. Minimal CSS in `styles.css`. SW cache -> `s5-game-v4-content` (images runtime-cached by the existing cache-first handler, not in ASSETS); `README-servidor.md` updated. `game/content/README.md` documents layout, fields, theory and the add-a-class steps. No unit has theory yet (no content invented, no placeholder images).
  - RED observed: 3 new theory tests failed before implementation (the "no theory -> no button" test passed, as a regression guard).
  - GREEN: `node --test "game/tests/*.test.cjs"` -> 25 pass, 0 fail. `node game/tools/build-content.cjs --check` -> exit 0. Deep-equal vs pre-migration data still OK.

## Next step
User review; push / PR are user decisions.
