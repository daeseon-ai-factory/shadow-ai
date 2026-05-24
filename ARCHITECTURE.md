# TubeShadow 아키텍처

> 시스템 디자인 학습용 + 향후 확장 의사결정 근거 문서.
> 마지막 갱신: 2026-05-24

이 문서는 **왜 이렇게 만들었는가**에 집중합니다. "어떻게 쓰는가"는 README.md를, "무엇이 들어갔는가"는 PROGRESS.md를 참조하세요.

---

## 0. 한눈에

```
┌──────────────────────────────────────────────────────────────────────┐
│                          End User Browser                            │
│                                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────────┐    │
│  │  Pages   │→ │ Zustand  │  │ TanStack │  │ MediaRecorder /    │    │
│  │  (RSC +  │  │ Auth     │  │ Query    │  │ YouTube IFrame API │    │
│  │  Client) │  │ Store    │  │ Cache    │  │ (browser only)     │    │
│  └──────────┘  └──────────┘  └──────────┘  └────────────────────┘    │
│        │           │ token       │ HTTP+JSON                         │
└────────┼───────────┼─────────────┼────────────────────────────────────┘
         │           │             │
         └───────────┴─────────────┴────  Bearer Authorization header
                                   │
            ┌──────────────────────▼─────────────────────────────────┐
            │   Spring Boot Backend  ──  api.tubeshadow.app          │
            │                                                        │
            │  ┌────────────┐  ┌───────────────┐  ┌──────────────┐   │
            │  │  Security  │→ │ HandlerMethod │→ │ @RestCtrl    │   │
            │  │  Filter    │  │ Interceptor   │  │ (DTO ↔ JSON) │   │
            │  │  (JWT)     │  │ (rate limit)  │  │              │   │
            │  └────────────┘  └───────────────┘  └──────┬───────┘   │
            │                                            │           │
            │  ┌─────────────────────────────────────────▼───────┐   │
            │  │  Application Services (transaction boundary)    │   │
            │  │  AuthService · ClipService · RecordingService   │   │
            │  │  ReviewService · ClipAnalysisService · ...      │   │
            │  └────┬────────────────┬────────────────┬──────────┘   │
            │       │ JPA            │ events         │ HTTP         │
            │  ┌────▼─────┐   ┌──────▼───────┐  ┌─────▼──────────┐   │
            │  │ Postgres │   │  Spring      │  │ External APIs  │   │
            │  │ + Flyway │   │  Event Bus   │  │  (Claude,      │   │
            │  │ (JSONB)  │   │  (in-process)│  │   YouTube)     │   │
            │  └──────────┘   └──────────────┘  └────────────────┘   │
            │                                                        │
            │  ┌─────────────────────────────────────────────────┐   │
            │  │  Local File Storage (RecordingStorage iface)    │   │
            │  │  → S3 swap-in point                             │   │
            │  └─────────────────────────────────────────────────┘   │
            └────────────────────────────────────────────────────────┘
```

핵심 사실 5개:
1. **모노리스** — 단일 Spring Boot + 단일 Next.js. v0에서 분리할 이유 없음.
2. **JWT stateless 인증** — 서버 세션 없음. 수평 확장은 무상태 백엔드 + Postgres만 공유.
3. **인-프로세스 이벤트 버스** — Kafka/RabbitMQ 없음. `ApplicationEventPublisher`로 충분. 분리 필요해질 때 인터페이스 그대로 교체 가능.
4. **트랜잭션은 짧게, 네트워크는 트랜잭션 밖에서** — Claude API 호출은 절대 `@Transactional` 안에서 일어나지 않음.
5. **저장소는 인터페이스 뒤** — 녹음 파일은 로컬 FS지만 `RecordingStorage` 인터페이스로 추상화 → S3 교체 1일.

---

## 1. Context (C4 Lv1)

```
                 ┌─────────────────┐
                 │   YouTube       │ oEmbed (메타데이터)
                 │   (3rd party)   │ watch HTML + json3 (자막, 비공식)
                 └────────▲────────┘
                          │ HTTPS GET (RestClient)
                          │
   ┌────────┐   HTTPS    ┌┴────────┐    HTTPS    ┌──────────────┐
   │ End    │◀─────────▶│ TubeShadow│──────────▶│  Anthropic   │
   │ User   │           │ (this)    │           │  Claude API  │
   │ (web)  │           │           │           │  (Haiku 4.5) │
   └────────┘           └───────────┘           └──────────────┘
                              │
                              │ JDBC
                              ▼
                       ┌─────────────┐
                       │ PostgreSQL  │
                       └─────────────┘
```

**외부 의존성과 fallback:**

| 의존성 | 무엇 | 실패 시 동작 |
|--------|------|---------------|
| YouTube oEmbed | 영상 메타데이터 | 502 BAD_GATEWAY (사용자에게 에러) |
| YouTube watch HTML + json3 | 자막 (비공식) | `transcript_status=UNAVAILABLE`로 마킹하고 영상은 저장. 클립은 자막 없이 만들 수 있음 |
| Claude Messages API | AI 분석 | `ClipAnalysis.status=FAILED` + errorMessage. 사용자는 "다시 분석" 버튼으로 재시도 |
| PostgreSQL | 전부 | 백엔드 startup 실패. 헬스체크로 LB가 트래픽 차단 |

→ **한 외부 의존성이 죽어도 시스템이 죽지 않는다**가 설계 원칙.

---

## 2. Containers (C4 Lv2)

```
┌─────────────────────────────────────────────────────────────────────┐
│                       Browser (Chrome/Safari/Firefox)               │
│                                                                     │
│  Next.js 16 App (SSR + Client)                                      │
│    • RSC for first paint                                            │
│    • Zustand for auth state (localStorage 영속)                     │
│    • TanStack Query for server state cache + invalidation           │
│    • shadcn/ui (Tailwind + base-ui primitives)                      │
│    • Browser APIs: YouTube IFrame Player, MediaRecorder             │
└─────────────────────────────────────────────────────────────────────┘
                              │ HTTPS JSON (Bearer)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Spring Boot 3.3 (Java 21)                     │
│                                                                     │
│  • spring-boot-starter-web (Tomcat embedded)                        │
│  • spring-boot-starter-data-jpa (Hibernate 6.5)                     │
│  • spring-boot-starter-security                                     │
│  • springdoc-openapi (Swagger UI)                                   │
│  • jjwt 0.12                                                        │
│  • flyway 10.10 (db/migration)                                      │
│  • Jackson w/ JavaTimeModule + jackson-dataformat-yaml              │
│                                                                     │
│  Profiles: dev | prod | test | integ                                │
│  Health: /api/health  ·  OpenAPI: /v3/api-docs                      │
│  Container: temurin:21 jre-alpine, non-root, HEALTHCHECK            │
└─────────────────────────────────────────────────────────────────────┘
                              │ JDBC
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       PostgreSQL 16                                 │
│                                                                     │
│  Schema: 8 Flyway migrations (V1~V8)                                │
│  JSONB columns: video.transcript_segments, clip.tags,               │
│                 clip_analyses의 3개 리스트                          │
│  Indexes: user_id, video_id, GIN on JSONB tags                      │
│  FK: ON DELETE CASCADE 전 도메인                                    │
└─────────────────────────────────────────────────────────────────────┘
```

**왜 모노리스인가?**
- 사용자 수 1000명까지 단일 인스턴스로 충분 (Spring Boot 1 vCPU/512MB로 ~200 RPS)
- 도메인 6개 — auth, video, clip, analysis, recording, review — 가 모두 한 트랜잭션 안에서 자주 협업 (예: 클립 생성 시 transcript slice + event publish)
- 마이크로서비스 분리는 *팀이 분리될 때* 정당화됨. 1인 프로젝트엔 비용만 큼.

**Next.js를 분리해 둔 이유:**
- 정적 호스팅(Vercel CDN)으로 가까운 엣지에서 첫 페인트
- 서버 컴포넌트 vs 클라이언트 컴포넌트 경계가 명확해짐 (`"use client"` 단위)
- 미디어 API(YouTube IFrame, MediaRecorder)는 브라우저 전용이라 SSR 부담 없음

---

## 3. Components (C4 Lv3, 백엔드)

```
com.tubeshadow
├── common/                ← 횡단 관심사
│   ├── domain/BaseEntity            (createdAt/updatedAt, JPA Auditing)
│   ├── web/ApiResponse              ({data, error, timestamp} 통일 봉투)
│   ├── web/GlobalExceptionHandler   (RestControllerAdvice; 모든 예외 → ApiResponse)
│   ├── exception/BusinessException  (Strategy 패턴: 상속으로 status 표현)
│   └── config/{WebMvcConfig,OpenApiConfig,JpaAuditingConfig,CorsProperties}
│
├── auth/                  ← 인증 + 사용자
│   ├── domain/User
│   ├── repository/UserRepository
│   ├── security/{JwtTokenProvider, JwtAuthenticationFilter,
│   │             JsonAuthenticationEntryPoint, SecurityConfig,
│   │             CurrentUser annotation, CurrentUserArgumentResolver,
│   │             AuthRateLimitFilter ← HandlerInterceptor (Tomcat 자동 등록 회피)}
│   ├── application/AuthService      (signup/login/updateProfile/changePassword)
│   └── api/AuthController           (POST signup/login, PATCH /me, POST /me/password)
│
├── video/                 ← YouTube 영상 + 큐레이션
│   ├── domain/{Video, TranscriptSegment, Collection, CollectionVideo}
│   ├── repository/{VideoRepository, CollectionRepository, CollectionVideoRepository}
│   ├── infrastructure/{YoutubeMetadataClient, YoutubeTranscriptClient,
│   │                    NoTranscriptAvailableException}
│   ├── application/VideoImportService
│   ├── seed/CuratedCollectionSeeder (ApplicationRunner, ConditionalOnProperty)
│   ├── util/YoutubeUrlParser
│   └── api/{VideoController, CollectionController}
│
├── clip/                  ← 클립 (라이브러리의 단위)
│   ├── domain/Clip
│   ├── repository/ClipRepository    (native query w/ JSONB @>, dynamic ORDER BY)
│   ├── application/{ClipService, TranscriptSlicer,
│   │                ClipCreatedEvent, ClipDeletedEvent}
│   └── api/{ClipController, ClipExportController}
│
├── analysis/              ← AI 설명
│   ├── domain/{ClipAnalysis, KeyExpression, Vocabulary}
│   ├── repository/ClipAnalysisRepository  (@Modifying delete by clipId)
│   ├── infrastructure/{ClaudeClient, ClaudeProperties}
│   ├── prompt/ClipAnalysisPrompt    (system msg w/ cache_control)
│   ├── application/ClipAnalysisService
│   │                                (3-stage async pipeline: prepare → call → persist)
│   └── api/ClipAnalysisController
│
├── recording/             ← 사용자 녹음
│   ├── domain/Recording
│   ├── repository/RecordingRepository
│   ├── infrastructure/{RecordingStorage iface, LocalRecordingStorage impl}
│   ├── application/RecordingService (upload/list/stream/delete + onClipDeleted listener)
│   └── api/RecordingController      (multipart upload, audio streaming)
│
└── review/                ← SRS
    ├── domain/{ReviewItem, Sm2Calculator}
    ├── repository/ReviewItemRepository
    ├── application/ReviewService    (queue/respond/streak + event listeners)
    └── api/ReviewController
```

**도메인 패키지 안의 표준 레이아웃** (헥사고날 영향):
- `domain/` — 순수 엔티티/VO. JPA 어노테이션은 허용하지만 Spring 의존 X.
- `repository/` — Spring Data JPA 인터페이스.
- `application/` — 트랜잭션 경계. 비즈니스 로직. 도메인 이벤트 발행.
- `infrastructure/` — 외부 시스템 호출 (Claude, YouTube, 파일 저장).
- `api/` — HTTP/REST 어댑터. DTO ↔ 엔티티 변환.
- `api/dto/` — 요청/응답 record.

**모듈 간 의존 규칙:**
```
api  →  application  →  domain
                    →  infrastructure (인터페이스 only)
                    →  다른 도메인의 application (이벤트 발행으로 느슨하게)
```

도메인끼리는 직접 호출보다 이벤트로 통신:
- `ClipService.create` → `ClipCreatedEvent` 발행
- `ClipAnalysisService.onClipCreated` 구독 (AFTER_COMMIT + @Async)
- `ReviewService.onClipCreated` 구독 (AFTER_COMMIT + REQUIRES_NEW)

이렇게 하면 `ClipService`는 분석/SRS의 존재를 모름. 나중에 새 구독자 추가도 코드 한 줄.

---

## 4. Data Model

```
users (UUID id, email UNIQUE, password_hash, display_name, created_at, updated_at)
   │
   │ 1───N
   │
   ├─ clips (UUID, user_id FK, video_id FK, start_ms, end_ms, name,
   │          tags JSONB, transcript TEXT, note TEXT, timestamps)
   │     │
   │     ├─ clip_analyses (UUID, clip_id FK UNIQUE, status,
   │     │                 grammar_notes JSONB, key_expressions JSONB,
   │     │                 vocabulary JSONB, context_summary, model,
   │     │                 generated_at, error_message)
   │     │
   │     ├─ recordings (UUID, user_id FK, clip_id FK, file_path,
   │     │             content_type, duration_ms, size_bytes)
   │     │
   │     └─ review_items (UUID, user_id FK, clip_id FK UNIQUE per user,
   │                      easiness, interval_days, repetitions,
   │                      due_date, last_reviewed_at)
   │
videos (UUID id, youtube_id UNIQUE, title, channel_name, duration_seconds,
        thumbnail_url, transcript_status enum, transcript_segments JSONB)
   │
   │ M───N via
   │
collections (UUID, slug UNIQUE, name, description, is_public)
   │
   └─ collection_videos (collection_id, video_id, position, category)
```

**중요한 선택들:**

1. **UUID 기본키** — `BIGINT` AUTO_INCREMENT 안 씀. 이유: (a) URL에 노출돼도 enumeration 위험 낮음, (b) 분산 환경에서 ID 발급 충돌 없음, (c) 클라이언트가 ID를 만들 수도 있음(낙관적 UI).

2. **JSONB로 transcript 세그먼트 저장** — 별도 `video_transcript_segments` 테이블을 안 만든 이유:
   - 한 번에 전체를 읽지 개별 쿼리 안 함
   - 세그먼트 수십~수백 개. 정규화 비용 > 효과
   - JSONB는 인덱싱(GIN) + `@>` 연산자로 컨테인먼트 쿼리도 가능
   - 트레이드오프: 부분 수정이 비싸지만, transcript는 한 번 저장하면 거의 안 바뀜

3. **clip.tags도 JSONB + GIN 인덱스** — 별도 `tags` 테이블 + `clip_tags` 조인을 안 한 이유:
   - 태그 수 / 클립 ≤ 10
   - 태그 별 클립 검색은 `tags @> '["interview"]'::jsonb` 한 줄 + GIN 인덱스로 O(log n)
   - 정규화하면 join 1개 추가 + 태그 자체에 메타데이터 둘 일도 없음

4. **ON DELETE CASCADE** — 모든 사용자 데이터 자식 row는 FK CASCADE. 사용자 삭제 / 클립 삭제 시 application-level cleanup 불필요. **단** 디스크 파일은 별도 cleanup 필요 (`RecordingService.onClipDeleted` 리스너 + `delete()`의 afterCommit hook).

5. **`clip_analyses.clip_id UNIQUE`** — 한 클립당 분석 1개. "분석 재생성" = DELETE → INSERT 패턴 (히스토리는 보관 안 함).

6. **`review_items (user_id, clip_id) UNIQUE`** — 한 사용자가 한 클립 = 한 ReviewItem. SRS 상태가 누적되는 row.

7. **인덱스 정책**:
   - 모든 `*_id` FK에 인덱스 (`idx_clips_user_id`, `idx_recordings_clip_id`, ...)
   - `idx_review_items_user_due (user_id, due_date)` — 오늘 due 쿼리에 covering index
   - GIN on `clips.tags` — 태그 필터
   - 전문검색(name + transcript)은 현재 `LIKE '%q%'`. 시퀀스 스캔이지만 사용자 클립 ≤ 수천이면 OK. 10k+가 되면 `tsvector` 컬럼 + GIN 마이그레이션 (계획 in BLOCKERS/LOW)

---

## 5. Runtime Flows (시퀀스)

### 5.1 클립 생성 + AI 분석 (가장 복잡)

```
Browser              Backend (HTTP)      Application Layer       Event Bus       Background Worker        Postgres   Claude
  │                       │                    │                     │                  │                    │         │
  │  POST /api/clips      │                    │                     │                  │                    │         │
  │ ─────────────────────▶│                    │                     │                  │                    │         │
  │                       │  ClipService.create│                     │                  │                    │         │
  │                       │ ──────────────────▶│                     │                  │                    │         │
  │                       │                    │ Tx-1 begin          │                  │                    │         │
  │                       │                    │ INSERT clip ────────────────────────────────────────────────▶│         │
  │                       │                    │ publish ClipCreatedEvent (deferred)    │                    │         │
  │                       │                    │ Tx-1 commit         │                  │                    │         │
  │                       │                    │                     │ AFTER_COMMIT     │                    │         │
  │                       │                    │                     │ ────────────────▶│                    │         │
  │                       │                    │                     │                  │ (on @Async pool)   │         │
  │                       │  201 + ClipDTO     │                     │                  │ ClipAnalysisService.   │      │
  │ ◀─────────────────────│                    │                     │                  │  runAnalysisPipeline   │      │
  │                       │                    │                     │                  │   1) Tx-2: read clip + │      │
  │                       │                    │                     │                  │      INSERT pending ──▶│      │
  │                       │                    │                     │                  │   2) Tx-2 commit       │      │
  │                       │                    │                     │                  │   3) HTTP POST Claude ─────────▶
  │                       │                    │                     │                  │                        │      │ (1-3s)
  │                       │                    │                     │                  │   4) ◀ result          │◀─────│
  │                       │                    │                     │                  │   5) Tx-3: UPDATE      │      │
  │                       │                    │                     │                  │      analysis=READY  ─▶│      │
  │                       │                    │                     │                  │      Tx-3 commit       │      │
  │                       │                    │                     │ AFTER_COMMIT     │                        │      │
  │                       │                    │                     │ ────────────────▶│ ReviewService.         │      │
  │                       │                    │                     │  (REQUIRES_NEW)  │  onClipCreated         │      │
  │                       │                    │                     │                  │   Tx-4: SELECT clip    │      │
  │                       │                    │                     │                  │     (race-guard) ────▶ │      │
  │                       │                    │                     │                  │     INSERT review_item │      │
  │                       │                    │                     │                  │     Tx-4 commit        │      │
  │                       │                    │                     │                  │                        │      │
  │  Frontend polls /analysis every 3s while status=PENDING                                                     │      │
  │ ─────────────────────────────────────────────────────────────────────────────────────────────────────────────▶     │
  │  → 200 status=READY                                                                                         │      │
  │ ◀─────────────────────                                                                                       │      │
```

**시스템 디자인 포인트:**

- **트랜잭션 4개로 분리**: 1) 클립 생성, 2) 분석 PENDING 표시, 3) 분석 결과 반영, 4) 리뷰 아이템 생성. 각 트랜잭션은 짧다(<10ms). Claude 호출 1-3초는 트랜잭션 *밖*. 만약 클립 생성 트랜잭션에 Claude 호출을 넣었다면 Hikari 커넥션 1개를 3초 점유 → 동시 100 사용자면 풀(10) 즉시 고갈.

- **AFTER_COMMIT 사용 이유**: 이벤트 리스너가 트랜잭션 안에서 실행되면, 분석 워커가 fresh 데이터를 읽으려 해도 아직 커밋 전이라 안 보임(SERIALIZABLE 아닌 한). AFTER_COMMIT은 그 위험 차단.

- **@Async + ObjectProvider self-injection**: `ClipAnalysisService.runAnalysisPipelineAsync()`를 같은 클래스 내에서 `this.method()`로 호출하면 Spring AOP 프록시를 우회해 `@Async` 무시. `selfProvider.getObject().method()`로 프록시를 통과시킴.

- **폴링 vs SSE/WebSocket**: 분석 완료 통보를 폴링(3s)으로 처리. 1000명 동시 사용자 × 3s 폴 = 333 RPS. Spring Boot 1 노드로 충분. 사용자 수가 10k+가 되면 SSE로 전환 (코드 변경 점은 `AnalysisPanel`의 `refetchInterval` + 서버에 SSE 엔드포인트 1개 추가).

- **분석 실패 격리**: Claude 호출 실패 시 `analysis.status=FAILED + errorMessage`. 사용자는 "다시 분석" 버튼으로 재시도. `ClipService.create`의 응답에는 영향 X (이미 201 반환).

### 5.2 인증 + 보호 엔드포인트 호출

```
Browser                       Backend
  │
  │  POST /api/auth/login                          ← 공개 엔드포인트 (permitAll)
  │ ──────────────────────────▶ AuthRateLimitFilter (HandlerInterceptor)
  │                                ↓ (IP당 분당 20회 초과 시 429)
  │                              AuthController.login
  │                                ↓
  │                              AuthService.login
  │                                ├─ userRepository.findByEmail
  │                                ├─ ★ unknown email → passwordEncoder.matches(pw, DUMMY_HASH)
  │                                │     (constant-time, user enumeration 방지)
  │                                ├─ matches → JwtTokenProvider.issueAccessToken
  │                                └─ return {accessToken, expiresInSeconds, user}
  │ ◀────────────────────────── 200 + token
  │
  │  localStorage에 token 저장 (Zustand persist)
  │  TanStack Query의 tokenProvider가 이후 모든 요청에 Authorization 헤더 첨부
  │
  │  GET /api/clips                                ← 보호 엔드포인트
  │  Authorization: Bearer eyJ...
  │ ──────────────────────────▶ JwtAuthenticationFilter
  │                                ├─ Bearer 헤더 파싱
  │                                ├─ JwtTokenProvider.parse → AuthenticatedUser
  │                                └─ SecurityContextHolder.setAuthentication
  │                              ↓
  │                              ClipController.list(@CurrentUser AuthenticatedUser user)
  │                                ↑
  │                              CurrentUserArgumentResolver
  │                                ↑
  │                              SecurityContextHolder.getAuthentication.principal
  │                              ↓
  │                              ClipService.list(user.id(), ...)
  │                                └─ user_id 필터로 다른 사용자 데이터 자동 격리
  │ ◀────────────────────────── 200 + ClipPageResponse
```

**왜 JWT인가:**
- **수평 확장**: 노드 A에서 발급한 토큰을 노드 B가 검증 가능. 세션 공유 인프라(Redis sticky) 불필요.
- **외부 시스템 통합 용이**: 토큰 그대로 다른 서비스에 패스. 세션 ID라면 매번 콜백 필요.
- **트레이드오프 (인지)**: 즉시 무효화 불가. 24h TTL + 비밀번호 변경 시 tokenVersion 클레임 추가(향후) → revocation 가능.

**Rate limit이 HandlerInterceptor인 이유**: `OncePerRequestFilter`로 했을 때 Spring Boot의 ServletContext가 자동으로 top-level Filter로도 등록해 무한 루프 같은 이상한 일이 생김. HandlerInterceptor는 Spring MVC 안에만 살아서 자동 등록 대상 아님.

### 5.3 클립 삭제 (cascade hazard 사례)

```
Browser                Backend                            Postgres
  │
  │  DELETE /api/clips/{id}
  │ ──────────────────▶ ClipController.delete
  │                       ↓
  │                     ClipService.delete (Tx)
  │                       ├─ clipRepository.delete(clip)         (pending in Hibernate session)
  │                       └─ publishEvent(ClipDeletedEvent)
  │                            ↓                                  ↓
  │                          ClipAnalysisService.onClipDeleted   RecordingService.onClipDeleted
  │                          @EventListener @Transactional       @TransactionalEventListener(BEFORE_COMMIT)
  │                          analysisRepository                  recordingRepository.findByClipId
  │                            .deleteByClipId                   for each path:
  │                            (★ @Modifying @Query              storage.delete(filePath)  ← 디스크 정리
  │                             — bulk DELETE, no entity load)
  │                            ↓                                  ↓
  │                          ReviewService.onClipDeleted
  │                          @EventListener @Transactional
  │                          reviewRepository.deleteByClipId
  │                            (★ @Modifying @Query)
  │                       Tx commit
  │                          ↓
  │                       Hibernate flush:
  │                         DELETE FROM clips WHERE id=?
  │                         → ON DELETE CASCADE
  │                            DELETE FROM clip_analyses WHERE clip_id=?  (이미 비어있음)
  │                            DELETE FROM review_items WHERE clip_id=?   (이미 비어있음)
  │                            DELETE FROM recordings WHERE clip_id=?     (DB row만; 파일은 이미 삭제됨)
  │ ◀──── 204
```

**여기서 배운 교훈:**

- 처음엔 `deleteByClipId`를 Spring Data derived query로 만들었음. Spring은 `SELECT` → `DELETE per row` 패턴 생성 → entity가 1차 캐시에 들어감 → DB cascade가 같은 row를 먼저 지움 → flush 시 Hibernate가 "row not found" → `StaleObjectStateException` → 500.
- 해결: `@Modifying @Query("delete from … where clip_id = :clipId")` — bulk DELETE, 캐시 안 거침.
- 파일 정리는 BEFORE_COMMIT (parent row가 아직 있어야 child row를 조회할 수 있음).
- 단건 삭제(`RecordingService.delete`)는 afterCommit으로 파일 삭제 지연(롤백 시 파일 orphan 방지).

이 케이스 하나가 시스템 디자인 인터뷰 "트랜잭션과 캐스케이드" 단골 질문의 실제 답변임.

---

## 6. Cross-Cutting Concerns

### 6.1 Authentication & Authorization
- **Authentication**: JWT(HS256) bearer. `JwtAuthenticationFilter`가 헤더 파싱 → SecurityContext에 `AuthenticatedUser` 주입.
- **Authorization**: `@CurrentUser` ArgumentResolver로 컨트롤러 시그니처에 사용자 ID 주입. 서비스 레이어가 `user.id()`를 모든 쿼리에 필터로 적용 → **자동 멀티 테넌시**.
- **Public endpoints**: `/api/health, /api/auth/{signup,login}, /swagger-ui/**, /v3/api-docs/**, /actuator/**`
- **CORS**: `tubeshadow.cors.allowed-origins` 환경변수, 기본값 `http://localhost:*,https://*.vercel.app`
- **Rate limit**: 분당 20회 IP당 (signup/login). `X-Forwarded-For`는 `trusted-proxies` 화이트리스트에서만 신뢰.

### 6.2 Transaction Boundaries
**원칙**: 트랜잭션은 짧게, 네트워크 호출은 절대 안에서 안 함.

| 트랜잭션 길이 | 안에 들어가는 것 | 안 들어가는 것 |
|---------------|------------------|----------------|
| 짧음 (< 10ms) | DB CRUD, 인-메모리 계산 | Claude/YouTube HTTP, 파일 IO (단건 OK), 스레드 sleep |
| 중간 (10-100ms) | 멀티 row UPDATE, 인덱스가 좋은 검색 | 외부 API |

**propagation 사용 패턴**:
- 기본: `REQUIRED` (있으면 합류, 없으면 시작)
- `@TransactionalEventListener(AFTER_COMMIT)` 안의 `@Transactional`: `REQUIRES_NEW` (이미 끝난 트랜잭션에 합류 불가)
- 읽기 전용: `@Transactional(readOnly = true)` (Hibernate 더티 체킹 스킵, 약간의 성능)

### 6.3 Error Model
**모든 API 응답은 동일한 envelope:**
```json
{ "data": { ... } | null,
  "error": { "code": "UPPER_SNAKE", "message": "한글 메시지" } | null,
  "timestamp": "2026-05-24T...Z" }
```
**예외 → HTTP 매핑** (`GlobalExceptionHandler`):

| 예외 | 상태 | code |
|------|------|------|
| `BusinessException` 계열 (NotFound/Conflict/Forbidden/Unauthorized) | 자체 status | 자체 code |
| `MethodArgumentNotValidException` | 400 | `VALIDATION_FAILED` |
| `IllegalArgumentException` | 400 | `BAD_REQUEST` |
| `MaxUploadSizeExceededException` | 413 | `FILE_TOO_LARGE` |
| `DataIntegrityViolationException` | 409 | `CONFLICT` (race-safe signup) |
| 나머지 `RuntimeException` | 500 | `INTERNAL_ERROR` (메시지 숨김) |

프론트엔드 `apiClient`가 이 envelope을 파싱해 `ApiError` 클래스로 던짐. UI는 `error.code`로 분기, `error.message`를 그대로 toast.

### 6.4 Async & Events
- **Spring Application Event** 사용 (코드 0줄로 in-process pub-sub).
- 외부 큐(Kafka/SQS) 없음. 분리 필요 시 `ApplicationEventPublisher` → `RabbitTemplate`/`KafkaTemplate`로 1:1 교체.
- 발행자는 구독자를 모름 (`ClipService.create`는 `ClipAnalysisService`/`ReviewService`의 존재 모름).
- @Async 풀: Spring 기본 `SimpleAsyncTaskExecutor` (스레드당 1개). 부하 증가 시 `ThreadPoolTaskExecutor` 빈 등록 + size 튜닝.

### 6.5 Caching
- **Claude prompt cache** (외부): system 메시지에 `cache_control: ephemeral` → 5분 윈도우 내 시스템 프롬프트 재사용. 클립당 토큰 비용 절반.
- **TanStack Query** (프론트): 30초 staleTime, 분석은 PENDING일 때만 3초 폴링.
- **Hibernate L1 cache** (트랜잭션 범위, 무료).
- **L2 cache**: 없음. 캐시 무효화의 복잡도 vs 효과가 안 맞음.
- 외부 Redis: 없음. 1k 사용자까지 불필요.

### 6.6 Observability
- **로깅**: SLF4J + Logback. 프로파일별 레벨 (dev DEBUG, prod INFO). 구조화 안 함(향후 logback-encoder).
- **메트릭**: Spring Boot Actuator `/actuator/health, /actuator/metrics`.
- **트레이싱**: 없음. 향후 OpenTelemetry agent.
- **에러 트래킹**: 없음. 향후 Sentry.

---

## 7. Deployment

```
                  ┌──────────────────┐
                  │  Vercel CDN      │  *.vercel.app → /
   GitHub push  ─▶│  Next.js build  │  ← static + edge functions
                  │  + ENV           │     (NEXT_PUBLIC_API_URL)
                  └────────┬─────────┘
                           │ HTTPS
                           ▼
                  ┌──────────────────┐
                  │  Railway/Render  │  api.tubeshadow.app
   GitHub push  ─▶│  Dockerfile      │
                  │  build & deploy  │  ENV: DATABASE_URL,
                  │  + ENV           │       ANTHROPIC_API_KEY,
                  │                  │       JWT_SECRET,
                  │                  │       CORS_ALLOWED_ORIGINS
                  └────────┬─────────┘
                           │
                  ┌────────▼─────────┐
                  │  Postgres add-on │  Managed (Railway/Render plugin)
                  └──────────────────┘
                           +
                  ┌──────────────────┐
                  │  Mounted volume  │  /app/local-storage/recordings
                  │  (1GB initial)   │  ← S3로 추후 이동
                  └──────────────────┘
```

**Dockerfile 패턴**:
- 멀티 스테이지 (build → runtime)
- `eclipse-temurin:21-jdk-alpine` → `eclipse-temurin:21-jre-alpine` (이미지 크기 절감)
- non-root user (`app:app`)
- `HEALTHCHECK` curl /api/health → LB 자동 unhealthy 감지
- `JAVA_OPTS="-XX:MaxRAMPercentage=75"` — 메모리 제한 자동 인식

**Profiles**:
| Profile | 용도 | DB | Claude | Rate limit | Curation seeder |
|---------|------|----|----|------------|------------------|
| dev | 로컬 개발 | localhost:5434 | env key 있으면 | ON | ON |
| prod | 배포 | DATABASE_URL | required | ON | ON |
| test | 단위/리포지토리 테스트 | Testcontainers | dummy | OFF | OFF |
| integ | SpringBootTest 통합 테스트 | Testcontainers | dummy | OFF | OFF |

---

## 8. Failure Modes

| 시나리오 | 검출 | 영향 | 회복 |
|---------|------|------|------|
| Claude API 다운/429 | `analysis.status=FAILED + errorMessage` | 분석 못 함. 나머지 다 OK | 사용자가 "다시 분석" 클릭 / 자동 재시도 (TODO) |
| YouTube oEmbed 다운 | `BAD_GATEWAY 502` | 새 영상 임포트 불가. 기존 영상/클립 영향 X | YouTube 복구 대기 |
| YouTube 자막 비공식 API 형식 변경 | `transcript_status=UNAVAILABLE` | 새 영상에 자막 없음. 기존 클립 영향 X | 코드 수정 (BLOCKERS B-001) |
| Postgres 다운 | 헬스체크 fail → LB가 backend 트래픽 차단 | 전 기능 503 | DB 복구 |
| 디스크 풀 | 녹음 업로드 500 | 녹음만 실패. 나머지 OK | 디스크 증설 |
| JWT secret 노출 | — | 전 사용자 토큰 위조 가능 | secret 회전 + 24h 후 모두 자동 로그아웃 |
| 동시 signup 경합 | unique constraint violation | `DataIntegrityViolationException → 409` | 두 번째 클라이언트 자동 안내 |
| 클립 삭제 직후 분석 워커 동작 | `clipRepository.findById` empty | 조용히 스킵 | 자동 (코드에 가드 있음) |
| 단일 IP 대량 signup | rate limit 429 | 해당 IP만 차단 | 1분 후 자동 해제 |

**"한 외부 의존성이 죽어도 나머지 기능은 산다"** — Claude 다운 시: 임포트/클립 만들기/녹음/복습 모두 동작. AI 패널만 FAILED 표시.

---

## 9. Scaling

### 9.1 현재 한도 (단일 인스턴스)
- Spring Boot 1 vCPU/512MB: ~200 sustained RPS
- Postgres `Hikari maximum-pool-size=10`: 동시 트랜잭션 10개
- @Async 풀 default: ~CPU 코어 수
- Tomcat thread pool 기본 200

### 9.2 Bottleneck 순서 (가설)
1. **Claude API 비용** (사용자 수에 선형). 1000명 × 5클립/일 = 5k 호출/일 ≈ $25/월 (캐싱 50% 가정 시 $12).
2. **Postgres connection pool** — 분석 워커 + 큐레이션 seeder + 사용자 요청이 동시에 풀을 먹음. 풀 늘리거나 분석 워커를 별도 풀로 격리.
3. **녹음 파일 디스크 IO** — 평균 2초 녹음 = ~50KB. 1000명 × 5 녹음/일 = 250MB/일. 1년 90GB. S3로 이동 시점.
4. **YouTube 자막 페치 latency** — 임포트 흐름에서 ~1-2초 추가. 사용자가 임포트할 때만 발생.

### 9.3 다음 단계 가이드
| 사용자 수 | 조치 |
|----------|------|
| 100 | 현재 구성 그대로. |
| 1000 | Postgres pool 10 → 25, Hikari leakDetectionThreshold 설정 |
| 5000 | 녹음 → S3 마이그레이션 (RecordingStorage 인터페이스에 S3 impl 추가). Claude 분석 워커를 별도 프로세스로 분리해 트래픽 격리 |
| 10000 | 백엔드 수평 확장 (stateless 덕에 무리 없음). 클립 검색 LIKE → tsvector. Redis로 rate limit 공유 (현재 메모리는 노드별 독립) |
| 50000+ | 분석 워커를 SQS/Kafka 기반으로 외부화. Read replica. CDN 캐싱 강화 |

**중요**: 위 모든 단계에서 코드 골격은 그대로. 인터페이스 + 이벤트 기반 설계의 가치.

---

## 10. Cost Model (월간, 1000 활성 사용자 가정)

| 항목 | 비용 | 비고 |
|------|------|------|
| Vercel Hobby | $0 | 100GB 대역폭, hobby project |
| Railway Pro (백엔드 + Postgres) | $20 | 1GB RAM, 5GB DB |
| Claude Haiku 4.5 | $12-25 | 사용자당 일 5클립, prompt caching 50% hit |
| 도메인 | $1 | 연 $12 amortized |
| **합계** | **$33-46** | |

NORTH STAR 0.3.5 ("1000명까지 거의 무료") 충족.

---

## 11. Decision Log (ADRs)

가장 큰 5개만:

### ADR-001: 모노리스로 시작
- **상황**: v0, 1인 개발, 3주 안에 작동하는 제품 필요
- **결정**: 단일 Spring Boot 프로세스. 도메인 모듈만 분리.
- **이유**: 마이크로서비스는 *팀 통신 비용*을 분산 시스템 복잡도와 트레이드. 팀 없음 = 통신 비용 0 = 분리 무가치.
- **결과 (1주 후)**: 6 도메인 자유롭게 상호 호출. 이벤트 기반으로 결합도 낮춤. 분리 비용 발생 안 함.

### ADR-002: JWT (vs session cookie)
- **결정**: HS256 JWT, 24h TTL, localStorage 보관
- **이유**: 무상태 백엔드 + 빠른 호스팅 시작. 세션 공유 인프라 회피.
- **트레이드오프**: XSS → 토큰 탈취 가능. revocation 어려움.
- **완화**: 짧은 TTL + 향후 `tokenVersion` 클레임 (비밀번호 변경 시 무효화)

### ADR-003: JSONB로 transcript/tags 저장
- **결정**: 정규화 X. PostgreSQL JSONB 활용.
- **이유**: 도메인 모델 단순화. 부분 쿼리 거의 없음. GIN 인덱스로 containment 검색은 됨.
- **트레이드오프**: 부분 수정 비용 ↑, JSONB 마이그레이션 시 복잡
- **재평가 시점**: 클립 수 100k+, transcript 평균 10KB+ 되면 정규화 검토

### ADR-004: Spring Application Event (vs Kafka)
- **결정**: 인-프로세스 이벤트. 외부 큐 없음.
- **이유**: 단일 노드 + 단일 트랜잭션 경계 = 외부 큐의 가치(분리/내구성)가 비용보다 작음.
- **확장 경로**: `ApplicationEventPublisher.publish` 호출 자리만 그대로 두고, 별도 Listener에서 Kafka로 forward 패턴 적용

### ADR-005: 녹음을 로컬 디스크에 저장 + RecordingStorage 인터페이스
- **결정**: v0는 LocalRecordingStorage. S3 인터페이스만 뚫어둠.
- **이유**: 1k 사용자까지 90GB. 단일 노드 디스크로 충분. S3 SDK 의존성 + IAM 셋업 추가 부담 회피.
- **확장 경로**: `S3RecordingStorage implements RecordingStorage` 추가 + Bean 교체. 데이터 마이그레이션은 일회성 스크립트.

---

## 12. Known Limits / TODO

이 시스템이 *지금* 못 하는 것:
1. **수평 확장 시 rate limit 공유 X** — 노드별 메모리에 카운터. 멀티 노드면 N×limit으로 새는 효과. Redis 기반으로 교체 필요.
2. **JWT revocation 어려움** — 비밀번호 변경해도 기존 토큰 유효 (24h). tokenVersion 클레임 추가 예정.
3. **분석 진행 통보 = 폴링** — SSE로 교체하면 사용자별 평균 트래픽 ↓
4. **녹음 = 로컬 디스크** — 다중 노드면 sticky session 필요. S3 시급.
5. **YouTube 자막 비공식** — ToS 회색 (BLOCKERS B-001)
6. **클립 검색 LIKE** — 10k+ 클립이면 ILIKE 시퀀스 스캔 시작. `tsvector + GIN` 필요.
7. **에러 추적 없음** — 5xx 발생해도 외부 통보 X
8. **백업 정책 없음** — Postgres 호스팅의 자동 백업 의존

---

## 13. 시스템 디자인 인터뷰 관점에서 짚을만한 것

이 프로젝트에서 실제로 나오는 시스템 디자인 주제:

| 주제 | 어디서 |
|------|--------|
| **트랜잭션 경계 설계** | ClipAnalysisService 3-stage pipeline (네트워크 호출이 트랜잭션 밖) |
| **인-프로세스 vs 분산 메시지** | Spring Event vs Kafka 트레이드오프 (ADR-004) |
| **JPA cascade 와 entity cache 경합** | Section 5.3 ClipDeleteCascade |
| **Optimistic vs Pessimistic 락** | UNIQUE constraint으로 낙관, 충돌 시 409 변환 |
| **인증 모델 (JWT vs Session)** | ADR-002 |
| **CORS / CSRF / Rate limit 보호계층** | Section 6.1 |
| **다중 테넌시 격리** | `user_id` 필터를 서비스 레이어에서 강제 |
| **외부 의존성 fallback 설계** | Section 8 Failure Modes |
| **수평 확장 시 stateful 부분 식별** | Section 9 (rate limit, 파일, async 풀) |
| **NoSQL like 사용 (JSONB)** | ADR-003 |
| **이벤트 소싱 vs CRUD** | 안 함. 명시적으로 CRUD 선택. SRS 진행 이력이 필요해질 때 도입 |
| **CQRS** | 안 함. read/write 패턴이 분리되어 있지 않음. |
| **캐시 무효화** | TanStack Query의 `invalidateQueries` 호출 시점이 자연스러운 무효화 트리거 |

---

## 14. 변경 이력

- 2026-05-24 v1.0 작성 (STAGE 0~9 + 폴리시 + 코드리뷰 fix 완료 시점)
