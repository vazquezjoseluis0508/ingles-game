import { checkGap } from "../lib/check";
import { getLesson, resetLesson, saveItem, scoreLesson, type ItemState } from "../lib/progress";

const lessonEl = document.querySelector<HTMLElement>("[data-lesson]");
if (lessonEl) init(lessonEl);

function init(root: HTMLElement) {
  const lessonId = root.dataset.lessonId ?? "";
  const total = Number(root.dataset.total);
  const items = [...root.querySelectorAll<HTMLElement>("[data-item]")];
  const scoreEl = root.querySelector<HTMLElement>("[data-score]");

  const refreshScore = () => {
    if (!scoreEl) return;
    const s = scoreLesson(getLesson(lessonId), total);
    scoreEl.textContent =
      s.answered === 0
        ? `${total} ejercicios`
        : `Respondidas ${s.answered}/${total} · Correctas ${s.correct}`;
  };

  const commit = (item: HTMLElement, state: ItemState) => {
    saveItem(lessonId, item.dataset.key ?? "", state);
    refreshScore();
  };

  for (const item of items) {
    const type = item.dataset.type;
    if (type === "gap") setupGap(item, commit);
    else if (type === "choice") setupChoice(item, commit);
    else if (type === "translate") setupTranslate(item, commit);
  }

  // Restore saved state.
  const saved = getLesson(lessonId);
  for (const item of items) {
    const state = saved[item.dataset.key ?? ""];
    if (state) restore(item, state);
  }
  refreshScore();

  root.querySelector("[data-reset]")?.addEventListener("click", () => {
    if (!confirm("¿Reiniciar esta lección? Se borrarán tus respuestas guardadas.")) return;
    resetLesson(lessonId);
    items.forEach(clear);
    refreshScore();
  });

  setupDrawer();
}

type Commit = (item: HTMLElement, state: ItemState) => void;

function showFeedback(item: HTMLElement, correct: boolean | null, verdict: string) {
  const fb = item.querySelector<HTMLElement>("[data-feedback]");
  if (!fb) return;
  fb.hidden = false;
  fb.classList.toggle("ok", correct === true);
  fb.classList.toggle("bad", correct === false);
  const v = fb.querySelector<HTMLElement>("[data-verdict]");
  if (v) v.textContent = verdict;
}

function setupGap(item: HTMLElement, commit: Commit) {
  const input = item.querySelector<HTMLInputElement>("[data-input]")!;
  const answers: string[] = JSON.parse(item.dataset.answers ?? "[]");
  const run = () => {
    const correct = checkGap(input.value, answers);
    showFeedback(item, correct, correct ? "¡Correcto!" : "Todavía no.");
    input.classList.toggle("ok", correct);
    input.classList.toggle("bad", !correct);
    commit(item, { correct, answer: input.value });
  };
  item.querySelector("[data-check]")?.addEventListener("click", run);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") run();
  });
}

function setupChoice(item: HTMLElement, commit: Commit) {
  const options = [...item.querySelectorAll<HTMLButtonElement>("[data-option]")];
  const right = Number(item.dataset.answer);
  options.forEach((btn) =>
    btn.addEventListener("click", () => {
      if (item.dataset.locked) return;
      const picked = Number(btn.dataset.option);
      const correct = picked === right;
      applyChoice(item, picked, correct);
      commit(item, { correct, answer: picked });
    }),
  );
}

function applyChoice(item: HTMLElement, picked: number, correct: boolean) {
  const right = Number(item.dataset.answer);
  item.dataset.locked = "1";
  item.querySelectorAll<HTMLButtonElement>("[data-option]").forEach((btn) => {
    const i = Number(btn.dataset.option);
    btn.disabled = true;
    btn.classList.toggle("ok", i === right);
    btn.classList.toggle("bad", i === picked && !correct);
  });
  showFeedback(item, correct, correct ? "¡Correcto!" : "Incorrecto.");
}

function setupTranslate(item: HTMLElement, commit: Commit) {
  const input = item.querySelector<HTMLTextAreaElement>("[data-input]")!;
  item.querySelector("[data-reveal]")?.addEventListener("click", () => {
    applyReveal(item);
    commit(item, { correct: null, answer: input.value, revealed: true });
  });
  item.querySelectorAll<HTMLButtonElement>("[data-self]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const correct = btn.dataset.self === "ok";
      applySelf(item, correct);
      commit(item, { correct, answer: input.value, revealed: true });
    }),
  );
}

function applyReveal(item: HTMLElement) {
  showFeedback(item, null, "");
  item.querySelector<HTMLElement>("[data-reveal]")!.hidden = true;
}

function applySelf(item: HTMLElement, correct: boolean) {
  applyReveal(item);
  showFeedback(item, correct, correct ? "Marcada como bien." : "Marcada para repasar.");
  item.querySelectorAll<HTMLButtonElement>("[data-self]").forEach((b) => {
    b.classList.toggle("selected", (b.dataset.self === "ok") === correct);
  });
}

function restore(item: HTMLElement, state: ItemState) {
  const type = item.dataset.type;
  const input = item.querySelector<HTMLInputElement | HTMLTextAreaElement>("[data-input]");
  if (state.correct === null && !state.revealed) return;
  if (type === "gap" && input && state.correct !== null) {
    input.value = String(state.answer ?? "");
    input.classList.toggle("ok", state.correct);
    input.classList.toggle("bad", !state.correct);
    showFeedback(item, state.correct, state.correct ? "¡Correcto!" : "Todavía no.");
  } else if (type === "choice" && state.correct !== null) {
    applyChoice(item, Number(state.answer), state.correct);
  } else if (type === "translate") {
    if (input) input.value = String(state.answer ?? "");
    if (state.correct === null) applyReveal(item);
    else applySelf(item, state.correct);
  }
}

function clear(item: HTMLElement) {
  delete item.dataset.locked;
  const fb = item.querySelector<HTMLElement>("[data-feedback]");
  if (fb) {
    fb.hidden = true;
    fb.classList.remove("ok", "bad");
  }
  item.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("[data-input]").forEach((el) => {
    el.value = "";
    el.classList.remove("ok", "bad");
  });
  item.querySelectorAll<HTMLButtonElement>("[data-option]").forEach((b) => {
    b.disabled = false;
    b.classList.remove("ok", "bad");
  });
  item.querySelectorAll<HTMLElement>("[data-self]").forEach((b) => b.classList.remove("selected"));
  const reveal = item.querySelector<HTMLElement>("[data-reveal]");
  if (reveal) reveal.hidden = false;
}

function setupDrawer() {
  const drawer = document.querySelector<HTMLDialogElement>("[data-drawer]");
  const fab = document.querySelector<HTMLElement>("[data-open-theory]");
  if (!drawer || !fab) return;
  const wide = window.matchMedia("(min-width: 960px)");

  const open = () => {
    if (drawer.open) return;
    // Desktop: non-modal side panel so exercises stay usable. Mobile: modal bottom sheet.
    if (wide.matches) drawer.show();
    else drawer.showModal();
  };
  const close = () => drawer.close();

  fab.addEventListener("click", () => (drawer.open ? close() : open()));
  drawer.querySelector("[data-close-theory]")?.addEventListener("click", close);
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) close(); // backdrop click on the modal variant
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.open) close();
  });

  // Only show the floating button while the student is in the exercises section.
  const exercises = document.querySelector("[data-exercises]");
  if ("IntersectionObserver" in window && exercises) {
    fab.classList.add("js-hidden");
    new IntersectionObserver(([entry]) => fab.classList.toggle("js-hidden", !entry.isIntersecting && !drawer.open), {
      threshold: 0,
    }).observe(exercises);
    drawer.addEventListener("close", () => fab.classList.toggle("js-hidden", !isInView(exercises)));
  }
}

function isInView(el: Element): boolean {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
}
