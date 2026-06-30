// AUTO-GENERATED from docs/ai_coding.md — DO NOT EDIT BY HAND.
// Regenerate: python3 scripts/build-lists.py
// 108 entries. Prompting an AI coding assistant: English + Korean, by intent.

export interface AiCoding {
  category: string;
  en: string; // the English prompt you say to the AI
  ko: string; // Korean meaning
}

export const AI_CODING: AiCoding[] = [
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Before you write any code, walk me through your approach.",
    "ko": "코드 짜기 전에 접근 방식부터 설명해줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Don't code yet. Just outline the steps.",
    "ko": "아직 코딩하지 말고 단계만 잡아줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "What are the trade-offs here?",
    "ko": "여기서 트레이드오프가 뭐야?"
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Give me a couple of options before you pick one.",
    "ko": "하나 고르기 전에 선택지 몇 개 줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "What's the smallest change that would fix this?",
    "ko": "이걸 고치는 가장 작은 변경이 뭐야?"
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Sketch out the data model first.",
    "ko": "데이터 모델부터 잡아줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Where would this break?",
    "ko": "이게 어디서 깨질까?"
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "What am I not thinking about?",
    "ko": "내가 놓치고 있는 게 뭐야?"
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Lay out the edge cases before we start.",
    "ko": "시작 전에 엣지 케이스부터 정리해줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Is there a simpler way to do this?",
    "ko": "더 간단한 방법 없어?"
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Talk me through the high-level design.",
    "ko": "큰 그림 설계부터 짚어줘."
  },
  {
    "category": "1. 코딩 전에 계획부터",
    "en": "Let's agree on the interface first.",
    "ko": "인터페이스부터 합의하고 가자."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Scaffold a new project with the basics wired up.",
    "ko": "기본 세팅된 새 프로젝트 뼈대 만들어줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Write a function that takes X and returns Y.",
    "ko": "X를 받아 Y를 반환하는 함수 짜줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Stub out the API endpoints for now.",
    "ko": "일단 API 엔드포인트만 껍데기로 만들어줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Wire this up to the database.",
    "ko": "이걸 DB에 연결해줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Add a CLI flag for that.",
    "ko": "그거용 CLI 플래그 추가해줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Generate the boilerplate and I'll fill in the logic.",
    "ko": "보일러플레이트만 만들어줘, 로직은 내가 채울게."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Make it configurable instead of hard-coded.",
    "ko": "하드코딩 말고 설정으로 뺄 수 있게 해줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Add a new route that handles this.",
    "ko": "이걸 처리하는 새 라우트 추가해줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Build a minimal version first, then we'll expand.",
    "ko": "일단 최소 버전 만들고 나서 확장하자."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Hook it up to the existing auth flow.",
    "ko": "기존 인증 플로우에 붙여줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Create a migration for this schema change.",
    "ko": "이 스키마 변경용 마이그레이션 만들어줘."
  },
  {
    "category": "2. 새로 만들기 / 스캐폴딩",
    "en": "Make it work first, we'll optimize later.",
    "ko": "일단 되게 만들고 최적화는 나중에."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "There's a bug where the page hangs. Figure out why.",
    "ko": "페이지가 멈추는 버그가 있어, 원인 찾아줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "This keeps throwing. Track down the root cause.",
    "ko": "이게 계속 에러를 던져, 근본 원인 추적해줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Reproduce the issue first, then fix it.",
    "ko": "먼저 재현하고 나서 고쳐줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Add some logging around this so we can see what's happening.",
    "ko": "무슨 일이 일어나는지 보이게 여기 로그 좀 넣어줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Why is this returning null?",
    "ko": "이게 왜 null을 반환하지?"
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Walk me through the stack trace.",
    "ko": "스택 트레이스 같이 짚어줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "It works locally but breaks in production. Any ideas?",
    "ko": "로컬은 되는데 프로드에서 깨져, 짚이는 거 있어?"
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Narrow down where it goes wrong.",
    "ko": "어디서 잘못되는지 범위 좁혀줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Is this a race condition?",
    "ko": "이거 레이스 컨디션이야?"
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "The test is flaky. Find out why.",
    "ko": "테스트가 들쭉날쭉해, 왜 그런지 찾아줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Don't guess. Add a breakpoint and verify.",
    "ko": "추측하지 말고 브레이크포인트 찍어서 확인해줘."
  },
  {
    "category": "3. 버그 찾기 / 디버깅",
    "en": "Figure out which change introduced this.",
    "ko": "어느 변경이 이걸 일으켰는지 찾아줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Refactor this without changing the behavior.",
    "ko": "동작은 그대로 두고 리팩토링해줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Extract this into a separate function.",
    "ko": "이걸 별도 함수로 빼줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Pull the duplicated logic into a helper.",
    "ko": "중복된 로직을 헬퍼로 모아줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Clean this up. It's hard to read.",
    "ko": "이거 읽기 힘들어, 정리해줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Rename this to something clearer.",
    "ko": "더 명확한 이름으로 바꿔줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Break this giant function into smaller ones.",
    "ko": "이 거대한 함수를 작은 단위로 쪼개줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Get rid of the dead code.",
    "ko": "죽은 코드 없애줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Simplify this conditional.",
    "ko": "이 조건문 단순하게 만들어줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Make this more idiomatic.",
    "ko": "더 관용적인 코드로 바꿔줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Tighten this up.",
    "ko": "군더더기 좀 줄여줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Keep the public API the same.",
    "ko": "공개 API는 그대로 유지해줘."
  },
  {
    "category": "4. 리팩토링 / 정리",
    "en": "Inline this. It's only used once.",
    "ko": "한 번만 쓰이니까 인라인으로 펼쳐줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Walk me through what this does, line by line.",
    "ko": "이게 뭐 하는지 한 줄씩 설명해줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Explain this like I've never seen this codebase.",
    "ko": "이 코드베이스 처음 본다고 치고 설명해줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "What's the difference between these two?",
    "ko": "이 둘 차이가 뭐야?"
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Why was it done this way?",
    "ko": "왜 이렇게 짠 거야?"
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Summarize what this module is responsible for.",
    "ko": "이 모듈이 뭘 담당하는지 요약해줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Trace how the data flows through here.",
    "ko": "데이터가 여기를 어떻게 흐르는지 따라가줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Give me the gist, not every detail.",
    "ko": "세부사항 말고 요점만 줘."
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "What would happen if I removed this line?",
    "ko": "이 줄 지우면 어떻게 돼?"
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Where is this function actually called?",
    "ko": "이 함수 실제로 어디서 호출돼?"
  },
  {
    "category": "5. 코드 설명 / 이해",
    "en": "Point me to where this is handled.",
    "ko": "이게 처리되는 곳을 짚어줘."
  },
  {
    "category": "6. 테스트",
    "en": "Write unit tests for this.",
    "ko": "이거 유닛 테스트 짜줘."
  },
  {
    "category": "6. 테스트",
    "en": "Add a test that covers the edge case.",
    "ko": "엣지 케이스를 커버하는 테스트 추가해줘."
  },
  {
    "category": "6. 테스트",
    "en": "Make the failing test pass without breaking the others.",
    "ko": "다른 거 안 깨고 실패하는 테스트 통과시켜줘."
  },
  {
    "category": "6. 테스트",
    "en": "Mock the external API in the test.",
    "ko": "테스트에서 외부 API는 목으로 처리해줘."
  },
  {
    "category": "6. 테스트",
    "en": "Run the tests and show me the output.",
    "ko": "테스트 돌리고 결과 보여줘."
  },
  {
    "category": "6. 테스트",
    "en": "What's not covered yet?",
    "ko": "아직 커버 안 된 게 뭐야?"
  },
  {
    "category": "6. 테스트",
    "en": "Add a regression test for this bug.",
    "ko": "이 버그 회귀 테스트 추가해줘."
  },
  {
    "category": "6. 테스트",
    "en": "Don't change the test to match the code. Fix the code.",
    "ko": "코드에 맞춰 테스트 고치지 말고, 코드를 고쳐줘."
  },
  {
    "category": "6. 테스트",
    "en": "Test the happy path and one failure case.",
    "ko": "정상 경로 하나, 실패 케이스 하나 테스트해줘."
  },
  {
    "category": "6. 테스트",
    "en": "Keep the tests fast and deterministic.",
    "ko": "테스트는 빠르고 결정적으로 유지해줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Review this for bugs before I commit.",
    "ko": "커밋하기 전에 버그 있나 봐줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Is the error handling solid here?",
    "ko": "여기 에러 처리 탄탄해?"
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Double-check the off-by-one.",
    "ko": "인덱스 하나 차이 나는 거 한 번 더 확인해줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Sanity-check my logic.",
    "ko": "내 로직 말 되는지 봐줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "What could go wrong with this approach?",
    "ko": "이 방식에서 뭐가 잘못될 수 있어?"
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Are there any security holes here?",
    "ko": "여기 보안 구멍 있어?"
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Verify this actually works. Don't just assume.",
    "ko": "그냥 가정하지 말고 실제로 되는지 확인해줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Does this handle the null case?",
    "ko": "이거 null 케이스 처리해?"
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Check this against the requirements.",
    "ko": "요구사항이랑 대조해줘."
  },
  {
    "category": "7. 리뷰 / 검증",
    "en": "Be skeptical and try to break it.",
    "ko": "의심하면서 한번 깨보려고 해봐."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Only change this part and leave everything else alone.",
    "ko": "이 부분만 바꾸고 나머지는 건드리지 마."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Don't touch the existing tests.",
    "ko": "기존 테스트는 건드리지 마."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Make the smallest possible change.",
    "ko": "가능한 한 가장 작게 바꿔줘."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Stick to the existing style.",
    "ko": "기존 스타일에 맞춰줘."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "No new dependencies.",
    "ko": "새 의존성 추가하지 마."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Just fix the bug. Don't refactor while you're at it.",
    "ko": "하는 김에 리팩토링하지 말고 버그만 고쳐줘."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Keep the diff small.",
    "ko": "diff 작게 유지해줘."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Match the surrounding code.",
    "ko": "주변 코드랑 맞춰줘."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Don't over-engineer it.",
    "ko": "과하게 만들지 마."
  },
  {
    "category": "8. 수정 범위 / 제약",
    "en": "Leave a TODO instead of solving it now.",
    "ko": "지금 풀지 말고 TODO만 남겨줘."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Almost, but it's still off.",
    "ko": "거의 다 됐는데 아직 좀 안 맞아."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "That broke something. Revert and try a different way.",
    "ko": "그게 뭔가를 깨뜨렸어, 되돌리고 다른 방법으로 해봐."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Now do the same for the other ones.",
    "ko": "이제 나머지에도 똑같이 해줘."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Good, now handle the error case too.",
    "ko": "좋아, 이제 에러 케이스도 처리해줘."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Undo that last change.",
    "ko": "방금 그 변경 취소해줘."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Keep going.",
    "ko": "계속해."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Closer, but simplify it.",
    "ko": "가까워졌는데 더 단순하게."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "That's not quite what I meant.",
    "ko": "내가 말한 건 그게 아니야."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Apply that everywhere it's relevant.",
    "ko": "해당되는 곳 전부에 적용해줘."
  },
  {
    "category": "9. 후속 / 반복 수정",
    "en": "Let's ship it.",
    "ko": "이거 내보내자."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Run it and show me what happens.",
    "ko": "실행해서 어떻게 되는지 보여줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Show me the diff before you apply it.",
    "ko": "적용하기 전에 diff 보여줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Commit this with a clear message.",
    "ko": "명확한 메시지로 커밋해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Stage only the relevant files.",
    "ko": "관련 파일만 스테이징해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Pin the dependency to a specific version.",
    "ko": "의존성을 특정 버전으로 고정해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Add a script for this to the package file.",
    "ko": "이거용 스크립트를 패키지 파일에 추가해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Check if it builds.",
    "ko": "빌드되는지 확인해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "What does this command actually do?",
    "ko": "이 명령이 실제로 뭘 하는 거야?"
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Roll this back if the tests fail.",
    "ko": "테스트 실패하면 롤백해줘."
  },
  {
    "category": "10. 실행 / 도구 / git",
    "en": "Format the code before committing.",
    "ko": "커밋 전에 코드 포맷팅해줘."
  }
];
