export const STORAGE_KEY = "ingles-dossier:progress:v1";

/** State of one exercise item. `correct` is null until the student has answered. */
export interface ItemState {
  correct: boolean | null;
  /** Typed text (gap/translate) or chosen option index (choice). */
  answer?: string | number;
  /** Translation only: model answer already revealed. */
  revealed?: boolean;
}

export type LessonProgress = Record<string, ItemState>;
export type ProgressStore = Record<string, LessonProgress>;

export interface Score {
  total: number;
  answered: number;
  correct: number;
}

export function loadStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === "object" ? (parsed as ProgressStore) : {};
  } catch {
    return {};
  }
}

function saveStore(store: ProgressStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Storage unavailable (private mode, quota): the book still works, just without persistence.
  }
}

export function getLesson(lessonId: string): LessonProgress {
  return loadStore()[lessonId] ?? {};
}

export function saveItem(lessonId: string, key: string, state: ItemState): void {
  const store = loadStore();
  store[lessonId] = { ...store[lessonId], [key]: state };
  saveStore(store);
}

export function resetLesson(lessonId: string): void {
  const store = loadStore();
  delete store[lessonId];
  saveStore(store);
}

export function scoreLesson(progress: LessonProgress, total: number): Score {
  const states = Object.values(progress);
  return {
    total,
    answered: states.filter((s) => s.correct !== null).length,
    correct: states.filter((s) => s.correct === true).length,
  };
}
