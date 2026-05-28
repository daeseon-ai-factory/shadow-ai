"use client";

import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("recording");
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
      toast.success(t("uploadedToast"));
      queryClient.invalidateQueries({ queryKey: ["recordings", clipId] });
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t("uploadFailed")),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => recordingsApi.delete(id),
    onSuccess: () => {
      toast.success(t("deletedToast"));
      queryClient.invalidateQueries({ queryKey: ["recordings", clipId] });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Recorder
          onComplete={(blob, durationMs) => uploadMutation.mutate({ blob, durationMs })}
          disabled={uploadMutation.isPending}
        />
        {isPending && <p className="text-sm text-muted-foreground">{t("listLoading")}</p>}
        {!isPending && recordings.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("listEmpty")}</p>
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
  const t = useTranslations("recording");
  const locale = useLocale();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const loadBlob = async () => {
    if (blobUrl || !token) return;
    const res = await fetch(recordingsApi.audioUrl(recording.id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      toast.error(t("loadFailed"));
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
    new Date(recording.createdAt).toLocaleString(locale, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    [recording.createdAt, locale],
  );

  return (
    <li className="rounded-md border p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-medium">{formattedDate}</div>
          <div className="text-xs text-muted-foreground">
            {(recording.durationMs / 1000).toFixed(1)}s · {(recording.sizeBytes / 1024).toFixed(0)}KB
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={loadBlob} disabled={!!blobUrl}>
            {t("load")}
          </Button>
          <Button size="sm" variant="outline" onClick={playAb}>
            {t("abPlay")}
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive" onClick={onDelete}>
            {t("delete")}
          </Button>
        </div>
      </div>
      {blobUrl && (
        <audio ref={audioRef} controls src={blobUrl} className="mt-3 w-full" />
      )}
    </li>
  );
}
