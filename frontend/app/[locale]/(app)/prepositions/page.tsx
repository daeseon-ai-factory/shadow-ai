"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PREPOSITION_PRIMER } from "@/lib/prepositions-primer";
import { prepositionsApi, type MinedPreposition } from "@/lib/api/prepositions";

export default function PrepositionsPage() {
  const t = useTranslations("prepositions");

  const { data: mined, isPending } = useQuery({
    queryKey: ["prepositions", "mined"],
    queryFn: () => prepositionsApi.mined(),
  });

  // normalized preposition -> mined group
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

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">{t("coreTitle")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {PREPOSITION_PRIMER.map((p) => {
            const group = minedByKey.get(p.key);
            return (
              <Card key={p.key}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-baseline gap-3">
                    <span className="font-mono text-xl">{p.prep}</span>
                    <span className="text-sm font-normal text-muted-foreground">{p.sense}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="leading-relaxed">{p.image}</p>
                  <ul className="space-y-1">
                    {p.examples.map((ex, i) => (
                      <li key={i} className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-mono">{ex.en}</span>
                        <span className="text-muted-foreground">— {ex.ko}</span>
                      </li>
                    ))}
                  </ul>
                  {group && group.occurrences.length > 0 && (
                    <div className="rounded-md border bg-muted/30 p-2.5">
                      <div className="mb-1 text-xs font-medium text-muted-foreground">
                        {t("fromMyClips", { count: group.occurrences.length })}
                      </div>
                      <ul className="space-y-1.5">
                        {group.occurrences.map((o, i) => (
                          <li key={i} className="text-xs">
                            <Link
                              href={`/player/${o.clipId}`}
                              className="font-mono hover:underline"
                            >
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
    </div>
  );
}
