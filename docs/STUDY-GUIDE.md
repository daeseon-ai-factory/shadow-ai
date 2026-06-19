# STUDY GUIDE — 이 코드를 "면접에서 방어 가능"하게 만들기

> 목표: 작성자가 되는 게 아니라 **방어자**가 되는 것. 시니어 면접은 *누가 쳤나*가 아니라
> *이해하고 5단계 "why"를 버티나*를 본다. 전부 이해 = 과잉. **아래 Tier 1만 딥하게.**
> 현실 일정: 백엔드 집중 **~1주** (하루 4~6h). 모바일 깊이는 안 파도 됨.

## 빠른 방법 (수동 읽기 ✗ → 능동 ✓, 3~5배 빠름)
각 주제마다 4단계로:
1. **읽기** — 아래 지정 파일.
2. **그리기** — 화이트보드에 흐름/구조를 *손으로*.
3. **깨기** — 일부러 고장 내고 뭐가 터지나 본다 (지정된 "깨기" 실험).
4. **방어** — 아래 "면접관 why" 질문에 *소리 내서* 답한다. 막히면 거기가 공부할 데.

---

## 🗺️ 0. 전체 지도 (반나절) — 먼저 이거
- 읽기: `ROADMAP.md`(섹션 0), 백엔드 패키지 트리 `backend/src/main/java/com/tubeshadow/`
  (도메인: `auth · video · clip · analysis · review · practice · library · billing · common`)
- **한 요청을 끝까지 따라가**: 로그인 → 클립 분석 1개.
  `AuthController` → `JwtAuthenticationFilter` → `ClipAnalysisController` → `ClipAnalysisService` → `CompositeAiClient`.
- 그릴 것: 모바일/웹 → Caddy(TLS) → Spring(8080) → Postgres / AI 프로바이더 / yt-dlp 사이드카.
- 설정 진입점: `backend/src/main/resources/application.yml` (프로파일별 `application-{dev,prod}.yml`).

---

# Tier 1 — 딥하게 (여기가 면접의 90%)

## 🟦 1. AI 프로바이더 폴백 (= "실패를 설계함" 스토리)
**읽기 (총 ~250줄):**
- `analysis/infrastructure/AiAnalysisClient.java` (인터페이스 `complete()` / `isConfigured()`)
- `analysis/infrastructure/CompositeAiClient.java` (93줄 — 핵심)
- `GeminiClient.java` / `OpenAiClient.java` / `ClaudeClient.java`
- `application.yml`의 `tubeshadow.ai.order` (기본 `gemini,openai,claude`)

**이해할 것:** 단일 프로바이더 = SPOF(레이트리밋·장애·비용). 순서대로 `isConfigured()` 된 첫 놈을
쓰고, 실패 시 다음으로. 왜 Gemini 기본? (무료티어 = 비용).

**깨기:** `~/.secrets`에서 `GEMINI_API_KEY` 빼고 (또는 `AI_ORDER=openai,claude`) 분석 돌려서 OpenAI로
넘어가는지 로그로 확인.

**면접관 "why" (다 답할 수 있어야 함):**
1. 왜 폴백을 넣었어? (SPOF / 비용 / 레이트리밋)
2. 폴백 트리거 조건은? `isConfigured()`만 보나, 런타임 에러도 보나? (코드 확인 — 정확히 말해)
3. 같은 프롬프트인데 프로바이더마다 응답 포맷 다르면? (각 Client가 어떻게 정규화하나)
4. 타임아웃/재시도/동시성은? (없으면 — "없다, 개인용이라. 프로덕션이면 ___로 막겠다" ← 이게 정답)
5. 100배 트래픽이면 어디 터져? (프로바이더 레이트리밋 → 큐잉/캐싱/백오프 얘기)

## 🟩 2. SM-2 간격반복 (= "도메인 알고리즘" 스토리)
**읽기 (~120줄):** `review/domain/Sm2Calculator.java` (56줄) + `review/application/ReviewService.java` + `review/api/ReviewController.java`
**이해할 것:** easiness factor(2.5 시작, 1.3 하한), quality<3 → interval 1 리셋, quality≥3 → 지수 간격(1,3,7,14,30…). due 큐 계산.
**깨기:** 복습 카드 하나 "Again" → 다음 due가 내일인지, "Easy" → 간격 늘어나는지 DB/응답으로 확인.
**면접관 why:** ① SM-2가 뭐고 왜 썼나(Leitner 대비)? ② easiness factor의 역할? ③ "Again" 누르면 정확히 뭐가 바뀌나? ④ 타임존/`localDate` 처리는? ⑤ 카드 수백만이면 due 쿼리 어떻게 최적화?

## 🟧 3. YouTube 트랜스크립트 + POToken (= "사일런트 장애 디버깅" — 제일 깊음, ~1.5일)
**읽기:**
- `video/application/VideoImportService.java` (임포트 오케스트레이션: 디바이스 자막 → 백엔드 yt-dlp 폴백)
- `mobile/src/lib/youtube-transcript-webview.tsx` (디바이스측 WebView 스크래핑)
- `backend/Dockerfile` (yt-dlp + deno + bgutil POToken 사이드카가 *왜* 한 컨테이너에 있나 — 주석 읽어)
- `infrastructure/ncp/box/docker-compose.yml`의 pot-provider (포트 4416/4417)
- 블로그: `content/logs/shadow-ai/2026-06-15-...transcript-method-decision-and-fallbacks.mdx`
- 메모리: `docs/troubleshooting.md`의 POToken 항목

**이해할 것 (개념 — 외부 문서도 봐):** 데이터센터 IP에서 토큰 없이 자막 요청 → **HTTP 200 + 0바이트**
(에러 아닌 침묵 실패!). POToken = YouTube가 "사람/정상 클라이언트" 증명용으로 요구하는 토큰.
bgutil provider(Node)가 그걸 mint, yt-dlp 플러그인이 사용, deno는 yt-dlp가 요즘 추출에 쓰는 JS 런타임.

**깨기:** 박스에서 pot-provider 컨테이너 죽이고 (`docker stop`) 새 영상 임포트 → 자막 비는지 확인.
**면접관 why:** ① 증상이 200+0바이트인데 어떻게 "코드 버그 아님"이라 판단했나? ② POToken이 정확히 뭘 해결하나? ③ 왜 사이드카를 *같은 컨테이너* 안에? (Fargate 사이드카 네트워킹 회피 — Dockerfile 주석) ④ 디바이스 자막 vs 백엔드 yt-dlp, 왜 둘 다? ⑤ YouTube가 또 막으면 대안은?

## 🟨 4. Auth / JWT (= "기본기" — 안 물어보면 이상함)
**읽기:** `auth/security/` 전부 — `JwtTokenProvider` · `JwtAuthenticationFilter` · `SecurityConfig` · `AuthRateLimitFilter` · `CurrentUser`(+ArgumentResolver).
**이해할 것:** 토큰 발급/검증 흐름, 필터 체인 어디에 끼나, `@CurrentUser` 어떻게 주입, 로그인/가입 레이트리밋.
**면접관 why:** ① JWT vs 세션, 왜? ② 토큰 만료/갱신 전략? (refresh 있나 없나 — 정확히) ③ 탈취되면? ④ 비번 저장(해시 알고리즘)? ⑤ 레이트리밋 어디에 왜 걸었나(`/signup`,`/login`)?

## 🟪 5. AWS → NCP 마이그레이션 (= #1 센터피스, 코드보다 *결정* — ~1일)
**읽기:** `infrastructure/ncp/` (`main.tf`·`storage.tf`·`provider.tf`·`versions.tf`) + `box/docker-compose.yml` + `box/Caddyfile` + 블로그 `2026-06-15-aws-to-ncp-seoul-migration.mdx` + `...-ncp-migration-gotchas.mdx`.
**이해할 것 (대부분 *왜*):** 한국 타깃 → 토론토 AWS ~180ms + 월 $50–65 → NCP 서울. 단일 박스 docker-compose(backend+pg+caddy+pot). Terraform(IaC), DNS 컷오버, LE TLS, R2 백업, AWS 폐기.
**면접관 why:** ① 왜 AWS 서울 리전 대신 NCP? (비용·이미 캐나다 AWS 계정·한국 결제 등 — 네 *진짜* 이유) ② 단일 박스의 위험은? (SPOF — 인정하고 "트래픽 늘면 분리/매니지드 DB로") ③ 마이그레이션 중 다운타임 0으로 어떻게? (DNS·헬스체크 순서) ④ Terraform 상태관리(로컬 state)의 한계? ⑤ 비용이 실제 얼마나 줄었나/레이턴시 효과?

---

# Tier 2 — 지도만 (네비게이션 가능하면 끝, 1~2일)
- 나머지 백엔드: `clip`(생성/슬라이스), `analysis`(직독직해/직접 프롬프트 `ClipAnalysisPrompt`), `practice`(드릴·`CompositionService`·프롬프트들), `library`, `deck`, `billing`.
- 모바일: expo-router 구조(`mobile/src/app/`), 핵심 루프 화면 — `import.tsx` → `video/[id].tsx` → `player/[clipId].tsx`. 드릴 컴포넌트는 *존재만* 알면 됨.
- 공유 `packages/core`: API 클라이언트 + 타입. **20k줄 대부분은 데이터(콜로케이션/표현 배열) → 이해 X, 스킵.**

# Tier 3 — 스킵/훑기
- 드릴 내부 로직, i18n 사전, particle/phrasal 콘텐츠, 웹 프론트 마케팅 페이지.

---

## 📅 1주 플랜 (백엔드 집중)
| 일 | 할 것 |
|---|---|
| 1 | 전체 지도 + 한 요청 끝까지 추적 + 로컬 기동(`./gradlew bootRun`, `docker compose up`) |
| 2 | AI 폴백 + SM-2 (읽기·그리기·깨기·why) |
| 3 | POToken/트랜스크립트 (제일 김 — 외부 개념 포함) |
| 4 | Auth/JWT + 마이그레이션(인프라+블로그) |
| 5 | "깨기" 몰아서 — 사이드카 죽이기·폴백 넘기기·복습 grade 추적 |
| 6 | 블로그 3개를 *네 말로* 다시 쓰기 (설명되면 네 거) |
| 7 | 모의 면접 — 위 모든 "why" 소리 내서 답하기. 막히는 거 = 7일차 보강 |

## ✅ 졸업 기준 (이거 다 *소리 내서* 되면 방어 완료)
- 3스토리(마이그레이션·폴백·POToken)를 각각 화이트보드 + 5단계 why.
- "이거 100배 트래픽이면 어디가 먼저 터지고 어떻게 막을래?" 에 구조적으로 답.
- "이거 네가 다 짰어?" → 정직하게: "설계·결정은 내가, 구현은 AI 페어로. 근데 *왜* 이렇게 했는지는 다 설명할 수 있다" (그리고 증명).

> 마지막 원칙: **방어 안 되는 걸 했다고 말하지 마.** 거기만 정직하면 이 포폴은 무기다.
