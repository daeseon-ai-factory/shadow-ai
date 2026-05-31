"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePracticeProgress } from "@/lib/hooks/use-practice-progress";

export interface DrillEntry {
  category: string;
  frame: string;
  gloss: string;
  cue: string; // Korean meaning to express
  model: string; // English model answer
}

export function PatternDrill({ items, onExit }: { items: DrillEntry[]; onExit: () => void }) {
  const t = useTranslations("patterns");
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const { daily, bumpRep } = usePracticeProgress();

  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t("drillEmpty")}</p>;

  const done = idx >= items.length;

  const answer = (ok: boolean) => {
    if (ok) setGot((g) => g + 1);
    bumpRep();
    setRevealed(false);
    setIdx((i) => i + 1);
  };

  if (done) {
    return (
      <Card>
        <CardContent className="space-y-3 p-6 text-center">
          <p className="text-lg font-semibold">{t("drillDone")}</p>
          <p className="text-sm text-muted-foreground">{t("drillSummary", { got, total: items.length })}</p>
          <p className="text-sm">🔥 {t("streakDays", { n: daily.streak })} · {t("todayReps", { n: daily.reps })}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => { setIdx(0); setGot(0); setRevealed(false); }}>{t("drillAgain")}</Button>
            <Button variant="outline" onClick={onExit}>{t("drillExit")}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const item = items[idx];

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("drillProgress", { n: idx + 1, total: items.length })}</span>
          <span>🔥 {daily.streak} · {t("todayReps", { n: daily.reps })}</span>
        </div>

        <div className="space-y-1 text-center">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{t(`cat_${item.category}`)}</span>
          <p className="font-mono text-lg text-primary">{item.frame}</p>
        </div>

        <div className="rounded-md border bg-muted/20 p-4 text-center">
          <div className="text-xs text-muted-foreground">{t("sayThis")}</div>
          <p className="mt-1 text-xl">{item.cue}</p>
        </div>

        {!revealed ? (
          <Button className="w-full" autoFocus onClick={() => setRevealed(true)}>
            {t("reveal")}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-center">
              <p className="font-mono text-lg">{item.model}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.gloss}</p>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" variant="outline" onClick={() => answer(false)}>{t("markAgain")}</Button>
              <Button className="flex-1" autoFocus onClick={() => answer(true)}>{t("markGot")}</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
