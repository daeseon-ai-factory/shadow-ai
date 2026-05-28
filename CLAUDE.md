# CLAUDE.md — Claude Code 표준 지침

**이 파일은 매 세션 시작 시 자동으로 읽힙니다. 항상 가장 먼저 ROADMAP.md를 읽으세요.**

## 0. 절대 첫 번째로 할 일

매 세션 시작 시:
1. **`ROADMAP.md`를 처음부터 끝까지 읽기** (특히 섹션 0 NORTH STAR)
2. **`PROGRESS.md`를 읽고** 어디까지 끝났는지 확인
3. **`BLOCKERS.md`를 읽고** 활성 블로커 있는지 확인
4. 다음 진행할 태스크 ID를 확정한 후 사용자에게 보고
5. 사용자 확인 후 작업 시작

## 1. 프로젝트 정체성

- **이름**: TubeShadow
- **목적**: 개발자/지식노동자를 위한 YouTube 기반 영어 쉐도잉 + Sentence Mining 학습 도구
- **자세한 내용**: `ROADMAP.md` 섹션 0 참조

## 2. 핵심 작업 원칙

- **ROADMAP.md가 진실의 원천(source of truth)이다.** 이 파일과 충돌하면 ROADMAP을 따른다.
- **NORTH STAR(섹션 0)와 충돌하는 어떤 결정도 하지 않는다.** 새 기능 제안 시 OUT-OF-SCOPE(0.4) 먼저 확인.
- **태스크 단위로 일한다.** 한 번에 하나씩, 완료 후 PROGRESS.md 갱신.
- **막히면 멈춘다.** BLOCKERS.md에 기록 + 사용자에게 보고. 추측해서 진행 X.

## 3. 코드 표준

### 백엔드 (Java / Spring Boot)
- Java 21
- Spring Boot 3.x (최신 안정 버전)
- Gradle (Kotlin DSL)
- 패키지 구조: `com.tubeshadow.<도메인>` (auth, video, clip, analysis, recording, review, common)
- 디자인 패턴 사용 시 **주석으로 의도 명시**
- 단위 테스트: JUnit 5 + Mockito
- 통합 테스트: Testcontainers (PostgreSQL)
- 모든 API: OpenAPI 어노테이션으로 문서화

### 프론트엔드 (TypeScript / Next.js)
- Next.js 14+ App Router
- TypeScript strict mode (no `any`)
- Tailwind + shadcn/ui
- 상태 관리: Zustand
- API 호출: TanStack Query
- 컴포넌트는 `'use client'` 필요한 곳만 명시

### 공통
- 커밋 메시지: `[T-XXX] <짧은 설명>` 형식
- 한 태스크 = 1~3 커밋
- 의미 있는 단위로 자주 커밋
- 절대 API 키 / 시크릿 하드코딩 X (환경변수만)

## 4. 명령어 (Claude Code가 자주 실행할 것)

### 백엔드
```bash
cd backend
./gradlew bootRun           # 개발 서버
./gradlew test              # 테스트 실행
./gradlew flywayMigrate     # DB 마이그레이션
```

### 프론트엔드
```bash
cd frontend
npm run dev                 # 개발 서버 (3000 포트)
npm run build               # 빌드
npm run test                # Vitest 테스트
npm run lint                # ESLint
```

### 인프라
```bash
docker compose up -d        # PostgreSQL 기동
docker compose logs -f db   # DB 로그
docker compose down         # 종료
```

## 5. 사용자 권한 정책

다음 작업은 **사용자 명시적 승인 후에만** 실행:
- 환경변수 파일 변경 (.env)
- 의존성 추가 (build.gradle, package.json)
- 데이터베이스 마이그레이션 새로 생성
- 외부 API 호출 (Anthropic, YouTube 등 — 비용 발생 가능)
- 배포 명령어

다음 작업은 **자유롭게** 실행 가능:
- 코드 파일 생성/수정/삭제 (소스 디렉터리 내)
- 테스트 실행
- 빌드
- 로컬 서버 기동/종료
- Git 커밋 (단, push는 사용자 확인 후)

## 6. 진행 추적 의무

매 태스크 완료 후:
1. **`PROGRESS.md`에 체크마크 + 완료 시간 기록**
2. 다음 태스크로 자동 이동 (의존성 충족 시)
3. 5개 태스크마다 NORTH STAR 다시 읽기

블로커 발생 시:
1. **즉시 `BLOCKERS.md`에 기록**
2. 의존 없는 다음 태스크로 이동 또는 사용자에게 보고
3. 절대 임의로 우회하지 않음

## 7. 절대 금지 (재강조)

- ❌ ROADMAP.md 섹션 0.4 OUT-OF-SCOPE 기능 추가
- ❌ NORTH STAR 확인 없이 새 기능 만들기
- ❌ 테스트 없이 비즈니스 로직 작성
- ❌ 하드코딩된 API 키 / 시크릿
- ❌ 마이그레이션 없이 DB 스키마 변경
- ❌ 임의 라이브러리/프레임워크 도입
- ❌ 사용자 데이터 격리 미흡
- ❌ 품질 깎아서 태스크 끝내기

---

**기억: 이 프로젝트의 핵심은 기능 개수가 아니라 마찰 제거다.**

---

## 8. 프로젝트 로그 (자동 기록)

**non-trivial한 fix / decision을 한 turn에서 끝낼 때 두 파일을 같이 적습니다** (커밋과 같은 turn에):

1. **`docs/troubleshooting.md`** — 문제 색인용 짧은 reference. `## <short title>` + 5개 bullet (Symptom · Cause · Fix · Commit · Pattern). **newest at the bottom** (`---` 구분자 아래에 append).
2. **`content/logs/shadow-ai/<YYYY-MM-DD>-<short-slug>.mdx`** — frontmatter (title / date / project / kind / visibility / language / summary / tags) + 본문 narrative.

**non-trivial 기준**: 빌드/배포 에러, 숨은 결합, 의존성 마이그레이션, 아키텍처 결정, 디자인 선택, 전략 메모.
**trivial이라 skip**: 평범한 rename, lint fix, typo, 동작 안 바뀌는 dep bump, format-only commit.

### 7가지 anti-hallucination 규칙

1. **Symptom은 literal**. 실제 에러/출력을 fenced code block으로 그대로. paraphrase X.
2. **Cause는 검증된 것**. 실제 코드에서 읽었거나 명령 실행해 본 것만. 추측은 `Hypothesis: ...` + `Verified by: ...` 명시.
3. **Fix는 실제 파일명**. `git diff`가 source of truth. diff에 안 보이면 적지 말 것.
4. **Commit hash는 commit 후에**. `git rev-parse HEAD` 결과만. 없는 해시 절대 X.
5. **날짜는 git에서**. `git log -1 --format=%cI` 또는 세션 시작일 (today).
6. **Pattern은 드물게**. 진짜 반복되는 교훈일 때만. 일반 조언 padding X.
7. **수치 만들지 말 것**. 측정된 duration만 ("about 60s" OK, 가짜 정확 수치 X).

### `kind` 분류 (frontmatter)

- `troubleshoot` — bug/error fix
- `tech-retro` — 아키텍처/인프라 결정
- `ux-retro` — 디자인/카피 선택
- `business` — 전략 (default visibility: `private`)
- `monetization` — pricing/수익 (default `private`)
- `update` — 일반 진행

기본 visibility: `public` (business/monetization은 `private`).

매 결정 시 자문: 이게 마찰을 더 만드는가, 줄이는가?