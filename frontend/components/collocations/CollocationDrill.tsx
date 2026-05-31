"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Shares the daily streak with the pattern drill: any practice today counts as one streak day.
import { usePracticeProgress } from "@/lib/hooks/use-practice-progress";
import { speak, canSpeak } from "@/lib/speak";
import type { CollocationDomain } from "@/lib/collocations";

export interface ColloDrillEntry {
  key: string; // stable SRS card key, e.g. "col:on-depend-on#0"
  anchor: string; // the chunk to produce, e.g. "depend on"
  gloss: string;
  domain: CollocationDomain;
  cue: string; // Korean meaning (English word order)
  model: string; // English model sentence
}

export function CollocationDrill({ items, onExit }: { items: ColloDrillEntry[]; onExit: () => void }) {
  const t = useTranslations("collocations");
  const { daily, grade } = usePracticeProgress();
  const [queue, setQueue] = useState<ColloDrillEntry[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const graded = useRef<Set<string>>(new Set()); // each card scores SRS once per session (first attempt)

  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t("drillEmpty")}</p>;

  const done = pos >= queue.length;

  const reveal = () => {
    setRevealed(true);
    speak(queue[pos].model);
  };

  const answer = (ok: boolean) => {
    const cur = queue[pos];
    if (!graded.current.has(cur.key)) {
      grade(cur.key, ok); // first attempt → SRS box + streak rep
      graded.current.add(cur.key);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]); // missed → comes back later this session
    setRevealed(false);
    setPos((p) => p + 1);
  };

  const restart = () => {
    setQueue(items);
    setPos(0);
    setGot(0);
    setRevealed(false);
    graded.current = new Set();
  };

  if (done) {
    return (
      <Card>
        <CardContent className="space-y-3 p-6 text-center">
          <p className="text-lg font-semibold">{t("drillDone")}</p>
          <p className="text-sm text-muted-foreground">{t("drillSummary", { got, total: items.length })}</p>
          <p className="text-sm">🔥 {t("streakDays", { n: daily.streak })} · {t("todayReps", { n: daily.reps })}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={restart}>{t("drillAgain")}</Button>
            <Button variant="outline" onClick={onExit}>{t("drillExit")}</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const item = queue[pos];

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("drillProgress", { n: pos + 1, total: queue.length })}</span>
          <span>🔥 {daily.streak} · {t("todayReps", { n: daily.reps })}</span>
        </div>

        <div className="space-y-1 text-center">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            {item.domain === "dev" ? t("domainDev") : t("domainGeneral")}
          </span>
          <p className="font-mono text-2xl font-semibold text-primary">{item.anchor}</p>
          <p className="text-xs text-muted-foreground">{item.gloss}</p>
        </div>

        <div className="rounded-md border bg-muted/20 p-4 text-center">
          <div className="text-xs text-muted-foreground">{t("sayThis")}</div>
          <p className="mt-1 text-xl">{item.cue}</p>
        </div>

        {!revealed ? (
          <Button className="w-full" autoFocus onClick={reveal}>
            {t("reveal")}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="font-mono text-lg">{item.model}</p>
                {canSpeak() && (
                  <button
                    type="button"
                    aria-label={t("listen")}
                    onClick={() => speak(item.model)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    🔊
                  </button>
                )}
              </div>
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
