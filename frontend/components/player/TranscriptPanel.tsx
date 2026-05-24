"use client";

import { useEffect, useMemo, useRef } from "react";
import type { TranscriptSegment } from "@/lib/api/videos";

interface Props {
  segments: TranscriptSegment[];
  currentMs: number;
  onSeek: (startMs: number) => void;
  selectedRange?: { startMs: number; endMs: number } | null;
  /**
   * 1-click sets the range start, 2-click sets the end. Click on a sentence at-or-before
   * the current start resets it. Provide this to enable "click-to-select" UX; omit it
   * for read-only mode.
   */
  onSentenceClickForRange?: (sentence: TranscriptSegment) => void;
  /**
   * Hint for which click step the user is on. Drives the cursor + caption above.
   */
  selectionStep?: "start" | "end";
}

export function TranscriptPanel({
  segments,
  currentMs,
  onSeek,
  selectedRange,
  onSentenceClickForRange,
  selectionStep,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const activeIndex = useMemo(() => {
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      if (currentMs >= s.startMs && currentMs < s.endMs) return i;
    }
    return -1;
  }, [segments, currentMs]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const item = containerRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    item?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIndex]);

  if (segments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
        이 영상에는 자막이 없습니다. 영상 위에서 구간을 만들 수는 있지만 자막은 비어 있습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {onSentenceClickForRange && (
        <div className="px-1 text-xs text-muted-foreground">
          {!selectedRange && "자막을 클릭하면 시작점, 한 번 더 클릭하면 끝점이 됩니다."}
          {selectedRange && selectionStep === "end" && "끝낼 자막을 한 번 더 클릭하세요. (다시 시작 자막을 누르면 처음부터)"}
        </div>
      )}
      <div
        ref={containerRef}
        className="max-h-[60vh] divide-y overflow-y-auto rounded-lg border bg-card"
      >
        {segments.map((segment, idx) => {
          const isActive = idx === activeIndex;
          const isInRange = !!selectedRange &&
            segment.startMs >= selectedRange.startMs &&
            segment.endMs <= selectedRange.endMs;
          const isRangeStart = !!selectedRange && segment.startMs === selectedRange.startMs;
          const isRangeEnd = !!selectedRange && segment.endMs === selectedRange.endMs;

          return (
            <button
              type="button"
              key={`${segment.startMs}-${idx}`}
              data-idx={idx}
              onClick={() => {
                onSeek(segment.startMs);
                onSentenceClickForRange?.(segment);
              }}
              className={`flex w-full items-start gap-3 px-4 py-2 text-left text-sm transition-colors ${
                isActive ? "bg-primary/10 font-medium" : "hover:bg-muted"
              } ${isInRange ? "border-l-4 border-primary bg-primary/5" : ""} ${
                isRangeStart || isRangeEnd ? "ring-1 ring-primary/40" : ""
              }`}
            >
              <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">
                {formatTime(segment.startMs)}
              </span>
              <span className="flex-1 leading-relaxed">
                {isRangeStart && <span className="mr-1 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">시작</span>}
                {isRangeEnd && !isRangeStart && <span className="mr-1 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">끝</span>}
                {segment.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
