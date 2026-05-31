"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PATTERNS } from "@/lib/patterns";
import { COLLOCATIONS } from "@/lib/collocations";
import { ComposeCheck } from "@/components/practice/ComposeCheck";

interface Target {
  kind: "pattern" | "collocation";
  target: string;
  gloss: string;
}

function buildPool(): Target[] {
  const pats: Target[] = PATTERNS.map((p) => ({ kind: "pattern", target: p.frame, gloss: p.gloss }));
  const cols: Target[] = COLLOCATIONS.map((c) => ({ kind: "collocation", target: c.anchor, gloss: c.gloss }));
  return [...pats, ...cols];
}

export default function ComposePage() {
  const t = useTranslations("compose");
  const pool = useMemo(buildPool, []);
  const [idx, setIdx] = useState(0); // start deterministic (no SSR random mismatch); "Next" randomizes

  const current = pool[idx];

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </header>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-1 text-center">
            <Badge variant="outline" className="text-[10px]">
              {current.kind === "pattern" ? t("kindPattern") : t("kindCollocation")}
            </Badge>
            <p className="font-mono text-2xl font-semibold text-primary">{current.target}</p>
            <p className="text-xs text-muted-foreground">{current.gloss}</p>
          </div>

          {/* key remounts ComposeCheck on target change → clears the textarea + last verdict */}
          <ComposeCheck key={current.target} target={current.target} gloss={current.gloss} />

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIdx(Math.floor(Math.random() * pool.length))}
          >
            {t("next")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
