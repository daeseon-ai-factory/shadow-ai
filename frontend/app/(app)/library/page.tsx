"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">라이브러리</h1>
        <p className="text-sm text-muted-foreground">아직 저장한 클립이 없어요. 영상을 임포트해 첫 클립을 만들어보세요.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>시작하기</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link href="/import" className={buttonVariants()}>YouTube 영상 임포트</Link>
          <Link href="/discover" className={buttonVariants({ variant: "outline" })}>추천 영상 둘러보기</Link>
        </CardContent>
      </Card>
    </div>
  );
}
