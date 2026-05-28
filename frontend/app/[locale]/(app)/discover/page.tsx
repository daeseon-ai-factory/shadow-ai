"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { collectionsApi } from "@/lib/api/collections";

export default function DiscoverPage() {
  const t = useTranslations("discover");
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionsApi.list(),
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      {isPending && <Skeleton className="h-32 w-full" />}
      {isError && <p className="text-sm text-red-600">{(error as Error).message}</p>}
      {data && data.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t("emptyTitle")}</CardTitle>
            <CardDescription>
              <span dangerouslySetInnerHTML={{ __html: t("emptyDescription") }} />
            </CardDescription>
          </CardHeader>
        </Card>
      )}
      {data && data.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="text-base">{c.name}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/discover/${c.slug}`} className={buttonVariants({ variant: "outline" })}>
                  {t("viewVideos")}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
