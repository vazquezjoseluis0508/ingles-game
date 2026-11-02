import { describe, expect, it } from "vitest";
import { checkGap, normalize } from "./check";

describe("normalize", () => {
  it("lowercases, trims and collapses spaces", () => {
    expect(normalize("  Was   Carried  Out ")).toBe("was carried out");
  });
  it("converts curly quotes to straight", () => {
    expect(normalize("hasn’t")).toBe("hasn't");
    expect(normalize("“hi”")).toBe('"hi"');
  });
});

describe("checkGap", () => {
  const answers = ["was carried out"];

  it("accepts the exact answer", () => {
    expect(checkGap("was carried out", answers)).toBe(true);
  });
  it("ignores casing", () => {
    expect(checkGap("WAS Carried OUT", answers)).toBe(true);
  });
  it("ignores extra spaces", () => {
    expect(checkGap("  was   carried  out  ", answers)).toBe(true);
  });
  it("ignores trailing punctuation", () => {
    expect(checkGap("was carried out.", answers)).toBe(true);
    expect(checkGap("was carried out!?", answers)).toBe(true);
  });
  it("normalizes curly apostrophes", () => {
    expect(checkGap("wasn’t found", ["wasn't found"])).toBe(true);
    expect(checkGap("wasn't found", ["wasn’t found"])).toBe(true);
  });
  it("accepts any listed variant", () => {
    const v = ["were not found", "weren't found"];
    expect(checkGap("weren't found", v)).toBe(true);
    expect(checkGap("were not found", v)).toBe(true);
  });
  it("does not accept unlisted contractions", () => {
    expect(checkGap("weren't found", ["were not found"])).toBe(false);
  });
  it("rejects a wrong answer", () => {
    expect(checkGap("carried out", answers)).toBe(false);
    expect(checkGap("was carry out", answers)).toBe(false);
  });
  it("rejects empty input", () => {
    expect(checkGap("   ", answers)).toBe(false);
    expect(checkGap("", [""])).toBe(false);
  });
});
