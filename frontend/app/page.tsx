"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { healthApi } from "@/lib/api/health";

export default function HomePage() {
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.get(),
    refetchInterval: 30_000,
  });

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">TubeShadow</h1>
        <p className="text-muted-foreground">
          YouTube 영상에서 직접 클립을 따다가, 본인 라이브러리에 모으고, 자동 복습하면서 AI 설명까지.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>백엔드 연결 상태</CardTitle>
          <CardDescription>API 서버 헬스체크</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          {health.isPending && <span className="text-sm text-muted-foreground">확인 중…</span>}
          {health.isError && (
            <span className="text-sm text-red-600">연결 실패: {(health.error as Error).message}</span>
          )}
          {health.data && (
            <span className="text-sm">
              상태: <strong className="font-medium text-green-600">{health.data.status}</strong>
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => health.refetch()}>
            새로고침
          </Button>
        </CardContent>
      </Card>

      <nav className="flex flex-wrap gap-3">
        <Link href="/signup" className={buttonVariants()}>회원가입</Link>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>로그인</Link>
        <Link href="/library" className={buttonVariants({ variant: "secondary" })}>라이브러리</Link>
      </nav>
    </main>
  );
}
