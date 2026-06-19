"use client";

import { useEffect, useState, type ReactNode } from "react";
import { GROUPS, GLOSSARY, type Drill, type Topic } from "@/lib/learn-content";

// 비공개: 학습 노트라 강한 보안은 아님(번들에 노출 가능) — 캐주얼 차단 + 검색 제외 용도.
// 진짜 비번은 Vercel 환경변수 NEXT_PUBLIC_LEARN_PASS로. 미설정 시 "mimi".
const PASS = process.env.NEXT_PUBLIC_LEARN_PASS ?? "mimi";

export default function LearnPage() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [bad, setBad] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("learn_ok") === "1") setAuthed(true);
    try {
      setDone(JSON.parse(localStorage.getItem("learn_done") || "{}"));
    } catch {}
  }, []);

  const submit = () => {
    if (input === PASS) {
      localStorage.setItem("learn_ok", "1");
      setAuthed(true);
    } else setBad(true);
  };

  const toggleDone = (id: string) => {
    const next = { ...done, [id]: !done[id] };
    setDone(next);
    localStorage.setItem("learn_done", JSON.stringify(next));
  };

  const allTopics = GROUPS.flatMap((g) => g.topics);
  const doneCount = allTopics.filter((t) => done[t.id]).length;
  const pct = Math.round((doneCount / allTopics.length) * 100);

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center gap-4 px-6">
        <div className="text-center">
          <div className="text-4xl">🔒</div>
          <h1 className="mt-2 text-xl font-bold">Mimi 학습 노트</h1>
          <p className="mt-1 text-sm text-muted-foreground">비공개 — 비밀번호</p>
        </div>
        <input
          type="password"
          inputMode="text"
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setBad(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="비밀번호"
          className="w-full rounded-xl border bg-background px-4 py-3 text-center text-base outline-none focus:ring-2"
        />
        {bad && <p className="text-sm text-red-500">틀렸어요</p>}
        <button
          onClick={submit}
          className="w-full rounded-xl bg-primary py-3 font-bold text-primary-foreground active:scale-[0.99]"
        >
          들어가기
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl px-4 pb-24 pt-4">
      {/* 진도 헤더 (sticky) */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b bg-background/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">📚 Mimi 학습 노트</h1>
          <span className="text-sm tabular-nums text-muted-foreground">
            {doneCount}/{allTopics.length}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <p className="mb-5 rounded-xl bg-muted/50 p-3 text-sm leading-relaxed text-muted-foreground">
        목표 = <b>면접에서 영어로 방어 가능</b>. 각 토픽: <b>뭐냐 → 왜 → 트레이드오프 → 용어 → 🎤 면접 질문</b>.
        면접은 <b>영어로 설명</b>하는 거니까 — 질문 보면 <b>답 펴기 전에 영어로 소리 내서</b> 답해봐.
        펴면 나오는 <b>“🇬🇧 In the interview, say:”</b> 가 실제로 말할 문장(한글은 ↳로 이해용). 외운 건 ✓.
      </p>

      {GROUPS.map((g) => (
        <section key={g.id} className="mb-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            {g.label}
          </h2>
          <div className="flex flex-col gap-2">
            {g.topics.map((t) => (
              <TopicCard
                key={t.id}
                topic={t}
                open={open === t.id}
                done={!!done[t.id]}
                onToggle={() => setOpen(open === t.id ? null : t.id)}
                onDone={() => toggleDone(t.id)}
              />
            ))}
          </div>
        </section>
      ))}

      {/* 용어 사전 */}
      <section className="mb-6">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          📎 한눈 용어 사전
        </h2>
        <div className="rounded-xl border divide-y">
          {GLOSSARY.map((x) => (
            <div key={x.term} className="flex gap-3 px-3 py-2 text-sm">
              <span className="min-w-[7rem] shrink-0 font-semibold">{x.term}</span>
              <span className="text-muted-foreground">{x.def}</span>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        방어 안 되는 건 했다고 말하지 마 — 거기만 정직하면 이 포폴은 무기다.
      </p>
    </main>
  );
}

function TopicCard({
  topic,
  open,
  done,
  onToggle,
  onDone,
}: {
  topic: Topic;
  open: boolean;
  done: boolean;
  onToggle: () => void;
  onDone: () => void;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border ${done ? "bg-primary/5" : "bg-card"}`}>
      <button onClick={onToggle} className="flex w-full items-center gap-3 px-4 py-3 text-left">
        <span className="text-2xl">{topic.emoji}</span>
        <span className="flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {topic.tag}
          </span>
          <span className="block font-bold">{topic.title}</span>
        </span>
        {done && <span className="text-primary">✓</span>}
        <span className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="space-y-4 border-t px-4 py-4 text-[15px] leading-relaxed">
          <Field label="이게 뭐냐" body={topic.what} />
          <Field label="왜 썼나" body={topic.why} />
          <Field label="대안 & 트레이드오프" body={topic.tradeoff} />

          {topic.terms && topic.terms.length > 0 && (
            <div>
              <Label>용어</Label>
              <div className="mt-1 space-y-1">
                {topic.terms.map((x) => (
                  <p key={x.term} className="text-sm">
                    <b>{x.term}</b> — <span className="text-muted-foreground">{x.def}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {topic.files && topic.files.length > 0 && (
            <div>
              <Label>우리 코드</Label>
              <ul className="mt-1 space-y-0.5">
                {topic.files.map((f) => (
                  <li key={f} className="break-all font-mono text-xs text-muted-foreground">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.drills && topic.drills.length > 0 && (
            <div>
              <Label>🎤 면접 질문 (답 보기 전에 말해봐)</Label>
              <div className="mt-2 flex flex-col gap-2">
                {topic.drills.map((d, i) => (
                  <DrillCard key={i} drill={d} />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onDone}
            className={`w-full rounded-lg py-2.5 text-sm font-bold ${
              done ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
            }`}
          >
            {done ? "✓ 외웠음 (취소)" : "외웠음 체크"}
          </button>
        </div>
      )}
    </div>
  );
}

function DrillCard({ drill }: { drill: Drill }) {
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="font-semibold leading-snug">🎤 {drill.qEn}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{drill.q}</p>
      {show ? (
        <div className="mt-2 space-y-2">
          <div className="rounded-md bg-primary/10 p-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              🇬🇧 In the interview, say:
            </span>
            <p className="mt-1 text-sm leading-relaxed">{drill.aEn}</p>
          </div>
          <p className="px-1 text-xs leading-relaxed text-muted-foreground">↳ {drill.a}</p>
        </div>
      ) : (
        <button
          onClick={() => setShow(true)}
          className="mt-2 text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          답 보기 (먼저 영어로 말해봐) →
        </button>
      )}
    </div>
  );
}

function Field({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <p className="mt-1">{body}</p>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
      {children}
    </span>
  );
}
