"use client";

import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { practiceApi, type PracticeProgress, type SrsCard } from "@/lib/api/practice";
import { localToday } from "@/lib/practice-srs";

// The daily drill streak + spaced-repetition, persisted on the account (was browser localStorage).
// Patterns and collocations share one streak: any drill rep today counts. Grading a card both
// advances its SRS box (server-side Leitner) and records the rep — so the streak comes back in
// the same response. Reps update optimistically; the server response is the source of truth.

const empty = (date: string): PracticeProgress => ({ date, reps: 0, streak: 0, longestStreak: 0, totalReps: 0 });

export function usePracticeProgress() {
  const qc = useQueryClient();
  const today = localToday();
  const progressKey = ["practice", "progress", today] as const;

  const { data } = useQuery({
    queryKey: progressKey,
    queryFn: () => practiceApi.progress(today),
    staleTime: 60_000,
  });

  const mutation = useMutation({
    mutationFn: ({ cardKey, correct }: { cardKey: string; correct: boolean }) =>
      practiceApi.grade(cardKey, correct, today),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: progressKey });
      const prev = qc.getQueryData<PracticeProgress>(progressKey);
      qc.setQueryData<PracticeProgress>(progressKey, (old) => {
        const base = old ?? empty(today);
        return {
          ...base,
          reps: base.reps + 1,
          totalReps: base.totalReps + 1,
          streak: base.streak === 0 ? 1 : base.streak, // first rep today lights the streak
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(progressKey, ctx.prev);
    },
    onSuccess: (result) => {
      qc.setQueryData(progressKey, result.progress);
      qc.invalidateQueries({ queryKey: ["practice", "srs"] }); // due/new counts shift after a grade
    },
  });

  // grade(cardKey, correct): correct = recalled (promote), false = missed (demote). Both count as a rep.
  const grade = useCallback(
    (cardKey: string, correct: boolean) => mutation.mutate({ cardKey, correct }),
    [mutation],
  );

  return { daily: data ?? empty(today), grade };
}

/** All of the user's SRS card states — used by the drill pages to size the day's session. */
export function usePracticeSrsStates(): SrsCard[] {
  const { data } = useQuery({
    queryKey: ["practice", "srs"],
    queryFn: () => practiceApi.srsStates(),
    staleTime: 30_000,
  });
  return data ?? [];
}
