/** Prefix an internal path with the configured base (e.g. "/ingles-game/dossier"). */
export function url(path = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export const moduleSlug = (moduleNumber: number): string => `modulo-${moduleNumber}`;
export const lessonSlug = (lessonId: string): string => lessonId.replace(/\./g, "-");
export const lessonUrl = (moduleNumber: number, lessonId: string): string =>
  url(`${moduleSlug(moduleNumber)}/${lessonSlug(lessonId)}/`);
