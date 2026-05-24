"use client";

import { useMemo, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/auth-store";
import { recordingsApi, type RecordingResponse } from "@/lib/api/recordings";
import { Recorder } from "@/components/recording/Recorder";
import { ApiError } from "@/lib/api/client";

interface Props {
  clipId: string;
  onPlayOriginal: () => void;
}

export function RecordingPanel({ clipId, onPlayOriginal }: Props) {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.token);

  const { data: recordings = [], isPending } = useQuery({
    queryKey: ["recordings", clipId],
    queryFn: () => recordingsApi.list(clipId),
  });

  const uploadMutation = useMutation({
    mutationFn: ({ blob, durationMs }: { blob: Blob; durationMs: number }) =>
      recordingsApi.upload(clipId, blob, durationMs),
    onSuccess: () => {
      toast.success("녹음 저장됨");
      queryClient.invalidateQueries({ queryKey: ["recordings", clipId] });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : "업로드 실패"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => recordingsApi.delete(id),
    onSuccess: () => {
      toast.success("녹음 삭제됨");
      queryClient.invalidateQueries({ queryKey: ["recordings", clipId] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>녹음 + A/B 비교</CardTitle>
        <CardDescription>
          영상을 반복 재생하면서 본인 목소리를 녹음하세요. 저장된 녹음은 원본과 나란히 들어볼 수 있습니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Recorder
          onComplete={(blob, durationMs) => uploadMutation.mutate({ blob, durationMs })}
          disabled={uploadMutation.isPending}
        />
        {isPending && <p className="text-sm text-muted-foreground">녹음 목록 로딩…</p>}
        {!isPending && recordings.length === 0 && (
          <p className="text-sm text-muted-foreground">아직 녹음이 없어요.</p>
        )}
        {recordings.length > 0 && (
          <ul className="space-y-3">
            {recordings.map((r) => (
              <RecordingRow
                key={r.id}
                recording={r}
                token={token}
                onPlayOriginal={onPlayOriginal}
                onDelete={() => deleteMutation.mutate(r.id)}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function RecordingRow({
  recording,
  token,
  onPlayOriginal,
  onDelete,
}: {
  recording: RecordingResponse;
  token: string | null;
  onPlayOriginal: () => void;
  onDelete: () => void;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // The audio endpoint requires an Authorization header; <audio src> can't carry one,
  // so we fetch the bytes with our auth client and turn them into a blob: URL.
  const loadBlob = async () => {
    if (blobUrl || !token) return;
    const res = await fetch(recordingsApi.audioUrl(recording.id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      toast.error("녹음 로드 실패");
      return;
    }
    const blob = await res.blob();
    setBlobUrl(URL.createObjectURL(blob));
  };

  const playAb = async () => {
    onPlayOriginal();
    setTimeout(async () => {
      await loadBlob();
      audioRef.current?.play();
    }, 200);
  };

  const formattedDate = useMemo(() =>
    new Date(recording.createdAt).toLocaleString("ko-KR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    [recording.createdAt],
  );

  return (
    <li className="rounded-md border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-medium">{formattedDate}</div>
          <div className="text-xs text-muted-foreground">
            {(recording.durationMs / 1000).toFixed(1)}초 · {(recording.sizeBytes / 1024).toFixed(0)}KB
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={loadBlob} disabled={!!blobUrl}>
            로드
          </Button>
          <Button size="sm" variant="outline" onClick={playAb}>
            원본 → 본인
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive" onClick={onDelete}>
            삭제
          </Button>
        </div>
      </div>
      {blobUrl && (
        <audio ref={audioRef} controls src={blobUrl} className="mt-3 w-full" />
      )}
    </li>
  );
}
