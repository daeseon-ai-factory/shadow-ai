"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PREPOSITION_PRIMER } from "@/lib/prepositions-primer";
import type { MinedPreposition } from "@/lib/api/prepositions";

const BLANK = "_____";

interface DrillItem {
  prompt: string; // phrase with the preposition blanked out
  answer: string; // the preposition
  full: string; // full phrase
  hint?: string; // sense label / mined note
  clipId?: string; // mined items link back to the clip
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Blank the first whole-word occurrence of `prep` in `phrase`, or null if it isn't there. */
function blankOut(phrase: string, prep: string): string | null {
  const re = new RegExp(`\\b${escapeRegex(prep)}\\b`, "i");
  if (!re.test(phrase)) return null;
  return phrase.replace(re, BLANK);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildItems(mined: MinedPreposition[]): DrillItem[] {
  const items: DrillItem[] = [];
  for (const p of PREPOSITION_PRIMER) {
    for (const s of p.senses) {
      const prompt = blankOut(s.example, p.prep);
      if (prompt) items.push({ prompt, answer: p.prep, full: s.example, hint: s.label });
    }
  }
  for (const m of mined) {
    for (const o of m.occurrences) {
      if (!o.phrase) continue;
      const prompt = blankOut(o.phrase, m.preposition);
      if (prompt) items.push({ prompt, answer: m.preposition, full: o.phrase, hint: o.sense, clipId: o.clipId });
    }
  }
  return shuffle(items);
}

export function PrepositionDrill({ mined }: { mined: MinedPreposition[] }) {
  const t = useTranslations("prepositions");
  const [items] = useState(() => buildItems(mined));
  const [idx, setIdx] = useState(0);
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{t("drillEmpty")}</p>;
  }

  if (idx >= items.length) {
    return (
      <Card>
        <CardContent className="space-y-3 p-6 text-center">
          <p className="text-lg font-semibold">{t("drillDone")}</p>
          <p className="text-sm text-muted-foreground">{t("drillScore", { correct, total: items.length })}</p>
          <Button
            onClick={() => {
              setIdx(0);
              setValue("");
              setRevealed(false);
              setCorrect(0);
              setAnswered(0);
            }}
          >
            {t("drillRestart")}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const item = items[idx];
  const isRight = value.trim().toLowerCase() === item.answer.toLowerCase();

  const submit = () => {
    if (!value.trim() || revealed) return;
    setRevealed(true);
    setAnswered((n) => n + 1);
    if (isRight) setCorrect((n) => n + 1);
  };
  const next = () => {
    setIdx((i) => i + 1);
    setValue("");
    setRevealed(false);
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{t("drillProgress", { n: idx + 1, total: items.length })}</span>
          <span>{t("drillScore", { correct, total: answered })}</span>
        </div>

        <p className="text-center font-mono text-2xl tracking-tight">{item.prompt}</p>

        {!revealed ? (
          <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex gap-2">
            <Input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t("drillPlaceholder")}
              aria-label={t("drillPlaceholder")}
            />
            <Button type="submit">{t("drillCheck")}</Button>
          </form>
        ) : (
          <div className="space-y-3">
            <div
              className={`rounded-md border p-3 text-center ${
                isRight ? "border-green-500/40 bg-green-500/10" : "border-red-500/40 bg-red-500/10"
              }`}
            >
              <div className="text-sm font-medium">{isRight ? t("drillCorrect") : t("drillWrong")}</div>
              <div className="mt-1 font-mono text-lg">{item.full}</div>
              {item.hint && <div className="mt-0.5 text-xs text-muted-foreground">{item.hint}</div>}
              {item.clipId && (
                <Link href={`/player/${item.clipId}`} className="mt-1 inline-block text-xs underline">
                  {t("drillFromClip")}
                </Link>
              )}
            </div>
            <Button autoFocus className="w-full" onClick={next}>
              {t("drillNext")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
