"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { AnalysisPanel } from "@/components/clip/AnalysisPanel";
import { ClipNote } from "@/components/clip/ClipNote";
import { RecordingPanel } from "@/components/recording/RecordingPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShortcutHelp } from "@/components/ShortcutHelp";
import { useShortcuts } from "@/lib/use-shortcuts";
import { clipsApi } from "@/lib/api/clips";

const SPEED_STEP = 0.05;

export default function ClipPlayerPage({ params }: { params: Promise<{ clipId: string }> }) {
  const { clipId } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [currentMs, setCurrentMs] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clip", clipId],
    queryFn: () => clipsApi.get(clipId),
  });

  useEffect(() => {
    if (!ready || !data || !playerRef.current) return;
    playerRef.current.seekTo(data.startMs / 1000);
    playerRef.current.setPlaybackRate(playbackRate);
    playerRef.current.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, data?.id]);

  useEffect(() => {
    if (ready) playerRef.current?.setPlaybackRate(playbackRate);
  }, [playbackRate, ready]);

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

  const togglePlay = () => {
    if (playing) {
      playerRef.current?.pause();
      setPlaying(false);
    } else {
      playerRef.current?.play();
      setPlaying(true);
    }
  };

  useShortcuts([
    { key: "Space", description: "재생/일시정지", action: togglePlay, when: () => ready },
    { key: "r", description: "처음부터", action: () => data && playerRef.current?.seekTo(data.startMs / 1000), when: () => ready && !!data },
    { key: "l", description: "무한 반복 토글", action: () => setLoopEnabled((v) => !v) },
    { key: ".", description: "재생 속도 +0.05", action: () => setPlaybackRate((v) => Math.min(1.5, +(v + SPEED_STEP).toFixed(2))) },
    { key: ",", description: "재생 속도 -0.05", action: () => setPlaybackRate((v) => Math.max(0.5, +(v - SPEED_STEP).toFixed(2))) },
    { key: "0", description: "속도 1.0x로 리셋", action: () => setPlaybackRate(1.0) },
  ]);

  if (isPending) return <p className="text-sm text-muted-foreground">클립 불러오는 중…</p>;
  if (isError) return <p className="text-sm text-red-600">{(error as Error).message}</p>;
  if (!data) return null;

  const duration = (data.endMs - data.startMs) / 1000;
  const elapsedInClip = Math.max(0, Math.min(duration, (currentMs - data.startMs) / 1000));

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-4">
        <header className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{data.name}</h1>
            <p className="text-sm text-muted-foreground">
              {data.videoTitle} · {duration.toFixed(1)}초
            </p>
            <div className="flex flex-wrap gap-1">
              {data.tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          </div>
          <ShortcutHelp
            groups={[
              {
                title: "재생",
                items: [
                  { keys: ["Space"], description: "재생 / 일시정지" },
                  { keys: ["R"], description: "처음부터" },
                  { keys: ["L"], description: "무한 반복 토글" },
                  { keys: [","], description: "속도 -0.05" },
                  { keys: ["."], description: "속도 +0.05" },
                  { keys: ["0"], description: "속도 1.0x" },
                ],
              },
            ]}
          />
        </header>
        <YoutubePlayer
          ref={playerRef}
          videoId={data.youtubeId}
          orientation={data.videoOrientation}
          onReady={() => setReady(true)}
          onStateChange={(state) => setPlaying(state === 1)}
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
        {/* 4 panels in tabs (mobile-first) — AnalysisPanel takes the whole clip (byoai) */}
        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="script">자막</TabsTrigger>
            <TabsTrigger value="note">노트</TabsTrigger>
            <TabsTrigger value="ai">AI</TabsTrigger>
            <TabsTrigger value="record">녹음</TabsTrigger>
          </TabsList>
          <TabsContent value="script" className="mt-3">
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
          </TabsContent>
          <TabsContent value="note" className="mt-3">
            <ClipNote clip={data} />
          </TabsContent>
          <TabsContent value="ai" className="mt-3">
            <AnalysisPanel clip={data} />
          </TabsContent>
          <TabsContent value="record" className="mt-3">
            <RecordingPanel
              clipId={data.id}
              onPlayOriginal={() => {
                playerRef.current?.seekTo(data.startMs / 1000);
                playerRef.current?.play();
              }}
            />
          </TabsContent>
        </Tabs>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>
          ← 라이브러리
        </Link>
      </div>
    </div>
  );
}
