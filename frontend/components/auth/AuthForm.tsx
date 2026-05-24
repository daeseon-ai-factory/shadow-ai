"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/client";
import { useAuthStore } from "@/lib/stores/auth-store";

type Mode = "signup" | "login";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isSignup = mode === "signup";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = isSignup
        ? await authApi.signup({ email, password, displayName })
        : await authApi.login({ email, password });
      setSession(response.accessToken, response.user);
      toast.success(isSignup ? "회원가입 완료" : "환영합니다");
      router.push("/library");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("알 수 없는 오류가 발생했습니다");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-16">
      <Card>
        <CardHeader>
          <CardTitle>{isSignup ? "회원가입" : "로그인"}</CardTitle>
          <CardDescription>TubeShadow에 {isSignup ? "가입" : "로그인"}하고 클립을 모으세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="displayName">이름</Label>
                <Input
                  id="displayName"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="홍길동"
                  maxLength={80}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="최소 8자"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "처리 중…" : isSignup ? "회원가입" : "로그인"}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isSignup ? (
                <>
                  이미 계정이 있나요?{" "}
                  <Link href="/login" className="font-medium text-foreground underline">
                    로그인
                  </Link>
                </>
              ) : (
                <>
                  아직 계정이 없나요?{" "}
                  <Link href="/signup" className="font-medium text-foreground underline">
                    회원가입
                  </Link>
                </>
              )}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
