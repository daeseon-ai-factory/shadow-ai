"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const createMutation = useMutation({
    mutationFn: clipsApi.create,
    onSuccess: (clip) => {
      toast.success("클립 저장 완료");
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      setSelectedRange(null);
      setModalOpen(false);
      router.push(`/player/${clip.id}`);
    },
    onError: (err) => {
      if (err instanceof ApiError) toast.error(err.message);
      else toast.error("저장 실패");
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
      toast.error("유효한 구간을 먼저 선택하세요");
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
        <CardTitle>구간 선택 → 클립 저장</CardTitle>
        <CardDescription>
          자막을 클릭해 위치로 이동하고, 시작/끝 버튼으로 범위를 정하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={setStartHere}>시작 ({formatTime(currentMs)})</Button>
          <Button variant="outline" onClick={setEndHere}>끝 ({formatTime(currentMs)})</Button>
          <Button variant="ghost" onClick={() => setSelectedRange(null)} disabled={!selectedRange}>
            초기화
          </Button>
          <Button onClick={openSaveModal} disabled={!selectedRange}>
            이 구간 클립 저장
          </Button>
        </div>
        {selectedRange ? (
          <p className="text-sm text-muted-foreground">
            범위: <strong className="text-foreground">{formatTime(selectedRange.startMs)}</strong> →{" "}
            <strong className="text-foreground">{formatTime(selectedRange.endMs)}</strong>{" "}
            ({((selectedRange.endMs - selectedRange.startMs) / 1000).toFixed(1)}초)
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">아직 범위 미선택</p>
        )}
      </CardContent>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>클립 저장</DialogTitle>
            <DialogDescription>이름과 태그를 정하면 라이브러리에 들어갑니다.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="clip-name">이름</Label>
              <Input id="clip-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="clip-tags">태그 (쉼표로 구분)</Label>
              <Input id="clip-tags" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="예: interview, react" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>취소</Button>
            <Button onClick={handleSave} disabled={createMutation.isPending || !name.trim()}>
              {createMutation.isPending ? "저장 중…" : "저장"}
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
