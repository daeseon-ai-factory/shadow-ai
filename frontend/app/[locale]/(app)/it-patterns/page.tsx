"use client";

import { useTranslations } from "next-intl";
import { IT_PATTERNS, itPatternKey } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

function build(): DeckEntry[] {
  return IT_PATTERNS.map((p, i) => ({
    key: itPatternKey(i),
    title: p.category,
    cue: p.ko,
    model: p.en,
    target: p.en,
  }));
}

export default function ItPatternsPage() {
  const t = useTranslations("decks");
  return <DeckPage title={t("itPatternsTitle")} subtitle={t("itPatternsSub")} build={build} modes={["recall", "reverse", "compose"]} />;
}
