import { describe, it, expect } from "vitest";
import { partition, buildSession, localToday, shuffle, NEW_PER_DAY } from "@/lib/practice-srs";
import type { SrsCard } from "@/lib/api/practice";

const card = (cardKey: string, dueDate: string, box = 1): SrsCard => ({
  cardKey,
  box,
  dueDate,
  correctCount: 0,
  lapseCount: 0,
});

describe("partition", () => {
  it("splits into due (has state, dueDate <= today) and fresh (no state); seen-but-future is neither", () => {
    const all = [{ key: "a" }, { key: "b" }, { key: "c" }];
    const states = [card("a", "2026-05-31"), card("b", "2026-06-10")];
    const { due, fresh } = partition(all, states, "2026-05-31");
    expect(due.map((x) => x.key)).toEqual(["a"]);
    expect(fresh.map((x) => x.key)).toEqual(["c"]);
  });

  it("counts a card due in the past as due", () => {
    const { due } = partition([{ key: "a" }], [card("a", "2026-05-01")], "2026-05-31");
    expect(due.map((x) => x.key)).toEqual(["a"]);
  });
});

describe("buildSession", () => {
  it("includes all due cards plus the new ones, due first", () => {
    const all = [{ key: "a" }, { key: "b" }, { key: "c" }]; // a,b due; c new
    const states = [card("a", "2026-05-31"), card("b", "2026-05-31")];
    const session = buildSession(all, states, "2026-05-31");

    expect(session).toHaveLength(3);
    expect(session.map((x) => x.key).sort()).toEqual(["a", "b", "c"]);
    // the first `due.length` items are the due cards; the new card trails
    expect(["a", "b"]).toContain(session[0].key);
    expect(["a", "b"]).toContain(session[1].key);
    expect(session[2].key).toBe("c");
  });

  it("caps new cards at NEW_PER_DAY", () => {
    const all = Array.from({ length: NEW_PER_DAY + 18 }, (_, i) => ({ key: `n${i}` }));
    expect(buildSession(all, [], "2026-05-31")).toHaveLength(NEW_PER_DAY);
  });
});

describe("localToday", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(localToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("shuffle", () => {
  it("returns the same multiset", () => {
    expect([...shuffle([1, 2, 3, 4, 5])].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not mutate its input", () => {
    const a = [1, 2, 3];
    shuffle(a);
    expect(a).toEqual([1, 2, 3]);
  });
});
