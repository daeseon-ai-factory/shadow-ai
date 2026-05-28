"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";

export function LocaleSelector({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (next: string) => {
    startTransition(() => {
      // next-intl's wrapped router carries the path; just pass a new locale.
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <select
      className={`rounded-md border bg-background px-2 py-1 text-xs ${className ?? ""}`}
      value={locale}
      onChange={(e) => onChange(e.target.value)}
      disabled={pending}
      aria-label={t("label")}
    >
      {routing.locales.map((loc) => (
        <option key={loc} value={loc}>
          {t(loc)}
        </option>
      ))}
    </select>
  );
}
