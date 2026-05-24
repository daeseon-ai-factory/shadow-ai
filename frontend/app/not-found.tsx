import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold">404</h1>
      <p className="text-sm text-muted-foreground">찾으시는 페이지가 없습니다.</p>
      <Link href="/library" className={buttonVariants({ variant: "outline" })}>홈으로</Link>
    </main>
  );
}
