"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { ENGLISH_PATTERNS, PHRASAL_500, IT_TERMS } from "@shadow-ai/core";
import { practiceApi } from "@/lib/api/practice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
// frame × phrasal × term composes into a real sentence far more often than a random trio.
const draw = (): string[] => [pick(ENGLISH_PATTERNS).frame, pick(PHRASAL_500).phrasal, pick(IT_TERMS).en];

export default function MixPage() {
  const t = useTranslations("decks");
  const [chunks, setChunks] = useState<string[]>([]);
  const mix = useMutation({ mutationFn: (cs: string[]) => practiceApi.composeMix(cs) });
  const reshuffle = () => { mix.reset(); setChunks(draw()); };
  useEffect(reshuffle, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fb = mix.data;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("mixTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("mixSub")}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {chunks.map((c, i) => <Badge key={i} variant="outline" className="font-mono">{c}</Badge>)}
      </div>
      {fb ? (
        <Card>
          <CardContent className="space-y-2 p-4">
            <p className="font-mono text-lg">{fb.sentence}</p>
            {fb.gloss ? <p className="text-sm text-muted-foreground">{fb.gloss}</p> : null}
            {!fb.usedAll && fb.note ? <p className="text-sm text-amber-600">⚠️ {fb.note}</p> : null}
          </CardContent>
        </Card>
      ) : (
        <Button disabled={mix.isPending} onClick={() => mix.mutate(chunks)}>
          {mix.isPending ? t("mixCombining") : t("mixCombine")}
        </Button>
      )}
      {mix.isError ? <p className="text-sm text-destructive">{t("mixFailed")}</p> : null}
      <Button variant="outline" onClick={reshuffle}>{t("mixReshuffle")}</Button>
    </div>
  );
}
