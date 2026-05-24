"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { videosApi, type TranscriptSegment } from "@/lib/api/videos";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { TranscriptPanel } from "@/components/player/TranscriptPanel";
import { ClipCreatePanel, type SelectedRange } from "@/components/clip/ClipCreatePanel";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [currentMs, setCurrentMs] = useState(0);
  const [selectedRange, setSelectedRange] = useState<SelectedRange | null>(null);
  const [selectionStep, setSelectionStep] = useState<"start" | "end">("start");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["video", id],
    queryFn: () => videosApi.get(id),
  });

  useEffect(() => {
    if (!playerRef.current) return;
    const interval = setInterval(() => {
      if (playerRef.current?.isReady()) {
        setCurrentMs(Math.floor(playerRef.current.getCurrentTime() * 1000));
      }
    }, 250);
    return () => clearInterval(interval);
  }, [data]);

  if (isPending) return <p className="text-sm text-muted-foreground">영상 불러오는 중…</p>;
  if (isError) return <p className="text-sm text-red-600">불러오기 실패: {(error as Error).message}</p>;
  if (!data) return null;

  /**
   * Click-to-select state machine:
   *   "start" step  → set range to this single sentence, advance to "end"
   *   "end" step    → if click is after the current start, extend endMs;
   *                   if click is at/before the current start, reset start to this sentence (stay in "end")
   *   re-click the same start sentence → reset everything
   */
  const onSentenceClickForRange = (sentence: TranscriptSegment) => {
    if (!selectedRange) {
      setSelectedRange({ startMs: sentence.startMs, endMs: sentence.endMs });
      setSelectionStep("end");
      return;
    }
    if (sentence.startMs === selectedRange.startMs) {
      // toggle off — reset
      setSelectedRange(null);
      setSelectionStep("start");
      return;
    }
    if (sentence.startMs > selectedRange.startMs) {
      setSelectedRange({ startMs: selectedRange.startMs, endMs: sentence.endMs });
      setSelectionStep("start");
    } else {
      // clicked above the current start — re-anchor start
      setSelectedRange({ startMs: sentence.startMs, endMs: selectedRange.endMs });
    }
  };

  const sentenceCount = data.sentences?.length ?? 0;
  const rawCount = data.transcriptSegments?.length ?? 0;
  const isPortrait = data.orientation === "PORTRAIT";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{data.title}</h1>
            {data.transcriptStatus === "UNAVAILABLE" && (
              <Badge variant="destructive">자막 없음</Badge>
            )}
            {data.transcriptStatus === "READY" && (
              <Badge variant="secondary">자막 {sentenceCount}문장 (원본 {rawCount}개)</Badge>
            )}
            {isPortrait && <Badge variant="outline">Shorts (세로)</Badge>}
          </div>
          {data.channelName && <p className="text-sm text-muted-foreground">{data.channelName}</p>}
        </header>
        <YoutubePlayer ref={playerRef} videoId={data.youtubeId} orientation={data.orientation} />
        <ClipCreatePanel
          videoId={data.id}
          segments={data.sentences ?? data.transcriptSegments}
          currentMs={currentMs}
          selectedRange={selectedRange}
          setSelectedRange={(r) => {
            setSelectedRange(r);
            setSelectionStep(r ? "end" : "start");
          }}
          onSeek={(ms) => playerRef.current?.seekTo(ms / 1000)}
        />
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>자막</CardTitle>
            {selectedRange && (
              <Button size="sm" variant="ghost" onClick={() => { setSelectedRange(null); setSelectionStep("start"); }}>
                선택 초기화
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <TranscriptPanel
              segments={data.sentences ?? data.transcriptSegments}
              currentMs={currentMs}
              onSeek={(ms) => playerRef.current?.seekTo(ms / 1000)}
              selectedRange={selectedRange}
              onSentenceClickForRange={onSentenceClickForRange}
              selectionStep={selectionStep}
            />
          </CardContent>
        </Card>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>
          ← 라이브러리로 돌아가기
        </Link>
      </div>
    </div>
  );
}
