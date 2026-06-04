"use client";

import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api/client";
import {
  transformsApi,
  CORE_CATEGORIES,
  EXTRA_CATEGORIES,
  type SeedCandidate,
  type SentenceTransform,
  type SentenceTransformSet,
} from "@/lib/api/transforms";
import { transformKey } from "@/lib/practice-cards";
import { usePracticeProgress } from "@/lib/hooks/use-practice-progress";
import { speak, canSpeak } from "@/lib/speak";

// Mon/Wed/Fri default to also drilling the 5 extra categories; the learner can override per session.
function extraDefault(): boolean {
  return [1, 3, 5].includes(new Date().getDay());
}
function activeCategories(includeExtra: boolean): Set<string> {
  return new Set<string>(includeExtra ? [...CORE_CATEGORIES, ...EXTRA_CATEGORIES] : CORE_CATEGORIES);
}

export function SentenceGym() {
  const t = useTranslations("gym");
  const [text, setText] = useState("");
  const [pickedGloss, setPickedGloss] = useState<string | undefined>();
  const [includeExtra, setIncludeExtra] = useState(extraDefault());
  const [drilling, setDrilling] = useState(false);

  const seeds = useQuery({
    queryKey: ["gym", "seeds"],
    queryFn: () => transformsApi.seeds(),
    staleTime: 60_000,
  });
  const gen = useMutation({
    mutationFn: (v: { base: string; gloss?: string }) => transformsApi.generate(v.base, v.gloss),
  });
  const set = gen.data ?? null;

  const items = useMemo<SentenceTransform[]>(() => {
    if (!set) return [];
    const cats = activeCategories(includeExtra);
    return set.transforms.filter((tr) => cats.has(tr.category));
  }, [set, includeExtra]);

  if (drilling && set) {
    return <GymDrill set={set} items={items} onExit={() => setDrilling(false)} />;
  }

  const notConfigured = gen.error instanceof ApiError && gen.error.code === "AI_NOT_CONFIGURED";
  const otherError = gen.error && !notConfigured;
  const pick = (s: SeedCandidate) => {
    setText(s.english);
    setPickedGloss(s.koreanGloss ?? undefined);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      {!set ? (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("inputLabel")}</label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setPickedGloss(undefined);
                }}
                placeholder={t("inputPlaceholder")}
                rows={2}
                className="w-full resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            {notConfigured && <p className="text-sm text-amber-600 dark:text-amber-500">{t("notConfigured")}</p>}
            {otherError && <p className="text-sm text-destructive">{t("generateFailed")}</p>}
            <Button
              className="w-full"
              disabled={!text.trim() || gen.isPending}
              onClick={() => gen.mutate({ base: text.trim(), gloss: pickedGloss })}
            >
              {gen.isPending ? t("generating") : t("generate")}
            </Button>

            <div className="space-y-2">
              <div className="text-sm font-medium">{t("fromClips")}</div>
              {seeds.data && seeds.data.length === 0 && (
                <p className="text-sm text-muted-foreground">{t("noClipSeeds")}</p>
              )}
              {seeds.data?.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(s)}
                  className="block w-full rounded-md border p-2 text-left text-sm transition-colors hover:border-primary/50"
                >
                  <span>{s.english}</span>
                  {s.koreanGloss && <span className="mt-0.5 block text-xs text-muted-foreground">{s.koreanGloss}</span>}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
              <div className="text-xs text-muted-foreground">{t("ready")}</div>
              <p className="mt-1 font-mono text-lg">{set.baseSentence}</p>
            </div>
            <button
              type="button"
              onClick={() => setIncludeExtra((v) => !v)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                includeExtra ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary/50"
              }`}
            >
              {includeExtra ? t("extraOn") : t("extraOff")}
            </button>
            <p className="text-sm text-muted-foreground">{t("transformCount", { n: items.length })}</p>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => setDrilling(true)}>
                {t("startDrill")}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  gen.reset();
                  setText("");
                  setPickedGloss(undefined);
                }}
              >
                {t("newSentence")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/** Self-grade reveal loop (mirrors PatternDrill) + an opt-in inline AI check with a 0-100 score. */
function GymDrill({
  set,
  items,
  onExit,
}: {
  set: SentenceTransformSet;
  items: SentenceTransform[];
  onExit: () => void;
}) {
  const t = useTranslations("gym");
  const { daily, grade } = usePracticeProgress();
  const [queue, setQueue] = useState<SentenceTransform[]>(items);
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [got, setGot] = useState(0);
  const graded = useRef<Set<string>>(new Set());

  if (items.length === 0) return <p className="text-sm text-muted-foreground">{t("drillEmpty")}</p>;

  const done = pos >= queue.length;
  const cur = done ? null : queue[pos];

  const reveal = () => {
    setRevealed(true);
    if (cur) speak(cur.english);
  };
  const answer = (ok: boolean) => {
    if (!cur) return;
    const k = transformKey(set.seedId, cur.op, 0);
    if (!graded.current.has(k)) {
      grade(k, ok);
      graded.current.add(k);
      if (ok) setGot((g) => g + 1);
    }
    if (!ok) setQueue((q) => [...q, cur]);
    setRevealed(false);
    setPos((p) => p + 1);
  };

  if (done || !cur) {
    return (
      <div className="mx-auto max-w-xl">
        <Card>
          <CardContent className="space-y-3 p-6 text-center">
            <p className="text-lg font-semibold">{t("drillDone")}</p>
            <p className="text-sm text-muted-foreground">{t("drillSummary", { got, total: items.length })}</p>
            <p className="text-sm">🔥 {daily.streak} · {t("todayReps", { n: daily.reps })}</p>
            <Button variant="outline" onClick={onExit}>
              {t("drillExit")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("drillProgress", { n: pos + 1, total: queue.length })}</span>
            <span>🔥 {daily.streak}</span>
          </div>

          <div className="space-y-1 text-center">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{cur.label}</span>
            <p className="font-mono text-base text-primary">{set.baseSentence}</p>
          </div>

          <div className="rounded-md border bg-muted/20 p-4 text-center">
            <div className="text-xs text-muted-foreground">{t("sayThis")}</div>
            <p className="mt-1 text-xl">{cur.koreanGloss}</p>
          </div>

          {!revealed ? (
            <div className="space-y-3">
              <InlineCheck key={cur.op} base={set.baseSentence} target={cur.label} model={cur.english} />
              <Button className="w-full" onClick={reveal}>
                {t("reveal")}
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <p className="font-mono text-lg">{cur.english}</p>
                  {canSpeak() && (
                    <button
                      type="button"
                      aria-label={t("listen")}
                      onClick={() => speak(cur.english)}
                      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      🔊
                    </button>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline" onClick={() => answer(false)}>
                  {t("markAgain")}
                </Button>
                <Button className="flex-1" onClick={() => answer(true)}>
                  {t("markGot")}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/** Opt-in: type your version of the transform, get a 0-100 score + feedback + a better version. */
function InlineCheck({ base, target, model }: { base: string; target: string; model: string }) {
  const t = useTranslations("gym");
  const [text, setText] = useState("");
  const m = useMutation({ mutationFn: () => transformsApi.check(target, base, model, text.trim()) });
  const fb = m.data;
  const notConfigured = m.error instanceof ApiError && m.error.code === "AI_NOT_CONFIGURED";

  return (
    <div className="space-y-2">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("checkPlaceholder")}
        rows={2}
        className="w-full resize-none rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <Button
        variant="outline"
        className="w-full"
        disabled={!text.trim() || m.isPending}
        onClick={() => m.mutate()}
      >
        {m.isPending ? t("checking") : t("aiCheck")}
      </Button>
      {notConfigured && <p className="text-sm text-amber-600 dark:text-amber-500">{t("notConfigured")}</p>}
      {m.isError && !notConfigured && <p className="text-sm text-destructive">{t("checkFailed")}</p>}
      {fb && (
        <div
          className={`space-y-1 rounded-md border p-2 ${
            fb.ok ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"
          }`}
        >
          <div className="text-sm font-medium">
            {fb.ok ? `✅ ${t("good")}` : `✏️ ${t("needsWork")}`} · {fb.score}/100
          </div>
          {fb.feedback && <p className="text-sm text-muted-foreground">{fb.feedback}</p>}
          {fb.better && (
            <p className="font-mono text-sm">
              <span className="text-xs text-muted-foreground">{t("betterLabel")} </span>
              {fb.better}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
