"use client";

import { useTranslations } from "next-intl";
import { VERB_PACK, verbKey } from "@shadow-ai/core";
import { DeckPage } from "@/components/decks/DeckPage";
import type { DeckEntry } from "@/components/decks/DeckDrill";

// Base verbs, frequency-ordered (T1 first), starred first within a tier.
function build(): DeckEntry[] {
  const rows: { tier: number; star: number; e: DeckEntry }[] = [];
  for (const g of VERB_PACK) {
    g.items.forEach((it, i) => {
      rows.push({
        tier: it.tier,
        star: it.star ? 0 : 1,
        e: { key: verbKey(g.id, i), title: g.verb, subtitle: `T${it.tier}`, cue: it.cue, model: it.model, note: it.easyEn, target: it.model },
      });
    });
  }
  rows.sort((a, b) => a.tier - b.tier || a.star - b.star);
  return rows.map((r) => r.e);
}

export default function VerbsPage() {
  const t = useTranslations("decks");
  return <DeckPage title={t("verbsTitle")} subtitle={t("verbsSub")} build={build} modes={["recall", "reverse", "compose"]} />;
}
