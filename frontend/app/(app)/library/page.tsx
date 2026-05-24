"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { clipsApi, type ClipResponse } from "@/lib/api/clips";
import { StreakWidget } from "@/components/StreakWidget";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const queryClient = useQueryClient();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clips", { q: search, tag }],
    queryFn: () => clipsApi.list({ q: search, tag, page: 0, size: 50 }),
    placeholderData: (prev) => prev,
  });

  const { data: userTags } = useQuery({
    queryKey: ["clips", "tags"],
    queryFn: () => clipsApi.tags(),
    staleTime: 60_000,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => clipsApi.delete(id),
    onSuccess: () => {
      toast.success("클립 삭제됨");
      queryClient.invalidateQueries({ queryKey: ["clips"] });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">라이브러리</h1>
        <p className="text-sm text-muted-foreground">
          저장한 클립을 검색하거나 태그로 필터링하세요. 클립을 클릭하면 무한 반복 재생됩니다.
        </p>
      </header>
      <StreakWidget />
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder="이름 또는 자막 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder="태그 (예: interview)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          list="user-tags"
          className="max-w-xs"
        />
        <datalist id="user-tags">
          {userTags?.map((t) => <option key={t} value={t} />)}
        </datalist>
        <Link href="/import" className={buttonVariants({ variant: "outline" })}>+ 영상 임포트</Link>
      </div>

      {isPending && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-44 w-full" />)}
        </div>
      )}
      {isError && <p className="text-sm text-red-600">{(error as Error).message}</p>}

      {data && data.items.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>아직 클립이 없어요</CardTitle>
            <CardDescription>YouTube 영상을 임포트해서 첫 클립을 만들어보세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/import" className={buttonVariants()}>영상 임포트</Link>
          </CardContent>
        </Card>
      )}

      {data && data.items.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((clip) => (
            <ClipCard key={clip.id} clip={clip} onDelete={() => deleteMutation.mutate(clip.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function ClipCard({ clip, onDelete }: { clip: ClipResponse; onDelete: () => void }) {
  const duration = ((clip.endMs - clip.startMs) / 1000).toFixed(1);
  return (
    <Card className="flex flex-col overflow-hidden">
      <Link href={`/player/${clip.id}`} className="block">
        <div className="aspect-video w-full bg-muted">
          {clip.thumbnailUrl && (
            <Image
              src={clip.thumbnailUrl}
              alt={clip.videoTitle}
              width={480}
              height={270}
              className="h-full w-full object-cover"
              unoptimized
            />
          )}
        </div>
      </Link>
      <CardHeader className="space-y-1">
        <CardTitle className="text-base leading-tight">
          <Link href={`/player/${clip.id}`} className="hover:underline">{clip.name}</Link>
        </CardTitle>
        <CardDescription className="text-xs">
          {clip.videoTitle} · {duration}초
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {clip.transcript && (
          <p className="line-clamp-2 text-xs text-muted-foreground">{clip.transcript}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {clip.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link href={`/player/${clip.id}`} className={buttonVariants({ size: "sm" })}>재생</Link>
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive">삭제</Button>
        </div>
      </CardContent>
    </Card>
  );
}
