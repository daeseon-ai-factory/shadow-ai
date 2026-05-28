"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("note");
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
      toast.success(t("savedToast"));
    },
  });

  const dirty = (clip.note ?? "") !== draft;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={5}
          placeholder={t("placeholder")}
        />
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => save.mutate()} disabled={!dirty || save.isPending}>
            {save.isPending ? t("saving") : t("save")}
          </Button>
          {dirty && <span className="text-xs text-muted-foreground">{t("dirty")}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
