const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const normalized = s => String(s).trim().toLowerCase().replace(/[’]/g, "'").replace(/[.!?,;:]+$/, '');
async function harness(saved) {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) elements.set(id, { innerHTML: '', value: '', disabled: false, focus() {}, classList: { add() {}, remove() {} } });
    return elements.get(id);
  };
  const storage = new Map(saved ? [['senior5-game-progress-v1', JSON.stringify(saved)]] : []);
  const alerts = [];
  const c = vm.createContext({ window: {}, console, Date, Math, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    document: { querySelector: element, getElementById: id => element('#' + id), querySelectorAll: () => [], createElement: () => ({ style: {}, remove() {} }), body: { appendChild() {} } },
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k,v) => storage.set(k,v) }, alert: s => alerts.push(s), confirm: () => false });
  for (const file of ['data.js', 'store.js', 'app.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c, {filename:file});
  await new Promise(resolve => setImmediate(resolve));
  const run = source => vm.runInContext(source, c);
  return { run, c, alerts, storage, html: () => element('#app').innerHTML,
    async click(label) {
      const buttons = [...element('#app').innerHTML.matchAll(/<button\b[^>]*onclick="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g)];
      const b = buttons.find(x => x[2].includes(label));
      assert.ok(b, `Missing button ${label}`);
      await run(b[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
      await new Promise(resolve => setImmediate(resolve));
    } };
}
function approve(h, deck='rob-vs-steal') {h.run(`deckById('${deck}').cards.forEach(c=>{state.cards[c.id]={...cardState(c.id),practiceApproved:true}})`);}

test('quiz start presents the first question, not question two', async () => {
  const h=await harness(); h.run("startQuiz('final-exam')"); await h.click('Empezar');
  assert.equal(h.run('session.index'),0); assert.match(h.html(),/1\/\d+/);
});
test('quiz answer and completion each count once, with every question scored', async () => {
  const h=await harness(); h.run("startQuiz('final-exam')"); await h.click('Empezar');
  const ids=[];
  for(let i=0;i<h.run('session.questions.length');i++) {
    ids.push(h.run('session.questions[session.index].id'));
    h.run('verifyQuizAnswer(session.questions[session.index].correct)');
    const score=h.run('session.score');
    h.run('verifyQuizAnswer(session.questions[session.index].correct)');
    assert.equal(h.run('session.score'),score);
    await h.click('Siguiente');
  }
  assert.equal(new Set(ids).size,h.run('session.questions.length'));
  assert.equal(h.run('state.finalExam.pct'),100);
  const xp=h.run('state.xp'); await h.run('renderQuizSummary()');
  assert.equal(h.run('state.finalExam.totalAttempts'),1); assert.equal(h.run('state.xp'),xp);
  assert.equal(h.run('Object.keys(state.quizzes).length'),0);
});
test('an unanswered quiz question cannot be skipped',async()=>{
  const h=await harness();h.run("startQuiz('final-exam'); renderQuizQuestion(); nextQuizQuestion()");assert.equal(h.run('session.index'),0);
});
test('typing accepts declared alternatives but rejects wrong answers',async()=>{
  const h=await harness();approve(h,'past-modals');h.run("startQuiz('quiz-modal-deduction'); session.index=1; renderQuizQuestion(); verifyQuizAnswer(\"COULDN’T HAVE.\")");
  assert.equal(h.run('session.answers[0].isCorrect'),true);
  h.run("startQuiz('quiz-modal-deduction'); session.index=1; verifyQuizAnswer('must have')");assert.equal(h.run('session.answers[0].isCorrect'),false);
});
test('Back from intro, question, summary and retry returns to class; list launch returns to list',async()=>{
  const h=await harness();approve(h);const unit=h.run("getUnitIdByDeckId('rob-vs-steal')");
  h.run(`startQuiz('quiz-rob-vs-steal','${unit}')`);await h.click('Volver');assert.match(h.html(),/Clase 4/);
  h.run(`startQuiz('quiz-rob-vs-steal','${unit}'); renderQuizQuestion()`);await h.click('←');assert.match(h.html(),/Clase 4/);
  h.run(`startQuiz('quiz-rob-vs-steal','${unit}')`);await h.click('Empezar');
  while(h.run('session.index<session.questions.length')) {h.run('verifyQuizAnswer(session.questions[session.index].correct)');await h.click('Siguiente');}
  await h.click('Reintentar');await h.click('Volver');assert.match(h.html(),/Clase 4/);
  h.run("startQuiz('quiz-rob-vs-steal')");await h.click('Volver');assert.match(h.html(),/Quizzes Temáticos/);
});
test('learning and review never grant practice approval; practice errors preserve approvals',async()=>{
  const h=await harness();h.run("startSession('rob-vs-steal','learn'); nextLearn()");assert.equal(h.run("deckProgress(deckById('rob-vs-steal').cards).pct"),0);
  h.run("session.mode='review'; grade('rb01',true)");assert.equal(h.run("!!cardState('rb01').practiceApproved"),false);
  h.run("session.mode='practice'; grade('rb01',true); grade('rb01',false)");assert.equal(h.run("cardState('rb01').practiceApproved"),true);
  h.run("startSession('rob-vs-steal','learn'); nextLearn()");assert.equal(h.run("cardState('rb01').practiceApproved"),true);
});
test('explicit quiz mapping gates both Past Modals quizzes, final remains accessible',async()=>{
  const h=await harness();for(const q of ['quiz-modal-deduction','quiz-past-modals']) {h.run(`startQuiz('${q}')`);assert.equal(h.run('session'),null);}
  approve(h,'past-modals'); for(const q of ['quiz-modal-deduction','quiz-past-modals']) {h.run(`startQuiz('${q}')`);assert.equal(h.run('session.quizId'),q);}
  h.run("state.cards={}; startQuiz('final-exam')");assert.equal(h.run('session.quizId'),'final-exam');
});
test('failed thematic retry preserves approval, attempt history and reinforcement',async()=>{
  const h=await harness();approve(h);h.run("startQuiz('quiz-rob-vs-steal'); session.score=session.questions.reduce((n,q)=>n+q.points,0); session.index=session.questions.length");await h.run('renderQuizSummary()');
  h.run("startQuiz('quiz-rob-vs-steal'); session.index=session.questions.length");await h.run('renderQuizSummary()');
  assert.equal(h.run("state.quizzes['quiz-rob-vs-steal'].passed"),true);assert.equal(h.run("state.quizzes['quiz-rob-vs-steal'].attempts.length"),2);assert.equal(h.run("state.themesReinforced['rob-vs-steal']"),true);
});
test('weighted quiz score uses question points, not a fixed denominator',async()=>{
  const h=await harness();h.run("startQuiz('final-exam'); session.questions=[{id:'weight',points:20,correct:'yes',explanation:'test'}]; session.score=20; session.index=1");await h.run('renderQuizSummary()');assert.equal(h.run('state.finalExam.pct'),100);
});
test('old progress and final attempts are preserved and never reinterpreted as current denominator',async()=>{
  const old={cards:{rb01:{box:5,seen:9,correct:7,wrong:2,due:'2026-01-01'}},quizzes:{'quiz-past-modals':{passed:true,completed:1,bestScore:50}},finalExam:{score:40,pct:80,bestScore:50,totalAttempts:1,attempts:[{score:40,pct:80,passed:true}]}};
  const h=await harness(old);assert.equal(h.run('state.cards.rb01.box'),5);assert.equal(h.run('state.cards.rb01.practiceApproved'),undefined);
  assert.equal(h.run("state.quizzes['quiz-past-modals'].passed"),true);h.run('renderQuizzes()');assert.doesNotMatch(h.html(),/Mejor: 50\/190/);assert.match(h.html(),/Último intento: 80%/);
  assert.equal(h.run('state.finalExam.attempts[0].score'),40);
});
test('data has valid unique IDs, meaningful distinct options, complete answers and valid mappings',async()=>{
  const h=await harness(),d=h.c.window.GAME_DATA,decks=d.units.flatMap(u=>u.decks),quizzes=[...d.quizzes,d.finalExam];
  for(const items of [decks,decks.flatMap(d=>d.cards),quizzes,quizzes.flatMap(q=>q.questions)]) assert.equal(new Set(items.map(x=>x.id)).size,items.length);
  for(const quiz of d.quizzes) assert.ok(decks.some(d=>d.id===quiz.deckId),quiz.id);
  for(const deck of decks) assert.ok(d.quizzes.some(q=>q.deckId===deck.id),deck.id);
  for(const q of quizzes.flatMap(q=>q.questions)) {
    assert.ok(q.correct.trim()&&q.explanation.trim()&&q.points>0,q.id);
    assert.doesNotMatch(JSON.stringify(q),/Significado falso|Opción incorrecta|Mal:|el resto de:|Nunca se usa|Solo en pasado|Solo en futuro/i,q.id);
    if(q.type==='typing') assert.ok(!normalized(q.prompt).includes(normalized(q.correct)),q.id+' exposes answer');
    else {assert.equal(new Set(q.options.map(normalized)).size,q.options.length,q.id);assert.equal(q.options.filter(o=>normalized(o)===normalized(q.correct)).length,1,q.id);}
  }
});
test('final exam covers every current deck with explicit valid topic mappings',async()=>{
  const h=await harness(),d=h.c.window.GAME_DATA,ids=d.units.flatMap(u=>u.decks.map(d=>d.id));
  for(const id of ids) assert.ok(d.finalExam.questions.some(q=>q.deckId===id),id);
  for(const q of d.finalExam.questions) assert.ok(ids.includes(q.deckId),q.id);
  assert.equal(d.finalExam.id,'final-exam');for(let i=1;i<=5;i++) assert.ok(d.finalExam.questions.some(q=>q.id===`final-q${i}`));
});
