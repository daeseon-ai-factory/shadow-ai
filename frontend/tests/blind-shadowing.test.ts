import { describe, it, expect } from "vitest";
import { transform } from "@/components/clip/BlindShadowingPanel";

describe("BlindShadowingPanel.transform", () => {
  it("level 2 returns text unchanged", () => {
    expect(transform("Hello, world!", 2)).toBe("Hello, world!");
  });

  it("level 1 keeps first letter, blanks the rest, preserves punctuation", () => {
    expect(transform("Hello, world!", 1)).toBe("H____, w____!");
  });

  it("level 0 replaces every letter with block, preserves punctuation + spacing", () => {
    expect(transform("Hello, world!", 0)).toBe("▮▮▮▮▮, ▮▮▮▮▮!");
  });

  it("level 1 leaves single-letter words alone", () => {
    expect(transform("I am a dev", 1)).toBe("I a_ a d__");
  });

  it("works on multi-line input", () => {
    expect(transform("foo bar\nbaz", 0)).toBe("▮▮▮ ▮▮▮\n▮▮▮");
  });

  it("handles non-ASCII letters (Korean)", () => {
    // \p{L} matches Korean syllables, so they get blanked too.
    expect(transform("안녕 hello", 0)).toBe("▮▮ ▮▮▮▮▮");
  });

  it("level 1 on Korean keeps first syllable + blanks for rest", () => {
    expect(transform("안녕하세요", 1)).toBe("안____");
  });
});
