"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { videosApi } from "@/lib/api/videos";
import { ApiError } from "@/lib/api/client";
import { parsePastedTranscript } from "@/lib/transcript-parser";

export default function ImportPage() {
  const t = useTranslations("import");
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const parsedSegments = useMemo(
    () => parsePastedTranscript(transcriptText),
    [transcriptText],
  );

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const hasManualTranscript = transcriptText.trim().length > 0;
      if (hasManualTranscript && parsedSegments.length === 0) {
        toast.error(t("manualParseFailed"));
        return;
      }
      const video = await videosApi.importByUrl(
        url.trim(),
        hasManualTranscript ? { transcriptSegments: parsedSegments } : undefined,
      );
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="transcript">{t("manualLabel")}</Label>
              <Textarea
                id="transcript"
                className="min-h-44 resize-y font-mono text-xs leading-relaxed"
                placeholder={t("manualPlaceholder")}
                value={transcriptText}
                onChange={(e) => setTranscriptText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                {transcriptText.trim()
                  ? t("manualParsed", { count: parsedSegments.length })
                  : t("manualHint")}
              </p>
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
