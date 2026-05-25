# 인프라 수치 — 어디가 어떤 수치로 먹는가

> "10만 명일 때" 라고 한 번에 보지 말고, **1명 → 1000명 → 10만명** 단계로 따라오세요.
> 각 단계마다 **무엇이 바뀌는지** + **왜 바뀌는지** 를 짚습니다.
> 진짜 모르는 건 정상이에요. 인프라 비용/수치는 5년차 백엔드도 모릅니다.

## 0. 먼저 — 측정 단위들

이게 익숙해지면 50%는 된 거예요.

| 단위 | 의미 | 우리 시스템 예시 |
|------|------|-----------|
| **row** | DB 테이블의 줄 하나 | 클립 1개 = row 1개 |
| **RPS** | requests per second, 초당 요청 수 | "GET /api/clips를 초당 30번 호출" |
| **DAU** | daily active users, 일일 활성 사용자 | 가입자 10만 중 매일 들어오는 사람 |
| **동시 접속** | 같은 순간 페이지 열고 있는 사람 수 | DAU의 약 1~3% |
| **vCPU** | 가상 CPU 코어 1개 | 서버 인스턴스 사양 단위 |
| **GB / TB** | 1 GB = 10⁹ bytes, 1 TB = 10³ GB | 디스크/메모리/네트워크 |
| **ms / s** | 응답 시간 | DB 쿼리 10ms, Claude 호출 2000ms |
| **p50 / p95 / p99** | 응답 시간 분포의 중앙값/상위 5%/상위 1% | "p99 = 200ms" = 100명 중 1명만 200ms 넘게 기다림 |

작은 수 감각:
- 사람이 페이지 본다 → 1 RPS (1초에 한 번 클릭)
- 1000명 동시 페이지 본다 → 평균 ~30~100 RPS (모두가 매초 클릭하진 않음)
- DB 쿼리 1개 = 1~10ms
- 외부 HTTP 호출 (Claude, YouTube) = 100~3000ms
- 한 인스턴스 (Spring Boot 1대) = ~200 RPS

---

## 1. 우리 시스템의 7가지 자원

코드가 돌아갈 때 **돈/시간을 먹는 것**은 7가지뿐입니다:

```
┌─────────────────────────────────────────────────────────┐
│ 1. CPU      서버가 코드 실행                              │
│ 2. RAM      서버가 데이터를 들고 있음                    │
│ 3. 디스크   DB row + 파일이 저장됨                       │
│ 4. 네트워크 사용자 ↔ 서버 ↔ 외부 (Claude, YouTube)         │
│ 5. DB IOPS  DB가 초당 처리하는 read/write 횟수            │
│ 6. 외부 API Claude, YouTube oEmbed, yt-dlp 호출           │
│ 7. 사람 시간 운영/대응/모니터링                            │
└─────────────────────────────────────────────────────────┘
```

10만 명에서 **돈이 가장 많이 먹는 건 #6 (Claude API)** 이고, **터질 가능성이 가장 큰 건 #5 (DB)** 입니다.

---

## 2. 단계별 — 1명일 때

지금 사장님 노트북 상태. 측정 가능한 진짜 수치:

```
사용자: 1
DAU:    1
RPS:    ~1 (드물게)

CPU:    Spring Boot 부팅 시 ~30%, 평소 1~5%
RAM:    Spring Boot ~400MB, Postgres ~80MB, Next.js dev ~250MB
디스크: DB 8.7MB, 녹음 파일 0
DB:     row 100개 미만, 모든 쿼리 1ms 이내
외부:   클립 만들 때마다 Claude 1회 (~2초), 영상 임포트 시 yt-dlp 5초
```

→ 측정해보기:

```bash
docker stats tubeshadow-db --no-stream
# CPU %, MEM USAGE, NET I/O 보임

# Spring Boot 메모리:
ps -o rss= -p $(pgrep -f TubeshadowApplication) | awk '{print $1/1024 " MB"}'

# DB 크기:
docker exec tubeshadow-db psql -U tubeshadow -d tubeshadow \
  -c "SELECT pg_size_pretty(pg_database_size('tubeshadow'));"
```

**의미:** 이 정도면 노트북에서 다 돈다. 인프라 고민할 필요 X.

---

## 3. 1000명일 때

작은 서비스 + 활성 사용자 모임 정도. 친구 + 친구의 친구 수준.

| 자원 | 추정 | 진짜 영향 |
|------|------|-----------|
| 사용자 | 1,000 가입자 | |
| DAU 30% | 300 | |
| 동시 접속 | ~10명 | 매우 적음 |
| **RPS 평균** | **0.5~2** | 1초에 한두 번 |
| Peak RPS | 5~10 | 누가 다 같이 들어오는 시간 |
| 새 클립/일 | 1000 × 3 = 3000 | |
| **Claude 호출/일** | **3000** | **돈 핵심** |
| 새 녹음/일 | 3000 × 2 = 6000 | |
| 누적 클립 (1년) | ~100만 row | |
| 누적 녹음 | ~200만 row + ~120GB 파일 | **여기서 디스크 첫 터짐** |

**구체적으로 뭐가 어떻게 먹나:**

### CPU
- Spring Boot 1대 (1 vCPU)로 충분. **사용률 ~10% 평균**
- 피크 시 ~30% (10명 동시 클립 만들기 = 100 RPS)
- → 클라우드 가장 저가 (Railway $5, AWS t3.micro $7)면 됨

### RAM
- Spring Boot: 512MB로 충분 (JVM heap 350MB)
- Postgres: 1GB 권장 (인덱스 캐시)
- Redis 없음

### 디스크
- DB: ~500MB (클립 100만 row × 평균 500B)
- 녹음 파일: ~120GB ← **로컬 디스크 더 이상 안 됨, 여기서 S3 도입**
- 매월 추가: ~10GB

### DB IOPS (input/output per second)
- 일반 RDS db.t3.small = 3,000 IOPS 보장 (burst 12k)
- 우리 RPS 2 × 평균 쿼리 3개 = 6 IOPS. **여유 500배**
- 인덱스 잘 박혀있어서 쿼리 1ms 이내

### 네트워크
- 영상 페이지 1번 로딩 = ~50KB JS + ~5KB JSON = 55KB
- 동시 10명 × 평균 1 req/s = 0.5MB/s
- 월간 트래픽 = 0.5 × 86400 × 30 = ~1.3TB
- Vercel Hobby 100GB/월 → 부족. **Vercel Pro $20/월**

### 외부 API
- Claude Haiku: 3000 호출/일 × ~$0.0015 = $4.5/일 = **$135/월**
  - 캐싱 50% 가정 시 절반 = $67/월
- YouTube oEmbed: 무료
- yt-dlp: 무료 (CPU 시간만 먹음)

**1000명 월간 비용 (실제):**
- Railway Hobby + Postgres add-on: $5 + $10 = $15
- Vercel Pro (또는 Hobby로 버티기): $0~$20
- S3 (120GB + 트래픽): $5
- Claude: $67~$135
- **총: ~$87~$175/월**

**여기서 결정해야 하는 것:**
1. 녹음 S3로 이동 (코드 1일 — `RecordingStorage` 인터페이스에 S3 impl 추가)
2. Vercel Hobby → Pro (대역폭)
3. Claude 비용 모니터링 (월 $100 넘어가면 캐싱 강화)

---

## 4. 10만 명일 때 — 진짜 자세히

여기서부터 시스템 디자인 인터뷰의 단골 주제들이 다 나옵니다.

### 4-1. 정량 가정

| 가정 | 값 |
|------|----|
| 활성 사용자 | 100,000 |
| DAU | 30,000 (30%) |
| 사용자당 평균 클립 (평생 누적) | 200 |
| 클립당 평균 녹음 | 10 |
| 클립당 평균 transcript 크기 | 1KB |
| 녹음 1개 평균 크기 | 60KB (4초, opus) |
| 영상 풀 (공유) | 50,000 |
| 영상 1개 자막 크기 | ~100KB |

### 4-2. 디스크 — 어디에 뭐가 얼마나

```
┌──────────────────────────────────────────────────────────┐
│ PostgreSQL 안 (한 인스턴스, ~127GB)                      │
│                                                          │
│  users          100,000 row × ~200B = 20MB              │
│  videos          50,000 row × 100KB = 5GB ← 자막 JSONB 큼│
│  clips       20,000,000 row × 2KB   = 40GB ← transcript  │
│  clip_analyses 20,000,000 × 2KB     = 40GB ← AI JSON     │
│  recordings 200,000,000 × 200B      = 40GB ← row만!      │
│  review_items 20,000,000 × 100B     = 2GB                │
│  collections + collection_videos       작음               │
│  flyway_schema_history                  작음               │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ S3 (또는 GCS, R2) — 12TB                                 │
│                                                          │
│  녹음 파일 200,000,000 × 60KB = 12TB                    │
│  (썸네일은 YouTube가 호스팅 — 우리 비용 X)               │
└──────────────────────────────────────────────────────────┘
```

**계산 방법 — 클립 row 크기 계산을 직접:**
```
clips table 컬럼:
  id UUID         16B
  user_id UUID    16B
  video_id UUID   16B
  start_ms BIGINT  8B
  end_ms BIGINT    8B
  name VARCHAR  ~30B (평균)
  tags JSONB    ~50B (평균 3 tag)
  transcript TEXT ~1500B (평균 1.5KB)
  note TEXT     ~100B (평균)
  created_at TS   8B
  updated_at TS   8B
                ─────
                ~1.8KB per row + 인덱스 + Postgres overhead ≈ 2KB

× 2천만 row = 40GB
```

→ 이게 시스템 디자인 인터뷰의 "back-of-envelope" 계산입니다. 직접 세본 적 있으면 강력.

### 4-3. RPS와 동시성

```
DAU 30,000 → 평균 분포 → 동시 접속자 1~3%
                          → 300~900 명 동시 접속

각 동시 사용자가 평균 1 req / 30s = 0.033 RPS
→ 300 × 0.033 = 10 RPS 평균
→ Peak (저녁 9시) ~3x = 30 RPS

특별 액션:
- 클립 만들기: 30,000 × 평균 3개/일 = 90,000/일 = 1/s 평균
- 영상 임포트: 1000/일 (yt-dlp 호출, ~6s)
- AI 분석: 90,000/일 (클립당 1번)
- 녹음 업로드: 30,000 × 5/일 = 150,000/일 = 1.7/s

평균 RPS는 낮음. 진짜 문제는 다음:
```

**진짜 문제 — 특정 자원의 동시 사용:**

| 자원 | 평균 부하 | 피크 부하 | 한계 | 대응 |
|------|----------|----------|------|------|
| 백엔드 CPU | 30 RPS | 90 RPS | 1대 = 200 RPS | 1~2대로 충분 |
| Postgres 커넥션 | 5/10 | 8/10 | Hikari pool = 10 | pool 25로 늘림 |
| Postgres CPU | 10% | 40% | db.t3.large = 2 vCPU | 충분 |
| Postgres 디스크 IOPS | ~100 IOPS | ~500 IOPS | gp3 default 3k | 충분 |
| **Claude 호출** | **1/s** | **5/s** | **레이트 X 동시 X** | **큐로 격리** |
| S3 PUT (녹음 업로드) | 1.7/s | 5/s | S3 무제한 | 충분 |
| 네트워크 outbound | 30 RPS × 5KB = 150KB/s | 1MB/s | Railway 무제한 | 충분 |
| 메모리 (백엔드) | 600MB | 800MB | 인스턴스 1GB | 1.5GB로 |

### 4-4. **진짜 병목 1번 — Claude 호출**

매분 60 클립 만들기 (피크) = 60 동시 Claude 호출. 각 1~3초.
- Anthropic rate limit: tier 1 = 50 req/min (전체 키). **이미 부족.**
- tier 2~4: 1000+ req/min 가능. 회사 등록 + 결제 이력 필요.
- 동시 100 호출이면 backend 스레드 100개 점유 → 다른 API 응답 못 함

**대응:**
```
1. 분석 요청을 SQS/Redis queue에 넣고 즉시 응답
2. Worker 프로세스 N개가 큐에서 꺼내 Claude 호출
3. Worker 수 조절로 Claude 호출 동시성 제어 (예: 10개)
4. Worker 죽어도 재시도 가능 (큐의 message TTL)
```

→ 우리 코드는 이미 80% 준비됨: `ApplicationEventPublisher`만 SQS로 교체.

### 4-5. **진짜 병목 2번 — 클립 검색 LIKE**

현재:
```sql
SELECT * FROM clips c
WHERE c.user_id = ?
  AND (LOWER(c.name) LIKE LOWER(CONCAT('%', ?, '%'))
       OR LOWER(c.transcript) LIKE LOWER(CONCAT('%', ?, '%')))
```

- 클립 100만 row, transcript 1.5KB → 1.5GB scan
- 인덱스 못 씀 (`%word%`는 prefix 인덱스로 안 됨)
- 사용자 1명 한정해도 200 row × 1.5KB = 300KB scan = ~10ms
- 1000명이 100 row만 가져도 ~5ms
- → **사용자 1명당은 빠름**. 전체 검색하면 느림. 우리는 user_id 필터 있으니 OK.

**언제 터지나:**
- 클립 1명당 평균이 200 → 5,000 넘어가면 LIKE도 느려짐
- 또는 user 격리 없는 admin 검색 추가하면 즉시 터짐

**대응:**
```sql
-- 1) 트라이그램 인덱스 (가장 쉬움)
CREATE EXTENSION pg_trgm;
CREATE INDEX idx_clips_transcript_trgm ON clips USING GIN (transcript gin_trgm_ops);

-- 2) 전문 검색 (더 빠름, 형태소 분석)
ALTER TABLE clips ADD COLUMN search_tsv tsvector;
CREATE INDEX idx_clips_search ON clips USING GIN (search_tsv);
-- search_tsv는 트리거로 name + transcript 합쳐 자동 갱신
```

→ 우리 BLOCKERS / 시스템 디자인 인터뷰 단골 "전문 검색" 주제.

### 4-6. **진짜 병목 3번 — DB 커넥션 풀**

```
사용자가 페이지 1번 열음 = 백엔드 API 호출 3~5번
각 API 호출이 DB 트랜잭션 1개 시작 = Hikari pool에서 커넥션 1개 빌림
트랜잭션 평균 길이 = 10ms
한 커넥션의 capacity = 100 트랜잭션/s

pool 10개 → 1000 tx/s
RPS 30 × 평균 쿼리 3개 = 90 tx/s
→ 90% 여유

근데 만약 트랜잭션 안에서 외부 API (Claude) 호출하면?
2초 × 60 동시 = 120초 점유 → pool 10개 5초 만에 고갈
→ 다른 모든 요청 timeout
```

→ 우리는 이미 **트랜잭션 밖으로 Claude 호출 빼둠** (코드 리뷰 fix에서). 100점.

### 4-7. 비용 (10만 명 월간)

**A안 — 클라우드 표준:**

| 항목 | 사양 | 월 비용 |
|------|------|---------|
| AWS RDS PostgreSQL db.t3.large (2 vCPU, 8GB, 200GB SSD) | | $150 |
| RDS Multi-AZ (failover) | | +$150 |
| AWS S3 (12TB + 1TB 트래픽) | Standard | $300 |
| AWS ECS Fargate (백엔드 2대) | 0.5 vCPU, 1GB × 2 | $50 |
| Worker (분석 큐 처리, 별도) | 0.5 vCPU | $25 |
| ElastiCache Redis (rate limit, 세션) | cache.t3.micro | $15 |
| SQS (분석 큐) | 1억 메시지/월 | $40 |
| CloudFront (CDN) | 1TB | $85 |
| Sentry (에러 추적) | Team plan | $26 |
| Vercel Pro | | $20 |
| **인프라 합계** | | **~$860/월** |
| **Claude Haiku** | 90k 호출/일 × $0.005 (caching 60%) | **~$13,500/월** |
| **합계** | | **~$14,400/월** |
| ARPU (사용자 한 명당) | $14400 / 100000 = | **$0.14/월** |

→ 사용자에게 월 $1만 받아도 충분히 흑자. 운영 마진 비즈니스.

**B안 — 비용 절감 (Railway / Render + S3):**
- Railway Pro: $20 + 백엔드 $40 + Postgres $80 = $140
- S3 (Cloudflare R2 = egress 무료): $200
- Worker EC2 (별도): $40
- Vercel Pro: $20
- Sentry: $26
- Claude: $13,500
- **~$13,900/월**

→ 인프라는 줄어도 Claude가 압도적. Anthropic 협상 / 캐싱 강화 / 분석 동의 옵션이 진짜 lever.

---

## 5. "수치 어떻게 측정하나" — 실무 도구

| 측정 대상 | 도구 |
|----------|------|
| 백엔드 RPS / 응답 시간 | Spring Boot Actuator `/actuator/metrics` + Prometheus |
| Postgres 쿼리 시간 | `pg_stat_statements` extension |
| Postgres 디스크/메모리 | `pg_size_pretty`, `pg_stat_activity` |
| 외부 API 시간 | Micrometer / 코드 안 `Stopwatch` |
| 사용자 동시 접속 | TanStack Query devtools / NewRelic |
| 에러율 | Sentry / Datadog APM |
| Claude 토큰 사용량 | Anthropic console + 응답의 `usage` field |
| S3 사용량 | AWS Console / CloudWatch |

**우리 코드에 이미 있는 것:**
- `/actuator/health` (Spring Boot Actuator는 추가됨)
- DB 로그 (`spring.jpa.show-sql=true` dev 모드)

**없는 것 (10만 명 가려면 필요):**
- 메트릭 수집 (Prometheus)
- APM (Sentry)
- 비즈니스 메트릭 (DAU, 클립 만들기 율)

---

## 6. 사장님이 진짜 기억해야 할 5가지

1. **인프라 비용 ≠ 외부 API 비용.** 우리는 Claude가 95%. 모델 가격이 핵심.
2. **CPU/RAM은 거의 안 터진다.** Postgres + 디스크 + DB 커넥션 풀이 더 자주 터짐.
3. **트랜잭션 안에서 외부 API 호출하지 않는다.** 우리 코드는 이미 분리해뒀음. 사장님이 코드 리뷰 가르치는 입장이 되면 1번으로 가르치는 것.
4. **녹음/이미지 같은 큰 파일은 S3.** 인터페이스만 분리해두면 1일 작업.
5. **검색은 처음엔 LIKE, 5000 row 넘으면 인덱스 (tsvector / trgm).**

---

## 7. 우리 시스템의 진화 단계 (요약)

```
지금 (사장님 노트북)
  사용자: 1
  Spring Boot + Postgres + 로컬 디스크
  비용: $0
        │
        ▼
1000명 (친구의 친구)
  + S3 (녹음 파일)
  + Vercel Pro
  비용: ~$100/월
        │
        ▼
10,000명
  + Redis (rate limit)
  + 분석 워커 별도 프로세스
  + Sentry
  비용: ~$1500/월 (Claude $1100 + 인프라 $400)
        │
        ▼
100,000명
  + DB Multi-AZ
  + SQS 큐
  + CDN
  + Postgres tsvector 검색
  비용: ~$14,000/월 (Claude $13,500 + 인프라 $500)
        │
        ▼
1,000,000명
  + Postgres read replica + sharding
  + 분석 캐시 (비슷한 클립 분석 공유)
  + 멀티 리전
  + 협상된 Claude 단가
  비용: 사용자 결제 받기 시작 (월 $5 × 5% = 25만/월 매출)
```

---

## 8. 직접 측정해보기 (5분)

지금 떠 있는 서버에서:

```bash
# 1. Spring Boot 메모리 (백엔드)
ps -o rss=,pcpu= -p $(pgrep -f TubeshadowApplication) | awk '{print $1/1024 " MB / CPU " $2 "%"}'

# 2. Postgres 사용량
docker stats tubeshadow-db --no-stream --format "table {{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# 3. DB 크기 / 테이블별 크기
docker exec tubeshadow-db psql -U tubeshadow -d tubeshadow -c "
SELECT relname AS table, pg_size_pretty(pg_total_relation_size(relid)) AS size
FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC;"

# 4. 쿼리 1개 시간 측정
docker exec tubeshadow-db psql -U tubeshadow -d tubeshadow -c "
EXPLAIN ANALYZE SELECT * FROM clips WHERE user_id = '<누군가의 user_id>';"

# 5. 백엔드 응답 시간 (curl)
time curl -s http://localhost:8080/api/health > /dev/null

# 6. 100번 호출 시간
time for i in $(seq 1 100); do curl -s http://localhost:8080/api/health > /dev/null; done
# → 100번에 X초. RPS = 100/X
```

직접 해보면 감 잡힘. **숫자를 손으로 만져본 사람만 시스템 디자인을 이해합니다.**
