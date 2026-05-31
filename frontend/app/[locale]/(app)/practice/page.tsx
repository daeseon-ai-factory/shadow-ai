"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PATTERNS } from "@/lib/patterns";
import { PREPOSITION_PRIMER } from "@/lib/prepositions-primer";
import { COLLOCATIONS } from "@/lib/collocations";

interface Drill {
  href: string;
  title: string;
  desc: string;
  count?: string;
}

export default function PracticePage() {
  const t = useTranslations("practice");

  const drills: Drill[] = [
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
