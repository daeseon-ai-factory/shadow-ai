"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { collectionsApi } from "@/lib/api/collections";

export default function DiscoverPage() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["collections"],
    queryFn: () => collectionsApi.list(),
  });

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">둘러보기</h1>
        <p className="text-sm text-muted-foreground">
          개발자 영어 학습용으로 큐레이션된 영상 모음입니다.
        </p>
      </header>

      {isPending && <Skeleton className="h-32 w-full" />}
      {isError && <p className="text-sm text-red-600">{(error as Error).message}</p>}
      {data && data.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>아직 컬렉션이 없어요</CardTitle>
            <CardDescription>
              백엔드의 <code>curated-videos.yml</code>을 채우면 첫 컬렉션이 만들어집니다.
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
                  영상 보기 →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
