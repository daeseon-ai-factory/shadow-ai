"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COLLOCATIONS, COLLOCATION_DOMAINS, type Collocation, type CollocationDomain } from "@/lib/collocations";
import { CollocationDrill, type ColloDrillEntry } from "@/components/collocations/CollocationDrill";

function entriesFrom(cols: Collocation[]): ColloDrillEntry[] {
  return cols.flatMap((c) =>
    c.items.map((it) => ({ anchor: c.anchor, gloss: c.gloss, domain: c.domain, cue: it.cue, model: it.model })),
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

type Filter = "all" | CollocationDomain;

export default function CollocationsPage() {
  const t = useTranslations("collocations");
  const [filter, setFilter] = useState<Filter>("all");
  const [drill, setDrill] = useState<ColloDrillEntry[] | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? COLLOCATIONS : COLLOCATIONS.filter((c) => c.domain === filter)),
    [filter],
  );

  if (drill) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <CollocationDrill items={drill} onExit={() => setDrill(null)} />
      </div>
    );
  }

  const filters: Filter[] = ["all", ...COLLOCATION_DOMAINS];
  const filterLabel = (f: Filter) =>
    f === "all" ? t("filterAll") : f === "dev" ? t("filterDev") : t("filterGeneral");

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("intro")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg" onClick={() => setDrill(shuffle(entriesFrom(visible)))}>
            ▶ {t("startDaily")}
          </Button>
          <div className="flex gap-1.5">
            {filters.map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? "default" : "outline"}
                onClick={() => setFilter(f)}
              >
                {filterLabel(f)}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {COLLOCATION_DOMAINS.map((domain) => {
        const inDomain = visible.filter((c) => c.domain === domain);
        if (inDomain.length === 0) return null;
        return (
          <section key={domain} className="space-y-3">
            <h2 className="text-sm font-medium text-muted-foreground">
              {domain === "dev" ? t("domainDev") : t("domainGeneral")} · {inDomain.length}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {inDomain.map((c) => (
                <Card key={c.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between gap-2">
                      <span className="font-mono text-base">{c.anchor}</span>
                      <Button size="sm" variant="outline" onClick={() => setDrill(entriesFrom([c]))}>
                        {t("drillThis")}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-[10px]">{c.prep}</Badge>
                      <span className="text-xs text-muted-foreground">{c.gloss}</span>
                    </div>
                    <ul className="space-y-0.5 font-mono text-muted-foreground">
                      {c.items.slice(0, 2).map((it, i) => (
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
