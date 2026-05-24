# 이 프로젝트가 어떻게 만들어졌는가

> 한 번 쭉 읽어보세요. 모르는 단어가 나오면 표시만 하고 넘어가세요.
> 두 번째 읽을 때 그 단어들을 채워나가면 됩니다.

## 들어가기 전에

이 프로젝트는 압축된 속도로 만들어졌습니다. 사람이 같은 일을 하면 보통 **1~2주**입니다. 그걸 몇 시간으로 압축해서 본 거니까, 따라가기 어려운 게 정상입니다. 본인이 느린 게 아니에요.

이 문서는 그 압축을 다시 풀어서 **사람의 속도로 읽을 수 있게** 재구성한 것입니다.

---

## 1. 전체 흐름 한 장

```
[기획]                [구현]                [검증]                [배포]
ROADMAP.md   ──→   스테이지별로     ──→   3계층 테스트   ──→   Docker + Vercel
NORTH STAR         태스크 분해             + 수동 검증           가이드
            ───→  STAGE 0~9                                
            ───→  T-001 ~ T-069              ┌─ 단위 테스트   
                                             ├─ 통합 테스트  
                                             ├─ E2E 브라우저  
                                             └─ curl 스모크 
```

전체를 관통하는 3가지 원칙이 있었습니다:

1. **모든 결정을 NORTH STAR에 비춰본다.** 새 기능을 만들고 싶을 때마다 "이게 5가지 가치(자유 구간/평생 라이브러리/앱 안 AI/마찰 제거/저비용)에 맞나, OUT-OF-SCOPE에 걸리지 않나" 확인.
2. **태스크 단위로 일한다.** 한 번에 하나씩, 끝나면 PROGRESS.md 갱신.
3. **막히면 BLOCKERS.md에 적고 다른 일로 점프한다.** 추측해서 진행하지 않음.

---

## 2. 사용한 도구 — 한 줄 정리

이게 가장 압도적인 부분일 거예요. 도구가 많은 이유는, **각자 잘하는 일이 다르기 때문**입니다.

### 백엔드 (Java 기반)

| 도구 | 한 줄 |
|------|------|
| **Java 21** | 프로그래밍 언어. 최신 LTS. 레코드, 패턴 매칭 등 모던 문법. |
| **Spring Boot 3.3** | 웹 서버 + 의존성 주입 + 자동 설정. "Java 표준 풀스택 프레임워크". |
| **Gradle (Kotlin DSL)** | 빌드 도구. `./gradlew bootRun` 한 줄로 서버 기동. Maven보다 더 표현력 있음. |
| **PostgreSQL 16** | 관계형 DB. JSONB 컬럼 지원이 강력함. |
| **Flyway** | DB 스키마 버전 관리. `V1__create_users.sql` 같은 파일로 마이그레이션. |
| **JPA / Hibernate** | DB ↔ Java 객체 매핑. `@Entity` 붙이면 자동 SQL 생성. |
| **Spring Security** | 인증/인가 프레임워크. JWT 필터 + 세션 관리. |
| **JWT (jjwt)** | 로그인 토큰. 서버에 세션 저장 안 함 = 확장 쉬움. |
| **Springdoc OpenAPI** | Swagger UI 자동 생성. API 문서. |
| **Anthropic Claude API** | AI 분석. `claude-haiku-4-5-20251001` 모델 사용. |
| **Testcontainers** | 테스트할 때 진짜 PostgreSQL을 Docker로 띄움. H2 mock 안 씀. |
| **JUnit 5 + AssertJ + Mockito** | 단위/통합 테스트 표준 도구. |

### 프론트엔드 (TypeScript 기반)

| 도구 | 한 줄 |
|------|------|
| **Next.js 16** | React 풀스택 프레임워크. App Router 사용. |
| **TypeScript strict** | JS에 타입 추가. 컴파일 시 버그 잡힘. |
| **Tailwind CSS 4** | CSS를 클래스로 (`className="flex p-4"`). |
| **shadcn/ui** | 복붙 가능한 React 컴포넌트 (Button/Dialog/Card 등). |
| **Zustand** | 가벼운 전역 상태 관리. 로그인 토큰 보관용. |
| **TanStack Query** | 서버 데이터 캐시 + 자동 새로고침. fetch 호출 직접 안 함. |
| **Vitest** | 프론트엔드 단위 테스트. Jest 같지만 더 빠름. |
| **Sonner** | 토스트 알림 (성공/실패 띠 메시지). |

### 인프라 + 검증

| 도구 | 한 줄 |
|------|------|
| **Docker Compose** | PostgreSQL을 로컬에 한 줄로 띄움. |
| **GitHub Actions** | CI. 푸시할 때마다 자동으로 빌드/테스트. |
| **Playwright + Chromium** | 진짜 브라우저로 시나리오 자동 실행. |
| **curl + bash** | scripts/smoke.sh — API 직접 두드려 종단간 확인. |

**압도되지 마세요.** 이 도구들 모두 알 필요 없습니다. 가장 중요한 5개만 추리면:
- **Spring Boot** (백엔드 = Spring Boot)
- **PostgreSQL** (저장소 = Postgres)
- **Next.js** (프론트엔드 = Next)
- **Docker** (어디서나 같은 환경)
- **Git** (코드 버전 관리)

나머지는 위 5개를 *받쳐주는* 도구들이에요.

---

## 3. 시간순으로 — 무엇을, 왜, 어떻게 검증했나

### STAGE 0: 부트스트랩 (10 태스크)
**목표: "안녕 세상"이 떠야 함.**

| 한 일 | 왜 |
|------|----|
| 디렉터리 만들기 (`backend/`, `frontend/`) | 코드 둘 곳 |
| `.gitignore` + `README.md` | 깃에 안 올릴 파일 거르기 + 첫 안내문 |
| `docker-compose.yml`로 Postgres 띄움 | DB 설치 없이 컨테이너로 |
| Spring Boot 프로젝트 생성 (`build.gradle.kts`) | 백엔드 뼈대 |
| `GET /api/health` 엔드포인트 | "백엔드 살아있다" 신호 |
| `application.yml` (dev/prod/test) | 환경별 설정 분리 |
| Swagger UI 셋업 | API 문서 자동 생성 |
| `npx create-next-app frontend` | Next.js 뼈대 |
| `shadcn add button card dialog ...` | UI 컴포넌트 받기 |
| `lib/api/client.ts` 작성 | 프론트에서 백엔드 호출하는 공통 함수 |

**검증한 방법:**
```bash
docker compose up -d                  # DB 떴나
./gradlew bootRun                     # 백엔드 떴나
curl http://localhost:8080/api/health # 응답 200인가
npm run dev                           # 프론트 떴나
브라우저에서 localhost:3000           # 헬스 응답이 화면에 보이나
```

**여기서 한 번 막혔음:** 호스트 PostgreSQL이 이미 5432번 포트 쓰는 중. Docker가 못 띄움. → docker-compose.yml에서 호스트 포트만 5434로 변경. 이런 식의 "막힘"이 1-2번 더 있었고, 그때마다 BLOCKERS.md에 기록하거나 즉시 우회.

---

### STAGE 1: 도메인 모델 + DB (8 태스크)
**목표: 데이터 형태 정의 + DB 테이블 만들기.**

**핵심 개념:**
- **Entity**: Java 클래스이면서 동시에 DB 테이블 (Hibernate가 양방향 매핑).
- **Repository**: DB 접근 인터페이스. 메서드 이름만 적으면 SQL 자동 생성 (`findByEmail` → `SELECT * FROM users WHERE email = ?`).
- **Migration**: DB 스키마 변경을 SQL 파일로 추적 (`V1__create_users.sql`).

**만든 엔티티 6개:**
```
User (이메일/비밀번호/이름)
  ↓
Clip (videoId + startMs/endMs + 자막 + 태그 + 노트)
  ↑                  ↓
Video               ClipAnalysis (AI 분석 결과)
(YouTube)           Recording (사용자 녹음)
                    ReviewItem (SRS 복습 상태)
```

**왜 6개로 나눴나:**
- 각 개념이 독립적인 수명 (User 삭제하면 그 사람의 Clip 다 삭제, 하지만 Video는 다른 사람도 쓸 수 있어야 하니까 안 삭제)
- 동시에 너무 잘게 안 나눔 (분석을 별도 마이크로서비스로 쪼개지 않음)

**검증한 방법:**
- `UserRepositoryTest`: User 저장하고 이메일로 찾기 통과?
- `DomainIntegrationTest`: 6개 엔티티 전부 만들고 서로 연결되나?
- **Testcontainers** 사용 — 가짜 H2 DB가 아니라 **진짜 Postgres**를 Docker로 띄워서 테스트. JSONB 같은 Postgres 전용 기능까지 검증됨.

---

### STAGE 2: 인증 (7 태스크)
**목표: 회원가입/로그인 + 보호된 API.**

**핵심 흐름:**
```
회원가입 → 비밀번호를 BCrypt로 해싱해서 저장
로그인 → 비밀번호 확인 → JWT 토큰 발급 (24시간)
요청 → Authorization: Bearer <token> 헤더 → 서버가 검증
```

**왜 JWT인가:**
- 서버에 세션 저장 안 함 = 서버 인스턴스 늘려도 토큰 공유 안 해도 됨
- 토큰 자체에 사용자 ID + 만료 시간 들어있음 (서명으로 위조 방지)
- 단점: 한 번 발급되면 24시간 못 무효화. 비밀번호 바꿔도 기존 토큰 살아있음. (트레이드오프 인지)

**프론트엔드 쪽:**
- Zustand로 토큰을 localStorage에 보관
- `lib/api/client.ts`가 자동으로 모든 요청에 토큰 첨부
- `(app)` 폴더 layout에서 토큰 없으면 `/login`으로 자동 이동

**검증한 방법:**
- `AuthControllerIntegrationTest`: 회원가입 → 로그인 → /me 호출 → 토큰 없이 호출하면 401, 잘못된 비밀번호 401
- 직접 curl로: `curl -X POST /api/auth/signup` → 토큰 받기 → 그 토큰으로 보호 엔드포인트 호출

---

### STAGE 3: YouTube 통합 (8 태스크)
**목표: URL 붙여넣으면 영상 + 자막 자동 가져오기.**

**3가지 작은 도구로 쪼갬:**
1. **YoutubeUrlParser** — 별별 URL 형식에서 11자 ID 뽑기 (`watch?v=`, `youtu.be/`, `embed/`, `shorts/` 등)
2. **YoutubeMetadataClient** — oEmbed API로 제목/썸네일/채널명 가져오기
3. **YoutubeTranscriptClient** — 자막 가져오기 (여기가 까다로움)

**자막이 까다로운 이유:**
- YouTube에 공식 자막 API 없음
- 비공식 경로: watch 페이지 HTML 가져와서 `ytInitialPlayerResponse` JSON 파싱 → captionTracks → json3 포맷 다운로드
- 이건 YouTube가 언제든 형식 바꿀 수 있음 (BLOCKERS.md에 B-001로 기록)
- 실패 시: 영상은 저장하되 `transcript_status=UNAVAILABLE`로 표시. 클립은 자막 없이도 만들 수 있게.

**프론트엔드 쪽:**
- `YoutubePlayer.tsx` — YouTube IFrame Player API를 React로 감쌈
- `TranscriptPanel.tsx` — 자막 리스트, 현재 시간에 맞는 자막 자동 하이라이트

**검증한 방법:**
- 단위 테스트: `YoutubeUrlParserTest` (7가지 URL 형식 모두 같은 ID 나오나)
- 단위 테스트: `VideoImportServiceTest` (Mockito로 외부 호출 mock해서 신규/중복/자막 실패 시 동작 확인)
- 통합: 실제 YouTube URL로 시드 영상 임포트 (Rich Hickey "Simple Made Easy", Linus TED 등) — 실제 자막까지 가져왔음 (서버 로그로 확인)

---

### STAGE 4: 클립 + 라이브러리 (8 태스크)
**목표: 영상에서 구간 잘라 저장 → 라이브러리 카드 그리드 → 무한 반복 재생.**

**백엔드:**
- `POST /api/clips` — 클립 저장. `TranscriptSlicer`로 해당 구간 자막만 자동 잘라서 함께 저장.
- `GET /api/clips` — 검색(name + transcript LIKE), 태그 필터(JSONB containment), 페이징, 정렬(최신/오래된/이름/길이) 다 됨
- `PATCH /api/clips/{id}` — 이름/태그/자막/노트 부분 수정
- `DELETE /api/clips/{id}` — 소유자만

**프론트엔드:**
- `ClipCreatePanel`: "시작" 버튼 / "끝" 버튼 → 범위 시각화 → 저장 모달
- 라이브러리 페이지: 카드 그리드(썸네일 + 이름 + 자막 미리보기 2줄 + 태그)
- 플레이어 페이지: 클립 무한 반복 + 속도 슬라이더(0.5x~1.5x) + 큰 자막

**여기서 N+1 쿼리 버그 발생 후 수정:**
- 라이브러리 50개 클립 = `findById(videoId)` 50번 호출 = SQL 51개 → 느림
- 수정: `videoRepository.findAllById(videoIds)`로 한 번에 가져오기 → SQL 2개

이게 시스템 디자인 인터뷰의 단골 "N+1 problem".

---

### STAGE 5: AI 분석 (6 태스크)
**목표: 클립 저장하면 백그라운드로 Claude 호출 → 분석 결과 자동 표시.**

**핵심 패턴 — 비동기 이벤트:**
```
사용자 → POST /api/clips
       → ClipService가 클립 저장
       → 이벤트 발행: "ClipCreatedEvent"
       → 응답 즉시 반환 (사용자 안 기다림)
                ↓ (백그라운드 스레드에서)
       ClipAnalysisService.onClipCreated 구독자가 깨어남
       → Claude API 호출 (1~3초)
       → 결과 DB 저장
                ↓
       프론트엔드가 3초마다 분석 상태 폴링
       → READY 되면 패널에 표시
```

**왜 이렇게 쪼갰나:**
- Claude 호출이 3초 걸리는데 사용자가 그 동안 클립 저장 응답을 못 받으면 답답
- 백그라운드 스레드는 결과를 DB에 쌓아두고, 프론트가 알아서 가져감
- 이게 "비동기 처리" 패턴

**프롬프트 설계:**
- system 메시지에 분석 양식 (JSON 스키마, 1-shot 예시, 톤 가이드)
- system 메시지에 `cache_control: ephemeral` → Anthropic이 system 부분을 캐시해서 비용 절반

**검증한 방법:**
- `ClaudeClientParseTest`: 가짜 Claude 응답 (코드펜스 포함/제외 두 경우)으로 파싱 정확도 확인
- 실제 호출은 ANTHROPIC_API_KEY 있을 때만 (지금은 없으니까 "FAILED" 상태로 저장됨)

---

### STAGE 6: 녹음 + A/B 비교 (7 태스크)
**목표: 마이크로 녹음 → 업로드 → 원본/본인 번갈아 듣기.**

**브라우저 쪽:**
- **MediaRecorder API** — 마이크 녹음 (webm/opus 포맷)
- 권한 거부되면 명확한 메시지 표시
- 녹음 끝나면 자동으로 백엔드에 multipart 업로드

**서버 쪽:**
- `RecordingStorage` 인터페이스 (저장 추상화) + `LocalRecordingStorage` 구현 (디스크에 저장)
- 인터페이스로 뺀 이유: 나중에 S3로 교체할 때 인터페이스 그대로 두고 구현체만 추가
- 파일 경로: `<root>/<userId>/<clipId>/<uuid>-<filename>` — 사용자/클립별 격리
- **경로 탈출 방어** (`../` 같은 거): `resolved.startsWith(root)` 체크

**A/B 재생:**
- 오디오 스트리밍 엔드포인트 `GET /api/recordings/{id}/audio`
- `<audio>` 태그는 Authorization 헤더 못 보내므로 → fetch + blob URL로 우회

---

### STAGE 7: SRS 복습 (6 태스크)
**목표: Anki 같은 자동 복습 큐.**

**SM-2 알고리즘:**
- 클립마다 (easiness, intervalDays, repetitions, dueDate) 상태 추적
- 사용자가 "쉬움/보통/어려움/다시" 누름 → 다음 복습 날짜 계산
- 어려우면 빨리 또 보고, 쉬우면 점점 간격 늘림

**구현:**
- `Sm2Calculator` — 순수 함수, Spring 의존 X, 테스트하기 좋음
- `ReviewService.onClipCreated` — 클립 만들면 자동으로 ReviewItem(dueDate=오늘) 생성 (이벤트 구독)
- 단위 테스트로 5가지 시나리오 (첫 성공, 두 번째 성공, 실패 시 리셋, easiness 하한, quality 범위 검증)

**프론트엔드:**
- `/review` 페이지: 큐 카드, 자막 보기 토글, 4개 응답 버튼
- 키보드 단축키 (1=다시, 2=어려움, 3=보통, 4=쉬움)

---

### STAGE 8: 큐레이션 (3 태스크)
**목표: 신규 사용자가 빈 라이브러리 안 보게, 추천 영상 30개.**

- `Collection` + `CollectionVideo` 엔티티
- `curated-videos.yml` 파일 (YAML, 사람이 편집)
- `CuratedCollectionSeeder` — 부팅 시 YAML 읽어서 영상 임포트
- 실패한 URL은 로그만 남기고 다음 진행 (한 영상 깨졌다고 startup 깨지면 안 됨)

---

### STAGE 9: 폴리시 + 배포 (6 태스크)
**목표: 실제 사용 가능 + 배포 가이드.**

- 에러 페이지 (`app/error.tsx`, `app/not-found.tsx`)
- 모바일 반응형 점검 (헤더 nav 오버플로우 스크롤)
- `backend/Dockerfile` (멀티스테이지, non-root user, healthcheck)
- `DEPLOY.md` — Vercel + Railway/Render 환경변수 매트릭스 + 비용 추정

---

## 4. Roadmap 이후의 폴리시 (추가로 한 일)

스테이지 9 끝나고 사용자가 "계속해"라고 해서 한 추가 작업:

### 성능
- N+1 쿼리 2곳 발견 → 배치로 수정 (ClipService.list, ReviewService.queue)
- Claude 호출이 트랜잭션 안에 있어서 DB 커넥션 점유하던 거 → 트랜잭션 밖으로 빼고 3단계로 쪼갬

### 보안
- multipart 파일 크기 한도가 1MB 기본 → 12MB로 설정 + 413 에러 핸들러
- X-Forwarded-For 무조건 신뢰하면 IP 스푸핑 가능 → trusted-proxies 화이트리스트
- 로그인 시 unknown email에도 bcrypt 한 번 돌림 → 응답 시간 일정 (user enumeration 방지)
- 동시 회원가입 → 500 대신 409 (DataIntegrityViolation → CONFLICT 매핑)

### 마찰 제거 (UX)
- 키보드 단축키 (Space/R/L 등) + `?` 도움말 다이얼로그
- 라이브러리 정렬 드롭다운 + 태그 자동완성
- JSON 내보내기 ("내 데이터 받기")
- 프로필 설정 페이지 (이름/비밀번호)
- 클립별 메모 (Korean 글로스 등 자유 입력)

### 인프라
- GitHub Actions CI (백엔드 테스트/빌드 + 프론트 lint/build + Docker build)
- 종합 스모크 스크립트 (`scripts/smoke.sh`)
- Vitest로 프론트 단위 테스트 11개
- Playwright E2E 11개 시나리오 (진짜 Chromium)

### 코드 리뷰 + 수정
일을 한 번 다 한 다음, **자체 코드 리뷰 에이전트**에게 검토 요청. HIGH 4개 + MEDIUM 6개 + LOW 5개 발견. 그 중 HIGH/MEDIUM 다 수정. 자세한 건 git log 참조.

---

## 5. 5가지 테스트 계층 — 이게 가장 헷갈리는 부분

소프트웨어 테스트는 단계가 있어요. 위로 갈수록 비싸고 느리지만 더 실제에 가까움.

```
                   ┌──────────────────┐
                   │ 수동 (사람 클릭)  │  ← 가장 비싸고 느림, 가장 확실
                   ├──────────────────┤
                   │ E2E (Playwright) │  ← 진짜 브라우저 자동화
                   ├──────────────────┤
                   │ 종합 스모크      │  ← API curl로 사이클 도는지
                   ├──────────────────┤
                   │ 통합 테스트       │  ← Spring + 진짜 DB
                   ├──────────────────┤
                   │ 단위 테스트       │  ← 함수 하나 (제일 많이 짠다)
                   └──────────────────┘
```

이 프로젝트의 각 계층 매핑:

| 계층 | 도구 | 어디 |
|------|------|------|
| 단위 | JUnit + Mockito | `backend/src/test/.../Sm2CalculatorTest`, `JwtTokenProviderTest`, `ClaudeClientParseTest` |
| 단위 (프론트) | Vitest | `frontend/tests/api-client.test.ts`, `use-shortcuts.test.tsx` |
| 통합 | Spring + Testcontainers | `AuthControllerIntegrationTest`, `ClipServiceTest`, `RecordingControllerTest`, `ProfileEndpointTest`, `ClipDeleteCascadeTest` |
| 스모크 | curl + bash | `scripts/smoke.sh` |
| E2E | Playwright + Chromium | `e2e/tests/smoke.spec.ts` |
| 수동 | 사람 | 아직 안 함 (사용자가 직접 할 일) |

**규칙:** 아래로 갈수록 많이, 위로 갈수록 적게. 단위 테스트 50개 + 통합 10개 + E2E 5개가 이상적.

---

## 6. 막혔을 때 한 일들 — 디버깅 사례

압도되는 것 중 하나가 "어떻게 이걸 다 한 번에 맞췄지?"인데, 사실은 **여러 번 틀렸고 그때마다 고쳤다**가 정답.

### 사례 1: PostgreSQL 5432 포트 충돌
- 증상: `docker compose up`은 됐지만 백엔드 startup이 "role tubeshadow does not exist"
- 디버깅: `lsof -nP -iTCP:5432 -sTCP:LISTEN` → 호스트에 이미 다른 postgres 떠 있음
- 수정: docker-compose.yml에서 5434로 매핑, application-dev.yml도 5434로

### 사례 2: 클립 삭제 시 500 에러
- 증상: 클립 만들고 바로 삭제하면 500
- 디버깅: 로그 따라가니 `StaleObjectStateException` (낙관적 락 실패)
- 원인: `deleteByClipId` 자동 생성 쿼리가 entity를 Hibernate 1차 캐시에 로드 → DB의 ON DELETE CASCADE가 같은 row 먼저 지움 → flush 시 "row not found"
- 수정: `@Modifying @Query`로 직접 DELETE SQL 작성 (캐시 안 거침)
- 회귀 방지: `ClipDeleteCascadeTest` 작성

### 사례 3: Rate Limit Filter가 Tomcat에 두 번 등록됨
- 증상: 백엔드 startup이 "No default constructor found" 에러
- 원인: `Filter` 인터페이스 + `@Component`면 Spring Boot가 자동으로 Tomcat에도 등록 (그러면 default 생성자 필요)
- 수정: `Filter` 대신 `HandlerInterceptor`로 변경 → Spring MVC 안에만 살아서 자동 등록 안 됨

### 사례 4: E2E 5/11 실패
- 증상: 1차 실행 시 절반 실패
- 디버깅: `e2e/test-results/.../error-context.md`를 읽음. Playwright가 친절하게 "왜 실패했는지" 적어줌
- 원인 4가지:
  1. 모듈 레벨 `const TEST_USER` → 모든 테스트가 같은 email → 두 번째부터 409
  2. shadcn CardTitle이 heading이 아니라 div → `getByRole('heading')` 안 통함
  3. NavLink와 h1이 같은 텍스트 "라이브러리" → strict mode 충돌
  4. YouTube IFrame이 headless에서 currentTime 진행 안 함 → 시작/끝 버튼 시나리오 불가
- 수정: 시나리오마다 `freshUser()` 호출, 셀렉터를 `getByRole('heading')` + `<h1>` 한정, YouTube 의존 시나리오는 API로 우회

→ 3차 실행에서 11/11.

**여기서 배울 점:** 한 번에 안 됨이 정상. 실패 메시지를 차분히 읽고 한 번에 하나씩 고치면 됨.

---

## 7. 따라하고 싶다면 — 어디서 시작할까

전부 한 번에 이해할 필요 없습니다. 단계별 학습 경로:

### Day 1-2: 기본 흐름
1. `docker compose up -d` 한 번 해보기 (DB 띄움)
2. `./gradlew bootRun` 백엔드 띄움
3. 브라우저에서 `http://localhost:8080/swagger-ui/index.html` → API 직접 호출 (Swagger UI에서 클릭만으로 됨)
4. `curl -X POST .../api/auth/signup` 직접 해보기

→ "백엔드와 API 호출이 뭔지" 체감

### Day 3-5: 코드 한 줄씩 따라가기
**가장 작은 파일부터** (이 순서대로):
1. `backend/src/main/java/com/tubeshadow/auth/domain/User.java` — Entity가 뭔지
2. `backend/src/main/java/com/tubeshadow/auth/repository/UserRepository.java` — Repository 인터페이스
3. `backend/src/main/java/com/tubeshadow/common/web/HealthController.java` — Controller 1개
4. `backend/src/test/.../UserRepositoryTest.java` — 테스트 어떻게 쓰는지
5. `backend/src/main/java/com/tubeshadow/auth/application/AuthService.java` — 비즈니스 로직

→ "Spring Boot 백엔드의 한 도메인이 어떻게 흐르는지" 이해

### Day 6-10: 프론트엔드
1. `frontend/app/page.tsx` — 페이지 컴포넌트
2. `frontend/lib/api/client.ts` — API 호출 공통
3. `frontend/lib/stores/auth-store.ts` — Zustand 사용 예
4. `frontend/components/auth/AuthForm.tsx` — 폼 + mutation
5. `frontend/app/(app)/library/page.tsx` — 데이터 + 필터 + 정렬

→ "React + Next.js 컴포넌트 패턴" 이해

### Day 11+: 깊은 곳
- `ARCHITECTURE.md` 천천히 읽기 (시스템 디자인)
- `ClipAnalysisService.java` — 비동기 + 이벤트 + 트랜잭션 패턴 (이게 가장 미묘함)
- `Sm2Calculator.java` — 알고리즘 구현

---

## 8. 마지막으로

이걸 다 외울 필요 전혀 없습니다. 필요할 때 다시 펴서 보면 됩니다.

**진짜 중요한 건 3가지:**
1. **태스크 단위로 일했다** — 한 번에 한 가지. ROADMAP.md로 분해.
2. **모든 결정은 NORTH STAR로 돌아가서 검증했다** — 새 기능이 가치에 맞나, OUT-OF-SCOPE에 안 걸리나.
3. **실패하면 우회하거나 BLOCKERS.md에 적었다** — 추측해서 진행하지 않음.

이 세 가지 습관만 가지면 어떤 도구든 익혀가면서 만들 수 있습니다.

기술이 놀라운 게 아니라, **방법론이 놀라운 거예요.** 도구는 익히면 되지만, 방법론은 의식적으로 훈련해야 합니다.

천천히 가셔도 됩니다. 압축된 거 같이 풀어봐요.
