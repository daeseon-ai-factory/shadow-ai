"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ChunkPair } from "@/lib/api/analysis";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/lib/api/client";
import { analysisApi } from "@/lib/api/analysis";
import type { ClipResponse } from "@/lib/api/clips";
import {
  AI_TOOLS,
  type AiTool,
  buildAnalysisPrompt,
  loadPreferredTool,
  savePreferredTool,
  sendToExternalAi,
} from "@/lib/byoai";
import { toast } from "sonner";

function ChunkedTranslationSection({ chunks }: { chunks: ChunkPair[] }) {
  const t = useTranslations("analysis");
  const [open, setOpen] = useState(true);
  return (
    <section data-testid="chunked-translation">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{t("chunkedTranslation")}</h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {open ? t("hideChunked") : t("showChunked")}
        </button>
      </div>
      {open && (
        <>
          <p className="mt-1 text-xs text-muted-foreground">{t("chunkedHint")}</p>
          <ul className="mt-2 space-y-1.5 rounded-md border bg-muted/30 p-3 text-sm">
            {chunks.map((c, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-base font-medium">{c.en}</span>
                <span className="text-muted-foreground">— {c.ko}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export function AnalysisPanel({ clip }: { clip: ClipResponse }) {
  const t = useTranslations("analysis");
  const clipId = clip.id;
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["analysis", clipId],
    queryFn: () => analysisApi.get(clipId),
    refetchInterval: (q) => (q.state.data?.status === "PENDING" ? 3000 : false),
    retry: (count, e) => {
      if (e instanceof ApiError && e.status === 404) return false;
      return count < 2;
    },
  });

  const regenMutation = useMutation({
    mutationFn: () => analysisApi.regenerate(clipId),
    onSuccess: (fresh) => {
      queryClient.setQueryData(["analysis", clipId], fresh);
      toast.success(t("regenInProgress"));
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t("regenFailed")),
  });

  const [externalTool, setExternalTool] = useState<AiTool>(() => loadPreferredTool());
  const transcriptAvailable = !!clip.transcript && clip.transcript.trim().length > 0;

  const handleSendExternal = async () => {
    if (!transcriptAvailable) {
      toast.error(t("noTranscriptForExternal"));
      return;
    }
    savePreferredTool(externalTool);
    const prompt = buildAnalysisPrompt({
      transcript: clip.transcript!,
      videoTitle: clip.videoTitle,
      channelName: undefined,
    });
    const result = await sendToExternalAi(externalTool, prompt);
    if (result.opened || result.message.includes("복사됨") || result.message.toLowerCase().includes("copied"))
      toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>
            {data?.status === "READY" && data.model && <>{t("modelLabel")}: <code className="text-xs">{data.model}</code></>}
            {data?.status === "PENDING" && t("pending")}
            {data?.status === "FAILED" && <span className="text-red-600">{t("failed")}: {data.errorMessage}</span>}
            {!data && !isLoading && t("none")}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => regenMutation.mutate()}
          disabled={regenMutation.isPending}
        >
          {regenMutation.isPending ? t("regenWorking") : t("regen")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        )}
        {isError && error instanceof ApiError && error.status === 404 && (
          <p className="text-sm text-muted-foreground">{t("notStarted")}</p>
        )}
        {data?.status === "PENDING" && (
          <p className="text-sm text-muted-foreground">{t("pendingAutoRefresh")}</p>
        )}
        {data?.status === "READY" && (
          <>
            {data.primaryTranslation && (
              <section data-testid="primary-translation">
                <h3 className="text-sm font-medium text-muted-foreground">{t("primaryTranslation")}</h3>
                <p className="mt-1 text-base font-medium leading-relaxed">{data.primaryTranslation}</p>
              </section>
            )}
            {data.chunkedTranslation && data.chunkedTranslation.length > 0 && (
              <ChunkedTranslationSection chunks={data.chunkedTranslation} />
            )}
            {data.contextSummary && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground">{t("contextSummary")}</h3>
                <p className="mt-1 text-sm">{data.contextSummary}</p>
              </section>
            )}
            {data.grammarNotes.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground">{t("grammarNotes")}</h3>
                <ul className="mt-1 list-inside list-disc text-sm">
                  {data.grammarNotes.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </section>
            )}
            {data.keyExpressions.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t("keyExpressions")}</h3>
                <ul className="space-y-2 text-sm">
                  {data.keyExpressions.map((e, i) => (
                    <li key={i} className="rounded-md border bg-muted/30 p-3">
                      <div className="font-medium">{e.phrase}</div>
                      <div className="text-muted-foreground">{e.meaning}</div>
                      {e.usage && <div className="text-xs text-muted-foreground/80">{t("example")}: {e.usage}</div>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {data.vocabulary.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{t("vocabulary")}</h3>
                <ul className="space-y-1.5 text-sm">
                  {data.vocabulary.map((v, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span>
                        <strong>{v.word}</strong> — {v.meaning}
                      </span>
                      <Badge variant="outline" className="text-xs">{v.level}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
        {data?.status === "FAILED" && (
          <Button size="sm" variant="outline" onClick={() => refetch()}>{t("retry")}</Button>
        )}

        <section className="space-y-2 rounded-md border border-dashed p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium">{t("byoaiTitle")}</h3>
            <span className="text-xs text-muted-foreground">{t("byoaiZeroCost")}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("byoaiHint")}
          </p>
          <div className="flex items-center gap-2">
            <select
              className="flex-1 rounded-md border bg-background px-2 py-1.5 text-sm"
              value={externalTool}
              onChange={(e) => setExternalTool(e.target.value as AiTool)}
            >
              {AI_TOOLS.map((tool) => (
                <option key={tool.id} value={tool.id}>{tool.label}</option>
              ))}
            </select>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSendExternal}
              disabled={!transcriptAvailable}
              title={transcriptAvailable ? "" : t("noTranscriptForExternal")}
            >
              {t("byoaiSend")}
            </Button>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
