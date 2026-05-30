"use client";

import { use, useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { AnalysisPanel } from "@/components/clip/AnalysisPanel";
import { BlindShadowingPanel } from "@/components/clip/BlindShadowingPanel";
import { ChunkShadowingPanel } from "@/components/clip/ChunkShadowingPanel";
import { ClipNote } from "@/components/clip/ClipNote";
import { RecordingPanel } from "@/components/recording/RecordingPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShortcutHelp } from "@/components/ShortcutHelp";
import { useShortcuts } from "@/lib/use-shortcuts";
import { clipsApi } from "@/lib/api/clips";

const SPEED_STEP = 0.05;

const AUDIO_MODE_KEY = "tubeshadow.audioOnly";
const AUTOPLAY_KEY = "tubeshadow.autoplayNext";

export default function ClipPlayerPage({ params }: { params: Promise<{ clipId: string }> }) {
  const t = useTranslations("clipPlayer");
  const tAudio = useTranslations("audioMode");
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckParam = searchParams?.get("deck") ?? null;  // "INBOX" / deckId / null

  const { clipId } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loopEnabled, setLoopEnabled] = useState(true);
  const [currentMs, setCurrentMs] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [audioOnly, setAudioOnly] = useState(false);

  // Restore audio-only preference across sessions / clips.
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(AUDIO_MODE_KEY) === "1") {
      setAudioOnly(true);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUDIO_MODE_KEY, audioOnly ? "1" : "0");
    }
  }, [audioOnly]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clip", clipId],
    queryFn: () => clipsApi.get(clipId),
  });

  // Playlist queue — fetched when ?deck= is set. Client-side filter by deckId.
  const { data: queueData } = useQuery({
    queryKey: ["clips", "queue", deckParam],
    queryFn: () => clipsApi.list({ q: "", tag: "", sort: "oldest", page: 0, size: 200 }),
    enabled: !!deckParam,
  });
  const queue = useMemo(() => {
    if (!deckParam || !queueData) return [] as { id: string }[];
    return queueData.items.filter((c) =>
      deckParam === "INBOX" ? c.deckId == null : c.deckId === deckParam,
    );
  }, [deckParam, queueData]);
  const currentIndex = queue.findIndex((c) => c.id === clipId);
  const prevId = currentIndex > 0 ? queue[currentIndex - 1].id : null;
  const nextId = currentIndex >= 0 && currentIndex < queue.length - 1
    ? queue[currentIndex + 1].id : null;

  // Autoplay-next preference
  const [autoplayNext, setAutoplayNext] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem(AUTOPLAY_KEY) === "1") {
      setAutoplayNext(true);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTOPLAY_KEY, autoplayNext ? "1" : "0");
    }
  }, [autoplayNext]);

  const goNext = () => {
    if (!nextId) return;
    router.push(`/player/${nextId}?deck=${deckParam ?? ""}`);
  };
  const goPrev = () => {
    if (!prevId) return;
    router.push(`/player/${prevId}?deck=${deckParam ?? ""}`);
  };

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
      if (nowMs >= data.endMs) {
        // Autoplay-next wins over loop when both are on and a next clip exists.
        if (autoplayNext && nextId) {
          clearInterval(handle);
          router.push(`/player/${nextId}?deck=${deckParam ?? ""}`);
          return;
        }
        if (loopEnabled) {
          playerRef.current.seekTo(data.startMs / 1000);
        }
      }
    }, 200);
    return () => clearInterval(handle);
  }, [ready, data, loopEnabled, autoplayNext, nextId, deckParam, router]);

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
    { key: "Space", description: t("shortcutPlayPause"), action: togglePlay, when: () => ready },
    { key: "r", description: t("shortcutRestart"), action: () => data && playerRef.current?.seekTo(data.startMs / 1000), when: () => ready && !!data },
    { key: "l", description: t("shortcutLoop"), action: () => setLoopEnabled((v) => !v) },
    { key: ".", description: t("shortcutSpeedUp"), action: () => setPlaybackRate((v) => Math.min(1.5, +(v + SPEED_STEP).toFixed(2))) },
    { key: ",", description: t("shortcutSpeedDown"), action: () => setPlaybackRate((v) => Math.max(0.5, +(v - SPEED_STEP).toFixed(2))) },
    { key: "0", description: t("shortcutSpeedReset"), action: () => setPlaybackRate(1.0) },
    { key: "v", description: t("shortcutAudioOnly"), action: () => setAudioOnly((v) => !v) },
  ]);

  if (isPending) return <p className="text-sm text-muted-foreground">{t("loading")}</p>;
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
              {data.videoTitle} · {t("metaSeconds", { seconds: duration.toFixed(1) })}
            </p>
            <div className="flex flex-wrap gap-1">
              {data.tags.map((tg) => (
                <Badge key={tg} variant="secondary">{tg}</Badge>
              ))}
            </div>
          </div>
          <ShortcutHelp
            groups={[
              {
                title: t("shortcutsGroup"),
                items: [
                  { keys: ["Space"], description: t("shortcutPlayPause") },
                  { keys: ["R"], description: t("shortcutRestart") },
                  { keys: ["L"], description: t("shortcutLoop") },
                  { keys: [","], description: t("shortcutSpeedDown") },
                  { keys: ["."], description: t("shortcutSpeedUp") },
                  { keys: ["0"], description: t("shortcutSpeedReset") },
                  { keys: ["B"], description: t("shortcutBlind") },
                  { keys: ["V"], description: t("shortcutAudioOnly") },
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
          audioOnly={audioOnly}
          overlayContent={
            audioOnly && (
              <>
                <span className="text-xs uppercase tracking-wider text-white/40">
                  🎧 {tAudio("captionPrefix")}
                </span>
                {data.transcript ? (
                  <p className="max-w-3xl whitespace-pre-line text-2xl leading-relaxed text-white sm:text-3xl">
                    {data.transcript}
                  </p>
                ) : (
                  <p className="text-sm text-white/60">{t("transcriptNone")}</p>
                )}
              </>
            )
          }
        />
        <Card>
          <CardHeader>
            <CardTitle>{t("speedTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{t("speedLabel")}</span>
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
                {loopEnabled ? t("loopOn") : t("loopOff")}
              </Button>
              <Button
                variant={audioOnly ? "default" : "outline"}
                onClick={() => setAudioOnly((v) => !v)}
                title={tAudio("hint")}
                data-testid="audio-only-toggle"
              >
                🎧 {audioOnly ? tAudio("on") : tAudio("off")}
              </Button>
              <Button variant="outline" onClick={() => playerRef.current?.seekTo(data.startMs / 1000)}>
                {t("restart")}
              </Button>
              <Link href={`/video/${data.videoId}`} className={buttonVariants({ variant: "ghost" })}>
                {t("toOriginal")}
              </Link>
            </div>

            {/* Playlist controls — only show when we're inside a deck queue */}
            {deckParam && queue.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 rounded-md border bg-muted/30 p-2 text-xs"
                   data-testid="playlist-controls">
                <span className="text-muted-foreground">
                  {currentIndex + 1} / {queue.length}
                </span>
                <Button size="sm" variant="outline" disabled={!prevId} onClick={goPrev}>
                  ← {t("prev")}
                </Button>
                <Button size="sm" variant="outline" disabled={!nextId} onClick={goNext}>
                  {t("next")} →
                </Button>
                <label className="ml-auto flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoplayNext}
                    onChange={(e) => setAutoplayNext(e.target.checked)}
                    data-testid="autoplay-toggle"
                  />
                  <span>{t("autoplay")}</span>
                </label>
              </div>
            )}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{t("metaSeconds", { seconds: elapsedInClip.toFixed(1) })}</span>
                <span>{t("metaSeconds", { seconds: duration.toFixed(1) })}</span>
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
        <Tabs defaultValue="script" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="script">{t("tabScript")}</TabsTrigger>
            <TabsTrigger value="chunks">{t("tabChunks")}</TabsTrigger>
            <TabsTrigger value="note">{t("tabNote")}</TabsTrigger>
            <TabsTrigger value="ai">{t("tabAi")}</TabsTrigger>
            <TabsTrigger value="record">{t("tabRecord")}</TabsTrigger>
          </TabsList>
          <TabsContent value="script" className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle>{t("scriptCardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                {data.transcript ? (
                  <BlindShadowingPanel transcript={data.transcript} />
                ) : (
                  <p className="text-sm text-muted-foreground">{t("transcriptNone")}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="chunks" className="mt-3">
            <Card>
              <CardHeader>
                <CardTitle>{t("chunksCardTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChunkShadowingPanel clipId={data.id} />
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
          {t("backToLibrary")}
        </Link>
      </div>
    </div>
  );
}
