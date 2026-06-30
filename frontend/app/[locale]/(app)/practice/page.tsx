"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PATTERNS } from "@/lib/patterns";
import { PREPOSITION_PRIMER } from "@/lib/prepositions-primer";
import { COLLOCATIONS } from "@/lib/collocations";
import { VERB_PACK, PHRASAL_500, IT_PATTERNS, IT_TERMS, AI_CODING, ENGLISH_PATTERNS } from "@shadow-ai/core";

interface Drill {
  href: string;
  title: string;
  desc: string;
  count?: string;
}

export default function PracticePage() {
  const t = useTranslations("practice");
  const td = useTranslations("decks");
  const verbCount = VERB_PACK.reduce((s, g) => s + g.items.length, 0);

  const drills: Drill[] = [
    { href: "/today", title: td("todayTitle"), desc: td("todaySub") },
    { href: "/story", title: td("storyTitle"), desc: td("storySub") },
    { href: "/mix", title: td("mixTitle"), desc: td("mixSub") },
    { href: "/verbs", title: td("verbsTitle"), desc: td("verbsSub"), count: td("count", { n: verbCount }) },
    { href: "/phrasal-500", title: td("phrasal500Title"), desc: td("phrasal500Sub"), count: td("count", { n: PHRASAL_500.length }) },
    { href: "/it-patterns", title: td("itPatternsTitle"), desc: td("itPatternsSub"), count: td("count", { n: IT_PATTERNS.length }) },
    { href: "/it-terms", title: td("itTermsTitle"), desc: td("itTermsSub"), count: td("count", { n: IT_TERMS.length }) },
    { href: "/ai-coding", title: td("aiCodingTitle"), desc: td("aiCodingSub"), count: td("count", { n: AI_CODING.length }) },
    { href: "/english-patterns", title: td("englishPatternsTitle"), desc: td("englishPatternsSub"), count: td("count", { n: ENGLISH_PATTERNS.length }) },
    {
      href: "/gym",
      title: t("gymTitle"),
      desc: t("gymDesc"),
    },
    {
      href: "/patterns",
      title: t("patternsTitle"),
      desc: t("patternsDesc"),
      count: t("countPatterns", { n: PATTERNS.length }),
    },
    {
      href: "/prepositions",
      title: t("prepositionsTitle"),
      desc: t("prepositionsDesc"),
      count: t("countPrepositions", { n: PREPOSITION_PRIMER.length }),
    },
    {
      href: "/collocations",
      title: t("collocationsTitle"),
      desc: t("collocationsDesc"),
      count: t("countCollocations", { n: COLLOCATIONS.length }),
    },
    {
      href: "/compose",
      title: t("composeTitle"),
      desc: t("composeDesc"),
    },
    {
      href: "/weak",
      title: t("weakTitle"),
      desc: t("weakDesc"),
    },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("intro")}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {drills.map((d) => (
          <Link key={d.href} href={d.href} className="group">
            <Card className="h-full transition-colors group-hover:border-primary/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-baseline justify-between gap-2">
                  <span>{d.title}</span>
                  {d.count && <span className="text-xs font-normal text-muted-foreground">{d.count}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{d.desc}</p>
                <span className="text-sm font-medium text-primary group-hover:underline">{t("open")} →</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
