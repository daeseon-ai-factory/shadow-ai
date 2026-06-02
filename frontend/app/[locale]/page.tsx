"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { LocaleSelector } from "@/components/LocaleSelector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { healthApi } from "@/lib/api/health";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const tLegal = useTranslations("legal");
  const health = useQuery({
    queryKey: ["health"],
    queryFn: () => healthApi.get(),
    refetchInterval: 30_000,
  });

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{tCommon("appName")}</h1>
          <p className="text-muted-foreground">{t("tagline")}</p>
        </div>
        <LocaleSelector />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("health.title")}</CardTitle>
          <CardDescription>{t("health.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          {health.isPending && <span className="text-sm text-muted-foreground">{t("health.loading")}</span>}
          {health.isError && (
            <span className="text-sm text-red-600">
              {t("health.failed", { message: (health.error as Error).message })}
            </span>
          )}
          {health.data && (
            <span className="text-sm">
              {t("health.status")}: <strong className="font-medium text-green-600">{health.data.status}</strong>
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => health.refetch()}>
            {tCommon("refresh")}
          </Button>
        </CardContent>
      </Card>

      <nav className="flex flex-wrap gap-3">
        <Link href="/signup" className={buttonVariants()}>{t("actions.signup")}</Link>
        <Link href="/login" className={buttonVariants({ variant: "outline" })}>{t("actions.login")}</Link>
        <Link href="/library" className={buttonVariants({ variant: "secondary" })}>{t("actions.library")}</Link>
      </nav>

      <footer className="mt-auto flex gap-4 border-t pt-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:underline">{tLegal("terms")}</Link>
        <Link href="/privacy" className="hover:underline">{tLegal("privacy")}</Link>
      </footer>
    </main>
  );
}
