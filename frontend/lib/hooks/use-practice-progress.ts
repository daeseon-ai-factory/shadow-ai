"use client";

import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { practiceApi, type PracticeProgress } from "@/lib/api/practice";

// The daily drill streak/reps, now persisted on the account (was browser localStorage). Patterns
// and collocations share one streak: any drill rep today counts as practicing. Reps update
// optimistically so the UI is instant; the server response is the source of truth.

function localToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const empty = (date: string): PracticeProgress => ({ date, reps: 0, streak: 0, longestStreak: 0, totalReps: 0 });

export function usePracticeProgress() {
  const qc = useQueryClient();
  const today = localToday();
  const key = ["practice", "progress", today] as const;

  const { data } = useQuery({
    queryKey: key,
    queryFn: () => practiceApi.progress(today),
    staleTime: 60_000,
  });

  const mutation = useMutation({
    mutationFn: () => practiceApi.rep(today),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: key });
      const prev = qc.getQueryData<PracticeProgress>(key);
      qc.setQueryData<PracticeProgress>(key, (old) => {
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
      if (ctx?.prev) qc.setQueryData(key, ctx.prev);
    },
    onSuccess: (server) => {
      qc.setQueryData(key, server);
    },
  });

  const bumpRep = useCallback(() => mutation.mutate(), [mutation]);

  return { daily: data ?? empty(today), bumpRep };
}
