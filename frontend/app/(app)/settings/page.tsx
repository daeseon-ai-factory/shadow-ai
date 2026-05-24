"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";
import { ApiError } from "@/lib/api/client";

export default function SettingsPage() {
  const setSession = useAuthStore((s) => s.setSession);
  const token = useAuthStore((s) => s.token);

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
      toast.success("프로필이 업데이트되었습니다");
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : "업데이트 실패"),
  });

  const passwordMutation = useMutation({
    mutationFn: () => authApi.changePassword({ currentPassword, newPassword }),
    onSuccess: () => {
      toast.success("비밀번호가 변경되었습니다");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (e) => toast.error(e instanceof ApiError ? e.message : "변경 실패"),
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">설정</h1>
        <p className="text-sm text-muted-foreground">프로필과 비밀번호를 관리하세요.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>프로필</CardTitle>
          <CardDescription>이메일은 변경할 수 없습니다.</CardDescription>
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
              <Label>이메일</Label>
              <Input value={me?.email ?? ""} disabled readOnly />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="displayName">이름</Label>
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
              {profileMutation.isPending ? "저장 중…" : "프로필 저장"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
          <CardDescription>최소 8자 이상.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (newPassword !== confirmPassword) {
                toast.error("새 비밀번호 확인이 일치하지 않습니다");
                return;
              }
              passwordMutation.mutate();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="current">현재 비밀번호</Label>
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
              <Label htmlFor="new">새 비밀번호</Label>
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
              <Label htmlFor="confirm">새 비밀번호 확인</Label>
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
              {passwordMutation.isPending ? "변경 중…" : "비밀번호 변경"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
