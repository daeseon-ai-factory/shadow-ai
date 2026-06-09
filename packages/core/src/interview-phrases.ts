// AUTO-GENERATED interview phrase + backend-code banks (short-form dev English for hardcore drilling).
// Source: content workflows (authored + adversarially verified) + card-detail-enrichment pass
// (friendly Korean nuance/when-to-use/pitfall explanations + Korean example translations).

import { type CodeCard } from './interview-drill';

export interface PhraseCard { key: string; en: string; ko: string; example: string; situations: string[]; detail: string; exampleKo: string; }
export interface Connector { key: string; en: string; ko: string; fn: string; example: string; detail: string; exampleKo: string; }

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
    ],
    "detail": "팽이 돌리듯 '윙— 하고 돌려서 띄운다'는 어감이라, 가볍고 빠르게 새 인스턴스를 만드는 느낌이에요. 디버깅하다가 \"로컬에 컨테이너 하나 띄워서 재현해보자\" 할 때 딱 나오는 말이죠. start와 달리 '없던 걸 새로 만들어 가동한다'는 뉘앙스가 있어서, 이미 있는 서버를 재시작할 때는 잘 안 씁니다.",
    "exampleKo": "그건 새 컨테이너 하나 띄워서 해보죠."
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
    ],
    "detail": "spin up의 정확한 반대로, 돌아가던 걸 서서히 멈춰서 내리는 어감입니다. 비용 얘기할 때 단골이에요 — \"야간엔 안 쓰는 워커 내려서 돈 아끼자\" 같은 오토스케일링 논의 장면이요. shut down은 그냥 끄는 거고, spin down은 '리소스를 회수한다'는 운영 관점이 묻어있어서 인프라 얘기엔 이쪽이 더 자연스럽습니다.",
    "exampleKo": "비용 절감하려고 놀고 있는 워커는 내립니다."
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
    ],
    "detail": "굴러간 걸 다시 뒤로 굴려서 이전 상태로 되돌린다는 그림이에요. 배포 직후 에러율이 튀었을 때 \"고민하지 말고 일단 롤백\" 하는 그 장면에서 나옵니다. revert는 보통 커밋 하나를 되돌리는 코드 레벨 얘기고, roll back은 배포/버전 전체를 되돌리는 운영 레벨 얘기라는 차이를 기억하세요.",
    "exampleKo": "터지면 그냥 롤백하면 돼요."
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
    ],
    "detail": "카펫을 펼치듯 점진적으로 깔아나가는 그림이라, '한 방에 배포'가 아니라 '단계적으로 퍼뜨린다'는 뉘앙스가 핵심입니다. 카나리 배포 설명할 때 — \"먼저 5%에 풀고 메트릭 보고 늘리자\" — 거의 반드시 이 단어가 나와요. deploy는 기술적 행위 자체고, roll out은 전략적인 확산 과정이라 시스템 디자인 인터뷰에서 roll out을 쓰면 운영 경험이 있어 보입니다.",
    "exampleKo": "먼저 5%에만 점진 배포합니다."
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
    ],
    "detail": "주차하다 후진으로 빠져나오듯, 넣었던 변경을 조심스럽게 도로 빼낸다는 어감이에요. 머지된 PR이 미묘하게 말썽일 때 \"일단 그 변경 빼고 다시 보자\" 하는 장면에서 나옵니다. roll back이 배포 단위를 통째로 되돌리는 거라면, back out은 특정 변경 하나만 골라서 빼는 느낌이라 더 외과수술적입니다.",
    "exampleKo": "그 변경은 일단 빼두죠."
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
    ],
    "detail": "1순위가 안 되면 뒤로 물러나 2순위로 간다는, 군대에서 후퇴하는 그림이에요. 캐시 미스나 외부 API 장애 시나리오 설명할 때 — \"캐시 없으면 DB로 폴백\" — 시스템 디자인 인터뷰의 단골 표현입니다. 명사형 fallback(폴백 경로)과 동사형 fall back을 섞어 쓸 수 있는데, 동사로 쓸 땐 fall back to처럼 to가 붙는 점만 주의하세요.",
    "exampleKo": "캐시 미스가 나면 DB로 폴백합니다."
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
    ],
    "detail": "손잡고 같이 걸으면서 하나하나 보여준다는 그림이라, '빠짐없이 순서대로 설명한다'는 친절한 어감이에요. 코드 리뷰나 인터뷰에서 \"제 설계 흐름을 차근차근 설명드릴게요\" 하고 시작할 때 딱입니다. walk you through처럼 사람을 가운데 끼워 쓰는 게 자연스럽고, explain보다 '단계별'이라는 구조감이 강하다는 게 차이예요.",
    "exampleKo": "흐름을 차근차근 설명드릴게요."
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
    ],
    "detail": "큰 덩어리를 부숴서 작은 조각으로 만든다는 직역 그대로의 그림입니다. 인터뷰에서 복잡한 질문 받았을 때 \"단계로 쪼개서 보겠습니다\" 하고 시작하면 구조적으로 사고한다는 인상을 줘요. 주의: 자동사로 쓰면 \"the server broke down\"(서버가 죽었다)처럼 '고장나다'는 전혀 다른 뜻이 되니 문맥 조심하세요.",
    "exampleKo": "이걸 단계별로 쪼개서 볼게요."
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
    ],
    "detail": "삽으로 파고 들어가듯 표면 아래 원인을 캔다는 어감이에요. 장애 트리아지 회의에서 \"왜 느린지 제가 파볼게요\" 하고 액션 아이템 가져갈 때 나오는 말입니다. look into보다 한층 깊고 본격적인 조사라는 뉘앙스 차이가 있어요 — look into는 '한번 들여다볼게' 정도, dig into는 '제대로 파헤칠게'입니다.",
    "exampleKo": "왜 느린지 제가 파헤쳐볼게요."
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
    ],
    "detail": "축구 킥오프에서 온 말이라 '공식적으로 시동을 건다'는 활기찬 어감이 있어요. 마이그레이션이나 배치 작업을 개시할 때, 또 프로젝트 첫 회의를 kickoff meeting이라고 부르는 그 장면이죠. start와 거의 같지만 kick off는 '계획된 큰 일의 출발'이라는 무게가 있어서, 사소한 함수 실행에 쓰면 과합니다.",
    "exampleKo": "오늘 밤에 마이그레이션 시작하죠."
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
    ],
    "detail": "전선을 이어 회로를 완성하듯 컴포넌트끼리 배선한다는 그림이라, '연결 코드를 작성한다'는 손맛이 느껴지는 표현이에요. 백엔드 API는 다 됐고 프론트만 붙이면 될 때 \"내가 API를 UI에 연결할게\" 하는 장면이죠. connect보다 '코드로 직접 이어붙이는 작업'이라는 구체성이 있고, DI 설정이나 이벤트 핸들러 연결에도 자연스럽게 씁니다.",
    "exampleKo": "API를 UI에 연결해놓을게요."
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
    ],
    "detail": "건물 철거하듯 세워놓은 환경을 싹 허물어 정리한다는 그림이에요. 테스트 끝나고 임시 환경/리소스를 제거하는 장면에서 나오고, 테스트 프레임워크의 setup/teardown이 바로 이 단어입니다. spin up과 짝을 이루는 반대말이라는 점, 그리고 delete보다 '구성 전체를 해체한다'는 어감이라는 점을 기억하세요.",
    "exampleKo": "테스트 끝나면 환경을 싹 걷어냅니다."
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
    ],
    "detail": "자물쇠로 단단히 잠가서 함부로 못 건드리게 만든다는 어감입니다. 보안 사고 후 \"쓰기 권한 일단 다 잠그자\" 하거나, 스펙 변경을 막을 때 \"requirements are locked down\"처럼 쓰는 장면이죠. restrict보다 강하고 단호한 느낌이고, '범위/스펙을 확정해서 더 못 바꾸게 한다'는 뜻으로도 확장되는 게 포인트예요.",
    "exampleKo": "쓰기 권한을 잠가버리죠."
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
    ],
    "detail": "경사로(ramp)를 따라 서서히 올라간다는 그림이라 '급격히'가 아니라 '점진적으로 끌어올린다'가 핵심이에요. 트래픽 전환 시나리오나, 신규 입사자에게 \"ramping up on the codebase\"(코드베이스 적응 중)라고 말하는 두 장면 모두에서 씁니다. increase와 달리 시간 축이 들어있는 단어라서, 한 번에 확 올리는 상황에는 어울리지 않아요.",
    "exampleKo": "트래픽은 점진적으로 늘려갑니다."
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
    ],
    "detail": "뼈대(skeleton)에 살(flesh)을 붙인다는 직역 그대로, 앙상한 초안을 구체적으로 채워나간다는 그림이에요. 설계 리뷰에서 뼈대만 잡힌 API 스펙을 두고 \"이제 계약을 구체화하자\" 할 때 나옵니다. hash out과 헷갈리기 쉬운데, flesh out은 디테일을 '채우는' 거고 hash out은 이견을 '논쟁으로 정리하는' 거라는 차이가 있어요.",
    "exampleKo": "API 계약을 구체화해봅시다."
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
    ],
    "detail": "고기를 잘게 다지듯(hash) 논쟁거리를 치열하게 토론해서 결론까지 간다는 어감이에요. 의견이 갈리는 엣지 케이스를 두고 \"회의실 잡고 끝장토론으로 정리하자\" 하는 장면이죠. discuss는 그냥 얘기하는 거지만 hash out은 '합의에 도달할 때까지'라는 결말이 포함돼 있고, 약간의 마찰을 전제하는 표현이라는 게 포인트입니다.",
    "exampleKo": "엣지 케이스들은 논의해서 합의를 봅시다."
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
    ],
    "detail": "다리미로 주름을 펴듯, 큰 틀은 다 됐고 남은 자잘한 문제들을 매끈하게 다듬는다는 어감이에요. 릴리스 직전 \"기능은 다 됐고 버그 몇 개만 잡으면 돼요\" 하고 진행 상황 보고할 때 딱입니다. fix보다 가볍고 낙관적인 톤이라, 심각한 장애에 쓰면 문제를 축소하는 것처럼 들릴 수 있으니 주의하세요.",
    "exampleKo": "아직 버그 몇 개만 더 다듬으면 됩니다."
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
    ],
    "detail": "수학에서 공통 인수를 묶어내듯(인수분해), 중복된 코드를 공통 함수/모듈로 추출한다는 정확히 그 그림이에요. 코드 리뷰에서 복붙된 로직 발견했을 때 \"이 공통 로직 빼내죠\" 하는 장면이 대표적입니다. refactor가 구조 개선 전반을 가리키는 큰 말이라면, factor out은 '추출'이라는 한 가지 동작만 콕 집는 말이라는 차이를 기억하세요.",
    "exampleKo": "이 공통 로직은 따로 빼냅시다."
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
    ],
    "detail": "쉽지 않은 일을 '용케 해냈다'는 성취감이 담긴 표현으로, 어려움이 전제돼 있다는 게 핵심이에요. 인터뷰에서 자기 성과 어필할 때 — \"무중단으로 그 마이그레이션을 해냈습니다\" — 쓰면 난이도가 자연스럽게 전달됩니다. 그냥 did나 finished는 평이하게 들리지만 pull off는 '남들은 못 했을 일'이라는 함의가 있어서, 쉬운 일에 쓰면 어색해요.",
    "exampleKo": "다운타임 제로로 해냈습니다."
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
    ],
    "detail": "길 가다 뭔가에 쿵 부딪히듯, 예상 못 한 문제를 우연히 마주쳤다는 어감이에요. 인터뷰에서 트러블슈팅 경험 풀 때 \"여기서 레이스 컨디션에 부딪혔는데요\" 하고 이야기의 전환점을 만드는 표현입니다. encounter와 같은 뜻이지만 훨씬 구어적이고, '내 잘못이 아니라 가다 보니 만난 것'이라는 중립적 뉘앙스가 있어서 실수 얘기를 부드럽게 꺼낼 때 좋아요.",
    "exampleKo": "여기서 레이스 컨디션에 부딪혔어요."
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
    ],
    "detail": "이런저런 과정을 거쳐 '결국 거기에 도달했다'는, 여정의 종착점을 가리키는 표현이에요. 인터뷰에서 기술 선택 과정 설명할 때 — \"여러 옵션을 검토했고 결국 큐를 쓰게 됐습니다\" — 하면 의사결정 과정이 있었음이 자연스럽게 전달됩니다. 뒤에 동사가 오면 ended up using처럼 -ing를 붙여야 한다는 문법이 한국 분들이 가장 자주 틀리는 부분이에요.",
    "exampleKo": "결국엔 큐를 쓰게 됐습니다."
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
    ],
    "detail": "고민하다가 아이디어가 '떠올라서 내놓는다'는, 무에서 유를 만드는 창의적 어감이에요. 인터뷰에서 \"기존 방식이 복잡해서 더 단순한 접근을 생각해냈다\"는 식으로 문제 해결력을 어필할 때 핵심 표현입니다. think of보다 '실제로 쓸 만한 결과물을 내놨다'는 완성도가 느껴지고, 세 단어가 한 덩어리라 with를 빼먹으면 안 됩니다.",
    "exampleKo": "더 단순한 접근법을 생각해냈어요."
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
    ],
    "detail": "문서에 서명하듯 공식적으로 '최종 승인 도장을 찍는다'는 어감이라, 권한과 책임이 따라오는 무거운 승인이에요. 릴리스 전에 \"이거 최종 승인 누가 하죠?\" 하고 책임자를 확인하는 장면에서 나옵니다. approve와 거의 같지만 sign off on은 '이 사람 승인 없이는 못 나간다'는 게이트 느낌이 강하고, 전치사 on까지가 한 세트라는 점을 주의하세요.",
    "exampleKo": "릴리스 최종 승인은 누가 하나요?"
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
    ],
    "detail": "어질러진 방 치우듯 죽은 코드, 안 쓰는 리소스를 정돈한다는 일상적인 어감 그대로예요. 기능 머지 후 \"후속 PR로 데드 코드 정리하겠습니다\" 하는 장면이 대표적이고, cleanup PR이라는 명사형도 일상적으로 씁니다. refactor와 달리 동작을 바꾸지 않는 가벼운 정돈이라는 뉘앙스라, 큰 구조 변경을 clean up이라고 부르면 규모를 속이는 것처럼 들릴 수 있어요.",
    "exampleKo": "죽은 코드는 제가 정리할게요."
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
    ],
    "detail": "여럿 중 하나를 콕 집어 소리 내어 말한다는 그림이라, '이건 다들 주목해야 한다'고 명시적으로 짚는 어감이에요. 설계 리뷰에서 \"여기 리스크 하나 짚고 넘어가고 싶은데요\" 하고 우려를 공식화하는 장면이 딱입니다. 주의: 사람을 목적어로 쓰면(call him out) '공개적으로 지적/비난하다'는 뜻이 되니, 이슈를 짚을 땐 꼭 사물을 목적어로 두세요.",
    "exampleKo": "여기서 리스크 하나만 짚고 넘어갈게요."
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
    ],
    "detail": "넓게 펼쳐진 후보를 깔때기처럼 좁혀 들어간다는 그림이에요. 장애 디버깅에서 \"가능성 다 펼쳐놓고 하나씩 좁혀가자\" 하는, 체계적인 원인 분석 장면의 핵심 표현입니다. 인터뷰 트러블슈팅 질문에서 narrow down → rule out → track down 순서로 쓰면 디버깅 과정이 아주 논리적으로 들려요. find와 달리 '아직 못 찾았고 줄여가는 중'이라는 과정의 뉘앙스입니다.",
    "exampleKo": "근본 원인을 좁혀 들어가 봅시다."
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
    ],
    "detail": "용의선상에서 지우듯 '이건 범인이 아니다'라고 확정적으로 배제한다는 어감이에요. 디버깅 중간 보고에서 \"네트워크 문제는 배제해도 됩니다(확인했어요)\" 하고 조사 범위를 줄여주는 장면이죠. 핵심은 '근거를 갖고' 배제한다는 점이라, 그냥 감으로 아닐 것 같다는 상황에 쓰면 나중에 신뢰를 잃습니다 — 그땐 unlikely 정도가 안전해요.",
    "exampleKo": "네트워크 문제는 배제해도 됩니다."
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
    ],
    "detail": "사냥꾼이 발자국을 따라가 끝내 잡아내듯, 숨어있는 원인을 끈질기게 추적해서 '찾아냈다'까지 가는 표현이에요. 인터뷰에서 \"메모리 릭을 추적해서 잡아냈습니다\" 하면 집요함과 결과가 동시에 어필됩니다. find는 결과만 말하지만 track down은 어려운 추적 과정이 있었음을 함의해서, 한 줄로 고생담을 압축하는 효과가 있어요.",
    "exampleKo": "메모리 릭을 추적해서 찾아냈어요."
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
    ],
    "detail": "퍼즐 조각을 맞춰 답을 알아낸다는, 머리 써서 파악하는 과정의 어감이에요. 아직 원인을 모르는 이슈를 두고 \"타이밍 이슈는 제가 파악해볼게요\" 하고 가져가는 장면에서 정말 하루에도 몇 번씩 나옵니다. understand는 상태고 figure out은 '알아내는 행위'라는 차이가 있고, I don't know 대신 I'll figure it out이라고 하면 주도성이 확 달라 보여요.",
    "exampleKo": "타이밍 이슈는 제가 알아낼게요."
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
    ],
    "detail": "테이블 위에 카드를 쫙 펼쳐놓듯, 머릿속 계획을 한눈에 보이게 펼쳐 보인다는 그림이에요. 시스템 디자인 인터뷰 시작할 때 \"먼저 제 접근 방식을 펼쳐놓고 시작하겠습니다\" 하면 구조적인 첫인상을 줍니다. walk through가 순서대로 '따라가며' 설명하는 거라면, lay out은 전체 구조를 '한 번에 펼쳐' 보여주는 차이가 있어요.",
    "exampleKo": "제 접근 방식을 먼저 펼쳐놓고 설명할게요."
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
    ],
    "detail": "카메라 줌 당기듯 한 부분을 확대해서 자세히 본다는 그림 그대로예요. 코드 리뷰나 인터뷰에서 전체 구조 얘기하다가 \"이 함수만 확대해서 볼까요\" 하고 디테일로 내려가는 전환 멘트로 씁니다. zoom in on처럼 on이 붙는다는 점을 주의하시고, focus on보다 '방금까지 넓게 보다가 지금 좁힌다'는 이동의 뉘앙스가 있다는 게 차이예요.",
    "exampleKo": "이 함수만 자세히 들여다봅시다."
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
    ],
    "detail": "디테일에서 빠져나와 전체 그림을 조망한다는, zoom in의 정확한 반대예요. 논의가 세부사항 늪에 빠졌을 때 \"잠깐 큰 그림으로 돌아가 보죠\" 하고 방향을 잡는, 시니어다운 한마디입니다. 시스템 디자인 인터뷰에서 zoom in/zoom out을 의식적으로 오가는 모습을 보여주면 추상화 레벨을 조절할 줄 안다는 강력한 시그널이 돼요.",
    "exampleKo": "잠깐 큰 그림으로 돌아가 봅시다."
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
    ],
    "detail": "부품 갈아끼우듯 한 구현을 빼고 다른 걸 끼운다는 그림이라, 모듈화가 잘 돼 있다는 함의가 묻어나는 표현이에요. 설계 리뷰에서 \"인터페이스만 잘 잡으면 캐시는 나중에 갈아끼우면 된다\" 하고 결정을 미루는 장면이 대표적입니다. replace보다 '쉽게, 깔끔하게 교체 가능하다'는 가벼움이 있어서, 추상화의 이점을 어필할 때 딱이에요.",
    "exampleKo": "캐시는 나중에 갈아끼우면 됩니다."
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
    ],
    "detail": "단칼에 끊는 게 아니라 단계(phase)를 거쳐 서서히 퇴역시킨다는 그림이에요. 레거시 API에 deprecation 공지 띄우고 신규 사용을 막고 트래픽을 옮기는, 그 점진적 폐기 계획을 말할 때 나옵니다. remove나 kill은 즉시 제거지만 phase out은 마이그레이션 기간이 전제돼 있어서, 하위 호환을 고려한다는 인상을 줘요. deprecate와 거의 짝으로 다닙니다.",
    "exampleKo": "구 API는 단계적으로 폐기하는 중입니다."
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
    ],
    "detail": "깃발 꽂아 표시하듯 '여기 주의할 거 있다'고 가볍게 표시해두는 어감이에요. 코드 리뷰에서 \"블로커는 아닌데 일단 표시해둘게요\"라거나 회의에서 \"I want to flag one thing\" 하고 우려를 꺼내는 장면이죠. call out보다 한 톤 가볍고 덜 공식적이라, 강하게 문제 제기하긴 부담스러울 때 쓰기 좋은 안전한 단어입니다. 기능 플래그(feature flag)의 flag와는 용법이 다르니 문맥으로 구분하세요.",
    "exampleKo": "이건 리뷰 때 보게 표시해둘게요."
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
    ],
    "detail": "미식축구에서 공격을 포기하고 공을 차서 넘기는 punt에서 온 말로, '지금은 의도적으로 미룬다'는 전략적 보류의 어감이에요. 스코프 논의에서 \"캐싱은 일단 다음으로 미루고 코어부터 하자\" 하는 장면이 딱입니다. delay는 그냥 늦어지는 거지만 punt on은 '판단해서 안 하기로 했다'는 주체적 결정이라, 우선순위 감각을 보여주는 표현이에요. 미식축구 문화권 표현이라 북미에서 특히 자연스럽습니다.",
    "exampleKo": "캐싱은 일단 미뤄두죠."
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
    ],
    "detail": "논의의 고리(loop) 안으로 사람을 끌어들인다는 그림으로, 이메일 CC 거는 것부터 회의에 부르는 것까지 다 커버해요. 설계가 인프라에 영향을 줄 것 같을 때 \"인프라팀도 끼워서 같이 보자\" 하는 장면이 대표적입니다. 반대로 '나도 공유해줘'는 keep me in the loop라고 하고요. invite보다 '정보 흐름에 포함시킨다'는 뉘앙스라 꼭 회의 초대가 아니어도 됩니다.",
    "exampleKo": "인프라팀도 논의에 끼웁시다."
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
    ],
    "detail": "손을 뻗어 먼저 닿는다는 그림으로, '내가 먼저 연락한다'는 능동성이 핵심이에요. 막히는 게 있을 때 \"온콜한테 제가 연락해볼게요\" 하고 액션을 가져가는 장면에서 나옵니다. contact와 같은 뜻이지만 훨씬 부드럽고 협업적인 톤이라 북미 직장 영어의 기본기고, reach out to처럼 to가 붙는다는 것만 주의하세요.",
    "exampleKo": "온콜 담당자한테 제가 연락해볼게요."
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
    ],
    "detail": "항구에서 화물 내보내듯 만든 걸 세상에 내보낸다는 어감으로, ship 자체가 개발 문화에서 '출시하다'의 대명사예요. 막바지 스탠드업에서 \"오늘 안에 내보내자\" 하고 데드라인 푸시하는 장면이죠. ship it!은 '승인, 나가도 됨'이라는 굳어진 감탄사이기도 하고요. release보다 캐주얼하고 속도감 있는 단어라, 빨리 만들어 빨리 내보내는 문화를 어필할 때 어울립니다.",
    "exampleKo": "이거 오늘 내보내죠."
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
    ],
    "detail": "스위치를 탁 끊어서 옮기듯, 구 시스템에서 신 시스템으로 트래픽/운영을 전환하는 '그 순간'을 가리키는 마이그레이션 전문 용어예요. DB 이전 계획 세울 때 \"금요일 밤에 신 DB로 전환한다\" 하는 장면이 정확히 이 단어입니다. roll out이 점진적 확산이라면 cut over는 특정 시점의 일괄 전환이라는 차이가 있고, 명사형 cutover(전환 시점/작업)로도 정말 많이 써요.",
    "exampleKo": "금요일에 새 DB로 전환합니다."
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
    ],
    "detail": "시계 맞추듯 서로의 상태와 정보를 일치시킨다는 그림으로, 실무에선 '잠깐 짧은 회의/대화하자'는 뜻으로 굳었어요. 회의가 길어질 때 \"이건 점심 후에 따로 맞추죠\" 하고 사이드로 빼는 장면이 대표적입니다. meeting이라고 하면 격식 있는 회의 같지만 sync(명사로도 씀: a quick sync)는 15분짜리 가벼운 정렬이라는 뉘앙스라, 부담 없이 대화를 청할 때 좋아요.",
    "exampleKo": "점심 먹고 잠깐 싱크 맞추죠."
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
    ],
    "detail": "원을 그리며 다시 그 지점으로 돌아온다는 그림으로, '지금 말고 나중에 다시 다루자'는 회의 진행의 윤활유 같은 표현이에요. 논의가 옆길로 샐 때 \"그건 나중에 다시 돌아오죠\" 하고 정중하게 끊는 장면이 딱입니다. 다만 북미에서 '말만 하고 안 돌아오는' 기업 화법의 대명사로 놀림받기도 하니, 진짜 돌아올 거면 액션 아이템으로 적어두는 게 신뢰를 지키는 법이에요.",
    "exampleKo": "그건 나중에 다시 얘기하죠."
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
    ],
    "detail": "못을 박아 움직이지 않게 고정하듯, 애매하게 떠 있던 걸 확정 짓는다는 어감이에요. 개발 착수 전에 \"요구사항부터 못박고 시작하자\" 하는, 스코프 크립을 막는 장면에서 나옵니다. decide는 그냥 정하는 거지만 nail down은 '더는 안 바뀌게 박아둔다'는 단단함이 있고, hash out(논쟁으로 정리)을 거쳐 nail down(확정)하는 흐름으로 같이 쓰면 자연스러워요.",
    "exampleKo": "요구사항부터 확실히 못박읍시다."
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
    ],
    "detail": "엉킨 것들을 분류해서(sort) 제자리 찾아준다는 그림으로, fix보다 범위가 넓어서 머지 컨플릭트든 일정 꼬임이든 사람 간 이슈든 '정리해서 해결한다' 전반에 써요. 리베이스하다 충돌 잔뜩 났을 때 \"컨플릭트는 제가 정리할게요\" 하고 가져가는 장면이죠. 영국 영어 색이 살짝 있지만 북미에서도 잘 통하고, figure out(원인을 알아내다)과 달리 sort out은 '실제로 처리까지 한다'는 차이를 기억하세요.",
    "exampleKo": "머지 컨플릭트는 제가 정리할게요."
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
    ],
    "detail": "직역하면 '높은 층위에서'인데, 세부 구현은 다 생략하고 큰 그림만 말하겠다는 신호예요. 시스템 디자인 면접에서 다이어그램 그리기 전에 \"At a high level, it's an API server, a queue, and a DB\"처럼 전체 구조를 한 문장으로 요약할 때 거의 반사적으로 나오는 말이에요. 'high-level'이 한국어의 '고급/수준 높은'이 아니라 '추상적인, 개략적인'이라는 점이 함정 — 반대말은 low-level(저수준, 세부적인)이에요.",
    "exampleKo": "크게 보면 그냥 큐 하나예요."
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
    ],
    "detail": "'생각을 입 밖으로 내면서 정리할게요'라는 뜻으로, 아직 답이 정리 안 됐지만 침묵하지 않고 사고 과정을 공유하겠다는 선언이에요. 코딩 면접에서 막혔을 때 조용히 있으면 감점인데, 이 말을 던지고 중얼거리듯 추론을 이어가면 면접관이 사고 과정을 따라올 수 있어서 오히려 점수가 돼요. 주의할 건 이 말을 해놓고 또 침묵하면 더 어색해진다는 것 — 말한 즉시 거칠어도 좋으니 생각을 계속 내뱉어야 해요.",
    "exampleKo": "잠깐 생각을 소리 내서 정리해볼게요."
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
    ],
    "detail": "'머리 꼭대기에서 바로 꺼낸 대로'라는 직역 느낌 그대로, 깊이 검증 안 한 즉답이라는 면책 선언이에요. 면접관이 \"How would you scale this?\" 같은 질문을 갑자기 던졌을 때 \"Off the top of my head, sharding or caching\"처럼 일단 후보를 던지면서 시간을 버는 용도로 좋아요. 이 말을 붙이면 나중에 답을 수정해도 자연스럽다는 게 장점인데, 정확한 수치를 말해야 하는 상황에서 남발하면 준비 안 된 사람처럼 보일 수 있어요.",
    "exampleKo": "바로 떠오르는 것만 말하면, 접근법이 세 가지 있어요."
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
    ],
    "detail": "'끓여서 졸이면 이것만 남는다'는 직역 그대로, 복잡해 보이는 문제의 본질이 결국 뭔지 한 줄로 압축할 때 써요. 시스템 디자인에서 요구사항을 한참 듣고 나서 \"This boils down to a fan-out problem\"이라고 정리하면 문제의 핵심을 꿰뚫었다는 인상을 줘요. 'comes down to'와 거의 같지만 boils down은 '복잡한 걸 졸여냈다'는 뉘앙스가 더 강해서, 원래 단순한 문제에 쓰면 살짝 과장처럼 들려요.",
    "exampleKo": "결국 따져보면 이건 캐싱 문제예요."
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
    ],
    "detail": "gotcha는 'got you(잡았다/당했지)'에서 온 말로, 무심코 지나가면 당하는 숨은 함정을 뜻해요. 코드 리뷰나 알고리즘 설명 중에 \"보기엔 멀쩡한데 여기 함정이 있어요\"라며 off-by-one이나 타임존 이슈 같은 걸 짚을 때 딱이에요. edge case는 '드문 입력 조건' 자체를 말하고 gotcha는 '사람이 속기 쉬운 지점'이라는 차이가 있어요 — gotcha 쪽이 더 구어적이고 약간 장난기 있는 어감이에요.",
    "exampleKo": "여기 함정은 인덱스가 하나 어긋나는 거예요."
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
    ],
    "detail": "뭔가를 얻는 대신 잃는 게 뭔지 명시하는 표현으로, 북미 면접에서 시니어다움을 보여주는 핵심 단어예요. 설계 선택을 말할 때마다 \"캐시를 넣으면 빨라지지만, the tradeoff is stale data\"처럼 대가를 같이 언급하면 평가가 확 올라가요. 주의점은 downside(그냥 단점)와 다르다는 것 — tradeoff는 '얻는 것과 잃는 것의 교환'이라 반드시 양쪽이 함께 있어야 자연스러워요.",
    "exampleKo": "트레이드오프는 속도를 얻는 대신 메모리를 쓰는 거예요."
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
    ],
    "detail": "'긴 얘기 짧게 줄이면'이라는 뜻으로, 배경 설명을 다 생략하고 결론만 던질 때 쓰는 압축 신호예요. 행동 면접(behavioral)에서 장애 대응 경험을 얘기하다 디테일이 길어질 것 같을 때 \"Long story short, it was a DNS issue\"로 마무리하면 깔끔해요. 다만 'to make a long story short'의 줄임이라 격식 있는 자리에서도 무난하지만, 정작 짧게 안 끝내고 또 길게 말하면 우스워지니 진짜 결론 한 문장만 따라와야 해요.",
    "exampleKo": "결론만 말하면, 타임아웃 났어요."
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
    ],
    "detail": "'제가 틀렸으면 바로잡아 주세요'라는 뜻인데, 실제로는 확신이 70~80%쯤 될 때 정중하게 자기 이해를 확인받는 쿠션이에요. 면접관의 문제 설명을 듣고 \"Correct me if I'm wrong, but writes are rare here?\"처럼 가정을 확인할 때 딱 좋아요. 함정은 어조에 따라 '내가 맞을 텐데?'라는 공격적 뉘앙스가 될 수도 있다는 것 — 면접에선 진짜 궁금한 톤으로, 끝을 올려서 말하는 게 안전해요.",
    "exampleKo": "제가 틀렸으면 바로잡아 주세요."
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
    ],
    "detail": "sanity check는 '제정신인지 확인'이라는 직역처럼, 정밀 검증이 아니라 '말이 되는지' 수준의 빠른 점검을 뜻해요. 라이브 코딩에서 복잡도 계산을 끝내고 \"Let me sanity-check that — n이 백만이면 이게 돌아가나?\"처럼 자기 답을 한번 굴려볼 때 자연스럽게 나와요. double-check가 '꼼꼼히 다시 확인'이라면 sanity-check는 '어이없는 실수만 거르는 가벼운 확인'이라는 차이 — 무게가 다르니 섞어 쓰면 어색해요.",
    "exampleKo": "말이 되는지 후딱 한번 점검해볼게요."
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
    ],
    "detail": "오해의 여지를 없애려고 핵심 조건을 못박는 표현이에요. 면접관 요구사항이 애매할 때 \"Just to be clear, reads only?\"처럼 짧게 확인 질문을 던지면 꼼꼼하다는 인상을 줘요. 'to be clear'만 쓰면 살짝 단호한(거의 정정하는) 느낌이 나는데, just를 붙이면 '확인 차원에서요'라는 부드러운 어감이 되는 게 미묘한 차이예요.",
    "exampleKo": "명확히 하자면, 읽기만 있는 거죠?"
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
    ],
    "detail": "방금 내가(또는 누가) 비판한 대상을 공정하게 변호해줄 때 쓰는 균형 잡기 표현이에요. 설계 비교 중에 \"그 방식은 복잡해요. To be fair, that scales fine\"처럼 단점을 말한 직후 장점도 인정하면 균형 잡힌 판단력을 보여줄 수 있어요. 'honestly(솔직히)'와 헷갈리기 쉬운데, to be fair는 반드시 '앞서 깎아내린 것에 대한 반론'이 따라온다는 게 핵심이에요 — 맥락 없이 쓰면 어색해요.",
    "exampleKo": "그래도 인정할 건 인정하자면, 그건 확장성은 괜찮아요."
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
    ],
    "detail": "'그렇게 말하긴 했지만'의 줄임으로, 방금 한 말을 인정하면서 반대 방향 포인트로 전환하는 접속 표현이에요. \"단순해서 좋아요. That said, it won't scale\"처럼 칭찬 뒤에 한계를 붙일 때 면접에서 정말 자주 나와요. but보다 부드럽고 'having said that'과 동일한 뜻인데, 핵심은 앞 문장을 부정하는 게 아니라 '둘 다 사실'이라는 균형 어감이라는 점 — 단순 반박이면 그냥 but이 맞아요.",
    "exampleKo": "그렇긴 한데, 그건 확장이 안 될 거예요."
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
    ],
    "detail": "gut은 '내장/배 속'이라 직역하면 '내 배가 말하길' — 논리적 근거보다 경험에서 오는 직감을 말할 때 써요. 디버깅 토론에서 증거가 다 모이기 전에 \"My gut says it's a race condition\"처럼 가설을 먼저 던지는 장면에서 자연스러워요. 면접에서 이 말만 하고 끝내면 근거 없는 사람으로 보이니, 반드시 \"확인해보려면 ~를 보면 돼요\"라는 검증 계획을 뒤에 붙이는 게 포인트예요.",
    "exampleKo": "직감상 이건 레이스 컨디션 같아요."
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
    ],
    "detail": "lean은 '몸을 기울이다'라서, 확정은 아니지만 어느 쪽으로 마음이 기울어 있는지 표현하는 말이에요. 면접관이 \"SQL이냐 NoSQL이냐\" 같은 양자택일을 던졌을 때 \"I'd lean towards Postgres, given the joins\"처럼 근거와 함께 입장을 밝히면서도 여지를 남길 수 있어요. \"I'd choose\"라고 단정하면 면접관이 반례를 던졌을 때 물러설 공간이 없는데, lean towards는 새 정보가 오면 입장을 바꿀 수 있다는 유연함까지 같이 전달돼요.",
    "exampleKo": "저는 더 단순한 쪽으로 기울어요."
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
    ],
    "detail": "'~에 달려 있다'는 뜻으로, 시니어 엔지니어의 단골 첫마디예요 — 정답이 조건에 따라 달라진다는 걸 보여주거든요. \"캐시 쓸까요 말까요?\" 같은 질문에 \"It depends on the read-write ratio\"처럼 어떤 변수에 달렸는지를 짚으면 깊이 있어 보여요. 함정은 \"It depends\"만 말하고 멈추는 것 — 북미 면접에서 그건 회피로 들리니, 반드시 on 뒤에 구체적 조건을 붙이고 각 경우의 답까지 이어가야 해요.",
    "exampleKo": "읽기-쓰기 비율에 따라 달라요."
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
    ],
    "detail": "edge case는 '가장자리 케이스', 즉 입력이 극단값일 때 터지는 드문 조건을 말해요. 코딩 면접에서 풀이를 끝낸 뒤 \"The edge case is an empty input — 그건 여기서 처리돼요\"라고 먼저 짚으면 면접관이 지적하기 전에 점수를 따는 장면이 전형적이에요. corner case와 거의 같이 쓰이지만, 엄밀히는 corner case가 '여러 극단 조건이 동시에 겹치는 경우'라 더 드문 상황을 가리켜요.",
    "exampleKo": "엣지 케이스는 입력이 비어 있는 경우예요."
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
    ],
    "detail": "필요 이상으로 복잡하게 만들지 말자는 제동 거는 말로, '오버엔지니어링'이라는 단어 그대로예요. 시스템 디자인에서 트래픽이 초당 10건인데 누가(혹은 자신이) Kafka에 샤딩까지 꺼내려 할 때 \"Let's not over-engineer this, a single Postgres is fine\"이라고 끊는 장면이 딱이에요. 면접에서 이 말을 스스로에게 적용하면 실용적 판단력을 보여주는데, 면접관의 제안에 대고 쓰면 무례하게 들릴 수 있으니 방향에 주의하세요.",
    "exampleKo": "이 부분은 과하게 설계하지 맙시다."
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
    ],
    "detail": "일단 가장 단순한 버전부터 만들고 필요해지면 키우자는, 면접 전략으로도 검증된 접근 선언이에요. 시스템 디자인 첫 다이어그램에서 \"Let's start simple — 서버 하나, DB 하나. 그다음 병목을 찾죠\"라고 시작하면 구조적으로 사고한다는 인상을 줘요. 'start small'과 비슷하지만 start simple은 복잡도, start small은 규모에 초점이 있어요 — 그리고 이 말을 했으면 나중에 실제로 발전시키는 단계를 보여줘야 빈말이 안 돼요.",
    "exampleKo": "일단 단순하게 시작하고, 그다음에 최적화하죠."
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
    ],
    "detail": "병의 좁은 목처럼 전체 흐름을 막는 지점이 어디인지 지목하는 표현이에요. 시스템 디자인에서 면접관이 \"이게 10배로 커지면?\"이라고 물을 때 \"The bottleneck is the DB write path\"처럼 막히는 지점을 정확히 짚고 거기만 고치는 흐름이 정석이에요. 주의할 건 모든 느린 부분이 bottleneck은 아니라는 것 — 전체 처리량을 실제로 제한하는 한 지점만 그렇게 부르고, 그냥 느린 건 slow part라고 해야 정확해요.",
    "exampleKo": "병목은 DB 쓰기예요."
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
    ],
    "detail": "최악의 입력이 들어왔을 때 어떻게 되는지 말하는, 복잡도 분석의 기본 어구예요. 코딩 면접에서 평균은 빠른 풀이를 설명한 뒤 \"In the worst case, it's O(n²) — 입력이 전부 같은 값일 때요\"처럼 한계를 먼저 자백하면 정직하고 깊이 있어 보여요. 'at worst'와 동일하게 쓰이는데, 핵심 포인트는 worst case를 말할 땐 '어떤 입력이 그 worst를 만드는지'까지 같이 말해야 진짜 이해한 걸로 보인다는 거예요.",
    "exampleKo": "최악의 경우엔 O(n²)이에요."
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
    ],
    "detail": "에러도 예외도 없이 모든 게 술술 풀리는 '정상 시나리오'를 뜻하는 업계 은어예요. 페어 프로그래밍이나 설계 설명에서 \"The happy path is just two calls — 이제 실패 케이스를 보죠\"처럼 정상 흐름부터 깔고 예외로 넘어가는 구조를 잡을 때 써요. 한국어 '행복 경로'로 직역하면 어색하니 그냥 '정상 흐름'으로 이해하면 되고, 반대 개념은 sad path 또는 failure path — 면접에선 happy path만 다루고 끝내면 반드시 지적당해요.",
    "exampleKo": "정상 흐름은 호출 두 번이면 끝이에요."
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
    ],
    "detail": "fall apart는 '산산이 부서지다'라서, 내 설계가 어떤 조건에서 무너지는지 스스로 폭로하는 표현이에요. 시스템 디자인에서 \"이 단일 노드 설계, where this falls apart is high load — 그래서 그땐 샤딩이 필요해요\"처럼 한계를 선제적으로 짚을 때 시니어다움이 드러나요. 'breaks down'과 거의 같지만 falls apart가 더 극적인(완전 붕괴) 어감이고, 약점을 면접관이 찾기 전에 내가 먼저 말하는 게 이 표현의 진짜 용도라는 걸 기억하세요.",
    "exampleKo": "이게 무너지는 지점은 부하가 높을 때예요."
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
    ],
    "detail": "walk through는 '같이 걸으며 안내한다'는 직역 그대로, 상대 속도에 맞춰 단계별로 짚어주겠다는 뜻이에요. 코드를 다 짠 뒤 \"Let me walk you through it — 먼저 입력을 파싱하고...\"처럼 위에서부터 한 줄씩 설명을 시작하는 신호로 면접에서 정말 빈번해요. 'explain'은 그냥 설명, walk through는 '순서대로 함께 따라간다'는 구조감이 있다는 차이 — 그리고 walk you through(사람을 안내)와 walk through the code(코드를 훑다)의 어순을 헷갈리지 마세요.",
    "exampleKo": "하나씩 차근차근 짚어드릴게요."
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
    ],
    "detail": "디테일에 파묻혀 있다가 한발 물러나 전체를 다시 보겠다는 시야 전환 신호예요. 시스템 디자인에서 캐시 TTL 같은 세부를 한참 파다가 \"Stepping back, do we even need this layer?\"처럼 더 근본적인 질문으로 올라갈 때 쓰면 사고의 고도 조절이 된다는 인상을 줘요. 'zoom out'과 거의 같은데, stepping back은 '잠깐 멈추고 재점검'하는 성찰의 뉘앙스가 좀 더 강해요 — 너무 자주 쓰면 산만해 보이니 굵직한 전환점에서만 쓰세요.",
    "exampleKo": "한발 물러나서 보면, 이게 정말 필요한가요?"
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
    ],
    "detail": "catch는 '잡아냄'이라서, 남이 내 실수나 빠뜨린 걸 발견했을 때 \"잘 잡았네요\"라고 인정해주는 짧은 표현이에요. 면접관이 \"여기 null이면 어떻게 되죠?\"라고 버그를 지적했을 때 \"Good catch, that's a bug — 고칠게요\"라고 받으면 방어적이지 않고 피드백을 수용하는 태도가 보여서 오히려 점수가 돼요. 주의점은 진짜 지적이 맞을 때만 쓸 것 — 틀린 지적에도 습관적으로 good catch를 던지면 그냥 영혼 없는 추임새가 돼요.",
    "exampleKo": "잘 잡으셨네요, 그거 버그 맞아요."
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
    ],
    "detail": "차를 후진(back up)시키듯 대화를 조금 전 지점으로 되돌리겠다는 뜻이에요. 설명하다가 순서가 꼬였거나 중요한 전제를 빠뜨렸다는 걸 깨달았을 때 \"Let me back up — 사실 입력 형식부터 말했어야 했네요\"처럼 자연스럽게 되감는 장면에서 나와요. 데이터 백업(back up the data)과 철자가 같아서 헷갈리는데 여기선 '후진'이고, 'let me step back'(시야를 넓히는 것)과도 달라요 — back up은 시간상 되돌아가기, step back은 추상화 레벨 올리기예요.",
    "exampleKo": "잠깐 앞 얘기로 돌아갈게요."
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
    ],
    "detail": "punt는 미식축구에서 공격을 포기하고 공을 차서 넘기는 플레이라서, '이건 지금 안 다루고 미루겠다'는 뜻이 됐어요. 45분짜리 면접에서 시간 배분이 생명일 때 \"I'm going to punt on auth for now — 코어 플로우부터요\"처럼 우선순위를 명시적으로 정리하면 오히려 프로답게 보여요. 'skip'은 아예 건너뛰는 것이고 punt는 '중요한 건 알지만 의도적으로 뒤로 미룬다'는 차이 — 그래서 punt했으면 나중에 다시 언급하거나 면접관에게 다뤄야 할지 물어보는 게 좋아요.",
    "exampleKo": "인증은 일단 미뤄두려고요."
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
    ],
    "detail": "naive는 '순진한'이라는 직역처럼, 최적화 전혀 안 한 가장 무식하고 단순한 첫 번째 풀이를 가리켜요. 코딩 면접의 정석 오프닝이 바로 \"The naive approach is brute force, O(n²) — 이제 이걸 개선해보죠\"인데, 단순한 답부터 깔고 발전시키는 구조를 만들어줘요. 주의할 점은 사람한테 naive라고 하면 모욕이지만 접근법(approach)에 붙이면 완전히 중립적인 기술 용어라는 것 — 'brute force'는 그중에서도 전수조사 방식만 가리키는 더 좁은 말이에요.",
    "exampleKo": "가장 단순한 방식은 브루트포스예요."
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
    ],
    "detail": "이 문제를 푸는 결정적 깨달음, 즉 '이걸 알아채는 순간 풀리는 한 가지'를 지목하는 표현이에요. 알고리즘 풀이에서 \"The key insight is it's sorted — 그래서 이진 탐색이 돼요\"처럼 최적 풀이로 점프하게 해주는 관찰을 말할 때 써요. observation(그냥 관찰)보다 insight는 '문제를 푸는 열쇠가 되는 통찰'이라는 무게가 있어서, 사소한 사실에 남발하면 오히려 가벼워 보여요 — 진짜 풀이의 핵심 하나에만 아껴 쓰세요.",
    "exampleKo": "핵심 포인트는 이게 정렬돼 있다는 거예요."
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
    ],
    "detail": "설명 한 단락을 끝내고 상대가 따라오고 있는지 확인하는 체크인 질문이에요. 화이트보드에서 핵심 로직을 설명한 뒤 \"Does that make sense so far?\"라고 던지면 일방적으로 떠들지 않고 면접관과 대화한다는 인상을 줘요. \"Do you understand?\"는 '너 이해 못 했지?'처럼 상대를 깎는 느낌이라 절대 금지 — make sense는 '내 설명이 말이 되나요?'로 책임을 내 쪽에 두는 공손한 구조라는 게 결정적 차이예요.",
    "exampleKo": "여기까지 이해되시나요?"
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
    ],
    "detail": "원을 그리며 돌아오듯, 지금은 넘어가지만 나중에 반드시 그 주제로 돌아오겠다는 약속이에요. 시스템 디자인 중에 캐싱 얘기가 일찍 나왔을 때 \"Let's circle back to caching later — 일단 데이터 모델부터요\"처럼 논의 순서를 통제하는 데 써요. punt on이 '미루기' 자체에 방점이라면 circle back은 '돌아온다'는 약속에 방점 — 그래서 이 말을 해놓고 진짜로 안 돌아가면 면접관이 기억하고 있다가 안 좋게 볼 수 있어요. 메모해두세요.",
    "exampleKo": "캐싱 얘기는 나중에 다시 돌아오죠."
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
    ],
    "detail": "'일단 지금은 ~라고 가정하자'며 문제 공간을 의도적으로 좁히는 표현이에요. 시스템 디자인에서 멀티 리전 복잡도에 빨려들기 전에 \"For now, let's assume single region — 그건 나중에 확장할게요\"처럼 단순화 가정을 명시적으로 깔고 시작하는 장면이 전형적이에요. 핵심은 가정을 입 밖에 내서 면접관의 암묵적 동의를 받는 것 — 말 없이 혼자 가정하고 진행하면 나중에 \"멀티 리전은요?\"라는 지적에 무방비가 돼요. assume과 suppose는 거의 같지만 기술 토론에선 assume이 압도적으로 자연스러워요.",
    "exampleKo": "일단 단일 리전이라고 가정하죠."
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
    ],
    "detail": "전기 회로의 '쇼트'에서 온 말인데, `a && b`에서 a가 false면 b는 아예 평가도 안 하고 끝난다는 거예요. 인터뷰에서 'null 체크를 앞에 두면 뒤 조건은 안전하다' 같은 걸 설명할 때 자연스럽게 나오는 표현이죠. early return이랑 헷갈리기 쉬운데, short-circuit은 표현식(&&, ||) 레벨이고 early return은 함수 레벨이라는 차이가 있어요.",
    "exampleKo": "첫 번째 체크가 실패하면 AND는 거기서 바로 끊겨요. 뒤는 평가도 안 하고요."
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
    ],
    "detail": "early return을 그냥 동사처럼 붙여 쓴 구어체예요. 함수 맨 위에서 `if (!input) return;` 한 줄 치면서 '중첩 안 만들고 위에서 빠르게 털어낼게요'라고 말할 때 딱 이거죠. guard clause라고 부르는 사람도 많으니 같이 알아두면 좋고, 정석 어순은 'return early'지만 인터뷰 구어에선 둘 다 자연스러워요.",
    "exampleKo": "코드 깔끔하게 가져가려고 빈 입력이면 바로 리턴해요."
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
    ],
    "detail": "위의 케이스들을 다 빗겨가고 아래로 '떨어진다'는 그림이에요. switch 문이나 if-else 체인 끝의 디폴트 처리를 설명할 때 나오죠. 주의할 건 switch에서 break 빠뜨려서 의도치 않게 다음 case로 흘러가는 버그도 'fall through'라고 불러서, 의도된 동작인지 버그 얘기인지 맥락으로 구분해야 해요.",
    "exampleKo": "아무것도 안 맞으면 디폴트 케이스로 넘어가요."
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
    ],
    "detail": "guard가 '입구에서 지키는 경비'라는 그림이라, 단순 null check보다 방어 의도가 더 묻어나는 표현이에요. 코드 리뷰에서 '여기 null 들어오면 NPE 나는데요?' 지적받고 고칠 때, 혹은 인터뷰에서 방어 코드를 짜며 내레이션할 때 쓰죠. 'check for null'은 확인만 한다는 느낌이고, guard against는 막는다는 행동까지 포함된다는 미묘한 차이가 있어요.",
    "exampleKo": "필드에 손대기 전에 널부터 막아요."
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
    ],
    "detail": "같은 입력이 또 들어오면 다시 계산 안 하고 저장해둔 결과를 쓴다는 뜻이에요. DP 문제 풀 때 재귀에 캐시 얹으면서, 또는 React의 useMemo 설명하면서 나오는 단어죠. 철자가 memorize가 아니라 memoize라는 게 함정인데, 발음도 '메모아이즈'예요 — memorize라고 하면 듣는 쪽이 갸우뚱합니다.",
    "exampleKo": "결과를 메모이즈해 둬서 다시 계산 안 해요."
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
    ],
    "detail": "거품이 수면 위로 올라오듯 에러를 상위 레이어로 올려보낸다는 그림이에요. catch에서 로그만 찍고 끝내지 말고 rethrow해서 호출자가 알게 하자, 이런 얘기할 때 나오죠. 반대말이 'swallow the error'(에러를 삼킨다)인데, 이 예문처럼 둘을 대비시켜 말하면 에러 처리 철학이 있다는 인상을 줘요.",
    "exampleKo": "에러를 삼키지 않고 위로 전파해요."
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
    ],
    "detail": "dedupe는 deduplicate의 줄임말로 실무 구어에서 압도적으로 많이 쓰여요. 발음은 '디-둡'이고요. 데이터 파이프라인이나 리스트 처리에서 'id별로 한 번씩만 남긴다'를 설명할 때 딱이죠. SQL의 distinct랑 의미는 같은데, 코드 내레이션에선 dedupe가 훨씬 자연스러워요.",
    "exampleKo": "키 기준으로 중복을 제거해서 각 id가 한 번씩만 나와요."
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
    ],
    "detail": "낱개로 하나씩 보내지 않고 묶어서 한 방에 처리한다는 뜻이에요. N+1 쿼리를 고치거나 API 왕복 횟수를 줄이는 설명에서 거의 반사적으로 나오는 표현이죠. buffer랑 헷갈릴 수 있는데, buffer는 일단 쌓아두는 것 자체고 batch는 묶어서 한 번에 '처리'하는 행위에 방점이 있어요.",
    "exampleKo": "왕복 횟수 줄이려고 이 쓰기들을 묶어서 처리해요."
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
    ],
    "detail": "O(n)을 입으로 읽는 법이 'O of n'이에요 — 이걸 모르면 화이트보드에 쓰고도 말을 못 해서 은근히 당황하죠. 코딩 인터뷰에서 풀이 끝나면 복잡도를 묻기 전에 먼저 말해주는 게 좋은데 그때 쓰는 표현이에요. O(n²)는 'O of n squared', O(log n)은 'O of log n'으로 읽는다는 것까지 세트로 익혀두세요.",
    "exampleKo": "각 항목을 한 번씩만 건드리니까 이건 O(n)이에요."
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
    ],
    "detail": "새 배열을 만들지 않고 원본을 그 자리에서 직접 고친다는 뜻으로, 공간 복잡도를 O(1)로 만들 때 나오는 말이에요. 인터뷰에서 'in place로 풀어볼게요'라고 선언하고 시작하는 장면이 전형적이죠. 다만 mutate는 부수효과를 암시하는 단어라서, 원본을 건드려도 되는지 면접관에게 먼저 물어보고 쓰는 게 안전해요.",
    "exampleKo": "추가 메모리 할당을 피하려고 제자리에서 직접 수정해요."
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
    ],
    "detail": "until 뒤에 오는 게 '종료 조건'이라는 게 포인트예요 — 그 조건이 참이 되는 순간 멈춥니다. while 루프나 투 포인터 풀이를 내레이션할 때 'It loops until they meet' 식으로 자연스럽게 나오죠. while(조건)은 조건이 참인 '동안' 도는 거라 until과 논리가 반대니까, 말로 설명할 때 부정을 빼먹지 않게 조심하세요.",
    "exampleKo": "포인터가 끝에 닿을 때까지 반복해요."
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
    ],
    "detail": "두 값의 자리를 맞바꾼다는 짧고 단순한 표현이에요. 버블 정렬이나 투 포인터 정렬 풀이에서 'out of order면 swap' 식으로 내레이션할 때 그대로 나오죠. 'swap out'과 헷갈리면 안 되는데, swap out은 구현체나 부품을 통째로 갈아끼운다는 뜻이라 의미가 완전히 달라요.",
    "exampleKo": "순서가 어긋나 있으면 둘을 맞바꿔요."
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
    ],
    "detail": "캐시에 있으면(hit) 비싼 경로를 안 타고 바로 리턴한다는, read path 설명의 단골 문장이에요. 시스템 디자인에서 캐시 어사이드 흐름을 그리면서 '히트면 여기서 끝, 미스면 DB로'라고 말할 때 쓰죠. cache hit/miss는 항상 쌍으로 다니니까, hit만 말하고 miss 경로 설명을 빼먹으면 면접관이 바로 물어봅니다.",
    "exampleKo": "캐시에 있으면 바로 리턴해요. DB 호출은 없고요."
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
    ],
    "detail": "루프를 돌면서 결과를 한 곳에 차곡차곡 쌓는다는 표현이에요. reduce/fold를 설명하거나 running total(누적 합) 패턴을 내레이션할 때 나오죠 — accumulator라는 변수명도 여기서 온 거예요. aggregate랑 비슷해 보이지만 aggregate는 DB나 통계 쪽 집계 느낌이고, accumulate는 루프 안에서 쌓아가는 동작 그 자체를 말해요.",
    "exampleKo": "여기서 누적 합계에 계속 더해 나가요."
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
    ],
    "detail": "동전 뒤집듯 boolean을 true↔false로 반전시킨다는 표현이에요. 토글 로직이나 '매치를 한 번이라도 보면 상태를 바꾼다' 같은 흐름을 설명할 때 나오죠. 'set the flag'는 true로 켠다는 뜻이라 미묘하게 다른데, flip은 현재 값의 반대로 뒤집는 거니까 둘을 섞어 쓰면 로직 설명이 어긋나요.",
    "exampleKo": "매치를 발견하면 플래그를 뒤집어요."
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
    ],
    "detail": "traverse의 구어 버전으로, 산책하듯 노드를 하나씩 밟고 지나간다는 그림이에요. 트리/그래프 문제에서 DFS 풀이를 시작하며 '루트부터 타고 내려갈게요'라고 말할 때 딱이죠. 'walk you through'(차근차근 설명하다)와 형태가 비슷해서 헷갈리기 쉬운데, walk the tree는 자료구조를 순회한다는 전혀 다른 뜻이에요.",
    "exampleKo": "루트에서부터 깊이 우선으로 트리를 타고 내려가요."
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
    ],
    "detail": "recurse는 recursion에서 역으로 만들어진 동사인데 실무 구어에선 아주 자연스러워요. 트리 문제에서 '각 자식으로 재귀 들어가서 결과를 합친다'는 분할 정복 구조를 설명할 때 그대로 쓰죠. 전치사가 on이라는 게 포인트고(recurse on each child), 이 말을 꺼냈으면 base case가 뭔지도 바로 이어서 말해주는 게 인터뷰 매너예요.",
    "exampleKo": "각 자식에 대해 재귀 호출하고 결과를 합쳐요."
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
    ],
    "detail": "cap이 '뚜껑'이라, 위에 뚜껑을 씌워서 그 이상 못 올라가게 한다는 그림이에요. 페이지 사이즈 상한이나 재시도 횟수 제한 같은 걸 설명할 때 'We cap it at 100' 식으로 나오죠. cap은 상한만 거는 거고, 위아래 양쪽을 다 제한할 땐 clamp라고 하니까 구분해두면 좋아요.",
    "exampleKo": "허용된 최대 페이지 크기로 상한을 둬요."
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
    ],
    "detail": "이미 방문한 건 건너뛴다는 뜻으로, seen은 visited의 구어적 표현이에요. 그래프 탐색에서 visited set을 두고 사이클을 방지하는 설명을 할 때 거의 그대로 나오는 문장이죠. 이 말을 했으면 'using a visited set'처럼 어떻게 기억하는지를 같이 말해줘야 — 안 그러면 면접관이 '어떻게 seen인지 알아요?'라고 바로 파고들어요.",
    "exampleKo": "visited 셋을 써서 이미 본 건 건너뛰어요."
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
    ],
    "detail": "hash를 동사로 써서 '키를 해시 함수에 돌린다'는 뜻이에요. 해시맵 내부 동작을 설명하거나 샤딩에서 '키를 해시해서 어느 노드로 갈지 정한다'고 말할 때 나오죠. 주의할 건 hash는 단방향이라는 것 — encrypt(복호화 가능)와 섞어 말하면 보안 질문에서 바로 감점이에요.",
    "exampleKo": "키를 해시해서 어느 버킷에 들어갈지 찾아요."
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
    ],
    "detail": "이전 값을 덮어써서 사라지게 한다는 뜻이에요. 맵에 같은 키로 put 하면 어떻게 되는지, 혹은 upsert 동작을 설명할 때 나오는 문장이죠. append(뒤에 쌓임)와 정반대 동작이라, '같은 키가 또 오면 덮어쓰나요 쌓이나요?'를 먼저 명확히 해주면 설명이 훨씬 깔끔해져요.",
    "exampleKo": "그 키의 이전 값을 덮어써요."
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
    ],
    "detail": "리스트 끝에 덧붙인다는 뜻인데, append 자체가 '끝에 붙임'이라 'to the end'는 사실 강조용 군더더기예요 — 그래도 말로 할 땐 자연스러워요. 동적 배열의 amortized O(1) 얘기를 하면서 쓰는 전형적인 문장이죠. 대비되는 prepend(앞에 붙임)는 배열에선 O(n)이라는 것까지 같이 말하면 자료구조 이해가 드러나요.",
    "exampleKo": "끝에 덧붙이는 건 상수 시간에 돼요."
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
    ],
    "detail": "스택 맨 위에서 '떼어낸다'는 그림으로, off가 분리되는 느낌을 살려줘요. 괄호 매칭이나 모노토닉 스택 문제를 내레이션할 때 'push... pop off... ' 식으로 계속 나오죠. pop은 꺼내서 제거까지 하는 거고 peek은 보기만 하는 거라, 이 둘을 섞어 말하면 알고리즘 설명이 통째로 꼬여요.",
    "exampleKo": "스택에서 꺼내서 처리해요."
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
    ],
    "detail": "자동차 스로틀처럼 흐름을 조여서 일정 주기로만 통과시킨다는 뜻이에요. 외부 API 호출량 제한이나 스크롤 핸들러 최적화를 설명할 때 나오죠. debounce와의 차이가 면접 단골인데 — throttle은 '주기마다 최대 한 번', debounce는 '잠잠해진 뒤 마지막 한 번'이라 발동 타이밍이 완전히 달라요.",
    "exampleKo": "호출을 초당 한 번으로 제한해요."
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
    ],
    "detail": "입력이 잠잠해질 때까지 기다렸다가 마지막 한 번만 실행한다는 뜻이에요. 검색창 자동완성에서 키 입력마다 API 쏘지 않게 300ms 디바운스 거는 게 전형적인 장면이죠. throttle과 방향이 헷갈리기 쉬운데, 검색 입력은 debounce, 무한 스크롤은 throttle이 보통이라고 짝지어 외워두면 안 헷갈려요.",
    "exampleKo": "검색을 날리기 전에 입력을 디바운스해요."
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
    ],
    "detail": "coerce는 '억지로 시키다'라는 어감이 있어서, 타입을 강제로 바꾼다는 뉘앙스가 살아있는 단어예요. 타입이 섞인 값들을 비교하기 전에 문자열로 통일하는 장면에서 나오죠. cast와의 차이를 알아두면 좋은데 — cast는 명시적 변환이고, coerce는 특히 JS에서 언어가 암묵적으로 바꿔버리는 변환을 가리킬 때가 많아요.",
    "exampleKo": "비교하기 전에 문자열로 강제 변환해요."
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
    ],
    "detail": "걸러서 '버린다'는 게 핵심이고, empties는 빈 값들을 명사로 뭉뚱그린 구어예요. CSV 만들기 전에 빈 문자열 제거하는 식의 데이터 정제 장면에서 나오죠. 함정은 out의 유무 — filter는 '남길 것'을 고르는 거고 filter out은 '버릴 것'을 지목하는 거라, out 빼먹으면 의미가 정반대로 들릴 수 있어요.",
    "exampleKo": "join 하기 전에 빈 값들을 걸러내요."
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
    ],
    "detail": "컬렉션 '전체에 걸쳐(over)' 변환 함수를 적용한다는 함수형 표현이에요. 객체 리스트에서 id만 뽑아내는 것처럼 모양만 바꾸는 변환을 설명할 때 쓰죠. map은 길이가 그대로인 1:1 변환이라는 게 포인트 — 걸러내는 건 filter, 하나로 줄이는 건 reduce인데, map이라 말하면서 길이가 줄어드는 설명을 하면 면접관이 갸우뚱해요.",
    "exampleKo": "맵을 돌려서 id들만 뽑아내요."
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
    ],
    "detail": "default를 동사로 써서 '값이 없으면 자동으로 거기로 떨어진다'는 뜻이에요. 설정값이나 옵셔널 파라미터 동작을 설명할 때 'It defaults to zero' 식으로 나오죠. fall back to와 비슷한데 어감이 달라요 — default to는 설계된 기본값으로 가는 거고, fall back은 뭔가 실패했을 때 차선책으로 물러나는 느낌이에요.",
    "exampleKo": "필드가 없으면 기본값 0으로 떨어져요."
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
    ],
    "detail": "그냥 호출(call)이 아니라 '책임을 넘긴다'는 설계 의도가 담긴 단어예요. 컨트롤러는 얇게 유지하고 비즈니스 로직은 서비스 레이어가 주인이라고 아키텍처를 설명할 때 딱이죠. call이라고 하면 단순 호출로 들리지만 delegate라고 하면 레이어 간 역할 분리를 의식하고 있다는 게 전달되니, 설계 면접에서 은근히 점수가 되는 단어예요.",
    "exampleKo": "그건 서비스 레이어에 위임해요."
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
    ],
    "detail": "스레드가 그 자리에 멈춰 서서 기다린다는 뜻이에요 — 단순히 '기다린다'가 아니라 스레드를 점유한 채 멈춘다는 게 핵심이죠. 동기 커넥션 획득이나 락 대기 같은 걸 설명할 때 나와요. async/non-blocking과 대비되는 개념이라, 'It blocks, so under load the thread pool drains' 같은 식으로 부작용까지 이어 말하면 시니어다운 설명이 돼요.",
    "exampleKo": "커넥션이 준비될 때까지 블록돼요."
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
    ],
    "detail": "부채(fan)를 펼치듯 요청을 여러 곳에 동시에 뿌린다는 그림이에요. 여러 서비스를 병렬로 호출하고 Promise.all로 모으는 흐름을 설명할 때 전형적으로 나오죠. fan-out은 뿌리는 쪽, fan-in은 결과를 모으는 쪽이라 쌍으로 다니는 개념이고, scatter-gather 패턴이라고 부르는 사람도 있으니 같이 알아두세요.",
    "exampleKo": "요청을 병렬로 뿌리고 전부 await 해요."
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
    ],
    "detail": "실패하면 재시도하되, 간격을 점점 벌려가며(뒤로 물러서며) 한다는 뜻이에요. 외부 API 타임아웃 처리를 설명할 때 거의 필수로 나오는 문장이죠. 그냥 retry만 말하면 다 같이 동시에 재시도해서 서비스를 더 죽이는 retry storm 우려가 있으니, 'exponential backoff with jitter'까지 붙여 말하면 운영 경험이 있다는 티가 나요.",
    "exampleKo": "타임아웃이 나면 백오프 걸고 재시도해요."
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
    ],
    "detail": "호출을 포장지로 감싸듯 한 겹 둘러싼다는 표현이에요. try-catch로 감싸거나, 로깅/재시도 같은 횡단 관심사를 데코레이터나 미들웨어로 두르는 설명에서 나오죠. 전치사는 in을 써서 'wrap the call in a try-catch'가 되고, 감싸는 쪽을 wrapper라고 명사로 부르는 것까지 세트로 익혀두면 좋아요.",
    "exampleKo": "그 호출을 try-catch로 감싸요."
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
    ],
    "detail": "들쭉날쭉한 데이터를 일관된 형태로 정리한다는 뜻인데, 문맥에 따라 두 가지 의미가 있어요. DB 쪽에선 중복 없애는 테이블 정규화고, 프론트/앱 쪽에선 중첩된 응답을 id 기반 flat map으로 펴는 걸 말하죠. 인터뷰에서 어느 쪽인지 모호하면 'into a flat map'처럼 결과 형태를 붙여서 오해를 차단하는 게 요령이에요.",
    "exampleKo": "데이터를 평탄한 맵 구조로 정규화해요."
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
    ],
    "detail": "around가 핵심이에요 — 위험한 코드 구간 '둘레에' 락을 둘러친다는 그림이죠. 레이스 컨디션 얘기가 나왔을 때 'critical section을 락으로 보호한다'고 답하는 장면에서 그대로 쓰여요. 다만 락 범위가 넓으면 그게 병목이 되니까, 'we lock around just this section'처럼 범위를 좁힌다는 말과 데드락 주의까지 이어 말하면 좋아요.",
    "exampleKo": "레이스 피하려고 그 부분을 락으로 감싸요."
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
    ],
    "detail": "flush는 변기 물 내리듯, 쌓인 걸 한 번에 목적지로 흘려보내고 버퍼를 비운다는 그림이에요. 로그가 바로 안 찍히는 이유를 설명하거나 배치 쓰기에서 '가득 차면 flush' 하는 동작을 말할 때 나오죠. clear와 헷갈리면 안 되는데 — clear는 데이터를 그냥 버리는 거고, flush는 내보낸 다음 비우는 거라 데이터가 보존돼요.",
    "exampleKo": "버퍼가 가득 차면 쌓인 걸 한 번에 내보내고 비워요."
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
    ],
    "detail": "여러 항목을 한꺼번에 선택하는 기능을 가리키는 표준 단어예요. 'multiple selection'이라고 풀어 말하는 사람은 거의 없고, 스펙 논의나 PR 리뷰에서 명사처럼 'we need multi-select'로 툭 던지는 게 자연스러워요. 테이블에 일괄 삭제(bulk action) 붙이자는 얘기가 나오면 거의 자동으로 따라 나오는 말이고, bulk action과 세트로 기억해두면 좋아요.",
    "exampleKo": "여기엔 체크박스로 다중 선택이 들어가야 해요."
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
    ],
    "detail": "시프트 누른 채 클릭해서 범위를 통째로 선택하는 동작인데, 영어에서는 이걸 그대로 동사로 써요 — 'shift-click the last row'처럼요. 파일 탐색기 스타일 선택 UX를 스펙으로 정리할 때 'shift-click selects a range' 한 줄로 끝나는 게 깔끔하죠. 헷갈리기 쉬운 건 cmd/ctrl-click과의 역할 분담인데, shift는 범위, cmd/ctrl은 개별 추가라는 관습을 어기면 사용자들이 바로 불평해요.",
    "exampleKo": "시프트 클릭하면 사이에 있는 항목이 전부 선택돼요."
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
    ],
    "detail": "이미 선택된 것에 항목을 하나씩 추가하거나 빼는(토글) 클릭이에요. Mac은 cmd, Windows는 ctrl이라 문서나 스펙에서는 'cmd/ctrl-click'으로 병기하고, 말할 때는 자기 플랫폼 기준으로 'cmd-click'이라고 해버려요. shift-click(연속 범위)과 대비되는 개별 선택이라는 게 포인트고, 데모하다가 'cmd-click to add it'이라고 하면 바로 알아들어요. 코드에서는 metaKey/ctrlKey 분기를 둘 다 처리해야 한다는 것도 같이 챙기세요.",
    "exampleKo": "커맨드 클릭하면 선택에 추가돼요."
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
    ],
    "detail": "선택된 걸 전부 한 번에 해제한다는 뜻이에요. 'deselect'가 항목 하나를 빼는 느낌이라면 clear selection은 싹 비우는 쪽이라, 'Esc clears the selection' 같은 식으로 키보드/빈 공간 클릭 동작을 정의할 때 나와요. 다중 선택 UI 만들 때 '뭘 누르면 선택이 풀리는가'를 안 정해두면 QA에서 꼭 걸리니까, 스펙 단계에서 이 표현으로 먼저 못 박아두는 게 좋아요.",
    "exampleKo": "빈 공간을 클릭하면 선택이 해제돼요."
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
    ],
    "detail": "누른 채로 끌고 가는 그 동작 그대로인데, 'drag the card to another column'처럼 타동사로 목적지까지 한 문장에 붙이는 게 자연스러워요. 칸반 보드나 파일 업로드 데모하면서 손으로 시늉하며 말하게 되는 단어죠. drag 자체는 '끌기'만 가리키고 놓는 것까지 포함하면 drag-and-drop이니까, 동작 일부만 얘기할 땐 drag, 기능 전체를 얘기할 땐 drag-and-drop으로 구분해 쓰면 정확해요.",
    "exampleKo": "카드를 다른 컬럼으로 드래그할 수 있어요."
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
    ],
    "detail": "끌어서 놓는 인터랙션 전체를 가리키는 명사이자 형용사예요. 'we added drag-and-drop', 'drag-and-drop support'처럼 기능 단위로 말할 때 쓰고, 코드나 라이브러리 얘기할 땐 DnD로 줄이기도 해요. 인터뷰에서 프론트 경험 어필할 때 'I built the drag-and-drop reordering' 한 줄이면 뭘 만들었는지 바로 전달되는데, 이때 접근성(키보드로도 순서 변경 가능?) 질문이 따라올 수 있다는 건 미리 대비해두세요.",
    "exampleKo": "리스트 순서를 바꿀 수 있게 드래그 앤 드롭을 추가했어요."
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
    ],
    "detail": "사용자가 손으로 순서를 바꾸는 걸 말해요. sort가 기준에 따라 자동으로 정렬되는 거라면 reorder는 사람이 직접 끌어서 배치를 바꾸는 거라, 둘을 섞어 쓰면 스펙이 애매해져요. 'drag to reorder'는 거의 한 덩어리 관용구처럼 굳어져 있어서, 우선순위 리스트나 플레이리스트 기능 논의할 때 이 조합 그대로 나옵니다. 서버에 저장할 때 order/position 필드 갱신 전략(전체 재번호 vs 사이값)이 따라오는 주제라는 것도 알아두면 좋아요.",
    "exampleKo": "행을 드래그해서 순서를 바꿀 수 있어요."
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
    ],
    "detail": "카드나 행에 붙은 점 여섯 개짜리 그립 아이콘, 즉 '여기 잡고 끄세요' 영역이에요. 행 전체를 드래그 가능하게 만들면 안의 버튼 클릭이나 텍스트 선택이랑 충돌하는 문제가 꼭 생기는데, 그 해법을 논의할 때 'let's restrict it to the drag handle'처럼 나오죠. handle이 '손잡이'라는 직역 그대로의 느낌이라 외우기 쉽고, 라이브러리 옵션 이름(dragHandle)으로도 그대로 등장해요.",
    "exampleKo": "드래그 핸들을 잡았을 때만 드래그가 시작돼요."
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
    ],
    "detail": "snap은 자석에 착 붙듯이 '딱' 들어맞는 어감이에요. 드래그하다 놓았을 때 어중간한 위치가 아니라 정해진 슬롯으로 착 정렬되는 걸 묘사할 때 쓰고, 디자이너와 드롭 애니메이션 다듬으면서 'it should snap into place on drop'이라고 말하게 돼요. 같은 계열로 'snap to grid'(격자에 맞춰 정렬)도 있으니 세트로 기억해두세요. 부드럽게 미끄러져 들어가는 ease 애니메이션과는 어감이 달라서, snap이라고 하면 즉각적이고 단호한 느낌입니다.",
    "exampleKo": "놓으면 제자리에 딱 들어가요."
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
    ],
    "detail": "마우스를 올렸을 때의 시각 상태로, hover/focus/active/disabled 같은 상태 세트를 'states'라고 묶어 부르는 게 디자인 시스템 쪽 표준 어휘예요. 디자이너와 컴포넌트 리뷰하면서 'what does the hover state look like?'처럼 묻는 장면에서 나옵니다. 주의할 점 하나: 터치 디바이스엔 hover가 없어서, hover에만 중요한 정보를 숨겨두면 모바일에서 접근 불가가 돼요. 인터뷰에서 이 함정을 먼저 언급하면 좋은 인상을 줍니다.",
    "exampleKo": "호버 상태에서는 배경색이 바뀌어요."
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
    ],
    "detail": "키보드 포커스가 가 있을 때의 상태고, 'visible ring'은 그 파란 외곽선 얘기예요. 접근성(a11y) 리뷰에서 'outline: none으로 지워버리면 안 된다'는 지적과 함께 거의 반드시 나오는 표현이죠. 한 단계 더 아는 척하려면 :focus와 :focus-visible의 차이 — 마우스 클릭엔 링을 안 보이고 키보드 탐색에만 보이게 하는 게 후자 — 를 언급하면 됩니다. 북미 회사들은 a11y를 꽤 진지하게 보니 이 어휘는 꼭 챙기세요.",
    "exampleKo": "포커스 상태에는 눈에 잘 보이는 링이 필요해요."
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
    ],
    "detail": "버튼이 회색으로 죽어 있는 그 상태예요. 폼 유효성 논의에서 'keep it disabled until the form is valid'처럼 활성화 조건을 정할 때 나오죠. 다만 UX 쪽에서 단골 논쟁거리가 하나 있는데, disabled 버튼은 '왜 안 되는지'를 사용자에게 알려주지 않아서 차라리 활성화해두고 클릭 시 에러를 보여주자는 의견도 강해요. 인터뷰에서 이 트레이드오프를 먼저 꺼내면 시니어다운 답변이 됩니다.",
    "exampleKo": "유효해질 때까지 버튼은 비활성 상태로 둬요."
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
    ],
    "detail": "데이터 기다리는 동안 화면을 어떻게 보여줄지 얘기할 때 쓰는 말이에요. loading/empty/error state는 거의 한 묶음으로 다니는데, 'happy path 말고 이 세 상태도 디자인됐나요?'가 프론트 리뷰의 단골 체크포인트죠. 한 발 더 가면 spinner냐 skeleton(자리 잡아주는 회색 블록)이냐 선택이 따라오고, 레이아웃이 덜컥거리는 걸(layout shift) 막으려면 skeleton 쪽이 낫다는 식으로 이야기가 흘러갑니다.",
    "exampleKo": "로딩 상태에는 스피너를 보여주세요."
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
    ],
    "detail": "데이터가 0건일 때 보이는 화면을 가리키는 고유명사급 용어예요. 직역하면 '빈 상태'지만 실무에선 그냥 '엠티 스테이트'라는 하나의 디자인 산출물로 취급해서, '엠티 스테이트 시안 나왔어요?'처럼 말해요. 신규 유저가 처음 만나는 화면이라 온보딩 관점에서 중요하다는 맥락도 같이 알아두세요. 주의할 건 에러로 데이터를 못 불러온 상태(error state)와 진짜 0건인 상태를 같은 화면으로 뭉개면 안 된다는 점이에요.",
    "exampleKo": "엠티 스테이트에는 친근한 안내 문구가 들어가야 해요."
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
    ],
    "detail": "켜고 끄는 걸 왔다 갔다 전환한다는 동사이자, 그 스위치 UI 자체를 가리키는 명사이기도 해요. 'this toggles dark mode'처럼 동사로 쓰는 게 입에 붙어야 하고, 'toggle it on/off'처럼 방향을 붙일 수도 있어요. UI 밖에서도 'feature toggle'(기능 플래그)처럼 확장돼 쓰이는 단어라 활용 범위가 넓습니다. 두 상태 사이 전환이라는 게 핵심이라, 세 가지 이상 옵션 중 고르는 건 toggle이 아니라 select나 segmented control이에요.",
    "exampleKo": "이 스위치로 다크 모드를 켜고 꺼요."
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
    ],
    "detail": "아코디언이나 트리 뷰의 펼치기/접기를 가리키는 표준 동사 쌍이에요. open/close라고 해도 통하긴 하지만, 인라인으로 늘어났다 줄어드는 인터랙션엔 expand/collapse가 더 정확하고 프로페셔널하게 들려요. 사이드바 트리 메뉴 스펙 정리할 때 'clicking the chevron expands the node'처럼 나오죠. collapse는 '붕괴하다'라는 뜻도 있어서 처음엔 어색할 수 있는데, UI 문맥에선 그냥 '접힌다'로 굳어진 말입니다.",
    "exampleKo": "헤더를 클릭하면 펼쳐지거나 접혀요."
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
    ],
    "detail": "화면 밖에 있는 요소가 보이는 위치까지 스크롤시킨다는 뜻으로, DOM API 이름(scrollIntoView)이 그대로 구어가 된 케이스예요. 검색 결과 하이라이트나 채팅 새 메시지로 점프시키는 기능 논의할 때 'we scroll the match into view'처럼 나오죠. 'bring it into view'라고 해도 같은 뜻이에요. 구현할 땐 sticky 헤더에 가려지는 문제(scroll-margin으로 해결)가 단골 함정이니 같이 기억해두세요.",
    "exampleKo": "선택된 항목이 보이도록 스크롤해 주세요."
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
    ],
    "detail": "스크롤해도 화면에 붙어 따라오는 걸 말해요. '끈적하다'는 직역 그대로, 헤더가 위에 쩍 붙어 있는 이미지예요. CSS의 position: sticky에서 온 말이라 'make the header sticky'라고 하면 구현 방식까지 거의 정해진 셈이죠. fixed와의 차이가 단골 질문인데, fixed는 뷰포트에 무조건 고정이고 sticky는 부모 컨테이너 범위 안에서만 붙는다는 점 — 그리고 부모에 overflow: hidden 있으면 sticky가 안 먹는 함정도 유명해요.",
    "exampleKo": "스크롤할 때 헤더가 상단에 고정되게 해주세요."
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
    ],
    "detail": "사용자가 의도적으로 뭔가를 '꽂아서 고정'하는 동작이에요. 압정으로 꽂는다는 직역 그대로의 어감이라, 브라우저 탭 고정(pinned tab), 채팅 메시지 고정(pin a message), 데이터 그리드의 컬럼 고정처럼 어디서나 통해요. sticky와 헷갈릴 수 있는데, sticky는 스크롤에 반응하는 CSS 동작이고 pin은 사용자가 누른 액션이라는 차이가 있어요. 그리드 기능 논의에서 'can we pin the first column?' 같은 식으로 나옵니다.",
    "exampleKo": "컬럼을 왼쪽에 고정할 수 있어요."
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
    ],
    "detail": "모달이나 토스트, 알림을 '치워버린다'는 뉘앙스의 동사예요. close가 X 버튼을 누르는 명시적 닫기라면, dismiss는 바깥 탭, Esc, 스와이프처럼 '이거 더 안 볼게' 하는 모든 해제 동작을 포괄해요. 그래서 스펙 문서엔 'tap outside to dismiss', 'the toast auto-dismisses after 3 seconds'처럼 등장하죠. 형용사형 dismissible(닫을 수 있는)도 컴포넌트 prop 이름으로 자주 보이니 같이 익혀두세요.",
    "exampleKo": "바깥을 탭하면 모달이 닫혀요."
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
    ],
    "detail": "입력이 연달아 들어올 때 잠잠해질 때까지 기다렸다가 마지막 한 번만 실행하는 기법이고, 그대로 동사로 써요 — 'debounce the input by 300ms'. 검색 자동완성에서 타이핑마다 API를 쏘면 안 되니까 거는 게 전형적인 장면이죠. throttle과의 차이는 면접 단골인데, debounce는 '끝나고 한 번', throttle은 '진행 중에도 주기마다 한 번'이에요. 타이핑처럼 끝나는 시점이 중요하면 debounce, 스크롤처럼 진행 중에도 반응해야 하면 throttle이라고 정리하면 깔끔합니다.",
    "exampleKo": "검색 입력에 300ms 디바운스를 걸어요."
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
    ],
    "detail": "이벤트가 아무리 쏟아져도 정해진 주기마다 최대 한 번만 실행되게 조이는 기법이에요. 원래 '목을 조르다, 출력을 조절하다'라는 뜻이라 어감 그대로죠. 스크롤이나 리사이즈 핸들러가 초당 수백 번 불려서 버벅일 때 'let's throttle it'이 나오는 게 전형적인 장면이에요. debounce와 반드시 구분하세요 — debounce는 잠잠해진 뒤 한 번이라 스크롤 도중엔 아무것도 안 일어나지만, throttle은 스크롤 중에도 꾸준히 실행돼요. 백엔드의 rate limit과 발상이 같은 단어라는 것도 연결해두면 좋아요.",
    "exampleKo": "스크롤 핸들러에 스로틀을 걸어서 호출 빈도를 줄여요."
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
    ],
    "detail": "React 등에서 상태가 바뀌어 컴포넌트가 다시 그려지는 걸 말하고, 동사로 바로 써요 — 'that re-renders the whole list'. 리스트가 버벅이는 원인을 찾는 성능 디버깅에서 'what's causing the re-renders?'가 첫 질문으로 나오는 게 전형적이죠. 주의할 건 re-render가 곧 DOM 변경은 아니라는 점 — React가 함수를 다시 실행하는 것과 브라우저의 repaint/reflow는 다른 층위라, 이걸 구분해서 말하면 프론트 면접에서 점수를 법니다.",
    "exampleKo": "그 상태 변경 하나로 리스트 전체가 리렌더링돼요."
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
    ],
    "detail": "컴포넌트가 화면에 처음 붙는 게 mount, 떨어져 나가는 게 unmount예요. '장착하다'라는 직역 그대로의 이미지고, 'fetch on mount'(마운트 시 데이터 요청)처럼 시점을 가리키는 부사구로 굳어져 있어요. useEffect의 실행/클린업 타이밍 설명할 때 자연스럽게 나오는 말이죠. 단골 함정 하나: unmount된 뒤에 도착한 응답으로 setState를 치면 경고가 나니까, 클린업에서 요청을 abort하거나 플래그로 막아야 한다는 이야기가 이 어휘와 같이 따라다녀요.",
    "exampleKo": "컴포넌트가 마운트될 때 데이터를 가져와요."
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
    ],
    "detail": "자식 요소에서 발생한 이벤트가 부모로 거품처럼 떠오른다는, DOM 이벤트 버블링을 말하는 표현이에요. 행 안의 버튼을 눌렀는데 행 클릭 핸들러까지 같이 터지는 버그를 설명할 때 'the click bubbles up to the row'처럼 나오죠. 이 'bubble up'은 UI 밖에서도 에러를 상위로 전파한다는 뜻으로 재활용되는 만능 표현이에요. 반대 방향인 capture phase(부모→자식)도 있다는 걸 알아두면 이벤트 위임(event delegation) 질문까지 커버됩니다.",
    "exampleKo": "클릭 이벤트가 부모로 버블링돼요."
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
    ],
    "detail": "버블링되는 이벤트의 전파를 그 자리에서 끊는 거예요 — stopPropagation() API 이름 그대로요. 행 클릭으로 상세가 열리는 테이블에서 행 안의 삭제 버튼만은 상세를 안 열리게 하고 싶을 때 딱 나오는 말이죠. preventDefault와 절대 헷갈리면 안 되는데, stop propagation은 '부모에게 전달 차단', prevent default는 '브라우저 기본 동작 차단'으로 역할이 완전히 달라요. 면접에서 둘의 차이를 묻는 경우가 진짜 있습니다.",
    "exampleKo": "전파를 막아서 클릭이 행 핸들러까지 안 가게 해요."
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
    ],
    "detail": "링크 이동, 폼 제출, 우클릭 메뉴 같은 브라우저 기본 동작을 막는 거예요. preventDefault() 호출을 그대로 말로 옮긴 거라, SPA에서 폼을 자체 처리할 때 'prevent default and handle it ourselves'처럼 나오죠. stop propagation과의 구분이 핵심인데, 이건 '브라우저야, 네가 원래 하려던 거 하지 마'고 stop propagation은 '부모야, 이 이벤트 너한테 안 보낼게'예요. 폼 제출 시 페이지가 새로고침되는 클래식 버그의 답이 늘 이 표현입니다.",
    "exampleKo": "기본 동작을 막아서 폼이 제출되지 않게 해요."
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
    ],
    "detail": "입력값을 React state가 단일 소스로 쥐고 value + onChange로 묶는 패턴이에요. '제어 컴포넌트'라는 번역이 있긴 한데 실무에선 그냥 '컨트롤드'라고 불러요. 입력값에 실시간 유효성 검사나 포맷팅(전화번호 자동 하이픈 등)을 붙여야 할 때 'let's make it controlled'가 나오는 장면이죠. 반대말 uncontrolled(DOM이 값을 들고 있고 ref로 읽기)와의 차이, 그리고 controlled로 만들면 타이핑마다 리렌더가 돈다는 비용까지 말할 수 있으면 좋아요.",
    "exampleKo": "상태에 연결된 컨트롤드 인풋으로 만들어 주세요."
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
    ],
    "detail": "눈에 보이는 크기와 무관하게 실제로 클릭/탭이 먹히는 영역을 말해요. 모바일 QA에서 '아이콘이 너무 작아서 안 눌려요'라는 피드백이 오면 'the hit area is too small'로 정리되죠. 같은 뜻으로 tap target, touch target도 쓰이고, Apple/Google 가이드라인의 44pt/48dp 최소 크기가 늘 같이 인용돼요. 핵심 테크닉은 아이콘은 그대로 두고 padding이나 가상 요소로 hit area만 키우는 것 — 보이는 영역과 hit area는 다를 수 있다는 게 이 용어의 존재 이유예요.",
    "exampleKo": "터치 영역이 너무 작아서 탭하기 힘들어요."
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
    ],
    "detail": "마우스 없이 Tab, 방향키, Enter만으로 UI를 돌아다니는 걸 말하고, 접근성 리뷰의 핵심 체크 항목이에요. 드롭다운이나 리스트 컴포넌트 PR에 'does it support keyboard navigation?'이라는 코멘트가 달리는 게 전형적인 장면이죠. 줄여서 'keyboard nav'라고도 해요. 관련 어휘로 tab order(탭 이동 순서), focus trap(모달 안에 포커스 가두기)이 세트로 따라다니는데, 북미 인터뷰에서 컴포넌트 설계 문제를 받으면 이걸 먼저 언급하는 것만으로 시니어 시그널이 됩니다.",
    "exampleKo": "방향키로 선택을 옮길 수 있어야 해요."
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
    ],
    "detail": "서버 응답을 기다리지 않고 성공할 거라 '낙관하고' UI를 먼저 바꿔버리는 패턴이에요. 좋아요 버튼이 대표 사례죠 — 누르자마자 하트가 채워지고, 요청은 뒤에서 날아가요. 'do an optimistic update and roll back on failure'처럼 실패 시 롤백 전략과 한 문장으로 묶이는 게 보통이고, 롤백 얘기를 빼먹으면 반쪽짜리 답이 돼요. TanStack Query의 onMutate/onError 패턴 같은 구체 구현을 곁들이면 인터뷰에서 설득력이 확 올라갑니다.",
    "exampleKo": "응답이 오기 전에 낙관적 업데이트를 먼저 해요."
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
    ],
    "detail": "모달이나 드로어가 열려 있는 동안 뒤쪽 페이지가 스크롤되지 않게 잠그는 거예요. 모달 위에서 스크롤했는데 뒤 배경이 따라 움직이는 버그(scroll bleed) 잡을 때 'we need to lock body scroll'이 정확히 그 말이죠. body에 overflow: hidden을 거는 게 기본인데, 그 순간 스크롤바가 사라지면서 레이아웃이 옆으로 덜컥하는 문제, 그리고 iOS Safari에서는 이걸로 부족해서 별도 처리가 필요한 문제가 유명한 함정이에요.",
    "exampleKo": "모달이 열려 있는 동안 바디 스크롤을 잠가요."
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
    ],
    "detail": "idempotent는 '같은 요청을 몇 번 보내도 결과가 한 번 보낸 것과 같다'는 뜻인데, 면접에서 결제·주문 API 얘기 나오면 거의 반사적으로 튀어나와야 하는 단어예요. 클라이언트가 타임아웃 후 재시도했는데 카드가 두 번 긁히는 시나리오를 막는 설계를 설명할 때 딱 이 문장을 써요. double-charge는 '이중 결제'라는 구체적 동사라서, 막연하게 'prevent duplicates'라고 하는 것보다 면접관 귀에 훨씬 와닿아요. 발음은 '아이-뎀-포턴트'에 가깝고 '이뎀포턴트'라고 읽으면 못 알아듣는 경우가 있으니 주의하세요.",
    "exampleKo": "재시도해도 이중 결제가 안 되게 이 엔드포인트를 멱등하게 만들어요."
  },
  {
    "key": "be:send-an-idempotency-key-in-the-header-an",
    "en": "Send an idempotency key in the header and we'll dedupe.",
    "ko": "헤더에 멱등 키 넣어 보내면 저희가 중복 제거할게요.",
    "example": "Send an idempotency key in the header and we'll dedupe.",
    "situations": [
      "클라이언트랑 API 계약 맞출 때",
      "중복 요청 막는 법 설명할 때"
    ],
    "detail": "API 제공자 입장에서 클라이언트에게 사용법을 안내하는 말투예요. we'll dedupe가 핵심인데, dedupe는 deduplicate의 구어 축약형으로 '중복은 우리 쪽에서 걸러줄게'라는 뉘앙스라 문서나 회의 양쪽에서 다 자연스러워요. Stripe API 연동 경험 얘기하거나 결제 API를 직접 설계해본 경험을 설명할 때 이 문장이 그대로 나옵니다. dedupe를 굳이 deduplicate로 풀어 말하면 오히려 어색하고, 발음은 '디-둡'이에요.",
    "exampleKo": "헤더에 멱등 키를 넣어 보내주시면 저희 쪽에서 중복을 걸러낼게요."
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
    ],
    "detail": "rate limit을 명사가 아니라 동사로 바로 쓰는 게 포인트예요. 'apply a rate limit'처럼 길게 안 가고 'we rate limit this'로 끝내는 게 원어민 스타일이에요. 외부 공개 API 설계나 abuse 방지 얘기할 때, 혹은 시스템 디자인 면접에서 'API gateway에서 뭘 하냐'는 질문에 자연스럽게 나오는 문장이에요. throttle과 헷갈리기 쉬운데, rate limit은 한도 초과 시 429로 거부하는 정책에 가깝고 throttle은 속도를 늦춰서 흘려보내는 쪽 뉘앙스가 강해요.",
    "exampleKo": "이건 분당 100건으로 레이트 리밋을 걸어요."
  },
  {
    "key": "be:let-s-use-cursor-pagination-instead-of-o",
    "en": "Let's use cursor pagination instead of offset for big tables.",
    "ko": "큰 테이블은 오프셋 말고 커서 페이지네이션 쓰죠.",
    "example": "Let's use cursor pagination instead of offset for big tables.",
    "situations": [
      "목록 API 성능 논의",
      "무한 스크롤 설계할 때"
    ],
    "detail": "Let's use A instead of B 구조로 대안 제시하는 전형적인 코드리뷰 멘트예요. OFFSET 10000 같은 쿼리가 페이지 깊어질수록 느려지는 걸 발견했을 때, 혹은 시스템 디자인에서 피드 페이지네이션 설계할 때 바로 나오는 말이에요. cursor pagination은 keyset pagination이라고도 부르는데 면접관이 어느 쪽 용어를 쓰든 같은 거니까 당황하지 마세요. 'why'를 한 문장 덧붙여서 'offset gets slower as you go deeper'까지 말하면 훨씬 좋아요.",
    "exampleKo": "큰 테이블에는 오프셋 말고 커서 페이지네이션을 쓰죠."
  },
  {
    "key": "be:we-version-the-api-so-old-clients-don-t-",
    "en": "We version the API so old clients don't break.",
    "ko": "구버전 클라이언트가 안 깨지게 API 버저닝해요.",
    "example": "We version the API so old clients don't break.",
    "situations": [
      "v2 출시 논의할 때",
      "하위 호환 전략 정할 때"
    ],
    "detail": "version을 동사로 쓰는 게 자연스러운 표현이에요. 'make versions of'처럼 풀면 오히려 어색해요. 모바일 앱처럼 강제 업데이트가 안 되는 클라이언트가 있을 때 /v1, /v2를 나눠서 운영했다는 경험담에서 그대로 나오는 문장이에요. break는 여기서 '구버전 클라이언트가 동작이 깨진다'는 자동사 용법인데, 'so we don't break old clients'(우리가 깨뜨리지 않게)로 바꿔 말해도 똑같이 자연스러워요.",
    "exampleKo": "구버전 클라이언트가 깨지지 않게 API에 버전을 둬요."
  },
  {
    "key": "be:this-change-is-backward-compatible-so-no",
    "en": "This change is backward-compatible, so no migration needed.",
    "ko": "이 변경은 하위 호환이라 마이그레이션 필요 없어요.",
    "example": "This change is backward-compatible, so no migration needed.",
    "situations": [
      "스키마 필드 추가할 때",
      "배포 영향도 설명할 때"
    ],
    "detail": "backward-compatible은 '기존 것들이 그대로 돌아간다'는 안심시키는 뉘앙스가 있어서, 코드리뷰에서 리뷰어가 '이거 배포 위험하지 않아?'라고 물을 때 방어용으로 딱 좋은 문장이에요. 예를 들어 nullable 컬럼 추가나 옵셔널 필드 추가처럼 기존 동작을 안 건드리는 변경을 설명할 때 써요. forward-compatible(신버전 데이터를 구버전이 처리 가능)과 방향이 반대니까 헷갈리지 마세요 — 면접에서 둘을 섞어 쓰면 바로 티가 나요.",
    "exampleKo": "이 변경은 하위 호환이라서 마이그레이션이 따로 필요 없어요."
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
    ],
    "detail": "wrap A in B는 '감싸다'라는 그림이 그대로 살아있는 표현이라 트랜잭션, try-catch, 락 얘기할 때 만능으로 써먹어요. 계좌 이체처럼 '출금과 입금이 둘 다 되거나 둘 다 안 되거나'를 설명하는 장면에서 바로 이 문장이 나와요. atomic은 ACID의 A 그대로인데, 일상 대화에선 'all or nothing'이라고 풀어 말해도 같은 뜻으로 통해요. so they're atomic처럼 이유를 뒤에 붙이는 패턴이 면접에서 점수 따는 화법이에요.",
    "exampleKo": "이 두 쓰기 작업을 한 트랜잭션으로 감싸서 원자적으로 만들어요."
  },
  {
    "key": "be:bump-the-isolation-level-if-you-re-seein",
    "en": "Bump the isolation level if you're seeing dirty reads.",
    "ko": "더티 리드 보이면 격리 수준 올리세요.",
    "example": "Bump the isolation level if you're seeing dirty reads.",
    "situations": [
      "동시성 버그 디버깅",
      "트랜잭션 이상 현상 논의"
    ],
    "detail": "bump는 '한 단계 올리다'라는 캐주얼한 동사예요. increase보다 가볍고 입에 잘 붙어서 버전 올릴 때도 'bump the version'이라고 해요. 동시성 버그 디버깅하다가 커밋 안 된 데이터가 읽히는 걸 발견한 동료에게 던지는 조언 장면이에요. 주의할 건 dirty read는 READ UNCOMMITTED에서만 나는 현상이고, 많은 DB의 기본값인 READ COMMITTED에서는 안 생겨요 — 면접에서 non-repeatable read나 phantom read와 구분 못 하면 감점 포인트니까 세 개를 한 세트로 정리해두세요.",
    "exampleKo": "더티 리드가 보이면 격리 수준을 한 단계 올리세요."
  },
  {
    "key": "be:use-optimistic-locking-here-conflicts-ar",
    "en": "Use optimistic locking here; conflicts are rare.",
    "ko": "여긴 충돌이 드무니까 낙관적 락 쓰세요.",
    "example": "Use optimistic locking here; conflicts are rare.",
    "situations": [
      "동시 수정 처리 설계",
      "락 전략 고를 때"
    ],
    "detail": "뒤에 conflicts are rare라고 근거를 짧게 붙이는 게 이 문장의 진짜 가치예요 — 낙관적 락은 '충돌이 드물다'는 가정이 성립할 때만 쓰는 거라서, 이 한 마디로 트레이드오프를 이해하고 있다는 게 전달돼요. 코드리뷰에서 누가 SELECT FOR UPDATE를 남발할 때 'version 컬럼으로 충분해요'라고 제안하는 장면이에요. optimistic locking은 사실 락을 안 잡고 커밋 시점에 버전 비교로 충돌을 감지하는 방식이라, 'locking'이라는 이름에 속아서 실제 락을 잡는다고 설명하면 안 돼요.",
    "exampleKo": "여긴 충돌이 드무니까 낙관적 락을 쓰세요."
  },
  {
    "key": "be:take-a-pessimistic-lock-so-two-workers-d",
    "en": "Take a pessimistic lock so two workers don't grab the same row.",
    "ko": "두 워커가 같은 행 못 잡게 비관적 락 거세요.",
    "example": "Take a pessimistic lock so two workers don't grab the same row.",
    "situations": [
      "작업 큐 동시성 처리",
      "재고 차감 충돌 막을 때"
    ],
    "detail": "락은 take 또는 acquire와 짝지어 쓰고, grab은 '낚아채다'라는 그림이 살아있는 구어체라 경쟁 상황 묘사에 딱이에요. 큐 없이 DB를 작업 테이블로 쓰는 배치 시스템에서 워커 두 대가 같은 작업을 집어가 중복 처리되는 버그를 고칠 때 나오는 문장이에요. 실무에선 SELECT FOR UPDATE가 바로 이거고, 요즘은 SKIP LOCKED까지 언급하면 한 수 위로 보여요. 비관적 락은 대기·데드락 비용이 있으니 'when contention is high'라는 조건을 같이 말해주면 좋아요.",
    "exampleKo": "워커 두 대가 같은 행을 잡지 않게 비관적 락을 거세요."
  },
  {
    "key": "be:this-loop-is-firing-an-n-plus-one-query",
    "en": "This loop is firing an N plus one query.",
    "ko": "이 반복문에서 엔 플러스 원 쿼리가 나가고 있어요.",
    "example": "This loop is firing an N plus one query.",
    "situations": [
      "느린 API 프로파일링",
      "ORM 성능 리뷰할 때"
    ],
    "detail": "N+1을 말로 할 땐 'N plus one'이라고 또박또박 읽어요. fire는 쿼리가 '나간다, 발사된다'는 동사로 쿼리 로그를 보면서 말하는 느낌이 살아요. ORM 쓰다가 목록 100건 조회에 쿼리 101방이 나가는 걸 APM이나 쿼리 로그에서 발견하고 코드리뷰에 코멘트 다는 장면이에요. 해결책까지 한 호흡으로 'we should batch it into one query' 또는 'use a join / eager loading'을 붙이면 완성돼요. 참고로 is firing처럼 진행형을 쓰면 '지금 실제로 나가고 있다'는 현장감이 생겨요.",
    "exampleKo": "이 반복문에서 N+1 쿼리가 나가고 있어요."
  },
  {
    "key": "be:we-re-maxing-out-the-connection-pool-und",
    "en": "We're maxing out the connection pool under load.",
    "ko": "부하 들어오면 커넥션 풀이 꽉 차요.",
    "example": "We're maxing out the connection pool under load.",
    "situations": [
      "DB 타임아웃 장애 분석",
      "커넥션 누수 의심될 때"
    ],
    "detail": "max out은 '한도까지 꽉 채우다'라는 구어체로, CPU, 메모리, 카드 한도까지 다 쓸 수 있는 만능 표현이에요. under load는 '부하가 걸리면'이라는 조건을 깔끔하게 붙이는 부사구고요. 트래픽 피크 때 connection timeout 에러가 쏟아져서 장애 회의에서 원인을 보고하는 장면 그대로예요. exhaust the pool이라고 해도 같은 뜻인데 max out이 더 입말이에요. 이 말 뒤엔 보통 '풀 사이즈를 늘리냐, 쿼리를 빨리 끝내게 하냐, 커넥션 누수냐'로 논의가 이어지니 다음 문장도 준비해두세요.",
    "exampleKo": "부하가 걸리면 커넥션 풀이 한도까지 꽉 차요."
  },
  {
    "key": "be:add-an-index-on-user-id-the-scan-is-kill",
    "en": "Add an index on user_id; the scan is killing us.",
    "ko": "user_id에 인덱스 추가해요. 풀스캔 때문에 죽겠어요.",
    "example": "Add an index on user_id; the scan is killing us.",
    "situations": [
      "느린 쿼리 최적화",
      "필터 컬럼 정할 때"
    ],
    "detail": "X is killing us는 '이것 때문에 죽겠다'는 과장 섞인 불평인데, 원어민들이 성능 문제 얘기할 때 정말 자주 쓰는 생생한 표현이에요. 인덱스는 항상 on 컬럼명으로 붙여 말해요(index on user_id). 슬로우 쿼리 로그에서 풀 테이블 스캔을 발견하고 팀 채널에 던지는 메시지 같은 장면이에요. 여기서 scan은 full table scan의 줄임이고, 격식 있는 자리라면 'the full scan is hurting performance' 정도로 톤을 낮출 수 있어요.",
    "exampleKo": "user_id에 인덱스 추가합시다. 풀스캔 때문에 죽을 지경이에요."
  },
  {
    "key": "be:check-the-query-plan-it-s-not-hitting-th",
    "en": "Check the query plan; it's not hitting the index.",
    "ko": "쿼리 플랜 봐요. 인덱스를 안 타고 있어요.",
    "example": "Check the query plan; it's not hitting the index.",
    "situations": [
      "EXPLAIN 분석할 때",
      "인덱스 무시 원인 찾을 때"
    ],
    "detail": "hit the index는 '인덱스를 탄다'는 한국 개발자 표현과 정확히 일대일 대응이라 외우기 쉬워요. 인덱스를 분명히 걸었는데 쿼리가 여전히 느릴 때 'EXPLAIN부터 떠 봐'라고 하는 디버깅 장면이에요. query plan 대신 execution plan이라고 해도 되고, 'run an EXPLAIN on it'이라고 구체적으로 말해도 자연스러워요. 인덱스가 있어도 함수 적용, 타입 불일치, 낮은 선택도 때문에 안 타는 경우를 한두 개 예로 들 수 있으면 면접에서 깊이가 보여요.",
    "exampleKo": "쿼리 플랜 확인해 보세요. 인덱스를 안 타고 있어요."
  },
  {
    "key": "be:these-two-transactions-deadlocked-on-the",
    "en": "These two transactions deadlocked on the same rows.",
    "ko": "이 두 트랜잭션이 같은 행에서 데드락 났어요.",
    "example": "These two transactions deadlocked on the same rows.",
    "situations": [
      "데드락 로그 분석",
      "락 순서 정리할 때"
    ],
    "detail": "deadlock을 명사가 아니라 동사 과거형(deadlocked)으로 바로 쓰는 게 포인트예요 — 'a deadlock occurred between...'보다 훨씬 간결하고 입말이에요. 운영 DB에서 deadlock detected 에러 로그를 보고 포스트모템에서 상황을 설명하는 장면이에요. on the same rows로 어디서 엉켰는지를 붙이는 것까지가 한 세트예요. 후속으로 'we fixed it by locking in a consistent order'(락 잡는 순서 통일)까지 말할 수 있으면 면접용 데드락 스토리가 완성돼요.",
    "exampleKo": "이 두 트랜잭션이 같은 행들을 놓고 데드락이 났어요."
  },
  {
    "key": "be:run-the-migration-in-a-separate-deploy-t",
    "en": "Run the migration in a separate deploy to be safe.",
    "ko": "안전하게 마이그레이션은 따로 배포로 돌려요.",
    "example": "Run the migration in a separate deploy to be safe.",
    "situations": [
      "스키마 변경 배포 계획",
      "무중단 마이그레이션 논의"
    ],
    "detail": "to be safe는 '혹시 모르니까, 안전하게'라는 부사구로 문장 끝에 붙이면 신중한 시니어 느낌이 나요. 컬럼 삭제나 NOT NULL 추가처럼 위험한 스키마 변경을 코드 배포와 같이 내보내려는 동료를 말리는 코드리뷰 장면이에요. 마이그레이션과 코드를 분리 배포해야 롤백이 쉬워진다는 expand-contract 패턴의 실전 버전인데, 그 용어까지 알면 보너스예요. deploy를 이렇게 명사로 쓰는 것(a separate deploy)도 현장에서 아주 흔해요.",
    "exampleKo": "안전하게 마이그레이션은 별도 배포로 돌리세요."
  },
  {
    "key": "be:the-read-replica-has-some-replication-la",
    "en": "The read replica has some replication lag right now.",
    "ko": "지금 읽기 복제본에 복제 지연이 좀 있어요.",
    "example": "The read replica has some replication lag right now.",
    "situations": [
      "오래된 데이터 보일 때",
      "방금 쓴 값 안 보일 때"
    ],
    "detail": "some과 right now가 들어가서 '지금 좀 지연이 있긴 한데 심각한 건 아냐'라는 톤 조절이 돼 있는 문장이에요. 유저가 '방금 쓴 글이 안 보여요'라고 문의했을 때, 쓰기는 primary로 갔는데 읽기가 아직 못 따라온 replica에서 나가서 생긴 일이라고 설명하는 장면이에요. replication lag은 read-your-own-writes 문제와 한 세트로 알아두면 좋아요 — '본인 글은 primary에서 읽게 하거나 잠깐 세션을 고정한다'는 해법까지 이어 말하면 깊이가 보여요.",
    "exampleKo": "지금 읽기 복제본에 복제 지연이 좀 있어요."
  },
  {
    "key": "be:we-use-cache-aside-so-the-app-loads-and-",
    "en": "We use cache-aside, so the app loads and fills the cache.",
    "ko": "캐시 어사이드라 앱이 읽어서 캐시를 채워요.",
    "example": "We use cache-aside, so the app loads and fills the cache.",
    "situations": [
      "캐시 패턴 선택 논의",
      "Redis 도입 설계할 때"
    ],
    "detail": "캐시 패턴 이름을 대고 곧바로 so 뒤에 한 줄로 풀어 설명하는 구조라, 면접에서 용어만 던지고 끝내는 사람과 차별화되는 화법이에요. cache-aside(=lazy loading)는 캐시 미스 때 앱이 직접 DB에서 읽어 캐시에 채워 넣는 방식이고, 시스템 디자인에서 '캐싱 전략 뭐 쓸래?' 질문에 첫 번째로 나오는 답이에요. read-through(캐시 라이브러리가 알아서 DB까지 갔다 옴)와 헷갈리기 쉬운데, 차이는 '누가 DB에 가냐' — cache-aside는 앱이, read-through는 캐시가 가요.",
    "exampleKo": "캐시 어사이드 방식이라서, 앱이 직접 데이터를 읽어와 캐시를 채워요."
  },
  {
    "key": "be:set-a-short-ttl-so-the-cache-stays-fresh",
    "en": "Set a short TTL so the cache stays fresh.",
    "ko": "캐시 신선하게 유지되게 TTL 짧게 잡아요.",
    "example": "Set a short TTL so the cache stays fresh.",
    "situations": [
      "캐시 만료 정책 정할 때",
      "오래된 값 문제 해결할 때"
    ],
    "detail": "TTL은 '티-티-엘'로 읽고, fresh/stale은 캐시 얘기할 때 짝으로 다니는 단어예요 — 데이터가 신선하다/쉬었다는 음식 비유 그대로예요. 캐시 무효화 로직을 제대로 짜기엔 복잡한데 데이터가 조금 늦게 갱신돼도 괜찮을 때 '그냥 TTL 짧게 가져가자'고 결정하는 장면이에요. 'cache invalidation is hard, so we just rely on a short TTL'이라고 트레이드오프를 인정하면서 말하면 더 좋아요. stays fresh처럼 stay+형용사 조합도 입에 붙여두면 유용해요.",
    "exampleKo": "캐시가 신선하게 유지되도록 TTL을 짧게 잡으세요."
  },
  {
    "key": "be:when-the-user-updates-we-invalidate-the-",
    "en": "When the user updates, we invalidate the cache key.",
    "ko": "유저가 수정하면 그 캐시 키를 무효화해요.",
    "example": "When the user updates, we invalidate the cache key.",
    "situations": [
      "캐시 갱신 흐름 설명",
      "수정 후 옛 데이터 보일 때"
    ],
    "detail": "invalidate는 캐시 항목을 '무효화한다'는 표준 동사예요. 캐주얼하게는 'we bust the cache' 또는 'evict the key'라고도 하는데 invalidate가 가장 무난해요. 프로필 수정 후에도 옛날 정보가 보이는 버그를 설명하면서 '수정 시점에 키를 지운다'는 해법을 말하는 장면이에요. evict와의 미묘한 차이도 알아두면 좋아요 — invalidate는 데이터가 바뀌어서 의도적으로 지우는 것, evict는 메모리가 차서 캐시가 알아서(LRU 등) 내쫓는 것에 가까워요.",
    "exampleKo": "유저가 수정하면 해당 캐시 키를 무효화해요."
  },
  {
    "key": "be:a-cache-stampede-hit-us-when-that-key-ex",
    "en": "A cache stampede hit us when that key expired.",
    "ko": "그 키 만료될 때 캐시 스탬피드가 터졌어요.",
    "example": "A cache stampede hit us when that key expired.",
    "situations": [
      "DB 부하 급증 분석",
      "인기 키 동시 만료 논의"
    ],
    "detail": "stampede는 소떼가 우르르 몰려가는 그 단어라서, 인기 키 하나가 만료된 순간 수천 개 요청이 동시에 DB로 쏟아지는 그림이 단어 안에 그대로 들어 있어요. hit us는 장애가 '우리를 덮쳤다'는 표현으로 포스트모템 단골 멘트예요. 메인 페이지 캐시가 만료되자마자 DB CPU가 치솟은 장애를 회고하는 장면이고, 해법(lock 잡고 한 놈만 다시 채우기, TTL jitter, 미리 갱신)까지 이어 말할 준비를 하세요. thundering herd라고 부르는 사람도 있는데 같은 현상이에요.",
    "exampleKo": "그 키가 만료될 때 캐시 스탬피드가 저희를 덮쳤어요."
  },
  {
    "key": "be:we-push-the-job-onto-a-queue-and-process",
    "en": "We push the job onto a queue and process it async.",
    "ko": "작업을 큐에 넣고 비동기로 처리해요.",
    "example": "We push the job onto a queue and process it async.",
    "situations": [
      "무거운 작업 분리 설계",
      "이메일 발송 비동기화할 때"
    ],
    "detail": "push onto a queue가 표준 콜로케이션이고(enqueue라고 해도 됨), async는 asynchronously의 구어 축약으로 부사처럼 그냥 던져요 — 'process it async'가 입말이고 격식체로는 asynchronously예요. 회원가입 시 이메일 발송이나 썸네일 생성처럼 응답을 막을 필요 없는 작업을 분리하는 설계를 설명하는 장면으로, 시스템 디자인 면접에서 가장 많이 쓰게 될 문장 중 하나예요. job, task, message는 거의 호환되니 하나에 집착하지 마세요.",
    "exampleKo": "작업을 큐에 넣고 비동기로 처리해요."
  },
  {
    "key": "be:other-services-subscribe-to-this-event-o",
    "en": "Other services subscribe to this event over pub/sub.",
    "ko": "다른 서비스들이 펍섭으로 이 이벤트를 구독해요.",
    "example": "Other services subscribe to this event over pub/sub.",
    "situations": [
      "이벤트 기반 아키텍처 논의",
      "서비스 간 결합도 낮출 때"
    ],
    "detail": "subscribe to(to 필수!)와 over pub/sub(채널·매체를 나타내는 over) 두 가지 전치사가 포인트예요. pub/sub은 '펍섭'으로 읽어요. 주문 완료 이벤트 하나에 알림·재고·분석 서비스가 각각 붙는 마이크로서비스 구조를 화이트보드에 그리며 설명하는 장면이에요. point-to-point 큐(컨슈머 하나가 가져가면 끝)와 pub/sub(구독자 전원이 받음)의 차이를 물어보는 면접관이 많으니 그 구분을 같이 준비하세요. publish의 반대짝으로 'we publish the event, they subscribe'처럼 세트로 말하면 깔끔해요.",
    "exampleKo": "다른 서비스들이 펍/섭으로 이 이벤트를 구독해요."
  },
  {
    "key": "be:failed-messages-land-in-the-dead-letter-",
    "en": "Failed messages land in the dead-letter queue.",
    "ko": "실패한 메시지는 데드레터 큐로 빠져요.",
    "example": "Failed messages land in the dead-letter queue.",
    "situations": [
      "메시지 처리 실패 대응",
      "재처리 전략 정할 때"
    ],
    "detail": "land in은 '~로 흘러들어가 떨어진다'는 그림이 있는 동사로, go to보다 자연스럽고 현장감 있어요. dead-letter queue는 줄여서 DLQ('디-엘-큐')라고 부르는 게 보통이에요. 재시도를 다 소진한 메시지가 어디로 가냐는 질문에 답하거나, 'DLQ에 쌓인 메시지 알람 받고 원인 파봤다'는 운영 경험담에서 나오는 문장이에요. DLQ는 버리는 쓰레기통이 아니라 나중에 조사하고 재처리(replay)하기 위한 격리 보관소라는 점을 같이 말하면 운영 경험이 있어 보여요.",
    "exampleKo": "실패한 메시지들은 데드레터 큐로 들어가요."
  },
  {
    "key": "be:delivery-is-at-least-once-so-make-the-ha",
    "en": "Delivery is at-least-once, so make the handler idempotent.",
    "ko": "전달은 최소 한 번이라 핸들러를 멱등하게 만드세요.",
    "example": "Delivery is at-least-once, so make the handler idempotent.",
    "situations": [
      "중복 메시지 대비 설계",
      "컨슈머 구현 리뷰할 때"
    ],
    "detail": "메시징 시스템의 전달 보장(delivery guarantee)과 그 귀결을 so로 묶은, 인과관계가 완벽한 한 문장이에요 — '최소 한 번 = 중복 가능 = 핸들러가 중복을 견뎌야 함'이라는 논리가 통째로 들어 있어요. SQS나 Kafka 컨슈머 설계 리뷰에서 '중복 들어오면 어떡해요?'라는 질문에 대한 모범 답안 장면이에요. at-least-once / at-most-once / exactly-once 세 가지를 세트로 알아야 하고, 이 문장은 그중 실무에서 제일 흔한 케이스라 면접에서 거의 반드시 써먹게 돼요.",
    "exampleKo": "전달 보장이 최소 한 번이니까, 핸들러를 멱등하게 만드세요."
  },
  {
    "key": "be:true-exactly-once-is-hard-we-fake-it-wit",
    "en": "True exactly-once is hard; we fake it with dedupe.",
    "ko": "진짜 정확히 한 번은 어려워서 중복 제거로 흉내 내요.",
    "example": "True exactly-once is hard; we fake it with dedupe.",
    "situations": [
      "메시징 보장 한계 설명",
      "결제 중복 방지 설계할 때"
    ],
    "detail": "fake it이 이 문장의 맛이에요 — '진짜는 못 만들고 흉내 낸다'는 솔직한 구어체인데, 이런 자기 인식이 있는 표현이 오히려 분산 시스템을 제대로 이해한다는 신호로 읽혀요. 면접관이 'exactly-once 보장돼요?'라고 찌를 때 '이론적으로 어렵고, 실제론 at-least-once + 멱등 처리(중복 제거)로 효과적으로 같은 결과를 만든다'고 받아치는 장면이에요. true를 앞에 붙여서 '진짜 의미의'라고 한정하는 것도 배울 포인트예요. 격식 있게 가려면 'we approximate it with dedupe'라고 해도 돼요.",
    "exampleKo": "진짜 '정확히 한 번'은 어려워서, 중복 제거로 비슷하게 흉내 내요."
  },
  {
    "key": "be:consumer-lag-is-climbing-we-need-more-wo",
    "en": "Consumer lag is climbing; we need more workers.",
    "ko": "컨슈머 랙이 올라가요. 워커 더 필요해요.",
    "example": "Consumer lag is climbing; we need more workers.",
    "situations": [
      "Kafka 지연 모니터링",
      "스케일아웃 결정할 때"
    ],
    "detail": "climb은 숫자가 '계속 기어오른다'는 진행의 그림이 있어서 is climbing이라고 하면 대시보드 그래프가 우상향하는 장면이 눈에 보여요. go up보다 모니터링 맥락에서 훨씬 생생해요. Kafka 컨슈머 랙 알람이 울려서 온콜이 상황을 공유하고 스케일 아웃을 제안하는 장면 그대로예요. 주의: Kafka에서 컨슈머를 늘려도 파티션 수보다 많으면 노는 워커가 생기니, 'as long as we have enough partitions'라는 단서를 붙일 수 있으면 한 단계 위로 보여요.",
    "exampleKo": "컨슈머 랙이 계속 올라가고 있어요. 워커가 더 필요해요."
  },
  {
    "key": "be:we-retry-the-call-up-to-three-times-on-f",
    "en": "We retry the call up to three times on failure.",
    "ko": "실패하면 최대 세 번까지 재시도해요.",
    "example": "We retry the call up to three times on failure.",
    "situations": [
      "일시 장애 대응 설계",
      "재시도 정책 정할 때"
    ],
    "detail": "up to(최대 ~까지)와 on failure(실패 시)라는 두 덩어리가 재사용성 높은 부품이에요 — on timeout, on conflict처럼 on+명사 패턴은 어디든 붙어요. 외부 API 연동 코드 리뷰에서 '이거 한 번 실패하면 그냥 죽어요?'라는 질문에 재시도 정책을 설명하는 장면이에요. 주의할 점: 재시도 얘기를 꺼내면 면접관이 거의 반드시 '그 호출 멱등해요? 재시도하면 중복 안 생겨요?'로 이어가니까, idempotency 답변을 뒤에 장전해두세요.",
    "exampleKo": "실패하면 최대 세 번까지 그 호출을 재시도해요."
  },
  {
    "key": "be:use-exponential-backoff-so-we-don-t-hamm",
    "en": "Use exponential backoff so we don't hammer the service.",
    "ko": "서비스 두들기지 않게 지수 백오프 써요.",
    "example": "Use exponential backoff so we don't hammer the service.",
    "situations": [
      "재시도 간격 설계",
      "재시도 폭주 막을 때"
    ],
    "detail": "hammer는 '망치로 두들기듯 쉴 새 없이 때린다'는 구어체라서, 재시도 폭풍이 죽어가는 서비스를 더 밟는 그림이 한 단어에 담겨요. 장애 중인 다운스트림에 고정 간격 재시도가 몰려서 복구를 방해하는 retry storm을 막자고 제안하는 장면이에요. exponential backoff(1초→2초→4초)까지만 말하면 80점이고, 'with jitter'(랜덤 흔들기로 재시도 동기화 방지)를 붙이면 100점이에요 — 면접관들이 jitter 언급을 정말 좋아해요.",
    "exampleKo": "서비스를 마구 두들기지 않게 지수 백오프를 쓰세요."
  },
  {
    "key": "be:the-circuit-breaker-trips-and-we-stop-ca",
    "en": "The circuit breaker trips and we stop calling it.",
    "ko": "서킷 브레이커가 열리면 호출을 멈춰요.",
    "example": "The circuit breaker trips and we stop calling it.",
    "situations": [
      "연쇄 장애 차단 설계",
      "느린 의존성 격리할 때"
    ],
    "detail": "trip이 핵심 동사예요 — 두꺼비집(차단기)이 '떨어진다/내려간다'는 그 단어 그대로라서, breaker opens라고 해도 되지만 trips가 더 원어민스러워요. 다운스트림 장애가 전체로 번지는 cascading failure를 막는 설계를 설명할 때, 'N번 연속 실패하면 차단기가 떨어지고 한동안 호출 자체를 안 한다'고 말하는 장면이에요. 상태 머신(closed→open→half-open)까지 설명할 수 있으면 좋은데, half-open은 '슬쩍 한 번 찔러보고 복구됐으면 다시 닫는' 단계예요.",
    "exampleKo": "서킷 브레이커가 떨어지면 그쪽 호출을 멈춰요."
  },
  {
    "key": "be:set-a-tight-timeout-so-slow-calls-don-t-",
    "en": "Set a tight timeout so slow calls don't pile up.",
    "ko": "느린 호출이 쌓이지 않게 타임아웃 짧게 잡아요.",
    "example": "Set a tight timeout so slow calls don't pile up.",
    "situations": [
      "스레드 고갈 방지",
      "행 걸린 요청 끊을 때"
    ],
    "detail": "tight는 short보다 '의도적으로 빡빡하게 조였다'는 설계 의지가 느껴지는 형용사고, pile up은 빨래처럼 '쌓인다'는 그림 그대로예요. 다운스트림이 느려졌을 뿐인데 대기 중인 호출이 스레드와 커넥션을 다 물고 있다가 우리 서비스까지 같이 죽는 장애를 겪고 나서 타임아웃 정책을 손보는 장면이에요. 이 문장은 'slow is worse than down'(느린 게 죽은 것보다 무섭다)이라는 교훈과 한 세트예요 — 면접에서 그 한 줄을 덧붙이면 임팩트가 커요.",
    "exampleKo": "느린 호출이 쌓이지 않게 타임아웃을 빡빡하게 잡으세요."
  },
  {
    "key": "be:if-search-is-down-we-degrade-gracefully-",
    "en": "If search is down, we degrade gracefully and hide it.",
    "ko": "검색 죽으면 우아하게 다운그레이드해서 숨겨요.",
    "example": "If search is down, we degrade gracefully and hide it.",
    "situations": [
      "부분 장애 UX 설계",
      "핵심 기능만 살릴 때"
    ],
    "detail": "degrade gracefully는 '곱게 무너진다', 즉 일부 기능이 죽어도 전체 서비스는 굴러가게 한다는 가용성 설계의 핵심 표현이에요. graceful degradation이라는 명사형도 같이 알아두세요. 검색 서비스 장애 때 500 페이지를 보여주는 대신 검색창만 숨기고 나머지는 정상 제공했다는 장애 대응 경험담 장면이에요. and hide it처럼 '구체적으로 뭘 했는지'가 따라붙어야 진짜 경험으로 들려요 — degrade gracefully만 던지고 끝내면 교과서 암송처럼 들릴 수 있어요.",
    "exampleKo": "검색이 죽으면 우아하게 기능을 낮춰서 그냥 숨겨버려요."
  },
  {
    "key": "be:for-non-critical-checks-we-fail-open-and",
    "en": "For non-critical checks we fail open and let it through.",
    "ko": "덜 중요한 검사는 페일 오픈해서 통과시켜요.",
    "example": "For non-critical checks we fail open and let it through.",
    "situations": [
      "보조 서비스 장애 정책",
      "가용성 우선 결정할 때"
    ],
    "detail": "fail open은 '검사 시스템이 죽었을 때 문을 열어둔다', 즉 통과시킨다는 뜻이에요. 비유가 거꾸로 느껴질 수 있는데(전기 회로에서 open=끊김이 아니라 출입문이 열림으로 기억하세요), let it through가 바로 그 뜻을 풀어준 거예요. 피처 플래그 서비스나 추천 시스템이 죽었을 때 '그것 때문에 결제까지 막을 순 없잖아'라며 기본 동작으로 통과시키는 설계 회의 장면이에요. 다음 항목의 fail closed와 반드시 쌍으로 외우세요 — 어느 쪽을 고르냐가 곧 리스크 판단력 질문이에요.",
    "exampleKo": "덜 중요한 검사들은 페일 오픈으로 그냥 통과시켜요."
  },
  {
    "key": "be:for-auth-we-fail-closed-and-block-the-re",
    "en": "For auth we fail closed and block the request.",
    "ko": "인증은 페일 클로즈드로 요청을 막아요.",
    "example": "For auth we fail closed and block the request.",
    "situations": [
      "보안 우선 결정",
      "안전한 기본값 정할 때"
    ],
    "detail": "fail closed는 fail open의 반대로 '검증 시스템이 죽으면 문을 닫는다', 즉 차단한다는 뜻이고 보안 맥락에선 fail secure라고도 해요. 인증 서비스가 응답이 없을 때 '확인 못 했으면 일단 막는다'는 원칙을 말하는 장면인데, 돈이나 보안이 걸린 경로에선 가용성보다 안전을 택한다는 판단이 담겨 있어요. 면접에서 fail open/closed 질문이 나오면 '뭐가 걸려 있느냐에 따라 다르다 — 보안은 closed, UX 부가기능은 open'이라는 프레임으로 답하면 깔끔해요.",
    "exampleKo": "인증은 페일 클로즈드로 가서 요청을 차단해요."
  },
  {
    "key": "be:one-event-fans-out-to-five-downstream-se",
    "en": "One event fans out to five downstream services.",
    "ko": "이벤트 하나가 하위 서비스 다섯 개로 팬아웃돼요.",
    "example": "One event fans out to five downstream services.",
    "situations": [
      "이벤트 전파 설계",
      "부하 증폭 우려 설명할 때"
    ],
    "detail": "fan out은 부채가 펼쳐지듯 하나가 여럿으로 퍼지는 그림 그대로의 동사예요. fans out to + 대상 형태로 쓰고, 명사형 fan-out은 시스템 디자인 면접 단골 용어예요(트위터 피드의 fan-out on write가 대표 예시). 주문 이벤트 하나가 알림·재고·정산·분석·검색 서비스로 퍼지는 아키텍처를 화이트보드에 그리며 설명하는 장면이에요. downstream(우리 뒤에서 받아가는 쪽)과 upstream(우리가 의존하는 쪽) 방향을 헷갈리면 대화가 꼬이니 확실히 잡아두세요.",
    "exampleKo": "이벤트 하나가 다운스트림 서비스 다섯 개로 팬아웃돼요."
  },
  {
    "key": "be:we-added-a-unique-constraint-as-a-safety",
    "en": "We added a unique constraint as a safety net for dedupe.",
    "ko": "중복 제거 안전장치로 유니크 제약을 걸었어요.",
    "example": "We added a unique constraint as a safety net for dedupe.",
    "situations": [
      "멱등성 DB 차원 보강",
      "중복 삽입 방지 설계할 때"
    ],
    "detail": "safety net은 서커스 그물망처럼 '위에서 다 못 막아도 마지막에 받아주는 최후의 방어선'이라는 뉘앙스예요. 애플리케이션 레벨에서 중복 체크를 하더라도 동시 요청이 그 사이를 비집고 들어올 수 있으니, DB 유니크 제약으로 마지막 한 겹을 더 깔았다는 defense in depth 설계를 설명하는 장면이에요. '체크했는데 왜 제약도 걸어요?'라는 질문에 'race condition은 앱 레벨 체크만으론 못 막아서요'라고 답하는 흐름까지가 한 세트예요.",
    "exampleKo": "중복 제거의 안전망으로 유니크 제약을 추가했어요."
  },
  {
    "key": "be:let-s-batch-these-calls-to-cut-the-round",
    "en": "Let's batch these calls to cut the round trips.",
    "ko": "왕복 줄이게 이 호출들 배치로 묶죠.",
    "example": "Let's batch these calls to cut the round trips.",
    "situations": [
      "네트워크 오버헤드 줄일 때",
      "대량 처리 최적화할 때"
    ],
    "detail": "batch를 동사로 쓰는 것과 cut(줄이다 — reduce보다 짧고 힘 있는 구어체) 그리고 round trip(요청 한 번 갔다 오는 왕복)이 다 들어간 알짜 문장이에요. 반복문 안에서 건당 API 호출이나 쿼리가 나가는 코드를 리뷰하면서 '100번 왕복할 걸 한 번에 묶자'고 제안하는 장면으로, N+1 쿼리 해법을 말할 때도 그대로 써요. 배칭을 제안하면 '배치가 너무 커지면?'(타임아웃, 메모리, 부분 실패 처리)이 따라오는 질문이니 batch size 상한 얘기를 준비해두면 좋아요.",
    "exampleKo": "왕복 횟수를 줄이게 이 호출들을 배치로 묶죠."
  }
];

export const SD_CARDS: PhraseCard[] = [
  {
    "key": "sd:let-s-start-with-the-requirements",
    "en": "Let's start with the requirements",
    "ko": "요구사항부터 짚고 넘어가자",
    "example": "Let's start with the requirements before we draw anything.",
    "situations": [
      "면접 시작 직후 어디서 시작할지 정할 때",
      "바로 다이어그램 그리려는 충동을 누를 때"
    ],
    "detail": "시스템 디자인 면접의 거의 공식적인 오프닝 멘트예요. 화이트보드에 박스부터 그리고 싶은 충동을 누르고 \"일단 뭘 만들어야 하는지부터 합의하자\"는 신호를 면접관한테 보내는 거죠. 이 한 마디로 '구조적으로 사고하는 사람'이라는 인상을 줍니다. 주의할 점은 말만 하고 바로 설계로 넘어가면 오히려 감점이라는 것 — 실제로 2~3분은 요구사항 질문에 써야 해요.",
    "exampleKo": "뭘 그리기 전에 요구사항부터 짚고 시작하죠."
  },
  {
    "key": "sd:are-these-functional-or-non-functional",
    "en": "Are these functional or non-functional?",
    "ko": "이게 기능 요구사항이야 비기능 요구사항이야?",
    "example": "Are these functional or non-functional requirements we're listing?",
    "situations": [
      "요구사항을 두 종류로 나눠 정리할 때",
      "면접관이 요구사항을 던졌을 때 분류 확인할 때"
    ],
    "detail": "요구사항을 두 갈래로 정리할 때 쓰는 질문이에요. functional은 '뭘 해야 하는가'(피드 보기, 글 쓰기), non-functional은 '얼마나 잘 해야 하는가'(지연시간, 가용성, 규모)를 말하죠. 면접 초반에 화이트보드에 두 칼럼으로 나눠 적으면서 이 말을 던지면 체계 잡힌 느낌을 줍니다. 헷갈리기 쉬운 건, 'requirements' 없이 그냥 \"Is this functional?\"이라고만 하면 '이거 작동하나요?'로 들릴 수 있다는 점이에요.",
    "exampleKo": "지금 나열하는 게 기능 요구사항인가요, 비기능 요구사항인가요?"
  },
  {
    "key": "sd:at-a-high-level",
    "en": "At a high level",
    "ko": "큰 그림으로 보면",
    "example": "At a high level, it's just read-heavy with a cache.",
    "situations": [
      "세부 들어가기 전에 전체 흐름 먼저 설명할 때",
      "면접관이 개요부터 보자고 할 때"
    ],
    "detail": "디테일에 빠지기 전에 '일단 큰 그림만 말하면'이라고 운을 떼는 표현이에요. 시스템 전체를 한 문장으로 요약할 때, 아키텍처 다이어그램의 첫 박스를 그리기 직전에 자연스럽게 나옵니다. 이 말을 하면 듣는 사람도 '아 지금은 디테일 따지지 말자'는 모드로 전환돼요. 주의: 'high-level'은 추상도가 높다는 뜻이지 '수준이 높다/고급'이라는 뜻이 아니라서, 한국어 '하이레벨'의 어감과 반대로 느껴질 수 있어요.",
    "exampleKo": "큰 그림으로 보면, 캐시 얹은 읽기 위주 시스템일 뿐이에요."
  },
  {
    "key": "sd:let-s-nail-down-the-scale-first",
    "en": "Let's nail down the scale first",
    "ko": "규모부터 확실히 정하자",
    "example": "Let's nail down the scale first, then pick the storage.",
    "situations": [
      "설계 전에 트래픽/데이터 규모를 못 박을 때",
      "스케일 가정 없이 컴포넌트 그리려 할 때"
    ],
    "detail": "nail down은 '못을 박는다'는 직역 그대로, 흔들리지 않게 확정한다는 어감이에요. DAU가 백만인지 십억인지에 따라 설계가 완전히 달라지니까, 스토리지나 DB 선택 전에 숫자부터 못박자고 할 때 나오는 말이죠. 그냥 decide보다 '애매하게 두지 말고 구체적 숫자로 고정하자'는 뉘앙스가 강합니다. figure out(알아내다)과 헷갈리지 마세요 — nail down은 알아낸 걸 확정까지 하는 거예요.",
    "exampleKo": "규모부터 확실히 못박고, 그다음에 스토리지를 고르죠."
  },
  {
    "key": "sd:let-me-lay-out-the-components",
    "en": "Let me lay out the components",
    "ko": "컴포넌트들을 한번 펼쳐볼게",
    "example": "Let me lay out the components, then we connect them.",
    "situations": [
      "보드에 박스들을 하나씩 그리기 시작할 때",
      "전체 아키텍처를 처음 스케치할 때"
    ],
    "detail": "lay out은 테이블 위에 부품들을 쫙 펼쳐놓는 그림이에요. 화이트보드에 API 서버, DB, 캐시 같은 박스들을 하나씩 그리기 시작할 때 정확히 이 말이 나옵니다. '연결은 나중에 하고 일단 등장인물부터 소개할게' 같은 느낌이죠. layout(명사, 배치)과 lay out(동사구)을 구분해서, 말할 땐 \"lay OUT\"처럼 out에 강세를 줘야 자연스러워요.",
    "exampleKo": "컴포넌트들을 먼저 펼쳐놓고, 그다음에 연결해보죠."
  },
  {
    "key": "sd:let-me-scope-this-down",
    "en": "Let me scope this down",
    "ko": "범위를 좀 좁혀볼게",
    "example": "Let me scope this down to the core feed flow.",
    "situations": [
      "문제가 너무 넓어서 핵심만 다룰 때",
      "시간 안에 다룰 부분을 정할 때"
    ],
    "detail": "문제가 너무 넓을 때 '핵심만 남기고 범위를 좁히겠다'고 선언하는 표현이에요. \"트위터를 설계하라\" 같은 문제에서 DM, 검색은 빼고 피드만 다루겠다고 할 때 딱 이 말을 씁니다. 면접에서 이걸 안 하고 다 만들려다 시간이 터지는 게 흔한 실패 패턴이라, 오히려 scope down 선언이 시니어다움의 증거예요. narrow down(후보를 좁히다)과 비슷하지만, scope down은 '작업 범위' 자체를 줄인다는 점이 달라요.",
    "exampleKo": "범위를 핵심 피드 흐름으로 좁혀볼게요."
  },
  {
    "key": "sd:what-s-the-read-to-write-ratio",
    "en": "What's the read-to-write ratio?",
    "ko": "읽기 대 쓰기 비율이 어떻게 돼?",
    "example": "What's the read-to-write ratio here, mostly reads?",
    "situations": [
      "캐시/리플리카 필요한지 판단하려 할 때",
      "워크로드 성격을 면접관에게 물어볼 때"
    ],
    "detail": "시스템 디자인 면접에서 가장 점수 따기 좋은 질문 중 하나예요. 읽기가 압도적이면 캐시·리드 리플리카, 쓰기가 많으면 샤딩·큐 같은 식으로 설계 방향이 갈리니까, 이 질문 하나로 '왜 이 아키텍처인지' 근거가 생기죠. 보통 요구사항 단계 끝나고 숫자 추정 들어갈 때 던집니다. 발음 팁: read-to-write를 한 단어처럼 빠르게 붙여 말해야 자연스러워요.",
    "exampleKo": "여기 읽기 대 쓰기 비율이 어떻게 되나요? 거의 읽기인가요?"
  },
  {
    "key": "sd:roughly-a-thousand-requests-per-second",
    "en": "Roughly a thousand requests per second",
    "ko": "대충 초당 천 건 정도",
    "example": "So roughly a thousand requests per second at peak.",
    "situations": [
      "QPS를 어림으로 잡아 말할 때",
      "피크 트래픽을 추정할 때"
    ],
    "detail": "roughly는 '정밀하지 않아도 됨'을 깔고 들어가는 단어라, 백오브엔벨롭 계산할 때 숫자 앞에 거의 반사적으로 붙여요. 면접관도 정확한 숫자를 기대하는 게 아니라 자릿수(order of magnitude) 감각을 보는 거라서, roughly를 붙이면 '나도 그걸 안다'는 신호가 됩니다. about, around로 바꿔도 되지만 roughly가 가장 엔지니어스러운 어감이에요. 숫자를 단정적으로 말하면 오히려 면접관이 '그 근거는?'하고 파고들 수 있으니 주의하세요.",
    "exampleKo": "그러면 피크 때 대충 초당 천 건 정도네요."
  },
  {
    "key": "sd:that-s-about-ten-gigs-a-day",
    "en": "That's about ten gigs a day",
    "ko": "하루에 한 10기가쯤 돼",
    "example": "That's about ten gigs a day, so manageable.",
    "situations": [
      "하루 데이터 증가량을 추정할 때",
      "스토리지 용량 감을 잡을 때"
    ],
    "detail": "계산 결과를 입으로 정리할 때 쓰는 전형적인 문장 패턴이에요. gigs는 gigabytes의 구어체 줄임말인데, 면접에서 이렇게 줄여 말하는 게 오히려 자연스럽고 원어민스럽습니다. 보통 뒤에 \"so manageable\"(감당 가능) 같은 판단을 붙여서 '이 숫자가 의미하는 바'까지 말해주는 게 포인트예요. 'a day'를 'per day'로 바꿔도 되지만 구어에선 a day가 더 흔해요.",
    "exampleKo": "그러면 하루 10기가쯤이니까, 감당할 만하네요."
  },
  {
    "key": "sd:let-s-ballpark-the-storage",
    "en": "Let's ballpark the storage",
    "ko": "스토리지를 대충 계산해보자",
    "example": "Let's ballpark the storage for five years out.",
    "situations": [
      "저장 용량을 대략 추산할 때",
      "장기 데이터 증가를 가늠할 때"
    ],
    "detail": "ballpark은 야구장에서 온 말로, '야구장 안 어딘가에 떨어지면 됨' 정도의 대략 추정이라는 어감이에요. 명사로 \"ballpark figure\"도 흔하지만, 면접에선 이렇게 동사로 \"Let's ballpark X\"라고 쓰면 훨씬 능숙해 보입니다. 용량 추정(capacity estimation) 섹션 들어갈 때 시작 멘트로 딱이죠. estimate보다 캐주얼하고, '정확도에 목숨 걸지 말자'는 분위기를 만들어주는 게 차이예요.",
    "exampleKo": "5년치 기준으로 스토리지를 대충 잡아보죠."
  },
  {
    "key": "sd:let-me-do-the-math",
    "en": "Let me do the math",
    "ko": "계산 한번 해볼게",
    "example": "Let me do the math, a million users times ten KB.",
    "situations": [
      "용량/QPS 곱셈을 보드에서 풀 때",
      "추정치를 숫자로 확인할 때"
    ],
    "detail": "직역하면 '수학을 하겠다'지만 실제론 '잠깐 암산/계산 좀 해볼게' 정도의 가벼운 말이에요. 백오브엔벨롭 계산을 소리 내서 시작하기 직전에 이 말을 하면 침묵이 어색하지 않게 됩니다. 면접에선 계산 과정을 입 밖으로 내는 게 점수라서 이 표현이 진짜 유용해요. 참고로 \"You do the math\"는 '직접 계산해봐 = 답이 뻔하잖아'라는 약간 비꼬는 관용구라 어감이 완전히 달라요.",
    "exampleKo": "계산해볼게요. 유저 백만 명 곱하기 10KB니까..."
  },
  {
    "key": "sd:give-or-take",
    "en": "Give or take",
    "ko": "대략, 오차는 좀 있고",
    "example": "About two terabytes, give or take.",
    "situations": [
      "추정치에 여유를 둘 때",
      "정확하지 않다는 걸 인정하며 숫자 말할 때"
    ],
    "detail": "숫자 뒤에 툭 붙여서 '오차 좀 있어도 그쯤'이라고 하는 꼬리표예요. \"two terabytes, give or take\"처럼 문장 맨 끝에 콤마 찍고 붙이는 게 정석 위치입니다. give or take a few hundred gigs처럼 오차 범위를 명시할 수도 있어요. roughly가 숫자 앞에 붙는 거라면 give or take는 뒤에 붙는다는 위치 차이만 기억하면 되고, 한 문장에 둘 다 쓰면 과해요.",
    "exampleKo": "한 2테라바이트 정도요, 오차는 좀 있고요."
  },
  {
    "key": "sd:let-s-round-up",
    "en": "Let's round up",
    "ko": "넉넉하게 올림하자",
    "example": "Let's round up to a hundred for headroom.",
    "situations": [
      "여유분 두고 숫자 잡을 때",
      "추정 단순화하려 올림할 때"
    ],
    "detail": "계산값을 위로 올려서 여유분(headroom)을 확보하자는 말이에요. 단순 반올림이 아니라 '용량 산정은 보수적으로'라는 엔지니어링 판단이 깔려 있어서, \"for headroom\"이나 \"to be safe\"가 자주 따라붙죠. 캐파 추정에서 87 같은 어중간한 숫자가 나왔을 때 100으로 올리면서 쓰는 게 전형적 장면입니다. round down(내림), round off(반올림)와 방향이 다르니 섞어 쓰지 마세요.",
    "exampleKo": "여유 있게 100으로 올려 잡죠."
  },
  {
    "key": "sd:we-d-put-a-load-balancer-in-front",
    "en": "We'd put a load balancer in front",
    "ko": "앞단에 로드밸런서를 둘 거야",
    "example": "We'd put a load balancer in front of these.",
    "situations": [
      "요청 분산 지점을 설명할 때",
      "여러 서버 앞단 진입점을 그릴 때"
    ],
    "detail": "여기서 we'd(= we would)는 '이 설계라면 ~할 거예요'라는 가정 화법인데, 시스템 디자인 면접에선 거의 기본 말투예요. in front (of)는 트래픽이 들어오는 방향 기준으로 '앞단'이라는 뜻이고, 다이어그램에서 서버들 위에 LB 박스를 그리면서 이 말을 합니다. behind와 짝으로 기억하면 좋아요 — \"the servers sit behind the LB\"처럼요. will을 쓰면 실제 배포 계획처럼 들리니 면접에선 would가 안전합니다.",
    "exampleKo": "이 서버들 앞단에 로드밸런서를 둘 거예요."
  },
  {
    "key": "sd:add-a-cache-layer-here",
    "en": "Add a cache layer here",
    "ko": "여기에 캐시 레이어 하나 추가하자",
    "example": "Add a cache layer here to take read pressure off.",
    "situations": [
      "DB 읽기 부하를 줄이려 할 때",
      "핫 데이터 빠르게 내보내려 할 때"
    ],
    "detail": "다이어그램의 특정 지점을 가리키며 캐시를 끼워 넣자고 제안하는 말이에요. layer라고 하면 단일 Redis 인스턴스가 아니라 '계층' 하나를 통째로 추가한다는 아키텍처적 어감이 살아납니다. 보통 뒤에 \"to take read pressure off\"(읽기 부하 덜어내려고)처럼 이유를 붙이는 게 면접 화법의 정석이에요. 주의: 캐시를 제안하면 면접관이 거의 반드시 invalidation(무효화) 전략을 물어보니, 그 답을 준비하고 꺼내세요.",
    "exampleKo": "여기 캐시 레이어를 추가해서 읽기 부하를 덜어내죠."
  },
  {
    "key": "sd:a-read-replica-for-the-read-path",
    "en": "A read replica for the read path",
    "ko": "읽기 경로용으로 리드 리플리카 하나",
    "example": "A read replica for the read path, writes hit primary.",
    "situations": [
      "읽기 부하를 분산할 때",
      "쓰기와 읽기를 다른 노드로 나눌 때"
    ],
    "detail": "읽기 트래픽을 복제본으로 빼고 쓰기는 프라이머리로 보내는, 읽기 위주 시스템의 단골 패턴을 한 줄로 말하는 표현이에요. read path / write path처럼 '경로'로 나눠 말하는 습관 자체가 시니어스러운 화법입니다. 다이어그램에 리플리카 박스를 추가하면서 자연스럽게 나오는 말이죠. 이걸 꺼내면 replication lag(복제 지연) 질문이 따라오는 게 거의 공식이니, eventual consistency 얘기로 받아칠 준비를 하세요.",
    "exampleKo": "읽기 경로엔 리드 리플리카 하나 두고, 쓰기는 프라이머리로 보내요."
  },
  {
    "key": "sd:throw-a-queue-in-between",
    "en": "Throw a queue in between",
    "ko": "중간에 큐 하나 끼워넣자",
    "example": "Throw a queue in between to absorb the spikes.",
    "situations": [
      "트래픽 스파이크를 완충할 때",
      "생산자와 소비자를 비동기로 떼어낼 때"
    ],
    "detail": "throw가 들어가서 '큐 하나 휙 던져 넣자'는 아주 캐주얼한 어감이에요. 정중한 자리라고 insert 같은 딱딱한 단어를 쓰면 오히려 부자연스럽고, 이런 throw/stick/slap 같은 동사가 화이트보드 토론의 실제 말투입니다. 트래픽 스파이크를 흡수하거나 두 서비스를 비동기로 분리할 때 나오는 말이죠. 주의: 큐를 넣는 순간 '메시지 유실되면? 순서 보장은?' 같은 후속 질문이 따라오니 가볍게 던진 만큼 방어 논리는 준비돼 있어야 해요.",
    "exampleKo": "중간에 큐 하나 끼워 넣어서 스파이크를 흡수시키죠."
  },
  {
    "key": "sd:let-s-decouple-these-two",
    "en": "Let's decouple these two",
    "ko": "이 둘을 분리하자",
    "example": "Let's decouple these two with an event.",
    "situations": [
      "서비스 간 의존을 끊을 때",
      "비동기 처리로 묶음을 풀 때"
    ],
    "detail": "두 컴포넌트가 서로 직접 호출하며 묶여 있는 걸 떼어내자는 말로, 마이크로서비스·이벤트 기반 설계 논의의 핵심 단어예요. 단순히 separate(분리)가 아니라 '한쪽이 죽거나 느려져도 다른 쪽이 안 끌려가게 의존성을 끊는다'는 공학적 의도가 담겨 있습니다. 주문 서비스와 알림 서비스 사이에 이벤트를 끼울 때 같은 장면에서 나오죠. 반대말 tightly coupled(강결합)와 세트로 기억하면 트레이드오프 설명할 때 편해요.",
    "exampleKo": "이 둘은 이벤트로 분리(디커플링)하죠."
  },
  {
    "key": "sd:put-a-cdn-in-front-of-static-assets",
    "en": "Put a CDN in front of static assets",
    "ko": "정적 자원 앞에는 CDN을 둬",
    "example": "Put a CDN in front of static assets, images mostly.",
    "situations": [
      "이미지/파일 전송 지연 줄일 때",
      "엣지에서 정적 콘텐츠 서빙할 때"
    ],
    "detail": "이미지·JS·CSS 같은 정적 파일은 오리진까지 안 가고 엣지에서 서빙하자는, 거의 반사적으로 나와야 하는 제안이에요. static assets라는 단어 묶음 자체를 통째로 외워두면 좋습니다. 대용량 미디어 서비스 설계에서 대역폭 얘기가 나올 때 이 한 줄이 자연스럽게 등장하죠. 주의: 동적 API 응답까지 CDN으로 해결된다고 말하면 캐시 무효화 지옥 질문이 들어오니, 'static'에 한정해서 말하는 게 안전해요.",
    "exampleKo": "정적 자원 앞엔 CDN을 두죠. 주로 이미지요."
  },
  {
    "key": "sd:we-d-shard-by-user-id",
    "en": "We'd shard by user id",
    "ko": "유저 아이디로 샤딩할 거야",
    "example": "We'd shard by user id to spread the load.",
    "situations": [
      "DB를 수평 분할할 키를 정할 때",
      "한 테이블이 너무 커질 때"
    ],
    "detail": "shard by X 패턴으로 '무엇을 샤딩 키로 잡을지'까지 한 번에 말하는 표현이에요. 단일 DB가 한계에 부딪히는 시나리오에서 수평 분할을 제안할 때 나오고, by 뒤에 오는 키 선택이 사실상 설계의 핵심입니다. 이 말을 꺼내면 면접관이 거의 확실하게 hot shard(특정 유저에 트래픽 쏠림)나 cross-shard query 문제를 물어봐요. partition과 거의 동의어지만, shard는 'DB를 물리적으로 쪼갠다'는 어감이 더 강합니다.",
    "exampleKo": "부하 분산을 위해 유저 아이디 기준으로 샤딩할 거예요."
  },
  {
    "key": "sd:denormalize-for-read-speed",
    "en": "Denormalize for read speed",
    "ko": "읽기 속도 위해 비정규화하자",
    "example": "Denormalize for read speed, we eat the dupes.",
    "situations": [
      "조인 비용을 없애려 할 때",
      "읽기 최적화로 데이터 중복 감수할 때"
    ],
    "detail": "정규화 원칙을 일부러 깨고 데이터를 중복 저장해서 조인 없이 빠르게 읽자는 말이에요. 'for read speed'를 붙여서 위반의 이유를 명시하는 게 포인트 — 교과서를 몰라서가 아니라 알고도 트레이드오프로 선택했다는 어필이죠. 피드 시스템에서 작성자 이름을 게시물 레코드에 박아 넣는 결정 같은 장면에서 나옵니다. 예문의 \"we eat the dupes\"는 '중복은 감수한다'는 구어체로, eat이 '비용을 떠안다'는 뜻으로 쓰인 것도 같이 익혀두세요.",
    "exampleKo": "읽기 속도를 위해 비정규화하고, 중복은 감수해요."
  },
  {
    "key": "sd:eventual-consistency-is-fine-here",
    "en": "Eventual consistency is fine here",
    "ko": "여긴 최종 일관성이면 충분해",
    "example": "Eventual consistency is fine here, it's just a count.",
    "situations": [
      "강한 일관성이 필요 없는 부분 설명할 때",
      "지연 반영을 허용할 때"
    ],
    "detail": "모든 곳에 강한 일관성이 필요하진 않다는 판단을 내리는 문장이에요. 'is fine here'가 핵심인데, '여기는'이라고 한정해서 좋아요 수나 조회수처럼 잠깐 어긋나도 아무도 안 다치는 데이터에만 적용한다는 분별력을 보여주죠. 리드 리플리카나 캐시의 stale 데이터 문제를 지적받았을 때 받아치는 용도로도 씁니다. 주의: 결제나 재고에 이 말을 하면 바로 역공당하니, 어디가 fine이고 어디가 아닌지 선을 그어 말하세요.",
    "exampleKo": "여긴 최종 일관성이면 충분해요. 그냥 카운트니까요."
  },
  {
    "key": "sd:the-write-path-goes-through-here",
    "en": "The write path goes through here",
    "ko": "쓰기 경로는 여기로 흘러",
    "example": "The write path goes through here, then to the queue.",
    "situations": [
      "데이터가 들어오는 흐름을 짚을 때",
      "쓰기와 읽기 경로를 구분해 설명할 때"
    ],
    "detail": "다이어그램 위에서 손가락이나 펜으로 경로를 따라가며 하는 말이에요. goes through가 '이 지점을 통과해서 흐른다'는 동선의 느낌을 줘서, 데이터 플로우를 설명하는 단계에서 자연스럽게 나옵니다. read path와 write path를 따로따로 추적해서 설명하는 것 자체가 시스템 디자인 면접의 정석 진행 방식이에요. 'passes through'와 거의 같지만 goes through가 더 구어적입니다.",
    "exampleKo": "쓰기 경로는 여기를 거쳐서 큐로 흘러가요."
  },
  {
    "key": "sd:we-index-on-that-column",
    "en": "We index on that column",
    "ko": "그 컬럼에 인덱스를 걸어",
    "example": "We index on that column so lookups stay fast.",
    "situations": [
      "조회 성능 위해 인덱스 설계할 때",
      "느린 쿼리를 빠르게 만들 때"
    ],
    "detail": "index를 동사로, on과 함께 쓰는 게 포인트예요 — \"add an index to\"보다 \"index on user_id\"가 훨씬 입에 붙는 현장 말투입니다. 쿼리가 풀스캔 타게 생겼다는 지적이 나왔을 때, 혹은 조회 패턴을 설명하면서 lookups stay fast라고 근거를 붙일 때 나오죠. 주의: 인덱스를 만능처럼 말하면 '쓰기 비용은?'이 따라오니, 쓰기 무거운 테이블에선 인덱스도 공짜가 아니라는 걸 언급할 준비를 하세요.",
    "exampleKo": "그 컬럼에 인덱스를 걸어서 조회가 계속 빠르게 유지되게 해요."
  },
  {
    "key": "sd:keep-the-hot-data-in-memory",
    "en": "Keep the hot data in memory",
    "ko": "자주 쓰는 데이터는 메모리에 둬",
    "example": "Keep the hot data in memory, cold goes to disk.",
    "situations": [
      "접근 빈도로 데이터 계층 나눌 때",
      "지연 줄이려 인메모리 쓸 때"
    ],
    "detail": "hot data는 접근 빈도가 높은 데이터, cold data는 거의 안 건드리는 데이터라는 짝 개념이에요. 캐시 전략이나 스토리지 계층화(tiering)를 설명할 때 \"hot in memory, cold on disk\"처럼 대구로 말하면 깔끔합니다. 전체 데이터 중 일부만 메모리에 올려도 대부분의 요청을 커버할 수 있다는 80/20 논리를 깔고 가는 표현이죠. hot을 '인기 있는'으로만 알면 어색할 수 있는데, 여기선 '자주 접근되는'이라는 기술 용어예요.",
    "exampleKo": "자주 쓰는 데이터는 메모리에 두고, 안 쓰는 건 디스크로 보내요."
  },
  {
    "key": "sd:the-bottleneck-would-be-the-db",
    "en": "The bottleneck would be the DB",
    "ko": "병목은 DB가 될 거야",
    "example": "The bottleneck would be the DB under write load.",
    "situations": [
      "성능 한계 지점을 지목할 때",
      "부하가 어디서 터질지 설명할 때"
    ],
    "detail": "would be가 들어가서 '이 설계대로면 병목은 DB가 될 것'이라는 예측 화법이에요. 설계를 어느 정도 그린 다음 스스로 약점을 먼저 짚는 단계에서 나오는데, 면접관이 지적하기 전에 본인이 먼저 말하면 점수가 큽니다. 보통 뒤에 'under write load' 같은 조건을 붙여서 어떤 상황에서 병목인지 구체화하죠. \"The bottleneck is\"라고 단정하면 이미 운영 중인 시스템 얘기처럼 들리니, 가상 설계에선 would be가 맞아요.",
    "exampleKo": "쓰기 부하가 걸리면 병목은 DB가 될 거예요."
  },
  {
    "key": "sd:the-tradeoff-is-consistency-versus-avail",
    "en": "The tradeoff is consistency versus availability",
    "ko": "트레이드오프는 일관성 대 가용성이야",
    "example": "The tradeoff is consistency versus availability here.",
    "situations": [
      "CAP 선택을 설명할 때",
      "둘 중 뭘 포기할지 짚을 때"
    ],
    "detail": "CAP 정리를 입으로 푸는 전형적인 문장이에요. 'X versus Y' 구조로 트레이드오프의 양 축을 명시하는 게 포인트인데, 그냥 \"there's a tradeoff\"라고만 하면 얼버무리는 느낌이고 이렇게 양쪽을 박아줘야 설득력이 생깁니다. 멀티 리전이나 복제 전략 논의에서 어느 쪽을 희생할지 정할 때 나오죠. 주의: CAP을 꺼냈으면 '이 시스템에선 어느 쪽을 택하겠다'까지 말해야지, 용어만 던지고 끝내면 오히려 얕아 보여요.",
    "exampleKo": "여기서 트레이드오프는 일관성이냐 가용성이냐예요."
  },
  {
    "key": "sd:that-doesn-t-scale-because",
    "en": "That doesn't scale because",
    "ko": "그건 확장이 안 돼, 왜냐면",
    "example": "That doesn't scale because every read hits one node.",
    "situations": [
      "특정 설계의 한계를 지적할 때",
      "단순한 안이 규모에서 깨지는 이유 댈 때"
    ],
    "detail": "어떤 접근이 규모에서 무너진다고 지적할 때 because까지 한 호흡으로 이어 말하는 게 핵심이에요. 이유 없이 \"that doesn't scale\"만 던지면 면접에서도 실무에서도 그냥 막말처럼 들리거든요. 자기가 먼저 낸 단순한 안을 스스로 반박하며 다음 설계로 넘어가는 다리로 쓰면 아주 자연스럽습니다. 동료 안을 지적할 땐 \"I'm not sure that scales\"처럼 한 단계 부드럽게 바꾸는 게 안전해요.",
    "exampleKo": "그건 확장이 안 돼요. 모든 읽기가 노드 하나로 몰리니까요."
  },
  {
    "key": "sd:this-is-the-single-point-of-failure",
    "en": "This is the single point of failure",
    "ko": "여기가 단일 장애점이야",
    "example": "This is the single point of failure, we need a backup.",
    "situations": [
      "하나 죽으면 전체가 죽는 지점 짚을 때",
      "이중화가 필요한 곳 지목할 때"
    ],
    "detail": "줄여서 SPOF라고도 하는, '여기 하나 죽으면 전체가 죽는 지점'을 짚는 표현이에요. 다이어그램에서 LB나 단일 DB를 가리키며 스스로 약점을 선언하고, 바로 이중화(redundancy/failover) 얘기로 이어가는 게 정석 흐름입니다. 면접관이 \"What happens if this dies?\"라고 묻기 전에 선수 치는 용도로 최고예요. bottleneck과 헷갈리지 마세요 — 병목은 느려지는 곳이고, SPOF는 죽으면 전체가 멈추는 곳입니다.",
    "exampleKo": "여기가 단일 장애점이에요. 백업이 필요해요."
  },
  {
    "key": "sd:it-depends-on-the-access-pattern",
    "en": "It depends on the access pattern",
    "ko": "접근 패턴에 따라 달라",
    "example": "It depends on the access pattern, reads or writes.",
    "situations": [
      "정답이 워크로드에 좌우될 때",
      "선택 근거를 패턴으로 설명할 때"
    ],
    "detail": "SQL이냐 NoSQL이냐 같은 양자택일 질문에 단정 대신 조건을 다는, 시니어의 전형적인 답변 시작이에요. access pattern은 데이터를 '어떻게 읽고 쓰는가'(키 단건 조회인지, 범위 스캔인지, 쓰기 폭주인지)를 묶어 부르는 핵심 용어죠. 다만 \"it depends\"에서 멈추면 회피로 보이니, 반드시 \"reads or writes\"처럼 무엇에 따라 어떻게 갈리는지를 바로 이어 말해야 합니다. 그게 이 표현의 진짜 사용법이에요.",
    "exampleKo": "접근 패턴에 따라 달라요. 읽기 위주냐 쓰기 위주냐죠."
  },
  {
    "key": "sd:we-scale-this-horizontally",
    "en": "We scale this horizontally",
    "ko": "이건 수평으로 확장해",
    "example": "We scale this horizontally, just add more nodes.",
    "situations": [
      "서버를 늘려 처리량 키울 때",
      "수직 확장과 대비해 설명할 때"
    ],
    "detail": "장비를 키우는 게 아니라(scale vertically/up) 노드 수를 늘려서(scale out) 처리량을 키운다는 말이에요. 예문처럼 \"just add more nodes\"를 붙이면 '병목 생기면 기계만 더 꽂으면 됨'이라는 설계의 장점을 한 줄로 어필할 수 있죠. stateless 서비스 얘기할 때 거의 세트로 나옵니다. 주의: DB처럼 상태가 있는 컴포넌트에 이 말을 쉽게 쓰면 '샤딩은 어떻게?'가 바로 따라오니, 수평 확장이 쉬운 층과 어려운 층을 구분해 말하세요.",
    "exampleKo": "이건 수평으로 확장해요. 노드만 더 추가하면 돼요."
  },
  {
    "key": "sd:fan-out-the-writes",
    "en": "Fan out the writes",
    "ko": "쓰기를 팬아웃으로 뿌려",
    "example": "Fan out the writes to each follower's feed.",
    "situations": [
      "쓰기 시점에 여러 곳으로 복제할 때",
      "피드 분산 전략 설명할 때"
    ],
    "detail": "하나의 쓰기를 여러 대상으로 부채꼴처럼 뿌린다는 뜻으로, 트위터 피드 설계의 fan-out-on-write 논의에서 거의 반드시 나오는 표현이에요. 글 하나 올리면 팔로워 전원의 피드에 미리 복사해 넣는 그 패턴이죠. 이 말을 꺼내면 면접관이 셀럽 문제(팔로워 천만 명이면?)를 물어보는 게 공식이니, fan-out-on-read와의 하이브리드 답을 준비해두세요. 명사형 fan-out(팬아웃 비율)으로도 자주 쓰입니다.",
    "exampleKo": "쓰기를 각 팔로워의 피드로 팬아웃해서 뿌려요."
  },
  {
    "key": "sd:we-can-cache-aggressively-here",
    "en": "We can cache aggressively here",
    "ko": "여긴 공격적으로 캐싱해도 돼",
    "example": "We can cache aggressively here, it rarely changes.",
    "situations": [
      "변경 드문 데이터를 길게 캐싱할 때",
      "읽기 부하를 캐시로 거의 다 막을 때"
    ],
    "detail": "aggressively가 핵심인데, TTL 길게 잡고 광범위하게 '마음 놓고 세게' 캐싱한다는 어감이에요. 데이터가 거의 안 변하는 곳(상품 카탈로그, 프로필 같은)을 가리키며 쓰고, 예문처럼 \"it rarely changes\"라는 근거가 따라붙어야 완성됩니다. 한국어 '공격적'의 부정적 어감과 달리 영어 aggressive caching은 그냥 중립적인 기술 용어예요. 반대 상황은 \"cache conservatively\" 또는 short TTL로 표현합니다.",
    "exampleKo": "여긴 공격적으로 캐싱해도 돼요. 거의 안 바뀌니까요."
  },
  {
    "key": "sd:push-the-work-to-a-background-job",
    "en": "Push the work to a background job",
    "ko": "그 작업은 백그라운드 잡으로 넘겨",
    "example": "Push the work to a background job, don't block.",
    "situations": [
      "무거운 처리를 비동기로 뺄 때",
      "응답 지연 줄이려 후처리로 미룰 때"
    ],
    "detail": "요청 처리 경로에서 무거운 작업(썸네일 생성, 메일 발송 등)을 떼어내 비동기로 돌리자는 말이에요. push to가 '떠넘기다/넘겨버리다'는 동작감을 줘서, 응답 지연 문제를 지적받았을 때 해결책으로 던지기 좋습니다. 예문의 \"don't block\"처럼 '요청 스레드를 막지 말자'는 이유와 세트로 말하는 게 자연스러워요. 주의: 백그라운드로 넘기는 순간 '실패하면 어떻게 알지?'가 따라오니, 재시도와 모니터링 얘기를 준비하세요.",
    "exampleKo": "그 작업은 백그라운드 잡으로 넘겨요. 블로킹하지 말고요."
  },
  {
    "key": "sd:rate-limit-at-the-edge",
    "en": "Rate limit at the edge",
    "ko": "엣지에서 레이트 리밋을 걸어",
    "example": "Rate limit at the edge before it hits the backend.",
    "situations": [
      "남용/스파이크를 입구에서 막을 때",
      "백엔드 보호 장치 설명할 때"
    ],
    "detail": "rate limit을 동사로 쓴 것이고, at the edge는 백엔드 깊숙이가 아니라 API 게이트웨이나 CDN 엣지처럼 트래픽이 처음 닿는 지점에서 막자는 뜻이에요. 악성 트래픽이나 폭주를 비싼 내부 리소스에 닿기 전에 차단한다는 '방어선은 바깥에' 원칙이 담겨 있죠. DDoS나 어뷰징 시나리오 질문에서 첫 답으로 꺼내기 좋습니다. edge를 '가장자리'로 직역하면 어색한데, 인프라 용어로 '사용자에게 가장 가까운 진입점'을 뜻해요.",
    "exampleKo": "백엔드에 닿기 전에 엣지에서 레이트 리밋을 걸어요."
  },
  {
    "key": "sd:let-s-add-monitoring-around-this",
    "en": "Let's add monitoring around this",
    "ko": "여기 주변에 모니터링을 붙이자",
    "example": "Let's add monitoring around this so we catch lag.",
    "situations": [
      "장애를 빨리 감지하려 할 때",
      "운영 관점 마무리로 관측성 언급할 때"
    ],
    "detail": "around this가 묘미인데, 특정 컴포넌트 '주변에' 메트릭·알람을 둘러치자는 그림이에요. 설계 마무리 단계에서 약한 고리(큐 랙, 복제 지연 등)를 짚으며 이 말을 하면 '만들고 끝이 아니라 운영까지 생각하는 사람'으로 보입니다. 면접 막판 \"운영은 어떻게?\" 질문에 대한 선제 대응으로도 좋아요. monitoring(지표 감시)과 alerting(임계치 알람)은 별개니, 한 단계 더 가려면 \"and alert on lag\"까지 붙이세요.",
    "exampleKo": "여기 주변에 모니터링을 붙여서 랙이 생기면 바로 잡아내죠."
  }
];

export const PAIR_CARDS: PhraseCard[] = [
  {
    "key": "pp:let-me-stub-this-out-first",
    "en": "Let me stub this out first",
    "ko": "일단 뼈대(빈 함수)부터 잡을게요",
    "example": "Let me stub this out first, then fill in the logic.",
    "situations": [
      "함수 시그니처만 먼저 작성할 때",
      "구현 전 구조부터 잡을 때"
    ],
    "detail": "stub은 원래 '뭉툭한 토막'이라는 뜻인데, 코딩에서는 시그니처만 있고 속은 빈 함수를 말해요. 코딩 인터뷰에서 전체 구조를 먼저 보여주고 싶을 때, 함수 이름이랑 파라미터만 쭉 적어놓고 'stub this out first'라고 하면 면접관이 '아, 설계부터 잡는구나' 하고 좋게 봐요. 'mock'이랑 헷갈리기 쉬운데, mock은 테스트용 가짜 객체고 stub은 그냥 아직 안 채운 빈 껍데기라는 차이가 있어요.",
    "exampleKo": "일단 뼈대부터 잡아놓고, 그다음에 로직을 채울게요."
  },
  {
    "key": "pp:let-me-just-get-it-working-then-refactor",
    "en": "Let me just get it working, then refactor",
    "ko": "일단 동작부터 시키고 나중에 정리할게요",
    "example": "Let me just get it working, then refactor it later.",
    "situations": [
      "완벽함보다 동작을 우선할 때",
      "리팩터링을 뒤로 미룰 때"
    ],
    "detail": "'완벽하게 말고 일단 돌아가게'라는 실용주의 선언이에요. 인터뷰에서 시간이 빠듯한데 깔끔한 코드 욕심에 멈춰 있으면 오히려 감점이라, 이 말 한마디 던지고 빠르게 동작하는 버전부터 짜는 게 정석이에요. 주의할 점은 말만 하고 리팩터링을 안 하면 더 안 좋게 보이니까, 나중에 시간 남으면 진짜로 변수명이라도 정리하는 모습을 보여줘야 해요.",
    "exampleKo": "일단 동작부터 시키고, 나중에 리팩터링할게요."
  },
  {
    "key": "pp:i-ll-start-with-the-brute-force",
    "en": "I'll start with the brute force",
    "ko": "우선 브루트포스로 풀고 시작할게요",
    "example": "I'll start with the brute force, then optimize.",
    "situations": [
      "가장 단순한 해법부터 짤 때",
      "최적화 전 기준점을 만들 때"
    ],
    "detail": "brute force는 '무식하게 다 해보는' 완전탐색인데, 이 말을 먼저 꺼내는 건 부끄러운 게 아니라 오히려 전략이에요. 알고리즘 문제 받자마자 최적해가 안 보일 때 'O(n²)이지만 brute force부터 시작할게요'라고 깔아두면, 일단 정답 코드는 확보하고 최적화 논의로 자연스럽게 넘어갈 수 있거든요. 주의점은 반드시 'then optimize'를 붙여서 이게 최종 답이 아니라는 걸 명확히 해야 한다는 거예요.",
    "exampleKo": "우선 브루트포스로 풀고, 그다음에 최적화할게요."
  },
  {
    "key": "pp:i-ll-come-back-to-error-handling",
    "en": "I'll come back to error handling",
    "ko": "에러 처리는 이따 다시 볼게요",
    "example": "I'll come back to error handling once the happy path works.",
    "situations": [
      "정상 흐름부터 먼저 짤 때",
      "예외 처리를 잠시 미룰 때"
    ],
    "detail": "'에러 처리는 알고 있지만 지금은 핵심 로직 먼저'라는 우선순위 선언이에요. 인터뷰에서 try-catch랑 null 체크부터 깔다가 시간 다 쓰는 사람이 의외로 많은데, 이 한마디로 '나 그거 잊은 거 아니야'라는 시그널을 주면서 본론에 집중할 수 있어요. 다만 면접관이 'how would you handle errors here?'라고 물어보면 그때는 바로 답할 수 있게 머릿속엔 담아둬야 해요.",
    "exampleKo": "에러 처리는 정상 흐름이 동작하고 나서 다시 볼게요."
  },
  {
    "key": "pp:let-me-leave-a-todo-here",
    "en": "Let me leave a TODO here",
    "ko": "여기 TODO 하나 남겨둘게요",
    "example": "Let me leave a TODO here so I don't forget.",
    "situations": [
      "나중에 할 일을 표시할 때",
      "미완성 부분을 메모할 때"
    ],
    "detail": "실제 코드에 // TODO 주석 적듯이, 인터뷰에서도 '여기 할 일 있는 거 인지하고 있어요'를 코드에 박아두는 표현이에요. 화이트보드나 공유 에디터에서 validation 같은 걸 건너뛸 때 진짜로 // TODO: validate input 한 줄 쓰면서 이 말을 하면 꼼꼼하다는 인상을 줘요. 그냥 말로만 '나중에 할게요' 하는 것보다 눈에 보이는 흔적을 남기는 게 포인트예요.",
    "exampleKo": "까먹지 않게 여기 TODO 하나 남겨둘게요."
  },
  {
    "key": "pp:i-ll-handle-edge-cases-after",
    "en": "I'll handle edge cases after",
    "ko": "엣지 케이스는 나중에 처리할게요",
    "example": "I'll handle edge cases after the core logic is done.",
    "situations": [
      "핵심 로직부터 끝낼 때",
      "특수 케이스를 뒤로 미룰 때"
    ],
    "detail": "엣지 케이스를 미루는 것 자체는 괜찮은데, '인지하고 미루는 것'과 '몰라서 빼먹는 것'은 하늘과 땅 차이예요. 그래서 이 말을 할 때는 'like empty input or duplicates'처럼 어떤 엣지 케이스인지 한두 개 입으로 언급해주는 게 좋아요. 그래야 면접관이 '얘는 알면서 전략적으로 미루는 거구나'라고 인식하거든요. 안 그러면 나중에 '엣지 케이스 생각해봤어요?'라는 압박 질문이 들어와요.",
    "exampleKo": "엣지 케이스는 핵심 로직 끝내고 나서 처리할게요."
  },
  {
    "key": "pp:let-me-run-through-an-example",
    "en": "Let me run through an example",
    "ko": "예시 하나로 돌려볼게요",
    "example": "Let me run through an example to check the logic.",
    "situations": [
      "구체적 입력으로 검증할 때",
      "로직을 예시로 확인할 때"
    ],
    "detail": "코드를 다 짜고 나서, 또는 접근법을 설명하다가 구체적인 입력값 하나를 잡고 처음부터 끝까지 돌려보겠다는 말이에요. 인터뷰에서 코드 완성하자마자 'done!'이라고 하는 것보다, 이 말 하고 예시로 검증하는 모습을 보이면 평가가 확 달라져요. 'walk through'와 거의 같지만, run through는 '내가 검증하려고 돌려본다', walk through는 '상대에게 설명해준다' 쪽 뉘앙스가 강해요.",
    "exampleKo": "로직 맞는지 예시 하나로 돌려볼게요."
  },
  {
    "key": "pp:let-me-trace-this-with-a-sample-input",
    "en": "Let me trace this with a sample input",
    "ko": "샘플 입력으로 흐름을 따라가 볼게요",
    "example": "Let me trace this with a sample input like [1, 2, 3].",
    "situations": [
      "코드 실행 흐름을 짚을 때",
      "값이 어떻게 변하는지 볼 때"
    ],
    "detail": "trace는 변수 값이 한 줄 한 줄 어떻게 변하는지 따라간다는 뜻으로, run through보다 더 정밀하게 디버깅하는 느낌이에요. 코드가 의심스러울 때 [1, 2, 3] 같은 작은 입력을 잡고 'i가 0일 때 sum은...' 하면서 손으로 짚어가는 장면에서 나와요. 인터뷰에서 버그가 보이는데 어딘지 모를 때 당황하지 말고 이 말 하면서 차분히 추적하면, 그 과정 자체가 디버깅 역량 점수가 돼요.",
    "exampleKo": "[1, 2, 3] 같은 샘플 입력으로 흐름을 따라가 볼게요."
  },
  {
    "key": "pp:let-me-sanity-check-this",
    "en": "Let me sanity-check this",
    "ko": "이게 말이 되나 한번 확인해 볼게요",
    "example": "Let me sanity-check this before moving on.",
    "situations": [
      "다음으로 넘어가기 전 점검할 때",
      "빠르게 맞는지 확인할 때"
    ],
    "detail": "sanity check는 '정신이 온전한지 확인한다'는 직역처럼, 엄밀한 검증이 아니라 '말도 안 되는 실수는 없는지' 가볍게 훑는 거예요. 다음 단계로 넘어가기 전에 '잠깐, 이 인덱스 범위 맞나?' 하고 30초 점검하는 장면에서 딱이에요. double-check와 비슷하지만 sanity-check는 '기본적인 것만 빠르게', double-check는 '한 번 더 꼼꼼히'라는 결이 달라요. 참고로 일부 회사 문서에서는 이 표현 대신 confidence check를 쓰기도 하는데, 말로 할 땐 sanity-check가 여전히 압도적으로 흔해요.",
    "exampleKo": "넘어가기 전에 이게 말이 되는지 한번 점검해 볼게요."
  },
  {
    "key": "pp:let-me-dry-run-it",
    "en": "Let me dry-run it",
    "ko": "머릿속으로 한번 돌려볼게요",
    "example": "Let me dry-run it on paper real quick.",
    "situations": [
      "실행 없이 로직만 따라갈 때",
      "코드를 종이로 검증할 때"
    ],
    "detail": "dry run은 실제로 실행하지 않고 머릿속이나 종이로 코드를 한 줄씩 돌려보는 거예요. 화이트보드 인터뷰처럼 실행 환경이 없을 때, 또는 코드를 돌리기 전에 손으로 먼저 검증하고 싶을 때 쓰는 말이에요. trace와 거의 같은 행동인데, dry-run은 '실행 없이'라는 점이 핵심이라 배포 스크립트의 --dry-run 옵션처럼 '실제 효과 없이 시뮬레이션만'이라는 의미로도 자주 만나요.",
    "exampleKo": "종이에 빠르게 한번 손으로 돌려볼게요."
  },
  {
    "key": "pp:i-m-iterating-over-the-list-here",
    "en": "I'm iterating over the list here",
    "ko": "여기서 리스트를 순회하고 있어요",
    "example": "I'm iterating over the list here to find the max.",
    "situations": [
      "반복문을 설명할 때",
      "리스트를 도는 부분을 짚을 때"
    ],
    "detail": "코딩하면서 자기가 지금 뭘 하는지 실황 중계하는 전형적인 narration 문장이에요. 인터뷰에서 말없이 5분 동안 타이핑만 하면 면접관이 따라오질 못하니까, for문 쓰면서 이렇게 입으로 깔아주는 게 중요해요. 전치사가 포인트인데 iterate over(또는 through)가 자연스럽고, iterate the list처럼 전치사를 빼면 어색하게 들려요.",
    "exampleKo": "여기서 최댓값을 찾으려고 리스트를 순회하고 있어요."
  },
  {
    "key": "pp:i-ll-extract-this-into-a-helper",
    "en": "I'll extract this into a helper",
    "ko": "이 부분은 헬퍼 함수로 빼낼게요",
    "example": "I'll extract this into a helper to keep it clean.",
    "situations": [
      "중복 로직을 함수로 분리할 때",
      "가독성을 위해 쪼갤 때"
    ],
    "detail": "중복되거나 길어진 코드 덩어리를 별도 함수로 빼낼 때 쓰는 말로, extract가 리팩터링의 공식 용어예요(IDE의 'Extract Method'가 바로 이거). 인터뷰에서 메인 함수가 길어질 때 이 말 하면서 helper 함수로 분리하면 코드 구조 감각이 있다는 걸 보여줄 수 있어요. 'factor out'도 거의 같은 뜻인데, factor out은 '여러 곳의 공통 로직을 빼낸다'는 뉘앙스가 좀 더 강해요.",
    "exampleKo": "코드 깔끔하게 유지하려고 이 부분은 헬퍼 함수로 빼낼게요."
  },
  {
    "key": "pp:i-m-storing-it-in-a-map-for-o-of-one-loo",
    "en": "I'm storing it in a map for O-of-one lookup",
    "ko": "O(1) 조회를 위해 맵에 저장하고 있어요",
    "example": "I'm storing it in a map for O-of-one lookup later.",
    "situations": [
      "해시맵으로 조회 최적화할 때",
      "자료구조 선택 이유를 말할 때"
    ],
    "detail": "자료구조 선택의 '이유'까지 한 문장에 담는 고급 narration이에요. 그냥 '맵 쓸게요'가 아니라 'O(1) 조회 때문에'라고 근거를 붙이면 복잡도를 의식하며 코딩한다는 시그널이 돼요. 발음 팁 하나: O(1)은 'O of one', O(n)은 'O of n'으로 읽는 게 표준이고, 한국식으로 '오일' '오엔'이라고 하면 못 알아들어요.",
    "exampleKo": "나중에 O(1)로 조회하려고 맵에 저장하고 있어요."
  },
  {
    "key": "pp:wait-that-s-not-right",
    "en": "Wait, that's not right",
    "ko": "잠깐, 이거 틀렸네요",
    "example": "Wait, that's not right, the index is off.",
    "situations": [
      "실수를 바로 알아챘을 때",
      "코드 오류를 발견했을 때"
    ],
    "detail": "자기 실수를 발견한 순간 자연스럽게 튀어나오는 말인데, 인터뷰에서 이 말을 할 수 있다는 것 자체가 강점이에요. 버그를 숨기거나 얼버무리는 것보다 'Wait, that's not right, the index is off' 하고 스스로 잡아서 고치는 모습이 훨씬 좋은 평가를 받거든요. 당황한 티를 내며 'Oh no'를 연발하는 것보다, 이 말 하고 차분하게 고치는 흐름으로 가는 게 포인트예요.",
    "exampleKo": "잠깐, 이거 틀렸네요. 인덱스가 어긋났어요."
  },
  {
    "key": "pp:let-me-back-up",
    "en": "Let me back up",
    "ko": "잠깐 앞으로 돌아가 볼게요",
    "example": "Let me back up and re-read the requirements.",
    "situations": [
      "이전 단계로 되돌아갈 때",
      "방향을 다시 잡을 때"
    ],
    "detail": "차를 후진하듯 대화나 사고를 몇 걸음 뒤로 되돌리겠다는 말이에요. 풀다가 방향이 잘못된 걸 깨달았을 때, 또는 문제 조건을 잘못 이해한 것 같을 때 'Let me back up and re-read the requirements' 식으로 써요. 주의할 점은 'back out'과 헷갈리기 쉬운데, back out은 코드 변경을 빼는(되돌리는) 거고 back up은 말하던 흐름을 되돌리는 거예요. 데이터 백업의 back up과도 형태가 같으니 맥락으로 구분해야 해요.",
    "exampleKo": "잠깐 되돌아가서 요구사항을 다시 읽어볼게요."
  },
  {
    "key": "pp:actually-let-me-rethink-this",
    "en": "Actually, let me rethink this",
    "ko": "사실, 이거 다시 생각해 볼게요",
    "example": "Actually, let me rethink this approach.",
    "situations": [
      "접근 방식을 바꿀 때",
      "더 나은 방법을 고민할 때"
    ],
    "detail": "여기서 actually는 '사실은'이라기보다 '아 잠깐만요, 생각이 바뀌었어요'라는 방향 전환 신호예요. 접근법을 절반쯤 구현하다가 더 나은 방법이 떠올랐거나 지금 방식에 결함이 보일 때, 이 말로 자연스럽게 유턴할 수 있어요. 인터뷰에서 방향을 바꾸는 건 감점이 아니지만, 이런 전환 멘트 없이 갑자기 코드를 지우기 시작하면 면접관이 길을 잃으니까 꼭 입으로 선언하고 바꾸세요.",
    "exampleKo": "아, 잠깐만요. 이 접근 방식을 다시 생각해 봐야겠어요."
  },
  {
    "key": "pp:scratch-that",
    "en": "Scratch that",
    "ko": "방금 거 취소요 (없던 걸로)",
    "example": "Scratch that, the previous way was better.",
    "situations": [
      "방금 말/코드를 무를 때",
      "잘못된 방향을 철회할 때"
    ],
    "detail": "종이에 쓴 걸 박박 긁어 지우는 이미지 그대로, '방금 한 말/방금 짠 거 없던 걸로 해주세요'라는 캐주얼한 표현이에요. 말하다가 틀린 걸 바로 정정할 때 'Scratch that, it's O(n log n) actually'처럼 한 박자로 쓱 지나가요. 'never mind'와 비슷하지만 scratch that은 '직전 발언을 명시적으로 취소'하는 느낌이 강하고, 꽤 캐주얼한 표현이라 가벼운 톤의 인터뷰나 페어 프로그래밍에선 자연스럽지만 격식 있는 발표에선 잘 안 써요.",
    "exampleKo": "방금 건 없던 걸로요. 이전 방식이 더 나았네요."
  },
  {
    "key": "pp:does-that-make-sense",
    "en": "Does that make sense?",
    "ko": "이해되시나요? / 말 되나요?",
    "example": "I'll use a stack here, does that make sense?",
    "situations": [
      "면접관 동의를 구할 때",
      "설명이 전달됐는지 확인할 때"
    ],
    "detail": "설명 한 덩어리 끝낼 때마다 상대가 따라오고 있는지 확인하는 체크포인트 표현이에요. 'Do you understand?'는 '너 이해 못 했지?'처럼 상대를 시험하는 느낌이라 무례하게 들릴 수 있는데, make sense는 '내 설명이 말이 되나요?'라고 책임을 내 쪽으로 가져오는 거라 훨씬 부드러워요. 다만 한 문장마다 기계적으로 붙이면 자신 없어 보이니까, 큰 단락 하나 끝날 때 한 번씩만 쓰는 게 좋아요.",
    "exampleKo": "여기는 스택을 쓰려고 하는데, 말이 되나요?"
  },
  {
    "key": "pp:feel-free-to-stop-me",
    "en": "Feel free to stop me",
    "ko": "언제든 끊으셔도 돼요",
    "example": "Feel free to stop me if I'm going the wrong way.",
    "situations": [
      "면접관 피드백을 열어둘 때",
      "중간 개입을 환영할 때"
    ],
    "detail": "긴 설명이나 코딩을 시작하기 전에 '제가 산으로 가면 언제든 끊어주세요'라고 먼저 문을 열어두는 말이에요. 인터뷰 초반에 접근법을 설명하기 직전에 이 말을 깔아두면 협업적인 인상을 주고, 실제로 면접관이 일찍 개입해줘서 잘못된 길로 오래 가는 걸 막아주는 실리도 있어요. feel free to는 '부담 갖지 말고 ~하세요'라는 정중한 허락 표현이라, 명령조인 'stop me anytime'보다 한결 부드러워요.",
    "exampleKo": "제가 잘못된 방향으로 가고 있으면 언제든 끊으셔도 돼요."
  },
  {
    "key": "pp:let-me-know-if-you-d-do-this-differently",
    "en": "Let me know if you'd do this differently",
    "ko": "다르게 하실 것 같으면 말씀해 주세요",
    "example": "Let me know if you'd do this differently.",
    "situations": [
      "대안 의견을 물을 때",
      "접근 방식 합의를 구할 때"
    ],
    "detail": "내 방식을 보여주면서도 상대의 의견에 열려 있다는 시그널을 주는 표현이에요. 페어 프로그래밍 면접에서 설계 결정을 하나 내린 직후에 이 말을 던지면, 면접관과 '평가받는 자리'가 아니라 '같이 일하는 자리' 분위기를 만들 수 있어요. 포인트는 would예요. 'if you do this differently'가 아니라 you'd(you would)를 써서 '당신이라면 다르게 하실 것 같으면'이라는 가정의 뉘앙스를 살려야 자연스러워요.",
    "exampleKo": "혹시 다르게 하실 것 같으면 말씀해 주세요."
  },
  {
    "key": "pp:let-me-think-out-loud-for-a-sec",
    "en": "Let me think out loud for a sec",
    "ko": "잠깐 생각을 소리 내서 정리해 볼게요",
    "example": "Let me think out loud for a sec here.",
    "situations": [
      "사고 과정을 공유할 때",
      "침묵 대신 생각을 말할 때"
    ],
    "detail": "think out loud는 머릿속 사고 과정을 입 밖으로 그대로 내보낸다는 뜻으로, 북미 인터뷰 문화에서 거의 필수 스킬이에요. 갑자기 막혔을 때 침묵하는 대신 이 말을 던지고 'option A는 이래서 안 되고, B는...' 하고 중얼거리듯 정리하면, 침묵 10초보다 백배 좋은 인상을 줘요. 주의점은 이 말을 했으면 진짜로 소리 내서 생각해야 한다는 것! 말해놓고 또 조용해지면 더 어색해져요.",
    "exampleKo": "여기서 잠깐 생각을 소리 내서 정리해 볼게요."
  },
  {
    "key": "pp:i-ll-hardcode-this-for-now",
    "en": "I'll hardcode this for now",
    "ko": "일단 이건 하드코딩해 둘게요",
    "example": "I'll hardcode this for now and clean it up later.",
    "situations": [
      "임시 값으로 진행할 때",
      "나중에 고칠 자리표시일 때"
    ],
    "detail": "설정값이나 매직 넘버를 일단 코드에 직접 박아두겠다는 선언이에요. 인터뷰에서 'API URL 같은 건 원래 환경변수로 빼야 하지만 지금은 하드코딩할게요'처럼, 베스트 프랙티스를 알지만 시간상 생략한다는 걸 명시하는 용도로 써요. 'for now'가 핵심이에요. 이게 빠지면 그냥 하드코딩하는 사람으로 보이고, 붙이면 트레이드오프를 아는 사람으로 보여요.",
    "exampleKo": "일단 이건 하드코딩해 두고 나중에 정리할게요."
  },
  {
    "key": "pp:let-me-name-this-better",
    "en": "Let me name this better",
    "ko": "이 변수명 좀 더 낫게 바꿀게요",
    "example": "Let me name this better, 'x' is confusing.",
    "situations": [
      "변수명을 다듬을 때",
      "가독성을 높일 때"
    ],
    "detail": "급하게 x, tmp 같은 이름으로 짰다가 의미 있는 이름으로 바꿀 때 쓰는 말이에요. 인터뷰 막바지에 코드 정리하면서 'x is confusing, let me name this better' 하고 maxSum 같은 이름으로 바꾸면, 가독성을 신경 쓰는 사람이라는 작지만 확실한 가점 포인트가 돼요. rename도 같은 행동이지만, rename은 IDE 기능을 말하는 느낌이고 name this better는 '더 나은 이름을 고민한다'는 의도가 살아 있어요.",
    "exampleKo": "이 변수명 좀 바꿀게요. 'x'는 헷갈리네요."
  },
  {
    "key": "pp:i-think-there-s-an-off-by-one-here",
    "en": "I think there's an off-by-one here",
    "ko": "여기 인덱스가 하나 어긋난 것 같아요",
    "example": "I think there's an off-by-one here in the loop.",
    "situations": [
      "경계 인덱스 버그를 의심할 때",
      "루프 범위를 점검할 때"
    ],
    "detail": "off-by-one은 경계에서 딱 1 어긋나는 버그(<를 <=로 쓰는 류)를 가리키는 고유명사급 용어라, 이 단어를 입에서 바로 꺼내면 경험치가 묻어나요. 루프 돌려보다가 마지막 원소가 빠지거나 한 칸 더 도는 걸 발견했을 때 쓰는 말이에요. 한국어로 '하나 차이 버그'라고 풀어 말할 필요 없이 off-by-one (error) 그대로 쓰는 게 표준이고, 'I think'를 앞에 붙여서 단정 대신 가설로 던지는 톤도 같이 익혀두면 좋아요.",
    "exampleKo": "이 루프에 인덱스가 하나 어긋난 버그(off-by-one)가 있는 것 같아요."
  },
  {
    "key": "pp:let-me-walk-you-through-my-approach",
    "en": "Let me walk you through my approach",
    "ko": "제 접근 방식을 설명드릴게요",
    "example": "Before coding, let me walk you through my approach.",
    "situations": [
      "코딩 전 계획을 공유할 때",
      "전체 흐름을 먼저 설명할 때"
    ],
    "detail": "코딩을 시작하기 전에 전체 계획을 단계별로 설명하겠다는 인터뷰의 정석 오프닝이에요. 문제 이해 → 이 멘트 → 접근법 설명 → 면접관 동의 → 코딩, 이 순서가 북미 인터뷰의 기본 루틴이라 거의 매 라운드 한 번씩은 쓰게 돼요. walk through는 '손잡고 같이 걸으며 보여준다'는 어감이라 explain보다 친절하고 단계적인 느낌이고, 'walk through it'(내가 훑는다)과 달리 'walk you through'는 상대를 데리고 간다는 차이가 있어요.",
    "exampleKo": "코딩하기 전에 제 접근 방식을 먼저 설명드릴게요."
  },
  {
    "key": "pp:bear-with-me-for-a-second",
    "en": "Bear with me for a second",
    "ko": "잠시만 기다려 주세요",
    "example": "Bear with me for a second while I look this up.",
    "situations": [
      "잠깐 멈춰 확인할 때",
      "생각 정리할 시간이 필요할 때"
    ],
    "detail": "'좀 버벅댈 수 있는데 잠깐만 참고 기다려 주세요'라는 뉘앙스로, 문서를 찾아보거나 문법이 가물가물할 때 침묵을 메워주는 표현이에요. 'wait a second'는 명령처럼 들릴 수 있는데 bear with me는 양해를 구하는 공손한 톤이라 인터뷰에서 훨씬 안전해요. 철자 주의: 동물 bear가 아니라 '견디다'라는 동사 bear고, bare with me로 쓰면 완전히 다른(민망한) 뜻이 되니 글로 쓸 때 조심하세요.",
    "exampleKo": "이거 잠깐 찾아볼 동안 조금만 기다려 주세요."
  },
  {
    "key": "pp:let-me-clean-this-up-real-quick",
    "en": "Let me clean this up real quick",
    "ko": "이거 잠깐 빠르게 정리할게요",
    "example": "Let me clean this up real quick before moving on.",
    "situations": [
      "넘어가기 전 코드를 다듬을 때",
      "지저분한 부분을 정돈할 때"
    ],
    "detail": "동작 확인이 끝난 코드에서 죽은 코드, 디버그 출력, 어색한 변수명 같은 걸 빠르게 정리하겠다는 말이에요. real quick은 'very quickly'의 구어체로 '금방 끝나요, 오래 안 걸려요'라는 안심을 같이 줘서, 인터뷰 시간을 의식하고 있다는 시그널도 돼요. refactor와 구분하자면 clean up은 표면적인 정돈(지우기, 이름 바꾸기)이고 refactor는 구조 자체를 바꾸는 거라, 가볍게 다듬을 땐 clean up이 맞는 단어예요.",
    "exampleKo": "넘어가기 전에 이거 잠깐 빠르게 정리할게요."
  },
  {
    "key": "pp:off-the-top-of-my-head-i-d-use-a-heap",
    "en": "Off the top of my head, I'd use a heap",
    "ko": "딱 떠오르는 건, 힙을 쓰는 거예요",
    "example": "Off the top of my head, I'd use a heap here.",
    "situations": [
      "즉흥적으로 아이디어를 낼 때",
      "초기 직관을 말할 때"
    ],
    "detail": "off the top of my head는 '깊이 검토한 건 아니고 즉석에서 떠오르는 대로는'이라는 면책 조항이에요. 면접관이 'top K는 어떻게 풀래요?' 하고 갑자기 물었을 때, 이 말을 앞에 깔고 답하면 틀려도 '즉답이었으니까'라는 여지가 생기고, 맞으면 순발력 점수가 돼요. 핵심은 I'd(I would)와 세트라는 것. '확정적으로 쓰겠다'가 아니라 '쓸 것 같다'는 가정 톤이라 더 자연스러워요.",
    "exampleKo": "딱 떠오르는 걸로는, 여기엔 힙을 쓸 것 같아요."
  },
  {
    "key": "pp:that-should-cover-it",
    "en": "That should cover it",
    "ko": "이거면 다 된 것 같아요",
    "example": "I added the null check, that should cover it.",
    "situations": [
      "케이스를 다 처리했다고 볼 때",
      "마무리됐다고 판단할 때"
    ],
    "detail": "'이 정도면 요구사항/케이스를 다 처리한 것 같다'는 마무리 멘트로, should가 들어가서 100% 단정이 아니라 '아마 충분할 거예요' 정도의 적당한 자신감을 표현해요. 면접관이 지적한 케이스를 고치고 나서, 또는 마지막 엣지 케이스까지 처리한 뒤에 쓰는 말이에요. 'That covers it'이라고 단정형으로 말하면 오히려 빈틈 지적당했을 때 머쓱해지니까, should를 넣은 버전이 인터뷰에선 더 안전하고 자연스러워요.",
    "exampleKo": "널 체크 추가했으니, 이거면 다 커버될 거예요."
  },
  {
    "key": "pp:let-me-double-check-the-edge-cases",
    "en": "Let me double-check the edge cases",
    "ko": "엣지 케이스를 한 번 더 확인할게요",
    "example": "Let me double-check the edge cases, like an empty list.",
    "situations": [
      "빈 입력/경계값을 점검할 때",
      "마지막 검증을 할 때"
    ],
    "detail": "코드를 제출하기 직전, 빈 입력·원소 하나·중복·음수 같은 경계 조건을 한 번 더 점검하겠다는 마무리 루틴 멘트예요. 인터뷰에서 'done'이라고 선언하기 전에 이 말을 하고 실제로 두세 개 케이스를 입으로 짚어보면, 검증 습관이 몸에 밴 엔지니어로 보여요. sanity-check가 '기본적인 게 말이 되나' 수준의 가벼운 점검이라면, double-check는 특정 대상을 꼼꼼히 한 번 더 확인한다는 차이가 있어요.",
    "exampleKo": "빈 리스트 같은 엣지 케이스를 한 번 더 확인해 볼게요."
  }
];

export const CLARIFY_CARDS: PhraseCard[] = [
  {
    "key": "cq:before-i-jump-in-can-i-clarify-the-requi",
    "en": "Before I jump in, can I clarify the requirements?",
    "ko": "시작하기 전에 요구사항을 확인해도 될까요?",
    "example": "Before I jump in, can I clarify the requirements?",
    "situations": [
      "문제 받자마자 바로 코딩하기 전",
      "요구사항이 모호하게 느껴질 때"
    ],
    "detail": "jump in은 '바로 뛰어들다'라는 어감이라, '코딩부터 막 시작하기 전에 잠깐만요'라는 뉘앙스가 살아 있어요. 인터뷰에서 문제를 받자마자 이 한마디를 던지는 게 거의 의식 같은 절차인데, 묻지도 않고 바로 코드부터 짜는 게 북미 인터뷰에서 가장 큰 감점 요인이라서요. 주의할 점은 'Can I ask a question?'처럼 막연하게 묻는 것보다 이렇게 'clarify the requirements'라고 목적을 박아서 말하는 게 훨씬 프로페셔널하게 들린다는 거예요.",
    "exampleKo": "본격적으로 들어가기 전에, 요구사항 몇 가지만 확인해도 될까요?"
  },
  {
    "key": "cq:what-kind-of-scale-are-we-talking-about",
    "en": "What kind of scale are we talking about?",
    "ko": "규모가 어느 정도인가요?",
    "example": "What kind of scale are we talking about here?",
    "situations": [
      "시스템 디자인 시작할 때",
      "입력 크기로 자료구조를 정해야 할 때"
    ],
    "detail": "직역하면 '우리가 얘기하는 규모가 어떤 종류냐'인데, 'are we talking about'이 붙으면 '지금 논의 중인 게 대체 어느 정도 스케일이냐'라는 자연스러운 구어체가 돼요. 시스템 디자인 인터뷰에서 문제 받고 30초 안에 거의 반드시 나오는 첫 질문이에요 — 유저 100명짜리와 1억 명짜리는 설계가 완전히 다르니까요. 'How big is it?'이라고 하면 좀 어린애 같은 느낌이라, 이 표현을 통째로 외워두는 게 좋아요.",
    "exampleKo": "여기서 다루는 규모가 어느 정도라고 보면 될까요?"
  },
  {
    "key": "cq:roughly-how-many-requests-per-second",
    "en": "Roughly how many requests per second?",
    "ko": "대략 초당 요청이 얼마나 되나요?",
    "example": "Roughly how many requests per second should I plan for?",
    "situations": [
      "시스템 용량 산정 전",
      "스케일 가정을 구체화할 때"
    ],
    "detail": "roughly가 핵심이에요 — '정확한 숫자 말고 자릿수만 알려달라'는 신호라서, 면접관도 부담 없이 'a few thousand' 같은 대답을 줄 수 있어요. 스케일 질문에서 한 단계 더 들어가 RPS 같은 구체적 숫자를 캐는 장면, 즉 용량 산정(back-of-envelope) 들어가기 직전에 나와요. approximately라고 해도 되지만 말할 때는 roughly가 훨씬 자연스럽고, 발음도 짧아서 인터뷰에서 덜 버벅거려요.",
    "exampleKo": "대략 초당 요청 몇 건 정도를 기준으로 잡으면 될까요?"
  },
  {
    "key": "cq:can-i-assume-the-input-is-already-sorted",
    "en": "Can I assume the input is already sorted?",
    "ko": "입력이 이미 정렬돼 있다고 가정해도 될까요?",
    "example": "Can I assume the input array is already sorted?",
    "situations": [
      "이분 탐색을 쓸지 정할 때",
      "배열 문제 초반 가정 정리"
    ],
    "detail": "'Can I assume...?'은 '이 가정을 깔고 가도 되냐'고 허락을 구하는 정석 패턴이에요 — 코딩 인터뷰에서 가정을 입 밖으로 내는 것 자체가 점수예요. 정렬 여부에 따라 바이너리 서치냐 해시맵이냐 알고리즘이 갈리니까, 풀이 전략을 정하기 직전에 던지는 질문이죠. 'Is the input sorted?'라고 직설적으로 물어도 되지만, Can I assume 쪽이 '내가 가정을 관리하고 있다'는 인상을 줘서 더 좋게 들려요.",
    "exampleKo": "입력 배열이 이미 정렬되어 있다고 가정해도 될까요?"
  },
  {
    "key": "cq:should-i-handle-the-empty-case",
    "en": "Should I handle the empty case?",
    "ko": "빈 입력도 처리해야 하나요?",
    "example": "Should I handle the empty input case too?",
    "situations": [
      "엣지 케이스 범위 확인할 때",
      "코드 작성 전 경계 조건 정리"
    ],
    "detail": "the empty case라고 하면 빈 배열, 빈 문자열, null 입력 같은 '아무것도 없는 경우' 전반을 가리키는 짧은 표현이에요. 메인 로직 짜기 전에 엣지 케이스 범위를 좁히는 단계에서 나오는데, 이걸 물어보는 것만으로 '엣지 케이스 의식하는 사람'이라는 신호를 줘요. 주의할 점은 면접관이 'good question, yes'라고 하면 진짜로 처리하는 코드를 넣어야 한다는 것 — 물어놓고 까먹으면 오히려 마이너스예요.",
    "exampleKo": "빈 입력이 들어오는 경우도 처리해야 할까요?"
  },
  {
    "key": "cq:are-duplicates-allowed-in-the-input",
    "en": "Are duplicates allowed in the input?",
    "ko": "입력에 중복 값이 있을 수 있나요?",
    "example": "Are duplicates allowed in the input?",
    "situations": [
      "Set을 쓸지 정할 때",
      "중복 처리 로직이 필요한지 확인할 때"
    ],
    "detail": "duplicates는 그냥 '중복 값'이고, allowed를 쓰면 '입력 스펙상 중복이 들어올 수 있냐'는 계약(contract) 확인의 어감이에요. Two Sum 류 문제나 셋(set)을 쓸지 맵을 쓸지 정해야 할 때 거의 반사적으로 나오는 질문이죠 — 중복 허용 여부로 자료구조 선택이 바뀌니까요. 비슷한 표현으로 'Can there be duplicates?'도 똑같이 쓰이는데, 발음이 어려우면 duplicates의 강세가 앞(DU-plicates)에 있다는 것만 기억하세요.",
    "exampleKo": "입력에 중복 값이 포함될 수 있나요?"
  },
  {
    "key": "cq:can-the-values-be-negative",
    "en": "Can the values be negative?",
    "ko": "값이 음수일 수도 있나요?",
    "example": "Can the values be negative, or all positive?",
    "situations": [
      "합/슬라이딩 윈도우 문제 초반",
      "입력 범위를 명확히 할 때"
    ],
    "detail": "짧지만 위력 있는 질문이에요 — 음수가 섞이는 순간 슬라이딩 윈도우 같은 기법이 통하지 않게 되는 등 풀이 전략이 통째로 바뀌거든요(부분합 문제에서 음수 때문에 윈도우 대신 prefix sum + 해시맵으로 가는 게 대표적인 예죠). 배열 문제에서 제약 조건을 훑을 때, '값의 범위가 어떻게 되나'를 묻는 흐름에서 자연스럽게 나와요. 흔한 실수는 'minus value'라고 하는 건데, 영어에서는 negative values가 표준이고 minus는 연산(빼기)을 말할 때 써요.",
    "exampleKo": "값이 음수일 수도 있나요, 아니면 전부 양수인가요?"
  },
  {
    "key": "cq:what-should-i-return-if-there-s-no-valid",
    "en": "What should I return if there's no valid answer?",
    "ko": "유효한 답이 없을 땐 뭘 반환해야 하나요?",
    "example": "What should I return when there's no valid answer?",
    "situations": [
      "답이 없는 케이스 처리 정할 때",
      "반환 규약 합의할 때"
    ],
    "detail": "함수의 실패 케이스 계약을 확정하는 질문이에요 — -1을 줄지, null을 줄지, 빈 배열을 줄지에 따라 코드 끝부분이 달라지니까요. 시그니처를 정하고 코딩 들어가기 직전, '답이 없으면 어떡하죠?'를 짚는 그 타이밍에 나와요. 이걸 안 물어보고 임의로 null을 리턴했다가 면접관이 '-1을 기대했는데요'라고 하면 괜히 흐름이 끊기니까, 미리 못박는 게 안전해요.",
    "exampleKo": "유효한 답이 없을 때는 뭘 반환하면 될까요?"
  },
  {
    "key": "cq:just-to-confirm-we-want-the-longest-one-",
    "en": "Just to confirm, we want the longest one, right?",
    "ko": "확인차, 가장 긴 걸 원하시는 거죠?",
    "example": "Just to confirm, we want the longest substring, right?",
    "situations": [
      "문제 핵심 목표를 재확인할 때",
      "코딩 들어가기 직전 합의"
    ],
    "detail": "Just to confirm은 '내가 맞게 이해했는지 도장만 받겠다'는 가벼운 어감이라, 새 질문이 아니라 재확인이라는 걸 미리 알려줘요. longest냐 shortest냐, 개수냐 길이냐처럼 문제를 잘못 읽으면 통째로 망하는 지점에서 코딩 직전에 던지는 마지막 안전핀이죠. 끝의 right?는 동의를 구하는 부드러운 꼬리표인데, 너무 자주 붙이면 자신 없어 보이니까 진짜 확인이 필요한 한두 번만 쓰세요.",
    "exampleKo": "확인차 여쭤보면, 가장 긴 부분 문자열을 찾으면 되는 거죠?"
  },
  {
    "key": "cq:so-the-goal-is-the-shortest-path-correct",
    "en": "So the goal is the shortest path, correct?",
    "ko": "그러니까 목표는 최단 경로 맞죠?",
    "example": "So the goal is the shortest path, correct?",
    "situations": [
      "문제를 내 말로 다시 정리할 때",
      "그래프 문제 방향 확정"
    ],
    "detail": "문장 앞의 So는 '지금까지 들은 걸 종합하면'이라는 정리의 신호고, 끝의 correct?는 right?보다 살짝 격식 있는 확인 꼬리표예요. 면접관이 문제 설명을 마친 직후, 본인이 이해한 목표를 한 문장으로 되읊어서 도장 받는 장면에서 나와요 — 그래프 문제에서 최단 경로인지 모든 경로인지 갈리면 BFS냐 DFS냐가 바뀌니까요. 'Is the goal...?'로 새로 묻는 것보다 이렇게 평서문+correct? 형태가 '이해했다'는 자신감을 보여줘서 더 좋아요.",
    "exampleKo": "그러니까 목표는 최단 경로를 찾는 거, 맞죠?"
  },
  {
    "key": "cq:let-me-make-sure-i-understand-the-proble",
    "en": "Let me make sure I understand the problem",
    "ko": "문제를 제대로 이해했는지 확인할게요",
    "example": "Let me make sure I understand the problem first.",
    "situations": [
      "설명 듣고 바로 정리하고 싶을 때",
      "오해 없이 출발하고 싶을 때"
    ],
    "detail": "make sure는 '확실히 해두다'라서, 직역하면 '내가 문제를 이해했는지 확실히 하게 해달라' — 즉 시간을 잠깐 가져가겠다는 선언이에요. 문제 설명이 길거나 꼬여 있을 때, 디테일 질문 폭격에 들어가기 전에 이 한 문장으로 운을 떼는 게 자연스러워요. 'I don't understand'라고 하면 못 알아들었다는 고백처럼 들리지만, 이 표현은 '꼼꼼하게 가겠다'는 적극적인 자세로 들린다는 게 결정적 차이예요.",
    "exampleKo": "먼저 제가 문제를 제대로 이해했는지 확인해 볼게요."
  },
  {
    "key": "cq:let-me-restate-the-problem-in-my-own-wor",
    "en": "Let me restate the problem in my own words",
    "ko": "문제를 제 말로 다시 정리해볼게요",
    "example": "Let me restate the problem in my own words.",
    "situations": [
      "이해도를 보여주고 싶을 때",
      "면접관과 인식을 맞출 때"
    ],
    "detail": "in my own words가 포인트예요 — 문제를 앵무새처럼 반복하는 게 아니라 '내 언어로 재구성해서 이해를 증명하겠다'는 거죠. 북미 인터뷰 코칭에서 거의 1단계로 가르치는 표준 동작인데, 문제를 다 들은 직후 요구사항 질문으로 넘어가기 전에 써요. 잘못 이해한 부분이 있으면 면접관이 이 시점에 바로잡아 주니까, 30분 동안 엉뚱한 문제를 푸는 최악의 시나리오를 여기서 차단할 수 있어요.",
    "exampleKo": "문제를 제 표현으로 다시 정리해 보겠습니다."
  },
  {
    "key": "cq:let-me-walk-through-an-example-to-make-s",
    "en": "Let me walk through an example to make sure",
    "ko": "확실히 하려고 예시 하나 짚어볼게요",
    "example": "Let me walk through a quick example to confirm.",
    "situations": [
      "입출력 이해를 점검할 때",
      "로직 시작 전 감 잡을 때"
    ],
    "detail": "walk through는 '한 발씩 같이 걸어가며 본다'는 어감이라, 예시 입력 하나를 손으로 따라가며 입출력을 맞춰보는 동작에 딱 맞아요. 문제를 말로 정리한 다음, '입력이 [1,2,3]이면 출력이 6 맞죠?' 식으로 구체적 예시로 이해를 검증하는 장면에서 나와요. go through도 비슷하지만 walk through가 '단계별로 차근차근'이라는 결이 더 강하고, 인터뷰에서는 walk through 쪽이 압도적으로 많이 들려요.",
    "exampleKo": "확실히 하기 위해 간단한 예시 하나를 짚어볼게요."
  },
  {
    "key": "cq:would-you-like-me-to-optimize-for-time-o",
    "en": "Would you like me to optimize for time or space?",
    "ko": "시간과 공간 중 뭘 우선 최적화할까요?",
    "example": "Should I optimize for time or for space here?",
    "situations": [
      "트레이드오프가 갈릴 때",
      "최적화 방향을 물을 때"
    ],
    "detail": "optimize for X는 'X를 우선순위로 최적화한다'는 정형 표현이고, Would you like me to...는 면접관에게 선택권을 넘기는 공손한 형태예요. 해시맵을 쓰면 빠르지만 메모리를 먹는 식으로 두 갈래 풀이가 보일 때, 어느 쪽을 보여줄지 묻는 장면에서 나와요 — 트레이드오프를 인식하고 있다는 신호 그 자체죠. 주의할 점은 'optimize time'이 아니라 'optimize for time'이라는 것, for가 빠지면 어색하게 들려요.",
    "exampleKo": "시간 쪽으로 최적화할까요, 아니면 공간 쪽으로 할까요?"
  },
  {
    "key": "cq:do-you-want-a-working-solution-first-the",
    "en": "Do you want a working solution first, then optimize?",
    "ko": "일단 동작하는 풀이 먼저 짜고 최적화할까요?",
    "example": "Want me to get it working first, then optimize?",
    "situations": [
      "브루트포스부터 갈지 정할 때",
      "시간 배분 전략을 합의할 때"
    ],
    "detail": "working solution은 '일단 돌아가는 풀이' — 완벽하진 않아도 정답을 내는 코드라는 어감이에요. 최적해가 바로 안 보일 때 '브루트포스 먼저 보여드리고 개선할까요?'라고 전략을 협상하는 질문인데, 대부분의 면접관이 yes라고 해요. 묵묵히 최적해만 고민하다 시간을 다 태우는 것보다 이 질문 하나로 안전망을 까는 게 훨씬 낫고, 실제로 'get it working, then make it fast'는 실무 격언이기도 해요.",
    "exampleKo": "일단 동작하는 풀이부터 만들고, 그다음에 최적화할까요?"
  },
  {
    "key": "cq:should-i-code-it-up-or-just-talk-through",
    "en": "Should I code it up or just talk through it?",
    "ko": "코드로 작성할까요, 말로 설명할까요?",
    "example": "Should I code this up or just talk through it?",
    "situations": [
      "시간이 빠듯할 때",
      "구현 vs 설계 토론 갈림길"
    ],
    "detail": "code it up은 '실제로 코드로 옮기다', talk through는 '코드 없이 말로 풀어 설명하다'라서 이 둘이 깔끔하게 대비돼요. 시스템 디자인이나 후반부 꼬리 질문에서 시간이 애매하게 남았을 때, 면접관이 뭘 기대하는지 확인하는 용도로 써요 — 괜히 코드 다 짰는데 '설명만 원했어요'라고 하면 시간 낭비니까요. talk through it에서 through를 빼고 'talk it'이라고 하면 안 되니 통째로 외우세요.",
    "exampleKo": "이거 코드로 직접 짤까요, 아니면 말로 설명만 할까요?"
  },
  {
    "key": "cq:do-you-want-me-to-handle-concurrency-her",
    "en": "Do you want me to handle concurrency here?",
    "ko": "여기서 동시성까지 고려해야 하나요?",
    "example": "Do you want me to handle concurrency in this?",
    "situations": [
      "멀티스레드 환경이 애매할 때",
      "락/원자성 범위를 정할 때"
    ],
    "detail": "handle concurrency는 '동시성 문제까지 커버하다'라는 뜻으로, 락이나 원자성 같은 걸 설계에 넣을지 묻는 거예요. 카운터 증가, 재고 차감 같은 문제에서 '여러 요청이 동시에 들어오면?'이 떠오르는 순간 던지는 질문인데, 이 질문 자체가 시니어다움을 보여주는 시그널이에요. 다만 단순 알고리즘 문제에서 꺼내면 과한 질문이 되니까, 공유 상태가 실제로 보일 때만 쓰는 게 요령이에요.",
    "exampleKo": "이 부분에서 동시성 처리까지 고려해야 할까요?"
  },
  {
    "key": "cq:should-i-worry-about-thread-safety-for-t",
    "en": "Should I worry about thread safety for this?",
    "ko": "이건 스레드 안전성까지 신경 써야 하나요?",
    "example": "Should I worry about thread safety for this part?",
    "situations": [
      "공유 자원 접근이 있을 때",
      "동시 접근 가정 확인"
    ],
    "detail": "worry about이 들어가면 '이것까지 신경 써야 하는 범위인가요?'라는 캐주얼한 스코프 확인이 돼요 — 진짜 걱정한다는 게 아니라 범위 협상이에요. 캐시나 싱글턴, 공유 자료구조를 설계에 넣은 직후 '이거 멀티스레드 환경인가요?'를 확인하는 장면에서 나와요. 위의 concurrency 질문과 거의 같은 용도인데, thread safety는 '이 객체/자료구조가 안전한가'로 초점이 좀 더 좁다는 차이가 있어요.",
    "exampleKo": "이 부분은 스레드 안전성까지 신경 써야 할까요?"
  },
  {
    "key": "cq:let-me-think-about-this-for-a-second",
    "en": "Let me think about this for a second",
    "ko": "잠깐만 생각 좀 해볼게요",
    "example": "Let me think about this for a second.",
    "situations": [
      "바로 답이 안 떠오를 때",
      "접근법을 고를 시간이 필요할 때"
    ],
    "detail": "for a second는 진짜 1초가 아니라 '잠깐만'이라는 부드러운 시간 요청이에요 — 침묵이 어색해지기 전에 미리 선언하는 거죠. 면접관 질문에 답이 바로 안 나올 때, 그냥 굳어 있으면 막힌 걸로 보이지만 이 한마디를 하면 '생각 중'이라는 상태가 공유돼요. 10초 넘게 조용할 것 같으면 차라리 think out loud로 전환하는 게 좋아요 — 인터뷰에서 긴 침묵은 이 표현으로도 못 덮어요.",
    "exampleKo": "잠깐만 생각할 시간을 좀 가질게요."
  },
  {
    "key": "cq:give-me-a-moment-to-plan-my-approach",
    "en": "Give me a moment to plan my approach",
    "ko": "접근 방식을 정리할 시간을 잠깐 주세요",
    "example": "Give me a moment to plan my approach.",
    "situations": [
      "코딩 전 설계를 정리할 때",
      "성급하게 시작하지 않으려 할 때"
    ],
    "detail": "위의 'for a second'보다 살짝 긴 시간을 요청하는 표현이에요 — moment에 plan이 붙어서 '체계적으로 설계할 테니 기다려달라'는 어감이죠. 시스템 디자인에서 화이트보드 잡기 전, 또는 어려운 코딩 문제에서 전략을 세울 때 30초~1분 정도 침묵을 정당화하는 용도로 써요. 명령문이라 무례할까 걱정될 수 있는데 전혀 그렇지 않고, 표현을 꾸미는 것보다 중요한 건 생각이 끝난 뒤 'Okay, here's my plan'으로 복귀를 확실히 하는 거예요.",
    "exampleKo": "접근 방식을 정리할 시간을 잠시 주세요."
  },
  {
    "key": "cq:to-summarize-my-approach",
    "en": "To summarize my approach",
    "ko": "제 접근 방식을 정리하자면",
    "example": "To summarize my approach, I use a hash map.",
    "situations": [
      "풀이를 마무리 정리할 때",
      "구현 직전 계획을 요약할 때"
    ],
    "detail": "풀이를 마치고 '한 줄 요약'으로 마무리하는 신호탄이에요 — 이 말이 나오면 면접관도 '아, 정리 들어가는구나' 하고 모드를 바꿔요. 코드를 다 짠 후 복잡도 설명으로 넘어가기 직전, 또는 시스템 디자인 마지막 5분에 전체 그림을 다시 묶을 때 쓰는 게 정석이에요. 흩어진 설명을 이 한 문장으로 묶어주면 의사소통 점수가 확 올라가는데, 요약이랍시고 처음부터 다 다시 말하면 역효과니까 진짜 2~3문장으로 끝내세요.",
    "exampleKo": "제 접근 방식을 요약하자면, 해시맵을 사용합니다."
  },
  {
    "key": "cq:if-i-had-more-time-i-d-add-tests-for-the",
    "en": "If I had more time, I'd add tests for the edge cases",
    "ko": "시간이 더 있었다면 엣지 케이스 테스트를 추가했을 거예요",
    "example": "If I had more time, I'd add more edge-case tests.",
    "situations": [
      "시간이 부족하게 끝났을 때",
      "마무리 멘트로 성숙함을 보일 때"
    ],
    "detail": "가정법(If I had..., I'd...)이라서 '시간상 못 했지만 뭘 해야 하는지는 안다'는 메시지를 깔끔하게 전달해요 — 변명이 아니라 인식의 증명이죠. 인터뷰 마지막에 시간이 모자라서 코드가 덜 다듬어졌을 때, 그냥 끝내지 않고 이 한마디로 마무리하는 장면에서 나와요. 가정법 시제를 틀려서 'If I have more time, I will...'이라고 하면 '아직 시간 있는 줄 아나?'처럼 들릴 수 있으니, had + I'd 조합을 입에 붙여두세요.",
    "exampleKo": "시간이 더 있었다면 엣지 케이스 테스트를 더 추가했을 거예요."
  },
  {
    "key": "cq:the-time-complexity-is-o-n-and-space-is-",
    "en": "The time complexity is O(n), and space is O(1)",
    "ko": "시간 복잡도는 O(n), 공간은 O(1)입니다",
    "example": "The time complexity is O(n), space is O(1).",
    "situations": [
      "풀이를 끝내고 복잡도를 밝힐 때",
      "면접관이 복잡도를 물을 때"
    ],
    "detail": "O(n)은 'oh of en', O(1)은 'oh of one'이라고 읽어요 — 'big oh en'처럼 얼버무리면 알아듣긴 해도 어색해요. 코딩 인터뷰에서 풀이를 끝내면 묻기도 전에 이 문장을 먼저 말하는 게 정석이에요. 자주 하는 실수는 time complexity만 말하고 space를 빼먹는 건데, 면접관이 'and space?'라고 되묻게 만들지 말고 항상 세트로 말하는 습관을 들이세요.",
    "exampleKo": "시간 복잡도는 O(n)이고, 공간 복잡도는 O(1)입니다."
  },
  {
    "key": "cq:one-trade-off-here-is-we-use-extra-memor",
    "en": "One trade-off here is we use extra memory for speed",
    "ko": "트레이드오프는 속도를 위해 메모리를 더 쓴다는 점이에요",
    "example": "One trade-off: we trade memory for speed here.",
    "situations": [
      "설계 선택을 변호할 때",
      "최적화 결정을 정당화할 때"
    ],
    "detail": "extra memory for speed의 for가 핵심이에요 — '속도를 얻는 대가로 메모리를 내준다'는 교환의 어감을 이 전치사 하나가 담고 있죠. 해시맵으로 O(n²)을 O(n)으로 줄인 직후처럼, 내 선택의 비용을 스스로 짚어주는 장면에서 나와요 — 면접관이 지적하기 전에 먼저 말하면 점수가 달라요. One trade-off로 시작하면 '여러 트레이드오프 중 하나를 꼽자면'이라는 여운이 남아서, 면접관이 'any others?'라고 물어와도 자연스럽게 이어갈 수 있어요.",
    "exampleKo": "여기서 한 가지 트레이드오프는 속도를 위해 메모리를 더 쓴다는 거예요."
  }
];

export const CONNECTORS: Connector[] = [
  {
    "key": "co:first",
    "en": "first",
    "ko": "먼저, 우선",
    "fn": "sequence",
    "example": "First, I'd parse the input. Then I'd validate it.",
    "detail": "뭔가 순서대로 설명을 시작할 때 던지는 첫 신호탄이에요. 코딩 인터뷰에서 \"접근 방법부터 말해볼게요\" 하고 단계를 펼칠 때 거의 반사적으로 나오는 말이죠. 주의할 점은 'First'로 시작했으면 뒤에 'Then'이나 'Next'가 따라와야 자연스럽다는 것 — 'First'만 던지고 다음 단계 없이 끝나면 듣는 사람이 어색해해요. 'Firstly'는 좀 격식체라 말할 땐 그냥 'First'가 훨씬 자연스러워요.",
    "exampleKo": "먼저 입력을 파싱하고요. 그다음에 검증할 거예요."
  },
  {
    "key": "co:then",
    "en": "then",
    "ko": "그다음",
    "fn": "sequence",
    "example": "I check the cache. Then I hit the DB if it misses.",
    "detail": "단계 사이를 잇는 가장 가벼운 접착제예요. 코드 워크스루나 시스템 플로우 설명할 때 \"A 하고, 그다음 B\" 식으로 거의 무한 반복해서 쓰게 되죠. 다만 모든 문장을 'Then'으로만 이으면 단조롭게 들리니까 'After that', 'From there' 같은 걸 섞어주는 게 좋아요. 'and then'으로 붙여 쓰면 더 구어체 느낌이 나요.",
    "exampleKo": "캐시를 먼저 확인하고요. 미스 나면 그때 DB를 칩니다."
  },
  {
    "key": "co:after-that",
    "en": "after that",
    "ko": "그러고 나서",
    "fn": "sequence",
    "example": "We write the test. After that, we make it pass.",
    "detail": "'Then'보다 한 박자 여유 있는 느낌의 \"그러고 나서\"예요. 앞 단계가 확실히 끝난 다음에 다음 단계로 넘어간다는 순차성이 좀 더 또렷하게 느껴지죠. TDD 사이클이나 배포 파이프라인처럼 단계가 명확히 구분되는 프로세스를 설명할 때 잘 어울려요. 'Then'만 연발하다가 중간에 한 번씩 끼워주면 말의 리듬이 살아납니다.",
    "exampleKo": "테스트를 먼저 작성하고요. 그러고 나서 그 테스트를 통과시킵니다."
  },
  {
    "key": "co:next",
    "en": "next",
    "ko": "다음으로",
    "fn": "sequence",
    "example": "We index the table. Next, we benchmark the query.",
    "detail": "발표하듯 단계를 짚어갈 때 쓰는 \"다음으로\"인데, 'Then'보다 살짝 더 구조적인 느낌이 있어요. 시스템 디자인 인터뷰에서 \"DB 얘기 끝났으니 다음은 캐싱 레이어\" 하고 토픽을 전환할 때 딱이죠. 'Then'은 같은 흐름 안의 다음 동작, 'Next'는 다음 항목/챕터로 넘어가는 느낌이라는 미묘한 차이가 있어요.",
    "exampleKo": "테이블에 인덱스를 걸고요. 다음으로 쿼리 벤치마크를 돌립니다."
  },
  {
    "key": "co:once-that-s-done",
    "en": "once that's done",
    "ko": "그게 끝나면",
    "fn": "sequence",
    "example": "We deploy to staging. Once that's done, we run smoke tests.",
    "detail": "\"그 작업이 완료되면\"이라는 선행 조건을 콕 짚어주는 표현이에요. 단순한 'Then'과 달리 \"앞 단계가 끝나야만 다음이 가능하다\"는 의존 관계를 강조하죠. 배포 플로우 설명에서 \"스테이징 배포 끝나면 그때 스모크 테스트\" 같은 게이트 구조를 말할 때 자연스럽게 나옵니다. 'Once' 뒤에 미래 일인데도 현재형('once that's done', 'once it lands')을 쓴다는 게 한국인이 자주 틀리는 포인트예요 — 'once that will be done'은 틀린 표현입니다.",
    "exampleKo": "스테이징에 배포하고요. 그게 끝나면 스모크 테스트를 돌립니다."
  },
  {
    "key": "co:from-there",
    "en": "from there",
    "ko": "거기서부터",
    "fn": "sequence",
    "example": "We get the IDs first. From there, we batch the lookups.",
    "detail": "직역하면 \"거기서부터\"인데, 앞 단계의 결과물을 발판 삼아 다음으로 나아간다는 어감이에요. 그냥 시간 순서가 아니라 \"앞에서 얻은 걸 가지고\"라는 연결고리가 느껴지죠. 인터뷰에서 \"일단 ID 목록을 확보하고, 거기서부터 배치 조회를 돌린다\"처럼 앞 결과가 다음 입력이 되는 흐름에 딱입니다. 'Then'보다 말이 매끄럽고 사고가 이어지는 느낌을 줘서 시니어스러운 표현이에요.",
    "exampleKo": "먼저 ID들을 가져오고요. 거기서부터 조회를 배치로 묶어서 처리합니다."
  },
  {
    "key": "co:meanwhile",
    "en": "meanwhile",
    "ko": "그동안에",
    "fn": "sequence",
    "example": "The worker drains the queue. Meanwhile, the API stays up.",
    "detail": "두 가지 일이 동시에 굴러간다는 걸 표현하는 \"그동안에\"예요. 비동기 처리나 백그라운드 작업 설명에서 \"워커가 큐를 비우는 동안 API는 계속 살아있다\"처럼 병렬성을 강조할 때 나오죠. 순차 진행인 'Then'과 헷갈리면 안 돼요 — 'Meanwhile'은 시간이 겹친다는 뜻이라, 순서대로 일어나는 일에 쓰면 의미가 꼬입니다. 비동기 아키텍처의 장점을 어필할 때 은근히 효과적인 단어예요.",
    "exampleKo": "워커가 큐를 비우고요. 그동안 API는 계속 떠 있습니다."
  },
  {
    "key": "co:finally",
    "en": "finally",
    "ko": "마지막으로",
    "fn": "sequence",
    "example": "We retry on failure. Finally, we send to a dead letter queue.",
    "detail": "단계 나열의 마지막을 알리는 \"마지막으로\"예요. 'First... Then... Finally...' 3단 구조로 말하면 듣는 사람이 따라오기 쉬워서 인터뷰 답변 구조화에 핵심이죠. 한국어의 \"드디어!\"(Finally it works!) 의미로도 쓰이니까 맥락 구분이 필요해요 — 마지막 단계를 소개하는 문장 맨 앞에 오면 \"마지막으로\", 감탄으로 쓰면 \"드디어\"입니다. 마지막 단계 신호를 줘야 면접관이 \"답변이 끝나가는구나\" 하고 알 수 있어요.",
    "exampleKo": "실패하면 재시도하고요. 마지막엔 데드 레터 큐로 보냅니다."
  },
  {
    "key": "co:so",
    "en": "so",
    "ko": "그래서",
    "fn": "cause",
    "example": "The list is sorted. So I'd use binary search.",
    "detail": "원어민 엔지니어가 아마 제일 많이 쓰는 단어일 거예요. \"앞의 사실 때문에 → 이 결론\"이라는 인과를 가장 가볍게 잇죠. 인터뷰에서 \"정렬돼 있네요. 그럼 이진 탐색이죠\"처럼 관찰→결정으로 넘어갈 때 필수입니다. 다만 문장 시작마다 습관적으로 'So...'를 붙이는 건 filler가 돼서 오히려 자신 없어 보일 수 있으니, 진짜 인과관계가 있을 때 쓰는 게 좋아요.",
    "exampleKo": "리스트가 정렬돼 있네요. 그러니까 이진 탐색을 쓰겠습니다."
  },
  {
    "key": "co:because",
    "en": "because",
    "ko": "왜냐하면",
    "fn": "cause",
    "example": "I'd cache this. Because the reads dominate here.",
    "detail": "결정의 이유를 대는 가장 직접적인 단어예요. 인터뷰에서는 결정만 말하고 끝내면 점수를 못 받아요 — \"캐싱하겠습니다. 읽기가 압도적이라서요\"처럼 'because'로 근거를 붙이는 습관이 평가를 가릅니다. 학교에서는 'Because'로 문장을 시작하면 안 된다고 배우지만, 말할 때는 예문처럼 결정 먼저 던지고 'Because...'로 이유를 따로 붙이는 게 아주 자연스러워요.",
    "exampleKo": "이건 캐싱하겠습니다. 여기선 읽기가 압도적으로 많거든요."
  },
  {
    "key": "co:since",
    "en": "since",
    "ko": "~이니까",
    "fn": "cause",
    "example": "Since the data fits in memory, I'd skip the DB.",
    "detail": "'Because'와 거의 같지만 \"~이니까\"처럼 이미 둘 다 아는 전제를 깔고 가는 어감이에요. 문장 맨 앞에 와서 \"데이터가 메모리에 다 들어가니까, DB는 건너뛰겠습니다\"처럼 가정→결정 구조를 만들 때 특히 좋죠. 'Because'는 새로운 이유를 제시하는 느낌, 'Since'는 \"아시다시피 ~이니\" 느낌이라는 미묘한 차이가 있어요. 시간 의미(\"~이후로\")로도 쓰이니 맥락으로 구분하세요.",
    "exampleKo": "데이터가 메모리에 다 들어가니까, DB는 건너뛰겠습니다."
  },
  {
    "key": "co:that-s-why",
    "en": "that's why",
    "ko": "그래서 ~한 거예요",
    "fn": "cause",
    "example": "Writes are rare. That's why I optimized for reads.",
    "detail": "이유를 먼저 깔고 \"그래서 그렇게 한 거예요\" 하고 결정을 정당화하는 표현이에요. 'because'가 결정→이유 순서라면 'that's why'는 이유→결정 순서라 논리 전개 방향이 반대죠. 면접관이 \"왜 이렇게 설계했어요?\" 하고 찌를 때 \"쓰기가 드물거든요. 그래서 읽기에 최적화한 겁니다\" 하고 받아치는 장면에서 빛납니다. 과거 결정을 설명하는 뉘앙스가 있어서 이미 내린 선택을 변호할 때 특히 자연스러워요.",
    "exampleKo": "쓰기는 드물거든요. 그래서 읽기에 최적화한 겁니다."
  },
  {
    "key": "co:which-means",
    "en": "which means",
    "ko": "그러니까, 즉",
    "fn": "cause",
    "example": "It's idempotent. Which means retries are safe.",
    "detail": "기술적 사실을 던진 다음 \"그게 실제로 의미하는 바는\" 하고 함의를 풀어주는 다리예요. \"멱등하니까, 즉 재시도가 안전하다는 거죠\"처럼 속성→실용적 결과로 번역해주는 거라, 면접관에게 \"이 사람은 개념의 의미까지 이해하고 있구나\"를 보여주는 데 최고입니다. 예문처럼 문장을 끊고 'Which means...'로 시작하는 건 문법적으론 fragment지만 구어에선 완전히 자연스러워요. 'in other words'(같은 말 바꿔 말하기)와 달리 이건 논리적 귀결을 끌어내는 표현이에요.",
    "exampleKo": "멱등하거든요. 그 말은 재시도해도 안전하다는 거죠."
  },
  {
    "key": "co:this-lets-us",
    "en": "this lets us",
    "ko": "이걸로 ~할 수 있어요",
    "fn": "cause",
    "example": "We split them with a queue. This lets us scale each side.",
    "detail": "설계 결정이 \"어떤 능력을 열어주는지\"를 말하는 표현이에요. 직역하면 \"이게 우리를 ~하게 해준다\"인데, 한국어로는 \"이 덕분에 ~할 수 있다\"가 자연스럽죠. 시스템 디자인에서 \"큐로 분리했고, 덕분에 양쪽을 따로 스케일할 수 있다\"처럼 결정→이득 구조로 말할 때 핵심입니다. 'allows us to'보다 짧고 구어적이라 말할 땐 이쪽이 더 잘 나와요. 'lets us' 뒤에는 to 없이 동사 원형이 바로 온다는 것(let us to scale ❌)도 한국인이 자주 틀리는 부분이에요.",
    "exampleKo": "큐로 양쪽을 분리했어요. 덕분에 각각 따로 스케일할 수 있죠."
  },
  {
    "key": "co:but",
    "en": "but",
    "ko": "하지만",
    "fn": "contrast",
    "example": "That works. But it doesn't scale past one node.",
    "detail": "가장 기본적인 반전 접속사인데, 인터뷰에서는 \"동작은 하지만 한계가 있다\"는 트레이드오프 사고를 보여주는 출발점이에요. \"그 방법도 돼요. 근데 노드 하나 넘어가면 못 버텨요\"처럼 단순 해법의 한계를 스스로 짚을 때 나오죠. 'But'을 너무 연발하면 부정적으로 들릴 수 있으니, 상대 의견을 반박할 땐 'That said'나 'On the other hand'로 부드럽게 가는 것도 방법이에요.",
    "exampleKo": "그것도 동작은 해요. 근데 노드 하나를 넘어가면 스케일이 안 돼요."
  },
  {
    "key": "co:that-said",
    "en": "that said",
    "ko": "그렇긴 한데",
    "fn": "contrast",
    "example": "It's slower. That said, it's way simpler to reason about.",
    "detail": "\"방금 한 말은 인정하는데, 그래도\" 하고 부드럽게 방향을 트는 표현이에요. 'But'보다 세련되고, 앞 내용을 깎아내리지 않으면서 반대 측면을 더하는 느낌이죠. \"느리긴 해요. 그렇긴 한데 추론하기는 훨씬 쉽거든요\"처럼 단점 인정 후 장점으로 균형 잡을 때 딱입니다. 'Having said that'도 같은 뜻인데 'That said'가 더 짧고 구어적이에요. 양면을 다 보고 있다는 인상을 줘서 시니어 면접에서 특히 점수가 되는 표현입니다.",
    "exampleKo": "더 느리긴 해요. 그렇긴 한데 추론하기는 훨씬 단순하거든요."
  },
  {
    "key": "co:on-the-other-hand",
    "en": "on the other hand",
    "ko": "반면에",
    "fn": "contrast",
    "example": "A queue adds latency. On the other hand, it smooths out spikes.",
    "detail": "동전의 양면을 대놓고 펼쳐 보이는 \"반면에\"예요. 'But'이 그냥 반전이라면 이건 \"한쪽 면 봤으니 이제 반대쪽 면\"이라는 균형 잡힌 비교 구조를 만들죠. 시스템 디자인에서 \"큐는 지연을 더하지만, 반면에 스파이크를 완만하게 해준다\"처럼 비용과 이득을 나란히 놓을 때 정석입니다. 원래는 'On one hand... on the other hand...' 쌍인데, 말할 땐 뒷부분만 단독으로 써도 전혀 어색하지 않아요.",
    "exampleKo": "큐는 지연을 더해요. 반면에 트래픽 스파이크를 완만하게 잡아주죠."
  },
  {
    "key": "co:the-tradeoff-is",
    "en": "the tradeoff is",
    "ko": "트레이드오프는",
    "fn": "contrast",
    "example": "Caching is fast. The tradeoff is stale data.",
    "detail": "시스템 디자인 인터뷰의 핵심 단어를 그대로 박은 표현이에요. \"이 이득을 얻는 대신 치르는 비용은 이것\"이라는 구조를 한 방에 만들어주죠. \"캐싱은 빠르다, 트레이드오프는 stale 데이터\"처럼 장점 말한 직후에 비용을 스스로 짚으면 면접관이 굳이 안 물어봐도 돼서 평가가 올라갑니다. 'The catch is'(숨은 함정)보다 중립적이고 분석적인 어감이라, 공학적 판단을 보여줄 땐 이쪽이 더 격에 맞아요.",
    "exampleKo": "캐싱은 빠르죠. 트레이드오프는 데이터가 최신이 아닐 수 있다는 거예요."
  },
  {
    "key": "co:the-catch-is",
    "en": "the catch is",
    "ko": "문제는, 단점은",
    "fn": "contrast",
    "example": "We can denormalize this. The catch is keeping it in sync.",
    "detail": "\"근데 함정이 하나 있는데\" 하는 느낌의 구어체 표현이에요. 'The tradeoff is'보다 캐주얼하고, 겉보기엔 좋아 보이는 방안에 숨은 비용이 있다는 어감이 강하죠. \"비정규화하면 되긴 하는데, 문제는 동기화 유지예요\"처럼 솔깃한 해법의 뒷면을 까 보일 때 자연스럽게 나옵니다. 너무 좋은 제안을 들었을 때 되묻는 \"What's the catch?\"(조건이 뭔데요?)와 같은 뿌리니 세트로 외워두면 좋아요. 격식 있는 자리보다는 동료 간 대화나 캐주얼한 인터뷰 톤에 어울립니다.",
    "exampleKo": "이건 비정규화하면 돼요. 문제는 그걸 계속 동기화 상태로 유지하는 거죠."
  },
  {
    "key": "co:still",
    "en": "still",
    "ko": "그래도",
    "fn": "contrast",
    "example": "It's an edge case. Still, I want to handle it cleanly.",
    "detail": "반대 근거를 인정하고도 \"그래도\" 하고 자기 입장을 유지하는 단어예요. \"엣지 케이스이긴 하죠. 그래도 깔끔하게 처리하고 싶어요\"처럼, 중요도가 낮다는 걸 알면서도 챙기겠다는 엔지니어링 양심(?)을 보여줄 때 나옵니다. 'But'이 방향 전환이라면 'Still'은 \"그럼에도 불구하고 버틴다\"는 고집의 어감이에요. 시간 의미의 still(\"아직도\")과 헷갈리지 않게, 문장 맨 앞 + 쉼표 형태로 쓰면 양보의 의미가 분명해져요.",
    "exampleKo": "엣지 케이스이긴 해요. 그래도 깔끔하게 처리해두고 싶어요."
  },
  {
    "key": "co:specifically",
    "en": "specifically",
    "ko": "구체적으로는",
    "fn": "elaborate",
    "example": "There's an edge case. Specifically, the empty input.",
    "detail": "추상적으로 던진 말을 \"구체적으로는 이것\" 하고 좁혀주는 줌인 렌즈예요. \"엣지 케이스가 있어요. 구체적으로는 빈 입력이요\"처럼 일반론→실제 사례로 내려갈 때 쓰죠. 인터뷰에서 두루뭉술하게 말하면 깊이가 없어 보이는데, 'Specifically'로 콕 짚어주면 디테일을 챙기는 사람으로 보입니다. 'For example'은 여러 사례 중 하나를 드는 거고, 'Specifically'는 바로 그 대상을 정확히 지목하는 거라는 차이가 있어요.",
    "exampleKo": "엣지 케이스가 하나 있어요. 구체적으로는 빈 입력이요."
  },
  {
    "key": "co:in-other-words",
    "en": "in other words",
    "ko": "다시 말해",
    "fn": "elaborate",
    "example": "It's O(n log n). In other words, it scales fine.",
    "detail": "방금 한 말을 다른 각도로 다시 말해주는 \"다시 말해\"예요. 기술 용어로 말한 걸 실용적인 언어로 번역할 때 특히 유용하죠 — \"O(n log n)이에요. 다시 말해 스케일 걱정 없다는 거죠\"처럼요. 면접관이나 비기술 청중이 못 따라온 것 같을 때 구원투수로 쓰면 커뮤니케이션 능력 어필이 됩니다. 'Which means'는 논리적 귀결을 끌어내는 거고, 이건 같은 내용의 재표현이라는 게 미묘한 차이예요.",
    "exampleKo": "O(n log n)이에요. 다시 말해 스케일은 충분히 잘 된다는 거죠."
  },
  {
    "key": "co:what-i-mean-is",
    "en": "what I mean is",
    "ko": "제 말은",
    "fn": "elaborate",
    "example": "We need it atomic. What I mean is, all or nothing.",
    "detail": "방금 한 말이 모호했다 싶을 때 \"제 말은요\" 하고 스스로 풀어주는 표현이에요. \"원자적이어야 해요. 제 말은, 전부 되거나 전부 안 되거나요\"처럼 용어를 쉬운 말로 풀어줄 때 나오죠. 면접관 표정이 갸우뚱할 때 이걸로 자연스럽게 재설명하면 당황한 티 없이 넘어갈 수 있어요. 비슷한 'I mean'은 거의 filler 수준으로 가볍게 쓰이는 반면, 'What I mean is'는 \"진짜 의도를 풀어서 말하겠다\"는 의식적인 명료화라는 차이가 있습니다.",
    "exampleKo": "원자적이어야 해요. 제 말은, 전부 되거나 아예 안 되거나여야 한다는 거죠."
  },
  {
    "key": "co:basically",
    "en": "basically",
    "ko": "기본적으로",
    "fn": "elaborate",
    "example": "It's a lookup table. Basically, key maps to value.",
    "detail": "복잡한 걸 한 꺼풀 벗겨서 \"본질만 말하면\" 하고 단순화하는 단어예요. \"룩업 테이블이에요. 그러니까 키가 값에 매핑되는 거죠\"처럼 핵심 구조를 한 줄로 압축할 때 나옵니다. 한국어 \"기본적으로\"보다는 \"쉽게 말하면/그러니까 요는\"에 가까운 어감이에요. 주의할 점은 남용 — 문장마다 'basically'를 붙이는 건 원어민도 지적받는 말버릇이라, 진짜 단순화가 일어나는 순간에만 쓰는 게 좋아요.",
    "exampleKo": "룩업 테이블이에요. 쉽게 말하면 키가 값으로 매핑되는 거죠."
  },
  {
    "key": "co:for-example",
    "en": "for example",
    "ko": "예를 들어",
    "fn": "elaborate",
    "example": "Some inputs break it. For example, a negative number.",
    "detail": "추상적 주장에 구체적 사례를 붙여주는 정석 표현이에요. \"어떤 입력은 이걸 깨뜨려요. 예를 들어 음수요\"처럼 일반론을 말한 직후 실례 하나를 던지면 설득력이 확 올라가죠. 인터뷰에서 엣지 케이스를 논할 때 거의 반드시 나오는 패턴입니다. 글에선 'e.g.'로 줄이지만 말할 땐 'for example'이나 더 캐주얼한 'like'를 쓰고, 'e.g.'를 발음하는(\"ee-gee\") 건 어색하니 피하세요.",
    "exampleKo": "어떤 입력은 이걸 깨뜨려요. 예를 들면 음수 같은 거요."
  },
  {
    "key": "co:like",
    "en": "like",
    "ko": "~같은",
    "fn": "elaborate",
    "example": "We hit limits at scale. Like, millions of rows.",
    "detail": "예시나 대략적 수치를 던질 때 쓰는 초캐주얼한 \"예를 들면/한 ~정도\"예요. \"스케일에서 한계에 부딪혀요. 그러니까 뭐, 수백만 행쯤요\"처럼 감을 잡아주는 용도로 회화에서 정말 많이 나오죠. 'for example'보다 훨씬 가볍고 즉흥적인 느낌입니다. 다만 'like'는 북미 구어에서 filler로도 남발되는 단어라, 너무 자주 끼워 넣으면 다소 가벼워 보일 수 있어요 — 수치나 예시 앞에서만 의도적으로 쓰는 게 안전합니다.",
    "exampleKo": "스케일이 커지면 한계에 부딪혀요. 뭐, 수백만 행 정도 되면요."
  },
  {
    "key": "co:to-be-clear",
    "en": "to be clear",
    "ko": "분명히 하자면",
    "fn": "elaborate",
    "example": "To be clear, I'm assuming a single region here.",
    "detail": "오해의 여지를 미리 차단하는 \"분명히 해두자면\"이에요. 시스템 디자인에서 \"분명히 해두자면, 여기선 단일 리전을 가정하고 있어요\"처럼 자기 가정을 명시할 때 정말 중요한 표현이죠 — 가정을 안 밝히고 진행하면 면접관과 다른 그림을 그리다 어긋날 수 있거든요. 'Just to be clear'로 시작하면 더 부드럽습니다. 'To clarify'는 이미 생긴 오해를 푸는 쪽이고, 'To be clear'는 오해가 생기기 전에 선을 긋는 쪽이라는 차이가 있어요.",
    "exampleKo": "분명히 해두자면, 여기서는 단일 리전을 가정하고 있어요."
  },
  {
    "key": "co:also",
    "en": "also",
    "ko": "또한",
    "fn": "add",
    "example": "I'd validate the input. Also, I'd log the request.",
    "detail": "포인트 하나 말한 뒤 \"하나 더 있어요\" 하고 추가하는 가장 기본적인 연결어예요. \"입력 검증할 거고요. 또 요청 로깅도 할 거예요\"처럼 체크리스트를 늘려갈 때 나오죠. 문장 맨 앞에 'Also,'로 시작하는 게 구어에선 아주 자연스럽습니다. 'too'는 문장 끝에 붙는다는 위치 차이가 있고, 격식 문서에서 보이는 'Additionally'는 말할 때 쓰면 좀 딱딱하게 들려요.",
    "exampleKo": "입력을 검증할 거고요. 그리고 요청도 로깅할 거예요."
  },
  {
    "key": "co:on-top-of-that",
    "en": "on top of that",
    "ko": "게다가",
    "fn": "add",
    "example": "It's faster. On top of that, it uses less memory.",
    "detail": "직역하면 \"그 위에 얹어서\"인데, 이미 말한 것 위에 한 층 더 쌓아 누적을 강조하는 어감이에요. \"더 빨라요. 게다가 메모리도 덜 써요\"처럼 'Also'보다 임팩트 있게 장점을 포개죠. 자기가 고른 방안의 장점을 어필하는 마무리 한 방으로 좋습니다. 장점 전용은 아니에요 — \"빌드가 느린데, 게다가 간헐적으로 깨지기까지 해요\"처럼 단점을 쌓을 때도 그대로 쓰입니다. 핵심은 좋든 나쁘든 같은 방향으로 \"한 술 더 뜬다\"는 누적 강조라는 점이에요.",
    "exampleKo": "더 빠르고요. 게다가 메모리도 덜 씁니다."
  },
  {
    "key": "co:plus",
    "en": "plus",
    "ko": "그리고, 거기다",
    "fn": "add",
    "example": "It handles nulls. Plus, it's thread safe.",
    "detail": "'Also'의 더 캐주얼한 사촌으로, \"거기다\" 하고 가볍게 장점을 얹는 느낌이에요. \"null도 처리해요. 거기다 스레드 세이프하고요\"처럼 셀링 포인트를 툭툭 추가할 때 나오죠. 수학 기호 plus에서 온 거라 \"+1 얹는\" 직역 느낌이 그대로 통합니다. 'On top of that'보다도 짧고 일상적이라 동료 간 대화 톤에 딱이지만, 아주 격식 있는 발표에서는 'Additionally'나 'Moreover' 쪽이 안전해요.",
    "exampleKo": "null도 처리해요. 거기다 스레드 세이프하기까지 하고요."
  },
  {
    "key": "co:another-thing",
    "en": "another thing",
    "ko": "또 한 가지",
    "fn": "add",
    "example": "We need retries. Another thing, we need a timeout.",
    "detail": "말하다가 \"아, 그리고 하나 더\" 하고 생각난 포인트를 얹는 진짜 구어체 표현이에요. 예문처럼 'Another thing,' 하고 끊어 던지는 건 문법책엔 없지만 실제 회의에선 늘 나오는 패턴이죠. 요구사항이나 고려사항을 나열하다 \"재시도 필요하고요. 하나 더, 타임아웃도 필요해요\" 하는 장면 그대로입니다. 'Another thing is that...'으로 풀면 좀 더 정돈된 문장이 되고요. 즉흥적인 느낌이 강해서, 준비된 발표보다는 토론·브레인스토밍 톤에 어울려요.",
    "exampleKo": "재시도가 필요하고요. 하나 더, 타임아웃도 필요해요."
  },
  {
    "key": "co:and",
    "en": "and",
    "ko": "그리고",
    "fn": "add",
    "example": "I'd add an index. And I'd cache the hot keys.",
    "detail": "설명이 필요 없어 보이는 'and'지만, 예문처럼 문장을 끊고 'And I'd...'로 새로 시작하는 게 핵심 포인트예요. 학교에선 'And'로 문장을 시작하지 말라고 배우지만, 말할 때는 \"인덱스 추가할 거고요. 그리고 핫 키는 캐싱할 거예요\"처럼 끊어 말하는 게 오히려 듣기 편하고 자연스럽습니다. 긴 한 문장에 and를 줄줄이 이어붙이는 것보다 짧게 끊고 'And'로 잇는 게 인터뷰에서 전달력이 훨씬 좋아요.",
    "exampleKo": "인덱스를 추가할 거고요. 그리고 핫 키들은 캐싱하겠습니다."
  },
  {
    "key": "co:so-basically",
    "en": "so basically",
    "ko": "그러니까 요약하면",
    "fn": "conclude",
    "example": "We trade memory for speed. So basically, it's a cache.",
    "detail": "길게 설명한 걸 \"그러니까 한마디로\" 하고 압축하는 콤보 표현이에요. 'so'(그래서)와 'basically'(본질만 말하면)가 합쳐져서, 디테일을 다 펼친 뒤 핵심 한 줄로 착지할 때 쓰죠. \"메모리를 속도와 맞바꾸는 거죠. 그러니까 결국 캐시예요\"처럼 복잡한 메커니즘을 익숙한 개념으로 매핑해주면 면접관이 \"아, 이해했구나\" 하고 안심합니다. 다만 설명 시작부터 'So basically...'로 여는 건 filler처럼 들리니, 요약 착지 용도로 아껴 쓰는 게 좋아요.",
    "exampleKo": "메모리를 내주고 속도를 얻는 거죠. 그러니까 결국 캐시예요."
  },
  {
    "key": "co:the-bottom-line-is",
    "en": "the bottom line is",
    "ko": "결론은",
    "fn": "conclude",
    "example": "Both work. The bottom line is, I'd pick the simpler one.",
    "detail": "재무제표 맨 아랫줄(최종 손익)에서 온 표현으로, \"이것저것 다 따져도 결론은 이것\"이라는 어감이에요. \"둘 다 돼요. 결론은, 저라면 더 단순한 쪽을 고르겠습니다\"처럼 비교 분석 끝에 최종 입장을 박을 때 쓰죠. 인터뷰에서 트레이드오프만 나열하고 결정을 안 내리면 우유부단해 보이는데, 이 표현으로 명확히 착지하면 결단력이 보입니다. 'To sum up'이 내용 요약이라면 이건 \"핵심 판단/결론\"을 던지는 거라는 차이가 있어요.",
    "exampleKo": "둘 다 동작해요. 결론은, 저라면 더 단순한 쪽을 고르겠다는 겁니다."
  },
  {
    "key": "co:to-sum-up",
    "en": "to sum up",
    "ko": "정리하자면",
    "fn": "conclude",
    "example": "To sum up, hash map for lookups, sorted for ranges.",
    "detail": "긴 답변을 마무리하며 \"정리하자면\" 하고 핵심을 다시 묶어주는 표현이에요. \"정리하면, 룩업은 해시맵, 범위 조회는 정렬\"처럼 앞에서 펼친 내용을 한두 줄로 압축하면 면접관 머릿속에 답이 깔끔하게 남죠. 답이 길어졌다 싶을 때 이걸로 닫아주면 구조적으로 사고하는 사람이라는 인상을 줍니다. 'In summary'는 좀 더 문어체/발표체고, 말할 땐 'To sum up'이나 'So to sum up'이 자연스러워요.",
    "exampleKo": "정리하자면, 룩업에는 해시맵, 범위 조회에는 정렬된 구조를 씁니다."
  },
  {
    "key": "co:at-the-end-of-the-day",
    "en": "at the end of the day",
    "ko": "결국 중요한 건",
    "fn": "conclude",
    "example": "At the end of the day, correctness comes first.",
    "detail": "직역하면 \"하루가 끝날 때\"지만 실제로는 \"이러쿵저러쿵해도 결국 중요한 건\"이라는 관용구예요. \"결국 중요한 건 정확성이 우선이라는 거죠\"처럼 세부 논쟁을 다 걷어내고 근본 원칙으로 회귀할 때 쓰죠. 트레이드오프 토론이 길어진 뒤 우선순위 하나를 딱 세우는 마무리 멘트로 좋습니다. 다만 북미에서 다소 닳은 클리셰 취급도 받는 표현이라 한 인터뷰에서 한 번 정도만 쓰는 게 좋고, 시간 표현(\"하루 끝에\")으로 오해하면 안 돼요.",
    "exampleKo": "결국 중요한 건, 정확성이 최우선이라는 거예요."
  },
  {
    "key": "co:so-my-answer-is",
    "en": "so my answer is",
    "ko": "그래서 제 답은",
    "fn": "conclude",
    "example": "So my answer is, I'd go with the hash map.",
    "detail": "탐색과 비교를 끝내고 \"그래서 제 답은 이겁니다\" 하고 최종 답을 선언하는 표현이에요. 코딩 인터뷰에서 여러 접근을 검토한 뒤 \"그래서 제 답은, 해시맵으로 가겠습니다\" 하고 닫는 장면 그대로죠. 인터뷰에서 의외로 많은 사람이 빠뜨리는 게 이 명시적 착지인데, 이게 없으면 면접관이 \"그래서 뭘 고른다는 거지?\" 하고 끝나버립니다. 'I'd go with...'와 세트로 외워두면 결정 선언 한 문장이 완성돼요.",
    "exampleKo": "그래서 제 답은, 해시맵으로 가겠다는 겁니다."
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

export const PHRASE_DECK_COUNTS = { phrasal: 44, expr: 32, code: 37, ui: 32, backend: 37, sd: 36, pair: 30, clarify: 24, connectors: 37, backendCode: 23 };
