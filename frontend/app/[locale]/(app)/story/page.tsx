"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { ENGLISH_PATTERNS, PHRASAL_500, IT_PATTERNS, IT_TERMS } from "@shadow-ai/core";
import { practiceApi } from "@/lib/api/practice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const some = <T,>(a: T[], n: number): T[] => Array.from({ length: n }, () => pick(a));
const draw = (): string[] => [
  ...some(ENGLISH_PATTERNS, 2).map((p) => p.frame),
  ...some(PHRASAL_500, 3).map((p) => p.phrasal),
  ...some(IT_PATTERNS, 1).map((p) => p.en),
  ...some(IT_TERMS, 2).map((p) => p.en),
];

function clozeOf(story: string, chunks: string[]): string {
  let s = story;
  for (const c of chunks) {
    if (/\b[VXYZ]\b/.test(c)) continue;
    s = s.replace(new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "____");
  }
  return s;
}

export default function StoryPage() {
  const t = useTranslations("decks");
  const [chunks, setChunks] = useState<string[]>([]);
  const [cloze, setCloze] = useState(false);
  const story = useMutation({ mutationFn: (cs: string[]) => practiceApi.composeStory(cs) });
  const reshuffle = () => { story.reset(); setCloze(false); setChunks(draw()); };
  useEffect(reshuffle, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fb = story.data;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("storyTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("storySub")}</p>
      </header>
      <div className="flex flex-wrap gap-2">
        {chunks.map((c, i) => <Badge key={i} variant="outline" className="font-mono text-xs">{c}</Badge>)}
      </div>
      {fb ? (
        <Card>
          <CardContent className="space-y-3 p-4">
            <p className="text-base leading-relaxed">{cloze ? clozeOf(fb.story, chunks) : fb.story}</p>
            {!cloze && fb.gloss ? <p className="text-sm text-muted-foreground leading-relaxed">{fb.gloss}</p> : null}
            {fb.note ? <p className="text-sm text-amber-600">⚠️ {fb.note}</p> : null}
            <Button variant="ghost" size="sm" onClick={() => setCloze((v) => !v)}>
              {cloze ? t("storyShowFull") : t("storyCloze")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Button disabled={story.isPending} onClick={() => story.mutate(chunks)}>
          {story.isPending ? t("storyWeaving") : t("storyWeave")}
        </Button>
      )}
      {story.isError ? <p className="text-sm text-destructive">{t("storyFailed")}</p> : null}
      <Button variant="outline" onClick={reshuffle}>{t("storyReshuffle")}</Button>
    </div>
  );
}
