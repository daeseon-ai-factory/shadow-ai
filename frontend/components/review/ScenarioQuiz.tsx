"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analysisApi } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/client";

interface Props {
  clipId: string;
}

/**
 * Quiz Scenario mode — AI-generated real-world situation in Korean. The learner
 * types an English response that uses an expression from the clip, then sees the
 * sample answer. Pure output practice; SRS buttons live in the parent ReviewCard.
 */
export function ScenarioQuiz({ clipId }: Props) {
  const t = useTranslations("review");

  const { data: analysis, isPending } = useQuery({
    queryKey: ["analysis", clipId],
    queryFn: () => analysisApi.get(clipId),
    retry: (count, e) => {
      if (e instanceof ApiError && e.status === 404) return false;
      return count < 2;
    },
  });

  // State resets between clips via a key={clipId} on this component in the parent (review page).
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState(false);

  if (isPending) {
    return <p className="text-sm text-muted-foreground">{t("title")}…</p>;
  }

  const scenario = analysis?.practiceScenario;
  if (!scenario) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground" data-testid="scenario-empty">
        {t("scenarioNo")}
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="scenario-quiz">
      <div className="rounded-md bg-muted/40 p-4">
        <p className="text-base leading-relaxed">{scenario.situation}</p>
        {scenario.koreanHint && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium">💡 {t("scenarioHint")}:</span> {scenario.koreanHint}
          </p>
        )}
      </div>

      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={3}
        placeholder={t("scenarioPlaceholder")}
        disabled={checked}
        data-testid="scenario-input"
      />

      {!checked ? (
        <Button onClick={() => setChecked(true)} disabled={draft.trim().length === 0} data-testid="scenario-check">
          {t("scenarioCheck")}
        </Button>
      ) : (
        <div className="space-y-3 rounded-md border p-3">
          <section>
            <h4 className="mb-1 text-xs uppercase text-muted-foreground">{t("scenarioYourAnswer")}</h4>
            <p className="text-base leading-relaxed">{draft.trim()}</p>
          </section>
          <section data-testid="scenario-sample">
            <h4 className="mb-1 text-xs uppercase text-muted-foreground">{t("scenarioSample")}</h4>
            <p className="text-base leading-relaxed font-medium">{scenario.sampleResponse}</p>
          </section>
        </div>
      )}
    </div>
  );
}
