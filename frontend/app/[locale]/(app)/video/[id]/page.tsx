"use client";

import { use, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { videosApi, type TranscriptSegment } from "@/lib/api/videos";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { TranscriptPanel } from "@/components/player/TranscriptPanel";
import { ClipCreatePanel, type SelectedRange } from "@/components/clip/ClipCreatePanel";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  const t = useTranslations("video");
  const { id } = use(params);
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [currentMs, setCurrentMs] = useState(0);
  const [selectedRange, setSelectedRange] = useState<SelectedRange | null>(null);
  const [selectionStep, setSelectionStep] = useState<"start" | "end">("start");
  const [scriptMode, setScriptMode] = useState<"sentences" | "raw">("sentences");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tubeshadow.scriptMode") : null;
    if (saved === "raw" || saved === "sentences") setScriptMode(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("tubeshadow.scriptMode", scriptMode);
  }, [scriptMode]);

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

  if (isPending) return <p className="text-sm text-muted-foreground">{t("loading")}</p>;
  if (isError) return <p className="text-sm text-red-600">{t("loadFailed", { message: (error as Error).message })}</p>;
  if (!data) return null;

  const onSentenceClickForRange = (sentence: TranscriptSegment) => {
    if (!selectedRange) {
      setSelectedRange({ startMs: sentence.startMs, endMs: sentence.endMs });
      setSelectionStep("end");
      return;
    }
    if (sentence.startMs === selectedRange.startMs) {
      setSelectedRange(null);
      setSelectionStep("start");
      return;
    }
    if (sentence.startMs > selectedRange.startMs) {
      setSelectedRange({ startMs: selectedRange.startMs, endMs: sentence.endMs });
      setSelectionStep("start");
    } else {
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
              <Badge variant="destructive">{t("subtitleNone")}</Badge>
            )}
            {data.transcriptStatus === "READY" && (
              <Badge variant="secondary">{t("subtitleReady", { sentences: sentenceCount, raw: rawCount })}</Badge>
            )}
            {isPortrait && <Badge variant="outline">{t("shortsBadge")}</Badge>}
          </div>
          {data.channelName && <p className="text-sm text-muted-foreground">{data.channelName}</p>}
        </header>
        <YoutubePlayer ref={playerRef} videoId={data.youtubeId} orientation={data.orientation} />
        <ClipCreatePanel
          videoId={data.id}
          segments={scriptMode === "sentences" ? (data.sentences ?? data.transcriptSegments) : data.transcriptSegments}
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
            <div className="flex items-center gap-2">
              <CardTitle>{t("scriptTitle")}</CardTitle>
              {data.transcriptStatus === "READY" && (
                <div className="inline-flex rounded-md border p-0.5 text-xs">
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded ${scriptMode === "sentences" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                    onClick={() => setScriptMode("sentences")}
                  >
                    {t("scriptModeSentence", { count: sentenceCount })}
                  </button>
                  <button
                    type="button"
                    className={`px-2 py-0.5 rounded ${scriptMode === "raw" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                    onClick={() => setScriptMode("raw")}
                  >
                    {t("scriptModeRaw", { count: rawCount })}
                  </button>
                </div>
              )}
            </div>
            {selectedRange && (
              <Button size="sm" variant="ghost" onClick={() => { setSelectedRange(null); setSelectionStep("start"); }}>
                {t("clearSelection")}
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <TranscriptPanel
              segments={scriptMode === "sentences" ? (data.sentences ?? data.transcriptSegments) : data.transcriptSegments}
              currentMs={currentMs}
              onSeek={(ms) => playerRef.current?.seekTo(ms / 1000)}
              selectedRange={selectedRange}
              onSentenceClickForRange={onSentenceClickForRange}
              selectionStep={selectionStep}
            />
          </CardContent>
        </Card>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>
          {t("backToLibrary")}
        </Link>
      </div>
    </div>
  );
}
