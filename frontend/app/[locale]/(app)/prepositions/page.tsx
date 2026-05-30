"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PrepositionDiagram } from "@/components/prepositions/PrepositionDiagram";
import { PrepositionDrill } from "@/components/prepositions/PrepositionDrill";
import { PREPOSITION_PRIMER, type PrimerSense } from "@/lib/prepositions-primer";
import { prepositionsApi, type MinedPreposition } from "@/lib/api/prepositions";

function SenseTile({ sense }: { sense: PrimerSense }) {
  return (
    <div className="rounded-md border bg-card p-2.5">
      {sense.diagram ? (
        <PrepositionDiagram diagram={sense.diagram} className="mb-2 h-20 w-full rounded bg-muted/20" />
      ) : (
        <div className="mb-2 flex h-20 w-full items-center justify-center rounded bg-muted/10 text-xs text-muted-foreground">
          (abstract sense)
        </div>
      )}
      <div className="text-sm font-medium">{sense.label}</div>
      <div className="font-mono text-sm text-muted-foreground">{sense.example}</div>
    </div>
  );
}

export default function PrepositionsPage() {
  const t = useTranslations("prepositions");

  const { data: mined, isPending } = useQuery({
    queryKey: ["prepositions", "mined"],
    queryFn: () => prepositionsApi.mined(),
  });

  const minedByKey = useMemo(() => {
    const map = new Map<string, MinedPreposition>();
    (mined ?? []).forEach((m) => map.set(m.preposition.trim().toLowerCase(), m));
    return map;
  }, [mined]);

  const primerKeys = useMemo(() => new Set(PREPOSITION_PRIMER.map((p) => p.key)), []);
  const extraMined = useMemo(
    () => (mined ?? []).filter((m) => !primerKeys.has(m.preposition.trim().toLowerCase())),
    [mined, primerKeys],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </header>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">{t("tabBrowse")}</TabsTrigger>
          <TabsTrigger value="drill">{t("tabDrill")}</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">{t("coreTitle")}</h2>
        <div className="space-y-3">
          {PREPOSITION_PRIMER.map((p) => {
            const group = minedByKey.get(p.key);
            return (
              <Card key={p.key}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-semibold tracking-tight">{p.prep}</span>
                    <span className="text-xs font-normal text-muted-foreground">
                      {t("senseCount", { count: p.senses.length })}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {p.senses.map((s, i) => (
                      <SenseTile key={i} sense={s} />
                    ))}
                  </div>
                  {group && group.occurrences.length > 0 && (
                    <div className="rounded-md border bg-muted/30 p-2.5">
                      <div className="mb-1 text-xs font-medium text-muted-foreground">
                        {t("fromMyClips", { count: group.occurrences.length })}
                      </div>
                      <ul className="space-y-1.5">
                        {group.occurrences.map((o, i) => (
                          <li key={i} className="text-xs">
                            <Link href={`/player/${o.clipId}`} className="font-mono hover:underline">
                              {o.phrase || o.clipName}
                            </Link>
                            {o.sense && <span className="text-muted-foreground"> — {o.sense}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("minedTitle")}</h2>
        {isPending ? (
          <Skeleton className="h-16 w-full" />
        ) : extraMined.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("minedEmpty")}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {extraMined.map((m) => (
              <Card key={m.preposition}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-baseline gap-3">
                    <span className="font-mono text-xl">{m.preposition}</span>
                    <Badge variant="outline" className="text-xs">{m.occurrences.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 text-sm">
                    {m.occurrences.map((o, i) => (
                      <li key={i}>
                        <Link href={`/player/${o.clipId}`} className="font-mono text-sm hover:underline">
                          {o.phrase || o.clipName}
                        </Link>
                        {o.sense && <span className="text-muted-foreground"> — {o.sense}</span>}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
        </TabsContent>

        <TabsContent value="drill">
          <PrepositionDrill mined={mined ?? []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
