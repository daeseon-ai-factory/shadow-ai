// Curated high-frequency English sentence patterns for daily drilling — the foundational-
// but-always-confusing frames a Korean developer needs: questions (incl. indirect), the "as"
// family, comparatives, relative clauses, tense/aspect, conditionals, modals, verb patterns,
// connectors, passive, articles, collocations, plus reactions & opinions. Each pattern is a
// fixed frame + items pairing a Korean cue (the meaning to express) with one idiomatic English
// model. Authored in parallel per category and reviewed for accuracy — nothing fabricated.
// The drill prompts in Korean; you produce the English out loud.

export interface PatternItem {
  cue: string; // Korean meaning to express (the drill prompt)
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
        "cue": "이 PR 벌써 리뷰했어요?",
        "model": "Did you already review this PR?"
      },
      {
        "cue": "스테이징에 배포해 봤어요?",
        "model": "Have you deployed it to staging yet?"
      },
      {
        "cue": "지금 그 버그 작업 중이에요?",
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
        "cue": "이 함수 왜 멈췄어요?",
        "model": "Why did this function break?"
      },
      {
        "cue": "그 로그 어디다 저장해요?",
        "model": "Where do you store those logs?"
      },
      {
        "cue": "데모 언제 시작해요?",
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
        "cue": "이 빌드 도는 데 얼마나 걸려요?",
        "model": "How long does this build take?"
      },
      {
        "cue": "프로덕션 배포는 얼마나 자주 해요?",
        "model": "How often do you deploy to production?"
      },
      {
        "cue": "어쩌다가 테스트가 통과한 거예요?",
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
        "cue": "이 설정 파일이 어디 있는지 아세요?",
        "model": "Do you know where this config file is?"
      },
      {
        "cue": "배포가 왜 실패했는지 알려줄 수 있어요?",
        "model": "Can you tell me why the deploy failed?"
      },
      {
        "cue": "회의가 몇 시에 시작하는지 아세요?",
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
        "cue": "이 테스트 통과하는 거 맞죠?",
        "model": "This test passes, doesn't it?"
      },
      {
        "cue": "이미 머지했죠, 그렇죠?",
        "model": "You already merged it, right?"
      },
      {
        "cue": "이거 프로덕션에서 돌아가는 거 아니죠?",
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
        "cue": "누가 빌드 깨뜨렸어요?",
        "model": "Who broke the build?"
      },
      {
        "cue": "이거 누구한테 전화했어요?",
        "model": "Who did you call about this?"
      },
      {
        "cue": "뭐가 이 에러를 일으켰어요?",
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
        "cue": "이 버그 가능한 한 빨리 고쳐주세요.",
        "model": "Please fix this bug as soon as possible."
      },
      {
        "cue": "PR 설명은 최대한 자세하게 써주세요.",
        "model": "Write the PR description in as much detail as possible."
      },
      {
        "cue": "스탠드업에서는 최대한 간단하게 말해 주세요.",
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
        "cue": "이거 보기보다 어렵지 않아요.",
        "model": "It's not as hard as it looks."
      },
      {
        "cue": "새 API가 우리가 기대했던 만큼 빠르지는 않네요.",
        "model": "The new API isn't as fast as we'd hoped."
      },
      {
        "cue": "이번 릴리스는 지난번만큼 위험하지 않아요.",
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
        "cue": "내가 아는 한 그 엔드포인트는 아직 쓰이고 있어요.",
        "model": "As far as I know, that endpoint is still in use."
      },
      {
        "cue": "내가 알기로는 아무도 그 서비스 안 건드렸어요.",
        "model": "As far as I know, nobody has touched that service."
      },
      {
        "cue": "제 입장에선 이 PR은 머지해도 돼요.",
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
        "cue": "테스트만 통과하면 배포해도 돼요.",
        "model": "You can deploy as long as the tests pass."
      },
      {
        "cue": "백업만 있으면 마이그레이션 진행해도 괜찮아요.",
        "model": "We can run the migration as long as we have a backup."
      },
      {
        "cue": "서버가 켜져 있는 동안에는 로그가 계속 쌓여요.",
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
        "cue": "이건 모바일뿐 아니라 데스크톱에서도 돼요.",
        "model": "This works on desktop as well as mobile."
      },
      {
        "cue": "우리는 단위 테스트뿐 아니라 통합 테스트도 작성해야 해요.",
        "model": "We need to write integration tests as well as unit tests."
      },
      {
        "cue": "그 변경, 스테이징에도 같이 적용해 주세요.",
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
        "cue": "이 함수는 예전 함수랑 똑같은 결과를 반환해요.",
        "model": "This function returns the same result as the old one."
      },
      {
        "cue": "스테이징은 프로덕션이랑 같은 설정을 써요.",
        "model": "Staging uses the same config as production."
      },
      {
        "cue": "에러가 어제랑 똑같아요.",
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
        "cue": "마치 캐시가 전혀 안 비워진 것 같아요.",
        "model": "It's as if the cache never cleared at all."
      },
      {
        "cue": "그는 마치 그 코드를 직접 짠 것처럼 설명하더라고요.",
        "model": "He explained it as though he'd written the code himself."
      },
      {
        "cue": "서버가 마치 요청을 무시하는 것처럼 굴어요.",
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
        "cue": "이 새 라이브러리가 우리가 쓰던 것보다 빨라요.",
        "model": "This new library is faster than the one we were using."
      },
      {
        "cue": "이번 릴리스가 지난번보다 훨씬 더 복잡해요.",
        "model": "This release is more complicated than the last one."
      },
      {
        "cue": "그 접근 방식이 처음 생각했던 것보다 덜 위험해요.",
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
        "cue": "이게 우리 코드베이스에서 가장 느린 쿼리예요.",
        "model": "This is the slowest query in our codebase."
      },
      {
        "cue": "그게 올해 우리가 내린 가장 중요한 결정이었어요.",
        "model": "That was the most important decision we made this year."
      },
      {
        "cue": "그 버그가 내가 지금까지 디버깅한 것 중 제일 까다로웠어요.",
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
        "cue": "연습하면 할수록 더 나아져요.",
        "model": "The more you practice, the better you get."
      },
      {
        "cue": "PR이 작을수록 리뷰하기 더 쉬워요.",
        "model": "The smaller the PR, the easier it is to review."
      },
      {
        "cue": "오래 기다릴수록 마이그레이션이 더 힘들어져요.",
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
        "cue": "새 서버가 예전 것보다 두 배 빨라요.",
        "model": "The new server is twice as fast as the old one."
      },
      {
        "cue": "그 작업은 우리가 예상한 것보다 세 배 더 걸렸어요.",
        "model": "That task took three times as long as we expected."
      },
      {
        "cue": "이 캐시는 메모리를 예전 방식의 절반만 써요.",
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
        "cue": "리팩토링 후에 코드가 훨씬 더 깔끔해졌어요.",
        "model": "The code is much cleaner after the refactor."
      },
      {
        "cue": "이 방식이 일일이 손으로 하는 것보다 훨씬 더 안정적이에요.",
        "model": "This approach is far more reliable than doing it by hand."
      },
      {
        "cue": "새 빌드 파이프라인이 예전 것보다 엄청 빨라요.",
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
        "cue": "메인 브랜치를 망가뜨린 커밋을 되돌렸어요.",
        "model": "I reverted the commit that broke the main branch."
      },
      {
        "cue": "이 PR을 리뷰한 엔지니어가 휴가 중이에요.",
        "model": "The engineer who reviewed this PR is on vacation."
      },
      {
        "cue": "우리가 의존하던 라이브러리가 더 이상 관리되지 않아요.",
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
        "cue": "PR이 메인을 망가뜨린 개발자가 지금 고치고 있어요.",
        "model": "The dev whose PR broke main is fixing it now."
      },
      {
        "cue": "비밀번호가 유출된 사용자들에게 이메일을 보냈어요.",
        "model": "We emailed the users whose passwords were leaked."
      },
      {
        "cue": "테스트가 계속 실패하는 그 서비스를 다시 봐야 해요.",
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
        "cue": "이게 바로 그 버그가 발생하는 곳이에요.",
        "model": "This is the place where the bug happens."
      },
      {
        "cue": "배포가 항상 깨지는 그 순간이 바로 트래픽이 몰릴 때예요.",
        "model": "The moment when the deploy always breaks is when traffic spikes."
      },
      {
        "cue": "그게 우리가 그 프레임워크로 바꾼 이유예요.",
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
        "cue": "그게 바로 내가 줄곧 말하던 거예요.",
        "model": "That's exactly what I've been saying all along."
      },
      {
        "cue": "내가 이해 못 하는 건 왜 이 테스트가 로컬에서만 통과하느냐는 거예요.",
        "model": "What I don't understand is why this test only passes locally."
      },
      {
        "cue": "필요한 걸 말해 주면 내가 만들어 줄게요.",
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
        "cue": "내가 너한테 말했던 그 버그 아직 안 고쳐졌어요.",
        "model": "The bug I told you about still isn't fixed."
      },
      {
        "cue": "우리가 작업하던 그 기능이 취소됐어요.",
        "model": "The feature we were working on got cancelled."
      },
      {
        "cue": "내가 의지하던 그 동료가 팀을 떠났어요.",
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
        "cue": "빌드가 깨졌는데, 그건 오늘 배포 못 한다는 뜻이에요.",
        "model": "The build is broken, which means we can't deploy today."
      },
      {
        "cue": "그 사람이 PR을 바로 승인해 줬는데, 그건 그 사람답지 않은 일이에요.",
        "model": "He approved the PR right away, which is unusual for him."
      },
      {
        "cue": "테스트가 다 통과했는데, 그건 우리가 출시해도 된다는 뜻이에요.",
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
        "cue": "그 버그 이미 고쳤어요.",
        "model": "I've already fixed that bug."
      },
      {
        "cue": "어제 그 버그 고쳤어요.",
        "model": "I fixed that bug yesterday."
      },
      {
        "cue": "우리 그 라이브러리는 한 번도 안 써봤어요.",
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
        "cue": "이 버그를 세 시간째 디버깅하고 있어요.",
        "model": "I've been debugging this bug for three hours."
      },
      {
        "cue": "오늘 아침부터 배포를 기다리고 있어요.",
        "model": "I've been waiting for the deploy since this morning."
      },
      {
        "cue": "2020년부터 자바로 일해 왔어요.",
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
        "cue": "예전엔 자바스크립트를 썼었어요. (지금은 아니고)",
        "model": "I used to work in JavaScript."
      },
      {
        "cue": "저는 코드 리뷰 받는 거에 익숙해요.",
        "model": "I'm used to getting my code reviewed."
      },
      {
        "cue": "원격으로 일하는 거에 점점 익숙해지고 있어요.",
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
        "cue": "오늘 오후에 그 PR 리뷰할 거예요. (계획되어 있음)",
        "model": "I'm going to review that PR this afternoon."
      },
      {
        "cue": "알겠어요, 제가 지금 고칠게요.",
        "model": "Okay, I'll fix it right now."
      },
      {
        "cue": "곧 빌드 깨질 것 같은데요. (조짐이 보임)",
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
        "cue": "내가 회의에 들어갔을 땐 이미 배포가 끝나 있었어요.",
        "model": "By the time I joined the meeting, the deploy had already finished."
      },
      {
        "cue": "그가 픽스를 푸시했을 땐 내가 이미 그 부분을 고친 뒤였어요.",
        "model": "By the time he pushed his fix, I had already fixed that part."
      },
      {
        "cue": "내가 로그를 확인했을 땐 서버가 이미 죽어 있었어요.",
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
        "cue": "테스트가 통과하면 오늘 오후에 배포할게요.",
        "model": "If the tests pass, we'll deploy this afternoon."
      },
      {
        "cue": "지금 머지하면 충돌이 날 거예요.",
        "model": "If you merge now, you'll get a conflict."
      },
      {
        "cue": "캐시를 안 비우면 옛날 빌드가 보일 거예요.",
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
        "cue": "나라면 그 PR을 작은 단위로 쪼갤 텐데.",
        "model": "If I were you, I'd split that PR into smaller chunks."
      },
      {
        "cue": "권한이 있으면 직접 롤백할 텐데.",
        "model": "If I had access, I'd roll it back myself."
      },
      {
        "cue": "회의가 더 적으면 훨씬 더 많이 끝낼 수 있을 텐데.",
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
        "cue": "내가 로그를 확인했으면 그 버그를 더 빨리 잡았을 텐데.",
        "model": "If I had checked the logs, I would have caught that bug sooner."
      },
      {
        "cue": "우리가 더 일찍 테스트를 짰으면 그 사고를 막았을 텐데.",
        "model": "If we had written tests earlier, we would have prevented that outage."
      },
      {
        "cue": "네가 나한테 말했으면 내가 도와줬을 텐데.",
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
        "cue": "이 코드베이스에 문서가 좀 더 있으면 좋을 텐데.",
        "model": "I wish this codebase had better documentation."
      },
      {
        "cue": "프로덕션에 직접 푸시하지 말 걸 그랬어.",
        "model": "I wish I hadn't pushed straight to production."
      },
      {
        "cue": "내가 그 미팅 전에 회의록을 읽었더라면.",
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
        "cue": "승인 두 개 받기 전에는 머지하지 마세요.",
        "model": "Don't merge unless you have two approvals."
      },
      {
        "cue": "긴급한 거 아니면 주말에는 배포 안 해요.",
        "model": "We don't deploy on weekends unless it's urgent."
      },
      {
        "cue": "다른 얘기 없으면 이대로 갈게요.",
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
        "cue": "테스트가 통과해도 누군가는 리뷰해야 해요.",
        "model": "Even if the tests pass, someone still needs to review it."
      },
      {
        "cue": "지금 시작해도 마감은 못 맞출 거예요.",
        "model": "Even if we start now, we won't make the deadline."
      },
      {
        "cue": "당신 말이 맞아도 이렇게 처리할 수는 없어요.",
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
        "cue": "배포 전에 DB 백업해 두세요, 혹시 모르니까.",
        "model": "Back up the database before the deploy, in case something goes wrong."
      },
      {
        "cue": "혹시 모르니 전 버전을 적어 둘게요.",
        "model": "I'll write down the previous version in case we need to roll back."
      },
      {
        "cue": "혹시 모르니까 그 로그 일단 저장해 둘게요.",
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
        "cue": "배포하기 전에 테스트를 돌렸어야 했는데.",
        "model": "I should have run the tests before deploying."
      },
      {
        "cue": "그 PR을 그렇게 빨리 머지하지 말았어야 했어.",
        "model": "I shouldn't have merged that PR so quickly."
      },
      {
        "cue": "처음부터 너한테 물어봤어야 했어.",
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
        "cue": "캐시 때문에 깨진 게 분명해.",
        "model": "It must have been the cache that broke it."
      },
      {
        "cue": "그 사람들이 우리 메시지를 못 봤을 리가 없어.",
        "model": "They can't have missed our message."
      },
      {
        "cue": "서버가 밤사이에 죽었던 게 틀림없어.",
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
        "cue": "타임아웃 때문이었을 수도 있어.",
        "model": "It might have been a timeout."
      },
      {
        "cue": "누군가 실수로 설정을 바꿨을 수도 있어.",
        "model": "Someone could have changed the config by accident."
      },
      {
        "cue": "그 버그를 훨씬 일찍 잡을 수도 있었는데.",
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
        "cue": "코드를 머지하기 전에 리뷰를 받아야 해.",
        "model": "You have to get a review before you merge your code."
      },
      {
        "cue": "지금 다 끝낼 필요는 없어.",
        "model": "You don't have to finish it all right now."
      },
      {
        "cue": "그 API 키를 절대 커밋하면 안 돼.",
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
        "cue": "이 함수는 null을 반환하면 안 되는데.",
        "model": "This function isn't supposed to return null."
      },
      {
        "cue": "우리 회의 10시에 하기로 했잖아.",
        "model": "We're supposed to meet at ten."
      },
      {
        "cue": "어제 이거 끝냈어야 했는데.",
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
        "cue": "배포하기 전에 백업해 두는 게 좋을 거야.",
        "model": "You'd better back it up before you deploy."
      },
      {
        "cue": "금요일에는 프로덕션에 손대지 않는 게 좋을 거야.",
        "model": "You'd better not touch production on a Friday."
      },
      {
        "cue": "곧 출발하는 게 좋을 거야, 안 그러면 기차 놓쳐.",
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
        "cue": "그 버그를 직접 고치기로 했어.",
        "model": "I decided to fix the bug myself."
      },
      {
        "cue": "테스트 작성 끝냈어요.",
        "model": "I finished writing the tests."
      },
      {
        "cue": "그 라이브러리 쓰는 거 피하려고 해.",
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
        "cue": "나 커피 마시려고 잠깐 멈췄어.",
        "model": "I stopped to grab a coffee."
      },
      {
        "cue": "그 옛날 라이브러리 쓰는 거 그만뒀어.",
        "model": "We stopped using that old library."
      },
      {
        "cue": "원인을 생각해 보려고 잠깐 멈췄어.",
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
        "cue": "배포하기 전에 환경변수 설정하는 거 잊지 마.",
        "model": "Remember to set the env variables before you deploy."
      },
      {
        "cue": "어제 그 PR 머지한 거 기억나.",
        "model": "I remember merging that PR yesterday."
      },
      {
        "cue": "퇴근하기 전에 서버 끄는 거 잊지 마세요.",
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
        "cue": "그 사람 때문에 코드 전체를 다시 쓰게 됐어.",
        "model": "He made me rewrite the whole thing."
      },
      {
        "cue": "스테이징에 먼저 배포하게 해 줘.",
        "model": "Let me deploy to staging first."
      },
      {
        "cue": "내가 인턴한테 로그 확인하라고 시킬게.",
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
        "cue": "팀장님이 그 기능 승인하게 만들었어.",
        "model": "I got the lead to approve the feature."
      },
      {
        "cue": "결국 테스트가 통과하게 만들었어.",
        "model": "I finally got the tests to pass."
      },
      {
        "cue": "그 사람이 PR 다시 리뷰하게 했어.",
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
        "cue": "오늘 안에 다 끝내자.",
        "model": "Let's get it done by the end of the day."
      },
      {
        "cue": "마침내 배포 파이프라인을 자동화했어.",
        "model": "We finally got the deploy pipeline automated."
      },
      {
        "cue": "노트북 수리 맡겼어.",
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
        "cue": "새 팀이랑 같이 일하는 거 기대돼요.",
        "model": "I'm looking forward to working with the new team."
      },
      {
        "cue": "나는 원격으로 일하는 거에 익숙해.",
        "model": "I'm used to working remotely."
      },
      {
        "cue": "이 레거시 코드 이해하는 데 애먹고 있어.",
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
        "cue": "이 버그는 너무 사소해서 따로 핫픽스를 낼 필요는 없어.",
        "model": "This bug is too minor to ship a separate hotfix for."
      },
      {
        "cue": "테스트 커버리지가 충분히 좋아서 자신 있게 배포할 수 있어.",
        "model": "The test coverage is good enough to deploy with confidence."
      },
      {
        "cue": "로그가 너무 많아서 진짜 에러를 찾을 수가 없었어.",
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
        "cue": "이 리팩터링은 코드를 더 빠르게 만들 뿐만 아니라 읽기도 더 쉽게 만들어.",
        "model": "This refactor not only makes the code faster but also makes it easier to read."
      },
      {
        "cue": "백엔드랑 프론트엔드 둘 다 그 변경의 영향을 받아.",
        "model": "Both the backend and the frontend are affected by that change."
      },
      {
        "cue": "지금 롤백하든지 아니면 패치를 빨리 내든지 둘 중 하나는 해야 해.",
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
        "cue": "테스트는 다 통과했지만, 그래도 프로덕션에서 깨졌어.",
        "model": "Although all the tests passed, it still broke in production."
      },
      {
        "cue": "경고가 떴는데도 그는 그냥 그대로 배포했어.",
        "model": "Despite the warning, he just deployed it anyway."
      },
      {
        "cue": "마감이 빡빡했음에도 우리는 제때 출시했어.",
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
        "cue": "캐시를 안 비워서 빌드가 실패한 거야.",
        "model": "The build failed because we didn't clear the cache."
      },
      {
        "cue": "트래픽 급증 때문에 서버가 다운됐어.",
        "model": "The server went down because of the traffic spike."
      },
      {
        "cue": "데드락이 있어서 데모를 미뤘어.",
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
        "cue": "이 PR을 오늘 머지할지 말지 아직 결정 못 했어.",
        "model": "I haven't decided whether or not to merge this PR today."
      },
      {
        "cue": "그 기능이 실제로 쓰이는지 안 쓰이는지 확인해 봐야 해.",
        "model": "We need to check whether that feature is actually being used or not."
      },
      {
        "cue": "지금 고치든 나중에 고치든, 어차피 누군가는 해야 할 일이야.",
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
        "cue": "이 모듈은 어제 배포됐어요.",
        "model": "This module was deployed yesterday."
      },
      {
        "cue": "회의가 다음 주로 미뤄졌어요.",
        "model": "The meeting was pushed to next week."
      },
      {
        "cue": "그 버그는 최신 릴리스에서 수정됐어요.",
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
        "cue": "그는 지난주에 해고됐어요.",
        "model": "He got fired last week."
      },
      {
        "cue": "내 PR이 결국 머지됐어요.",
        "model": "My PR finally got merged."
      },
      {
        "cue": "출근길에 차에 치일 뻔했어요.",
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
        "cue": "내 코드를 시니어한테 리뷰받았어요.",
        "model": "I got my code reviewed by a senior."
      },
      {
        "cue": "그거 내일까지 고쳐 놓을게요.",
        "model": "I'll have it fixed by tomorrow."
      },
      {
        "cue": "노트북 화면을 교체했어요.",
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
        "cue": "그 기능은 다른 팀이 만들었어요.",
        "model": "That feature was built by another team."
      },
      {
        "cue": "내 변경 사항이 매니저한테 승인됐어요.",
        "model": "My changes were approved by my manager."
      },
      {
        "cue": "그 결정은 CTO가 내렸어요.",
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
        "cue": "버그를 하나 발견했는데, 그 버그가 결제 흐름을 막고 있어요.",
        "model": "I found a bug, and the bug is blocking the payment flow."
      },
      {
        "cue": "저는 좋은 문서를 정말 좋아해요.",
        "model": "I really love good documentation."
      },
      {
        "cue": "우리한테 디자이너가 필요한데, 그 디자이너는 프론트엔드도 알아야 해요.",
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
        "cue": "로그에서 에러를 좀 발견했어요.",
        "model": "I found some errors in the logs."
      },
      {
        "cue": "그 PR에 대해서는 피드백이 전혀 없었어요.",
        "model": "I didn't get any feedback on that PR."
      },
      {
        "cue": "이 함수에 대해 질문 있으세요?",
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
        "cue": "이걸 디버깅하느라 시간을 너무 많이 썼어요.",
        "model": "I spent too much time debugging this."
      },
      {
        "cue": "이 릴리스에는 알려진 이슈가 너무 많아요.",
        "model": "There are too many known issues in this release."
      },
      {
        "cue": "이번 스프린트에는 미팅이 많지 않아요.",
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
        "cue": "배포 전에 고쳐야 할 작은 버그가 몇 개 있어요.",
        "model": "There are a few small bugs to fix before we deploy."
      },
      {
        "cue": "이 작업을 끝낼 시간이 거의 없어요.",
        "model": "We have little time left to finish this task."
      },
      {
        "cue": "이 레거시 코드를 이해하는 사람이 거의 없어요.",
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
        "cue": "모든 풀 리퀘스트는 머지 전에 리뷰가 필요해요.",
        "model": "Every pull request needs a review before it gets merged."
      },
      {
        "cue": "각 서비스는 자체 데이터베이스를 가지고 있어요.",
        "model": "Each service has its own database."
      },
      {
        "cue": "저는 매일 아침 스탠드업 미팅에 참석해요.",
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
        "cue": "테스트가 전부 로컬에서는 통과해요.",
        "model": "All of the tests pass locally."
      },
      {
        "cue": "우리 서비스 대부분은 컨테이너로 돌아가요.",
        "model": "Most of our services run in containers."
      },
      {
        "cue": "내가 시도한 해결책 중 어느 것도 효과가 없었어요.",
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
        "cue": "그건 트래픽이 얼마나 되느냐에 달려 있어요.",
        "model": "It depends on how much traffic we get."
      },
      {
        "cue": "배포 일정은 QA가 언제 끝나느냐에 달려 있어요.",
        "model": "The release date depends on when QA wraps up."
      },
      {
        "cue": "우리 팀은 그 외부 API에 너무 많이 의존하고 있어요.",
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
        "cue": "그 버그는 나중에 처리할게요.",
        "model": "I'll deal with that bug later."
      },
      {
        "cue": "지금 프로덕션 장애를 처리하느라 정신없어요.",
        "model": "I'm swamped dealing with a production outage right now."
      },
      {
        "cue": "까다로운 고객을 상대하는 건 절대 쉽지 않아요.",
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
        "cue": "우리 팀은 개발자 다섯 명으로 구성돼 있어요.",
        "model": "Our team consists of five engineers."
      },
      {
        "cue": "그 파이프라인은 세 단계로 이루어져 있어요.",
        "model": "The pipeline consists of three stages."
      },
      {
        "cue": "이 코스는 강의와 실습 과제로 구성돼 있어요.",
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
        "cue": "그 변경 때문에 다운타임이 발생했어요.",
        "model": "The change resulted in some downtime."
      },
      {
        "cue": "메모리 누수가 결국 서버 다운으로 이어졌어요.",
        "model": "The memory leak eventually resulted in a server crash."
      },
      {
        "cue": "리팩터링 덕분에 응답 시간이 크게 개선됐어요.",
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
        "cue": "저 그 시니어 개발자 자리에 지원했어요.",
        "model": "I applied for the senior engineer position."
      },
      {
        "cue": "내년에 비자를 신청할 계획이에요.",
        "model": "I'm planning to apply for a visa next year."
      },
      {
        "cue": "그 학회 발표 자리에 지원해 볼까 생각 중이에요.",
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
        "cue": "이번 스프린트에는 성능에 집중합시다.",
        "model": "Let's focus on performance this sprint."
      },
      {
        "cue": "기능 추가보다 버그 수정에 집중하는 게 좋겠어요.",
        "model": "We should focus on fixing bugs rather than adding features."
      },
      {
        "cue": "지금은 핵심 사용자 경험에만 집중하고 싶어요.",
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
        "cue": "그 친구는 복잡한 버그를 디버깅하는 데 정말 능숙해요.",
        "model": "He's really good at debugging tricky issues."
      },
      {
        "cue": "저는 추정을 잘 못해요.",
        "model": "I'm not very good at estimating."
      },
      {
        "cue": "우리 PM은 우선순위를 정하는 데 능숙해요.",
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
        "cue": "이 마이그레이션의 다운타임이 걱정돼요.",
        "model": "I'm worried about the downtime during this migration."
      },
      {
        "cue": "마감을 못 맞출까 봐 걱정이에요.",
        "model": "I'm worried about missing the deadline."
      },
      {
        "cue": "이 변경이 다른 팀에 미칠 영향이 걱정돼요.",
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
        "cue": "저는 분산 시스템에 관심이 많아요.",
        "model": "I'm really interested in distributed systems."
      },
      {
        "cue": "그 오픈소스 프로젝트에 기여하는 데 관심이 있어요.",
        "model": "I'm interested in contributing to that open-source project."
      },
      {
        "cue": "백엔드 쪽으로 옮기는 데 관심 있으세요?",
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
        "cue": "저는 결제 서비스를 담당하고 있어요.",
        "model": "I'm responsible for the payment service."
      },
      {
        "cue": "이 팀은 배포 파이프라인을 책임지고 있어요.",
        "model": "This team is responsible for the deployment pipeline."
      },
      {
        "cue": "어젯밤 장애의 원인이 뭔지 아직 모르겠어요.",
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
        "cue": "같이 일하게 되어 정말 기대돼요.",
        "model": "I'm looking forward to working with you."
      },
      {
        "cue": "이번 기능을 출시하는 게 기대돼요.",
        "model": "I'm looking forward to shipping this feature."
      },
      {
        "cue": "당신 피드백을 듣는 걸 기대하고 있을게요.",
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
        "cue": "어쩐지 이렇게 느리더라.",
        "model": "No wonder it's so slow."
      },
      {
        "cue": "어쩐지 피곤하더라.",
        "model": "No wonder you're tired."
      },
      {
        "cue": "어쩐지 안 되더라.",
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
        "cue": "근데 문제는 시간이 없다는 거야.",
        "model": "The thing is, I don't have time."
      },
      {
        "cue": "사실 그게 그렇게 간단하지가 않아.",
        "model": "The thing is, it's not that simple."
      },
      {
        "cue": "근데 아무도 그 코드 몰라.",
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
        "cue": "알고 보니 내 잘못이었어.",
        "model": "It turns out it was my fault."
      },
      {
        "cue": "알고 보니 그게 이미 고쳐져 있었어.",
        "model": "It turns out it was already fixed."
      },
      {
        "cue": "알고 보니 그가 맞았어.",
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
        "cue": "이게 진짜 됐다는 게 믿기지 않아.",
        "model": "I can't believe it actually worked."
      },
      {
        "cue": "네가 그걸 기억한다니 믿기지 않아.",
        "model": "I can't believe you remembered that."
      },
      {
        "cue": "벌써 금요일이라니.",
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
        "cue": "내 생각엔 한 시간쯤 걸릴 것 같아.",
        "model": "I'd say it'll take about an hour."
      },
      {
        "cue": "내 생각엔 그만한 가치가 있어.",
        "model": "I'd say it's worth it."
      },
      {
        "cue": "내 생각엔 거의 다 됐어.",
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
        "cue": "트래픽에 따라 달라.",
        "model": "It depends on the traffic."
      },
      {
        "cue": "누구한테 물어보느냐에 따라 달라.",
        "model": "It depends on who you ask."
      },
      {
        "cue": "얼마나 시간이 있느냐에 달렸어.",
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
        "cue": "이게 맞는지 모르겠어.",
        "model": "I'm not sure if this is right."
      },
      {
        "cue": "그가 올지 모르겠어.",
        "model": "I'm not sure if he's coming."
      },
      {
        "cue": "내가 그걸 저장했는지 모르겠어.",
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
