# TubeShadow

> 개발자/지식노동자를 위한 YouTube 기반 영어 쉐도잉 + Sentence Mining 학습 도구

## 한 줄 미션
**YouTube 영상에서 직접 클립을 따다가, 자기 라이브러리에 모으고, Anki처럼 자동 복습하면서, 앱 안에서 AI 설명까지 받는 영어 쉐도잉 학습 도구.**

자세한 내용은 [`Roadmap.md`](./Roadmap.md) 섹션 0 NORTH STAR 참조.

## 기술 스택

| 영역 | 스택 |
|------|------|
| 백엔드 | Java 21 · Spring Boot 3.x · Gradle (Kotlin DSL) · PostgreSQL · Flyway · Spring Security + JWT |
| 프론트엔드 | Next.js 14+ (App Router) · TypeScript strict · Tailwind · shadcn/ui · Zustand · TanStack Query |
| AI | Anthropic Claude (Haiku 4.5) |
| 외부 | YouTube IFrame Player + 자막 추출 |

## 디렉터리 구조

```
shadow-ai/
├── backend/                  # Spring Boot 백엔드
│   └── src/main/java/com/tubeshadow/
│       ├── common/           # 공통 유틸, 예외, 베이스 클래스
│       ├── auth/             # 인증/사용자
│       ├── video/            # YouTube 영상 도메인
│       ├── clip/             # 클립 도메인
│       ├── analysis/         # AI 분석
│       ├── recording/        # 사용자 녹음
│       └── review/           # SRS 복습 큐
├── frontend/                 # Next.js 프론트엔드
├── docker-compose.yml        # PostgreSQL 등 로컬 인프라
├── Roadmap.md                # 24시간 실행 로드맵 (진실의 원천)
├── CLAUDE.md                 # Claude Code 작업 지침
├── PROGRESS.md               # 진행 상황
└── BLOCKERS.md               # 막힌 항목 기록
```

## 빠른 시작

### 1. 인프라 (PostgreSQL)
```bash
docker compose up -d
```

### 2. 백엔드
```bash
cd backend
./gradlew bootRun
# → http://localhost:8080
# → http://localhost:8080/swagger-ui.html
```

### 3. 프론트엔드
```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

## 환경 변수

루트 `.env` (커밋 금지):
```
ANTHROPIC_API_KEY=sk-ant-...
JWT_SECRET=...
DB_PASSWORD=...
```

## 진행 추적
- 현재 진행 상황: [`PROGRESS.md`](./PROGRESS.md)
- 막힌 항목: [`BLOCKERS.md`](./BLOCKERS.md)

## 라이선스
MVP — 개인 학습용.
