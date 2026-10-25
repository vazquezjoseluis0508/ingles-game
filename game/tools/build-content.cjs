#!/usr/bin/env node
// Builds game/data.js from the source of truth in game/content/.
//
//   node game/tools/build-content.cjs          validate + write game/data.js
//   node game/tools/build-content.cjs --check  validate + fail if game/data.js is
//                                              out of sync (writes nothing)
//
// Node built-ins only (no npm dependencies).
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const GAME_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(GAME_DIR, 'content');
const DATA_JS = path.join(GAME_DIR, 'data.js');

const HEADER = `// ============================================================
//  GENERATED FILE — DO NOT EDIT BY HAND.
//  Generated from game/content/ by game/tools/build-content.cjs.
//  To change content, edit the JSON files in game/content/
//  (see game/content/README.md) and run:
//    node game/tools/build-content.cjs
// ============================================================
`;

function readJson(file, rel) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new Error(`${rel}: invalid JSON (${err.message})`);
  }
}

// Reads every content file. Returns raw objects plus their file labels
// (relative to game/, e.g. "content/clase1/unit.json") for error messages.
function loadContent(contentDir = CONTENT_DIR) {
  const rel = (...p) => ['content', ...p].join('/');
  const meta = { file: rel('meta.json'), data: readJson(path.join(contentDir, 'meta.json'), rel('meta.json')) };
  const finalExam = { file: rel('final-exam.json'), data: readJson(path.join(contentDir, 'final-exam.json'), rel('final-exam.json')) };
  const units = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(contentDir, e.name, 'unit.json')))
    .map((e) => ({ dir: e.name, file: rel(e.name, 'unit.json'), data: readJson(path.join(contentDir, e.name, 'unit.json'), rel(e.name, 'unit.json')) }));
  return { contentDir, meta, finalExam, units };
}

// Units are ordered chronologically by `date` (ties broken by folder name).
function sortedUnits(units) {
  return units.slice().sort((a, b) => String(a.data.date).localeCompare(String(b.data.date)) || a.dir.localeCompare(b.dir));
}

// Assembles the window.GAME_DATA object from loaded content.
function buildData(content) {
  const units = sortedUnits(content.units);
  const quizzes = units.flatMap((u) => u.data.quizzes || []);
  const order = content.meta.data.quizOrder || [];
  const rank = (q) => { const i = order.indexOf(q.id); return i === -1 ? order.length : i; };
  // Stable sort: quizzes listed in meta.quizOrder first, the rest keep unit order.
  const orderedQuizzes = quizzes.map((q, i) => ({ q, i })).sort((a, b) => rank(a.q) - rank(b.q) || a.i - b.i).map((x) => x.q);
  const { version, exam } = content.meta.data;
  return {
    version,
    exam,
    units: units.map((u) => unitOutput(u)),
    quizzes: orderedQuizzes,
    finalExam: content.finalExam.data,
  };
}

// Strips unit-local quizzes (they go to GAME_DATA.quizzes) and rewrites theory
// image paths from unit-relative ("images/x.jpg") to game/-relative
// ("content/clase1/images/x.jpg") so index.html can load them.
function unitOutput(u) {
  const { quizzes, ...rest } = u.data;
  if (isObject(rest.theory) && Array.isArray(rest.theory.images)) {
    rest.theory = {
      ...rest.theory,
      images: rest.theory.images.map((img) => ({ ...img, file: `content/${u.dir}/${img.file}` })),
    };
  }
  return rest;
}

function buildDataJs(data) {
  return `${HEADER}\nwindow.GAME_DATA = ${JSON.stringify(data, null, 2)};\n`;
}

// ------------------------------------------------------------
//  Validation
// ------------------------------------------------------------
const QUESTION_TYPES = ['gap-fill', 'multiple-choice', 'typing'];
const OPTION_TYPES = ['gap-fill', 'multiple-choice'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isText = (v) => typeof v === 'string' && v.trim() !== '';
const join = (base, key) => (typeof key === 'number' ? `${base}[${key}]` : base ? `${base}.${key}` : key);

// Returns an array of error strings: "<file>: <field path> <problem>".
// Collects every error instead of stopping at the first one.
function validate(content, { fileExists = fs.existsSync } = {}) {
  const errors = [];
  const ids = new Map(); // id -> "file: path" where first seen (ids are unique across all kinds)
  const decks = new Set();
  const deckRefs = []; // checked after all decks are known
  const quizIds = new Set();

  const ctx = (file) => {
    const err = (p, msg) => errors.push(`${file}: ${p} ${msg}`);
    const requireText = (obj, base, keys) => {
      for (const k of keys) if (!isText(obj[k])) err(join(base, k), 'is required');
    };
    const requireArray = (obj, base, key) => {
      const v = obj[key];
      if (!Array.isArray(v) || v.length === 0) { err(join(base, key), 'is required (non-empty array)'); return []; }
      return v;
    };
    const claimId = (obj, base) => {
      if (!isText(obj.id)) return; // reported by requireText
      const here = `${file}: ${join(base, 'id')}`;
      if (ids.has(obj.id)) err(join(base, 'id'), `"${obj.id}" is duplicated (first used in ${ids.get(obj.id)})`);
      else ids.set(obj.id, here);
    };
    const checkQuestion = (q, base, { deckIdRequired }) => {
      if (!isObject(q)) return err(base, 'must be an object');
      requireText(q, base, ['id', 'type', 'prompt', 'correct', 'explanation']);
      claimId(q, base);
      if (!(typeof q.points === 'number' && q.points > 0)) err(join(base, 'points'), 'must be a positive number');
      if (isText(q.type) && !QUESTION_TYPES.includes(q.type)) err(join(base, 'type'), `"${q.type}" must be one of ${QUESTION_TYPES.join(', ')}`);
      if (q.options !== undefined && !(Array.isArray(q.options) && q.options.every(isText))) err(join(base, 'options'), 'must be an array of non-empty strings');
      if (OPTION_TYPES.includes(q.type)) {
        if (!Array.isArray(q.options) || q.options.length < 2) err(join(base, 'options'), `is required (at least 2) for type "${q.type}"`);
        else if (isText(q.correct) && !q.options.includes(q.correct)) err(join(base, 'correct'), `"${q.correct}" is not one of options`);
      }
      if (q.variations !== undefined && !(Array.isArray(q.variations) && q.variations.every(isText))) err(join(base, 'variations'), 'must be an array of non-empty strings');
      if (q.deckId !== undefined || deckIdRequired) {
        if (!isText(q.deckId)) err(join(base, 'deckId'), 'is required');
        else deckRefs.push({ err, path: join(base, 'deckId'), deckId: q.deckId });
      }
    };
    const checkQuiz = (quiz, base, { isFinal }) => {
      if (!isObject(quiz)) return err(base || 'quiz', 'must be an object');
      requireText(quiz, base, ['id', 'name', 'emoji', 'description', 'difficulty']);
      claimId(quiz, base);
      if (isText(quiz.id)) quizIds.add(quiz.id);
      if (!isFinal) {
        if (!isText(quiz.deckId)) err(join(base, 'deckId'), 'is required');
        else deckRefs.push({ err, path: join(base, 'deckId'), deckId: quiz.deckId });
      }
      requireArray(quiz, base, 'questions').forEach((q, i) => checkQuestion(q, join(join(base, 'questions'), i), { deckIdRequired: isFinal }));
    };
    return { err, requireText, requireArray, claimId, checkQuiz };
  };

  // meta.json
  {
    const { file, data } = content.meta;
    const c = ctx(file);
    if (!isObject(data)) c.err('(root)', 'must be an object');
    else {
      if (typeof data.version !== 'number') c.err('version', 'must be a number');
      if (!isObject(data.exam) || !isText(data.exam.name)) c.err('exam.name', 'is required');
      if (data.quizOrder !== undefined && !(Array.isArray(data.quizOrder) && data.quizOrder.every(isText))) c.err('quizOrder', 'must be an array of quiz ids');
    }
  }

  // Units
  const unitIds = new Set();
  for (const u of sortedUnits(content.units)) {
    const c = ctx(u.file);
    const data = u.data;
    if (!isObject(data)) { c.err('(root)', 'must be an object'); continue; }
    c.requireText(data, '', ['id', 'name', 'date', 'emoji']);
    c.claimId(data, '');
    if (isText(data.id)) {
      unitIds.add(data.id);
      if (data.id !== u.dir) c.err('id', `"${data.id}" must match its folder name "${u.dir}"`);
    }
    if (isText(data.date) && !DATE_RE.test(data.date)) c.err('date', `"${data.date}" must be YYYY-MM-DD`);
    c.requireArray(data, '', 'decks').forEach((deck, di) => {
      const base = join('decks', di);
      if (!isObject(deck)) return c.err(base, 'must be an object');
      c.requireText(deck, base, ['id', 'name', 'emoji', 'color', 'description']);
      c.claimId(deck, base);
      if (isText(deck.id)) decks.add(deck.id);
      c.requireArray(deck, base, 'cards').forEach((card, ci) => {
        const cb = join(join(base, 'cards'), ci);
        if (!isObject(card)) return c.err(cb, 'must be an object');
        c.requireText(card, cb, ['id', 'en', 'es', 'note', 'emoji', 'tag']);
        c.claimId(card, cb);
      });
    });
    if (data.theory !== undefined) checkTheory(c, data.theory, path.join(content.contentDir, u.dir), fileExists);
    if (data.quizzes !== undefined) {
      if (!Array.isArray(data.quizzes)) c.err('quizzes', 'must be an array');
      else data.quizzes.forEach((quiz, qi) => c.checkQuiz(quiz, join('quizzes', qi), { isFinal: false }));
    }
  }

  // final-exam.json
  ctx(content.finalExam.file).checkQuiz(content.finalExam.data, '', { isFinal: true });

  // Cross references
  for (const ref of deckRefs) if (!decks.has(ref.deckId)) ref.err(ref.path, `references unknown deck "${ref.deckId}"`);
  const order = isObject(content.meta.data) && Array.isArray(content.meta.data.quizOrder) ? content.meta.data.quizOrder : [];
  order.forEach((id, i) => { if (!quizIds.has(id)) errors.push(`${content.meta.file}: quizOrder[${i}] references unknown quiz "${id}"`); });

  return errors;
}

// Optional unit theory: { summary?: string, images?: [{ file, caption? }] }.
function checkTheory(c, theory, unitDir, fileExists) {
  if (!isObject(theory)) return c.err('theory', 'must be an object');
  if (theory.summary !== undefined && !isText(theory.summary)) c.err('theory.summary', 'must be a non-empty string');
  if (theory.images === undefined) {
    if (theory.summary === undefined) c.err('theory', 'needs a summary or images');
    return;
  }
  if (!Array.isArray(theory.images)) return c.err('theory.images', 'must be an array');
  theory.images.forEach((img, i) => {
    const base = `theory.images[${i}]`;
    if (!isObject(img)) return c.err(base, 'must be an object');
    if (img.caption !== undefined && typeof img.caption !== 'string') c.err(`${base}.caption`, 'must be a string');
    if (!isText(img.file)) return c.err(`${base}.file`, 'is required');
    const parts = img.file.split(/[\\/]/);
    if (path.isAbsolute(img.file) || img.file.includes('\\') || parts.includes('..') || parts.includes('.')) {
      return c.err(`${base}.file`, `"${img.file}" must be a relative path inside the unit folder`);
    }
    if (!fileExists(path.join(unitDir, img.file))) c.err(`${base}.file`, `"${img.file}" does not exist`);
  });
}

// ------------------------------------------------------------
//  CLI
// ------------------------------------------------------------
function main(argv) {
  const check = argv.includes('--check');
  let content;
  try {
    content = module.exports.loadContent();
  } catch (err) {
    console.error(err.message);
    return 1;
  }
  const errors = validate(content);
  if (errors.length) {
    console.error(`Content has ${errors.length} error(s):`);
    for (const e of errors) console.error(`  ${e}`);
    return 1;
  }
  const out = buildDataJs(buildData(content));
  const rel = path.relative(process.cwd(), DATA_JS);
  if (check) {
    const current = fs.existsSync(DATA_JS) ? fs.readFileSync(DATA_JS, 'utf8').replace(/\r\n/g, '\n') : '';
    if (current !== out) {
      console.error(`${rel} is out of sync with game/content/. Run: node game/tools/build-content.cjs`);
      return 1;
    }
    console.log(`Content valid; ${rel} is in sync.`);
    return 0;
  }
  fs.writeFileSync(DATA_JS, out, 'utf8');
  console.log(`Content valid; wrote ${rel} (${content.units.length} units).`);
  return 0;
}

module.exports = { loadContent, validate, buildData, buildDataJs, main, CONTENT_DIR, DATA_JS };

if (require.main === module) process.exitCode = main(process.argv.slice(2));
