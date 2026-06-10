// AUTO-GENERATED interview phrase + backend-code banks (short-form dev English for hardcore drilling).
// Pipeline: author → adversarial verify → detail/question/terms enrichment → dual-lens deep verify
// (native-senior naturalness + Korean/technical accuracy), field-level corrections applied.

import { type CodeCard } from './interview-drill';

export interface PhraseCard { key: string; en: string; ko: string; example: string; situations: string[]; detail: string; exampleKo: string; questionEn: string; termsKo: string; cueKo: string; }
export interface Connector { key: string; en: string; ko: string; fn: string; example: string; detail: string; exampleKo: string; questionEn: string; termsKo: string; cueKo: string; }

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
    "exampleKo": "그건 새 컨테이너 하나 띄워서 해보죠.",
    "questionEn": "I can't reproduce this bug locally and staging is busy. Any ideas?",
    "termsKo": "컨테이너: 앱과 의존성을 통째로 묶어 격리 실행하는 가벼운 단위(예: Docker). 어디서든 똑같은 환경을 빠르게 띄울 수 있음.",
    "cueKo": "띄워봅시다 · 새 컨테이너 하나를 · 그걸 위해"
  },
  {
    "key": "ph:spin-down",
    "en": "spin down",
    "ko": "(리소스를) 내리다, 종료하다",
    "example": "We spin down idle workers to save money.",
    "situations": [
      "유휴 인스턴스를 줄여 비용을 아낄 때",
      "트래픽이 빠지면 리소스를 줄일 때",
      "오토스케일링을 설명할 때"
    ],
    "detail": "spin up의 정확한 반대로, 돌아가던 걸 서서히 멈춰서 내리는 어감입니다. 비용 얘기할 때 단골이에요 — \"야간엔 안 쓰는 워커 내려서 돈 아끼자\" 같은 오토스케일링 논의 장면이요. shut down은 그냥 끄는 거고, spin down은 '리소스를 회수한다'는 운영 관점이 묻어있어서 인프라 얘기엔 이쪽이 더 자연스럽습니다.",
    "exampleKo": "비용 절감하려고 놀고 있는 워커는 내립니다.",
    "questionEn": "Our cloud bill doubled, and most of the workers sit there doing nothing overnight. Any ideas?",
    "termsKo": "유휴(idle) 워커: 일감 없이 떠 있기만 한 프로세스/인스턴스 — 클라우드는 떠 있는 시간만큼 과금되므로 줄이면 바로 비용 절감.",
    "cueKo": "우리는 · 내린다 · 놀고 있는 워커들을 · 비용 아끼려고"
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
    "exampleKo": "터지면 그냥 롤백하면 돼요.",
    "questionEn": "What's your plan if the new version starts failing in production right after deploy?",
    "termsKo": "",
    "cueKo": "만약 그게 깨지면 · 우리는 · 그냥 롤백한다"
  },
  {
    "key": "ph:roll-out",
    "en": "roll out",
    "ko": "(기능을) 배포하다, (흔히 단계적으로) 풀다",
    "example": "We roll it out to 5% first.",
    "situations": [
      "새 기능을 단계적으로 풀 때",
      "카나리 배포를 설명할 때",
      "전체 사용자에게 출시한다고 말할 때"
    ],
    "detail": "카펫을 펼치듯 사용자에게 깔아 퍼뜨리는 그림이라, deploy가 기술적 행위 자체라면 roll out은 '사용자에게 확산시키는 과정'이라는 게 핵심입니다. 단어 자체가 항상 점진을 뜻하진 않지만(roll out to everyone도 자연스러워요) 단계적 배포 맥락에서 특히 많이 쓰여서, 카나리 배포 설명할 때 — \"먼저 5%에 풀고 메트릭 보고 늘리자\" — 거의 반드시 이 단어가 나옵니다. 점진적이라는 걸 분명히 하려면 gradual/phased rollout이라고 붙이면 되고, 시스템 디자인 인터뷰에서 roll out을 쓰면 운영 경험이 있어 보입니다.",
    "exampleKo": "먼저 5%에만 점진 배포합니다.",
    "questionEn": "How would you release a risky new feature to millions of users safely?",
    "termsKo": "점진적 배포(canary release): 새 버전을 트래픽 일부(예: 5%)에만 먼저 노출해 문제를 조기에 발견하고, 이상 없으면 전체로 확대.",
    "cueKo": "우리는 · 점진 배포한다 · 그것을 · 5%에게 · 먼저"
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
    "exampleKo": "그 변경은 일단 빼두죠.",
    "questionEn": "Your change from yesterday seems to be causing these errors. What should we do with it?",
    "termsKo": "",
    "cueKo": "빼냅시다 · 그 변경을 · 일단은"
  },
  {
    "key": "ph:fall-back",
    "en": "fall back",
    "ko": "(대안으로) 돌아가다, 폴백하다",
    "example": "If the cache misses, we fall back to the DB.",
    "situations": [
      "캐시 미스 시 DB로 가는 흐름 설명",
      "주 경로 실패 시 대체 경로 설명",
      "기본값으로 처리한다고 말할 때"
    ],
    "detail": "1순위가 안 되면 뒤로 물러나 2순위로 간다는, 군대에서 후퇴하는 그림이에요. 캐시 미스나 외부 API 장애 시나리오 설명할 때 — \"캐시 없으면 DB로 폴백\" — 시스템 디자인 인터뷰의 단골 표현입니다. 명사형 fallback(폴백 경로)과 동사형 fall back을 섞어 쓸 수 있는데, 동사로 쓸 땐 fall back to처럼 to가 붙는 점만 주의하세요.",
    "exampleKo": "캐시 미스가 나면 DB로 폴백합니다.",
    "questionEn": "What happens when the data isn't in the cache?",
    "termsKo": "캐시 미스: 찾는 데이터가 캐시에 없는 상황 — 이때 원본 저장소(DB)로 가는 대비 경로(폴백)가 필요함.",
    "cueKo": "만약 캐시가 미스나면 · 우리는 · 폴백한다 · DB로"
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
    "exampleKo": "흐름을 차근차근 설명드릴게요.",
    "questionEn": "I'm new to this codebase — can you explain how the checkout process works, end to end?",
    "termsKo": "",
    "cueKo": "제가 · 차근차근 설명할게요 · 당신에게 · 그 흐름을"
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
    "exampleKo": "이걸 단계별로 쪼개서 볼게요.",
    "questionEn": "This migration feels huge — I don't even know where to start.",
    "termsKo": "",
    "cueKo": "제가 · 쪼갤게요 · 이것을 · 단계들로"
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
    "exampleKo": "왜 느린지 제가 파헤쳐볼게요.",
    "questionEn": "The dashboard takes ten seconds to load and nobody knows why. Can you take this one?",
    "termsKo": "",
    "cueKo": "제가 · 파헤쳐볼게요 · 왜 그게 느린지"
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
    "exampleKo": "오늘 밤에 마이그레이션 시작하죠.",
    "questionEn": "Everything's approved for the migration and traffic is lowest at midnight. What do you think?",
    "termsKo": "",
    "cueKo": "시작합시다 · 마이그레이션을 · 오늘 밤에"
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
    "exampleKo": "API를 UI에 연결해놓을게요.",
    "questionEn": "The backend endpoint works and the frontend screens are built — so what's left to do?",
    "termsKo": "",
    "cueKo": "제가 · 연결할게요 · API를 · UI에"
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
    "exampleKo": "테스트 끝나면 환경을 싹 걷어냅니다.",
    "questionEn": "Old test environments keep piling up and burning money after every CI run. What's your team's practice?",
    "termsKo": "임시(ephemeral) 환경: 테스트마다 새로 만들고 끝나면 없애는 환경 — 상태가 남지 않아 비용 누수와 테스트 간 오염을 막음.",
    "cueKo": "우리는 · 걷어낸다 · 그 환경을 · 테스트 끝난 후에"
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
    "exampleKo": "쓰기 권한을 잠가버리죠.",
    "questionEn": "Right now every engineer has write access to the production database. Does that seem okay?",
    "termsKo": "최소 권한 원칙(least privilege): 각자 꼭 필요한 권한만 부여 — 실수나 계정 탈취 시 피해 범위를 최소화.",
    "cueKo": "잠가버립시다 · 쓰기 권한을"
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
    "exampleKo": "트래픽은 점진적으로 늘려갑니다.",
    "questionEn": "Would you send one hundred percent of traffic to the new service on day one?",
    "termsKo": "",
    "cueKo": "우리는 · 늘려간다 · 트래픽을 · 점진적으로"
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
    "exampleKo": "API 계약을 구체화해봅시다.",
    "questionEn": "We only have a rough one-page sketch of the API. Is that enough to start coding?",
    "termsKo": "API 계약(contract): 요청/응답 필드와 에러 형식을 미리 합의한 명세 — 프론트와 백엔드가 병렬로 작업할 수 있게 해줌.",
    "cueKo": "구체화합시다 · API 계약을"
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
    "exampleKo": "엣지 케이스들은 논의해서 합의를 봅시다.",
    "questionEn": "We still disagree on how to handle those edge cases. What should we do before coding?",
    "termsKo": "엣지 케이스: 입력의 극단·경계 조건에서만 발생하는 드문 상황 — 평소엔 안 보이다가 운영에서 터지기 쉬움.",
    "cueKo": "논의해서 정리합시다 · 엣지 케이스들을"
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
    "exampleKo": "아직 버그 몇 개만 더 다듬으면 됩니다.",
    "questionEn": "Is the feature ready to ship, or are there still some rough spots?",
    "termsKo": "",
    "cueKo": "우리는 · 아직 · 다듬어야 한다 · 버그 몇 개를"
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
    "exampleKo": "이 공통 로직은 따로 빼냅시다.",
    "questionEn": "I see the same validation logic copy-pasted in three different controllers. Thoughts?",
    "termsKo": "DRY(중복 제거): 같은 로직이 여러 곳에 복붙돼 있으면 한 함수/모듈로 추출 — 수정을 한 곳에서만 하면 되게 함.",
    "cueKo": "빼냅시다 · 이 공통 로직을"
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
    "exampleKo": "다운타임 제로로 해냈습니다.",
    "questionEn": "Everyone said a zero-downtime migration was impossible. How did it actually go?",
    "termsKo": "무중단(zero-downtime) 전환: 서비스를 멈추지 않고 시스템을 교체 — 이중화, 점진 전환, 블루그린 같은 기법으로 달성.",
    "cueKo": "우리는 · 해냈다 · 그것을 · 다운타임 제로로"
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
    "exampleKo": "여기서 레이스 컨디션에 부딪혔어요.",
    "questionEn": "You've been quiet for an hour — did something unexpected happen while testing the concurrent writes?",
    "termsKo": "레이스 컨디션: 둘 이상의 스레드가 같은 데이터를 동시에 건드려, 실행 순서에 따라 결과가 달라지는 동시성 버그.",
    "cueKo": "나는 · 부딪혔다 · 레이스 컨디션에 · 여기서"
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
    "exampleKo": "결국엔 큐를 쓰게 됐습니다.",
    "questionEn": "You debated webhooks, polling, and a few other designs for weeks — what did you finally choose?",
    "termsKo": "폴링 vs 웹훅: 폴링은 클라이언트가 주기적으로 새 데이터가 있는지 물어보는 방식, 웹훅은 이벤트 발생 시 서버가 먼저 호출해주는 방식.",
    "cueKo": "우리는 · 결국 쓰게 됐다 · 큐를"
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
    "exampleKo": "더 단순한 접근법을 생각해냈어요.",
    "questionEn": "The original design felt way too complicated. Did you find a better alternative?",
    "termsKo": "",
    "cueKo": "나는 · 생각해냈다 · 더 단순한 접근법을"
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
    "exampleKo": "릴리스 최종 승인은 누가 하나요?",
    "questionEn": "The release candidate is ready. What's the last step before it goes out the door?",
    "termsKo": "릴리스 후보(RC, release candidate): 출시 직전 '이대로 나가도 된다'는 최종 검증을 기다리는 후보 빌드.",
    "cueKo": "누가 · 최종 승인하나요 · 그 릴리스를?"
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
    "exampleKo": "죽은 코드는 제가 정리할게요.",
    "questionEn": "There are tons of unused functions left over from the old feature. Just leave them there?",
    "termsKo": "데드 코드: 어디서도 호출되지 않는 죽은 코드 — 남겨두면 읽는 사람만 헷갈리게 하고 유지보수 비용을 늘림.",
    "cueKo": "제가 · 정리할게요 · 그 죽은 코드를"
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
    "exampleKo": "여기서 리스크 하나만 짚고 넘어갈게요.",
    "questionEn": "Before we approve this design, is there anything you think we should all be aware of?",
    "termsKo": "",
    "cueKo": "저는 · 짚고 싶어요 · 리스크 하나를 · 여기서"
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
    "exampleKo": "근본 원인을 좁혀 들어가 봅시다.",
    "questionEn": "We have about ten different theories for why production crashed. What's our next move?",
    "termsKo": "근본 원인(root cause): 겉으로 보이는 증상이 아니라 문제를 만든 진짜 원인 — 이걸 고쳐야 재발을 막음.",
    "cueKo": "좁혀 들어가 봅시다 · 근본 원인을"
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
    "exampleKo": "네트워크 문제는 배제해도 됩니다.",
    "questionEn": "Could the latency be coming from the network? The packet traces all look clean.",
    "termsKo": "",
    "cueKo": "우리는 · 배제할 수 있다 · 네트워크를"
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
    "exampleKo": "메모리 릭을 추적해서 찾아냈어요.",
    "questionEn": "Memory usage kept climbing for weeks and nobody could explain it. What happened with that?",
    "termsKo": "메모리 릭: 다 쓴 메모리를 해제하지 못해 사용량이 계속 증가하는 버그 — 방치하면 결국 OOM으로 프로세스가 죽음.",
    "cueKo": "나는 · 추적해 찾아냈다 · 그 메모리 릭을"
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
    "exampleKo": "타이밍 이슈는 제가 알아낼게요.",
    "questionEn": "That job randomly fires twice on some mornings and nobody understands why. Can you look?",
    "termsKo": "",
    "cueKo": "제가 · 알아낼게요 · 그 타이밍 이슈를"
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
    "exampleKo": "제 접근 방식을 먼저 펼쳐놓고 설명할게요.",
    "questionEn": "Before you write any code, can you describe your overall plan for this?",
    "termsKo": "",
    "cueKo": "제가 · 펼쳐놓을게요 · 제 접근 방식을"
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
    "exampleKo": "이 함수만 자세히 들여다봅시다.",
    "questionEn": "The profiler shows eighty percent of the time is spent in this one function. Now what?",
    "termsKo": "프로파일러: 함수별 실행 시간과 호출 횟수를 측정해 어디가 병목인지 찾아주는 성능 분석 도구.",
    "cueKo": "확대해서 들여다봅시다 · 이 함수를"
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
    "exampleKo": "잠깐 큰 그림으로 돌아가 봅시다.",
    "questionEn": "We've spent twenty minutes arguing about a variable name. Is this the best use of our time?",
    "termsKo": "",
    "cueKo": "줌아웃해 봅시다 · 큰 그림으로"
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
    "exampleKo": "캐시는 나중에 갈아끼우면 됩니다.",
    "questionEn": "If we pick Redis for the cache now, are we stuck with it forever?",
    "termsKo": "구현 교체: 인터페이스(추상화) 뒤에 구현을 숨기면 Redis에서 다른 캐시로 부품 갈아끼우듯 바꿀 수 있음.",
    "cueKo": "우리는 · 갈아끼울 수 있다 · 캐시를 · 나중에"
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
    "exampleKo": "구 API는 단계적으로 폐기하는 중입니다.",
    "questionEn": "Some clients are still calling the old v1 endpoints. What's the long-term plan there?",
    "termsKo": "디프리케이션(deprecation): 옛 API/기능을 '곧 제거 예정'으로 공지하고, 사용자를 새 버전으로 옮긴 뒤 단계적으로 내리는 절차.",
    "cueKo": "우리는 · 단계적으로 폐기하는 중이다 · 구 API를"
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
    "exampleKo": "이건 리뷰 때 보게 표시해둘게요.",
    "questionEn": "You spotted something odd in that PR but you're not sure it's a real bug. Now what?",
    "termsKo": "",
    "cueKo": "제가 · 표시해둘게요 · 이것을 · 리뷰 보도록"
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
    "exampleKo": "캐싱은 일단 미뤄두죠.",
    "questionEn": "Should we design the whole caching layer now, or is it too early for that?",
    "termsKo": "",
    "cueKo": "미뤄둡시다 · 캐싱은 · 일단은"
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
    "exampleKo": "인프라팀도 논의에 끼웁시다.",
    "questionEn": "This change touches the Kubernetes setup, and honestly none of us know that stack well.",
    "termsKo": "쿠버네티스(Kubernetes): 수많은 컨테이너의 배치·확장·복구를 자동으로 관리해주는 오케스트레이션 플랫폼.",
    "cueKo": "끌어들입시다 · 인프라팀을"
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
    "exampleKo": "온콜 담당자한테 제가 연락해볼게요.",
    "questionEn": "Production is alerting at 2 a.m. and it's not even our service. Who can help?",
    "termsKo": "온콜(on-call): 장애 알림을 받으면 즉시 대응하는 당번 엔지니어 — 보통 주 단위로 돌아가며 맡는 제도.",
    "cueKo": "제가 · 연락해볼게요 · 온콜 담당자에게"
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
    "exampleKo": "이거 오늘 내보내죠.",
    "questionEn": "The fix passed QA this morning. When do you want users to have it?",
    "termsKo": "",
    "cueKo": "내보냅시다 · 이것을 · 오늘"
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
    "exampleKo": "금요일에 새 DB로 전환합니다.",
    "questionEn": "What's the timeline for actually switching production traffic onto the new database?",
    "termsKo": "컷오버(cutover): 구 시스템에서 신 시스템으로 실제 트래픽과 운영을 옮기는 전환 작업 — 보통 트래픽이 적은 시간대에 수행.",
    "cueKo": "우리는 · 전환한다 · 새 DB로 · 금요일에"
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
    "exampleKo": "점심 먹고 잠깐 싱크 맞추죠.",
    "questionEn": "I've got updates on the schema work, and I heard you changed the API too.",
    "termsKo": "",
    "cueKo": "싱크 맞춥시다 · 점심 후에"
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
    "exampleKo": "그건 나중에 다시 얘기하죠.",
    "questionEn": "We keep drifting into the logging debate and we've only got ten minutes left.",
    "termsKo": "",
    "cueKo": "다시 돌아옵시다 · 그 얘기로 · 나중에"
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
    "exampleKo": "요구사항부터 확실히 못박읍시다.",
    "questionEn": "The spec still says TBD in five places. Can we really start building?",
    "termsKo": "",
    "cueKo": "못박읍시다 · 요구사항을"
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
    "exampleKo": "머지 컨플릭트는 제가 정리할게요.",
    "questionEn": "The rebase left the branch in a mess and CI is all red. Who's on it?",
    "termsKo": "머지 컨플릭트: 두 브랜치가 같은 줄을 서로 다르게 수정해 git이 자동 병합하지 못하는 상태 — 사람이 직접 골라 해결해야 함.",
    "cueKo": "제가 · 정리할게요 · 그 머지 컨플릭트들을"
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
    "exampleKo": "크게 보면 그냥 큐 하나예요.",
    "questionEn": "Before we dive into details, can you give me a quick overview of how your design works?",
    "termsKo": "",
    "cueKo": "큰 틀에서 보면 · 그건 · 그냥 큐다"
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
    "exampleKo": "잠깐 생각을 소리 내서 정리해볼게요.",
    "questionEn": "Here's a tricky one: how would you detect cycles in a distributed dependency graph? Take your time.",
    "termsKo": "의존성 그래프의 사이클: A→B→C→A처럼 의존이 되돌아오는 구조. 빌드 실패·교착(데드락)의 원인으로, DFS로 탐지하는 게 정석.",
    "cueKo": "제가 · 소리 내서 생각해볼게요 · 잠깐만"
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
    "exampleKo": "바로 떠오르는 것만 말하면, 접근법이 세 가지 있어요.",
    "questionEn": "Without looking anything up, how many ways can you name to speed up a slow query?",
    "termsKo": "",
    "cueKo": "바로 떠오르는 대로는 · 세 가지 접근법"
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
    "exampleKo": "결국 따져보면 이건 캐싱 문제예요.",
    "questionEn": "We've stared at logs and traces all morning — what do you think the core problem actually is?",
    "termsKo": "",
    "cueKo": "이건 · 결국 귀결된다 · 캐싱 문제로"
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
    "exampleKo": "여기 함정은 인덱스가 하나 어긋나는 거예요.",
    "questionEn": "This loop looks dead simple — anything subtle that could bite us when we ship it?",
    "termsKo": "오프바이원(off-by-one) 에러: 반복문 경계를 한 칸 잘못 잡는 버그. <를 <=로 쓰는 식으로, 울타리 기둥 개수 세기에서 틀리는 것과 같음.",
    "cueKo": "여기서의 함정은 · 이거다 · 오프바이원"
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
    "exampleKo": "트레이드오프는 속도를 얻는 대신 메모리를 쓰는 거예요.",
    "questionEn": "Caching everything in memory sounds great — but what do we give up by doing that?",
    "termsKo": "시간-공간 트레이드오프: 메모리를 더 써서(캐시 등) 속도를 버는 교환 관계. 설계 선택에는 항상 잃는 쪽이 있음.",
    "cueKo": "트레이드오프는 · 이거다 · 메모리를 내주고 속도 얻기"
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
    "exampleKo": "결론만 말하면, 타임아웃 났어요.",
    "questionEn": "I missed the postmortem — what happened with that deploy last night?",
    "termsKo": "포스트모템(postmortem): 장애가 끝난 뒤 타임라인·원인·재발 방지책을 정리하는 회고. 사람을 비난하지 않고(blameless) 진행하는 게 원칙.",
    "cueKo": "긴 얘기 짧게 하면 · 그게 · 타임아웃 났다"
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
    "exampleKo": "제가 틀렸으면 바로잡아 주세요.",
    "questionEn": "Our checkout service writes to both databases synchronously on every request — sound okay to you?",
    "termsKo": "듀얼 라이트(dual write): 한 요청에서 두 저장소에 각각 쓰는 패턴. 한쪽만 성공하면 데이터가 어긋나는 정합성 문제의 단골 원인.",
    "cueKo": "고쳐주세요 · 저를 · 만약 제가 틀렸다면 · 여기서"
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
    "exampleKo": "말이 되는지 후딱 한번 점검해볼게요.",
    "questionEn": "My math says we'll need two petabytes of storage for year one — does that seem right?",
    "termsKo": "새너티 체크(sanity check): 자릿수·부호·단위가 상식적으로 말이 되는지 빠르게 훑는 검증. 정밀 검산 전의 1차 거름망.",
    "cueKo": "제가 · 검산해볼게요 · 그걸 · 아주 빠르게"
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
    "exampleKo": "명확히 하자면, 읽기만 있는 거죠?",
    "questionEn": "We need this endpoint to handle ten times the current traffic by next quarter.",
    "termsKo": "",
    "cueKo": "그냥 확실히 하자면 · 읽기만요?"
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
    "exampleKo": "그래도 인정할 건 인정하자면, 그건 확장성은 괜찮아요.",
    "questionEn": "That legacy monolith is a nightmare — we should just rewrite the whole thing, right?",
    "termsKo": "",
    "cueKo": "공정하게 말하면 · 그건 · 확장 잘 된다"
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
    "exampleKo": "그렇긴 한데, 그건 확장이 안 될 거예요.",
    "questionEn": "The prototype handled the demo perfectly — should we just ship it to production as is?",
    "termsKo": "",
    "cueKo": "그렇긴 해도 · 그건 · 확장 안 될 거다"
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
    "exampleKo": "직감상 이건 레이스 컨디션 같아요.",
    "questionEn": "This test fails maybe one run in ten with no pattern — any first instinct before we profile?",
    "termsKo": "레이스 컨디션: 두 스레드가 같은 데이터에 동시 접근해 실행 순서에 따라 결과가 달라지는 버그. 간헐적으로만 재현돼 잡기 어려움.",
    "cueKo": "내 직감은 · 말한다 · 그게 레이스 컨디션이라고"
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
    "exampleKo": "저는 더 단순한 쪽으로 기울어요.",
    "questionEn": "We could use a managed queue or build our own — which option would you pick?",
    "termsKo": "",
    "cueKo": "나는 · 기울 것 같다 · 더 단순한 옵션 쪽으로"
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
    "exampleKo": "읽기-쓰기 비율에 따라 달라요.",
    "questionEn": "For this workload, would you go with Postgres or a key-value store?",
    "termsKo": "읽기/쓰기 비율(read-write ratio): 트래픽에서 읽기와 쓰기가 차지하는 비중. 캐시·리드 리플리카 도입 여부를 가르는 핵심 지표.",
    "cueKo": "그건 · 달려 있다 · 읽기-쓰기 비율에"
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
    "exampleKo": "엣지 케이스는 입력이 비어 있는 경우예요.",
    "questionEn": "Your solution handles typical inputs fine — what kind of input might still break it?",
    "termsKo": "엣지 케이스: 빈 입력, 최댓값, 음수 같은 경계·극단 입력. 정상 로직 바깥에서 버그가 숨는 단골 지점.",
    "cueKo": "엣지 케이스는 · 이거다 · 빈 입력"
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
    "exampleKo": "이 부분은 과하게 설계하지 맙시다.",
    "questionEn": "Should we add a plugin architecture and multi-database support now, in case we need it later?",
    "termsKo": "오버엔지니어링: 지금 필요 없는 확장성·일반화를 미리 구현해 복잡도만 키우는 것. YAGNI('어차피 필요 없을 것 — 필요해질 때 만들어라') 원칙이 경계하는 대상.",
    "cueKo": "과하게 설계하지 말자 · 이 부분은"
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
    "exampleKo": "일단 단순하게 시작하고, 그다음에 최적화하죠.",
    "questionEn": "How would you build the first version — microservices, Kubernetes, the full setup from day one?",
    "termsKo": "",
    "cueKo": "시작하자 · 단순하게 · 그다음 최적화하자"
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
    "exampleKo": "병목은 DB 쓰기예요.",
    "questionEn": "The whole request pipeline feels slow — which part is actually holding everything up?",
    "termsKo": "병목(bottleneck): 전체 처리 속도를 결정짓는 가장 느린 구간. 병의 좁은 목처럼, 여길 못 넓히면 다른 최적화는 무의미.",
    "cueKo": "병목은 · 이거다 · DB 쓰기"
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
    "exampleKo": "최악의 경우엔 O(n²)이에요.",
    "questionEn": "Your nested-loop solution works — how does the runtime behave as the input grows really large?",
    "termsKo": "O(n²)/빅오 표기: 입력이 n배 커질 때 연산량이 얼마나 느는지 나타내는 척도. 이중 반복문이 O(n²)의 전형.",
    "cueKo": "최악의 경우에는 · 그게 · O(n²)다"
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
    "exampleKo": "정상 흐름은 호출 두 번이면 끝이에요.",
    "questionEn": "Forget failures for a minute — what does the normal successful flow look like end to end?",
    "termsKo": "해피 패스(happy path): 에러·예외 없이 정상 입력이 정상 결과로 흐르는 기본 성공 시나리오. 예외 처리의 반대 축.",
    "cueKo": "해피 패스는 · 이거다 · 그냥 호출 두 번"
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
    "exampleKo": "이게 무너지는 지점은 부하가 높을 때예요.",
    "questionEn": "Your design looks solid for current traffic — under what conditions would it stop working?",
    "termsKo": "",
    "cueKo": "이게 무너지는 지점은 · 이거다 · 높은 부하"
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
    "exampleKo": "하나씩 차근차근 짚어드릴게요.",
    "questionEn": "Can you explain how a request flows across your system, step by step?",
    "termsKo": "",
    "cueKo": "제가 · 차근차근 설명할게요 · 당신에게 · 그걸"
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
    "exampleKo": "한발 물러나서 보면, 이게 정말 필요한가요?",
    "questionEn": "Okay, so should the retry queue use Redis streams or Kafka? We need to decide today.",
    "termsKo": "",
    "cueKo": "한 걸음 물러나서 보면 · 우리가 · 필요로 하나 · 이걸?"
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
    "exampleKo": "잘 잡으셨네요, 그거 버그 맞아요.",
    "questionEn": "Hey, doesn't this function return null when the list is empty? The caller never checks that.",
    "termsKo": "",
    "cueKo": "잘 잡았어요 · 그건 · 버그다"
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
    "exampleKo": "잠깐 앞 얘기로 돌아갈게요.",
    "questionEn": "Wait, I'm lost — where did this token you keep mentioning come from?",
    "termsKo": "",
    "cueKo": "제가 · 되돌아갈게요 · 잠깐만"
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
    "exampleKo": "인증은 일단 미뤄두려고요.",
    "questionEn": "Are you planning to implement authentication as part of this design today?",
    "termsKo": "",
    "cueKo": "나는 · 미뤄둘 거다 · 인증은 · 일단 지금은"
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
    "exampleKo": "가장 단순한 방식은 브루트포스예요.",
    "questionEn": "Before optimizing anything, what's the most straightforward way you'd solve this problem?",
    "termsKo": "브루트포스(완전 탐색): 모든 경우를 다 시도하는 가장 단순한 풀이. 느리지만 정답이 보장돼 최적화의 출발점이 됨.",
    "cueKo": "나이브한 접근은 · 이거다 · 브루트 포스"
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
    "exampleKo": "핵심 포인트는 이게 정렬돼 있다는 거예요.",
    "questionEn": "Your solution went from quadratic to linear — what observation made that possible?",
    "termsKo": "정렬된 입력: '이미 정렬돼 있다'는 성질 하나로 이진 탐색·투 포인터 같은 훨씬 빠른 풀이가 열림 — 문제의 숨은 단서.",
    "cueKo": "핵심 통찰은 · 이거다 · 그게 정렬돼 있다는 것"
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
    "exampleKo": "여기까지 이해되시나요?",
    "questionEn": "Hmm, you lost me somewhere around the cache invalidation part.",
    "termsKo": "",
    "cueKo": "그게 · 말이 되나요 · 지금까지?"
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
    "exampleKo": "캐싱 얘기는 나중에 다시 돌아오죠.",
    "questionEn": "Should we also decide on the caching strategy right now, before finishing the data model?",
    "termsKo": "",
    "cueKo": "다시 돌아오자 · 캐싱으로 · 나중에"
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
    "exampleKo": "일단 단일 리전이라고 가정하죠.",
    "questionEn": "Do you want to design this for multiple regions from the very beginning?",
    "termsKo": "싱글 리전 가정: 데이터센터 한 곳만 고려해 설계를 단순화하는 것. 멀티 리전은 복제 지연·일관성 문제가 따라붙어 따로 다룸.",
    "cueKo": "일단 지금은 · 가정하자 · 단일 리전이라고"
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
    "exampleKo": "첫 번째 체크가 실패하면 AND는 거기서 바로 끊겨요. 뒤는 평가도 안 하고요.",
    "questionEn": "Looking at this AND condition — why does the second check never even run when the first one is false?",
    "termsKo": "단락 평가 — AND/OR에서 앞 조건만으로 결과가 확정되면 뒤 조건은 아예 실행하지 않는 것. 불필요한 연산과 NPE를 피할 수 있음.",
    "cueKo": "그 AND는 · 거기서 끊긴다 · 만약 첫 번째 체크가 실패하면"
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
    "exampleKo": "코드 깔끔하게 가져가려고 빈 입력이면 바로 리턴해요.",
    "questionEn": "These nested if-else blocks are getting hard to read — how would you restructure this function?",
    "termsKo": "얼리 리턴(가드 절) — 조건이 안 맞으면 함수 초반에 바로 빠져나가는 패턴. 중첩 if를 줄여 가독성을 높임.",
    "cueKo": "우리는 · 일찍 리턴한다 · 빈 입력에서 · 코드를 깔끔하게 유지하려고"
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
    "exampleKo": "아무것도 안 맞으면 디폴트 케이스로 넘어가요.",
    "questionEn": "What happens in this switch statement when the value doesn't match any of the cases?",
    "termsKo": "switch의 default — 어떤 case에도 안 걸리면 마지막 기본 분기로 떨어짐. fall-through는 아래 분기로 흘러내려가는 동작.",
    "cueKo": "만약 아무것도 매치 안 되면 · 그건 · 흘러 내려간다 · default로"
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
    "exampleKo": "필드에 손대기 전에 널부터 막아요.",
    "questionEn": "What happens if someone passes nothing into this function — does it just blow up?",
    "termsKo": "널 가드 — 값을 사용하기 전에 null 여부를 먼저 검사해 NPE를 예방하는 방어 코드.",
    "cueKo": "우리는 · 방어한다 · null에 대해 · 그 필드를 건드리기 전에"
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
    "exampleKo": "결과를 메모이즈해 둬서 다시 계산 안 해요.",
    "questionEn": "This pure function runs the same heavy computation with identical arguments over and over — how would you avoid that?",
    "termsKo": "메모이제이션 — 같은 입력의 계산 결과를 저장해 두고 다음 호출 때 재계산 없이 반환. 함수 단위의 캐싱.",
    "cueKo": "이건 · 메모이즈한다 · 그 결과를 · 그래서 우리는 · 다시 계산 안 한다"
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
    "exampleKo": "에러를 삼키지 않고 위로 전파해요.",
    "questionEn": "When this low-level call fails, do you just catch and log it right there?",
    "termsKo": "에러 전파 — 에러를 그 자리에서 삼키지(swallow) 않고 처리 책임이 있는 상위 호출자까지 던져 올리는 것.",
    "cueKo": "우리는 · 위로 올려보낸다 · 그 에러를 · 삼켜버리는 대신"
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
    "exampleKo": "키 기준으로 중복을 제거해서 각 id가 한 번씩만 나와요.",
    "questionEn": "The input list can contain the same id multiple times — how do you make sure each one only shows up once?",
    "termsKo": "dedupe(중복 제거) — 같은 키를 가진 항목들 중 하나만 남기는 처리.",
    "cueKo": "그건 · 중복 제거한다 · 키 기준으로 · 그래서 각 id는 · 나타난다 · 한 번만"
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
    "exampleKo": "왕복 횟수 줄이려고 이 쓰기들을 묶어서 처리해요.",
    "questionEn": "You're doing a separate database write for every single item — isn't that slow?",
    "termsKo": "배칭 — 여러 건을 한 번의 호출/쿼리로 묶어 네트워크 왕복 횟수를 줄이는 기법.",
    "cueKo": "우리는 · 묶는다 · 이 쓰기들을 · 왕복을 줄이려고"
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
    "exampleKo": "각 항목을 한 번씩만 건드리니까 이건 O(n)이에요.",
    "questionEn": "What's the time complexity of this solution?",
    "termsKo": "O(n) — 입력 크기 n에 비례해 실행 시간이 늘어나는 선형 시간 복잡도. 각 원소를 한 번씩만 보면 O(n).",
    "cueKo": "이건 · O(n)이다 · 왜냐하면 우리가 · 건드리니까 · 각 아이템을 · 한 번씩"
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
    "exampleKo": "추가 메모리 할당을 피하려고 제자리에서 직접 수정해요.",
    "questionEn": "Does your sort return a brand-new array, or does it change the original one?",
    "termsKo": "인플레이스 수정 — 새 복사본을 만들지 않고 원본 자료구조를 직접 변경. 메모리는 아끼지만 부수효과에 주의.",
    "cueKo": "우리는 · 변경한다 · 제자리에서 · 추가 할당을 피하려고"
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
    "exampleKo": "포인터가 끝에 닿을 때까지 반복해요.",
    "questionEn": "What's the exit condition here — when does this actually stop running?",
    "termsKo": "",
    "cueKo": "그건 · 돈다 · 포인터가 · 닿을 때까지 · 끝에"
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
    "exampleKo": "순서가 어긋나 있으면 둘을 맞바꿔요.",
    "questionEn": "In your bubble sort, what do you do when two adjacent elements are out of order?",
    "termsKo": "",
    "cueKo": "우리는 · 맞바꾼다 · 그 둘을 · 만약 그것들이 순서가 어긋나 있으면"
  },
  {
    "key": "cn:it-returns-early-on-cache-hit",
    "en": "it returns early on cache hit",
    "ko": "캐시 적중이면 바로 리턴한다",
    "example": "It returns early on a cache hit — no DB call.",
    "situations": [
      "캐시 레이어 동작을 설명할 때",
      "빠른 경로를 짚을 때",
      "왜 가끔 DB를 안 치는지 설명할 때"
    ],
    "detail": "캐시에 있으면(hit) 비싼 경로를 안 타고 바로 리턴한다는, read path 설명의 단골 문장이에요. 시스템 디자인에서 캐시 어사이드 흐름을 그리면서 '히트면 여기서 끝, 미스면 DB로'라고 말할 때 쓰죠. cache hit/miss는 항상 쌍으로 다니니까, hit만 말하고 miss 경로 설명을 빼먹으면 면접관이 바로 물어봅니다.",
    "exampleKo": "캐시에 있으면 바로 리턴해요. DB 호출은 없고요.",
    "questionEn": "Walk me through what happens when the data you need was already fetched and stored a moment ago.",
    "termsKo": "캐시 히트 — 찾는 데이터가 캐시에 이미 있어서 DB 같은 원본 저장소까지 갈 필요가 없는 경우.",
    "cueKo": "그건 · 리턴한다 · 일찍 · 캐시 히트면 · DB 호출 없이"
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
    "exampleKo": "여기서 누적 합계에 계속 더해 나가요.",
    "questionEn": "You're iterating over all the amounts — how do you keep track of the sum so far?",
    "termsKo": "누산기(accumulator) — 순회하면서 중간 결과를 계속 쌓아 두는 변수. reduce/fold 패턴의 기본.",
    "cueKo": "우리는 · 쌓아간다 · 누적 합계로 · 여기서"
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
    "exampleKo": "매치를 발견하면 플래그를 뒤집어요.",
    "questionEn": "How does the loop remember that a match was already found in an earlier iteration?",
    "termsKo": "플래그 — 어떤 일이 일어났는지를 기억해 두는 불리언 상태 변수.",
    "cueKo": "그건 · 뒤집는다 · 그 플래그를 · 우리가 매치를 보는 순간"
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
    "exampleKo": "루트에서부터 깊이 우선으로 트리를 타고 내려가요.",
    "questionEn": "Your data is hierarchical — how do you visit every node starting from the root?",
    "termsKo": "트리 순회 — 루트부터 모든 노드를 방문하는 것. DFS(깊이 우선)는 한 갈래를 끝까지, BFS(너비 우선)는 층별로 탐색.",
    "cueKo": "우리는 · 순회한다 · 그 트리를 · 깊이 우선으로 · 루트부터"
  },
  {
    "key": "cn:it-recurses-on-each-child",
    "en": "it recurses on each child",
    "ko": "각 자식에 대해 재귀한다",
    "example": "It recurses on each child and merges the results.",
    "situations": [
      "재귀 호출 구조를 설명할 때",
      "트리나 그래프 재귀를 짚을 때",
      "분할정복 흐름을 말할 때"
    ],
    "detail": "recurse는 recursion에서 역으로 만들어진 동사인데 실무 구어에선 아주 자연스러워요. 트리 문제에서 '각 자식으로 재귀 들어가서 결과를 합친다'는 분할 정복 구조를 설명할 때 그대로 쓰죠. 전치사가 on이라는 게 포인트고(recurse on each child), 이 말을 꺼냈으면 base case가 뭔지도 바로 이어서 말해주는 게 인터뷰 매너예요.",
    "exampleKo": "각 자식에 대해 재귀 호출하고 결과를 합쳐요.",
    "questionEn": "After processing one node, how do you handle everything nested underneath it?",
    "termsKo": "재귀 — 함수가 자기 자신을 호출해 같은 구조의 더 작은 문제를 푸는 기법. 트리 처리에 자연스럽게 맞음.",
    "cueKo": "그건 · 재귀한다 · 각 자식에 대해 · 그리고 합친다 · 결과들을"
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
    "exampleKo": "허용된 최대 페이지 크기로 상한을 둬요.",
    "questionEn": "What stops a client from requesting a million items in a single page?",
    "termsKo": "",
    "cueKo": "우리는 · 상한을 건다 · 그걸 · 최대 허용 페이지 크기에"
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
    "exampleKo": "visited 셋을 써서 이미 본 건 건너뛰어요.",
    "questionEn": "The graph has cycles — how do you avoid processing the same node twice?",
    "termsKo": "visited set(방문 집합) — 이미 처리한 노드를 기록해 사이클에서의 무한 루프와 중복 방문을 막음.",
    "cueKo": "그건 · 건너뛴다 · 이미 본 거면 · visited 셋을 써서"
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
    "exampleKo": "키를 해시해서 어느 버킷에 들어갈지 찾아요.",
    "questionEn": "How does the map decide internally where to store each entry?",
    "termsKo": "해시 — 키를 고정 크기 숫자로 변환해 저장 위치(버킷)를 정하는 것. 해시맵 O(1) 조회의 핵심 원리.",
    "cueKo": "우리는 · 해싱한다 · 그 키를 · 그것의 버킷을 찾으려고"
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
    "exampleKo": "그 키의 이전 값을 덮어써요.",
    "questionEn": "What happens if I put the same key into the map twice?",
    "termsKo": "",
    "cueKo": "그건 · 덮어쓴다 · 이전 값을 · 그 키에 대한"
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
    "exampleKo": "끝에 덧붙이는 건 상수 시간에 돼요.",
    "questionEn": "When you add a new item to this list, where does it go and how fast is that?",
    "termsKo": "동적 배열의 끝 삽입 — 분할 상환(amortized) O(1). 공간이 차면 배열을 두 배로 늘리는 O(n) 재할당이 가끔 일어나지만, 그 비용이 이후 수많은 삽입에 분산되기 때문.",
    "cueKo": "우리는 · 덧붙인다 · 끝에 · 상수 시간으로"
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
    "exampleKo": "스택에서 꺼내서 처리해요.",
    "questionEn": "You've pushed all the elements on during the first pass — how do you get them back out?",
    "termsKo": "스택 — 마지막에 넣은 것을 먼저 꺼내는 LIFO 자료구조. push로 쌓고 pop으로 꺼냄.",
    "cueKo": "그건 · 꺼낸다 · 스택에서 · 그리고 처리한다 · 그걸"
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
    "exampleKo": "호출을 초당 한 번으로 제한해요.",
    "questionEn": "This scroll handler fires hundreds of times a second and hammers the API — what would you do?",
    "termsKo": "스로틀 — 호출이 아무리 많아도 일정 주기당 최대 한 번만 실행되게 빈도를 제한 (예: 초당 1회).",
    "cueKo": "우리는 · 조절한다 · 그 호출들을 · 초당 한 번으로"
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
    "exampleKo": "검색을 날리기 전에 입력을 디바운스해요.",
    "questionEn": "Right now we send a search request on every single keystroke — how would you fix that?",
    "termsKo": "디바운스 — 연속 입력이 멈춘 뒤 일정 시간이 지나면 마지막 한 번만 실행. 타자가 끝나기를 기다리는 셈.",
    "cueKo": "그건 · 디바운스한다 · 그 입력을 · 검색을 날리기 전에"
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
    "exampleKo": "비교하기 전에 문자열로 강제 변환해요.",
    "questionEn": "One value is a number and the other is text — how do you compare them safely?",
    "termsKo": "타입 강제 변환(coercion) — 값을 다른 타입으로 바꾸는 것. 암묵적 변환에 맡기면 비교 버그가 나기 쉬워 명시적으로 변환함.",
    "cueKo": "우리는 · 강제 변환한다 · 그걸 · 문자열로 · 비교하기 전에"
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
    "exampleKo": "join 하기 전에 빈 값들을 걸러내요.",
    "questionEn": "Some of these fields come back blank — won't that break the joined output?",
    "termsKo": "filter 연산 — 조건에 맞는 원소만 남기고 나머지는 걸러내는 고차 함수.",
    "cueKo": "그건 · 걸러낸다 · 빈 것들을 · join 전에"
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
    "exampleKo": "맵을 돌려서 id들만 뽑아내요.",
    "questionEn": "You have a list of user objects but only need the ids — how do you extract them?",
    "termsKo": "map 연산 — 리스트의 각 원소에 같은 변환 함수를 적용해 새 리스트를 만드는 고차 함수.",
    "cueKo": "우리는 · map을 돌린다 · 그것 위로 · id들을 뽑아내려고"
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
    "exampleKo": "필드가 없으면 기본값 0으로 떨어져요.",
    "questionEn": "What value gets used when that field is missing from the payload?",
    "termsKo": "",
    "cueKo": "그건 · 기본값으로 간다 · 0으로 · 만약 그 필드가 없으면"
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
    "exampleKo": "그건 서비스 레이어에 위임해요.",
    "questionEn": "Why isn't this business logic handled directly in the controller?",
    "termsKo": "위임(delegation) — 직접 처리하지 않고 그 책임을 가진 다른 계층/객체에 맡기는 설계 (예: 컨트롤러 → 서비스 계층).",
    "cueKo": "우리는 · 위임한다 · 서비스 레이어에 · 그 일은"
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
    "exampleKo": "커넥션이 준비될 때까지 블록돼요.",
    "questionEn": "What does the calling thread do while the connection is still being established?",
    "termsKo": "블로킹 호출 — 결과가 준비될 때까지 스레드가 멈춰 기다리는 방식. 논블로킹(비동기)과 대비됨.",
    "cueKo": "그건 · 블록된다 · 연결이 · 준비될 때까지"
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
    "exampleKo": "요청을 병렬로 뿌리고 전부 await 해요.",
    "questionEn": "You need data from five different services — do you call them one by one?",
    "termsKo": "팬아웃 — 하나의 작업을 여러 대상에 동시에 뿌리는 패턴. 병렬 호출로 전체 지연 시간을 줄임.",
    "cueKo": "우리는 · 흩뿌린다 · 그 요청들을 · 그리고 기다린다 · 그것들 전부를"
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
    "exampleKo": "타임아웃이 나면 백오프 걸고 재시도해요.",
    "questionEn": "The call just timed out — does the client simply give up?",
    "termsKo": "백오프 — 재시도 간격을 점점 늘리는 전략. 장애 난 서비스를 계속 두들겨 더 악화시키는 것을 방지.",
    "cueKo": "그건 · 재시도한다 · 백오프를 걸고 · 타임아웃이 나면"
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
    "exampleKo": "그 호출을 try-catch로 감싸요.",
    "questionEn": "If that external request throws an exception, how do you keep it from crashing the whole flow?",
    "termsKo": "",
    "cueKo": "그건 · 감싼다 · 그 호출을 · try-catch로"
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
    "exampleKo": "데이터를 평탄한 맵 구조로 정규화해요.",
    "questionEn": "The API returns deeply nested JSON — how do you make lookups easier on the client?",
    "termsKo": "데이터 정규화 — 중첩되고 중복된 데이터를 일정한 평탄한 구조(예: id→객체 맵)로 변환해 조회와 갱신을 쉽게 함.",
    "cueKo": "우리는 · 정규화한다 · 그 데이터를 · 평평한 맵으로"
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
    "exampleKo": "레이스 피하려고 그 부분을 락으로 감싸요.",
    "questionEn": "Two threads can update this counter at the same time — how do you keep the count correct?",
    "termsKo": "경쟁 상태(race condition) — 두 스레드가 같은 데이터를 동시에 수정하면 결과가 꼬임. 락으로 한 번에 하나만 접근하게 함.",
    "cueKo": "우리는 · 락을 건다 · 그 주위에 · 레이스를 피하려고"
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
    "exampleKo": "버퍼가 가득 차면 쌓인 걸 한 번에 내보내고 비워요.",
    "questionEn": "The writes pile up in memory first — when do they actually get sent out?",
    "termsKo": "버퍼링 — 쓰기를 메모리에 모아 두었다가 한 번에 내보내는 것. flush는 모인 내용을 실제로 비워 내보내는 동작.",
    "cueKo": "그건 · 비워낸다 · 그 버퍼를 · 그게 가득 차면"
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
    "exampleKo": "여기엔 체크박스로 다중 선택이 들어가야 해요.",
    "questionEn": "Users can only delete one file at a time, which is tedious — how would you improve the list?",
    "termsKo": "",
    "cueKo": "우리는 · 필요해요 · 다중 선택이 · 체크박스 달린 · 여기에"
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
    "exampleKo": "시프트 클릭하면 사이에 있는 항목이 전부 선택돼요.",
    "questionEn": "I want rows five through twenty highlighted in one go — what's the standard way?",
    "termsKo": "",
    "cueKo": "시프트 클릭하세요 · 잡으려면 · 전부를 · 사이에 있는"
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
    "exampleKo": "커맨드 클릭하면 선택에 추가돼요.",
    "questionEn": "Range selection works, but how do I add one more item that's not adjacent to it?",
    "termsKo": "",
    "cueKo": "커맨드 클릭하세요 · 추가하려면 · 그것을 · 선택에"
  },
  {
    "key": "ui:clear-selection",
    "en": "clear selection",
    "ko": "선택 초기화",
    "example": "Click on empty space to clear the selection.",
    "situations": [
      "선택을 한 번에 모두 푸는 동작",
      "빈 곳 클릭 시 선택 해제",
      "Esc 키로 선택 초기화할 때"
    ],
    "detail": "선택된 걸 전부 한 번에 해제한다는 뜻이에요. 'deselect'가 항목 하나를 빼는 느낌이라면 clear selection은 싹 비우는 쪽이라, 'Esc clears the selection' 같은 식으로 키보드/빈 공간 클릭 동작을 정의할 때 나와요. 다중 선택 UI 만들 때 '뭘 누르면 선택이 풀리는가'를 안 정해두면 QA에서 꼭 걸리니까, 스펙 단계에서 이 표현으로 먼저 못 박아두는 게 좋아요.",
    "exampleKo": "빈 공간을 클릭하면 선택이 해제돼요.",
    "questionEn": "I've got ten rows highlighted — what should happen when I click the empty area below the table?",
    "termsKo": "",
    "cueKo": "클릭하세요 · 빈 공간을 · 해제하려면 · 선택을"
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
    "exampleKo": "카드를 다른 컬럼으로 드래그할 수 있어요.",
    "questionEn": "How does the user move a task card from one column to another on the board?",
    "termsKo": "",
    "cueKo": "당신은 · 드래그할 수 있어요 · 그 카드를 · 다른 컬럼으로"
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
    "exampleKo": "리스트 순서를 바꿀 수 있게 드래그 앤 드롭을 추가했어요.",
    "questionEn": "Reordering with the little up and down arrows feels clunky — what interaction would you build instead?",
    "termsKo": "",
    "cueKo": "우리는 · 추가했어요 · 드래그 앤 드롭을 · 순서 바꾸려고 · 그 리스트의"
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
    "exampleKo": "행을 드래그해서 순서를 바꿀 수 있어요.",
    "questionEn": "Users want their favorite playlists at the top, but the list is stuck in the order they were created — ideas?",
    "termsKo": "",
    "cueKo": "드래그하세요 · 그 행들을 · 순서를 바꾸려면 · 그것들의"
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
    "exampleKo": "드래그 핸들을 잡았을 때만 드래그가 시작돼요.",
    "questionEn": "When users try to select text in a row, they accidentally start moving the whole thing — how do we fix that?",
    "termsKo": "행 전체가 아니라 ⋮⋮ 같은 작은 손잡이 아이콘에서만 드래그가 시작되게 하는 패턴. 텍스트 선택·스크롤과의 충돌을 막아줌.",
    "cueKo": "오직 · 드래그 핸들만 · 시작해요 · 드래그를"
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
    "exampleKo": "놓으면 제자리에 딱 들어가요.",
    "questionEn": "When I drop the card between two columns, it just stays where I let go — is that right?",
    "termsKo": "드롭하면 가장 가까운 정렬 위치로 자석처럼 끌려가 맞춰지는 동작. 카드가 어중간한 위치에 떠 있지 않게 해줌.",
    "cueKo": "놓는 순간 · 그게 · 딱 들어가요 · 제자리에"
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
    "exampleKo": "호버 상태에서는 배경색이 바뀌어요.",
    "questionEn": "How can desktop users tell a card is interactive before they actually click it?",
    "termsKo": "마우스 포인터를 요소 위에 올렸을 때의 시각적 상태(CSS :hover). 터치 기기에는 없다는 점 주의.",
    "cueKo": "호버 상태가 · 바꿔요 · 배경을"
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
    "exampleKo": "포커스 상태에는 눈에 잘 보이는 링이 필요해요.",
    "questionEn": "Keyboard users say they can't tell which element they're currently on — what's missing?",
    "termsKo": "키보드 탐색 시 현재 입력을 받는 요소의 상태(CSS :focus). 접근성을 위해 눈에 띄는 링 표시가 필요.",
    "cueKo": "포커스 상태는 · 필요해요 · 눈에 보이는 링이"
  },
  {
    "key": "ui:disabled-state",
    "en": "disabled state",
    "ko": "비활성 상태",
    "example": "Keep the button disabled until the form is valid.",
    "situations": [
      "조건 미충족 시 버튼 비활성",
      "회색 처리하고 클릭 막을 때",
      "폼 검증 전 제출 막기"
    ],
    "detail": "버튼이 회색으로 죽어 있는 그 상태예요. 폼 유효성 논의에서 'keep it disabled until the form is valid'처럼 활성화 조건을 정할 때 나오죠. 다만 UX 쪽에서 단골 논쟁거리가 하나 있는데, disabled 버튼은 '왜 안 되는지'를 사용자에게 알려주지 않아서 차라리 활성화해두고 클릭 시 에러를 보여주자는 의견도 강해요. 인터뷰에서 이 트레이드오프를 먼저 꺼내면 시니어다운 답변이 됩니다.",
    "exampleKo": "유효해질 때까지 버튼은 비활성 상태로 둬요.",
    "questionEn": "The form isn't valid yet, but the submit button still looks clickable — what should we do?",
    "termsKo": "",
    "cueKo": "유지하세요 · 그 버튼을 · 비활성으로 · 유효해질 때까지"
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
    "exampleKo": "로딩 상태에는 스피너를 보여주세요.",
    "questionEn": "After hitting search, the screen just sits blank for two seconds — what's missing there?",
    "termsKo": "",
    "cueKo": "보여주세요 · 스피너를 · 로딩 상태에서는"
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
    "exampleKo": "엠티 스테이트에는 친근한 안내 문구가 들어가야 해요.",
    "questionEn": "What should a brand-new user see on the dashboard before they've created anything?",
    "termsKo": "데이터가 하나도 없을 때 보여주는 화면. 휑하게 두지 말고 안내 문구와 시작 버튼으로 첫 행동을 유도하는 게 관례.",
    "cueKo": "엠티 스테이트는 · 필요해요 · 친근한 안내 문구가"
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
    "exampleKo": "이 스위치로 다크 모드를 켜고 꺼요.",
    "questionEn": "What does this switch in settings actually do when the user flips it?",
    "termsKo": "",
    "cueKo": "이 스위치가 · 토글해요 · 다크 모드를"
  },
  {
    "key": "ui:expand-collapse",
    "en": "expand/collapse",
    "ko": "펼치기/접기",
    "example": "Click the header to expand or collapse the section.",
    "situations": [
      "아코디언 펼치고 접을 때",
      "트리 노드 확장 동작",
      "상세 영역 토글 논의"
    ],
    "detail": "아코디언이나 트리 뷰의 펼치기/접기를 가리키는 표준 동사 쌍이에요. open/close라고 해도 통하긴 하지만, 인라인으로 늘어났다 줄어드는 인터랙션엔 expand/collapse가 더 정확하고 프로페셔널하게 들려요. 사이드바 트리 메뉴 스펙 정리할 때 'clicking the chevron expands the node'처럼 나오죠. collapse는 '붕괴하다'라는 뜻도 있어서 처음엔 어색할 수 있는데, UI 문맥에선 그냥 '접힌다'로 굳어진 말입니다.",
    "exampleKo": "헤더를 클릭하면 펼쳐지거나 접혀요.",
    "questionEn": "These FAQ sections are long — how does the user open one and close it again?",
    "termsKo": "",
    "cueKo": "클릭하세요 · 헤더를 · 펼치거나 접으려면"
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
    "exampleKo": "선택된 항목이 보이도록 스크롤해 주세요.",
    "questionEn": "Keyboard navigation moved the selection past the visible area — what should the list do then?",
    "termsKo": "선택된 요소가 화면 밖에 있을 때 자동으로 보이는 위치까지 스크롤해 주는 처리(브라우저 scrollIntoView API).",
    "cueKo": "스크롤하세요 · 선택된 항목을 · 보이는 곳까지"
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
    "exampleKo": "스크롤할 때 헤더가 상단에 고정되게 해주세요.",
    "questionEn": "Users lose the column headers once they're deep in a long table — any fix?",
    "termsKo": "CSS position: sticky — 평소엔 문서 흐름대로 있다가 스크롤이 임계점에 닿으면 화면에 붙어 고정되는 속성.",
    "cueKo": "만드세요 · 헤더를 · 고정되게 · 스크롤할 때"
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
    "exampleKo": "컬럼을 왼쪽에 고정할 수 있어요.",
    "questionEn": "Thirty columns here, but people always want the name column visible while they scroll sideways — ideas?",
    "termsKo": "",
    "cueKo": "당신은 · 고정할 수 있어요 · 컬럼을 · 왼쪽에"
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
    "exampleKo": "바깥을 탭하면 모달이 닫혀요.",
    "questionEn": "The modal has no close button — how should users get rid of it?",
    "termsKo": "",
    "cueKo": "탭하세요 · 바깥을 · 닫으려면 · 모달을"
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
    "exampleKo": "검색 입력에 300ms 디바운스를 걸어요.",
    "questionEn": "The search box fires an API call on every keystroke and hammers the backend — what would you do?",
    "termsKo": "디바운스: 입력이 연달아 들어오는 동안엔 기다렸다가, 입력이 멈추고 일정 시간(예: 300ms) 지나면 마지막 한 번만 실행하는 기법.",
    "cueKo": "디바운스하세요 · 검색 입력을 · 300ms로"
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
    "exampleKo": "스크롤 핸들러에 스로틀을 걸어서 호출 빈도를 줄여요.",
    "questionEn": "Our scroll handler fires hundreds of times a second and the page janks — how do we calm it down?",
    "termsKo": "스로틀: 아무리 자주 호출돼도 일정 주기(예: 100ms당 1회)로만 실행을 허용. 디바운스와 달리 진행 중에도 주기적으로 실행됨.",
    "cueKo": "스로틀하세요 · 스크롤 핸들러를 · 그래서 덜 실행되게"
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
    "exampleKo": "그 상태 변경 하나로 리스트 전체가 리렌더링돼요.",
    "questionEn": "Typing one character in this input makes the entire page feel sluggish — what's probably happening in React?",
    "termsKo": "리렌더: state나 props가 바뀌면 React가 컴포넌트 함수를 다시 실행해 화면을 다시 그리는 것. 범위가 넓으면 성능 저하.",
    "cueKo": "그 상태 변경이 · 리렌더링해요 · 리스트 전체를"
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
    "detail": "컴포넌트가 화면에 처음 붙는 게 mount, 떨어져 나가는 게 unmount예요. '장착하다'라는 직역 그대로의 이미지고, 'fetch on mount'(마운트 시 데이터 요청)처럼 시점을 가리키는 부사구로 굳어져 있어요. useEffect의 실행/클린업 타이밍 설명할 때 자연스럽게 나오는 말이죠. 단골 함정 하나: unmount된 뒤에 도착한 응답으로 setState를 쳐도 화면엔 반영되지 않고 헛수고만 남으니(React 17까지는 경고도 떴어요), 클린업에서 요청을 abort하거나 플래그로 막아야 한다는 이야기가 이 어휘와 같이 따라다녀요.",
    "exampleKo": "컴포넌트가 마운트될 때 데이터를 가져와요.",
    "questionEn": "At what point in this component's lifecycle should we kick off the data fetch?",
    "termsKo": "마운트/언마운트: 컴포넌트가 DOM에 처음 붙는/떨어지는 시점. 보통 마운트 때 fetch, 언마운트 때 타이머·구독 정리.",
    "cueKo": "가져오세요 · 데이터를 · 컴포넌트가 · 마운트될 때"
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
    "exampleKo": "클릭 이벤트가 부모로 버블링돼요.",
    "questionEn": "I clicked the delete icon inside the row, but the row's own handler fired too — why?",
    "termsKo": "이벤트 버블링: DOM 이벤트가 발생한 요소에서 부모 쪽으로 거품 떠오르듯 차례로 전파되는 것.",
    "cueKo": "그 클릭이 · 버블링돼요 · 부모로"
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
    "exampleKo": "전파를 막아서 클릭이 행 핸들러까지 안 가게 해요.",
    "questionEn": "Clicking the button inside the card also triggers the card's handler — how do we keep the card out of it?",
    "termsKo": "stopPropagation(): 이벤트가 부모로 더 올라가지 않게 전파를 끊는 메서드. 버블링을 차단.",
    "cueKo": "막으세요 · 전파를 · 그래서 행이 · 무시하게 · 그것을"
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
    "exampleKo": "기본 동작을 막아서 폼이 제출되지 않게 해요.",
    "questionEn": "We handle Enter ourselves in this form, but the whole page still reloads — what are we missing?",
    "termsKo": "preventDefault(): 폼 제출·링크 이동 같은 브라우저 기본 동작을 막는 메서드. 전파 차단(stopPropagation)과는 별개.",
    "cueKo": "막으세요 · 기본 동작을 · 멈추려면 · 폼 제출을"
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
    "exampleKo": "상태에 연결된 컨트롤드 인풋으로 만들어 주세요.",
    "questionEn": "This text field keeps its own value internally, so React never knows what's typed — how would you restructure it?",
    "termsKo": "제어 컴포넌트: input의 value를 React state로 들고 onChange로 갱신하는 패턴. 값의 단일 출처가 state가 됨.",
    "cueKo": "만드세요 · 그것을 · 컨트롤드 인풋으로 · 상태에 묶인"
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
    "exampleKo": "터치 영역이 너무 작아서 탭하기 힘들어요.",
    "questionEn": "On mobile, people keep missing this tiny close icon when they tap — what's wrong?",
    "termsKo": "히트 영역: 실제로 탭/클릭이 인식되는 범위. 아이콘 크기보다 넉넉하게(모바일 관례 약 44px) 잡아야 함.",
    "cueKo": "히트 영역이 · 너무 작아요 · 탭하기에"
  },
  {
    "key": "ui:keyboard-navigation",
    "en": "keyboard navigation",
    "ko": "키보드 탐색",
    "example": "Add keyboard navigation so the arrow keys move the selection.",
    "situations": [
      "방향키로 항목 이동",
      "탭/엔터로 조작할 때",
      "접근성 키보드 지원 논의"
    ],
    "detail": "마우스 없이 Tab, 방향키, Enter만으로 UI를 돌아다니는 걸 말하고, 접근성 리뷰의 핵심 체크 항목이에요. 드롭다운이나 리스트 컴포넌트 PR에 'does it support keyboard navigation?'이라는 코멘트가 달리는 게 전형적인 장면이죠. 줄여서 'keyboard nav'라고도 해요. 관련 어휘로 tab order(탭 이동 순서), focus trap(모달 안에 포커스 가두기)이 세트로 따라다니는데, 북미 인터뷰에서 컴포넌트 설계 문제를 받으면 이걸 먼저 언급하는 것만으로 시니어 시그널이 됩니다.",
    "exampleKo": "방향키로 선택을 옮길 수 있어야 해요.",
    "questionEn": "How should this dropdown work for users who never touch the mouse?",
    "termsKo": "키보드 탐색: 마우스 없이 Tab·화살표 키만으로 UI를 조작하는 것. 접근성(a11y)의 기본 요건.",
    "cueKo": "방향키가 · 옮겨야 해요 · 선택을"
  },
  {
    "key": "ui:optimistic-update",
    "en": "optimistic update",
    "ko": "낙관적 업데이트",
    "example": "Do an optimistic update before the response comes back.",
    "situations": [
      "응답 전에 UI 먼저 반영",
      "좋아요 즉시 반영 후 롤백",
      "빠른 피드백 위한 처리"
    ],
    "detail": "서버 응답을 기다리지 않고 성공할 거라 '낙관하고' UI를 먼저 바꿔버리는 패턴이에요. 좋아요 버튼이 대표 사례죠 — 누르자마자 하트가 채워지고, 요청은 뒤에서 날아가요. 'do an optimistic update and roll back on failure'처럼 실패 시 롤백 전략과 한 문장으로 묶이는 게 보통이고, 롤백 얘기를 빼먹으면 반쪽짜리 답이 돼요. TanStack Query의 onMutate/onError 패턴 같은 구체 구현을 곁들이면 인터뷰에서 설득력이 확 올라갑니다.",
    "exampleKo": "응답이 오기 전에 낙관적 업데이트를 먼저 해요.",
    "questionEn": "Tapping like feels laggy because the heart only fills after the server responds — how would you fix it?",
    "termsKo": "낙관적 업데이트: 서버 응답을 기다리지 않고 성공했다 치고 UI를 먼저 바꾼 뒤, 실패하면 되돌리는 패턴. 체감 속도가 빨라짐.",
    "cueKo": "하세요 · 낙관적 업데이트를 · 응답 전에"
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
    "exampleKo": "모달이 열려 있는 동안 바디 스크롤을 잠가요.",
    "questionEn": "The modal is open, but the page behind it still moves when you swipe — is that expected?",
    "termsKo": "스크롤 잠금: 모달이 떠 있는 동안 뒤 배경(body)이 같이 스크롤되지 않게 막는 처리.",
    "cueKo": "잠그세요 · 바디 스크롤을 · 모달이 · 열려 있는 동안"
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
    "exampleKo": "재시도해도 이중 결제가 안 되게 이 엔드포인트를 멱등하게 만들어요.",
    "questionEn": "What happens if the client sends the same payment request twice because of a timeout?",
    "termsKo": "멱등성(idempotency): 같은 요청을 여러 번 보내도 결과가 한 번 실행한 것과 같은 성질. 결제·재시도 로직에서 중복 실행을 막는 핵심 개념.",
    "cueKo": "우리는 · 만든다 · 이 엔드포인트를 · 멱등하게 · 그래서 재시도들이 · 이중 결제 안 하게"
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
    "exampleKo": "헤더에 멱등 키를 넣어 보내주시면 저희 쪽에서 중복을 걸러낼게요.",
    "questionEn": "As a client of your API, what should we do so a retried request isn't charged again?",
    "termsKo": "멱등 키: 클라이언트가 요청마다 붙이는 고유 ID. 서버는 같은 키가 또 오면 새로 처리하지 않고 기존 결과를 돌려줘 중복을 막음.",
    "cueKo": "보내라 · 멱등 키를 · 헤더에 · 그러면 우리가 · 중복 제거할게"
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
    "exampleKo": "이건 분당 100건으로 레이트 리밋을 걸어요.",
    "questionEn": "What stops a single client from flooding this endpoint with thousands of calls?",
    "termsKo": "레이트 리밋: 단위 시간당 허용 요청 수를 제한해 남용과 과부하로부터 서버를 보호하는 기법.",
    "cueKo": "우리는 · 레이트 리밋 건다 · 이걸 · 분당 백 건으로"
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
    "exampleKo": "큰 테이블에는 오프셋 말고 커서 페이지네이션을 쓰죠.",
    "questionEn": "Deep pages on our users list get really slow as the data grows — what would you change?",
    "termsKo": "커서 페이지네이션: '몇 번째부터'(OFFSET) 대신 마지막으로 본 항목의 키를 기준으로 다음 페이지를 가져오는 방식. 앞부분을 다 건너뛰며 스캔하지 않아 큰 테이블에서 빠름.",
    "cueKo": "쓰자 · 커서 페이지네이션을 · 오프셋 대신 · 큰 테이블엔"
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
    "exampleKo": "구버전 클라이언트가 깨지지 않게 API에 버전을 둬요.",
    "questionEn": "We need to change this response format, but mobile apps in the wild still use it. How do you ship that?",
    "termsKo": "API 버저닝: /v1, /v2처럼 버전을 나눠 기존 클라이언트는 그대로 두고 새 변경을 도입하는 방법.",
    "cueKo": "우리는 · 버전을 매긴다 · API에 · 그래서 오래된 클라이언트들이 · 안 깨지게"
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
    "exampleKo": "이 변경은 하위 호환이라서 마이그레이션이 따로 필요 없어요.",
    "questionEn": "Will existing clients keep working after we deploy this change, or do we need extra steps?",
    "termsKo": "하위 호환(backward compatible): 새 버전이 옛 클라이언트·데이터를 그대로 받아주는 성질. 필드 추가는 보통 호환, 삭제·이름 변경은 비호환.",
    "cueKo": "이 변경은 · 하위 호환이다 · 그래서 마이그레이션이 · 필요 없다"
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
    "exampleKo": "이 두 쓰기 작업을 한 트랜잭션으로 감싸서 원자적으로 만들어요.",
    "questionEn": "What if the server crashes after debiting one account but before crediting the other?",
    "termsKo": "트랜잭션/원자성: 여러 DB 작업을 '전부 성공 아니면 전부 취소'인 한 단위로 묶는 것. 어중간한 중간 상태가 남지 않게 보장.",
    "cueKo": "감싸라 · 이 두 쓰기를 · 한 트랜잭션 안에 · 그래서 걔네가 · 원자적이 되게"
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
    "exampleKo": "더티 리드가 보이면 격리 수준을 한 단계 올리세요.",
    "questionEn": "My query sometimes returns data from another transaction that later gets rolled back — what's going on?",
    "termsKo": "격리 수준(isolation level): 동시에 도는 트랜잭션끼리 서로의 중간 상태를 얼마나 볼 수 있는지 정하는 설정. 더티 리드는 아직 커밋 안 된(롤백될 수 있는) 데이터를 읽는 현상.",
    "cueKo": "올려라 · 격리 수준을 · 만약 네가 보고 있다면 · 더티 리드를"
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
    "exampleKo": "여긴 충돌이 드무니까 낙관적 락을 쓰세요.",
    "questionEn": "Two users occasionally edit the same record — how do we handle simultaneous updates without slowing everyone down?",
    "termsKo": "낙관적 락: 미리 잠그지 않고 버전 번호로 충돌을 감지해, 저장 시점에 버전이 바뀌었으면 실패시키는 방식. 충돌이 드물 때 효율적.",
    "cueKo": "써라 · 낙관적 락을 · 여기엔 · 충돌은 · 드무니까"
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
    "exampleKo": "워커 두 대가 같은 행을 잡지 않게 비관적 락을 거세요.",
    "questionEn": "Our two background jobs keep processing the same record at the same time — how do we stop that?",
    "termsKo": "비관적 락: 읽는 시점에 행을 미리 잠가 다른 트랜잭션이 건드리지 못하게 하는 방식. 충돌이 잦을 때 사용.",
    "cueKo": "잡아라 · 비관적 락을 · 그래서 두 워커가 · 안 잡게 · 같은 행을"
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
    "exampleKo": "이 반복문에서 N+1 쿼리가 나가고 있어요.",
    "questionEn": "Why does loading this page of fifty orders hit the database fifty-one times?",
    "termsKo": "N+1 쿼리: 목록 1번 조회 후 항목마다 추가 쿼리가 N번 더 나가는 패턴. 조인이나 일괄 조회(IN 절, fetch join)로 해결.",
    "cueKo": "이 루프가 · 쏘고 있다 · N 플러스 1 쿼리를"
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
    "exampleKo": "부하가 걸리면 커넥션 풀이 한도까지 꽉 차요.",
    "questionEn": "During the traffic spike, requests started timing out waiting for the database — what did you find?",
    "termsKo": "커넥션 풀: DB 연결을 미리 만들어 재사용하는 묶음. 연결 생성 비용을 아끼지만, 풀이 꽉 차면 요청이 대기하거나 실패함.",
    "cueKo": "우리는 · 꽉 채우고 있다 · 커넥션 풀을 · 부하 상황에서"
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
    "exampleKo": "user_id에 인덱스 추가합시다. 풀스캔 때문에 죽을 지경이에요.",
    "questionEn": "Queries filtering by user take seconds even though we only need a few rows — what's your fix?",
    "termsKo": "인덱스: 특정 컬럼 기준으로 빨리 찾게 해주는 자료구조(책의 색인 같은 것). 없으면 테이블 전체를 읽는 풀 스캔이 일어남.",
    "cueKo": "추가해라 · 인덱스를 · user_id에 · 그 스캔이 · 죽이고 있다 · 우리를"
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
    "exampleKo": "쿼리 플랜 확인해 보세요. 인덱스를 안 타고 있어요.",
    "questionEn": "That lookup is still slow even after all my tuning — how do you see what the database is actually doing?",
    "termsKo": "쿼리 플랜(실행 계획): DB가 쿼리를 어떻게 실행할지(인덱스 사용 여부, 조인 순서 등) 보여주는 청사진. EXPLAIN 명령으로 확인.",
    "cueKo": "확인해라 · 쿼리 플랜을 · 그게 · 안 타고 있다 · 인덱스를"
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
    "exampleKo": "이 두 트랜잭션이 같은 행들을 놓고 데드락이 났어요.",
    "questionEn": "Both requests just hung, and then the database killed one of them — any idea why?",
    "termsKo": "데드락: 두 트랜잭션이 서로가 잡은 락을 기다리며 영원히 멈추는 상태. DB가 감지해서 한쪽을 강제 종료함.",
    "cueKo": "이 두 트랜잭션이 · 데드락 걸렸다 · 같은 행들에서"
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
    "exampleKo": "안전하게 마이그레이션은 별도 배포로 돌리세요.",
    "questionEn": "We're shipping the schema change and the code change together this afternoon — sound good?",
    "termsKo": "DB 마이그레이션: 스키마 변경을 코드처럼 버전 관리해 적용하는 것. 코드 배포와 분리하면 롤백과 장애 대응이 쉬워짐.",
    "cueKo": "돌려라 · 마이그레이션을 · 별도 배포로 · 안전하게 하려면"
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
    "exampleKo": "지금 읽기 복제본에 복제 지연이 좀 있어요.",
    "questionEn": "A user just saved their profile, but the page still shows the old data — what could cause that?",
    "termsKo": "읽기 복제본(read replica): 주 DB의 복사본으로 읽기 부하를 분산. 복제가 비동기라 최신 쓰기가 잠깐 늦게 반영되는 지연(lag)이 생길 수 있음.",
    "cueKo": "읽기 복제본이 · 갖고 있다 · 약간의 복제 지연을 · 지금"
  },
  {
    "key": "be:we-use-cache-aside-so-the-app-loads-and-",
    "en": "We use cache-aside, so the app loads and fills the cache.",
    "ko": "캐시 어사이드라 앱이 읽어서 캐시를 채워요.",
    "example": "We use cache-aside, so on a miss the app loads from the database and fills the cache.",
    "situations": [
      "캐시 패턴 선택 논의",
      "Redis 도입 설계할 때"
    ],
    "detail": "캐시 패턴 이름을 대고 곧바로 so 뒤에 한 줄로 풀어 설명하는 구조라, 면접에서 용어만 던지고 끝내는 사람과 차별화되는 화법이에요. cache-aside(=lazy loading)는 캐시 미스 때 앱이 직접 DB에서 읽어 캐시에 채워 넣는 방식이고, 시스템 디자인에서 '캐싱 전략 뭐 쓸래?' 질문에 첫 번째로 나오는 답이에요. read-through(캐시 라이브러리가 알아서 DB까지 갔다 옴)와 헷갈리기 쉬운데, 차이는 '누가 DB에 가냐' — cache-aside는 앱이, read-through는 캐시가 가요.",
    "exampleKo": "캐시 어사이드 방식이라서, 앱이 직접 데이터를 읽어와 캐시를 채워요.",
    "questionEn": "When the data isn't in Redis yet, who's responsible for putting it there?",
    "termsKo": "캐시 어사이드: 앱이 먼저 캐시를 보고, 없으면 DB에서 읽어 캐시에 직접 채워 넣는 패턴. 캐시는 수동적인 저장소 역할만 함.",
    "cueKo": "우리는 · 쓴다 · 캐시-어사이드를 · 그래서 앱이 · 로드하고 · 채운다 · 캐시를"
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
    "exampleKo": "캐시가 신선하게 유지되도록 TTL을 짧게 잡으세요.",
    "questionEn": "Users complain they sometimes see prices that changed an hour ago — what's the simplest fix?",
    "termsKo": "TTL(Time To Live): 캐시 항목이 자동 만료되기까지의 수명. 짧을수록 데이터는 신선하지만 캐시 적중률은 떨어짐.",
    "cueKo": "설정해라 · 짧은 TTL을 · 그래서 캐시가 · 신선하게 유지되게"
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
    "exampleKo": "유저가 수정하면 해당 캐시 키를 무효화해요.",
    "questionEn": "After someone edits their profile, how do you make sure stale data isn't served from Redis?",
    "termsKo": "캐시 무효화: 원본 데이터가 바뀌면 해당 캐시 항목을 지워서 오래된 값이 나가지 않게 하는 것.",
    "cueKo": "유저가 업데이트하면 · 우리는 · 무효화한다 · 그 캐시 키를"
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
    "exampleKo": "그 키가 만료될 때 캐시 스탬피드가 저희를 덮쳤어요.",
    "questionEn": "Right when that popular item's entry timed out, the database got slammed with identical queries — what happened there?",
    "termsKo": "캐시 스탬피드: 인기 키가 만료되는 순간 수많은 요청이 동시에 DB로 몰려 같은 값을 다시 계산하는 폭주. 락이나 만료 시점 분산으로 방지.",
    "cueKo": "캐시 스탬피드가 · 덮쳤다 · 우리를 · 그 키가 만료됐을 때"
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
    "exampleKo": "작업을 큐에 넣고 비동기로 처리해요.",
    "questionEn": "Sending the welcome email inside the signup request makes it slow — how would you restructure that?",
    "termsKo": "메시지 큐/비동기 처리: 느린 작업은 큐에 넣고 응답은 바로 반환, 워커가 나중에 처리. 응답 속도와 안정성을 확보.",
    "cueKo": "우리는 · 밀어 넣는다 · 그 작업을 · 큐에 · 그리고 처리한다 · 그걸 · 비동기로"
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
    "exampleKo": "다른 서비스들이 펍/섭으로 이 이벤트를 구독해요.",
    "questionEn": "When an order is placed, how do the inventory and notification systems find out about it?",
    "termsKo": "펍/섭(pub/sub): 발행자가 이벤트를 한 번 발행하면 구독자들이 각자 받아가는 메시징 패턴. 서비스 간 결합도를 낮춤.",
    "cueKo": "다른 서비스들이 · 구독한다 · 이 이벤트를 · 펍/섭으로"
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
    "exampleKo": "실패한 메시지들은 데드레터 큐로 들어가요.",
    "questionEn": "If the consumer keeps choking on one item even after every retry, where does it end up?",
    "termsKo": "데드레터 큐(DLQ): 계속 실패한 메시지를 따로 모아두는 큐. 본 큐가 막히는 걸 막고, 나중에 원인 분석과 재처리가 가능.",
    "cueKo": "실패한 메시지들은 · 떨어진다 · 데드레터 큐에"
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
    "exampleKo": "전달 보장이 최소 한 번이니까, 핸들러를 멱등하게 만드세요.",
    "questionEn": "The broker sometimes hands us the same message twice — is that a bug we should fix?",
    "termsKo": "최소 1회 전달(at-least-once): 메시지 유실은 막지만 중복 전달은 허용하는 보장 수준. 그래서 받는 쪽이 중복 처리를 견뎌야 함.",
    "cueKo": "전달은 · 최소 한 번이다 · 그러니 만들어라 · 핸들러를 · 멱등하게"
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
    "exampleKo": "진짜 '정확히 한 번'은 어려워서, 중복 제거로 비슷하게 흉내 내요.",
    "questionEn": "Can your pipeline guarantee each message gets processed one single time — no more, no less?",
    "termsKo": "정확히 1회(exactly-once): 메시지가 딱 한 번만 처리되는 보장. 분산 환경에선 진짜 구현이 매우 어려워 보통 '최소 1회 + 중복 제거'로 흉내 냄.",
    "cueKo": "진짜 정확히-한-번은 · 어렵다 · 우리는 · 흉내 낸다 · 그걸 · 중복 제거로"
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
    "exampleKo": "컨슈머 랙이 계속 올라가고 있어요. 워커가 더 필요해요.",
    "questionEn": "The queue keeps getting longer and messages sit there for minutes — what's your read on it?",
    "termsKo": "컨슈머 랙: 아직 소비되지 못하고 쌓여 있는 메시지 양(가장 최신 메시지와 컨슈머가 처리한 위치의 차이). 랙이 계속 커지면 처리 지연이 늘어 컨슈머 증설이나 처리 속도 개선이 필요.",
    "cueKo": "컨슈머 랙이 · 치솟고 있다 · 우리는 · 필요하다 · 더 많은 워커가"
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
    "exampleKo": "실패하면 최대 세 번까지 그 호출을 재시도해요.",
    "questionEn": "What does your client do when the downstream service returns a 500?",
    "termsKo": "",
    "cueKo": "우리는 · 재시도한다 · 그 호출을 · 최대 세 번까지 · 실패 시"
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
    "exampleKo": "서비스를 마구 두들기지 않게 지수 백오프를 쓰세요.",
    "questionEn": "If we just try again immediately every time it fails, won't we make the outage worse?",
    "termsKo": "지수 백오프: 재시도 간격을 1초→2초→4초처럼 배로 늘리는 전략. 장애 중인 서비스에 부하를 더 얹지 않기 위해 사용.",
    "cueKo": "써라 · 지수 백오프를 · 그래서 우리가 · 두들기지 않게 · 그 서비스를"
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
    "exampleKo": "서킷 브레이커가 떨어지면 그쪽 호출을 멈춰요.",
    "questionEn": "The payment provider has been down for ten minutes — should we keep sending every request its way?",
    "termsKo": "서킷 브레이커: 실패율이 임계치를 넘으면 회로가 '열려' 호출 자체를 차단하는 패턴. 두꺼비집처럼 장애 전파를 끊고 회복할 시간을 줌.",
    "cueKo": "서킷 브레이커가 · 차단되고 · 우리는 · 멈춘다 · 그걸 호출하기를"
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
    "exampleKo": "느린 호출이 쌓이지 않게 타임아웃을 빡빡하게 잡으세요.",
    "questionEn": "When that dependency gets sluggish, all our threads end up stuck waiting on it — how do you prevent that?",
    "termsKo": "타임아웃: 응답을 기다리는 최대 시간. 짧게 잡으면 느린 의존성이 스레드·커넥션을 계속 점유해 연쇄 장애로 번지는 걸 막음.",
    "cueKo": "설정해라 · 빡빡한 타임아웃을 · 그래서 느린 호출들이 · 안 쌓이게"
  },
  {
    "key": "be:if-search-is-down-we-degrade-gracefully-",
    "en": "If search is down, we degrade gracefully and hide it.",
    "ko": "검색 죽으면 우아하게 기능을 낮춰서 숨겨요.",
    "example": "If search is down, we degrade gracefully and hide it.",
    "situations": [
      "부분 장애 UX 설계",
      "핵심 기능만 살릴 때"
    ],
    "detail": "degrade gracefully는 '곱게 무너진다', 즉 일부 기능이 죽어도 전체 서비스는 굴러가게 한다는 가용성 설계의 핵심 표현이에요. graceful degradation이라는 명사형도 같이 알아두세요. 검색 서비스 장애 때 500 페이지를 보여주는 대신 검색창만 숨기고 나머지는 정상 제공했다는 장애 대응 경험담 장면이에요. and hide it처럼 '구체적으로 뭘 했는지'가 따라붙어야 진짜 경험으로 들려요 — degrade gracefully만 던지고 끝내면 교과서 암송처럼 들릴 수 있어요.",
    "exampleKo": "검색이 죽으면 우아하게 기능을 낮춰서 그냥 숨겨버려요.",
    "questionEn": "What happens to the rest of the page when one optional backend feature stops working?",
    "termsKo": "우아한 성능 저하(graceful degradation): 일부 기능이 죽어도 전체 서비스는 핵심 기능 위주로 계속 동작하게 설계하는 것.",
    "cueKo": "만약 검색이 죽으면 · 우리는 · 우아하게 기능을 낮추고 · 숨긴다 · 그걸"
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
    "exampleKo": "덜 중요한 검사들은 페일 오픈으로 그냥 통과시켜요.",
    "questionEn": "If the spam filter itself times out, do we reject the user's post or allow it?",
    "termsKo": "페일 오픈: 검사 시스템이 장애일 때 일단 통과시키는 정책. 안전성보다 가용성을 우선할 때 사용.",
    "cueKo": "비핵심 체크들엔 · 우리는 · 페일 오픈하고 · 통과시킨다 · 그걸"
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
    "exampleKo": "인증은 페일 클로즈드로 가서 요청을 차단해요.",
    "questionEn": "If the login token service itself is unreachable, do we still let people in?",
    "termsKo": "페일 클로즈드: 검사 시스템이 장애일 때 기본적으로 거부하는 정책. 인증·보안처럼 안전이 우선일 때 사용.",
    "cueKo": "인증에는 · 우리는 · 페일 클로즈드하고 · 막는다 · 그 요청을"
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
    "exampleKo": "이벤트 하나가 다운스트림 서비스 다섯 개로 팬아웃돼요.",
    "questionEn": "When a user signs up, how many other systems end up reacting to that single action?",
    "termsKo": "팬아웃: 하나의 이벤트나 요청이 여러 하위 시스템으로 동시에 퍼져나가는 구조. 받는 쪽이 늘수록 부하와 실패 지점도 늘어남.",
    "cueKo": "하나의 이벤트가 · 퍼져 나간다 · 다섯 개의 다운스트림 서비스로"
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
    "exampleKo": "중복 제거의 안전망으로 유니크 제약을 추가했어요.",
    "questionEn": "Even with the application checks, the same row keeps getting inserted twice — how do you stop that for good?",
    "termsKo": "유니크 제약: DB가 컬럼 값의 중복을 원천 차단하는 제약 조건. 앱 로직이 놓쳐도 DB 레벨에서 마지막 방어선이 됨.",
    "cueKo": "우리는 · 추가했다 · 유니크 제약을 · 안전망으로 · 중복 제거를 위한"
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
    "exampleKo": "왕복 횟수를 줄이게 이 호출들을 배치로 묶죠.",
    "questionEn": "We're calling that API once per item, two hundred times in a row — any way to speed this up?",
    "termsKo": "배칭: 여러 건의 요청을 한 번에 묶어 보내는 것. 네트워크 왕복 횟수를 줄여 지연을 크게 낮춤.",
    "cueKo": "묶자 · 이 호출들을 · 줄이려고 · 왕복 횟수를"
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
    "exampleKo": "뭘 그리기 전에 요구사항부터 짚고 시작하죠.",
    "questionEn": "Okay, design Twitter for me. The whiteboard is yours — how do you want to begin?",
    "termsKo": "",
    "cueKo": "시작하죠 · 요구사항부터 · 우리가 뭐라도 그리기 전에"
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
    "exampleKo": "지금 나열하는 게 기능 요구사항인가요, 비기능 요구사항인가요?",
    "questionEn": "I jotted down: users post photos, feed loads in 200ms, 99.9% uptime. Anything you'd ask about this list?",
    "termsKo": "기능 요구사항은 시스템이 '무엇을 하는지'(예: 글 작성), 비기능 요구사항은 '얼마나 잘 하는지'(지연시간·가용성 같은 품질 속성)다.",
    "cueKo": "이것들은 ~인가요 · 기능 아니면 비기능 · 요구사항들 · 우리가 지금 나열하는?"
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
    "exampleKo": "큰 그림으로 보면, 캐시 얹은 읽기 위주 시스템일 뿐이에요.",
    "questionEn": "Before we dive into details, can you summarize the whole architecture in a sentence or two?",
    "termsKo": "",
    "cueKo": "큰 그림으로 보면 · 그건 · 그냥 읽기 위주예요 · 캐시 하나 얹어서"
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
    "exampleKo": "규모부터 확실히 못박고, 그다음에 스토리지를 고르죠.",
    "questionEn": "So which database should we go with here — Postgres, or something like Cassandra?",
    "termsKo": "용량 산정(capacity estimation): DAU·QPS·저장량을 먼저 추정해서 DB와 아키텍처 선택의 근거로 삼는 단계.",
    "cueKo": "확정하죠 · 규모를 · 먼저 · 그다음 고르죠 · 스토리지를"
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
    "exampleKo": "컴포넌트들을 먼저 펼쳐놓고, 그다음에 연결해보죠.",
    "questionEn": "Okay, the numbers check out. What does your overall design look like? Walk me through it.",
    "termsKo": "",
    "cueKo": "제가 · 펼쳐놓을게요 · 컴포넌트들을 · 그다음 우리가 · 연결하죠 · 그것들을"
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
    "exampleKo": "범위를 핵심 피드 흐름으로 좁혀볼게요.",
    "questionEn": "Design Instagram end to end — feed, stories, messaging, notifications. We only have about thirty-five minutes.",
    "termsKo": "",
    "cueKo": "제가 · 범위를 좁힐게요 · 이걸 · 핵심 피드 흐름으로"
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
    "exampleKo": "여기 읽기 대 쓰기 비율이 어떻게 되나요? 거의 읽기인가요?",
    "questionEn": "It's a news feed service. Any questions about the traffic pattern before you pick the storage?",
    "termsKo": "읽기/쓰기 비율: 트래픽에서 조회와 갱신이 차지하는 비중. 읽기 위주면 캐시·리플리카, 쓰기 위주면 큐·샤딩 쪽으로 설계가 갈린다.",
    "cueKo": "뭔가요 · 읽기 대 쓰기 비율이 · 여기서 · 대부분 읽기인가요?"
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
    "exampleKo": "그러면 피크 때 대충 초당 천 건 정도네요.",
    "questionEn": "Ten million daily users, each opening the app a few times — what does that come to at peak?",
    "termsKo": "RPS/QPS(초당 요청 수): 시스템이 감당해야 할 부하의 기본 단위. 보통 DAU에서 역산해 추정한다.",
    "cueKo": "그러니까 · 대략 · 천 개 요청 · 초당 · 피크 때"
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
    "exampleKo": "그러면 하루 10기가쯤이니까, 감당할 만하네요.",
    "questionEn": "Each post is around ten kilobytes and we expect a million posts daily — how much data piles up?",
    "termsKo": "",
    "cueKo": "그건 · 약 10기가예요 · 하루에 · 그러니 감당할 만하죠"
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
    "exampleKo": "5년치 기준으로 스토리지를 대충 잡아보죠.",
    "questionEn": "Traffic numbers are done. Anything else you'd want to size before we pick a database?",
    "termsKo": "",
    "cueKo": "어림잡아 보죠 · 스토리지를 · 5년 뒤까지 내다보고"
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
    "exampleKo": "계산해볼게요. 유저 백만 명 곱하기 10KB니까...",
    "questionEn": "A million users, each with about ten kilobytes of data — would a single server handle that?",
    "termsKo": "",
    "cueKo": "제가 · 해볼게요 · 그 계산을 · 백만 유저 · 곱하기 · 10KB"
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
    "exampleKo": "한 2테라바이트 정도요, 오차는 좀 있고요.",
    "questionEn": "So what's the total after five years — what number should I write down?",
    "termsKo": "",
    "cueKo": "약 2테라바이트 · 오차는 좀 있고"
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
    "exampleKo": "여유 있게 100으로 올려 잡죠.",
    "questionEn": "The calculation says exactly eighty-seven servers. Should we provision precisely that many?",
    "termsKo": "헤드룸(headroom): 피크 트래픽이나 추정 오차에 대비해 일부러 남겨두는 여유 용량.",
    "cueKo": "올림하죠 · 100으로 · 여유분 삼아"
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
    "exampleKo": "이 서버들 앞단에 로드밸런서를 둘 거예요.",
    "questionEn": "You've got several app servers now — how does incoming traffic get spread across them?",
    "termsKo": "로드밸런서: 들어오는 요청을 여러 서버에 분산하는 장치. 한 대 과부하를 막고, 장애 난 서버를 우회하게 해준다.",
    "cueKo": "우리는 · 둘 거예요 · 로드밸런서를 · 이것들 앞에"
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
    "exampleKo": "여기 캐시 레이어를 추가해서 읽기 부하를 덜어내죠.",
    "questionEn": "The database keeps getting hammered by the same popular queries over and over. What would you change?",
    "termsKo": "캐시: 자주 읽는 데이터를 메모리(예: Redis)에 복사해 두고 DB 대신 거기서 읽어 부하와 지연을 줄이는 것.",
    "cueKo": "추가해라 · 캐시 레이어를 · 여기에 · 읽기 압력을 덜어내게"
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
    "exampleKo": "읽기 경로엔 리드 리플리카 하나 두고, 쓰기는 프라이머리로 보내요.",
    "questionEn": "Our single Postgres can't keep up with all the SELECT traffic anymore. What's your move?",
    "termsKo": "리드 리플리카: 프라이머리 DB를 복제한 읽기 전용 사본. 조회는 리플리카로, 쓰기만 프라이머리로 보내 읽기 부하를 분산한다.",
    "cueKo": "읽기 레플리카 하나 · 읽기 경로용으로 · 쓰기는 · 때린다 · 프라이머리를"
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
    "exampleKo": "중간에 큐 하나 끼워 넣어서 스파이크를 흡수시키죠.",
    "questionEn": "Every Black Friday the order service slams the payment service and it falls over. Ideas?",
    "termsKo": "메시지 큐: 생산자와 소비자 사이의 버퍼. 트래픽 스파이크를 일단 받아뒀다가 소비자가 자기 속도로 처리하게 해준다.",
    "cueKo": "던져 넣어라 · 큐를 · 그 사이에 · 스파이크를 흡수하게"
  },
  {
    "key": "sd:let-s-decouple-these-two",
    "en": "Let's decouple these two",
    "ko": "이 둘을 분리하자",
    "example": "Let's decouple these two with an event bus.",
    "situations": [
      "서비스 간 의존을 끊을 때",
      "비동기 처리로 묶음을 풀 때"
    ],
    "detail": "두 컴포넌트가 서로 직접 호출하며 묶여 있는 걸 떼어내자는 말로, 마이크로서비스·이벤트 기반 설계 논의의 핵심 단어예요. 단순히 separate(분리)가 아니라 '한쪽이 죽거나 느려져도 다른 쪽이 안 끌려가게 의존성을 끊는다'는 공학적 의도가 담겨 있습니다. 주문 서비스와 알림 서비스 사이에 이벤트를 끼울 때 같은 장면에서 나오죠. 반대말 tightly coupled(강결합)와 세트로 기억하면 트레이드오프 설명할 때 편해요.",
    "exampleKo": "이 둘은 이벤트로 분리(디커플링)하죠.",
    "questionEn": "The upload service calls the thumbnail service directly, so when one goes down, both fail. How would you fix that?",
    "termsKo": "디커플링: 컴포넌트 간 직접 호출을 끊고 이벤트/큐로 느슨하게 연결해, 한쪽 장애가 다른 쪽으로 번지지 않게 하는 것.",
    "cueKo": "분리하죠 · 이 둘을 · 이벤트 하나로"
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
    "exampleKo": "정적 자원 앞엔 CDN을 두죠. 주로 이미지요.",
    "questionEn": "Users in Europe say our images load painfully slowly — all our servers are in Virginia. What would you do?",
    "termsKo": "CDN: 이미지·JS 같은 정적 파일을 전 세계 엣지 서버에 복사해 두고, 사용자와 가까운 곳에서 내려주는 네트워크.",
    "cueKo": "두어라 · CDN을 · 정적 자산 앞에 · 주로 이미지요"
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
    "exampleKo": "부하 분산을 위해 유저 아이디 기준으로 샤딩할 거예요.",
    "questionEn": "This table is ten terabytes now and one database can't hold it. What do you do with the data?",
    "termsKo": "샤딩: 데이터를 키(예: user id) 기준으로 여러 DB에 나눠 저장하는 수평 분할. 한 장비의 용량·처리 한계를 넘기 위해 쓴다.",
    "cueKo": "우리는 · 샤딩할 거예요 · 유저 ID 기준으로 · 부하를 퍼뜨리려고"
  },
  {
    "key": "sd:denormalize-for-read-speed",
    "en": "Denormalize for read speed",
    "ko": "읽기 속도 위해 비정규화하자",
    "example": "Denormalize for read speed, we just live with the dupes.",
    "situations": [
      "조인 비용을 없애려 할 때",
      "읽기 최적화로 데이터 중복 감수할 때"
    ],
    "detail": "정규화 원칙을 일부러 깨고 데이터를 중복 저장해서 조인 없이 빠르게 읽자는 말이에요. 'for read speed'를 붙여서 위반의 이유를 명시하는 게 포인트 — 교과서를 몰라서가 아니라 알고도 트레이드오프로 선택했다는 어필이죠. 피드 시스템에서 작성자 이름을 게시물 레코드에 박아 넣는 결정 같은 장면에서 나옵니다. 예문의 \"we eat the dupes\"는 '중복은 감수한다'는 구어체로, eat이 '비용을 떠안다'는 뜻으로 쓰인 것도 같이 익혀두세요.",
    "exampleKo": "읽기 속도를 위해 비정규화하고, 중복은 감수해요.",
    "questionEn": "Every feed request joins five tables and it's slow. Would you change the schema?",
    "termsKo": "비정규화: 조인을 줄이려고 데이터를 일부러 중복 저장하는 것. 읽기는 빨라지지만 갱신 때 중복본을 같이 관리해야 한다.",
    "cueKo": "비정규화해라 · 읽기 속도를 위해 · 우리는 · 감수한다 · 중복들을"
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
    "exampleKo": "여긴 최종 일관성이면 충분해요. 그냥 카운트니까요.",
    "questionEn": "If the like count shows a slightly stale number for a few seconds, is that a problem?",
    "termsKo": "최종 일관성(eventual consistency): 갱신 직후엔 노드마다 값이 달라도 결국 같아지는 모델. 좋아요 수처럼 잠깐 틀려도 되는 데이터에 적합.",
    "cueKo": "최종 일관성이면 · 괜찮다 · 여기선 · 그건 · 그냥 카운트니까"
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
    "exampleKo": "쓰기 경로는 여기를 거쳐서 큐로 흘러가요.",
    "questionEn": "Walk me through what happens in your diagram when a user submits a new post.",
    "termsKo": "쓰기 경로(write path): 생성·수정 요청이 시스템을 통과하는 흐름. 읽기 경로와 분리해 따로 최적화하는 경우가 많다.",
    "cueKo": "쓰기 경로는 · 지나간다 · 여기를 · 그다음 · 큐로"
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
    "exampleKo": "그 컬럼에 인덱스를 걸어서 조회가 계속 빠르게 유지되게 해요.",
    "questionEn": "Looking up orders by email does a full table scan right now. How do you make it fast?",
    "termsKo": "인덱스: 컬럼에 만들어 두는 정렬된 조회용 자료구조(책의 색인 비유). 풀 스캔 대신 원하는 행으로 바로 찾아가게 해준다.",
    "cueKo": "우리는 · 인덱스를 건다 · 그 컬럼에 · 그래서 조회가 계속 빠르도록"
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
    "exampleKo": "자주 쓰는 데이터는 메모리에 두고, 안 쓰는 건 디스크로 보내요.",
    "questionEn": "Only a small slice of the data gets hit constantly; the rest is rarely touched. How would you store it?",
    "termsKo": "핫/콜드 데이터: 자주 접근되는 데이터(핫)는 메모리·캐시에, 드물게 보는 데이터(콜드)는 디스크에 두는 계층화로 속도와 비용을 잡는다.",
    "cueKo": "유지해라 · 핫 데이터는 · 메모리에 · 콜드는 · 간다 · 디스크로"
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
    "exampleKo": "쓰기 부하가 걸리면 병목은 DB가 될 거예요.",
    "questionEn": "If you suddenly got ten times the traffic overnight, which part of your design would break first?",
    "termsKo": "병목(bottleneck): 시스템 전체 처리량을 제한하는 가장 느린 지점. 여길 못 넓히면 다른 데를 키워도 소용없다.",
    "cueKo": "병목은 · DB일 거예요 · 쓰기 부하 아래서는"
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
    "exampleKo": "여기서 트레이드오프는 일관성이냐 가용성이냐예요.",
    "questionEn": "During a network partition, what fundamental choice does your design have to make?",
    "termsKo": "CAP 정리: 네트워크 단절 시 일관성(모두 같은 값)과 가용성(항상 응답) 중 하나는 포기해야 한다는 분산 시스템의 기본 제약.",
    "cueKo": "그 트레이드오프는 · 일관성 대 가용성이다 · 여기서"
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
    "exampleKo": "그건 확장이 안 돼요. 모든 읽기가 노드 하나로 몰리니까요.",
    "questionEn": "Why not just keep everything on one big server and have every client read from it?",
    "termsKo": "",
    "cueKo": "그건 · 확장이 안 된다 · 왜냐하면 · 모든 읽기가 · 때리니까 · 한 노드를"
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
    "exampleKo": "여기가 단일 장애점이에요. 백업이 필요해요.",
    "questionEn": "I notice there's only one load balancer in your diagram. Any concerns with that?",
    "termsKo": "단일 장애점(SPOF): 그 하나가 죽으면 시스템 전체가 멈추는 컴포넌트. 이중화(redundancy)로 제거한다.",
    "cueKo": "이게 · 단일 장애 지점이에요 · 우리는 · 필요해요 · 백업이"
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
    "exampleKo": "접근 패턴에 따라 달라요. 읽기 위주냐 쓰기 위주냐죠.",
    "questionEn": "Just give me a straight answer — SQL or NoSQL for this service?",
    "termsKo": "접근 패턴: 데이터를 어떻게 읽고 쓰는지의 형태(단건 키 조회, 범위 검색, 쓰기 폭주 등). DB와 인덱스 선택의 기준이 된다.",
    "cueKo": "그건 · 달려 있다 · 접근 패턴에 · 읽기냐 쓰기냐"
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
    "exampleKo": "이건 수평으로 확장해요. 노드만 더 추가하면 돼요.",
    "questionEn": "Our app servers are maxed out on CPU. Should we just buy a bigger machine?",
    "termsKo": "수평 확장(scale out): 더 큰 서버 대신 같은 서버를 여러 대 추가해 부하를 나누는 방식. 수직 확장(scale up)과 대비된다.",
    "cueKo": "우리는 · 확장한다 · 이걸 · 수평으로 · 그냥 추가하면 된다 · 노드를 더"
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
    "exampleKo": "쓰기를 각 팔로워의 피드로 팬아웃해서 뿌려요.",
    "questionEn": "A user posts a photo — how does it appear in all their followers' feeds almost instantly?",
    "termsKo": "팬아웃(fan-out on write): 글 작성 시 모든 팔로워의 피드 저장소에 미리 복사해 두는 방식. 읽기는 빨라지지만 쓰기량이 폭증한다.",
    "cueKo": "퍼뜨려라 · 쓰기를 · 각 팔로워의 피드로"
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
    "exampleKo": "여긴 공격적으로 캐싱해도 돼요. 거의 안 바뀌니까요.",
    "questionEn": "The catalog page barely ever changes, but it gets the most traffic by far. How would you handle it?",
    "termsKo": "캐시 TTL: 캐시 항목의 유효 기간. 데이터가 거의 안 바뀌면 TTL을 길게 잡아도 낡은 값(stale)을 보여줄 위험이 작다.",
    "cueKo": "우리는 · 캐시해도 된다 · 공격적으로 · 여기서 · 그건 · 거의 안 바뀌니까"
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
    "exampleKo": "그 작업은 백그라운드 잡으로 넘겨요. 블로킹하지 말고요.",
    "questionEn": "Sending the confirmation email inside the signup request makes it take three seconds. How would you fix that?",
    "termsKo": "백그라운드 잡: 응답과 분리해 워커가 나중에 비동기로 처리하는 작업. 느린 작업을 사용자가 기다리지 않게 한다.",
    "cueKo": "밀어 넣어라 · 그 작업을 · 백그라운드 잡으로 · 막지 말고"
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
    "exampleKo": "백엔드에 닿기 전에 엣지에서 레이트 리밋을 걸어요.",
    "questionEn": "One client is flooding us with thousands of calls a second and the backend is choking. What do you do?",
    "termsKo": "레이트 리밋: 클라이언트별 요청 횟수를 제한하는 것. 가장 앞단(엣지: 게이트웨이/CDN)에서 막으면 백엔드까지 오지 않아 비용이 적다.",
    "cueKo": "속도 제한을 걸어라 · 엣지에서 · 그게 백엔드를 때리기 전에"
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
    "exampleKo": "여기 주변에 모니터링을 붙여서 랙이 생기면 바로 잡아내죠.",
    "questionEn": "Last week the queue silently backed up for two hours and nobody noticed. How do we prevent that?",
    "termsKo": "컨슈머 랙(lag): 큐에 쌓이는 속도를 소비가 못 따라가 밀린 정도. 모니터링·알림으로 추적하는 대표 지표다.",
    "cueKo": "추가하죠 · 모니터링을 · 이거 주위에 · 그래서 우리가 랙을 잡아내게"
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
    "detail": "stub은 원래 '뭉툭한 토막'이라는 뜻인데, 코딩에서는 시그니처만 있고 속은 빈 함수를 말해요. 코딩 인터뷰에서 전체 구조를 먼저 보여주고 싶을 때, 함수 이름이랑 파라미터만 쭉 적어놓고 'stub this out first'라고 하면 면접관이 '아, 설계부터 잡는구나' 하고 좋게 봐요. 'mock'이랑 헷갈리기 쉬운데, mock은 테스트에서 진짜 객체의 동작을 흉내 내는 가짜 객체고, 여기서 말하는 stub은 아직 안 채운 빈 껍데기예요. 다만 테스트 용어로서의 stub은 '정해진 값만 돌려주는 가짜 객체'라는 또 다른 뜻으로도 쓰이니 맥락으로 구분하면 돼요.",
    "exampleKo": "일단 뼈대부터 잡아놓고, 그다음에 로직을 채울게요.",
    "questionEn": "We only have twenty minutes left — how will you organize the code before writing the actual logic?",
    "termsKo": "스텁(stub): 본문 없이 함수 시그니처만 잡아둔 빈 껍데기. 전체 구조를 먼저 세우고 로직은 나중에 채울 때 씀.",
    "cueKo": "제가 · 뼈대만 잡아둘게요 · 이걸 · 먼저 · 그다음 채울게요 · 로직을"
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
    "exampleKo": "일단 동작부터 시키고, 나중에 리팩터링할게요.",
    "questionEn": "Your code is getting a bit messy — do you want to tidy it up before adding more?",
    "termsKo": "리팩토링: 동작(결과)은 그대로 두고 코드 구조만 개선하는 작업. '집 안 살림 재배치'와 비슷.",
    "cueKo": "제가 · 그냥 만들게요 · 그걸 · 돌아가게 · 그다음 리팩토링할게요 · 그걸 · 나중에"
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
    "exampleKo": "우선 브루트포스로 풀고, 그다음에 최적화할게요.",
    "questionEn": "This problem looks hard to optimize right away — what's your first plan of attack?",
    "termsKo": "브루트포스: 모든 경우를 다 시도하는 가장 단순한 풀이. 느리지만 정답이 보장돼 최적화의 출발점으로 좋음.",
    "cueKo": "저는 · 시작할게요 · 브루트 포스로 · 그다음 · 최적화할게요"
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
    "exampleKo": "에러 처리는 정상 흐름이 동작하고 나서 다시 볼게요.",
    "questionEn": "What happens if this API call fails — are you going to deal with that right now?",
    "termsKo": "해피 패스(happy path): 에러 없이 정상 입력만 흐르는 시나리오. 보통 이걸 먼저 완성하고 예외 처리를 덧붙임.",
    "cueKo": "저는 · 다시 돌아올게요 · 에러 처리로 · 일단 해피 패스가 · 돌아가면"
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
    "exampleKo": "까먹지 않게 여기 TODO 하나 남겨둘게요.",
    "questionEn": "We need to move on, but you said this validation part is incomplete — how will you keep track of it?",
    "termsKo": "TODO 주석: 나중에 할 일을 코드에 표시해 두는 관례. IDE가 자동으로 모아서 보여줌.",
    "cueKo": "제가 · 남겨둘게요 · TODO를 · 여기에 · 제가 안 잊도록"
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
    "exampleKo": "엣지 케이스는 핵심 로직 끝내고 나서 처리할게요.",
    "questionEn": "What about empty input or duplicate values — do you want to address those right now?",
    "termsKo": "엣지 케이스: 빈 입력, 최댓값, 중복 같은 경계·극단 입력. 버그가 가장 잘 숨는 곳.",
    "cueKo": "저는 · 처리할게요 · 엣지 케이스들을 · 코어 로직이 · 끝난 후에"
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
    "exampleKo": "로직 맞는지 예시 하나로 돌려볼게요.",
    "questionEn": "Your logic looks finished — how do you want to verify it before we move on?",
    "termsKo": "",
    "cueKo": "제가 · 돌려볼게요 · 예시 하나를 · 로직을 확인하려고"
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
    "exampleKo": "[1, 2, 3] 같은 샘플 입력으로 흐름을 따라가 볼게요.",
    "questionEn": "I'm not convinced that loop does what you think it does — can you show me?",
    "termsKo": "트레이스(trace): 입력 하나를 넣고 코드를 한 줄씩 손으로 따라가며 변수 값 변화를 확인하는 디버깅 기법.",
    "cueKo": "제가 · 추적해볼게요 · 이걸 · 샘플 입력으로 · [1, 2, 3] 같은"
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
    "exampleKo": "넘어가기 전에 이게 말이 되는지 한번 점검해 볼게요.",
    "questionEn": "Are you sure that formula is correct before we build everything on top of it?",
    "termsKo": "새너티 체크: 결과가 상식적으로 말이 되는지 가볍게 1차 점검하는 것. 정밀 검증 전의 빠른 확인.",
    "cueKo": "제가 · 가볍게 검증해볼게요 · 이걸 · 넘어가기 전에"
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
    "exampleKo": "종이에 빠르게 한번 손으로 돌려볼게요.",
    "questionEn": "There's no way to execute code on this whiteboard — how will you test your solution?",
    "termsKo": "드라이런(dry run): 실제 실행 없이 머릿속이나 종이로 코드를 단계별로 실행해 보는 것.",
    "cueKo": "제가 · 손으로 돌려볼게요 · 그걸 · 종이에 · 아주 빠르게"
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
    "exampleKo": "여기서 최댓값을 찾으려고 리스트를 순회하고 있어요.",
    "questionEn": "What's this loop doing here — can you talk me through it?",
    "termsKo": "순회(iteration): 자료구조의 요소를 처음부터 끝까지 하나씩 방문하며 처리하는 것.",
    "cueKo": "저는 · 순회하고 있어요 · 리스트를 · 여기서 · 최댓값을 찾으려고"
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
    "exampleKo": "코드 깔끔하게 유지하려고 이 부분은 헬퍼 함수로 빼낼게요.",
    "questionEn": "This function is getting pretty long, and I see the same logic repeated twice — any thoughts?",
    "termsKo": "헬퍼 함수: 반복되는 로직을 떼어내 만든 작은 보조 함수. 가독성과 재사용성을 높임.",
    "cueKo": "저는 · 뽑아낼게요 · 이걸 · 헬퍼로 · 깔끔하게 유지하려고"
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
    "exampleKo": "나중에 O(1)로 조회하려고 맵에 저장하고 있어요.",
    "questionEn": "Why use that extra data structure instead of just scanning the array each time?",
    "termsKo": "해시맵 조회는 평균 O(1): 키를 해시로 바로 찾아 입력 크기와 무관하게 상수 시간. 배열 전체 탐색 O(n)보다 빠름.",
    "cueKo": "저는 · 저장하고 있어요 · 그걸 · 맵에 · O(1) 조회를 위해 · 나중에"
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
    "exampleKo": "잠깐, 이거 틀렸네요. 인덱스가 어긋났어요.",
    "questionEn": "Hmm, your output says 5, but I was expecting 4 — what do you think?",
    "termsKo": "",
    "cueKo": "잠깐 · 그건 · 맞지 않네요 · 인덱스가 · 어긋나 있어요"
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
    "exampleKo": "잠깐 되돌아가서 요구사항을 다시 읽어볼게요.",
    "questionEn": "I think we misread the question — it's asking for pairs, not triples.",
    "termsKo": "",
    "cueKo": "제가 · 한 발 물러설게요 · 그리고 다시 읽을게요 · 요구사항을"
  },
  {
    "key": "pp:actually-let-me-rethink-this",
    "en": "Actually, let me rethink this",
    "ko": "아 잠깐만요, 이거 다시 생각해 볼게요",
    "example": "Actually, let me rethink this approach.",
    "situations": [
      "접근 방식을 바꿀 때",
      "더 나은 방법을 고민할 때"
    ],
    "detail": "여기서 actually는 '사실은'이라기보다 '아 잠깐만요, 생각이 바뀌었어요'라는 방향 전환 신호예요. 접근법을 절반쯤 구현하다가 더 나은 방법이 떠올랐거나 지금 방식에 결함이 보일 때, 이 말로 자연스럽게 유턴할 수 있어요. 인터뷰에서 방향을 바꾸는 건 감점이 아니지만, 이런 전환 멘트 없이 갑자기 코드를 지우기 시작하면 면접관이 길을 잃으니까 꼭 입으로 선언하고 바꾸세요.",
    "exampleKo": "아, 잠깐만요. 이 접근 방식을 다시 생각해 봐야겠어요.",
    "questionEn": "Your current solution is quadratic — would that hold up with a million records?",
    "termsKo": "쿼드라틱(quadratic) = O(n²): 입력이 n배 커지면 연산량이 n²배로 느는 시간 복잡도. 큰 입력에서 급격히 느려짐.",
    "cueKo": "사실 · 제가 · 다시 생각해볼게요 · 이 접근법을"
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
    "exampleKo": "방금 건 없던 걸로요. 이전 방식이 더 나았네요.",
    "questionEn": "So we're going with the recursive version you just suggested, right?",
    "termsKo": "",
    "cueKo": "방금 건 취소요 · 이전 방식이 · 더 나았어요"
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
    "exampleKo": "여기는 스택을 쓰려고 하는데, 말이 되나요?",
    "questionEn": "Walk me through why you picked that data structure for the bracket-matching part.",
    "termsKo": "스택: 마지막에 넣은 것이 먼저 나오는 LIFO 자료구조. 괄호 매칭, 실행 취소(undo) 등에 사용.",
    "cueKo": "저는 · 쓸게요 · 스택을 · 여기에 · 그게 · 이해되시나요?"
  },
  {
    "key": "pp:feel-free-to-stop-me",
    "en": "Feel free to stop me",
    "ko": "언제든 끊으셔도 돼요",
    "example": "Feel free to stop me if I'm headed down the wrong path.",
    "situations": [
      "면접관 피드백을 열어둘 때",
      "중간 개입을 환영할 때"
    ],
    "detail": "긴 설명이나 코딩을 시작하기 전에 '제가 산으로 가면 언제든 끊어주세요'라고 먼저 문을 열어두는 말이에요. 인터뷰 초반에 접근법을 설명하기 직전에 이 말을 깔아두면 협업적인 인상을 주고, 실제로 면접관이 일찍 개입해줘서 잘못된 길로 오래 가는 걸 막아주는 실리도 있어요. feel free to는 '부담 갖지 말고 ~하세요'라는 정중한 허락 표현이라, 명령조인 'stop me anytime'보다 한결 부드러워요.",
    "exampleKo": "제가 잘못된 방향으로 가고 있으면 언제든 끊으셔도 돼요.",
    "questionEn": "Go ahead, the floor is yours — explain your solution from the top.",
    "termsKo": "",
    "cueKo": "편하게 · 멈춰주세요 · 저를 · 만약 제가 · 가고 있다면 · 잘못된 길로"
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
    "exampleKo": "혹시 다르게 하실 것 같으면 말씀해 주세요.",
    "questionEn": "It's your solution — you decide how to structure it.",
    "termsKo": "",
    "cueKo": "알려주세요 · 제게 · 만약 당신이라면 · 하실지 · 이걸 · 다르게"
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
    "exampleKo": "여기서 잠깐 생각을 소리 내서 정리해 볼게요.",
    "questionEn": "You've gone quiet — what's going on in your head right now?",
    "termsKo": "",
    "cueKo": "제가 · 소리 내어 생각해볼게요 · 잠깐 · 여기서"
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
    "exampleKo": "일단 이건 하드코딩해 두고 나중에 정리할게요.",
    "questionEn": "That config value would normally come from an environment file — what will you do here?",
    "termsKo": "하드코딩: 값을 코드에 직접 박아 넣는 것. 빠르지만 변경에 약해 임시방편으로만 사용.",
    "cueKo": "저는 · 하드코딩할게요 · 이걸 · 일단은 · 그리고 정리할게요 · 그걸 · 나중에"
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
    "exampleKo": "이 변수명 좀 바꿀게요. 'x'는 헷갈리네요.",
    "questionEn": "I'm having trouble following — what does the variable 'x' actually represent here?",
    "termsKo": "",
    "cueKo": "제가 · 이름을 지어줄게요 · 이것에 · 더 낫게 · 'x'는 · 헷갈려요"
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
    "exampleKo": "이 루프에 인덱스가 하나 어긋난 버그(off-by-one)가 있는 것 같아요.",
    "questionEn": "Your loop seems to skip the last element of the array — any idea why?",
    "termsKo": "오프바이원(off-by-one): 경계 인덱스를 하나 빠뜨리거나 하나 더 도는 고전 버그. <를 <=로 잘못 쓰는 식.",
    "cueKo": "저는 · 생각해요 · 있다고 · 오프바이원이 · 여기 · 루프 안에"
  },
  {
    "key": "pp:let-me-walk-you-through-my-approach",
    "en": "Let me walk you through my approach",
    "ko": "제 접근 방식을 설명드릴게요",
    "example": "Before I start coding, let me walk you through my approach.",
    "situations": [
      "코딩 전 계획을 공유할 때",
      "전체 흐름을 먼저 설명할 때"
    ],
    "detail": "코딩을 시작하기 전에 전체 계획을 단계별로 설명하겠다는 인터뷰의 정석 오프닝이에요. 문제 이해 → 이 멘트 → 접근법 설명 → 면접관 동의 → 코딩, 이 순서가 북미 인터뷰의 기본 루틴이라 거의 매 라운드 한 번씩은 쓰게 돼요. walk through는 '손잡고 같이 걸으며 보여준다'는 어감이라 explain보다 친절하고 단계적인 느낌이고, 'walk through it'(내가 훑는다)과 달리 'walk you through'는 상대를 데리고 간다는 차이가 있어요.",
    "exampleKo": "코딩하기 전에 제 접근 방식을 먼저 설명드릴게요.",
    "questionEn": "Before you start typing any code, can you tell me your plan?",
    "termsKo": "",
    "cueKo": "코딩하기 전에 · 제가 · 차근차근 설명할게요 · 당신에게 · 제 접근법을"
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
    "exampleKo": "이거 잠깐 찾아볼 동안 조금만 기다려 주세요.",
    "questionEn": "You've paused for a while — is everything okay, or should we move on?",
    "termsKo": "",
    "cueKo": "조금만 참아주세요 · 잠깐만 · 제가 찾아보는 동안 · 이걸"
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
    "exampleKo": "넘어가기 전에 이거 잠깐 빠르게 정리할게요.",
    "questionEn": "There's some duplicated code and a few unused variables left over from your last change.",
    "termsKo": "",
    "cueKo": "제가 · 정리할게요 · 이걸 · 아주 빠르게 · 넘어가기 전에"
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
    "exampleKo": "딱 떠오르는 걸로는, 여기엔 힙을 쓸 것 같아요.",
    "questionEn": "What's your gut instinct for finding the k largest elements efficiently?",
    "termsKo": "힙(heap): 최댓값·최솟값을 O(log n)에 꺼내는 트리 기반 자료구조. 우선순위 큐 구현체이며 top-K 문제의 단골.",
    "cueKo": "당장 떠오르는 걸로는 · 저라면 · 쓸 거예요 · 힙을 · 여기에"
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
    "exampleKo": "널 체크 추가했으니, 이거면 다 커버될 거예요.",
    "questionEn": "You added the null check — is there anything else we're still missing?",
    "termsKo": "",
    "cueKo": "저는 · 추가했어요 · 널 체크를 · 그게 · 커버할 거예요 · 그 부분을"
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
    "exampleKo": "빈 리스트 같은 엣지 케이스를 한 번 더 확인해 볼게요.",
    "questionEn": "Looks done to me — are you ready to submit it?",
    "termsKo": "엣지 케이스: 빈 리스트, 원소 1개, 최대 크기 같은 경계 입력. 제출 전 마지막 점검 포인트.",
    "cueKo": "제가 · 다시 확인할게요 · 엣지 케이스들을 · 빈 리스트 같은"
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
    "exampleKo": "본격적으로 들어가기 전에, 요구사항 몇 가지만 확인해도 될까요?",
    "questionEn": "Okay, here's your problem: design a parking lot system. You can start whenever you're ready.",
    "termsKo": "",
    "cueKo": "본격적으로 들어가기 전에 · 제가 확인해도 될까요 · 요구사항을"
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
    "exampleKo": "여기서 다루는 규모가 어느 정도라고 보면 될까요?",
    "questionEn": "Let's design a chat service like Slack. Where would you like to start?",
    "termsKo": "규모(스케일): 사용자 수·요청량·데이터량. 캐시, 샤딩 같은 설계 선택이 전부 규모에 따라 달라져서 가장 먼저 확인하는 항목.",
    "cueKo": "어떤 규모를 · 우리가 지금 얘기하고 있는 건가요 · 여기서"
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
    "exampleKo": "대략 초당 요청 몇 건 정도를 기준으로 잡으면 될까요?",
    "questionEn": "Assume this is a pretty popular public API. How would you size the infrastructure?",
    "termsKo": "RPS(초당 요청 수): 시스템 부하를 재는 기본 단위. 서버 대수와 DB 용량 산정의 출발점이라 설계 전에 꼭 물어봄.",
    "cueKo": "대략 · 초당 요청 몇 건을 · 제가 기준으로 잡아야 할까요"
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
    "exampleKo": "입력 배열이 이미 정렬되어 있다고 가정해도 될까요?",
    "questionEn": "Here's the problem: given an array of numbers, find two that add up to a target value.",
    "termsKo": "정렬 여부는 풀이를 바꾸는 핵심 전제 — 정렬돼 있으면 이진 탐색·투 포인터로 훨씬 빠르게 풀 수 있어서 먼저 확인함.",
    "cueKo": "제가 가정해도 될까요 · 입력 배열이 · 이미 정렬돼 있다고"
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
    "exampleKo": "빈 입력이 들어오는 경우도 처리해야 할까요?",
    "questionEn": "Write a function that finds the largest number in a list of integers.",
    "termsKo": "",
    "cueKo": "제가 처리해야 할까요 · 빈 입력 케이스도"
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
    "exampleKo": "입력에 중복 값이 포함될 수 있나요?",
    "questionEn": "Given an array of integers, return the indices of two numbers that sum to the target. Any questions?",
    "termsKo": "",
    "cueKo": "중복 값이 · 허용되나요 · 입력에"
  },
  {
    "key": "cq:can-the-values-be-negative",
    "en": "Can the values be negative?",
    "ko": "값이 음수일 수도 있나요?",
    "example": "Can the values be negative, or are they all positive?",
    "situations": [
      "합/슬라이딩 윈도우 문제 초반",
      "입력 범위를 명확히 할 때"
    ],
    "detail": "짧지만 위력 있는 질문이에요 — 음수가 섞이는 순간 슬라이딩 윈도우 같은 기법이 통하지 않게 되는 등 풀이 전략이 통째로 바뀌거든요(부분합 문제에서 음수 때문에 윈도우 대신 prefix sum + 해시맵으로 가는 게 대표적인 예죠). 배열 문제에서 제약 조건을 훑을 때, '값의 범위가 어떻게 되나'를 묻는 흐름에서 자연스럽게 나와요. 흔한 실수는 'minus value'라고 하는 건데, 영어에서는 negative values가 표준이고 minus는 연산(빼기)을 말할 때 써요.",
    "exampleKo": "값이 음수일 수도 있나요, 아니면 전부 양수인가요?",
    "questionEn": "Given an array of integers, find the contiguous subarray with the maximum sum.",
    "termsKo": "",
    "cueKo": "값들이 · 음수일 수 있나요 · 아니면 전부 양수인가요"
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
    "exampleKo": "유효한 답이 없을 때는 뭘 반환하면 될까요?",
    "questionEn": "Find the target in the array and give me back its index.",
    "termsKo": "",
    "cueKo": "무엇을 · 제가 반환해야 할까요 · 유효한 답이 없을 때"
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
    "exampleKo": "확인차 여쭤보면, 가장 긴 부분 문자열을 찾으면 되는 거죠?",
    "questionEn": "Given a string, find a substring with no repeating characters.",
    "termsKo": "",
    "cueKo": "확인차인데 · 우리는 · 원하는 거죠 · 가장 긴 부분 문자열을 · 맞죠?"
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
    "exampleKo": "그러니까 목표는 최단 경로를 찾는 거, 맞죠?",
    "questionEn": "You're given a grid maze. Find a way from the start cell to the exit.",
    "termsKo": "최단 경로: 그래프/그리드에서 두 지점 사이 가장 짧은 경로. 가중치 없으면 BFS, 있으면 다익스트라가 정석.",
    "cueKo": "그러니까 · 목표는 · 최단 경로 · 맞죠?"
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
    "exampleKo": "먼저 제가 문제를 제대로 이해했는지 확인해 볼게요.",
    "questionEn": "...and that's everything in the question. I know it's a lot. Ready to start?",
    "termsKo": "",
    "cueKo": "제가 확실히 할게요 · 제가 이해했는지 · 문제를 · 먼저"
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
    "exampleKo": "문제를 제 표현으로 다시 정리해 보겠습니다.",
    "questionEn": "That's the full problem statement. Can you tell me your understanding of what's being asked?",
    "termsKo": "",
    "cueKo": "제가 다시 정리해 볼게요 · 문제를 · 제 말로"
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
    "exampleKo": "확실히 하기 위해 간단한 예시 하나를 짚어볼게요.",
    "questionEn": "Yep, you've got it. Anything else before you dive into the solution?",
    "termsKo": "",
    "cueKo": "제가 짚어볼게요 · 간단한 예시 하나를 · 확실히 하려고"
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
    "exampleKo": "시간 쪽으로 최적화할까요, 아니면 공간 쪽으로 할까요?",
    "questionEn": "This works, but I'd like to see something more efficient. How would you improve it?",
    "termsKo": "시간-공간 트레이드오프: 메모리를 더 써서(해시맵·캐시) 실행 시간을 줄이거나 그 반대. 어느 쪽을 줄일지부터 정해야 함.",
    "cueKo": "제가 최적화할까요 · 시간 쪽으로 · 아니면 공간 쪽으로 · 여기서"
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
    "exampleKo": "일단 동작하는 풀이부터 만들고, 그다음에 최적화할까요?",
    "questionEn": "We've got twenty minutes left for this question. How do you want to use it?",
    "termsKo": "",
    "cueKo": "원하세요 · 제가 이걸 돌아가게 만들기를 · 먼저 · 그다음에 최적화하기를"
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
    "exampleKo": "이거 코드로 직접 짤까요, 아니면 말로 설명만 할까요?",
    "questionEn": "Your plan makes sense to me. How do you want to proceed from here?",
    "termsKo": "",
    "cueKo": "제가 코드로 옮길까요 · 이걸 · 아니면 그냥 말로 풀어 설명할까요"
  },
  {
    "key": "cq:do-you-want-me-to-handle-concurrency-her",
    "en": "Do you want me to handle concurrency here?",
    "ko": "여기서 동시성까지 고려해야 하나요?",
    "example": "Do you want me to handle concurrency here?",
    "situations": [
      "멀티스레드 환경이 애매할 때",
      "락/원자성 범위를 정할 때"
    ],
    "detail": "handle concurrency는 '동시성 문제까지 커버하다'라는 뜻으로, 락이나 원자성 같은 걸 설계에 넣을지 묻는 거예요. 카운터 증가, 재고 차감 같은 문제에서 '여러 요청이 동시에 들어오면?'이 떠오르는 순간 던지는 질문인데, 이 질문 자체가 시니어다움을 보여주는 시그널이에요. 다만 단순 알고리즘 문제에서 꺼내면 과한 질문이 되니까, 공유 상태가 실제로 보일 때만 쓰는 게 요령이에요.",
    "exampleKo": "이 부분에서 동시성 처리까지 고려해야 할까요?",
    "questionEn": "Now imagine this class runs inside a busy web server with many simultaneous requests. Anything you'd change?",
    "termsKo": "동시성: 여러 요청/스레드가 동시에 같은 데이터에 접근하는 상황. 보호 장치 없으면 레이스 컨디션으로 값이 꼬임.",
    "cueKo": "원하시나요 · 제가 처리하기를 · 동시성을 · 이 안에서"
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
    "exampleKo": "이 부분은 스레드 안전성까지 신경 써야 할까요?",
    "questionEn": "Nice. This cache will be shared by every request in the server. Does this look production-ready to you?",
    "termsKo": "스레드 안전성: 여러 스레드가 동시에 호출해도 깨지지 않는 성질. 락, 원자 연산, 불변 객체로 확보.",
    "cueKo": "제가 신경 써야 할까요 · 스레드 안전성을 · 이 부분에서"
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
    "exampleKo": "잠깐만 생각할 시간을 좀 가질게요.",
    "questionEn": "Tricky follow-up: can you solve it again without using any extra memory?",
    "termsKo": "",
    "cueKo": "제가 생각해 볼게요 · 이것에 대해 · 잠깐만"
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
    "exampleKo": "접근 방식을 정리할 시간을 잠시 주세요.",
    "questionEn": "Here's the question: merge k sorted linked lists efficiently. The floor is yours.",
    "termsKo": "",
    "cueKo": "주세요 · 저에게 · 잠깐을 · 계획하도록 · 제 접근 방식을"
  },
  {
    "key": "cq:to-summarize-my-approach",
    "en": "To summarize my approach",
    "ko": "제 접근 방식을 정리하자면",
    "example": "To summarize my approach: I used a hash map for constant-time lookups.",
    "situations": [
      "풀이를 마무리 정리할 때",
      "구현 직전 계획을 요약할 때"
    ],
    "detail": "풀이를 마치고 '한 줄 요약'으로 마무리하는 신호탄이에요 — 이 말이 나오면 면접관도 '아, 정리 들어가는구나' 하고 모드를 바꿔요. 코드를 다 짠 후 복잡도 설명으로 넘어가기 직전, 또는 시스템 디자인 마지막 5분에 전체 그림을 다시 묶을 때 쓰는 게 정석이에요. 흩어진 설명을 이 한 문장으로 묶어주면 의사소통 점수가 확 올라가는데, 요약이랍시고 처음부터 다 다시 말하면 역효과니까 진짜 2~3문장으로 끝내세요.",
    "exampleKo": "제 접근 방식을 요약하자면, 해시맵을 사용합니다.",
    "questionEn": "We're nearly out of time. Can you quickly recap what you did and why?",
    "termsKo": "",
    "cueKo": "요약하자면 · 제 접근 방식을 · 저는 · 사용합니다 · 해시맵을"
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
    "exampleKo": "시간이 더 있었다면 엣지 케이스 테스트를 더 추가했을 거예요.",
    "questionEn": "We have to stop here. Looking back, anything you wish you'd done differently?",
    "termsKo": "엣지 케이스: 빈 입력, 경계값, 중복 같은 극단 입력. 버그가 가장 잘 숨는 지점이라 테스트로 막음.",
    "cueKo": "만약 제게 시간이 더 있었다면 · 저는 · 추가했을 거예요 · 더 많은 엣지 케이스 테스트를"
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
    "exampleKo": "시간 복잡도는 O(n)이고, 공간 복잡도는 O(1)입니다.",
    "questionEn": "Looks correct. How does it perform as the input grows really large?",
    "termsKo": "빅오(O) 표기: 입력 n이 커질 때 연산·메모리가 늘어나는 비율. O(n)=선형 증가, O(1)=입력 크기와 무관하게 일정.",
    "cueKo": "시간 복잡도는 · O(n)이고 · 공간은 · O(1)입니다"
  },
  {
    "key": "cq:one-trade-off-here-is-we-use-extra-memor",
    "en": "One trade-off here is we use extra memory for speed",
    "ko": "트레이드오프는 속도를 위해 메모리를 더 쓴다는 점이에요",
    "example": "One trade-off here is we're using extra memory for speed.",
    "situations": [
      "설계 선택을 변호할 때",
      "최적화 결정을 정당화할 때"
    ],
    "detail": "extra memory for speed의 for가 핵심이에요 — '속도를 얻는 대가로 메모리를 내준다'는 교환의 어감을 이 전치사 하나가 담고 있죠. 해시맵으로 O(n²)을 O(n)으로 줄인 직후처럼, 내 선택의 비용을 스스로 짚어주는 장면에서 나와요 — 면접관이 지적하기 전에 먼저 말하면 점수가 달라요. One trade-off로 시작하면 '여러 트레이드오프 중 하나를 꼽자면'이라는 여운이 남아서, 면접관이 'any others?'라고 물어와도 자연스럽게 이어갈 수 있어요.",
    "exampleKo": "여기서 한 가지 트레이드오프는 속도를 위해 메모리를 더 쓴다는 거예요.",
    "questionEn": "You chose a hash map for lookups there. Any downsides to that choice?",
    "termsKo": "공간-시간 트레이드오프의 전형: 해시맵에 미리 저장해 메모리를 더 쓰는 대신 조회를 O(1)로 만드는 방식.",
    "cueKo": "한 가지 트레이드오프는 · 우리가 · 맞바꾼다는 거예요 · 메모리를 · 속도를 위해 · 여기서"
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
    "exampleKo": "먼저 입력을 파싱하고요. 그다음에 검증할 거예요.",
    "questionEn": "Walk me through how you'd handle this raw user input, step by step.",
    "termsKo": "",
    "cueKo": "먼저 · 나는 · 파싱할 거예요 · 입력을 · 그다음 · 나는 · 검증할 거예요 · 그것을"
  },
  {
    "key": "co:then",
    "en": "then",
    "ko": "그다음",
    "fn": "sequence",
    "example": "I check the cache. Then I hit the DB if it misses.",
    "detail": "단계 사이를 잇는 가장 가벼운 접착제예요. 코드 워크스루나 시스템 플로우 설명할 때 \"A 하고, 그다음 B\" 식으로 거의 무한 반복해서 쓰게 되죠. 다만 모든 문장을 'Then'으로만 이으면 단조롭게 들리니까 'After that', 'From there' 같은 걸 섞어주는 게 좋아요. 'and then'으로 붙여 쓰면 더 구어체 느낌이 나요.",
    "exampleKo": "캐시를 먼저 확인하고요. 미스 나면 그때 DB를 칩니다.",
    "questionEn": "Walk me through the read path for this endpoint.",
    "termsKo": "캐시: 자주 읽는 데이터를 빠른 저장소에 복사해 두는 것. 캐시에 없으면(미스) 원본 DB까지 내려가서 조회.",
    "cueKo": "나는 · 확인해요 · 캐시를 · 그다음 · 나는 · 쳐요 · DB를 · 만약 미스 나면"
  },
  {
    "key": "co:after-that",
    "en": "after that",
    "ko": "그러고 나서",
    "fn": "sequence",
    "example": "We write the test. After that, we make it pass.",
    "detail": "'Then'보다 한 박자 여유 있는 느낌의 \"그러고 나서\"예요. 앞 단계가 확실히 끝난 다음에 다음 단계로 넘어간다는 순차성이 좀 더 또렷하게 느껴지죠. TDD 사이클이나 배포 파이프라인처럼 단계가 명확히 구분되는 프로세스를 설명할 때 잘 어울려요. 'Then'만 연발하다가 중간에 한 번씩 끼워주면 말의 리듬이 살아납니다.",
    "exampleKo": "테스트를 먼저 작성하고요. 그러고 나서 그 테스트를 통과시킵니다.",
    "questionEn": "How do you usually approach building a new feature with TDD?",
    "termsKo": "TDD(테스트 주도 개발): 실패하는 테스트를 먼저 쓰고, 그걸 통과시키는 최소한의 코드를 나중에 짜는 방식.",
    "cueKo": "우리는 · 작성해요 · 테스트를 · 그러고 나서 · 우리는 · 만들어요 · 그게 · 통과하게"
  },
  {
    "key": "co:next",
    "en": "next",
    "ko": "다음으로",
    "fn": "sequence",
    "example": "We index the table. Next, we benchmark the query.",
    "detail": "발표하듯 단계를 짚어갈 때 쓰는 \"다음으로\"인데, 'Then'보다 살짝 더 구조적인 느낌이 있어요. 시스템 디자인 인터뷰에서 \"DB 얘기 끝났으니 다음은 캐싱 레이어\" 하고 토픽을 전환할 때 딱이죠. 'Then'은 같은 흐름 안의 다음 동작, 'Next'는 다음 항목/챕터로 넘어가는 느낌이라는 미묘한 차이가 있어요.",
    "exampleKo": "테이블에 인덱스를 걸고요. 다음으로 쿼리 벤치마크를 돌립니다.",
    "questionEn": "This report query is timing out — what steps would you take?",
    "termsKo": "인덱스: 책 색인처럼 DB가 원하는 행을 빨리 찾게 돕는 자료구조. 조회는 빨라지고 쓰기 비용은 늘어남.",
    "cueKo": "우리는 · 인덱스를 걸어요 · 테이블에 · 다음으로 · 우리는 · 벤치마크해요 · 쿼리를"
  },
  {
    "key": "co:once-that-s-done",
    "en": "once that's done",
    "ko": "그게 끝나면",
    "fn": "sequence",
    "example": "We deploy to staging. Once that's done, we run smoke tests.",
    "detail": "\"그 작업이 완료되면\"이라는 선행 조건을 콕 짚어주는 표현이에요. 단순한 'Then'과 달리 \"앞 단계가 끝나야만 다음이 가능하다\"는 의존 관계를 강조하죠. 배포 플로우 설명에서 \"스테이징 배포 끝나면 그때 스모크 테스트\" 같은 게이트 구조를 말할 때 자연스럽게 나옵니다. 'Once' 뒤에 미래 일인데도 현재형('once that's done', 'once it lands')을 쓴다는 게 한국인이 자주 틀리는 포인트예요 — 'once that will be done'은 틀린 표현입니다.",
    "exampleKo": "스테이징에 배포하고요. 그게 끝나면 스모크 테스트를 돌립니다.",
    "questionEn": "How do you make sure a release is safe before it reaches real users?",
    "termsKo": "스테이징: 운영과 비슷하게 꾸민 사전 배포 환경. 스모크 테스트: 핵심 기능만 빠르게 훑는 최소 점검.",
    "cueKo": "우리는 · 배포해요 · 스테이징에 · 그게 끝나면 · 우리는 · 돌려요 · 스모크 테스트를"
  },
  {
    "key": "co:from-there",
    "en": "from there",
    "ko": "거기서부터",
    "fn": "sequence",
    "example": "We get the IDs first. From there, we batch the lookups.",
    "detail": "직역하면 \"거기서부터\"인데, 앞 단계의 결과물을 발판 삼아 다음으로 나아간다는 어감이에요. 그냥 시간 순서가 아니라 \"앞에서 얻은 걸 가지고\"라는 연결고리가 느껴지죠. 인터뷰에서 \"일단 ID 목록을 확보하고, 거기서부터 배치 조회를 돌린다\"처럼 앞 결과가 다음 입력이 되는 흐름에 딱입니다. 'Then'보다 말이 매끄럽고 사고가 이어지는 느낌을 줘서 시니어스러운 표현이에요.",
    "exampleKo": "먼저 ID들을 가져오고요. 거기서부터 조회를 배치로 묶어서 처리합니다.",
    "questionEn": "We need details for a hundred items on this page — how do you avoid a hundred separate queries?",
    "termsKo": "배치 조회: 항목마다 쿼리를 날리는 N+1 패턴 대신, ID를 모아 한 번에 가져와 DB 왕복을 줄이는 것.",
    "cueKo": "우리는 · 가져와요 · ID들을 · 먼저 · 거기서부터 · 우리는 · 배치로 묶어요 · 조회들을"
  },
  {
    "key": "co:meanwhile",
    "en": "meanwhile",
    "ko": "그동안에",
    "fn": "sequence",
    "example": "The worker drains the queue. Meanwhile, the API stays up.",
    "detail": "두 가지 일이 동시에 굴러간다는 걸 표현하는 \"그동안에\"예요. 비동기 처리나 백그라운드 작업 설명에서 \"워커가 큐를 비우는 동안 API는 계속 살아있다\"처럼 병렬성을 강조할 때 나오죠. 순차 진행인 'Then'과 헷갈리면 안 돼요 — 'Meanwhile'은 시간이 겹친다는 뜻이라, 순서대로 일어나는 일에 쓰면 의미가 꼬입니다. 비동기 아키텍처의 장점을 어필할 때 은근히 효과적인 단어예요.",
    "exampleKo": "워커가 큐를 비우고요. 그동안 API는 계속 떠 있습니다.",
    "questionEn": "If a huge batch of jobs hits the system, will user requests slow down?",
    "termsKo": "워커-큐 분리: 무거운 작업은 큐에 넣고 별도 워커가 처리. API는 응답만 빨리 돌려주고 영향을 안 받음.",
    "cueKo": "워커가 · 비워요 · 큐를 · 그 사이에 · API는 · 계속 살아 있어요"
  },
  {
    "key": "co:finally",
    "en": "finally",
    "ko": "마지막으로",
    "fn": "sequence",
    "example": "We retry on failure. Finally, we send it to a dead letter queue.",
    "detail": "단계 나열의 마지막을 알리는 \"마지막으로\"예요. 'First... Then... Finally...' 3단 구조로 말하면 듣는 사람이 따라오기 쉬워서 인터뷰 답변 구조화에 핵심이죠. 한국어의 \"드디어!\"(Finally it works!) 의미로도 쓰이니까 맥락 구분이 필요해요 — 마지막 단계를 소개하는 문장 맨 앞에 오면 \"마지막으로\", 감탄으로 쓰면 \"드디어\"입니다. 마지막 단계 신호를 줘야 면접관이 \"답변이 끝나가는구나\" 하고 알 수 있어요.",
    "exampleKo": "실패하면 재시도하고요. 마지막엔 데드 레터 큐로 보냅니다.",
    "questionEn": "How does your consumer handle a message it just can't process?",
    "termsKo": "데드 레터 큐(DLQ): 재시도해도 계속 실패하는 메시지를 따로 모아두는 큐. 본 큐 막힘을 막고 나중에 원인 분석.",
    "cueKo": "우리는 · 재시도해요 · 실패 시에 · 마지막으로 · 우리는 · 보내요 · 데드 레터 큐로"
  },
  {
    "key": "co:so",
    "en": "so",
    "ko": "그래서",
    "fn": "cause",
    "example": "The list is sorted. So I'd use binary search.",
    "detail": "원어민 엔지니어가 아마 제일 많이 쓰는 단어일 거예요. \"앞의 사실 때문에 → 이 결론\"이라는 인과를 가장 가볍게 잇죠. 인터뷰에서 \"정렬돼 있네요. 그럼 이진 탐색이죠\"처럼 관찰→결정으로 넘어갈 때 필수입니다. 다만 문장 시작마다 습관적으로 'So...'를 붙이는 건 filler가 돼서 오히려 자신 없어 보일 수 있으니, 진짜 인과관계가 있을 때 쓰는 게 좋아요.",
    "exampleKo": "리스트가 정렬돼 있네요. 그러니까 이진 탐색을 쓰겠습니다.",
    "questionEn": "The input array is already sorted — does that change how you'd search it?",
    "termsKo": "이진 탐색: 정렬된 데이터에서 범위를 절반씩 줄여가며 찾는 방법. O(log n)이라 데이터가 커도 빠름.",
    "cueKo": "리스트는 · 정렬되어 있어요 · 그래서 · 나는 · 쓸 거예요 · 이진 탐색을"
  },
  {
    "key": "co:because",
    "en": "because",
    "ko": "왜냐하면",
    "fn": "cause",
    "example": "I'd cache this. Because the reads dominate here.",
    "detail": "결정의 이유를 대는 가장 직접적인 단어예요. 인터뷰에서는 결정만 말하고 끝내면 점수를 못 받아요 — \"캐싱하겠습니다. 읽기가 압도적이라서요\"처럼 'because'로 근거를 붙이는 습관이 평가를 가릅니다. 학교에서는 'Because'로 문장을 시작하면 안 된다고 배우지만, 말할 때는 예문처럼 결정 먼저 던지고 'Because...'로 이유를 따로 붙이는 게 아주 자연스러워요.",
    "exampleKo": "이건 캐싱하겠습니다. 여기선 읽기가 압도적으로 많거든요.",
    "questionEn": "Why add a caching layer here instead of just querying the database every time?",
    "termsKo": "읽기 우세(read-heavy) 워크로드: 쓰기보다 읽기가 압도적으로 많은 패턴. 캐시를 깔았을 때 효과가 가장 큼.",
    "cueKo": "나는 · 캐싱할 거예요 · 이걸 · 왜냐하면 · 읽기가 · 압도하니까 · 여기서는"
  },
  {
    "key": "co:since",
    "en": "since",
    "ko": "~이니까",
    "fn": "cause",
    "example": "Since the data fits in memory, I'd skip the DB.",
    "detail": "'Because'와 거의 같지만 \"~이니까\"처럼 이미 둘 다 아는 전제를 깔고 가는 어감이에요. 문장 맨 앞에 와서 \"데이터가 메모리에 다 들어가니까, DB는 건너뛰겠습니다\"처럼 가정→결정 구조를 만들 때 특히 좋죠. 'Because'는 새로운 이유를 제시하는 느낌, 'Since'는 \"아시다시피 ~이니\" 느낌이라는 미묘한 차이가 있어요. 시간 의미(\"~이후로\")로도 쓰이니 맥락으로 구분하세요.",
    "exampleKo": "데이터가 메모리에 다 들어가니까, DB는 건너뛰겠습니다.",
    "questionEn": "The entire dataset is only a couple hundred megabytes — does that change your design?",
    "termsKo": "인메모리 처리: 데이터 전체가 RAM에 들어가면 DB/디스크 왕복 없이 메모리에서 바로 다뤄 훨씬 빠름.",
    "cueKo": "데이터가 · 다 들어가니까 · 메모리에 · 나는 · 건너뛸 거예요 · DB를"
  },
  {
    "key": "co:that-s-why",
    "en": "that's why",
    "ko": "그래서 ~한 거예요",
    "fn": "cause",
    "example": "Writes are rare. That's why I optimized for reads.",
    "detail": "이유를 먼저 깔고 \"그래서 그렇게 한 거예요\" 하고 결정을 정당화하는 표현이에요. 'because'가 결정→이유 순서라면 'that's why'는 이유→결정 순서라 논리 전개 방향이 반대죠. 면접관이 \"왜 이렇게 설계했어요?\" 하고 찌를 때 \"쓰기가 드물거든요. 그래서 읽기에 최적화한 겁니다\" 하고 받아치는 장면에서 빛납니다. 과거 결정을 설명하는 뉘앙스가 있어서 이미 내린 선택을 변호할 때 특히 자연스러워요.",
    "exampleKo": "쓰기는 드물거든요. 그래서 읽기에 최적화한 겁니다.",
    "questionEn": "Your design seems heavily tuned for fast reads — what drove that choice?",
    "termsKo": "읽기 최적화 설계: 쓰기가 드물면 인덱스 추가·중복 저장 등 읽기 속도에 유리한 쪽으로 구조를 기울이는 것.",
    "cueKo": "쓰기는 · 드물어요 · 그게 이유예요 · 내가 · 최적화한 · 읽기 위주로"
  },
  {
    "key": "co:which-means",
    "en": "which means",
    "ko": "그러니까, 즉",
    "fn": "cause",
    "example": "It's idempotent. Which means retries are safe.",
    "detail": "기술적 사실을 던진 다음 \"그게 실제로 의미하는 바는\" 하고 함의를 풀어주는 다리예요. \"멱등하니까, 즉 재시도가 안전하다는 거죠\"처럼 속성→실용적 결과로 번역해주는 거라, 면접관에게 \"이 사람은 개념의 의미까지 이해하고 있구나\"를 보여주는 데 최고입니다. 예문처럼 문장을 끊고 'Which means...'로 시작하는 건 문법적으론 fragment지만 구어에선 완전히 자연스러워요. 'in other words'(같은 말 바꿔 말하기)와 달리 이건 논리적 귀결을 끌어내는 표현이에요.",
    "exampleKo": "멱등하거든요. 그 말은 재시도해도 안전하다는 거죠.",
    "questionEn": "You mentioned this endpoint is idempotent — what does that buy us in practice?",
    "termsKo": "멱등성: 같은 요청을 여러 번 보내도 결과가 한 번 보낸 것과 같은 성질. 네트워크 오류 시 재시도를 안전하게 해줌.",
    "cueKo": "그건 · 멱등해요 · 그 말은 즉 · 재시도가 · 안전하다는 거죠"
  },
  {
    "key": "co:this-lets-us",
    "en": "this lets us",
    "ko": "이걸로 ~할 수 있어요",
    "fn": "cause",
    "example": "We decouple them with a queue. This lets us scale each side independently.",
    "detail": "설계 결정이 \"어떤 능력을 열어주는지\"를 말하는 표현이에요. 직역하면 \"이게 우리를 ~하게 해준다\"인데, 한국어로는 \"이 덕분에 ~할 수 있다\"가 자연스럽죠. 시스템 디자인에서 \"큐로 분리했고, 덕분에 양쪽을 따로 스케일할 수 있다\"처럼 결정→이득 구조로 말할 때 핵심입니다. 'allows us to'보다 짧고 구어적이라 말할 땐 이쪽이 더 잘 나와요. 'lets us' 뒤에는 to 없이 동사 원형이 바로 온다는 것(let us to scale ❌)도 한국인이 자주 틀리는 부분이에요.",
    "exampleKo": "큐로 양쪽을 분리했어요. 덕분에 각각 따로 스케일할 수 있죠.",
    "questionEn": "Why put a message queue between the API and the workers?",
    "termsKo": "큐 디커플링: 생산자와 소비자 사이에 큐를 두어 서로 분리. 각 쪽을 독립적으로 확장·배포할 수 있게 됨.",
    "cueKo": "우리는 · 분리해요 · 그것들을 · 큐로 · 이게 · 해줘요 · 우리가 · 확장할 수 있게 · 각 쪽을"
  },
  {
    "key": "co:but",
    "en": "but",
    "ko": "하지만",
    "fn": "contrast",
    "example": "That works. But it doesn't scale past one node.",
    "detail": "가장 기본적인 반전 접속사인데, 인터뷰에서는 \"동작은 하지만 한계가 있다\"는 트레이드오프 사고를 보여주는 출발점이에요. \"그 방법도 돼요. 근데 노드 하나 넘어가면 못 버텨요\"처럼 단순 해법의 한계를 스스로 짚을 때 나오죠. 'But'을 너무 연발하면 부정적으로 들릴 수 있으니, 상대 의견을 반박할 땐 'That said'나 'On the other hand'로 부드럽게 가는 것도 방법이에요.",
    "exampleKo": "그것도 동작은 해요. 근데 노드 하나를 넘어가면 스케일이 안 돼요.",
    "questionEn": "Your in-memory solution passes every test — are we good to ship it?",
    "termsKo": "단일 노드 한계: 한 서버의 메모리 안에서만 도는 설계는 서버를 여러 대로 늘리는 수평 확장이 안 됨.",
    "cueKo": "그건 · 돌아가요 · 하지만 · 그건 · 확장이 안 돼요 · 노드 하나 넘어서는"
  },
  {
    "key": "co:that-said",
    "en": "that said",
    "ko": "그렇긴 한데",
    "fn": "contrast",
    "example": "It's slower. That said, it's way simpler to reason about.",
    "detail": "\"방금 한 말은 인정하는데, 그래도\" 하고 부드럽게 방향을 트는 표현이에요. 'But'보다 세련되고, 앞 내용을 깎아내리지 않으면서 반대 측면을 더하는 느낌이죠. \"느리긴 해요. 그렇긴 한데 추론하기는 훨씬 쉽거든요\"처럼 단점 인정 후 장점으로 균형 잡을 때 딱입니다. 'Having said that'도 같은 뜻인데 'That said'가 더 짧고 구어적이에요. 양면을 다 보고 있다는 인상을 줘서 시니어 면접에서 특히 점수가 되는 표현입니다.",
    "exampleKo": "더 느리긴 해요. 그렇긴 한데 추론하기는 훨씬 단순하거든요.",
    "questionEn": "Doesn't the synchronous version perform worse than the async one you rejected?",
    "termsKo": "동기 vs 비동기: 동기는 호출이 끝날 때까지 기다림(블로킹), 비동기는 작업을 넘겨두고 바로 다음 일을 진행.",
    "cueKo": "그건 · 더 느려요 · 그렇긴 해도 · 그건 · 훨씬 단순해요 · 추론하기에"
  },
  {
    "key": "co:on-the-other-hand",
    "en": "on the other hand",
    "ko": "반면에",
    "fn": "contrast",
    "example": "A queue adds latency. On the other hand, it smooths out spikes.",
    "detail": "동전의 양면을 대놓고 펼쳐 보이는 \"반면에\"예요. 'But'이 그냥 반전이라면 이건 \"한쪽 면 봤으니 이제 반대쪽 면\"이라는 균형 잡힌 비교 구조를 만들죠. 시스템 디자인에서 \"큐는 지연을 더하지만, 반면에 스파이크를 완만하게 해준다\"처럼 비용과 이득을 나란히 놓을 때 정석입니다. 원래는 'On one hand... on the other hand...' 쌍인데, 말할 땐 뒷부분만 단독으로 써도 전혀 어색하지 않아요.",
    "exampleKo": "큐는 지연을 더해요. 반면에 트래픽 스파이크를 완만하게 잡아주죠.",
    "questionEn": "Wouldn't a queue just add delay to every single request?",
    "termsKo": "스파이크 평탄화: 큐가 순간 폭증 트래픽을 버퍼처럼 담아 두고, 뒤단이 감당 가능한 속도로 꺼내 처리하게 함.",
    "cueKo": "큐는 · 더해요 · 지연을 · 반면에 · 그건 · 완만하게 만들어요 · 스파이크를"
  },
  {
    "key": "co:the-tradeoff-is",
    "en": "the tradeoff is",
    "ko": "트레이드오프는",
    "fn": "contrast",
    "example": "Caching is fast. The tradeoff is stale data.",
    "detail": "시스템 디자인 인터뷰의 핵심 단어를 그대로 박은 표현이에요. \"이 이득을 얻는 대신 치르는 비용은 이것\"이라는 구조를 한 방에 만들어주죠. \"캐싱은 빠르다, 트레이드오프는 stale 데이터\"처럼 장점 말한 직후에 비용을 스스로 짚으면 면접관이 굳이 안 물어봐도 돼서 평가가 올라갑니다. 'The catch is'(숨은 함정)보다 중립적이고 분석적인 어감이라, 공학적 판단을 보여줄 땐 이쪽이 더 격에 맞아요.",
    "exampleKo": "캐싱은 빠르죠. 트레이드오프는 데이터가 최신이 아닐 수 있다는 거예요.",
    "questionEn": "Caching sounds like a pure win for read performance — any downsides?",
    "termsKo": "스테일 데이터: 원본은 바뀌었는데 캐시엔 옛 값이 남은 상태. 캐시 무효화가 어려워서 생기는 대표적 부작용.",
    "cueKo": "캐싱은 · 빨라요 · 트레이드오프는 · 오래된 데이터예요"
  },
  {
    "key": "co:the-catch-is",
    "en": "the catch is",
    "ko": "문제는, 단점은",
    "fn": "contrast",
    "example": "We can denormalize this. The catch is keeping it in sync.",
    "detail": "\"근데 함정이 하나 있는데\" 하는 느낌의 구어체 표현이에요. 'The tradeoff is'보다 캐주얼하고, 겉보기엔 좋아 보이는 방안에 숨은 비용이 있다는 어감이 강하죠. \"비정규화하면 되긴 하는데, 문제는 동기화 유지예요\"처럼 솔깃한 해법의 뒷면을 까 보일 때 자연스럽게 나옵니다. 너무 좋은 제안을 들었을 때 되묻는 \"What's the catch?\"(조건이 뭔데요?)와 같은 뿌리니 세트로 외워두면 좋아요. 격식 있는 자리보다는 동료 간 대화나 캐주얼한 인터뷰 톤에 어울립니다.",
    "exampleKo": "이건 비정규화하면 돼요. 문제는 그걸 계속 동기화 상태로 유지하는 거죠.",
    "questionEn": "Could we just copy those customer columns into the orders table to speed up reads?",
    "termsKo": "비정규화: 조인을 줄이려고 데이터를 중복 저장하는 것. 읽기는 빨라지지만 복사본들을 동기화할 책임이 생김.",
    "cueKo": "우리는 · 비정규화할 수 있어요 · 이걸 · 함정은 · 유지하는 거예요 · 그걸 · 동기화 상태로"
  },
  {
    "key": "co:still",
    "en": "still",
    "ko": "그래도",
    "fn": "contrast",
    "example": "It's an edge case. Still, I want to handle it cleanly.",
    "detail": "반대 근거를 인정하고도 \"그래도\" 하고 자기 입장을 유지하는 단어예요. \"엣지 케이스이긴 하죠. 그래도 깔끔하게 처리하고 싶어요\"처럼, 중요도가 낮다는 걸 알면서도 챙기겠다는 엔지니어링 양심(?)을 보여줄 때 나옵니다. 'But'이 방향 전환이라면 'Still'은 \"그럼에도 불구하고 버틴다\"는 고집의 어감이에요. 시간 의미의 still(\"아직도\")과 헷갈리지 않게, 문장 맨 앞 + 쉼표 형태로 쓰면 양보의 의미가 분명해져요.",
    "exampleKo": "엣지 케이스이긴 해요. 그래도 깔끔하게 처리해두고 싶어요.",
    "questionEn": "That weird input almost never happens in production — can we just ignore it?",
    "termsKo": "엣지 케이스: 빈 입력, 경계값처럼 드물지만 로직을 깨뜨릴 수 있는 극단적 입력.",
    "cueKo": "그건 · 엣지 케이스예요 · 그래도 · 나는 · 처리하고 싶어요 · 그걸 · 깔끔하게"
  },
  {
    "key": "co:specifically",
    "en": "specifically",
    "ko": "구체적으로는",
    "fn": "elaborate",
    "example": "There's an edge case. Specifically, the empty input.",
    "detail": "추상적으로 던진 말을 \"구체적으로는 이것\" 하고 좁혀주는 줌인 렌즈예요. \"엣지 케이스가 있어요. 구체적으로는 빈 입력이요\"처럼 일반론→실제 사례로 내려갈 때 쓰죠. 인터뷰에서 두루뭉술하게 말하면 깊이가 없어 보이는데, 'Specifically'로 콕 짚어주면 디테일을 챙기는 사람으로 보입니다. 'For example'은 여러 사례 중 하나를 드는 거고, 'Specifically'는 바로 그 대상을 정확히 지목하는 거라는 차이가 있어요.",
    "exampleKo": "엣지 케이스가 하나 있어요. 구체적으로는 빈 입력이요.",
    "questionEn": "You said some inputs could break this — which ones worry you?",
    "termsKo": "엣지 케이스: 빈 문자열·0·경계값처럼 드물지만 코드를 깨뜨리기 쉬운 입력.",
    "cueKo": "있어요 · 엣지 케이스가 · 구체적으로는 · 빈 입력이요"
  },
  {
    "key": "co:in-other-words",
    "en": "in other words",
    "ko": "다시 말해",
    "fn": "elaborate",
    "example": "It's O(n log n). In other words, it scales fine.",
    "detail": "방금 한 말을 다른 각도로 다시 말해주는 \"다시 말해\"예요. 기술 용어로 말한 걸 실용적인 언어로 번역할 때 특히 유용하죠 — \"O(n log n)이에요. 다시 말해 스케일 걱정 없다는 거죠\"처럼요. 면접관이나 비기술 청중이 못 따라온 것 같을 때 구원투수로 쓰면 커뮤니케이션 능력 어필이 됩니다. 'Which means'는 논리적 귀결을 끌어내는 거고, 이건 같은 내용의 재표현이라는 게 미묘한 차이예요.",
    "exampleKo": "O(n log n)이에요. 다시 말해 스케일은 충분히 잘 된다는 거죠.",
    "questionEn": "Your solution is O(n log n) — should I worry about big inputs?",
    "termsKo": "O(n log n): 정렬 수준의 시간 복잡도. 입력이 커져도 거의 선형에 가깝게 늘어나 대부분의 규모에서 무난함.",
    "cueKo": "그건 · O(n log n)이에요 · 다시 말하면 · 그건 · 확장돼요 · 무난하게"
  },
  {
    "key": "co:what-i-mean-is",
    "en": "what I mean is",
    "ko": "제 말은",
    "fn": "elaborate",
    "example": "We need it atomic. What I mean is, all or nothing.",
    "detail": "방금 한 말이 모호했다 싶을 때 \"제 말은요\" 하고 스스로 풀어주는 표현이에요. \"원자적이어야 해요. 제 말은, 전부 되거나 전부 안 되거나요\"처럼 용어를 쉬운 말로 풀어줄 때 나오죠. 면접관 표정이 갸우뚱할 때 이걸로 자연스럽게 재설명하면 당황한 티 없이 넘어갈 수 있어요. 비슷한 'I mean'은 거의 filler 수준으로 가볍게 쓰이는 반면, 'What I mean is'는 \"진짜 의도를 풀어서 말하겠다\"는 의식적인 명료화라는 차이가 있습니다.",
    "exampleKo": "원자적이어야 해요. 제 말은, 전부 되거나 아예 안 되거나여야 한다는 거죠.",
    "questionEn": "You keep saying the operation must be atomic — can you spell that out for me?",
    "termsKo": "원자성(atomic): 작업이 전부 성공하거나 전부 롤백되거나 둘 중 하나. 어중간한 중간 상태가 남지 않음.",
    "cueKo": "우리는 · 필요로 해요 · 그게 · 원자적이기를 · 제 말은 · 전부 아니면 전무라는 거죠"
  },
  {
    "key": "co:basically",
    "en": "basically",
    "ko": "쉽게 말하면, 요컨대",
    "fn": "elaborate",
    "example": "It's a lookup table. Basically, keys map to values.",
    "detail": "복잡한 걸 한 꺼풀 벗겨서 \"본질만 말하면\" 하고 단순화하는 단어예요. \"룩업 테이블이에요. 그러니까 키가 값에 매핑되는 거죠\"처럼 핵심 구조를 한 줄로 압축할 때 나옵니다. 한국어 \"기본적으로\"보다는 \"쉽게 말하면/그러니까 요는\"에 가까운 어감이에요. 주의할 점은 남용 — 문장마다 'basically'를 붙이는 건 원어민도 지적받는 말버릇이라, 진짜 단순화가 일어나는 순간에만 쓰는 게 좋아요.",
    "exampleKo": "룩업 테이블이에요. 쉽게 말하면 키가 값으로 매핑되는 거죠.",
    "questionEn": "I've never seen this structure before — what does it actually do?",
    "termsKo": "룩업 테이블: 키를 넣으면 값이 바로 나오는 구조(해시맵 등). 평균 O(1) 조회.",
    "cueKo": "그건 · 룩업 테이블이에요 · 기본적으로 · 키가 · 매핑돼요 · 값으로"
  },
  {
    "key": "co:for-example",
    "en": "for example",
    "ko": "예를 들어",
    "fn": "elaborate",
    "example": "Some inputs break it. For example, a negative number.",
    "detail": "추상적 주장에 구체적 사례를 붙여주는 정석 표현이에요. \"어떤 입력은 이걸 깨뜨려요. 예를 들어 음수요\"처럼 일반론을 말한 직후 실례 하나를 던지면 설득력이 확 올라가죠. 인터뷰에서 엣지 케이스를 논할 때 거의 반드시 나오는 패턴입니다. 글에선 'e.g.'로 줄이지만 말할 땐 'for example'이나 더 캐주얼한 'like'를 쓰고, 'e.g.'를 발음하는(\"ee-gee\") 건 어색하니 피하세요.",
    "exampleKo": "어떤 입력은 이걸 깨뜨려요. 예를 들면 음수 같은 거요.",
    "questionEn": "Are there any inputs this function can't handle?",
    "termsKo": "",
    "cueKo": "어떤 입력들은 · 깨뜨려요 · 그걸 · 예를 들면 · 음수요"
  },
  {
    "key": "co:like",
    "en": "like",
    "ko": "~같은",
    "fn": "elaborate",
    "example": "We hit limits at scale. Like, millions of rows.",
    "detail": "예시나 대략적 수치를 던질 때 쓰는 초캐주얼한 \"예를 들면/한 ~정도\"예요. \"스케일에서 한계에 부딪혀요. 그러니까 뭐, 수백만 행쯤요\"처럼 감을 잡아주는 용도로 회화에서 정말 많이 나오죠. 'for example'보다 훨씬 가볍고 즉흥적인 느낌입니다. 다만 'like'는 북미 구어에서 filler로도 남발되는 단어라, 너무 자주 끼워 넣으면 다소 가벼워 보일 수 있어요 — 수치나 예시 앞에서만 의도적으로 쓰는 게 안전합니다.",
    "exampleKo": "스케일이 커지면 한계에 부딪혀요. 뭐, 수백만 행 정도 되면요.",
    "questionEn": "When does this single-table design start to fall over?",
    "termsKo": "",
    "cueKo": "우리는 · 부딪혀요 · 한계에 · 규모가 커지면 · 그러니까 · 수백만 행이요"
  },
  {
    "key": "co:to-be-clear",
    "en": "to be clear",
    "ko": "분명히 하자면",
    "fn": "elaborate",
    "example": "To be clear, I'm assuming a single region here.",
    "detail": "오해의 여지를 미리 차단하는 \"분명히 해두자면\"이에요. 시스템 디자인에서 \"분명히 해두자면, 여기선 단일 리전을 가정하고 있어요\"처럼 자기 가정을 명시할 때 정말 중요한 표현이죠 — 가정을 안 밝히고 진행하면 면접관과 다른 그림을 그리다 어긋날 수 있거든요. 'Just to be clear'로 시작하면 더 부드럽습니다. 'To clarify'는 이미 생긴 오해를 푸는 쪽이고, 'To be clear'는 오해가 생기기 전에 선을 긋는 쪽이라는 차이가 있어요.",
    "exampleKo": "분명히 해두자면, 여기서는 단일 리전을 가정하고 있어요.",
    "questionEn": "Before you start designing, are there any assumptions you're making?",
    "termsKo": "단일 리전: 서버·데이터가 한 지역 데이터센터에만 있다는 전제. 멀티 리전이면 복제 지연·정합성 문제가 추가됨.",
    "cueKo": "분명히 하자면 · 저는 · 가정하고 있어요 · 단일 리전을 · 여기서는"
  },
  {
    "key": "co:also",
    "en": "also",
    "ko": "또한",
    "fn": "add",
    "example": "I'd validate the input. Also, I'd log the request.",
    "detail": "포인트 하나 말한 뒤 \"하나 더 있어요\" 하고 추가하는 가장 기본적인 연결어예요. \"입력 검증할 거고요. 또 요청 로깅도 할 거예요\"처럼 체크리스트를 늘려갈 때 나오죠. 문장 맨 앞에 'Also,'로 시작하는 게 구어에선 아주 자연스럽습니다. 'too'는 문장 끝에 붙는다는 위치 차이가 있고, 격식 문서에서 보이는 'Additionally'는 말할 때 쓰면 좀 딱딱하게 들려요.",
    "exampleKo": "입력을 검증할 거고요. 그리고 요청도 로깅할 거예요.",
    "questionEn": "Is validating the input all this endpoint needs to do?",
    "termsKo": "",
    "cueKo": "나는 · 검증할 거예요 · 입력을 · 또한 · 나는 · 로그로 남길 거예요 · 요청을"
  },
  {
    "key": "co:on-top-of-that",
    "en": "on top of that",
    "ko": "게다가",
    "fn": "add",
    "example": "It's faster. On top of that, it uses less memory.",
    "detail": "직역하면 \"그 위에 얹어서\"인데, 이미 말한 것 위에 한 층 더 쌓아 누적을 강조하는 어감이에요. \"더 빨라요. 게다가 메모리도 덜 써요\"처럼 'Also'보다 임팩트 있게 장점을 포개죠. 자기가 고른 방안의 장점을 어필하는 마무리 한 방으로 좋습니다. 장점 전용은 아니에요 — \"빌드가 느린데, 게다가 간헐적으로 깨지기까지 해요\"처럼 단점을 쌓을 때도 그대로 쓰입니다. 핵심은 좋든 나쁘든 같은 방향으로 \"한 술 더 뜬다\"는 누적 강조라는 점이에요.",
    "exampleKo": "더 빠르고요. 게다가 메모리도 덜 씁니다.",
    "questionEn": "Is the speed boost the only reason you want to switch libraries?",
    "termsKo": "",
    "cueKo": "그건 · 더 빨라요 · 거기에 더해 · 그건 · 써요 · 더 적은 메모리를"
  },
  {
    "key": "co:plus",
    "en": "plus",
    "ko": "그리고, 거기다",
    "fn": "add",
    "example": "It handles nulls. Plus, it's thread safe.",
    "detail": "'Also'의 더 캐주얼한 사촌으로, \"거기다\" 하고 가볍게 장점을 얹는 느낌이에요. \"null도 처리해요. 거기다 스레드 세이프하고요\"처럼 셀링 포인트를 툭툭 추가할 때 나오죠. 수학 기호 plus에서 온 거라 \"+1 얹는\" 직역 느낌이 그대로 통합니다. 'On top of that'보다도 짧고 일상적이라 동료 간 대화 톤에 딱이지만, 아주 격식 있는 발표에서는 'Additionally'나 'Moreover' 쪽이 안전해요.",
    "exampleKo": "null도 처리해요. 거기다 스레드 세이프하기까지 하고요.",
    "questionEn": "What makes the new version of this utility better than the one we're on?",
    "termsKo": "스레드 안전: 여러 스레드가 동시에 같은 객체를 써도 상태가 깨지지 않는 성질.",
    "cueKo": "그건 · 처리해요 · 널을 · 게다가 · 그건 · 스레드 세이프예요"
  },
  {
    "key": "co:another-thing",
    "en": "another thing",
    "ko": "또 한 가지",
    "fn": "add",
    "example": "We need retries. Another thing, we need a timeout.",
    "detail": "말하다가 \"아, 그리고 하나 더\" 하고 생각난 포인트를 얹는 진짜 구어체 표현이에요. 예문처럼 'Another thing,' 하고 끊어 던지는 건 문법책엔 없지만 실제 회의에선 늘 나오는 패턴이죠. 요구사항이나 고려사항을 나열하다 \"재시도 필요하고요. 하나 더, 타임아웃도 필요해요\" 하는 장면 그대로입니다. 'Another thing is that...'으로 풀면 좀 더 정돈된 문장이 되고요. 즉흥적인 느낌이 강해서, 준비된 발표보다는 토론·브레인스토밍 톤에 어울려요.",
    "exampleKo": "재시도가 필요하고요. 하나 더, 타임아웃도 필요해요.",
    "questionEn": "Is adding retries enough to make this external call reliable?",
    "termsKo": "타임아웃: 일정 시간 안에 응답이 없으면 포기하는 장치. 재시도와 한 쌍으로 쓰는 외부 호출 방어의 기본.",
    "cueKo": "우리는 · 필요해요 · 재시도가 · 하나 더 · 우리는 · 필요해요 · 타임아웃이"
  },
  {
    "key": "co:and",
    "en": "and",
    "ko": "그리고",
    "fn": "add",
    "example": "I'd add an index. And I'd cache the hot keys.",
    "detail": "설명이 필요 없어 보이는 'and'지만, 예문처럼 문장을 끊고 'And I'd...'로 새로 시작하는 게 핵심 포인트예요. 학교에선 'And'로 문장을 시작하지 말라고 배우지만, 말할 때는 \"인덱스 추가할 거고요. 그리고 핫 키는 캐싱할 거예요\"처럼 끊어 말하는 게 오히려 듣기 편하고 자연스럽습니다. 긴 한 문장에 and를 줄줄이 이어붙이는 것보다 짧게 끊고 'And'로 잇는 게 인터뷰에서 전달력이 훨씬 좋아요.",
    "exampleKo": "인덱스를 추가할 거고요. 그리고 핫 키들은 캐싱하겠습니다.",
    "questionEn": "This lookup endpoint gets slow under heavy traffic — how would you speed it up?",
    "termsKo": "핫 키: 유난히 자주 조회되는 소수의 키. 이것만 캐시해도 부하 대부분이 줄어듦.",
    "cueKo": "나는 · 추가할 거예요 · 인덱스를 · 그리고 · 나는 · 캐싱할 거예요 · 핫 키들을"
  },
  {
    "key": "co:so-basically",
    "en": "so basically",
    "ko": "그러니까 요약하면",
    "fn": "conclude",
    "example": "We trade memory for speed. So basically, it's a cache.",
    "detail": "길게 설명한 걸 \"그러니까 한마디로\" 하고 압축하는 콤보 표현이에요. 'so'(그래서)와 'basically'(본질만 말하면)가 합쳐져서, 디테일을 다 펼친 뒤 핵심 한 줄로 착지할 때 쓰죠. \"메모리를 속도와 맞바꾸는 거죠. 그러니까 결국 캐시예요\"처럼 복잡한 메커니즘을 익숙한 개념으로 매핑해주면 면접관이 \"아, 이해했구나\" 하고 안심합니다. 다만 설명 시작부터 'So basically...'로 여는 건 filler처럼 들리니, 요약 착지 용도로 아껴 쓰는 게 좋아요.",
    "exampleKo": "메모리를 내주고 속도를 얻는 거죠. 그러니까 결국 캐시예요.",
    "questionEn": "I got lost in the details — what does this component boil down to?",
    "termsKo": "캐시의 본질: 결과를 메모리에 저장해 속도를 사는 것 — 비용은 메모리 사용량과 데이터 신선도.",
    "cueKo": "우리는 · 맞바꿔요 · 메모리를 · 속도와 · 그러니까 결국 · 그건 · 캐시예요"
  },
  {
    "key": "co:the-bottom-line-is",
    "en": "the bottom line is",
    "ko": "결론은",
    "fn": "conclude",
    "example": "Both work. The bottom line is, I'd pick the simpler one.",
    "detail": "재무제표 맨 아랫줄(최종 손익)에서 온 표현으로, \"이것저것 다 따져도 결론은 이것\"이라는 어감이에요. \"둘 다 돼요. 결론은, 저라면 더 단순한 쪽을 고르겠습니다\"처럼 비교 분석 끝에 최종 입장을 박을 때 쓰죠. 인터뷰에서 트레이드오프만 나열하고 결정을 안 내리면 우유부단해 보이는데, 이 표현으로 명확히 착지하면 결단력이 보입니다. 'To sum up'이 내용 요약이라면 이건 \"핵심 판단/결론\"을 던지는 거라는 차이가 있어요.",
    "exampleKo": "둘 다 동작해요. 결론은, 저라면 더 단순한 쪽을 고르겠다는 겁니다.",
    "questionEn": "We've debated these two designs all morning — where do you land?",
    "termsKo": "",
    "cueKo": "둘 다 · 돌아가요 · 결론은 · 나는 · 고를 거예요 · 더 단순한 쪽을"
  },
  {
    "key": "co:to-sum-up",
    "en": "to sum up",
    "ko": "정리하자면",
    "fn": "conclude",
    "example": "To sum up, hash map for lookups, sorted array for ranges.",
    "detail": "긴 답변을 마무리하며 \"정리하자면\" 하고 핵심을 다시 묶어주는 표현이에요. \"정리하면, 룩업은 해시맵, 범위 조회는 정렬\"처럼 앞에서 펼친 내용을 한두 줄로 압축하면 면접관 머릿속에 답이 깔끔하게 남죠. 답이 길어졌다 싶을 때 이걸로 닫아주면 구조적으로 사고하는 사람이라는 인상을 줍니다. 'In summary'는 좀 더 문어체/발표체고, 말할 땐 'To sum up'이나 'So to sum up'이 자연스러워요.",
    "exampleKo": "정리하자면, 룩업에는 해시맵, 범위 조회에는 정렬된 구조를 씁니다.",
    "questionEn": "We're almost out of time — can you wrap up your comparison of the two data structures?",
    "termsKo": "해시맵은 단건 조회 O(1), 정렬 구조(트리·정렬 배열)는 범위 검색과 순서 순회에 유리.",
    "cueKo": "정리하면 · 해시맵은 · 조회용으로 · 정렬된 건 · 범위용으로"
  },
  {
    "key": "co:at-the-end-of-the-day",
    "en": "at the end of the day",
    "ko": "결국 중요한 건",
    "fn": "conclude",
    "example": "At the end of the day, correctness comes first.",
    "detail": "직역하면 \"하루가 끝날 때\"지만 실제로는 \"이러쿵저러쿵해도 결국 중요한 건\"이라는 관용구예요. \"결국 중요한 건 정확성이 우선이라는 거죠\"처럼 세부 논쟁을 다 걷어내고 근본 원칙으로 회귀할 때 쓰죠. 트레이드오프 토론이 길어진 뒤 우선순위 하나를 딱 세우는 마무리 멘트로 좋습니다. 다만 북미에서 다소 닳은 클리셰 취급도 받는 표현이라 한 인터뷰에서 한 번 정도만 쓰는 게 좋고, 시간 표현(\"하루 끝에\")으로 오해하면 안 돼요.",
    "exampleKo": "결국 중요한 건, 정확성이 최우선이라는 거예요.",
    "questionEn": "If you have to choose between shipping on time and getting it right, which wins?",
    "termsKo": "",
    "cueKo": "결국에는 · 정확성이 · 먼저 와요"
  },
  {
    "key": "co:so-my-answer-is",
    "en": "so my answer is",
    "ko": "그래서 제 답은",
    "fn": "conclude",
    "example": "So my answer is, I'd go with the hash map.",
    "detail": "탐색과 비교를 끝내고 \"그래서 제 답은 이겁니다\" 하고 최종 답을 선언하는 표현이에요. 코딩 인터뷰에서 여러 접근을 검토한 뒤 \"그래서 제 답은, 해시맵으로 가겠습니다\" 하고 닫는 장면 그대로죠. 인터뷰에서 의외로 많은 사람이 빠뜨리는 게 이 명시적 착지인데, 이게 없으면 면접관이 \"그래서 뭘 고른다는 거지?\" 하고 끝나버립니다. 'I'd go with...'와 세트로 외워두면 결정 선언 한 문장이 완성돼요.",
    "exampleKo": "그래서 제 답은, 해시맵으로 가겠다는 겁니다.",
    "questionEn": "Alright, you've weighed both options — give me your final pick.",
    "termsKo": "",
    "cueKo": "그래서 제 답은 · 저는 · 가겠어요 · 해시맵으로"
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

export interface ParticleGroup { particle: string; coreKo: string; items: PhraseCard[]; }

export const PARTICLE_GROUPS: ParticleGroup[] = [
  {
    "particle": "up",
    "coreKo": "up은 아래에 있던 것이 위로 올라오거나, 0에서 완성·가동 상태로 차오르는 그림. scale up(키워 올림), stand up(세워서 가동), free up(묶인 자원을 풀어 올림), queue up(줄 세워 준비)이 모두 '증가·준비·가동' 방향이다. 이 그림을 잡으면 처음 보는 up 구동사도 '뭔가 켜지거나 늘어나는 쪽'으로 추측할 수 있다.",
    "items": [
      {
        "key": "pv:scale-up",
        "en": "scale up",
        "ko": "(서버 사양을) 키우다, 수직 확장하다",
        "example": "We can scale up the instance before the traffic spike.",
        "situations": [
          "트래픽 급증 대비 회의",
          "인프라 비용/성능 트레이드오프 논의",
          "성능 테스트 결과 공유"
        ],
        "detail": "직역하면 '규모를 위로 올리다'. 서버 한 대의 CPU나 메모리를 키우는 수직 확장 얘기할 때 바로 나오는 말이야. scale out(대수를 늘리는 수평 확장)이랑 짝으로 묶어 쓰면 시스템 설계 인터뷰에서 깔끔하게 들려.",
        "exampleKo": "트래픽 몰리기 전에 인스턴스를 키워둘 수 있어요.",
        "questionEn": "Traffic doubles next week and one server is struggling. What's your plan?",
        "termsKo": "수직 확장(scale up): 서버 한 대의 사양을 올리는 것. 수평 확장(scale out): 서버 대수를 늘리는 것.",
        "cueKo": "우리는 · 키워둘 수 있다 · 그 인스턴스를 · 트래픽 급증 전에"
      },
      {
        "key": "pv:back-up",
        "en": "back up",
        "ko": "백업하다, 안전하게 복사해 두다",
        "example": "Make sure we back up the database before the migration.",
        "situations": [
          "DB 마이그레이션 직전 체크리스트",
          "장애 복구 계획 논의"
        ],
        "detail": "뒤(back)에 예비본을 만들어 올려둔다(up)는 그림. 위험한 작업 전에 '일단 백업부터'라고 말할 때 동사로 그대로 써. 명사 backup은 한 단어, 동사는 back up처럼 띄어 쓰는 것만 주의.",
        "exampleKo": "마이그레이션 전에 DB 백업부터 꼭 해두자.",
        "questionEn": "We're about to run a risky schema change on production. What should we do first?",
        "termsKo": "",
        "cueKo": "확실히 하자 · 우리가 백업하는 걸 · 그 데이터베이스를 · 마이그레이션 전에"
      },
      {
        "key": "pv:free-up",
        "en": "free up",
        "ko": "(자원·시간을) 확보하다, 풀어주다",
        "example": "Killing that old job will free up a lot of memory.",
        "situations": [
          "메모리/디스크 부족 대응",
          "일정 조정으로 리소스 확보 논의"
        ],
        "detail": "묶여 있던 자원을 풀어서(free) 쓸 수 있는 상태로 끌어올린다(up)는 그림. 메모리·디스크·사람 시간까지 전부 목적어로 와. 'free up some time'처럼 일정 얘기에도 매일 쓰여서 활용도가 아주 높아.",
        "exampleKo": "그 오래된 잡 죽이면 메모리가 꽤 확보될 거예요.",
        "questionEn": "The server is almost out of memory. How can we get some breathing room?",
        "termsKo": "",
        "cueKo": "죽이는 건 · 그 오래된 잡을 · 풀어줄 거다 · 많은 메모리를"
      },
      {
        "key": "pv:queue-up",
        "en": "queue up",
        "ko": "대기열에 쌓이다/쌓아 두다",
        "example": "Requests just queue up until a worker picks them up.",
        "situations": [
          "비동기 처리 구조 설명",
          "배포 파이프라인 대기 상황 설명"
        ],
        "detail": "줄(queue)을 세워서 순서대로 준비시킨다는 그림. 비동기 시스템 설명할 때 '요청이 큐에 쌓인다'를 한 단어로 처리해 줘. 사람이 주어면 '줄 서서 기다리다'라는 뜻으로도 쓰여.",
        "exampleKo": "요청은 워커가 가져갈 때까지 큐에 쌓여요.",
        "questionEn": "What happens to incoming requests when all the workers are busy?",
        "termsKo": "큐(queue): 먼저 들어온 작업을 먼저 처리하는 대기열. 메시지 큐는 생산자와 소비자를 분리해 부하를 흡수한다.",
        "cueKo": "요청들은 · 그냥 쌓인다 · 워커가 · 그것들을 집어갈 때까지"
      },
      {
        "key": "pv:stand-up",
        "en": "stand up",
        "ko": "(서비스·환경을) 새로 구축해 띄우다",
        "example": "It took a day to stand up the staging environment.",
        "situations": [
          "새 환경 구축 일정 공유",
          "PoC 환경 준비 논의"
        ],
        "detail": "누워 있던 걸 일으켜 세워 돌아가게 만든다는 그림. spin up이 인스턴스 하나 띄우는 가벼운 느낌이라면, stand up은 환경·서비스·프로세스를 처음부터 구축해 가동시키는 더 큰 단위에 써. 데일리 스탠드업 미팅과는 다른 용법이니 맥락으로 구분해.",
        "exampleKo": "스테이징 환경 띄우는 데 하루 걸렸어요.",
        "questionEn": "How long would it take to get a brand-new test environment running from scratch?",
        "termsKo": "",
        "cueKo": "걸렸다 · 하루가 · 세워 띄우는 데 · 스테이징 환경을"
      },
      {
        "key": "pv:level-up",
        "en": "level up",
        "ko": "(실력·수준을) 한 단계 끌어올리다",
        "example": "Pairing with seniors really helped me level up my design skills.",
        "situations": [
          "성장 경험 인터뷰 답변",
          "팀 역량 강화 논의"
        ],
        "detail": "게임에서 레벨 오르는 그 그림 그대로, 실력이나 수준을 한 단계 끌어올린다는 뜻. 성장 스토리 말할 때 improve보다 캐주얼하고 생기 있게 들려. 'level up the team'처럼 팀을 목적어로도 써.",
        "exampleKo": "시니어랑 페어 하면서 설계 실력이 확 늘었어요.",
        "questionEn": "What helped you grow the most as an engineer in the last year?",
        "termsKo": "",
        "cueKo": "페어링하는 것이 · 시니어들과 · 정말 도와줬다 · 내가 · 레벨업하도록 · 내 설계 스킬을"
      }
    ]
  },
  {
    "particle": "down",
    "coreKo": "down은 아래로 내려가거나, 줄이고 잘게 쪼개서 바닥(핵심)까지 내려가는 그림. drill down(파고 내려감), dial down(다이얼을 돌려 줄임), boil down(졸여서 핵심만 남김), shut down(내려서 끔)이 다 여기서 나온다. '줄이기·끄기·핵심으로 내려가기' 세 갈래만 잡으면 처음 보는 down 구동사도 대부분 추측된다.",
    "items": [
      {
        "key": "pv:drill-down",
        "en": "drill down",
        "ko": "(데이터·문제를) 세부까지 파고들다",
        "example": "Let's drill down into the latency numbers by endpoint.",
        "situations": [
          "대시보드 보며 원인 분석",
          "메트릭 리뷰 회의"
        ],
        "detail": "드릴로 한 층씩 뚫고 내려가는 그림. 집계된 숫자에서 출발해 더 세부 단위(엔드포인트별, 유저별)로 파고들 때 쓰는 대시보드·메트릭 회의의 단골 표현이야. dig into가 대상 자체를 조사하는 거라면, drill down은 '위에서 아래로 단계별로' 내려가는 방향성이 강해.",
        "exampleKo": "엔드포인트별로 레이턴시 수치를 더 파고들어 봅시다.",
        "questionEn": "The average latency looks fine, but something feels wrong. How would you investigate deeper?",
        "termsKo": "",
        "cueKo": "파고들어 보자 · 레이턴시 수치들 속으로 · 엔드포인트별로"
      },
      {
        "key": "pv:shut-down",
        "en": "shut down",
        "ko": "(서비스·서버를) 내리다, 종료하다",
        "example": "We shut down the legacy service last quarter.",
        "situations": [
          "레거시 정리 경험 설명",
          "장애 시 긴급 차단 결정"
        ],
        "detail": "돌아가던 걸 내려서(down) 닫는다(shut)는 그림. 서비스 폐기, 서버 종료, 긴급 차단까지 폭넓게 쓰는 기본 동사야. 명사형 shutdown(graceful shutdown 같은)도 세트로 알아두면 좋아.",
        "exampleKo": "레거시 서비스는 지난 분기에 내렸어요.",
        "questionEn": "What happened to the old legacy system after the migration finished?",
        "termsKo": "",
        "cueKo": "우리는 · 내렸다 · 그 레거시 서비스를 · 지난 분기에"
      },
      {
        "key": "pv:dial-down",
        "en": "dial down",
        "ko": "(강도·수치를) 한 단계 낮추다",
        "example": "Can we dial down the log verbosity in production?",
        "situations": [
          "로그 비용 절감 논의",
          "알림 피로 줄이기 논의"
        ],
        "detail": "볼륨 다이얼을 왼쪽으로 돌려 줄이는 그림. 로그 출력량, 알림 빈도, 공격적인 톤처럼 '강도'를 한 단계 낮추자고 할 때 부드럽게 들려. reduce보다 '조절 가능한 걸 살짝 낮춘다'는 뉘앙스야.",
        "exampleKo": "프로덕션에서 로그 양 좀 줄일 수 있을까요?",
        "questionEn": "Our production logs are way too noisy and expensive. Any suggestions?",
        "termsKo": "",
        "cueKo": "우리가 · 낮출 수 있을까 · 로그 상세 수준을 · 프로덕션에서?"
      },
      {
        "key": "pv:boil-down-to",
        "en": "boil down to",
        "ko": "결국 ~로 요약되다, 귀결되다",
        "example": "The whole outage boils down to one missing null check.",
        "situations": [
          "포스트모템 결론 정리",
          "복잡한 논쟁 한 줄 요약"
        ],
        "detail": "국물을 끓여 졸이면(boil down) 진액만 남듯, 복잡한 얘기가 결국 핵심 하나로 요약된다는 그림. 포스트모템이나 긴 논쟁 마무리에 'It boils down to X'라고 하면 정리 잘하는 사람처럼 들려. 주어는 보통 문제·논의이고, to 뒤에 핵심이 와.",
        "exampleKo": "이번 장애는 결국 널 체크 하나 빠진 거로 귀결돼요.",
        "questionEn": "After all that investigation, what was the root cause in one sentence?",
        "termsKo": "",
        "cueKo": "그 장애 전체는 · 결국 귀결된다 · 하나의 빠진 널 체크로"
      },
      {
        "key": "pv:pare-down",
        "en": "pare down",
        "ko": "(군더더기를) 쳐내서 줄이다",
        "example": "We pared down the API surface to just five endpoints.",
        "situations": [
          "스코프 축소 논의",
          "API 설계 단순화 설명"
        ],
        "detail": "과도로 껍질 깎아내듯(pare) 군더더기를 쳐내 줄인다는 그림. 스코프, API 표면적, 기능 목록을 의도적으로 슬림하게 만들 때 써. reduce보다 '불필요한 걸 골라 깎아냈다'는 적극적인 뉘앙스가 있어.",
        "exampleKo": "API를 엔드포인트 다섯 개로 확 줄였어요.",
        "questionEn": "The original design had twenty endpoints. How did you simplify it?",
        "termsKo": "",
        "cueKo": "우리는 · 쳐서 줄였다 · API 표면을 · 딱 다섯 개 엔드포인트로"
      }
    ]
  },
  {
    "particle": "out",
    "coreKo": "out은 안에 있던 것이 밖으로 나가거나, 끝까지 소진되어 바닥나는 그림. comment out(코드를 실행 흐름 밖으로 빼냄), time out(시간이 다 빠져나가 끝남), max out(한도까지 차서 소진), fan out(부채처럼 바깥으로 퍼짐). '밖으로·소진·완료' 세 그림만 잡으면 out 구동사 대부분이 풀린다.",
    "items": [
      {
        "key": "pv:comment-out",
        "en": "comment out",
        "ko": "주석 처리해서 비활성화하다",
        "example": "Just comment out that line and see if the test passes.",
        "situations": [
          "디버깅 중 원인 격리",
          "임시로 기능 끄기"
        ],
        "detail": "코드를 주석 기호로 감싸서 실행 대상 '밖으로' 빼버리는 그림. 디버깅하다가 범인 후보 줄을 잠깐 꺼볼 때 매일 쓰는 말이야. 지운 게 아니라 잠깐 꺼둔 거라는 뉘앙스까지 포함돼 있어서 delete와 구분돼.",
        "exampleKo": "그 줄 주석 처리하고 테스트 통과하는지 봐봐.",
        "questionEn": "You suspect one line is breaking the build. What's the quickest way to check?",
        "termsKo": "",
        "cueKo": "그냥 주석 처리해 · 그 줄을 · 그리고 봐 · 테스트가 통과하는지"
      },
      {
        "key": "pv:stub-out",
        "en": "stub out",
        "ko": "임시 구현(스텁)으로 막아두다",
        "example": "I stubbed out the payment API so the tests run offline.",
        "situations": [
          "외부 의존성 있는 테스트 설계",
          "미구현 기능 자리 임시 처리"
        ],
        "detail": "본 구현 대신 빈 껍데기(stub)로 막아서 일단 바깥쪽 흐름이 돌게 만든다는 그림. 외부 API에 의존하는 테스트나 아직 안 만든 함수 자리를 채울 때 써. mock out도 거의 같은 뜻인데, stub은 고정 응답만 주고 mock은 호출 검증까지 한다는 미묘한 차이가 있어.",
        "exampleKo": "테스트가 오프라인에서도 돌게 결제 API는 스텁으로 막아놨어요.",
        "questionEn": "How do you test code that depends on a third-party service you can't call in CI?",
        "termsKo": "스텁(stub): 진짜 구현 대신 정해진 값만 돌려주는 가짜 객체. 외부 의존성을 끊고 테스트할 때 쓴다.",
        "cueKo": "나는 · 스텁으로 막아뒀다 · 결제 API를 · 그래서 테스트들이 · 돈다 · 오프라인으로"
      },
      {
        "key": "pv:time-out",
        "en": "time out",
        "ko": "시간 초과로 실패하다",
        "example": "The request times out after thirty seconds and retries.",
        "situations": [
          "외부 API 연동 장애 설명",
          "타임아웃/재시도 정책 설계"
        ],
        "detail": "주어진 시간이 다 빠져나가서(out) 끝나버린다는 그림. 장애 설명할 때 'requests were timing out'은 거의 매일 나오는 문장이야. 명사·형용사형 timeout(타임아웃 값)과 동사형을 자유롭게 오가면 자연스러워.",
        "exampleKo": "요청이 30초 지나면 타임아웃 나고 재시도해요.",
        "questionEn": "What happens if the downstream service never responds to our request?",
        "termsKo": "타임아웃: 응답을 무한정 기다리지 않도록 제한 시간을 두는 것. 재시도·서킷브레이커와 묶여 다니는 개념.",
        "cueKo": "그 요청은 · 타임아웃된다 · 30초 후에 · 그리고 재시도한다"
      },
      {
        "key": "pv:error-out",
        "en": "error out",
        "ko": "에러를 내며 죽다, 실패로 끝나다",
        "example": "The batch job errored out halfway through the night.",
        "situations": [
          "배치 실패 보고",
          "CI 실패 공유"
        ],
        "detail": "에러를 뱉으면서 프로세스가 끝까지 못 가고 밖으로 튕겨 나간다는 그림. fail과 비슷하지만 '에러 내고 죽었다'는 구체적 그림이 있어서 배치·스크립트·CI 얘기에 잘 어울려. 비격식 구어라 문서보단 대화·슬랙에서 쓰는 말이야.",
        "exampleKo": "배치 잡이 밤사이에 중간에 에러 나고 죽었어요.",
        "questionEn": "Why is this morning's data missing from the report?",
        "termsKo": "",
        "cueKo": "그 배치 잡이 · 에러 내며 죽었다 · 밤이 반쯤 지났을 때"
      },
      {
        "key": "pv:max-out",
        "en": "max out",
        "ko": "한도까지 꽉 차다, 소진하다",
        "example": "We maxed out the connection pool during the sale.",
        "situations": [
          "부하 장애 회고",
          "리소스 한도 논의"
        ],
        "detail": "한도(max)까지 꽉 채워 소진했다는 그림. 커넥션 풀, 디스크, CPU, API 쿼터까지 '한계에 부딪힌' 상황을 한 단어로 전달해. 'maxed out at 100 connections'처럼 at으로 한도 수치를 붙이면 깔끔해.",
        "exampleKo": "세일 때 커넥션 풀이 한도까지 꽉 찼었어요.",
        "questionEn": "Describe a time your system hit a hard resource limit under load.",
        "termsKo": "커넥션 풀: DB 연결을 미리 만들어 재사용하는 풀. 한도가 차면 새 요청이 대기하거나 실패한다.",
        "cueKo": "우리는 · 한계까지 채웠다 · 커넥션 풀을 · 세일 기간 동안"
      },
      {
        "key": "pv:fan-out",
        "en": "fan out",
        "ko": "(하나가 여러 갈래로) 퍼져 나가다",
        "example": "One write fans out to thousands of follower feeds.",
        "situations": [
          "피드 시스템 설계 인터뷰",
          "메시지 브로드캐스트 구조 설명"
        ],
        "detail": "부채(fan)가 펴지듯 하나가 여러 갈래로 퍼지는 그림. 시스템 설계 인터뷰에서 피드 전파, 메시지 브로드캐스트, 병렬 호출을 설명할 때 핵심 용어야. 반대 방향으로 여러 개를 하나로 모으는 건 fan in이라고 해.",
        "exampleKo": "쓰기 한 번이 수천 명 팔로워 피드로 퍼져 나가요.",
        "questionEn": "In a social feed design, what happens when a celebrity posts something?",
        "termsKo": "팬아웃(fan-out): 요청·메시지 하나가 여러 대상으로 퍼지는 패턴. 트위터식 피드 설계의 단골 주제.",
        "cueKo": "쓰기 한 번이 · 퍼져 나간다 · 수천 개의 팔로워 피드로"
      }
    ]
  },
  {
    "particle": "off",
    "coreKo": "off는 붙어있던 것이 떨어져 나가며 발동되거나 차단되는 그림. branch off(본체에서 갈라져 나감), cut off(잘려 떨어져 차단), hand off(내 손에서 떼어 넘김), kill off(완전히 떼어내 없앰)가 모두 그 그림이다. '분리'가 핵심이고 분리의 결과가 시작(발동)일 수도, 끝(차단)일 수도 있다는 것만 알면 처음 보는 off 구동사도 추측 가능하다.",
    "items": [
      {
        "key": "pv:branch-off",
        "en": "branch off",
        "ko": "(본 줄기에서) 갈라져 나오다, 브랜치를 따다",
        "example": "I branched off main to try the new caching idea.",
        "situations": [
          "git 작업 방식 설명",
          "실험적 작업 시작 공유"
        ],
        "detail": "나무 본 줄기에서 가지(branch)가 갈라져 나오는 그림 그대로야. git에서 브랜치 딸 때 'branch off main'처럼 기준 브랜치를 뒤에 붙여 말해. 큰 프로젝트에서 하위 작업이 갈라져 나올 때도 쓸 수 있어.",
        "exampleKo": "새 캐싱 아이디어 시험해 보려고 main에서 브랜치 땄어요.",
        "questionEn": "You want to experiment without touching the shared codebase. What do you do?",
        "termsKo": "",
        "cueKo": "나는 · 브랜치를 따냈다 · main에서 · 시도해 보려고 · 새 캐싱 아이디어를"
      },
      {
        "key": "pv:kill-off",
        "en": "kill off",
        "ko": "완전히 없애다, 영구 폐기하다",
        "example": "We finally killed off the old PHP admin tool.",
        "situations": [
          "레거시 제거 성과 공유",
          "기능 폐기 결정"
        ],
        "detail": "그냥 kill이 프로세스 하나 죽이는 거라면, off가 붙으면 '완전히 떼어내서 다시는 안 살아나게 없앤다'는 완결의 뉘앙스가 더해져. 레거시 시스템·기능을 영구 폐기했다고 말할 때 딱이야. deprecate(단계적 폐기 예고)보다 한참 뒤의 최종 단계.",
        "exampleKo": "드디어 옛날 PHP 어드민 툴을 완전히 없앴어요.",
        "questionEn": "That ancient internal tool nobody maintains anymore — what should we do with it?",
        "termsKo": "",
        "cueKo": "우리는 · 마침내 · 완전히 없앴다 · 그 낡은 PHP 어드민 툴을"
      },
      {
        "key": "pv:hand-off",
        "en": "hand off",
        "ko": "(작업·당번을) 넘기다, 인계하다",
        "example": "I'll hand off the on-call rotation to Sarah next week.",
        "situations": [
          "온콜 교대",
          "업무 인계 계획 공유"
        ],
        "detail": "릴레이에서 바통을 손에서 떼어 넘기는 그림. 온콜 교대, 작업 인계, 디자인에서 개발로의 전달처럼 '내 차례 끝, 네 차례 시작'을 말할 때 써. 명사 handoff(인수인계)로도 매일 나와.",
        "exampleKo": "다음 주에 온콜 당번을 사라한테 넘길 거예요.",
        "questionEn": "You're going on vacation during your on-call week. What do you do?",
        "termsKo": "",
        "cueKo": "나는 · 넘길 거다 · 온콜 로테이션을 · Sarah에게 · 다음 주에"
      },
      {
        "key": "pv:cut-off",
        "en": "cut off",
        "ko": "차단하다, 끊다",
        "example": "The load balancer cuts off unhealthy instances automatically.",
        "situations": [
          "헬스체크 동작 설명",
          "악성 트래픽 차단 논의",
          "회의에서 정중하게 끼어들 때"
        ],
        "detail": "가위로 잘라서 떨어뜨려 차단하는 그림. 로드밸런서가 죽은 인스턴스를 제외하거나 악성 트래픽을 끊는 것부터, 말 중간에 끼어드는 것까지 다 같은 그림이야. 회의에서 'Sorry to cut you off'는 정중하게 끼어들 때의 단골 멘트니 같이 외워둬.",
        "exampleKo": "로드밸런서가 비정상 인스턴스를 자동으로 차단해요.",
        "questionEn": "How does traffic stop reaching a server that just crashed?",
        "termsKo": "헬스체크: 로드밸런서가 주기적으로 인스턴스 상태를 확인해, 실패하면 트래픽 대상에서 제외하는 메커니즘.",
        "cueKo": "로드 밸런서는 · 끊어낸다 · 비정상 인스턴스들을 · 자동으로"
      },
      {
        "key": "pv:back-off",
        "en": "back off",
        "ko": "물러나다; (재시도 간격을) 점점 늘리다",
        "example": "The client backs off exponentially after each failed retry.",
        "situations": [
          "재시도 전략 설계 인터뷰",
          "장애 시 요청 폭주 방지 설명"
        ],
        "detail": "뒤로 물러나며 떨어지는 그림. 일상에선 '한발 물러서다'지만, 엔지니어링에선 재시도 간격을 점점 늘리는 백오프 전략으로 매일 등장해. exponential backoff는 시스템 설계 인터뷰 필수 어휘니까 동사형과 명사형 둘 다 입에 붙여둬.",
        "exampleKo": "클라이언트가 재시도 실패할 때마다 간격을 지수적으로 늘려요.",
        "questionEn": "If every client retries a failing server at once, things get worse. What's the standard fix?",
        "termsKo": "지수 백오프(exponential backoff): 재시도 간격을 1초, 2초, 4초처럼 배로 늘려 서버 과부하를 막는 전략.",
        "cueKo": "클라이언트는 · 물러나 간격을 벌린다 · 지수적으로 · 매번 실패한 재시도 후에"
      }
    ]
  },
  {
    "particle": "back",
    "coreKo": "back은 갔던 방향을 되돌려 원점이나 상대에게 돌아오는 그림. push back(밀어 되돌림 = 반대 의견), report back(돌아와서 보고), write back(나중에 원본에 되돌려 씀), get back to(나중에 돌아가 답함). 무언가가 '되돌아오는' 방향성 하나만 잡으면 back 구동사는 거의 다 풀린다.",
    "items": [
      {
        "key": "pv:push-back-on",
        "en": "push back on",
        "ko": "(제안·요구에) 반대 의견을 내다",
        "example": "I pushed back on the deadline because the scope doubled.",
        "situations": [
          "무리한 일정 협상",
          "기술 부채 늘리는 요구 거절",
          "의견 충돌 behavioral 답변"
        ],
        "detail": "밀려오는 걸 되민다는 그림. 무리한 일정이나 스코프 요구에 정중하지만 단호하게 반대 의견을 내는 거야. behavioral 인터뷰의 '의견 충돌 경험' 질문에 이 단어를 쓰면 미국 직장 어휘를 아는 사람처럼 들려. 명사로도 'There was some pushback'처럼 자주 써.",
        "exampleKo": "스코프가 두 배가 돼서 일정에 이의를 제기했어요.",
        "questionEn": "Tell me about a time you disagreed with a decision from your manager.",
        "termsKo": "",
        "cueKo": "나는 · 반대하며 밀어냈다 · 그 마감을 · 왜냐하면 범위가 · 두 배가 됐으니까"
      },
      {
        "key": "pv:scale-back",
        "en": "scale back",
        "ko": "(계획·규모를) 축소하다",
        "example": "We scaled back the launch to just two regions.",
        "situations": [
          "일정 압박으로 범위 조정",
          "비용 절감 논의"
        ],
        "detail": "키웠던 규모를 원래 방향으로 되돌려 줄인다는 그림. 일정 압박이나 비용 문제로 출시 범위·기능을 축소할 때 쓰는 말이야. scale down이 인프라 사양 얘기에 가깝다면, scale back은 계획·야망을 줄이는 쪽에 더 잘 붙어.",
        "exampleKo": "출시 범위를 두 개 리전으로 축소했어요.",
        "questionEn": "The original plan was too ambitious for the timeline. What did you do?",
        "termsKo": "",
        "cueKo": "우리는 · 줄였다 · 그 런칭을 · 딱 두 개 리전으로"
      },
      {
        "key": "pv:get-back-to",
        "en": "get back to",
        "ko": "(사람에게) 나중에 답을 주다",
        "example": "Let me check the logs and get back to you.",
        "situations": [
          "회의 중 모르는 질문 받았을 때",
          "슬랙으로 확인 요청 받았을 때"
        ],
        "detail": "지금은 답을 못 주지만 나중에 너에게 돌아오겠다는 그림. 모르는 질문을 받았을 때 'Let me get back to you'는 가장 프로페셔널한 대응이야. 추측으로 대답하는 것보다 백배 나으니 인터뷰에서도 회의에서도 입에 붙여둬.",
        "exampleKo": "로그 확인해 보고 다시 말씀드릴게요.",
        "questionEn": "A teammate asks a question you can't answer right now. What do you say?",
        "termsKo": "",
        "cueKo": "내가 · 확인해 볼게 · 로그를 · 그리고 다시 연락할게 · 너에게"
      },
      {
        "key": "pv:report-back",
        "en": "report back",
        "ko": "확인 후 돌아와 결과를 공유하다",
        "example": "I'll test the fix on staging and report back tomorrow.",
        "situations": [
          "조사 작업 마무리 멘트",
          "스탠드업에서 후속 조치 약속"
        ],
        "detail": "나가서 확인하고 돌아와 보고한다는 그림. 회의 끝낼 때 'I'll report back by Friday'처럼 기한을 붙이면 신뢰가 쌓여. get back to가 '답변 주기'라면 report back은 '조사 결과 공유'라는 약간 더 공식적인 느낌이야.",
        "exampleKo": "스테이징에서 픽스 테스트해 보고 내일 결과 공유할게요.",
        "questionEn": "You're leaving the meeting to investigate an issue. How do you close the conversation?",
        "termsKo": "",
        "cueKo": "나는 · 테스트할 거다 · 그 수정안을 · 스테이징에서 · 그리고 결과를 알릴게 · 내일"
      },
      {
        "key": "pv:write-back",
        "en": "write back",
        "ko": "(캐시가) 나중에 원본 저장소에 다시 쓰다",
        "example": "The cache writes back to the database asynchronously.",
        "situations": [
          "캐시 전략 설계 인터뷰",
          "데이터 정합성/유실 리스크 논의"
        ],
        "detail": "캐시에 먼저 쓰고 나중에 원본 저장소로 '되돌려 쓴다'는 그림. 캐시 전략 설명에서 write-through(즉시 동기 반영)와 대비시키는 용어라 시스템 설계 인터뷰에 직결돼. 일상 영어에선 '답장하다'라는 뜻도 있으니 맥락으로 구분해.",
        "exampleKo": "캐시가 DB에는 비동기로 나중에 써요.",
        "questionEn": "Compare caching strategies where the database is updated immediately versus later.",
        "termsKo": "write-back 캐시: 일단 캐시에만 쓰고 원본 저장소엔 나중에 반영하는 방식. 빠르지만 장애 시 유실 위험이 있어 write-through와 대비된다.",
        "cueKo": "캐시는 · 다시 써 넣는다 · 데이터베이스로 · 비동기로"
      }
    ]
  },
  {
    "particle": "in",
    "coreKo": "in은 바깥에 있던 것이 경계 안으로 들어와 자리잡는 그림. plug in(꽂아 넣음), opt in(스스로 안으로 들어감), bake in(구워 넣어 분리 불가), pass in(함수 안으로 건네 넣음)이 모두 '안으로 들여 포함시키는' 방향이다. 이 그림 하나로 처음 보는 in 구동사도 '뭔가를 안에 넣거나 합류시키는 뜻'으로 추측할 수 있다.",
    "items": [
      {
        "key": "pv:opt-in",
        "en": "opt in",
        "ko": "(스스로 선택해서) 참여하다, 켜다",
        "example": "Users have to opt in before we collect any analytics.",
        "situations": [
          "개인정보/동의 정책 설명",
          "베타 기능 참여 방식 설명"
        ],
        "detail": "선택지(option) 안으로 스스로 걸어 들어간다는 그림. 기본은 꺼져 있고 사용자가 명시적으로 동의해야 켜지는 방식을 말해. 프라이버시 규제나 베타 프로그램 설명에서 필수 어휘고, 반대는 opt out.",
        "exampleKo": "분석 데이터 수집 전에 사용자가 직접 동의해야 해요.",
        "questionEn": "How do users start receiving the new beta features — automatically or by choice?",
        "termsKo": "옵트인/옵트아웃: 기본 꺼짐 상태에서 사용자가 켜는 게 옵트인, 기본 켜짐에서 사용자가 끄는 게 옵트아웃.",
        "cueKo": "사용자들은 · 옵트인해야 한다 · 우리가 수집하기 전에 · 어떤 분석 데이터든"
      },
      {
        "key": "pv:check-in",
        "en": "check in",
        "ko": "(코드를) 저장소에 넣다; 근황을 공유하다",
        "example": "Don't check in secrets — use environment variables instead.",
        "situations": [
          "코드 리뷰/보안 지적",
          "스탠드업·1:1 근황 공유"
        ],
        "detail": "맡겨 넣는다는 그림이 둘로 갈라져. 코드 맥락에선 저장소에 커밋해 넣는 것, 사람 맥락에선 '잠깐 상황 공유하자(quick check-in)'는 뜻이야. 둘 다 미국 팀 일상 어휘라 맥락으로 구분해서 들으면 돼.",
        "exampleKo": "시크릿은 커밋하지 말고 환경변수 쓰세요.",
        "questionEn": "What's the rule about putting API keys into the repository?",
        "termsKo": "",
        "cueKo": "체크인하지 마 · 시크릿들을 — 써 · 환경변수를 · 대신에"
      },
      {
        "key": "pv:plug-in",
        "en": "plug in",
        "ko": "꽂아서 연결하다, 갈아 끼우다",
        "example": "You can plug in any storage backend that implements this interface.",
        "situations": [
          "플러그인 구조 설명",
          "교체 가능한 설계 강조"
        ],
        "detail": "콘센트에 플러그 꽂듯 끼워서 바로 연결한다는 그림. 인터페이스만 맞으면 구현체를 갈아 끼울 수 있다는 설계 자랑할 때 딱이야. pluggable(끼울 수 있는), plugin(플러그인) 같은 파생어도 전부 같은 그림이야.",
        "exampleKo": "이 인터페이스만 구현하면 어떤 스토리지 백엔드든 꽂아 쓸 수 있어요.",
        "questionEn": "How easy is it to replace the storage layer in your design?",
        "termsKo": "플러그인 아키텍처: 핵심은 고정하고 기능을 모듈로 꽂았다 뺐다 할 수 있게 만든 설계.",
        "cueKo": "너는 · 끼워 넣을 수 있다 · 어떤 스토리지 백엔드든 · 구현하기만 하면 · 이 인터페이스를"
      },
      {
        "key": "pv:drop-in",
        "en": "drop in",
        "ko": "수정 없이 그대로 끼워 넣다",
        "example": "The new library is a drop-in replacement for the old one.",
        "situations": [
          "라이브러리 마이그레이션 논의",
          "의존성 교체 제안"
        ],
        "detail": "툭 떨어뜨려 넣으면 그대로 작동한다는 그림. 'drop-in replacement'는 코드 수정 없이 갈아 끼울 수 있는 호환 대체재를 뜻하는 굳어진 표현이야. 마이그레이션 논의에서 이 말이 나오면 '작업량 거의 없음'이라는 신호.",
        "exampleKo": "새 라이브러리는 기존 거랑 코드 수정 없이 바로 교체 가능해요.",
        "questionEn": "Will switching to the new library require changing our existing code?",
        "termsKo": "drop-in replacement: API가 호환돼서 코드 수정 없이 갈아 끼울 수 있는 대체재.",
        "cueKo": "새 라이브러리는 · 그대로 갈아 끼우는 대체품이다 · 예전 것에 대한"
      },
      {
        "key": "pv:pass-in",
        "en": "pass in",
        "ko": "(인자로) 넘겨주다",
        "example": "Just pass in the config object instead of a global.",
        "situations": [
          "코드 리뷰 피드백",
          "의존성 주입 설명"
        ],
        "detail": "함수 경계 안으로 값을 건네 넣는다는 그림. 코드 리뷰에서 '전역 말고 인자로 받아라'고 할 때의 표준 표현이야. 의존성 주입 설명할 때도 'dependencies are passed in'처럼 자연스럽게 쓰여.",
        "exampleKo": "전역 변수 말고 설정 객체를 인자로 넘기세요.",
        "questionEn": "How should this function get its configuration — global state or something else?",
        "termsKo": "의존성 주입(DI): 객체가 필요한 것을 직접 만들지 않고 외부에서 받게 하는 패턴. 테스트가 쉬워진다.",
        "cueKo": "그냥 넘겨 넣어 · config 객체를 · 전역 변수 대신에"
      },
      {
        "key": "pv:bake-in",
        "en": "bake in",
        "ko": "처음부터 설계에 녹여 넣다, 내장시키다",
        "example": "Security needs to be baked in, not bolted on later.",
        "situations": [
          "설계 원칙 논의",
          "보안/관측성 설계 인터뷰"
        ],
        "detail": "빵 반죽에 재료를 넣고 구우면 못 빼내듯, 처음부터 설계에 녹여 넣어 분리 불가능하게 만든다는 그림. 보안·관측성·테스트 가능성은 나중에 못 붙인다고 주장할 때 쓰는 말이야. 반대말은 bolt on(나사로 대충 덧붙임)이고, 이 대조쌍으로 기억하면 좋아.",
        "exampleKo": "보안은 나중에 덧붙이는 게 아니라 처음부터 설계에 넣어야 해요.",
        "questionEn": "When is the right time to start thinking about security in a project?",
        "termsKo": "",
        "cueKo": "보안은 · 처음부터 구워 넣어져야 한다 · 나중에 덧붙이는 게 아니라"
      }
    ]
  },
  {
    "particle": "into",
    "coreKo": "into는 밖에서 안으로 '뚫고 들어가는' 운동의 그림. in이 정적인 포함이라면 into는 들어가는 동작 자체다. look into(들여다보러 들어감), hook into(갈고리 걸고 파고듦), feed into(흘려 넣음)처럼 조사·연결·투입의 뉘앙스가 핵심이고, 이 그림을 알면 처음 보는 into 구동사도 방향이 보인다.",
    "items": [
      {
        "key": "pv:look-into",
        "en": "look into",
        "ko": "조사해 보다, 알아보다",
        "example": "I'll look into why the deploy failed this morning.",
        "situations": [
          "이슈 할당 받았을 때",
          "스탠드업에서 조사 계획 공유"
        ],
        "detail": "안을 들여다보러 들어간다는 그림. 이슈를 할당받거나 원인 모를 문제를 떠안을 때 'I'll look into it'은 만능 답변이야. investigate보다 캐주얼하고, dig into보다 가볍게 '일단 알아보겠다' 단계의 말이야.",
        "exampleKo": "오늘 아침 배포가 왜 실패했는지 알아볼게요.",
        "questionEn": "The deployment failed an hour ago and nobody knows why. What's your next step?",
        "termsKo": "",
        "cueKo": "내가 · 들여다볼게 · 왜 배포가 · 실패했는지 · 오늘 아침에"
      },
      {
        "key": "pv:hook-into",
        "en": "hook into",
        "ko": "(시스템 내부에) 걸어 연결하다, 끼어들다",
        "example": "The profiler hooks into the JVM to sample stack traces.",
        "situations": [
          "모니터링 도구 동작 원리 설명",
          "라이프사이클 훅 설명"
        ],
        "detail": "갈고리(hook)를 걸어 시스템 내부 흐름에 끼어든다는 그림. 프로파일러나 APM 에이전트가 런타임에 붙는 방식, 라이프사이클의 특정 시점에 코드 끼우는 것 모두 이 말로 설명돼. hook 자체가 명사로도 매일 쓰이는 핵심 용어야.",
        "exampleKo": "프로파일러가 JVM에 붙어서 스택 트레이스를 샘플링해요.",
        "questionEn": "How does the monitoring agent get data out of a running application?",
        "termsKo": "훅(hook): 시스템의 특정 시점에 내 코드를 끼워 넣을 수 있게 열어둔 지점. git hook, React hook 등.",
        "cueKo": "프로파일러는 · 파고들어 연결된다 · JVM에 · 샘플링하려고 · 스택 트레이스를"
      },
      {
        "key": "pv:tap-into",
        "en": "tap into",
        "ko": "(기존 자원을) 끌어다 쓰다",
        "example": "We can tap into the existing event stream for analytics.",
        "situations": [
          "기존 인프라 재활용 제안",
          "데이터 소스 결정 논의"
        ],
        "detail": "수도관에 꼭지(tap)를 꽂아 흐르는 걸 빼 쓰는 그림. 이미 존재하는 데이터 스트림·인프라·팀의 전문성을 새로 만들지 않고 끌어다 쓸 때 써. '바닥부터 새로 안 만들어도 된다'는 절약의 뉘앙스가 핵심이야.",
        "exampleKo": "분석용으로는 기존 이벤트 스트림을 끌어다 쓰면 돼요.",
        "questionEn": "Do we need new infrastructure for analytics, or is there something we already have?",
        "termsKo": "",
        "cueKo": "우리는 · 끌어다 쓸 수 있다 · 기존 이벤트 스트림을 · 분석용으로"
      },
      {
        "key": "pv:feed-into",
        "en": "feed into",
        "ko": "~로 흘러 들어가다, 입력이 되다",
        "example": "The click logs feed into the recommendation model nightly.",
        "situations": [
          "데이터 파이프라인 설명",
          "지표가 의사결정에 반영되는 흐름 설명"
        ],
        "detail": "먹이를 흘려 넣듯 한 시스템의 출력이 다른 시스템의 입력으로 들어간다는 그림. 데이터 파이프라인 설명의 기본 동사야. '이 지표가 의사결정에 반영된다(feeds into the decision)'처럼 추상적인 흐름에도 똑같이 써.",
        "exampleKo": "클릭 로그가 매일 밤 추천 모델로 흘러 들어가요.",
        "questionEn": "Where does the training data for the recommendation system come from?",
        "termsKo": "",
        "cueKo": "클릭 로그들은 · 흘러 들어간다 · 추천 모델로 · 매일 밤"
      },
      {
        "key": "pv:fold-into",
        "en": "fold into",
        "ko": "(별도였던 것을) 합쳐 흡수시키다",
        "example": "We folded the auth service into the main API.",
        "situations": [
          "서비스 통합 결정 설명",
          "팀/프로젝트 합병 공유"
        ],
        "detail": "요리에서 반죽에 재료를 접어 넣어 섞듯, 별도로 존재하던 것을 더 큰 것에 흡수시킨다는 그림. 마이크로서비스를 모놀리스로 합치거나 팀·프로젝트가 통합될 때 쓰는 말이야. merge보다 '흡수돼서 별도 정체성이 사라진다'는 뉘앙스가 강해.",
        "exampleKo": "인증 서비스를 메인 API에 합쳐 넣었어요.",
        "questionEn": "What happened to the separate authentication service after the re-architecture?",
        "termsKo": "",
        "cueKo": "우리는 · 접어 넣었다 · 인증 서비스를 · 메인 API 안으로"
      }
    ]
  },
  {
    "particle": "through",
    "coreKo": "through는 입구로 들어가 끝까지 통과해 나오는 그림. read through(처음부터 끝까지 읽음), fall through(아무 데도 안 걸리고 빠져나감), pass through(가공 없이 통과), follow through(끝까지 해냄). '끝까지·관통'이 핵심이라, through가 붙으면 '대충'의 반대라고 보면 된다.",
    "items": [
      {
        "key": "pv:fall-through",
        "en": "fall through",
        "ko": "(계획이) 무산되다; (조건에 안 걸리고) 다음으로 떨어지다",
        "example": "The vendor deal fell through, so we're building it in-house.",
        "situations": [
          "계획 변경 사유 설명",
          "switch문 fall-through 코드 리뷰"
        ],
        "detail": "그물코 사이로 빠져 떨어지는 그림. 계획·계약이 성사 직전에 무산될 때 쓰는 게 일상 뜻이고, 코드에선 switch 문에서 break 없이 다음 case로 떨어지는 동작도 같은 단어야. '아무 데도 안 걸리고 빠져나갔다'는 그림 하나로 둘 다 커버돼.",
        "exampleKo": "벤더 계약이 무산돼서 자체 개발하기로 했어요.",
        "questionEn": "Why are you building the payment system internally instead of buying the vendor solution?",
        "termsKo": "switch fall-through: case에 break를 안 쓰면 다음 case까지 이어서 실행되는 동작. 의도적일 수도, 버그일 수도 있다.",
        "cueKo": "벤더 계약이 · 무산됐다 · 그래서 우리는 · 만들고 있다 · 그걸 · 자체적으로"
      },
      {
        "key": "pv:pass-through",
        "en": "pass through",
        "ko": "가공 없이 그대로 통과시키다",
        "example": "The gateway just passes the auth header through to the backend services.",
        "situations": [
          "API 게이트웨이 설계 설명",
          "프록시 동작 설명"
        ],
        "detail": "중간을 가공 없이 그대로 통과한다는 그림. 게이트웨이·프록시가 헤더나 페이로드를 손대지 않고 넘길 때 쓰는 표준 표현이야. 명사 pass-through도 설계 문서에 자주 등장해.",
        "exampleKo": "게이트웨이는 인증 헤더를 그대로 서비스로 통과시켜요.",
        "questionEn": "Does the gateway modify request headers, or do they reach the services unchanged?",
        "termsKo": "패스스루(pass-through): 중간 계층이 데이터를 가공하지 않고 그대로 전달하는 방식.",
        "cueKo": "게이트웨이는 · 그냥 통과시킨다 · 인증 헤더를 · 백엔드 서비스들로"
      },
      {
        "key": "pv:think-through",
        "en": "think through",
        "ko": "끝까지 빠짐없이 따져 생각하다",
        "example": "Let's think through the failure modes before we ship this.",
        "situations": [
          "설계 리뷰에서 신중론 제기",
          "엣지 케이스 점검 제안"
        ],
        "detail": "생각을 입구부터 출구까지 끝까지 관통시킨다는 그림. think about이 '생각해 본다' 정도라면, think through는 엣지 케이스·실패 모드까지 빠짐없이 따진다는 철저함이 핵심이야. 'Have we thought this through?'는 설계 리뷰에서 신중론을 꺼내는 정중한 방법.",
        "exampleKo": "출시 전에 실패 시나리오를 끝까지 따져 봅시다.",
        "questionEn": "The design looks good on paper, but are we ready to ship it today?",
        "termsKo": "",
        "cueKo": "끝까지 생각해 보자 · 실패 모드들을 · 우리가 내보내기 전에 · 이걸"
      },
      {
        "key": "pv:read-through",
        "en": "read through",
        "ko": "처음부터 끝까지 다 읽다",
        "example": "I read through the RFC and left a few comments.",
        "situations": [
          "설계 문서 리뷰 후 공유",
          "코드베이스 파악 과정 설명"
        ],
        "detail": "문서를 처음부터 끝까지 관통해서 읽는다는 그림. skim(대충 훑기)과 달리 빠짐없이 다 읽었다는 뉘앙스야. 'I read through the RFC'라고 하면 제대로 검토했다는 신호가 돼.",
        "exampleKo": "RFC 끝까지 읽고 코멘트 몇 개 남겼어요.",
        "questionEn": "Did you get a chance to review the design document I sent yesterday?",
        "termsKo": "",
        "cueKo": "나는 · 끝까지 읽었다 · 그 RFC를 · 그리고 남겼다 · 몇 개의 코멘트를"
      },
      {
        "key": "pv:follow-through",
        "en": "follow through",
        "ko": "(약속·계획을) 끝까지 실행하다",
        "example": "We agreed on the fix, but nobody followed through.",
        "situations": [
          "포스트모템 액션아이템 점검",
          "실행력 관련 behavioral 답변"
        ],
        "detail": "골프 스윙처럼 동작을 끝까지 이어간다는 그림. 합의·약속·액션아이템을 말로만 끝내지 않고 실제 실행까지 완수하는 거야. 포스트모템에서 '액션아이템 팔로스루가 안 됐다'는 식으로 실행력 얘기할 때의 핵심 어휘.",
        "exampleKo": "수정하기로 합의는 했는데 아무도 끝까지 실행 안 했어요.",
        "questionEn": "The retro produced ten action items last month. What actually happened to them?",
        "termsKo": "",
        "cueKo": "우리는 · 합의했다 · 그 수정안에 · 하지만 아무도 · 끝까지 하지 않았다"
      }
    ]
  },
  {
    "particle": "over",
    "coreKo": "over는 위를 넘어 반대편으로 옮겨가거나, 위에서 전체를 덮어 훑는 그림. fail over(장애 시 옆으로 넘어감), hand over(통째로 건네 넘김), carry over(다음 칸으로 들고 넘어감), look over(위에서 훑어봄), start over(출발점으로 되넘어감). '넘김·전환·훑기' 세 갈래로 거의 다 풀린다.",
    "items": [
      {
        "key": "pv:fail-over",
        "en": "fail over",
        "ko": "(장애 시) 예비 시스템으로 자동 전환되다",
        "example": "If the primary dies, traffic fails over to the replica.",
        "situations": [
          "고가용성 설계 인터뷰",
          "DR(재해복구) 훈련 설명"
        ],
        "detail": "주 시스템이 쓰러지면(fail) 역할이 예비 쪽으로 넘어간다(over)는 그림. 고가용성 설계 인터뷰의 필수 동사이고 명사 failover로도 매일 쓰여. 계획된 수동 전환은 switchover, 장애로 인한 자동 전환이 failover라는 구분까지 알면 플러스야.",
        "exampleKo": "프라이머리가 죽으면 트래픽이 레플리카로 자동 전환돼요.",
        "questionEn": "What happens to user traffic when the primary database suddenly crashes?",
        "termsKo": "페일오버: 주 시스템 장애 시 예비 시스템이 자동으로 역할을 이어받는 것. 고가용성(HA)의 핵심 메커니즘.",
        "cueKo": "만약 프라이머리가 죽으면 · 트래픽은 · 넘어간다 · 레플리카로"
      },
      {
        "key": "pv:hand-over",
        "en": "hand over",
        "ko": "(소유권·책임을) 통째로 인계하다",
        "example": "I handed over the service with full runbooks before leaving.",
        "situations": [
          "이직/팀 이동 시 인수인계",
          "프로젝트 오너십 이전"
        ],
        "detail": "손에 든 걸 통째로 상대에게 건네 넘기는 그림. hand off가 릴레이 바통 터치처럼 가볍고 일상적이라면, hand over는 소유권과 책임 전체를 공식적으로 인계하는 무게감이 있어. 이직·팀 이동 때 handover document를 만드는 게 표준 관행이야.",
        "exampleKo": "떠나기 전에 런북까지 다 갖춰서 서비스를 인계했어요.",
        "questionEn": "How did you make sure your team was okay after you switched roles?",
        "termsKo": "",
        "cueKo": "나는 · 넘겨줬다 · 그 서비스를 · 완전한 런북과 함께 · 떠나기 전에"
      },
      {
        "key": "pv:carry-over",
        "en": "carry over",
        "ko": "(다음 기간·버전으로) 이월되다, 넘어가다",
        "example": "Two unfinished tickets carry over to the next sprint.",
        "situations": [
          "스프린트 회고/플래닝",
          "설정이 새 버전에 유지되는지 설명"
        ],
        "detail": "이번 칸에서 못 끝낸 걸 들고 다음 칸으로 넘어가는 그림. 스프린트에서 못 끝낸 티켓, 이전 버전에서 유지되는 설정, 회계의 이월까지 전부 이 단어야. 회고에서 'carryover가 많다'는 건 플래닝이 안 맞는다는 신호로 통해.",
        "exampleKo": "못 끝낸 티켓 두 개는 다음 스프린트로 이월돼요.",
        "questionEn": "What happens to the stories we didn't finish this sprint?",
        "termsKo": "",
        "cueKo": "미완료 티켓 두 개가 · 이월된다 · 다음 스프린트로"
      },
      {
        "key": "pv:look-over",
        "en": "look over",
        "ko": "가볍게 훑어보며 검토하다",
        "example": "Could you look over my PR before the standup?",
        "situations": [
          "가벼운 리뷰 요청",
          "문서 검토 부탁"
        ],
        "detail": "위에서 전체를 한번 훑어본다는 그림. 정식 리뷰보다 가볍게 '한번 봐줄래?'라고 부탁할 때 딱이야. review가 공식 절차라면, look over는 동료에게 청하는 캐주얼한 2차 확인이라는 온도 차이가 있어.",
        "exampleKo": "스탠드업 전에 제 PR 한번 봐주실 수 있어요?",
        "questionEn": "Your pull request is ready but needs a second pair of eyes. What do you ask?",
        "termsKo": "",
        "cueKo": "너 · 훑어봐 줄 수 있어? · 내 PR을 · 스탠드업 전에"
      },
      {
        "key": "pv:start-over",
        "en": "start over",
        "ko": "처음부터 다시 하다",
        "example": "The prototype taught us enough that starting over was faster.",
        "situations": [
          "재작성 결정 설명",
          "실패한 접근 회고"
        ],
        "detail": "지금 있는 자리를 버리고 출발점으로 되넘어가 다시 시작한다는 그림. 리팩터링으로는 답이 없어 처음부터 다시 짜기로 한 결정을 말할 때 써. rewrite가 행위 자체라면, start over는 '엎고 다시 간다'는 결단의 뉘앙스야.",
        "exampleKo": "프로토타입에서 배운 게 많아서 처음부터 다시 짜는 게 더 빨랐어요.",
        "questionEn": "The first implementation was a mess. Did you refactor it or do something else?",
        "termsKo": "",
        "cueKo": "프로토타입이 · 가르쳐줬다 · 우리에게 · 충분히 · 처음부터 다시 하는 게 · 더 빠르다는 걸"
      }
    ]
  },
  {
    "particle": "on",
    "coreKo": "on은 표면 위에 붙어서 떨어지지 않고 계속되는 그림. take on(어깨에 짊어짐), build on(토대 위에 쌓음), tack on(핀으로 덧붙임), hinge on(경첩에 매달려 좌우됨), drag on(붙은 채 질질 계속됨). '접촉 + 지속'이라는 두 축만 잡으면 on 구동사의 뜻이 보인다.",
    "items": [
      {
        "key": "pv:take-on",
        "en": "take on",
        "ko": "(일·책임을) 맡다, 떠안다",
        "example": "I took on the migration project no one wanted.",
        "situations": [
          "주도성 어필 behavioral 답변",
          "업무 분담 논의"
        ],
        "detail": "짐을 어깨 위에(on) 받아 짊어진다는 그림. 아무도 안 하려는 일이나 도전적인 책임을 자발적으로 맡았다고 말할 때 쓰는, behavioral 인터뷰 최고 빈출 동사 중 하나야. accept보다 능동적이고 주도적인 느낌이 강해.",
        "exampleKo": "아무도 안 맡으려던 마이그레이션 프로젝트를 제가 맡았어요.",
        "questionEn": "Tell me about a challenging responsibility you volunteered for.",
        "termsKo": "",
        "cueKo": "나는 · 떠맡았다 · 그 마이그레이션 프로젝트를 · 아무도 원하지 않던"
      },
      {
        "key": "pv:build-on",
        "en": "build on",
        "ko": "~을 기반으로 쌓아 올리다; (의견에) 덧붙이다",
        "example": "The new pipeline builds on the existing event infrastructure.",
        "situations": [
          "기존 인프라 재사용 설명",
          "회의에서 남의 의견에 덧붙이기"
        ],
        "detail": "기존 토대 위에(on) 쌓아 올린다는 그림. 바닥부터 새로 안 만들고 기존 인프라를 재활용했다고 강조할 때 쓰고, 회의에선 'To build on what she said...'처럼 남의 의견에 덧붙일 때도 매일 쓰여. 두 용법 다 입에 붙여둘 가치가 있어.",
        "exampleKo": "새 파이프라인은 기존 이벤트 인프라를 기반으로 만들었어요.",
        "questionEn": "Was the new pipeline created from scratch, or did it reuse existing pieces?",
        "termsKo": "",
        "cueKo": "새 파이프라인은 · 기반으로 삼아 쌓는다 · 기존 이벤트 인프라를"
      },
      {
        "key": "pv:tack-on",
        "en": "tack on",
        "ko": "(설계에 안 녹은 채) 대충 덧붙이다",
        "example": "Caching feels tacked on — it should be part of the design.",
        "situations": [
          "설계 리뷰 비판",
          "막판 스코프 추가 요구 경계"
        ],
        "detail": "압정(tack)으로 슥 꽂아 붙인 그림이라 '급하게, 설계에 안 녹은 채 덧붙임'이라는 부정적 뉘앙스가 기본이야. 설계 리뷰에서 'feels tacked on'은 꽤 강한 비판. bake in(처음부터 녹여 넣음)의 정반대 표현으로 기억해.",
        "exampleKo": "캐싱이 대충 덧붙인 느낌이에요 — 설계에 녹아 있어야죠.",
        "questionEn": "What's your honest opinion of how the caching layer was added?",
        "termsKo": "",
        "cueKo": "캐싱은 · 느껴진다 · 덧붙인 것처럼 — 그건 · 되어야 한다 · 설계의 일부가"
      },
      {
        "key": "pv:hinge-on",
        "en": "hinge on",
        "ko": "~ 하나에 전적으로 달려 있다",
        "example": "The whole design hinges on the queue never losing messages.",
        "situations": [
          "설계 리스크 지적",
          "핵심 전제 조건 명시"
        ],
        "detail": "문이 경첩(hinge)에 매달려 그것 하나로 움직이듯, 전체가 한 가지 전제에 좌우된다는 그림. 설계의 핵심 가정이나 리스크를 짚을 때 'The design hinges on X'라고 하면 임팩트 있게 들려. depend on보다 '그거 하나 무너지면 전부 무너진다'는 절박함이 있어.",
        "exampleKo": "이 설계 전체가 큐가 메시지를 안 잃는다는 전제에 달려 있어요.",
        "questionEn": "What's the single biggest assumption behind your design?",
        "termsKo": "",
        "cueKo": "전체 설계가 · 달려 있다 · 큐가 · 절대 잃지 않는 데 · 메시지를"
      },
      {
        "key": "pv:drag-on",
        "en": "drag on",
        "ko": "(회의·작업이) 질질 늘어지다",
        "example": "The migration dragged on for three months longer than planned.",
        "situations": [
          "지연된 프로젝트 회고",
          "길어지는 회의 문화 지적"
        ],
        "detail": "끌리는(drag) 상태가 계속(on)된다는 그림. 회의·프로젝트·마이그레이션이 예정보다 질질 늘어질 때 쓰는 말이야. 부정적 뉘앙스가 기본이라, 본인 프로젝트 회고에서 쓰면 솔직함을 보여주는 효과가 있어.",
        "exampleKo": "마이그레이션이 계획보다 석 달이나 더 질질 끌렸어요.",
        "questionEn": "How did the timeline of that migration project actually go?",
        "termsKo": "",
        "cueKo": "마이그레이션은 · 질질 끌렸다 · 3개월이나 더 · 계획보다"
      }
    ]
  },
  {
    "particle": "around",
    "coreKo": "around는 가운데 장애물이나 중심을 빙 둘러 도는 그림. work around(막힌 곳을 돌아서 우회), poke around(이리저리 쑤시고 다니며 탐색), kick around(공 돌리듯 아이디어를 굴림), get around to(빙 돌다 마침내 도달). '우회·탐색·빙 돌기'를 잡으면 around 구동사는 거의 다 추측된다.",
    "items": [
      {
        "key": "pv:work-around",
        "en": "work around",
        "ko": "우회해서 해결하다",
        "example": "We can't fix the driver bug, but we can work around it.",
        "situations": [
          "서드파티 버그 대응",
          "임시 해결책 공유"
        ],
        "detail": "막힌 길을 정면 돌파하지 않고 빙 돌아간다는 그림. 서드파티 버그처럼 근본 원인을 못 고칠 때 증상을 피해 가는 임시 대응을 말해. 명사 workaround는 이슈 트래커와 슬랙에서 매일 보는 단어야.",
        "exampleKo": "드라이버 버그를 고칠 순 없지만 우회는 가능해요.",
        "questionEn": "The bug is in a library we don't control. What are our options?",
        "termsKo": "워크어라운드(workaround): 근본 원인을 못 고칠 때 증상을 피해 가는 임시 우회책. 명사로도 매일 쓰인다.",
        "cueKo": "우리는 · 고칠 수 없다 · 그 드라이버 버그를 · 하지만 우리는 · 우회할 수 있다 · 그걸"
      },
      {
        "key": "pv:wrap-around",
        "en": "wrap around",
        "ko": "끝에 닿으면 처음으로 되감기다",
        "example": "The counter wraps around to zero after the max value.",
        "situations": [
          "정수 오버플로 버그 설명",
          "원형 버퍼 설명"
        ],
        "detail": "끝에 닿으면 종이가 감기듯 처음으로 되돌아간다는 그림. 정수 오버플로, 원형 버퍼, 시계 산술이 다 이 단어로 설명돼. 'the counter wraps around'는 오버플로 버그를 설명하는 표준 문장이야.",
        "exampleKo": "카운터가 최댓값 넘으면 0으로 되돌아가요.",
        "questionEn": "What happens to a 32-bit counter when it exceeds its maximum value?",
        "termsKo": "정수 오버플로/원형 버퍼: 값이 표현 한계를 넘으면 처음으로 되감기는 동작. 의도하면 ring buffer, 의도 안 하면 버그.",
        "cueKo": "카운터는 · 한 바퀴 돌아 되돌아간다 · 0으로 · 최대값 이후에"
      },
      {
        "key": "pv:poke-around",
        "en": "poke around",
        "ko": "이리저리 둘러보다, 뒤져 보다",
        "example": "I poked around the codebase to see how auth works.",
        "situations": [
          "온보딩 첫 주 활동 설명",
          "디버깅 초기 탐색"
        ],
        "detail": "막대기로 여기저기 쿡쿡 찔러보며 돌아다니는 그림. 목적지를 정하지 않고 코드베이스·시스템을 가볍게 탐색하는 행동이야. 온보딩이나 디버깅 초기에 'I poked around a bit'이라고 하면 아주 자연스러운 구어가 돼.",
        "exampleKo": "인증이 어떻게 도는지 코드베이스를 좀 뒤져 봤어요.",
        "questionEn": "You just joined the team. How do you start learning the codebase?",
        "termsKo": "",
        "cueKo": "나는 · 여기저기 뒤져봤다 · 코드베이스를 · 보려고 · 어떻게 인증이 · 동작하는지"
      },
      {
        "key": "pv:kick-around",
        "en": "kick around",
        "ko": "(아이디어를) 이리저리 굴려 보다",
        "example": "We kicked around a few ideas for the caching layer.",
        "situations": [
          "브레인스토밍 회고",
          "설계 초기 논의 설명"
        ],
        "detail": "공을 발로 이리저리 돌려 차듯 아이디어를 가볍게 굴려본다는 그림. 결론을 내려는 게 아니라 브레인스토밍 단계라는 신호야. 'We kicked around a few ideas'는 설계 초기 논의를 설명하는 가장 자연스러운 표현 중 하나.",
        "exampleKo": "캐싱 레이어 관련해서 아이디어 몇 개 굴려 봤어요.",
        "questionEn": "How did the team explore options before settling on the final design?",
        "termsKo": "",
        "cueKo": "우리는 · 이리저리 굴려봤다 · 몇 가지 아이디어를 · 캐싱 레이어를 위한"
      },
      {
        "key": "pv:get-around-to",
        "en": "get around to",
        "ko": "(미루다가) 마침내 ~할 짬을 내다",
        "example": "I never got around to writing tests for that module.",
        "situations": [
          "기술 부채 솔직 고백",
          "미뤄둔 작업 언급"
        ],
        "detail": "다른 일들을 빙 돌아 마침내 그 일에 도달한다는 그림. 미뤄뒀던 일을 '결국 했다' 또는 '끝내 못 했다'고 말할 때 써. 'never got around to it'은 기술 부채를 솔직하게 고백하는 가장 자연스러운 문장이야.",
        "exampleKo": "그 모듈 테스트는 결국 짬을 못 내서 못 썼어요.",
        "questionEn": "Why does that module still have zero test coverage?",
        "termsKo": "",
        "cueKo": "나는 · 끝내 짬을 내지 못했다 · 테스트 쓰는 데 · 그 모듈을 위한"
      }
    ]
  }
];
export const COLLOCATION_CARDS: PhraseCard[] = [
  {
    "key": "cl:merge-a-branch",
    "en": "merge a branch",
    "ko": "브랜치를 머지하다(본류에 병합하다)",
    "example": "Once CI passes, I'll merge the branch into main.",
    "situations": [
      "PR 승인 후 다음 단계를 말할 때",
      "릴리즈 전에 작업을 main에 합칠 때"
    ],
    "detail": "갈라져 나온 작업 줄기를 본류에 합친다는 그림이야. PR이 승인되고 CI가 초록불이면 '이제 합친다'고 매일같이 말하는 표현. 방향은 merge into main처럼 into로 붙이는 게 자연스럽고, 히스토리를 새로 쓰는 rebase와 달리 합치는 기록이 남는다.",
    "exampleKo": "CI 통과하면 그 브랜치 main에 머지할게.",
    "questionEn": "The review is approved and all checks are green. What do you do next with that work?",
    "termsKo": "브랜치: 메인 코드에서 갈라져 나온 독립적인 작업 줄기.",
    "cueKo": "일단 CI가 통과하면 · 나는 · 머지할게 · 그 브랜치를 · main으로"
  },
  {
    "key": "cl:rebase-a-branch",
    "en": "rebase a branch",
    "ko": "브랜치를 리베이스하다(최신 main 위로 다시 올리다)",
    "example": "Can you rebase your branch on main before we merge?",
    "situations": [
      "브랜치가 main보다 뒤처졌을 때",
      "머지 전에 히스토리 정리를 요청할 때"
    ],
    "detail": "내 커밋들을 떼어다가 최신 main 꼭대기 위에 다시 쌓는 그림. 브랜치가 오래돼서 main과 벌어졌을 때 '리베이스부터 하고 머지하자'고 말한다. merge와 달리 히스토리가 일직선이 되는 대신, 공유 브랜치에서 하면 동료들 히스토리가 깨지니 조심.",
    "exampleKo": "머지하기 전에 네 브랜치 main 위로 리베이스해 줄래?",
    "questionEn": "A teammate's work has fallen behind the trunk and history looks tangled. What do you ask them to do first?",
    "termsKo": "rebase: 커밋들을 다른 기준점 위로 옮겨 다시 적용하는 git 명령. 히스토리가 직선이 됨.",
    "cueKo": "너 · 리베이스해 줄래 · 네 브랜치를 · main 위로 · 우리가 머지하기 전에?"
  },
  {
    "key": "cl:squash-commits",
    "en": "squash commits",
    "ko": "여러 커밋을 하나로 합치다(스쿼시)",
    "example": "I'll squash the commits before merging to keep history clean.",
    "situations": [
      "자잘한 WIP 커밋이 많은 PR을 정리할 때",
      "머지 전략을 논의할 때"
    ],
    "detail": "squash는 짓눌러 납작하게 만든다는 뜻이라, 자잘한 커밋 여러 개를 한 덩어리로 눌러 합치는 그림이야. 'fix typo' 같은 커밋이 열 개씩 쌓인 PR을 머지하기 전에 거의 반사적으로 나오는 말. GitHub의 squash and merge 버튼 덕분에 동사로 완전히 굳었다.",
    "exampleKo": "히스토리 깔끔하게 하려고 머지 전에 커밋들 스쿼시할게.",
    "questionEn": "Your PR has fifteen tiny work-in-progress entries in its history. How do you clean that up before it goes in?",
    "termsKo": "",
    "cueKo": "나는 · 스쿼시할게 · 그 커밋들을 · 머지하기 전에 · 히스토리를 깔끔하게 유지하려고"
  },
  {
    "key": "cl:cherry-pick-a-commit",
    "en": "cherry-pick a commit",
    "ko": "특정 커밋만 골라서 다른 브랜치에 적용하다",
    "example": "Just cherry-pick that fix onto the release branch.",
    "situations": [
      "릴리즈 브랜치에 핫픽스 하나만 옮길 때",
      "전체 머지 없이 특정 변경만 가져올 때"
    ],
    "detail": "체리만 쏙 골라 따듯이, 브랜치 전체가 아니라 커밋 하나만 집어서 가져오는 그림. main에 들어간 버그 수정을 릴리즈 브랜치에도 넣어야 할 때 단골로 나온다. 같은 변경이 두 개의 커밋으로 존재하게 되니 나중에 충돌의 씨앗이 될 수 있다는 점은 알아두기.",
    "exampleKo": "그 수정 커밋만 릴리즈 브랜치에 체리픽해.",
    "questionEn": "One bug fix already landed on main, and the release line needs only that change. How do you bring it over?",
    "termsKo": "",
    "cueKo": "그냥 체리픽해 · 그 수정을 · 릴리즈 브랜치 위로"
  },
  {
    "key": "cl:resolve-a-conflict",
    "en": "resolve a conflict",
    "ko": "(머지) 충돌을 해결하다",
    "example": "I'm still resolving a conflict in the config file.",
    "situations": [
      "머지나 리베이스가 충돌로 멈췄을 때",
      "PR이 머지 불가 상태일 때"
    ],
    "detail": "두 브랜치가 같은 줄을 다르게 고쳐서 git이 손을 든 상태를 사람이 풀어주는 것. 'PR에 conflict 떴어'라는 말 다음에 거의 자동으로 따라오는 동사가 resolve다. fix a conflict라고 해도 통하지만 resolve가 훨씬 표준적인 짝꿍.",
    "exampleKo": "아직 config 파일 충돌 해결하는 중이야.",
    "questionEn": "Git stopped your merge because two people changed the same lines. What do you have to do before continuing?",
    "termsKo": "merge conflict: 두 브랜치가 같은 코드 부분을 다르게 수정해 git이 자동 병합을 못 하는 상태.",
    "cueKo": "나는 · 아직 해결 중이야 · 충돌을 · config 파일에서"
  },
  {
    "key": "cl:revert-a-commit",
    "en": "revert a commit",
    "ko": "커밋을 되돌리다(반대 커밋으로 취소)",
    "example": "Let's revert that commit first and investigate later.",
    "situations": [
      "배포 후 특정 변경이 장애를 일으켰을 때",
      "문제 커밋을 빠르게 무효화할 때"
    ],
    "detail": "문제가 된 커밋의 정반대 변경을 새 커밋으로 쌓아서 효과를 취소하는 것. 장애 상황에서 '원인 분석은 나중에, 일단 되돌리자'고 할 때 첫 번째로 나오는 말이야. 히스토리를 지우는 reset과 달리 기록이 남아서 공유 브랜치에서도 안전하다.",
    "exampleKo": "일단 그 커밋 리버트하고 조사는 나중에 하자.",
    "questionEn": "A change that went in this morning is breaking production. What is the fastest safe way to undo it?",
    "termsKo": "",
    "cueKo": "우리 · 되돌리자 · 그 커밋을 · 먼저 · 그리고 조사하자 · 나중에"
  },
  {
    "key": "cl:cut-a-release",
    "en": "cut a release",
    "ko": "릴리즈를 따다(릴리즈 버전을 확정해 만들다)",
    "example": "We're cutting a release this Friday, so freeze your changes.",
    "situations": [
      "릴리즈 일정 공지할 때",
      "코드 프리즈 직전 상황"
    ],
    "detail": "흘러가는 main에서 한 시점을 싹둑 잘라내 릴리즈로 만든다는 그림. make나 create보다 cut이 압도적으로 많이 쓰이는, 진짜 현장 냄새 나는 콜로케이션이다. 이 말이 나오면 보통 그 뒤에 code freeze가 따라온다.",
    "exampleKo": "금요일에 릴리즈 딸 거니까 변경사항 얼려놔.",
    "questionEn": "The sprint ends Friday and you need a fixed version of the code to ship. What happens that day?",
    "termsKo": "code freeze: 릴리즈 직전에 새 변경 반입을 멈추는 기간.",
    "cueKo": "우리는 · 끊어낸다 · 릴리즈를 · 이번 금요일에 · 그러니 얼려둬 · 네 변경사항들을"
  },
  {
    "key": "cl:tag-a-release",
    "en": "tag a release",
    "ko": "릴리즈에 버전 태그를 붙이다",
    "example": "Don't forget to tag the release before you deploy.",
    "situations": [
      "배포 직전 체크리스트 확인할 때",
      "버전 이력 추적 이야기할 때"
    ],
    "detail": "특정 커밋에 v2.3.0 같은 이름표를 박아서 '이게 그 버전이다'라고 못 박는 것. 배포 전 체크리스트에서 빠지면 나중에 어떤 코드가 나갔는지 추적이 안 되니까 꼭 나오는 말이야. cut a release가 만드는 행위라면 tag는 이름표 붙이는 행위.",
    "exampleKo": "배포 전에 릴리즈 태그 다는 거 잊지 마.",
    "questionEn": "Six months from now you must know exactly which commit shipped as version 2.3. What do you do at ship time?",
    "termsKo": "git tag: 특정 커밋에 영구적인 이름(보통 버전 번호)을 붙이는 기능.",
    "cueKo": "잊지 마 · 태그 다는 거 · 그 릴리즈에 · 네가 배포하기 전에"
  },
  {
    "key": "cl:stash-my-changes",
    "en": "stash my changes",
    "ko": "작업 중인 변경사항을 임시 보관하다",
    "example": "Let me stash my changes and check out your branch.",
    "situations": [
      "작업 도중 급한 다른 브랜치로 전환할 때",
      "더러운 워킹트리 때문에 명령이 막혔을 때"
    ],
    "detail": "stash는 비상금 숨겨두는 곳이란 뜻이라, 커밋하긴 애매한 작업물을 서랍에 잠깐 넣어두는 그림이야. 작업하다가 급하게 다른 브랜치 봐줘야 할 때 거의 반사적으로 나온다. 나중에 꺼낼 때는 pop the stash라고 한다.",
    "exampleKo": "내 변경사항 잠깐 스태시하고 네 브랜치 체크아웃할게.",
    "questionEn": "You are mid-task with uncommitted work, and a teammate needs you to look at their code right now. What do you do?",
    "termsKo": "",
    "cueKo": "내가 · 스태시할게 · 내 변경사항들을 · 그리고 체크아웃할게 · 네 브랜치를"
  },
  {
    "key": "cl:force-push-the-branch",
    "en": "force-push the branch",
    "ko": "브랜치를 강제 푸시하다(원격 히스토리 덮어쓰기)",
    "example": "I rebased, so I had to force-push the branch.",
    "situations": [
      "리베이스 후 원격에 다시 올릴 때",
      "원격 히스토리를 덮어쓴 사실을 알릴 때"
    ],
    "detail": "원격에 있는 히스토리를 내 것으로 강제로 덮어쓰는 푸시. 리베이스나 스쿼시 후엔 일반 푸시가 거부되니까 거의 세트로 따라온다. 공유 브랜치에 하면 동료 작업이 날아갈 수 있어서 'force-push했어'라고 미리 알려주는 게 매너.",
    "exampleKo": "리베이스해서 브랜치 강제 푸시해야 했어.",
    "questionEn": "You rewrote your branch history, and now the remote rejects your normal update. What do you do?",
    "termsKo": "",
    "cueKo": "나는 · 리베이스했어 · 그래서 나는 · 강제 푸시해야 했어 · 그 브랜치를"
  },
  {
    "key": "cl:open-a-pr",
    "en": "open a PR",
    "ko": "풀 리퀘스트를 올리다",
    "example": "I'll open a PR once the tests pass.",
    "situations": [
      "작업 완료를 알리고 리뷰를 요청할 때",
      "진행 상황을 공유할 때"
    ],
    "detail": "내 브랜치를 합쳐달라고 공식적으로 요청서를 여는 것. 'create'보다 open이, 영국계 회사에선 raise a PR도 흔하다. 데일리 스탠드업에서 'PR 올릴게요'라고 할 때 그대로 쓰는 표현.",
    "exampleKo": "테스트 통과하면 PR 올릴게.",
    "questionEn": "Your feature is done locally and you want teammates to review it. What is your next move?",
    "termsKo": "PR(pull request): 내 브랜치를 본류에 합쳐달라는 리뷰 요청 단위.",
    "cueKo": "나는 · 열게 · PR을 · 테스트들이 통과하면"
  },
  {
    "key": "cl:approve-a-pr",
    "en": "approve a PR",
    "ko": "PR을 승인하다",
    "example": "Looks good, I'll approve the PR now.",
    "situations": [
      "리뷰를 끝내고 통과시킬 때",
      "머지가 왜 안 되는지 물을 때"
    ],
    "detail": "리뷰어가 '이대로 머지해도 좋다'고 도장을 찍는 행위. LGTM이라는 코멘트와 거의 세트로 다닌다. 반대 행동은 request changes고, 승인 없이는 머지 버튼이 안 열리는 팀이 대부분이라 'approve 좀 해줘'라는 부탁도 흔하다.",
    "exampleKo": "좋아 보이네, 지금 PR 승인할게.",
    "questionEn": "You finished reviewing a teammate's code and everything looks fine. What do you do so they can merge?",
    "termsKo": "LGTM: looks good to me의 약자. 리뷰 통과 코멘트 관용구.",
    "cueKo": "좋아 보여 · 나는 · 승인할게 · 그 PR을 · 지금"
  },
  {
    "key": "cl:request-changes",
    "en": "request changes",
    "ko": "(PR에) 수정을 요청하다",
    "example": "I requested changes on your PR — mostly naming stuff.",
    "situations": [
      "리뷰에서 고칠 부분을 지적할 때",
      "승인을 보류하는 이유를 설명할 때"
    ],
    "detail": "approve의 반대편 버튼으로, '이거 고치기 전엔 머지 못 한다'는 공식 표시야. GitHub UI 용어가 그대로 회화에 굳은 케이스. 코멘트만 남기는 것보다 강한 신호라서, 사소한 지적이면 그냥 comment로 남기고 이건 아껴 쓰는 게 보통이다.",
    "exampleKo": "네 PR에 수정 요청 남겼어. 대부분 네이밍 관련이야.",
    "questionEn": "A teammate's PR has problems that must be fixed before it can go in. How do you signal that formally?",
    "termsKo": "",
    "cueKo": "나는 · 요청했어 · 변경을 · 네 PR에 · 대부분 네이밍 관련이야"
  },
  {
    "key": "cl:address-the-comments",
    "en": "address the comments",
    "ko": "리뷰 코멘트를 반영하다",
    "example": "I addressed all the comments, can you take another look?",
    "situations": [
      "리뷰 지적사항을 고친 뒤 재리뷰를 요청할 때",
      "PR 진행 상황을 보고할 때"
    ],
    "detail": "address는 문제를 정면으로 다뤄서 처리한다는 뜻이라, 코멘트 하나하나에 대응했다는 그림이야. 고치거나, 왜 안 고치는지 답글을 달거나 둘 다 포함한다. fix the comments라고 하면 어색하고 address가 정확한 짝꿍.",
    "exampleKo": "코멘트 다 반영했어. 다시 한번 봐줄래?",
    "questionEn": "Your reviewer left ten notes on your PR and you handled every one. What do you tell them?",
    "termsKo": "",
    "cueKo": "나는 · 반영했어 · 모든 코멘트들을 · 너 · 한 번 더 봐줄래?"
  },
  {
    "key": "cl:land-a-change",
    "en": "land a change",
    "ko": "변경사항을 본류에 안착시키다(머지 완료)",
    "example": "The fix should land in main by tomorrow.",
    "situations": [
      "변경이 언제 main에 들어가는지 말할 때",
      "머지 완료 사실을 알릴 때"
    ],
    "detail": "비행기가 착륙하듯 변경이 본류에 무사히 내려앉는 그림. merge가 행위라면 land는 결과에 초점이 있어서 'when does it land?'처럼 일정 얘기에 잘 어울린다. 구글이나 메타 출신들이 특히 많이 쓰고, 자동사로 the change landed처럼도 쓴다.",
    "exampleKo": "그 수정은 내일까지 main에 들어갈 거야.",
    "questionEn": "Your manager asks when the fix will actually be in the main codebase. How do you phrase the answer?",
    "termsKo": "",
    "cueKo": "그 수정은 · 들어갈 거야 · main에 · 내일까지"
  },
  {
    "key": "cl:break-the-build",
    "en": "break the build",
    "ko": "빌드를 깨뜨리다",
    "example": "Who broke the build? CI's been red for an hour.",
    "situations": [
      "CI가 빨간불일 때 원인을 찾을 때",
      "머지 전 주의를 줄 때"
    ],
    "detail": "내 커밋 때문에 CI 빌드가 실패 상태가 됐다는 뜻. 'CI가 빨갛다(red)'와 세트로 다니고, 빌드를 깬 사람이 고칠 책임을 진다는 팀 문화 표현이기도 하다. 반대로 고치는 건 fix the build, 정상 상태는 the build is green.",
    "exampleKo": "누가 빌드 깼어? CI 한 시간째 빨간불이야.",
    "questionEn": "CI has been failing for everyone since this morning's commits. What happened, in one phrase?",
    "termsKo": "CI: 커밋마다 자동으로 빌드와 테스트를 돌리는 시스템. 실패하면 red, 성공이면 green.",
    "cueKo": "누가 · 깨뜨렸어 · 빌드를? · CI가 · 빨간불이야 · 한 시간째"
  },
  {
    "key": "cl:trigger-a-pipeline",
    "en": "trigger a pipeline",
    "ko": "(CI/CD) 파이프라인을 돌리다",
    "example": "Pushing the tag will trigger the deploy pipeline.",
    "situations": [
      "어떤 조건에서 CI/CD가 도는지 설명할 때",
      "수동으로 빌드를 다시 돌릴 때"
    ],
    "detail": "방아쇠를 당기듯 자동화 파이프라인을 출발시키는 것. 'merge하면 파이프라인이 트리거된다'처럼 조건-결과를 설명할 때 표준 동사야. 수동으로 돌릴 땐 kick off a build라고도 하고, 둘 다 입에 붙여두면 좋다.",
    "exampleKo": "태그 푸시하면 배포 파이프라인이 돌아.",
    "questionEn": "Explain what automatically starts the build-and-deploy process when someone pushes a tag.",
    "termsKo": "pipeline: 빌드-테스트-배포가 순서대로 이어지는 자동화 단계 묶음.",
    "cueKo": "태그를 푸시하는 게 · 트리거할 거야 · 배포 파이프라인을"
  },
  {
    "key": "cl:push-to-prod",
    "en": "push to prod",
    "ko": "프로덕션에 배포하다",
    "example": "We're pushing to prod after the standup.",
    "situations": [
      "배포 시점을 공유할 때",
      "금요일 배포를 말릴 때"
    ],
    "detail": "코드를 실서비스 환경으로 내보낸다는 말로, deploy to production의 구어체 축약이야. prod라고 줄여 말하는 것 자체가 현장 말투의 핵심. 'don't push to prod on Friday'는 업계 전체의 밈 수준 관용구다.",
    "exampleKo": "스탠드업 끝나고 프로덕션에 배포할 거야.",
    "questionEn": "The release is approved. When are you sending it to the live environment, and how do you say that casually?",
    "termsKo": "prod(production): 실제 사용자가 쓰는 운영 환경. staging/dev와 대비.",
    "cueKo": "우리는 · 푸시한다 · prod로 · 스탠드업 끝나고"
  },
  {
    "key": "cl:roll-back-a-deploy",
    "en": "roll back a deploy",
    "ko": "배포를 이전 버전으로 되돌리다",
    "example": "Error rates spiked, so we rolled back the deploy.",
    "situations": [
      "배포 직후 장애가 났을 때",
      "롤백 기준을 논의할 때"
    ],
    "detail": "방금 나간 배포를 통째로 이전 버전으로 되감는 것. 커밋 하나를 취소하는 revert와 달리 배포 단위로 되돌린다는 차이가 있어. 장애 대응의 첫 번째 카드라서 'roll back first, debug later'라는 말이 입에 붙어 있으면 좋다.",
    "exampleKo": "에러율이 튀어서 배포 롤백했어.",
    "questionEn": "Five minutes after shipping, errors spike across the service. What is your immediate move?",
    "termsKo": "",
    "cueKo": "에러율이 · 치솟았어 · 그래서 우리는 · 롤백했어 · 그 배포를"
  },
  {
    "key": "cl:ship-a-feature",
    "en": "ship a feature",
    "ko": "기능을 출시하다(사용자에게 내보내다)",
    "example": "We shipped the search feature last week.",
    "situations": [
      "출시 소식을 공유할 때",
      "일정 압박 속 우선순위를 말할 때"
    ],
    "detail": "배로 화물을 실어 보내듯 기능을 사용자 손에 보내는 그림. release보다 캐주얼하고 자부심이 묻어나는 동사라 'we shipped it'은 그 자체로 축하 멘트야. 'ship it!'은 그만 다듬고 내보내자는 관용구로도 쓰인다.",
    "exampleKo": "지난주에 검색 기능 출시했어.",
    "questionEn": "Your team got the new search capability into users' hands last week. How do you announce that?",
    "termsKo": "",
    "cueKo": "우리는 · 출시했어 · 검색 기능을 · 지난주에"
  },
  {
    "key": "cl:gate-a-feature",
    "en": "gate a feature",
    "ko": "기능을 플래그 뒤에 숨기다(게이팅)",
    "example": "The new editor is gated behind a feature flag.",
    "situations": [
      "미완성 기능을 prod에 머지할 때",
      "점진적 출시 전략을 설명할 때"
    ],
    "detail": "기능 앞에 문(gate)을 세워서 허락된 사용자만 보게 만드는 그림. 코드를 prod에 머지는 하되 일반 사용자에겐 안 보이게 할 때 쓰는 표준 표현이야. gated behind a flag라는 수동태 형태로 제일 많이 나온다.",
    "exampleKo": "새 에디터는 피처 플래그 뒤에 숨겨놨어.",
    "questionEn": "The code is merged to prod but only internal users should see it for now. How is that controlled?",
    "termsKo": "feature flag: 코드 배포와 기능 공개를 분리하는 on/off 스위치 설정.",
    "cueKo": "새 에디터는 · 막혀 있어 · 피처 플래그 뒤에"
  },
  {
    "key": "cl:flip-a-flag",
    "en": "flip a flag",
    "ko": "플래그를 켜다/끄다(스위치 전환)",
    "example": "We can flip the flag and roll it out to everyone.",
    "situations": [
      "게이팅된 기능을 공개할 때",
      "장애 시 기능을 끌 때"
    ],
    "detail": "벽 스위치를 탁 젖히듯 피처 플래그 상태를 바꾸는 것. 배포 없이 기능을 켜고 끌 수 있다는 게 포인트라 'no deploy needed, just flip the flag'처럼 말한다. 장애 때 기능을 끄는 비상 스위치 얘기에도 똑같이 쓴다.",
    "exampleKo": "플래그만 켜면 전체 공개할 수 있어.",
    "questionEn": "The hidden feature is ready for all users, and no redeploy is needed. What single action turns it on?",
    "termsKo": "",
    "cueKo": "우리는 · 뒤집으면 돼 · 그 플래그를 · 그리고 풀면 돼 · 그걸 · 모두에게"
  },
  {
    "key": "cl:throw-an-exception",
    "en": "throw an exception",
    "ko": "예외를 던지다",
    "example": "That method throws an exception when the input is null.",
    "situations": [
      "코드 동작을 설명할 때",
      "에러 처리 설계를 논의할 때"
    ],
    "detail": "에러를 공처럼 위로 던져 올리는 그림으로, 자바 키워드 throw가 그대로 회화에 박힌 표현이야. 코드 리뷰나 설계 논의에서 '여기서 던질까, 널 리턴할까' 같은 식으로 매일 나온다. 던진 걸 받는 쪽이 catch.",
    "exampleKo": "그 메서드는 입력이 null이면 예외를 던져.",
    "questionEn": "Describe what your method does when it receives invalid input, instead of returning a normal value.",
    "termsKo": "exception: 정상 흐름을 끊고 호출 스택을 거슬러 올라가는 에러 신호 객체.",
    "cueKo": "그 메서드는 · 던져 · 예외를 · 입력이 null일 때"
  },
  {
    "key": "cl:catch-an-exception",
    "en": "catch an exception",
    "ko": "예외를 잡다(받아서 처리하다)",
    "example": "We catch the exception and return a fallback value.",
    "situations": [
      "에러 처리 로직을 설명할 때",
      "어디서 예외를 받을지 정할 때"
    ],
    "detail": "던져진 예외를 야구공 받듯이 잡아서 처리하는 것. try-catch 구문이 그대로 동사가 됐고, '어느 레이어에서 잡을 거냐'는 설계 논의의 단골 질문이야. 잡고 나서 아무것도 안 하면 그게 바로 swallow.",
    "exampleKo": "예외를 잡아서 폴백 값을 리턴해.",
    "questionEn": "An error gets thrown deep in the call stack. What does your handler layer do with it?",
    "termsKo": "",
    "cueKo": "우리는 · 잡아 · 그 예외를 · 그리고 돌려줘 · 폴백 값을"
  },
  {
    "key": "cl:swallow-an-exception",
    "en": "swallow an exception",
    "ko": "예외를 삼키다(잡고 아무것도 안 하기)",
    "example": "Don't swallow the exception — at least log it.",
    "situations": [
      "빈 catch 블록을 리뷰에서 지적할 때",
      "에러가 조용히 사라지는 버그를 추적할 때"
    ],
    "detail": "예외를 잡아놓고 꿀꺽 삼켜서 흔적도 없이 없애버리는 그림. 빈 catch 블록처럼 에러를 로그도 없이 묻어버리는 안티패턴을 지적할 때 쓰는, 약간 비난조가 섞인 표현이야. 에러가 조용히 사라지는 미스터리 버그의 단골 원인으로 거론된다.",
    "exampleKo": "예외 삼키지 마. 최소한 로그는 남겨.",
    "questionEn": "You find an empty catch block hiding errors with no log at all. What do you tell the author?",
    "termsKo": "",
    "cueKo": "삼키지 마 · 그 예외를 · 최소한 · 로그는 남겨 · 그걸"
  },
  {
    "key": "cl:acquire-a-lock",
    "en": "acquire a lock",
    "ko": "락을 획득하다",
    "example": "The thread blocks until it acquires the lock.",
    "situations": [
      "동시성 코드 동작을 설명할 때",
      "데드락 원인을 분석할 때"
    ],
    "detail": "공유 자원의 열쇠를 손에 넣는 그림으로, 동시성 얘기의 표준 동사야. get이나 take보다 acquire가 문서/회화 양쪽의 정식 짝꿍이고, 면접에서 락 얘기할 때도 이 동사를 써야 태가 난다. 획득 못 하면 block하거나 timeout된다.",
    "exampleKo": "그 스레드는 락을 획득할 때까지 블록돼.",
    "questionEn": "Two threads want the same shared resource. What must each one do before touching it?",
    "termsKo": "lock: 공유 자원에 한 번에 하나만 접근하게 막는 동시성 장치.",
    "cueKo": "그 스레드는 · 멈춰 서 있어 · 그게 락을 획득할 때까지"
  },
  {
    "key": "cl:release-a-lock",
    "en": "release a lock",
    "ko": "락을 해제하다(반납하다)",
    "example": "Make sure you release the lock in the finally block.",
    "situations": [
      "락 누수로 데드락이 의심될 때",
      "finally 처리 리뷰할 때"
    ],
    "detail": "쥐고 있던 열쇠를 돌려놓는 것으로, acquire와 완벽한 한 쌍이야. '예외가 나도 반드시 release되게 해라'가 동시성 코드 리뷰의 단골 멘트. release를 빼먹으면 다른 스레드가 영원히 기다리는 데드락성 장애로 이어진다.",
    "exampleKo": "finally 블록에서 락 해제하는 거 꼭 확인해.",
    "questionEn": "A thread grabbed the mutex but an exception path skips the cleanup. What bug does that cause, and what was missed?",
    "termsKo": "",
    "cueKo": "확실히 해 · 네가 그 락을 풀도록 · finally 블록 안에서"
  },
  {
    "key": "cl:spawn-a-thread",
    "en": "spawn a thread",
    "ko": "스레드를 생성하다(띄우다)",
    "example": "We spawn a worker thread for each upload.",
    "situations": [
      "비동기 처리 구조를 설명할 때",
      "스레드 폭증 문제를 논의할 때"
    ],
    "detail": "알에서 새끼가 깨어나듯 새 실행 흐름을 하나 까는 그림. create a thread보다 spawn이 훨씬 입말이고, 프로세스에도 spawn a process로 똑같이 쓴다. 요청마다 spawn하면 스레드가 폭증하니 풀을 쓰자, 같은 논의에서 단골로 나온다.",
    "exampleKo": "업로드마다 워커 스레드를 하나씩 띄워.",
    "questionEn": "Each upload needs its own parallel worker. What does your code do when a request arrives?",
    "termsKo": "thread: 프로세스 안에서 동시에 도는 실행 단위.",
    "cueKo": "우리는 · 띄운다 · 워커 스레드를 · 업로드 하나마다"
  },
  {
    "key": "cl:hit-an-endpoint",
    "en": "hit an endpoint",
    "ko": "엔드포인트를 호출하다(때리다)",
    "example": "Just hit the health endpoint and see what it returns.",
    "situations": [
      "API 동작을 확인해보라고 할 때",
      "디버깅 중 호출 흐름을 설명할 때"
    ],
    "detail": "API 주소를 한 대 때려본다는 감각으로, call보다 훨씬 구어적인 표현이야. curl로 찔러보거나 클라이언트가 서버를 호출하는 상황 모두에 쓴다. 'the client hits this endpoint twice'처럼 호출 흐름 설명에도 자연스럽다.",
    "exampleKo": "헬스 엔드포인트 한번 때려보고 뭐 나오는지 봐.",
    "questionEn": "You want to quickly check if the service is up using its health-check URL. What do you do?",
    "termsKo": "endpoint: API에서 특정 기능을 담당하는 개별 URL 주소.",
    "cueKo": "그냥 때려봐 · 헬스 엔드포인트를 · 그리고 봐 · 뭘 돌려주는지"
  },
  {
    "key": "cl:expose-an-api",
    "en": "expose an API",
    "ko": "API를 외부에 열다(노출하다)",
    "example": "The service exposes a REST API for the mobile app.",
    "situations": [
      "시스템 구조를 설명할 때",
      "내부 기능을 외부에 열지 논의할 때"
    ],
    "detail": "안에 있던 기능을 바깥에서 쓸 수 있게 창구를 내준다는 그림. 아키텍처 설명에서 'this service exposes...'는 거의 문장 시작 공식이야. 보안 맥락에선 '불필요하게 노출됐다'는 부정적 뉘앙스로도 쓰이니 톤을 구분할 것.",
    "exampleKo": "그 서비스는 모바일 앱용 REST API를 제공해.",
    "questionEn": "Describe how external clients are able to use your service's functionality over HTTP.",
    "termsKo": "",
    "cueKo": "그 서비스는 · 노출한다 · REST API를 · 모바일 앱을 위해"
  },
  {
    "key": "cl:deprecate-an-api",
    "en": "deprecate an API",
    "ko": "API를 폐기 예정으로 만들다",
    "example": "We're deprecating the v1 API at the end of the quarter.",
    "situations": [
      "구버전 API 종료 계획을 공지할 때",
      "마이그레이션을 독려할 때"
    ],
    "detail": "당장 없애진 않지만 '곧 사라지니 쓰지 마라'고 공식 선언하는 것. 삭제(remove)와 구분되는 중간 단계라는 게 핵심이야. deprecated라는 형용사형이 경고 로그와 문서에 박혀 있어서 동사형까지 입에 붙여두면 좋다.",
    "exampleKo": "분기 말에 v1 API 폐기 예정 처리할 거야.",
    "questionEn": "The old version of your interface will be removed next year, and users need warning now. What do you do to it?",
    "termsKo": "deprecation: 기능을 즉시 삭제하지 않고 사용 중단을 예고하는 단계.",
    "cueKo": "우리는 · 폐기 예고 중이야 · v1 API를 · 이번 분기 말에"
  },
  {
    "key": "cl:consume-a-message",
    "en": "consume a message",
    "ko": "(큐에서) 메시지를 소비하다",
    "example": "The worker consumes messages from the Kafka topic.",
    "situations": [
      "메시지 큐 구조를 설명할 때",
      "컨슈머 랙 문제를 논의할 때"
    ],
    "detail": "큐에 쌓인 메시지를 받아서 먹어치우는 그림으로, producer가 만들고 consumer가 소비하는 짝 구조의 절반이야. Kafka, SQS 얘기만 나오면 자동으로 등장하는 동사. read a message보다 consume이 '처리까지 한다'는 뉘앙스를 담는다.",
    "exampleKo": "워커가 카프카 토픽에서 메시지를 소비해.",
    "questionEn": "Describe what the worker process does with the events piling up in the Kafka topic.",
    "termsKo": "consumer: 메시지 큐에서 데이터를 받아 처리하는 쪽. 만들어 넣는 쪽은 producer.",
    "cueKo": "그 워커는 · 소비한다 · 메시지들을 · Kafka 토픽으로부터"
  },
  {
    "key": "cl:emit-an-event",
    "en": "emit an event",
    "ko": "이벤트를 발행하다(내보내다)",
    "example": "The service emits an event whenever an order is placed.",
    "situations": [
      "이벤트 기반 아키텍처를 설명할 때",
      "이벤트 누락을 디버깅할 때"
    ],
    "detail": "전구가 빛을 내뿜듯 시스템이 '이런 일이 있었다'는 신호를 바깥으로 쏘는 그림. 이벤트 드리븐 아키텍처 설명의 핵심 동사로, publish an event와 거의 호환돼. fire an event라고도 하는데 emit이 제일 중립적이고 범용적이다.",
    "exampleKo": "주문이 들어올 때마다 서비스가 이벤트를 발행해.",
    "questionEn": "When an order is placed, how do other services find out without being called directly?",
    "termsKo": "event-driven: 서비스끼리 직접 호출 대신 이벤트 신호를 주고받아 연동하는 구조.",
    "cueKo": "그 서비스는 · 내보낸다 · 이벤트를 · 주문이 들어올 때마다"
  },
  {
    "key": "cl:drain-a-queue",
    "en": "drain a queue",
    "ko": "큐를 비우다(쌓인 것을 다 처리하다)",
    "example": "It took two hours to drain the queue after the outage.",
    "situations": [
      "장애 후 밀린 메시지를 처리할 때",
      "배포 전 큐를 비우는 절차를 말할 때"
    ],
    "detail": "욕조 물을 빼듯 큐에 쌓인 메시지를 바닥날 때까지 처리하는 그림. 장애로 백로그가 쌓였다가 복구하는 상황에서 '큐 다 빠지는 데 얼마나 걸려?'처럼 쓴다. 서버 종료 전 남은 요청을 마저 처리하는 graceful shutdown 맥락에서도 drain을 쓴다.",
    "exampleKo": "장애 후에 큐 다 비우는 데 두 시간 걸렸어.",
    "questionEn": "After the outage, two million messages were backed up. What did the workers spend two hours doing?",
    "termsKo": "",
    "cueKo": "걸렸어 · 두 시간이 · 큐를 다 비우는 데 · 장애 이후에"
  },
  {
    "key": "cl:throttle-requests",
    "en": "throttle requests",
    "ko": "요청을 조절하다(속도 제한)",
    "example": "We throttle requests to fifty per second per client.",
    "situations": [
      "과부하 방어책을 설명할 때",
      "외부 API 호출량을 조절할 때"
    ],
    "detail": "자동차 스로틀처럼 흐름의 양을 의도적으로 조여서 제한하는 것. 클라이언트가 너무 빨리 쏠 때 서버가 속도를 제한하는 상황의 표준 동사야. rate-limit과 거의 같은 뜻인데, throttle은 동사로 쓰기 더 자연스럽다.",
    "exampleKo": "클라이언트당 초당 50개로 요청을 제한해.",
    "questionEn": "One client is sending traffic way too fast and hurting the server. What does your gateway do about it?",
    "termsKo": "rate limiting: 단위 시간당 허용 요청 수를 제한하는 과부하 방어 기법.",
    "cueKo": "우리는 · 조인다 · 요청들을 · 초당 50개로 · 클라이언트마다"
  },
  {
    "key": "cl:hit-the-rate-limit",
    "en": "hit the rate limit",
    "ko": "요청 한도에 걸리다",
    "example": "We hit the rate limit on the GitHub API again.",
    "situations": [
      "외부 API가 429를 줄 때",
      "재시도 전략을 논의할 때"
    ],
    "detail": "허용량의 벽에 쾅 부딪히는 그림으로, 429 에러가 떴을 때 나오는 첫마디야. throttle이 제한을 거는 쪽이라면 이건 제한에 걸리는 쪽 표현. 이 말 다음엔 보통 back off and retry(물러났다 재시도) 얘기가 따라온다.",
    "exampleKo": "또 GitHub API 한도에 걸렸어.",
    "questionEn": "The external API suddenly starts returning 429 responses to your batch job. What happened?",
    "termsKo": "429 Too Many Requests: 요청 한도를 초과했다는 HTTP 상태 코드.",
    "cueKo": "우리는 · 부딪혔어 · 레이트 리밋에 · GitHub API에서 · 또"
  },
  {
    "key": "cl:throw-500s",
    "en": "throw 500s",
    "ko": "(서버가) 500 에러를 뱉다",
    "example": "The payment service is throwing 500s right now.",
    "situations": [
      "장애 상황을 처음 보고할 때",
      "어느 서비스가 문제인지 좁힐 때"
    ],
    "detail": "서버가 500 에러를 토해내고 있다는 장애 보고의 1번 문장. 복수형 500s로 말하는 게 포인트인데, 에러가 한 발이 아니라 계속 나오고 있다는 뉘앙스야. throwing errors, throwing timeouts처럼 패턴을 바꿔 쓸 수도 있다.",
    "exampleKo": "지금 결제 서비스가 500 에러를 뱉고 있어.",
    "questionEn": "The payment service is returning internal server errors over and over. How do you report that in chat?",
    "termsKo": "500 Internal Server Error: 서버 내부 오류를 뜻하는 HTTP 상태 코드.",
    "cueKo": "결제 서비스가 · 던지고 있어 · 500들을 · 지금"
  },
  {
    "key": "cl:flush-the-cache",
    "en": "flush the cache",
    "ko": "캐시를 비우다",
    "example": "Try flushing the cache and see if the stale data goes away.",
    "situations": [
      "오래된 데이터가 계속 보일 때",
      "배포 후 데이터 불일치를 해결할 때"
    ],
    "detail": "변기 물 내리듯 캐시에 든 걸 한 번에 싹 비워버리는 그림. 오래된(stale) 데이터가 계속 보일 때 첫 번째로 시도하는 조치라 입에 자주 붙는다. 특정 키만 골라 지우는 invalidate와 달리 flush는 보통 통째로 비우는 뉘앙스.",
    "exampleKo": "캐시 한번 비워보고 오래된 데이터 사라지는지 봐.",
    "questionEn": "Users still see yesterday's prices even though the database is updated. What quick fix do you try first?",
    "termsKo": "stale data: 원본은 바뀌었는데 캐시에 남아 있는 오래된 데이터.",
    "cueKo": "해봐 · 캐시를 비우는 걸 · 그리고 봐 · 그 오래된 데이터가 사라지는지"
  },
  {
    "key": "cl:warm-the-cache",
    "en": "warm the cache",
    "ko": "캐시를 미리 데우다(예열)",
    "example": "We warm the cache before traffic hits in the morning.",
    "situations": [
      "배포 직후 응답 지연을 막을 때",
      "콜드 스타트 문제를 논의할 때"
    ],
    "detail": "차가운 엔진을 예열하듯, 요청이 오기 전에 캐시를 미리 채워두는 것. 캐시가 텅 빈 콜드 상태에서 첫 요청들이 느려지는 걸 막는 작업이야. flush의 반대 방향 작업이고, cache warming이라는 명사형도 흔하다.",
    "exampleKo": "아침 트래픽 몰리기 전에 캐시를 미리 채워놔.",
    "questionEn": "Right after deploy, the first requests are slow because nothing is loaded yet. How do you prevent that?",
    "termsKo": "cold start: 캐시나 인스턴스가 준비 안 된 상태에서 첫 요청이 느려지는 현상.",
    "cueKo": "우리는 · 데워 놓는다 · 캐시를 · 트래픽이 들이치기 전에 · 아침에"
  },
  {
    "key": "cl:bump-the-version",
    "en": "bump the version",
    "ko": "버전을 올리다",
    "example": "Bump the version to 2.4 and tag it.",
    "situations": [
      "릴리즈 준비 절차를 말할 때",
      "버전 올리는 걸 깜빡했을 때"
    ],
    "detail": "버전 숫자를 톡 쳐서 한 칸 올리는 그림. increase나 update보다 bump가 압도적으로 입말이고, 패치/마이너/메이저 어디든 쓴다. bump the timeout, bump the limit처럼 숫자 설정값 올리는 데도 똑같이 쓰는 만능 동사야.",
    "exampleKo": "버전 2.4로 올리고 태그 달아.",
    "questionEn": "Before releasing, the number in the package file still says 2.3. What small change is needed?",
    "termsKo": "semver: major.minor.patch 형식의 버전 규칙. 변경 크기에 따라 올리는 자리가 다름.",
    "cueKo": "올려 · 버전을 · 2.4로 · 그리고 태그 달아 · 그걸"
  },
  {
    "key": "cl:bump-a-dependency",
    "en": "bump a dependency",
    "ko": "의존성 버전을 올리다",
    "example": "I bumped the Spring dependency to fix the CVE.",
    "situations": [
      "보안 패치로 라이브러리를 올릴 때",
      "dependabot PR을 설명할 때"
    ],
    "detail": "쓰고 있는 라이브러리의 버전을 한 단계 올리는 것. 보안 취약점(CVE) 대응이나 dependabot PR 얘기에서 매일 보는 표현이야. upgrade보다 가볍고 일상적인 뉘앙스라서 사소한 버전 업엔 bump가 딱이다.",
    "exampleKo": "CVE 고치려고 Spring 의존성 버전 올렸어.",
    "questionEn": "A security advisory says your library version is vulnerable. What is the fix commit going to do?",
    "termsKo": "CVE: 공개적으로 등록된 보안 취약점 식별 번호.",
    "cueKo": "나는 · 올렸어 · Spring 의존성을 · 그 CVE를 고치려고"
  },
  {
    "key": "cl:pin-a-dependency",
    "en": "pin a dependency",
    "ko": "의존성 버전을 고정하다",
    "example": "Pin the dependency to 1.8 until the regression is fixed.",
    "situations": [
      "새 버전이 버그를 일으킬 때",
      "재현 가능한 빌드를 논의할 때"
    ],
    "detail": "핀으로 꽂아 고정하듯 라이브러리를 특정 버전에 못 박는 것. 최신 버전이 버그를 일으켜서 '일단 구버전에 고정하자'고 할 때, 또는 빌드 재현성을 위해 범위 지정 대신 정확한 버전을 박을 때 쓴다. bump의 반대 방향 조치라고 보면 된다.",
    "exampleKo": "리그레션 고쳐질 때까지 그 의존성 1.8로 고정해.",
    "questionEn": "The latest library release breaks your build, so you want to stay on the old version for now. What do you do?",
    "termsKo": "",
    "cueKo": "고정해 · 그 의존성을 · 1.8에 · 그 회귀 버그가 고쳐질 때까지"
  },
  {
    "key": "cl:file-a-ticket",
    "en": "file a ticket",
    "ko": "티켓을 등록하다(이슈 발행)",
    "example": "Can you file a ticket so we don't lose track of it?",
    "situations": [
      "대화 중 나온 문제를 기록으로 남길 때",
      "버그 제보를 정식 절차로 돌릴 때"
    ],
    "detail": "서류를 정식으로 접수하듯 Jira 같은 시스템에 이슈를 등록하는 것. 회의나 슬랙에서 문제가 나왔을 때 '까먹지 않게 티켓 파놔'라는 흐름으로 매일 쓴다. open a ticket, raise a ticket도 같은 뜻이지만 file이 가장 미국 현장스럽다.",
    "exampleKo": "잊어버리지 않게 티켓 하나 등록해줄래?",
    "questionEn": "A bug came up in conversation and you want it tracked formally in Jira. What do you ask a teammate to do?",
    "termsKo": "",
    "cueKo": "너 · 끊어줄래 · 티켓을 · 우리가 그걸 잊어버리지 않게?"
  },
  {
    "key": "cl:triage-bugs",
    "en": "triage bugs",
    "ko": "버그를 분류하고 우선순위를 매기다",
    "example": "We triage bugs every Monday and assign severity.",
    "situations": [
      "버그 처리 프로세스를 설명할 때",
      "이슈 백로그가 쌓였을 때"
    ],
    "detail": "응급실에서 환자 중증도를 나누는 트리아지가 그대로 넘어온 말. 쌓인 버그들을 심각도와 우선순위로 분류해서 누가 언제 볼지 정하는 활동이야. bug triage meeting이라는 정기 회의 이름으로도 흔히 박혀 있다.",
    "exampleKo": "매주 월요일에 버그 분류하고 심각도 매겨.",
    "questionEn": "Forty new bug reports came in this week. What does your team do every Monday morning with them?",
    "termsKo": "severity: 버그의 심각도 등급. 보통 critical/major/minor로 나눔.",
    "cueKo": "우리는 · 분류한다 · 버그들을 · 매주 월요일에 · 그리고 매긴다 · 심각도를"
  },
  {
    "key": "cl:reproduce-a-bug",
    "en": "reproduce a bug",
    "ko": "버그를 재현하다",
    "example": "I can't reproduce the bug on my machine.",
    "situations": [
      "버그 리포트를 검증할 때",
      "재현 조건을 요청할 때"
    ],
    "detail": "리포트된 버그를 내 환경에서 똑같이 일으켜보는 것으로, 디버깅의 사실상 첫 단계야. 'can't reproduce'는 이슈를 닫는 사유로도 쓰이는 공식 문구. 짧게 repro라고 줄여서 'do you have a repro?'(재현 방법 있어?)처럼도 매일 쓴다.",
    "exampleKo": "내 컴퓨터에선 그 버그가 재현이 안 돼.",
    "questionEn": "A user reports a crash, but it never happens when you try the same steps. What do you say?",
    "termsKo": "",
    "cueKo": "나는 · 재현 못 하겠어 · 그 버그를 · 내 머신에서"
  },
  {
    "key": "cl:root-cause-an-issue",
    "en": "root-cause an issue",
    "ko": "이슈의 근본 원인을 밝혀내다",
    "example": "We root-caused the outage to a bad config push.",
    "situations": [
      "장애 분석 결과를 보고할 때",
      "임시 조치와 근본 해결을 구분할 때"
    ],
    "detail": "root cause(근본 원인)라는 명사를 그대로 동사로 굴린, 굉장히 현장 냄새 나는 표현. 증상 완화가 아니라 진짜 원인을 끝까지 파서 밝혀냈다는 뜻이야. root-caused it to X 형태로 '원인은 X였다'고 보고할 때 제일 빛난다.",
    "exampleKo": "장애 근본 원인이 잘못된 설정 배포였던 걸로 밝혀냈어.",
    "questionEn": "The outage is mitigated, but your manager wants to know what actually went wrong underneath. What work remains?",
    "termsKo": "",
    "cueKo": "우리는 · 근본 원인을 짚었어 · 그 장애를 · 잘못된 config 푸시로"
  },
  {
    "key": "cl:fork-a-process",
    "en": "fork a process",
    "ko": "프로세스를 포크하다(복제 생성)",
    "example": "The server forks a process for each connection.",
    "situations": [
      "유닉스 프로세스 모델을 설명할 때",
      "멀티프로세스 구조를 논의할 때"
    ],
    "detail": "포크처럼 한 줄기가 두 갈래로 갈라지는 그림으로, 부모 프로세스가 자신을 복제해 자식을 만드는 유닉스 시스템콜 fork()에서 온 말이야. 웹서버 동작 방식이나 멀티프로세싱 얘기에서 나온다. 레포를 복제하는 fork a repo와는 맥락이 다르니 구분.",
    "exampleKo": "그 서버는 커넥션마다 프로세스를 하나씩 포크해.",
    "questionEn": "In the classic Unix server model, what happens for each incoming connection?",
    "termsKo": "fork(): 현재 프로세스를 복제해 자식 프로세스를 만드는 유닉스 시스템콜.",
    "cueKo": "그 서버는 · 포크한다 · 프로세스를 · 연결 하나마다"
  },
  {
    "key": "cl:kill-a-process",
    "en": "kill a process",
    "ko": "프로세스를 강제 종료하다",
    "example": "The process hung, so I just killed it.",
    "situations": [
      "멈춘 프로세스를 정리할 때",
      "메모리 먹는 프로세스를 처리할 때"
    ],
    "detail": "kill 명령어가 그대로 일상 동사가 된 케이스로, 멈췄거나 폭주하는 프로세스를 강제로 끝내는 것. kill -9으로 보내버렸다고 하면 '협상 없이 즉시 종료'라는 뉘앙스까지 전달돼. OOM killer가 프로세스를 죽였다처럼 수동태로도 자주 쓴다.",
    "exampleKo": "프로세스가 멈춰서 그냥 죽여버렸어.",
    "questionEn": "A job on the server is frozen and not responding to anything. What did you do to it?",
    "termsKo": "kill -9 (SIGKILL): 프로세스가 거부할 수 없는 즉시 종료 시그널.",
    "cueKo": "그 프로세스가 · 멈춰버렸어 · 그래서 나는 · 그냥 죽였어 · 그걸"
  },
  {
    "key": "cl:leak-memory",
    "en": "leak memory",
    "ko": "메모리를 누수시키다",
    "example": "That listener leaks memory if you never unregister it.",
    "situations": [
      "메모리 사용량이 계속 늘 때",
      "리소스 정리 코드를 리뷰할 때"
    ],
    "detail": "수도관이 새듯 다 쓴 메모리가 회수되지 않고 계속 새어나가 쌓이는 그림. '이 코드 메모리 새는데'처럼 코드 리뷰에서도, 'pod가 메모리 누수로 죽었다'처럼 운영에서도 매일 쓴다. 명사형 memory leak과 동사형 둘 다 입에 붙여둘 것.",
    "exampleKo": "그 리스너 해제 안 하면 메모리 새.",
    "questionEn": "Heap usage climbs steadily for days until the service dies, even with flat traffic. What is the code doing?",
    "termsKo": "memory leak: 더 이상 안 쓰는 메모리가 해제되지 않고 계속 쌓이는 결함.",
    "cueKo": "그 리스너는 · 누수시켜 · 메모리를 · 네가 그걸 영영 해제 안 하면"
  },
  {
    "key": "cl:free-memory",
    "en": "free memory",
    "ko": "메모리를 해제하다",
    "example": "The buffer never gets freed, that's our leak.",
    "situations": [
      "메모리 누수 원인을 짚을 때",
      "수동 메모리 관리 코드를 설명할 때"
    ],
    "detail": "쓰던 메모리를 풀어줘서 시스템에 돌려주는 것으로, C의 free() 함수가 그대로 동사가 된 말이야. never gets freed(해제가 안 된다)는 누수 진단의 핵심 문장. GC 언어에서는 직접 free할 일이 없어서 주로 네이티브 자원이나 buffer 얘기에서 나온다.",
    "exampleKo": "그 버퍼가 해제가 안 돼. 그게 누수 원인이야.",
    "questionEn": "You allocated a big buffer in native code and usage keeps growing. What step did the code forget?",
    "termsKo": "GC(garbage collection): 안 쓰는 메모리를 런타임이 자동으로 회수하는 메커니즘.",
    "cueKo": "그 버퍼는 · 절대 해제되지 않아 · 그게 · 우리의 누수야"
  },
  {
    "key": "cl:exhaust-the-connection-pool",
    "en": "exhaust the connection pool",
    "ko": "커넥션 풀을 고갈시키다",
    "example": "A slow query exhausted the connection pool.",
    "situations": [
      "DB 연결 대기로 장애가 났을 때",
      "풀 사이즈 설정을 논의할 때"
    ],
    "detail": "한정된 연결 자원을 바닥까지 다 써버려서 새 요청이 빌릴 게 없는 상태. 느린 쿼리나 반납 안 된 커넥션이 원인인 장애 보고에서 단골로 나오는 문장이야. thread pool, worker pool 등 다른 풀에도 exhaust를 똑같이 쓴다.",
    "exampleKo": "느린 쿼리 하나가 커넥션 풀을 고갈시켰어.",
    "questionEn": "Requests are timing out because there are no free database handles left to give out. What happened?",
    "termsKo": "connection pool: DB 연결을 미리 만들어두고 빌려 쓰는 재사용 풀. 바닥나면 요청이 대기.",
    "cueKo": "느린 쿼리 하나가 · 바닥냈어 · 커넥션 풀을"
  },
  {
    "key": "cl:saturate-the-cpu",
    "en": "saturate the CPU",
    "ko": "CPU를 포화시키다(100%로 꽉 채우다)",
    "example": "The retry loop saturated the CPU on every node.",
    "situations": [
      "CPU 100% 장애를 보고할 때",
      "부하 테스트 결과를 설명할 때"
    ],
    "detail": "스펀지가 물을 더 못 빨아들이듯 CPU가 100%에 붙어서 여유가 전혀 없는 상태. 단순히 high CPU보다 '한계까지 꽉 찼다'는 정도가 강한 표현이야. 네트워크 대역폭이나 디스크 IO에도 saturate를 똑같이 쓴다.",
    "exampleKo": "재시도 루프가 모든 노드의 CPU를 포화시켰어.",
    "questionEn": "Every node is pinned at one hundred percent processor usage because of a tight retry loop. Describe the state.",
    "termsKo": "",
    "cueKo": "그 재시도 루프가 · 꽉 채워버렸어 · CPU를 · 모든 노드에서"
  },
  {
    "key": "cl:take-a-heap-dump",
    "en": "take a heap dump",
    "ko": "힙 덤프를 뜨다",
    "example": "Take a heap dump before you restart the pod.",
    "situations": [
      "메모리 누수를 조사할 때",
      "재시작 전에 증거를 확보할 때"
    ],
    "detail": "힙 메모리의 그 순간 상태를 사진 찍듯 파일로 떠내는 것. 메모리 이상 징후가 보이면 '재시작하기 전에 덤프부터 떠'가 정석 멘트인데, 재시작하면 증거가 사라지기 때문이야. thread dump도 take a thread dump로 똑같은 패턴.",
    "exampleKo": "파드 재시작하기 전에 힙 덤프부터 떠놔.",
    "questionEn": "Memory looks wrong and you are about to restart, but you need evidence to analyze later. What do you grab first?",
    "termsKo": "heap dump: JVM 힙 메모리 전체 상태를 떠낸 스냅샷 파일. 누수 분석의 핵심 자료.",
    "cueKo": "떠 놔 · 힙 덤프를 · 네가 그 파드를 재시작하기 전에"
  },
  {
    "key": "cl:profile-the-service",
    "en": "profile the service",
    "ko": "서비스 성능을 프로파일링하다",
    "example": "Let's profile the service and find the hot path.",
    "situations": [
      "성능 병목을 찾을 때",
      "추측 대신 측정하자고 할 때"
    ],
    "detail": "어디서 시간과 자원을 먹는지 측정 도구를 붙여 들여다보는 것. '느린 것 같다'는 추측 대신 측정하자고 할 때 나오는 동사야. profile the query, profile the function처럼 대상만 바꿔 쓰면 되고, 결과로 찾는 게 hot path(시간을 제일 먹는 경로)다.",
    "exampleKo": "서비스 프로파일링해서 핫 패스 찾아보자.",
    "questionEn": "The API feels slow but nobody knows which part eats the time. What do you do instead of guessing?",
    "termsKo": "profiler: 함수별 실행 시간과 메모리 사용을 측정해주는 분석 도구.",
    "cueKo": "우리 · 프로파일하자 · 그 서비스를 · 그리고 찾자 · 핫 패스를"
  },
  {
    "key": "cl:tail-the-logs",
    "en": "tail the logs",
    "ko": "로그를 실시간으로 보다",
    "example": "I'm tailing the logs while you send the request.",
    "situations": [
      "라이브 디버깅 중 로그를 지켜볼 때",
      "배포 직후 모니터링할 때"
    ],
    "detail": "tail -f 명령어에서 온 말로, 로그 파일 꼬리를 잡고 새 줄이 찍히는 걸 실시간으로 지켜보는 그림. '내가 로그 보고 있을 테니 요청 쏴봐' 같은 페어 디버깅 상황의 단골 문장이야. 과거 로그를 뒤지는 grep과 달리 tail은 지금 흐르는 걸 본다는 뉘앙스.",
    "exampleKo": "네가 요청 보내는 동안 내가 로그 띄워놓고 볼게.",
    "questionEn": "Your teammate will trigger the bug now, and you want to watch server output live as it happens. What do you do?",
    "termsKo": "tail -f: 파일 끝에 추가되는 내용을 실시간으로 출력해주는 유닉스 명령.",
    "cueKo": "나는 · 따라 보고 있어 · 로그를 · 네가 그 요청을 보내는 동안"
  },
  {
    "key": "cl:grab-the-logs",
    "en": "grab the logs",
    "ko": "로그를 확보하다(가져오다)",
    "example": "Grab the logs from that pod before it gets recycled.",
    "situations": [
      "사라지기 전에 로그를 확보할 때",
      "분석용 로그를 요청할 때"
    ],
    "detail": "로그를 손으로 낚아채 오는 그림으로, get보다 다급하고 캐주얼한 동사야. 파드가 재시작되면 로그가 날아가니까 '죽기 전에 챙겨놔' 같은 상황에서 빛난다. grab a coffee, grab a snapshot처럼 grab은 개발자 입말의 만능 동사.",
    "exampleKo": "그 파드 재활용되기 전에 로그 챙겨놔.",
    "questionEn": "The container will be recycled in minutes and its output will vanish. What do you tell your teammate to do?",
    "termsKo": "",
    "cueKo": "챙겨 놔 · 로그를 · 그 파드에서 · 그게 재활용돼 사라지기 전에"
  },
  {
    "key": "cl:raise-an-alert",
    "en": "raise an alert",
    "ko": "알림(경보)을 발생시키다",
    "example": "The monitor raises an alert when latency tops 500ms.",
    "situations": [
      "모니터링 규칙을 설명할 때",
      "알림 조건을 설계할 때"
    ],
    "detail": "경보 깃발을 들어올리는 그림으로, 모니터링 시스템이 임계치를 넘었을 때 알림을 쏘는 것. fire an alert, trigger an alert도 같은 뜻으로 호환돼. 알림 조건 설계 회의에서 'when do we raise an alert?'처럼 쓴다.",
    "exampleKo": "레이턴시가 500ms 넘으면 모니터가 알림을 올려.",
    "questionEn": "Describe what your monitoring system does when latency crosses the threshold you configured.",
    "termsKo": "threshold: 알림을 울릴지 결정하는 기준값(임계치).",
    "cueKo": "그 모니터는 · 올린다 · 알림을 · 레이턴시가 500ms를 넘을 때"
  },
  {
    "key": "cl:mute-an-alert",
    "en": "mute an alert",
    "ko": "알림을 음소거하다(일시 중지)",
    "example": "Mute the alert during the maintenance window.",
    "situations": [
      "계획된 작업 중 알림이 쏟아질 때",
      "노이즈 알림을 정리할 때"
    ],
    "detail": "휴대폰 음소거하듯 알림을 잠시 꺼두는 것. 점검 시간에 뻔히 울릴 알림을 미리 꺼두거나, 노이즈만 만드는 알림을 잠재울 때 쓴다. silence an alert도 완전히 같은 뜻이고, 영구히 끄는 게 아니라 일시적이라는 뉘앙스가 핵심.",
    "exampleKo": "점검 시간 동안엔 그 알림 꺼놔.",
    "questionEn": "Planned maintenance tonight will set off pages that everyone already expects. What do you do beforehand?",
    "termsKo": "maintenance window: 점검 작업을 하기로 미리 공지된 시간대.",
    "cueKo": "꺼 둬 · 그 알림을 · 점검 시간 동안"
  },
  {
    "key": "cl:page-the-on-call",
    "en": "page the on-call",
    "ko": "온콜 담당자를 호출하다",
    "example": "If error rates double, page the on-call immediately.",
    "situations": [
      "에스컬레이션 기준을 정할 때",
      "새벽 장애 대응을 이야기할 때"
    ],
    "detail": "옛날 삐삐(pager)에서 온 말로, 당직 엔지니어를 긴급 호출하는 것. PagerDuty라는 서비스 이름에도 박혀 있을 만큼 표준 어휘야. 'I got paged at 3am'(새벽 3시에 호출당했다)은 온콜 고생담의 클리셰 문장이니 통째로 외워둘 것.",
    "exampleKo": "에러율이 두 배 되면 즉시 온콜 호출해.",
    "questionEn": "It is 3am, production is down, and someone is on duty this week. What does the alert system do?",
    "termsKo": "on-call: 장애 발생 시 즉시 대응하기로 당번이 정해진 엔지니어.",
    "cueKo": "만약 에러율이 두 배가 되면 · 호출해 · 온콜 담당자를 · 즉시"
  },
  {
    "key": "cl:declare-an-incident",
    "en": "declare an incident",
    "ko": "장애(인시던트)를 공식 선포하다",
    "example": "This is bad enough — let's declare an incident.",
    "situations": [
      "장애 대응 체계를 가동할 때",
      "심각도를 판단할 때"
    ],
    "detail": "'지금부터 공식 장애 상황이다'라고 선언해서 대응 프로세스를 가동시키는 것. 선포하는 순간 incident channel이 열리고 역할이 배정되는 등 절차가 굴러가기 시작해. 가볍게 보던 문제의 심각성을 격상시키는 결정의 말이라 무게가 있다.",
    "exampleKo": "이건 좀 심각한데. 정식으로 장애 선포하자.",
    "questionEn": "The outage is worse than first thought, and you need the formal response process started. What is the call you make?",
    "termsKo": "incident: 공식 대응 절차가 따르는 서비스 장애 이벤트. 보통 SEV 등급을 매김.",
    "cueKo": "이건 · 충분히 심각해 · 우리 · 선언하자 · 인시던트를"
  },
  {
    "key": "cl:write-a-postmortem",
    "en": "write a postmortem",
    "ko": "장애 회고 문서를 쓰다",
    "example": "I'll write the postmortem for yesterday's outage.",
    "situations": [
      "장애 종료 후 회고 절차를 말할 때",
      "재발 방지 논의를 시작할 때"
    ],
    "detail": "부검이라는 뜻 그대로, 끝난 장애를 해부해서 원인과 타임라인, 재발 방지책을 문서로 남기는 것. 장애가 끝나면 'who's writing the postmortem?'이 자동으로 따라오는 질문이야. blameless postmortem(책임 추궁 없는 회고)이라는 수식어와 세트로 자주 다닌다.",
    "exampleKo": "어제 장애 회고 문서는 내가 쓸게.",
    "questionEn": "The outage is resolved, and now the team needs a document explaining what happened and how to prevent it. Who does what?",
    "termsKo": "postmortem: 장애 원인, 타임라인, 액션 아이템을 정리하는 사후 분석 문서.",
    "cueKo": "나는 · 쓸게 · 포스트모템을 · 어제 장애에 대한"
  },
  {
    "key": "cl:bounce-the-service",
    "en": "bounce the service",
    "ko": "서비스를 재시작하다(껐다 켜기)",
    "example": "Just bounce the service and see if it recovers.",
    "situations": [
      "임시 조치로 재시작을 제안할 때",
      "메모리 이상 시 응급 처치할 때"
    ],
    "detail": "공을 바닥에 한 번 튕기듯 서비스를 껐다 켜는 것. restart의 캐주얼한 입말 버전으로, '일단 한번 튕겨보고 되는지 보자'는 응급처치 뉘앙스야. bounce the server, bounce the pod처럼 대상은 자유롭게 바꿔 쓴다.",
    "exampleKo": "서비스 한번 재시작해보고 복구되는지 봐.",
    "questionEn": "Memory looks weird and you want the classic turn-it-off-and-on-again fix for the service. How do you say it casually?",
    "termsKo": "",
    "cueKo": "그냥 껐다 켜 · 그 서비스를 · 그리고 봐 · 회복되는지"
  },
  {
    "key": "cl:rotate-the-credentials",
    "en": "rotate the credentials",
    "ko": "자격증명(키/비밀번호)을 교체하다",
    "example": "The key leaked, so we rotated all the credentials.",
    "situations": [
      "키 유출 사고에 대응할 때",
      "정기 보안 절차를 설명할 때"
    ],
    "detail": "자물쇠를 통째로 갈아끼우듯 쓰던 키를 새것으로 교체하는 것. 유출 사고 대응의 1순위 조치이자, 사고가 없어도 주기적으로 하는 보안 루틴이야. rotate the keys, rotate the secrets, rotate the tokens 모두 같은 패턴으로 쓴다.",
    "exampleKo": "키가 유출돼서 자격증명 전부 교체했어.",
    "questionEn": "An API key was accidentally committed to a public repo. What is the very first security action?",
    "termsKo": "credential rotation: 키와 비밀번호를 주기적으로 새것으로 바꾸는 보안 관행.",
    "cueKo": "그 키가 · 유출됐어 · 그래서 우리는 · 교체했어 · 모든 크리덴셜을"
  },
  {
    "key": "cl:run-a-migration",
    "en": "run a migration",
    "ko": "DB 마이그레이션을 실행하다",
    "example": "Run the migration before you start the new version.",
    "situations": [
      "배포 절차에서 DB 변경 순서를 말할 때",
      "스키마 변경을 적용할 때"
    ],
    "detail": "DB 스키마를 바꾸는 스크립트를 실행해서 구조를 한 단계 옮기는 것. 배포 순서 얘기에서 '마이그레이션 먼저 돌리고 앱 띄워' 식으로 매일 나온다. apply a migration도 같은 뜻이고, Flyway나 Liquibase 같은 도구 이름과 세트로 등장한다.",
    "exampleKo": "새 버전 띄우기 전에 마이그레이션부터 돌려.",
    "questionEn": "The new release needs an extra database column. What must happen before the app starts?",
    "termsKo": "migration: DB 스키마 변경을 버전 관리되는 스크립트로 적용하는 방식.",
    "cueKo": "돌려 · 그 마이그레이션을 · 네가 새 버전을 시작하기 전에"
  },
  {
    "key": "cl:seed-the-database",
    "en": "seed the database",
    "ko": "DB에 초기 데이터를 심다",
    "example": "The script seeds the database with test users.",
    "situations": [
      "로컬 개발 환경을 셋업할 때",
      "테스트용 데이터 준비를 말할 때"
    ],
    "detail": "씨앗을 뿌리듯 빈 DB에 시작용 데이터를 넣어주는 것. 신규 입사자 온보딩이나 로컬 환경 셋업 설명에서 'run the seed script'로 단골 등장해. 운영 데이터 이전과는 다른, 개발/테스트용 초기값이라는 뉘앙스가 핵심이다.",
    "exampleKo": "그 스크립트가 DB에 테스트 유저들을 심어줘.",
    "questionEn": "A new teammate's local environment has an empty database and the app needs sample users. What does the setup script do?",
    "termsKo": "seed data: 개발과 테스트를 위해 미리 넣어두는 초기 데이터.",
    "cueKo": "그 스크립트는 · 채워 넣는다 · 데이터베이스를 · 테스트 유저들로"
  },
  {
    "key": "cl:backfill-data",
    "en": "backfill data",
    "ko": "과거 데이터를 소급해서 채우다",
    "example": "We need to backfill data for the last six months.",
    "situations": [
      "새 컬럼을 기존 행에 채울 때",
      "누락된 기간의 데이터를 복구할 때"
    ],
    "detail": "구덩이를 뒤에서부터 메우듯, 새로 생긴 컬럼이나 누락된 기간의 데이터를 과거분까지 소급해 채우는 작업. 새 필드 추가나 파이프라인 장애 복구 뒤에 거의 반드시 따라오는 말이야. backfill job이라는 명사형으로도 흔하게 쓴다.",
    "exampleKo": "지난 6개월치 데이터를 소급해서 채워야 해.",
    "questionEn": "You added a new column, but every existing row from the past six months has it empty. What job do you run?",
    "termsKo": "",
    "cueKo": "우리는 · 채워 넣어야 해 · 데이터를 · 지난 6개월치"
  },
  {
    "key": "cl:add-an-index",
    "en": "add an index",
    "ko": "(DB 컬럼에) 인덱스를 추가하다",
    "example": "Adding an index on user_id cut the query to 20ms.",
    "situations": [
      "느린 쿼리를 개선할 때",
      "쿼리 플랜을 분석할 때"
    ],
    "detail": "책 뒤의 색인처럼 컬럼에 찾아보기를 만들어 조회를 빠르게 하는 것. 느린 쿼리 얘기가 나오면 'is there an index on that column?'이 반사적으로 나오는 첫 질문이야. 쓰기 비용이 늘어나는 트레이드오프 얘기까지 이어지면 금상첨화.",
    "exampleKo": "user_id에 인덱스 추가했더니 쿼리가 20ms로 줄었어.",
    "questionEn": "A query filtering on user_id scans the whole table and takes ten seconds. What is the standard fix?",
    "termsKo": "index: 특정 컬럼 조회를 빠르게 하는 자료구조. 풀 스캔을 피하게 해줌.",
    "cueKo": "인덱스를 추가한 게 · user_id에 · 줄였어 · 그 쿼리를 · 20ms로"
  },
  {
    "key": "cl:mock-a-dependency",
    "en": "mock a dependency",
    "ko": "의존성을 모킹하다(가짜로 대체)",
    "example": "We mock the payment client so tests don't hit the real API.",
    "situations": [
      "단위 테스트 전략을 설명할 때",
      "외부 API 없이 테스트할 때"
    ],
    "detail": "테스트에서 진짜 의존성 대신 흉내내는 가짜를 끼워넣는 것. '실제 API 안 때리려고 mock했다'는 단위 테스트 설명의 공식 문장이야. Mockito 같은 도구 이름이 보여주듯 mock은 완전히 동사로 굳었고, 단순 고정 응답만 주는 stub과는 결이 약간 다르다.",
    "exampleKo": "테스트가 진짜 API 안 치게 결제 클라이언트는 모킹해.",
    "questionEn": "Your unit tests must not call the real payment provider. How do you isolate that part?",
    "termsKo": "mock: 진짜 객체를 흉내내며 호출 여부까지 검증할 수 있는 테스트 대역.",
    "cueKo": "우리는 · 모킹한다 · 결제 클라이언트를 · 테스트가 진짜 API를 안 때리게"
  },
  {
    "key": "cl:stub-a-method",
    "en": "stub a method",
    "ko": "메서드를 스텁 처리하다(고정 응답 주입)",
    "example": "Just stub the method to return an empty list.",
    "situations": [
      "테스트 시나리오별 응답을 정할 때",
      "아직 없는 구현을 임시로 막을 때"
    ],
    "detail": "메서드가 정해진 값만 돌려주게 고정시키는 것. '이 테스트에선 빈 리스트 리턴하게 스텁해' 같은 테스트 작성 대화에서 매일 나와. 호출 검증까지 하는 mock과 달리 stub은 그냥 '미리 짠 대답'이라는 뉘앙스로, 실무에선 둘을 섞어 쓰기도 한다.",
    "exampleKo": "그 메서드는 빈 리스트 리턴하게 스텁 처리해.",
    "questionEn": "For this test case you need the lookup call to always return an empty list. What do you do to it?",
    "termsKo": "stub: 미리 정한 고정 응답만 돌려주는 단순한 테스트 대역.",
    "cueKo": "그냥 스텁 처리해 · 그 메서드를 · 빈 리스트를 돌려주게"
  },
  {
    "key": "cl:assert-on-the-result",
    "en": "assert on the result",
    "ko": "결과값을 검증(어서션)하다",
    "example": "The test asserts on the result, not the implementation.",
    "situations": [
      "테스트가 무엇을 검증하는지 설명할 때",
      "깨지기 쉬운 테스트를 리뷰할 때"
    ],
    "detail": "테스트에서 '이 값이어야 한다'고 단언하고 아니면 실패시키는 것. assert on X 형태로 검증 대상을 말하는 게 포인트야. '구현 말고 결과에 assert해라'는 깨지기 쉬운 테스트를 지적하는 단골 리뷰 멘트로 통째로 외워둘 만하다.",
    "exampleKo": "그 테스트는 구현이 아니라 결과를 검증해.",
    "questionEn": "Your test breaks on every refactor because it checks internal calls. What should it verify instead?",
    "termsKo": "assertion: 테스트에서 기대값과 실제값이 같은지 단언하는 검증 구문.",
    "cueKo": "그 테스트는 · 단언한다 · 결과에 대해 · 구현이 아니라"
  },
  {
    "key": "cl:the-test-is-flaky",
    "en": "the test is flaky",
    "ko": "테스트가 들쭉날쭉하다(될 때도 안 될 때도)",
    "example": "That test is flaky — it fails maybe once in ten runs.",
    "situations": [
      "CI가 간헐적으로 실패할 때",
      "테스트 신뢰도를 논의할 때"
    ],
    "detail": "flaky는 페인트가 들떠 벗겨지듯 미덥지 못하다는 뜻으로, 코드 변경 없이도 됐다 안 됐다 하는 테스트를 말해. 보통 타이밍이나 실행 순서 의존이 원인이야. 'rerun it, it's just flaky'(그냥 들쭉날쭉한 거니 다시 돌려)는 CI 잡담의 최빈출 문장.",
    "exampleKo": "그 테스트 들쭉날쭉해. 열 번에 한 번꼴로 실패해.",
    "questionEn": "A test fails randomly in CI but always passes when rerun, with no code changes. How do you describe it?",
    "termsKo": "flaky test: 같은 코드인데 실행마다 결과가 달라지는 비결정적 테스트.",
    "cueKo": "그 테스트는 · 들쭉날쭉해 · 그게 · 실패해 · 아마 한 번꼴로 · 열 번 실행 중에"
  },
  {
    "key": "cl:cover-an-edge-case",
    "en": "cover an edge case",
    "ko": "엣지 케이스를 (테스트로) 커버하다",
    "example": "Does this test cover the edge case where the list is empty?",
    "situations": [
      "테스트 누락을 지적할 때",
      "경계 조건 처리를 확인할 때"
    ],
    "detail": "빈 리스트, null, 0, 최대값 같은 경계 상황까지 테스트 그물로 덮는다는 그림. 코드 리뷰에서 'edge case 커버됐어?'는 가장 흔한 질문 중 하나야. handle an edge case는 코드가 처리한다는 쪽, cover는 테스트가 보장한다는 쪽으로 미묘하게 갈린다.",
    "exampleKo": "리스트가 비어 있는 엣지 케이스도 이 테스트가 커버해?",
    "questionEn": "The happy path is tested, but what about empty input, nulls, and boundary values? What is missing?",
    "termsKo": "edge case: 정상 흐름 바깥의 극단적 입력이나 경계 조건 상황.",
    "cueKo": "이 테스트가 · 커버해? · 그 엣지 케이스를 · 리스트가 비어 있는 경우의"
  }
];
export const WORKSHOP_COUNTS = { particles: 58, particleGroups: 11, collocations: 72 };
export const PREP_GROUPS: ParticleGroup[] = [
  {
    "particle": "under",
    "coreKo": "under는 무언가가 위에서 누르고 있는 그림이에요. 시스템이 부하·압박·경합 같은 무게 '아래에' 깔려 있는 상태죠. 그래서 under 뒤에는 거의 항상 시스템이나 사람을 짓누르는 조건(load, pressure, contention)이나 덮고 있는 표면·상태(the hood, maintenance, review)가 와요.",
    "items": [
      {
        "key": "pr:under-load",
        "en": "under load",
        "ko": "부하가 걸린 상태에서",
        "example": "The latency looks fine until the service is under load.",
        "situations": [
          "성능 테스트 결과를 설명할 때",
          "장애 원인을 부하로 지목할 때",
          "스케일링 필요성을 주장할 때"
        ],
        "detail": "부하라는 무게가 시스템을 위에서 누르는 그림 그대로예요. 평소엔 멀쩡한데 트래픽이 몰리면 깨지는 동작을 설명할 때 거의 자동으로 나오는 표현이죠. 'under heavy load', 'under peak load'처럼 수식어를 붙인 형태도 그대로 많이 써요.",
        "exampleKo": "지연 시간은 괜찮아 보이는데, 서비스에 부하가 걸리면 얘기가 달라져요.",
        "questionEn": "Your service passes all tests but fails in production at busy hours. How would you describe that?",
        "termsKo": "load: 시스템이 처리 중인 요청량/작업량. 부하 테스트(load test)로 한계를 측정.",
        "cueKo": "지연 시간은 · 괜찮아 보인다 · 서비스가 부하 아래 놓이기 전까지는"
      },
      {
        "key": "pr:under-the-hood",
        "en": "under the hood",
        "ko": "내부적으로는, 속을 들여다보면",
        "example": "Under the hood, it's just a wrapper around Postgres.",
        "situations": [
          "추상화 뒤의 실제 구현을 설명할 때",
          "라이브러리 동작 원리를 풀어줄 때"
        ],
        "detail": "자동차 보닛(hood) 아래에 엔진이 있다는 그림이에요. 겉으로 보이는 API 뒤에서 실제로 뭐가 도는지 설명할 때 쓰는 단골 표현이죠. 면접관이 'how does X work under the hood?'라고 물으면 내부 구현을 설명하라는 신호예요.",
        "exampleKo": "내부적으로 보면 그냥 Postgres 위에 래퍼 하나 씌운 거예요.",
        "questionEn": "Everyone uses this ORM, but what's actually happening inside when you call save()?",
        "termsKo": "",
        "cueKo": "속을 들여다보면 · 그건 · 그냥 래퍼다 · Postgres를 감싼"
      },
      {
        "key": "pr:under-pressure",
        "en": "under pressure",
        "ko": "압박을 받는 상황에서",
        "example": "We shipped that fix under pressure, so it's not pretty.",
        "situations": [
          "급하게 내린 기술 결정을 변호할 때",
          "행동 면접에서 마감 압박 경험을 얘기할 때"
        ],
        "detail": "시간·경영진·장애 상황이 위에서 짓누르는 그림이에요. 행동 면접 단골 질문 'tell me about a time you worked under pressure'에 그대로 등장하죠. under load가 시스템 얘기라면 under pressure는 사람 얘기라는 게 차이예요.",
        "exampleKo": "그 픽스는 압박 속에서 급하게 내보낸 거라 코드가 깔끔하진 않아요.",
        "questionEn": "Tell me about a time you had to make a call with the deadline breathing down your neck.",
        "termsKo": "",
        "cueKo": "우리는 · 내보냈다 · 그 픽스를 · 압박 속에서 · 그래서 · 그게 깔끔하지 않다"
      },
      {
        "key": "pr:under-contention",
        "en": "under contention",
        "ko": "(자원) 경합이 걸린 상태에서",
        "example": "That row is constantly under contention, so updates keep timing out.",
        "situations": [
          "락 경합으로 인한 성능 문제를 설명할 때",
          "핫 로우/핫 파티션 문제를 진단할 때"
        ],
        "detail": "여러 스레드나 트랜잭션이 같은 자원을 두고 다투는 무게가 그 자원 위에 얹혀 있는 그림이에요. DB 락, 뮤텍스, 핫 파티션 얘기할 때 나오죠. 'lock contention'이라는 명사형으로도 정말 많이 쓰니 같이 외워두세요.",
        "exampleKo": "그 로우는 항상 경합이 걸려 있어서 업데이트가 계속 타임아웃 나요.",
        "questionEn": "Many transactions keep fighting over the same database row. How would you describe that row's state?",
        "termsKo": "contention: 여러 실행 주체가 같은 락/자원을 동시에 요구해 서로 대기하게 되는 상태.",
        "cueKo": "그 로우는 · 끊임없이 · 경합에 걸려 있다 · 그래서 · 업데이트들이 · 계속 타임아웃 난다"
      },
      {
        "key": "pr:under-maintenance",
        "en": "under maintenance",
        "ko": "점검 중인",
        "example": "The payment service is under maintenance until two, so use the sandbox.",
        "situations": [
          "점검 공지를 전달할 때",
          "특정 환경을 지금 못 쓰는 이유를 말할 때"
        ],
        "detail": "시스템이 '점검'이라는 상태 아래 들어가 있는 그림이에요. 상태 페이지나 슬랙 공지에서 그대로 보는 표현이고, 'down for maintenance'와 거의 같은 뜻으로 입에서 나오죠. under construction(공사 중)도 같은 패턴이에요.",
        "exampleKo": "결제 서비스가 2시까지 점검 중이라 샌드박스를 쓰세요.",
        "questionEn": "The staging environment is intentionally offline for a scheduled upgrade. How do you announce that to the team?",
        "termsKo": "",
        "cueKo": "결제 서비스는 · 점검 중이다 · 2시까지 · 그러니 · 써라 · 샌드박스를"
      },
      {
        "key": "pr:under-review",
        "en": "under review",
        "ko": "검토/리뷰 중인",
        "example": "That PR has been under review for three days now.",
        "situations": [
          "PR 진행 상황을 공유할 때",
          "디자인 문서가 승인 대기 중일 때"
        ],
        "detail": "작업물이 '검토'라는 과정 아래에 놓여 있는 그림이에요. PR, 디자인 문서, 보안 심사 등 승인 대기 상태 전반에 써요. in review라고도 하는데 둘 다 자연스러워요.",
        "exampleKo": "그 PR 벌써 3일째 리뷰 중이에요.",
        "questionEn": "Your pull request is waiting on approvals and nothing is moving. How do you describe its status in standup?",
        "termsKo": "",
        "cueKo": "그 PR은 · 계속 리뷰 중이다 · 사흘째 · 지금까지"
      }
    ]
  },
  {
    "particle": "at",
    "coreKo": "at은 지도 위에 점을 콕 찍는 그림이에요. 규모 축의 한 지점(at scale, at peak), 시간 축의 한 지점(at runtime), 추상화 스택의 한 층(at the API level)을 정확히 찍어서 말하죠. '어느 지점에서 그런가'를 짚을 때 at이 깔려요.",
    "items": [
      {
        "key": "pr:at-scale",
        "en": "at scale",
        "ko": "대규모 환경에서",
        "example": "That design works fine until you run it at scale.",
        "situations": [
          "소규모에선 통하던 설계의 한계를 짚을 때",
          "시스템 디자인 면접에서 규모를 전제로 말할 때"
        ],
        "detail": "규모 축에서 '큰 규모'라는 지점을 콕 찍는 표현이에요. 시스템 디자인 면접 최빈출 — 'does this work at scale?'은 사용자 수백만 명 기준에서도 되냐는 뜻이죠. 'at this scale', 'at our scale'처럼 수식해서 특정 규모를 가리키기도 해요.",
        "exampleKo": "그 설계는 대규모로 돌리기 전까진 잘 동작해요.",
        "questionEn": "This approach is fine for a thousand users, but what about a hundred million?",
        "termsKo": "",
        "cueKo": "그 설계는 · 잘 돌아간다 · 네가 그걸 대규모로 돌리기 전까지는"
      },
      {
        "key": "pr:at-rest",
        "en": "at rest",
        "ko": "저장된 상태의 (정지 상태의)",
        "example": "All customer data is encrypted at rest and in transit.",
        "situations": [
          "보안/암호화 정책을 설명할 때",
          "컴플라이언스 요건을 말할 때"
        ],
        "detail": "데이터가 디스크에 '가만히 멈춰 있는' 지점을 찍는 그림이에요. 거의 항상 in transit(전송 중)과 짝으로 나와요 — 저장 암호화 vs 전송 암호화. 보안 질문에서 'encrypted at rest'를 한 덩어리로 말하면 자연스러워요.",
        "exampleKo": "고객 데이터는 저장 시와 전송 시 모두 암호화돼요.",
        "questionEn": "How do you protect sensitive data sitting in the database, not just while it travels?",
        "termsKo": "encryption at rest: 디스크/스토리지에 저장된 데이터의 암호화. in transit은 네트워크 전송 구간 암호화(TLS).",
        "cueKo": "모든 고객 데이터는 · 암호화된다 · 저장 상태에서 · 그리고 전송 중에도"
      },
      {
        "key": "pr:at-peak",
        "en": "at peak",
        "ko": "피크 시간대에, 최대치일 때",
        "example": "We handle about fifty thousand requests per second at peak.",
        "situations": [
          "트래픽 규모를 숫자로 말할 때",
          "용량 산정 근거를 설명할 때"
        ],
        "detail": "트래픽 그래프의 최고점 지점을 찍는 표현이에요. 용량 얘기는 평균보다 피크가 중요하니까, 면접에서 숫자를 말할 때 'at peak'를 붙이면 정확해지죠. 'at peak hours', 'at peak traffic'처럼 풀어 쓰기도 해요.",
        "exampleKo": "피크 때는 초당 5만 건 정도 처리해요.",
        "questionEn": "What request volume does your system see at its absolute busiest moment?",
        "termsKo": "",
        "cueKo": "우리는 · 처리한다 · 약 5만 개의 요청을 · 초당 · 피크 때"
      },
      {
        "key": "pr:at-runtime",
        "en": "at runtime",
        "ko": "실행 시점에",
        "example": "We resolve the config at runtime, not at build time.",
        "situations": [
          "빌드 타임 vs 런타임 결정을 구분할 때",
          "동적 설정/주입을 설명할 때"
        ],
        "detail": "프로그램 생애주기 축에서 '실행 중'이라는 시점을 찍는 그림이에요. at compile time, at build time, at deploy time과 대조 짝으로 늘 나오죠. '그 값이 언제 결정되냐'는 질문에 이 시리즈로 답하면 깔끔해요.",
        "exampleKo": "그 설정은 빌드 타임이 아니라 런타임에 결정돼요.",
        "questionEn": "Is that value baked in when you compile, or decided while the program is running?",
        "termsKo": "runtime: 프로그램이 실제로 실행되는 시점/환경. 컴파일·빌드 시점과 구분.",
        "cueKo": "우리는 · 결정한다 · 설정을 · 런타임에 · 빌드 타임이 아니라"
      },
      {
        "key": "pr:at-the-api-level",
        "en": "at the API level",
        "ko": "API 계층에서",
        "example": "We enforce rate limiting at the API level, not in each service.",
        "situations": [
          "어느 계층에서 처리할지 설명할 때",
          "검증/인증 책임의 위치를 논할 때"
        ],
        "detail": "추상화 스택에서 특정 층을 콕 찍는 표현이에요. at the database level, at the network level, at the application level 전부 같은 패턴이고, 아키텍처 토론에서 '어디서 처리할 거냐'를 다툴 때 끝없이 나와요.",
        "exampleKo": "레이트 리미팅은 각 서비스가 아니라 API 레벨에서 강제해요.",
        "questionEn": "Where in the stack do you handle validation — every service, or one shared layer?",
        "termsKo": "",
        "cueKo": "우리는 · 강제한다 · 요청 제한을 · API 레벨에서 · 각 서비스 안이 아니라"
      },
      {
        "key": "pr:at-a-glance",
        "en": "at a glance",
        "ko": "한눈에",
        "example": "The dashboard shows service health at a glance.",
        "situations": [
          "대시보드/모니터링 도구의 장점을 말할 때",
          "가독성 좋은 코드나 문서를 칭찬할 때"
        ],
        "detail": "시선이 한 번 닿는 '한 점'의 그림이에요. 대시보드, README, 코드 가독성 얘기할 때 'you can see X at a glance'로 자주 나와요. 옵저버빌리티 설명에 끼워 넣으면 말이 살아나죠.",
        "exampleKo": "그 대시보드는 서비스 상태를 한눈에 보여줘요.",
        "questionEn": "What makes a good on-call dashboard different from a wall of raw metrics?",
        "termsKo": "",
        "cueKo": "대시보드는 · 보여준다 · 서비스 상태를 · 한눈에"
      },
      {
        "key": "pr:at-the-end-of-the-day",
        "en": "at the end of the day",
        "ko": "결국, 따지고 보면",
        "example": "At the end of the day, it's a trade-off between cost and latency.",
        "situations": [
          "트레이드오프 논의를 결론으로 정리할 때",
          "기술 논쟁을 한 문장으로 매듭지을 때"
        ],
        "detail": "하루의 끝, 즉 모든 논의가 끝난 지점을 찍는 그림이에요. 면접에서 트레이드오프를 쭉 펼친 뒤 결론을 던질 때 쓰는 시그널 표현이죠. 너무 자주 쓰면 입버릇처럼 들리니 답변당 한 번이면 충분해요.",
        "exampleKo": "결국엔 비용과 지연 시간 사이의 트레이드오프예요.",
        "questionEn": "You've listed pros and cons of both databases. So which one wins, and why?",
        "termsKo": "",
        "cueKo": "결국엔 · 그건 · 트레이드오프다 · 비용과 지연 시간 사이의"
      }
    ]
  },
  {
    "particle": "in",
    "coreKo": "in은 경계가 있는 공간 '안'의 그림이에요. 메모리 안, 운영 환경 안, 병렬이라는 시간 구간 안, 동기화라는 상태 안 — 무언가가 어떤 컨테이너나 상태 속에 들어가 있다는 거죠. 데이터나 코드가 '어디에/어떤 상태에 있나'를 말할 때 in이 깔려요.",
    "items": [
      {
        "key": "pr:in-memory",
        "en": "in memory",
        "ko": "메모리상에(서)",
        "example": "We keep the session data in memory for fast lookups.",
        "situations": [
          "캐싱 전략을 설명할 때",
          "재시작 시 데이터 유실 리스크를 짚을 때"
        ],
        "detail": "데이터가 RAM이라는 공간 '안에' 들어 있는 그림이에요. on disk와 짝을 이루는 대조가 핵심 — 메모리는 빠르지만 휘발성, 디스크는 느리지만 영속이죠. 'in-memory cache'처럼 하이픈 붙은 형용사형도 입에 붙여두세요.",
        "exampleKo": "빠른 조회를 위해 세션 데이터는 메모리에 들고 있어요.",
        "questionEn": "Why is Redis so much faster than hitting the database every time?",
        "termsKo": "in-memory store: RAM에 데이터를 두는 저장소(Redis 등). 빠르지만 프로세스가 죽으면 날아감.",
        "cueKo": "우리는 · 둔다 · 세션 데이터를 · 메모리에 · 빠른 조회를 위해"
      },
      {
        "key": "pr:in-flight",
        "en": "in flight",
        "ko": "처리 중인, 전송 중인",
        "example": "We drain in-flight requests before shutting the pod down.",
        "situations": [
          "그레이스풀 셧다운을 설명할 때",
          "배포 중 요청 유실 방지책을 말할 때"
        ],
        "detail": "요청이 비행기처럼 '공중에 떠 있는' 그림 — 출발은 했는데 아직 착륙(완료)을 못 한 상태예요. 그레이스풀 셧다운, 재시도, 중복 처리 얘기의 핵심 단어죠. at rest(저장됨)와 대비되고, 데이터 쪽에선 in transit과 거의 같은 뜻이에요.",
        "exampleKo": "파드를 내리기 전에 처리 중인 요청을 먼저 비워요.",
        "questionEn": "During a rolling deploy, what happens to requests that already started but haven't finished?",
        "termsKo": "graceful shutdown: 새 요청은 막고 진행 중인 요청은 끝까지 처리한 뒤 종료하는 방식.",
        "cueKo": "우리는 · 비워낸다 · 처리 중인 요청들을 · 파드를 내리기 전에"
      },
      {
        "key": "pr:in-prod",
        "en": "in prod",
        "ko": "운영 환경에서",
        "example": "It works locally but breaks in prod, classic.",
        "situations": [
          "환경별 차이로 인한 버그를 말할 때",
          "운영 반영 여부를 확인할 때"
        ],
        "detail": "코드가 '운영'이라는 환경 공간 안에 있는 그림이에요. production을 줄여 prod라고 하는 게 구어 표준이고, in staging, in dev도 같은 패턴이죠. 'test in prod'는 농담 반 진담 반 밈으로도 쓰여요.",
        "exampleKo": "로컬에선 되는데 운영에선 깨져요, 아주 클래식하죠.",
        "questionEn": "The bug never shows up on your laptop, only on the live servers. How do you say that?",
        "termsKo": "",
        "cueKo": "그건 · 돌아간다 · 로컬에선 · 하지만 깨진다 · 프로드에선 · 늘 그렇듯"
      },
      {
        "key": "pr:in-parallel",
        "en": "in parallel",
        "ko": "병렬로, 동시에",
        "example": "We fan out and call the three services in parallel.",
        "situations": [
          "지연 시간 최적화를 설명할 때",
          "두 작업을 동시에 진행하자고 제안할 때"
        ],
        "detail": "여러 작업이 같은 시간 구간 '안에서' 나란히 도는 그림이에요. sequentially(순차로)와 대비해서 지연 시간을 줄이는 설계를 설명할 때 필수죠. 사람 일에도 그대로 써요 — 'let's work on those in parallel'.",
        "exampleKo": "세 서비스를 팬아웃해서 병렬로 호출해요.",
        "questionEn": "Calling those three APIs one after another takes 900ms total. How do you cut that down?",
        "termsKo": "",
        "cueKo": "우리는 · 팬아웃해서 · 호출한다 · 그 세 서비스를 · 병렬로"
      },
      {
        "key": "pr:in-place",
        "en": "in place",
        "ko": "제자리에서 (복사 없이); 갖춰져 있는",
        "example": "We update the array in place to avoid extra allocations.",
        "situations": [
          "코딩 면접에서 공간 복잡도를 말할 때",
          "안전장치가 마련되어 있다고 말할 때"
        ],
        "detail": "데이터가 원래 있던 자리 '안에서' 바뀌는 그림이에요. 코딩 면접에서 'can you do it in place?'는 O(1) 추가 공간으로 풀라는 뜻이죠. 전혀 다른 결로 'we have monitoring in place'처럼 '갖춰져 있다'는 뜻도 진짜 많이 쓰니 둘 다 알아두세요.",
        "exampleKo": "추가 할당을 피하려고 배열을 제자리에서 수정해요.",
        "questionEn": "Can you sort this array without allocating a second one?",
        "termsKo": "in-place algorithm: 입력이 담긴 메모리 안에서 직접 변형해 O(1) 보조 공간만 쓰는 알고리즘.",
        "cueKo": "우리는 · 업데이트한다 · 배열을 · 제자리에서 · 추가 할당을 피하려고"
      },
      {
        "key": "pr:in-sync",
        "en": "in sync",
        "ko": "동기화된 상태인",
        "example": "The replica stays in sync with the primary within a second.",
        "situations": [
          "복제/캐시 일관성을 설명할 때",
          "두 팀이나 문서의 정보가 맞는지 확인할 때"
        ],
        "detail": "두 시스템이 '동기화'라는 상태 안에 같이 들어가 있는 그림이에요. 복제, 캐시 무효화, 설정 드리프트 얘기에 다 나오고 반대는 out of sync죠. 사람한테도 써요 — 'let's sync up'은 정보를 맞추자는 뜻이에요.",
        "exampleKo": "레플리카는 프라이머리와 1초 이내로 동기화를 유지해요.",
        "questionEn": "How do you make sure the cache and the database always show the same data?",
        "termsKo": "replication lag: 프라이머리의 변경이 레플리카에 반영되기까지의 지연.",
        "cueKo": "레플리카는 · 동기화를 유지한다 · 프라이머리와 · 1초 이내로"
      },
      {
        "key": "pr:in-the-hot-path",
        "en": "in the hot path",
        "ko": "핫 패스(빈번 실행 경로)에 있는",
        "example": "Don't put a network call in the hot path.",
        "situations": [
          "성능 최적화 우선순위를 정할 때",
          "요청 경로상의 비용을 따질 때"
        ],
        "detail": "요청마다 매번 밟는 '뜨거운 길' 안에 코드가 놓여 있는 그림이에요. 거기 들어간 코드는 전체 호출량을 그대로 맞기 때문에 1ms도 무겁죠. 최적화 논의에서 'is this in the hot path?'가 우선순위를 가르는 질문이에요.",
        "exampleKo": "핫 패스에 네트워크 호출 넣지 마세요.",
        "questionEn": "This function runs on every single request. How careful should we be about its cost?",
        "termsKo": "hot path: 가장 자주 실행되는 코드 경로. 여기의 최적화가 체감 성능을 좌우.",
        "cueKo": "넣지 마라 · 네트워크 호출을 · 핫 패스에"
      },
      {
        "key": "pr:in-practice",
        "en": "in practice",
        "ko": "실제로는, 실무에서는",
        "example": "In theory it's eventually consistent; in practice it converges in milliseconds.",
        "situations": [
          "이론과 실제의 간극을 짚을 때",
          "교과서 답변에 현실 경험을 얹을 때"
        ],
        "detail": "'실무'라는 현실 공간 안에서 본 모습이라는 그림이에요. in theory와 짝으로 쓰면 면접 답변의 격이 올라가요 — 이론을 말하고 in practice로 경험을 얹는 구조죠. 시니어다움을 보여주는 한 방이에요.",
        "exampleKo": "이론상은 최종 일관성이지만 실제로는 밀리초 안에 수렴해요.",
        "questionEn": "The textbook says this is O(n log n). Does that ever matter for your real workloads?",
        "termsKo": "",
        "cueKo": "이론상으론 · 그건 · 최종적 일관성이다 · 실제로는 · 그게 · 수렴한다 · 밀리초 안에"
      }
    ]
  },
  {
    "particle": "on",
    "coreKo": "on은 표면에 닿아 얹혀 있는 그림이에요. 데이터가 디스크 표면에(on disk), 바이트가 회선 위에(on the wire), 시스템이 다른 시스템 위에(on top of) 얹히죠. 진행 중인 모드(on call, on demand)도 어떤 상태 '위에 올라타 있다'는 감각이에요.",
    "items": [
      {
        "key": "pr:on-disk",
        "en": "on disk",
        "ko": "디스크에 (저장된)",
        "example": "The queue persists every message on disk before acking.",
        "situations": [
          "영속성 보장을 설명할 때",
          "메모리 vs 디스크 트레이드오프를 말할 때"
        ],
        "detail": "데이터가 디스크라는 표면 위에 얹혀 있는 그림이에요. in memory와 한 쌍의 대조 — 메모리는 빠르고 휘발, 디스크는 느리고 영속이죠. 'persist to disk', 'flush to disk'처럼 동사와 묶인 변형도 같이 입에 붙여두면 좋아요.",
        "exampleKo": "그 큐는 ack 하기 전에 모든 메시지를 디스크에 저장해요.",
        "questionEn": "If the process crashes, which data survives the restart and why?",
        "termsKo": "durability: 장애 후에도 데이터가 남는 성질. 보통 디스크 기록(fsync)으로 보장.",
        "cueKo": "큐는 · 저장한다 · 모든 메시지를 · 디스크에 · ack 하기 전에"
      },
      {
        "key": "pr:on-the-fly",
        "en": "on the fly",
        "ko": "즉석에서, 실시간으로",
        "example": "We generate the thumbnails on the fly instead of precomputing them.",
        "situations": [
          "사전 계산 vs 실시간 생성 트레이드오프를 말할 때",
          "동적 변환/리사이징을 설명할 때"
        ],
        "detail": "날아가는(fly) 도중에 처리한다는 그림 — 멈추지 않고 진행 중에 만들어낸다는 거죠. precompute(미리 계산)와 대조해서 쓰는 게 정석이에요. on demand와 비슷하지만 on the fly는 '즉석 가공'의 뉘앙스가 더 강해요.",
        "exampleKo": "썸네일은 미리 만들지 않고 요청 시 즉석에서 생성해요.",
        "questionEn": "Do you precompute all the image sizes, or create them when someone asks?",
        "termsKo": "",
        "cueKo": "우리는 · 생성한다 · 썸네일을 · 즉석에서 · 미리 계산해두는 대신"
      },
      {
        "key": "pr:on-demand",
        "en": "on demand",
        "ko": "요청이 있을 때, 주문형으로",
        "example": "We spin up workers on demand instead of keeping them idle.",
        "situations": [
          "오토스케일링/서버리스를 설명할 때",
          "지연 로딩 전략을 말할 때"
        ],
        "detail": "'수요'가 생기는 순간에 맞춰 움직인다는 그림이에요. 서버리스, 오토스케일링, lazy loading 설명의 단골이고 비용 절감 논리와 늘 같이 나오죠. on the fly가 '만드는 방식'이라면 on demand는 '트리거가 수요'라는 데 방점이 있어요.",
        "exampleKo": "워커를 놀려두지 않고 필요할 때마다 띄워요.",
        "questionEn": "Why pay for idle servers all night when traffic only comes during the day?",
        "termsKo": "",
        "cueKo": "우리는 · 띄운다 · 워커들을 · 필요할 때마다 · 놀려두는 대신"
      },
      {
        "key": "pr:on-call",
        "en": "on call",
        "ko": "온콜(장애 대응 당번) 중인",
        "example": "I was on call last week, and it was a rough one.",
        "situations": [
          "운영 경험을 어필할 때",
          "장애 대응 프로세스를 설명할 때"
        ],
        "detail": "'호출 가능' 상태 위에 올라타 있는 그림 — 알림이 오면 바로 받아야 하는 당번이죠. 시니어 면접에서 운영 성숙도를 보여주는 단어라 'on-call rotation', 'I got paged'와 세트로 쓰면 좋아요.",
        "exampleKo": "지난주에 온콜이었는데 좀 험난했어요.",
        "questionEn": "Who fixes it when the system breaks at 3 a.m., and have you done that?",
        "termsKo": "on-call rotation: 팀원들이 돌아가며 장애 알림을 1차 대응하는 당번 체계.",
        "cueKo": "나는 · 온콜이었다 · 지난주에 · 그리고 그건 · 험난한 한 주였다"
      },
      {
        "key": "pr:on-the-wire",
        "en": "on the wire",
        "ko": "회선상에서, 전송되는 그대로",
        "example": "The payload is compressed on the wire, so bandwidth isn't the issue.",
        "situations": [
          "직렬화 포맷/전송 크기를 논할 때",
          "패킷 레벨 디버깅을 말할 때"
        ],
        "detail": "바이트가 물리 회선 '위에' 실려 있는 그림이에요. 직렬화 포맷, 압축, TLS처럼 '실제 전송되는 바이트' 관점에서 말할 때 나와요. 'what does it look like on the wire?'는 와이어샤크로 까보면 어떤 모양이냐는 뜻이죠.",
        "exampleKo": "페이로드는 전송 구간에서 압축되니까 대역폭이 문제는 아니에요.",
        "questionEn": "Protobuf versus JSON — what's the actual difference in the bytes being sent?",
        "termsKo": "wire format: 네트워크로 전송될 때의 실제 바이트 표현. 직렬화 포맷이 결정.",
        "cueKo": "페이로드는 · 압축된다 · 전송 구간에서 · 그래서 · 대역폭은 · 문제가 아니다"
      },
      {
        "key": "pr:on-top-of",
        "en": "on top of",
        "ko": "~ 위에 얹어서; ~을 놓치지 않고 챙기는",
        "example": "We built a thin caching layer on top of S3.",
        "situations": [
          "기존 시스템 위에 쌓은 구조를 설명할 때",
          "이슈를 잘 추적하고 있다고 말할 때"
        ],
        "detail": "레이어가 레이어 위에 물리적으로 얹히는 그림 그대로예요. 아키텍처 설명에서 'built on top of X'는 X를 기반으로 했다는 뜻이죠. 'stay on top of things'(상황을 놓치지 않고 챙기다)라는 전혀 다른 관용 뜻도 회화 최빈출이니 같이 외워두세요.",
        "exampleKo": "S3 위에 얇은 캐싱 레이어를 하나 얹었어요.",
        "questionEn": "Did you write your own storage engine, or build on something that already existed?",
        "termsKo": "",
        "cueKo": "우리는 · 만들었다 · 얇은 캐싱 레이어를 · S3 위에"
      },
      {
        "key": "pr:on-my-end",
        "en": "on my end",
        "ko": "제 쪽에서는",
        "example": "Everything looks good on my end — can you check yours?",
        "situations": [
          "원격 디버깅에서 책임 구간을 나눌 때",
          "화상회의 문제를 확인할 때"
        ],
        "detail": "통신 선의 양 끝(end) 중 내 쪽 끝 위에서 보는 그림이에요. 원격 협업·페어 디버깅에서 '내 환경에서는'을 말하는 표준 표현이죠. on your end, on their end로 바꿔가며 책임 구간을 깔끔하게 나눌 수 있어요.",
        "exampleKo": "제 쪽에선 다 정상이에요 — 그쪽에서 한번 확인해 주실래요?",
        "questionEn": "The API works when you test it, but your teammate says it's failing. What do you say?",
        "termsKo": "",
        "cueKo": "모든 게 · 좋아 보인다 · 내 쪽에서는 · 확인해줄래 · 네 쪽을?"
      }
    ]
  },
  {
    "particle": "per",
    "coreKo": "per는 '하나당'으로 잘게 쪼개는 그림이에요. 전체 수치를 요청 하나, 유저 하나, 노드 하나 단위로 나눠서 말하죠. 비율·한도·격리 단위를 말할 때 per가 깔려요 — requests per second부터 per-user limit까지 전부요.",
    "items": [
      {
        "key": "pr:per-request",
        "en": "per request",
        "ko": "요청당, 요청 하나마다",
        "example": "We open a new connection per request, which is killing us.",
        "situations": [
          "요청 단위 비용/오버헤드를 짚을 때",
          "커넥션 풀링 필요성을 설명할 때"
        ],
        "detail": "전체 비용을 요청 하나 단위로 쪼개 보는 그림이에요. 'per-request overhead', 'cost per request'처럼 성능·비용 분석의 기본 단위죠. requests per second(RPS)처럼 거꾸로 '초당 요청'으로도 쓰여요.",
        "exampleKo": "요청마다 커넥션을 새로 여는데, 그게 우릴 죽이고 있어요.",
        "questionEn": "Opening a fresh database connection every single time a call comes in — what's wrong there?",
        "termsKo": "connection pooling: 커넥션을 미리 만들어 재사용해 요청당 연결 비용을 없애는 기법.",
        "cueKo": "우리는 · 연다 · 새 커넥션을 · 요청마다 · 그게 · 죽이고 있다 · 우리를"
      },
      {
        "key": "pr:per-user",
        "en": "per user",
        "ko": "유저당, 사용자별로",
        "example": "Rate limits are enforced per user, not per IP.",
        "situations": [
          "레이트 리밋 기준을 설명할 때",
          "과금/쿼터 단위를 정할 때"
        ],
        "detail": "한도나 수치를 사용자 한 명 단위로 쪼개는 그림이에요. 레이트 리밋, 쿼터, 과금(price per user/seat) 설계에서 '무슨 단위로 끊을 거냐'를 말할 때 핵심이죠. per IP, per tenant, per API key와 나란히 비교하며 쓰면 좋아요.",
        "exampleKo": "레이트 리밋은 IP가 아니라 유저 단위로 걸어요.",
        "questionEn": "If one customer hammers the API, how do you stop them without blocking everyone else?",
        "termsKo": "rate limiting: 단위 시간당 허용 요청 수 제한. 키(유저/IP/토큰) 선택이 설계 포인트.",
        "cueKo": "요청 제한은 · 적용된다 · 유저별로 · IP별이 아니라"
      },
      {
        "key": "pr:per-node",
        "en": "per node",
        "ko": "노드당",
        "example": "We store about two terabytes per node.",
        "situations": [
          "클러스터 용량 산정을 설명할 때",
          "리소스 한계를 노드 단위로 말할 때"
        ],
        "detail": "클러스터 전체 용량을 노드 하나 기준으로 쪼개는 그림이에요. 시스템 디자인 면접의 백오브엔벨롭 계산에서 'X per node, so we need N nodes' 패턴이 단골이죠. per instance, per pod도 같은 식이에요.",
        "exampleKo": "노드 하나가 2테라바이트 정도 감당해요.",
        "questionEn": "You need to store 100 terabytes and one machine holds two. Walk me through the math.",
        "termsKo": "",
        "cueKo": "우리는 · 저장한다 · 약 2테라바이트를 · 노드당"
      },
      {
        "key": "pr:per-deploy",
        "en": "per deploy",
        "ko": "배포당, 배포 한 번마다",
        "example": "We run the full e2e suite per deploy, so releases take twenty minutes.",
        "situations": [
          "배포 파이프라인 비용을 말할 때",
          "릴리스 빈도와 오버헤드를 논할 때"
        ],
        "detail": "반복되는 작업을 배포 한 번 단위로 묶어 세는 그림이에요. CI/CD 파이프라인 비용이나 마이그레이션 정책(one migration per deploy) 얘기에서 나오죠. per release, per merge도 같은 패턴이에요.",
        "exampleKo": "배포마다 전체 e2e를 돌려서 릴리스에 20분 걸려요.",
        "questionEn": "How long does each release take, and what eats most of that time?",
        "termsKo": "",
        "cueKo": "우리는 · 돌린다 · 전체 e2e 스위트를 · 배포마다 · 그래서 · 릴리스가 · 걸린다 · 20분"
      }
    ]
  },
  {
    "particle": "behind",
    "coreKo": "behind는 무언가의 '뒤에 가려져 있는' 그림이에요. 클라이언트 눈에는 앞단(로드밸런서, 프록시, 플래그)만 보이고 진짜 서버는 그 뒤에 숨어 있죠. 앞단이 방패나 관문 역할을 한다는 뉘앙스가 모든 구에 깔려 있고, behind schedule만 '기준선 뒤에 처짐'의 그림이에요.",
    "items": [
      {
        "key": "pr:behind-a-load-balancer",
        "en": "behind a load balancer",
        "ko": "로드밸런서 뒤에 (둔)",
        "example": "The API servers sit behind a load balancer, so we scale horizontally.",
        "situations": [
          "수평 확장 구조를 설명할 때",
          "단일 장애점 제거를 말할 때"
        ],
        "detail": "클라이언트는 LB만 보고, 실제 서버들은 그 뒤에 가려져 있는 그림이에요. 시스템 디자인 면접에서 'put the servers behind a load balancer'는 거의 의무 문장 수준이죠. 'sit behind'라는 동사 조합이 특히 입말스러워요.",
        "exampleKo": "API 서버들은 로드밸런서 뒤에 있어서 수평 확장이 돼요.",
        "questionEn": "How do clients reach your service when there are twenty identical servers running?",
        "termsKo": "load balancer: 요청을 여러 서버로 분산하는 앞단 장비/서비스. 서버 증설을 클라이언트에게 숨김.",
        "cueKo": "API 서버들은 · 앉아 있다 · 로드 밸런서 뒤에 · 그래서 · 우리는 · 확장한다 · 수평으로"
      },
      {
        "key": "pr:behind-a-feature-flag",
        "en": "behind a feature flag",
        "ko": "피처 플래그 뒤에 (숨긴)",
        "example": "We shipped the new checkout behind a feature flag.",
        "situations": [
          "점진적 롤아웃 전략을 설명할 때",
          "미완성 기능을 머지하는 이유를 말할 때"
        ],
        "detail": "코드는 운영에 나가 있지만 플래그라는 가림막 뒤에 있어 유저에겐 안 보이는 그림이에요. trunk-based 개발, 점진 롤아웃, 킬 스위치 얘기의 핵심 표현이죠. 'flip the flag'(플래그 켜기)와 세트로 쓰면 자연스러워요.",
        "exampleKo": "새 결제 플로우는 피처 플래그 뒤에 숨겨서 배포했어요.",
        "questionEn": "How do you merge unfinished work to main without users ever seeing it?",
        "termsKo": "feature flag: 코드 배포와 기능 공개를 분리하는 런타임 스위치. 일부 유저에게만 켤 수 있음.",
        "cueKo": "우리는 · 내보냈다 · 새 체크아웃을 · 피처 플래그 뒤에"
      },
      {
        "key": "pr:behind-a-proxy",
        "en": "behind a proxy",
        "ko": "프록시 뒤에 (있는)",
        "example": "The service sits behind a proxy, so client IPs come from X-Forwarded-For.",
        "situations": [
          "실제 클라이언트 IP가 안 보이는 문제를 설명할 때",
          "TLS 종료 지점을 말할 때"
        ],
        "detail": "프록시가 앞을 막아서고 서버는 뒤에 숨은 그림이에요. 그래서 서버가 보는 source IP는 프록시 것이고 진짜 IP는 헤더로 받는 부작용이 단골 화제죠. behind nginx, behind Cloudflare처럼 구체적인 이름으로도 그대로 써요.",
        "exampleKo": "서비스가 프록시 뒤에 있어서 클라이언트 IP는 X-Forwarded-For로 받아요.",
        "questionEn": "Your access logs show the same internal IP for every request. What's probably going on?",
        "termsKo": "reverse proxy: 서버 앞에서 요청을 받아 전달하는 중계 계층(nginx 등). TLS 종료·캐싱 담당.",
        "cueKo": "그 서비스는 · 앉아 있다 · 프록시 뒤에 · 그래서 · 클라이언트 IP들은 · 온다 · X-Forwarded-For에서"
      },
      {
        "key": "pr:behind-the-scenes",
        "en": "behind the scenes",
        "ko": "보이지 않는 곳에서, 뒤에서",
        "example": "Behind the scenes, the ORM batches those into one query.",
        "situations": [
          "프레임워크가 몰래 해주는 일을 설명할 때",
          "비동기 백그라운드 작업을 말할 때"
        ],
        "detail": "무대 뒤(공연 용어)에서 벌어지는 일이라는 그림이에요. under the hood와 거의 동의어인데, behind the scenes는 '진행되는 과정·활동'에, under the hood는 '내부 구조·구현'에 살짝 더 기울죠. 둘 다 내부 동작 설명할 때 쓰면 좋아요.",
        "exampleKo": "보이지 않는 데서 ORM이 그걸 쿼리 하나로 묶어줘요.",
        "questionEn": "When a user clicks upload and instantly sees success, what work is still happening invisibly?",
        "termsKo": "",
        "cueKo": "보이지 않는 곳에서 · ORM이 · 묶는다 · 그것들을 · 하나의 쿼리로"
      },
      {
        "key": "pr:behind-schedule",
        "en": "behind schedule",
        "ko": "일정보다 늦은",
        "example": "We're two weeks behind schedule because of the migration.",
        "situations": [
          "프로젝트 지연을 보고할 때",
          "일정 조정을 요청할 때"
        ],
        "detail": "일정이라는 기준선 뒤에 처져 있는 그림이에요. 지연 보고의 표준 표현이고, ahead of schedule(일정보다 빠른), on schedule(일정대로)과 세트죠. 행동 면접에서 지연 경험을 얘기할 때 그대로 써먹어요.",
        "exampleKo": "마이그레이션 때문에 일정이 2주 밀렸어요.",
        "questionEn": "The launch was planned for last Friday and it's still not done. How do you report that?",
        "termsKo": "",
        "cueKo": "우리는 · 2주 · 일정보다 뒤처져 있다 · 마이그레이션 때문에"
      }
    ]
  },
  {
    "particle": "across",
    "coreKo": "across는 여러 개를 가로질러 넓게 펼치는 그림이에요. 리전들을, 서비스들을, 재시작들을 '죽 가로지르며' 걸쳐 있다는 거죠. 분산·일관성·전파를 말할 때 across가 나오면 '하나가 아니라 여러 개에 걸쳐서'라는 신호예요.",
    "items": [
      {
        "key": "pr:across-regions",
        "en": "across regions",
        "ko": "여러 리전에 걸쳐",
        "example": "We replicate the data across regions for disaster recovery.",
        "situations": [
          "멀티 리전 아키텍처를 설명할 때",
          "DR/가용성 전략을 말할 때"
        ],
        "detail": "데이터가 지리적으로 떨어진 리전들을 가로질러 펼쳐져 있는 그림이에요. 멀티 리전 복제, 페일오버, 지연 시간 얘기의 기본 표현이죠. across AZs(가용 영역), across data centers도 같은 패턴이에요.",
        "exampleKo": "재해 복구를 위해 데이터를 여러 리전에 복제해요.",
        "questionEn": "What happens to your users if the entire us-east-1 data center goes down?",
        "termsKo": "multi-region replication: 데이터를 지리적으로 분산 복제해 리전 장애에도 서비스를 유지하는 전략.",
        "cueKo": "우리는 · 복제한다 · 데이터를 · 리전들에 걸쳐 · 재해 복구를 위해"
      },
      {
        "key": "pr:across-services",
        "en": "across services",
        "ko": "여러 서비스에 걸쳐",
        "example": "Tracing a single request across services used to be a nightmare.",
        "situations": [
          "분산 트레이싱 필요성을 설명할 때",
          "마이크로서비스 간 일관성 문제를 말할 때"
        ],
        "detail": "하나의 요청·트랜잭션·관심사가 서비스 경계를 줄줄이 가로지르는 그림이에요. 분산 트레이싱, 사가 패턴, 공통 라이브러리 표준화처럼 '서비스 하나로 안 끝나는' 문제 전반에 나와요.",
        "exampleKo": "예전엔 요청 하나를 여러 서비스에 걸쳐 추적하는 게 악몽이었어요.",
        "questionEn": "A request touches five microservices and one is slow. How do you find out which one?",
        "termsKo": "distributed tracing: 요청에 trace ID를 붙여 여러 서비스 구간별 소요 시간을 추적하는 기법.",
        "cueKo": "추적하는 것은 · 단일 요청을 · 서비스들에 걸쳐 · 예전엔 악몽이었다"
      },
      {
        "key": "pr:across-the-board",
        "en": "across the board",
        "ko": "전반적으로, 예외 없이 전부",
        "example": "After the index change, latency dropped across the board.",
        "situations": [
          "개선 효과가 전체에 미쳤다고 말할 때",
          "전사적 정책 적용을 말할 때"
        ],
        "detail": "전광판(board)의 전 항목을 가로지른다는 경마 용어에서 온 표현으로, '예외 없이 전부'라는 그림이에요. 성능 개선이나 정책 적용이 특정 엔드포인트가 아니라 전체에 먹혔다고 말할 때 딱이죠.",
        "exampleKo": "인덱스 바꾸고 나서 지연 시간이 전반적으로 다 떨어졌어요.",
        "questionEn": "Did that optimization help just one endpoint, or every single one?",
        "termsKo": "",
        "cueKo": "인덱스 변경 후 · 지연 시간이 · 떨어졌다 · 전반에 걸쳐"
      },
      {
        "key": "pr:across-restarts",
        "en": "across restarts",
        "ko": "재시작을 거쳐도 (유지되는)",
        "example": "The cache doesn't survive across restarts, so cold starts hurt.",
        "situations": [
          "영속성 요구사항을 설명할 때",
          "상태 유지 vs 무상태 설계를 논할 때"
        ],
        "detail": "데이터가 재시작이라는 사건들을 가로질러 살아남는 그림이에요. 'persist/survive across restarts' 조합으로 거의 굳어져 있고, 영속성과 상태 관리 논의의 핵심 표현이죠. across deploys, across sessions도 같은 패턴이에요.",
        "exampleKo": "캐시가 재시작하면 날아가서 콜드 스타트가 아파요.",
        "questionEn": "If you bounce the process, which state comes back and which is gone?",
        "termsKo": "cold start: 캐시·커넥션이 빈 상태로 시작해 초기 성능이 떨어지는 구간.",
        "cueKo": "캐시는 · 살아남지 못한다 · 재시작을 넘어서 · 그래서 · 콜드 스타트가 · 아프다"
      }
    ]
  },
  {
    "particle": "between",
    "coreKo": "between은 두 지점 사이의 공간을 보는 그림이에요. 서비스와 서비스 사이, 재시도와 재시도 사이, 캐시와 DB 사이 — 그 '사이 구간'에서 일어나는 일(지연, 불일치, 대기)을 말할 때 between이 깔려요.",
    "items": [
      {
        "key": "pr:between-services",
        "en": "between services",
        "ko": "서비스 사이에(서)",
        "example": "All traffic between services goes through mTLS.",
        "situations": [
          "서비스 간 통신 방식을 설명할 때",
          "내부 네트워크 보안을 말할 때"
        ],
        "detail": "두 서비스 사이의 통신 구간을 보는 그림이에요. 서비스 메시, 내부 인증, 네트워크 정책처럼 '사이 구간'에서 벌어지는 일을 말할 때 기본이죠. across services가 '여러 개에 걸쳐 펼쳐짐'이라면 between은 '둘 사이 구간'에 초점이 있어요.",
        "exampleKo": "서비스 간 트래픽은 전부 mTLS를 거쳐요.",
        "questionEn": "How do your internal microservices authenticate each other's calls?",
        "termsKo": "mTLS: 클라이언트와 서버가 서로 인증서를 검증하는 양방향 TLS. 서비스 메시에서 표준.",
        "cueKo": "모든 트래픽은 · 서비스들 사이의 · 거쳐 간다 · mTLS를"
      },
      {
        "key": "pr:between-retries",
        "en": "between retries",
        "ko": "재시도 사이에",
        "example": "We back off exponentially between retries to avoid hammering the API.",
        "situations": [
          "재시도 정책을 설명할 때",
          "백오프 전략을 정당화할 때"
        ],
        "detail": "재시도와 재시도 사이의 '대기 구간'을 보는 그림이에요. exponential backoff 설명에서 'wait between retries'가 핵심 문장이고, 지터(jitter)를 더하는 얘기까지 이어지죠. 재시도 정책은 면접 단골이라 이 표현은 꼭 입에 붙여두세요.",
        "exampleKo": "API를 두들기지 않으려고 재시도 사이 간격을 지수적으로 늘려요.",
        "questionEn": "The downstream API is failing. Why not just try again immediately in a tight loop?",
        "termsKo": "exponential backoff: 재시도 간격을 1s→2s→4s처럼 늘려 장애 중인 서버의 부하를 줄이는 전략.",
        "cueKo": "우리는 · 물러난다 · 지수적으로 · 재시도 사이마다 · API를 두들기지 않으려고"
      },
      {
        "key": "pr:between-the-cache-and-the-db",
        "en": "between the cache and the DB",
        "ko": "캐시와 DB 사이에(서)",
        "example": "We got a mismatch between the cache and the DB after that write.",
        "situations": [
          "캐시 일관성 버그를 설명할 때",
          "쓰기 경로 설계를 논할 때"
        ],
        "detail": "캐시와 DB라는 두 저장소 사이의 간극을 보는 그림이에요. 불일치(mismatch/inconsistency), 동기화, 쓰기 순서 문제가 전부 이 '사이'에서 터지죠. 캐시 무효화 면접 질문에서 이 표현으로 문제를 정의하면 깔끔해요.",
        "exampleKo": "그 쓰기 이후에 캐시와 DB 사이에 불일치가 생겼어요.",
        "questionEn": "A user updates their profile but still sees the old name. Where do you look first?",
        "termsKo": "cache invalidation: 원본 변경 시 캐시를 갱신/삭제해 불일치를 막는 작업. 유명한 난제.",
        "cueKo": "우리는 · 얻었다 · 불일치를 · 캐시와 DB 사이에 · 그 쓰기 이후에"
      }
    ]
  },
  {
    "particle": "within",
    "coreKo": "within은 경계선 안쪽에 머무는 그림이에요. in이 단순히 '안'이라면 within은 '한계선을 넘지 않는다'는 뉘앙스가 강하죠. 트랜잭션 경계 안에서, SLA 한도 안에서, 예산 안에서 — 정해진 울타리를 지킨다는 감각이 모든 구에 깔려요.",
    "items": [
      {
        "key": "pr:within-the-transaction",
        "en": "within the transaction",
        "ko": "트랜잭션 (경계) 안에서",
        "example": "Both writes happen within the transaction, so they commit or roll back together.",
        "situations": [
          "원자성 보장을 설명할 때",
          "트랜잭션 경계 설계를 논할 때"
        ],
        "detail": "트랜잭션이라는 울타리 안에 연산들이 들어가 있는 그림이에요. 경계 안 = 원자성 보장, 경계 밖 = 보장 없음이라는 대비가 핵심이죠. 'outside the transaction'과 짝지어 외부 API 호출을 트랜잭션에 넣지 말라는 얘기로 자주 이어져요.",
        "exampleKo": "두 쓰기 모두 트랜잭션 안에서 일어나서 같이 커밋되거나 같이 롤백돼요.",
        "questionEn": "Money leaves one account but never lands in the other. What guarantee was missing?",
        "termsKo": "atomicity: 트랜잭션 내 연산이 전부 성공하거나 전부 취소되는 성질(ACID의 A).",
        "cueKo": "두 쓰기 모두 · 일어난다 · 트랜잭션 안에서 · 그래서 · 그것들은 · 커밋되거나 롤백된다 · 함께"
      },
      {
        "key": "pr:within-the-sla",
        "en": "within the SLA",
        "ko": "SLA 기준 안에서",
        "example": "Even at peak, p99 stays within the SLA.",
        "situations": [
          "성능 목표 달성을 보고할 때",
          "장애 대응 시간 기준을 말할 때"
        ],
        "detail": "응답 시간이나 가용성이 SLA라는 한계선 안쪽에 머무는 그림이에요. 'within the SLA / out of SLA' 대비로 쓰고, p99 같은 퍼센타일 수치와 묶이면 시니어 티가 나죠. SLO와의 차이를 묻는 면접관도 있으니 개념도 챙기세요.",
        "exampleKo": "피크 때도 p99가 SLA 기준 안에 들어와요.",
        "questionEn": "How do you prove to a customer that your latency promises are actually being met?",
        "termsKo": "SLA: 고객과 계약으로 약속한 서비스 수준(가용성·지연 등). SLO는 내부 목표.",
        "cueKo": "피크 때조차 · p99는 · 머문다 · SLA 안에"
      },
      {
        "key": "pr:within-budget",
        "en": "within budget",
        "ko": "예산 안에서",
        "example": "We kept the whole migration within budget, barely.",
        "situations": [
          "프로젝트 비용 관리 경험을 말할 때",
          "클라우드 비용 한도를 논할 때"
        ],
        "detail": "지출이 예산이라는 울타리 안에 머무는 그림이에요. 돈 얘기뿐 아니라 'error budget'(허용 장애 예산), 'latency budget'(지연 예산)처럼 엔지니어링 개념으로 확장돼 SRE 면접에 자주 나와요. within scope, within limits도 같은 패턴이죠.",
        "exampleKo": "마이그레이션 전체를 간신히 예산 안에서 끝냈어요.",
        "questionEn": "Cloud costs were exploding mid-project. How did you finish the project without overspending?",
        "termsKo": "error budget: SLO가 허용하는 장애 한도. 남은 예산만큼 위험한 변경을 감행할 수 있다는 SRE 개념.",
        "cueKo": "우리는 · 유지했다 · 전체 마이그레이션을 · 예산 안에서 · 간신히"
      }
    ]
  },
  {
    "particle": "by",
    "coreKo": "by는 '~을 수단이나 기준으로 해서'의 그림이에요. 설계라는 의도에 의해(by design), 기본값이라는 규칙에 의해(by default), 손이라는 수단으로(by hand) 그렇게 된다는 거죠. off by one은 '~만큼의 차이'라는 by의 또 다른 얼굴이고, side by side의 by는 'by the river'처럼 '바로 옆에'를 뜻하는 위치의 by예요.",
    "items": [
      {
        "key": "pr:by-design",
        "en": "by design",
        "ko": "의도된 것인, 설계상 일부러",
        "example": "The API is rate-limited aggressively — that's by design.",
        "situations": [
          "버그가 아니라 의도임을 설명할 때",
          "설계 철학을 변호할 때"
        ],
        "detail": "그 동작이 '설계'라는 의도에 의해 나온 결과라는 그림이에요. 'is this a bug?'에 'no, that's by design'으로 받아치는 게 전형적인 용법이죠. secure by design처럼 설계 철학 표현으로도 확장돼요.",
        "exampleKo": "API 레이트 리밋이 빡센 건 의도된 거예요.",
        "questionEn": "Users complain they can only upload ten files at once. Is that a bug?",
        "termsKo": "",
        "cueKo": "그 API는 · 요청 제한이 걸려 있다 · 공격적으로 · 그건 · 의도된 거다"
      },
      {
        "key": "pr:by-default",
        "en": "by default",
        "ko": "기본값으로, 따로 안 건드리면",
        "example": "Connections are encrypted by default; you'd have to opt out.",
        "situations": [
          "기본 설정 동작을 설명할 때",
          "안전한 기본값 설계를 주장할 때"
        ],
        "detail": "아무것도 안 했을 때 '기본 규칙에 의해' 정해지는 동작이라는 그림이에요. 설정·보안 논의의 최빈출 표현이고 'secure by default', 'opt in/opt out'과 세트로 다니죠. 라이브러리 동작을 설명할 때 입에서 바로 나와야 해요.",
        "exampleKo": "연결은 기본으로 암호화돼요. 끄려면 일부러 꺼야 하죠.",
        "questionEn": "If a developer installs your library and changes nothing, what behavior do they get?",
        "termsKo": "secure by default: 기본 설정이 가장 안전한 쪽이 되도록 하는 설계 원칙.",
        "cueKo": "커넥션들은 · 암호화된다 · 기본으로 · 너는 · 일부러 꺼야 할 거다"
      },
      {
        "key": "pr:by-hand",
        "en": "by hand",
        "ko": "수동으로, 손으로 직접",
        "example": "We were applying those migrations by hand, which obviously didn't scale.",
        "situations": [
          "자동화 이전의 고통을 묘사할 때",
          "자동화 도입을 정당화할 때"
        ],
        "detail": "'손'이라는 수단으로 한다는 그림 그대로예요. manually와 같은 뜻인데 by hand가 더 입말스럽고, 자동화 도입 스토리에서 before 상태를 묘사할 때 딱이죠. 'error-prone'(실수하기 쉬운)과 거의 세트로 나와요.",
        "exampleKo": "그 마이그레이션을 손으로 직접 돌리고 있었는데, 당연히 한계가 왔죠.",
        "questionEn": "Before you built the deploy pipeline, how did releases actually happen?",
        "termsKo": "",
        "cueKo": "우리는 · 적용하고 있었다 · 그 마이그레이션들을 · 손으로 · 그건 · 당연히 · 확장이 안 됐다"
      },
      {
        "key": "pr:off-by-one",
        "en": "off by one",
        "ko": "1 차이로 어긋난 (오프바이원)",
        "example": "The pagination was off by one, so the last item never showed.",
        "situations": [
          "경계 조건 버그를 설명할 때",
          "코드 리뷰에서 인덱스 실수를 짚을 때"
        ],
        "detail": "정답에서 '1만큼(by one) 벗어나(off)' 있는 그림이에요. <= vs <, 0-기반 vs 1-기반 인덱스에서 나오는 그 유명한 버그 부류죠. 'off-by-one error'는 거의 고유명사라 경계 조건 얘기할 때 이 단어를 쓰면 바로 통해요.",
        "exampleKo": "페이지네이션이 1 어긋나서 마지막 항목이 안 보였어요.",
        "questionEn": "Your loop processes nine items when there are ten. What kind of bug is that?",
        "termsKo": "off-by-one error: 경계 인덱스를 1 잘못 잡는 버그. 루프 조건과 배열 끝 처리에서 빈발.",
        "cueKo": "페이지네이션이 · 하나씩 어긋나 있었다 · 그래서 · 마지막 아이템이 · 절대 안 보였다"
      },
      {
        "key": "pr:side-by-side",
        "en": "side by side",
        "ko": "나란히, 병행으로",
        "example": "We ran the old and new versions side by side for a week.",
        "situations": [
          "마이그레이션 병행 운영을 설명할 때",
          "두 결과물을 비교 검증할 때"
        ],
        "detail": "두 개가 옆구리(side)를 맞대고 나란히 있는 그림이에요. 마이그레이션에서 신구 시스템을 같이 돌리며 결과를 비교하는 전략을 설명할 때 딱이죠. diff를 나란히 보는 'side-by-side comparison'으로도 자주 써요.",
        "exampleKo": "구버전과 신버전을 일주일간 나란히 돌렸어요.",
        "questionEn": "How do you gain confidence the rewritten service behaves exactly like the old one?",
        "termsKo": "parallel run: 신구 시스템을 동시에 돌려 출력을 비교하는 마이그레이션 검증 기법.",
        "cueKo": "우리는 · 돌렸다 · 구버전과 신버전을 · 나란히 · 일주일 동안"
      }
    ]
  },
  {
    "particle": "out of",
    "coreKo": "out of는 경계 밖으로 빠져나간 그림이에요. 메모리라는 잔고에서(out of memory), 동기화 상태에서(out of sync), 범위라는 울타리에서(out of scope) 벗어났다는 거죠. '있어야 할 안쪽에서 이탈했다'는 감각이 공통이고, out of the box만 '상자에서 막 꺼낸'이라는 별도 그림이에요.",
    "items": [
      {
        "key": "pr:out-of-memory",
        "en": "out of memory",
        "ko": "메모리 부족 (OOM)",
        "example": "The pod got killed because it ran out of memory.",
        "situations": [
          "OOM 장애를 설명할 때",
          "메모리 릭 원인 분석을 말할 때"
        ],
        "detail": "메모리라는 잔고가 바닥나 한도 밖으로 나간 그림이에요. 'run out of memory'(동사구)와 'OOM killed'(쿠버네티스 용어) 두 형태로 입에 붙여두세요. 메모리 릭 → OOM → 파드 재시작 루프는 장애 썰의 단골 전개죠.",
        "exampleKo": "그 파드는 메모리가 바닥나서 죽었어요.",
        "questionEn": "Kubernetes keeps restarting your pod every few hours with exit code 137. Why?",
        "termsKo": "OOM killer: 메모리가 한계에 닿으면 커널/k8s가 프로세스를 강제 종료하는 메커니즘. exit 137이 그 신호.",
        "cueKo": "파드가 · 죽임당했다 · 그게 메모리를 다 써버렸기 때문에"
      },
      {
        "key": "pr:out-of-sync",
        "en": "out of sync",
        "ko": "동기화가 깨진, 어긋난",
        "example": "The replica fell behind and got out of sync with the primary.",
        "situations": [
          "복제 지연/데이터 불일치를 설명할 때",
          "두 환경의 설정이 어긋났을 때"
        ],
        "detail": "in sync라는 상태 안에서 밖으로 이탈한 그림이에요. 복제 지연, 캐시 불일치, 환경 간 설정 드리프트까지 '맞아야 할 두 개가 어긋났다'면 다 쓸 수 있죠. 'get/fall/drift out of sync' 같은 동사 조합으로 외워두면 좋아요.",
        "exampleKo": "레플리카가 뒤처지면서 프라이머리와 동기화가 깨졌어요.",
        "questionEn": "Two copies of the same data are showing different values. How do you describe that?",
        "termsKo": "",
        "cueKo": "레플리카가 · 뒤처졌다 · 그리고 동기화가 깨졌다 · 프라이머리와"
      },
      {
        "key": "pr:out-of-scope",
        "en": "out of scope",
        "ko": "범위 밖인",
        "example": "Mobile support is out of scope for this quarter.",
        "situations": [
          "면접에서 설계 범위를 잘라낼 때",
          "스코프 크립을 막을 때"
        ],
        "detail": "scope라는 울타리 밖에 있다는 그림이에요. 시스템 디자인 면접에서 'let's call that out of scope'로 범위를 명시적으로 잘라내는 건 고급 스킬로 쳐주죠. 프로젝트 관리에선 scope creep을 막는 방패 문장이고, 반대는 in scope예요.",
        "exampleKo": "모바일 지원은 이번 분기 범위 밖이에요.",
        "questionEn": "The interviewer keeps adding requirements and time is running out. How do you push back politely?",
        "termsKo": "scope creep: 합의된 범위 밖의 요구가 슬금슬금 늘어나는 현상.",
        "cueKo": "모바일 지원은 · 범위 밖이다 · 이번 분기에는"
      },
      {
        "key": "pr:out-of-the-box",
        "en": "out of the box",
        "ko": "설치 직후 그대로, 별도 설정 없이",
        "example": "Spring Boot gives you health checks out of the box.",
        "situations": [
          "프레임워크 기본 제공 기능을 설명할 때",
          "도구 선택 이유를 말할 때"
        ],
        "detail": "상자에서 막 꺼낸 그대로 동작한다는 그림 — 이탈이 아니라 '개봉 즉시'의 out이에요. 프레임워크나 라이브러리가 추가 설정 없이 주는 기능을 말할 때 최빈출이죠. 'works out of the box'가 통째로 한 덩어리고, think outside the box(발상 전환)와 헷갈리면 안 돼요.",
        "exampleKo": "Spring Boot는 헬스 체크를 기본 제공해요.",
        "questionEn": "Why pick Spring Boot over wiring all those libraries together yourself?",
        "termsKo": "",
        "cueKo": "스프링 부트는 · 준다 · 너에게 · 헬스 체크를 · 별도 설정 없이 바로"
      },
      {
        "key": "pr:out-of-band",
        "en": "out of band",
        "ko": "별도 채널로, 본 흐름 밖에서",
        "example": "We send alerts out of band, separate from the main pipeline.",
        "situations": [
          "주 처리 경로와 분리된 통신을 설명할 때",
          "장애 시 우회 채널을 말할 때"
        ],
        "detail": "주파수 대역(band) 밖의 별도 채널이라는 통신 용어에서 온 그림이에요. 요청 경로 밖에서 따로 처리되는 일 — 비동기 알림, 별도 관리 채널 — 을 말할 때 써요. 살짝 전문 용어 느낌이라 시니어 어휘로 좋아요.",
        "exampleKo": "알림은 본 파이프라인과 분리해서 별도 채널로 보내요.",
        "questionEn": "If the main pipeline itself is down, how does the alert about it still reach you?",
        "termsKo": "out-of-band: 주 데이터 경로와 분리된 별도 채널. 관리 트래픽이나 알림에 흔히 적용.",
        "cueKo": "우리는 · 보낸다 · 알림을 · 별도 채널로 · 메인 파이프라인과 분리해서"
      },
      {
        "key": "pr:out-of-the-loop",
        "en": "out of the loop",
        "ko": "정보 공유에서 빠진",
        "example": "I was out of the loop on that schema change.",
        "situations": [
          "공유 누락으로 생긴 문제를 말할 때",
          "커뮤니케이션 프로세스 개선을 제안할 때"
        ],
        "detail": "정보가 도는 루프(고리) 밖에 있었다는 그림이에요. 협업 사고담의 단골 — 공유 누락으로 장애가 났다는 이야기에 꼭 나오죠. 반대로 'keep me in the loop'(계속 공유해줘)는 회의 마무리 멘트로 최빈출이에요.",
        "exampleKo": "그 스키마 변경은 저한테 공유가 안 됐었어요.",
        "questionEn": "A teammate changed the database schema and nobody told you. How do you describe that?",
        "termsKo": "",
        "cueKo": "나는 · 소식을 못 듣고 있었다 · 그 스키마 변경에 대해"
      }
    ]
  },
  {
    "particle": "over/against",
    "coreKo": "over는 무언가의 '위를 타고 넘어가는' 그림이에요 — 데이터가 회선 위로, HTTP라는 프로토콜 위로 실려 가죠. against는 무언가에 '맞대고 부딪히는' 그림이고요 — 쿼리를 DB에 들이대고, 스크립트를 운영 환경에 맞대고, 시간과 맞붙어요.",
    "items": [
      {
        "key": "pr:over-the-wire",
        "en": "over the wire",
        "ko": "네트워크를 타고 (전송되는)",
        "example": "We send the deltas over the wire instead of the full payload.",
        "situations": [
          "전송 데이터 크기 최적화를 말할 때",
          "네트워크 직렬화를 설명할 때"
        ],
        "detail": "데이터가 회선 위를 타고 건너가는 그림이에요. on the wire가 '회선 위에 있는 상태·모양'이라면 over the wire는 '회선을 타고 이동'에 초점이 있죠. 'send/go over the wire' 동사 조합으로 외우면 입에서 잘 나와요.",
        "exampleKo": "전체 페이로드 대신 변경분만 네트워크로 보내요.",
        "questionEn": "The payload is huge but only a few fields change each time. How do you cut traffic?",
        "termsKo": "",
        "cueKo": "우리는 · 보낸다 · 델타들을 · 회선 너머로 · 전체 페이로드 대신"
      },
      {
        "key": "pr:over-http",
        "en": "over HTTP",
        "ko": "HTTP(프로토콜)로",
        "example": "The services talk over HTTP for now; we might move to gRPC.",
        "situations": [
          "서비스 간 통신 프로토콜을 설명할 때",
          "프로토콜 선택 트레이드오프를 말할 때"
        ],
        "detail": "HTTP라는 프로토콜 위에 데이터를 실어 나르는 그림이에요. over gRPC, over WebSocket, over TLS 전부 같은 패턴 — '무슨 프로토콜을 타고 가냐'는 over로 말하죠. 'talk over HTTP'처럼 talk와 묶이면 특히 구어체다워요.",
        "exampleKo": "서비스들은 일단 HTTP로 통신하고, gRPC로 갈 수도 있어요.",
        "questionEn": "When service A needs data from service B, how do they actually communicate?",
        "termsKo": "gRPC: HTTP/2 기반 바이너리 RPC 프레임워크. JSON/HTTP 대비 빠르고 스키마가 강제됨.",
        "cueKo": "그 서비스들은 · 대화한다 · HTTP로 · 지금은 · 우리는 · 옮길지도 모른다 · gRPC로"
      },
      {
        "key": "pr:against-the-database",
        "en": "against the database",
        "ko": "DB를 상대로, DB에 대고",
        "example": "That report runs heavy queries against the database every hour.",
        "situations": [
          "DB 부하 원인을 짚을 때",
          "쿼리 실행 대상을 명시할 때"
        ],
        "detail": "쿼리를 DB에 '들이대는' 그림이에요. run/execute a query against X가 굳은 조합이고, 분석 쿼리는 운영 DB 말고 레플리카에 대고 돌리라는 얘기로 자주 이어지죠. validate against a schema처럼 '기준에 맞대 검증'하는 용법도 같은 against예요.",
        "exampleKo": "그 리포트가 매시간 DB에 무거운 쿼리를 날려요.",
        "questionEn": "Where do those expensive analytics queries actually run — and is that a problem?",
        "termsKo": "read replica: 읽기 전용 복제본. 무거운 조회를 분리해 운영 DB를 보호.",
        "cueKo": "그 리포트는 · 돌린다 · 무거운 쿼리들을 · 데이터베이스를 향해 · 매시간"
      },
      {
        "key": "pr:against-prod",
        "en": "against prod",
        "ko": "운영 환경을 상대로",
        "example": "Never run that script against prod without a dry run first.",
        "situations": [
          "운영 환경 작업의 위험을 경고할 때",
          "테스트 대상 환경을 명시할 때"
        ],
        "detail": "스크립트나 테스트를 운영 환경에 '맞대는' 그림이에요. test against staging, run against prod처럼 '어느 환경을 상대로 실행하냐'를 말하는 표준형이죠. 운영을 상대로 한 작업의 위험성 경고와 거의 세트로 나와요.",
        "exampleKo": "드라이런 없이 그 스크립트를 운영에 대고 돌리지 마세요.",
        "questionEn": "A teammate wants to test their cleanup script directly on the live environment. What do you say?",
        "termsKo": "dry run: 실제 변경 없이 무엇이 바뀔지만 출력해 보는 예행 실행.",
        "cueKo": "절대 돌리지 마라 · 그 스크립트를 · 프로드에 대고 · 드라이 런 없이는 · 먼저"
      },
      {
        "key": "pr:race-against",
        "en": "race against",
        "ko": "~와 경쟁하다, 시간과 싸우다",
        "example": "Two writers race against each other, and the last one wins.",
        "situations": [
          "레이스 컨디션을 설명할 때",
          "마감과의 싸움을 묘사할 때"
        ],
        "detail": "둘이 맞붙어 달리기 시합을 하는 그림이에요. race condition(경쟁 조건)의 그 race고, 'race against each other'와 'race against the clock(시간과의 싸움)' 두 용법 다 흔하죠. 동시성 버그 설명할 때 'they race'라고 동사로만 던져도 통해요.",
        "exampleKo": "쓰기 두 개가 서로 경쟁해서 마지막 놈이 이겨요.",
        "questionEn": "Two requests update the same record at the same moment. What's the danger called?",
        "termsKo": "race condition: 실행 순서/타이밍에 따라 결과가 달라지는 동시성 버그.",
        "cueKo": "두 쓰기 주체가 · 경쟁한다 · 서로를 상대로 · 그리고 · 마지막 놈이 · 이긴다"
      }
    ]
  }
];
export const PREP_COUNTS = { groups: 12, phrases: 63 };

export interface ArgumentGroup { fn: string; labelKo: string; items: PhraseCard[]; }

export const ARGUMENT_GROUPS: ArgumentGroup[] = [
  {
    "fn": "claim",
    "labelKo": "주장",
    "items": [
      {
        "key": "ag:i-d-argue-that",
        "en": "I'd argue that ...",
        "ko": "내 주장은 ~이다 / ~라고 본다",
        "example": "I'd argue that the cache layer is the real bottleneck here.",
        "situations": [
          "설계 리뷰에서 입장 밝힐 때",
          "원인 분석 의견 낼 때",
          "면접에서 기술 선택 주장할 때"
        ],
        "detail": "토론에 자기 입장을 공식적으로 올려놓는 무브야. 'I think'보다 한 단계 단단해서, 근거를 바로 이어 붙일 준비가 됐다는 신호로 들려. 다만 뒤에 이유가 안 따라오면 허세처럼 들리니까 반드시 근거 한 문장을 붙여.",
        "exampleKo": "진짜 병목은 캐시 레이어라고 봐요.",
        "questionEn": "Our API is slow. Where do you think the real problem is?",
        "termsKo": "bottleneck(병목): 시스템 전체 속도를 제한하는 가장 느린 구간.",
        "cueKo": ""
      },
      {
        "key": "ag:the-way-i-see-it",
        "en": "The way I see it, ...",
        "ko": "내가 보기에는",
        "example": "The way I see it, we're solving the wrong problem.",
        "situations": [
          "논의 방향을 재정의할 때",
          "회의에서 내 관점 제시할 때"
        ],
        "detail": "'이건 어디까지나 내 관점'이라고 액자를 씌우면서 주장을 여는 무브야. 사실 단정이 아니라 해석을 내놓는 거라 반박 여지를 열어둬서 덜 공격적으로 들려. 문제 정의 자체가 틀렸다는 식으로 프레임을 바꾸고 싶을 때 특히 효과적이야.",
        "exampleKo": "제가 보기엔 우리가 엉뚱한 문제를 풀고 있어요.",
        "questionEn": "We've spent two sprints optimizing this query. What's your read on the situation?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:my-take-is",
        "en": "My take is ...",
        "ko": "내 의견/입장은 ~다",
        "example": "My take is we should ship the monolith first and split later.",
        "situations": [
          "여러 의견 중 내 입장 요약할 때",
          "회의 말미에 입장 정리할 때"
        ],
        "detail": "여러 의견이 오간 뒤 자기 입장을 한 줄로 요약해 내놓는 무브야. 캐주얼하고 자연스러워서 회의에서 제일 많이 쓰이는 주장 표현 중 하나야. 'hot take'라고 하면 일부러 도발적인 의견이라는 뉘앙스가 되니 구분해서 써.",
        "exampleKo": "제 의견은 일단 모놀리스로 출시하고 나중에 쪼개자는 거예요.",
        "questionEn": "Everyone's split on monolith versus microservices for the new product. Where do you stand?",
        "termsKo": "monolith: 한 덩어리 배포 단위의 아키텍처. 초기 속도가 빠른 대신 나중에 분리 비용이 든다.",
        "cueKo": ""
      },
      {
        "key": "ag:if-it-were-up-to-me",
        "en": "If it were up to me, ...",
        "ko": "내가 결정할 수 있다면",
        "example": "If it were up to me, we'd drop the GraphQL layer entirely.",
        "situations": [
          "결정권이 없지만 강한 의견 낼 때",
          "면접에서 기존 설계 비판할 때"
        ],
        "detail": "결정권이 나한테 없다는 걸 인정하면서도 강한 의견을 내는 무브야. '현실은 다르게 갈 수 있다'는 양보가 깔려 있어서 센 주장을 해도 무례하게 안 들려. 면접에서 전 직장 설계를 비판할 때 책임 소재를 깔끔하게 처리해 줘.",
        "exampleKo": "제가 결정권자라면 GraphQL 레이어를 통째로 들어낼 거예요.",
        "questionEn": "You've complained about that legacy layer before. What would you actually do about it?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-d-go-as-far-as-to-say",
        "en": "I'd go as far as to say ...",
        "ko": "심지어 ~라고까지 말하겠다",
        "example": "I'd go as far as to say this service shouldn't exist.",
        "situations": [
          "주장 강도를 한 단계 올릴 때",
          "근본적인 문제 제기할 때"
        ],
        "detail": "이미 한 주장에서 강도를 한 칸 더 올리는 에스컬레이션 무브야. '극단적으로 들릴 걸 알지만 그래도 말한다'는 자각이 담겨 있어서 청자에게 마음의 준비를 시켜줘. 남발하면 매번 오버하는 사람으로 보이니까 정말 강조하고 싶은 한 방에만 써.",
        "exampleKo": "심하게 말하면 이 서비스는 존재할 이유가 없다고까지 말하겠어요.",
        "questionEn": "You keep saying this internal service causes problems. How serious is it really?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:here-s-where-i-stand",
        "en": "Here's where I stand.",
        "ko": "내 입장은 이렇다",
        "example": "Here's where I stand: Postgres until it actually breaks.",
        "situations": [
          "긴 논쟁 끝에 입장 못박을 때",
          "결정 회의에서 한 줄 입장 낼 때"
        ],
        "detail": "빙빙 도는 논의를 끊고 자기 입장을 명시적으로 못박는 무브야. 뒤에 콜론 찍고 한 문장으로 떨어지는 구조라 임팩트가 커. 너무 일찍 쓰면 논의를 닫아버리는 느낌을 주니까, 어느 정도 논의가 돈 뒤에 쓰는 게 좋아.",
        "exampleKo": "제 입장은 이래요. 실제로 한계가 올 때까지는 Postgres로 갑니다.",
        "questionEn": "We've debated the database choice for an hour. Can you just give us your final position?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-d-say",
        "en": "I'd say ...",
        "ko": "(내 생각엔) ~인 것 같다",
        "example": "I'd say the retry logic belongs in the client, not the gateway.",
        "situations": [
          "가볍게 의견 낼 때",
          "즉답형 질문에 입장 줄 때"
        ],
        "detail": "가장 가볍고 빠른 주장 무브야. 'I think'와 거의 같지만 조금 더 '판단을 내리는' 뉘앙스가 있어서 기술 의견에 잘 어울려. 가벼운 만큼 큰 결정을 주장할 때는 'I'd argue'나 'Here's where I stand'로 강도를 올려.",
        "exampleKo": "재시도 로직은 게이트웨이가 아니라 클라이언트에 있어야 한다고 봐요.",
        "questionEn": "Quick question — should retries live in the gateway or in each client?",
        "termsKo": "retry logic: 실패한 요청을 다시 보내는 로직. 위치에 따라 중복 요청과 부하 양상이 달라진다.",
        "cueKo": ""
      },
      {
        "key": "ag:hear-me-out",
        "en": "Hear me out.",
        "ko": "일단 들어봐 (반대 예상되는 제안 전 운 띄우기)",
        "example": "Hear me out — what if we just delete the feature flag system?",
        "situations": [
          "반대가 뻔한 제안 꺼낼 때",
          "급진적인 아이디어 던질 때"
        ],
        "detail": "반대가 뻔히 예상되는 주장을 꺼내기 전에 '끝까지 들어달라'고 공간을 확보하는 무브야. 청자의 즉각 반박을 한 박자 늦춰줘서 급진적 제안이 살아남을 확률을 높여줘. 캐주얼한 표현이라 격식 있는 자리보단 팀 내부 토론용이야.",
        "exampleKo": "일단 들어보세요. 피처 플래그 시스템을 그냥 없애버리면 어때요?",
        "questionEn": "We're brainstorming ways to cut deployment complexity. Any wild ideas?",
        "termsKo": "feature flag: 코드 배포와 기능 공개를 분리하는 토글. 쌓이면 관리 부채가 된다.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "support",
    "labelKo": "근거",
    "items": [
      {
        "key": "ag:the-reason-is",
        "en": "The reason is ...",
        "ko": "이유는 ~이다",
        "example": "The reason is every retry doubles the load on the database.",
        "situations": [
          "주장 직후 근거 붙일 때",
          "왜냐는 질문에 답할 때"
        ],
        "detail": "주장과 근거를 잇는 가장 기본 커넥터야. 주장 무브 바로 뒤에 붙여서 '주장→이유' 한 호흡을 만드는 게 핵심이야. 'because'로 문장을 길게 끄는 것보다, 문장을 끊고 'The reason is'로 새로 시작하면 짧은 문장 체인이 살아.",
        "exampleKo": "이유는 재시도가 한 번 일어날 때마다 DB 부하가 두 배가 되기 때문이에요.",
        "questionEn": "You said we should turn off automatic retries. Why?",
        "termsKo": "retry storm: 장애 시 재시도가 몰려 부하를 증폭시키는 현상.",
        "cueKo": ""
      },
      {
        "key": "ag:we-ve-seen-this-before-when",
        "en": "We've seen this before when ...",
        "ko": "전에 ~했을 때 이미 겪어봤다",
        "example": "We've seen this before when the batch job took down prod last quarter.",
        "situations": [
          "과거 장애 경험을 근거로 들 때",
          "같은 실수 반복 막을 때"
        ],
        "detail": "조직의 과거 경험을 증거로 소환하는 무브야. 이론적 근거보다 '우리가 직접 겪었다'는 게 설득력이 훨씬 세. 다만 상황이 정말 비슷한지 먼저 따져봐야 해 — 닮은 점이 표면적이면 바로 'that was different'로 반격당해.",
        "exampleKo": "지난 분기에 배치 잡이 프로드를 죽였을 때 이미 겪어본 일이에요.",
        "questionEn": "Why are you so against running this migration during business hours?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:the-numbers-back-this-up",
        "en": "The numbers back this up.",
        "ko": "수치가 이걸 뒷받침한다",
        "example": "The numbers back this up — p99 dropped forty percent after the change.",
        "situations": [
          "데이터로 주장 보강할 때",
          "감이 아니라 측정값임을 강조할 때"
        ],
        "detail": "내 주장이 감이 아니라 측정값에 기반한다고 못박는 무브야. 이 말을 꺼낸 이상 구체적 숫자를 바로 이어서 말해야 해 — 숫자 없이 쓰면 오히려 신뢰가 깎여. 'the data shows'와 거의 같고, 엔지니어 토론에서 가장 강한 카드 중 하나야.",
        "exampleKo": "수치가 증명해요. 변경 후에 p99가 40% 떨어졌어요.",
        "questionEn": "That caching change felt risky. Are you sure it actually helped?",
        "termsKo": "p99: 요청의 99%가 이 값 이내에 응답한다는 지연시간 지표. 꼬리 지연 논의의 표준 단위.",
        "cueKo": ""
      },
      {
        "key": "ag:case-in-point",
        "en": "Case in point: ...",
        "ko": "딱 그 사례가 ~다",
        "example": "Case in point: the checkout service, which died under the same pattern.",
        "situations": [
          "방금 한 주장에 구체 사례 붙일 때",
          "일반론을 실제 사례로 증명할 때"
        ],
        "detail": "일반적인 주장을 한 다음 구체적 사례 하나를 콕 집어 증거로 내미는 무브야. 'for example'보다 '내 말이 맞다는 결정적 사례'라는 뉘앙스가 강해. 사례가 정말 논점에 맞아야 하고, 어긋나면 역으로 약점이 돼.",
        "exampleKo": "딱 그 사례가 체크아웃 서비스예요. 같은 패턴으로 죽었잖아요.",
        "questionEn": "You claim shared databases between services always bite us eventually. Got any proof?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:that-s-based-on",
        "en": "That's based on ...",
        "ko": "그건 ~에 근거한 거다",
        "example": "That's based on what we saw in last week's load test.",
        "situations": [
          "내 추정의 출처 밝힐 때",
          "근거 출처 질문에 답할 때"
        ],
        "detail": "내 주장이나 추정의 출처를 투명하게 공개하는 무브야. 출처를 먼저 까면 상대가 '그건 어디서 나온 얘기냐'로 공격할 틈이 사라져. 출처가 약하면(짐작, 오래된 데이터) hedge 무브랑 같이 써서 강도를 맞춰.",
        "exampleKo": "그건 지난주 부하 테스트에서 본 결과에 근거한 거예요.",
        "questionEn": "You estimated we can handle five thousand RPS. Where does that figure come from?",
        "termsKo": "load test: 예상 트래픽을 인위적으로 걸어 한계를 측정하는 테스트.",
        "cueKo": ""
      },
      {
        "key": "ag:if-you-look-at",
        "en": "If you look at ...",
        "ko": "~를 보면 (증거 직접 가리키기)",
        "example": "If you look at the traces, the time goes to serialization.",
        "situations": [
          "로그/메트릭/코드 가리키며 설명할 때",
          "화면 공유하며 근거 짚을 때"
        ],
        "detail": "청자의 시선을 증거물(로그, 트레이스, 코드)로 직접 끌고 가는 무브야. '내 말을 믿어라'가 아니라 '직접 봐라'라서 가장 반박하기 어려운 근거 제시 방식이야. 화면 공유나 코드 리뷰 코멘트에서 특히 자연스러워.",
        "exampleKo": "트레이스를 보면 시간이 직렬화에서 다 빠져나가요.",
        "questionEn": "The endpoint is slow but the database queries look fine. What's eating the time?",
        "termsKo": "trace: 요청 하나가 거친 구간별 소요 시간 기록. serialization: 객체를 전송 가능한 형태로 변환하는 비용.",
        "cueKo": ""
      },
      {
        "key": "ag:here-s-the-thing",
        "en": "Here's the thing.",
        "ko": "핵심은 이거다",
        "example": "Here's the thing — that index never gets used in production queries.",
        "situations": [
          "결정적 근거 꺼내기 직전",
          "상대가 놓친 사실 짚을 때"
        ],
        "detail": "결정적인 사실을 꺼내기 직전에 주의를 모으는 무브야. '지금부터 나오는 게 핵심 근거'라는 신호라서 청자가 집중하게 돼. 너무 자주 쓰면 매번 핵심이라던 게 핵심이 아니게 되니, 한 토론에 한두 번이 적당해.",
        "exampleKo": "핵심은 이거예요. 그 인덱스는 프로덕션 쿼리에서 한 번도 안 쓰여요.",
        "questionEn": "Why do you want to drop that index? We added it for performance.",
        "termsKo": "index: 조회를 빠르게 하는 자료구조. 안 쓰이면 쓰기 비용만 내는 부채가 된다.",
        "cueKo": ""
      },
      {
        "key": "ag:last-time-we-tried-that",
        "en": "Last time we tried that, ...",
        "ko": "지난번에 그거 해봤을 때 ~했다",
        "example": "Last time we tried that, the migration took three weekends.",
        "situations": [
          "반복 제안에 과거 결과로 답할 때",
          "비용을 경험으로 증언할 때"
        ],
        "detail": "제안된 방안을 실제로 해봤던 경험을 근거로 내미는 무브야. '이론상 되는 것'과 '우리 팀에서 실제로 벌어진 일'의 간극을 보여줄 때 최강이야. 단, '그때와 지금은 조건이 다르다'는 반론이 가능하니 뭐가 같은지 한 줄 보태면 더 단단해.",
        "exampleKo": "지난번에 그거 시도했을 때 마이그레이션에 주말 세 번이 갈렸어요.",
        "questionEn": "Why not just do a big-bang schema migration over one weekend?",
        "termsKo": "",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "concede-counter",
    "labelKo": "양보+반박",
    "items": [
      {
        "key": "ag:that-s-true-to-a-point-but",
        "en": "That's true to a point, but ...",
        "ko": "어느 정도는 맞는데, 하지만",
        "example": "That's true to a point, but it falls apart at scale.",
        "situations": [
          "부분 동의 후 한계 짚을 때",
          "상대 주장의 적용 범위 좁힐 때"
        ],
        "detail": "상대 주장을 '범위 한정'으로 받아주고 그 경계 밖을 공격하는 무브야. 전면 부정이 아니라 적용 범위를 좁히는 거라 상대가 방어적으로 변하지 않아. 'to a point'가 핵심이고, 어디까지 맞는지 이어서 구체화해 주면 설득력이 배가돼.",
        "exampleKo": "어느 정도는 맞는 말인데, 스케일이 커지면 무너져요.",
        "questionEn": "Keeping everything in one process is simpler, so why ever split services?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:fair-point-though",
        "en": "Fair point, though ...",
        "ko": "좋은 지적이야, 다만",
        "example": "Fair point, though it doesn't cover the offline case.",
        "situations": [
          "코드 리뷰 코멘트에 답할 때",
          "지적 인정하면서 빠진 부분 짚을 때"
        ],
        "detail": "상대 지적의 가치를 인정한 뒤 빠진 케이스를 보태는 가장 부드러운 양보+반박이야. 코드 리뷰에서 리뷰어 체면 세워주면서 내 설계를 방어할 때 딱이야. 'fair point' 뒤에 아무것도 안 붙이면 그냥 동의가 되니, though 뒤가 진짜 본론이야.",
        "exampleKo": "좋은 지적이에요. 다만 오프라인 케이스는 커버가 안 돼요.",
        "questionEn": "Your error handler retries on failure, so we don't need a local queue, right?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-see-it-differently",
        "en": "I see it differently.",
        "ko": "나는 다르게 본다",
        "example": "I see it differently — the duplication is the cheaper problem.",
        "situations": [
          "정중하게 반대 입장 선언할 때",
          "해석 차이 드러낼 때"
        ],
        "detail": "'네가 틀렸다'가 아니라 '나는 관점이 다르다'로 반대를 선언하는 무브야. 사실 다툼이 아니라 해석과 가중치 차이로 프레임을 옮겨서 감정 소모 없이 반대할 수 있어. 이 말만 하고 끝내면 안 되고, 어떻게 다르게 보는지 바로 이어야 해.",
        "exampleKo": "저는 다르게 봐요. 중복이 오히려 더 싼 문제예요.",
        "questionEn": "This duplicated logic is clearly tech debt we need to eliminate now, agreed?",
        "termsKo": "DRY vs 중복 허용: 잘못된 추상화 비용이 중복 비용보다 클 수 있다는 트레이드오프 논점.",
        "cueKo": ""
      },
      {
        "key": "ag:i-d-push-back-on-that",
        "en": "I'd push back on that.",
        "ko": "그 부분은 반박하고 싶다",
        "example": "I'd push back on that — microservices won't fix a data model problem.",
        "situations": [
          "회의에서 명시적으로 반박할 때",
          "면접관 가정에 이견 낼 때"
        ],
        "detail": "반박을 공식 선언하는 무브로, 미국 테크 회의에서 표준처럼 쓰는 표현이야. would 가정법 덕분에 직설적이면서도 무례하지 않은 절묘한 강도야. 'you're wrong'류보다 훨씬 프로페셔널하고, 면접에서 면접관 가정에 이견 낼 때도 안전해.",
        "exampleKo": "그건 반박하고 싶어요. 마이크로서비스로는 데이터 모델 문제가 안 풀려요.",
        "questionEn": "Our latency issues will disappear once we move to microservices, don't you think?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:even-if-that-were-true",
        "en": "Even if that were true, ...",
        "ko": "설령 그게 맞다 해도",
        "example": "Even if that were true, we still can't afford the rewrite.",
        "situations": [
          "전제 다툼 건너뛰고 결론 반박할 때",
          "상대 말이 다 맞아도 내 결론이 유지될 때"
        ],
        "detail": "상대 전제를 다투지 않고 '그게 맞다고 쳐도 결론은 안 바뀐다'로 우회하는 무브야. 전제 공방으로 시간 끌지 않고 바로 결론 층위에서 싸울 수 있어서 효율적이야. 가정법(were)이라 '사실 동의는 안 한다'는 뉘앙스가 깔려 있는 게 포인트야.",
        "exampleKo": "설령 그게 맞다 해도 리라이트할 여력은 없어요.",
        "questionEn": "The new framework is twice as fast in benchmarks, so we should migrate, right?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-get-that-but",
        "en": "I get that, but ...",
        "ko": "그건 이해해, 그런데",
        "example": "I get that, but consistency matters more than latency here.",
        "situations": [
          "상대 우려 인정하고 우선순위 뒤집을 때",
          "캐주얼한 토론에서 빠르게 반박할 때"
        ],
        "detail": "상대의 동기나 우려를 '이해한다'고 받아준 뒤 우선순위를 뒤집는 무브야. 'fair point'보다 캐주얼하고 빠른 템포라 실시간 토론에 잘 맞아. 연발하면 형식적으로 들리니까 뭘 이해했는지 가끔은 구체적으로 되짚어 줘.",
        "exampleKo": "그건 이해해요. 그런데 여기선 일관성이 지연시간보다 중요해요.",
        "questionEn": "Users complain about slow responses, so shouldn't we just cache aggressively everywhere?",
        "termsKo": "consistency vs latency: 캐시·복제 설계의 근본 트레이드오프. CAP 논의의 일상 버전.",
        "cueKo": ""
      },
      {
        "key": "ag:sure-but-the-flip-side-is",
        "en": "Sure, but the flip side is ...",
        "ko": "맞아, 근데 그 이면에는",
        "example": "Sure, but the flip side is every deploy now needs coordination.",
        "situations": [
          "장점 인정 후 숨은 비용 꺼낼 때",
          "트레이드오프의 반대편 보여줄 때"
        ],
        "detail": "상대가 말한 장점을 인정하고 그 동전의 뒷면(숨은 비용)을 꺼내는 무브야. '장점이 없다'가 아니라 '공짜가 아니다'라는 논리라 반박 중에서도 건설적으로 들려. judgment 무브(트레이드오프 평가)로 자연스럽게 이어가기 좋아.",
        "exampleKo": "맞아요. 근데 그 대가로 이제 모든 배포에 조율이 필요해져요.",
        "questionEn": "Sharing one release train across teams gives us consistency. Sounds like a pure win, no?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:that-s-not-quite-how-i-read-it",
        "en": "That's not quite how I read it.",
        "ko": "내 해석은 좀 다르다",
        "example": "That's not quite how I read it — the spike came before the deploy.",
        "situations": [
          "같은 데이터의 해석이 다를 때",
          "포스트모템에서 인과 다툴 때"
        ],
        "detail": "같은 데이터를 두고 해석이 다르다고 정중하게 교정하는 무브야. 'not quite'가 강도를 줄여줘서 상대 분석을 무시하지 않으면서 사실관계를 바로잡을 수 있어. 포스트모템처럼 인과를 다투는 자리에서 비난 없이 쓰기 좋아.",
        "exampleKo": "제 해석은 좀 달라요. 스파이크는 배포 전에 이미 있었어요.",
        "questionEn": "The metrics clearly show the outage started right after your deploy, don't they?",
        "termsKo": "correlation vs causation: 시간적 선후가 곧 인과는 아니라는 포스트모템 단골 논점.",
        "cueKo": ""
      },
      {
        "key": "ag:granted-but",
        "en": "Granted, ..., but ...",
        "ko": "그건 인정해, 하지만",
        "example": "Granted, Kafka gives us replay, but nobody here can operate it.",
        "situations": [
          "상대의 최강 논거를 선제 인정할 때",
          "기술 장점 인정 후 운영 현실로 반박할 때"
        ],
        "detail": "상대의 가장 강한 논거를 먼저 인정해버리고 다른 축에서 반박하는 무브야. 어차피 부정 못 할 장점은 선제 인정하는 게 내 신뢰도를 올려줘. 'granted'는 약간 격식이 있어서 회의나 면접에서 쓰면 논리 정연해 보이는 효과가 있어.",
        "exampleKo": "Kafka가 리플레이를 주는 건 인정해요. 근데 여기서 그걸 운영할 사람이 없어요.",
        "questionEn": "Kafka would let us replay events after failures. Isn't that exactly what we need?",
        "termsKo": "event replay: 이벤트 로그를 다시 재생해 상태를 복구하는 패턴. 운영 복잡도가 그 비용.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "hedge",
    "labelKo": "강도 조절",
    "items": [
      {
        "key": "ag:i-d-lean-toward",
        "en": "I'd lean toward ...",
        "ko": "~쪽으로 기운다",
        "example": "I'd lean toward Postgres over Dynamo for this workload.",
        "situations": [
          "확정 아닌 선호 밝힐 때",
          "정보가 부족한 상태에서 방향 제시할 때"
        ],
        "detail": "결정이 아니라 '현재 기울기'를 밝히는 무브야. 정보가 더 들어오면 바뀔 수 있다는 여지를 남겨서, 틀려도 체면이 깎이지 않아. 면접 설계 문제에서 단정 대신 이걸 쓰면 열린 사고로 좋게 평가받는 경우가 많아.",
        "exampleKo": "이 워크로드엔 Dynamo보다 Postgres 쪽으로 기울어요.",
        "questionEn": "Relational or NoSQL for this new service — what's your pick?",
        "termsKo": "workload 특성(읽기/쓰기 비율, 접근 패턴)이 DB 선택의 일차 기준이라는 관용 논점.",
        "cueKo": ""
      },
      {
        "key": "ag:i-could-be-wrong-but",
        "en": "I could be wrong, but ...",
        "ko": "틀릴 수도 있는데",
        "example": "I could be wrong, but I think the leak is in the connection pool.",
        "situations": [
          "검증 전 가설 공유할 때",
          "남의 코드 문제를 조심스럽게 지적할 때"
        ],
        "detail": "검증 안 된 가설을 안전하게 내놓는 무브야. 틀려도 '미리 말했잖아'가 되고, 맞으면 그대로 점수가 돼서 디버깅 토론에서 가성비가 좋아. 매 문장마다 붙이면 자신감 없는 사람으로 보이니, 정말 불확실한 것에만 써.",
        "exampleKo": "틀릴 수도 있는데, 누수는 커넥션 풀 쪽인 것 같아요.",
        "questionEn": "Memory keeps climbing in production and nobody knows why. Any theories?",
        "termsKo": "connection pool: DB 연결을 재사용하는 풀. 반환 누락이 흔한 누수 원인.",
        "cueKo": ""
      },
      {
        "key": "ag:i-m-fairly-confident",
        "en": "I'm fairly confident ...",
        "ko": "꽤 확신한다",
        "example": "I'm fairly confident the regression came from the dependency bump.",
        "situations": [
          "근거 있는 확신 표현할 때",
          "확신도를 명시해서 보고할 때"
        ],
        "detail": "확신도를 '높음, 단 100%는 아님'으로 정확히 캘리브레이션하는 무브야. 'I'm sure'보다 오히려 신뢰가 가는 게, 엔지니어들은 100% 확신을 의심하기 때문이야. 이 말을 했으면 어떻게 확인했는지 근거를 바로 붙이는 게 정석이야.",
        "exampleKo": "그 회귀는 의존성 업그레이드 때문이라고 꽤 확신해요.",
        "questionEn": "Three things changed in that release. Which one broke the tests?",
        "termsKo": "regression: 잘 되던 기능이 변경 후 다시 깨지는 것.",
        "cueKo": ""
      },
      {
        "key": "ag:it-s-probably-safe-to-assume",
        "en": "It's probably safe to assume ...",
        "ko": "~라고 가정해도 무방할 거다",
        "example": "It's probably safe to assume traffic stays under a thousand RPS.",
        "situations": [
          "설계 가정에 합의볼 때",
          "면접에서 요구사항 가정 깔 때"
        ],
        "detail": "설계를 진행하기 위한 작업 가정을 깔되, 가정임을 명시하는 무브야. 시스템 디자인 면접에서 요구사항을 스스로 좁힐 때 거의 필수 표현이야. 'safe'가 들어가서 '틀려도 큰일은 안 난다'는 위험 평가까지 담는 게 포인트야.",
        "exampleKo": "트래픽이 1000 RPS 아래로 유지된다고 가정해도 무방할 거예요.",
        "questionEn": "We don't have real traffic numbers yet. How do we even start sizing this?",
        "termsKo": "RPS(requests per second): 초당 요청 수. 용량 산정의 기본 단위.",
        "cueKo": ""
      },
      {
        "key": "ag:off-the-cuff",
        "en": "Off the cuff, ...",
        "ko": "즉석에서 말하자면 (정밀 계산 아님)",
        "example": "Off the cuff, I'd say sharding buys us maybe a year.",
        "situations": [
          "즉석 추정치를 요구받을 때",
          "대략적인 계산을 말할 때"
        ],
        "detail": "'지금 즉석에서 내는 추정치'라고 라벨을 붙이는 무브야. 숫자를 말하되 나중에 그 숫자에 책임지지 않도록 보호막을 치는 거지. 면접에서 용량 추정을 시킬 때 이걸 깔고 시작하면 대략 말해도 안전해.",
        "exampleKo": "즉석에서 말하면, 샤딩으로 한 1년 정도 버는 것 같아요.",
        "questionEn": "Rough guess — how long before we outgrow a single database instance?",
        "termsKo": "back-of-the-envelope: 자릿수 수준의 즉석 추정. sharding: 데이터를 여러 DB로 수평 분할하는 확장 기법.",
        "cueKo": ""
      },
      {
        "key": "ag:my-gut-says",
        "en": "My gut says ...",
        "ko": "직감으로는",
        "example": "My gut says the bug is in the retry path, not the parser.",
        "situations": [
          "증거 확보 전 직감 공유할 때",
          "디버깅 방향 잡을 때"
        ],
        "detail": "데이터 이전 단계의 직관을 솔직하게 직관이라고 밝히는 무브야. 시니어의 직감은 토론에서 실제로 존중받는 입력값이라 숨길 필요 없어. 단, 직감만으로 결정을 밀어붙이면 안 되고 '그러니 이쪽부터 확인해보자'로 잇는 게 정석이야.",
        "exampleKo": "직감으로는 버그가 파서가 아니라 재시도 경로에 있어요.",
        "questionEn": "We have two suspects for this bug and limited time. Where do we look first?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:if-i-had-to-guess",
        "en": "If I had to guess, ...",
        "ko": "굳이 추측하자면",
        "example": "If I had to guess, the queue is backing up during the nightly batch.",
        "situations": [
          "모른다고만 하기 애매할 때",
          "추측을 요구받았을 때"
        ],
        "detail": "'모른다'와 '안다' 사이의 답을 주는 무브야. 답을 강요받는 상황에서 추측임을 명시하고 최선의 가설을 내놓는 거라, 면접에서 모르는 질문 받았을 때 특히 유용해. 'I don't know' 단독보다 훨씬 좋은 인상을 남겨.",
        "exampleKo": "굳이 추측하자면 야간 배치 동안 큐가 밀리는 것 같아요.",
        "questionEn": "You haven't seen the logs yet, but what do you think is happening?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:take-this-with-a-grain-of-salt-but",
        "en": "Take this with a grain of salt, but ...",
        "ko": "걸러 들어도 되는데",
        "example": "Take this with a grain of salt, but GC pauses might explain the spikes.",
        "situations": [
          "오래되거나 간접적인 정보 공유할 때",
          "내 전문 영역 밖 의견 낼 때"
        ],
        "detail": "정보의 신뢰도가 낮다고 미리 디스카운트해 주는 무브야. 출처가 기억에 의존하거나 내 전문 영역 밖일 때 쓰면 정직해 보여. 'I could be wrong'이 내 추론에 대한 헤지라면, 이건 정보 자체의 품질에 대한 헤지라는 차이가 있어.",
        "exampleKo": "걸러 들으셔도 되는데, 그 스파이크는 GC 멈춤 때문일 수도 있어요.",
        "questionEn": "You used to work on the JVM services. Any idea about these latency spikes?",
        "termsKo": "GC pause: 가비지 컬렉션 중 애플리케이션이 멈추는 시간. 지연 스파이크의 고전적 원인.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "conditional",
    "labelKo": "가정/조건",
    "items": [
      {
        "key": "ag:if-we-assume",
        "en": "If we assume ...",
        "ko": "~라고 가정하면",
        "example": "If we assume reads dominate, a cache solves most of this.",
        "situations": [
          "가정 깔고 설계 논리 전개할 때",
          "면접에서 조건 좁힐 때"
        ],
        "detail": "논증의 출발 가정을 명시적으로 깔아주는 무브야. 가정을 공개하면 결론이 틀렸을 때 '가정이 달랐네'로 깔끔하게 정리되고, 상대도 가정 단계에서 이의를 제기할 수 있어. 시스템 디자인 토론은 사실상 이 무브의 연속이야.",
        "exampleKo": "읽기가 대부분이라고 가정하면 캐시로 거의 해결돼요.",
        "questionEn": "We don't know the read-write ratio yet. How would you approach the design anyway?",
        "termsKo": "read-heavy workload: 읽기 위주 부하. 캐시 효율이 높은 전형적 조건.",
        "cueKo": ""
      },
      {
        "key": "ag:unless",
        "en": "Unless ...",
        "ko": "~하지 않는 한",
        "example": "Unless traffic patterns change, the single instance holds up fine.",
        "situations": [
          "결론에 유효 조건 달 때",
          "내 말이 깨지는 조건 명시할 때"
        ],
        "detail": "내 결론이 깨지는 조건을 스스로 명시하는 무브야. 어떤 경우에 내 말이 틀리는지까지 말해주면 오히려 신뢰도가 올라가. 상대가 그 조건을 들고나오면 '맞아, 그땐 다시 봐야지'로 자연스럽게 받을 수 있어.",
        "exampleKo": "트래픽 패턴이 바뀌지 않는 한 단일 인스턴스로 충분히 버텨요.",
        "questionEn": "Do we really need to provision more servers for next quarter?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:worst-case",
        "en": "Worst case, ...",
        "ko": "최악의 경우에는",
        "example": "Worst case, we lose five minutes of events and replay from Kafka.",
        "situations": [
          "리스크 우려 진정시킬 때",
          "장애 시나리오의 하한선 정의할 때"
        ],
        "detail": "리스크 논의에서 하한선을 못박는 무브야. '최악이라야 이 정도'를 보여주면 막연한 불안이 계산 가능한 리스크로 바뀌어서 결정이 빨라져. 단, 진짜 최악을 과소평가하면 신뢰가 박살나니 정직하게 산정해야 해.",
        "exampleKo": "최악의 경우 이벤트 5분치를 잃고 Kafka에서 리플레이하면 돼요.",
        "questionEn": "What happens to in-flight events if this consumer crashes mid-stream?",
        "termsKo": "replay: 메시지 로그를 다시 소비해 상태를 복구하는 것. RPO: 허용 가능한 데이터 손실량.",
        "cueKo": ""
      },
      {
        "key": "ag:suppose-traffic-doubles",
        "en": "Suppose traffic doubles.",
        "ko": "트래픽이 두 배가 된다고 치자",
        "example": "Suppose traffic doubles — does the queue still drain in time?",
        "situations": [
          "스트레스 시나리오 던질 때",
          "상대 설계의 한계 시험할 때"
        ],
        "detail": "가상의 스트레스 시나리오를 던져서 설계를 시험하는 무브야. 상대 설계의 약점을 직접 지적하는 대신 시나리오로 스스로 발견하게 만들어서 공격적이지 않아. 면접관이 쓰는 단골 무브이기도 하니, 받았을 때 조건문으로 답하는 연습도 같이 해둬.",
        "exampleKo": "트래픽이 두 배가 된다고 치죠. 그래도 큐가 제때 빠지나요?",
        "questionEn": "Here's my queue-based design for the ingestion pipeline. Any concerns?",
        "termsKo": "queue drain rate: 큐 소비 속도. 유입이 소비를 넘으면 backlog가 무한히 쌓인다.",
        "cueKo": ""
      },
      {
        "key": "ag:in-that-scenario",
        "en": "In that scenario, ...",
        "ko": "그 시나리오에서는",
        "example": "In that scenario, the failover kicks in and we serve stale reads.",
        "situations": [
          "what-if 질문에 차분히 답할 때",
          "케이스별로 결과를 갈라 말할 때"
        ],
        "detail": "상대가 던진 가정 시나리오를 받아서 그 안에서의 결과를 전개하는 무브야. what-if 공격에 당황하지 않고 케이스 안으로 들어가 답하는 모양새라 침착해 보여. 케이스가 여러 개면 'in that scenario / otherwise'로 갈라서 답하면 구조가 잡혀.",
        "exampleKo": "그 시나리오에선 페일오버가 동작하고 잠시 오래된 데이터를 읽게 돼요.",
        "questionEn": "What if the primary database goes down during peak hours?",
        "termsKo": "failover: 장애 시 예비 시스템으로 자동 전환. stale read: 복제 지연으로 낡은 데이터를 읽는 것.",
        "cueKo": ""
      },
      {
        "key": "ag:say-we-go-with",
        "en": "Say we go with ...",
        "ko": "~로 간다고 치면",
        "example": "Say we go with eventual consistency — what breaks in the UI?",
        "situations": [
          "옵션 하나를 가정해 시뮬레이션할 때",
          "결정 전에 결과를 미리 굴려볼 때"
        ],
        "detail": "옵션 하나를 임시로 채택해보고 결과를 시뮬레이션하는 무브야. 실제 결정 전에 머릿속 드라이런을 돌리는 거라 토론을 구체적으로 만들어줘. 'suppose'보다 더 캐주얼한 구어체고, 옵션 비교 회의에서 옵션별로 한 번씩 돌리면 좋아.",
        "exampleKo": "최종 일관성으로 간다고 치죠. UI에서 뭐가 깨지나요?",
        "questionEn": "We're stuck choosing between strong and eventual consistency. How do we move this discussion forward?",
        "termsKo": "eventual consistency: 잠시 불일치를 허용하고 결국 수렴하는 일관성 모델.",
        "cueKo": ""
      },
      {
        "key": "ag:as-long-as",
        "en": "As long as ...",
        "ko": "~하기만 하면 / ~가 유지되는 한",
        "example": "As long as writes stay idempotent, retries are safe.",
        "situations": [
          "안전 조건 명시할 때",
          "조건부로 승인할 때"
        ],
        "detail": "어떤 방안이 성립하는 전제 조건을 명시하는 무브야. 코드 리뷰에서 '이것만 지켜지면 OK'라는 조건부 승인을 줄 때 특히 유용해. 'unless'가 깨지는 조건을 말한다면 이건 지켜져야 하는 조건을 말하는, 방향이 반대인 쌍둥이야.",
        "exampleKo": "쓰기가 멱등하기만 하면 재시도는 안전해요.",
        "questionEn": "Is it dangerous to let clients retry failed payment requests automatically?",
        "termsKo": "idempotent(멱등): 같은 요청을 여러 번 보내도 결과가 한 번과 동일한 성질. 재시도 안전성의 핵심.",
        "cueKo": ""
      },
      {
        "key": "ag:if-that-s-the-case",
        "en": "If that's the case, ...",
        "ko": "그게 사실이라면",
        "example": "If that's the case, the whole caching argument falls apart.",
        "situations": [
          "새 정보의 함의 짚을 때",
          "상대 전제에서 결론 끌어낼 때"
        ],
        "detail": "방금 나온 정보를 받아 그 논리적 귀결을 즉시 전개하는 무브야. 상대의 전제를 빌려서 결론을 끌어내는 거라, 상대 주장의 모순을 드러낼 때도 쓸 수 있어. 토론 템포를 끊지 않고 새 정보를 논증에 흡수하는 접착제 역할이야.",
        "exampleKo": "그게 사실이라면 캐싱 논거 전체가 무너져요.",
        "questionEn": "Turns out ninety percent of our requests are unique URLs with no repeats.",
        "termsKo": "cache hit rate: 캐시 적중률. 요청 중복이 없으면 캐시 효용이 사라진다.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "judgment",
    "labelKo": "평가/트레이드오프",
    "items": [
      {
        "key": "ag:it-buys-us-x-at-the-cost-of-y",
        "en": "It buys us X at the cost of Y.",
        "ko": "X를 얻는 대신 Y를 치른다",
        "example": "Sharding buys us write throughput at the cost of cross-shard queries.",
        "situations": [
          "트레이드오프 한 줄 요약할 때",
          "설계 결정 정당화할 때"
        ],
        "detail": "트레이드오프를 '얻는 것 / 내주는 것' 한 문장으로 압축하는 시니어 무브야. 면접에서 이 구조로 말하면 트레이드오프 사고가 된다는 인상을 바로 줘. 양쪽을 다 말하는 게 핵심 — 얻는 것만 말하면 영업, 잃는 것만 말하면 불평으로 들려.",
        "exampleKo": "샤딩은 쓰기 처리량을 주는 대신 크로스 샤드 쿼리를 비용으로 받아가요.",
        "questionEn": "Walk me through what sharding actually gets us and what it costs.",
        "termsKo": "cross-shard query: 여러 샤드에 걸친 조회. 샤딩의 대표적 숨은 비용.",
        "cueKo": ""
      },
      {
        "key": "ag:it-s-a-wash",
        "en": "It's a wash.",
        "ko": "어느 쪽이든 비슷하다 (차이 상쇄)",
        "example": "Performance-wise it's a wash, so pick whichever is easier to operate.",
        "situations": [
          "차이 없는 비교 논쟁 정리할 때",
          "결정 기준을 다른 축으로 옮길 때"
        ],
        "detail": "두 옵션의 차이가 상쇄돼서 무의미하다고 판정하는 무브야. 소모적인 비교 논쟁을 끝내고 진짜 변별 기준으로 화제를 옮기는 데 효과적이야. 데이터 없이 선언만 하면 성의 없어 보이니, 왜 상쇄되는지 한 줄은 붙여줘.",
        "exampleKo": "성능은 어느 쪽이든 비슷해요. 그러니 운영 쉬운 쪽으로 골라요.",
        "questionEn": "We've benchmarked both serialization libraries for days. Which one wins?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:not-worth-the-complexity",
        "en": "Not worth the complexity.",
        "ko": "그 복잡도를 감수할 가치가 없다",
        "example": "A custom scheduler is not worth the complexity for three cron jobs.",
        "situations": [
          "오버엔지니어링에 제동 걸 때",
          "기능 추가 반대할 때"
        ],
        "detail": "복잡도를 화폐 삼아 제안을 기각하는 무브야. '나쁜 아이디어'가 아니라 '가격이 안 맞는 아이디어'로 프레임해서 제안자 체면을 지켜줘. 시니어가 오버엔지니어링에 제동 걸 때 쓰는 대표 판정 표현이야.",
        "exampleKo": "크론 잡 세 개 때문에 커스텀 스케줄러를 만드는 건 복잡도 값을 못 해요.",
        "questionEn": "I'm thinking of building a custom job scheduler with priorities and dependencies. Thoughts?",
        "termsKo": "complexity budget: 시스템이 감당 가능한 복잡도 총량이라는 관용 개념.",
        "cueKo": ""
      },
      {
        "key": "ag:the-marginal-gain-is-tiny",
        "en": "The marginal gain is tiny.",
        "ko": "추가로 얻는 이득이 미미하다",
        "example": "Going from Redis to in-memory saves a millisecond — the marginal gain is tiny.",
        "situations": [
          "과잉 최적화 반대할 때",
          "투자 대비 효과 따질 때"
        ],
        "detail": "절대 이득이 아니라 '추가' 이득의 크기로 판정하는 무브야. 이미 충분히 좋은 걸 더 좋게 만들려는 과잉 최적화에 제동 걸 때 정확히 들어맞아. 몇 ms, 몇 %인지 숫자를 같이 말해주면 판정이 아니라 측정처럼 들려서 더 세.",
        "exampleKo": "Redis에서 인메모리로 바꿔봐야 1ms 절약이에요. 한계 이득이 너무 작아요.",
        "questionEn": "If we move the cache in-process we shave another millisecond. Should we?",
        "termsKo": "diminishing returns: 투입 대비 추가 이득이 점점 줄어드는 현상.",
        "cueKo": ""
      },
      {
        "key": "ag:that-s-a-dealbreaker",
        "en": "That's a dealbreaker.",
        "ko": "그건 결정적 결격 사유다",
        "example": "No multi-region support? That's a dealbreaker for us.",
        "situations": [
          "기술/벤더 선정에서 탈락 선언할 때",
          "협상 불가 조건 명시할 때"
        ],
        "detail": "다른 장점이 아무리 많아도 이 결격 하나로 탈락이라고 선언하는 무브야. 비교 매트릭스를 다 따질 필요 없이 단일 기준으로 후보를 쳐낼 때 효율적이야. 강한 판정이니까 정말 협상 불가 조건에만 쓰고, 여지가 있으면 'a serious concern' 정도로 낮춰.",
        "exampleKo": "멀티 리전 지원이 없다고요? 그럼 우리한텐 탈락이에요.",
        "questionEn": "This vendor checks every box except multi-region failover. Still a candidate?",
        "termsKo": "multi-region: 여러 지역에 인프라를 두는 구성. 재해 복구와 지연시간 요건과 직결.",
        "cueKo": ""
      },
      {
        "key": "ag:that-s-a-reasonable-tradeoff",
        "en": "That's a reasonable tradeoff.",
        "ko": "감수할 만한 트레이드오프다",
        "example": "Slightly stale reads for ten times the throughput — that's a reasonable tradeoff.",
        "situations": [
          "제안 승인할 때",
          "비용을 인지하고 수용을 선언할 때"
        ],
        "detail": "비용을 인지한 상태로 수용한다고 판정하는 승인 무브야. 그냥 'OK'보다 '비용을 알고도 선택했다'는 기록이 남아서 나중에 부작용이 나와도 떳떳해. 코드 리뷰 승인이나 설계 사인오프에서 자주 쓰는 표현이야.",
        "exampleKo": "약간 낡은 읽기를 감수하고 처리량 10배면 합리적인 트레이드오프죠.",
        "questionEn": "Read replicas mean users might see data a second old. Can we accept that?",
        "termsKo": "read replica: 읽기 부하 분산용 복제본. replication lag이 stale read의 원인.",
        "cueKo": ""
      },
      {
        "key": "ag:we-d-be-trading-x-for-y",
        "en": "We'd be trading X for Y.",
        "ko": "X를 내주고 Y를 받는 셈이다",
        "example": "We'd be trading deploy speed for runtime safety.",
        "situations": [
          "결정의 본질 드러낼 때",
          "팀이 뭘 포기하는지 환기할 때"
        ],
        "detail": "결정을 교환 구조로 번역해서 팀이 뭘 포기하는지 직시하게 만드는 무브야. 'buys us at the cost of'와 같은 일을 하지만, 이건 아직 결정 전 검토 단계 뉘앙스가 강해. 가치 판단 없이 구조만 보여주는 중립 무브라서 찬반 어느 쪽에서도 쓸 수 있어.",
        "exampleKo": "배포 속도를 내주고 런타임 안전성을 받는 셈이에요.",
        "questionEn": "Adding mandatory canary stages doubles our release time. How should we frame this decision?",
        "termsKo": "canary release: 일부 트래픽에만 새 버전을 먼저 배포해 위험을 줄이는 기법.",
        "cueKo": ""
      },
      {
        "key": "ag:the-juice-isn-t-worth-the-squeeze",
        "en": "The juice isn't worth the squeeze.",
        "ko": "고생 대비 얻는 게 없다",
        "example": "Rewriting it in Rust — the juice isn't worth the squeeze.",
        "situations": [
          "고비용 저효율 제안 기각할 때",
          "캐주얼하게 ROI 판정할 때"
        ],
        "detail": "노력 대비 보상이 안 나온다는 ROI 판정을 관용구로 던지는 무브야. 'not worth the complexity'보다 더 구어적이고 가벼운 톤이라 팀 내부 토론에 잘 맞아. 격식 있는 자리나 문서에는 'the effort outweighs the benefit' 쪽이 안전해.",
        "exampleKo": "그걸 Rust로 다시 짜는 건 고생 대비 얻는 게 없어요.",
        "questionEn": "The parser is slow-ish. Should we rewrite that module in a faster language?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:it-pays-for-itself",
        "en": "It pays for itself.",
        "ko": "그 비용은 곧 회수된다",
        "example": "The migration hurts, but the on-call reduction pays for itself.",
        "situations": [
          "선투자 정당화할 때",
          "리팩토링/인프라 투자 설득할 때"
        ],
        "detail": "초기 비용이 시간이 지나며 회수된다고 판정하는 투자 정당화 무브야. 리팩토링이나 인프라 투자처럼 당장은 손해처럼 보이는 제안을 밀 때 핵심 카드야. 회수 시점(몇 달, 몇 분기)을 같이 말하면 막연한 낙관이 아니라 계산으로 들려.",
        "exampleKo": "마이그레이션은 아프지만, 온콜 줄어드는 걸로 본전을 뽑아요.",
        "questionEn": "This migration costs us a whole sprint with zero new features. How do you justify that?",
        "termsKo": "on-call burden: 장애 대응 당직 부담. 운영 비용을 사람 시간으로 환산하는 단골 논거.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "agree-disagree",
    "labelKo": "동의/반대 정중하게",
    "items": [
      {
        "key": "ag:i-m-on-board-with",
        "en": "I'm on board with ...",
        "ko": "~에는 찬성이다",
        "example": "I'm on board with the queue, just not with building it ourselves.",
        "situations": [
          "부분 찬성 표시할 때",
          "제안 지지 선언할 때"
        ],
        "detail": "찬성을 명확히 선언하는 무브로, '같은 배에 탔다'는 협력 뉘앙스가 있어. 예문처럼 'just not with...'를 붙여 찬성 범위를 정밀하게 그을 수 있는 게 강점이야. 단순 'I agree'보다 적극적으로 들려서 합의 형성 단계에서 힘이 돼.",
        "exampleKo": "큐 도입엔 찬성이에요. 직접 만드는 것만 빼고요.",
        "questionEn": "So the plan is an async queue between the services, built in-house. Everyone good?",
        "termsKo": "build vs buy: 직접 구축과 기성품 도입 사이의 단골 트레이드오프.",
        "cueKo": ""
      },
      {
        "key": "ag:i-m-not-sold-on",
        "en": "I'm not sold on ...",
        "ko": "~는 아직 납득이 안 된다",
        "example": "I'm not sold on GraphQL for an internal admin tool.",
        "situations": [
          "완곡하게 반대할 때",
          "더 설득이 필요하다고 신호줄 때"
        ],
        "detail": "'반대'가 아니라 '아직 설득이 안 됐다'로 표현하는 무브야. 상대에게 더 설득할 기회를 열어주는 모양새라 문을 닫지 않으면서 반대 의사를 전달해. 영업당하는 입장(sold)이라는 은유 덕에 '근거를 더 가져와봐'라는 요청으로도 기능해.",
        "exampleKo": "내부 어드민 툴에 GraphQL은 아직 납득이 안 돼요.",
        "questionEn": "I want to put GraphQL in front of the admin backend. Cool with that?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-m-not-convinced-that",
        "en": "I'm not convinced that ...",
        "ko": "~라는 게 확신이 안 선다",
        "example": "I'm not convinced that splitting the service fixes the latency.",
        "situations": [
          "주장과 결론의 연결 의심할 때",
          "근거 부족 지적할 때"
        ],
        "detail": "상대의 결론이 아니라 '근거→결론' 연결 고리를 의심하는 무브야. 'not sold on'이 제안 전체에 대한 미온적 태도라면, 이건 특정 인과 주장을 콕 집어 의문을 제기해. 뒤에 '무슨 근거가 있나'류 질문을 붙이면 토론이 생산적으로 흘러.",
        "exampleKo": "서비스를 쪼갠다고 지연시간이 잡힌다는 게 확신이 안 서요.",
        "questionEn": "Splitting this service will obviously solve our latency problem, right?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:hard-agree",
        "en": "Hard agree.",
        "ko": "완전 동의",
        "example": "Hard agree — feature flags before any of this ships.",
        "situations": [
          "강한 지지를 빠르게 표시할 때",
          "채팅/회의에서 짧게 동의할 때"
        ],
        "detail": "강도 최대치의 동의를 두 단어로 던지는 무브야. 슬랙이나 회의에서 빠르게 진영을 표시할 때 쓰는 요즘 구어체야. 캐주얼한 표현이라 임원 미팅 같은 자리에선 'I fully agree'가 안전해.",
        "exampleKo": "완전 동의예요. 이거 나가기 전에 피처 플래그부터요.",
        "questionEn": "I think nothing ships without a kill switch from now on. Thoughts?",
        "termsKo": "kill switch: 문제 시 기능을 즉시 끌 수 있는 장치. 피처 플래그의 안전판 용도.",
        "cueKo": ""
      },
      {
        "key": "ag:hard-disagree",
        "en": "Hard disagree.",
        "ko": "완전 반대",
        "example": "Hard disagree — silent fallbacks are how we got that outage.",
        "situations": [
          "강하게 반대 선언할 때",
          "위험한 제안에 즉시 제동 걸 때"
        ],
        "detail": "반대 강도 최대치를 즉시 선언하는 무브야. 안전이나 장애 관련처럼 타협하면 안 되는 사안에서 빠르게 제동 걸 때 효과적이야. 강도가 센 만큼 바로 뒤에 이유를 붙이는 게 필수고, 사소한 사안에 쓰면 싸움만 키워.",
        "exampleKo": "완전 반대예요. 조용한 폴백 때문에 그 장애가 났던 거잖아요.",
        "questionEn": "Let's just swallow downstream errors and return cached defaults. Simple, right?",
        "termsKo": "silent fallback: 실패를 숨기고 기본값으로 대체하는 패턴. 장애 발견을 늦추는 위험이 있다.",
        "cueKo": ""
      },
      {
        "key": "ag:let-s-agree-to-disagree-on",
        "en": "Let's agree to disagree on ...",
        "ko": "~는 이견인 채로 두자",
        "example": "Let's agree to disagree on tabs and move to the actual bug.",
        "situations": [
          "소모적 논쟁 종료할 때",
          "합의 불가 사안 보류할 때"
        ],
        "detail": "합의가 안 되는 사안을 미해결인 채로 봉인하고 다음으로 넘어가는 무브야. 취향 문제나 우선순위 낮은 논쟁이 회의를 잡아먹을 때 시간을 구해줘. 단, 진짜 결정이 필요한 사안에 쓰면 회피로 보이니까 '나중에 결정은 해야 한다'는 단서를 달아.",
        "exampleKo": "탭 논쟁은 이견인 채로 두고 진짜 버그로 넘어가죠.",
        "questionEn": "We've argued about code style for twenty minutes and the release is tomorrow.",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-m-with-you-on-x-less-so-on-y",
        "en": "I'm with you on X, less so on Y.",
        "ko": "X는 동의, Y는 글쎄",
        "example": "I'm with you on the rewrite, less so on the timeline.",
        "situations": [
          "제안을 쪼개서 입장 낼 때",
          "일부만 지지할 때"
        ],
        "detail": "상대 제안을 통째로 받지 않고 항목별로 쪼개서 입장을 내는 무브야. '전부 아니면 전무' 구도를 깨고 합의 가능한 부분부터 굳힐 수 있어서 협상이 빨라져. 동의부터 말하고 이견을 뒤에 두는 순서가 부드럽게 들리는 비결이야.",
        "exampleKo": "리라이트엔 동의해요. 일정엔 글쎄요.",
        "questionEn": "My proposal: full rewrite of the billing module, done in six weeks. In or out?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:fair-enough",
        "en": "Fair enough.",
        "ko": "그건 인정 (수긍)",
        "example": "Fair enough — if the load test passes, I'll drop my objection.",
        "situations": [
          "반박 듣고 수긍할 때",
          "논점 하나를 내줄 때"
        ],
        "detail": "상대 반론을 듣고 깔끔하게 수긍하는 무브야. 자기 입장을 조건부로 접을 줄 아는 모습은 고집보다 훨씬 시니어답게 보여. 톤에 따라 마지못한 수긍처럼 들릴 수도 있으니, 진심 수긍이면 왜 납득했는지 한 마디 붙여줘.",
        "exampleKo": "인정해요. 부하 테스트 통과하면 반대 접을게요.",
        "questionEn": "You doubted the design, but we ran the load test you asked for and it passed.",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:i-can-live-with-that",
        "en": "I can live with that.",
        "ko": "최선은 아니지만 받아들일 수 있다",
        "example": "Not my first choice, but I can live with that.",
        "situations": [
          "타협안 수용할 때",
          "내 안이 기각됐을 때 승복할 때"
        ],
        "detail": "내 선호는 아니라는 기록을 남기면서 결정은 막지 않겠다고 승복하는 무브야. 'disagree and commit'을 한 문장으로 구현하는 표현이라 합의 도출 마지막 단계에서 자주 나와. 열렬한 찬성과는 명확히 다른 온도라는 걸 양쪽 다 인지하게 돼.",
        "exampleKo": "제 1순위는 아니지만, 그 정도면 받아들일 수 있어요.",
        "questionEn": "The team voted for the other approach. Can you commit to it anyway?",
        "termsKo": "disagree and commit: 반대 의견을 냈어도 결정엔 전력으로 따른다는 협업 원칙.",
        "cueKo": ""
      }
    ]
  },
  {
    "fn": "prioritize-conclude",
    "labelKo": "우선순위/결론",
    "items": [
      {
        "key": "ag:the-bigger-issue-is",
        "en": "The bigger issue is ...",
        "ko": "더 큰 문제는 ~다",
        "example": "The bigger issue is we have no rollback story at all.",
        "situations": [
          "논점 우선순위 재정렬할 때",
          "지엽 논쟁에서 본질로 끌어올 때"
        ],
        "detail": "지엽적인 논쟁에서 더 중요한 문제로 시선을 끌어올리는 무브야. 상대 논점을 부정하지 않고 '그것보다 큰 게 있다'고 상대화하는 거라 부드럽게 화제를 바꿀 수 있어. 남발하면 매번 논점을 흐리는 사람으로 보이니, 정말 더 큰 문제가 있을 때만 써.",
        "exampleKo": "더 큰 문제는 롤백 수단이 아예 없다는 거예요.",
        "questionEn": "Should we spend this sprint renaming the API endpoints for consistency?",
        "termsKo": "rollback: 배포를 이전 버전으로 되돌리는 것. 되돌릴 수 있는가가 배포 안전성의 핵심 질문.",
        "cueKo": ""
      },
      {
        "key": "ag:if-we-only-fix-one-thing",
        "en": "If we only fix one thing, ...",
        "ko": "딱 하나만 고친다면",
        "example": "If we only fix one thing, make deploys reversible.",
        "situations": [
          "우선순위 강제로 정할 때",
          "리소스 부족 상황 정리할 때"
        ],
        "detail": "리소스 제약을 가정해서 우선순위를 강제로 한 줄 세우는 무브야. '다 중요하다'는 무의미한 결론을 깨고 1순위가 뭔지 입장을 내게 만들어. 회의에서 질문 형태로 상대에게 던져도 강력한 퍼실리테이션 도구가 돼.",
        "exampleKo": "딱 하나만 고친다면 배포를 되돌릴 수 있게 만들어야 해요.",
        "questionEn": "Our backlog has forty improvement items and one sprint of budget. Now what?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:net-net",
        "en": "Net-net, ...",
        "ko": "이것저것 다 따지면 결국",
        "example": "Net-net, we ship a week later but cut the incident rate in half.",
        "situations": [
          "장단점 합산해 결론 낼 때",
          "긴 논의 한 줄 요약할 때"
        ],
        "detail": "플러스 마이너스를 다 합산한 순(純) 결과를 선언하는 무브야. 긴 트레이드오프 논의를 한 줄로 정산해서 결정 직전 단계로 넘겨줘. 비즈니스 어휘 출신이라 매니저나 임원 섞인 회의에서 특히 잘 통해.",
        "exampleKo": "다 따져보면 결국 일주일 늦게 나가는 대신 장애율이 절반이 돼요.",
        "questionEn": "We've listed pros and cons for an hour. So is this change good or bad overall?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:at-the-end-of-the-day",
        "en": "At the end of the day, ...",
        "ko": "결국 중요한 건",
        "example": "At the end of the day, users only see the latency.",
        "situations": [
          "본질적 기준으로 회귀할 때",
          "기술 논쟁을 사용자 관점으로 정리할 때"
        ],
        "detail": "복잡한 논의를 가장 본질적인 판단 기준 하나로 환원하는 무브야. 기술 디테일 공방이 길어질 때 '결국 뭐가 중요한가'로 끌어내리는 리셋 버튼 역할을 해. 워낙 흔한 표현이라 뒤에 오는 내용이 정말 본질이어야지, 뻔한 말이면 클리셰로 들려.",
        "exampleKo": "결국 사용자 눈에 보이는 건 지연시간뿐이에요.",
        "questionEn": "Internally the new architecture is so much cleaner. Isn't that what matters most?",
        "termsKo": "",
        "cueKo": ""
      },
      {
        "key": "ag:let-s-not-lose-sight-of",
        "en": "Let's not lose sight of ...",
        "ko": "~를 놓치지 말자",
        "example": "Let's not lose sight of the deadline — perf tuning can wait.",
        "situations": [
          "회의가 산으로 갈 때",
          "원래 목표 환기시킬 때"
        ],
        "detail": "논의가 곁가지로 새고 있을 때 원래 목표를 다시 시야에 올리는 무브야. 누군가의 발언을 직접 반박하는 게 아니라 '우리 모두'의 시야를 교정하는 모양새라 적을 안 만들어. 회의 퍼실리테이션 무브에 가까워서 시니어가 쓰면 자연스럽게 리더십으로 읽혀.",
        "exampleKo": "데드라인을 놓치지 말죠. 성능 튜닝은 미뤄도 돼요.",
        "questionEn": "While we're in here, shouldn't we also refactor the logging and redo the configs?",
        "termsKo": "scope creep: 논의나 작업 범위가 슬금슬금 불어나는 현상.",
        "cueKo": ""
      },
      {
        "key": "ag:that-s-a-nice-to-have-not-a-must-have",
        "en": "That's a nice-to-have, not a must-have.",
        "ko": "있으면 좋지만 필수는 아니다",
        "example": "Dark mode is a nice-to-have, not a must-have, for launch.",
        "situations": [
          "요구사항 등급 매길 때",
          "스코프 줄일 때"
        ],
        "detail": "요구사항을 필수/선택 두 등급으로 분류해버리는 무브야. 스코프 협상에서 '전부 중요하다'는 함정을 피하고 자를 것을 정하게 해줘. 상대에겐 자기 요청이 격하되는 순간이라, 'for launch'처럼 기준 시점을 붙여 나중엔 할 수 있다는 여지를 주면 부드러워.",
        "exampleKo": "다크 모드는 런칭 기준으로 있으면 좋은 거지 필수는 아니에요.",
        "questionEn": "The designer insists dark mode has to be in the first release. Your call?",
        "termsKo": "MVP scoping: 최소 출시 범위를 정하는 작업. must/should/could 등급화가 표준 기법.",
        "cueKo": ""
      },
      {
        "key": "ag:first-things-first",
        "en": "First things first.",
        "ko": "순서대로, 급한 것부터",
        "example": "First things first — stop the bleeding, then talk root cause.",
        "situations": [
          "장애 대응 순서 잡을 때",
          "동시다발 이슈 교통정리할 때"
        ],
        "detail": "여러 일이 동시에 쏟아질 때 실행 순서를 강제로 잡는 무브야. 특히 장애 상황에서 '복구 먼저, 분석 나중' 같은 순서를 못박을 때 한 마디로 정리돼. 우선순위 무브 중 가장 행동 지향적이라, 토론을 끝내고 움직이게 만드는 효과가 있어.",
        "exampleKo": "급한 것부터요. 일단 출혈을 막고, 원인 분석은 그다음에요.",
        "questionEn": "Prod is down, the root cause is unclear, and management wants a full explanation now.",
        "termsKo": "stop the bleeding: 원인 불문하고 피해 확산부터 막는 장애 대응 관용구. mitigation 우선 원칙.",
        "cueKo": ""
      },
      {
        "key": "ag:bottom-line",
        "en": "Bottom line: ...",
        "ko": "결론부터 말하면 / 요점은",
        "example": "Bottom line: fix the data model or every feature stays slow.",
        "situations": [
          "논의 최종 결론 선언할 때",
          "임원 보고 한 줄 요약할 때"
        ],
        "detail": "모든 논의를 한 줄 결론으로 압축해 선언하는 무브야. 임원 보고나 긴 스레드 마무리처럼 '한 줄만 기억시켜야 하는' 상황에서 최강이야. 이 말 뒤에 또 길게 설명을 붙이면 효과가 죽으니, 정말 한두 문장으로 끝내는 게 핵심이야.",
        "exampleKo": "결론은 이거예요. 데이터 모델을 고치지 않으면 모든 기능이 계속 느려요.",
        "questionEn": "Wrap up this performance discussion for the leadership meeting in one sentence.",
        "termsKo": "",
        "cueKo": ""
      }
    ]
  }
];
export const REASONING_PREP_GROUPS: ParticleGroup[] = [];
