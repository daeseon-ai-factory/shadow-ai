// Tiny localStorage tracker for the daily pattern drill: today's reps + a day streak.
// "every day" only sticks if you can see the streak, so we count reps and bump the streak
// on the first rep of each new day (continuing it if you practiced yesterday).

const KEY = "tubeshadow.patternDaily";

export interface Daily {
  date: string; // YYYY-MM-DD (local)
  reps: number; // reps done today
  streak: number; // consecutive days practiced
}

function dayStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function read(): Daily | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Daily) : null;
  } catch {
    return null;
  }
}

/** Read-only view for display (does not change the streak). */
export function getDaily(): Daily {
  const today = dayStr(new Date());
  const s = read();
  if (!s) return { date: today, reps: 0, streak: 0 };
  if (s.date === today) return s;
  return { date: today, reps: 0, streak: s.streak };
}

/** Record one rep; advances the streak on the first rep of a new day. */
export function bumpRep(): Daily {
  const now = new Date();
  const today = dayStr(now);
  const yesterday = dayStr(new Date(now.getTime() - 86_400_000));
  const s = read();

  let next: Daily;
  if (s && s.date === today) {
    next = { ...s, reps: s.reps + 1 };
  } else {
    const continued = !!s && s.date === yesterday;
    next = { date: today, reps: 1, streak: continued ? s!.streak + 1 : 1 };
  }
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
