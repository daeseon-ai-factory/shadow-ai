"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { ShortcutHelp } from "@/components/ShortcutHelp";
import { WriteQuiz } from "@/components/review/WriteQuiz";
import { ScenarioQuiz } from "@/components/review/ScenarioQuiz";
import { useShortcuts } from "@/lib/use-shortcuts";
import { reviewApi, REVIEW_QUALITY, type ReviewQueueItem } from "@/lib/api/review";
import { decksApi } from "@/lib/api/decks";
import { toast } from "sonner";

export default function ReviewPage() {
  const t = useTranslations("review");
  const tLib = useTranslations("library");
  const queryClient = useQueryClient();

  // Deck filter — "ALL" / "INBOX" / a real deck id. Persists across reloads.
  const [deckFilter, setDeckFilter] = useState<string>("ALL");
  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? window.localStorage.getItem("tubeshadow.reviewDeck") : null;
    if (saved) setDeckFilter(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tubeshadow.reviewDeck", deckFilter);
    }
  }, [deckFilter]);

  const { data: decks = [] } = useQuery({
    queryKey: ["decks"],
    queryFn: () => decksApi.list(),
  });

  const apiDeckParam = deckFilter === "ALL" ? undefined : deckFilter;
  const { data: queue, isPending, isError, error } = useQuery({
    queryKey: ["review", "queue", deckFilter],
    queryFn: () => reviewApi.queue(apiDeckParam),
  });

  const [index, setIndex] = useState(0);
  useEffect(() => { setIndex(0); }, [deckFilter]);

  const respondMutation = useMutation({
    mutationFn: ({ id, quality }: { id: string; quality: number }) =>
      reviewApi.respond(id, quality),
    onSuccess: (updated, vars) => {
      queryClient.invalidateQueries({ queryKey: ["review", "streak"] });
      // Mark every review-queue variant stale so re-entering review / switching decks
      // refetches, but don't refetch the active queue now — the page walks the loaded
      // queue by local index, and refetching mid-session would reshuffle under us.
      queryClient.invalidateQueries({ queryKey: ["review", "queue"], refetchType: "none" });
      // Surface the next due date so the learner knows the clip isn't "lost".
      // The respond payload is the updated ReviewItem with the new dueDate.
      const date = updated?.dueDate ?? "";
      const key =
        vars.quality === REVIEW_QUALITY.AGAIN ? "respondedAgain"
        : vars.quality === REVIEW_QUALITY.HARD  ? "respondedHard"
        : vars.quality === REVIEW_QUALITY.GOOD  ? "respondedGood"
        : "respondedEasy";
      toast.success(t(key, { date }));
      setIndex((i) => i + 1);
    },
  });

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (isError) return <p className="text-sm text-red-600">{(error as Error).message}</p>;
  if (!queue) return null;

  const total = queue.length;
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("doneTitle")}</CardTitle>
          <CardDescription>{t("doneEmpty")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/library" className={buttonVariants()}>{t("toLibrary")}</Link>
        </CardContent>
      </Card>
    );
  }

  if (index >= total) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("doneTitle")}</CardTitle>
          <CardDescription>{t("doneCount", { count: total })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/library" className={buttonVariants()}>{t("toLibrary")}</Link>
        </CardContent>
      </Card>
    );
  }

  const current = queue[index];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <div className="flex items-center gap-3">
          <select
            value={deckFilter}
            onChange={(e) => setDeckFilter(e.target.value)}
            className="rounded-md border bg-background px-2 py-1 text-xs"
            data-testid="review-deck-filter"
          >
            <option value="ALL">{tLib("deckAll")}</option>
            <option value="INBOX">{tLib("deckInbox")}</option>
            {decks.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <span className="text-sm text-muted-foreground">{index + 1} / {total}</span>
          <ShortcutHelp
            groups={[
              {
                title: t("shortcutsGroup"),
                items: [
                  { keys: ["Space"], description: t("shortcutPlay") },
                  { keys: ["A"], description: t("shortcutShowAnswer") },
                  { keys: ["1"], description: t("shortcutAgain") },
                  { keys: ["2"], description: t("shortcutHard") },
                  { keys: ["3"], description: t("shortcutGood") },
                  { keys: ["4"], description: t("shortcutEasy") },
                ],
              },
            ]}
          />
        </div>
      </header>
      <ReviewCard
        key={current.id}
        item={current}
        onRespond={(q) => respondMutation.mutate({ id: current.id, quality: q })}
        disabled={respondMutation.isPending}
      />
    </div>
  );
}

function ReviewCard({
  item,
  onRespond,
  disabled,
}: {
  item: ReviewQueueItem;
  onRespond: (quality: number) => void;
  disabled: boolean;
}) {
  const t = useTranslations("review");
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [ready, setReady] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<"reveal" | "write" | "scenario">("reveal");

  // Persist preferred mode across sessions.
  useEffect(() => {
    const saved = typeof window !== "undefined"
      ? window.localStorage.getItem("tubeshadow.reviewMode") : null;
    if (saved === "reveal" || saved === "write" || saved === "scenario") setMode(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("tubeshadow.reviewMode", mode);
    }
  }, [mode]);

  // Reset reveal state when clip changes.
  useEffect(() => { setShowAnswer(false); }, [item.id]);

  useEffect(() => {
    if (!ready) return;
    playerRef.current?.seekTo(item.clip.startMs / 1000);
    playerRef.current?.play();
  }, [ready, item.id, item.clip.startMs]);

  useEffect(() => {
    if (!ready) return;
    const handle = setInterval(() => {
      if (!playerRef.current) return;
      const nowMs = Math.floor(playerRef.current.getCurrentTime() * 1000);
      if (nowMs >= item.clip.endMs) {
        playerRef.current.seekTo(item.clip.startMs / 1000);
      }
    }, 200);
    return () => clearInterval(handle);
  }, [ready, item.clip.startMs, item.clip.endMs]);

  useShortcuts([
    { key: "Space", description: t("shortcutPlay"), action: () => {
        if (!playerRef.current) return;
        playerRef.current.pause();
        setTimeout(() => playerRef.current?.play(), 50);
      }
    },
    { key: "a", description: t("shortcutShowAnswer"), action: () => setShowAnswer(true) },
    { key: "1", description: t("shortcutAgain"), action: () => !disabled && onRespond(REVIEW_QUALITY.AGAIN), when: () => !disabled },
    { key: "2", description: t("shortcutHard"), action: () => !disabled && onRespond(REVIEW_QUALITY.HARD), when: () => !disabled },
    { key: "3", description: t("shortcutGood"), action: () => !disabled && onRespond(REVIEW_QUALITY.GOOD), when: () => !disabled },
    { key: "4", description: t("shortcutEasy"), action: () => !disabled && onRespond(REVIEW_QUALITY.EASY), when: () => !disabled },
  ]);

  const duration = useMemo(() => ((item.clip.endMs - item.clip.startMs) / 1000).toFixed(1), [item]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.clip.name}</CardTitle>
        <CardDescription>
          {item.clip.videoTitle} · {duration}s · {t("nextDue", { date: item.dueDate })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <YoutubePlayer ref={playerRef} videoId={item.clip.youtubeId} onReady={() => setReady(true)} />

        {/* Mode toggle — 3 modes: Reveal / Write / Scenario */}
        <div className="inline-flex flex-wrap rounded-md border p-0.5 text-xs" role="group">
          <button
            type="button"
            onClick={() => setMode("reveal")}
            className={`rounded px-3 py-1 ${mode === "reveal" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            data-testid="mode-reveal"
          >
            {t("modeReveal")}
          </button>
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`rounded px-3 py-1 ${mode === "write" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            data-testid="mode-write"
          >
            {t("modeWrite")}
          </button>
          <button
            type="button"
            onClick={() => setMode("scenario")}
            className={`rounded px-3 py-1 ${mode === "scenario" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            data-testid="mode-scenario"
          >
            {t("modeScenario")}
          </button>
        </div>

        {mode === "reveal" && (
          <div>
            {showAnswer ? (
              <div className="space-y-3">
                <p className="whitespace-pre-line text-xl leading-relaxed">{item.clip.transcript || t("noTranscriptLabel")}</p>
                <div className="flex flex-wrap gap-2">
                  {item.clip.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={() => setShowAnswer(true)}>{t("showAnswer")}</Button>
            )}
          </div>
        )}
        {mode === "write" && (
          <WriteQuiz key={item.clip.id} clipId={item.clip.id} originalEnglish={item.clip.transcript} />
        )}
        {mode === "scenario" && (
          <ScenarioQuiz key={item.clip.id} clipId={item.clip.id} />
        )}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Button variant="destructive" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.AGAIN)}>
            {t("again")}
          </Button>
          <Button variant="outline" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.HARD)}>
            {t("hard")}
          </Button>
          <Button disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.GOOD)}>
            {t("good")}
          </Button>
          <Button variant="secondary" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.EASY)}>
            {t("easy")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
