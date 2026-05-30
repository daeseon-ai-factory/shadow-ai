# 코드 워크스루 — 원숭이용

> 한 번에 다 외우려 하지 마세요. 시나리오 하나씩, 손가락으로 짚으면서 따라오세요.
> 단어가 낯설면 옆에 메모만 하고 넘어가세요. 두 번째 읽을 때 채워집니다.
>
> **정정 (2026-05-30):** AI 분석 시나리오에서 "Claude"로 나오는 부분은 실제로 `AiAnalysisClient` 추상화를 통하며 기본 제공자는 **Gemini 2.5 Flash**입니다 (`AI_PROVIDER`로 선택). 흐름은 동일합니다.

이 문서는 **사용자가 화면에서 어떤 행동을 하면 코드 어디가 깨어나는지**를 1:1로 짚어줍니다. 5개의 시나리오를 따라가면 전체 구조가 손에 잡힙니다.

---

## 0. 큰 그림 한 장

```
┌──────────────────┐       HTTP+JSON        ┌──────────────────┐
│  브라우저         │  ─────────────────▶   │  Spring Boot      │
│  (Next.js 화면)  │  ◀─────────────────    │  (Java 서버)     │
└────────┬─────────┘                        └────────┬─────────┘
         │                                            │ JDBC
         │  localStorage에                            │
         │  토큰 보관                                  ▼
         │                                   ┌──────────────────┐
         │                                   │  PostgreSQL       │
         │                                   │  (데이터 저장)    │
         │                                   └──────────────────┘
         │                                            │
         │                                            │ ProcessBuilder
         │                                            ▼
         │                                   ┌──────────────────┐
         │                                   │  yt-dlp 바이너리  │ ← YouTube 자막
         │                                   └──────────────────┘
         │                                            │
         │                                            │ HTTPS
         │                                            ▼
         │                                   ┌──────────────────┐
         │                                   │  Anthropic Claude │ ← AI 분석
         │                                   └──────────────────┘
```

**핵심 사실 3개**
1. 브라우저는 **그림 그리고 클릭 받는 곳**. 진짜 데이터는 다 Java 서버.
2. 모든 요청은 **HTTP + JSON**. 둘 사이의 약속 = API 엔드포인트.
3. Java 서버는 **PostgreSQL에 데이터 저장**, 외부 도구(yt-dlp, Claude)를 호출함.

---

## 폴더 한 줄 설명

```
shadow-ai/
├── backend/         ← Java 서버 (Spring Boot)
├── frontend/        ← 웹 화면 (Next.js)
├── e2e/             ← 브라우저 자동화 테스트 (Playwright)
├── scripts/         ← bash 스크립트
└── docker-compose.yml  ← PostgreSQL 띄우는 설정 1개
```

### backend 안
```
backend/src/main/
├── java/com/tubeshadow/
│   ├── TubeshadowApplication.java   ← 서버 시작점 (main 메서드)
│   ├── common/        ← 모든 도메인 공통 (예외, 응답 포맷, 베이스 클래스)
│   ├── auth/          ← 회원가입/로그인/JWT
│   ├── video/         ← YouTube 영상 + 자막
│   ├── clip/          ← 클립 만들기/조회/편집
│   ├── analysis/      ← Claude AI 분석
│   ├── recording/     ← 사용자 녹음 업로드
│   └── review/        ← 복습 큐 (SRS)
└── resources/
    ├── application.yml          ← 공통 설정
    ├── application-dev.yml      ← 개발 환경 (localhost DB)
    ├── application-prod.yml     ← 프로덕션
    ├── db/migration/V1__~V8__   ← DB 스키마 만들기 SQL
    └── curated-videos.yml       ← 큐레이션 영상 목록
```

### 각 도메인 폴더 안의 표준 구조 (예: auth/)
```
auth/
├── domain/      ← User.java (사용자 데이터 형태)
├── repository/  ← UserRepository (DB 접근 인터페이스)
├── application/ ← AuthService (비즈니스 로직)
├── infrastructure/ ← 외부 시스템 호출 (있을 수도 없을 수도)
├── security/    ← JWT 토큰, 필터, 보안 설정
└── api/         ← AuthController (HTTP 엔드포인트)
    └── dto/     ← 요청/응답 데이터 형태
```

**6개 도메인 모두 같은 패턴**이에요. 한 도메인만 익히면 나머지 5개는 줄 따라가는 거랑 비슷.

### frontend 안
```
frontend/
├── app/                      ← 페이지 (URL 1개 = 폴더 1개)
│   ├── page.tsx              ← 홈 (/)
│   ├── (auth)/               ← 로그인 안 한 페이지 그룹
│   │   ├── signup/page.tsx   ← /signup
│   │   └── login/page.tsx    ← /login
│   ├── (app)/                ← 로그인 필요한 페이지 그룹
│   │   ├── layout.tsx        ← 헤더 + 미인증 시 /login으로
│   │   ├── library/page.tsx  ← /library
│   │   ├── import/page.tsx   ← /import
│   │   ├── video/[id]/page.tsx     ← /video/<영상id>
│   │   ├── player/[clipId]/page.tsx ← /player/<클립id>
│   │   ├── review/page.tsx
│   │   ├── settings/page.tsx
│   │   └── discover/...
│   ├── providers.tsx         ← TanStack Query + Toast 감싸기
│   └── layout.tsx            ← 모든 페이지 공통 (HTML/body)
├── components/               ← 재사용 UI 조각
│   ├── ui/                   ← 버튼, 카드, 다이얼로그 (shadcn)
│   ├── player/               ← YouTube 플레이어, 자막 패널
│   ├── clip/                 ← 클립 만들기 패널, AI 패널, 노트
│   └── recording/            ← 녹음 관련
├── lib/
│   ├── api/                  ← 서버 호출 함수들 (clips.ts, auth.ts 등)
│   ├── stores/               ← Zustand 상태 (auth-store.ts)
│   └── use-shortcuts.ts      ← 키보드 단축키 훅
```

**Next.js App Router 규칙**: `app/<경로>/page.tsx` = `https://.../<경로>` 페이지. 폴더가 곧 URL.

---

## 시나리오 1: 사장님이 처음 브라우저를 열면

**URL: `http://localhost:3000`**

```
1. Chrome이 GET / 보냄
        ↓
2. Next.js dev 서버가 받음
        ↓
3. app/layout.tsx 실행 → <html><body>로 감쌈
        ↓
4. app/page.tsx 실행 → 홈 화면 컴포넌트
        ↓
5. 그 안의 useQuery(["health"], healthApi.get) 깨어남
        ↓
6. healthApi.get() = apiClient.get("/api/health")
        ↓ (HTTPS — 다른 주소)
7. http://localhost:8080/api/health 로 fetch
        ↓
8. [백엔드] JwtAuthenticationFilter 통과 (이 엔드포인트는 public이라 토큰 검사 안 함)
        ↓
9. HealthController.health() 메서드 실행
        ↓
10. return ApiResponse.ok(Map.of("status", "ok"))
        ↓
11. JSON으로 직렬화: {"data":{"status":"ok"},"timestamp":"..."}
        ↓
12. 브라우저로 응답
        ↓
13. TanStack Query가 data에 저장
        ↓
14. 컴포넌트 다시 렌더 → 화면에 "ok" 표시
```

**관련 파일 — 손가락으로 짚어보세요:**
- 프론트 시작점: `frontend/app/page.tsx`
- 프론트 API 호출: `frontend/lib/api/health.ts` + `frontend/lib/api/client.ts`
- 백엔드 진입: `backend/src/main/java/com/tubeshadow/common/web/HealthController.java`
- 백엔드 응답 포맷: `backend/src/main/java/com/tubeshadow/common/web/ApiResponse.java`

### 핵심 코드 짧게

**`frontend/app/page.tsx`** (홈)
```tsx
const health = useQuery({
  queryKey: ["health"],
  queryFn: () => healthApi.get(),
});
// ...
{health.data && <span>상태: {health.data.status}</span>}
```
↑ `useQuery` = "서버에서 가져와서 캐시까지 해줘". 자동으로 로딩/에러/성공 상태 관리.

**`frontend/lib/api/client.ts`**
```ts
export async function apiRequest<T>(path: string, options): Promise<T> {
  const response = await fetch(buildUrl(path, query), { method, headers, body: serialized });
  const payload = JSON.parse(text);
  if (!response.ok || payload.error) {
    throw new ApiError(response.status, error.code, error.message);
  }
  return payload.data as T;
}
```
↑ 모든 API 호출이 이 한 함수를 거쳐가요. envelope 풀고, 에러면 던지고, data만 반환.

**`backend/src/main/java/com/tubeshadow/common/web/HealthController.java`**
```java
@RestController
@RequestMapping("/api/health")
public class HealthController {
    @GetMapping
    public ApiResponse<Map<String, String>> health() {
        return ApiResponse.ok(Map.of("status", "ok"));
    }
}
```
↑ `@RestController` = "이 클래스 메서드들은 HTTP 응답 만든다". `@GetMapping` = GET 요청. 끝.

---

## 시나리오 2: 회원가입

**사용자: /signup 페이지에서 이메일/비번/이름 입력 → "회원가입" 클릭**

```
1. 폼 submit
        ↓
2. AuthForm 컴포넌트의 handleSubmit
        ↓
3. authApi.signup({email, password, displayName})
        ↓
4. apiClient.post("/api/auth/signup", payload)
        ↓
5. fetch POST http://localhost:8080/api/auth/signup
   Content-Type: application/json
   body: JSON
        ↓
6. [백엔드] AuthRateLimitFilter 통과 (분당 IP당 20회 카운트)
        ↓
7. JwtAuthenticationFilter 통과 (public 엔드포인트라 토큰 없어도 OK)
        ↓
8. AuthController.signup(@Valid SignupRequest)
        ↓
9. @Valid → 이메일 형식 검증, 비번 8자 이상 검증
        ↓
10. AuthService.signup(request) — @Transactional 시작
        ↓
11. userRepository.existsByEmail("..." ) → 중복 체크 → false면
        ↓
12. BCryptPasswordEncoder.encode(비번) → 해시 만들기 (수십ms)
        ↓
13. User.createNew(이메일, 해시, 이름) — UUID 생성
        ↓
14. userRepository.save(user) → SQL INSERT
        ↓
15. JwtTokenProvider.issueAccessToken(userId, email) → HS256 서명 JWT 발급
        ↓
16. AuthTokenResponse return — @Transactional commit
        ↓
17. 201 Created + JSON body {data: {accessToken, user, expiresInSeconds}}
        ↓
18. [프론트] AuthForm이 응답 받음
        ↓
19. setSession(token, user) → Zustand store에 저장
        ↓
20. Zustand persist middleware가 localStorage에 자동 저장
        ↓
21. router.push("/library")
        ↓
22. /library 페이지 렌더 시작
        ↓
23. (app)/layout.tsx의 useEffect가 token 확인 → 있으니 통과
        ↓
24. library 페이지 표시
```

**관련 파일:**
- 프론트 폼: `frontend/components/auth/AuthForm.tsx`
- 프론트 API: `frontend/lib/api/auth.ts`
- 프론트 토큰 보관: `frontend/lib/stores/auth-store.ts`
- 백엔드 컨트롤러: `backend/src/main/java/com/tubeshadow/auth/api/AuthController.java`
- 백엔드 로직: `backend/src/main/java/com/tubeshadow/auth/application/AuthService.java`
- 백엔드 사용자 데이터: `backend/src/main/java/com/tubeshadow/auth/domain/User.java`
- DB 스키마: `backend/src/main/resources/db/migration/V1__create_users.sql`

### 핵심 코드 짧게

**`backend/.../auth/application/AuthService.java`**
```java
@Transactional
public AuthTokenResponse signup(SignupRequest request) {
    String email = User.normalizeEmail(request.email());
    if (userRepository.existsByEmail(email)) {
        throw new ConflictException("EMAIL_TAKEN", "Email already in use");
    }
    String hash = passwordEncoder.encode(request.password());
    User user = userRepository.save(User.createNew(email, hash, request.displayName().trim()));
    return issue(user);  // JWT 발급해서 response
}
```
↑ **5줄짜리 함수가 회원가입의 전부**. 이게 좋은 코드.

**`backend/.../auth/domain/User.java`**
```java
@Entity
@Table(name = "users", uniqueConstraints = {...})
public class User extends BaseEntity {
    @Id private UUID id;
    @Column private String email;
    @Column private String passwordHash;
    @Column private String displayName;

    public static User createNew(String email, String passwordHash, String displayName) {
        return new User(UUID.randomUUID(), normalizeEmail(email), passwordHash, displayName);
    }
}
```
↑ `@Entity` = JPA가 이걸 DB 테이블이라 봄. `@Id` = 기본키. UUID 직접 생성 (DB 시퀀스 안 씀).

**`frontend/lib/stores/auth-store.ts`**
```ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clear: () => set({ token: null, user: null }),
    }),
    { name: "tubeshadow.auth", storage: createJSONStorage(() => localStorage) },
  ),
);
```
↑ Zustand store + `persist` middleware = "자동으로 localStorage에 저장하고 다음에 들어올 때 자동으로 꺼내옴".

---

## 시나리오 3: YouTube 영상 임포트 (★ 가장 복잡)

**사용자: /import 페이지에서 URL 붙여넣기 → "임포트하고 쉐도잉 시작" 클릭**

```
1. 폼 submit
        ↓
2. videosApi.importByUrl(url)
        ↓
3. apiClient.post("/api/videos/import", {url})
        ↓
4. fetch POST + Authorization: Bearer <token>
        ↓
5. [백엔드] JwtAuthenticationFilter
        ↓ token parse → AuthenticatedUser SecurityContext에 주입
6. VideoController.importVideo(@CurrentUser AuthenticatedUser user)
        ↓ @CurrentUser → CurrentUserArgumentResolver가 SecurityContext에서 꺼냄
7. VideoImportService.importByUrl(request.url())  — @Transactional 시작
        ↓
8. YoutubeUrlParser.extractVideoId(url) → "abcdefghijk" 같은 11자 ID 뽑기
        ↓
9. videoRepository.findByYoutubeId(videoId) → 기존에 임포트한 적 있나?
        ├── 있으면 → retryTranscriptIfMissing(existing)
        │      └── transcript 없으면 yt-dlp로 한 번 더 시도, 있으면 그대로 return
        └── 없으면 → fetchAndPersist(videoId)
                ↓
10.   YoutubeMetadataClient.fetch(videoId) — oEmbed HTTP 호출
        ↓ {title, authorName, thumbnailUrl}
11.   Video.createNew(videoId, title) → UUID 생성
12.   video.applyMetadata(channelName, durationSeconds, thumbnailUrl)
        ↓
13.   YoutubeTranscriptClient.fetch(videoId) ← 여기가 yt-dlp 호출
        ↓ ProcessBuilder로 "yt-dlp --write-subs --skip-download ..." 실행
        ↓ /tmp/...sub.en.json3 파일 생성됨
        ↓ Files.readString + parseJson3 → TranscriptSegment 리스트
14.   video.attachTranscript(segments) → transcript_status = READY
        ↓ 자막 못 가져오면 video.markTranscriptUnavailable() → status=UNAVAILABLE
15.   videoRepository.save(video) → SQL INSERT
        ↓
16. @Transactional commit
        ↓
17. VideoResponse.from(video) → JSON 직렬화
        ↓
18. 200 OK + {data: {id, youtubeId, title, transcriptStatus, transcriptSegments: [...]}}
        ↓
19. [프론트] ImportPage가 응답 받음
        ↓
20. router.push(`/video/${video.id}`)
        ↓
21. /video/[id] 페이지 마운트
        ↓
22. useQuery(["video", id]) 깨어남 → GET /api/videos/{id}
        ↓
23. VideoController.getVideo → VideoImportService.getOrThrow → JSON 반환
        ↓
24. 받은 데이터로 화면 그림:
    - 좌측: <YoutubePlayer videoId={youtubeId}> (이게 YouTube IFrame Player API 띄움)
    - 좌측 아래: <ClipCreatePanel> (구간 선택 패널)
    - 우측: <TranscriptPanel segments={transcriptSegments}> (자막 리스트)
        ↓
25. 자막 클릭 → onSeek(segment.startMs) → playerRef.current.seekTo(ms / 1000)
        ↓ YouTube IFrame이 그 시간으로 점프
```

**관련 파일 — 9개. 차분히 짚으세요:**
- 프론트 페이지: `frontend/app/(app)/import/page.tsx`, `frontend/app/(app)/video/[id]/page.tsx`
- 프론트 컴포넌트: `frontend/components/player/YoutubePlayer.tsx`, `TranscriptPanel.tsx`, `frontend/components/clip/ClipCreatePanel.tsx`
- 프론트 API: `frontend/lib/api/videos.ts`
- 백엔드 컨트롤러: `backend/src/main/java/com/tubeshadow/video/api/VideoController.java`
- 백엔드 로직: `backend/src/main/java/com/tubeshadow/video/application/VideoImportService.java`
- 백엔드 외부 호출:
  - `backend/src/main/java/com/tubeshadow/video/infrastructure/YoutubeMetadataClient.java` — oEmbed
  - `backend/src/main/java/com/tubeshadow/video/infrastructure/YoutubeTranscriptClient.java` — yt-dlp ★ 여기가 이번에 고친 곳
- URL 파싱: `backend/src/main/java/com/tubeshadow/video/util/YoutubeUrlParser.java`

### 핵심 코드 짧게

**`VideoImportService.java` (방금 자가 회복 로직 추가한 곳)**
```java
@Transactional
public Video importByUrl(String urlOrId) {
    String videoId = YoutubeUrlParser.extractVideoId(urlOrId)
            .orElseThrow(() -> new BusinessException(...));

    return videoRepository.findByYoutubeId(videoId)
            .map(this::retryTranscriptIfMissing)   // 있으면 → 자막 없으면 재시도
            .orElseGet(() -> fetchAndPersist(videoId));  // 없으면 → 새로 만들기
}
```

**`YoutubeTranscriptClient.java` (yt-dlp 호출)**
```java
ProcessBuilder pb = new ProcessBuilder(
    "yt-dlp",
    "--write-subs", "--write-auto-subs", "--skip-download",
    "--sub-format", "json3",
    "--sub-langs", "en",
    "-o", outBase.toString(),
    "https://www.youtube.com/watch?v=" + videoId
);
Process process = pb.start();
process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
// → /tmp/.../sub.en.json3 파일이 생김
Path subFile = findFirstJson3(tempDir);
String json3 = Files.readString(subFile);
return parseJson3(json3);  // {events: [{tStartMs, dDurationMs, segs: [{utf8}]}]}
```
↑ Java에서 외부 프로그램 호출 = `ProcessBuilder`. yt-dlp를 그냥 셸 명령처럼 실행하고 결과 파일 읽는다.

**`frontend/components/player/TranscriptPanel.tsx`** (자막 클릭 → seek)
```tsx
{segments.map((segment, idx) => (
  <div
    key={idx}
    onClick={() => onSeek(segment.startMs)}     // 클릭 → 부모로 시간 전달
    onDoubleClick={() => onToggleSegment?.(segment)}  // 더블클릭 → 클립 범위
  >
    <span>{formatTime(segment.startMs)}</span>
    <span>{segment.text}</span>
  </div>
))}
```
↑ 자막 리스트는 그냥 `segments.map`. 클릭 핸들러로 부모에 알리고 부모가 `playerRef.current.seekTo(ms / 1000)` 호출.

**`frontend/components/player/YoutubePlayer.tsx`** (IFrame Player 래퍼)
```tsx
useEffect(() => {
  loadYoutubeApi().then((YT) => {
    player = new YT.Player(containerRef.current, {
      videoId,
      events: { onReady: ..., onStateChange: ... },
    });
  });
}, [videoId]);

useImperativeHandle(ref, () => ({
  play: () => player?.playVideo(),
  pause: () => player?.pauseVideo(),
  seekTo: (s) => player?.seekTo(s, true),
  setPlaybackRate: (r) => player?.setPlaybackRate(r),
  getCurrentTime: () => player?.getCurrentTime() ?? 0,
}), []);
```
↑ React로 YouTube IFrame Player API를 감쌈. `useImperativeHandle`로 부모가 `playerRef.current.seekTo(...)` 같은 메서드 호출 가능.

---

## 시나리오 4: 클립 만들기 + AI 분석 비동기

**사용자: 영상 페이지에서 "시작" 누르고 "끝" 누르고 "이 구간 클립 저장" 클릭**

```
[프론트]
1. ClipCreatePanel의 setStartHere() → selectedRange = {startMs, endMs}
2. setEndHere() → endMs 업데이트
3. "이 구간 클립 저장" 클릭 → openSaveModal() → 모달 표시
4. 사용자 이름/태그 입력 → "저장" 클릭
5. createMutation.mutate({videoId, startMs, endMs, name, tags})
6. clipsApi.create(payload) → POST /api/clips

[백엔드 — 첫 번째 짧은 트랜잭션]
7. ClipController.create → ClipService.create(userId, request) — @Transactional 시작
8. videoRepository.findById(videoId) → Video 조회
9. Clip.createNew(userId, videoId, startMs, endMs, name, tags) → UUID 생성
10. TranscriptSlicer.slice(video.getTranscriptSegments(), startMs, endMs)
    → 그 구간의 자막 텍스트 합쳐서 clip.transcript에 저장
11. clipRepository.save(clip) → INSERT
12. events.publishEvent(new ClipCreatedEvent(clipId, userId, transcript))
    ← 발행만 함. 트랜잭션 commit 후 구독자가 실행됨.
13. ClipResponse return — @Transactional commit
14. 201 + JSON 응답

[프론트 — 받자마자 페이지 이동]
15. onSuccess → router.push(`/player/${clip.id}`)
16. /player/[clipId] 페이지 마운트, useQuery로 clip 데이터 받기
17. 페이지 그림 — YoutubePlayer + 속도/반복 카드 + 4개 사이드 패널
    (쉐도잉 자막 / 내 노트 / AI 설명 / 녹음+A/B)

[백엔드 — 동시에, 백그라운드에서]
A. AFTER_COMMIT 이벤트 디스패치 시작
B. ClipAnalysisService.onClipCreated(event) ← @Async (별도 스레드)
   → runAnalysisPipeline(clipId) 실행
      ├─ prepareAnalysis: 짧은 트랜잭션에서 ClipAnalysis(PENDING) row INSERT
      ├─ claudeClient.analyzeClip(transcript) ← 트랜잭션 밖, HTTP 호출 1~3초
      └─ completeAsReady: 짧은 트랜잭션에서 analysis status=READY로 UPDATE

C. ReviewService.onClipCreated(event) ← @TransactionalEventListener(AFTER_COMMIT) + REQUIRES_NEW
   → clipRepository.findById(clipId) — 아직 있는지 확인 (race guard)
   → reviewRepository.save(ReviewItem.createNew(userId, clipId, today)) ← 복습 큐에 등록

[프론트 — 동시에]
D. AnalysisPanel이 마운트되면서 useQuery(["analysis", clipId])
   → GET /api/clips/{id}/analysis
   → status=PENDING이면 3초마다 자동 폴링 (refetchInterval)
   → status=READY 되면 폴링 멈추고 결과 표시
```

**시각화하면 이런 모양:**

```
[사용자가 저장 클릭] ──────▶ 201 응답 ──────▶ /player/clipId 이동
                                                    │
              ┌─────────────────────────────────────┘
              │ AnalysisPanel이 3초마다 폴링
              ▼
[백그라운드]   GET /analysis → 202 PENDING (계속)
ClipAnalysisService ─▶ Claude API 호출 (1~3초)
              ▼
              UPDATE analysis SET status=READY
              ▼
ReviewService ─▶ INSERT review_item
              ▼
[폴링이 그제서야] GET /analysis → 200 READY ─▶ 화면에 분석 표시
```

**관련 파일:**
- 프론트: `frontend/components/clip/ClipCreatePanel.tsx`, `AnalysisPanel.tsx`
- 프론트 API: `frontend/lib/api/clips.ts`, `frontend/lib/api/analysis.ts`
- 백엔드 클립: `ClipController`, `ClipService`, `TranscriptSlicer`, `ClipCreatedEvent`
- 백엔드 분석: `ClipAnalysisService`, `ClaudeClient`, `ClipAnalysisPrompt`
- 백엔드 복습 구독: `ReviewService.onClipCreated`

### 왜 이렇게 복잡하게 쪼갰나
- Claude 호출이 1~3초 걸리는데, 그 동안 사용자가 클립 저장 응답을 못 받으면 답답 → **비동기로**
- 비동기 작업을 트랜잭션 안에 두면 DB 커넥션을 그 시간 동안 잡고 있음 → **트랜잭션 밖에서**
- 분석/SRS 추가가 클립 저장 코드를 더럽히지 않게 → **이벤트로 분리**

이게 "Claude 호출이 트랜잭션 밖" 디자인 패턴이에요. 시스템 디자인 인터뷰 단골.

### 핵심 코드 짧게

**`ClipService.java`**
```java
@Transactional
public ClipResponse create(UUID userId, ClipCreateRequest req) {
    Video video = videoRepository.findById(req.videoId()).orElseThrow(...);
    Clip clip = Clip.createNew(userId, video.getId(), req.startMs(), req.endMs(), ...);
    clip.attachTranscript(TranscriptSlicer.slice(video.getTranscriptSegments(), req.startMs(), req.endMs()));
    Clip saved = clipRepository.save(clip);
    events.publishEvent(new ClipCreatedEvent(saved.getId(), saved.getUserId(), saved.getTranscript()));
    return ClipResponse.from(saved, video);
}
```
↑ 트랜잭션 안에서 클립 만들기만 하고 이벤트 발행. 분석/리뷰는 자기 일.

**`ClipAnalysisService.java`** (3단계 비동기 파이프라인)
```java
@TransactionalEventListener(phase = AFTER_COMMIT)
@Async
public void onClipCreated(ClipCreatedEvent event) {
    runAnalysisPipeline(event.clipId());
}

public void runAnalysisPipeline(UUID clipId) {
    TranscriptSnapshot snapshot = self().prepareAnalysis(clipId);   // 트랜잭션 1
    if (snapshot.transcript == null) { self().completeWithEmptyTranscript(clipId); return; }
    ClaudeClient.AnalysisResult result = claudeClient.analyzeClip(snapshot.transcript);  // HTTP, 트랜잭션 X
    self().completeAsReady(clipId, result);   // 트랜잭션 2
}
```
↑ self()는 자기 자신을 다시 받아오는 트릭. self.xxx()로 호출해야 @Transactional 프록시가 동작 (this.xxx()는 우회됨).

---

## 시나리오 5: 클립 플레이어에서 무한 반복

**/player/<clipId> 진입 시**

```
1. ClipPlayerPage 마운트
        ↓
2. useQuery(["clip", clipId]) → GET /api/clips/{id}
        ↓
3. data 도착 → ready=true (플레이어 onReady 이벤트로)
        ↓
4. useEffect 발동:
   - playerRef.current.seekTo(data.startMs / 1000)  // 클립 시작점으로 점프
   - playerRef.current.setPlaybackRate(playbackRate)
   - playerRef.current.play()
        ↓
5. setInterval (200ms마다):
   - nowMs = playerRef.current.getCurrentTime() * 1000
   - setCurrentMs(nowMs)  // 진행바 업데이트
   - if (loopEnabled && nowMs >= data.endMs):
       playerRef.current.seekTo(data.startMs / 1000)  ← 무한 반복의 핵심
        ↓
6. useShortcuts 등록:
   - Space → togglePlay
   - R → seekTo(startMs/1000) [처음부터]
   - L → loopEnabled 토글
   - , . → 속도 ±0.05
   - 0 → 1.0x
```

**핵심:** "무한 반복"이라는 마법이 아니라 그냥 **200ms마다 시간 체크하고 endMs 넘으면 startMs로 점프**시키는 것.

**관련 파일:**
- `frontend/app/(app)/player/[clipId]/page.tsx` — 전체 페이지
- `frontend/components/player/YoutubePlayer.tsx` — IFrame 컨트롤
- `frontend/lib/use-shortcuts.ts` — 키보드 단축키

### 핵심 코드
```tsx
useEffect(() => {
  if (!ready || !data) return;
  const handle = setInterval(() => {
    const nowMs = Math.floor(playerRef.current.getCurrentTime() * 1000);
    setCurrentMs(nowMs);
    if (loopEnabled && nowMs >= data.endMs) {
      playerRef.current.seekTo(data.startMs / 1000);  // ← 여기서 점프
    }
  }, 200);
  return () => clearInterval(handle);
}, [ready, data, loopEnabled]);
```
↑ React의 `useEffect` + `setInterval`로 폴링. clean up은 `return () => clearInterval(handle)`.

---

## 손에 잡히게 만드는 권장 학습 순서

| 일차 | 무엇 | 어디서 |
|------|------|--------|
| Day 1 | 시나리오 1 (홈 → health) 완전 이해 | `app/page.tsx` → `HealthController.java` 왕복 |
| Day 2 | 시나리오 2 (회원가입) 완전 이해 | `AuthForm` → `AuthService` 왕복 |
| Day 3 | DB 스키마 6개 표 그려보기 | `db/migration/V1__~V8__` 파일들 |
| Day 4 | 시나리오 3 (영상 임포트) | 9개 파일 — 가장 오래 걸림 |
| Day 5 | 시나리오 4 (클립 + AI 비동기) | 트랜잭션/이벤트 패턴 |
| Day 6 | 테스트 1개씩 읽기 | `UserRepositoryTest`, `Sm2CalculatorTest`, `ClipServiceTest` |
| Day 7+ | 작은 기능 1개 본인이 추가 | "라이브러리에 클립 총 개수 표시" 같은 거 |

---

## 마지막

이 워크스루는 "한 번 읽고 외우는" 문서가 아니에요. **시나리오 따라가다 모르는 단어 나오면 그것만 찾아보고, 다시 시나리오로 돌아오기**를 반복하세요.

진짜 가장 좋은 학습은 **본인이 작은 기능 하나 추가하는 것**입니다. 이때는 사이드킥(저) 옆에 두고 페어 프로그래밍처럼 진행하면 됩니다. 분해 다 한 다음에 그렇게 가시면 시니어 회로가 진짜로 켜집니다.
