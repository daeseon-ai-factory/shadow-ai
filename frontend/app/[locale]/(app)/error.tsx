"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("globalError");

  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 py-16 text-center">
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <p className="text-sm text-muted-foreground">{error.message || t("fallback")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
