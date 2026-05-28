"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analysisApi } from "@/lib/api/analysis";
import { ApiError } from "@/lib/api/client";

interface Props {
  clipId: string;
  originalEnglish: string | null;
  onChecked?: () => void;
}

/**
 * Quiz Write mode — show the Korean (natural sentence or chunked 직독직해)
 * and let the learner type the English. After "Check", reveal the original
 * with word-level diff highlighting against their answer.
 *
 * SRS state is owned by the parent (Again/Hard/Good/Easy buttons live in ReviewCard).
 */
export function WriteQuiz({ clipId, originalEnglish, onChecked }: Props) {
  const t = useTranslations("review");

  const { data: analysis, isPending } = useQuery({
    queryKey: ["analysis", clipId],
    queryFn: () => analysisApi.get(clipId),
    retry: (count, e) => {
      if (e instanceof ApiError && e.status === 404) return false;
      return count < 2;
    },
  });

  const [showChunked, setShowChunked] = useState(false);
  const [draft, setDraft] = useState("");
  const [checked, setChecked] = useState(false);

  // Reset between clips
  useEffect(() => {
    setDraft("");
    setChecked(false);
    setShowChunked(false);
  }, [clipId]);

  if (isPending) {
    return <p className="text-sm text-muted-foreground">{t("title")}…</p>;
  }

  const primaryTranslation = analysis?.primaryTranslation ?? null;
  const chunked = analysis?.chunkedTranslation ?? [];

  if (!primaryTranslation && chunked.length === 0) {
    return (
      <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
        {t("writeNoTranslation")}
      </div>
    );
  }

  const handleCheck = () => {
    setChecked(true);
    onChecked?.();
  };

  return (
    <div className="space-y-3">
      {/* Korean prompt — toggle natural vs chunked */}
      <div className="rounded-md bg-muted/40 p-4">
        {!showChunked && primaryTranslation && (
          <p className="text-lg font-medium leading-relaxed">{primaryTranslation}</p>
        )}
        {showChunked && chunked.length > 0 && (
          <ul className="space-y-2">
            {chunked.map((c, i) => (
              <li key={i} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-base font-medium text-foreground/40">
                  {/* hidden until reveal, just a placeholder for the row width */}
                  {checked ? c.en : "▮▮▮▮"}
                </span>
                <span className="text-base">— {c.ko}</span>
              </li>
            ))}
          </ul>
        )}
        {chunked.length > 0 && (
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setShowChunked((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground"
              data-testid="chunked-toggle"
            >
              {showChunked ? `← ${t("modeReveal")}` : `${t("writeChunkedToggle")} →`}
            </button>
          </div>
        )}
      </div>

      {/* Typing area */}
      <Textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={3}
        placeholder={t("writePlaceholder")}
        disabled={checked}
        data-testid="write-input"
      />

      {/* Check button or diff result */}
      {!checked ? (
        <Button onClick={handleCheck} disabled={draft.trim().length === 0} data-testid="write-check">
          {t("writeCheck")}
        </Button>
      ) : (
        <DiffBlock
          yourAnswer={draft.trim()}
          expected={originalEnglish ?? ""}
          yourLabel={t("writeYourAnswer")}
          expectedLabel={t("writeExpected")}
        />
      )}
    </div>
  );
}

function DiffBlock({
  yourAnswer, expected, yourLabel, expectedLabel,
}: { yourAnswer: string; expected: string; yourLabel: string; expectedLabel: string }) {
  // Token-level diff. Marks tokens the learner missed (in expected, not in answer)
  // and extras (in answer, not in expected) — case-insensitive, punctuation-stripped.
  const norm = (s: string) =>
    s.toLowerCase().replace(/[.,!?;:"']/g, "").split(/\s+/).filter(Boolean);
  const yourTokens = norm(yourAnswer);
  const expectedTokens = expected.split(/\s+/).filter(Boolean);
  const expectedNorm = norm(expected);

  return (
    <div className="space-y-3 rounded-md border p-3">
      <section data-testid="diff-your">
        <h4 className="mb-1 text-xs uppercase text-muted-foreground">{yourLabel}</h4>
        <p className="text-base leading-relaxed">
          {yourAnswer.split(/\s+/).filter(Boolean).map((tok, i) => {
            const stripped = tok.toLowerCase().replace(/[.,!?;:"']/g, "");
            const matched = expectedNorm.includes(stripped);
            return (
              <span
                key={i}
                className={matched ? "" : "rounded bg-red-500/20 px-1"}
              >
                {tok}{" "}
              </span>
            );
          })}
        </p>
      </section>
      <section data-testid="diff-expected">
        <h4 className="mb-1 text-xs uppercase text-muted-foreground">{expectedLabel}</h4>
        <p className="text-base leading-relaxed">
          {expectedTokens.map((tok, i) => {
            const stripped = tok.toLowerCase().replace(/[.,!?;:"']/g, "");
            const matched = yourTokens.includes(stripped);
            return (
              <span
                key={i}
                className={matched ? "font-medium" : "rounded bg-emerald-500/20 px-1 font-medium"}
              >
                {tok}{" "}
              </span>
            );
          })}
        </p>
      </section>
    </div>
  );
}
