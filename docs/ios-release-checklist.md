# iOS 릴리즈 체크리스트 / 런북 (Mimi)

> 2026-06 App Store 첫 배포에서 **실제로 터진 것들**을 정리한 재사용 체크리스트.
> 다음 릴리즈 땐 이 순서대로만 하면 같은 데서 안 막힌다.

**고정값 (이 앱)**
- App Store Connect App ID: `6780742714`
- Bundle ID: `ai.daeseon.mimi`
- ASC API key: `~/.secrets/asc-api-key.p8` (Key ID `C2H5XN897V`, Issuer `6586aecd-...`)
- EAS: `appVersionSource: remote` + production `autoIncrement: true` → **buildNumber는 EAS가 자동 증가** (직접 안 건드림)
- 공개 TestFlight 그룹: **"Friends"** (external, public link = `mimi.daeseon.ai/beta`)

---

## 큰 그림: 트랙이 2개다 (이거 헷갈려서 제일 고생함)

```
                 EAS build --auto-submit
                          │
                 binary가 App Store Connect로 업로드
                          │
        ┌─────────────────┴─────────────────┐
   ① TestFlight 트랙                    ② App Store 심사 트랙
   (베타 — 친구들이 /beta로 설치)        (공개 출시)
   · EAS는 업로드만 함                   · 빌드를 버전(v1.0)에 attach
   · 외부 그룹 추가 + Beta 심사 = 수동    · reviewSubmission 제출
```

**핵심:** `eas build --auto-submit`은 **업로드만** 한다.
- TestFlight 외부 그룹("Friends")에 **자동으로 안 넣어준다** → 따로 추가해야 친구들이 새 빌드 받음.
- App Store 공개 심사 버전에 **자동으로 안 붙는다** → 따로 attach + 제출해야 함.

---

## PHASE 0 — 빌드 전에 (계정/환경 블로커부터)

이거 안 되어 있으면 빌드 다 해놓고 제출 단계에서 막힌다. **먼저 확인.**

- [ ] **Apple Developer Program License Agreement** 최신 동의 상태?
  - ASC 들어가서 노란 배너 "Agreement Updated"뜨면 → **Account Holder가 직접 수락** (API/내가 대신 못 함). 미수락이면 **제출·업데이트 전부 막힘.**
- [ ] **DSA trader status** 입력됨? (안 하면 EU에서 앱 내려가고 제출 막힐 수 있음)
- [ ] 백엔드 prod 살아있나: `curl -fsS https://api.mimi.daeseon.ai/actuator/health` → `"status":"UP"`
- [ ] 법무 페이지 200: `mimi.daeseon.ai/en/privacy`, `/en/terms`
- [ ] EAS 로그인: `npx eas-cli@latest whoami`
- [ ] ASC API 키 존재: `~/.secrets/asc-api-key.p8`

---

## PHASE 1 — Info.plist / 권한 (ITMS-90683 여기서 막혔음)

> **교훈:** 내가 안 쓰는 기능이어도 **의존 SDK가 API를 링크하면 purpose string 필수.** 없으면 Apple이 바이너리 자체를 반려(ITMS-90683).

- [ ] `app.json` → `ios.infoPlist`에 아래 usage string **전부** 있는지:
  - `NSMicrophoneUsageDescription` (녹음)
  - `NSSpeechRecognitionUsageDescription` (STT)
  - `NSPhotoLibraryUsageDescription` ← **expo-image가 PhotoLibraryAssetLoader.swift로 사진 API 링크함.** 안 쓰는데도 필수.
  - `ITSAppUsesNonExemptEncryption: false`
- [ ] 새 네이티브 모듈 추가했으면 → 그 모듈이 요구하는 새 usage string 있는지 확인
  (찾는 법: `grep -rlE "NS[A-Za-z]+UsageDescription|PHPhotoLibrary|NS.*Usage" node_modules/<모듈>/ios`)
- [ ] **네이티브 모듈 추가 = OTA로 안 됨.** 반드시 새 네이티브 빌드(아래) 필요.
  (이번엔 `expo-haptics` 넣어서 build 11이 필요했음)

---

## PHASE 2 — 빌드 + 업로드 (EAS)

- [ ] 타입체크: `cd mobile && npx tsc --noEmit` → 0
- [ ] (선택) export 확인: `npx expo export --platform ios`
- [ ] 빌드 + 자동 제출:

```bash
cd mobile
npx eas-cli@latest build \
  --platform ios \
  --profile production \
  --auto-submit-with-profile production \
  --non-interactive
```

> ⚠️ **`--auto-submit` 와 `--auto-submit-with-profile` 같이 쓰면 안 됨** (mutually exclusive → "build command failed"). `--auto-submit-with-profile production` **하나만** 써라. (이번에 여기서 한 번 터짐)

- [ ] 로그에서 확인: `✔ Incremented buildNumber from N to N+1`, `✔ Build finished`, `✔ Submitted your app to Apple App Store Connect!`
- [ ] 자격증명은 EAS에 저장된 거 재사용됨(`✔ Using remote iOS credentials`). cert/profile 만료일 확인 (현재 2027-06-15).

`scripts/release-ios.sh`가 PHASE 0~2 preflight를 자동으로 해줌. 단 preflight 다 통과 후 마지막 명령만 터졌을 땐 **preflight 재실행 말고 위 `eas build` 명령만 직접** 돌려라 (몇 분 아낌).

---

## PHASE 3 — Apple 처리 대기 → VALID 확인

- [ ] 업로드 후 5~10분, Apple이 처리. 끝나면 이메일.
- [ ] **반려 메일(ITMS-xxxxx) 오는지 확인.** 오면 그 빌드는 죽음 → 고쳐서 **새 빌드 번호로 다시** 올려야 함. (ITMS 메일엔 **회신 안 함** — 자동발송. 새 바이너리가 곧 대응.)
- [ ] 빌드가 `VALID` 됐는지 확인 (아래 API 스니펫 `processingState`).

---

## PHASE 4 — TestFlight 배포 (친구들이 /beta로 받게)

> **EAS는 그룹에 안 넣어준다.** 이거 안 하면 `/beta` 링크에 **옛날 빌드**만 보임. (이번에 "왜 아직 9냐" 사건)

- [ ] build를 **"Friends" 외부 그룹에 추가 + Beta 심사 제출** (아래 API 스니펫).
- [ ] `betaReviewState`가 `APPROVED` 되면 → `/beta` 링크가 새 빌드 서빙.
  (앱이 한 번 베타승인된 뒤론 후속 빌드 거의 즉시 APPROVED 되기도 함)
- [ ] 폰: TestFlight 앱 → Mimi → **Update**.

---

## PHASE 5 — App Store 공개 심사 (공개 출시)

> **빌드 swap은 버전이 `WAITING_FOR_REVIEW`로 잠겨 있으면 안 됨** (409 INVALID_STATE). 먼저 심사 취소해야 함.

상태 읽기:
- [ ] 버전 상태/붙은 빌드는 **직접 조회**로 확인 (목록 API는 relationship 비어 나옴):
  `GET /v1/appStoreVersions/{VID}?include=build`
- [ ] `WAITING_FOR_REVIEW` = **심사 대기**(아직 안 잡힘) / `IN_REVIEW` = **심사 중**. 대기 상태일 땐 swap 손해 거의 없음.

빌드 교체(예: 잘못된 빌드 → 새 빌드)가 필요하면 순서:
1. [ ] reviewSubmission `canceled: true` PATCH → 버전 `DEVELOPER_REJECTED`로 빠짐(편집 가능)
2. [ ] 새 빌드 attach: `PATCH /v1/appStoreVersions/{VID}/relationships/build`
3. [ ] 새 reviewSubmission 생성 → reviewSubmissionItem(버전) 추가 → `submitted: true` PATCH
4. [ ] 다시 `WAITING_FOR_REVIEW` + 새 빌드 붙었는지 확인
- [ ] **Age rating / App Privacy / 스크린샷**은 ASC UI에서 (API로 일부 막힘). 스크린샷 6.9"는 display type `APP_IPHONE_67`(1320×2868).

---

## 자주 쓰는 ASC API 스니펫 (ES256 JWT)

JWT: header `{alg:ES256, kid:KEY_ID, typ:JWT}`, payload `{iss:ISSUER, iat, exp(≤20분), aud:"appstoreconnect-v1"}`,
`.p8`로 서명하되 **`dsaEncoding: 'ieee-p1363'`** (이거 안 하면 DER이라 JWT 깨짐).

- 버전+빌드 상태: `GET /v1/appStoreVersions/{VID}?include=build&fields[builds]=version,processingState`
- 빌드 VALID 여부: `GET /v1/builds?filter[app]=6780742714&filter[version]=11&fields[builds]=version,processingState`
- 베타 그룹/심사 상태: `GET /v1/builds/{BID}?include=betaAppReviewSubmission,betaGroups`
- 그룹에 추가: `POST /v1/betaGroups/{GID}/relationships/builds` body `{data:[{type:"builds",id:BID}]}`
- 베타 심사 제출: `POST /v1/betaAppReviewSubmissions` body `{data:{type:"betaAppReviewSubmissions",relationships:{build:{data:{type:"builds",id:BID}}}}}`

---

## 이번에 실제로 터진 것들 (요약)

| # | 증상 | 원인 | 해결 |
|---|---|---|---|
| 1 | `eas build` "build command failed" | `--auto-submit` + `--auto-submit-with-profile` 동시 사용 | `--auto-submit-with-profile`만 |
| 2 | build 10 ITMS-90683 반려 | expo-image가 Photo Library API 링크, purpose string 없음 | `NSPhotoLibraryUsageDescription` 추가 |
| 3 | build 11 attach 409 | 버전이 `WAITING_FOR_REVIEW`로 잠김 | reviewSubmission 취소 후 attach |
| 4 | 제출 막힐 뻔 | Developer Program License Agreement 미수락 | Account Holder가 ASC에서 수락 |
| 5 | "왜 아직 build 9?" | EAS가 TestFlight 외부 그룹에 안 넣음 | Friends 그룹 추가 + Beta 심사 제출 |
| 6 | 폰 dev빌드 `Unable to resolve @/components/skeleton` | 2주 전부터 켜진 좀비 Metro의 낡은 모듈맵 | Metro `kill` 후 `expo start -c` |

**한 줄 교훈:** 각 단계의 ✓는 다음 단계 실패를 막아줄 뿐이다 — `tsc 통과 ≠ 렌더됨`, `Submitted ≠ Accepted`, `Accepted ≠ TestFlight에 보임`. 단계마다 별도로 확인.
