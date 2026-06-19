// Private learning hub content — Mimi 스택을 "면접 방어 가능"하게. 모바일에서 하루종일 보는 용.
// 각 토픽: 뭐냐(비유) → 왜 → 트레이드오프 → 용어 → 면접 why 드릴(질문/답).

export type Drill = { q: string; a: string };
export type Term = { term: string; def: string };
export type Topic = {
  id: string;
  emoji: string;
  tag: string;
  title: string;
  what: string;
  why: string;
  tradeoff: string;
  terms?: Term[];
  files?: string[];
  drills?: Drill[];
};

export type Group = { id: string; label: string; topics: Topic[] };

export const GROUPS: Group[] = [
  {
    id: "big-picture",
    label: "0 · 큰 그림",
    topics: [
      {
        id: "architecture",
        emoji: "🗺️",
        tag: "전체 구조",
        title: "앱은 3덩어리다",
        what: "프론트엔드(사용자가 보는 화면) + 백엔드(뒤에서 데이터·로직 처리하는 서버) + 인프라(서버가 돌아가는 컴퓨터/네트워크). 흐름: 폰 → 인터넷 → 백엔드 → 데이터베이스.",
        why: "역할을 나누면 각각 따로 개발·배포·확장 가능. 백엔드가 중간에서 '로그인 맞아?', '이 클립 분석해줘'를 판단.",
        tradeoff: "나눈 만큼 사이를 잇는 약속(API)이 필요. 그게 REST API.",
        terms: [
          { term: "API", def: "프론트-백엔드 대화 규격. '이 주소로 이렇게 물으면 이렇게 답한다'." },
          { term: "REST", def: "API를 HTTP 주소+동사(GET 읽기/POST 쓰기)로 표현하는 흔한 방식." },
          { term: "HTTP", def: "웹에서 주고받는 통신 규칙." },
        ],
        drills: [
          { q: "프론트/백/인프라 각각 뭐 하는 건지 한 줄로?", a: "프론트=화면, 백엔드=데이터·로직 판단, 인프라=그게 돌아가는 서버/네트워크." },
          { q: "API가 왜 필요해?", a: "프론트와 백엔드를 분리했으니, 둘이 대화할 정해진 약속이 있어야 함. 그게 API." },
        ],
      },
    ],
  },
  {
    id: "language",
    label: "1 · 언어",
    topics: [
      {
        id: "java",
        emoji: "☕",
        tag: "백엔드 언어",
        title: "Java 21",
        what: "백엔드를 짜는 프로그래밍 언어. 크고 오래됐고 회사들(은행·대기업)이 많이 씀. 타입이 엄격해서 컴파일 때 실수를 잡아줌.",
        why: "타입 엄격(버그 미리 잡힘) + 생태계 거대 + 채용시장 큼.",
        tradeoff: "Node(JS): 가볍고 빠른 개발·프론트랑 언어 통일, 근데 타입 느슨·대규모 관리 어려움. Python: 빠른 개발, 근데 느리고 타입 약함. → Java = '안정·엄격·채용' 대신 '코드 길고 무겁다'.",
        terms: [
          { term: "타입(type)", def: "'이 변수는 숫자/문자'라는 약속. 안 맞으면 에러 → 버그를 미리 잡음." },
          { term: "컴파일(compile)", def: "사람 코드를 컴퓨터 실행형태로 변환. 이때 타입 검사." },
        ],
        drills: [
          { q: "왜 Java 썼어?", a: "타입 엄격해 버그 미리 잡고, 생태계·채용 크고, 백엔드 표준이라. Node로 가볍게 갈 수도 있는데 타입·구조 관리가 약해 안정을 택했다." },
        ],
      },
      {
        id: "typescript",
        emoji: "🟦",
        tag: "프론트 언어",
        title: "TypeScript",
        what: "JavaScript(브라우저/앱 언어)에 타입을 붙인 것. JS는 타입이 없어 실수가 잘 나는데, TS가 컴파일 때 잡아줌.",
        why: "프론트는 사실상 JS밖에 선택지가 없고, TS는 그 JS를 안전하게 만듦.",
        tradeoff: "순수 JS: 더 빨리 시작, 근데 런타임에 터지는 버그 많음. → TS = '안전' 대신 '타입 쓰는 약간의 수고'.",
        drills: [{ q: "JS 대신 TS 왜?", a: "JS는 타입이 없어 런타임에 터지는 버그가 많은데, TS는 컴파일 시점에 미리 잡아줘서." }],
      },
    ],
  },
  {
    id: "backend",
    label: "2 · 백엔드",
    topics: [
      {
        id: "spring",
        emoji: "🍃",
        tag: "백엔드 프레임워크",
        title: "Spring Boot",
        what: "프레임워크 = 매번 바닥부터 안 짜게 뼈대+도구를 미리 준 것(집 골조+배관). Spring Boot = Java로 백엔드(웹서버·DB·인증) 만드는 표준 프레임워크.",
        why: "Java 백엔드의 업계 표준. 채용 공고에 제일 많이 뜨고, DB·보안·API가 다 붙어있음.",
        tradeoff: "Node(Express/Nest): 가볍고 빠름, 근데 보안·DB 등 직접 더 붙여야. → Spring = '다 들어있고 표준' 대신 '무겁고 시작 느림·러닝커브'.",
        terms: [
          { term: "프레임워크", def: "뼈대+도구 묶음을 미리 줘서 바닥부터 안 짜게 하는 것." },
          { term: "DI (의존성 주입)", def: "객체가 필요한 부품을 직접 안 만들고 주입받음 → 갈아끼우기·테스트 쉬움. Spring의 핵심." },
        ],
        files: ["backend/src/main/java/com/tubeshadow/"],
        drills: [
          { q: "왜 Spring Boot?", a: "Java 백엔드 표준이라 생태계·채용·보안이 다 붙어있어서. Node로 더 가볍게 갈 수도 있는데 타입·구조 관리가 약해 안정·엄격을 택해 Spring으로." },
          { q: "의존성 주입(DI)이 뭐고 왜 좋아?", a: "객체가 필요한 부품을 직접 생성 안 하고 외부에서 주입받음. 부품을 갈아끼우거나(예: AI 프로바이더 교체) 테스트용 가짜로 바꾸기 쉬워짐." },
        ],
      },
      {
        id: "gradle",
        emoji: "🐘",
        tag: "빌드 도구",
        title: "Gradle",
        what: "흩어진 코드+남이 만든 라이브러리를 모아 실행 가능한 하나로 묶는(빌드) 도구. 라이브러리 다운로드도 함.",
        why: "Java 진영 표준 빌드도구. 우린 Kotlin DSL(설정을 코드로) 사용.",
        tradeoff: "Maven: XML 설정, 더 옛날·장황. → Gradle = '유연·빠름' 대신 '가끔 복잡'.",
        terms: [{ term: "의존성(dependency)", def: "남이 만든 코드를 가져다 씀. build.gradle.kts에 목록." }],
        drills: [{ q: "빌드 도구가 왜 필요해?", a: "코드+수십 개 라이브러리를 모아 실행 가능한 하나로 묶고, 의존성을 자동 다운로드·관리하려고." }],
      },
      {
        id: "db",
        emoji: "🐘",
        tag: "데이터베이스",
        title: "PostgreSQL + JPA/Hibernate",
        what: "DB = 데이터를 영구 저장하는 곳(앱 꺼도 남음). PostgreSQL = 가장 많이 쓰는 오픈소스 관계형 DB(표=테이블, 행=레코드, 엑셀 구조). JPA/Hibernate = ORM: Java 객체 ↔ DB 표를 자동 번역해 SQL 직접 안 쓰게.",
        why: "Postgres는 무료·강력·신뢰성 = 고민 없이 고르는 기본값. ORM은 SQL 노가다를 줄이고 객체로 다룸.",
        tradeoff: "MySQL(비슷·인기) / MongoDB(NoSQL, 구조 자유롭지만 관계 많은 우린 안 맞음). ORM은 편한 대신 느린 쿼리·N+1 문제가 숨음 → 가끔 직접 SQL 필요(우리 ClipRepository에 native query).",
        terms: [
          { term: "ORM", def: "Object-Relational Mapping. 객체 ↔ DB 표 자동 번역. clipRepository.save(clip)이면 알아서 INSERT." },
          { term: "스키마(schema)", def: "표의 구조 설계(어떤 컬럼·타입)." },
          { term: "마이그레이션(migration)", def: "스키마를 바꾸는 버전관리된 변경." },
          { term: "N+1 문제", def: "1번 쿼리로 끝낼 걸 N번 더 날리는 ORM의 흔한 성능 함정." },
        ],
        drills: [
          { q: "왜 관계형 DB(Postgres)? NoSQL 아니고?", a: "유저-클립-복습기록처럼 관계가 많은 데이터라 관계형이 맞음. NoSQL은 구조 자유롭지만 관계 다루기 약함." },
          { q: "ORM의 단점은?", a: "편하지만 느린 쿼리·N+1 문제가 코드에 안 보이게 숨음. 그래서 무거운 쿼리는 직접 SQL을 씀." },
        ],
      },
      {
        id: "jwt",
        emoji: "🔑",
        tag: "인증",
        title: "JWT 인증",
        what: "인증 = '너 진짜 그 사람 맞아?'(로그인). HTTP는 기억을 못 해서(stateless), 매 요청마다 증명이 필요. JWT = 로그인 성공 시 서버가 서명한 출입증(토큰)을 주고, 이후 요청마다 첨부 → 서버가 서명 검증(놀이공원 손목밴드, 위조하면 서명 안 맞음).",
        why: "서버가 로그인 상태를 따로 저장 안 해도 됨(토큰 자체에 정보+서명) → 서버 여러 대로 확장 쉬움.",
        tradeoff: "세션(쿠키): 서버가 상태 저장, 즉시 로그아웃 쉬움, 근데 서버 여러 대면 공유 골치. → JWT = '서버 저장 불필요·확장 쉬움' 대신 '발급 후 강제 만료(로그아웃) 어려움'.",
        terms: [
          { term: "stateless", def: "서버가 이전 요청을 기억 안 함(매 요청 독립)." },
          { term: "해시(hash)", def: "비번을 되돌릴 수 없게 뭉갠 값. 원본 저장 안 하고 비교만." },
          { term: "필터(filter)", def: "요청이 본 로직에 닿기 전에 가로채는 관문. 여기서 토큰 검사·레이트리밋." },
          { term: "레이트리밋(rate limit)", def: "'1분에 N번까지' 횟수 제한. 무차별 로그인 공격 차단." },
        ],
        files: ["backend/src/main/java/com/tubeshadow/auth/security/JwtTokenProvider.java", "backend/.../auth/security/JwtAuthenticationFilter.java", "backend/.../auth/security/SecurityConfig.java"],
        drills: [
          { q: "JWT vs 세션, 왜 JWT?", a: "서버가 상태를 저장 안 해도 돼서 서버 여러 대로 확장이 쉬워서. 대신 발급된 토큰을 즉시 무효화(강제 로그아웃)하기 어려운 게 트레이드오프." },
          { q: "토큰 탈취되면?", a: "만료 전까진 유효해서 위험. 그래서 만료를 짧게 + (있다면) refresh 토큰 + HTTPS 필수. 우리 건 만료 전략을 코드에서 확인해 정확히 말해야 함." },
          { q: "비번은 어떻게 저장해?", a: "평문 저장 절대 X. 해시(되돌릴 수 없는 값)로 저장하고, 로그인 때 입력값을 같은 방식으로 해시해 비교." },
        ],
      },
    ],
  },
  {
    id: "hard",
    label: "3 · 어려운 3스토리 (면접 핵심)",
    topics: [
      {
        id: "ai-fallback",
        emoji: "🤖",
        tag: "실패를 설계함",
        title: "멀티 AI 프로바이더 폴백",
        what: "클립 분석·영작 채점을 AI에 시킴. 한 곳 말고 Gemini→OpenAI→Claude 순서로 폴백(첫 번째가 죽으면 다음으로).",
        why: "한 곳 = SPOF(단일 장애점). 거기 죽거나 막히면 전체 정지. 여러 곳이면 하나 죽어도 다음으로. Gemini 기본은 무료 티어 = 비용 0.",
        tradeoff: "프로바이더마다 응답 포맷 제각각 → 정규화 코드 필요(각 ~Client.java). 복잡도↑ 대신 안정성·비용↑.",
        terms: [
          { term: "SPOF", def: "Single Point Of Failure. 거기 하나 죽으면 전체가 죽는 지점." },
          { term: "프롬프트(prompt)", def: "AI에게 주는 지시문." },
          { term: "STT", def: "Speech-To-Text. 음성→글자(말하기 채점에 사용)." },
        ],
        files: ["backend/.../analysis/infrastructure/CompositeAiClient.java (93줄, 핵심)", "backend/.../analysis/infrastructure/AiAnalysisClient.java", "application.yml 의 ai.order"],
        drills: [
          { q: "왜 폴백을 넣었어?", a: "단일 AI 프로바이더는 SPOF라 레이트리밋·장애·비용에 취약. 순서대로 가능한 첫 프로바이더를 쓰고 실패 시 다음으로 넘겨 가용성을 확보." },
          { q: "폴백 트리거 조건은?", a: "(코드 확인 후 정확히) isConfigured() 된 첫 프로바이더 사용 + 런타임 에러 시 다음. 무엇까지 폴백하는지 CompositeAiClient에서 확인해 말해라." },
          { q: "타임아웃·재시도·동시성은?", a: "없으면 솔직히: '개인용이라 미구현. 프로덕션이면 프로바이더별 타임아웃+지수백오프 재시도+동시호출 제한으로 막겠다.' ← 이게 시니어 답." },
          { q: "100배 트래픽이면 어디 터져?", a: "프로바이더 레이트리밋·비용 폭증. → 요청 큐잉, 결과 캐싱, 배치, 백오프로 막는다." },
        ],
      },
      {
        id: "sm2",
        emoji: "🔁",
        tag: "도메인 알고리즘",
        title: "SM-2 간격반복",
        what: "복습 카드를 '잊을 때쯤' 다시 보여주는 알고리즘(Anki가 쓰는 거). easiness factor로 다음 복습 간격을 늘렸다 줄였다.",
        why: "맹목 반복보다 효율적. 맞히면 간격이 지수로(1,3,7,14,30일…) 늘고, 틀리면 짧게 리셋.",
        tradeoff: "더 단순한 Leitner(상자) 방식도 있음. SM-2는 카드별 난이도를 반영해 더 정밀, 대신 계산이 약간 복잡.",
        terms: [
          { term: "easiness factor", def: "카드가 얼마나 쉬운지 점수(2.5 시작, 1.3 하한). 맞히면↑, 틀리면 간격 리셋." },
          { term: "due", def: "오늘 복습할 차례가 된 카드." },
        ],
        files: ["backend/.../review/domain/Sm2Calculator.java (56줄)", "backend/.../review/application/ReviewService.java"],
        drills: [
          { q: "SM-2가 뭐고 왜 썼어?", a: "간격반복 알고리즘. 잊기 직전에 복습시켜 기억을 효율적으로 굳힘. 맞히면 간격을 지수로 늘리고 틀리면 짧게 리셋." },
          { q: "'Again' 누르면 정확히 뭐가 바뀌어?", a: "interval이 1로 리셋(내일 다시), easiness factor도 약간 깎임. (코드로 확인해 정확히)" },
          { q: "카드가 수백만이면 due 쿼리 최적화는?", a: "dueDate에 인덱스 + 유저별·날짜별 페이징. 매번 전체 스캔하면 느려짐." },
        ],
      },
      {
        id: "potoken",
        emoji: "🕵️",
        tag: "사일런트 장애 디버깅",
        title: "YouTube 자막 + POToken",
        what: "데이터센터 IP에서 유튜브 자막 요청 → HTTP 200인데 0바이트(에러도 아닌 침묵 실패, 제일 디버깅 어려운 종류). 원인은 유튜브 봇 게이트. 정상 클라이언트 증명 토큰(POToken)을 요구.",
        why: "해결: yt-dlp(추출 도구) + bgutil POToken provider(토큰 생성하는 작은 Node 서버, 컨테이너 안 4416포트) + deno(yt-dlp가 추출에 필요로 하는 JS 런타임). 디바이스 자막 실패 시 백엔드 yt-dlp로 폴백.",
        tradeoff: "사이드카를 같은 컨테이너에 넣음 = 네트워킹 깨질 여지 제거(단순), 대신 컨테이너가 무거워짐. 유튜브가 또 막으면 토큰 방식을 또 따라가야 하는 유지보수 부담.",
        terms: [
          { term: "POToken", def: "유튜브가 '정상 클라이언트' 증명용으로 요구하는 토큰. 없으면 자막이 빈 응답." },
          { term: "사일런트 실패", def: "에러를 안 내고 200인데 빈 데이터가 오는 최악의 버그. 원인 찾기 어려움." },
          { term: "사이드카(sidecar)", def: "메인 옆에서 보조 역할 하는 별도 프로세스/컨테이너." },
        ],
        files: ["backend/Dockerfile (왜 한 컨테이너에 다 넣었는지 주석)", "backend/.../video/application/VideoImportService.java", "mobile/src/lib/youtube-transcript-webview.tsx", "content/logs/.../transcript-method-decision-and-fallbacks.mdx"],
        drills: [
          { q: "증상이 200+0바이트인데 어떻게 '코드 버그 아님'이라 판단했어?", a: "요청 자체는 성공(200)인데 본문만 비어있고, 로컬(집 IP)에선 되고 서버(데이터센터 IP)에서만 비는 패턴 → 코드가 아니라 호출 환경(IP) 문제 = 유튜브의 봇 차단으로 좁힘." },
          { q: "POToken이 정확히 뭘 해결해?", a: "데이터센터 IP를 '봇'으로 보고 빈 응답을 주는 유튜브 게이트를, '정상 클라이언트' 증명 토큰을 같이 보내 통과시킴." },
          { q: "왜 사이드카를 같은 컨테이너 안에?", a: "별도 컨테이너 간 네트워킹이 깨질 여지를 없애려고, 같은 컨테이너 localhost로 묶음(Dockerfile 주석에 명시)." },
        ],
      },
    ],
  },
  {
    id: "frontend",
    label: "4 · 프론트엔드",
    topics: [
      {
        id: "rn-expo",
        emoji: "📱",
        tag: "모바일",
        title: "React Native + Expo",
        what: "React Native = 하나의 코드로 iOS+안드 앱 둘 다 만드는 프레임워크(JS/TS로). Expo = RN을 훨씬 쉽게 쓰게 해주는 도구모음(빌드·카메라·보안저장 포장).",
        why: "혼자서 iOS+안드 둘 다 빠르게. 네이티브(Swift/Kotlin) 각각 짜면 2배 일.",
        tradeoff: "편하고 빠른 대신 극한 성능·최신 네이티브 기능은 한계(우리 앱엔 충분).",
        terms: [
          { term: "네이티브(native)", def: "그 OS 전용 언어로 짠 진짜 앱(iOS=Swift, 안드=Kotlin)." },
          { term: "expo-router", def: "화면 이동(라우팅)을 폴더 구조로. app/today.tsx = /today 화면." },
          { term: "TanStack Query", def: "서버 데이터 가져오기·캐싱·로딩/에러 상태를 자동 관리." },
          { term: "Zustand", def: "앱 전역 상태(로그인 토큰 등)를 간단히 저장/공유하는 상태관리 라이브러리." },
          { term: "상태(state)", def: "화면이 기억하는 값(입력칸 내용, 로그인 여부 등)." },
        ],
        drills: [
          { q: "왜 React Native(Expo)? 네이티브 각각 안 짜고?", a: "혼자서 iOS+안드를 하나의 코드로 빠르게 내려고. 네이티브로 각각 짜면 2배 일이고, 우리 앱은 극한 성능이 필요 없어서 RN으로 충분." },
          { q: "TanStack Query는 왜 써?", a: "서버 데이터 fetch·캐싱·로딩/에러/재시도 상태를 직접 관리하면 노가다라, 그걸 자동으로 해주는 라이브러리라서." },
        ],
      },
      {
        id: "next",
        emoji: "▲",
        tag: "웹",
        title: "Next.js",
        what: "React 기반 풀스택 웹 프레임워크. 마케팅 페이지+블로그(이 학습 페이지도 여기!).",
        why: "React 표준급, SEO·서버렌더링 잘 됨, Vercel 배포 쉬움.",
        tradeoff: "순수 React(SPA): 더 단순하지만 SEO 약함. → Next = 'SEO·렌더링 강' 대신 '더 복잡'.",
        terms: [
          { term: "SSR (서버사이드 렌더링)", def: "화면을 서버에서 미리 그려 보냄 → 빠른 첫 화면·검색노출(SEO)." },
          { term: "SPA", def: "브라우저에서 다 그림. 첫 로딩 후 빠르지만 SEO 약함." },
        ],
        drills: [{ q: "왜 Next.js? 그냥 React 아니고?", a: "SEO와 서버렌더링이 필요한 마케팅/블로그라, 서버에서 미리 그려주는 Next가 맞음. 순수 React SPA는 검색노출이 약함." }],
      },
    ],
  },
  {
    id: "infra",
    label: "5 · 인프라",
    topics: [
      {
        id: "docker",
        emoji: "📦",
        tag: "컨테이너",
        title: "Docker + Compose",
        what: "Docker = 앱+실행환경(OS·라이브러리)을 상자 하나로 통째 포장 ('내 컴퓨터선 되는데요' 해결). Compose = 여러 컨테이너(백엔드+DB+Caddy+토큰provider)를 파일 하나로 같이 띄움.",
        why: "어디서든 똑같이 재현·배포. 우린 박스 1대에 compose로 다 띄움.",
        tradeoff: "편한 대신 약간의 오버헤드·러닝커브.",
        terms: [
          { term: "이미지(image)", def: "상자 설계도/스냅샷." },
          { term: "컨테이너(container)", def: "그 이미지로 실제 돌아가는 인스턴스." },
        ],
        files: ["infrastructure/ncp/box/docker-compose.yml", "backend/Dockerfile"],
        drills: [{ q: "Docker가 왜 필요해?", a: "앱+환경을 상자로 포장해 어디서든 똑같이 돌게 함. '내 PC선 되는데 서버선 안 됨' 문제를 없앰." }],
      },
      {
        id: "caddy",
        emoji: "🔒",
        tag: "리버스 프록시 / HTTPS",
        title: "Caddy",
        what: "리버스 프록시 = 바깥 요청을 제일 앞에서 받아 뒤 백엔드로 넘기는 문지기. Caddy = 그 문지기 서버, HTTPS(TLS) 인증서를 자동 발급·갱신.",
        why: "설정 쉽고 TLS 자동(인증서 직접 관리 안 해도 됨).",
        tradeoff: "Nginx: 더 강력·범용, 근데 TLS 수동·설정 장황. → Caddy = '쉬움·자동 TLS' 대신 '덜 범용'.",
        terms: [
          { term: "리버스 프록시", def: "바깥 요청을 앞에서 받아 뒤 서버로 넘기는 문지기. 도메인·보안·라우팅 담당." },
          { term: "TLS/HTTPS", def: "통신 암호화(자물쇠)." },
          { term: "인증서(certificate)", def: "'이 도메인 진짜다' 증명서. Let's Encrypt가 무료 발급." },
        ],
        files: ["infrastructure/ncp/box/Caddyfile"],
        drills: [{ q: "Caddy가 뭘 해줘?", a: "앞단 문지기로 요청을 백엔드에 넘기고, HTTPS 인증서를 자동 발급·갱신해 암호화를 공짜로 처리." }],
      },
      {
        id: "ncp-terraform",
        emoji: "🏗️",
        tag: "클라우드 / IaC (= 센터피스)",
        title: "NCP + Terraform 마이그레이션",
        what: "클라우드 = 남의 데이터센터 컴퓨터를 빌려 서버 돌림. NCP = 네이버 클라우드(한국). Terraform = IaC: 서버·네트워크를 클릭이 아니라 코드로 정의해 실행하면 인프라가 그대로 생성됨. 우린 AWS 토론토 → NCP 서울로 이전.",
        why: "한국 타깃인데 토론토 AWS는 ~180ms + 월 $50–65 → 한국 데이터센터(서울)면 빠르고 쌌음. Terraform은 재현·버전관리·실수 방지.",
        tradeoff: "단일 박스 = SPOF(거기 죽으면 끝). Terraform 로컬 state = 팀 협업/잠금 약함. → '비용·레이턴시·재현성' 대신 '단일 박스 위험·IaC 러닝커브'.",
        terms: [
          { term: "IaC", def: "Infrastructure as Code. 인프라를 클릭 아닌 코드로 정의·생성." },
          { term: "레이턴시(latency)", def: "요청-응답 지연(ms). 멀수록 큼(토론토→한국 ~180ms)." },
          { term: "리전(region)", def: "데이터센터 위치(서울/도쿄/버지니아…). 가까울수록 빠름." },
        ],
        files: ["infrastructure/ncp/*.tf", "content/logs/.../aws-to-ncp-seoul-migration.mdx", "content/logs/.../ncp-migration-gotchas.mdx"],
        drills: [
          { q: "왜 AWS 서울 리전 대신 NCP로 갔어?", a: "(네 진짜 이유로: 비용·이미 캐나다 AWS 계정·한국 결제 편의 등) 한국 타깃이라 한국 클라우드로 레이턴시·비용을 잡으려고." },
          { q: "단일 박스의 위험은? 어떻게 대비?", a: "SPOF — 박스 죽으면 전체 다운. 트래픽 늘면 백엔드/DB 분리, 매니지드 DB, 다중화로 간다(지금은 1유저라 과투자 안 함)." },
          { q: "마이그레이션 중 다운타임 0은 어떻게?", a: "새 박스를 띄워 헬스체크로 정상 확인 후 DNS를 컷오버. 옛 인프라는 트래픽 빠진 뒤 폐기." },
          { q: "Terraform 로컬 state의 한계는?", a: "여러 명이 동시에 적용하면 충돌·잠금 문제. 팀이면 원격 state(S3+lock)로 가야 함." },
        ],
      },
      {
        id: "cloudflare",
        emoji: "🌐",
        tag: "DNS / 스토리지",
        title: "Cloudflare + R2",
        what: "DNS = 도메인(mimi.daeseon.ai)을 서버 IP로 바꿔주는 전화번호부. Cloudflare = 그 DNS+보안+CDN 서비스. R2 = Cloudflare의 파일 저장소(S3 호환), DB 백업 보관에 사용.",
        why: "무료·빠름·DDoS 방어. R2는 S3 호환이라 표준 도구로 다룸.",
        tradeoff: "벤더 종속 약간 있음. 근데 무료·표준 호환이라 이점이 큼.",
        terms: [
          { term: "DNS", def: "도메인 ↔ IP 변환." },
          { term: "CDN", def: "정적 파일을 전세계 가까운 곳에 캐시해 빨리 전달." },
          { term: "S3/R2", def: "아마존의 대표 파일저장소(S3) / 그 호환(R2)." },
          { term: "백업(backup)", def: "데이터 사본. 망가지면 복구." },
        ],
        drills: [{ q: "DNS가 뭐야?", a: "사람이 외우는 도메인(mimi.daeseon.ai)을 컴퓨터가 찾아가는 IP주소로 바꿔주는 전화번호부." }],
      },
    ],
  },
];

export const GLOSSARY: Term[] = [
  { term: "API", def: "프론트-백엔드 대화 규격." },
  { term: "REST", def: "API를 HTTP 주소+동사로 표현." },
  { term: "HTTP", def: "웹 통신 규칙(GET 읽기/POST 쓰기)." },
  { term: "stateless", def: "서버가 이전 요청을 기억 안 함." },
  { term: "SPOF", def: "단일 장애점. 거기 죽으면 전체 죽음." },
  { term: "SSR / SPA", def: "서버에서 미리 그림 / 브라우저에서 그림." },
  { term: "DI", def: "의존성 주입. 부품을 주입받아 교체·테스트 쉬움." },
  { term: "ORM", def: "객체 ↔ DB 표 자동 번역." },
  { term: "schema / migration", def: "DB 구조 / 그 구조 변경." },
  { term: "JWT", def: "서명된 출입증 토큰." },
  { term: "hash", def: "되돌릴 수 없게 뭉갠 값(비번 저장)." },
  { term: "filter", def: "요청을 가로채는 관문." },
  { term: "rate limit", def: "횟수 제한(공격 차단)." },
  { term: "container / image", def: "포장상자 / 그 설계도." },
  { term: "reverse proxy", def: "앞단 문지기." },
  { term: "TLS / HTTPS", def: "통신 암호화." },
  { term: "certificate", def: "도메인 진위 증명서." },
  { term: "IaC", def: "인프라를 코드로." },
  { term: "latency", def: "요청-응답 지연(ms)." },
  { term: "region", def: "데이터센터 위치." },
  { term: "DNS", def: "도메인 ↔ IP." },
  { term: "CDN", def: "전세계 캐시 전달." },
  { term: "S3 / R2", def: "파일 저장소." },
  { term: "state / cache", def: "화면 기억값 / 재사용 저장." },
  { term: "STT", def: "음성 → 글자." },
  { term: "prompt", def: "AI 지시문." },
  { term: "POToken", def: "유튜브 정상클라이언트 증명 토큰." },
  { term: "sidecar", def: "메인 옆 보조 프로세스." },
];
