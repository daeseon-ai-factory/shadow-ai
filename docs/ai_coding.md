# AI에게 코딩 시키는 영어 (Prompting an AI coding assistant)

개발자가 Claude / Cursor / Copilot 같은 AI에게 코드를 짜게 시킬 때 실제로 쓰는 자연스러운 영어.
외울 단위는 단어가 아니라 통째 문장이다. 영어는 시니어 개발자가 실무에서 그대로 말하는 말투.

포맷: `* **English.** — 한국어`

---

# 1. 코딩 전에 계획부터

* **Before you write any code, walk me through your approach.** — 코드 짜기 전에 접근 방식부터 설명해줘.
* **Don't code yet. Just outline the steps.** — 아직 코딩하지 말고 단계만 잡아줘.
* **What are the trade-offs here?** — 여기서 트레이드오프가 뭐야?
* **Give me a couple of options before you pick one.** — 하나 고르기 전에 선택지 몇 개 줘.
* **What's the smallest change that would fix this?** — 이걸 고치는 가장 작은 변경이 뭐야?
* **Sketch out the data model first.** — 데이터 모델부터 잡아줘.
* **Where would this break?** — 이게 어디서 깨질까?
* **What am I not thinking about?** — 내가 놓치고 있는 게 뭐야?
* **Lay out the edge cases before we start.** — 시작 전에 엣지 케이스부터 정리해줘.
* **Is there a simpler way to do this?** — 더 간단한 방법 없어?
* **Talk me through the high-level design.** — 큰 그림 설계부터 짚어줘.
* **Let's agree on the interface first.** — 인터페이스부터 합의하고 가자.

# 2. 새로 만들기 / 스캐폴딩

* **Scaffold a new project with the basics wired up.** — 기본 세팅된 새 프로젝트 뼈대 만들어줘.
* **Write a function that takes X and returns Y.** — X를 받아 Y를 반환하는 함수 짜줘.
* **Stub out the API endpoints for now.** — 일단 API 엔드포인트만 껍데기로 만들어줘.
* **Wire this up to the database.** — 이걸 DB에 연결해줘.
* **Add a CLI flag for that.** — 그거용 CLI 플래그 추가해줘.
* **Generate the boilerplate and I'll fill in the logic.** — 보일러플레이트만 만들어줘, 로직은 내가 채울게.
* **Make it configurable instead of hard-coded.** — 하드코딩 말고 설정으로 뺄 수 있게 해줘.
* **Add a new route that handles this.** — 이걸 처리하는 새 라우트 추가해줘.
* **Build a minimal version first, then we'll expand.** — 일단 최소 버전 만들고 나서 확장하자.
* **Hook it up to the existing auth flow.** — 기존 인증 플로우에 붙여줘.
* **Create a migration for this schema change.** — 이 스키마 변경용 마이그레이션 만들어줘.
* **Make it work first, we'll optimize later.** — 일단 되게 만들고 최적화는 나중에.

# 3. 버그 찾기 / 디버깅

* **There's a bug where the page hangs. Figure out why.** — 페이지가 멈추는 버그가 있어, 원인 찾아줘.
* **This keeps throwing. Track down the root cause.** — 이게 계속 에러를 던져, 근본 원인 추적해줘.
* **Reproduce the issue first, then fix it.** — 먼저 재현하고 나서 고쳐줘.
* **Add some logging around this so we can see what's happening.** — 무슨 일이 일어나는지 보이게 여기 로그 좀 넣어줘.
* **Why is this returning null?** — 이게 왜 null을 반환하지?
* **Walk me through the stack trace.** — 스택 트레이스 같이 짚어줘.
* **It works locally but breaks in production. Any ideas?** — 로컬은 되는데 프로드에서 깨져, 짚이는 거 있어?
* **Narrow down where it goes wrong.** — 어디서 잘못되는지 범위 좁혀줘.
* **Is this a race condition?** — 이거 레이스 컨디션이야?
* **The test is flaky. Find out why.** — 테스트가 들쭉날쭉해, 왜 그런지 찾아줘.
* **Don't guess. Add a breakpoint and verify.** — 추측하지 말고 브레이크포인트 찍어서 확인해줘.
* **Figure out which change introduced this.** — 어느 변경이 이걸 일으켰는지 찾아줘.

# 4. 리팩토링 / 정리

* **Refactor this without changing the behavior.** — 동작은 그대로 두고 리팩토링해줘.
* **Extract this into a separate function.** — 이걸 별도 함수로 빼줘.
* **Pull the duplicated logic into a helper.** — 중복된 로직을 헬퍼로 모아줘.
* **Clean this up. It's hard to read.** — 이거 읽기 힘들어, 정리해줘.
* **Rename this to something clearer.** — 더 명확한 이름으로 바꿔줘.
* **Break this giant function into smaller ones.** — 이 거대한 함수를 작은 단위로 쪼개줘.
* **Get rid of the dead code.** — 죽은 코드 없애줘.
* **Simplify this conditional.** — 이 조건문 단순하게 만들어줘.
* **Make this more idiomatic.** — 더 관용적인 코드로 바꿔줘.
* **Tighten this up.** — 군더더기 좀 줄여줘.
* **Keep the public API the same.** — 공개 API는 그대로 유지해줘.
* **Inline this. It's only used once.** — 한 번만 쓰이니까 인라인으로 펼쳐줘.

# 5. 코드 설명 / 이해

* **Walk me through what this does, line by line.** — 이게 뭐 하는지 한 줄씩 설명해줘.
* **Explain this like I've never seen this codebase.** — 이 코드베이스 처음 본다고 치고 설명해줘.
* **What's the difference between these two?** — 이 둘 차이가 뭐야?
* **Why was it done this way?** — 왜 이렇게 짠 거야?
* **Summarize what this module is responsible for.** — 이 모듈이 뭘 담당하는지 요약해줘.
* **Trace how the data flows through here.** — 데이터가 여기를 어떻게 흐르는지 따라가줘.
* **Give me the gist, not every detail.** — 세부사항 말고 요점만 줘.
* **What would happen if I removed this line?** — 이 줄 지우면 어떻게 돼?
* **Where is this function actually called?** — 이 함수 실제로 어디서 호출돼?
* **Point me to where this is handled.** — 이게 처리되는 곳을 짚어줘.

# 6. 테스트

* **Write unit tests for this.** — 이거 유닛 테스트 짜줘.
* **Add a test that covers the edge case.** — 엣지 케이스를 커버하는 테스트 추가해줘.
* **Make the failing test pass without breaking the others.** — 다른 거 안 깨고 실패하는 테스트 통과시켜줘.
* **Mock the external API in the test.** — 테스트에서 외부 API는 목으로 처리해줘.
* **Run the tests and show me the output.** — 테스트 돌리고 결과 보여줘.
* **What's not covered yet?** — 아직 커버 안 된 게 뭐야?
* **Add a regression test for this bug.** — 이 버그 회귀 테스트 추가해줘.
* **Don't change the test to match the code. Fix the code.** — 코드에 맞춰 테스트 고치지 말고, 코드를 고쳐줘.
* **Test the happy path and one failure case.** — 정상 경로 하나, 실패 케이스 하나 테스트해줘.
* **Keep the tests fast and deterministic.** — 테스트는 빠르고 결정적으로 유지해줘.

# 7. 리뷰 / 검증

* **Review this for bugs before I commit.** — 커밋하기 전에 버그 있나 봐줘.
* **Is the error handling solid here?** — 여기 에러 처리 탄탄해?
* **Double-check the off-by-one.** — 인덱스 하나 차이 나는 거 한 번 더 확인해줘.
* **Sanity-check my logic.** — 내 로직 말 되는지 봐줘.
* **What could go wrong with this approach?** — 이 방식에서 뭐가 잘못될 수 있어?
* **Are there any security holes here?** — 여기 보안 구멍 있어?
* **Verify this actually works. Don't just assume.** — 그냥 가정하지 말고 실제로 되는지 확인해줘.
* **Does this handle the null case?** — 이거 null 케이스 처리해?
* **Check this against the requirements.** — 요구사항이랑 대조해줘.
* **Be skeptical and try to break it.** — 의심하면서 한번 깨보려고 해봐.

# 8. 수정 범위 / 제약

* **Only change this part and leave everything else alone.** — 이 부분만 바꾸고 나머지는 건드리지 마.
* **Don't touch the existing tests.** — 기존 테스트는 건드리지 마.
* **Make the smallest possible change.** — 가능한 한 가장 작게 바꿔줘.
* **Stick to the existing style.** — 기존 스타일에 맞춰줘.
* **No new dependencies.** — 새 의존성 추가하지 마.
* **Just fix the bug. Don't refactor while you're at it.** — 하는 김에 리팩토링하지 말고 버그만 고쳐줘.
* **Keep the diff small.** — diff 작게 유지해줘.
* **Match the surrounding code.** — 주변 코드랑 맞춰줘.
* **Don't over-engineer it.** — 과하게 만들지 마.
* **Leave a TODO instead of solving it now.** — 지금 풀지 말고 TODO만 남겨줘.

# 9. 후속 / 반복 수정

* **Almost, but it's still off.** — 거의 다 됐는데 아직 좀 안 맞아.
* **That broke something. Revert and try a different way.** — 그게 뭔가를 깨뜨렸어, 되돌리고 다른 방법으로 해봐.
* **Now do the same for the other ones.** — 이제 나머지에도 똑같이 해줘.
* **Good, now handle the error case too.** — 좋아, 이제 에러 케이스도 처리해줘.
* **Undo that last change.** — 방금 그 변경 취소해줘.
* **Keep going.** — 계속해.
* **Closer, but simplify it.** — 가까워졌는데 더 단순하게.
* **That's not quite what I meant.** — 내가 말한 건 그게 아니야.
* **Apply that everywhere it's relevant.** — 해당되는 곳 전부에 적용해줘.
* **Let's ship it.** — 이거 내보내자.

# 10. 실행 / 도구 / git

* **Run it and show me what happens.** — 실행해서 어떻게 되는지 보여줘.
* **Show me the diff before you apply it.** — 적용하기 전에 diff 보여줘.
* **Commit this with a clear message.** — 명확한 메시지로 커밋해줘.
* **Stage only the relevant files.** — 관련 파일만 스테이징해줘.
* **Pin the dependency to a specific version.** — 의존성을 특정 버전으로 고정해줘.
* **Add a script for this to the package file.** — 이거용 스크립트를 패키지 파일에 추가해줘.
* **Check if it builds.** — 빌드되는지 확인해줘.
* **What does this command actually do?** — 이 명령이 실제로 뭘 하는 거야?
* **Roll this back if the tests fail.** — 테스트 실패하면 롤백해줘.
* **Format the code before committing.** — 커밋 전에 코드 포맷팅해줘.
