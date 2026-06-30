"use client";

import { useTranslations } from "next-intl";
import { PHRASAL_500, phrasal500Key } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

function build(): DeckEntry[] {
  return PHRASAL_500.map((p, i) => ({
    key: phrasal500Key(i),
    title: p.phrasal,
    cue: p.ko,
    model: p.example || p.phrasal,
    note: [p.note, p.exampleKo].filter(Boolean).join("  ·  ") || undefined,
    target: p.phrasal,
  }));
}

export default function Phrasal500Page() {
  const t = useTranslations("decks");
  return <DeckPage title={t("phrasal500Title")} subtitle={t("phrasal500Sub")} build={build} modes={["recall", "reverse", "compose"]} />;
}
