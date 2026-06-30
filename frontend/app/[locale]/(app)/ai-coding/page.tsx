"use client";

import { useTranslations } from "next-intl";
import { AI_CODING, aiCodingKey } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

function build(): DeckEntry[] {
  return AI_CODING.map((p, i) => ({
    key: aiCodingKey(i),
    title: p.category,
    cue: p.ko,
    model: p.en,
    target: p.en,
  }));
}

export default function AiCodingPage() {
  const t = useTranslations("decks");
  return <DeckPage title={t("aiCodingTitle")} subtitle={t("aiCodingSub")} build={build} modes={["recall", "reverse", "compose"]} />;
}
