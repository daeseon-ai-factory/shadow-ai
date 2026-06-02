<div align="center">

# Mimi · 미미

**유튜브 영상을 영어 쉐도잉으로 — 그리고 매일 막히는 문법 패턴·콜로케이션·전치사를 간격 반복으로 단련하는 풀스택 학습 앱.**

<sub>영어를 *읽는* 건 되는데 막상 *말·쓰기* 에서 얼어붙는 개발자를 위해.</sub>

[← English README](./README.md) · **한국어**

[**🌐 프론트엔드 → mimi.daeseon.ai**](https://mimi.daeseon.ai) &nbsp;·&nbsp; [**📓 빌드 로그 → daeseon.ai/projects/shadow-ai**](https://daeseon.ai/projects/shadow-ai)

![Java 21](https://img.shields.io/badge/Java-21-007396?logo=openjdk&logoColor=white)
![Spring Boot 3.3](https://img.shields.io/badge/Spring%20Boot-3.3-6DB33F?logo=springboot&logoColor=white)
![Next.js 16](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![PostgreSQL 16](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow)

</div>

> *영문이 메인입니다. 이 문서는 한국어 번역본이에요. · English is the primary README; this is the Korean translation.*

---

> **한 줄 요약.** 솔로로 만든 풀스택 영어 학습 앱 — Java/Spring Boot API + Next.js/TypeScript 프론트. **서로를 먹여주는 두 반쪽** 으로 이뤄집니다: (1) *유튜브 쉐도잉* — 자막 구간을 클립하면 LLM 한 번 호출로 번역·직독직해·어휘·전치사별 노트·연습 시나리오가 나오고(JSONB 캐시 → 복습은 재과금 0), **SM-2** 간격 반복이 일정을 잡습니다; (2) *Practice 허브* — 문장 패턴 82개, 콜로케이션 101개, 움직이는 전치사 다이어그램, **AI 영작 채점**, 약점 대시보드를 **Leitner** 간격 반복으로 매일 단련. LLM(Gemini↔Claude)과 녹음 스토리지(로컬↔S3/R2)는 **환경변수만으로** 전환됩니다. 우선순위 코드 감사(7배치)로 하든잉했고, 콘텐츠는 **정확도 감사**, Testcontainers + Vitest + Playwright로 검증.

## 목차

- [미미란?](#미미란)
- [이 프로젝트가 보여주는 것](#이-프로젝트가-보여주는-것)
- [제품 둘러보기](#제품-둘러보기)
- [기술 스택](#기술-스택)
- [아키텍처](#아키텍처)
- [보안과 프라이버시](#보안과-프라이버시)
- [데이터 모델과 API](#데이터-모델과-api)
- [로컬에서 실행](#로컬에서-실행)
- [배포](#배포)
- [테스트](#테스트)
- [엔지니어링 기록](#엔지니어링-기록)
- [솔직한 한계](#솔직한-한계)
- [프로젝트 구조](#프로젝트-구조)

---

## 미미란?

개발자는 하루 종일 영어 문서를 읽으면서도 막상 *말하거나 쓸* 때 얼어붙습니다. 미미는 이미 소비하는 입력(유튜브)을 피하던 출력 연습으로 바꾸고, 자동으로 안 나오는 것들(전치사·고정 청크·문장 틀)을 매일 단련합니다.

핵심 명제는 **기능 개수가 아니라 마찰 제거** 입니다: 입력 → 출력 → 반복, 언어 습득 연구가 실제로 지지하는 루프. 발음 채점도, AI 작문 첨삭도, 소셜 피드도 없습니다.

---

## 이 프로젝트가 보여주는 것

> *바쁜 리뷰어를 위해 — 이 저장소가 보여주는 엔지니어링.*

- **🔀 환경변수로 갈리는 provider·스토리지.** *같은 코드* 가 로컬에서 동작하고 **환경변수별** 로 실제 인프라로 전환 — `tubeshadow.ai.provider` 로 Gemini/Claude 선택(`@ConditionalOnProperty`, 호출부 변경 0), `RECORDING_STORAGE` 로 로컬 디스크/S3·R2 선택(바이트는 백엔드가 스트리밍, 소유자 게이트). 재빌드 없이 경계 한 곳에서 결정.
- **⚙️ 트랜잭션-세이프 비동기 AI 파이프라인.** 클립 생성이 도메인 이벤트 발행 → 분석은 `@TransactionalEventListener(AFTER_COMMIT)` + `@Async` 로 백그라운드 실행 → 수 초짜리 LLM HTTP 호출이 **DB 트랜잭션 바깥**에서 돌아 커넥션을 점유하지 않음. 작은 `PENDING → READY/FAILED` 쓰기만 트랜잭셔널. 일시 장애(429/5xx/타임아웃)는 재시도, 영구 오류는 즉시 실패.
- **🧮 grading 형태에 맞춘 2개 SRS.** 클립 복습은 **SM-2**(Again/Hard/Good/Easy), 드릴은 이진(맞음/다시)이라 SM-2의 0–5 척도를 두 버튼에 욱여넣는 건 틀린 도구 → **Leitner 박스** 사용. 둘 다 I/O 없는 순수함수.
- **💸 한계비용 $0 + 남용 가드.** 클립당 LLM 호출 정확히 1번, JSONB 캐시 → 이후 복습·퀴즈는 캐시 읽기. 돈이 드는 유일한 인증 엔드포인트(AI 영작 채점)는 **유저별 rate limit** — 가입/로그인의 IP 기반 리미터와 별개.
- **🔐 멀티테넌트 안전.** 무상태 JWT(HS256) + **토큰 버전 폐기**(비번 변경 시 옛 토큰 무효), BCrypt 해싱, 쿼리 계층 유저 격리(`findByIdAndUserId`), **공개 URL로 안 나가는** 접근통제 녹음(바이트는 백엔드가 스트리밍).
- **📈 관측성.** MDC 구조화 로그(요청 id + 유저 id) + Micrometer/Actuator → Prometheus(`/actuator/prometheus`), 커스텀 AI 경로 타이밍 포함.
- **🧭 결정은 기록으로.** 사소하지 않은 수정·결정마다 문제 인덱스 트러블슈팅 + 날짜별 서사([daeseon.ai 타임라인](https://daeseon.ai/projects/shadow-ai))에 이중 기록 — 실제 에러 원문·검증 원인·커밋 후 해시.
- **🌏 한/영 이중언어** UI(SSR + 경로 라우팅) + 엄격한 **콘텐츠 정확도 감사** — 모든 드릴 cue·모델을 머지 전 검수(학습 도구에선 틀린 예시가 없느니만 못함).

---

## 제품 둘러보기

| 흐름 | 동작 |
|---|---|
| **로그인** | 이메일/비번 + JWT, 첫날부터 유저별 데이터. |
| **임포트** | 유튜브 URL → 메타(oEmbed) + 자막(`yt-dlp`); 재임포트 시 누락 자막 자가복구. |
| **클립** | 자막 클릭 또는 시작/끝으로 구간 선택, 자동 자막 슬라이스, 루프 + 0.5–1.5배속, 블라인드 모드(전체/첫글자/가림), 오디오 전용. |
| **AI 분석** | LLM 1회 → 번역 + 직독직해 + 어휘 + 전치사별 노트 + 시나리오, JSONB 캐시. |
| **복습** | SM-2 큐, 3모드: *공개* · *영작*(한글 프롬프트→영어, 토큰 diff) · *상황*(AI 상황→응답). |
| **Practice — 패턴** | 문장 틀 82개 / 246 say-it-aloud 항목("as" 패밀리·관계절·간접의문문·가정법·동사패턴…). |
| **Practice — 콜로케이션** | 단어+전치사 청크 101개, 일반 / 개발·IT 필터. |
| **Practice — 전치사** | 의미별 움직이는 SMIL 다이어그램 + 빈칸 드릴 + 내 클립에서 캔 전치사. |
| **Practice — 영작** | 타깃으로 내 문장 작성 → AI가 정확성·타깃 사용 여부·더 나은 버전 채점. |
| **Practice — 약점** | 데일리 채점 데이터에서 자주 틀린 카드 추출 + 본/틀림/마스터 통계. |
| **드릴 엔진** | 카드별 Leitner SRS 박스(계정 저장), 공유 데일리 스트릭, 모델 문장 음성 재생(Web Speech). |
| **녹음 + A/B** | 직접 녹음 후 "원본 → 나" 연속 재생. |
| **덱 & 플레이리스트** | Anki식 그룹(덱 삭제해도 클립은 Inbox로); 덱 전체 자동 재생. |
| **BYOAI** | 분석 프롬프트를 본인 ChatGPT/Claude/Gemini로 전송 — 앱 비용 0. |

---

## 기술 스택

| 영역 | 선택 |
|---|---|
| **백엔드** | Java 21 · Spring Boot 3.3.5 · Gradle(Kotlin DSL) · Spring Security + JWT(HS256) · Spring Data JPA |
| **DB** | PostgreSQL 16 · Flyway(17 마이그레이션) · 원시 SQL `CHECK` 제약 + JPA 매핑 |
| **비동기 / 회복탄력** | `@TransactionalEventListener(AFTER_COMMIT)` + `@Async` 제한 풀 · 429/5xx/타임아웃 재시도 |
| **AI** | `AiAnalysisClient` 인터페이스 → Gemini 2.5 Flash(기본, 무료티어) **또는** Claude Haiku 4.5, `@ConditionalOnProperty` 런타임 선택 |
| **오브젝트 스토리지** | 로컬 디스크(dev) ↔ S3 / Cloudflare R2(prod) — 백엔드가 스트리밍(소유자 게이트), 환경변수로 갈림 |
| **관측성** | Micrometer + Spring Actuator → Prometheus · MDC 요청/유저 로깅 |
| **미디어** | `yt-dlp` 서브프로세스(자막 + `-J` 프로브) · `MediaRecorder` 캡처 + codec 파라미터 허용 MIME 처리 |
| **프론트엔드** | Next.js 16(App Router) · React 19 · TypeScript(strict) · Tailwind CSS v4 · shadcn/ui · Zustand · TanStack Query · next-intl |
| **드릴** | 정적 타입 콘텐츠 + Leitner SRS · Web Speech API(TTS) · 움직이는 SMIL 전치사 다이어그램 |
| **인프라 / 배포** | Docker(멀티스테이지 + ffmpeg/yt-dlp) · GitHub Actions CI(lint·test) + **키리스 OIDC** 배포(AWS ECS Fargate + RDS) · Vercel(프론트) · 문서화된 PaaS 경로 |
| **i18n** | `en`(기본) · `ko`(완역) · `ja`/`zh`/`es` 스캐폴드 · 쿠키/경로 로케일 + SSR |

---

## 아키텍처

기능 단위 백엔드, 경계에서 갈리는 외부 의존. 8개 바운디드 컨텍스트(`auth`·`video`·`clip`·`analysis`·`recording`·`review`·`deck`·`practice`) + 공용 `common`. 외부 의존은 코드 곳곳이 아니라 경계 한 곳에서 결정됩니다.

```
브라우저 (Next.js, Vercel) ──JWT (Authorization)──▶ Spring Boot (8 bounded contexts)
                                                       │
   clip 생성 ──▶ ApplicationEvent                       │
        │                                              ├─▶ PostgreSQL 16
   @TransactionalEventListener(AFTER_COMMIT) + @Async  │     users · videos · clips(transcript)
        │   (트랜잭션 바깥에서 실행)                       │     clip_analyses (JSONB 캐시)
        ▼                                              │     review_items(SM-2) · decks · collections
   AiAnalysisClient ── ai.provider? ─▶ Gemini (무료)   │     recordings · practice_progress(streak)
        │              └─ else ──────▶ Claude          │     practice_card (Leitner SRS)
        ▼   (클립당 1회 → JSONB 캐시)                    │
   ClipAnalysis: PENDING → READY / FAILED              ├─▶ 녹음 스토리지
                                                       │     RECORDING_STORAGE? ─▶ S3/R2 스트리밍 (prod)
                                                       │                       └─▶ 로컬 디스크 (dev)
                                                       └─▶ 관측성: MDC 로그 · Micrometer → Prometheus
```

**핵심 결정**

- **비싼 호출이 커넥션을 안 쥠.** 분석은 커밋 후 이벤트 기반, LLM HTTP 호출은 DB 트랜잭션 완전 바깥 → 느리거나 throttle된 provider가 커넥션 풀을 고갈시킬 수 없음.
- **LLM 추상화 1개, 두 기능 재사용.** `analyzeClip()` 이 클립 분석을, *같은* 인터페이스에 추가한 저수준 `complete()` 가 AI 영작 채점을 담당 — 별도 클라이언트 없음, 분석 스키마 결합 없음.
- **환경변수로 갈리고 지연 연결.** provider·스토리지는 설정으로 전환, prod 전용 드라이버(S3 SDK)는 그 경계 뒤에 있어 dev는 가벼움.
- **위협모델별 리미터 2개.** `AuthRateLimitFilter`(IP, 가입/로그인 — 크리덴셜 스터핑), `ComposeRateLimitInterceptor`(유저, AI 엔드포인트 — 비용/남용).

더 긴 설명: [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## 보안과 프라이버시

우선순위 코드 감사가 **7개 하든잉 배치** 를 이끌었습니다(안전/정확성·퀵윈·고임팩트·관측성·테스트·아키텍처 리팩터·문서). 주요 통제(전부 소스로 검증):

| 항목 | 구현 |
|---|---|
| **인증** | 무상태 JWT(HS256) + 매 요청 DB와 `token_version` 대조 → 비번 변경 시 옛 토큰 전부 폐기. |
| **데이터 격리** | 모든 유저 범위 조회가 `findByIdAndUserId(...)` — 남의 id는 `404`, 남의 행 노출 0. |
| **미디어 접근** | 녹음은 공개 안 됨. 라우트가 세션(`401`) + 소유권(`403`) 이중 게이트 후 **백엔드가 바이트를 스트리밍**(`InputStreamResource`; dev는 로컬 디스크, prod는 S3/R2) — 공개 URL 없음. |
| **업로드 MIME** | `MediaRecorder` 가 `audio/webm;codecs=opus` 로 태깅 → 업로드 검사는 **base 타입**(파라미터 제거)으로 화이트리스트 대조. |
| **레이트리밋** | 인증은 IP(고정 윈도우), AI 영작 엔드포인트는 유저별 — 고정 윈도우 인터셉터, `429 RATE_LIMITED`. |
| **비밀번호** | BCrypt 해싱(`BCryptPasswordEncoder`). |
| **CORS** | `CorsConfigurationSource` 가 배포 프론트 출처(`mimi.daeseon.ai`, Vercel 프리뷰)로 한정. |
| **내 데이터** | 저장 클립 JSON 내보내기; 클립·녹음 삭제 시 바이트 실제 제거(`@Modifying` 삭제로 세션 캐시 우회 → `StaleObjectStateException` 회피). |

---

## 데이터 모델과 API

**11개 테이블** (`backend/.../db/migration`, Flyway 부트스트랩): `users` · `videos` · `clips`(transcript + note) · `clip_analyses`(JSONB 분석 캐시: 번역·직독직해·어휘·전치사노트·시나리오) · `recordings` · `review_items`(SM-2: easiness·interval·repetitions·due_date) · `collections` · `collection_videos` · `decks` · `practice_progress`(스트릭/횟수, 유저당 1행) · `practice_card`(드릴 카드별 Leitner 박스).

값 제약(분석 상태·아이템 타입 등)은 **원시 SQL `CHECK`** + 컴파일타임 타입으로 강제.

**API 표면** (`backend/.../api`, 전부 `ApiResponse<T>` 래핑, `@CurrentUser` 로 principal 해석):

```
Auth            POST /api/auth/{signup,login} · GET·PATCH /api/auth/me · POST /api/auth/me/password
Videos          POST /api/videos/import · GET /api/videos/{id}
Clips           POST·GET /api/clips · GET /api/clips/tags · GET·PATCH·DELETE /api/clips/{id}
                GET /api/clips/export · GET /api/clips/{clipId}/analysis · POST .../analysis/regenerate
Recordings      POST /api/clips/{clipId}/recordings · GET .../recordings · GET·DELETE /api/recordings/{id}/audio
Review (SM-2)   GET /api/review/queue · POST /api/review/items/{id}/respond · GET /api/review/streak
Practice        GET /api/practice/progress · POST /api/practice/rep
                GET /api/practice/srs · POST /api/practice/srs/grade · POST /api/practice/compose/check
Prepositions    GET /api/prepositions/mined
Decks           POST·GET /api/decks · PATCH·DELETE /api/decks/{deckId} · PATCH /api/decks/clips/{clipId}
Collections     GET /api/collections · GET /api/collections/{idOrSlug}
Health          GET /api/health
```

---

## 로컬에서 실행

필요: **Docker · Java 21 · Node 22+**(Next.js 16은 Node 22 필요).

```bash
# 1. PostgreSQL (5434 포트)
docker compose up -d

# 2. 백엔드 → http://localhost:8080   (JAVA_HOME 은 JDK 21 가리켜야 함)
cd backend
cp ../.env.example ../.env          # JWT 시크릿; LLM API 키는 선택
./gradlew bootRun

# 3. 프론트엔드 → http://localhost:3100
cd frontend
npm install
npm run dev
```

핵심 흐름(임포트 → 클립 → 복습 → 녹음)과 모든 Practice 드릴은 **API 키 없이** 동작합니다. AI 분석·영작 채점만 `.env` 에 Gemini/Claude 키 필요. 한 방에 전체 스택(DB + JVM 디버그 포트 백엔드 + 프론트): `docker compose -f docker-compose.dev.yml up`.

---

## 배포

지원 모델 둘 — 같은 이미지/앱이 양쪽에 적응합니다.

**1) 서버리스 — Vercel + AWS** *(라이브 배포 대상)*
프론트는 Vercel(`mimi.daeseon.ai`); 백엔드 컨테이너는 ALB 뒤 **AWS ECS Fargate**; **RDS PostgreSQL**(ca-central-1); 녹음은 **S3**(비공개 버킷, 백엔드 스트리밍). CI/CD는 **키리스**: GitHub Actions가 **OIDC** 로 IAM 롤 assume(`deploy.yml`) → ECR 빌드·푸시 → ECS 서비스 롤링. 첫 세팅 단계별 런북은 [`infrastructure/aws-bootstrap.md`](./infrastructure/aws-bootstrap.md), 태스크 정의는 [`infrastructure/ecs-task-definition.json`](./infrastructure/ecs-task-definition.json).

**2) 영속 호스트 — Render / Fly / VM**
멀티스테이지 **Dockerfile**(JRE + `yt-dlp` + ffmpeg)이 PaaS 주입용 `PORT` 를 읽어 어디서든 동작; 매니지드 Postgres + S3/R2와 짝지으면 됩니다.

---

## 테스트

```bash
cd backend  && JAVA_HOME=<jdk21> ./gradlew test   # 26 클래스 — JUnit 5 + Testcontainers (실 PostgreSQL)
cd frontend && npm test                            # Vitest 단위(SRS 세션 로직 포함)
cd e2e      && npx playwright test                 # 14 스펙(인증·클립·퀴즈·덱·i18n·BYOAI·모바일…)
```

- **백엔드** — 도메인 로직(SM-2·Leitner·문장 병합)은 순수함수 단위 테스트; 컨트롤러/서비스는 매 실행마다 실 PostgreSQL에 대한 **Testcontainers** 통합(스키마가 JSONB + `CHECK` 라 H2로 에뮬 불가). AI 영작 경로는 Mockito 테스트(파싱/미설정/오류), happy path는 실 키 필요.
- **프론트** — API 클라이언트 + 순수 SRS 세션 빌더 Vitest, **Playwright 14** E2E.
- **CI** — `.github/workflows/ci.yml` 이 매 푸시 lint + test, `deploy.yml` 이 OIDC로 백엔드 이미지 AWS 배포.

---

## 엔지니어링 기록

이 저장소는 안티-할루시네이션 규칙으로 기록합니다 — 사소하지 않은 수정·결정은 **이중 기록**(실제 에러 원문·검증 원인·커밋 후 해시).

- [`docs/troubleshooting.md`](./docs/troubleshooting.md) — `timedtext` 토큰 만료→`yt-dlp`, 캐스케이드 삭제 `StaleObjectStateException`, `Filter`→`HandlerInterceptor` 자동등록 함정, 크롬 415 codec MIME, Gemini thinking-token 절단, README/ROADMAP 드리프트, AI 작성 콘텐츠 뉘앙스 오류, 스키마 필드 프로즈 주입 버그, JDK 11 vs 21 gradle 함정, CI lint vs build 갭, prod Dockerfile yt-dlp 드리프트, 크로스-repo README 복붙 드리프트.
- [`content/logs/shadow-ai/`](./content/logs/shadow-ai/) — 날짜별 서사(daeseon.ai가 실시간 수집): 문법 커리큘럼, 콜로케이션 청크 드릴, Practice 허브, 계정 저장 스트릭, Leitner SRS, AI 영작 모드, 한 글 [프로젝트 쇼케이스](https://daeseon.ai/projects/shadow-ai).
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) · [`DEVOPS.md`](./DEVOPS.md) · [`HANDBOOK.md`](./HANDBOOK.md) · [`PROJECT_SUMMARY.md`](./PROJECT_SUMMARY.md) — 더 긴 레퍼런스.

---

## 솔직한 한계

> 한계를 아는 것도 엔지니어링의 일부라 분명히 적습니다.

- **솔로·AI 보조.** Claude Code를 페어로 빌드. 제품 방향, 아키텍처(provider 추상화·트랜잭션-세이프 비동기 파이프라인·2개 SRS 분리), 프롬프트 설계, 테스트/콘텐츠 감사 전략은 내 것.
- **rate-limit·멱등성은 인메모리** — 단일 인스턴스 전제, 다중 인스턴스는 영속 저장소(Redis) 필요.
- **`ja`/`zh`/`es` 로케일은 스캐폴드**(영어 문자열), `en`·`ko` 만 완역.
- **AWS 인프라는 런북 + 태스크 정의, 아직 Terraform 아님** — IaC가 명백한 다음 단계(apply→destroy 반복도 싸짐).
- **`yt-dlp` 캐비엇.** 자막/메타 추출에 `yt-dlp` 사용, 유튜브 ToS 회색지대 — 개인용엔 적절, 공개/상업 배포 전 재검토.

---

## 프로젝트 구조

```
backend/                Spring Boot — 8 바운디드 컨텍스트 + common, 17 Flyway 마이그레이션
  com/tubeshadow/
    auth/               JWT + 토큰버전 폐기 · @CurrentUser 리졸버 · IP 리미터
    video/ clip/        유튜브 임포트(yt-dlp) · 클립 · 자막 · 노트 · 덱 · 내보내기
    analysis/           AiAnalysisClient(Gemini/Claude) · 비동기 파이프라인 · 프롬프트+파서 · 재시도
    recording/          로컬↔S3 스토리지(환경변수) · 스트리밍 오디오 라우트
    review/             SM-2 스케줄러(순수) · 3 퀴즈 모드
    practice/           Leitner SRS · 스트릭 · 콜로케이션/패턴/전치사 · AI 영작 + 유저 리미터
    common/             ApiResponse · 예외 · WebMvc/async/S3 설정 · MDC 로깅
frontend/               Next.js 16 App Router · 5-로케일 i18n · shadcn/ui
  app/[locale]/(app)/   library · player · review · import · discover · prepositions
                        practice · patterns · collocations · compose · weak · settings
  lib/                  api 클라이언트 · practice-srs(세션 빌더) · 스토어 · 훅
e2e/                    Playwright 스펙 (14)
infrastructure/         AWS ECS 태스크 정의 + 첫 세팅 런북
docs/                   트러블슈팅 로그 (문제 → 원인 → 수정 → 커밋)
content/logs/           날짜별 빌드 로그 (daeseon.ai가 실시간 수집)
```

---

<div align="center">

**[Mimi · 미미](https://mimi.daeseon.ai)** — 입력 → 출력 → 반복. 기능이 아니라 마찰을 줄이려 만들었습니다.

<sub>저장소: [Daeseon-AI-Factory/shadow-ai](https://github.com/Daeseon-AI-Factory/shadow-ai) · 빌드 로그: [daeseon.ai/projects/shadow-ai](https://daeseon.ai/projects/shadow-ai) · [English README](./README.md)</sub>

## License

MIT

</div>
