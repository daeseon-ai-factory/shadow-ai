"use client";

import { useTranslations } from "next-intl";
import { ENGLISH_PATTERNS, englishPatternKey } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

// No Korean gloss on these, so recall only (show the frame → produce an example).
function build(): DeckEntry[] {
  return ENGLISH_PATTERNS.map((p, i) => ({
    key: englishPatternKey(i),
    title: p.category,
    cue: p.frame,
    model: p.example,
  }));
}

export default function EnglishPatternsPage() {
  const t = useTranslations("decks");
  return <DeckPage title={t("englishPatternsTitle")} subtitle={t("englishPatternsSub")} build={build} />;
}
