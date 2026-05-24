"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { videosApi } from "@/lib/api/videos";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { TranscriptPanel } from "@/components/player/TranscriptPanel";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [currentMs, setCurrentMs] = useState(0);
  const [selectedRange, setSelectedRange] = useState<{ startMs: number; endMs: number } | null>(null);

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
              <Badge variant="secondary">자막 {data.transcriptSegments.length}개</Badge>
            )}
          </div>
          {data.channelName && <p className="text-sm text-muted-foreground">{data.channelName}</p>}
        </header>
        <YoutubePlayer ref={playerRef} videoId={data.youtubeId} />
        <Card>
          <CardHeader>
            <CardTitle>현재 위치</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {Math.floor(currentMs / 1000)}초 / 자막 {data.transcriptSegments.length}개
            </p>
            {selectedRange && (
              <p className="text-sm mt-2">
                선택 범위: {selectedRange.startMs}ms ~ {selectedRange.endMs}ms (STAGE 4에서 클립 저장 UI 추가)
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>자막</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <TranscriptPanel
              segments={data.transcriptSegments}
              currentMs={currentMs}
              onSeek={(ms) => playerRef.current?.seekTo(ms / 1000)}
              selectedRange={selectedRange}
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
