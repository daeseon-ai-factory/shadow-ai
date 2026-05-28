"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
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
import { DeckSidebar, type DeckFilter } from "@/components/library/DeckSidebar";
import { decksApi } from "@/lib/api/decks";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

type SortMode = "newest" | "oldest" | "name" | "duration";

export default function LibraryPage() {
  const t = useTranslations("library");
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState<SortMode>("newest");
  const [deckFilter, setDeckFilter] = useState<DeckFilter>("ALL");
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: decks = [] } = useQuery({
    queryKey: ["decks"],
    queryFn: () => decksApi.list(),
  });

  const moveMutation = useMutation({
    mutationFn: ({ clipId, deckId }: { clipId: string; deckId: string | null }) =>
      decksApi.moveClip(clipId, deckId),
    onSuccess: () => {
      toast.success(t("deckMoved"));
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["clips", { q: search, tag, sort }],
    queryFn: () => clipsApi.list({ q: search, tag, sort, page: 0, size: 50 }),
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
      toast.success(t("deleted"));
      queryClient.invalidateQueries({ queryKey: ["clips"] });
    },
  });

  // Filter client-side by deck (search/tag/sort still hit the backend).
  const filteredItems = (data?.items ?? []).filter((c) => {
    if (deckFilter === "ALL") return true;
    if (deckFilter === "INBOX") return c.deckId == null;
    return c.deckId === deckFilter;
  });

  // Start a playlist for a deck — jump to the first clip with ?deck=<filter>.
  const handlePlayDeck = (filter: DeckFilter) => {
    const sorted = (data?.items ?? [])
      .filter((c) => filter === "ALL" ? true : filter === "INBOX" ? c.deckId == null : c.deckId === filter)
      .slice()
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sorted.length === 0) {
      toast.error(t("emptyTitle"));
      return;
    }
    router.push(`/player/${sorted[0].id}?deck=${filter}`);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_1fr]">
      <DeckSidebar filter={deckFilter} onSelect={setDeckFilter} onPlayDeck={handlePlayDeck} />
      <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>
      <StreakWidget />
      <div className="flex flex-wrap items-center gap-3">
        <Input
          placeholder={t("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Input
          placeholder={t("tagPlaceholder")}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          list="user-tags"
          className="max-w-xs"
        />
        <datalist id="user-tags">
          {userTags?.map((t) => <option key={t} value={t} />)}
        </datalist>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          className="rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="newest">{t("sortNewest")}</option>
          <option value="oldest">{t("sortOldest")}</option>
          <option value="name">{t("sortName")}</option>
          <option value="duration">{t("sortDuration")}</option>
        </select>
        <Link href="/import" className={buttonVariants({ variant: "outline" })}>{t("importAction")}</Link>
        <Button variant="ghost" size="sm" onClick={() => exportLibrary(useAuthStore.getState().token, t)}>
          {t("exportAction")}
        </Button>
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
            <CardTitle>{t("emptyTitle")}</CardTitle>
            <CardDescription>{t("emptyDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/import" className={buttonVariants()}>{t("emptyAction")}</Link>
          </CardContent>
        </Card>
      )}

      {data && filteredItems.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((clip) => (
            <ClipCard
              key={clip.id}
              clip={clip}
              decks={decks}
              onDelete={() => deleteMutation.mutate(clip.id)}
              onMove={(deckId) => moveMutation.mutate({ clipId: clip.id, deckId })}
              playLabel={t("play")}
              deleteLabel={t("delete")}
              moveLabel={t("deckMoveTo")}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

type Translator = (key: string, values?: Record<string, string | number>) => string;

async function exportLibrary(token: string | null, t: Translator) {
  if (!token) {
    toast.error(t("loginRequired"));
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"}/api/clips/export`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (!res.ok) throw new Error(t("exportFailed", { status: res.status }));
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tubeshadow-library-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast.success(t("exportSuccess"));
  } catch (e) {
    toast.error(e instanceof Error ? e.message : t("exportFailedGeneric"));
  }
}

function ClipCard({
  clip,
  decks,
  onDelete,
  onMove,
  playLabel,
  deleteLabel,
  moveLabel,
}: {
  clip: ClipResponse;
  decks: { id: string; name: string }[];
  onDelete: () => void;
  onMove: (deckId: string | null) => void;
  playLabel: string;
  deleteLabel: string;
  moveLabel: string;
}) {
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
          {clip.videoTitle} · {duration}s
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
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <Link href={`/player/${clip.id}`} className={buttonVariants({ size: "sm" })}>{playLabel}</Link>
          <select
            value={clip.deckId ?? ""}
            onChange={(e) => onMove(e.target.value === "" ? null : e.target.value)}
            className="rounded-md border bg-background px-2 py-1 text-xs"
            aria-label={moveLabel}
            title={moveLabel}
            data-testid="clip-deck-select"
          >
            <option value="">— Inbox —</option>
            {decks.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive ml-auto">{deleteLabel}</Button>
        </div>
      </CardContent>
    </Card>
  );
}
