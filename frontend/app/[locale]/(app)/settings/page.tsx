"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { ApiError } from "@/lib/api/client";
import { Link, useRouter } from "@/i18n/navigation";

export default function SettingsPage() {
  const t = useTranslations("settings");
  const tLegal = useTranslations("legal");
  const setSession = useAuthStore((s) => s.setSession);
  const clear = useAuthStore((s) => s.clear);
  const token = useAuthStore((s) => s.token);
  const router = useRouter();
  const [deletePassword, setDeletePassword] = useState("");

  const deleteMutation = useMutation({
    mutationFn: () => authApi.deleteAccount(deletePassword),
    onSuccess: () => {
      clear();
      router.push("/");
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t("deleteFailed")),
  });

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
  });

  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (me?.displayName && displayName === "") setDisplayName(me.displayName);
  }, [me?.displayName, displayName]);

  const profileMutation = useMutation({
    mutationFn: (name: string) => authApi.updateProfile({ displayName: name }),
    onSuccess: (resp) => {
      if (token) setSession(token, resp.user);
      toast.success(t("profileSaved"));
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t("profileFailed")),
  });

  const passwordMutation = useMutation({
    mutationFn: () => authApi.changePassword({ currentPassword, newPassword }),
    onSuccess: () => {
      toast.success(t("passwordChanged"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : t("passwordFailed")),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>{t("planTitle")}</CardTitle>
          <CardDescription>{t("planSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <span
            className={
              me?.plan === "pro"
                ? "inline-flex items-center rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
                : "inline-flex items-center rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
            }
          >
            {me?.plan === "pro" ? t("planPro") : t("planFree")}
          </span>
          {me?.plan === "pro" && me?.planValidUntil && (
            <span className="text-sm text-muted-foreground">
              {t("planValidUntilLabel")}: {new Date(me.planValidUntil).toLocaleDateString()}
            </span>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("profileTitle")}</CardTitle>
          <CardDescription>{t("profileSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              profileMutation.mutate(displayName);
            }}
          >
            <div className="flex flex-col gap-2">
              <Label>{t("email")}</Label>
              <Input value={me?.email ?? ""} disabled readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="displayName">{t("name")}</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={80}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={profileMutation.isPending || displayName.trim() === me?.displayName?.trim()}
              className="self-start"
            >
              {profileMutation.isPending ? t("profileSaving") : t("profileSave")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("passwordTitle")}</CardTitle>
          <CardDescription>{t("passwordSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (newPassword !== confirmPassword) {
                toast.error(t("passwordMismatch"));
                return;
              }
              passwordMutation.mutate();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="current">{t("currentPassword")}</Label>
              <Input
                id="current"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="new">{t("newPassword")}</Label>
              <Input
                id="new"
                type="password"
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm">{t("confirmPassword")}</Label>
              <Input
                id="confirm"
                type="password"
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={passwordMutation.isPending || !currentPassword || !newPassword || newPassword.length < 8}
              className="self-start"
            >
              {passwordMutation.isPending ? t("passwordChanging") : t("passwordChange")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-red-300/60 dark:border-red-800/50">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">{t("deleteTitle")}</CardTitle>
          <CardDescription>{t("deleteSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (window.confirm(t("deleteWarning"))) deleteMutation.mutate();
            }}
          >
            <p className="text-sm text-muted-foreground">{t("deleteWarning")}</p>
            <div className="flex flex-col gap-2">
              <Label htmlFor="deletePassword">{t("deletePasswordLabel")}</Label>
              <Input
                id="deletePassword"
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <Button
              type="submit"
              variant="destructive"
              disabled={deleteMutation.isPending || !deletePassword}
              className="self-start"
            >
              {deleteMutation.isPending ? t("deleting") : t("deleteButton")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <footer className="flex gap-4 border-t pt-4 text-sm text-muted-foreground">
        <Link href="/terms" className="hover:underline">{tLegal("terms")}</Link>
        <Link href="/privacy" className="hover:underline">{tLegal("privacy")}</Link>
      </footer>
    </div>
  );
}
