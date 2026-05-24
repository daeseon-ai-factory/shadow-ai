# 배포 가이드

## 환경변수 (prod)

### 백엔드 필수
| 변수 | 설명 | 예시 |
|------|------|------|
| `SPRING_PROFILES_ACTIVE` | 프로파일 | `prod` |
| `DATABASE_URL` | JDBC URL | `jdbc:postgresql://host:5432/tubeshadow` |
| `DATABASE_USERNAME` | DB 사용자 | `tubeshadow` |
| `DATABASE_PASSWORD` | DB 비밀번호 | `(generated)` |
| `JWT_SECRET` | JWT 서명 키 (≥32 bytes) | `openssl rand -hex 32` |
| `ANTHROPIC_API_KEY` | Claude API 키 | `sk-ant-…` |

### 백엔드 선택
| 변수 | 기본값 |
|------|--------|
| `SERVER_PORT` | `8080` |
| `JWT_TTL_SECONDS` | `86400` (1일) |
| `RECORDING_STORAGE_DIR` | `./local-storage/recordings` |
| `ANTHROPIC_MODEL` | `claude-haiku-4-5-20251001` |

### 프론트엔드
| 변수 | 설명 |
|------|------|
| `NEXT_PUBLIC_API_URL` | 백엔드 base URL (예: `https://api.tubeshadow.app`) |

---

## 백엔드 → Railway 또는 Render

### 1. Postgres 프로비저닝
- Railway: Add Plugin → PostgreSQL
- Render: Create → PostgreSQL

`DATABASE_URL`/`DATABASE_USERNAME`/`DATABASE_PASSWORD`을 환경변수에 자동 또는 수동으로 연결.

### 2. 백엔드 컨테이너
이 저장소 루트에서:
```bash
cd backend
docker build -t tubeshadow-backend .
docker run -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e DATABASE_URL="jdbc:postgresql://host:5432/tubeshadow" \
  -e DATABASE_USERNAME=tubeshadow \
  -e DATABASE_PASSWORD=xxx \
  -e JWT_SECRET="$(openssl rand -hex 32)" \
  -e ANTHROPIC_API_KEY=sk-ant-xxx \
  tubeshadow-backend
```

Railway/Render는 `Dockerfile`을 자동 감지합니다. 빌드 명령은 따로 설정할 필요 없음.

**볼륨**: `/app/local-storage/recordings`에 녹음이 저장됩니다. 영구 볼륨을 붙이거나, 추후 S3로 마이그레이션할 때 `RecordingStorage` 인터페이스의 새 구현체로 교체.

### 3. 헬스 체크 경로
`GET /api/health` → `{ "data": { "status": "ok" } }`

---

## 프론트엔드 → Vercel

```bash
cd frontend
# Vercel CLI
npm i -g vercel
vercel
```

- Framework: Next.js (auto-detected)
- Build: `npm run build`
- Output: `.next/`
- 환경변수: `NEXT_PUBLIC_API_URL=https://your-backend-url`

배포 도메인이 백엔드 `tubeshadow.cors` 화이트리스트에 포함되어야 합니다(`https://*.vercel.app` 기본 허용).

---

## 종단간 스모크 테스트

배포 후 수동 시나리오 (T-069):

1. `/signup` → 신규 가입 → 자동으로 `/library`로 이동
2. `/discover` → 컬렉션 클릭 → 영상 카드 클릭
3. `/video/{id}` → 자막 클릭 → 시작/끝 설정 → 클립 저장
4. `/player/{clipId}` → 무한 반복 + 속도 조절 동작
5. 같은 페이지: 녹음 → 자동 업로드 → '원본 → 본인' A/B 재생
6. AI 분석 패널이 자동으로 채워짐 (≤15초)
7. `/review` → due 항목 표시 → '쉽다/보통/어렵다/다시' → 다음 due 일정 갱신

실패 시 발견된 버그는 `BLOCKERS.md`에 기록.

---

## 운영 비용 추정 (목표: 1000명까지 거의 무료)

| 항목 | 비용 |
|------|------|
| Vercel Hobby | $0 |
| Railway Hobby (백엔드 + Postgres) | $5 ~ $20/월 |
| Claude Haiku (1000명 × 일 5 클립 × $0.005) | ~$25/월 |
| **합계** | ~$30-50/월 |

Claude prompt caching이 50% hit rate면 절반 절감 가능.
