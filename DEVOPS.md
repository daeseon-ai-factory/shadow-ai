# DEVOPS.md — 매일 쓰는 운영 사이클

> **목표**: 막히면 디버거, 띄울 땐 Docker, 배포는 push 한 줄. 인디든 회사든 평생 같은 패턴.

---

## 0. 첫 세팅 (한 번만)

```bash
# 1. 환경변수
cp .env.example .env
# (열어서 JWT_SECRET 등 채우기)

# 2. Cursor 확장 설치
#    명령 팔레트(⌘⇧P) → "Extensions: Show Recommended Extensions" → 8개 다 Install

# 3. 백엔드 빌드 (한 번)
cd backend && ./gradlew build -x test && cd ..

# 4. 도메인 도커 데몬 실행 확인
docker info
```

---

## 1. 매일 — 로컬 개발 사이클

### 옵션 A: "Docker로 다 띄움" (한 줄, 추천 처음)
```bash
docker compose -f docker-compose.dev.yml up
```
→ Postgres + Backend(디버그 port 5005) + Frontend 모두 한 번에. 코드 저장 시:
- 백엔드: Spring DevTools가 자동 재시작 (3~5초)
- 프론트엔드: Next.js HMR 즉시 갱신

### 옵션 B: "DB만 컨테이너, 나머지는 IDE에서 직접 실행" (빠른 반복)
```bash
docker compose up -d   # 기존 docker-compose.yml = Postgres만
cd backend && ./gradlew bootRun --debug-jvm   # debug port 5005 자동 열림
# 새 터미널
cd frontend && npm run dev
```

→ B가 가장 빠른 피드백. A는 신규 환경에서 한 줄로 다 띄울 때 좋음.

---

## 2. 디버깅 — Cursor에서 breakpoint

> 백엔드든 프론트엔드든 위 옵션 A 또는 B로 띄워둔 상태.

### 백엔드 (Spring Boot)
1. Cursor → 좌측 **Run and Debug** ▶+벌레 아이콘
2. 드롭다운 `Attach to Backend (port 5005)` → ▶ 클릭
3. `AuthController.login()` 같은 메서드의 줄 옆 여백 클릭 → 🔴 breakpoint
4. 브라우저에서 로그인 → Cursor가 멈춤
5. 좌측 패널에서 변수/Call Stack 봄. `F10`(다음 줄), `F11`(함수 안으로), `F5`(계속)

### 프론트엔드 (Next.js / TypeScript)
- 가장 빠른 방법: **Chrome DevTools** → Sources 탭 → `webpack://_N_E/` 아래에서 본인 .tsx 찾아 breakpoint
- Cursor에서 하려면: Run and Debug → `Next.js: debug server-side` 또는 `Next.js: debug client (Chrome)` 선택

### DB 직접 보기
- DBeaver / TablePlus 설치 → 연결:
  - Host: `localhost`, Port: `5434`, DB: `tubeshadow`, User/Pw: `tubeshadow/tubeshadow`
- `select * from users;` 로 가입한 본인 row 확인 → password는 bcrypt 해시만 있는 거 봄 (보안 확인)

### "5분 안에 코드 이해" 실습
1. `AuthController.login()` 에 🔴
2. 로그인 시도 → 멈춤
3. `F11`(Step Into)로 `AuthService.login()` 들어감
4. user 조회 → bcrypt 검증 → JWT 생성까지 한 줄씩
5. → 인증 흐름 끝. 다른 기능도 같은 패턴.

---

## 3. CI — push마다 자동 검증

`.github/workflows/ci.yml` 이 모든 push/PR에서 자동:
- 백엔드: `./gradlew test` + `bootJar`
- 프론트: `npm ci` + `lint` + `test` + `build`
- Docker 이미지 빌드 검증

→ GitHub Actions 탭에서 결과 보기. 빨간색이면 머지 X.

---

## 4. CD — main push → 자동 prod 배포

`.github/workflows/deploy.yml` 이 `main`의 `backend/**` 변경 시 자동:
1. jar 빌드
2. OIDC로 AWS 자격증명 (정적 키 없음!)
3. Docker 이미지 ECR로 push (태그: SHA + latest)
4. ECS 새 task definition revision 등록
5. 서비스 rolling update (헬스체크 통과까지 대기)

→ 5~10분 안에 prod에 새 버전. 실패 시 자동 롤백.

**처음에는 `infrastructure/aws-bootstrap.md` 한 번 따라가야 함** (VPC/RDS/S3/IAM 등 한 번 만들기, 약 3~5시간).

---

## 5. 시크릿 관리 — 절대 git에 안 들어감

| 환경 | 어디 저장 |
|---|---|
| 로컬 dev | `.env` (gitignored). `.env.example`이 템플릿 |
| GitHub Actions | Repo Settings → Secrets and variables → Actions |
| AWS prod | **Secrets Manager** (IAM role로 ECS task가 자동 주입) |

**규칙**: 시크릿이 코드/git/Slack/이메일에 한 번이라도 들어가면 즉시 회전.
```bash
# JWT secret 회전 예시
openssl rand -base64 48 | aws secretsmanager update-secret \
  --secret-id tubeshadow/jwt-secret --secret-string file:///dev/stdin
```

---

## 6. 로그 보기

| 환경 | 어디 |
|---|---|
| 로컬 (Docker 옵션 A) | `docker compose -f docker-compose.dev.yml logs -f backend` |
| 로컬 (옵션 B) | `./gradlew bootRun --debug-jvm` 띄운 터미널 그대로 |
| 프로덕션 | AWS Console → CloudWatch → Log groups → `/ecs/tubeshadow-backend` |
| 프로덕션 CLI | `aws logs tail /ecs/tubeshadow-backend --follow` |

prod 로그는 **JSON 한 줄에 한 이벤트** (`logback-spring.xml` 의 `<springProfile name="prod">`). CloudWatch가 자동으로 필드 파싱 → `requestId`, `userId` 등으로 필터 가능.

---

## 7. 운영 체크리스트 — Tier 0/1 통과 여부

| Tier | 항목 | 본인 프로젝트 |
|---|---|---|
| 0 | Git + 브랜치 + README | ✅ |
| 0 | 자동 테스트 | ✅ |
| 0 | Secret git 밖 | ✅ `.env` gitignored + Secrets Manager |
| 0 | HTTPS | ✅ ACM + ALB |
| 0 | 구조화 로그 | ✅ JSON (prod 프로파일) |
| 0 | Docker 컨테이너 | ✅ |
| 0 | CI | ✅ |
| 1 | CD (push → prod) | ✅ deploy.yml |
| 1 | 헬스체크 | ✅ `/api/health` + ALB |
| 1 | 메트릭 | ✅ Actuator → CloudWatch (선택) |
| 1 | 에러 트래킹 | ⏳ Sentry 추가는 옵션 |
| 1 | DB 백업 | ✅ RDS 7일 자동 |
| 1 | 환경 분리 | ✅ application-{dev,prod}.yml |
| 1 | Rate limit | ✅ AuthRateLimitFilter |
| 1 | 모니터링/알람 | ⏳ CloudWatch alarm 추가는 옵션 |

→ AWS bootstrap만 끝내면 **16/16 중 14개 자동 완료**. 남은 2개 (Sentry, CloudWatch alarm)는 한 시간씩.

---

## 8. 막힐 때 — 디버깅 의사결정 트리

```
어디서 죽었는가?
├─ 로컬 빌드 실패 → `./gradlew clean build --info` 로 stack trace
├─ 로컬 런타임 에러 → Cursor 디버거 attach → breakpoint
├─ CI 빨간색 → Actions 탭 → 실패 step 로그
├─ Docker 이미지 빌드 실패 → `docker build -t x ./backend` 로컬 재현
├─ ECS task가 멈춤 → AWS Console → ECS → Service → Events 탭 → "stopped reason"
├─ ECS task가 뜨지만 헬스체크 fail → CloudWatch Logs `/ecs/tubeshadow-backend`
├─ 프론트 401 → Network 탭 → Authorization 헤더 있는지 → JWT 디코드 (jwt.io)
└─ 500 에러 prod → CloudWatch Logs → stack trace → 로컬에서 시나리오 재현 → 디버거
```

핵심: **"prod에서 본 에러 → 로컬에서 같은 시나리오 재현 → 디버거로 한 줄씩"** 사이클이 유일한 출구.

---

## 9. 인터뷰용 한 문장

> "TubeShadow는 Spring Boot + Next.js 풀스택입니다. 로컬은 Docker Compose로 한 번에 띄우고, GitHub Actions가 main push마다 ECR에 이미지 push 후 ECS Fargate에서 rolling update합니다. 시크릿은 Secrets Manager에 두고 IAM role로 task에 주입, 녹음 파일은 S3, DB는 RDS Postgres에 7일 자동 백업, HTTPS는 ACM + ALB로 종단, 로그는 JSON으로 CloudWatch에서 봅니다. OIDC로 GitHub와 AWS 사이에 정적 키가 없어요."

이 한 문장이 시니어 면접의 "운영해본 적 있어요?" 질문 답.
