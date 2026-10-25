// ============================================================
//  Senior 5 — Lógica del juego
//  Modos: Aprender (flashcards), Practicar (opción múltiple + escribir),
//         Repasar (repetición espaciada - Leitner).
//  Fase 1: typing, audio (TTS), corazones/vidas + meta diaria.
// ============================================================

const DATA = window.GAME_DATA;
let state = null;          // progreso persistido
let session = null;        // sesión de juego en curso

const $ = (sel) => document.querySelector(sel);
const app = () => $("#app");

// ---------- utilidades ----------
const todayStr = () => new Date().toISOString().slice(0, 10);
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString(); };
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
const allDecks = () => DATA.units.flatMap((u) => u.decks);
const allCards = () => allDecks().flatMap((d) => d.cards.map((c) => ({ ...c, deckId: d.id })));
const deckById = (id) => allDecks().find((d) => d.id === id);
const jsAttr = (v) => JSON.stringify(v).replace(/"/g, "&quot;"); // seguro dentro de onclick="..."
const cardState = (id) => state.cards[id] || { box: 1, due: addDays(-1), seen: 0, correct: 0, wrong: 0 };
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Intervalos Leitner por caja (días)
const BOX_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };
const START_HEARTS = 5;

// Progreso granular de un mazo: se mueve desde el primer acierto.
function deckProgress(cards) {
  let sum = 0, mastered = 0, started = 0;
  for (const c of cards) {
    const cs = cardState(c.id);
    sum += (cs.box - 1) / 4;
    if (cs.box >= 4) mastered++;
    if (cs.seen > 0 || cs.box > 1) started++;
  }
  return { pct: Math.round((sum / cards.length) * 100), mastered, started };
}

async function persist() { await Store.save(state); }

// ============================================================
//  QUIZ Mode (T3-T9)
// ============================================================
const allQuizzes = () => DATA.quizzes || [];  // Solo 19 quizzes tematicos (excluye final-exam)
const finalExam = () => DATA.finalExam || null;  // Quiz final integral, separado
const quizById = (id) => allQuizzes().find((q) => q.id === id);
const quizState = (id) => (state.quizzes && state.quizzes[id]) || { completed: 0, totalAttempts: 0, bestScore: 0, passed: false, attempts: [] };
const QUIZ_POINTS_PER_Q = 10;

function difficultyEmoji(d) {
  if (d === "easy") return "🟢"; if (d === "medium") return "🟡"; if (d === "hard") return "🔴"; return "❓";
}

function quizzesProgress() {
  const quizzes = allQuizzes();
  if (!quizzes.length) return { pct: 0, completed: 0, total: 0, passed: 0 };
  let completed = 0, passed = 0;
  for (const q of quizzes) {
    const qs = quizState(q.id);
    if (qs.completed > 0) completed++;
    if (qs.passed) passed++;  // Solo 80%+ cuenta
  }
  // Progreso global: SOLO los 19 quizzes tematicos, NO final-exam
  return { pct: Math.round((passed / quizzes.length) * 100), completed, total: quizzes.length, passed };
}
function finalExamProgress() {
  const exam = finalExam();
  if (!exam || !state.finalExam) return { score: 0, pct: 0, passed: false, bestScore: 0 };
  const fe = state.finalExam;
  return { score: fe.score || 0, pct: fe.pct || 0, passed: fe.pct >= 80, bestScore: fe.bestScore || 0 };
}

function startQuiz(quizId) {
  let quiz = quizById(quizId);
  // Manejar final-exam: usar finalExam() en lugar de quizById()
  if (!quiz && quizId === "final-exam") {
    quiz = finalExam();
  }
  if (!quiz) { alert("Quiz no encontrado"); renderHome(); return; }
  session = { type: "quiz", quizId, questions: quiz.questions, index: 0, answers: [], score: 0, startTime: Date.now() };
  renderQuizStart();
}

function renderQuizStart() {
  const quiz = quizById(session.quizId);
  const totalPoints = session.questions.length * QUIZ_POINTS_PER_Q;
  app().innerHTML = `<div class="center-screen"><div class="big-emoji">${quiz.emoji}</div><h2>${esc(quiz.name)}</h2><p class="muted">${esc(quiz.description)}</p><div class="deck-meta" style="margin:1rem 0">Dificultad: ${difficultyEmoji(quiz.difficulty)}</div><div class="deck-meta">Preguntas: ${session.questions.length} × ${QUIZ_POINTS_PER_Q} pts = ${totalPoints} pts</div><div style="margin-top:2rem"><button class="primary" onclick="nextQuizQuestion()">🚀 Empezar</button><button class="ghost" onclick="renderQuizzes()">← Volver</button></div></div>`;
}

function renderQuizQuestion() {
  const s = session, q = s.questions[s.index], n = s.index + 1, total = s.questions.length, pct = Math.round((s.index / total) * 100);
  if (s.index >= s.questions.length) return renderQuizSummary();
  let content = (q.type === "gap-fill" || q.type === "multiple-choice") ? `<div class="quiz-card"><div class="quiz-prompt">${esc(q.prompt)}</div><div class="quiz-options">${q.options.map((opt) => `<button class="quiz-option" onclick="verifyQuizAnswer(${jsAttr(opt)})">${esc(opt)}</button>`).join("")}</div></div>` : `<div class="quiz-card"><div class="quiz-prompt">${esc(q.prompt)}</div><div class="quiz-typing"><input id="quizInput" type="text" class="typing-input" placeholder="Escribe aquí..." /><button class="primary" onclick="verifyQuizAnswer(document.getElementById('quizInput').value)">Verificar</button></div></div>`;
  app().innerHTML = `<div class="play-top"><button class="icon-btn" onclick="goBackDeck()" title="Atrás">←</button><div class="play-bar"><div class="play-bar-fill" style="width:${pct}%"></div></div><div class="play-count">${n}/${total}</div></div><div class="play-screen quiz-screen">${content}</div>`;
  if (q.type === "typing") setTimeout(() => { const el = document.getElementById("quizInput"); if (el) el.focus(); }, 100);
}

function verifyQuizAnswer(answer) {
  const q = session.questions[session.index], userAnswer = String(answer).trim().toLowerCase(), correct = String(q.correct).trim().toLowerCase(), isCorrect = userAnswer === correct;
  session.answers.push({ questionId: q.id, answer, isCorrect });
  if (isCorrect) session.score += (q.points || QUIZ_POINTS_PER_Q);
  const feedbackClass = isCorrect ? "quiz-feedback-correct" : "quiz-feedback-wrong", feedbackEmoji = isCorrect ? "✅" : "❌";
  app().innerHTML += `<div class="${feedbackClass}"><div class="feedback-emoji">${feedbackEmoji}</div><div class="feedback-text">${isCorrect ? "¡Correcto!" : "Incorrecto"}</div><div class="feedback-explanation">${esc(q.explanation)}</div>${!isCorrect ? `<div class="feedback-correct">Respuesta correcta: <strong>${esc(q.correct)}</strong></div>` : ""}<button class="primary" onclick="nextQuizQuestion()">Siguiente →</button></div>`;
}

function nextQuizQuestion() { session.index++; renderQuizQuestion(); }

async function renderQuizSummary() {
  const s = session, quiz = quizById(s.quizId), totalPoints = s.questions.length * QUIZ_POINTS_PER_Q, pct = Math.round((s.score / totalPoints) * 100), correct = s.answers.filter(a => a.isCorrect).length, duration = Math.round((Date.now() - s.startTime) / 1000);
  if (!state.quizzes) state.quizzes = {};
  if (!state.quizzes[s.quizId]) state.quizzes[s.quizId] = { completed: 0, totalAttempts: 0, bestScore: 0, passed: false, attempts: [] };
  
  // T5: Tracking detallado + aprobación 80%
  const passed = pct >= 80;  // S2: 80% para aprobar
  const isFinalExam = session.quizId === "final-exam";
  
  if (isFinalExam) {
    // Guardar resultado en state.finalExam separado
    const exam = finalExam();
    if (!state.finalExam) state.finalExam = {};
    state.finalExam.score = session.score;
    state.finalExam.pct = pct;
    state.finalExam.bestScore = Math.max(state.finalExam.bestScore || 0, session.score);
    state.finalExam.totalAttempts = (state.finalExam.totalAttempts || 0) + 1;
    if (!state.finalExam.attempts) state.finalExam.attempts = [];
    state.finalExam.attempts.push({ timestamp: new Date().toISOString(), score: session.score, pct, passed });
  }
  state.quizzes[s.quizId].completed = passed ? 1 : 0;
  state.quizzes[s.quizId].totalAttempts++;
  state.quizzes[s.quizId].bestScore = Math.max(state.quizzes[s.quizId].bestScore, s.score);
  if (!isFinalExam) {
    const wasAlreadyPassed = state.quizzes[s.quizId].passed;
    state.quizzes[s.quizId].passed = (passed || wasAlreadyPassed);
    state.quizzes[s.quizId].completed = (passed || wasAlreadyPassed) ? 1 : 0;
  }
  
  // Registrar intento
  if (!state.quizzes[s.quizId].attempts) state.quizzes[s.quizId].attempts = [];
  state.quizzes[s.quizId].attempts.push({ timestamp: new Date().toISOString(), score: s.score, pct, passed });
  
  // T3: Si aprobó, marcar tema como reforzado
  if (passed && quiz.deckId) {
    if (!state.themesReinforced) state.themesReinforced = {};
    state.themesReinforced[quiz.deckId] = true;
  }
  
  const xpBonus = Math.round((s.score / totalPoints) * 50);
  addXp(xpBonus);
  await persist();
  app().innerHTML = `<div class="center-screen"><div class="big-emoji">${passed ? "🏆" : "📚"}</div><h2>${esc(quiz.name)}</h2><div class="score">${s.score}/${totalPoints} pts (${pct}%)</div><div class="${passed ? "pill pill-ok" : "muted"}">${passed ? "¡Aprobado! 🎉" : `${80 - pct} pts para aprobar 💪`}</div><div class="summary-stats"><div>✅ ${correct}/${s.questions.length}</div><div>⏱️ ${duration}s</div><div>⭐ +${xpBonus} XP</div><div>Intento: ${state.quizzes[s.quizId].totalAttempts}</div></div><div class="summary-actions"><button class="primary" onclick="startQuiz('${s.quizId}')">🔁 Reintentar</button><button class="ghost" onclick="renderQuizzes()">📝 Otros quizzes</button></div></div>`;
}

function renderQuizzes() {
  const quizzes = allQuizzes(), { pct, completed, total, passed } = quizzesProgress(), quizCards = quizzes.map((q) => { const qs = quizState(q.id), badge = qs.passed ? "✅ Aprobado" : qs.completed > 0 ? "✅ Intentado" : "🔒", bestScore = qs.bestScore > 0 ? `<div class="muted">Mejor: ${qs.bestScore}/${q.questions.length * QUIZ_POINTS_PER_Q} (${Math.round(qs.bestScore / (q.questions.length * QUIZ_POINTS_PER_Q) * 100)}%)</div>` : ""; return `<div class="deck-card" style="--c:#7f39fb"><div class="deck-emoji">${q.emoji}</div><div class="deck-name">${esc(q.name)}</div><div class="deck-desc">${esc(q.description)}</div><div class="deck-meta">Dificultad: ${difficultyEmoji(q.difficulty)} · ${q.questions.length} preguntas · ${badge}</div>${bestScore}<div class="deck-actions"><button onclick="startQuiz('${q.id}')">📝 ${qs.passed ? "Revisar" : "Hacer Quiz"}</button></div></div>`; }).join("");
  const exam = finalExam();
  const examProgress = finalExamProgress();
  const examCard = exam ? `<div style="margin-top:2rem;padding:1rem;background:rgba(255,193,7,0.1);border-radius:8px;border-left:4px solid #ffc107"><h3>🏆 Examen Final Integral</h3><p class="muted">${esc(exam.description)}</p>${examProgress.pct > 0 ? `<div class="muted">Mejor: ${examProgress.bestScore}/${exam.questions.length * QUIZ_POINTS_PER_Q} (${examProgress.pct}%)</div>` : ""}<button class="primary" onclick="startQuiz('final-exam')" style="margin-top:0.5rem">${examProgress.pct >= 80 ? "📖 Revisar" : "🚀 Hacer Examen"}</button></div>` : "";
  app().innerHTML = `<header class="home-header"><button class="icon-btn" onclick="renderHome()">←</button><h1>📝 Quizzes Temáticos</h1></header><section class="missions"><div class="missions-title">📊 Progreso</div><div class="mission"><div class="mission-check">${passed > 0 ? "✅" : "⏳"}</div><div class="mission-body"><div class="mission-text">Temas aprobados: ${passed}/${total} (≥80%)</div><div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%"></div></div></div><div class="mission-prog">${pct}%</div></div></section><div class="deck-grid">${quizCards}</div>${examCard}<footer class="home-footer"><button class="link-btn" onclick="renderHome()">← Volver al inicio</button></footer>`;
}

function homeQuizzesSection() {
  const { pct, completed, total } = quizzesProgress();
  if (!total) return "";
  return `<section class="missions" style="margin-top:1.5rem"><div class="missions-title">📝 Quizzes</div><div class="mission" style="cursor:pointer" onclick="renderQuizzes()"><div class="mission-check">${completed > 0 ? "✅" : "🔒"}</div><div class="mission-body"><div class="mission-text">Quizzes completados: ${completed}/${total}</div><div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%"></div></div></div><div class="mission-prog">${pct}%</div></div><div style="text-align:center;margin-top:0.5rem"><button class="primary" onclick="renderQuizzes()" style="width:100%">📝 Ver Quizzes</button></div></section>`;
}

// ---------- XP y meta diaria ----------
function addXp(n) {
  state.xp += n;
  const today = todayStr();
  if (state.dailyXp.date !== today) state.dailyXp = { date: today, xp: 0 };
  state.dailyXp.xp += n;
}
function todayXp() { return state.dailyXp.date === todayStr() ? state.dailyXp.xp : 0; }

// ---------- rollover diario (XP + stats de misiones) ----------
function ensureToday() {
  const t = todayStr();
  if (state.dailyXp.date !== t) state.dailyXp = { date: t, xp: 0 };
  if (!state.dailyStats || state.dailyStats.date !== t) state.dailyStats = { date: t, correct: 0, sessions: 0, claimed: [] };
}

// ---------- misiones diarias ----------
function missionDefs() {
  return [
    { id: "lesson",    text: "Completá 3 lecciones",            target: 3,              xp: 20, prog: () => state.dailyStats.sessions },
    { id: "correct15", text: "Acertá 30 tarjetas",              target: 30,             xp: 30, prog: () => state.dailyStats.correct },
    { id: "goal",      text: `Llegá a ${state.goal * 2} XP hoy`,          target: state.goal * 2, xp: 40, prog: () => todayXp() },
  ];
}
function checkMissions() {
  ensureToday();
  let awarded = 0;
  for (const m of missionDefs()) {
    if (m.prog() >= m.target && !state.dailyStats.claimed.includes(m.id)) {
      state.dailyStats.claimed.push(m.id);
      state.xp += m.xp; awarded += m.xp; // bonus NO cuenta para la meta (evita bucle)
    }
  }
  return awarded;
}
function renderMissions() {
  ensureToday();
  const items = missionDefs().map((m) => {
    const p = Math.min(m.prog(), m.target);
    const done = state.dailyStats.claimed.includes(m.id) || p >= m.target;
    const pct = Math.round((p / m.target) * 100);
    return `<div class="mission ${done ? "mission-done" : ""}">
      <div class="mission-check">${done ? "✅" : "⬜"}</div>
      <div class="mission-body">
        <div class="mission-text">${m.text} <span class="mission-xp">+${m.xp} XP</span></div>
        <div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="mission-prog">${p}/${m.target}</div>
    </div>`;
  }).join("");
  return `<section class="missions"><div class="missions-title">🎯 Misiones de hoy</div>${items}</section>`;
}

// ---------- medalla de un mazo (coronar) ----------
function deckMedal(cards) {
  const r = deckProgress(cards).mastered / cards.length;
  if (r >= 1) return "🥇";
  if (r >= 0.66) return "🥈";
  if (r >= 0.33) return "🥉";
  return "";
}

// ---------- racha diaria ----------
function bumpStreak() {
  const today = todayStr();
  if (state.lastStudyDate === today) return;
  const yesterday = addDays(-1).slice(0, 10);
  state.streak = state.lastStudyDate === yesterday ? state.streak + 1 : 1;
  state.lastStudyDate = today;
}

// ---------- registrar resultado ----------
function grade(cardId, correct) {
  ensureToday();
  const cs = cardState(cardId);
  cs.seen++;
  if (correct) { cs.correct++; cs.box = Math.min(5, cs.box + 1); addXp(10); state.dailyStats.correct++; }
  else { cs.wrong++; cs.box = 1; addXp(2); }
  cs.due = addDays(BOX_DAYS[cs.box]);
  state.cards[cardId] = cs;
}

function dueCards(pool) {
  const now = new Date().toISOString();
  return pool.filter((c) => cardState(c.id).due <= now);
}

// ---------- audio (TTS) con selección de la mejor voz inglesa ----------
const Voice = {
  list: [],
  load() {
    try {
      const all = ("speechSynthesis" in window) ? speechSynthesis.getVoices() : [];
      this.list = all.filter((v) => /^en[-_]/i.test(v.lang) || /english/i.test(v.name));
    } catch { this.list = []; }
  },
  best() {
    if (!this.list.length) this.load();
    if (state && state.voiceURI) {
      const chosen = this.list.find((v) => v.voiceURI === state.voiceURI);
      if (chosen) return chosen;
    }
    const enUS = this.list.filter((v) => /en[-_]US/i.test(v.lang));
    const pool = enUS.length ? enUS : this.list;
    const pref = ["Ava", "Samantha", "Allison", "Zoe", "Siri", "Serena", "Tom", "Evan", "Nicky", "Aaron", "Alex"];
    for (const name of pref) { const m = pool.find((v) => v.name.includes(name)); if (m) return m; }
    return pool.find((v) => v.localService) || pool[0] || null;
  }
};
if ("speechSynthesis" in window) { speechSynthesis.onvoiceschanged = () => Voice.load(); Voice.load(); }

function speak(text, voice) {
  try {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = voice || Voice.best();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
    u.rate = 0.95; u.pitch = 1.0;
    speechSynthesis.speak(u);
  } catch { /* sin audio, no pasa nada */ }
}
// Elige hasta n voces inglesas distintas, prefiriendo las de Google.
function pickSpeakerVoices(n) {
  if (!Voice.list.length) Voice.load();
  const en = Voice.list;
  const google = en.filter((v) => /google/i.test(v.name));
  const pool = google.length ? google : en;
  const chosen = [];
  for (const v of pool) { if (chosen.length >= n) break; if (!chosen.some((c) => c.voiceURI === v.voiceURI)) chosen.push(v); }
  // completar con cualquier voz inglesa distinta si faltan
  for (const v of en) { if (chosen.length >= n) break; if (!chosen.some((c) => c.voiceURI === v.voiceURI)) chosen.push(v); }
  if (!chosen.length) { const b = Voice.best(); if (b) chosen.push(b); }
  return chosen;
}
function setVoice(uri) { state.voiceURI = uri || null; persist(); speak("Hello! This is your English tutor."); }
function voicePicker() {
  if (!Voice.list.length) Voice.load();
  if (!Voice.list.length) return "";
  const best = Voice.best();
  const cur = state.voiceURI || (best && best.voiceURI);
  return `<div class="voice-picker">🔊 Voz en inglés:
    <select onchange="setVoice(this.value)">
      ${Voice.list.map((v) => `<option value="${esc(v.voiceURI)}" ${v.voiceURI === cur ? "selected" : ""}>${esc(v.name)} · ${esc(v.lang)}</option>`).join("")}
    </select>
    <button class="link-btn" onclick="speak('Hello! This is your English tutor.')">probar</button>
  </div>`;
}

// ============================================================
//  PANTALLA: Home
// ============================================================
function renderHome() {
  session = null;
  const total = allCards().length;
  const prog = deckProgress(allCards());
  const due = dueCards(allCards()).length;
  const goalPct = Math.min(100, Math.round((todayXp() / state.goal) * 100));

  app().innerHTML = `
    <header class="topbar">
      <div class="brand">🎓 Senior 5 <span>English Game</span></div>
      <div class="stats">
        <div class="stat" title="Racha de días seguidos">🔥 <b>${state.streak}</b></div>
        <div class="stat" title="Puntos de experiencia">⭐ <b>${state.xp}</b></div>
      </div>
    </header>

    <section class="goal-card">
      <div class="goal-ring" style="--p:${goalPct}">
        <div class="goal-ring-inner">${goalPct}%</div>
      </div>
      <div class="goal-text">
        <div class="goal-title">🎯 Meta diaria</div>
        <div class="goal-sub">${todayXp()} / ${state.goal} XP de hoy ${goalPct >= 100 ? "· ¡cumplida! 🎉" : ""}</div>
      </div>
    </section>

    <section class="progress-summary">
      <div class="pill">📚 ${prog.mastered}/${total} dominadas · ${prog.pct}%</div>
      <div class="pill ${due ? "pill-alert" : ""}">⏰ ${due} para repasar</div>
      <div class="pill" style="background:#7f39fb20;color:#7f39fb">📝 ${quizProg.passed}/${quizProg.total} temas</div>
      ${storageBadge()}
    </section>

    ${renderMissions()}

    ${homeQuizzesSection()}

    ${renderExamCard()}

    <h2 class="section-title">Tus clases (tocá una para entrar)</h2>
    <div class="deck-grid">${DATA.units.slice().reverse().map(renderUnitCard).join("")}</div>

    <h2 class="section-title">O repasá todo</h2>
    <div class="deck-grid">
      <button class="deck-card" style="--c:#00b894" onclick="startSession('__ALL__','review')">
        <div class="deck-emoji">⏰</div>
        <div class="deck-name">Repaso espaciado</div>
        <div class="deck-desc">Lo que más te cuesta, de todos los mazos (${due})</div>
      </button>
      <button class="deck-card" style="--c:#fdcb6e" onclick="startSession('__ARCADE__','arcade')">
        <div class="deck-emoji">⚡</div>
        <div class="deck-name">Modo Arcade</div>
        <div class="deck-desc">Contrarreloj + combos. Récord: ${state.arcadeBest || 0} pts</div>
      </button>
      <button class="deck-card" style="--c:#0984e3" onclick="startSession('__ALL__','match')">
        <div class="deck-emoji">🔗</div>
        <div class="deck-name">Unir significados</div>
        <div class="deck-desc">Conectá frases con su traducción</div>
      </button>
      <button class="deck-card" style="--c:#e84393" onclick="viewConversations()">
        <div class="deck-emoji">💬</div>
        <div class="deck-name">Conversación</div>
        <div class="deck-desc">Diálogos tipo examen oral</div>
      </button>
      <button class="deck-card" style="--c:#fd79a8" onclick="startPron('__ALL__')">
        <div class="deck-emoji">🎤</div>
        <div class="deck-name">Pronunciación</div>
        <div class="deck-desc">Leé en voz alta y te corrijo (Chrome + http)</div>
      </button>
      <button class="deck-card" style="--c:#a29bfe" onclick="startMemory('__ALL__')">
        <div class="deck-emoji">🧠</div>
        <div class="deck-name">Memoria</div>
        <div class="deck-desc">Encontrá los pares (palabras y frases)</div>
      </button>
      <button class="deck-card" style="--c:#e17055" onclick="startSession('__SAVED__','learn')">
        <div class="deck-emoji">🔖</div>
        <div class="deck-name">Mis difíciles</div>
        <div class="deck-desc">Tu tarjetero: ${(state.saved || []).length} guardadas</div>
      </button>
    </div>

    ${voicePicker()}

    <footer class="home-footer">
      <button class="link-btn" onclick="toggleStrict()">🎯 Modo riguroso: ${state.strictMode ? "ON" : "OFF"}</button>
      <button class="link-btn" onclick="resetProgress()">🗑️ Reiniciar progreso</button>
      <button class="link-btn" onclick="exportProgress()">⬇️ Exportar progreso</button>
      <button class="link-btn" onclick="importProgress()">⬆️ Importar progreso</button>
      ${Store.supportsFS() && !Store.isFileConnected() ? `<button class="link-btn" onclick="connectProgressFile()">🔗 Guardar en archivo (progress.json)</button>` : ""}
    </footer>
  `;
}

function renderExamCard() {
  const date = state.examDate;
  let body;
  if (date) {
    const days = Math.ceil((new Date(date + "T00:00:00") - new Date(todayStr() + "T00:00:00")) / 86400000);
    const when = days > 0 ? `faltan <b>${days}</b> día${days === 1 ? "" : "s"}` : days === 0 ? "<b>¡es hoy! 🍀</b>" : "ya pasó";
    body = `<div class="exam-sub">🗓️ ${date} · ${when}</div>
            <div class="exam-actions">
              <button onclick="startSession('__SPEAKING__','boss')">👹 Simulacro</button>
              <button onclick="startSession('speaking-phrases','practice')">🎤 Practicar frases</button>
              <button onclick="startSession('speaking-papers','learn')">🧩 Ver papers</button>
              <button class="link-btn" onclick="setExamDate()">cambiar fecha</button>
            </div>`;
  } else {
    body = `<div class="exam-sub">Cargá la fecha para activar la cuenta regresiva.</div>
            <div class="exam-actions">
              <button onclick="startSession('__SPEAKING__','boss')">👹 Simulacro</button>
              <button onclick="setExamDate()">📅 Poner fecha del examen</button>
            </div>`;
  }
  return `<section class="exam-card"><div class="exam-title">🎯 ${DATA.exam.name}</div>${body}</section>`;
}

function setExamDate() {
  const v = prompt("Fecha del examen (AAAA-MM-DD):", state.examDate || "");
  if (v === null) return;
  const t = v.trim();
  if (t && !/^\d{4}-\d{2}-\d{2}$/.test(t)) { alert("Formato: AAAA-MM-DD (ej: 2025-11-05)"); return; }
  state.examDate = t || null;
  persist().then(renderHome);
}

// Tarjeta de clase en el Home (clickeable -> entra a la unidad)
function renderUnitCard(u) {
  const cards = u.decks.flatMap((d) => d.cards);
  const { pct } = deckProgress(cards);
  const crowned = u.decks.filter((d) => deckMedal(d.cards) === "\u{1F947}").length;
  return `
    <button class="deck-card unit-card" style="--c:#6c5ce7" onclick="viewUnit('${u.id}')">
      <div class="deck-emoji">${u.emoji}</div>
      <div class="deck-name">${u.name}</div>
      <div class="deck-desc">${u.decks.length} mazos${crowned ? ` \u00b7 ${crowned} \u{1F947}` : ""}</div>
      <div class="deck-bar"><div class="deck-bar-fill" style="width:${pct}%"></div></div>
      <div class="deck-meta">${pct}% avance</div>
    </button>`;
}

function viewUnit(id) { renderUnitView(id); }

function renderUnitView(id) {
  const u = DATA.units.find((x) => x.id === id);
  if (!u) return renderHome();
  const { pct } = deckProgress(u.decks.flatMap((d) => d.cards));
  app().innerHTML = `
    <header class="topbar">
      <button class="icon-btn" onclick="renderHome()" title="Volver">\u2190</button>
      <div class="brand">${u.emoji} ${u.name}</div>
      <div class="stats"><div class="stat">\u2b50 <b>${state.xp}</b></div></div>
    </header>
    <div class="unit-prog" style="margin-bottom:18px"><div class="unit-prog-fill" style="width:${pct}%"></div></div>
    <div class="deck-grid">${u.decks.map(renderDeckCard).join("")}</div>
    <footer class="home-footer"><button class="link-btn" onclick="renderHome()">\u2190 Volver al inicio</button></footer>`;
}

function storageBadge() {
  if (Store.isFileConnected()) return `<div class="pill pill-ok">💾 progress.json conectado</div>`;
  if (Store.supportsFS()) return `<div class="pill">💾 localStorage (conectá un archivo abajo)</div>`;
  return `<div class="pill">💾 localStorage</div>`;
}

function renderDeckCard(d) {
  const cards = d.cards;
  const { pct, mastered, started } = deckProgress(cards);
  return `
    <div class="deck-card deck-card-expand" style="--c:${d.color}">
      <div class="deck-emoji">${d.emoji}</div>
      <div class="deck-name">${d.name} ${deckMedal(cards)}</div>
      <div class="deck-desc">${d.description}</div>
      <div class="deck-bar"><div class="deck-bar-fill" style="width:${pct}%"></div></div>
      <div class="deck-meta">${pct}% avance · ${started}/${cards.length} empezadas · ${mastered} dominadas</div>
      <div class="deck-actions">
        <button onclick="startSession('${d.id}','learn')">📖 Aprender</button>
        <button onclick="startSession('${d.id}','practice')">🎮 Practicar</button>
      </div>
    </div>`;
}

// ============================================================
//  SESIÓN de juego
// ============================================================
const SESSION_SIZE = 10;

const SPEAKING_DECKS = ["speaking-phrases", "speaking-papers", "would-rather", "past-modals", "should-have"];

function startSession(deckId, mode) {
  let pool;
  if (deckId === "__ALL__" || deckId === "__ARCADE__") pool = allCards();
  else if (deckId === "__SPEAKING__") pool = SPEAKING_DECKS.flatMap((id) => { const d = deckById(id); return d ? d.cards.map((c) => ({ ...c, deckId: id })) : []; });
  else if (deckId === "__SAVED__") pool = allCards().filter((c) => (state.saved || []).includes(c.id));
  else pool = deckById(deckId).cards.map((c) => ({ ...c, deckId }));
  if (deckId === "__SAVED__" && pool.length === 0) { alert("Todavía no guardaste ninguna. Tocá 🔖 Guardar en las cartas que te cuesten."); return; }
  let queue;

  if (mode === "review") {
    queue = dueCards(pool);
    if (queue.length === 0) { app().innerHTML = emptyReview(); return; }
    queue = shuffle(queue).slice(0, SESSION_SIZE);
  } else if (mode === "learn") {
    queue = pool.slice().sort((a, b) => cardState(a.id).box - cardState(b.id).box).slice(0, SESSION_SIZE);
  } else if (mode === "arcade") {
    queue = shuffle(pool).slice(0, 15);
  } else if (mode === "boss") {
    queue = shuffle(pool).slice(0, 12);
  } else if (mode === "match") {
    queue = shuffle(pool).slice(0, 12); // 3 rondas de 4
  } else { // practice
    queue = shuffle(pool).slice(0, SESSION_SIZE);
  }

  // Corazones solo en practice. learn/arcade/boss no usan vidas.
  const hearts = (mode === "practice") ? START_HEARTS : Infinity;
  session = { deckId, mode, queue, index: 0, correct: 0, pool, hearts, score: 0, combo: 0, timer: null, timeLeft: 0 };
  renderCard();
}

function emptyReview() {
  return `
    <div class="center-screen">
      <div class="big-emoji">🎉</div>
      <h2>¡No tenés nada para repasar ahora!</h2>
      <p class="muted">La repetición espaciada te va a traer las cartas cuando toque.</p>
      <button class="primary" onclick="renderHome()">Volver al inicio</button>
    </div>`;
}

function heartsHtml() {
  if (session.hearts === Infinity) return "";
  let h = "";
  for (let i = 0; i < START_HEARTS; i++) h += i < session.hearts ? "❤️" : "🤍";
  return `<div class="hearts" title="Vidas">${h}</div>`;
}

// ---------- cabecera de juego (hearts o arcade) ----------
function playHeader(n, total, pct) {
  const s = session;
  if (s.mode === "arcade") {
    return `
    <div class="play-top">
      <button class="icon-btn" onclick="goBackDeck()" title="Atrás">←</button>
      <button class="icon-btn" onclick="confirmExit()" title="Salir">✕</button>
      <div class="arcade-stats"><span class="combo">🔥 x${s.combo || 0}</span><span class="score">⭐ ${s.score || 0}</span></div>
      <div class="play-count">${n}/${total}</div>
    </div>
    <div class="timer-bar"><div id="timerFill" class="timer-fill" style="width:100%"></div></div>`;
  }
  return `
    <div class="play-top">
      <button class="icon-btn" onclick="goBackDeck()" title="Atrás">←</button>
      <button class="icon-btn" onclick="confirmExit()" title="Salir">✕</button>
      <div class="play-bar"><div class="play-bar-fill" style="width:${pct}%"></div></div>
      ${heartsHtml()}
      <div class="play-count">${n}/${total}</div>
    </div>`;
}

// ---------- timer del modo arcade ----------
const ARCADE_TIME = 10;
function startTimer() {
  session.timeLeft = ARCADE_TIME;
  updateTimerUI();
  session.timer = setInterval(() => {
    session.timeLeft--;
    updateTimerUI();
    if (session.timeLeft <= 0) { clearTimer(); timeoutAnswer(); }
  }, 1000);
}
function clearTimer() { if (session && session.timer) { clearInterval(session.timer); session.timer = null; } }
function updateTimerUI() {
  const el = $("#timerFill");
  if (el) el.style.width = Math.max(0, (session.timeLeft / ARCADE_TIME) * 100) + "%";
}
function timeoutAnswer() {
  const card = session.queue[session.index];
  document.querySelectorAll(".option").forEach((b) => { b.disabled = true; if (b.textContent === session._answer) b.classList.add("opt-correct"); });
  afterAnswer(false, card);
}

function renderCard() {
  const s = session;
  clearTimer();
  if (s.index >= s.queue.length) return renderSummary();
  if (s.mode === "match") return renderMatch();

  const card = s.queue[s.index];
  const n = s.index + 1, total = s.queue.length;
  const pct = Math.round((s.index / total) * 100);

  const header = playHeader(n, total, pct);

  if (s.mode === "learn") { app().innerHTML = header + renderLearn(card); return; }

  const type = pickQuestionType(card, s.mode);
  app().innerHTML = header + renderQuestion(type, card);
  if (type === "typing" || type === "gap") setTimeout(() => { const i = $("#typeInput"); if (i) i.focus(); }, 50);
  if (s.mode === "arcade") startTimer();
}

// ---------- modo Aprender: flashcard ----------
function renderLearn(card) {
  return `
    <div class="flash-wrap">
      <div class="flashcard" id="flash" onclick="flip()">
        <div class="flash-face flash-front">
          <div class="flash-emoji">${card.emoji || "💬"}</div>
          <div class="flash-en">${esc(card.en)}</div>
          <button class="speak-btn" onclick="event.stopPropagation(); speak(${jsAttr(card.en)})" title="Escuchar">🔊</button>
          <button class="save-btn" onclick="event.stopPropagation(); toggleSavedUI('${card.id}', this)">${isSaved(card.id) ? "🔖 Guardada" : "🔖 Guardar"}</button>
          <div class="flash-hint">tocá para ver el significado</div>
        </div>
        <div class="flash-face flash-back">
          <div class="flash-es">${esc(card.es)}</div>
          ${card.note ? `<div class="flash-note">💡 ${esc(card.note)}</div>` : ""}
          ${card.tag ? `<div class="flash-tag">${esc(card.tag)}</div>` : ""}
        </div>
      </div>
      <button class="primary wide" onclick="nextLearn()">Siguiente →</button>
    </div>`;
}
function flip() {
  const el = $("#flash"); el.classList.toggle("flipped");
  // El audio suena solo con el botón del parlante, no al tocar la tarjeta.
}
function nextLearn() {
  const card = session.queue[session.index];
  const cs = cardState(card.id);
  cs.seen++;
  cs.box = Math.min(3, cs.box + 1); // familiarización, no "dominada"
  cs.due = addDays(BOX_DAYS[cs.box]);
  state.cards[card.id] = cs;
  session.index++;
  renderCard();
}

// ---------- modo Practicar: opción múltiple ----------
function renderMultipleChoice(card) {
  const en2es = Math.random() < 0.6;
  const prompt = en2es ? card.en : card.es;
  const answer = en2es ? card.es : card.en;
  const field = en2es ? "es" : "en";

  const distractors = shuffle(session.pool.filter((c) => c.id !== card.id)).slice(0, 3).map((c) => c[field]);
  const options = shuffle([answer, ...distractors]);
  session._answer = answer;

  return `
    <div class="quiz">
      <div class="quiz-prompt-label">${en2es ? "¿Qué significa?" : "¿Cómo se dice?"}</div>
      <div class="quiz-prompt">
        <span class="quiz-emoji">${card.emoji || "💬"}</span>
        <span>${esc(prompt)}</span>
        ${en2es ? `<button class="speak-btn inline" onclick="speak(${jsAttr(card.en)})" title="Escuchar">🔊</button>` : ""}
      </div>
      <div class="options">
        ${options.map((o) => `<button class="option" onclick="answerMC(this, ${jsAttr(o)})">${esc(o)}</button>`).join("")}
      </div>
      <div id="feedback" class="feedback"></div>
    </div>`;
}

function answerMC(btn, chosen) {
  const card = session.queue[session.index];
  const correct = chosen === session._answer;
  document.querySelectorAll(".option").forEach((b) => {
    b.disabled = true;
    if (b.textContent === session._answer) b.classList.add("opt-correct");
    else if (b === btn) b.classList.add("opt-wrong");
  });
  afterAnswer(correct, card);
}

// ---------- modo Practicar: escribir ----------
const normalize = (s) => String(s).toLowerCase()
  .replace(/[.,!?;:]/g, "").replace(/[’'`]/g, "'").replace(/\s+/g, " ").trim();

// Distancia de edición (Levenshtein) para detectar typos menores.
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n; if (!n) return m;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
  }
  return d[m][n];
}
// "ok" exacto | "close" error menor (no cambia el sentido) | "wrong".
function compareAnswer(user, answer) {
  const u = normalize(user), a = normalize(answer);
  if (u === a) return { status: "ok" };
  if (state.strictMode) return { status: "wrong" };
  const strip = (x) => x.split(" ").filter((w) => !["a", "an", "the"].includes(w)).join(" ");
  if (strip(a) !== "" && strip(u) === strip(a)) return { status: "close" };
  if (levenshtein(u, a) <= Math.max(2, Math.round(a.length * 0.12))) return { status: "close" };
  return { status: "wrong" };
}

function renderTyping(card) {
  // Siempre ES -> escribir en inglés (es lo que querés automatizar).
  session._answer = card.en;
  return `
    <div class="quiz">
      <div class="quiz-prompt-label">Escribí en inglés ✍️</div>
      <div class="quiz-prompt">
        <span class="quiz-emoji">${card.emoji || "💬"}</span>
        <span>${esc(card.es)}</span>
      </div>
      <input id="typeInput" class="type-input" type="text" autocomplete="off" autocapitalize="off"
             spellcheck="false" placeholder="type here..." onkeydown="if(event.key==='Enter')checkTyping()" />
      <div class="type-actions">
        <button class="ghost small" onclick="skipTyping()">No sé 🤷</button>
        <button class="primary" onclick="checkTyping()">Comprobar</button>
      </div>
      <div id="feedback" class="feedback"></div>
    </div>`;
}

function checkTyping() {
  const input = $("#typeInput");
  if (!input || input.disabled) return;
  const card = session.queue[session.index];
  const cmp = compareAnswer(input.value, session._answer);
  input.disabled = true;
  input.classList.add(cmp.status === "wrong" ? "type-no" : cmp.status === "close" ? "type-close" : "type-ok");
  afterAnswer(cmp.status !== "wrong", card, cmp.status === "close");
}
function skipTyping() {
  const card = session.queue[session.index];
  const input = $("#typeInput");
  if (input) { input.disabled = true; input.classList.add("type-no"); }
  afterAnswer(false, card);
}

// ---------- resultado común a MC y typing ----------
function afterAnswer(correct, card, close) {
  clearTimer();
  grade(card.id, correct);
  if (correct) session.correct++;
  if (session.mode === "arcade") {
    if (correct) { session.combo = Math.min(5, (session.combo || 0) + 1); session.score = (session.score || 0) + 10 * session.combo + Math.max(0, session.timeLeft || 0) * 2; }
    else session.combo = 0;
  } else if (!correct && session.hearts !== Infinity) {
    session.hearts--;
  }

  speak(card.en);

  const showNote = card.note && session.mode !== "boss"; // el jefe final va sin pistas
  const fb = $("#feedback");
  if (correct && close) {
    fb.innerHTML = `<div class="fb fb-close">👍 ¡Casi perfecto! Lo correcto: <b>${esc(session._answer)}</b></div>`;
  } else if (correct) {
    fb.innerHTML = `<div class="fb fb-ok">✅ ¡Muy bien!</div>`;
  } else {
    fb.innerHTML = `<div class="fb fb-no">❌ Correcto: <b>${esc(session._answer)}</b>${showNote ? `<br><span class="fb-note">💡 ${esc(card.note)}</span>` : ""}</div>`;
  }

  fb.innerHTML += `<button class="link-btn save-inline" onclick="toggleSavedUI('${card.id}', this)">${isSaved(card.id) ? "🔖 Guardada" : "🔖 Guardar esta"}</button>`;
  if (session.hearts === 0) {
    fb.innerHTML += `<button class="primary wide" onclick="gameOver()">Continuar →</button>`;
  } else {
    fb.innerHTML += `<button class="primary wide" onclick="nextQuestion()">Continuar →</button>`;
  }
  if (correct) burst();
}
function nextQuestion() { session.index++; renderCard(); }

async function gameOver() {
  bumpStreak();
  ensureToday(); state.dailyStats.sessions++;
  checkMissions();
  await persist();
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">💔</div>
      <h2>Te quedaste sin vidas</h2>
      <p class="muted">No pasa nada: así se aprende. Tu progreso se guardó.</p>
      <div class="summary-actions">
        <button class="primary" onclick="startSession('${session.deckId}','${session.mode}')">🔁 Reintentar</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

// ---------- resumen de sesión ----------
async function renderSummary() {
  clearTimer();
  bumpStreak();
  const s = session;
  ensureToday(); state.dailyStats.sessions++;
  const bonus = checkMissions();
  if (s.mode === "arcade" || s.mode === "boss") return renderSpecialSummary(s, bonus);
  await persist();
  const scored = s.mode === "learn" ? null : `${s.correct}/${s.queue.length}`;
  const goalDone = todayXp() >= state.goal;
  
  // T4: Ofrecimiento de quiz post-Aprender (no bloqueante)
  let quizOffer = "";
  if (s.mode === "learn" && s.deckId && !s.deckId.startsWith("__")) {
    const quizId = `quiz-${s.deckId}`;
    const quiz = allQuizzes().find(q => q.id === quizId);
    if (quiz) {
      quizOffer = `<div style="margin-top:1rem; padding:1rem; background:rgba(127,57,251,0.1); border-radius:8px; border-left:4px solid #7f39fb">
        <div style="font-weight:bold; margin-bottom:0.5rem">📝 Ahora probá el quiz</div>
        <div class="muted" style="margin-bottom:1rem">Refuerza lo que aprendiste sin presión</div>
        <button class="primary" onclick="startQuiz('${quizId}')" style="width:100%">Hacer Quiz de ${quiz.name.replace('Quiz: ', '')}</button>
      </div>`;
    }
  }
  
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">${s.mode === "learn" ? "📚" : s.correct === s.queue.length ? "🏆" : "💪"}</div>
      <h2>${s.mode === "learn" ? "¡Repaso completado!" : "¡Sesión terminada!"}</h2>
      ${scored ? `<div class="score">${scored} correctas</div>` : ""}
      ${goalDone ? `<div class="pill pill-ok">🎯 ¡Meta diaria cumplida!</div>` : `<div class="muted">🎯 Meta diaria: ${todayXp()}/${state.goal} XP</div>`}
      ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
      <div class="summary-stats">
        <div>🔥 Racha: <b>${state.streak}</b></div>
        <div>⭐ XP: <b>${state.xp}</b></div>
      </div>
      ${quizOffer}
      <div class="summary-actions">
        <button class="primary" onclick="startSession('${s.deckId}','${s.mode}')">🔁 Otra ronda</button>
        <button class="ghost" onclick="renderUnitView('${s.deckId}')">← Atrás</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

async function renderSpecialSummary(s, bonus) {
  if (s.mode === "arcade") {
    const record = s.score > (state.arcadeBest || 0);
    if (record) state.arcadeBest = s.score;
    await persist();
    app().innerHTML = `
      <div class="center-screen">
        <div class="big-emoji">⚡</div>
        <h2>¡Arcade terminado!</h2>
        <div class="score">${s.score} pts</div>
        ${record ? `<div class="pill pill-ok">🏅 ¡Nuevo récord!</div>` : `<div class="muted">Récord: ${state.arcadeBest} pts</div>`}
        <div class="summary-stats"><div>✅ ${s.correct}/${s.queue.length}</div><div>⭐ ${state.xp}</div></div>
        ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
        <div class="summary-actions">
          <button class="primary" onclick="startSession('__ARCADE__','arcade')">🔁 Otra</button>
          <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
        </div>
      </div>`;
    return;
  }
  const pct = Math.round((s.correct / s.queue.length) * 100);
  const pass = pct >= 70;
  await persist();
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">${pass ? "🏆" : "👹"}</div>
      <h2>Simulacro de examen</h2>
      <div class="score">${pct}%</div>
      <div class="${pass ? "pill pill-ok" : "muted"}">${pass ? "¡Aprobarías! Seguí así 💪" : "Todavía no llegás al 70%. A repasar 🔁"}</div>
      <div class="summary-stats"><div>✅ ${s.correct}/${s.queue.length}</div><div>🔥 ${state.streak}</div></div>
      ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
      <div class="summary-actions">
        <button class="primary" onclick="startSession('__SPEAKING__','boss')">🔁 Otro simulacro</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

function goBackDeck() {
  clearTimer();
  if (session && session.type === "quiz") {
    persist().then(() => renderQuizzes());
  } else if (session && session.deckId) {
    persist().then(() => renderUnitView(session.deckId));
  } else {
    renderHome();
  }
}

function confirmExit() {
  if (confirm("¿Salir de la sesión? Tu progreso de cada carta ya se guardó.")) { clearTimer(); persist(); renderHome(); }
}

// ---------- animación de acierto ----------
function burst() {
  const n = 14;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.textContent = ["✨", "⭐", "🎉", "💛"][i % 4];
    s.style.left = 50 + (Math.random() * 40 - 20) + "%";
    s.style.animationDelay = (Math.random() * 0.2) + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }
}

// ---------- persistencia: acciones de usuario ----------
async function connectProgressFile() {
  try { await Store.connectFile(); await Store.save(state); renderHome(); }
  catch (e) { if (e.name !== "AbortError") alert("No se pudo conectar el archivo: " + e.message); }
}
function exportProgress() { Store.exportFile(state); }
function toggleStrict() { state.strictMode = !state.strictMode; persist().then(renderHome); }
async function importProgress() {
  try { state = await Store.importFile(); await persist(); renderHome(); alert("Progreso importado ✅"); }
  catch (e) { if (e.message !== "no-file") alert("No se pudo importar: " + e.message); }
}

// ============================================================
//  Arranque
// ============================================================
// ============================================================
//  A2: tipos de ejercicio (completar / armar / unir)
// ============================================================
function pickQuestionType(card, mode) {
  if (mode === "arcade") return "mc";
  const words = card.en.trim().split(/\s+/).length;
  let cand = ["mc", "typing"];
  if (words >= 2) cand.push("gap");
  if (words >= 2 && words <= 9) cand.push("bank");
  // T7: Si tema reforzado, aumentar peso de typing/gap (escritura)
  if (session && session.deckId && state.themesReinforced && state.themesReinforced[session.deckId]) {
    if (cand.includes("typing")) cand.push("typing");
    if (cand.includes("gap")) cand.push("gap");
  }
  if (mode === "boss") {
    const hard = cand.filter((t) => t !== "mc");
    return hard[Math.floor(Math.random() * hard.length)] || "mc";
  }
  return cand[Math.floor(Math.random() * cand.length)];
}
function renderQuestion(type, card) {
  if (type === "typing") return renderTyping(card);
  if (type === "gap") return renderGapFill(card);
  if (type === "bank") return renderWordBank(card);
  return renderMultipleChoice(card);
}

// ---- Completar la palabra que falta ----
function pickBlankIndex(words) {
  let idx = 0, best = -1;
  words.forEach((w, i) => { const c = w.replace(/[^A-Za-z']/g, ""); if (c.length > best) { best = c.length; idx = i; } });
  return idx;
}
function renderGapFill(card) {
  const words = card.en.split(/\s+/);
  const idx = pickBlankIndex(words);
  session._answer = words[idx].replace(/[^A-Za-z']/g, "");
  const shown = words.map((w, i) => (i === idx ? w.replace(/[A-Za-z']+/, "_____") : w)).join(" ");
  return `
    <div class="quiz">
      <div class="quiz-prompt-label">Completá la palabra que falta ✏️</div>
      <div class="quiz-prompt"><span class="quiz-emoji">${card.emoji || "💬"}</span><span>${esc(shown)}</span></div>
      <div class="gap-hint">💬 ${esc(card.es)}</div>
      <input id="typeInput" class="type-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="palabra..." onkeydown="if(event.key==='Enter')checkTyping()" />
      <div class="type-actions"><button class="ghost small" onclick="skipTyping()">No sé 🤷</button><button class="primary" onclick="checkTyping()">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`;
}

// ---- Armar la frase (word bank) ----
function renderWordBank(card) {
  session._answer = card.en;
  const toks = card.en.split(/\s+/);
  session._bank = { pool: shuffle(toks).map((w) => ({ w, used: false })), chosen: [] };
  const poolHtml = session._bank.pool.map((t, i) => `<button class="chip" onclick="bankPick(${i})">${esc(t.w)}</button>`).join("");
  return `
    <div class="quiz">
      <div class="quiz-prompt-label">Armá la frase en inglés 🧩</div>
      <div class="quiz-prompt"><span class="quiz-emoji">${card.emoji || "💬"}</span><span>${esc(card.es)}</span></div>
      <div id="bankAnswer" class="bank-answer"></div>
      <div id="bankPool" class="bank-pool">${poolHtml}</div>
      <div class="type-actions"><button class="ghost small" onclick="skipBank()">No sé 🤷</button><button class="primary" onclick="checkBank()">Comprobar</button></div>
      <div id="feedback" class="feedback"></div>
    </div>`;
}
function bankPick(i) { const b = session._bank; if (b.pool[i].used) return; b.pool[i].used = true; b.chosen.push(i); updateBank(); }
function bankUndo(k) { const b = session._bank; const i = b.chosen[k]; b.pool[i].used = false; b.chosen.splice(k, 1); updateBank(); }
function updateBank() {
  const b = session._bank;
  const pool = $("#bankPool"), ans = $("#bankAnswer");
  if (pool) pool.innerHTML = b.pool.map((t, i) => (t.used ? "" : `<button class="chip" onclick="bankPick(${i})">${esc(t.w)}</button>`)).join("");
  if (ans) ans.innerHTML = b.chosen.map((i, k) => `<button class="chip chip-chosen" onclick="bankUndo(${k})">${esc(b.pool[i].w)}</button>`).join("");
}
function checkBank() {
  const card = session.queue[session.index];
  const b = session._bank;
  const assembled = b.chosen.map((i) => b.pool[i].w).join(" ");
  const cmp = compareAnswer(assembled, session._answer);
  afterAnswer(cmp.status !== "wrong", card, cmp.status === "close");
}
function skipBank() { afterAnswer(false, session.queue[session.index]); }

// ---- Unir significados (match) ----
function renderMatch() {
  const s = session;
  const batch = s.queue.slice(s.index, s.index + 4);
  s._match = { batch, left: shuffle(batch.slice()), right: shuffle(batch.slice()), selL: null, done: [] };
  const total = Math.ceil(s.queue.length / 4), cur = Math.floor(s.index / 4) + 1;
  const pct = Math.round((s.index / s.queue.length) * 100);
  app().innerHTML = `
    <div class="play-top">
      <button class="icon-btn" onclick="confirmExit()" title="Salir">✕</button>
      <div class="play-bar"><div class="play-bar-fill" style="width:${pct}%"></div></div>
      <div class="play-count">Ronda ${cur}/${total}</div>
    </div>
    <div class="quiz-prompt-label" style="text-align:center;margin-bottom:12px">Uní cada frase con su significado 🔗</div>
    <div class="match-grid"><div id="matchLeft" class="match-col"></div><div id="matchRight" class="match-col"></div></div>
    <div id="feedback" class="feedback"></div>`;
  updateMatch();
}
function updateMatch() {
  const m = session._match;
  const L = $("#matchLeft"), R = $("#matchRight");
  const wl = m.wrong ? m.wrong.l : -1, wr = m.wrong ? m.wrong.r : -1;
  if (L) L.innerHTML = m.left.map((c, i) => `<button class="match-item ${m.done.includes(c.id) ? "match-done" : ""} ${m.selL === i ? "match-sel" : ""} ${i === wl ? "match-wrong" : ""}" ${m.done.includes(c.id) ? "disabled" : ""} onclick="matchLeft(${i})">${esc(c.en)}</button>`).join("");
  if (R) R.innerHTML = m.right.map((c, j) => `<button class="match-item ${m.done.includes(c.id) ? "match-done" : ""} ${j === wr ? "match-wrong" : ""}" ${m.done.includes(c.id) ? "disabled" : ""} onclick="matchRight(${j})">${esc(c.es)}</button>`).join("");
}
function matchLeft(i) { if (session._match.wrong) return; session._match.selL = i; updateMatch(); }
function matchRight(j) {
  const m = session._match;
  if (m.selL === null || m.wrong) return;
  const l = m.left[m.selL], r = m.right[j];
  if (l.id === r.id) {
    m.done.push(l.id); grade(l.id, true); session.correct++; m.selL = null; updateMatch(); burst();
    if (m.done.length === m.batch.length) {
      const fb = $("#feedback");
      if (fb) fb.innerHTML = `<div class="fb fb-ok">✅ ¡Ronda completa!</div><button class="primary wide" onclick="nextMatchRound()">Continuar →</button>`;
    }
  } else {
    grade(l.id, false);
    m.wrong = { l: m.selL, r: j };
    updateMatch();
    const fb = $("#feedback");
    if (fb) fb.innerHTML = `<div class="fb fb-no">❌ No es ese par. Probá de nuevo.</div>`;
    setTimeout(() => { m.wrong = null; m.selL = null; if (fb) fb.innerHTML = ""; updateMatch(); }, 800);
  }
}
function nextMatchRound() { session.index += session._match.batch.length; renderCard(); }

// ============================================================
//  A3: modo conversación (diálogos guiados)
// ============================================================
function viewConversations() {
  const papers = window.PAPERS || [];
  app().innerHTML = `
    <header class="topbar">
      <button class="icon-btn" onclick="renderHome()" title="Volver">\u2190</button>
      <div class="brand">💬 Conversación</div>
      <div class="stats"><div class="stat">\u2b50 <b>${state.xp}</b></div></div>
    </header>
    <p class="muted" style="margin-bottom:14px">Elegí un paper: te muestro la pregunta y las 5 opciones. Vos elegís la que quieras y charlamos sobre esa (como en el examen).</p>
    <div class="deck-grid">
      ${papers.map((p) => `<button class="deck-card" style="--c:#6c5ce7" onclick="renderPaper('${p.id}')">
        <div class="deck-emoji">${p.emoji}</div>
        <div class="deck-name">${esc(p.title)}</div>
        <div class="deck-desc">${esc(p.question)}</div></button>`).join("")}
    </div>

    <h2 class="section-title">Escuchar una conversación 🎧</h2>
    <p class="muted" style="margin-bottom:12px">Cada paper tiene 3 niveles. La difícil es una charla fluida y real.</p>
    ${(window.PAPERS || []).map((p) => `
      <div class="listen-group">
        <div class="listen-group-title">${p.emoji} ${esc(p.title)}</div>
        <div class="deck-grid">
          ${["easy", "medium", "hard"].map((lv) => {
            const d = (window.LISTENINGS || []).find((x) => x.paper === p.id && x.level === lv);
            return d ? `<button class="deck-card" style="--c:${levelColor(lv)}" onclick="startListening('${d.id}')">
              <div class="deck-emoji">${levelBadge(lv)}</div>
              <div class="deck-name">${levelLabel(lv)}</div>
              <div class="deck-desc">${d.lines.length} líneas</div></button>` : "";
          }).join("")}
        </div>
      </div>`).join("")}
    <footer class="home-footer"><button class="link-btn" onclick="renderHome()">\u2190 Inicio</button></footer>`;
}
function startConversation(id) {
  const convo = (window.CONVERSATIONS || []).find((c) => c.id === id);
  if (!convo) return viewConversations();
  session = { mode: "convo", convo, step: 0, transcript: [], good: 0, total: 0, voices: pickSpeakerVoices(2) };
  renderConvo();
}

// Muestra la pregunta central del paper y sus 5 opciones (elegís cualquiera).
function renderPaper(id) {
  const p = (window.PAPERS || []).find((x) => x.id === id);
  if (!p) return viewConversations();
  app().innerHTML = `
    <header class="topbar">
      <button class="icon-btn" onclick="viewConversations()" title="Volver">←</button>
      <div class="brand">${p.emoji} ${esc(p.title)}</div>
      <div class="stats"><div class="stat">⭐ <b>${state.xp}</b></div></div>
    </header>
    <div class="quiz-prompt" style="margin-bottom:8px"><span class="quiz-emoji">❓</span><span>${esc(p.question)}</span></div>
    ${p.questionEs ? `<div class="gap-hint" style="margin-bottom:14px">${esc(p.questionEs)}</div>` : ""}
    <p class="muted" style="margin-bottom:12px">Elegí la opción que quieras y charlamos sobre esa:</p>
    <div class="deck-grid">
      ${p.options.map((o) => `<button class="deck-card" style="--c:#00b894" onclick="startOption('${p.id}','${o.id}')">
        <div class="deck-emoji">${o.emoji || p.emoji}</div>
        <div class="deck-name">${esc(o.label)}</div></button>`).join("")}
    </div>
    <footer class="home-footer"><button class="link-btn" onclick="viewConversations()">← Volver a los papers</button></footer>`;
}

function startOption(paperId, optionId) {
  const p = (window.PAPERS || []).find((x) => x.id === paperId);
  const o = p && (p.options || []).find((x) => x.id === optionId);
  if (!o) return viewConversations();
  session = { mode: "convo", paperId, optionId,
    convo: { id: paperId + ":" + optionId, emoji: o.emoji || p.emoji, steps: o.steps || [] },
    step: 0, transcript: [], good: 0, total: 0, voices: pickSpeakerVoices(2) };
  renderConvo();
}
function convoBubble(t) {
  return `<div class="bubble ${t.who}">${t.who === "teacher" ? "👩‍🏫" : "🧑"} ${esc(t.text)}${t.who === "teacher" && t.es ? `<div class="bubble-es">${esc(t.es)}</div>` : ""}</div>`;
}
function renderConvo() {
  const s = session, convo = s.convo;
  while (s.step < convo.steps.length && convo.steps[s.step].type === "teacher") {
    const t = convo.steps[s.step];
    const variants = (t.alts && t.alts.length) ? [t.en, ...t.alts] : [t.en];
    const text = variants[Math.floor(Math.random() * variants.length)];
    s.transcript.push({ who: "teacher", text, es: t.es });
    s.step++;
  }
  if (s.step >= convo.steps.length) return convoSummary();
  const step = convo.steps[s.step];
  const opts = shuffle(step.options);
  s._opts = opts;
  const pct = Math.round((s.step / convo.steps.length) * 100);
  app().innerHTML = `
    <div class="play-top">
      <button class="icon-btn" onclick="confirmExit()" title="Salir">\u2715</button>
      <div class="play-bar"><div class="play-bar-fill" style="width:${pct}%"></div></div>
      <div class="play-count">${convo.emoji}</div>
    </div>
    <div class="convo-scroll">${s.transcript.map(convoBubble).join("")}</div>
    <div class="convo-choices">${opts.map((o, i) => `<button class="option" onclick="convoChoose(${i})">${esc(o.en)}</button>`).join("")}</div>
    <div id="feedback" class="feedback"></div>`;
  const lastT = [...s.transcript].reverse().find((t) => t.who === "teacher");
  if (lastT) speak(lastT.text, s.voices && s.voices[0]);
}
function convoChoose(i) {
  const s = session, opts = s._opts, opt = opts[i];
  s.total++;
  if (opt.good) { s.good++; addXp(10); } else { addXp(2); }
  s.transcript.push({ who: "you", text: opt.en });
  document.querySelectorAll(".convo-choices .option").forEach((b, k) => {
    b.disabled = true;
    if (opts[k].good) b.classList.add("opt-correct");
    else if (k === i) b.classList.add("opt-wrong");
  });
  const best = opts.find((o) => o.good) || {};
  const fb = $("#feedback");
  fb.innerHTML = (opt.good
    ? `<div class="fb fb-ok">✅ ¡Buena respuesta!</div>`
    : `<div class="fb fb-no">${opt.note ? esc(opt.note) : "Hay una opción mejor."}<br><span class="fb-note">👉 ${esc(best.en || "")}</span></div>`)
    + `<button class="primary wide" onclick="convoAfter()">Seguir →</button>`;
  speak(opt.good ? opt.en : (best.en || opt.en), s.voices && s.voices[1]);
  if (opt.good) burst();
}
function convoAfter() { session.step++; renderConvo(); }
async function convoSummary() {
  bumpStreak(); ensureToday(); state.dailyStats.sessions++;
  const bonus = checkMissions(); await persist();
  const s = session, pct = s.total ? Math.round((s.good / s.total) * 100) : 100;
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">${pct >= 70 ? "🌟" : "💬"}</div>
      <h2>Conversación completada</h2>
      <div class="score">${s.good}/${s.total} buenas</div>
      ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
      <div class="summary-actions">
        <button class="primary" onclick="startOption('${s.paperId}','${s.optionId}')">🔁 De nuevo</button>
        <button class="ghost" onclick="renderPaper('${s.paperId}')">⬅️ Otra opción</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

// ============================================================
//  Escuchar una conversación completa (voces alternadas)
// ============================================================
function levelColor(l) { return l === "easy" ? "#00b894" : l === "medium" ? "#fdcb6e" : "#e74c6b"; }
function levelLabel(l) { return l === "easy" ? "Fácil · corta" : l === "medium" ? "Media" : "Difícil · larga"; }
function levelBadge(l) { return l === "easy" ? "🟢" : l === "medium" ? "🟡" : "🔴"; }

function startListening(id) {
  const d = (window.LISTENINGS || []).find((x) => x.id === id);
  if (!d) return viewConversations();
  session = { mode: "listen", d, voices: pickSpeakerVoices(Math.min(3, (d.speakers || []).length) || 2), i: -1, playing: false };
  renderListen();
}
function renderListen() {
  const s = session, d = s.d;
  const lines = d.lines.map((ln, idx) => `
    <div class="listen-line ${ln.sp % 2 ? "right" : "left"} ${idx === s.i ? "listen-current" : ""}" onclick="playFrom(${idx})">
      <div class="listen-sp">${ln.sp % 2 ? "🧑" : "👩"} ${esc((d.speakers || [])[ln.sp] || "")}</div>
      <div>${esc(ln.en)}</div>
      <div class="listen-es">${esc(ln.es)}</div>
    </div>`).join("");
  app().innerHTML = `
    <header class="topbar">
      <button class="icon-btn" onclick="backFromListen()" title="Volver">\u2190</button>
      <div class="brand">${d.emoji} ${esc(d.title)}</div>
      <div class="stats"><div class="stat">${levelBadge(d.level)}</div></div>
    </header>
    <p class="muted" style="margin-bottom:12px">Tocá "Escuchar todo" para oír la conversación, o tocá una línea para empezar desde ahí.</p>
    <div class="listen-scroll">${lines}</div>
    <div class="listen-controls">
      ${s.playing
        ? `<button class="primary" onclick="pauseListen()">\u23f8\ufe0f Pausar</button>`
        : `<button class="primary" onclick="playListen()">\u25b6\ufe0f Escuchar todo</button>`}
      <button class="ghost" onclick="replayListen()">\ud83d\udd01 Desde el inicio</button>
    </div>`;
}
function playListen() { session.playing = true; speakListenLine(session.i < 0 ? 0 : session.i); }
function playFrom(i) { session.playing = true; speakListenLine(i); }
function speakListenLine(i) {
  const s = session, d = s.d;
  if (!s.playing || i >= d.lines.length) { s.playing = false; s.i = -1; renderListen(); return; }
  s.i = i; renderListen();
  const ln = d.lines[i];
  const v = s.voices[ln.sp % Math.max(1, s.voices.length)];
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(ln.en);
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
    u.rate = 0.95;
    u.onend = () => { if (session && session.mode === "listen" && session.playing) speakListenLine(i + 1); };
    speechSynthesis.speak(u);
  } catch (e) { /* sin audio */ }
}
function pauseListen() { session.playing = false; try { speechSynthesis.cancel(); } catch (e) {} renderListen(); }
function replayListen() { session.playing = true; speakListenLine(0); }
function backFromListen() { if (session) session.playing = false; try { speechSynthesis.cancel(); } catch (e) {} viewConversations(); }

// ============================================================
//  🎤 Modo Pronunciación (reconocimiento de voz del navegador)
// ============================================================
function pronSupported() { return ("webkitSpeechRecognition" in window) || ("SpeechRecognition" in window); }
function pronSecure() { return window.isSecureContext || location.protocol.startsWith("http"); }

function startPron(deckId) {
  let pool = (!deckId || deckId === "__ALL__") ? allCards() : deckById(deckId).cards.map((c) => ({ ...c, deckId }));
  const multi = pool.filter((c) => c.en.trim().split(/\s+/).length >= 2);
  pool = multi.length ? multi : pool;
  session = { mode: "pron", deckId: deckId || "__ALL__", queue: shuffle(pool).slice(0, 8), index: 0, correct: 0, pool };
  renderPron();
}
function renderPron() {
  const s = session;
  if (s.index >= s.queue.length) return pronSummary();
  const card = s.queue[s.index];
  const n = s.index + 1, total = s.queue.length;
  const pct = Math.round((s.index / total) * 100);
  const warn = (!pronSupported() || !pronSecure())
    ? `<div class="fb fb-no" style="margin-bottom:12px">Para el micrófono, abrí el juego en <b>Chrome</b> y por <b>http</b> (no file://). Ej: <code>python3 -m http.server</code> y entrá a http://localhost:8000</div>`
    : "";
  app().innerHTML = `
    <div class="play-top">
      <button class="icon-btn" onclick="confirmExit()" title="Salir">\u2715</button>
      <div class="play-bar"><div class="play-bar-fill" style="width:${pct}%"></div></div>
      <div class="play-count">${n}/${total}</div>
    </div>
    ${warn}
    <div class="pron-target">
      <div class="pron-emoji">${card.emoji || "💬"}</div>
      <div class="pron-en">${esc(card.en)}</div>
      <button class="speak-btn" onclick="speak(${jsAttr(card.en)})" title="Escuchar">🔊</button>
      <div class="pron-es">${esc(card.es)}</div>
    </div>
    <div class="pron-controls">
      <button class="primary wide" id="micBtn" onclick="pronListen()">🎤 Tocá y leé la frase en voz alta</button>
    </div>
    <div id="pronResult" class="feedback"></div>`;
}
function resetMic() { const b = $("#micBtn"); if (b) { b.textContent = "🎤 Tocá y leé la frase en voz alta"; b.disabled = false; } }
function pronListen() {
  const res = $("#pronResult");
  if (!pronSupported() || !pronSecure()) {
    if (res) res.innerHTML = `<div class="fb fb-no">El reconocimiento de voz no está disponible acá. Usá Chrome y abrí por http.</div>`;
    return;
  }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new SR();
  rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 1;
  const btn = $("#micBtn"); if (btn) { btn.textContent = "🎙️ Escuchando... hablá ahora"; btn.disabled = true; }
  rec.onresult = (e) => { pronScore(e.results[0][0].transcript || ""); };
  rec.onerror = (e) => { if (res) res.innerHTML = `<div class="fb fb-no">No pude escuchar (${e.error}). Revisá el permiso del micrófono.</div>`; resetMic(); };
  rec.onend = () => resetMic();
  try { rec.start(); } catch (err) { if (res) res.innerHTML = `<div class="fb fb-no">No pude iniciar el micrófono.</div>`; resetMic(); }
}
function pronScore(said) {
  const card = session.queue[session.index];
  const target = normalize(card.en).split(" ").filter(Boolean);
  const saidSet = new Set(normalize(said).split(" ").filter(Boolean));
  let matched = 0;
  const html = target.map((w) => { const ok = saidSet.has(w); if (ok) matched++; return `<span class="${ok ? "pw-ok" : "pw-no"}">${esc(w)}</span>`; }).join(" ");
  const pct = target.length ? Math.round((matched / target.length) * 100) : 0;
  const good = pct >= 70;
  grade(card.id, good); if (good) session.correct++;
  const res = $("#pronResult");
  if (res) res.innerHTML = `
    <div class="pron-heard">Te escuché: "<i>${esc(said)}</i>"</div>
    <div class="pron-words">${html}</div>
    <div class="fb ${good ? "fb-ok" : "fb-close"}">${good ? "✅" : "👍"} ${pct}% de las palabras ${good ? "· ¡muy bien!" : "· seguí practicando"}</div>
    <div class="summary-actions">
      <button class="ghost" onclick="pronListen()">🎤 Reintentar</button>
      <button class="primary" onclick="pronNext()">Siguiente →</button>
    </div>`;
  if (good) burst();
}
function pronNext() { session.index++; renderPron(); }
async function pronSummary() {
  bumpStreak(); ensureToday(); state.dailyStats.sessions++;
  const bonus = checkMissions(); await persist();
  const s = session, pct = s.queue.length ? Math.round((s.correct / s.queue.length) * 100) : 0;
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">${pct >= 70 ? "🌟" : "🎤"}</div>
      <h2>Pronunciación terminada</h2>
      <div class="score">${s.correct}/${s.queue.length}</div>
      ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
      <div class="summary-actions">
        <button class="primary" onclick="startPron('${s.deckId}')">🔁 Otra ronda</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

// ============================================================
//  Tarjetero (guardar palabras/frases) + reset
// ============================================================
function isSaved(id) { return !!(state.saved && state.saved.includes(id)); }
function toggleSaved(id) {
  if (!state.saved) state.saved = [];
  const i = state.saved.indexOf(id);
  if (i >= 0) state.saved.splice(i, 1); else state.saved.push(id);
  persist();
}
function toggleSavedUI(id, el) {
  toggleSaved(id);
  if (el) el.innerHTML = isSaved(id) ? "🔖 Guardada" : (el.classList.contains("save-inline") ? "🔖 Guardar esta" : "🔖 Guardar");
}
async function resetProgress() {
  if (!confirm("¿Reiniciar TODO tu progreso? Borra XP, racha, medallas y guardadas. No se puede deshacer.")) return;
  state = Store.defaultState();
  await persist();
  renderHome();
}

// ============================================================
//  🧠 Modo Memoria (encontrar pares EN ↔ ES)
// ============================================================
function startMemory(deckId) {
  let pool = (!deckId || deckId === "__ALL__") ? allCards() : deckById(deckId).cards.map((c) => ({ ...c, deckId }));
  const picks = shuffle(pool).slice(0, 6);
  const tiles = shuffle(picks.flatMap((c) => [{ id: c.id, side: "en", text: c.en }, { id: c.id, side: "es", text: c.es }]));
  session = { mode: "memory", deckId: deckId || "__ALL__", tiles, flipped: [], matched: [], moves: 0, lock: false };
  renderMemory();
}
function renderMemory() {
  const s = session;
  const pairs = s.tiles.length / 2;
  const grid = s.tiles.map((t, i) => {
    const open = s.flipped.includes(i) || s.matched.includes(t.id);
    const done = s.matched.includes(t.id);
    return `<button class="mem-tile ${open ? "mem-open" : ""} ${done ? "mem-matched" : ""}" ${done ? "disabled" : ""} onclick="memFlip(${i})">${open ? esc(t.text) : "?"}</button>`;
  }).join("");
  app().innerHTML = `
    <div class="play-top">
      <button class="icon-btn" onclick="confirmExit()" title="Salir">\u2715</button>
      <div class="play-bar"><div class="play-bar-fill" style="width:${Math.round((s.matched.length / pairs) * 100)}%"></div></div>
      <div class="play-count">Movs: ${s.moves}</div>
    </div>
    <p class="quiz-prompt-label" style="text-align:center;margin-bottom:12px">Encontrá los pares (inglés \u2194 español) 🧠</p>
    <div class="mem-grid">${grid}</div>`;
}
function memFlip(i) {
  const s = session;
  if (s.lock) return;
  const t = s.tiles[i];
  if (s.matched.includes(t.id) || s.flipped.includes(i)) return;
  s.flipped.push(i);
  renderMemory();
  if (s.flipped.length === 2) {
    s.moves++;
    const [a, b] = s.flipped;
    const ta = s.tiles[a], tb = s.tiles[b];
    if (ta.id === tb.id && ta.side !== tb.side) {
      s.matched.push(ta.id); grade(ta.id, true); s.flipped = [];
      renderMemory(); burst();
      if (s.matched.length === s.tiles.length / 2) memSummary();
    } else {
      s.lock = true; renderMemory();
      setTimeout(() => { s.flipped = []; s.lock = false; renderMemory(); }, 900);
    }
  }
}
async function memSummary() {
  bumpStreak(); ensureToday(); state.dailyStats.sessions++;
  const bonus = checkMissions(); await persist();
  const s = session, pairs = s.tiles.length / 2;
  app().innerHTML = `
    <div class="center-screen">
      <div class="big-emoji">🧠</div>
      <h2>¡Memoria completa!</h2>
      <div class="score">${pairs} pares · ${s.moves} movimientos</div>
      ${bonus ? `<div class="pill pill-ok">🎁 +${bonus} XP por misiones</div>` : ""}
      <div class="summary-actions">
        <button class="primary" onclick="startMemory('${s.deckId}')">🔁 Otra</button>
        <button class="ghost" onclick="renderHome()">🏠 Inicio</button>
      </div>
    </div>`;
}

(async function init() {
  await Store.tryRestoreFile();
  state = await Store.load();
  renderHome();
})();
