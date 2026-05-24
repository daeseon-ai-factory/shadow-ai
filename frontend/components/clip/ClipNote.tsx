"use client";

import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { clipsApi, type ClipResponse } from "@/lib/api/clips";

interface Props {
  clip: ClipResponse;
}

export function ClipNote({ clip }: Props) {
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState(clip.note ?? "");

  useEffect(() => {
    setDraft(clip.note ?? "");
  }, [clip.id, clip.note]);

  const save = useMutation({
    mutationFn: () => clipsApi.update(clip.id, { note: draft }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["clip", clip.id], updated);
      queryClient.invalidateQueries({ queryKey: ["clips"] });
      toast.success("노트 저장");
    },
  });

  const dirty = (clip.note ?? "") !== draft;

  return (
    <Card>
      <CardHeader>
        <CardTitle>내 노트</CardTitle>
        <CardDescription>나만 보는 메모. 직독직해, 연관 단어, 따라할 호흡 표시 등 자유롭게.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          placeholder="자유롭게 메모하세요…"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => save.mutate()} disabled={!dirty || save.isPending}>
            {save.isPending ? "저장 중…" : "저장"}
          </Button>
          {dirty && <span className="text-xs text-muted-foreground">저장되지 않은 변경 있음</span>}
        </div>
      </CardContent>
    </Card>
  );
}
