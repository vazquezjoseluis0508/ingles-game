/** Normalize free text for lenient comparison. */
export function normalize(text: string): string {
  return text
    .replace(/[‘’‛ʼ]/g, "'")
    .replace(/[“”„]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function clean(text: string): string {
  return normalize(text)
    .replace(/[.,;:!?\s]+$/g, "")
    .trim();
}

/** True when the input matches any accepted answer (case, spaces, final punctuation and quote style ignored). */
export function checkGap(input: string, answers: string[]): boolean {
  const given = clean(input);
  if (given === "") return false;
  return answers.some((answer) => clean(answer) === given);
}
