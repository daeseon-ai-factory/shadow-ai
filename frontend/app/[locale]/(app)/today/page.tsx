"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import {
  VERB_PACK, verbKey,
  PHRASAL_500, phrasal500Key,
  IT_PATTERNS, itPatternKey,
  IT_TERMS, itTermKey,
  ENGLISH_PATTERNS, englishPatternKey,
  COLLOCATIONS, collocationKey,
  buildDailySession, localToday,
} from "@shadow-ai/core";
import { usePracticeSrsStates } from "@/lib/hooks/use-practice-progress";
import { DeckDrill, type DeckEntry } from "@/components/decks/DeckDrill";
import { Button } from "@/components/ui/button";

const DAILY_TARGET = 30;

// Every pack pooled — the daily set interleaves across all of them.
function allItems(): DeckEntry[] {
  const out: DeckEntry[] = [];
  for (const g of VERB_PACK)
    g.items.forEach((it, i) => out.push({ key: verbKey(g.id, i), title: g.verb, cue: it.cue, model: it.model, note: it.easyEn, target: it.model }));
  PHRASAL_500.forEach((p, i) => out.push({ key: phrasal500Key(i), title: p.phrasal, cue: p.ko, model: p.example || p.phrasal, note: [p.note, p.exampleKo].filter(Boolean).join("  ·  ") || undefined, target: p.phrasal }));
  IT_PATTERNS.forEach((p, i) => out.push({ key: itPatternKey(i), title: p.category, cue: p.ko, model: p.en, target: p.en }));
  IT_TERMS.forEach((p, i) => out.push({ key: itTermKey(i), title: p.section, cue: p.ko, model: p.en, target: p.en }));
  ENGLISH_PATTERNS.forEach((p, i) => out.push({ key: englishPatternKey(i), title: p.category, cue: p.frame, model: p.example }));
  for (const c of COLLOCATIONS)
    c.items.forEach((it, i) => out.push({ key: collocationKey(c.id, i), title: c.anchor, subtitle: c.gloss, cue: it.cue, model: it.model, target: c.anchor }));
  return out;
}

export default function TodayPage() {
  const t = useTranslations("decks");
  const router = useRouter();
  const states = usePracticeSrsStates();
  const [drill, setDrill] = useState<DeckEntry[] | null>(null);
  const session = useMemo(() => buildDailySession(allItems(), states, localToday(), DAILY_TARGET), [states]);

  if (drill) return <DeckDrill items={drill} onExit={() => setDrill(null)} />;

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("todayTitle")}</h1>
        <p className="text-sm text-muted-foreground">{t("todaySub")}</p>
      </header>
      <p className="text-sm text-muted-foreground">{t("due", { n: session.length })}</p>
      <div className="flex gap-2">
        <Button disabled={session.length === 0} onClick={() => setDrill(session)}>
          {session.length === 0 ? t("allCaughtUp") : t("begin")}
        </Button>
        <Button variant="outline" onClick={() => router.push("/story")}>
          {t("todayFinishStory")}
        </Button>
      </div>
    </div>
  );
}
