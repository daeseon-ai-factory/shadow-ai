"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">문제가 발생했어요</h1>
      <p className="text-sm text-muted-foreground">
        {error.message || "알 수 없는 오류가 발생했습니다."}
        {error.digest && <span className="block text-xs opacity-50 mt-1">trace: {error.digest}</span>}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={reset}>다시 시도</Button>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>라이브러리로</Link>
      </div>
    </main>
  );
}
