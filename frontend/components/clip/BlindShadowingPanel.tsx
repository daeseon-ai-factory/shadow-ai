"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useShortcuts } from "@/lib/use-shortcuts";

type Level = 0 | 1 | 2;

const STORAGE_KEY = "tubeshadow.blindLevel";

export function BlindShadowingPanel({ transcript }: { transcript: string | null | undefined }) {
  const t = useTranslations("blind");
  const [level, setLevel] = useState<Level>(2);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (raw === "0" || raw === "1" || raw === "2") setLevel(Number(raw) as Level);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, String(level));
  }, [level]);

  // 2 → 1 → 0 → 2 (most → least visible)
  const cycle = () => setLevel((l) => ((l + 2) % 3) as Level);

  useShortcuts([
    { key: "b", description: t("shortcutCycle"), action: cycle },
  ]);

  if (!transcript) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div
          className="inline-flex rounded-md border p-0.5 text-xs"
          role="group"
          aria-label={t("label")}
        >
          {([0, 1, 2] as const).map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => setLevel(lv)}
              className={`rounded px-2 py-0.5 ${
                level === lv ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-pressed={level === lv}
            >
              {lv === 0 ? t("levelHidden") : lv === 1 ? t("levelHints") : t("levelFull")}
            </button>
          ))}
        </div>
        <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">b</kbd>
      </div>
      {level < 2 && (
        <p className="text-xs text-muted-foreground">
          {level === 0 ? t("hintHidden") : t("hintHints")}
        </p>
      )}
      <p
        className="whitespace-pre-line text-xl leading-relaxed"
        data-testid="blind-transcript"
        data-blind-level={level}
      >
        {transform(transcript, level)}
      </p>
    </div>
  );
}

/**
 * level 2 → full text
 * level 1 → first letter of each word, rest replaced with "_"
 * level 0 → every letter replaced with "▮" (same width per word)
 * Punctuation and spacing are preserved at every level.
 */
export function transform(text: string, level: Level): string {
  if (level === 2) return text;
  if (level === 0) return text.replace(/\p{L}+/gu, (w) => "▮".repeat(w.length));
  return text.replace(/\p{L}+/gu, (w) => (w.length <= 1 ? w : w[0] + "_".repeat(w.length - 1)));
}
