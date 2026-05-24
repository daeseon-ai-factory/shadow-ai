# 진행 상황

> Claude Code 24시간 자율 실행 트래커

## 현재 작업 중
- STAGE 1 진입: T-011 (User 엔티티 + Repository)

## 완료
### STAGE 0: 부트스트랩
- [x] T-001: Git 리포 + 모노레포 구조 (2026-05-24 00:00)
- [x] T-002: PostgreSQL docker-compose 셋업 (호스트 5432 충돌 → 5434 매핑) (2026-05-24 00:07)
- [x] T-003: Spring Boot 프로젝트 초기화 — Java 21 toolchain, Spring Boot 3.3.5 (2026-05-24 00:09)
- [x] T-004: 패키지 구조 + BaseEntity + ApiResponse + GlobalExceptionHandler + BusinessException 계열 (2026-05-24 00:09)
- [x] T-005: GET /api/health → 200 (2026-05-24 00:09)
- [x] T-006: dev/prod/test 프로파일 분리 (2026-05-24 00:14)
- [x] T-007: springdoc-openapi → /swagger-ui/index.html 200 (2026-05-24 00:14)
- [x] T-008: Next.js 16.2.6 (App Router, TS strict, Tailwind 4) (2026-05-24 00:14)
- [x] T-009: shadcn/ui (base-nova 스타일) — button/card/input/dialog/label/sonner/slider/badge/skeleton/textarea (2026-05-24 00:14)
- [x] T-010: API 클라이언트 베이스 + TanStack Query Providers → 메인 페이지에서 health 호출 성공 (2026-05-24 00:14)

## STAGE 게이트
- [x] STAGE 0 통과 (DB up, 백엔드 bootRun 200, 프론트 dev 200, health 호출 성공)
- [ ] STAGE 1: 도메인 모델 + DB (T-011~T-018)
- [ ] STAGE 2: 인증 + 사용자 (T-019~T-025)
- [ ] STAGE 3: YouTube 통합 (T-026~T-033)
- [ ] STAGE 4: 클립 + 라이브러리 (T-034~T-041)
- [ ] STAGE 5: AI 인라인 설명 (T-042~T-047)
- [ ] STAGE 6: 녹음 + A/B (T-048~T-054)
- [ ] STAGE 7: SRS 복습 (T-055~T-060)
- [ ] STAGE 8: 큐레이션 (T-061~T-063)
- [ ] STAGE 9: 폴리시 + 배포 (T-064~T-069)

## 다음
- [ ] T-011 ~ T-018 (STAGE 1)
- [ ] T-019 ~ T-025 (STAGE 2)
- … (이하 생략)

## 인프라 메모
- Java 21: `/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home` — `~/.zshrc`에 JAVA_HOME 영구 설정
- DB 포트: **5434** (호스트 5432의 시스템 postgres와 충돌 회피)
- DB 접속: `psql -h localhost -p 5434 -U tubeshadow -d tubeshadow` (pw `tubeshadow`)
