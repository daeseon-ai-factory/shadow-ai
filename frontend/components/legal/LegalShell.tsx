"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSelector } from "@/components/LocaleSelector";

type LegalShellProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

/**
 * Public, auth-free wrapper for the Terms / Privacy pages. Content is English-primary
 * (the audience and the legal jurisdiction are North American); the chrome is localized.
 */
export function LegalShell({ title, lastUpdated, children }: LegalShellProps) {
  const t = useTranslations("legal");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            ← {t("backHome")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {t("lastUpdated")}: {lastUpdated}
          </p>
        </div>
        <LocaleSelector />
      </header>

      <p className="rounded-md border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-700/50 dark:bg-amber-950/40 dark:text-amber-200">
        {t("templateNote")}
      </p>

      <article className="prose-sm space-y-5 text-sm leading-relaxed text-foreground/90 [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_a]:underline">
        {children}
      </article>

      <footer className="mt-6 flex gap-4 border-t pt-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:underline">{t("terms")}</Link>
        <Link href="/privacy" className="hover:underline">{t("privacy")}</Link>
      </footer>
    </main>
  );
}
