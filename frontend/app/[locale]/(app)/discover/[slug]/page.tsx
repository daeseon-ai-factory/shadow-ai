"use client";

import { use } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { buttonVariants } from "@/components/ui/button";
import { collectionsApi } from "@/lib/api/collections";

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = useTranslations("discover");
  const { slug } = use(params);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["collection", slug],
    queryFn: () => collectionsApi.get(slug),
  });

  if (isPending) return <Skeleton className="h-64 w-full" />;
  if (isError) return <p className="text-sm text-red-600">{(error as Error).message}</p>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <Link href="/discover" className={buttonVariants({ variant: "ghost", size: "sm" })}>{t("backToList")}</Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{data.name}</h1>
        <p className="text-sm text-muted-foreground">{data.description}</p>
      </header>

      {data.videos.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("noVideosInCollection")}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.videos.map((entry) => {
            const v = entry.video;
            return (
              <Card key={v.id} className="overflow-hidden">
                <Link href={`/video/${v.id}`}>
                  <div className="aspect-video w-full bg-muted">
                    {v.thumbnailUrl && (
                      <Image src={v.thumbnailUrl} alt={v.title} width={480} height={270}
                             className="h-full w-full object-cover" unoptimized />
                    )}
                  </div>
                </Link>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm leading-tight">
                    <Link href={`/video/${v.id}`} className="hover:underline">{v.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {v.channelName ?? t("channelUnknown")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {entry.category && <Badge variant="secondary" className="text-xs">{entry.category}</Badge>}
                  {v.transcriptStatus === "UNAVAILABLE" && (
                    <Badge variant="destructive" className="ml-2 text-xs">{t("noTranscriptBadge")}</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
