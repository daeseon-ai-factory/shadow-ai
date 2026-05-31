// Curated high-frequency English sentence patterns for daily drilling — the foundational-
// but-always-confusing frames a Korean developer needs (questions incl. indirect, the "as"
// family, comparatives, relative clauses, tense/aspect, conditionals, modals, verb patterns,
// connectors, passive, articles, collocations, + reactions/opinions). Each pattern is a fixed
// frame + items pairing a Korean cue with one idiomatic English model. The cue is written in
// ENGLISH word order, chunked with " · " (직독직해) — read it left-to-right and the English
// just comes out. Authored + reviewed for accuracy; nothing fabricated.

export interface PatternItem {
  cue: string; // Korean meaning in ENGLISH word order, chunked with " · "
  model: string; // one natural English sentence using the frame
}

export interface Pattern {
  id: string;
  category: string;
  frame: string;
  gloss: string;
  items: PatternItem[];
}

export const PATTERNS: Pattern[] = [
  {
    "id": "questions-yes-no-questions",
    "category": "questions",
    "frame": "Do/Does/Did + S + V? / Have you + p.p.? / Are you + ~ing?",
    "gloss": "Form basic yes/no questions",
    "items": [
      {
        "cue": "너 이미 검토했어? · 이 PR을",
        "model": "Did you already review this PR?"
      },
      {
        "cue": "너 배포했어? · 그걸 · 스테이징에 · 벌써",
        "model": "Have you deployed it to staging yet?"
      },
      {
        "cue": "너 작업 중이야? · 그 버그를 · 지금 당장",
        "model": "Are you working on that bug right now?"
      }
    ]
  },
  {
    "id": "questions-wh-questions",
    "category": "questions",
    "frame": "Wh- (What/Why/Where/When) + do/did + S + V?",
    "gloss": "Ask for specific information",
    "items": [
      {
        "cue": "왜 · 이 함수가 망가졌어?",
        "model": "Why did this function break?"
      },
      {
        "cue": "어디에 · 너는 저장해? · 그 로그들을",
        "model": "Where do you store those logs?"
      },
      {
        "cue": "언제 · 그 데모가 시작해?",
        "model": "When does the demo start?"
      }
    ]
  },
  {
    "id": "questions-how-adjective",
    "category": "questions",
    "frame": "How + adjective/adverb ~? (how long / how often / how come)",
    "gloss": "Ask about degree, duration, frequency",
    "items": [
      {
        "cue": "얼마나 오래 · 이 빌드가 걸려?",
        "model": "How long does this build take?"
      },
      {
        "cue": "얼마나 자주 · 너는 배포해? · 프로덕션에",
        "model": "How often do you deploy to production?"
      },
      {
        "cue": "어째서 · 그 테스트들이 통과했어?",
        "model": "How come the tests passed?"
      }
    ]
  },
  {
    "id": "questions-indirect-question",
    "category": "questions",
    "frame": "Do you know / Can you tell me + wh- + S + V (no inversion)",
    "gloss": "Embedded question, statement word order",
    "items": [
      {
        "cue": "너 알아? · 어디에 · 이 설정 파일이 있는지",
        "model": "Do you know where this config file is?"
      },
      {
        "cue": "너 말해줄 수 있어? · 나에게 · 왜 · 그 배포가 실패했는지",
        "model": "Can you tell me why the deploy failed?"
      },
      {
        "cue": "너 알아? · 몇 시에 · 그 회의가 시작하는지",
        "model": "Do you know what time the meeting starts?"
      }
    ]
  },
  {
    "id": "questions-tag-question",
    "category": "questions",
    "frame": "Statement, + opposite auxiliary + pronoun? (…, right? / …, isn't it?)",
    "gloss": "Confirm something you assume true",
    "items": [
      {
        "cue": "이 테스트는 통과해 · 안 그래?",
        "model": "This test passes, doesn't it?"
      },
      {
        "cue": "너는 이미 머지했어 · 그치?",
        "model": "You already merged it, right?"
      },
      {
        "cue": "이건 돌아가고 있지 않아 · 프로덕션에서 · 그렇지?",
        "model": "This isn't running in production, is it?"
      }
    ]
  },
  {
    "id": "questions-subject-question",
    "category": "questions",
    "frame": "Who/What + V? (subject) vs Who/What + did + S + V? (object)",
    "gloss": "Subject question takes no do-support",
    "items": [
      {
        "cue": "누가 · 망가뜨렸어 · 그 빌드를?",
        "model": "Who broke the build?"
      },
      {
        "cue": "누구를 · 너는 전화했어 · 이것에 관해?",
        "model": "Who did you call about this?"
      },
      {
        "cue": "무엇이 · 일으켰어 · 이 에러를?",
        "model": "What caused this error?"
      }
    ]
  },
  {
    "id": "asfamily-as-as-possible",
    "category": "asfamily",
    "frame": "as + adjective/adverb + as possible",
    "gloss": "the most ~ that can be done",
    "items": [
      {
        "cue": "제발 고쳐줘 · 이 버그를 · 가능한 한 빨리",
        "model": "Please fix this bug as soon as possible."
      },
      {
        "cue": "써 · PR 설명을 · 가능한 한 상세하게",
        "model": "Write the PR description in as much detail as possible."
      },
      {
        "cue": "유지해 그걸 · 가능한 한 짧게 · 스탠드업에서",
        "model": "Keep it as brief as possible in standup."
      }
    ]
  },
  {
    "id": "asfamily-not-as-as",
    "category": "asfamily",
    "frame": "not as + adjective + as + (noun/clause)",
    "gloss": "less ~ than the comparison",
    "items": [
      {
        "cue": "그건 · 그렇게 어렵지 않아 · 보이는 것만큼",
        "model": "It's not as hard as it looks."
      },
      {
        "cue": "그 새 API는 · 빠르지 않아 · 우리가 기대했던 것만큼",
        "model": "The new API isn't as fast as we'd hoped."
      },
      {
        "cue": "이번 릴리스는 · 위험하지 않아 · 지난번 것만큼",
        "model": "This release isn't as risky as the last one."
      }
    ]
  },
  {
    "id": "asfamily-as-far-as-i-know",
    "category": "asfamily",
    "frame": "As far as I know / As far as I'm concerned, + clause",
    "gloss": "to my knowledge / in my opinion",
    "items": [
      {
        "cue": "내가 아는 한 · 그 엔드포인트는 · 여전히 사용 중이야",
        "model": "As far as I know, that endpoint is still in use."
      },
      {
        "cue": "내가 아는 한 · 아무도 건드리지 않았어 · 그 서비스를",
        "model": "As far as I know, nobody has touched that service."
      },
      {
        "cue": "나로서는 · 이 PR은 · 머지할 준비가 됐어",
        "model": "As far as I'm concerned, this PR is ready to merge."
      }
    ]
  },
  {
    "id": "asfamily-as-long-as",
    "category": "asfamily",
    "frame": "as long as + clause",
    "gloss": "only if (condition) / for the whole time",
    "items": [
      {
        "cue": "너는 배포할 수 있어 · 테스트가 통과하는 한",
        "model": "You can deploy as long as the tests pass."
      },
      {
        "cue": "우리는 마이그레이션을 돌릴 수 있어 · 백업이 있는 한",
        "model": "We can run the migration as long as we have a backup."
      },
      {
        "cue": "로그가 계속 쌓여 · 서버가 돌아가는 한",
        "model": "Logs keep piling up as long as the server is running."
      }
    ]
  },
  {
    "id": "asfamily-b-as-well-as-a",
    "category": "asfamily",
    "frame": "B as well as A / ..., A as well",
    "gloss": "in addition to; also (adds B)",
    "items": [
      {
        "cue": "이건 작동해 · 데스크톱에서 · 모바일에서도",
        "model": "This works on desktop as well as mobile."
      },
      {
        "cue": "우리는 써야 해 · 통합 테스트를 · 단위 테스트뿐 아니라",
        "model": "We need to write integration tests as well as unit tests."
      },
      {
        "cue": "적용해 그 변경을 · 스테이징에도",
        "model": "Apply that change to staging as well."
      }
    ]
  },
  {
    "id": "asfamily-the-same-as",
    "category": "asfamily",
    "frame": "the same (noun) as + (noun/clause)",
    "gloss": "identical to the comparison",
    "items": [
      {
        "cue": "이 함수는 반환해 · 같은 결과를 · 예전 것과",
        "model": "This function returns the same result as the old one."
      },
      {
        "cue": "스테이징은 사용해 · 같은 설정을 · 프로덕션과",
        "model": "Staging uses the same config as production."
      },
      {
        "cue": "그 에러는 · 똑같아 · 어제 것과",
        "model": "The error is the same as yesterday's."
      }
    ]
  },
  {
    "id": "asfamily-as-if",
    "category": "asfamily",
    "frame": "as if / as though + clause",
    "gloss": "describing how something seems",
    "items": [
      {
        "cue": "그건 마치 · 캐시가 전혀 비워지지 않은 것 같아",
        "model": "It's as if the cache never cleared at all."
      },
      {
        "cue": "그는 그걸 설명했어 · 마치 그가 직접 그 코드를 짠 것처럼",
        "model": "He explained it as though he'd written the code himself."
      },
      {
        "cue": "그 서버는 행동해 · 마치 그게 요청을 무시하는 것처럼",
        "model": "The server acts as if it's ignoring the requests."
      }
    ]
  },
  {
    "id": "comparatives-er-than-more-than",
    "category": "comparatives",
    "frame": "A is [형용사]-er / more [형용사] / less [형용사] than B",
    "gloss": "compare two things directly",
    "items": [
      {
        "cue": "이 새 라이브러리는 더 빨라 · 그것보다 · 우리가 쓰고 있던",
        "model": "This new library is faster than the one we were using."
      },
      {
        "cue": "이번 릴리스는 더 복잡해 · 지난번 것보다",
        "model": "This release is more complicated than the last one."
      },
      {
        "cue": "그 접근법은 덜 위험해 · 내가 처음 생각했던 것보다",
        "model": "That approach is less risky than I first thought."
      }
    ]
  },
  {
    "id": "comparatives-the-est-the-most",
    "category": "comparatives",
    "frame": "the [형용사]-est / the most [형용사] (in/of ~)",
    "gloss": "pick out the top one in a group",
    "items": [
      {
        "cue": "이게 가장 느린 쿼리야 · 우리 코드베이스에서",
        "model": "This is the slowest query in our codebase."
      },
      {
        "cue": "그게 가장 중요한 결정이었어 · 우리가 내린 · 올해",
        "model": "That was the most important decision we made this year."
      },
      {
        "cue": "그게 가장 까다로운 버그였어 · 내가 디버깅해 본 것 중 · 지금까지",
        "model": "That was the trickiest bug I've ever debugged."
      }
    ]
  },
  {
    "id": "comparatives-the-more-the-better",
    "category": "comparatives",
    "frame": "The [비교급] ~, the [비교급] ~",
    "gloss": "two things change together",
    "items": [
      {
        "cue": "더 연습할수록 · 너는 · 더 잘하게 돼",
        "model": "The more you practice, the better you get."
      },
      {
        "cue": "더 작을수록 · 그 PR이 · 더 쉬워 · 리뷰하기",
        "model": "The smaller the PR, the easier it is to review."
      },
      {
        "cue": "더 오래 기다릴수록 · 우리가 · 더 힘들어져 · 그 마이그레이션이",
        "model": "The longer we wait, the harder the migration gets."
      }
    ]
  },
  {
    "id": "comparatives-times-as-as",
    "category": "comparatives",
    "frame": "[twice / three times] as [형용사] as ~",
    "gloss": "express how many times bigger/etc.",
    "items": [
      {
        "cue": "새 서버는 두 배 빨라 · 옛날 것만큼 (비교해서)",
        "model": "The new server is twice as fast as the old one."
      },
      {
        "cue": "그 작업은 세 배 오래 걸렸어 · 우리가 예상했던 것만큼 (비교해서)",
        "model": "That task took three times as long as we expected."
      },
      {
        "cue": "이 캐시는 절반의 메모리를 써 · 옛날 방식만큼 (비교해서)",
        "model": "This cache uses half as much memory as the old approach."
      }
    ]
  },
  {
    "id": "comparatives-way-much-far-comparative",
    "category": "comparatives",
    "frame": "[much / far / way] + [비교급] than ~",
    "gloss": "strongly emphasize a comparison",
    "items": [
      {
        "cue": "그 코드는 훨씬 더 깔끔해 · 리팩터 후에",
        "model": "The code is much cleaner after the refactor."
      },
      {
        "cue": "이 접근법은 훨씬 더 안정적이야 · 손으로 하는 것보다",
        "model": "This approach is far more reliable than doing it by hand."
      },
      {
        "cue": "새 빌드 파이프라인은 훨씬 더 빨라 · 옛날 것보다",
        "model": "The new build pipeline is way faster than the old one."
      }
    ]
  },
  {
    "id": "relatives-who-which-that",
    "category": "relatives",
    "frame": "the [noun] who / which / that ___",
    "gloss": "who=people, which/that=things",
    "items": [
      {
        "cue": "나는 되돌렸어 · 그 커밋을 · 그건 망가뜨렸어 · 메인 브랜치를",
        "model": "I reverted the commit that broke the main branch."
      },
      {
        "cue": "그 엔지니어 · 그 사람이 리뷰했어 · 이 PR을 · 휴가 중이야",
        "model": "The engineer who reviewed this PR is on vacation."
      },
      {
        "cue": "그 라이브러리 · 그건 우리가 의존했어 · 더 이상 관리되지 않아",
        "model": "The library that we depended on is no longer maintained."
      }
    ]
  },
  {
    "id": "relatives-whose",
    "category": "relatives",
    "frame": "the [noun] whose ___",
    "gloss": "possessive relative; 'whose X'",
    "items": [
      {
        "cue": "그 개발자 · 그의 PR이 망가뜨린 · 메인을 · 지금 고치고 있어 · 그걸",
        "model": "The dev whose PR broke main is fixing it now."
      },
      {
        "cue": "우리는 이메일을 보냈어 · 그 사용자들에게 · 그들의 비밀번호가 · 유출됐던",
        "model": "We emailed the users whose passwords were leaked."
      },
      {
        "cue": "우리는 다시 봐야 해 · 그 서비스를 · 그것의 테스트가 · 계속 실패하는",
        "model": "We need to look again at the service whose tests keep failing."
      }
    ]
  },
  {
    "id": "relatives-where-when-why",
    "category": "relatives",
    "frame": "the [place/time/reason] where / when / why ___",
    "gloss": "relative adverbs for place, time, reason",
    "items": [
      {
        "cue": "이게 그 장소야 · 거기서 · 그 버그가 발생해",
        "model": "This is the place where the bug happens."
      },
      {
        "cue": "그 순간 · 그때 · 그 배포가 항상 망가지는 · 바로 그때야 · 트래픽이 급증할 때",
        "model": "The moment when the deploy always breaks is when traffic spikes."
      },
      {
        "cue": "그게 그 이유야 · 왜 · 우리가 바꿨는지 · 그 프레임워크로",
        "model": "That's the reason why we switched to that framework."
      }
    ]
  },
  {
    "id": "relatives-what-the-thing-that",
    "category": "relatives",
    "frame": "what ___ (= the thing that ___)",
    "gloss": "'what' = the thing(s) that",
    "items": [
      {
        "cue": "그게 바로 · 내가 말해온 거야 · 줄곧",
        "model": "That's exactly what I've been saying all along."
      },
      {
        "cue": "내가 이해 못 하는 건 · 왜 · 이 테스트가 통과하는지 · 로컬에서만",
        "model": "What I don't understand is why this test only passes locally."
      },
      {
        "cue": "나에게 말해 · 네가 필요한 걸 · 그러면 내가 만들게 · 그걸",
        "model": "Tell me what you need and I'll build it."
      }
    ]
  },
  {
    "id": "relatives-preposition-which",
    "category": "relatives",
    "frame": "the [noun] (that/which) ___ + preposition  /  preposition + which",
    "gloss": "relative clause ending in a preposition",
    "items": [
      {
        "cue": "그 버그 · 내가 너한테 말했던 · 그것에 대해 · 아직 안 고쳐졌어",
        "model": "The bug I told you about still isn't fixed."
      },
      {
        "cue": "그 기능 · 우리가 작업하고 있던 · 취소됐어",
        "model": "The feature we were working on got cancelled."
      },
      {
        "cue": "그 동료 · 내가 의지했던 · 팀을 떠났어",
        "model": "The colleague I relied on left the team."
      }
    ]
  },
  {
    "id": "relatives-non-defining-which",
    "category": "relatives",
    "frame": "[clause], which means / which is ___",
    "gloss": "non-defining clause adding extra info",
    "items": [
      {
        "cue": "그 빌드가 망가졌어 · 그건 의미해 · 우리가 배포할 수 없다는 걸 · 오늘",
        "model": "The build is broken, which means we can't deploy today."
      },
      {
        "cue": "그는 승인했어 · 그 PR을 · 바로 즉시 · 그건 드문 일이야 · 그에게는",
        "model": "He approved the PR right away, which is unusual for him."
      },
      {
        "cue": "모든 테스트가 통과했어 · 그건 의미해 · 우리가 출시해도 괜찮다는 걸",
        "model": "All the tests passed, which means we're good to ship."
      }
    ]
  },
  {
    "id": "tense-present-perfect-vs-past",
    "category": "tense",
    "frame": "I have (already) ___ / I ___ (yesterday)",
    "gloss": "perfect = result now; past = finished time",
    "items": [
      {
        "cue": "나는 이미 고쳤어 · 그 버그를",
        "model": "I've already fixed that bug."
      },
      {
        "cue": "나는 고쳤어 · 그 버그를 · 어제",
        "model": "I fixed that bug yesterday."
      },
      {
        "cue": "우리는 한 번도 안 써봤어 · 그 라이브러리를",
        "model": "We've never used that library."
      }
    ]
  },
  {
    "id": "tense-present-perfect-continuous",
    "category": "tense",
    "frame": "I've been ___ing for/since ___",
    "gloss": "ongoing action up to now, with duration",
    "items": [
      {
        "cue": "나는 디버깅해오고 있어 · 이 버그를 · 세 시간 동안",
        "model": "I've been debugging this bug for three hours."
      },
      {
        "cue": "나는 기다려오고 있어 · 그 배포를 · 오늘 아침부터",
        "model": "I've been waiting for the deploy since this morning."
      },
      {
        "cue": "나는 일해오고 있어 · 자바로 · 2020년부터",
        "model": "I've been working with Java since 2020."
      }
    ]
  },
  {
    "id": "tense-used-to-three-way",
    "category": "tense",
    "frame": "used to ___ / be used to ___ing / get used to ___ing",
    "gloss": "past habit / accustomed to / becoming accustomed",
    "items": [
      {
        "cue": "나는 예전엔 일했어 · 자바스크립트로",
        "model": "I used to work in JavaScript."
      },
      {
        "cue": "나는 익숙해 · 받는 거에 · 내 코드가 리뷰 · (당하는 거에)",
        "model": "I'm used to getting my code reviewed."
      },
      {
        "cue": "나는 익숙해지고 있어 · 일하는 거에 · 원격으로",
        "model": "I'm getting used to working remotely."
      }
    ]
  },
  {
    "id": "tense-going-to-vs-will",
    "category": "tense",
    "frame": "I'm going to ___ (plan) / I'll ___ (decide now)",
    "gloss": "going to = prior plan; will = on-the-spot decision",
    "items": [
      {
        "cue": "나는 리뷰할 거야 · 그 PR을 · 오늘 오후에",
        "model": "I'm going to review that PR this afternoon."
      },
      {
        "cue": "좋아 · 내가 고칠게 · 지금 바로",
        "model": "Okay, I'll fix it right now."
      },
      {
        "cue": "그 빌드는 깨질 거야 · 곧",
        "model": "The build is going to break soon."
      }
    ]
  },
  {
    "id": "tense-past-perfect",
    "category": "tense",
    "frame": "By the time ___, I had (already) ___",
    "gloss": "an action finished before another past point",
    "items": [
      {
        "cue": "내가 그 회의에 들어왔을 때쯤엔 · 그 배포는 이미 끝나 있었어",
        "model": "By the time I joined the meeting, the deploy had already finished."
      },
      {
        "cue": "그가 자기 수정을 푸시했을 때쯤엔 · 나는 이미 고쳐놨었어 · 그 부분을",
        "model": "By the time he pushed his fix, I had already fixed that part."
      },
      {
        "cue": "내가 로그를 확인했을 때쯤엔 · 그 서버는 이미 죽어 있었어",
        "model": "By the time I checked the logs, the server had already crashed."
      }
    ]
  },
  {
    "id": "conditionals-first-conditional-if-will",
    "category": "conditionals",
    "frame": "If + present, ___ will ___.",
    "gloss": "Real future possibility; likely outcome",
    "items": [
      {
        "cue": "만약 그 테스트가 통과하면 · 우리는 배포할 거야 · 오늘 오후에",
        "model": "If the tests pass, we'll deploy this afternoon."
      },
      {
        "cue": "만약 네가 머지하면 · 지금 · 너는 충돌이 날 거야",
        "model": "If you merge now, you'll get a conflict."
      },
      {
        "cue": "만약 네가 캐시를 지우지 않으면 · 너는 보게 될 거야 · 예전 빌드를",
        "model": "If you don't clear the cache, you'll see the old build."
      }
    ]
  },
  {
    "id": "conditionals-second-conditional-if-were",
    "category": "conditionals",
    "frame": "If I were you, I'd ___ . / If + past, ___ would ___.",
    "gloss": "Unreal/hypothetical present; advice",
    "items": [
      {
        "cue": "만약 내가 너라면 · 나는 그 PR을 쪼갤 거야 · 더 작은 덩어리로",
        "model": "If I were you, I'd split that PR into smaller chunks."
      },
      {
        "cue": "만약 나한테 권한이 있다면 · 나는 그걸 롤백할 거야 · 내가 직접",
        "model": "If I had access, I'd roll it back myself."
      },
      {
        "cue": "만약 우리가 회의가 더 적다면 · 우리는 훨씬 더 많이 해낼 텐데",
        "model": "If we had fewer meetings, we'd get a lot more done."
      }
    ]
  },
  {
    "id": "conditionals-third-conditional-if-had-pp",
    "category": "conditionals",
    "frame": "If + had + p.p., ___ would have + p.p.",
    "gloss": "Unreal past; regret/imagined past outcome",
    "items": [
      {
        "cue": "만약 내가 그 로그를 확인했더라면 · 나는 그 버그를 잡았을 텐데 · 더 일찍",
        "model": "If I had checked the logs, I would have caught that bug sooner."
      },
      {
        "cue": "만약 우리가 테스트를 작성했더라면 · 더 일찍 · 우리는 막았을 텐데 · 그 장애를",
        "model": "If we had written tests earlier, we would have prevented that outage."
      },
      {
        "cue": "만약 네가 나한테 말했더라면 · 나는 너를 도왔을 텐데",
        "model": "If you had told me, I would have helped you."
      }
    ]
  },
  {
    "id": "conditionals-i-wish-if-only",
    "category": "conditionals",
    "frame": "I wish / If only + past (now) / + had p.p. (past).",
    "gloss": "Regret about now or the past",
    "items": [
      {
        "cue": "나는 바라 · 이 코드베이스가 가지고 있기를 · 더 나은 문서를",
        "model": "I wish this codebase had better documentation."
      },
      {
        "cue": "나는 바라 · 내가 푸시하지 않았기를 · 곧장 · 프로덕션으로",
        "model": "I wish I hadn't pushed straight to production."
      },
      {
        "cue": "~했더라면 좋았을 텐데 · 내가 그 노트를 읽었더라면 · 그 회의 전에",
        "model": "If only I had read the notes before that meeting."
      }
    ]
  },
  {
    "id": "conditionals-unless",
    "category": "conditionals",
    "frame": "___ unless ___. (= if not)",
    "gloss": "Exception: won't happen except in this case",
    "items": [
      {
        "cue": "머지하지 마 · 네가 가지고 있지 않은 한 · 두 개의 승인을",
        "model": "Don't merge unless you have two approvals."
      },
      {
        "cue": "우리는 배포하지 않아 · 주말에는 · 그게 긴급하지 않은 한",
        "model": "We don't deploy on weekends unless it's urgent."
      },
      {
        "cue": "우리는 이걸로 갈 거야 · 아무도 반대하지 않는 한",
        "model": "We'll go with this unless anyone objects."
      }
    ]
  },
  {
    "id": "conditionals-even-if",
    "category": "conditionals",
    "frame": "Even if ___, ___.",
    "gloss": "Outcome holds regardless of the condition",
    "items": [
      {
        "cue": "설령 그 테스트가 통과해도 · 누군가는 여전히 필요해 · 그걸 리뷰하는 게",
        "model": "Even if the tests pass, someone still needs to review it."
      },
      {
        "cue": "설령 우리가 지금 시작해도 · 우리는 맞추지 못할 거야 · 그 마감을",
        "model": "Even if we start now, we won't make the deadline."
      },
      {
        "cue": "설령 네가 맞다 해도 · 우리는 처리할 수 없어 · 이걸 · 이런 식으로",
        "model": "Even if you're right, we can't handle it this way."
      }
    ]
  },
  {
    "id": "conditionals-in-case",
    "category": "conditionals",
    "frame": "___ in case ___. / Just in case.",
    "gloss": "Precaution against a possible problem",
    "items": [
      {
        "cue": "그 데이터베이스를 백업해 · 그 배포 전에 · 혹시 모르니까 · 뭔가 잘못될 경우에 대비해",
        "model": "Back up the database before the deploy, in case something goes wrong."
      },
      {
        "cue": "나는 적어둘게 · 이전 버전을 · 우리가 롤백해야 할 경우에 대비해",
        "model": "I'll write down the previous version in case we need to roll back."
      },
      {
        "cue": "나는 저장할게 · 그 로그들을 · 그냥 혹시 모르니까",
        "model": "I'll save those logs just in case."
      }
    ]
  },
  {
    "id": "modals-should-have",
    "category": "modals",
    "frame": "I should have ___ / I shouldn't have ___",
    "gloss": "Regret about a past action",
    "items": [
      {
        "cue": "나는 돌렸어야 했어 · 그 테스트를 · 배포하기 전에",
        "model": "I should have run the tests before deploying."
      },
      {
        "cue": "나는 머지하지 말았어야 했어 · 그 PR을 · 그렇게 빨리",
        "model": "I shouldn't have merged that PR so quickly."
      },
      {
        "cue": "나는 너한테 물어봤어야 했어 · 애초에",
        "model": "I should have asked you in the first place."
      }
    ]
  },
  {
    "id": "modals-must-have-cant-have",
    "category": "modals",
    "frame": "It must have ___ / It can't have ___",
    "gloss": "Confident guess about the past",
    "items": [
      {
        "cue": "그건 분명 캐시였을 거야 · 그걸 망가뜨린 게",
        "model": "It must have been the cache that broke it."
      },
      {
        "cue": "걔네가 놓쳤을 리 없어 · 우리 메시지를",
        "model": "They can't have missed our message."
      },
      {
        "cue": "그 서버가 분명 다운됐을 거야 · 밤사이에",
        "model": "The server must have gone down overnight."
      }
    ]
  },
  {
    "id": "modals-might-have-could-have",
    "category": "modals",
    "frame": "It might have ___ / It could have ___",
    "gloss": "Uncertain guess about the past",
    "items": [
      {
        "cue": "그건 타임아웃이었을지도 몰라",
        "model": "It might have been a timeout."
      },
      {
        "cue": "누군가 바꿨을 수도 있어 · 그 설정을 · 실수로",
        "model": "Someone could have changed the config by accident."
      },
      {
        "cue": "우리는 잡을 수 있었어 · 그 버그를 · 훨씬 더 일찍",
        "model": "We could have caught that bug a lot earlier."
      }
    ]
  },
  {
    "id": "modals-have-to-vs-must-not",
    "category": "modals",
    "frame": "have to / don't have to / must not",
    "gloss": "Obligation vs no-need vs prohibition",
    "items": [
      {
        "cue": "너는 받아야 해 · 리뷰를 · 네가 머지하기 전에 · 네 코드를",
        "model": "You have to get a review before you merge your code."
      },
      {
        "cue": "너는 끝낼 필요 없어 · 그걸 전부 · 지금 당장",
        "model": "You don't have to finish it all right now."
      },
      {
        "cue": "너는 커밋하면 안 돼 · 그 API 키를",
        "model": "You must not commit that API key."
      }
    ]
  },
  {
    "id": "modals-be-supposed-to",
    "category": "modals",
    "frame": "be supposed to ___",
    "gloss": "Expected to (rule, plan, or what's wrong)",
    "items": [
      {
        "cue": "이 함수는 반환하면 안 돼 · null을",
        "model": "This function isn't supposed to return null."
      },
      {
        "cue": "우리는 만나기로 되어 있어 · 열 시에",
        "model": "We're supposed to meet at ten."
      },
      {
        "cue": "나는 끝내기로 되어 있었어 · 이걸 · 어제",
        "model": "I was supposed to finish this yesterday."
      }
    ]
  },
  {
    "id": "modals-had-better",
    "category": "modals",
    "frame": "You'd better ___ / You'd better not ___",
    "gloss": "Strong advice or warning",
    "items": [
      {
        "cue": "너는 백업하는 게 좋아 · 그걸 · 네가 배포하기 전에",
        "model": "You'd better back it up before you deploy."
      },
      {
        "cue": "너는 건드리지 않는 게 좋아 · 프로덕션을 · 금요일에",
        "model": "You'd better not touch production on a Friday."
      },
      {
        "cue": "우리는 떠나는 게 좋아 · 곧 · 안 그러면 · 우리는 놓칠 거야 · 그 기차를",
        "model": "We'd better leave soon, or we'll miss the train."
      }
    ]
  },
  {
    "id": "verbpatterns-decide-to-vs-finish-ing",
    "category": "verbpatterns",
    "frame": "decide to + V (intent) / finish + -ing (completion)",
    "gloss": "Some verbs take to, others take -ing",
    "items": [
      {
        "cue": "나는 결정했어 · 고치기로 · 그 버그를 · 직접",
        "model": "I decided to fix the bug myself."
      },
      {
        "cue": "나는 끝냈어 · 작성하는 걸 · 그 테스트들을",
        "model": "I finished writing the tests."
      },
      {
        "cue": "나는 애쓰는 중이야 · 피하려고 · 쓰는 걸 · 그 라이브러리를",
        "model": "I'm trying to avoid using that library."
      }
    ]
  },
  {
    "id": "verbpatterns-stop-to-vs-stop-ing",
    "category": "verbpatterns",
    "frame": "stop to + V (pause in order to) / stop + -ing (quit the activity)",
    "gloss": "stop to do = pause to; stop doing = quit",
    "items": [
      {
        "cue": "나는 멈췄어 · 사오려고 · 커피를",
        "model": "I stopped to grab a coffee."
      },
      {
        "cue": "우리는 그만뒀어 · 쓰는 걸 · 그 오래된 라이브러리를",
        "model": "We stopped using that old library."
      },
      {
        "cue": "나는 멈췄어 · 생각하려고 · 근본 원인에 대해",
        "model": "I stopped to think about the root cause."
      }
    ]
  },
  {
    "id": "verbpatterns-remember-to-vs-remember-ing",
    "category": "verbpatterns",
    "frame": "remember to + V (future task) / remember + -ing (past event)",
    "gloss": "remember to = don't forget; remember -ing = recall",
    "items": [
      {
        "cue": "잊지 말고 · 설정해 · 환경 변수들을 · 네가 배포하기 전에",
        "model": "Remember to set the env variables before you deploy."
      },
      {
        "cue": "나는 기억해 · 머지한 걸 · 그 PR을 · 어제",
        "model": "I remember merging that PR yesterday."
      },
      {
        "cue": "잊지 말고 · 꺼 · 서버를 · 네가 떠나기 전에",
        "model": "Remember to shut down the server before you leave."
      }
    ]
  },
  {
    "id": "verbpatterns-make-let-have-causative",
    "category": "verbpatterns",
    "frame": "make / let / have + object + base verb",
    "gloss": "Causatives: force, allow, or arrange",
    "items": [
      {
        "cue": "그는 시켰어 · 나를 · 다시 쓰게 · 그 전체를",
        "model": "He made me rewrite the whole thing."
      },
      {
        "cue": "내가 하게 해줘 · 배포하게 · 스테이징에 · 먼저",
        "model": "Let me deploy to staging first."
      },
      {
        "cue": "나는 시킬 거야 · 그 인턴에게 · 확인하게 · 로그를",
        "model": "I'll have the intern check the logs."
      }
    ]
  },
  {
    "id": "verbpatterns-get-someone-to-do",
    "category": "verbpatterns",
    "frame": "get + object + to + V",
    "gloss": "persuade/manage to get someone to do",
    "items": [
      {
        "cue": "나는 만들었어 · 그 리드가 · 승인하게 · 그 기능을",
        "model": "I got the lead to approve the feature."
      },
      {
        "cue": "나는 마침내 만들었어 · 그 테스트들이 · 통과하게",
        "model": "I finally got the tests to pass."
      },
      {
        "cue": "나는 만들었어 · 그가 · 리뷰하게 · 그 PR을 · 다시",
        "model": "I got him to review the PR again."
      }
    ]
  },
  {
    "id": "verbpatterns-get-something-done",
    "category": "verbpatterns",
    "frame": "get + something + past participle (get it done)",
    "gloss": "have a task completed (often by someone)",
    "items": [
      {
        "cue": "끝내자 · 그걸 · 오늘 안으로",
        "model": "Let's get it done by the end of the day."
      },
      {
        "cue": "우리는 마침내 만들었어 · 그 배포 파이프라인을 · 자동화되게",
        "model": "We finally got the deploy pipeline automated."
      },
      {
        "cue": "나는 했어 · 내 노트북을 · 고치게",
        "model": "I got my laptop fixed."
      }
    ]
  },
  {
    "id": "verbpatterns-look-forward-be-used-have-trouble",
    "category": "verbpatterns",
    "frame": "look forward to / be used to / have trouble + -ing",
    "gloss": "These fixed phrases all take -ing",
    "items": [
      {
        "cue": "나는 기대하고 있어 · 일하는 걸 · 그 새 팀과",
        "model": "I'm looking forward to working with the new team."
      },
      {
        "cue": "나는 익숙해 · 일하는 거에 · 원격으로",
        "model": "I'm used to working remotely."
      },
      {
        "cue": "나는 어려움을 겪고 있어 · 이해하는 데 · 이 레거시 코드를",
        "model": "I'm having trouble understanding this legacy code."
      }
    ]
  },
  {
    "id": "connectors-too-to-enough-to-so-that-such-that",
    "category": "connectors",
    "frame": "too ~ to / ~ enough to / so ~ that / such (a) ~ that",
    "gloss": "Degree + result; excess, sufficiency, consequence",
    "items": [
      {
        "cue": "이 버그는 너무 사소해 · 별도의 핫픽스를 배포하기엔 · 이것 때문에",
        "model": "This bug is too minor to ship a separate hotfix for."
      },
      {
        "cue": "그 테스트 커버리지는 · 충분히 좋아 · 자신 있게 배포할 만큼",
        "model": "The test coverage is good enough to deploy with confidence."
      },
      {
        "cue": "로그가 너무 많아서 · 나는 찾을 수 없었어 · 실제 에러를",
        "model": "There were so many logs that I couldn't find the actual error."
      }
    ]
  },
  {
    "id": "connectors-not-only-but-also-both-and-either-or-neither-nor",
    "category": "connectors",
    "frame": "not only ~ but also / both ~ and / either ~ or / neither ~ nor",
    "gloss": "Pairing two items: add, include both, pick one, exclude both",
    "items": [
      {
        "cue": "이 리팩터링은 · 만들 뿐만 아니라 · 그 코드를 더 빠르게 · 또한 만들어 · 그것을 더 읽기 쉽게",
        "model": "This refactor not only makes the code faster but also makes it easier to read."
      },
      {
        "cue": "백엔드와 · 프론트엔드 · 둘 다 · 영향을 받아 · 그 변경으로",
        "model": "Both the backend and the frontend are affected by that change."
      },
      {
        "cue": "우리는 둘 중 하나야 · 지금 롤백하거나 · 아니면 패치를 빠르게 배포하거나",
        "model": "We either roll back now or ship a patch fast."
      }
    ]
  },
  {
    "id": "connectors-although-though-vs-despite-in-spite-of",
    "category": "connectors",
    "frame": "although/though + S+V  vs  despite/in spite of + noun/-ing",
    "gloss": "Concession: clause after although; noun after despite",
    "items": [
      {
        "cue": "비록 모든 테스트가 통과했지만 · 그것은 여전히 망가졌어 · 프로덕션에서",
        "model": "Although all the tests passed, it still broke in production."
      },
      {
        "cue": "그 경고에도 불구하고 · 그는 그냥 배포했어 · 그것을 · 어쨌든",
        "model": "Despite the warning, he just deployed it anyway."
      },
      {
        "cue": "그 빡빡한 마감에도 불구하고 · 우리는 출시했어 · 제때",
        "model": "In spite of the tight deadline, we shipped on time."
      }
    ]
  },
  {
    "id": "connectors-because-vs-because-of",
    "category": "connectors",
    "frame": "because + S+V  vs  because of + noun",
    "gloss": "Reason: clause after because; noun after because of",
    "items": [
      {
        "cue": "그 빌드가 실패했어 · 왜냐하면 우리가 안 지웠거든 · 캐시를",
        "model": "The build failed because we didn't clear the cache."
      },
      {
        "cue": "그 서버가 다운됐어 · 트래픽 급증 때문에",
        "model": "The server went down because of the traffic spike."
      },
      {
        "cue": "우리는 미뤘어 · 그 데모를 · 데드락 때문에",
        "model": "We postponed the demo because of a deadlock."
      }
    ]
  },
  {
    "id": "connectors-whether-or-not",
    "category": "connectors",
    "frame": "whether (or not) ~ / whether ~ or ~",
    "gloss": "Two possibilities; indirect yes/no question",
    "items": [
      {
        "cue": "나는 아직 결정 안 했어 · 머지할지 말지 · 이 PR을 · 오늘",
        "model": "I haven't decided whether or not to merge this PR today."
      },
      {
        "cue": "우리는 확인해야 해 · 그 기능이 실제로 쓰이고 있는지 아닌지를",
        "model": "We need to check whether that feature is actually being used or not."
      },
      {
        "cue": "우리가 그것을 고치든 · 지금이든 나중이든 · 누군가는 해야 해 · 결국엔",
        "model": "Whether we fix it now or later, someone has to do it eventually."
      }
    ]
  },
  {
    "id": "passive-be-pp-passive",
    "category": "passive",
    "frame": "S + be + 과거분사(pp)",
    "gloss": "State who/what receives the action",
    "items": [
      {
        "cue": "이 모듈은 · 배포되었어 · 어제",
        "model": "This module was deployed yesterday."
      },
      {
        "cue": "그 회의는 · 밀렸어 · 다음 주로",
        "model": "The meeting was pushed to next week."
      },
      {
        "cue": "그 버그는 · 고쳐져 있어 · 최신 릴리스에서",
        "model": "The bug is fixed in the latest release."
      }
    ]
  },
  {
    "id": "passive-get-pp",
    "category": "passive",
    "frame": "S + get + 과거분사(pp)",
    "gloss": "Casual passive, often something happening to you",
    "items": [
      {
        "cue": "그는 · 해고됐어 · 지난주에",
        "model": "He got fired last week."
      },
      {
        "cue": "내 PR이 · 드디어 · 머지됐어",
        "model": "My PR finally got merged."
      },
      {
        "cue": "나는 · 거의 · 치일 뻔했어 · 차에 · 출근하는 길에",
        "model": "I almost got hit by a car on my way to work."
      }
    ]
  },
  {
    "id": "passive-have-get-something-pp",
    "category": "passive",
    "frame": "have/get + something + 과거분사(pp)",
    "gloss": "Arrange for something to be done",
    "items": [
      {
        "cue": "나는 · 받았어 · 내 코드가 리뷰되도록 · 시니어한테",
        "model": "I got my code reviewed by a senior."
      },
      {
        "cue": "나는 · 만들게 · 그게 고쳐지도록 · 내일까지",
        "model": "I'll have it fixed by tomorrow."
      },
      {
        "cue": "나는 · 했어 · 내 노트북 화면이 교체되도록",
        "model": "I had my laptop screen replaced."
      }
    ]
  },
  {
    "id": "passive-passive-by",
    "category": "passive",
    "frame": "S + be/get + pp + by + 행위자",
    "gloss": "Name the doer in a passive sentence",
    "items": [
      {
        "cue": "그 기능은 · 만들어졌어 · 다른 팀에 의해",
        "model": "That feature was built by another team."
      },
      {
        "cue": "내 변경사항은 · 승인됐어 · 내 매니저에 의해",
        "model": "My changes were approved by my manager."
      },
      {
        "cue": "그 결정은 · 내려졌어 · CTO에 의해",
        "model": "The decision was made by the CTO."
      }
    ]
  },
  {
    "id": "articles-a-the-zero-article",
    "category": "articles",
    "frame": "a/an ___ (first mention) → the ___ (specific/known) → zero article (general/plural/uncountable)",
    "gloss": "First mention vs known vs general",
    "items": [
      {
        "cue": "나는 발견했어 · 버그 하나를 · 그리고 · 그 버그가 · 막고 있어 · 결제 흐름을",
        "model": "I found a bug, and the bug is blocking the payment flow."
      },
      {
        "cue": "나는 정말 좋아해 · 좋은 문서를",
        "model": "I really love good documentation."
      },
      {
        "cue": "우리는 필요해 · 디자이너 한 명이 · 그리고 · 그 디자이너는 · 또한 알아야 해 · 프론트엔드를",
        "model": "We need a designer, and the designer should also know frontend."
      }
    ]
  },
  {
    "id": "articles-some-vs-any",
    "category": "articles",
    "frame": "some (positive statements / offers) ↔ any (negatives / questions)",
    "gloss": "some in positives/offers, any in neg/questions",
    "items": [
      {
        "cue": "나는 발견했어 · 에러 몇 개를 · 로그에서",
        "model": "I found some errors in the logs."
      },
      {
        "cue": "나는 못 받았어 · 어떤 피드백도 · 그 PR에 대해",
        "model": "I didn't get any feedback on that PR."
      },
      {
        "cue": "너 가지고 있어 · 어떤 질문이라도 · 이 함수에 대해",
        "model": "Do you have any questions about this function?"
      }
    ]
  },
  {
    "id": "articles-much-vs-many",
    "category": "articles",
    "frame": "much + uncountable ↔ many + countable plural",
    "gloss": "much for uncountable, many for countable",
    "items": [
      {
        "cue": "나는 썼어 · 너무 많은 시간을 · 디버깅하는 데 · 이걸",
        "model": "I spent too much time debugging this."
      },
      {
        "cue": "있어 · 너무 많은 알려진 이슈가 · 이번 릴리스에",
        "model": "There are too many known issues in this release."
      },
      {
        "cue": "우리는 없어 · 많은 회의가 · 이번 스프린트에",
        "model": "We don't have many meetings this sprint."
      }
    ]
  },
  {
    "id": "articles-few-little",
    "category": "articles",
    "frame": "a few/a little (some, positive) ↔ few/little (almost none, negative) — few + countable, little + uncountable",
    "gloss": "'a few/a little' = some; 'few/little' = barely any",
    "items": [
      {
        "cue": "있어 · 작은 버그 몇 개가 · 고쳐야 할 · 우리가 배포하기 전에",
        "model": "There are a few small bugs to fix before we deploy."
      },
      {
        "cue": "우리는 가지고 있어 · 거의 없는 시간을 · 남은 · 끝내기엔 · 이 태스크를",
        "model": "We have little time left to finish this task."
      },
      {
        "cue": "거의 없는 사람만 · 이해해 · 이 레거시 코드를",
        "model": "Few people understand this legacy code."
      }
    ]
  },
  {
    "id": "articles-each-every",
    "category": "articles",
    "frame": "each/every + singular noun + singular verb",
    "gloss": "each = individually; every = all together",
    "items": [
      {
        "cue": "모든 풀 리퀘스트는 · 필요로 해 · 리뷰를 · 그게 병합되기 전에",
        "model": "Every pull request needs a review before it gets merged."
      },
      {
        "cue": "각 서비스는 · 가지고 있어 · 자기만의 데이터베이스를",
        "model": "Each service has its own database."
      },
      {
        "cue": "나는 참석해 · 스탠드업 미팅에 · 매일 아침",
        "model": "I attend the standup meeting every morning."
      }
    ]
  },
  {
    "id": "articles-all-most-none-of",
    "category": "articles",
    "frame": "all/most/none of + the/my/these + plural noun",
    "gloss": "quantifier + 'of the' for a specific group",
    "items": [
      {
        "cue": "모든 테스트가 · 통과해 · 로컬에서",
        "model": "All of the tests pass locally."
      },
      {
        "cue": "우리 서비스 대부분은 · 돌아가 · 컨테이너에서",
        "model": "Most of our services run in containers."
      },
      {
        "cue": "어느 것도 아니야 · 해결책 중 · 내가 시도해 본 · 작동한 게",
        "model": "None of the solutions I tried worked."
      }
    ]
  },
  {
    "id": "collocations-depend-on",
    "category": "collocations",
    "frame": "___ depends on ___",
    "gloss": "X is determined by Y",
    "items": [
      {
        "cue": "그건 달려 있어 · 얼마나 많은 트래픽을 · 우리가 받느냐에",
        "model": "It depends on how much traffic we get."
      },
      {
        "cue": "그 출시 날짜는 달려 있어 · 언제 · QA가 마무리되느냐에",
        "model": "The release date depends on when QA wraps up."
      },
      {
        "cue": "우리 팀은 의존해 · 너무 과하게 · 그 외부 API에",
        "model": "Our team depends too heavily on that external API."
      }
    ]
  },
  {
    "id": "collocations-deal-with",
    "category": "collocations",
    "frame": "deal with ___",
    "gloss": "handle a problem/person/situation",
    "items": [
      {
        "cue": "나는 처리할게 · 그 버그를 · 나중에",
        "model": "I'll deal with that bug later."
      },
      {
        "cue": "나는 정신없이 바빠 · 대처하느라 · 운영 장애를 · 지금",
        "model": "I'm swamped dealing with a production outage right now."
      },
      {
        "cue": "상대하는 건 · 까다로운 고객들을 · 결코 쉽지 않아",
        "model": "Dealing with difficult clients is never easy."
      }
    ]
  },
  {
    "id": "collocations-consist-of",
    "category": "collocations",
    "frame": "___ consists of ___",
    "gloss": "is made up of these parts",
    "items": [
      {
        "cue": "우리 팀은 구성돼 있어 · 다섯 명의 엔지니어로",
        "model": "Our team consists of five engineers."
      },
      {
        "cue": "그 파이프라인은 구성돼 있어 · 세 단계로",
        "model": "The pipeline consists of three stages."
      },
      {
        "cue": "그 강좌는 구성돼 있어 · 강의와 · 실습 과제로",
        "model": "The course consists of lectures and hands-on assignments."
      }
    ]
  },
  {
    "id": "collocations-result-in",
    "category": "collocations",
    "frame": "___ resulted in ___",
    "gloss": "X caused/led to outcome Y",
    "items": [
      {
        "cue": "그 변경은 초래했어 · 약간의 다운타임을",
        "model": "The change resulted in some downtime."
      },
      {
        "cue": "그 메모리 누수는 · 결국 초래했어 · 서버 충돌을",
        "model": "The memory leak eventually resulted in a server crash."
      },
      {
        "cue": "그 리팩토링은 가져왔어 · 큰 개선을 · 응답 시간에서",
        "model": "The refactor resulted in a big improvement in response times."
      }
    ]
  },
  {
    "id": "collocations-apply-for",
    "category": "collocations",
    "frame": "apply for ___",
    "gloss": "formally request a job/spot/permit",
    "items": [
      {
        "cue": "나는 지원했어 · 시니어 엔지니어 자리에",
        "model": "I applied for the senior engineer position."
      },
      {
        "cue": "나는 계획 중이야 · 지원하는 걸 · 비자를 · 내년에",
        "model": "I'm planning to apply for a visa next year."
      },
      {
        "cue": "나는 생각 중이야 · 지원하는 걸 · 발표 시간에 · 그 컨퍼런스에서",
        "model": "I'm thinking about applying for a speaking slot at the conference."
      }
    ]
  },
  {
    "id": "collocations-focus-on",
    "category": "collocations",
    "frame": "focus on ___",
    "gloss": "concentrate effort/attention on",
    "items": [
      {
        "cue": "집중하자 · 성능에 · 이번 스프린트에",
        "model": "Let's focus on performance this sprint."
      },
      {
        "cue": "우리는 집중해야 해 · 버그 고치는 데에 · 기능을 추가하기보다는",
        "model": "We should focus on fixing bugs rather than adding features."
      },
      {
        "cue": "지금은 · 나는 집중하고 싶어 · 오직 · 핵심 사용자 경험에만",
        "model": "Right now I want to focus only on the core user experience."
      }
    ]
  },
  {
    "id": "collocations-be-good-at",
    "category": "collocations",
    "frame": "be good at ___",
    "gloss": "skilled at a thing/activity",
    "items": [
      {
        "cue": "그는 정말 잘해 · 디버깅하는 걸 · 까다로운 문제들을",
        "model": "He's really good at debugging tricky issues."
      },
      {
        "cue": "나는 별로 잘 못해 · 견적 내는 걸",
        "model": "I'm not very good at estimating."
      },
      {
        "cue": "우리 PM은 잘해 · 우선순위 정하는 걸",
        "model": "Our PM is good at setting priorities."
      }
    ]
  },
  {
    "id": "collocations-be-worried-about",
    "category": "collocations",
    "frame": "be worried about ___",
    "gloss": "anxious about something",
    "items": [
      {
        "cue": "나는 걱정돼 · 다운타임이 · 이 마이그레이션 동안의",
        "model": "I'm worried about the downtime during this migration."
      },
      {
        "cue": "나는 걱정돼 · 마감을 놓치는 게",
        "model": "I'm worried about missing the deadline."
      },
      {
        "cue": "나는 걱정돼 · 어떻게 · 이 변경이 · 다른 팀들에 영향을 주는지가",
        "model": "I'm worried about how this change affects the other teams."
      }
    ]
  },
  {
    "id": "collocations-be-interested-in",
    "category": "collocations",
    "frame": "be interested in ___",
    "gloss": "curious/keen about something",
    "items": [
      {
        "cue": "나는 정말 관심 있어 · 분산 시스템에",
        "model": "I'm really interested in distributed systems."
      },
      {
        "cue": "나는 관심 있어 · 기여하는 데에 · 그 오픈소스 프로젝트에",
        "model": "I'm interested in contributing to that open-source project."
      },
      {
        "cue": "너 관심 있어? · 옮겨 가는 데에 · 백엔드 쪽으로",
        "model": "Are you interested in moving over to the backend side?"
      }
    ]
  },
  {
    "id": "collocations-be-responsible-for",
    "category": "collocations",
    "frame": "be responsible for ___",
    "gloss": "in charge of / accountable for",
    "items": [
      {
        "cue": "나는 책임지고 있어 · 결제 서비스를",
        "model": "I'm responsible for the payment service."
      },
      {
        "cue": "이 팀은 책임지고 있어 · 배포 파이프라인을",
        "model": "This team is responsible for the deployment pipeline."
      },
      {
        "cue": "우리는 아직 확실치 않아 · 무엇이 원인이었는지 · 어젯밤 장애의",
        "model": "We're still not sure what was responsible for last night's outage."
      }
    ]
  },
  {
    "id": "collocations-look-forward-to",
    "category": "collocations",
    "frame": "look forward to + -ing",
    "gloss": "eagerly anticipate (always -ing)",
    "items": [
      {
        "cue": "나는 기대하고 있어 · 함께 일하는 걸 · 너와",
        "model": "I'm looking forward to working with you."
      },
      {
        "cue": "나는 기대하고 있어 · 출시하는 걸 · 이 기능을",
        "model": "I'm looking forward to shipping this feature."
      },
      {
        "cue": "나는 기대해 · 듣기를 · 네 피드백을",
        "model": "I look forward to hearing your feedback."
      }
    ]
  },
  {
    "id": "reactions-no-wonder",
    "category": "reactions",
    "frame": "No wonder ___",
    "gloss": "that explains it! (a realization)",
    "items": [
      {
        "cue": "어쩐지 · 그게 그렇게 느린 게 당연하네",
        "model": "No wonder it's so slow."
      },
      {
        "cue": "어쩐지 · 네가 피곤한 게 당연하네",
        "model": "No wonder you're tired."
      },
      {
        "cue": "어쩐지 · 그게 작동 안 한 게 당연하네",
        "model": "No wonder it didn't work."
      }
    ]
  },
  {
    "id": "reactions-the-thing-is",
    "category": "reactions",
    "frame": "The thing is, ___",
    "gloss": "here's the real issue / the catch",
    "items": [
      {
        "cue": "문제는 말이야 · 나한테 시간이 없어",
        "model": "The thing is, I don't have time."
      },
      {
        "cue": "문제는 말이야 · 그게 그렇게 간단하지 않아",
        "model": "The thing is, it's not that simple."
      },
      {
        "cue": "문제는 말이야 · 아무도 몰라 · 그 코드를",
        "model": "The thing is, nobody knows that code."
      }
    ]
  },
  {
    "id": "reactions-it-turns-out",
    "category": "reactions",
    "frame": "It turns out (that) ___",
    "gloss": "what you found out later",
    "items": [
      {
        "cue": "알고 보니 · 그게 내 잘못이었어",
        "model": "It turns out it was my fault."
      },
      {
        "cue": "알고 보니 · 그게 이미 고쳐져 있었어",
        "model": "It turns out it was already fixed."
      },
      {
        "cue": "알고 보니 · 그가 맞았어",
        "model": "It turns out he was right."
      }
    ]
  },
  {
    "id": "reactions-cant-believe",
    "category": "reactions",
    "frame": "I can't believe ___",
    "gloss": "react to something surprising",
    "items": [
      {
        "cue": "믿을 수가 없어 · 그게 진짜 작동했다는 게",
        "model": "I can't believe it actually worked."
      },
      {
        "cue": "믿을 수가 없어 · 네가 그걸 기억했다는 게",
        "model": "I can't believe you remembered that."
      },
      {
        "cue": "믿을 수가 없어 · 벌써 금요일이라는 게",
        "model": "I can't believe it's Friday already."
      }
    ]
  },
  {
    "id": "opinions-id-say",
    "category": "opinions",
    "frame": "I'd say ___",
    "gloss": "give an opinion, softly",
    "items": [
      {
        "cue": "내 생각엔 · 그게 걸릴 거야 · 약 한 시간",
        "model": "I'd say it'll take about an hour."
      },
      {
        "cue": "내 생각엔 · 그건 그럴 가치가 있어",
        "model": "I'd say it's worth it."
      },
      {
        "cue": "내 생각엔 · 우리 거의 다 했어",
        "model": "I'd say we're almost done."
      }
    ]
  },
  {
    "id": "opinions-it-depends-on",
    "category": "opinions",
    "frame": "It depends on ___",
    "gloss": "the answer isn't fixed — it varies",
    "items": [
      {
        "cue": "그건 달려 있어 · 그 트래픽에",
        "model": "It depends on the traffic."
      },
      {
        "cue": "그건 달려 있어 · 누구에게 · 네가 묻느냐에",
        "model": "It depends on who you ask."
      },
      {
        "cue": "그건 달려 있어 · 얼마나 많은 시간을 · 우리가 가지고 있느냐에",
        "model": "It depends on how much time we have."
      }
    ]
  },
  {
    "id": "opinions-not-sure-if",
    "category": "opinions",
    "frame": "I'm not sure if ___",
    "gloss": "express uncertainty",
    "items": [
      {
        "cue": "나는 확신이 안 서 · 이게 맞는지",
        "model": "I'm not sure if this is right."
      },
      {
        "cue": "나는 확신이 안 서 · 그가 오는지",
        "model": "I'm not sure if he's coming."
      },
      {
        "cue": "나는 확신이 안 서 · 내가 그걸 저장했는지",
        "model": "I'm not sure if I saved it."
      }
    ]
  }
];

export const PATTERN_CATEGORIES = [
  "questions", "asfamily", "comparatives", "relatives", "tense", "conditionals",
  "modals", "verbpatterns", "connectors", "passive", "articles", "collocations",
  "reactions", "opinions",
] as const;
