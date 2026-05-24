"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
        세션 확인 중…
      </main>
    );
  }

  const handleLogout = () => {
    clear();
    toast.success("로그아웃되었습니다");
    router.replace("/login");
  };

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <nav className="flex flex-1 items-center gap-2 overflow-x-auto text-sm sm:gap-4">
            <Link href="/library" className="shrink-0 font-semibold tracking-tight">TubeShadow</Link>
            <NavLink href="/library" active={pathname?.startsWith("/library")}>라이브러리</NavLink>
            <NavLink href="/review" active={pathname?.startsWith("/review")}>복습</NavLink>
            <NavLink href="/import" active={pathname?.startsWith("/import")}>임포트</NavLink>
            <NavLink href="/discover" active={pathname?.startsWith("/discover")}>둘러보기</NavLink>
          </nav>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/settings"
              className="hidden truncate sm:inline max-w-[140px] hover:text-foreground hover:underline"
            >
              {user?.displayName ?? user?.email}
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>로그아웃</Button>
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
