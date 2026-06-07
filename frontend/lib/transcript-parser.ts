import type { TranscriptSegment } from "@/lib/api/videos";

const TIMESTAMP_RE = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?$/;
const TIMESTAMP_PREFIX_RE = /^(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:[.,](\d{1,3}))?\s+(.+)$/;
const VTT_RANGE_RE =
  /^((?:(?:\d{1,2}:)?\d{1,2}:)?\d{2}(?:[.,]\d{1,3})?)\s+-->\s+((?:(?:\d{1,2}:)?\d{1,2}:)?\d{2}(?:[.,]\d{1,3})?)/;

function parseTimestampParts(
  hoursRaw: string | undefined,
  minutesRaw: string,
  secondsRaw: string,
  millisRaw?: string,
): number {
  const hours = hoursRaw ? Number(hoursRaw) : 0;
  const minutes = Number(minutesRaw);
  const seconds = Number(secondsRaw);
  const millis = millisRaw ? Number(millisRaw.padEnd(3, "0").slice(0, 3)) : 0;
  return Math.round(((hours * 60 * 60 + minutes * 60 + seconds) * 1000) + millis);
}

function parseTimestamp(value: string): number | null {
  const match = value.trim().match(TIMESTAMP_RE);
  if (!match) return null;
  return parseTimestampParts(match[1], match[2], match[3], match[4]);
}

function cleanText(value: string): string {
  return value
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function withEndTimes(starts: Array<{ startMs: number; text: string }>): TranscriptSegment[] {
  const segments: TranscriptSegment[] = [];
  for (let i = 0; i < starts.length; i++) {
    const current = starts[i];
    const next = starts[i + 1];
    const endMs = next ? next.startMs : current.startMs + 4000;
    if (current.text && endMs > current.startMs) {
      segments.push({ startMs: current.startMs, endMs, text: current.text });
    }
  }
  return segments;
}

function parseVttLike(input: string): TranscriptSegment[] {
  const blocks = input.split(/\n\s*\n/g);
  const segments: TranscriptSegment[] = [];

  for (const block of blocks) {
    const lines = block
      .split(/\r?\n/g)
      .map((line) => line.trim())
      .filter(Boolean);
    const cue = lines.findIndex((line) => VTT_RANGE_RE.test(line));
    if (cue < 0) continue;

    const match = lines[cue].match(VTT_RANGE_RE);
    const startMs = match ? parseTimestamp(match[1]) : null;
    const endMs = match ? parseTimestamp(match[2]) : null;
    const text = cleanText(lines.slice(cue + 1).join(" "));
    if (startMs !== null && endMs !== null && endMs > startMs && text) {
      segments.push({ startMs, endMs, text });
    }
  }

  return segments;
}

export function parsePastedTranscript(input: string): TranscriptSegment[] {
  const vttSegments = parseVttLike(input);
  if (vttSegments.length > 0) return vttSegments;

  const starts: Array<{ startMs: number; text: string }> = [];
  let pendingStart: number | null = null;
  let pendingText: string[] = [];

  const flush = () => {
    if (pendingStart === null) return;
    const text = cleanText(pendingText.join(" "));
    if (text) starts.push({ startMs: pendingStart, text });
    pendingStart = null;
    pendingText = [];
  };

  for (const rawLine of input.split(/\r?\n/g)) {
    const line = rawLine.trim();
    if (!line) continue;

    const inline = line.match(TIMESTAMP_PREFIX_RE);
    if (inline) {
      flush();
      pendingStart = parseTimestampParts(inline[1], inline[2], inline[3], inline[4]);
      pendingText = [inline[5]];
      continue;
    }

    const standalone = parseTimestamp(line);
    if (standalone !== null) {
      flush();
      pendingStart = standalone;
      continue;
    }

    if (pendingStart !== null) {
      pendingText.push(line);
    }
  }
  flush();

  return withEndTimes(starts);
}
