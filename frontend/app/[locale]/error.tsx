"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("globalError");
  const tCommon = useTranslations("common");

  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <p className="text-sm text-muted-foreground">
        {error.message || tCommon("unknownError")}
        {error.digest && <span className="block text-xs opacity-50 mt-1">trace: {error.digest}</span>}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={reset}>{t("retry")}</Button>
        <Link href="/library" className={buttonVariants({ variant: "outline" })}>{t("toLibrary")}</Link>
      </div>
    </main>
  );
}
