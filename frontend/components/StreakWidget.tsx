"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reviewApi } from "@/lib/api/review";

export function StreakWidget() {
  const { data, isPending } = useQuery({
    queryKey: ["review", "streak"],
    queryFn: () => reviewApi.streak(),
    refetchInterval: 60_000,
  });

  return (
    <Card className="bg-card/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">오늘의 복습</CardTitle>
        <CardDescription className="text-xs">자세히 → 복습 페이지로</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        <Link href="/review" className="block">
          <div className="text-3xl font-semibold leading-none">
            {isPending ? "—" : data?.dueToday ?? 0}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">due</div>
        </Link>
        <div>
          <div className="text-3xl font-semibold leading-none">
            {isPending ? "—" : data?.streakDays ?? 0}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">연속 일수</div>
        </div>
      </CardContent>
    </Card>
  );
}
