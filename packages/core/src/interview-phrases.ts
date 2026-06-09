// AUTO-GENERATED interview phrase + backend-code banks (short-form dev English for hardcore drilling).
// Source: interview-english-content + ui-interaction-bank + backend-content-banks workflows.

import { type CodeCard } from './interview-drill';

export interface PhraseCard { key: string; en: string; ko: string; example: string; situations: string[]; }
export interface Connector { key: string; en: string; ko: string; fn: string; example: string; }

export const PHRASAL_CARDS: PhraseCard[] = [
  {
    "key": "ph:spin-up",
    "en": "spin up",
    "ko": "(서버/서비스를) 띄우다, 새로 가동하다",
    "example": "Let's spin up a fresh container for that.",
    "situations": [
      "테스트용 서버를 새로 띄울 때",
      "새 환경을 빠르게 가동할 때",
      "워커 인스턴스를 추가한다고 설명할 때"
    ]
  },
  {
    "key": "ph:spin-down",
    "en": "spin down",
    "ko": "(리소스를) 내리다, 종료하다",
    "example": "We spin down idle workers to save cost.",
    "situations": [
      "유휴 인스턴스를 줄여 비용을 아낄 때",
      "트래픽이 빠지면 리소스를 줄일 때",
      "오토스케일링을 설명할 때"
    ]
  },
  {
    "key": "ph:roll-back",
    "en": "roll back",
    "ko": "이전 버전으로 되돌리다",
    "example": "If it breaks, we just roll back.",
    "situations": [
      "배포 후 장애가 나 되돌릴 때",
      "롤백 전략을 설명할 때",
      "마이그레이션을 취소해야 할 때"
    ]
  },
  {
    "key": "ph:roll-out",
    "en": "roll out",
    "ko": "(기능을) 점진적으로 배포하다",
    "example": "We roll it out to 5% first.",
    "situations": [
      "새 기능을 단계적으로 풀 때",
      "카나리 배포를 설명할 때",
      "전체 사용자에게 출시한다고 말할 때"
    ]
  },
  {
    "key": "ph:back-out",
    "en": "back out",
    "ko": "(변경을) 빼다, 되돌리다",
    "example": "Let's back out that change for now.",
    "situations": [
      "문제 있는 커밋을 빼야 할 때",
      "일단 변경을 되돌릴 때",
      "특정 변경만 제거할 때"
    ]
  },
  {
    "key": "ph:fall-back",
    "en": "fall back",
    "ko": "(대안으로) 돌아가다, 폴백하다",
    "example": "If cache misses, we fall back to DB.",
    "situations": [
      "캐시 미스 시 DB로 가는 흐름 설명",
      "주 경로 실패 시 대체 경로 설명",
      "기본값으로 처리한다고 말할 때"
    ]
  },
  {
    "key": "ph:walk-through",
    "en": "walk through",
    "ko": "(단계별로) 차근차근 설명하다",
    "example": "Let me walk you through the flow.",
    "situations": [
      "면접에서 코드 흐름을 설명할 때",
      "리뷰어에게 PR을 설명할 때",
      "온보딩 때 시스템을 안내할 때"
    ]
  },
  {
    "key": "ph:break-down",
    "en": "break down",
    "ko": "(문제/작업을) 잘게 쪼개다",
    "example": "Let me break this down into steps.",
    "situations": [
      "큰 문제를 작은 단계로 나눌 때",
      "시스템을 컴포넌트로 분해할 때",
      "태스크를 잘게 나눠 추정할 때"
    ]
  },
  {
    "key": "ph:dig-into",
    "en": "dig into",
    "ko": "(원인/코드를) 파헤치다, 조사하다",
    "example": "I'll dig into why it's slow.",
    "situations": [
      "버그 원인을 조사하기 시작할 때",
      "로그를 파고들어 분석할 때",
      "코드베이스를 깊이 살펴볼 때"
    ]
  },
  {
    "key": "ph:kick-off",
    "en": "kick off",
    "ko": "(작업을) 시작하다, 착수하다",
    "example": "Let's kick off the migration tonight.",
    "situations": [
      "배치 작업을 시작할 때",
      "프로젝트에 착수할 때",
      "파이프라인을 트리거할 때"
    ]
  },
  {
    "key": "ph:wire-up",
    "en": "wire up",
    "ko": "(컴포넌트를) 연결하다, 붙이다",
    "example": "I'll wire up the API to the UI.",
    "situations": [
      "프론트와 백엔드를 연결할 때",
      "핸들러를 라우터에 연결할 때",
      "의존성을 주입해 연결할 때"
    ]
  },
  {
    "key": "ph:tear-down",
    "en": "tear down",
    "ko": "(환경/리소스를) 정리하다, 헐다",
    "example": "We tear down the env after tests.",
    "situations": [
      "테스트 후 리소스를 정리할 때",
      "임시 스택을 제거할 때",
      "setup/teardown을 설명할 때"
    ]
  },
  {
    "key": "ph:lock-down",
    "en": "lock down",
    "ko": "(접근/범위를) 잠그다, 제한하다",
    "example": "Let's lock down write access.",
    "situations": [
      "권한을 엄격히 제한할 때",
      "릴리스 전 변경을 동결할 때",
      "보안 설정을 강화할 때"
    ]
  },
  {
    "key": "ph:ramp-up",
    "en": "ramp up",
    "ko": "(점차) 늘리다; (사람이) 적응하다",
    "example": "We ramp up traffic gradually.",
    "situations": [
      "트래픽을 점진적으로 늘릴 때",
      "신규 인원이 적응 중일 때",
      "부하를 단계적으로 올릴 때"
    ]
  },
  {
    "key": "ph:flesh-out",
    "en": "flesh out",
    "ko": "(개요를) 구체화하다, 살을 붙이다",
    "example": "Let's flesh out the API contract.",
    "situations": [
      "대략적인 설계를 구체화할 때",
      "스펙에 세부를 채워 넣을 때",
      "아이디어를 더 다듬을 때"
    ]
  },
  {
    "key": "ph:hash-out",
    "en": "hash out",
    "ko": "(논의해서) 정리하다, 합의를 보다",
    "example": "Let's hash out the edge cases.",
    "situations": [
      "엣지 케이스를 같이 따져볼 때",
      "트레이드오프를 논의할 때",
      "팀과 접근법을 합의할 때"
    ]
  },
  {
    "key": "ph:iron-out",
    "en": "iron out",
    "ko": "(문제를) 다듬다, 해결하다",
    "example": "We still need to iron out a few bugs.",
    "situations": [
      "남은 작은 버그들을 잡을 때",
      "세부 문제를 정리할 때",
      "출시 전 마지막 이슈를 다듬을 때"
    ]
  },
  {
    "key": "ph:factor-out",
    "en": "factor out",
    "ko": "(공통 코드를) 빼내다, 추출하다",
    "example": "Let's factor out this shared logic.",
    "situations": [
      "중복 코드를 공통 함수로 뺄 때",
      "리팩터링으로 모듈을 분리할 때",
      "반복되는 부분을 추출할 때"
    ]
  },
  {
    "key": "ph:pull-off",
    "en": "pull off",
    "ko": "(어려운 걸) 해내다, 성공시키다",
    "example": "We pulled it off with zero downtime.",
    "situations": [
      "무중단 마이그레이션을 성공시켰을 때",
      "빡빡한 마감을 해냈을 때",
      "까다로운 구현을 끝냈을 때"
    ]
  },
  {
    "key": "ph:run-into",
    "en": "run into",
    "ko": "(문제/에러에) 부딪히다, 마주치다",
    "example": "I ran into a race condition here.",
    "situations": [
      "예상 못한 버그를 만났을 때",
      "빌드 중 에러에 부딪혔을 때",
      "엣지 케이스에 걸렸을 때"
    ]
  },
  {
    "key": "ph:end-up",
    "en": "end up",
    "ko": "결국 ~하게 되다, ~로 귀결되다",
    "example": "We ended up using a queue.",
    "situations": [
      "여러 시도 끝에 결정한 방식을 말할 때",
      "결과적으로 어떻게 됐는지 설명할 때",
      "최종 선택의 이유를 말할 때"
    ]
  },
  {
    "key": "ph:come-up-with",
    "en": "come up with",
    "ko": "(아이디어/방안을) 생각해내다",
    "example": "I came up with a simpler approach.",
    "situations": [
      "더 나은 해결책을 떠올렸을 때",
      "면접에서 접근법을 제시할 때",
      "대안을 제안할 때"
    ]
  },
  {
    "key": "ph:sign-off-on",
    "en": "sign off on",
    "ko": "(최종) 승인하다",
    "example": "Who signs off on the release?",
    "situations": [
      "배포 승인자를 물을 때",
      "리뷰 최종 승인을 요청할 때",
      "결정 권한이 누구인지 확인할 때"
    ]
  },
  {
    "key": "ph:clean-up",
    "en": "clean up",
    "ko": "(코드/리소스를) 정리하다",
    "example": "I'll clean up the dead code.",
    "situations": [
      "사용 안 하는 코드를 지울 때",
      "리팩터링으로 정돈할 때",
      "리뷰 전에 깔끔하게 다듬을 때"
    ]
  },
  {
    "key": "ph:call-out",
    "en": "call out",
    "ko": "(문제/이슈를) 짚어 말하다",
    "example": "I want to call out one risk here.",
    "situations": [
      "리뷰에서 우려 지점을 짚을 때",
      "리스크를 명시적으로 알릴 때",
      "주의할 점을 강조할 때"
    ]
  },
  {
    "key": "ph:narrow-down",
    "en": "narrow down",
    "ko": "(후보/원인을) 좁히다",
    "example": "Let's narrow down the root cause.",
    "situations": [
      "버그 원인 범위를 좁힐 때",
      "후보 해법을 추릴 때",
      "문제 영역을 좁혀갈 때"
    ]
  },
  {
    "key": "ph:rule-out",
    "en": "rule out",
    "ko": "(가능성을) 배제하다",
    "example": "We can rule out the network.",
    "situations": [
      "원인 후보를 하나씩 제거할 때",
      "특정 가설을 배제할 때",
      "디버깅에서 범위를 좁힐 때"
    ]
  },
  {
    "key": "ph:track-down",
    "en": "track down",
    "ko": "(원인/버그를) 추적해 찾아내다",
    "example": "I tracked down the memory leak.",
    "situations": [
      "숨은 버그를 끝까지 추적했을 때",
      "문제 커밋을 찾아냈을 때",
      "원인을 집요하게 찾을 때"
    ]
  },
  {
    "key": "ph:figure-out",
    "en": "figure out",
    "ko": "(방법/원인을) 알아내다, 파악하다",
    "example": "Let me figure out the timing issue.",
    "situations": [
      "원인을 알아내려 할 때",
      "해결 방법을 궁리할 때",
      "어떻게 동작하는지 파악할 때"
    ]
  },
  {
    "key": "ph:lay-out",
    "en": "lay out",
    "ko": "(생각/구조를) 펼쳐 설명하다",
    "example": "Let me lay out my approach.",
    "situations": [
      "접근 방식을 정리해 말할 때",
      "면접에서 계획을 제시할 때",
      "구조를 명확히 설명할 때"
    ]
  },
  {
    "key": "ph:zoom-in",
    "en": "zoom in",
    "ko": "(한 부분을) 확대해서 보다",
    "example": "Let's zoom in on this function.",
    "situations": [
      "특정 함수를 집중해 볼 때",
      "세부 구현으로 들어갈 때",
      "면접관이 한 곳을 더 보자 할 때"
    ]
  },
  {
    "key": "ph:zoom-out",
    "en": "zoom out",
    "ko": "(전체를) 큰 그림으로 보다",
    "example": "Let's zoom out to the big picture.",
    "situations": [
      "세부에서 전체 맥락으로 돌아갈 때",
      "아키텍처 차원으로 올라갈 때",
      "우선순위를 재정렬할 때"
    ]
  },
  {
    "key": "ph:swap-out",
    "en": "swap out",
    "ko": "(부품/구현을) 교체하다",
    "example": "We can swap out the cache later.",
    "situations": [
      "구현을 다른 걸로 갈아낄 때",
      "의존성을 교체할 때",
      "컴포넌트를 대체할 때"
    ]
  },
  {
    "key": "ph:phase-out",
    "en": "phase out",
    "ko": "(점차) 단계적으로 폐기하다",
    "example": "We're phasing out the old API.",
    "situations": [
      "구버전을 점진적으로 폐기할 때",
      "레거시를 단계적으로 걷어낼 때",
      "마이그레이션 후 정리할 때"
    ]
  },
  {
    "key": "ph:flag",
    "en": "flag",
    "ko": "(주의할 점을) 짚어 표시하다",
    "example": "I'll flag this for review.",
    "situations": [
      "검토 필요 항목을 표시할 때",
      "우려를 미리 알릴 때",
      "리뷰어에게 주의를 환기할 때"
    ]
  },
  {
    "key": "ph:punt-on",
    "en": "punt on",
    "ko": "(결정/작업을) 일단 미루다, 보류하다",
    "example": "Let's punt on caching for now.",
    "situations": [
      "지금은 다루지 않기로 할 때",
      "범위 밖으로 미룰 때",
      "나중에 결정하기로 할 때"
    ]
  },
  {
    "key": "ph:loop-in",
    "en": "loop in",
    "ko": "(사람을) 논의에 참여시키다",
    "example": "Let's loop in the infra team.",
    "situations": [
      "관련 팀을 끌어들일 때",
      "의사결정에 사람을 포함할 때",
      "담당자를 합류시킬 때"
    ]
  },
  {
    "key": "ph:reach-out",
    "en": "reach out",
    "ko": "(먼저) 연락하다, 문의하다",
    "example": "I'll reach out to the on-call.",
    "situations": [
      "담당자에게 연락할 때",
      "도움을 요청할 때",
      "외부 팀에 문의할 때"
    ]
  },
  {
    "key": "ph:ship-out",
    "en": "ship out",
    "ko": "(릴리스를) 내보내다, 출시하다",
    "example": "Let's ship this out today.",
    "situations": [
      "오늘 배포하기로 할 때",
      "기능을 사용자에게 내보낼 때",
      "릴리스를 마무리할 때"
    ]
  },
  {
    "key": "ph:cut-over",
    "en": "cut over",
    "ko": "(새 시스템으로) 전환하다",
    "example": "We cut over to the new DB Friday.",
    "situations": [
      "새 시스템으로 전면 전환할 때",
      "트래픽을 새 경로로 옮길 때",
      "마이그레이션 최종 단계 설명"
    ]
  },
  {
    "key": "ph:sync-up",
    "en": "sync up",
    "ko": "(상태를) 맞추다; 잠깐 회의하다",
    "example": "Let's sync up after lunch.",
    "situations": [
      "짧게 진행 상황을 맞출 때",
      "팀과 정렬할 때",
      "상태를 동기화할 때"
    ]
  },
  {
    "key": "ph:circle-back",
    "en": "circle back",
    "ko": "(나중에) 다시 다루다, 돌아오다",
    "example": "Let's circle back on that later.",
    "situations": [
      "지금 안 되는 주제를 미룰 때",
      "나중에 재논의할 때",
      "우선 다른 걸 먼저 할 때"
    ]
  },
  {
    "key": "ph:nail-down",
    "en": "nail down",
    "ko": "(세부를) 확정하다, 못박다",
    "example": "Let's nail down the requirements.",
    "situations": [
      "요구사항을 확정할 때",
      "모호한 부분을 명확히 할 때",
      "합의를 못박을 때"
    ]
  },
  {
    "key": "ph:sort-out",
    "en": "sort out",
    "ko": "(문제를) 정리하다, 해결하다",
    "example": "I'll sort out the merge conflicts.",
    "situations": [
      "머지 충돌을 정리할 때",
      "엉킨 문제를 해결할 때",
      "순서를 정돈할 때"
    ]
  }
];

export const EXPR_CARDS: PhraseCard[] = [
  {
    "key": "ex:at-a-high-level",
    "en": "at a high level",
    "ko": "큰 틀에서 보면, 개략적으로",
    "example": "At a high level, it's just a queue.",
    "situations": [
      "세부 들어가기 전 전체 그림부터 잡을 때",
      "면접관에게 시스템 개요를 먼저 줄 때",
      "복잡한 흐름을 단순하게 요약하며 시작할 때"
    ]
  },
  {
    "key": "ex:let-me-think-out-loud",
    "en": "let me think out loud",
    "ko": "생각을 소리 내서 정리해볼게요",
    "example": "Let me think out loud for a sec.",
    "situations": [
      "면접에서 사고 과정을 보여줘야 할 때",
      "바로 답이 안 나와서 추론을 드러낼 때",
      "화이트보드에서 단계를 짚어갈 때"
    ]
  },
  {
    "key": "ex:off-the-top-of-my-head",
    "en": "off the top of my head",
    "ko": "바로 떠오르는 대로는",
    "example": "Off the top of my head, three approaches.",
    "situations": [
      "정확하진 않지만 즉답을 줄 때",
      "바로 떠오른 후보들을 나열할 때",
      "확신 없이 빠르게 아이디어 던질 때"
    ]
  },
  {
    "key": "ex:this-boils-down-to",
    "en": "this boils down to",
    "ko": "결국 핵심은 이거예요",
    "example": "This boils down to a caching problem.",
    "situations": [
      "복잡한 문제를 한 줄로 압축할 때",
      "본질만 짚어 시선을 모을 때",
      "곁가지 빼고 핵심을 강조할 때"
    ]
  },
  {
    "key": "ex:the-gotcha-here-is",
    "en": "the gotcha here is",
    "ko": "여기서 함정은",
    "example": "The gotcha here is the off-by-one.",
    "situations": [
      "놓치기 쉬운 엣지 케이스를 짚을 때",
      "미묘한 버그 포인트를 경고할 때",
      "리뷰에서 숨은 함정을 알릴 때"
    ]
  },
  {
    "key": "ex:the-tradeoff-is",
    "en": "the tradeoff is",
    "ko": "트레이드오프는, 대신 잃는 건",
    "example": "The tradeoff is memory for speed.",
    "situations": [
      "두 설계의 장단점을 비교할 때",
      "최적화 선택의 비용을 설명할 때",
      "결정 근거를 댈 때"
    ]
  },
  {
    "key": "ex:long-story-short",
    "en": "long story short",
    "ko": "길게 말 안 하고 결론만",
    "example": "Long story short, it timed out.",
    "situations": [
      "배경 생략하고 결과만 전할 때",
      "디버깅 결말을 빠르게 알릴 때",
      "스탠드업에서 시간 아낄 때"
    ]
  },
  {
    "key": "ex:correct-me-if-i-m-wrong",
    "en": "correct me if I'm wrong",
    "ko": "틀리면 바로잡아 주세요",
    "example": "Correct me if I'm wrong here.",
    "situations": [
      "가정을 확인받고 싶을 때",
      "면접관 의도를 재확인할 때",
      "팀원 지식에 기대 검증할 때"
    ]
  },
  {
    "key": "ex:let-me-sanity-check-that",
    "en": "let me sanity-check that",
    "ko": "한번 점검해볼게요, 말 되는지 보고",
    "example": "Let me sanity-check that real quick.",
    "situations": [
      "답을 내고 스스로 검증할 때",
      "엣지 케이스로 로직을 시험할 때",
      "숫자나 경계값을 다시 확인할 때"
    ]
  },
  {
    "key": "ex:just-to-be-clear",
    "en": "just to be clear",
    "ko": "명확히 하자면",
    "example": "Just to be clear, reads only?",
    "situations": [
      "오해 소지를 제거할 때",
      "범위를 콕 집어 확인할 때",
      "가정을 명시적으로 밝힐 때"
    ]
  },
  {
    "key": "ex:to-be-fair",
    "en": "to be fair",
    "ko": "공정하게 말하면",
    "example": "To be fair, that scales fine.",
    "situations": [
      "반대 입장도 인정해줄 때",
      "비판 뒤 균형을 맞출 때",
      "상대 의견 일부를 수긍할 때"
    ]
  },
  {
    "key": "ex:that-said",
    "en": "that said",
    "ko": "그렇긴 한데, 그래도",
    "example": "That said, it won't scale.",
    "situations": [
      "앞말 인정 후 반전할 때",
      "장점 뒤 한계를 짚을 때",
      "동의하면서 단서를 달 때"
    ]
  },
  {
    "key": "ex:my-gut-says",
    "en": "my gut says",
    "ko": "직감으론, 감으로는",
    "example": "My gut says it's a race condition.",
    "situations": [
      "근거 전에 직관을 먼저 댈 때",
      "원인을 추정하며 시작할 때",
      "빠르게 가설을 던질 때"
    ]
  },
  {
    "key": "ex:i-d-lean-towards",
    "en": "I'd lean towards",
    "ko": "나는 ~쪽으로 기울어요",
    "example": "I'd lean towards the simpler option.",
    "situations": [
      "두 안 중 선호를 밝힐 때",
      "결정은 안 했지만 방향을 줄 때",
      "취향과 이유를 댈 때"
    ]
  },
  {
    "key": "ex:it-depends-on",
    "en": "it depends on",
    "ko": "상황에 따라 달라요, ~에 달렸어요",
    "example": "It depends on the read-write ratio.",
    "situations": [
      "단정 못 할 때 조건을 깔 때",
      "면접관에게 변수를 되물을 때",
      "설계 선택의 전제를 짚을 때"
    ]
  },
  {
    "key": "ex:the-edge-case-is",
    "en": "the edge case is",
    "ko": "엣지 케이스는",
    "example": "The edge case is an empty input.",
    "situations": [
      "경계 조건을 명시적으로 다룰 때",
      "면접에서 빠짐을 메울 때",
      "테스트할 케이스를 꼽을 때"
    ]
  },
  {
    "key": "ex:let-s-not-over-engineer-this",
    "en": "let's not over-engineer this",
    "ko": "과하게 만들지 맙시다",
    "example": "Let's not over-engineer this part.",
    "situations": [
      "단순한 해법을 옹호할 때",
      "불필요한 복잡도를 막을 때",
      "MVP 범위를 지킬 때"
    ]
  },
  {
    "key": "ex:let-s-start-simple",
    "en": "let's start simple",
    "ko": "일단 단순하게 시작하죠",
    "example": "Let's start simple, then optimize.",
    "situations": [
      "기본 해법부터 잡을 때",
      "최적화는 나중으로 미룰 때",
      "점진적 접근을 제안할 때"
    ]
  },
  {
    "key": "ex:the-bottleneck-is",
    "en": "the bottleneck is",
    "ko": "병목은",
    "example": "The bottleneck is the DB write.",
    "situations": [
      "성능 한계 지점을 짚을 때",
      "어디를 고칠지 가리킬 때",
      "확장성 논의의 핵심을 댈 때"
    ]
  },
  {
    "key": "ex:in-the-worst-case",
    "en": "in the worst case",
    "ko": "최악의 경우엔",
    "example": "In the worst case, it's O(n²).",
    "situations": [
      "복잡도 상한을 말할 때",
      "실패 시나리오를 짚을 때",
      "부하 한계를 가늠할 때"
    ]
  },
  {
    "key": "ex:the-happy-path-is",
    "en": "the happy path is",
    "ko": "정상 흐름은",
    "example": "The happy path is just two calls.",
    "situations": [
      "에러 없는 기본 흐름을 설명할 때",
      "먼저 주 시나리오를 잡을 때",
      "예외 처리 전 본류를 깔 때"
    ]
  },
  {
    "key": "ex:where-this-falls-apart-is",
    "en": "where this falls apart is",
    "ko": "이게 무너지는 지점은",
    "example": "Where this falls apart is high load.",
    "situations": [
      "해법의 한계를 드러낼 때",
      "스케일 약점을 짚을 때",
      "실패 조건을 솔직히 말할 때"
    ]
  },
  {
    "key": "ex:let-me-walk-you-through-it",
    "en": "let me walk you through it",
    "ko": "하나씩 짚어드릴게요",
    "example": "Let me walk you through it.",
    "situations": [
      "코드 흐름을 단계별로 설명할 때",
      "설계를 차근차근 펼칠 때",
      "리뷰어를 데이터 흐름에 태울 때"
    ]
  },
  {
    "key": "ex:stepping-back",
    "en": "stepping back",
    "ko": "한발 물러나서 보면",
    "example": "Stepping back, do we need this?",
    "situations": [
      "디테일에 빠졌다 큰 그림 볼 때",
      "방향 자체를 재점검할 때",
      "과한 몰입을 끊고 환기할 때"
    ]
  },
  {
    "key": "ex:good-catch",
    "en": "good catch",
    "ko": "잘 잡았네요",
    "example": "Good catch, that's a bug.",
    "situations": [
      "상대가 버그를 찾아줬을 때",
      "리뷰에서 지적을 인정할 때",
      "페어가 실수를 짚어줄 때"
    ]
  },
  {
    "key": "ex:let-me-back-up",
    "en": "let me back up",
    "ko": "잠깐 앞으로 돌아갈게요",
    "example": "Let me back up a second.",
    "situations": [
      "설명을 다시 정리할 때",
      "앞 단계가 빠졌을 때",
      "논리 흐름을 바로잡을 때"
    ]
  },
  {
    "key": "ex:i-m-going-to-punt-on",
    "en": "I'm going to punt on",
    "ko": "~는 일단 미뤄둘게요",
    "example": "I'm going to punt on auth for now.",
    "situations": [
      "부차적 부분을 뒤로 미룰 때",
      "시간상 나중에 다룰 때",
      "범위를 잠시 줄일 때"
    ]
  },
  {
    "key": "ex:the-naive-approach-is",
    "en": "the naive approach is",
    "ko": "가장 단순한 방식은",
    "example": "The naive approach is brute force.",
    "situations": [
      "기본 해법을 먼저 깔 때",
      "개선 전 출발점을 보일 때",
      "복잡도 비교의 베이스라인을 댈 때"
    ]
  },
  {
    "key": "ex:the-key-insight-is",
    "en": "the key insight is",
    "ko": "핵심 포인트는",
    "example": "The key insight is it's sorted.",
    "situations": [
      "풀이의 결정적 단서를 짚을 때",
      "최적화 아이디어를 강조할 때",
      "왜 동작하는지 핵심을 댈 때"
    ]
  },
  {
    "key": "ex:does-that-make-sense",
    "en": "does that make sense",
    "ko": "이해되시나요, 말 되나요",
    "example": "Does that make sense so far?",
    "situations": [
      "설명 후 확인받을 때",
      "면접관 반응을 살필 때",
      "다음으로 넘어가기 전 점검할 때"
    ]
  },
  {
    "key": "ex:let-s-circle-back-to",
    "en": "let's circle back to",
    "ko": "~는 다시 돌아오죠",
    "example": "Let's circle back to caching later.",
    "situations": [
      "미뤘던 주제로 복귀할 때",
      "나중에 다룰 약속을 할 때",
      "흐름 끊지 않고 메모할 때"
    ]
  },
  {
    "key": "ex:for-now-let-s-assume",
    "en": "for now let's assume",
    "ko": "일단 ~라고 가정하죠",
    "example": "For now, let's assume single region.",
    "situations": [
      "범위를 좁혀 진행할 때",
      "복잡함을 잠시 미뤄둘 때",
      "가정을 깔고 빠르게 나아갈 때"
    ]
  }
];

export const CODE_NARRATION_CARDS: PhraseCard[] = [
  {
    "key": "cn:it-short-circuits",
    "en": "it short-circuits",
    "ko": "단락 평가로 일찍 끝낸다",
    "example": "The AND short-circuits if the first check fails.",
    "situations": [
      "&&나 || 평가가 중간에 멈추는 걸 말할 때",
      "두 번째 조건이 왜 안 돌았는지 설명할 때",
      "불필요한 연산을 건너뛰는 조건을 짚을 때"
    ]
  },
  {
    "key": "cn:we-early-return",
    "en": "we early-return",
    "ko": "조건 맞으면 일찍 리턴한다",
    "example": "We early-return on empty input to keep it clean.",
    "situations": [
      "함수 맨 위 가드 절을 설명할 때",
      "중첩을 줄이는 패턴을 권할 때",
      "예외 케이스를 먼저 쳐낼 때"
    ]
  },
  {
    "key": "cn:it-falls-through-to-the-default",
    "en": "it falls through to the default",
    "ko": "기본 케이스로 넘어간다",
    "example": "If nothing matches, it falls through to the default.",
    "situations": [
      "switch 문 동작을 말로 설명할 때",
      "매칭 안 되는 입력 처리를 짚을 때",
      "fallback 경로를 설명할 때"
    ]
  },
  {
    "key": "cn:we-guard-against-null",
    "en": "we guard against null",
    "ko": "널 들어오면 막는다",
    "example": "We guard against null before touching the field.",
    "situations": [
      "NPE 방지 코드를 설명할 때",
      "입력 검증 로직을 리뷰할 때",
      "왜 if 체크가 있는지 답할 때"
    ]
  },
  {
    "key": "cn:this-memoizes-the-result",
    "en": "this memoizes the result",
    "ko": "결과를 캐시해 재사용한다",
    "example": "This memoizes the result so we don't recompute.",
    "situations": [
      "같은 입력 반복 호출 최적화를 설명할 때",
      "캐싱 훅이나 데코레이터를 소개할 때",
      "연산 비용을 줄이는 방법을 제안할 때"
    ]
  },
  {
    "key": "cn:we-bubble-up-the-error",
    "en": "we bubble up the error",
    "ko": "에러를 상위로 전파한다",
    "example": "We bubble up the error instead of swallowing it.",
    "situations": [
      "예외를 위 호출자에게 던지는 걸 설명할 때",
      "에러 핸들링 책임 위치를 논할 때",
      "try-catch를 어디서 잡을지 정할 때"
    ]
  },
  {
    "key": "cn:it-dedupes-by-key",
    "en": "it dedupes by key",
    "ko": "키 기준으로 중복 제거한다",
    "example": "It dedupes by key so each id appears once.",
    "situations": [
      "중복 제거 로직을 설명할 때",
      "Set이나 Map으로 유니크 처리할 때",
      "데이터 정제 단계를 짚을 때"
    ]
  },
  {
    "key": "cn:we-batch-these",
    "en": "we batch these",
    "ko": "이것들을 묶어서 처리한다",
    "example": "We batch these writes to cut round-trips.",
    "situations": [
      "여러 호출을 한 번에 묶는 최적화를 말할 때",
      "DB나 네트워크 요청 수를 줄일 때",
      "처리량 개선 방안을 제안할 때"
    ]
  },
  {
    "key": "cn:this-is-o-of-n",
    "en": "this is O of n",
    "ko": "이건 O(n)이다",
    "example": "This is O of n since we touch each item once.",
    "situations": [
      "시간 복잡도를 말로 설명할 때",
      "면접에서 알고리즘 비용을 분석할 때",
      "두 접근법의 복잡도를 비교할 때"
    ]
  },
  {
    "key": "cn:we-mutate-in-place",
    "en": "we mutate in place",
    "ko": "제자리에서 직접 바꾼다",
    "example": "We mutate in place to avoid extra allocation.",
    "situations": [
      "새 배열 안 만들고 원본을 수정할 때",
      "메모리 최적화를 설명할 때",
      "불변성 vs 변경을 논할 때"
    ]
  },
  {
    "key": "cn:it-loops-until",
    "en": "it loops until",
    "ko": "~할 때까지 반복한다",
    "example": "It loops until the pointer hits the end.",
    "situations": [
      "while 루프 종료 조건을 설명할 때",
      "반복 횟수가 동적일 때",
      "two-pointer 진행을 짚을 때"
    ]
  },
  {
    "key": "cn:we-swap-the-two",
    "en": "we swap the two",
    "ko": "둘을 맞바꾼다",
    "example": "We swap the two if they're out of order.",
    "situations": [
      "정렬 중 원소 교환을 설명할 때",
      "in-place 알고리즘을 말로 풀 때",
      "변수 교환 트릭을 보여줄 때"
    ]
  },
  {
    "key": "cn:it-returns-early-on-cache-hit",
    "en": "it returns early on cache hit",
    "ko": "캐시 적중이면 바로 리턴한다",
    "example": "It returns early on cache hit, no DB call.",
    "situations": [
      "캐시 레이어 동작을 설명할 때",
      "빠른 경로를 짚을 때",
      "왜 가끔 DB를 안 치는지 설명할 때"
    ]
  },
  {
    "key": "cn:we-accumulate-into",
    "en": "we accumulate into",
    "ko": "~에 누적해 모은다",
    "example": "We accumulate into a running total here.",
    "situations": [
      "reduce나 누적 변수를 설명할 때",
      "합계나 결과를 모으는 로직을 말할 때",
      "상태를 누적하는 패턴을 짚을 때"
    ]
  },
  {
    "key": "cn:it-flips-the-flag",
    "en": "it flips the flag",
    "ko": "플래그를 뒤집는다",
    "example": "It flips the flag once we see a match.",
    "situations": [
      "불리언 상태 전환을 설명할 때",
      "처리 완료 표시를 할 때",
      "토글 로직을 말로 풀 때"
    ]
  },
  {
    "key": "cn:we-walk-the-tree",
    "en": "we walk the tree",
    "ko": "트리를 타고 내려간다",
    "example": "We walk the tree depth-first from the root.",
    "situations": [
      "DFS나 BFS 순회를 설명할 때",
      "트리 탐색 흐름을 화이트보드에서 짚을 때",
      "재귀 트리 처리를 말할 때"
    ]
  },
  {
    "key": "cn:it-recurses-on-each-child",
    "en": "it recurses on each child",
    "ko": "각 자식에 대해 재귀한다",
    "example": "It recurses on each child and merges results.",
    "situations": [
      "재귀 호출 구조를 설명할 때",
      "트리나 그래프 재귀를 짚을 때",
      "분할정복 흐름을 말할 때"
    ]
  },
  {
    "key": "cn:we-cap-it-at",
    "en": "we cap it at",
    "ko": "~로 상한을 둔다",
    "example": "We cap it at the max allowed page size.",
    "situations": [
      "값 상한 제한을 설명할 때",
      "clamp나 min-max 로직을 말할 때",
      "과도한 입력을 막는 가드를 짚을 때"
    ]
  },
  {
    "key": "cn:it-skips-if-already-seen",
    "en": "it skips if already seen",
    "ko": "이미 본 건 건너뛴다",
    "example": "It skips if already seen, using a visited set.",
    "situations": [
      "방문 체크로 중복 처리를 막을 때",
      "그래프 순회의 visited 로직을 설명할 때",
      "무한 루프 방지를 말할 때"
    ]
  },
  {
    "key": "cn:we-hash-the-key",
    "en": "we hash the key",
    "ko": "키를 해시한다",
    "example": "We hash the key to find its bucket.",
    "situations": [
      "해시맵 내부 동작을 설명할 때",
      "버킷 배치 원리를 짚을 때",
      "해시 기반 조회를 말할 때"
    ]
  },
  {
    "key": "cn:it-overwrites-the-previous-value",
    "en": "it overwrites the previous value",
    "ko": "이전 값을 덮어쓴다",
    "example": "It overwrites the previous value for that key.",
    "situations": [
      "맵에 같은 키 재삽입을 설명할 때",
      "마지막 값이 이기는 동작을 짚을 때",
      "upsert 로직을 말할 때"
    ]
  },
  {
    "key": "cn:we-append-to-the-end",
    "en": "we append to the end",
    "ko": "끝에 덧붙인다",
    "example": "We append to the end in constant time.",
    "situations": [
      "리스트나 배열 추가를 설명할 때",
      "스택 push 동작을 짚을 때",
      "로그를 누적할 때"
    ]
  },
  {
    "key": "cn:it-pops-off-the-stack",
    "en": "it pops off the stack",
    "ko": "스택에서 꺼낸다",
    "example": "It pops off the stack and processes it.",
    "situations": [
      "스택 기반 알고리즘을 설명할 때",
      "LIFO 처리 흐름을 짚을 때",
      "괄호 매칭 같은 문제를 풀 때"
    ]
  },
  {
    "key": "cn:we-throttle-the-calls",
    "en": "we throttle the calls",
    "ko": "호출 빈도를 제한한다",
    "example": "We throttle the calls to one per second.",
    "situations": [
      "요청 속도 제한을 설명할 때",
      "스크롤이나 리사이즈 핸들러 최적화를 말할 때",
      "API rate limit 대응을 짚을 때"
    ]
  },
  {
    "key": "cn:it-debounces-the-input",
    "en": "it debounces the input",
    "ko": "입력을 디바운스한다",
    "example": "It debounces the input before firing the search.",
    "situations": [
      "타이핑 검색 최적화를 설명할 때",
      "마지막 입력만 처리하는 로직을 말할 때",
      "불필요한 호출을 줄일 때"
    ]
  },
  {
    "key": "cn:we-coerce-it-to-a-string",
    "en": "we coerce it to a string",
    "ko": "문자열로 강제 변환한다",
    "example": "We coerce it to a string before comparing.",
    "situations": [
      "타입 변환을 설명할 때",
      "비교 전 정규화 단계를 짚을 때",
      "느슨한 동등 비교를 논할 때"
    ]
  },
  {
    "key": "cn:it-filters-out-the-empties",
    "en": "it filters out the empties",
    "ko": "빈 값들을 걸러낸다",
    "example": "It filters out the empties before the join.",
    "situations": [
      "빈 문자열이나 널 제거를 설명할 때",
      "데이터 정제 단계를 짚을 때",
      "filter 체인을 말로 풀 때"
    ]
  },
  {
    "key": "cn:we-map-over-it",
    "en": "we map over it",
    "ko": "각 원소를 변환한다",
    "example": "We map over it to pull out the ids.",
    "situations": [
      "map 변환을 설명할 때",
      "리스트를 다른 형태로 바꿀 때",
      "데이터 추출 단계를 짚을 때"
    ]
  },
  {
    "key": "cn:it-defaults-to",
    "en": "it defaults to",
    "ko": "기본값으로 떨어진다",
    "example": "It defaults to zero if the field is missing.",
    "situations": [
      "기본값 처리를 설명할 때",
      "옵셔널 값 fallback을 짚을 때",
      "왜 비어도 안 터지는지 설명할 때"
    ]
  },
  {
    "key": "cn:we-delegate-to",
    "en": "we delegate to",
    "ko": "~에게 위임한다",
    "example": "We delegate to the service layer for that.",
    "situations": [
      "책임을 다른 계층에 넘기는 걸 설명할 때",
      "아키텍처 경계를 짚을 때",
      "로직 위치를 정할 때"
    ]
  },
  {
    "key": "cn:it-blocks-until-ready",
    "en": "it blocks until ready",
    "ko": "준비될 때까지 대기한다",
    "example": "It blocks until the connection is ready.",
    "situations": [
      "동기 대기 동작을 설명할 때",
      "블로킹 호출을 짚을 때",
      "비동기 vs 동기를 논할 때"
    ]
  },
  {
    "key": "cn:we-fan-out-the-requests",
    "en": "we fan out the requests",
    "ko": "요청을 병렬로 보낸다",
    "example": "We fan out the requests and await all of them.",
    "situations": [
      "병렬 호출을 설명할 때",
      "Promise.all 같은 패턴을 짚을 때",
      "처리량을 높이는 설계를 말할 때"
    ]
  },
  {
    "key": "cn:it-retries-with-backoff",
    "en": "it retries with backoff",
    "ko": "백오프로 재시도한다",
    "example": "It retries with backoff on a timeout.",
    "situations": [
      "실패 재시도 전략을 설명할 때",
      "지수 백오프를 짚을 때",
      "불안정한 외부 호출 대응을 말할 때"
    ]
  },
  {
    "key": "cn:it-wraps-the-call",
    "en": "it wraps the call",
    "ko": "호출을 감싼다",
    "example": "It wraps the call in a try-catch.",
    "situations": [
      "에러 처리로 감싸는 걸 설명할 때",
      "데코레이터나 래퍼 패턴을 짚을 때",
      "로깅이나 타이밍을 추가할 때"
    ]
  },
  {
    "key": "cn:we-normalize-the-data",
    "en": "we normalize the data",
    "ko": "데이터를 정규화한다",
    "example": "We normalize the data into a flat map.",
    "situations": [
      "중첩 데이터를 평탄화할 때",
      "상태 정규화를 설명할 때",
      "중복 없는 구조로 정리할 때"
    ]
  },
  {
    "key": "cn:we-lock-around-it",
    "en": "we lock around it",
    "ko": "그 주위를 락으로 감싼다",
    "example": "We lock around it to avoid a race.",
    "situations": [
      "동시성 보호를 설명할 때",
      "임계 구역을 짚을 때",
      "race condition 방지를 말할 때"
    ]
  },
  {
    "key": "cn:it-flushes-the-buffer",
    "en": "it flushes the buffer",
    "ko": "버퍼를 비워 내보낸다",
    "example": "It flushes the buffer when it gets full.",
    "situations": [
      "버퍼링 후 일괄 출력을 설명할 때",
      "I/O 플러시 타이밍을 짚을 때",
      "배치 쓰기 동작을 말할 때"
    ]
  }
];

export const UI_CARDS: PhraseCard[] = [
  {
    "key": "ui:multi-select",
    "en": "multi-select",
    "ko": "다중 선택",
    "example": "We need multi-select with checkboxes here.",
    "situations": [
      "여러 개를 한꺼번에 고르는 기능 요청",
      "테이블에 체크박스 다중 선택 추가할 때",
      "벌크 액션을 위한 선택 UI 논의"
    ]
  },
  {
    "key": "ui:shift-click",
    "en": "shift-click",
    "ko": "시프트 클릭 (범위 선택)",
    "example": "Shift-click to grab everything in between.",
    "situations": [
      "범위 선택을 위한 모디파이어 클릭",
      "연속된 항목을 한 번에 고를 때",
      "shift 누른 채 클릭하는 동작 설명"
    ]
  },
  {
    "key": "ui:cmd-ctrl-click",
    "en": "cmd/ctrl-click",
    "ko": "커맨드/컨트롤 클릭 (개별 추가 선택)",
    "example": "Cmd-click to add it to the selection.",
    "situations": [
      "개별 항목을 따로 추가 선택할 때",
      "연속되지 않은 여러 개 고르기",
      "맥/윈도우 모디파이어 클릭 구분"
    ]
  },
  {
    "key": "ui:clear-selection",
    "en": "clear selection",
    "ko": "선택 초기화",
    "example": "Click empty space to clear selection.",
    "situations": [
      "선택을 한 번에 모두 푸는 동작",
      "빈 곳 클릭 시 선택 해제",
      "Esc 키로 선택 초기화할 때"
    ]
  },
  {
    "key": "ui:drag",
    "en": "drag",
    "ko": "드래그하다",
    "example": "You can drag the card to another column.",
    "situations": [
      "항목을 끌어 옮기는 동작",
      "칸반 카드 이동 설명",
      "드래그 시작 핸들링 논의"
    ]
  },
  {
    "key": "ui:drag-and-drop",
    "en": "drag-and-drop",
    "ko": "드래그 앤 드롭",
    "example": "We added drag-and-drop to reorder the list.",
    "situations": [
      "전체 끌어 놓기 기능 설명",
      "라이브러리로 DnD 구현 논의",
      "목록 순서 변경 기능 요청"
    ]
  },
  {
    "key": "ui:reorder",
    "en": "reorder",
    "ko": "순서 변경하다",
    "example": "Drag the rows to reorder them.",
    "situations": [
      "항목 순서를 바꾸는 동작",
      "드래그로 리스트 재정렬",
      "순서 변경 후 서버 저장 논의"
    ]
  },
  {
    "key": "ui:drag-handle",
    "en": "drag handle",
    "ko": "드래그 핸들",
    "example": "Only the drag handle starts the drag.",
    "situations": [
      "드래그를 시작하는 손잡이 영역",
      "행 왼쪽의 점 여섯 개 아이콘",
      "핸들로만 드래그 가능하게 제한할 때"
    ]
  },
  {
    "key": "ui:snap-into-place",
    "en": "snap into place",
    "ko": "제자리에 딱 들어가다",
    "example": "On drop it snaps into place.",
    "situations": [
      "드롭하면 칸에 정렬되는 동작",
      "그리드에 맞춰 자동 정렬",
      "놓을 때 가까운 위치로 붙는 효과"
    ]
  },
  {
    "key": "ui:hover-state",
    "en": "hover state",
    "ko": "호버 상태",
    "example": "The hover state changes the background.",
    "situations": [
      "마우스 올렸을 때의 스타일",
      "버튼 hover 색상 정의",
      "호버 시 툴팁 노출 논의"
    ]
  },
  {
    "key": "ui:focus-state",
    "en": "focus state",
    "ko": "포커스 상태",
    "example": "The focus state needs a visible ring.",
    "situations": [
      "키보드 포커스 시 테두리 표시",
      "접근성 위한 focus ring 논의",
      "탭 이동 시 현재 요소 강조"
    ]
  },
  {
    "key": "ui:disabled-state",
    "en": "disabled state",
    "ko": "비활성 상태",
    "example": "Keep the button disabled until it's valid.",
    "situations": [
      "조건 미충족 시 버튼 비활성",
      "회색 처리하고 클릭 막을 때",
      "폼 검증 전 제출 막기"
    ]
  },
  {
    "key": "ui:loading-state",
    "en": "loading state",
    "ko": "로딩 상태",
    "example": "Show a spinner in the loading state.",
    "situations": [
      "데이터 불러오는 동안 표시",
      "버튼 로딩 스피너 논의",
      "스켈레톤 UI 처리할 때"
    ]
  },
  {
    "key": "ui:empty-state",
    "en": "empty state",
    "ko": "빈 상태",
    "example": "The empty state needs a friendly message.",
    "situations": [
      "데이터 없을 때 보여줄 화면",
      "빈 리스트 안내 문구",
      "결과 없음 일러스트 논의"
    ]
  },
  {
    "key": "ui:toggle",
    "en": "toggle",
    "ko": "토글하다",
    "example": "This switch toggles dark mode.",
    "situations": [
      "켜고 끄는 스위치 동작",
      "불리언 상태 전환",
      "설정 on/off 처리"
    ]
  },
  {
    "key": "ui:expand-collapse",
    "en": "expand/collapse",
    "ko": "펼치기/접기",
    "example": "Click the header to expand or collapse.",
    "situations": [
      "아코디언 펼치고 접을 때",
      "트리 노드 확장 동작",
      "상세 영역 토글 논의"
    ]
  },
  {
    "key": "ui:scroll-into-view",
    "en": "scroll into view",
    "ko": "보이게 스크롤하다",
    "example": "Scroll the selected item into view.",
    "situations": [
      "선택 항목을 화면에 보이게 할 때",
      "에러 필드로 자동 스크롤",
      "앵커로 점프하는 동작"
    ]
  },
  {
    "key": "ui:sticky",
    "en": "sticky",
    "ko": "고정된 (스크롤해도 붙는)",
    "example": "Make the header sticky on scroll.",
    "situations": [
      "스크롤해도 상단 고정되는 헤더",
      "사이드바 고정 논의",
      "테이블 헤더 sticky 처리"
    ]
  },
  {
    "key": "ui:pin",
    "en": "pin",
    "ko": "고정하다",
    "example": "You can pin a column to the left.",
    "situations": [
      "특정 열/항목을 고정할 때",
      "즐겨찾기 상단 고정",
      "채팅 메시지 핀 기능"
    ]
  },
  {
    "key": "ui:dismiss",
    "en": "dismiss",
    "ko": "닫다, 해제하다",
    "example": "Tap outside to dismiss the modal.",
    "situations": [
      "모달이나 토스트를 닫을 때",
      "알림 배너 닫기",
      "오버레이 바깥 클릭으로 닫기"
    ]
  },
  {
    "key": "ui:debounce",
    "en": "debounce",
    "ko": "디바운스 (마지막 입력만)",
    "example": "Debounce the search input by 300ms.",
    "situations": [
      "입력 멈춘 뒤 한 번만 호출",
      "검색창 API 호출 줄일 때",
      "연속 이벤트 마지막만 처리"
    ]
  },
  {
    "key": "ui:throttle",
    "en": "throttle",
    "ko": "스로틀 (주기적 제한)",
    "example": "Throttle the scroll handler so it fires less.",
    "situations": [
      "스크롤/리사이즈 핸들러 빈도 제한",
      "일정 간격으로만 실행할 때",
      "성능 위해 이벤트 빈도 낮추기"
    ]
  },
  {
    "key": "ui:re-render",
    "en": "re-render",
    "ko": "리렌더링되다",
    "example": "That state change re-renders the whole list.",
    "situations": [
      "상태 변경으로 컴포넌트 다시 그릴 때",
      "불필요한 리렌더 줄이는 논의",
      "memo로 리렌더 막을 때"
    ]
  },
  {
    "key": "ui:mount-unmount",
    "en": "mount/unmount",
    "ko": "마운트/언마운트",
    "example": "Fetch the data when the component mounts.",
    "situations": [
      "컴포넌트 생성/제거 시점",
      "useEffect 정리 함수 논의",
      "언마운트 시 구독 해제"
    ]
  },
  {
    "key": "ui:event-bubbles-up",
    "en": "event bubbles up",
    "ko": "이벤트가 버블링되다",
    "example": "The click bubbles up to the parent.",
    "situations": [
      "자식 클릭이 부모로 전파될 때",
      "이벤트 전파 동작 설명",
      "위임으로 상위에서 처리할 때"
    ]
  },
  {
    "key": "ui:stop-propagation",
    "en": "stop propagation",
    "ko": "전파 중단",
    "example": "Stop propagation so the row ignores it.",
    "situations": [
      "부모로 이벤트 안 가게 막을 때",
      "버튼 클릭이 행 선택 안 되게",
      "중첩 핸들러 충돌 방지"
    ]
  },
  {
    "key": "ui:prevent-default",
    "en": "prevent default",
    "ko": "기본 동작 막기",
    "example": "Prevent default to stop the form submit.",
    "situations": [
      "폼 기본 제출 막을 때",
      "링크 기본 이동 막기",
      "드롭 기본 동작 방지"
    ]
  },
  {
    "key": "ui:controlled-input",
    "en": "controlled input",
    "ko": "제어 컴포넌트 입력",
    "example": "Make it a controlled input tied to state.",
    "situations": [
      "value를 상태로 관리하는 입력",
      "onChange로 상태 동기화할 때",
      "controlled vs uncontrolled 논의"
    ]
  },
  {
    "key": "ui:hit-area",
    "en": "hit area",
    "ko": "클릭/탭 영역",
    "example": "The hit area is too small to tap.",
    "situations": [
      "탭 가능한 영역이 좁을 때",
      "모바일 터치 영역 넓히기",
      "아이콘 버튼 패딩 논의"
    ]
  },
  {
    "key": "ui:keyboard-navigation",
    "en": "keyboard navigation",
    "ko": "키보드 탐색",
    "example": "Arrow keys should move the selection.",
    "situations": [
      "방향키로 항목 이동",
      "탭/엔터로 조작할 때",
      "접근성 키보드 지원 논의"
    ]
  },
  {
    "key": "ui:optimistic-update",
    "en": "optimistic update",
    "ko": "낙관적 업데이트",
    "example": "Do an optimistic update before the response.",
    "situations": [
      "응답 전에 UI 먼저 반영",
      "좋아요 즉시 반영 후 롤백",
      "빠른 피드백 위한 처리"
    ]
  },
  {
    "key": "ui:scroll-lock",
    "en": "scroll lock",
    "ko": "스크롤 잠금",
    "example": "Lock body scroll while the modal is open.",
    "situations": [
      "모달 열릴 때 배경 스크롤 막기",
      "오버레이 뒤 스크롤 방지",
      "바텀시트 열릴 때 처리"
    ]
  }
];

export const BACKEND_CARDS: PhraseCard[] = [
  {
    "key": "be:we-make-this-endpoint-idempotent-so-retr",
    "en": "We make this endpoint idempotent so retries don't double-charge.",
    "ko": "재시도해도 중복 결제 안 되게 이 엔드포인트를 멱등하게 만들어요.",
    "example": "We make this endpoint idempotent so retries don't double-charge.",
    "situations": [
      "결제 API 설계 리뷰 중",
      "재시도 로직 논의할 때",
      "POST 중복 호출 막을 때"
    ]
  },
  {
    "key": "be:send-an-idempotency-key-in-the-header-an",
    "en": "Send an idempotency key in the header and we'll dedupe.",
    "ko": "헤더에 멱등 키 넣어 보내면 저희가 중복 제거할게요.",
    "example": "Send an idempotency key in the header and we'll dedupe.",
    "situations": [
      "클라이언트랑 API 계약 맞출 때",
      "중복 요청 막는 법 설명할 때"
    ]
  },
  {
    "key": "be:we-rate-limit-this-to-a-hundred-requests",
    "en": "We rate limit this to a hundred requests per minute.",
    "ko": "이건 분당 백 건으로 레이트 리밋 걸어요.",
    "example": "We rate limit this to a hundred requests per minute.",
    "situations": [
      "트래픽 폭주 대비 논의",
      "공개 API 정책 정할 때",
      "남용 방지 설명할 때"
    ]
  },
  {
    "key": "be:let-s-use-cursor-pagination-instead-of-o",
    "en": "Let's use cursor pagination instead of offset for big tables.",
    "ko": "큰 테이블은 오프셋 말고 커서 페이지네이션 쓰죠.",
    "example": "Let's use cursor pagination instead of offset for big tables.",
    "situations": [
      "목록 API 성능 논의",
      "무한 스크롤 설계할 때"
    ]
  },
  {
    "key": "be:we-version-the-api-so-old-clients-don-t-",
    "en": "We version the API so old clients don't break.",
    "ko": "구버전 클라이언트가 안 깨지게 API 버저닝해요.",
    "example": "We version the API so old clients don't break.",
    "situations": [
      "v2 출시 논의할 때",
      "하위 호환 전략 정할 때"
    ]
  },
  {
    "key": "be:this-change-is-backward-compatible-so-no",
    "en": "This change is backward-compatible, so no migration needed.",
    "ko": "이 변경은 하위 호환이라 마이그레이션 필요 없어요.",
    "example": "This change is backward-compatible, so no migration needed.",
    "situations": [
      "스키마 필드 추가할 때",
      "배포 영향도 설명할 때"
    ]
  },
  {
    "key": "be:wrap-these-two-writes-in-one-transaction",
    "en": "Wrap these two writes in one transaction so they're atomic.",
    "ko": "이 두 쓰기를 한 트랜잭션으로 묶어서 원자적이게 해요.",
    "example": "Wrap these two writes in one transaction so they're atomic.",
    "situations": [
      "데이터 정합성 논의",
      "부분 실패 막을 때",
      "재고 동시 갱신 설계할 때"
    ]
  },
  {
    "key": "be:bump-the-isolation-level-if-you-re-seein",
    "en": "Bump the isolation level if you're seeing dirty reads.",
    "ko": "더티 리드 보이면 격리 수준 올리세요.",
    "example": "Bump the isolation level if you're seeing dirty reads.",
    "situations": [
      "동시성 버그 디버깅",
      "트랜잭션 이상 현상 논의"
    ]
  },
  {
    "key": "be:use-optimistic-locking-here-conflicts-ar",
    "en": "Use optimistic locking here; conflicts are rare.",
    "ko": "여긴 충돌이 드무니까 낙관적 락 쓰세요.",
    "example": "Use optimistic locking here; conflicts are rare.",
    "situations": [
      "동시 수정 처리 설계",
      "락 전략 고를 때"
    ]
  },
  {
    "key": "be:take-a-pessimistic-lock-so-two-workers-d",
    "en": "Take a pessimistic lock so two workers don't grab the same row.",
    "ko": "두 워커가 같은 행 못 잡게 비관적 락 거세요.",
    "example": "Take a pessimistic lock so two workers don't grab the same row.",
    "situations": [
      "작업 큐 동시성 처리",
      "재고 차감 충돌 막을 때"
    ]
  },
  {
    "key": "be:this-loop-is-firing-an-n-plus-one-query",
    "en": "This loop is firing an N plus one query.",
    "ko": "이 반복문에서 엔 플러스 원 쿼리가 나가고 있어요.",
    "example": "This loop is firing an N plus one query.",
    "situations": [
      "느린 API 프로파일링",
      "ORM 성능 리뷰할 때"
    ]
  },
  {
    "key": "be:we-re-maxing-out-the-connection-pool-und",
    "en": "We're maxing out the connection pool under load.",
    "ko": "부하 들어오면 커넥션 풀이 꽉 차요.",
    "example": "We're maxing out the connection pool under load.",
    "situations": [
      "DB 타임아웃 장애 분석",
      "커넥션 누수 의심될 때"
    ]
  },
  {
    "key": "be:add-an-index-on-user-id-the-scan-is-kill",
    "en": "Add an index on user_id; the scan is killing us.",
    "ko": "user_id에 인덱스 추가해요. 풀스캔 때문에 죽겠어요.",
    "example": "Add an index on user_id; the scan is killing us.",
    "situations": [
      "느린 쿼리 최적화",
      "필터 컬럼 정할 때"
    ]
  },
  {
    "key": "be:check-the-query-plan-it-s-not-hitting-th",
    "en": "Check the query plan; it's not hitting the index.",
    "ko": "쿼리 플랜 봐요. 인덱스를 안 타고 있어요.",
    "example": "Check the query plan; it's not hitting the index.",
    "situations": [
      "EXPLAIN 분석할 때",
      "인덱스 무시 원인 찾을 때"
    ]
  },
  {
    "key": "be:these-two-transactions-deadlocked-on-the",
    "en": "These two transactions deadlocked on the same rows.",
    "ko": "이 두 트랜잭션이 같은 행에서 데드락 났어요.",
    "example": "These two transactions deadlocked on the same rows.",
    "situations": [
      "데드락 로그 분석",
      "락 순서 정리할 때"
    ]
  },
  {
    "key": "be:run-the-migration-in-a-separate-deploy-t",
    "en": "Run the migration in a separate deploy to be safe.",
    "ko": "안전하게 마이그레이션은 따로 배포로 돌려요.",
    "example": "Run the migration in a separate deploy to be safe.",
    "situations": [
      "스키마 변경 배포 계획",
      "무중단 마이그레이션 논의"
    ]
  },
  {
    "key": "be:the-read-replica-has-some-replication-la",
    "en": "The read replica has some replication lag right now.",
    "ko": "지금 읽기 복제본에 복제 지연이 좀 있어요.",
    "example": "The read replica has some replication lag right now.",
    "situations": [
      "오래된 데이터 보일 때",
      "방금 쓴 값 안 보일 때"
    ]
  },
  {
    "key": "be:we-use-cache-aside-so-the-app-loads-and-",
    "en": "We use cache-aside, so the app loads and fills the cache.",
    "ko": "캐시 어사이드라 앱이 읽어서 캐시를 채워요.",
    "example": "We use cache-aside, so the app loads and fills the cache.",
    "situations": [
      "캐시 패턴 선택 논의",
      "Redis 도입 설계할 때"
    ]
  },
  {
    "key": "be:set-a-short-ttl-so-the-cache-stays-fresh",
    "en": "Set a short TTL so the cache stays fresh.",
    "ko": "캐시 신선하게 유지되게 TTL 짧게 잡아요.",
    "example": "Set a short TTL so the cache stays fresh.",
    "situations": [
      "캐시 만료 정책 정할 때",
      "오래된 값 문제 해결할 때"
    ]
  },
  {
    "key": "be:when-the-user-updates-we-invalidate-the-",
    "en": "When the user updates, we invalidate the cache key.",
    "ko": "유저가 수정하면 그 캐시 키를 무효화해요.",
    "example": "When the user updates, we invalidate the cache key.",
    "situations": [
      "캐시 갱신 흐름 설명",
      "수정 후 옛 데이터 보일 때"
    ]
  },
  {
    "key": "be:a-cache-stampede-hit-us-when-that-key-ex",
    "en": "A cache stampede hit us when that key expired.",
    "ko": "그 키 만료될 때 캐시 스탬피드가 터졌어요.",
    "example": "A cache stampede hit us when that key expired.",
    "situations": [
      "DB 부하 급증 분석",
      "인기 키 동시 만료 논의"
    ]
  },
  {
    "key": "be:we-push-the-job-onto-a-queue-and-process",
    "en": "We push the job onto a queue and process it async.",
    "ko": "작업을 큐에 넣고 비동기로 처리해요.",
    "example": "We push the job onto a queue and process it async.",
    "situations": [
      "무거운 작업 분리 설계",
      "이메일 발송 비동기화할 때"
    ]
  },
  {
    "key": "be:other-services-subscribe-to-this-event-o",
    "en": "Other services subscribe to this event over pub/sub.",
    "ko": "다른 서비스들이 펍섭으로 이 이벤트를 구독해요.",
    "example": "Other services subscribe to this event over pub/sub.",
    "situations": [
      "이벤트 기반 아키텍처 논의",
      "서비스 간 결합도 낮출 때"
    ]
  },
  {
    "key": "be:failed-messages-land-in-the-dead-letter-",
    "en": "Failed messages land in the dead-letter queue.",
    "ko": "실패한 메시지는 데드레터 큐로 빠져요.",
    "example": "Failed messages land in the dead-letter queue.",
    "situations": [
      "메시지 처리 실패 대응",
      "재처리 전략 정할 때"
    ]
  },
  {
    "key": "be:delivery-is-at-least-once-so-make-the-ha",
    "en": "Delivery is at-least-once, so make the handler idempotent.",
    "ko": "전달은 최소 한 번이라 핸들러를 멱등하게 만드세요.",
    "example": "Delivery is at-least-once, so make the handler idempotent.",
    "situations": [
      "중복 메시지 대비 설계",
      "컨슈머 구현 리뷰할 때"
    ]
  },
  {
    "key": "be:true-exactly-once-is-hard-we-fake-it-wit",
    "en": "True exactly-once is hard; we fake it with dedupe.",
    "ko": "진짜 정확히 한 번은 어려워서 중복 제거로 흉내 내요.",
    "example": "True exactly-once is hard; we fake it with dedupe.",
    "situations": [
      "메시징 보장 한계 설명",
      "결제 중복 방지 설계할 때"
    ]
  },
  {
    "key": "be:consumer-lag-is-climbing-we-need-more-wo",
    "en": "Consumer lag is climbing; we need more workers.",
    "ko": "컨슈머 랙이 올라가요. 워커 더 필요해요.",
    "example": "Consumer lag is climbing; we need more workers.",
    "situations": [
      "Kafka 지연 모니터링",
      "스케일아웃 결정할 때"
    ]
  },
  {
    "key": "be:we-retry-the-call-up-to-three-times-on-f",
    "en": "We retry the call up to three times on failure.",
    "ko": "실패하면 최대 세 번까지 재시도해요.",
    "example": "We retry the call up to three times on failure.",
    "situations": [
      "일시 장애 대응 설계",
      "재시도 정책 정할 때"
    ]
  },
  {
    "key": "be:use-exponential-backoff-so-we-don-t-hamm",
    "en": "Use exponential backoff so we don't hammer the service.",
    "ko": "서비스 두들기지 않게 지수 백오프 써요.",
    "example": "Use exponential backoff so we don't hammer the service.",
    "situations": [
      "재시도 간격 설계",
      "재시도 폭주 막을 때"
    ]
  },
  {
    "key": "be:the-circuit-breaker-trips-and-we-stop-ca",
    "en": "The circuit breaker trips and we stop calling it.",
    "ko": "서킷 브레이커가 열리면 호출을 멈춰요.",
    "example": "The circuit breaker trips and we stop calling it.",
    "situations": [
      "연쇄 장애 차단 설계",
      "느린 의존성 격리할 때"
    ]
  },
  {
    "key": "be:set-a-tight-timeout-so-slow-calls-don-t-",
    "en": "Set a tight timeout so slow calls don't pile up.",
    "ko": "느린 호출이 쌓이지 않게 타임아웃 짧게 잡아요.",
    "example": "Set a tight timeout so slow calls don't pile up.",
    "situations": [
      "스레드 고갈 방지",
      "행 걸린 요청 끊을 때"
    ]
  },
  {
    "key": "be:if-search-is-down-we-degrade-gracefully-",
    "en": "If search is down, we degrade gracefully and hide it.",
    "ko": "검색 죽으면 우아하게 다운그레이드해서 숨겨요.",
    "example": "If search is down, we degrade gracefully and hide it.",
    "situations": [
      "부분 장애 UX 설계",
      "핵심 기능만 살릴 때"
    ]
  },
  {
    "key": "be:for-non-critical-checks-we-fail-open-and",
    "en": "For non-critical checks we fail open and let it through.",
    "ko": "덜 중요한 검사는 페일 오픈해서 통과시켜요.",
    "example": "For non-critical checks we fail open and let it through.",
    "situations": [
      "보조 서비스 장애 정책",
      "가용성 우선 결정할 때"
    ]
  },
  {
    "key": "be:for-auth-we-fail-closed-and-block-the-re",
    "en": "For auth we fail closed and block the request.",
    "ko": "인증은 페일 클로즈드로 요청을 막아요.",
    "example": "For auth we fail closed and block the request.",
    "situations": [
      "보안 우선 결정",
      "안전한 기본값 정할 때"
    ]
  },
  {
    "key": "be:one-event-fans-out-to-five-downstream-se",
    "en": "One event fans out to five downstream services.",
    "ko": "이벤트 하나가 하위 서비스 다섯 개로 팬아웃돼요.",
    "example": "One event fans out to five downstream services.",
    "situations": [
      "이벤트 전파 설계",
      "부하 증폭 우려 설명할 때"
    ]
  },
  {
    "key": "be:we-added-a-unique-constraint-as-a-safety",
    "en": "We added a unique constraint as a safety net for dedupe.",
    "ko": "중복 제거 안전장치로 유니크 제약을 걸었어요.",
    "example": "We added a unique constraint as a safety net for dedupe.",
    "situations": [
      "멱등성 DB 차원 보강",
      "중복 삽입 방지 설계할 때"
    ]
  },
  {
    "key": "be:let-s-batch-these-calls-to-cut-the-round",
    "en": "Let's batch these calls to cut the round trips.",
    "ko": "왕복 줄이게 이 호출들 배치로 묶죠.",
    "example": "Let's batch these calls to cut the round trips.",
    "situations": [
      "네트워크 오버헤드 줄일 때",
      "대량 처리 최적화할 때"
    ]
  }
];

export const CONNECTORS: Connector[] = [
  {
    "key": "co:first",
    "en": "first",
    "ko": "먼저, 우선",
    "fn": "sequence",
    "example": "First, I'd parse the input. Then I'd validate it."
  },
  {
    "key": "co:then",
    "en": "then",
    "ko": "그다음",
    "fn": "sequence",
    "example": "I check the cache. Then I hit the DB if it misses."
  },
  {
    "key": "co:after-that",
    "en": "after that",
    "ko": "그러고 나서",
    "fn": "sequence",
    "example": "We write the test. After that, we make it pass."
  },
  {
    "key": "co:next",
    "en": "next",
    "ko": "다음으로",
    "fn": "sequence",
    "example": "We index the table. Next, we benchmark the query."
  },
  {
    "key": "co:once-that-s-done",
    "en": "once that's done",
    "ko": "그게 끝나면",
    "fn": "sequence",
    "example": "We deploy to staging. Once that's done, we run smoke tests."
  },
  {
    "key": "co:from-there",
    "en": "from there",
    "ko": "거기서부터",
    "fn": "sequence",
    "example": "We get the IDs first. From there, we batch the lookups."
  },
  {
    "key": "co:meanwhile",
    "en": "meanwhile",
    "ko": "그동안에",
    "fn": "sequence",
    "example": "The worker drains the queue. Meanwhile, the API stays up."
  },
  {
    "key": "co:finally",
    "en": "finally",
    "ko": "마지막으로",
    "fn": "sequence",
    "example": "We retry on failure. Finally, we send to a dead letter queue."
  },
  {
    "key": "co:so",
    "en": "so",
    "ko": "그래서",
    "fn": "cause",
    "example": "The list is sorted. So I'd use binary search."
  },
  {
    "key": "co:because",
    "en": "because",
    "ko": "왜냐하면",
    "fn": "cause",
    "example": "I'd cache this. Because the reads dominate here."
  },
  {
    "key": "co:since",
    "en": "since",
    "ko": "~이니까",
    "fn": "cause",
    "example": "Since the data fits in memory, I'd skip the DB."
  },
  {
    "key": "co:that-s-why",
    "en": "that's why",
    "ko": "그래서 ~한 거예요",
    "fn": "cause",
    "example": "Writes are rare. That's why I optimized for reads."
  },
  {
    "key": "co:which-means",
    "en": "which means",
    "ko": "그러니까, 즉",
    "fn": "cause",
    "example": "It's idempotent. Which means retries are safe."
  },
  {
    "key": "co:this-lets-us",
    "en": "this lets us",
    "ko": "이걸로 ~할 수 있어요",
    "fn": "cause",
    "example": "We split them with a queue. This lets us scale each side."
  },
  {
    "key": "co:but",
    "en": "but",
    "ko": "하지만",
    "fn": "contrast",
    "example": "That works. But it doesn't scale past one node."
  },
  {
    "key": "co:that-said",
    "en": "that said",
    "ko": "그렇긴 한데",
    "fn": "contrast",
    "example": "It's slower. That said, it's way simpler to reason about."
  },
  {
    "key": "co:on-the-other-hand",
    "en": "on the other hand",
    "ko": "반면에",
    "fn": "contrast",
    "example": "A queue adds latency. On the other hand, it smooths out spikes."
  },
  {
    "key": "co:the-tradeoff-is",
    "en": "the tradeoff is",
    "ko": "트레이드오프는",
    "fn": "contrast",
    "example": "Caching is fast. The tradeoff is stale data."
  },
  {
    "key": "co:the-catch-is",
    "en": "the catch is",
    "ko": "문제는, 단점은",
    "fn": "contrast",
    "example": "We can denormalize this. The catch is keeping it in sync."
  },
  {
    "key": "co:still",
    "en": "still",
    "ko": "그래도",
    "fn": "contrast",
    "example": "It's an edge case. Still, I want to handle it cleanly."
  },
  {
    "key": "co:specifically",
    "en": "specifically",
    "ko": "구체적으로는",
    "fn": "elaborate",
    "example": "There's an edge case. Specifically, the empty input."
  },
  {
    "key": "co:in-other-words",
    "en": "in other words",
    "ko": "다시 말해",
    "fn": "elaborate",
    "example": "It's O(n log n). In other words, it scales fine."
  },
  {
    "key": "co:what-i-mean-is",
    "en": "what I mean is",
    "ko": "제 말은",
    "fn": "elaborate",
    "example": "We need it atomic. What I mean is, all or nothing."
  },
  {
    "key": "co:basically",
    "en": "basically",
    "ko": "기본적으로",
    "fn": "elaborate",
    "example": "It's a lookup table. Basically, key maps to value."
  },
  {
    "key": "co:for-example",
    "en": "for example",
    "ko": "예를 들어",
    "fn": "elaborate",
    "example": "Some inputs break it. For example, a negative number."
  },
  {
    "key": "co:like",
    "en": "like",
    "ko": "~같은",
    "fn": "elaborate",
    "example": "We hit limits at scale. Like, millions of rows."
  },
  {
    "key": "co:to-be-clear",
    "en": "to be clear",
    "ko": "분명히 하자면",
    "fn": "elaborate",
    "example": "To be clear, I'm assuming a single region here."
  },
  {
    "key": "co:also",
    "en": "also",
    "ko": "또한",
    "fn": "add",
    "example": "I'd validate the input. Also, I'd log the request."
  },
  {
    "key": "co:on-top-of-that",
    "en": "on top of that",
    "ko": "게다가",
    "fn": "add",
    "example": "It's faster. On top of that, it uses less memory."
  },
  {
    "key": "co:plus",
    "en": "plus",
    "ko": "그리고, 거기다",
    "fn": "add",
    "example": "It handles nulls. Plus, it's thread safe."
  },
  {
    "key": "co:another-thing",
    "en": "another thing",
    "ko": "또 한 가지",
    "fn": "add",
    "example": "We need retries. Another thing, we need a timeout."
  },
  {
    "key": "co:and",
    "en": "and",
    "ko": "그리고",
    "fn": "add",
    "example": "I'd add an index. And I'd cache the hot keys."
  },
  {
    "key": "co:so-basically",
    "en": "so basically",
    "ko": "그러니까 요약하면",
    "fn": "conclude",
    "example": "We trade memory for speed. So basically, it's a cache."
  },
  {
    "key": "co:the-bottom-line-is",
    "en": "the bottom line is",
    "ko": "결론은",
    "fn": "conclude",
    "example": "Both work. The bottom line is, I'd pick the simpler one."
  },
  {
    "key": "co:to-sum-up",
    "en": "to sum up",
    "ko": "정리하자면",
    "fn": "conclude",
    "example": "To sum up, hash map for lookups, sorted for ranges."
  },
  {
    "key": "co:at-the-end-of-the-day",
    "en": "at the end of the day",
    "ko": "결국 중요한 건",
    "fn": "conclude",
    "example": "At the end of the day, correctness comes first."
  },
  {
    "key": "co:so-my-answer-is",
    "en": "so my answer is",
    "ko": "그래서 제 답은",
    "fn": "conclude",
    "example": "So my answer is, I'd go with the hash map."
  }
];

export const BACKEND_CODE_CARDS: CodeCard[] = [
  {
    "key": "iv:cd:backend:transactional-service-boundary",
    "category": "backend",
    "title": "@Transactional service boundary",
    "code": "@Transactional\npublic void transfer(Long fromId, Long toId, BigDecimal amount) {\n    Account from = accountRepo.findById(fromId).orElseThrow();\n    Account to = accountRepo.findById(toId).orElseThrow();\n    from.debit(amount);\n    to.credit(amount);\n    accountRepo.save(from);\n    accountRepo.save(to);\n}",
    "answer": "This wraps the debit and credit in one transaction, so they both commit or both roll back and the balances stay consistent.",
    "keyPoints": [
      "Atomicity: all-or-nothing across both writes",
      "A runtime exception rolls back by default",
      "Keep the transaction short to avoid holding locks"
    ]
  },
  {
    "key": "iv:cd:backend:idempotency-key-check-before-charge",
    "category": "backend",
    "title": "Idempotency-key check before charge",
    "code": "@Transactional\npublic Payment charge(String idemKey, ChargeReq req) {\n    return paymentRepo.findByIdemKey(idemKey)\n        .orElseGet(() -> {\n            Payment p = gateway.charge(req);\n            p.setIdemKey(idemKey);\n            return paymentRepo.save(p);\n        });\n}",
    "answer": "It looks up the idempotency key first and returns the existing payment if found, so a retried request never double-charges the customer.",
    "keyPoints": [
      "Same key returns the same result, not a new charge",
      "A unique DB constraint guards the concurrent race",
      "Lets clients retry safely on network timeouts"
    ]
  },
  {
    "key": "iv:cd:backend:retry-with-exponential-backoff",
    "category": "backend",
    "title": "Retry with exponential backoff",
    "code": "int attempt = 0;\nlong delay = 100;\nwhile (true) {\n    try {\n        return client.call(req);\n    } catch (TransientException e) {\n        if (++attempt >= MAX_RETRIES) throw e;\n        Thread.sleep(delay + random.nextInt(50)); // jitter\n        delay *= 2; // 100, 200, 400 ms\n    }\n}",
    "answer": "On a transient failure it retries, doubling the wait each time and adding jitter, so it eases off a struggling downstream instead of hammering it.",
    "keyPoints": [
      "Backoff grows exponentially to shed pressure",
      "Jitter prevents synchronized retry storms",
      "Only retry transient errors, with a max-attempt cap"
    ]
  },
  {
    "key": "iv:cd:backend:optimistic-locking-with-version",
    "category": "backend",
    "title": "Optimistic locking with @Version",
    "code": "@Entity\nclass Order {\n    @Id Long id;\n    @Version Long version; // JPA bumps on update\n    String status;\n}\n// UPDATE orders SET status=?, version=version+1\n//   WHERE id=? AND version=?\n// 0 rows -> OptimisticLockException",
    "answer": "The version column lets JPA detect concurrent edits: if another writer changed the row first, the version no longer matches and the update fails instead of clobbering it.",
    "keyPoints": [
      "No locks held; conflict detected at commit",
      "Stale write throws OptimisticLockException to retry",
      "Best for low-contention, read-heavy workloads"
    ]
  },
  {
    "key": "iv:cd:backend:cache-aside-read",
    "category": "backend",
    "title": "Cache-aside read",
    "code": "public User getUser(Long id) {\n    String key = \"user:\" + id;\n    User cached = cache.get(key, User.class);\n    if (cached != null) return cached;\n    User user = userRepo.findById(id).orElseThrow();\n    cache.set(key, user, Duration.ofMinutes(10));\n    return user;\n}",
    "answer": "It checks the cache first, falls back to the database on a miss, then backfills with a TTL, so most reads never touch the database.",
    "keyPoints": [
      "Miss loads from DB then populates the cache",
      "TTL bounds staleness; invalidate on write",
      "App controls caching, not the data store"
    ]
  },
  {
    "key": "iv:cd:backend:token-bucket-rate-limiter",
    "category": "backend",
    "title": "Token-bucket rate limiter",
    "code": "synchronized boolean tryAcquire() {\n    long now = System.nanoTime();\n    double refill = (now - lastRefill) / 1e9 * ratePerSec;\n    tokens = Math.min(capacity, tokens + refill);\n    lastRefill = now;\n    if (tokens >= 1) { tokens -= 1; return true; }\n    return false;\n}",
    "answer": "It refills tokens by elapsed time and allows a request only if one is available, capping the average rate while still permitting short bursts up to capacity.",
    "keyPoints": [
      "Refill rate sets steady-state throughput",
      "Capacity sets the burst allowance",
      "Returns false to reject (HTTP 429) when empty"
    ]
  },
  {
    "key": "iv:cd:backend:cursor-keyset-pagination",
    "category": "backend",
    "title": "Cursor (keyset) pagination",
    "code": "@Query(\"SELECT p FROM Post p WHERE p.id > :cursor \" +\n       \"ORDER BY p.id ASC\")\nList<Post> nextPage(@Param(\"cursor\") Long cursor, Pageable limit);\n\n// caller:\nList<Post> page = repo.nextPage(lastId, PageRequest.of(0, 20));\nLong next = page.isEmpty() ? null : page.get(page.size()-1).getId();",
    "answer": "Instead of OFFSET, it pages by the last seen id, so every query rides the index and stays fast even deep into the result set.",
    "keyPoints": [
      "Avoids OFFSET scanning rows it then discards",
      "Stable under inserts; no skipped or dup rows",
      "Needs a sortable, unique cursor column"
    ]
  },
  {
    "key": "iv:cd:backend:fixing-n-1-with-a-fetch-join",
    "category": "backend",
    "title": "Fixing N+1 with a fetch join",
    "code": "// BEFORE: 1 query for orders + 1 per order = N+1\nList<Order> orders = orderRepo.findAll();\n\n// AFTER: one query joins items\n@Query(\"SELECT DISTINCT o FROM Order o \" +\n       \"LEFT JOIN FETCH o.items WHERE o.userId = :uid\")\nList<Order> findWithItems(@Param(\"uid\") Long uid);",
    "answer": "The original fired one extra query per order to load its items; the fetch join pulls orders and items together, eliminating the N+1.",
    "keyPoints": [
      "N+1 is one query per parent row, killing latency",
      "JOIN FETCH loads the association in one trip",
      "DISTINCT dedupes parents fanned out by the join"
    ]
  },
  {
    "key": "iv:cd:backend:dead-letter-for-poison-messages",
    "category": "backend",
    "title": "Dead-letter for poison messages",
    "code": "@RabbitListener(queues = \"orders\")\npublic void handle(OrderMsg msg) {\n    try {\n        processor.process(msg);\n    } catch (Exception e) {\n        if (msg.getAttempts() >= MAX_ATTEMPTS) dlq.send(msg);\n        else throw e; // nack -> redeliver\n    }\n}",
    "answer": "After a few failed attempts it routes the message to a dead-letter queue instead of retrying forever, so one poison message can't block the whole queue.",
    "keyPoints": [
      "Caps retries to avoid infinite redelivery",
      "DLQ isolates bad messages for inspection",
      "Keeps the main consumer flowing"
    ]
  },
  {
    "key": "iv:cd:backend:outbox-pattern-insert",
    "category": "backend",
    "title": "Outbox pattern insert",
    "code": "@Transactional\npublic void placeOrder(Order order) {\n    orderRepo.save(order);\n    OutboxEvent ev = new OutboxEvent(\"OrderPlaced\", toJson(order));\n    outboxRepo.save(ev); // committed atomically with the order\n}\n// a poller reads outbox rows and publishes to the broker",
    "answer": "It writes the order and an outbox event in one transaction, so the event can't be lost or published without the order; a poller ships it later.",
    "keyPoints": [
      "Atomic write avoids the dual-write inconsistency",
      "Decouples DB commit from broker availability",
      "Poller delivers at-least-once from the outbox"
    ]
  },
  {
    "key": "iv:cd:backend:conditional-update-with-where-version",
    "category": "backend",
    "title": "Conditional update with WHERE version",
    "code": "@Modifying\n@Query(\"UPDATE Inventory i SET i.qty = i.qty - :n, \" +\n       \"i.version = i.version + 1 \" +\n       \"WHERE i.id = :id AND i.version = :ver AND i.qty >= :n\")\nint reserve(@Param(\"id\") Long id, @Param(\"n\") int n,\n            @Param(\"ver\") long ver);",
    "answer": "The update applies only when the version matches and stock is sufficient; zero rows returned means a conflict or oversell, so the caller retries with fresh data.",
    "keyPoints": [
      "Compare-and-set in one atomic SQL statement",
      "Affected-row count signals success or conflict",
      "Guards against lost updates and overselling"
    ]
  },
  {
    "key": "iv:cd:backend:pessimistic-lock-for-serialized-updates",
    "category": "backend",
    "title": "Pessimistic lock for serialized updates",
    "code": "@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"SELECT s FROM Seat s WHERE s.id = :id\")\nSeat lockSeat(@Param(\"id\") Long id);\n\n@Transactional\npublic void book(Long seatId, Long userId) {\n    Seat seat = lockSeat(seatId); // SELECT ... FOR UPDATE\n    if (seat.isTaken()) throw new SeatTakenException();\n    seat.assignTo(userId);\n}",
    "answer": "It takes a row lock with SELECT FOR UPDATE so concurrent bookings of the same seat serialize, preventing two users from grabbing it at once.",
    "keyPoints": [
      "Lock held until commit; others block",
      "Good for high-contention, short critical sections",
      "Watch for deadlocks and lock-wait timeouts"
    ]
  },
  {
    "key": "iv:cd:backend:bulk-upsert-with-on-conflict",
    "category": "backend",
    "title": "Bulk upsert with ON CONFLICT",
    "code": "@Modifying\n@Query(value = \"INSERT INTO metrics(key, count) \" +\n    \"VALUES (:key, 1) \" +\n    \"ON CONFLICT (key) \" +\n    \"DO UPDATE SET count = metrics.count + 1\",\n    nativeQuery = true)\nvoid increment(@Param(\"key\") String key);",
    "answer": "It inserts a new row or, if the key exists, atomically increments the counter, so concurrent callers never lose updates or hit duplicate-key errors.",
    "keyPoints": [
      "Insert-or-update in one round trip",
      "Avoids the read-modify-write race",
      "Needs a unique constraint on the conflict target"
    ]
  },
  {
    "key": "iv:cd:backend:read-only-transaction-for-queries",
    "category": "backend",
    "title": "Read-only transaction for queries",
    "code": "@Transactional(readOnly = true)\npublic List<ReportRow> monthlyReport(int year, int month) {\n    // no dirty checking; may route to a read replica\n    return reportRepo.aggregate(year, month);\n}",
    "answer": "Marking the query read-only skips Hibernate's dirty checking and lets it route to a replica, lightening load on the primary for heavy reports.",
    "keyPoints": [
      "readOnly hints the persistence layer and routing",
      "No flush or dirty-check overhead on entities",
      "Can offload to read replicas"
    ]
  },
  {
    "key": "iv:cd:backend:distributed-lock-to-dedupe-a-job",
    "category": "backend",
    "title": "Distributed lock to dedupe a job",
    "code": "public void runNightly() {\n    Boolean got = redis.opsForValue()\n        .setIfAbsent(\"lock:nightly\", node, Duration.ofMinutes(5));\n    if (!Boolean.TRUE.equals(got)) return; // another node holds it\n    try {\n        batchJob.run();\n    } finally {\n        redis.delete(\"lock:nightly\");\n    }\n}",
    "answer": "SET-if-absent with a TTL gives one node the lock so a scheduled job runs once across the cluster, and the TTL releases it if the holder crashes.",
    "keyPoints": [
      "setIfAbsent is the atomic acquire (SET NX)",
      "TTL stops a dead node holding it forever",
      "Only the winner runs; others skip"
    ]
  },
  {
    "key": "iv:cd:backend:circuit-breaker-around-a-flaky-dependenc",
    "category": "backend",
    "title": "Circuit breaker around a flaky dependency",
    "code": "@CircuitBreaker(name = \"pricing\", fallbackMethod = \"cached\")\npublic Price fetch(String sku) {\n    return pricingClient.get(sku);\n}\n\npublic Price cached(String sku, Throwable t) {\n    return priceCache.getOrDefault(sku, Price.UNKNOWN);\n}",
    "answer": "When pricing fails repeatedly the breaker opens and calls drop to a cached fallback, so we stop waiting on a dead dependency and degrade gracefully.",
    "keyPoints": [
      "Open state fails fast instead of timing out",
      "Fallback keeps serving stale data",
      "Half-open probes let it recover automatically"
    ]
  },
  {
    "key": "iv:cd:backend:soft-delete-with-a-deleted-flag",
    "category": "backend",
    "title": "Soft delete with a deleted flag",
    "code": "@Entity\n@SQLDelete(sql = \"UPDATE users SET deleted = true WHERE id = ?\")\n@Where(clause = \"deleted = false\")\nclass User {\n    @Id Long id;\n    boolean deleted;\n}\n// repo.delete(user) -> flips the flag, row stays",
    "answer": "Deletes flip a flag instead of removing the row, and the @Where clause hides soft-deleted records, so data stays recoverable and auditable.",
    "keyPoints": [
      "Row retained for audit and recovery",
      "@Where filters deleted rows transparently",
      "Watch unique constraints colliding with kept rows"
    ]
  },
  {
    "key": "iv:cd:backend:dto-projection-to-avoid-over-fetching",
    "category": "backend",
    "title": "DTO projection to avoid over-fetching",
    "code": "public interface UserSummary {\n    Long getId();\n    String getName();\n}\n\n@Query(\"SELECT u.id AS id, u.name AS name FROM User u\")\nList<UserSummary> findSummaries();",
    "answer": "An interface projection selects only id and name instead of the whole entity, cutting data transferred and skipping unnecessary entity hydration.",
    "keyPoints": [
      "Selects only needed columns, not SELECT *",
      "No managed entities: less memory, no lazy traps",
      "Keeps the API contract narrow"
    ]
  },
  {
    "key": "iv:cd:backend:saga-compensation-on-failure",
    "category": "backend",
    "title": "Saga compensation on failure",
    "code": "public void book(TripReq req) {\n    var flight = flightSvc.reserve(req); // step 1\n    try {\n        hotelSvc.reserve(req); // step 2\n    } catch (Exception e) {\n        flightSvc.cancel(flight.id()); // compensate\n        throw e;\n    }\n}",
    "answer": "Without a distributed transaction, each step has a compensating action; if the hotel reservation fails, it cancels the flight to undo the partial booking.",
    "keyPoints": [
      "Local transactions plus compensation, not 2PC",
      "Each forward step has an inverse",
      "Compensations must be idempotent and reliable"
    ]
  },
  {
    "key": "iv:cd:backend:batch-insert-to-cut-round-trips",
    "category": "backend",
    "title": "Batch insert to cut round trips",
    "code": "@Transactional\npublic void saveAll(List<Event> events) {\n    for (int i = 0; i < events.size(); i++) {\n        em.persist(events.get(i));\n        if (i % 50 == 0) { em.flush(); em.clear(); }\n    }\n}",
    "answer": "It flushes inserts in batches of 50 and clears the persistence context, sending fewer round trips to the DB and keeping memory flat on large loads.",
    "keyPoints": [
      "JDBC batching reduces network round trips",
      "Periodic clear() stops the context bloating",
      "Needs batch_size set on the JPA provider"
    ]
  },
  {
    "key": "iv:cd:backend:etag-optimistic-concurrency-in-rest",
    "category": "backend",
    "title": "ETag optimistic concurrency in REST",
    "code": "@PutMapping(\"/docs/{id}\")\npublic ResponseEntity<Doc> update(@PathVariable Long id,\n        @RequestHeader(\"If-Match\") long version,\n        @RequestBody Doc body) {\n    int rows = docService.update(id, version, body);\n    return rows == 0\n        ? ResponseEntity.status(PRECONDITION_FAILED).build()\n        : ResponseEntity.ok(body);\n}",
    "answer": "The client sends the version it last saw via If-Match; if it no longer matches, the server returns 412 instead of clobbering someone else's concurrent edit.",
    "keyPoints": [
      "If-Match carries the expected version (ETag)",
      "412 Precondition Failed signals a stale write",
      "Pushes optimistic concurrency to the HTTP layer"
    ]
  },
  {
    "key": "iv:cd:backend:loading-a-lazy-collection-safely",
    "category": "backend",
    "title": "Loading a lazy collection safely",
    "code": "@Transactional(readOnly = true)\npublic OrderView load(Long id) {\n    Order o = orderRepo.findById(id).orElseThrow();\n    int n = o.getItems().size(); // touch inside the tx\n    return OrderView.of(o, n);\n}",
    "answer": "It initializes the lazy items collection while the transaction is still open, avoiding a LazyInitializationException that would fire after the session closed.",
    "keyPoints": [
      "Lazy associations need an open session to load",
      "Access inside the tx, then map to a DTO",
      "Prefer fetch joins over per-row collection touches"
    ]
  },
  {
    "key": "iv:cd:backend:publish-event-only-after-commit",
    "category": "backend",
    "title": "Publish event only after commit",
    "code": "@TransactionalEventListener(phase = AFTER_COMMIT)\npublic void onOrderPlaced(OrderPlacedEvent ev) {\n    // runs only if the transaction committed\n    emailService.sendConfirmation(ev.orderId());\n}",
    "answer": "The listener fires only after the transaction commits, so we never send a confirmation email for an order that ended up rolling back.",
    "keyPoints": [
      "AFTER_COMMIT ties side effects to a real commit",
      "No emails for rolled-back transactions",
      "Decouples side effects from core domain logic"
    ]
  }
];

export const PHRASE_DECK_COUNTS = { phrasal: 44, expr: 32, code: 37, ui: 32, backend: 37, connectors: 37, backendCode: 23 };
