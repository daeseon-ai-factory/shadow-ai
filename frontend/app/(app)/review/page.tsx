"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { YoutubePlayer, type YoutubePlayerHandle } from "@/components/player/YoutubePlayer";
import { reviewApi, REVIEW_QUALITY, type ReviewQueueItem } from "@/lib/api/review";

export default function ReviewPage() {
  const queryClient = useQueryClient();
  const { data: queue, isPending, isError, error } = useQuery({
    queryKey: ["review", "queue"],
    queryFn: () => reviewApi.queue(),
  });

  const [index, setIndex] = useState(0);

  const respondMutation = useMutation({
    mutationFn: ({ id, quality }: { id: string; quality: number }) =>
      reviewApi.respond(id, quality),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review", "streak"] });
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
          <CardTitle>오늘 복습 완료 🎉</CardTitle>
          <CardDescription>새 클립을 더 만들거나, 내일 다시 와주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/library" className={buttonVariants()}>라이브러리로</Link>
        </CardContent>
      </Card>
    );
  }

  if (index >= total) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>오늘 복습 완료 🎉</CardTitle>
          <CardDescription>{total}개 클립 복습을 마쳤어요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/library" className={buttonVariants()}>라이브러리로</Link>
        </CardContent>
      </Card>
    );
  }

  const current = queue[index];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">복습</h1>
        <span className="text-sm text-muted-foreground">{index + 1} / {total}</span>
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
  const playerRef = useRef<YoutubePlayerHandle>(null);
  const [ready, setReady] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const duration = useMemo(() => ((item.clip.endMs - item.clip.startMs) / 1000).toFixed(1), [item]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.clip.name}</CardTitle>
        <CardDescription>
          {item.clip.videoTitle} · {duration}초 · 다음 due {item.dueDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <YoutubePlayer ref={playerRef} videoId={item.clip.youtubeId} onReady={() => setReady(true)} />
        <div>
          {showAnswer ? (
            <div className="space-y-3">
              <p className="whitespace-pre-line text-xl leading-relaxed">{item.clip.transcript || "(자막 없음)"}</p>
              <div className="flex flex-wrap gap-2">
                {item.clip.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setShowAnswer(true)}>자막 보기</Button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Button variant="destructive" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.AGAIN)}>
            다시 (Again)
          </Button>
          <Button variant="outline" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.HARD)}>
            어렵다 (Hard)
          </Button>
          <Button disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.GOOD)}>
            보통 (Good)
          </Button>
          <Button variant="secondary" disabled={disabled} onClick={() => onRespond(REVIEW_QUALITY.EASY)}>
            쉽다 (Easy)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
