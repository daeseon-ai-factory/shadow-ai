"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranslations } from "next-intl";
import type { TranscriptSegment } from "@/lib/api/videos";

interface Props {
  segments: TranscriptSegment[];
  currentMs: number;
  onSeek: (startMs: number) => void;
  selectedRange?: { startMs: number; endMs: number } | null;
  onSentenceClickForRange?: (sentence: TranscriptSegment) => void;
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
  const t = useTranslations("transcript");
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
        {t("emptyNote")}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {onSentenceClickForRange && (
        <div className="px-1 text-xs text-muted-foreground">
          {!selectedRange && t("hintInitial")}
          {selectedRange && selectionStep === "end" && t("hintAfterFirst")}
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
                {isRangeStart && <span className="mr-1 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">{t("markerStart")}</span>}
                {isRangeEnd && !isRangeStart && <span className="mr-1 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground">{t("markerEnd")}</span>}
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
