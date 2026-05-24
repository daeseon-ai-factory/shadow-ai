"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/lib/api/client";
import { analysisApi } from "@/lib/api/analysis";
import { toast } from "sonner";

export function AnalysisPanel({ clipId }: { clipId: string }) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error, refetch } = useQuery({
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
      toast.success("재분석 중…");
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : "재분석 실패"),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-2">
        <div>
          <CardTitle>AI 설명</CardTitle>
          <CardDescription>
            {data?.status === "READY" && data.model && <>모델: <code className="text-xs">{data.model}</code></>}
            {data?.status === "PENDING" && "분석 진행 중…"}
            {data?.status === "FAILED" && <span className="text-red-600">실패: {data.errorMessage}</span>}
            {!data && !isPending && "아직 분석이 없습니다"}
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => regenMutation.mutate()}
          disabled={regenMutation.isPending}
        >
          {regenMutation.isPending ? "처리 중…" : "다시 분석"}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        )}
        {isError && error instanceof ApiError && error.status === 404 && (
          <p className="text-sm text-muted-foreground">
            분석이 시작되지 않았습니다. 위에서 ‘다시 분석’을 눌러보세요.
          </p>
        )}
        {data?.status === "PENDING" && (
          <p className="text-sm text-muted-foreground">분석 중입니다. 잠시 후 자동 갱신됩니다.</p>
        )}
        {data?.status === "READY" && (
          <>
            {data.contextSummary && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground">맥락</h3>
                <p className="mt-1 text-sm">{data.contextSummary}</p>
              </section>
            )}
            {data.grammarNotes.length > 0 && (
              <section>
                <h3 className="text-sm font-medium text-muted-foreground">문법 메모</h3>
                <ul className="mt-1 list-inside list-disc text-sm">
                  {data.grammarNotes.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              </section>
            )}
            {data.keyExpressions.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">핵심 표현</h3>
                <ul className="space-y-2 text-sm">
                  {data.keyExpressions.map((e, i) => (
                    <li key={i} className="rounded-md border bg-muted/30 p-3">
                      <div className="font-medium">{e.phrase}</div>
                      <div className="text-muted-foreground">{e.meaning}</div>
                      {e.usage && <div className="text-xs text-muted-foreground/80">예: {e.usage}</div>}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {data.vocabulary.length > 0 && (
              <section className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">어휘</h3>
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
          <Button size="sm" variant="outline" onClick={() => refetch()}>새로고침</Button>
        )}
      </CardContent>
    </Card>
  );
}
