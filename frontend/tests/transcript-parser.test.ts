import { describe, expect, it } from "vitest";
import { parsePastedTranscript } from "@/lib/transcript-parser";

describe("parsePastedTranscript", () => {
  it("parses YouTube transcript lines with inline timestamps", () => {
    const segments = parsePastedTranscript(`
0:00 Hello world
0:03 This is the next line
0:08 Keep going
`);

    expect(segments).toEqual([
      { startMs: 0, endMs: 3000, text: "Hello world" },
      { startMs: 3000, endMs: 8000, text: "This is the next line" },
      { startMs: 8000, endMs: 12000, text: "Keep going" },
    ]);
  });

  it("parses YouTube transcript lines where timestamps and text are split", () => {
    const segments = parsePastedTranscript(`
0:00
Hello world
0:03
This is the next line
with wrapped text
`);

    expect(segments).toEqual([
      { startMs: 0, endMs: 3000, text: "Hello world" },
      { startMs: 3000, endMs: 7000, text: "This is the next line with wrapped text" },
    ]);
  });

  it("parses VTT cue blocks", () => {
    const segments = parsePastedTranscript(`
WEBVTT

00:00:01.000 --> 00:00:03.500
Hello <b>world</b>

00:00:03.500 --> 00:00:05.000
Next line
`);

    expect(segments).toEqual([
      { startMs: 1000, endMs: 3500, text: "Hello world" },
      { startMs: 3500, endMs: 5000, text: "Next line" },
    ]);
  });
});
