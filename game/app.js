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

function speak(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = Voice.best();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
    u.rate = 0.95; u.pitch = 1.0;
    speechSynthesis.speak(u);
  } catch { /* sin audio, no pasa nada */ }
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
      ${storageBadge()}
    </section>

    ${renderMissions()}

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
    </div>

    ${voicePicker()}

    <footer class="home-footer">
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
  else pool = deckById(deckId).cards.map((c) => ({ ...c, deckId }));
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
      <button class="icon-btn" onclick="confirmExit()" title="Salir">✕</button>
      <div class="arcade-stats"><span class="combo">🔥 x${s.combo || 0}</span><span class="score">⭐ ${s.score || 0}</span></div>
      <div class="play-count">${n}/${total}</div>
    </div>
    <div class="timer-bar"><div id="timerFill" class="timer-fill" style="width:100%"></div></div>`;
  }
  return `
    <div class="play-top">
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

  const card = s.queue[s.index];
  const n = s.index + 1, total = s.queue.length;
  const pct = Math.round((s.index / total) * 100);

  const header = playHeader(n, total, pct);

  if (s.mode === "learn") { app().innerHTML = header + renderLearn(card); return; }

  // Arcade = solo opción múltiple (reflejos). Boss = más escribir. Resto 45%.
  const typingRatio = s.mode === "boss" ? 0.6 : s.mode === "arcade" ? 0 : 0.45;
  const useTyping = Math.random() < typingRatio;
  app().innerHTML = header + (useTyping ? renderTyping(card) : renderMultipleChoice(card));
  if (useTyping) setTimeout(() => { const i = $("#typeInput"); if (i) i.focus(); }, 50);
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
const normalize = (s) => String(s).toLowerCase().trim()
  .replace(/[.,!?;:]/g, "").replace(/[’'`]/g, "'").replace(/\s+/g, " ");

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
  const correct = normalize(input.value) === normalize(session._answer);
  input.disabled = true;
  input.classList.add(correct ? "type-ok" : "type-no");
  afterAnswer(correct, card);
}
function skipTyping() {
  const card = session.queue[session.index];
  const input = $("#typeInput");
  if (input) { input.disabled = true; input.classList.add("type-no"); }
  afterAnswer(false, card);
}

// ---------- resultado común a MC y typing ----------
function afterAnswer(correct, card) {
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
  fb.innerHTML = correct
    ? `<div class="fb fb-ok">✅ ¡Muy bien!</div>`
    : `<div class="fb fb-no">❌ Correcto: <b>${esc(session._answer)}</b>${showNote ? `<br><span class="fb-note">💡 ${esc(card.note)}</span>` : ""}</div>`;

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
      <div class="summary-actions">
        <button class="primary" onclick="startSession('${s.deckId}','${s.mode}')">🔁 Otra ronda</button>
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
async function importProgress() {
  try { state = await Store.importFile(); await persist(); renderHome(); alert("Progreso importado ✅"); }
  catch (e) { if (e.message !== "no-file") alert("No se pudo importar: " + e.message); }
}

// ============================================================
//  Arranque
// ============================================================
(async function init() {
  await Store.tryRestoreFile();
  state = await Store.load();
  renderHome();
})();
