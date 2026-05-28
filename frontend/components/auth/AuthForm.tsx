"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
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
  const t = useTranslations("auth");
  const tCommon = useTranslations("common");
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
      toast.success(isSignup ? t("signupSuccess") : t("loginSuccess"));
      router.push("/library");
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(tCommon("unknownError"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md py-16">
      <Card>
        <CardHeader>
          <CardTitle>{isSignup ? t("signupTitle") : t("loginTitle")}</CardTitle>
          <CardDescription>
            {isSignup ? t("signupDescription") : t("loginDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {isSignup && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="displayName">{t("name")}</Label>
                <Input
                  id="displayName"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  maxLength={80}
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("email")}</Label>
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
              <Label htmlFor="password">{t("password")}</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("passwordPlaceholder")}
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? tCommon("processing") : isSignup ? t("submitSignup") : t("submitLogin")}
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              {isSignup ? (
                <>
                  {t("haveAccount")}{" "}
                  <Link href="/login" className="font-medium text-foreground underline">
                    {t("submitLogin")}
                  </Link>
                </>
              ) : (
                <>
                  {t("noAccount")}{" "}
                  <Link href="/signup" className="font-medium text-foreground underline">
                    {t("submitSignup")}
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
