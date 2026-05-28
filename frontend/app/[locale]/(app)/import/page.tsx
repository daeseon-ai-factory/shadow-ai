"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { videosApi } from "@/lib/api/videos";
import { ApiError } from "@/lib/api/client";

export default function ImportPage() {
  const t = useTranslations("import");
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const video = await videosApi.importByUrl(url.trim());
      toast.success(t("successToast", { title: video.title }));
      router.push(`/video/${video.id}`);
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(t("failedGeneric"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>{t("urlTitle")}</CardTitle>
          <CardDescription>{t("urlSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleImport} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">{t("urlLabel")}</Label>
              <Input
                id="url"
                required
                placeholder={t("urlPlaceholder")}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={submitting || !url.trim()}>
              {submitting ? t("submitting") : t("submit")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
