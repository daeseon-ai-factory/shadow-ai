"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePracticeProgress } from "@/lib/hooks/use-practice-progress";
import { practiceApi } from "@/lib/api/practice";
import { speak, canSpeak } from "@/lib/speak";

// One drill item — same shape across every pack (verbs, phrasal-500, IT, terms, patterns, collocations).
export interface DeckEntry {
  key: string; // SRS card key (pv:/p5:/itp:/itt:/ep:/col:…)
  title: string; // the anchor/frame/verb shown above the cue
  subtitle?: string; // category / gloss
  cue: string; // what to produce from (Korean, or English in reverse mode)
  model: string; // the answer to reveal
  note?: string; // shown under the model
  target?: string; // the chunk to use in compose mode (defaults to model)
}

/**
 * Generic reveal → Again/Got-it loop, shared by every pack. `compose` adds an AI free-write check
 * before reveal (same /compose/check endpoint as the standalone Compose page). All grading flows
 * into the one practice_card SRS via usePracticeProgress, exactly like the pattern/collocation drills.
 */
export function DeckDrill({ items, compose = false, onExit }: { items: DeckEntry[]; compose?: boolean; onExit: () => void }) {
  const t = useTranslations("decks");
  const { daily, grade } = usePracticeProgress();
  const [queue, setQueue] = useState<DeckEntry[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const graded = useRef<Set<string>>(new Set());

  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t("empty")}</p>;
  const done = pos >= queue.length;

  const answer = (ok: boolean) => {
    const cur = queue[pos];
    if (!graded.current.has(cur.key)) {
      grade(cur.key, ok);
      graded.current.add(cur.key);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]);
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
          <p className="text-lg font-semibold">{t("done")}</p>
          <p className="text-sm text-muted-foreground">{t("summary", { got, total: items.length })}</p>
          <p className="text-sm">🔥 {t("streakDays", { n: daily.streak })} · {t("todayReps", { n: daily.reps })}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={restart}>{t("again")}</Button>
            <Button variant="outline" onClick={onExit}>{t("exit")}</Button>
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
          <span>{t("progress", { n: pos + 1, total: queue.length })}</span>
          <span>🔥 {daily.streak} · {t("todayReps", { n: daily.reps })}</span>
        </div>

        <div className="space-y-1 text-center">
          {item.subtitle ? (
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.subtitle}</span>
          ) : null}
          <p className="font-mono text-2xl font-semibold text-primary">{item.title}</p>
        </div>

        <div className="rounded-md border bg-muted/20 p-4 text-center">
          <div className="text-xs text-muted-foreground">{t("sayThis")}</div>
          <p className="mt-1 text-xl">{item.cue}</p>
        </div>

        {compose && !revealed ? <ComposeBox item={item} /> : null}

        {!revealed ? (
          <Button className="w-full" autoFocus onClick={() => { setRevealed(true); speak(item.model); }}>
            {t("reveal")}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-center">
              <div className="flex items-center justify-center gap-2">
                <p className="font-mono text-lg">{item.model}</p>
                {canSpeak() && (
                  <button type="button" aria-label={t("listen")} onClick={() => speak(item.model)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground">🔊</button>
                )}
              </div>
              {item.note ? <p className="mt-1 text-xs text-muted-foreground">{item.note}</p> : null}
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

/** Inline AI free-write check for compose mode — write your own sentence using the chunk. */
function ComposeBox({ item }: { item: DeckEntry }) {
  const t = useTranslations("decks");
  const [text, setText] = useState("");
  const check = useMutation({ mutationFn: () => practiceApi.composeCheck(item.target ?? item.model, item.cue, text.trim()) });
  const fb = check.data;
  return (
    <div className="space-y-2">
      <textarea
        className="min-h-16 w-full rounded-md border bg-background p-2 text-sm"
        placeholder={t("composePlaceholder")}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {fb ? (
        <div className={`rounded-md border p-2 text-sm ${fb.ok ? "border-green-500/40 bg-green-500/5" : "border-amber-500/40 bg-amber-500/5"}`}>
          <p className="font-medium">{fb.ok ? t("composeGood") : t("composeWork")}</p>
          <p className="text-muted-foreground">{fb.feedback}</p>
          {fb.better ? <p className="italic">{t("composeBetter", { text: fb.better })}</p> : null}
        </div>
      ) : null}
      <Button variant="outline" className="w-full" disabled={!text.trim() || check.isPending} onClick={() => check.mutate()}>
        {check.isPending ? t("composeChecking") : t("composeCheck")}
      </Button>
    </div>
  );
}
