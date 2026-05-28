"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { clipsApi } from "@/lib/api/clips";
import type { TranscriptSegment } from "@/lib/api/videos";
import { ApiError } from "@/lib/api/client";

export interface SelectedRange {
  startMs: number;
  endMs: number;
}

interface Props {
  videoId: string;
  segments: TranscriptSegment[];
  currentMs: number;
  selectedRange: SelectedRange | null;
  setSelectedRange: (range: SelectedRange | null) => void;
  onSeek: (ms: number) => void;
  defaultName?: string;
}

export function ClipCreatePanel({
  videoId,
  segments,
  currentMs,
  selectedRange,
  setSelectedRange,
  defaultName,
}: Props) {
  const t = useTranslations("clipCreate");
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const createMutation = useMutation({
    mutationFn: clipsApi.create,
    onSuccess: (clip) => {
      toast.success(t("savedToast"));
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      setSelectedRange(null);
      setModalOpen(false);
      router.push(`/player/${clip.id}`);
    },
    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error(t("saveFailed"));
    },
  });

  const setStartHere = () => {
    const start = currentMs;
    setSelectedRange({ startMs: start, endMs: Math.max(start + 1000, selectedRange?.endMs ?? start + 1000) });
  };

  const setEndHere = () => {
    if (!selectedRange) {
      setSelectedRange({ startMs: 0, endMs: currentMs });
    } else {
      setSelectedRange({ ...selectedRange, endMs: currentMs });
    }
  };

  const openSaveModal = () => {
    if (!selectedRange || selectedRange.endMs <= selectedRange.startMs) {
      toast.error(t("invalidRange"));
      return;
    }
    const seedName = defaultName ??
      segments
        .filter((s) => s.startMs >= selectedRange.startMs && s.endMs <= selectedRange.endMs)
        .map((s) => s.text)
        .join(" ")
        .slice(0, 60);
    setName(seedName || `Clip ${formatTime(selectedRange.startMs)}–${formatTime(selectedRange.endMs)}`);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!selectedRange) return;
    createMutation.mutate({
      videoId,
      startMs: selectedRange.startMs,
      endMs: selectedRange.endMs,
      name: name.trim(),
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={setStartHere}>{t("start", { time: formatTime(currentMs) })}</Button>
          <Button variant="outline" onClick={setEndHere}>{t("end", { time: formatTime(currentMs) })}</Button>
          <Button variant="ghost" onClick={() => setSelectedRange(null)} disabled={!selectedRange}>
            {t("reset")}
          </Button>
          <Button onClick={openSaveModal} disabled={!selectedRange}>
            {t("save")}
          </Button>
        </div>
        {selectedRange ? (
          <p className="text-sm text-muted-foreground">
            {t("range", {
              start: formatTime(selectedRange.startMs),
              end: formatTime(selectedRange.endMs),
              duration: ((selectedRange.endMs - selectedRange.startMs) / 1000).toFixed(1),
            })}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">{t("noRange")}</p>
        )}
      </CardContent>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("modalTitle")}</DialogTitle>
            <DialogDescription>{t("modalSubtitle")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="clip-name">{t("nameLabel")}</Label>
              <Input id="clip-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="clip-tags">{t("tagsLabel")}</Label>
              <Input id="clip-tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder={t("tagsPlaceholder")} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleSave} disabled={createMutation.isPending || !name.trim()}>
              {createMutation.isPending ? t("savingClip") : t("modalSave")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
