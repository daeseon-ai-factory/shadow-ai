"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePracticeSrsStates } from "@/lib/hooks/use-practice-progress";
import { cardIndex } from "@/lib/practice-cards";
import { speak, canSpeak } from "@/lib/speak";

const TOP_N = 40;

export default function WeakSpotsPage() {
  const t = useTranslations("weak");
  const states = usePracticeSrsStates();
  const index = useMemo(() => cardIndex(), []);

  const stats = useMemo(() => {
    const seen = states.length;
    const lapses = states.reduce((sum, s) => sum + s.lapseCount, 0);
    const mastered = states.filter((s) => s.box >= 5).length;
    return { seen, lapses, mastered };
  }, [states]);

  const weak = useMemo(
    () =>
      states
        .filter((s) => s.lapseCount > 0)
        .sort((a, b) => b.lapseCount - a.lapseCount || a.box - b.box)
        .slice(0, TOP_N)
        .map((s) => ({ srs: s, info: index.get(s.cardKey) }))
        .filter((x) => x.info),
    [states, index],
  );

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        <Stat label={t("statSeen")} value={stats.seen} />
        <Stat label={t("statLapses")} value={stats.lapses} />
        <Stat label={t("statMastered")} value={stats.mastered} />
      </div>

      {stats.seen === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyNoData")}</p>
      ) : weak.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("emptyNoWeak")}</p>
      ) : (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">{t("topHeading", { n: weak.length })}</h2>
          <div className="space-y-2">
            {weak.map(({ srs, info }) => (
              <Card key={srs.cardKey}>
                <CardContent className="flex items-center justify-between gap-3 p-3">
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="shrink-0 text-[10px]">
                        {info!.kind === "pattern" ? t("kindPattern") : t("kindCollocation")}
                      </Badge>
                      <span className="truncate font-mono text-sm">{info!.title}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{info!.cue}</p>
                    <p className="flex items-center gap-1.5 truncate font-mono text-xs">
                      {info!.model}
                      {canSpeak() && (
                        <button
                          type="button"
                          aria-label={t("listen")}
                          onClick={() => speak(info!.model)}
                          className="shrink-0 text-muted-foreground hover:text-foreground"
                        >
                          🔊
                        </button>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                    <Badge variant="destructive" className="text-[10px]">{t("lapseBadge", { n: srs.lapseCount })}</Badge>
                    <span className="text-[10px] text-muted-foreground">{t("boxLabel", { n: srs.box })}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{t("drillNote")}</p>
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </CardContent>
    </Card>
  );
}
