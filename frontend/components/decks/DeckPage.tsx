"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeckDrill, type DeckEntry } from "@/components/decks/DeckDrill";
import { usePracticeSrsStates } from "@/lib/hooks/use-practice-progress";
import { partition, shuffle, localToday, NEW_PER_DAY } from "@/lib/practice-srs";

export type DeckMode = "recall" | "reverse" | "compose";

// recall = Korean → English (as-is); reverse = English → Korean (swap shown sides, key unchanged).
function applyMode(items: DeckEntry[], mode: DeckMode): DeckEntry[] {
  if (mode === "reverse") return items.map((d) => ({ ...d, cue: d.model, model: d.cue, note: undefined }));
  return items;
}

/**
 * Generic single-deck page: SRS session (due reviews + a daily trickle of new, in source order) and
 * a mode selector (recall / reverse / compose). The thin per-pack pages just supply title + a builder.
 */
export function DeckPage({
  title,
  subtitle,
  build,
  modes = ["recall"],
}: {
  title: string;
  subtitle: string;
  build: () => DeckEntry[];
  modes?: DeckMode[];
}) {
  const t = useTranslations("decks");
  const [mode, setMode] = useState<DeckMode>(modes[0]);
  const [drill, setDrill] = useState<DeckEntry[] | null>(null);
  const states = usePracticeSrsStates();

  const session = useMemo<DeckEntry[]>(() => {
    const { due, fresh } = partition(applyMode(build(), mode), states, localToday());
    return [...shuffle(due), ...fresh.slice(0, NEW_PER_DAY)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, mode]);

  if (drill) return <DeckDrill items={drill} compose={mode === "compose"} onExit={() => setDrill(null)} />;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </header>

      {modes.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {modes.map((m) => (
            <Badge
              key={m}
              variant={mode === m ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setMode(m)}
            >
              {t(`mode_${m}`)}
            </Badge>
          ))}
        </div>
      ) : null}

      <p className="text-sm text-muted-foreground">{t("due", { n: session.length })}</p>
      <Button disabled={session.length === 0} onClick={() => setDrill(session)}>
        {session.length === 0 ? t("allCaughtUp") : t("begin")}
      </Button>
    </div>
  );
}
