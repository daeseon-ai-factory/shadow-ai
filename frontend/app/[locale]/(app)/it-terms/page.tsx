"use client";

import { useTranslations } from "next-intl";
import { IT_TERMS, itTermKey } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

function build(): DeckEntry[] {
  return IT_TERMS.map((p, i) => ({
    key: itTermKey(i),
    title: p.section,
    cue: p.ko,
    model: p.en,
    target: p.en,
  }));
}

export default function ItTermsPage() {
  const t = useTranslations("decks");
  return <DeckPage title={t("itTermsTitle")} subtitle={t("itTermsSub")} build={build} modes={["recall", "reverse", "compose"]} />;
}
