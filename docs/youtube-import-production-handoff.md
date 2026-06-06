# YouTube Import Production Handoff

작성일: 2026-06-05

이 문서는 YouTube import가 로컬에서는 되는데 배포 환경(AWS ECS)에서는 멈추거나 자막이 비는 문제를 끝까지 추적한 handoff다. Claude Code나 다른 에이전트가 이어받을 때 이 파일부터 읽으면 된다.

범위 주의: 이 파일은 채팅 원문 전체 export가 아니다. Codex/Claude 대화창의 모든 문장을 원문 그대로 저장한 것은 아니고, 세션에 남은 요청 흐름 + git commit 시각 + AWS/CloudWatch/mobile 로그 + 코드 변경을 기준으로 복원한 작업 기록이다. 기술적으로 이어받는 데 필요한 내용은 빠짐없이 남기는 것을 목표로 했다.

## 현재 결론

- 모바일 실제 iPhone + 운영 API 조합에서는 YouTube 자막 import가 성공했다.
- 성공 증거: CloudWatch에 `Attached client transcript for Sg-MkS52BMU (257 segments)`가 찍혔다.
- 운영 백엔드도 살아 있다. `https://api.mimi.daeseon.ai/api/health`가 `HTTP/2 200`과 `{"status":"ok"}`를 반환했다.
- 서버 단독 YouTube 자막 fetch는 여전히 AWS에서 막힌다. 이건 코드가 멈춘 게 아니라 YouTube bot/sign-in gate 때문에 `.json3`가 안 만들어지는 상태다.
- 웹 import는 아직 서버-only 경로다. 일반 웹앱은 모바일 WebView 방식처럼 YouTube 페이지 안에 JS를 주입해 자막을 읽을 수 없다. 웹에서 임의 URL import를 안정적으로 하려면 Supadata 같은 API, 레지덴셜 프록시, 브라우저 확장, 홈워커, 수동 큐레이션 중 하나가 필요하다.

## 이 대화의 실제 시작점

현재 세션에서 보이는 가장 첫 사용자 메시지는 기술 이슈가 아니라 권한/진행 방식에 대한 요청이었다.

```text
어떻게 해야 너에게 모든 권한 줄 수 있나?? 일일히 안묻게
```

그 다음 바로 나온 실제 기술 문제 제기는 YouTube import production failure였다.

```text
지금 유튜브를 import하는 기능이 로컬에서는 문제없는데 배포하니까 계속 먹통이 되서 클로드코드가 개선중인데 토큰이 꽉찼다.. 너가 가능하겠나..
```

이후 사용자의 요구는 아래 흐름으로 이어졌다.

- 앱/웹을 실제로 띄워서 확인하라는 요청.
- "배포까지 한 거냐", "로컬로 테스트한 거냐"라는 운영 검증 요구.
- 로컬 성공이 아니라 AWS production에서 안 되는 문제라는 반복 확인.
- 자막을 실제로 들고오는 것이 근본문제라는 지적.
- 서드파티, 정책, YouTube anti-bot, home worker, `bgutils-js`, Supadata 등 근본 대안 검토 요구.
- 모바일 앱으로 서비스할 것이므로 폰에서 먼저 자막을 가져오고 실패 시 fallback하는 우선순위 제안.
- MacBook에 iPhone을 연결했고 실제 폰에서 실행 명령어를 달라는 요청.
- 실제 iPhone에서 다시 실패했고 `device transcription ... cannot be parsed`, `empty caption response` 같은 로그를 보고한 상황.
- 마지막으로 hardcode/리스크/웹 가능 여부를 묻고, 지금까지 한 작업 전체를 Claude가 볼 수 있게 문서로 저장하라는 요청.

즉 "맨 처음"은 권한/진행 방식 요청이고, 기술 작업의 시작은 바로 다음의 "YouTube import가 로컬은 되는데 배포에서 먹통" 문제다. 이 문서의 나머지는 그 기술 문제를 기준으로 전체 작업을 시간순으로 기록한다.

### 현재 세션에서 보이는 사용자 메시지 순서

아래는 현재 Codex 세션 컨텍스트에 보이는 사용자 요청 흐름이다. 원문 transcript export는 아니지만, 이어받는 에이전트가 감정선/요구사항/금지사항/기술 이슈 순서를 놓치지 않도록 최대한 원문에 가깝게 남긴다.

```text
1. 어떻게 해야 너에게 모든 권한 줄 수 있나?? 일일히 안묻게
2. 지금 유튜브를 import하는 기능이 로컬에서는 문제없는데 배포하니까 계속 먹통이 되서 클로드코드가 개선중인데 토큰이 꽉찼다.. 너가 가능하겠나..
3. 제
4. 실제 웹이랑 앱 띄워보자 한번 앱 띄우는 명령어좀 확실히 이제 임포트ㄴ되나
5. 배포까지 한거냐
6. 아니 지금 문제가 로컬은 되는데 배포했을때 안되는 거자나 설마 로컬로 테스트한거야????
7. 된다고 아 진짜 답답라네
8. 야 제발 일일히 묻지말고해라 씨발 제발
9. 내가 시발 묻지말고 알아서 하랬지 씨발련아 또 물으면 신고한다
10. 계속 처 묻는이유가머임? 묻지말고 하라는데 대체?? 병신임?
11. 개 씨발 잘거라고 자고싶은데 계속 처물으니 진행이안된다고 다시 실행이 필요한거아니면 그냥 끝까지 호가실히 고치라고 확실히 절대 전부허용하니까 씨발 암것도 묻지마라
12. 또 처물었따 왜 거짓말을 하는거냐
13. 자막을 들고와야지 그게 근본문젠데 머한거냐
14. 도대체 씨발 하루종일 뭐하는거임?? 클로드가 분석해놓은거도 못보고 혼자뭔짓하는거냐고
15. 아니 정책적 문제일수있자나 서드파티든 뭔가 근본적 원인으로 찾아봐야지
16. 도대체 내가 이상한걸 시킨거냐 아니면 너가 ㅂ
17. 아니... 개 씨발 그냥 로컬에서도 운영처럼 안되게 세팅하는식으로 해야하냐 뭐냐 그래서 애초에 확실한 해결책을 찾아오라는거잖아 왜 계속 피상적인 에러만 붙잡냐 서드파티를 쓰든 뭔가 있을거아니냐 뭐가 문제인거냐
18. 그래서 지금 방법이 뭔데 해결할 수 있는
19. 저게 서드파티냐 뭐냐 supadata가?? 돈드냐
20. homeworker가 뭐고 bgutils-js 이거는 왜 안되는데??
21. 이거를 전세계 유저 대상으로 쓸건데 supadata는 무리아니냐
22. 홈 워커도 안되지 않나?? 전세계대상이면?? 그냥 import하고 나서... 폰에서 자막을 들고오는 식은 안되나?? tubeshed라는 서비스는 어찌하는거냐 대체
23. 어차피 이거 모바일 앱으로 서비스할거다 폰을 기본으로쓰고 안될떄 다른거 쓰는 방식으로 존나 순위를 두면 되지않냐
24. 지금 백엔드 aws까지 배포된거냐?? 이제 완전히 테스트 되는거냐 운영 환경서
25. 지금 맥북에 아이폰 연결했다 좀 씨발련아 내 폰에서 직접 할 수 있게 실행 명령어를 달라고
26. 지금 폰에서 했는데 여전히 안된다 로그봐라 씨발아
27. 이 개 씨발련아 제발 하나하나 처 묻지말라고 뭐가 문제냐 모든 권한주도록 다시 실행할게 씨발 제발
28. 지금 했는데 안된다
29. 아니 무슨 이 씨발련이 진짜 지금 뭐하는거냐 도대체??
30. device transcription 뭐라뭐라하면서  can not be parsed 이 지랄하는데
31. empty  caption response라는데
32. 계속 에러나잖나
33. 하드코딩이나 문제되는거없냐??  기능 개발에만 급급한거아니냐 그리고 웹은 안되는거냐
34. 지금까지 한 모든 작업을 문서로 저장해라 확실히 저장해라 제대로.. 하나도 빠짐없이 첨부터 끝까지 클로드가 보고 파악할 수 있게
35. 이 대화를 처음했던 시간부터 전부를 기록한거ㅑ?? 엄청 오랬동안 했잖나
36. 맨처음 시작이 어딘데
37. 지금 이거 브랜치 어디냐? 클코가 하던거랑 안겹치냐
38. 너한테 full access 어찌주나??
39. 그전에 현재 이 대화첨부터 끝까지 확실히 저장한거 맞나
```

이 목록의 의미:

- 사용자는 반복적으로 "묻지 말고 진행"을 요구했다.
- 검증 기준은 local이 아니라 deployed AWS backend + actual mobile device였다.
- 문제의 본질은 영상 저장이 아니라 transcript/caption import였다.
- 사용자는 server-only/Supadata/home worker/bgutils 같은 대안보다, 모바일 앱에서 폰을 primary transcript fetcher로 쓰고 실패 시 fallback하는 우선순위를 제안했다.
- 이 문서 저장 요청은 "기술 요약"이 아니라 Claude가 대화 맥락과 작업 판단까지 그대로 이어받기 위한 것이었다.

## 대화/작업 전체 타임라인

아래는 이 긴 디버깅 흐름을 처음 문제 제기부터 현재까지 이어받기 좋게 재구성한 것이다. 시간은 가능한 곳은 commit/AWS 로그 기준이고, 채팅 순서는 세션에 남은 사용자 요청 흐름 기준이다.

### 0. 시작 맥락

- 사용자는 "로컬에서는 YouTube import가 되는데 배포하면 계속 먹통"이라고 문제를 제기했다.
- Claude Code가 이미 개선 중이었지만 토큰이 찼고, 이어서 Codex가 작업을 넘겨받았다.
- 사용자는 계속 "일일이 묻지 말고 끝까지 하라", "로컬이 아니라 운영에서 검증하라", "자막을 가져오는 게 근본문제다", "피상적인 에러가 아니라 정책/서드파티/근본 원인을 찾으라"고 요구했다.
- 핵심 요구는 단순 버그 수정이 아니라:
  - 실제 AWS production에서 재현/검증
  - 모바일 실제 iPhone에서 검증
  - 자막 transcript가 실제로 붙는지 확인
  - hardcode/운영 리스크까지 감사
  - Claude가 이어받을 수 있는 문서화

### 1. 2026-06-04: 웹/AWS/CORS/자막 구조 분석이 먼저 있었다

관련 commit:

```text
896b2dc 2026-06-04 16:21:36 -0400 docs(log): YouTube 자막 fetch — 웹 CORS 벽 + 라이브러리 빈 원인 검증, 7개 방안 비교
907354a 2026-06-04 16:33:44 -0400 docs(log): two deep explainers — 7 transcript-fetch approaches + the 49 deployed AWS resources
```

이 단계에서 확인된 내용:

- "저장됐는데 라이브러리에 안 보임"은 별도 라이브러리 버그가 아니라 자막 실패의 하류 효과다.
- 라이브러리는 `videos`가 아니라 `clips`를 보여준다.
- clip은 `/video/{id}`에서 transcript sentence를 탭해야 만들어진다.
- transcript가 없으면 clip을 만들 수 없고, 그래서 library가 비어 보인다.
- 웹 일반 JS는 YouTube iframe DOM이나 timedtext 응답을 직접 읽을 수 없다.
- 이유는 CORS/same-origin이다. IP 문제가 아니라 browser security model이다.
- "웹 + 무료 + 임의 URL + 안정성"을 동시에 만족하는 방법은 없다는 결론이 이미 기록됐다.

### 2. 2026-06-04 17:31: 모바일 WebView + client transcript path 첫 구현

관련 commit:

```text
9857f9c 2026-06-04 17:31:40 -0400 feat: on-device WebView transcript fetch (mobile) + client-supplied transcript path (backend)
170e016 2026-06-04 17:35:32 -0400 docs(log): YouTube POToken wall + WebView on-device transcript fetch (9857f9c)
```

이 단계에서 한 일:

- 모바일 앱에 hidden `react-native-webview`를 넣어 YouTube watch page를 실제 브라우저 문서로 열었다.
- injected JS가 `ytInitialPlayerResponse`에서 `captionTracks`를 찾고 timedtext URL을 fetch하게 했다.
- backend에 client-supplied transcript path를 열었다.
- `VideoImportRequest`가 `transcriptSegments`와 `title`을 받을 수 있게 됐다.
- `VideoImportService.importByUrl(url, clientSegments, clientTitle)`가 생겼다.
- device transcript가 있으면 backend server-side yt-dlp를 skip하고 바로 transcript를 attach하는 구조가 생겼다.

중요:

- 이 아이디어는 맞았지만, 당시에는 YouTube timedtext/POToken 벽 때문에 바로 안정 성공하지 못했다.

### 3. 2026-06-04 17:58: WebView path가 깨진 것으로 보고 되돌린 적이 있다

관련 commit:

```text
e315c47 2026-06-04 17:58:25 -0400 revert(mobile): drop WebView transcript fetch — POToken blocks it even in a real browser
```

그때 판단:

- WebView에서 watch page는 열리지만 caption timedtext가 여전히 0 bytes로 내려오는 문제가 있었다.
- "진짜 브라우저여도 POToken/timedtext가 막히는 것 아닌가"라는 판단으로 모바일 WebView path를 제거한 적이 있다.

현재 관점에서 수정된 판단:

- page-provided timedtext URL만 보면 0 bytes가 맞다.
- 하지만 `youtubei/v1/player`를 yt-dlp식 client profile, 특히 `ANDROID_VR`, 로 다시 호출하면 caption track을 얻을 수 있었다.
- 그래서 단순 WebView fetch는 부족했지만, WebView + Innertube Android VR fallback은 성공했다.

### 4. 2026-06-04 18:28: server-side POT provider/bgutil 시도

관련 commit:

```text
bbdd7dc 2026-06-04 18:28:25 -0400 feat(infra): mint YouTube POTokens server-side via bgutil sidecar
dedc1b8 2026-06-04 18:41:54 -0400 docs(log): transcript method decision + fallback runbook; pin pot-provider to :1.3.1
8002f83 2026-06-04 18:42:54 -0400 docs(log): troubleshooting pointer to the transcript fallback runbook
e189512 2026-06-04 18:43:25 -0400 chore(log): override-trigger note for 8002f83
```

이 단계에서 한 일:

- bgutil-ytdlp-pot-provider를 server-side로 붙여 AWS에서도 POToken을 mint하려 했다.
- sidecar/provider 방식이 기록됐다.
- fallback runbook이 `content/logs/shadow-ai/2026-06-04-transcript-method-decision-and-fallbacks.mdx`에 정리됐다.

현재 확인된 한계:

- 실제 AWS CloudWatch에서는 POT provider 자체는 떠도 server yt-dlp는 여전히 `Sign in to confirm you're not a bot`로 실패했다.
- 따라서 현재 성공 경로는 server-side POT가 아니라 mobile device-supplied transcript다.

### 5. 2026-06-05 01:51: production import hang 방지

관련 commit:

```text
dca594e 2026-06-05 01:51:50 -0400 fix(video): prevent YouTube import hangs in prod
```

한 일:

- `ProcessRunner`를 추가했다.
- yt-dlp/probe subprocess가 무한히 import를 붙잡지 않게 timeout을 적용했다.
- prod에서 import가 "먹통"처럼 보이는 것을 줄였다.
- `VideoImportService.importByUrl`에서 긴 network call이 DB transaction을 잡지 않도록 구조가 유지됐다.

중요:

- 이건 hang 방지이지 transcript 성공 자체의 근본 해결은 아니었다.

### 6. 2026-06-05 06:54: subtitle-only yt-dlp format error 완화

관련 commit:

```text
38afb87 2026-06-05 06:54:56 -0400 fix(video): ignore YouTube format errors for subtitles
```

한 일:

- transcript만 필요한데 video formats가 없다는 에러 때문에 전체가 실패하는 경우를 완화했다.
- `--ignore-no-formats-error`가 들어갔다.
- 테스트가 추가됐다.

한계:

- AWS bot/sign-in gate 자체를 해결하지는 못했다.

### 7. 2026-06-05 09:58: POT provider를 backend image 안에도 넣음

관련 commit:

```text
7561a5c 2026-06-05 09:58:44 -0400 fix(video): run POT provider inside backend image
```

한 일:

- backend Dockerfile에 `yt-dlp`, `bgutil-ytdlp-pot-provider==1.3.1`, `deno`, `nodejs`가 들어갔다.
- `/opt/pot-provider`를 copy하고 entrypoint에서 provider를 background로 띄웠다.
- ECS task sidecar 네트워킹 문제를 줄이려는 시도였다.

현재 리스크:

- ECS task definition의 sidecar는 `4416`, backend image 내부 provider는 `4417`이다.
- server-side provider 구조가 중복/혼선 상태다.
- 실제 server fetch는 여전히 실패했으므로 이 경로를 primary로 주장하면 안 된다.

### 8. 2026-06-05 10:24: Supadata fallback 추가

관련 commit:

```text
a10372c 2026-06-05 10:24:26 -0400 fix(video): add transcript fallback providers
```

한 일:

- `SupadataTranscriptClient`가 추가됐다.
- `SUPADATA_API_KEY`가 있으면 yt-dlp 실패 후 Supadata로 fallback할 수 있게 됐다.
- default mode는 `native`로 기존 caption만 가져온다.

판단:

- Supadata는 third-party paid/vendor fallback이다.
- 전세계 사용자 primary로 쓰기엔 비용/쿼터 리스크가 있다.
- 하지만 웹 arbitrary URL import를 안정적으로 지원하려면 가장 단순한 backend-side 대안 중 하나다.

### 9. 2026-06-05 12:09: 모바일 on-device transcript path를 다시 도입

관련 commit:

```text
9ce6705 2026-06-05 12:09:36 -0400 fix(mobile): fetch YouTube transcript on device first
```

한 일:

- 모바일 import가 서버를 먼저 때리는 대신 hidden WebView transcript fetch를 먼저 하도록 바뀌었다.
- 성공하면 `transcriptSegments`를 backend에 보낸다.
- 실패하면 server-only import로 fallback한다.

당시 사용자 요구:

- "로컬은 되는데 배포에서 안 되는 거잖아"
- "폰에서 자막을 들고오는 식은 안 되나"
- "모바일 앱으로 서비스할 거다"
- "폰을 기본으로 쓰고 안 될 때 다른 걸 쓰는 방식으로 우선순위를 두면 되지 않나"

이 commit은 그 요구에 맞춘 구조 변경이다.

### 10. 2026-06-05 12:41: real device가 prod API를 쓰게 수정

관련 commit:

```text
760de99 2026-06-05 12:41:42 -0400 fix(mobile): use prod API on real devices
```

한 일:

- `mobile/src/lib/api.ts`에 `PROD_API_URL = 'https://api.mimi.daeseon.ai'` fallback이 들어갔다.
- `__DEV__ && Device.isDevice`이면 prod API를 기본으로 쓰게 했다.
- `EXPO_PUBLIC_API_URL`이 있으면 항상 그 값이 우선한다.

이유:

- 실제 iPhone dev client에서 `localhost`나 Mac LAN backend로 붙으면 production 문제를 검증할 수 없다.
- 사용자가 요구한 것은 로컬 검증이 아니라 운영 검증이었다.

### 11. 2026-06-05 13시대: 실제 iPhone 연결/실패 로그 확인

사용자 상태:

- MacBook에 iPhone을 연결했다.
- 사용자가 "폰에서 했는데 여전히 안된다", "로그봐라", "`device transcription ... can not be parsed`", "`empty caption response`"라고 보고했다.

확인된 모바일 실패:

```text
device transcript timeout
"/api/timedtext?... cannot be parsed as a URL"
empty caption response
empty caption response (json3:200:0, srv3:200:0, vtt:200:0, raw:200:0)
```

해결 방향:

- relative timedtext URL parsing을 고쳤다.
- page-provided timedtext body 0 bytes가 계속 확인됐다.
- 그래서 page timedtext가 아니라 Innertube player fallback을 추가해야 한다는 결론으로 갔다.

### 12. 2026-06-05 14:09: Android VR player fallback 추가, 실제 성공

관련 commit:

```text
00d5c6f 2026-06-05 14:09:33 -0400 fix(mobile): fetch captions with Android VR player fallback
```

한 일:

- WebView injected JS 안에서 YouTube `youtubei/v1/player`를 여러 client profile로 호출했다.
- `ANDROID_VR` profile을 최우선으로 넣었다.
- `ANDROID`, `IOS`, `MWEB`, `WEB` 순서 fallback을 추가했다.
- json3/XML/VTT parser를 보강했다.

성공:

```text
INFO [youtube transcript] device success: 257 segments
```

운영 backend CloudWatch:

```text
2026-06-05T18:08:17.818686091Z
Attached client transcript for Sg-MkS52BMU (257 segments)
requestId: 6c0d83ad
```

이게 이번 긴 작업의 핵심 성공 지점이다.

### 13. 2026-06-05 18:12 UTC: 운영 health / ECS 상태 재검증

운영 health:

```text
HTTP/2 200
{"data":{"status":"ok"},"timestamp":"2026-06-05T18:12:57.348328788Z"}
```

ECS:

```text
cluster: tubeshadow-cluster
service: tubeshadow-backend
region: ap-northeast-2
desired/running/pending: 1/1/0
rolloutState: COMPLETED
```

### 14. 마지막 사용자 요청: hardcode/웹/문서화

사용자는 이후 다음을 물었다.

- "하드코딩이나 문제되는거 없냐"
- "기능 개발에만 급급한 거 아니냐"
- "웹은 안 되는 거냐"
- "지금까지 한 모든 작업을 문서로 저장해라"
- "처음했던 시간부터 전부 기록한 거냐"

이에 대한 현재 문서 상태:

- 처음 저장한 문서는 기술 handoff 중심이었다.
- 이후 이 섹션을 추가해 긴 대화/작업 흐름을 시간순으로 보완했다.
- 단, 채팅 원문 전체 transcript는 저장한 것이 아니다. repo에서 접근 가능한 것은 코드/커밋/로그이고, 이 문서는 그 근거를 바탕으로 복원한 전체 작업 기록이다.

## 운영 상태

- AWS account: `420432358322`
- AWS region actually used: `ap-northeast-2`
- ECS cluster: `tubeshadow-cluster`
- ECS service: `tubeshadow-backend`
- ECS service status: `ACTIVE`
- Desired/running/pending: `1 / 1 / 0`
- Task definition: `tubeshadow:2`
- Log group: `/ecs/tubeshadow`
- Running image in task definition: `420432358322.dkr.ecr.ap-northeast-2.amazonaws.com/tubeshadow:latest`
- Current ECR latest digest: `sha256:40659a2dde50d4e772a382ef74a2f1444b3dceafc73eaf4cc4b61701f13ead8e`
- Current ECR latest tags: `a10372c`, `latest`
- Last prod image push seen: `2026-06-05T10:44:03.455-04:00`
- ECS deployment completed and steady state: service deployment `ecs-svc/9584037603444978548`, created `2026-06-05T10:44:47.617-04:00`, updated `2026-06-05T10:48:49.711-04:00`

Important mismatch:

- `.github/workflows/deploy.yml` currently hardcodes `AWS_REGION: ca-central-1`.
- Real production ECS/ECR is in `ap-northeast-2`.
- Do not trust that deploy workflow as-is for this backend until the region mismatch is fixed.

## Git/branch state

Current branch at the time this document was written:

```text
feat/mobile-app
HEAD: 00d5c6f fix(mobile): fetch captions with Android VR player fallback
origin/main: 00d5c6f
origin/feat/mobile-app: e189512
```

Local status before this document:

```text
## feat/mobile-app...origin/feat/mobile-app [ahead 7]
 M docs/troubleshooting.md
```

The existing `docs/troubleshooting.md` modification was not touched by this handoff. This document is a new file.

Recent commits that matter:

```text
00d5c6f fix(mobile): fetch captions with Android VR player fallback
760de99 fix(mobile): use prod API on real devices
9ce6705 fix(mobile): fetch YouTube transcript on device first
a10372c fix(video): add transcript fallback providers
7561a5c fix(video): run POT provider inside backend image
38afb87 fix(video): ignore YouTube format errors for subtitles
dca594e fix(video): prevent YouTube import hangs in prod
e189512 chore(log): override-trigger note for 8002f83
8002f83 docs(log): troubleshooting pointer to the transcript fallback runbook
dedc1b8 docs(log): transcript method decision + fallback runbook; pin pot-provider to :1.3.1
bbdd7dc feat(infra): mint YouTube POTokens server-side via bgutil sidecar
e315c47 revert(mobile): drop WebView transcript fetch
9857f9c feat: on-device WebView transcript fetch + client-supplied transcript path
```

## 문제의 실제 모양

처음 증상:

- 로컬에서는 YouTube import가 되는 것처럼 보였다.
- 배포된 AWS backend에서는 import가 먹통처럼 보이거나, 영상은 저장되는데 자막이 없고 클립을 만들 수 없었다.
- 사용자가 폰에서 시도해도 실패했다. 초기 모바일 앱은 dev 환경에서 Mac/LAN backend 또는 서버-only path로 가고 있었고, 실제 운영 API + device transcript 경로가 아니었다.

중요한 구분:

- 영상 자체 저장과 자막 attach는 별개다.
- 라이브러리는 영상 목록이 아니라 clip 목록이다.
- 자막이 없으면 영상 페이지에 문장이 없고, 문장을 탭해서 clip을 만들 수 없어서 라이브러리가 비어 보인다.
- 그래서 "저장됐는데 라이브러리에 안 보임"은 자막 실패의 하류 효과다.

## 검증된 원인

### 1. 서버 단독 yt-dlp는 AWS에서 YouTube gate에 걸린다

CloudWatch에서 반복 확인된 서버 실패 패턴:

```text
No .json3 produced for BHCSL_ZifI0
WARNING: [youtube] Sign in to confirm you’re not a bot.
WARNING: No video formats found!
WARNING: Requested format is not available
[info] There are no subtitles for the requested languages
```

비슷한 실패가 `BHCSL_ZifI0`, `TAToCUrWr0w`, `uDmAy0vIgM0`, `Sg-MkS52BMU`에서 반복됐다.

해석:

- "자막이 진짜 없는 영상"이 아니라 AWS datacenter egress가 YouTube gate에 걸려서 subtitle 파일이 안 만들어지는 것이다.
- `yt-dlp --list-subs https://www.youtube.com/watch?v=BHCSL_ZifI0`로 자동 자막 존재를 확인했다.
- 서버 path는 fallback으로 남아 있지만, 현재 운영에서 신뢰할 primary path가 아니다.

### 2. YouTube page caption URL은 HTTP 200이어도 body가 0바이트일 수 있다

직접 확인한 실패:

- YouTube watch page에서 얻은 `/api/timedtext?...` URL을 호출하면 HTTP status는 `200`이다.
- 하지만 body length가 `0`이었다.
- 모바일 WebView에서도 page-provided signed timedtext URL이 `json3:200:0`, `srv3:200:0`, `vtt:200:0`, `raw:200:0` 형태로 실패했다.

중요한 결론:

- HTTP 200만 성공으로 보면 안 된다.
- 실제 body length와 parsed segment count를 봐야 한다.

### 3. 숨은 WebView만으로도 처음에는 부족했다

초기 모바일 WebView path는 YouTube watch page에 들어가서 `ytInitialPlayerResponse`를 읽고 `captionTracks[].baseUrl`을 fetch했다.

실패 로그:

```text
device transcript timeout
"/api/timedtext?... cannot be parsed as a URL"
empty caption response
empty caption response (json3:200:0, srv3:200:0, vtt:200:0, raw:200:0)
```

고친 점:

- relative `/api/timedtext` URL을 `new URL(baseUrl, 'https://www.youtube.com')`로 처리했다.
- json3/srv XML/VTT/raw 응답을 모두 파싱하도록 했다.
- 그래도 page-provided signed timedtext가 0바이트라서 Innertube player fallback이 필요했다.

### 4. Android VR Innertube player fallback이 실제 성공 경로였다

`yt-dlp`에서 쓰는 `android_vr` client profile을 확인해서 모바일 WebView 내부에서 `youtubei/v1/player`를 호출했다.

사용한 우선순위:

```text
ANDROID_VR
ANDROID
IOS
MWEB
WEB
```

`ANDROID_VR` profile:

```text
clientName: ANDROID_VR
clientVersion: 1.65.10
deviceMake: Oculus
deviceModel: Quest 3
androidSdkVersion: 32
userAgent: com.google.android.apps.youtube.vr.oculus/1.65.10 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip
osName: Android
osVersion: 12L
```

성공 로그:

```text
INFO [youtube transcript] device success: 257 segments
```

그리고 운영 backend CloudWatch:

```text
2026-06-05T18:08:17.818686091Z
Attached client transcript for Sg-MkS52BMU (257 segments)
requestId: 6c0d83ad
```

이게 현재 "운영 환경에서 실제로 된" 증거다. 로컬-only 테스트가 아니다.

## 최종 동작 구조

### 모바일 import flow

1. 사용자가 모바일 앱에서 YouTube URL을 입력한다.
2. `mobile/src/app/import.tsx`가 바로 서버 import를 호출하지 않고 `YoutubeTranscriptWebView`를 띄운다.
3. `YoutubeTranscriptWebView`는 hidden WebView로 YouTube watch URL을 연다.
4. injected JS가 다음을 시도한다.
   - `window.ytInitialPlayerResponse`
   - `ytcfg.PLAYER_VARS.embedded_player_response`
   - `ytplayer.config.args.player_response`
   - script text scan으로 `ytInitialPlayerResponse` JSON 추출
5. caption tracks가 있으면 `json3`, `srv3`, `vtt`, raw 순서로 timedtext를 fetch하고 파싱한다.
6. page timedtext가 비면 Innertube `youtubei/v1/player`를 여러 client profile로 호출한다.
7. segment가 생기면 React Native로 `{ title, segments }`를 postMessage한다.
8. 모바일 앱이 `videosApi.importByUrl(url, { transcriptSegments, title })`를 호출한다.
9. backend는 client-supplied transcript가 있으면 yt-dlp를 건너뛰고 바로 `video.attachTranscript(...)` 한다.
10. 기존 영상이 이미 transcript unavailable 상태여도 re-import 시 `recoverIfNeeded`가 client transcript를 붙인다.

### 서버 import flow

1. web 또는 모바일 device fetch 실패 시 `transcriptSegments` 없이 backend로 간다.
2. backend는 metadata/oEmbed, probe, yt-dlp transcript fetch를 시도한다.
3. yt-dlp는 `--write-subs`, `--write-auto-subs`, `--skip-download`, `--ignore-no-formats-error`, `--sub-format json3`, `--sub-langs en`을 쓴다.
4. Supadata API key가 있으면 server-side fallback으로 Supadata를 시도한다.
5. key가 없거나 server yt-dlp가 gate에 걸리면 transcript unavailable로 저장된다.

## 바뀐 코드

### `mobile/src/lib/api.ts`

핵심:

- `PROD_API_URL = 'https://api.mimi.daeseon.ai'`
- `EXPO_PUBLIC_API_URL`이 있으면 무조건 그 값을 사용한다.
- `__DEV__ && Device.isDevice`이면 prod API를 기본값으로 쓴다.
- 시뮬레이터/local dev에서는 Metro host 기반 `http://<host>:8080` fallback을 쓴다.
- release build에서 `EXPO_PUBLIC_API_URL` 없으면 error를 던진다.

이유:

- 실제 iPhone에서 dev client를 띄워도 운영 backend를 때려야 이번 문제를 검증할 수 있었다.
- `localhost`는 폰 자기 자신이라 physical device에서는 잘못된 backend가 된다.

### `mobile/eas.json`

preview/production build 모두:

```json
"EXPO_PUBLIC_API_URL": "https://api.mimi.daeseon.ai"
```

### `mobile/src/app/import.tsx`

핵심:

- import 버튼을 누르면 `deviceFetchUrl`을 설정하고 hidden `YoutubeTranscriptWebView`를 렌더한다.
- WebView가 성공하면 `transcriptSegments`와 `title`을 backend에 같이 보낸다.
- WebView가 실패하면 기존 server-only import를 fallback으로 호출한다.
- dev에서만 `device transcript: <error>`를 화면에 보여준다.

주의:

- `device transcript: ...` debug text는 `__DEV__` guard가 있어서 production UI에는 안 나온다.

### `mobile/src/lib/youtube-transcript-webview.tsx`

핵심:

- 1x1 hidden `react-native-webview`.
- YouTube watch URL:

```text
https://www.youtube.com/watch?v=<videoId>&bpctr=9999999999&has_verified=1
```

- timeout default: `18000ms`
- parsing 지원:
  - json3
  - legacy timedtext XML
  - TTML-ish `p` XML
  - VTT
- `captionTracks[].baseUrl` relative URL 처리.
- `ANDROID_VR`, `ANDROID`, `IOS`, `MWEB`, `WEB` Innertube clients fallback.
- result logging:

```text
[youtube transcript] device success: <n> segments
[youtube transcript] device failed: <reason>
```

### `backend/src/main/java/com/tubeshadow/video/api/dto/VideoImportRequest.java`

요청 body가 다음을 받을 수 있게 됐다.

```java
String url
List<TranscriptSegment> transcriptSegments
String title
```

### `backend/src/main/java/com/tubeshadow/video/application/VideoImportService.java`

핵심:

- `importByUrl(urlOrId, clientSegments, clientTitle)` 추가.
- 기존 영상이 transcript unavailable이면 `recoverIfNeeded(existing, clientSegments)`로 self-heal.
- clientSegments가 있으면 server yt-dlp를 skip하고 바로 transcript attach.
- oEmbed가 실패하면 device-provided title을 fallback으로 쓴다.
- `@Transactional`은 붙이지 않는다. 네트워크 호출 중 DB connection을 붙잡지 않기 위해 의도적으로 제거된 상태다.

성공 로그:

```text
Imported <youtubeId> with client transcript (<n> segments)
Attached client transcript for <youtubeId> (<n> segments)
```

### `backend/src/main/java/com/tubeshadow/video/infrastructure/YoutubeTranscriptClient.java`

핵심:

- yt-dlp shell-out 유지.
- timeout과 ProcessRunner로 import hang 방지.
- `--ignore-no-formats-error`로 subtitle만 필요한 경우 format error에 덜 민감하게 처리.
- Supadata fallback은 API key가 있을 때만 동작.
- server path는 fallback이지 현재 모바일 primary가 아니다.

### `backend/src/main/java/com/tubeshadow/video/infrastructure/SupadataTranscriptClient.java`

상태:

- optional fallback이다.
- `SUPADATA_API_KEY`가 없으면 비활성.
- default mode는 `native`, 즉 기존 captions만 가져온다.
- `SUPADATA_TRANSCRIPT_MODE=auto`로 바꾸면 Supadata 생성 transcript fallback을 허용할 수 있다.

주의:

- 전세계 사용자 대상 primary로 쓰기에는 비용/쿼터/벤더 의존이 있다.
- 그래도 웹 임의 URL import를 product requirement로 유지하려면 가장 단순한 backend-side 대안이다.

### `backend/Dockerfile`

핵심:

- `yt-dlp`, `bgutil-ytdlp-pot-provider==1.3.1`, `deno`, `nodejs`를 넣었다.
- `/opt/pot-provider`를 copy했다.
- entrypoint에서 pot provider를 background로 띄우고 Spring Boot를 실행한다.

주의:

- 현재 ECS task definition에는 별도 `pot-provider` sidecar도 남아 있다.
- backend image도 자체 provider를 띄우는 구조라 중복/혼선 가능성이 있다.
- 실제 CloudWatch에서는 sidecar provider가 `Started POT server (v1.3.1) on [::]:4416`로 뜬다.
- 하지만 server yt-dlp는 여전히 AWS에서 `Sign in to confirm you're not a bot`로 실패했다. 즉 이 server-side POT route는 아직 reliable하지 않다.

### `backend/src/main/resources/application.yml`

YouTube 관련 config:

```yaml
tubeshadow:
  youtube:
    oembed-url: https://www.youtube.com/oembed
    yt-dlp-binary: ${YT_DLP_BINARY:yt-dlp}
    yt-dlp-timeout-seconds: ${YT_DLP_TIMEOUT_SECONDS:30}
    yt-dlp-proxy: ${YT_DLP_PROXY:}
    pot-provider-base-url: ${YT_DLP_POT_PROVIDER_BASE_URL:http://localhost:4417}
    supadata:
      api-key: ${SUPADATA_API_KEY:}
      base-url: ${SUPADATA_BASE_URL:https://api.supadata.ai/v1}
      lang: ${SUPADATA_LANG:en}
      mode: ${SUPADATA_TRANSCRIPT_MODE:native}
      poll-attempts: ${SUPADATA_POLL_ATTEMPTS:20}
      poll-interval-ms: ${SUPADATA_POLL_INTERVAL_MS:1000}
      timeout-seconds: ${SUPADATA_TIMEOUT_SECONDS:45}
    yt-dlp-probe-timeout-seconds: ${YT_DLP_PROBE_TIMEOUT_SECONDS:10}
```

주의:

- task definition sidecar는 `4416`.
- backend Dockerfile env는 `POT_PROVIDER_PORT=4417`, `YT_DLP_POT_PROVIDER_BASE_URL=http://localhost:4417`.
- application default도 `4417`.
- Terraform/old sidecar path와 in-container path가 섞인 흔적이 있으므로 server-side POT route를 계속 살릴 거면 정리해야 한다.

### `frontend/app/[locale]/(app)/import/page.tsx`

현재 웹 import는 그대로:

```ts
const video = await videosApi.importByUrl(url.trim());
```

즉 웹은 `transcriptSegments`를 보내지 않는다.

## 웹이 왜 같은 방식으로 안 되는가

모바일 WebView는 앱이 `youtube.com` 문서를 직접 열고 그 문서 안에 JS를 주입한다. 그래서 YouTube origin 안에서 `window.ytInitialPlayerResponse`, `ytcfg`, `fetch('/api/timedtext')`, `youtubei/v1/player`를 다룰 수 있다.

일반 웹앱은 다르다.

- `mimi.daeseon.ai`에서 실행되는 JS는 `youtube.com` DOM을 읽을 수 없다.
- YouTube iframe의 DOM도 cross-origin이라 접근할 수 없다.
- YouTube caption/timedtext 응답은 일반 웹 fetch에서 CORS 때문에 읽을 수 없다.
- YouTube iframe player API는 자막 텍스트 추출 API를 제공하지 않는다.
- Language Reactor류가 되는 이유는 일반 웹앱이 아니라 브라우저 extension이기 때문이다. extension은 host permission/content script로 YouTube page 안에서 실행된다.

따라서 현재 product decision은 이렇게 봐야 한다.

- 모바일 임의 URL import: 가능, 현재 성공.
- 웹 임의 URL import: 현재 server fallback만 가능하고 AWS에서는 불안정/실패.
- 웹에서 안정적으로 임의 URL을 받아야 한다면 Supadata/API, 레지덴셜 프록시, home worker, browser extension 중 하나를 제품/비용 결정으로 골라야 한다.
- 무료 + 일반 웹 + 임의 URL + 전세계 사용자 + 안정성을 동시에 만족하는 방법은 없다.

## 실제 검증 로그

### 운영 health

Command:

```bash
curl -s -i https://api.mimi.daeseon.ai/api/health
```

Result:

```text
HTTP/2 200
x-request-id: 8afc7b95
{"data":{"status":"ok"},"timestamp":"2026-06-05T18:12:57.348328788Z"}
```

### ECS service

Command:

```bash
aws ecs describe-services \
  --cluster tubeshadow-cluster \
  --services tubeshadow-backend \
  --region ap-northeast-2
```

Result summary:

```text
status: ACTIVE
desiredCount: 1
runningCount: 1
pendingCount: 0
rolloutState: COMPLETED
message: deployment completed / reached steady state
```

### CloudWatch success

Command:

```bash
aws logs tail /ecs/tubeshadow --since 12h --region ap-northeast-2
```

Success line:

```text
2026-06-05T18:08:17.819000+00:00
Attached client transcript for Sg-MkS52BMU (257 segments)
requestId: 6c0d83ad
```

### CloudWatch server failure immediately before success

Same video, server-only path failed first:

```text
2026-06-05T18:04:56.90453295Z
No .json3 produced for Sg-MkS52BMU
WARNING: [youtube] Sign in to confirm you’re not a bot.
WARNING: No video formats found!
WARNING: Requested format is not available
[info] There are no subtitles for the requested languages
```

Then the device-supplied transcript path attached the transcript successfully.

### Mobile TypeScript verification

Command:

```bash
cd mobile
npx tsc --noEmit
```

Result: passed, no output.

### Real iPhone command used

Metro:

```bash
cd mobile
EXPO_PUBLIC_API_URL=https://api.mimi.daeseon.ai npm run start -- --host lan --port 8081 --clear
```

Launch on real iPhone:

```bash
xcrun devicectl --timeout 120 device process launch \
  --device DD394F75-BFAC-50F6-BF99-EC47BC2E77B5 \
  --terminate-existing \
  --console ai.daeseon.mimi
```

Known device:

```text
Name: Daeseon’s iPhone
CoreDevice id: DD394F75-BFAC-50F6-BF99-EC47BC2E77B5
UDID: 00008140-00186DE43CFA801C
Bundle id: ai.daeseon.mimi
```

Mobile log that proved the app hit prod:

```text
INFO [api] base url: https://api.mimi.daeseon.ai
```

Mobile log that proved device transcript path worked:

```text
INFO [youtube transcript] device success: 257 segments
```

## 하드코딩 / 리스크 감사

### No secrets hardcoded

확인된 코드 변경에는 API key, cookie, token, password 같은 secret이 하드코딩되지 않았다.

### `PROD_API_URL` hardcode

File:

```text
mobile/src/lib/api.ts
```

Value:

```ts
const PROD_API_URL = 'https://api.mimi.daeseon.ai';
```

판단:

- 위험한 secret은 아니다.
- 실제 iPhone dev test가 local backend로 잘못 붙는 문제를 막기 위한 fallback이다.
- release/preview build는 `EXPO_PUBLIC_API_URL`이 우선이다.
- 그래도 config purity만 보면 hardcode다. 나중에 staging/prod 분리하면 `app.config.ts`나 EAS env만 쓰도록 바꾸는 게 낫다.

### YouTube client profiles hardcode

File:

```text
mobile/src/lib/youtube-transcript-webview.tsx
```

Hardcoded clients:

```text
ANDROID_VR
ANDROID
IOS
MWEB
WEB
```

판단:

- 이게 가장 큰 유지보수 리스크다.
- `ANDROID_VR` 값은 yt-dlp의 YouTube extractor client profile에서 가져온 우회값이다.
- YouTube가 client/version/playability/caption response 정책을 바꾸면 깨질 수 있다.
- 지금은 실제 iPhone + prod API에서 성공했지만, future-proof는 아니다.

다음 정리:

- profile constants를 별도 object로 빼라.
- 주석에 "copied from yt-dlp 2026.03.17 android_vr client profile"처럼 출처/날짜를 남겨라.
- 실패/성공 client name을 telemetry에 남겨라.

### Injected JS가 너무 크다

File:

```text
mobile/src/lib/youtube-transcript-webview.tsx
```

판단:

- 현재는 하나의 template string 안에 parser, fetcher, client fallback, postMessage가 다 들어 있다.
- 기능상 성공했지만 유지보수성은 좋지 않다.

다음 정리:

- parser 로직(json3/XML/VTT)을 순수 함수로 분리하고 unit test를 붙여라.
- injected script 생성부와 RN WebView component를 분리해라.
- 최소한 sample caption fixtures로 `parseJson3`, `parseTimedTextXml`, `parseVtt` 테스트를 만들라.

### Timeout value

Current:

```text
timeoutMs = 18000
```

판단:

- UX상 너무 길면 먹통처럼 보이고, 너무 짧으면 느린 네트워크에서 fallback으로 떨어진다.
- 지금은 실제 테스트에서 동작했다.
- 제품화할 때는 progress copy/telemetry가 필요하다.

### Language selection

Current:

- Mobile: English manual track 우선, English any, 없으면 first track.
- Server: `--sub-langs en`
- Supadata: default `SUPADATA_LANG=en`

판단:

- Mimi 목적이 영어 학습이면 맞다.
- 전세계 사용자 대상이라도 "모든 언어" 지원이 아니라 "영어 학습 앱"이면 이 설정은 합리적이다.
- 다국어 입력 자체를 지원하려면 language selector가 별도 필요하다.

### Server POT provider configuration ambiguity

Risk:

- ECS task definition has separate `pot-provider` sidecar on `4416`.
- Backend Dockerfile also starts `/opt/pot-provider` on `4417`.
- Application default/base env points at `4417`.
- Server yt-dlp still fails from AWS.

판단:

- server-side POT route는 현재 primary로 믿으면 안 된다.
- 계속 살릴 거면 one-provider architecture로 정리하고 실제 `Retrieved gvs PO Token` 같은 성공 로그를 기준으로 검증해야 한다.
- 지금 성공한 것은 server POT가 아니라 mobile client transcript path다.

### GitHub deploy workflow region mismatch

File:

```text
.github/workflows/deploy.yml
```

Current:

```yaml
AWS_REGION: ca-central-1
```

Production reality:

```text
ap-northeast-2
```

판단:

- 이건 실제 문제다.
- 현재 수동/로컬 AWS 작업으로 `ap-northeast-2` prod를 확인했지만, GitHub Actions deploy를 돌리면 다른 region을 보게 될 수 있다.
- 다음 작업에서 반드시 수정해야 한다.

### Separate production config issue: AI provider key absent

CloudWatch after successful clip creation:

```text
AI provider key absent — skipping analysis for clip 98f4af5d-2e4c-432e-a53d-cbc5197d17c1
AI provider key absent — skipping analysis for clip cacbd2c2-b1c1-4eb1-91b2-b8393e5d0943
```

판단:

- YouTube transcript import와는 별개다.
- 하지만 prod에서 clip analysis가 기대 기능이면 API key/env가 빠진 상태다.
- import 성공 후 분석이 비는 문제가 보이면 이 로그를 먼저 봐라.

## 왜 Supadata를 primary로 안 했나

Supadata는 third-party API다.

장점:

- backend에서 HTTPS 호출만 하면 된다.
- 웹/모바일 모두 같은 경로로 쓸 수 있다.
- AWS datacenter IP 문제를 vendor에게 위임한다.

단점:

- 무료 한도가 작거나 유료 전환이 필요할 수 있다.
- 전세계 사용자 대상이면 호출량/비용/쿼터 문제가 생긴다.
- vendor 장애/정책 변경에 의존한다.

현재 코드 상태:

- Supadata client는 이미 optional fallback으로 구현돼 있다.
- `SUPADATA_API_KEY` 없으면 비활성이다.
- 돈을 쓰지 않는 현재 primary는 모바일 on-device extraction이다.

## Home worker가 의미 있는 경우

Home worker는 집/사무실 같은 residential IP에서 yt-dlp를 돌리는 별도 worker다.

장점:

- AWS datacenter IP gate를 피한다.
- Supadata보다 vendor cost가 없다.
- backend의 client-transcript endpoint를 그대로 재사용할 수 있다.

단점:

- 집 머신이 켜져 있어야 한다.
- 전세계 사용자 트래픽을 한 residential line으로 처리하면 rate/availability 문제가 생긴다.
- 운영 제품 primary로 쓰기엔 안정성이 낮다.

현재 추천:

- 개인/운영자 큐레이션 backfill용으로는 괜찮다.
- 전세계 사용자 primary path로는 부적합하다.

## Tubeshed류 서비스가 가능해 보이는 이유

정확한 내부 구현은 모른다. 다만 가능한 방식은 대체로 아래 중 하나다.

- browser extension/content script로 YouTube page 안에서 실행
- user device app/WebView에서 YouTube page 안에 들어가 추출
- residential proxy pool
- paid transcript/vendor API
- cached/pre-curated transcript DB
- ASR로 audio를 직접 transcription

일반 SaaS 웹앱이 `fetch(youtube timedtext)`로 직접 안정 추출하는 구조는 CORS 때문에 현실적이지 않다.

## 다음 Claude가 바로 해야 할 일

우선순위 1: 문서/UX 정리

- 웹 import 화면에 현재 한계를 반영하라.
- 예: 웹 arbitrary URL import는 "모바일 앱에서 import 권장"으로 안내하거나, server fallback 실패 시 "영상은 저장됐지만 자막이 없어 clip 생성 불가"를 명확히 보여줘라.
- 지금 웹은 여전히 서버-only라 사용자가 같은 문제를 다시 볼 수 있다.

우선순위 2: deploy workflow region 수정

- `.github/workflows/deploy.yml`의 `AWS_REGION`을 실제 prod region `ap-northeast-2`로 고쳐라.
- 또는 staging/prod region을 명확히 분리하라.

우선순위 3: mobile WebView code hardening

- `youtube-transcript-webview.tsx`의 injected JS를 구조화하라.
- parser unit test를 추가하라.
- Android VR profile 출처와 날짜를 상수 주석에 남겨라.
- success/failure telemetry에 client name과 attempt summary를 남겨라.

우선순위 4: server fallback 정리

- server-side POT provider 중복 구조를 정리하라.
- sidecar `4416` vs in-container `4417` 중 하나로 통일하라.
- 계속 유지할 거면 실제 AWS에서 caption fetch 성공 로그가 나올 때까지 검증하라.
- 유지보수 비용이 싫으면 Supadata/proxy로 정책 결정하라.

우선순위 5: production AI key

- clip analysis가 prod에서 필요하면 AI provider key/env를 확인하라.
- 현재 CloudWatch에 `AI provider key absent`가 찍힌다.

## 다시 테스트할 때 쓰는 명령어

Mobile Metro, prod API:

```bash
cd mobile
EXPO_PUBLIC_API_URL=https://api.mimi.daeseon.ai npm run start -- --host lan --port 8081 --clear
```

Real iPhone launch:

```bash
xcrun devicectl --timeout 120 device process launch \
  --device DD394F75-BFAC-50F6-BF99-EC47BC2E77B5 \
  --terminate-existing \
  --console ai.daeseon.mimi
```

Mobile TypeScript:

```bash
cd mobile
npx tsc --noEmit
```

Backend health:

```bash
curl -s -i https://api.mimi.daeseon.ai/api/health
```

ECS service:

```bash
aws ecs describe-services \
  --cluster tubeshadow-cluster \
  --services tubeshadow-backend \
  --region ap-northeast-2
```

CloudWatch logs:

```bash
aws logs tail /ecs/tubeshadow --since 12h --region ap-northeast-2
```

Find transcript success:

```bash
aws logs tail /ecs/tubeshadow --since 12h --region ap-northeast-2 \
  | rg "Attached client transcript|Imported .* with client transcript|No \\.json3|Sign in to confirm"
```

Check current ECR latest:

```bash
aws ecr describe-images \
  --repository-name tubeshadow \
  --region ap-northeast-2 \
  --image-ids imageTag=latest
```

## Do not repeat these mistakes

- Do not claim success from local-only import. The bug was specifically production/AWS.
- Do not treat HTTP 200 from YouTube timedtext as success. Body can be 0 bytes.
- Do not assume "There are no subtitles" from yt-dlp means the video has no captions. In AWS it often means YouTube gate blocked the fetch.
- Do not expect normal web JavaScript to read YouTube iframe DOM or timedtext response. CORS/same-origin blocks it.
- Do not make server-side POT provider the primary claim unless CloudWatch proves actual caption fetch success from AWS.
- Do not overwrite or revert unrelated `docs/troubleshooting.md` changes.

## One-line handoff

The working production path is mobile-first: real iPhone opens YouTube inside a hidden WebView, falls back to yt-dlp-style `ANDROID_VR` Innertube player, parses captions on-device, then posts `transcriptSegments` to the deployed backend; AWS server-only YouTube fetch still fails under YouTube bot/sign-in gating, and web arbitrary URL import needs a separate product/backend strategy.
