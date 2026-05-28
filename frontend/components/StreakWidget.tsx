"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reviewApi } from "@/lib/api/review";

export function StreakWidget() {
  const t = useTranslations("streak");
  const { data, isPending } = useQuery({
    queryKey: ["review", "streak"],
    queryFn: () => reviewApi.streak(),
    refetchInterval: 60_000,
  });

  return (
    <Card className="bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t("title")}</CardTitle>
        <CardDescription className="text-xs">{t("subtitle")}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <Link href="/review" className="block">
          <div className="text-3xl font-semibold leading-none">
            {isPending ? "—" : data?.dueToday ?? 0}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{t("due")}</div>
        </Link>
        <div>
          <div className="text-3xl font-semibold leading-none">
            {isPending ? "—" : data?.streakDays ?? 0}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{t("streakDays")}</div>
        </div>
      </CardContent>
    </Card>
  );
}
