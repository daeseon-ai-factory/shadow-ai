"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { clipsApi } from "@/lib/api/clips";

export default function ClipPlayerPage({ params }: { params: Promise<{ clipId: string }> }) {
  const { clipId } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [currentMs, setCurrentMs] = useState(0);
  const [ready, setReady] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clip", clipId],
    queryFn: () => clipsApi.get(clipId),
  });

  // Once player + data are ready, seek to clip start.
  useEffect(() => {
    if (!ready || !data || !playerRef.current) return;
    playerRef.current.seekTo(data.startMs / 1000);
    playerRef.current.setPlaybackRate(playbackRate);
    playerRef.current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, data?.id]);

  // Apply playback rate changes live.
  useEffect(() => {
    if (ready) playerRef.current?.setPlaybackRate(playbackRate);
  }, [playbackRate, ready]);

  // Polling loop: track position + jump back to start when past endMs.
  useEffect(() => {
    if (!ready || !data) return;
    const handle = setInterval(() => {
      if (!playerRef.current) return;
      const nowMs = Math.floor(playerRef.current.getCurrentTime() * 1000);
      setCurrentMs(nowMs);
      if (loopEnabled && nowMs >= data.endMs) {
        playerRef.current.seekTo(data.startMs / 1000);
      }
    }, 200);
    return () => clearInterval(handle);
  }, [ready, data, loopEnabled]);

  if (isPending) return <p className="text-sm text-muted-foreground">클립 불러오는 중…</p>;
  if (isError) return <p className="text-sm text-red-600">{(error as Error).message}</p>;
  if (!data) return null;

  const duration = (data.endMs - data.startMs) / 1000;
  const elapsedInClip = Math.max(0, Math.min(duration, (currentMs - data.startMs) / 1000));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">{data.name}</h1>
          <p className="text-sm text-muted-foreground">
            {data.videoTitle} · {duration.toFixed(1)}초
          </p>
          <div className="flex flex-wrap gap-1">
            {data.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        </header>
        <YoutubePlayer
          ref={playerRef}
          videoId={data.youtubeId}
          onReady={() => setReady(true)}
        />
        <Card>
          <CardHeader>
            <CardTitle>속도 / 반복</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>재생 속도</span>
                <span className="font-mono">{playbackRate.toFixed(2)}x</span>
              </div>
              <Slider
                min={0.5}
                max={1.5}
                step={0.05}
                value={[playbackRate]}
                onValueChange={(v) => {
                  const next = Array.isArray(v) ? v[0] : v;
                  if (typeof next === "number") setPlaybackRate(next);
                }}
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant={loopEnabled ? "default" : "outline"}
                onClick={() => setLoopEnabled((x) => !x)}
              >
                {loopEnabled ? "무한 반복: ON" : "무한 반복: OFF"}
              </Button>
              <Button variant="outline" onClick={() => playerRef.current?.seekTo(data.startMs / 1000)}>
                처음부터
              </Button>
              <Link href={`/video/${data.videoId}`} className={buttonVariants({ variant: "ghost" })}>
                원본 영상으로
              </Link>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{elapsedInClip.toFixed(1)}초</span>
                <span>{duration.toFixed(1)}초</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-[width] duration-200"
                  style={{ width: `${(elapsedInClip / Math.max(duration, 0.1)) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>쉐도잉 자막</CardTitle>
          </CardHeader>
          <CardContent>
            {data.transcript ? (
              <p className="whitespace-pre-line text-xl leading-relaxed">{data.transcript}</p>
            ) : (
              <p className="text-sm text-muted-foreground">자막 없음</p>
            )}
          </CardContent>
        </Card>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>
          ← 라이브러리
        </Link>
      </div>
    </div>
  );
}
