// Private learning hub content — Mimi 스택을 "면접에서 영어로 방어 가능"하게.
// 각 토픽: 뭐냐(비유) → 왜 → 트레이드오프 → 용어 → 면접 드릴.
// 드릴: 한글로 이해(q/a) + 영어로 말하기(qEn/aEn = 실제 면접에서 할 문장).

export type Drill = { q: string; a: string; qEn: string; aEn: string };
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
          { term: "API", def: "프론트-백엔드 대화 규격." },
          { term: "REST", def: "API를 HTTP 주소+동사(GET 읽기/POST 쓰기)로." },
          { term: "HTTP", def: "웹 통신 규칙." },
        ],
        drills: [
          {
            q: "프론트/백/인프라가 각각 뭐 하는 건지?",
            a: "프론트=화면, 백엔드=데이터·로직 판단, 인프라=그게 돌아가는 서버.",
            qEn: "Can you walk me through the architecture at a high level?",
            aEn: "Sure. It's three layers: a frontend — the mobile app and the website — a backend that owns the data and the logic, and the infrastructure it runs on. The client talks to the backend over an API, and the backend talks to Postgres and the AI providers.",
          },
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
        what: "백엔드 짜는 언어. 크고 오래됐고 회사들이 많이 씀. 타입이 엄격해 컴파일 때 실수를 잡음.",
        why: "타입 엄격 + 생태계 거대 + 채용시장 큼.",
        tradeoff: "Node(JS): 가볍고 빠른 개발, 근데 타입 느슨. Python: 빠른 개발, 근데 느림. → Java = '안정·엄격' 대신 '코드 길고 무거움'.",
        terms: [
          { term: "타입(type)", def: "'이 변수는 숫자/문자'라는 약속. 안 맞으면 에러." },
          { term: "컴파일", def: "코드를 실행형태로 변환하며 타입 검사." },
        ],
        drills: [
          {
            q: "왜 Java 썼어?",
            a: "타입 엄격해 버그 미리 잡고, 생태계·채용 크고 백엔드 표준이라.",
            qEn: "Why did you go with Java for the backend?",
            aEn: "Mostly for the strong typing — it catches a whole class of bugs at compile time — plus the ecosystem and the job market are huge. I could've gone lighter with Node, but its loose typing gets hard to manage as things grow, so I traded some verbosity for stability.",
          },
        ],
      },
      {
        id: "typescript",
        emoji: "🟦",
        tag: "프론트 언어",
        title: "TypeScript",
        what: "JavaScript에 타입을 붙인 것. JS는 타입이 없어 실수가 잘 나는데 TS가 컴파일 때 잡음.",
        why: "프론트는 사실상 JS밖에 없고, TS는 그걸 안전하게.",
        tradeoff: "순수 JS: 더 빨리 시작, 근데 런타임 버그 많음. → TS = '안전' 대신 '타입 쓰는 수고'.",
        drills: [
          {
            q: "JS 대신 TS 왜?",
            a: "런타임에 터지는 버그를 컴파일 시점에 미리 잡으려고.",
            qEn: "Why TypeScript over plain JavaScript?",
            aEn: "Plain JS pushes a lot of bugs to runtime because there's no type checking. TypeScript catches most of those at compile time, so I get the safety without giving up the JS ecosystem.",
          },
        ],
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
        what: "프레임워크 = 뼈대+도구를 미리 준 것(집 골조). Spring Boot = Java 백엔드 표준 프레임워크(웹서버·DB·인증 다 붙음).",
        why: "Java 백엔드 업계 표준. 채용 많고, DB·보안·API 다 들어있음.",
        tradeoff: "Node(Express/Nest): 가볍지만 직접 더 붙여야. → Spring = '다 들어있고 표준' 대신 '무겁고 러닝커브'.",
        terms: [
          { term: "프레임워크", def: "바닥부터 안 짜게 뼈대+도구를 미리 줌." },
          { term: "DI (의존성 주입)", def: "부품을 직접 안 만들고 주입받음 → 교체·테스트 쉬움. Spring 핵심." },
        ],
        files: ["backend/src/main/java/com/tubeshadow/"],
        drills: [
          {
            q: "왜 Spring Boot?",
            a: "Java 백엔드 표준이라 보안·DB·API가 다 붙어있어서.",
            qEn: "Why Spring Boot?",
            aEn: "It's the de-facto standard for Java backends, so auth, persistence, and the web layer are all there out of the box, and it's what most teams hire for. The trade-off is it's heavier and has a learning curve, but for a real product that's worth it.",
          },
          {
            q: "의존성 주입(DI)이 뭐고 왜 좋아?",
            a: "객체가 부품을 직접 생성 안 하고 주입받음 → 교체·테스트 쉬움.",
            qEn: "What is dependency injection and why does it matter?",
            aEn: "Instead of a class creating the things it depends on, they're injected from outside. That makes them easy to swap — like switching AI providers — and easy to replace with fakes in tests. In my AI client that's exactly what lets me plug in different providers.",
          },
        ],
      },
      {
        id: "gradle",
        emoji: "🐘",
        tag: "빌드 도구",
        title: "Gradle",
        what: "코드+라이브러리를 모아 실행 가능한 하나로 묶는(빌드) 도구. 라이브러리 다운로드도 함.",
        why: "Java 표준 빌드도구. Kotlin DSL(설정을 코드로) 사용.",
        tradeoff: "Maven: XML·장황. → Gradle = '유연·빠름' 대신 '가끔 복잡'.",
        terms: [{ term: "의존성", def: "남이 만든 코드. build.gradle.kts에 목록." }],
        drills: [
          {
            q: "빌드 도구가 왜 필요해?",
            a: "코드+수십 라이브러리를 묶고 의존성을 자동 관리하려고.",
            qEn: "What does a build tool like Gradle actually do for you?",
            aEn: "It pulls in all the third-party dependencies and compiles everything into a single runnable artifact. Without it you'd be wiring up dozens of libraries by hand.",
          },
        ],
      },
      {
        id: "db",
        emoji: "🐘",
        tag: "데이터베이스",
        title: "PostgreSQL + JPA/Hibernate",
        what: "DB = 데이터 영구 저장(앱 꺼도 남음). Postgres = 인기 오픈소스 관계형 DB. JPA/Hibernate = ORM: Java 객체↔DB 표 자동 번역.",
        why: "Postgres = 무료·강력·신뢰성 기본값. ORM = SQL 노가다 줄임.",
        tradeoff: "MySQL(비슷) / MongoDB(관계 약함). ORM은 편하지만 N+1·느린 쿼리가 숨음 → 가끔 직접 SQL.",
        terms: [
          { term: "ORM", def: "객체↔DB 표 자동 번역. save(clip)이면 알아서 INSERT." },
          { term: "schema/migration", def: "표 구조 / 그 구조 변경." },
          { term: "N+1 문제", def: "1번이면 될 쿼리를 N번 더 날리는 ORM 함정." },
        ],
        drills: [
          {
            q: "왜 관계형 DB? NoSQL 아니고?",
            a: "유저-클립-복습처럼 관계가 많아 관계형이 맞음.",
            qEn: "Why a relational database instead of NoSQL?",
            aEn: "The data is highly relational — users, clips, review records all reference each other — so a relational model fits naturally. NoSQL gives you flexible shape, but it's weaker exactly where I need joins and relationships.",
          },
          {
            q: "ORM의 단점은?",
            a: "편하지만 N+1·느린 쿼리가 코드에 안 보이게 숨음.",
            qEn: "What's the downside of using an ORM?",
            aEn: "It's convenient, but it hides performance problems — the classic one is the N+1 query, where one logical fetch fires N extra queries. So for the heavy paths I drop down to hand-written SQL.",
          },
        ],
      },
      {
        id: "jwt",
        emoji: "🔑",
        tag: "인증",
        title: "JWT 인증",
        what: "인증 = '너 맞아?' 확인. HTTP는 기억을 못 해(stateless). JWT = 로그인 시 서명한 출입증(토큰)을 주고, 매 요청 첨부 → 서버가 서명 검증(손목밴드, 위조하면 서명 안 맞음).",
        why: "서버가 로그인 상태를 저장 안 해도 됨 → 서버 여러 대로 확장 쉬움.",
        tradeoff: "세션: 즉시 로그아웃 쉽지만 서버 여러 대면 공유 골치. → JWT = '서버 저장 불필요' 대신 '강제 만료 어려움'.",
        terms: [
          { term: "stateless", def: "서버가 이전 요청을 기억 안 함." },
          { term: "해시(hash)", def: "되돌릴 수 없게 뭉갠 값(비번 저장)." },
          { term: "필터(filter)", def: "요청을 본 로직 전에 가로채는 관문." },
        ],
        files: ["backend/.../auth/security/JwtTokenProvider.java", "backend/.../auth/security/JwtAuthenticationFilter.java"],
        drills: [
          {
            q: "JWT vs 세션, 왜 JWT?",
            a: "서버가 상태 저장 안 해도 돼 확장 쉬움. 대신 즉시 무효화 어려움.",
            qEn: "JWT or sessions — which did you use and why?",
            aEn: "I went with JWT. The server doesn't have to store session state, so it scales out across instances easily. The trade-off is you can't instantly revoke a token — for that you'd keep expiry short or add a refresh-token flow.",
          },
          {
            q: "토큰 탈취되면?",
            a: "만료 전까진 유효. 그래서 만료 짧게 + HTTPS 필수.",
            qEn: "What happens if a token gets stolen?",
            aEn: "It's valid until it expires, which is the real risk. You mitigate it with short expiry, refresh tokens, and serving everything over HTTPS so it can't be sniffed in transit.",
          },
          {
            q: "비번은 어떻게 저장해?",
            a: "평문 X. 해시로 저장하고 입력값을 같은 방식으로 해시해 비교.",
            qEn: "How do you store passwords?",
            aEn: "Never in plain text. They're hashed with a one-way function, and at login I hash the input the same way and compare — so the original is never stored.",
          },
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
        what: "분석·채점을 AI에 시킴. 한 곳 말고 Gemini→OpenAI→Claude 순서로 폴백.",
        why: "한 곳 = SPOF(거기 죽으면 정지). 여러 곳이면 하나 죽어도 다음으로. Gemini 기본은 무료 = 비용 0.",
        tradeoff: "프로바이더마다 응답 포맷 달라 정규화 코드 필요. 복잡도↑ 대신 안정성·비용↑.",
        terms: [
          { term: "SPOF", def: "단일 장애점. 거기 죽으면 전체 죽음." },
          { term: "프롬프트", def: "AI에게 주는 지시문." },
        ],
        files: ["backend/.../analysis/infrastructure/CompositeAiClient.java (93줄)", "application.yml 의 ai.order"],
        drills: [
          {
            q: "왜 폴백을 넣었어?",
            a: "단일 프로바이더는 SPOF라 가용성 위해 순서대로 폴백.",
            qEn: "Why did you build a fallback across AI providers?",
            aEn: "A single provider is a single point of failure — if it rate-limits or goes down, the whole feature stops. So I order the providers and fall through to the next one on failure. It also lets me default to Gemini's free tier to keep costs at zero.",
          },
          {
            q: "폴백 트리거 조건은?",
            a: "(코드 확인) isConfigured()된 첫 프로바이더 + 런타임 에러 시 다음.",
            qEn: "What actually triggers the fallback?",
            aEn: "It picks the first provider that's configured, and on a runtime error it moves to the next in the order. In the code that's the composite client iterating the provider list.",
          },
          {
            q: "타임아웃·재시도·동시성은?",
            a: "없으면 솔직히: 미구현. 프로덕션이면 타임아웃+백오프+동시제한으로.",
            qEn: "How do you handle timeouts, retries, and concurrency?",
            aEn: "Honestly, for a solo project I kept it simple and didn't. In production I'd add a per-provider timeout, retries with exponential backoff, and a concurrency limit so one slow provider can't pile up requests.",
          },
          {
            q: "100배 트래픽이면 어디 터져?",
            a: "프로바이더 레이트리밋·비용. → 큐잉·캐싱·백오프.",
            qEn: "Where would this break at 100x the traffic?",
            aEn: "The provider rate limits and cost would be the first wall. I'd put a queue in front, cache repeated results, batch where I can, and back off when I hit limits.",
          },
        ],
      },
      {
        id: "sm2",
        emoji: "🔁",
        tag: "도메인 알고리즘",
        title: "SM-2 간격반복",
        what: "복습 카드를 '잊을 때쯤' 다시(Anki 방식). easiness factor로 간격 조절.",
        why: "맞히면 간격 지수로(1,3,7,14,30) 늘고, 틀리면 짧게 리셋.",
        tradeoff: "더 단순한 Leitner도 있음. SM-2는 카드별 난이도 반영해 정밀, 대신 계산 복잡.",
        terms: [
          { term: "easiness factor", def: "카드 쉬운 정도(2.5 시작, 1.3 하한)." },
          { term: "due", def: "오늘 복습할 차례 카드." },
        ],
        files: ["backend/.../review/domain/Sm2Calculator.java (56줄)"],
        drills: [
          {
            q: "SM-2가 뭐고 왜 썼어?",
            a: "간격반복 알고리즘. 잊기 직전 복습으로 효율 굳힘.",
            qEn: "Can you explain the spaced-repetition algorithm you used?",
            aEn: "It's SM-2 — the same idea Anki uses. Each card has an easiness factor, and based on how well you recall it, the next interval grows exponentially — one day, three, a week — or resets if you miss it. The point is to surface a card right before you'd forget it.",
          },
          {
            q: "'Again' 누르면 정확히 뭐가 바뀌어?",
            a: "interval이 1로 리셋, easiness factor도 약간 깎임.",
            qEn: "Concretely, what changes when a user marks a card 'Again'?",
            aEn: "The interval resets to one day so it comes back tomorrow, and the easiness factor takes a small hit so future intervals grow more slowly. I'd point to the calculator to give exact numbers.",
          },
          {
            q: "카드 수백만이면 due 쿼리 최적화는?",
            a: "dueDate 인덱스 + 유저·날짜 페이징.",
            qEn: "How would the 'due cards' query scale to millions of cards?",
            aEn: "I'd index on the due date and page by user and date, so it never does a full scan. Right now it's one user, so it doesn't matter, but that's where it'd hurt first.",
          },
        ],
      },
      {
        id: "potoken",
        emoji: "🕵️",
        tag: "사일런트 장애 디버깅",
        title: "YouTube 자막 + POToken",
        what: "데이터센터 IP에서 자막 요청 → HTTP 200인데 0바이트(침묵 실패, 디버깅 최악). 원인은 유튜브 봇 게이트, POToken 요구.",
        why: "해결: yt-dlp + bgutil POToken provider(토큰 생성 Node 서버, 4416) + deno(yt-dlp용 JS 런타임). 디바이스 자막 실패 시 백엔드 폴백.",
        tradeoff: "사이드카를 같은 컨테이너에 = 네트워킹 단순화, 대신 무거움. 유튜브가 또 막으면 유지보수 부담.",
        terms: [
          { term: "POToken", def: "유튜브 '정상 클라이언트' 증명 토큰." },
          { term: "사일런트 실패", def: "에러 없이 200+빈 데이터 = 최악의 버그." },
          { term: "사이드카", def: "메인 옆 보조 프로세스." },
        ],
        files: ["backend/Dockerfile", "backend/.../video/application/VideoImportService.java"],
        drills: [
          {
            q: "200+0바이트인데 어떻게 코드 버그 아니라 판단했어?",
            a: "요청은 성공인데 본문만 비고, 집 IP는 되고 서버 IP만 빔 → 환경(IP) 문제로 좁힘.",
            qEn: "You were getting HTTP 200 but zero bytes — how did you figure out it wasn't a code bug?",
            aEn: "That was the tricky part — it was a silent failure, the request succeeded but the body was empty. The tell was that it worked from my home IP and only failed from the datacenter IP. Same code, different network — so it wasn't the code, it was YouTube gating datacenter traffic as a bot.",
          },
          {
            q: "POToken이 정확히 뭘 해결해?",
            a: "봇으로 보고 빈 응답 주는 게이트를, 증명 토큰으로 통과.",
            qEn: "What does the POToken actually solve?",
            aEn: "YouTube treats datacenter IPs as bots and returns an empty response. The POToken is a proof-of-origin token that says the request is a legitimate client, so the caption request goes through.",
          },
          {
            q: "왜 사이드카를 같은 컨테이너 안에?",
            a: "별도 컨테이너 네트워킹 깨질 여지를 없애려고 localhost로 묶음.",
            qEn: "Why did you run the token provider in the same container instead of a separate one?",
            aEn: "To take cross-container networking out of the equation — they talk over localhost in one container, so there's no service-discovery or sidecar-networking that can silently break the token path.",
          },
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
        what: "RN = 하나의 코드로 iOS+안드 둘 다(JS/TS). Expo = RN을 쉽게(빌드·카메라·보안저장 포장).",
        why: "혼자 둘 다 빠르게. 네이티브 각각 짜면 2배.",
        tradeoff: "편하지만 극한 성능·최신 네이티브는 한계(우린 충분).",
        terms: [
          { term: "네이티브", def: "OS 전용 언어 앱(iOS=Swift, 안드=Kotlin)." },
          { term: "TanStack Query", def: "서버 데이터 fetch·캐싱·로딩/에러 자동 관리." },
          { term: "Zustand", def: "전역 상태(토큰 등) 간단 저장 라이브러리." },
        ],
        drills: [
          {
            q: "왜 React Native? 네이티브 각각 안 짜고?",
            a: "혼자 iOS+안드를 하나의 코드로. 우린 극한 성능 불필요.",
            qEn: "Why React Native instead of writing each app natively?",
            aEn: "As a solo dev, React Native lets me ship iOS and Android from one codebase instead of doing the work twice. I don't need bleeding-edge native performance here, so the trade-off is worth it.",
          },
          {
            q: "TanStack Query는 왜 써?",
            a: "fetch·캐싱·로딩/에러/재시도를 자동으로.",
            qEn: "What does TanStack Query give you?",
            aEn: "It handles all the server-data plumbing — fetching, caching, loading and error states, retries — so I'm not hand-rolling that for every screen.",
          },
        ],
      },
      {
        id: "next",
        emoji: "▲",
        tag: "웹",
        title: "Next.js",
        what: "React 기반 풀스택 웹 프레임워크. 마케팅·블로그(이 학습 페이지도!).",
        why: "React 표준급, SEO·서버렌더링 잘 됨, Vercel 배포 쉬움.",
        tradeoff: "순수 React(SPA): 단순하지만 SEO 약함. → Next = 'SEO·렌더링 강' 대신 '복잡'.",
        terms: [
          { term: "SSR", def: "화면을 서버에서 미리 그려 보냄(빠른 첫 화면·SEO)." },
          { term: "SPA", def: "브라우저에서 다 그림(SEO 약함)." },
        ],
        drills: [
          {
            q: "왜 Next.js? 그냥 React 아니고?",
            a: "SEO·서버렌더링이 필요한 마케팅/블로그라.",
            qEn: "Why Next.js rather than plain React?",
            aEn: "The marketing site and blog need SEO and server rendering, and Next does that out of the box. A plain React SPA renders everything client-side, which is weaker for search visibility.",
          },
        ],
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
        what: "Docker = 앱+환경을 상자로 포장('내 PC선 되는데' 해결). Compose = 여러 컨테이너를 파일 하나로.",
        why: "어디서든 똑같이 재현·배포. 박스 1대에 compose로 다.",
        tradeoff: "편하지만 약간 오버헤드·러닝커브.",
        terms: [
          { term: "이미지", def: "상자 설계도/스냅샷." },
          { term: "컨테이너", def: "이미지로 실제 돌아가는 인스턴스." },
        ],
        files: ["infrastructure/ncp/box/docker-compose.yml", "backend/Dockerfile"],
        drills: [
          {
            q: "Docker가 왜 필요해?",
            a: "앱+환경을 상자로 포장해 어디서든 똑같이 돌게.",
            qEn: "Why containerize with Docker?",
            aEn: "It packages the app together with its runtime and dependencies, so it runs identically on my laptop and on the server. It kills the 'works on my machine' problem.",
          },
        ],
      },
      {
        id: "caddy",
        emoji: "🔒",
        tag: "리버스 프록시 / HTTPS",
        title: "Caddy",
        what: "리버스 프록시 = 요청을 앞에서 받아 뒤 백엔드로 넘기는 문지기. Caddy = HTTPS 인증서 자동 발급·갱신.",
        why: "설정 쉽고 TLS 자동.",
        tradeoff: "Nginx: 더 범용·강력, 근데 TLS 수동. → Caddy = '쉬움·자동 TLS' 대신 '덜 범용'.",
        terms: [
          { term: "리버스 프록시", def: "요청을 앞에서 받아 뒤로 넘기는 문지기." },
          { term: "TLS/HTTPS", def: "통신 암호화." },
          { term: "인증서", def: "'이 도메인 진짜' 증명서. Let's Encrypt 무료." },
        ],
        files: ["infrastructure/ncp/box/Caddyfile"],
        drills: [
          {
            q: "Caddy가 뭘 해줘?",
            a: "앞단 문지기로 백엔드에 넘기고 HTTPS 자동.",
            qEn: "What role does Caddy play?",
            aEn: "It sits in front as a reverse proxy, routing requests to the backend, and it provisions and renews the HTTPS certificate automatically — so I get TLS for free without managing certs by hand.",
          },
        ],
      },
      {
        id: "ncp-terraform",
        emoji: "🏗️",
        tag: "클라우드 / IaC (= 센터피스)",
        title: "NCP + Terraform 마이그레이션",
        what: "클라우드 = 남의 데이터센터를 빌림. NCP = 네이버 클라우드(한국). Terraform = IaC: 인프라를 코드로 정의·생성. AWS 토론토 → NCP 서울로 이전.",
        why: "한국 타깃인데 토론토 AWS ~180ms + 월 $50–65 → 서울이면 빠르고 쌌음. Terraform = 재현·버전관리.",
        tradeoff: "단일 박스 = SPOF. 로컬 state = 팀 협업 약함. → '비용·레이턴시·재현성' 대신 '단일 박스 위험·러닝커브'.",
        terms: [
          { term: "IaC", def: "인프라를 코드로 정의·생성." },
          { term: "레이턴시", def: "요청-응답 지연(ms). 토론토→한국 ~180ms." },
          { term: "리전", def: "데이터센터 위치. 가까울수록 빠름." },
        ],
        files: ["infrastructure/ncp/*.tf", "content/logs/.../aws-to-ncp-seoul-migration.mdx"],
        drills: [
          {
            q: "왜 AWS 서울 리전 대신 NCP?",
            a: "(네 진짜 이유) 한국 타깃이라 한국 클라우드로 비용·레이턴시 잡으려.",
            qEn: "Why migrate to NCP instead of just using AWS's Seoul region?",
            aEn: "The product targets Korea, and from a Korean cloud I got both lower latency and meaningfully lower cost. I'd be honest in an interview — part of it was practical, like billing and the accounts I already had — but the core reason was matching the infra to where the users are.",
          },
          {
            q: "단일 박스의 위험은? 대비?",
            a: "SPOF. 트래픽 늘면 백엔드/DB 분리·매니지드 DB·다중화.",
            qEn: "A single box is a single point of failure — how would you address that?",
            aEn: "Right now it's one box because there's one user, so I'm not over-investing. As traffic grows I'd split the backend and the database out, move to a managed Postgres, and run multiple instances behind a load balancer.",
          },
          {
            q: "마이그레이션 중 다운타임 0은 어떻게?",
            a: "새 박스 띄워 헬스체크 확인 후 DNS 컷오버, 옛 인프라 폐기.",
            qEn: "How did you keep downtime near zero during the migration?",
            aEn: "I stood up the new box in parallel, verified it was healthy, then cut the DNS over to it. Only after traffic had drained off the old setup did I tear it down.",
          },
          {
            q: "Terraform 로컬 state 한계는?",
            a: "동시 적용 시 충돌·잠금. 팀이면 원격 state(S3+lock).",
            qEn: "What's the limitation of using local Terraform state?",
            aEn: "With local state, two people applying at once can clobber each other — there's no locking. For a team I'd move it to remote state with locking, like S3 plus DynamoDB.",
          },
        ],
      },
      {
        id: "cloudflare",
        emoji: "🌐",
        tag: "DNS / 스토리지",
        title: "Cloudflare + R2",
        what: "DNS = 도메인을 IP로 바꾸는 전화번호부. Cloudflare = DNS+보안+CDN. R2 = 파일저장소(S3 호환), DB 백업 보관.",
        why: "무료·빠름·DDoS 방어. R2는 S3 호환이라 표준 도구로.",
        tradeoff: "벤더 종속 약간. 근데 무료·표준 호환 이점 큼.",
        terms: [
          { term: "DNS", def: "도메인↔IP 변환." },
          { term: "CDN", def: "정적 파일을 전세계 캐시로 빨리." },
          { term: "S3/R2", def: "파일 저장소(S3)/호환(R2)." },
        ],
        drills: [
          {
            q: "DNS가 뭐야?",
            a: "도메인(mimi.daeseon.ai)을 IP로 바꿔주는 전화번호부.",
            qEn: "What is DNS, in one line?",
            aEn: "It's the phone book of the internet — it translates a human domain like mimi.daeseon.ai into the server's IP address.",
          },
        ],
      },
    ],
  },
];

export const GLOSSARY: Term[] = [
  { term: "API", def: "프론트-백엔드 대화 규격." },
  { term: "REST", def: "API를 HTTP 주소+동사로." },
  { term: "stateless", def: "서버가 이전 요청 기억 안 함." },
  { term: "SPOF", def: "단일 장애점." },
  { term: "SSR / SPA", def: "서버 렌더 / 브라우저 렌더." },
  { term: "DI", def: "의존성 주입. 교체·테스트 쉬움." },
  { term: "ORM", def: "객체↔DB 표 자동 번역." },
  { term: "N+1", def: "1번이면 될 쿼리를 N번 더." },
  { term: "JWT", def: "서명된 출입증 토큰." },
  { term: "hash", def: "되돌릴 수 없게 뭉갠 값." },
  { term: "filter", def: "요청 가로채는 관문." },
  { term: "rate limit", def: "횟수 제한(공격 차단)." },
  { term: "container / image", def: "포장상자 / 설계도." },
  { term: "reverse proxy", def: "앞단 문지기." },
  { term: "TLS / HTTPS", def: "통신 암호화." },
  { term: "IaC", def: "인프라를 코드로." },
  { term: "latency", def: "요청-응답 지연(ms)." },
  { term: "region", def: "데이터센터 위치." },
  { term: "DNS", def: "도메인↔IP." },
  { term: "CDN", def: "전세계 캐시 전달." },
  { term: "S3 / R2", def: "파일 저장소." },
  { term: "STT", def: "음성→글자." },
  { term: "POToken", def: "유튜브 정상클라이언트 증명 토큰." },
  { term: "sidecar", def: "메인 옆 보조 프로세스." },
];
