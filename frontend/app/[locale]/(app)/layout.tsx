"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { LocaleSelector } from "@/components/LocaleSelector";
import { toast } from "sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);
  const clear = useAuthStore((s) => s.clear);

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/login");
    }
  }, [hydrated, token, router]);

  if (!hydrated || !token) {
    return (
      <main className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        {t("sessionChecking")}
      </main>
    );
  }

  const handleLogout = () => {
    clear();
    toast.success(t("logoutToast"));
    router.replace("/login");
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <nav className="flex flex-1 items-center gap-2 overflow-x-auto text-sm sm:gap-4">
            <Link href="/library" className="shrink-0 font-semibold tracking-tight">{tCommon("appName")}</Link>
            <NavLink href="/library" active={pathname?.startsWith("/library")}>{t("library")}</NavLink>
            <NavLink href="/review" active={pathname?.startsWith("/review")}>{t("review")}</NavLink>
            <NavLink href="/prepositions" active={pathname?.startsWith("/prepositions")}>{t("prepositions")}</NavLink>
            <NavLink href="/patterns" active={pathname?.startsWith("/patterns")}>{t("patterns")}</NavLink>
            <NavLink href="/import" active={pathname?.startsWith("/import")}>{t("import")}</NavLink>
            <NavLink href="/discover" active={pathname?.startsWith("/discover")}>{t("discover")}</NavLink>
          </nav>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/settings"
              className="hidden truncate sm:inline max-w-[140px] hover:text-foreground hover:underline"
            >
              {user?.displayName ?? user?.email}
            </Link>
            <LocaleSelector />
            <Button variant="outline" size="sm" onClick={handleLogout}>{t("logout")}</Button>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</div>
    </div>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-md px-2 py-1 transition-colors ${
        active ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
