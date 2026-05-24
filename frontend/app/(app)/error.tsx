"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 py-16 text-center">
      <h2 className="text-xl font-semibold">이 페이지를 불러오는 중 오류</h2>
      <p className="text-sm text-muted-foreground">{error.message || "잠시 후 다시 시도해주세요."}</p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
