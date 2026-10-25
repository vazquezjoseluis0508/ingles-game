const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const build = require('../tools/build-content.cjs');

const SCRIPT = path.resolve(__dirname, '..', 'tools', 'build-content.cjs');
// Fresh, deep-cloned content each call so fixtures can be mutated freely.
const content = () => { const c = build.loadContent(); return { ...c, ...JSON.parse(JSON.stringify({ meta: c.meta, finalExam: c.finalExam, units: c.units })) }; };
const unit = (c, id) => c.units.find((u) => u.dir === id);
const errorsOf = (c) => build.validate(c);
const assertError = (errors, expected) => assert.ok(errors.includes(expected), `Expected error:\n  ${expected}\nGot:\n  ${errors.join('\n  ')}`);

test('current content validates clean', () => {
  assert.deepEqual(errorsOf(content()), []);
});

test('generated output equals the committed data.js (sync)', () => {
  const generated = build.buildDataJs(build.buildData(build.loadContent()));
  const committed = fs.readFileSync(build.DATA_JS, 'utf8').replace(/\r\n/g, '\n');
  assert.equal(generated, committed, 'game/data.js is out of sync: run node game/tools/build-content.cjs');
});

test('--check exits 0 when in sync and writes nothing', () => {
  const before = fs.statSync(build.DATA_JS).mtimeMs;
  const r = spawnSync(process.execPath, [SCRIPT, '--check'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.equal(fs.statSync(build.DATA_JS).mtimeMs, before);
});

test('missing required field names file and field path', () => {
  const c = content();
  delete unit(c, 'clase1').data.decks[0].cards[3].es;
  assertError(errorsOf(c), 'content/clase1/unit.json: decks[0].cards[3].es is required');
});

test('duplicate card id is reported with both locations', () => {
  const c = content();
  unit(c, 'clase2').data.decks[0].cards[0].id = 'pv01';
  assertError(errorsOf(c), 'content/clase2/unit.json: decks[0].cards[0].id "pv01" is duplicated (first used in content/clase1/unit.json: decks[0].cards[0].id)');
});

test('option-based question whose correct answer is not in options is rejected', () => {
  const c = content();
  const q = unit(c, 'clase1').data.quizzes.find((x) => x.questions[0].type !== 'typing').questions[0];
  q.correct = 'not an option';
  const qi = unit(c, 'clase1').data.quizzes.findIndex((x) => x.questions[0] === q);
  assertError(errorsOf(c), `content/clase1/unit.json: quizzes[${qi}].questions[0].correct "not an option" is not one of options`);
});

test('unknown deckId in a quiz and in a final exam question is rejected', () => {
  const c = content();
  unit(c, 'clase1').data.quizzes[0].deckId = 'nope';
  c.finalExam.data.questions[2].deckId = 'ghost-deck';
  const errors = errorsOf(c);
  assertError(errors, 'content/clase1/unit.json: quizzes[0].deckId references unknown deck "nope"');
  assertError(errors, 'content/final-exam.json: questions[2].deckId references unknown deck "ghost-deck"');
});

test('unknown question type is rejected', () => {
  const c = content();
  c.finalExam.data.questions[0].type = 'essay';
  assertError(errorsOf(c), 'content/final-exam.json: questions[0].type "essay" must be one of gap-fill, multiple-choice, typing');
});

test('CLI prints errors and exits 1 on invalid content', () => {
  const r = spawnSync(process.execPath, ['-e', `
    const b = require(${JSON.stringify(SCRIPT)});
    const orig = b.loadContent;
    b.loadContent = () => { const c = orig(); delete c.units[0].data.name; return c; };
    process.exitCode = b.main(['--check']);
  `], { encoding: 'utf8' });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /content\/clase1\/unit\.json: name is required/);
});

// ------------------------------------------------------------
//  Theory (optional per unit)
// ------------------------------------------------------------
const vm = require('node:vm');
const THEORY = { summary: 'Passive = **be** + pp.\n<script>x</script>', images: [{ file: 'images/board.jpg', caption: 'Pizarrón <b>1</b>' }] };

test('theory image paths are emitted relative to game/ and missing files are rejected', () => {
  const c = content();
  unit(c, 'clase1').data.theory = JSON.parse(JSON.stringify(THEORY));
  assertError(build.validate(c), 'content/clase1/unit.json: theory.images[0].file "images/board.jpg" does not exist');
  assert.deepEqual(build.validate(c, { fileExists: () => true }), []);
  const out = build.buildData(c).units.find((u) => u.id === 'clase1').theory;
  assert.equal(out.images[0].file, 'content/clase1/images/board.jpg');
  assert.equal(out.summary, THEORY.summary);
});

test('theory image file must be a relative path inside the unit folder', () => {
  const c = content();
  unit(c, 'clase1').data.theory = { images: [{ file: '../clase2/x.jpg' }] };
  assertError(build.validate(c, { fileExists: () => true }), 'content/clase1/unit.json: theory.images[0].file "../clase2/x.jpg" must be a relative path inside the unit folder');
});

// Minimal DOM harness that lets a test inject units before app.js reads GAME_DATA.
async function appWith(mutate) {
  const root = path.resolve(__dirname, '..');
  const els = new Map();
  const el = (id) => { if (!els.has(id)) els.set(id, { innerHTML: '', value: '', focus() {}, classList: { add() {}, remove() {} } }); return els.get(id); };
  const store = new Map();
  const c = vm.createContext({ window: {}, console, Date, Math, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    document: { querySelector: el, getElementById: (id) => el('#' + id), querySelectorAll: () => [], createElement: () => ({ style: {}, remove() {} }), body: { appendChild() {} } },
    localStorage: { getItem: (k) => store.get(k) || null, setItem: (k, v) => store.set(k, v) }, alert() {}, confirm: () => false });
  vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), c);
  mutate(c.window.GAME_DATA);
  for (const f of ['store.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), c, { filename: f });
  await new Promise((resolve) => setImmediate(resolve)); // let app.js load state
  return { run: (s) => vm.runInContext(s, c), html: () => el('#app').innerHTML };
}

test('a unit with theory shows the Teoría button and an escaped theory screen', async () => {
  const h = await appWith((d) => { d.units[0].theory = { ...THEORY, images: [{ file: 'content/clase1/images/board.jpg', caption: 'Pizarrón <b>1</b>' }] }; });
  h.run("renderUnitView('clase1')");
  assert.match(h.html(), /<button[^>]*onclick="renderTheory\('clase1'\)"[^>]*>📖 Teoría<\/button>/);
  h.run("renderTheory('clase1')");
  const html = h.html();
  assert.match(html, /<strong>be<\/strong>/);
  assert.match(html, /&lt;script&gt;x&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>|<b>1<\/b>/);
  assert.match(html, /<img[^>]*src="content\/clase1\/images\/board\.jpg"[^>]*loading="lazy"/);
  assert.match(html, /Pizarrón &lt;b&gt;1&lt;\/b&gt;/);
  assert.match(html, /onclick="renderUnitView\('clase1'\)"[^>]*>← Volver/);
});

test('a unit without theory shows no Teoría button', async () => {
  const h = await appWith(() => {});
  h.run("renderUnitView('clase1')");
  assert.doesNotMatch(h.html(), /Teoría/);
});
