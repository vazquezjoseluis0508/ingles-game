#!/usr/bin/env node
// Builds game/data.js from the source of truth in game/content/.
//
//   node game/tools/build-content.cjs          validate + write game/data.js
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

function unitOutput(u) {
  const { quizzes, ...rest } = u.data;
  return rest;
}

function buildDataJs(data) {
  return `${HEADER}\nwindow.GAME_DATA = ${JSON.stringify(data, null, 2)};\n`;
}

function main(argv) {
  const content = loadContent();
  const out = buildDataJs(buildData(content));
  fs.writeFileSync(DATA_JS, out, 'utf8');
  console.log(`Wrote ${path.relative(process.cwd(), DATA_JS)} (${content.units.length} units).`);
  return 0;
}

module.exports = { loadContent, buildData, buildDataJs, CONTENT_DIR, DATA_JS };

if (require.main === module) process.exitCode = main(process.argv.slice(2));
