"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/lib/api/client";
import { analysisApi } from "@/lib/api/analysis";

/**
 * Chunk-by-chunk shadowing. Reveals the clip's 직독직해 chunks one at a time — you say each
 * chunk out loud before revealing the next — so you learn to speak in sense-groups instead of
 * translating Korean word by word. Reuses the analysis query (shared cache with AnalysisPanel).
 */
export function ChunkShadowingPanel({ clipId }: { clipId: string }) {
  const t = useTranslations("chunkShadow");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["analysis", clipId],
    queryFn: () => analysisApi.get(clipId),
    retry: (count, e) => (e instanceof ApiError && e.status === 404 ? false : count < 2),
  });

  const chunks = data?.chunkedTranslation ?? [];
  const [idx, setIdx] = useState(0); // 0..chunks.length (== done)
  const [showKo, setShowKo] = useState(false);

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if ((isError && error instanceof ApiError && error.status === 404) || (data && data.status !== "READY")) {
    return <p className="text-sm text-muted-foreground">{t("needAnalysis")}</p>;
  }
  if (chunks.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("noChunks")}</p>;
  }

  const done = idx >= chunks.length;
  const current = done ? null : chunks[idx];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">{t("instruction")}</p>
        <button
          type="button"
          onClick={() => setShowKo((v) => !v)}
          className="shrink-0 text-xs text-muted-foreground underline hover:text-foreground"
        >
          {showKo ? t("hideKorean") : t("showKorean")}
        </button>
      </div>

      {/* The sentence, built chunk by chunk. Upcoming chunks stay hidden as blocks. */}
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-2 rounded-md border bg-muted/20 p-4 text-2xl leading-relaxed">
        {chunks.map((c, i) => {
          if (i < idx) return <span key={i} className="text-muted-foreground">{c.en}</span>;
          if (i === idx) return (
            <span key={i} className="rounded bg-primary/15 px-1.5 font-semibold text-primary">{c.en}</span>
          );
          return (
            <span key={i} className="select-none tracking-tight text-muted-foreground/25" aria-hidden>
              {"▭".repeat(Math.max(2, Math.min(7, c.en.length)))}
            </span>
          );
        })}
      </div>

      {showKo && current && (
        <p className="text-center text-sm text-muted-foreground">{current.ko}</p>
      )}

      {done ? (
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium">{t("doneTitle")}</p>
          <Button onClick={() => setIdx(0)}>{t("restart")}</Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">{t("progress", { n: idx + 1, total: chunks.length })}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))}>
              {t("prev")}
            </Button>
            <Button size="sm" autoFocus onClick={() => setIdx((i) => i + 1)}>
              {idx === chunks.length - 1 ? t("finish") : t("next")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
