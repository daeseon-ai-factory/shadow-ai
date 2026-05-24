"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { videosApi } from "@/lib/api/videos";
import { ApiError } from "@/lib/api/client";

export default function ImportPage() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const video = await videosApi.importByUrl(url.trim());
      toast.success(`'${video.title}' 임포트 완료`);
      router.push(`/video/${video.id}`);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error("임포트 실패");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">YouTube 영상 임포트</h1>
        <p className="text-sm text-muted-foreground">
          자막이 있는 영상이면 곧바로 쉐도잉할 수 있어요. 자막이 없는 영상은 임포트되지만 클립은 자막 없이 저장됩니다.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>URL 입력</CardTitle>
          <CardDescription>https://youtube.com/watch?v=… 또는 https://youtu.be/…</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleImport} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">YouTube URL</Label>
              <Input
                id="url"
                required
                placeholder="https://www.youtube.com/watch?v=…"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={submitting || !url.trim()}>
              {submitting ? "임포트 중…" : "임포트하고 쉐도잉 시작"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
