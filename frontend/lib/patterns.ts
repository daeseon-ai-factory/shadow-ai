// Curated high-frequency English sentence patterns for daily drilling. These are the frames
// natives use without thinking — you keep the frame fixed and swap the words inside. The drill
// prompts with a short Korean cue (the meaning to express); you produce the English out loud,
// then check against a model. Real, idiomatic patterns — nothing fabricated.

export interface PatternItem {
  cue: string; // Korean meaning to express (the drill prompt)
  model: string; // one natural English sentence using the frame
}

export interface Pattern {
  id: string;
  category: string; // category key (see CATEGORY_LABELS in the page)
  frame: string; // the fixed frame, e.g. "I should have ___"
  gloss: string; // short English note on when to use it
  items: PatternItem[];
}

export const PATTERNS: Pattern[] = [
  // ── Questions ──────────────────────────────────────────────────────────────
  {
    id: "have-you-ever",
    category: "questions",
    frame: "Have you ever ___?",
    gloss: "ask about any time in someone's life so far",
    items: [
      { cue: "도쿄 가본 적 있어?", model: "Have you ever been to Tokyo?" },
      { cue: "Rust 써본 적 있어?", model: "Have you ever used Rust?" },
      { cue: "프로덕션 날려본 적 있어?", model: "Have you ever taken down production?" },
    ],
  },
  {
    id: "what-if",
    category: "questions",
    frame: "What if ___?",
    gloss: "raise a hypothetical or a worry",
    items: [
      { cue: "그게 안 되면 어떡하지?", model: "What if it doesn't work?" },
      { cue: "그가 거절하면 어쩌지?", model: "What if he says no?" },
      { cue: "그냥 다시 시작하면 어떨까?", model: "What if we just start over?" },
    ],
  },
  {
    id: "how-do-i",
    category: "questions",
    frame: "How do I ___?",
    gloss: "ask the way to do something",
    items: [
      { cue: "이거 어떻게 고쳐?", model: "How do I fix this?" },
      { cue: "브랜치 어떻게 되돌려?", model: "How do I revert this branch?" },
      { cue: "여기서 어떻게 나가?", model: "How do I get out of here?" },
    ],
  },
  {
    id: "do-you-mind-if",
    category: "questions",
    frame: "Do you mind if I ___?",
    gloss: "ask politely for permission",
    items: [
      { cue: "창문 좀 열어도 될까요?", model: "Do you mind if I open the window?" },
      { cue: "여기 좀 앉아도 될까요?", model: "Do you mind if I sit here?" },
      { cue: "나중에 다시 연락드려도 될까요?", model: "Do you mind if I get back to you later?" },
    ],
  },
  {
    id: "why-dont-we",
    category: "questions",
    frame: "Why don't we ___?",
    gloss: "suggest doing something together",
    items: [
      { cue: "우리 내일 다시 보는 거 어때?", model: "Why don't we meet again tomorrow?" },
      { cue: "그냥 작은 거부터 시작하는 게 어때?", model: "Why don't we start small?" },
      { cue: "잠깐 쉬는 게 어때?", model: "Why don't we take a break?" },
    ],
  },

  // ── Modals & regret ────────────────────────────────────────────────────────
  {
    id: "should-have",
    category: "modals",
    frame: "I should have ___",
    gloss: "regret — the right thing you didn't do",
    items: [
      { cue: "더 일찍 물어봤어야 했는데.", model: "I should have asked earlier." },
      { cue: "그걸 백업했어야 했는데.", model: "I should have backed that up." },
      { cue: "너 말을 들었어야 했어.", model: "I should have listened to you." },
    ],
  },
  {
    id: "shouldnt-have",
    category: "modals",
    frame: "I shouldn't have ___",
    gloss: "regret — something you did but shouldn't have",
    items: [
      { cue: "금요일에 배포하지 말았어야 했는데.", model: "I shouldn't have deployed on a Friday." },
      { cue: "그렇게 말하지 말았어야 했어.", model: "I shouldn't have said that." },
      { cue: "그렇게 많이 약속하지 말았어야 했어.", model: "I shouldn't have promised so much." },
    ],
  },
  {
    id: "was-going-to",
    category: "modals",
    frame: "I was going to ___",
    gloss: "you intended to, but...",
    items: [
      { cue: "막 너한테 연락하려던 참이었어.", model: "I was just going to text you." },
      { cue: "오늘 끝내려고 했었어.", model: "I was going to finish it today." },
      { cue: "물어보려고 했는데 잊어버렸어.", model: "I was going to ask, but I forgot." },
    ],
  },
  {
    id: "might-want-to",
    category: "modals",
    frame: "You might want to ___",
    gloss: "a soft suggestion / gentle warning",
    items: [
      { cue: "먼저 저장하는 게 좋을 거야.", model: "You might want to save first." },
      { cue: "로그를 확인해 보는 게 좋을걸.", model: "You might want to check the logs." },
      { cue: "지금 떠나는 게 좋을 거야.", model: "You might want to leave now." },
    ],
  },

  // ── Conditionals ───────────────────────────────────────────────────────────
  {
    id: "as-long-as",
    category: "conditionals",
    frame: "As long as ___, ___",
    gloss: "only on this condition / for the whole time that",
    items: [
      { cue: "테스트만 통과하면 머지해도 돼.", model: "As long as the tests pass, you can merge." },
      { cue: "조용히만 하면 있어도 돼.", model: "As long as you're quiet, you can stay." },
      { cue: "노력하는 한 괜찮아.", model: "As long as you try, it's fine." },
    ],
  },
  {
    id: "if-i-were-you",
    category: "conditionals",
    frame: "If I were you, I'd ___",
    gloss: "give advice as if in their shoes",
    items: [
      { cue: "나라면 그냥 다시 시작할 거야.", model: "If I were you, I'd just start over." },
      { cue: "나라면 그 제안 받아들일 거야.", model: "If I were you, I'd take the offer." },
      { cue: "나라면 기다리겠어.", model: "If I were you, I'd wait." },
    ],
  },
  {
    id: "unless",
    category: "conditionals",
    frame: "Unless ___, ___",
    gloss: "except if — the one thing that changes it",
    items: [
      { cue: "지금 떠나지 않으면 늦을 거야.", model: "Unless we leave now, we'll be late." },
      { cue: "이유를 말하지 않으면 안 도와줄 거야.", model: "Unless you tell me why, I won't help." },
      { cue: "버그가 없으면 내일 출시해.", model: "Unless there's a bug, we ship tomorrow." },
    ],
  },

  // ── Reactions ──────────────────────────────────────────────────────────────
  {
    id: "no-wonder",
    category: "reactions",
    frame: "No wonder ___",
    gloss: "that explains it! (a sudden realization)",
    items: [
      { cue: "어쩐지 이렇게 느리더라.", model: "No wonder it's so slow." },
      { cue: "어쩐지 피곤하더라.", model: "No wonder you're tired." },
      { cue: "어쩐지 안 되더라.", model: "No wonder it didn't work." },
    ],
  },
  {
    id: "the-thing-is",
    category: "reactions",
    frame: "The thing is, ___",
    gloss: "here's the real issue / the catch",
    items: [
      { cue: "근데 문제는 시간이 없다는 거야.", model: "The thing is, I don't have time." },
      { cue: "사실 그게 그렇게 간단하지가 않아.", model: "The thing is, it's not that simple." },
      { cue: "근데 아무도 그 코드 몰라.", model: "The thing is, nobody knows that code." },
    ],
  },
  {
    id: "it-turns-out",
    category: "reactions",
    frame: "It turns out (that) ___",
    gloss: "what you found out later",
    items: [
      { cue: "알고 보니 내 잘못이었어.", model: "It turns out it was my fault." },
      { cue: "알고 보니 그게 이미 고쳐져 있었어.", model: "It turns out it was already fixed." },
      { cue: "알고 보니 그가 맞았어.", model: "It turns out he was right." },
    ],
  },
  {
    id: "cant-believe",
    category: "reactions",
    frame: "I can't believe ___",
    gloss: "react to something surprising",
    items: [
      { cue: "이게 진짜 됐다는 게 믿기지 않아.", model: "I can't believe it actually worked." },
      { cue: "네가 그걸 기억한다니 믿기지 않아.", model: "I can't believe you remembered that." },
      { cue: "벌써 금요일이라니.", model: "I can't believe it's Friday already." },
    ],
  },

  // ── Opinions & hedging ───────────────────────────────────────────────────────
  {
    id: "id-say",
    category: "opinions",
    frame: "I'd say ___",
    gloss: "give an opinion, softly",
    items: [
      { cue: "내 생각엔 한 시간쯤 걸릴 것 같아.", model: "I'd say it'll take about an hour." },
      { cue: "내 생각엔 그만한 가치가 있어.", model: "I'd say it's worth it." },
      { cue: "내 생각엔 거의 다 됐어.", model: "I'd say we're almost done." },
    ],
  },
  {
    id: "it-depends-on",
    category: "opinions",
    frame: "It depends on ___",
    gloss: "the answer isn't fixed — it varies",
    items: [
      { cue: "트래픽에 따라 달라.", model: "It depends on the traffic." },
      { cue: "누구한테 물어보느냐에 따라 달라.", model: "It depends on who you ask." },
      { cue: "얼마나 시간이 있느냐에 달렸어.", model: "It depends on how much time we have." },
    ],
  },
  {
    id: "not-sure-if",
    category: "opinions",
    frame: "I'm not sure if ___",
    gloss: "express uncertainty",
    items: [
      { cue: "이게 맞는지 모르겠어.", model: "I'm not sure if this is right." },
      { cue: "그가 올지 모르겠어.", model: "I'm not sure if he's coming." },
      { cue: "내가 그걸 저장했는지 모르겠어.", model: "I'm not sure if I saved it." },
    ],
  },
];

export const PATTERN_CATEGORIES = ["questions", "modals", "conditionals", "reactions", "opinions"] as const;
