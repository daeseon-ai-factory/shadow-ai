"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PATTERNS, PATTERN_CATEGORIES, type Pattern } from "@/lib/patterns";
import { PatternDrill, type DrillEntry } from "@/components/patterns/PatternDrill";

function entriesFrom(patterns: Pattern[]): DrillEntry[] {
  return patterns.flatMap((p) =>
    p.items.map((it) => ({ category: p.category, frame: p.frame, gloss: p.gloss, cue: it.cue, model: it.model })),
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PatternsPage() {
  const t = useTranslations("patterns");
  const [drill, setDrill] = useState<DrillEntry[] | null>(null);

  if (drill) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <PatternDrill items={drill} onExit={() => setDrill(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>
        <Button size="lg" onClick={() => setDrill(shuffle(entriesFrom(PATTERNS)))}>
          ▶ {t("startDaily")}
        </Button>
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
                      <Button size="sm" variant="outline" onClick={() => setDrill(entriesFrom([p]))}>
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
