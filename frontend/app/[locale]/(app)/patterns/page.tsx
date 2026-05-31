"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PATTERNS, PATTERN_CATEGORIES, type Pattern } from "@/lib/patterns";
import { PatternDrill, type DrillEntry } from "@/components/patterns/PatternDrill";
import { usePracticeSrsStates } from "@/lib/hooks/use-practice-progress";
import { buildSession, partition, localToday, shuffle, NEW_PER_DAY } from "@/lib/practice-srs";

function entriesFrom(patterns: Pattern[]): DrillEntry[] {
  return patterns.flatMap((p) =>
    p.items.map((it, i) => ({
      key: `pat:${p.id}#${i}`,
      category: p.category,
      frame: p.frame,
      gloss: p.gloss,
      cue: it.cue,
      model: it.model,
    })),
  );
}

export default function PatternsPage() {
  const t = useTranslations("patterns");
  const [drill, setDrill] = useState<DrillEntry[] | null>(null);

  const states = usePracticeSrsStates();
  const today = localToday();
  const allEntries = useMemo(() => entriesFrom(PATTERNS), []);
  const { due, fresh } = useMemo(() => partition(allEntries, states, today), [allEntries, states, today]);

  if (drill) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <PatternDrill items={drill} onExit={() => setDrill(null)} />
      </div>
    );
  }

  const startDaily = () => {
    const session = buildSession(allEntries, states, today);
    if (session.length === 0) {
      toast.success(t("caughtUp"));
      return;
    }
    setDrill(session);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" onClick={startDaily}>▶ {t("startDaily")}</Button>
          <span className="text-sm text-muted-foreground">
            {t("dailyHint", { due: due.length, new: Math.min(fresh.length, NEW_PER_DAY) })}
          </span>
        </div>
      </header>

      {PATTERN_CATEGORIES.map((cat) => {
        const inCat = PATTERNS.filter((p) => p.category === cat);
        if (inCat.length === 0) return null;
        return (
          <section key={cat} className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">{t(`cat_${cat}`)}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {inCat.map((p) => (
                <Card key={p.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="font-mono text-base">{p.frame}</span>
                      <Button size="sm" variant="outline" onClick={() => setDrill(shuffle(entriesFrom([p])))}>
                        {t("drillThis")}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-sm">
                    <p className="text-xs text-muted-foreground">{p.gloss}</p>
                    <ul className="space-y-0.5 font-mono text-muted-foreground">
                      {p.items.slice(0, 2).map((it, i) => (
                        <li key={i}>{it.model}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
