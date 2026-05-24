"use client";

import { useEffect, useMemo, useRef } from "react";
import type { TranscriptSegment } from "@/lib/api/videos";

interface Props {
  segments: TranscriptSegment[];
  currentMs: number;
  onSeek: (startMs: number) => void;
  selectedRange?: { startMs: number; endMs: number } | null;
  onToggleSegment?: (segment: TranscriptSegment) => void;
}

export function TranscriptPanel({ segments, currentMs, onSeek, selectedRange, onToggleSegment }: Props) {
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
        이 영상에는 자막이 없습니다. 영상 위에서 클립을 만들 수 있지만 자막은 비어 있습니다.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-h-[60vh] divide-y overflow-y-auto rounded-lg border bg-card"
    >
      {segments.map((segment, idx) => {
        const isActive = idx === activeIndex;
        const isInRange = selectedRange &&
          segment.startMs >= selectedRange.startMs &&
          segment.endMs <= selectedRange.endMs;
        return (
          <div
            key={`${segment.startMs}-${idx}`}
            data-idx={idx}
            className={`flex cursor-pointer items-start gap-3 px-4 py-2 text-sm transition-colors ${
              isActive ? "bg-primary/10 font-medium" : "hover:bg-muted"
            } ${isInRange ? "border-l-4 border-primary bg-primary/5" : ""}`}
            onClick={() => onSeek(segment.startMs)}
            onDoubleClick={() => onToggleSegment?.(segment)}
            role="button"
            tabIndex={0}
          >
            <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">
              {formatTime(segment.startMs)}
            </span>
            <span className="flex-1 leading-relaxed">{segment.text}</span>
          </div>
        );
      })}
    </div>
  );
}

function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
