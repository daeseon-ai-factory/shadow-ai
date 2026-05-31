"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { practiceApi } from "@/lib/api/practice";
import { ApiError } from "@/lib/api/client";
import { speak, canSpeak } from "@/lib/speak";

// Remount (via a `key` on the target) to reset between targets — no internal reset needed.
export function ComposeCheck({ target, gloss }: { target: string; gloss: string }) {
  const t = useTranslations("compose");
  const [text, setText] = useState("");
  const mutation = useMutation({
    mutationFn: () => practiceApi.composeCheck(target, gloss, text.trim()),
  });

  const fb = mutation.data;
  const notConfigured = mutation.error instanceof ApiError && mutation.error.code === "AI_NOT_CONFIGURED";

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t("placeholder")}
        rows={3}
        className="w-full resize-none rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <Button
        className="w-full"
        disabled={!text.trim() || mutation.isPending}
        onClick={() => mutation.mutate()}
      >
        {mutation.isPending ? t("checking") : t("check")}
      </Button>

      {notConfigured && <p className="text-sm text-amber-600 dark:text-amber-500">{t("notConfigured")}</p>}
      {mutation.isError && !notConfigured && <p className="text-sm text-destructive">{t("error")}</p>}

      {fb && (
        <div
          className={`space-y-2 rounded-md border p-3 ${
            fb.ok ? "border-emerald-500/40 bg-emerald-500/5" : "border-amber-500/40 bg-amber-500/5"
          }`}
        >
          <div className="text-sm font-medium">
            {fb.ok ? `✅ ${t("ok")}` : `✏️ ${t("needsWork")}`}
            {!fb.usesTarget && <span className="text-muted-foreground"> · {t("usesTargetNo")}</span>}
          </div>
          {fb.feedback && <p className="text-sm text-muted-foreground">{fb.feedback}</p>}
          {fb.better && (
            <p className="flex items-center gap-1.5 font-mono text-sm">
              <span className="text-xs text-muted-foreground">{t("betterLabel")}</span>
              {fb.better}
              {canSpeak() && (
                <button
                  type="button"
                  aria-label={t("listen")}
                  onClick={() => speak(fb.better)}
                  className="shrink-0 text-muted-foreground hover:text-foreground"
                >
                  🔊
                </button>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
