// AUTO-GENERATED from docs/it_pattern.md — DO NOT EDIT BY HAND.
// Regenerate: python3 scripts/build-lists.py
// 623 entries. IT interview/work English chunks: English + Korean, by category.

export interface ItPattern {
  category: string;
  en: string; // the English chunk
  ko: string; // Korean meaning
}

export const IT_PATTERNS: ItPattern[] = [
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This function takes X and returns Y.",
    "ko": "이 함수는 X를 받아 Y를 반환한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This method is responsible for X.",
    "ko": "이 메서드는 X를 담당한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This class handles X.",
    "ko": "이 클래스는 X를 처리한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This code checks whether X.",
    "ko": "이 코드는 X인지 확인한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This validates the input.",
    "ko": "입력값을 검증한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This parses X into Y.",
    "ko": "X를 파싱해서 Y로 만든다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This converts X into Y.",
    "ko": "X를 Y로 변환한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This maps X to Y.",
    "ko": "X를 Y에 매핑한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This filters out invalid items.",
    "ko": "유효하지 않은 항목을 걸러낸다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This groups items by X.",
    "ko": "항목들을 X 기준으로 묶는다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This sorts the list by X.",
    "ko": "리스트를 X 기준으로 정렬한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This iterates over X.",
    "ko": "X를 순회한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This loops through all X.",
    "ko": "모든 X를 반복문으로 돈다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This exits early if X.",
    "ko": "X이면 일찍 종료한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This uses a guard clause.",
    "ko": "guard clause를 사용한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This throws an exception if X.",
    "ko": "X이면 예외를 던진다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This returns X when Y.",
    "ko": "Y일 때 X를 반환한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This handles the happy path.",
    "ko": "정상 흐름을 처리한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This handles the failure path.",
    "ko": "실패 흐름을 처리한다."
  },
  {
    "category": "함수 / 메서드 / 클래스 설명",
    "en": "This handles the edge case where X.",
    "ko": "X인 edge case를 처리한다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "The control flow is simple.",
    "ko": "실행 흐름은 단순하다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "The data flow is hard to follow.",
    "ko": "데이터 흐름은 따라가기 어렵다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This is the entry point.",
    "ko": "여기가 진입점이다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This is the call site.",
    "ko": "여기가 호출 지점이다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "The caller passes X into this method.",
    "ko": "호출자가 X를 이 메서드에 넘긴다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "The callee returns Y.",
    "ko": "호출받은 쪽이 Y를 반환한다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This mutates X in place.",
    "ko": "X를 제자리에서 변경한다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This creates a copy instead of mutating the original.",
    "ko": "원본을 바꾸지 않고 복사본을 만든다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This has a side effect.",
    "ko": "side effect가 있다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This has no side effects.",
    "ko": "side effect가 없다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This is a pure function.",
    "ko": "순수 함수다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This depends on X.",
    "ko": "이것은 X에 의존한다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "X is injected through the constructor.",
    "ko": "X는 생성자를 통해 주입된다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This delegates X to Y.",
    "ko": "X 처리를 Y에게 위임한다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This wraps X with Y.",
    "ko": "X를 Y로 감싼다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This abstracts away X.",
    "ko": "X를 추상화해서 숨긴다."
  },
  {
    "category": "흐름 / 상태 / 부작용",
    "en": "This is an implementation detail.",
    "ko": "이것은 구현 세부사항이다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This extracts X into a helper method.",
    "ko": "X를 helper method로 분리한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This removes duplicate logic.",
    "ko": "중복 로직을 제거한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This improves readability.",
    "ko": "가독성을 개선한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This improves maintainability.",
    "ko": "유지보수성을 개선한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This makes the code easier to test.",
    "ko": "코드를 테스트하기 쉽게 만든다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This introduces unnecessary complexity.",
    "ko": "불필요한 복잡도를 추가한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This is too tightly coupled.",
    "ko": "너무 강하게 결합되어 있다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This should be loosely coupled.",
    "ko": "느슨하게 결합되어야 한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This violates single responsibility.",
    "ko": "단일 책임 원칙을 어긴다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This is dead code.",
    "ko": "사용되지 않는 코드다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This is legacy code.",
    "ko": "오래된 기존 코드다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This adds technical debt.",
    "ko": "기술 부채를 추가한다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This pays down technical debt.",
    "ko": "기술 부채를 줄인다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This is null-safe.",
    "ko": "null에 안전하다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This is thread-safe.",
    "ko": "멀티스레드에 안전하다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This can cause a race condition.",
    "ko": "race condition을 유발할 수 있다."
  },
  {
    "category": "코드 품질 / 리팩터링",
    "en": "This looks like an off-by-one error.",
    "ko": "인덱스 하나 차이 버그처럼 보인다."
  },
  {
    "category": "접근 설명",
    "en": "The input is X, and the output should be Y.",
    "ko": "입력은 X이고 출력은 Y여야 한다."
  },
  {
    "category": "접근 설명",
    "en": "The constraint is X, so O(n²) might be too slow.",
    "ko": "제약조건상 O(n²)은 느릴 수 있다."
  },
  {
    "category": "접근 설명",
    "en": "I’d start with a brute-force solution.",
    "ko": "완전탐색부터 시작하겠다."
  },
  {
    "category": "접근 설명",
    "en": "Then I’d optimize it.",
    "ko": "그다음 최적화하겠다."
  },
  {
    "category": "접근 설명",
    "en": "The brute-force approach takes O(n²).",
    "ko": "완전탐색은 O(n²)이 걸린다."
  },
  {
    "category": "접근 설명",
    "en": "We can reduce it to O(n).",
    "ko": "O(n)으로 줄일 수 있다."
  },
  {
    "category": "접근 설명",
    "en": "This runs in O(n) time.",
    "ko": "시간복잡도는 O(n)이다."
  },
  {
    "category": "접근 설명",
    "en": "The space complexity is O(n).",
    "ko": "공간복잡도는 O(n)이다."
  },
  {
    "category": "접근 설명",
    "en": "We trade space for time.",
    "ko": "공간을 써서 시간을 줄인다."
  },
  {
    "category": "접근 설명",
    "en": "This avoids duplicate work.",
    "ko": "중복 작업을 피한다."
  },
  {
    "category": "접근 설명",
    "en": "This avoids recomputing the same state.",
    "ko": "같은 상태를 다시 계산하지 않는다."
  },
  {
    "category": "접근 설명",
    "en": "We need to handle edge cases like empty input.",
    "ko": "빈 입력 같은 edge case를 처리해야 한다."
  },
  {
    "category": "접근 설명",
    "en": "Let me walk through an example.",
    "ko": "예시로 따라가 보겠다."
  },
  {
    "category": "접근 설명",
    "en": "Let me dry-run this algorithm.",
    "ko": "이 알고리즘을 손으로 실행해보겠다."
  },
  {
    "category": "접근 설명",
    "en": "The answer is stored in X.",
    "ko": "정답은 X에 저장된다."
  },
  {
    "category": "자료구조",
    "en": "We use a hash map to store X.",
    "ko": "X를 저장하기 위해 hash map을 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a hash set to avoid duplicates.",
    "ko": "중복을 피하기 위해 hash set을 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a stack to track X.",
    "ko": "X를 추적하기 위해 stack을 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a queue for BFS.",
    "ko": "BFS에는 queue를 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a heap to get the smallest item efficiently.",
    "ko": "가장 작은 값을 효율적으로 얻기 위해 heap을 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a priority queue.",
    "ko": "priority queue를 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We build an adjacency list.",
    "ko": "adjacency list를 만든다."
  },
  {
    "category": "자료구조",
    "en": "We mark nodes as visited.",
    "ko": "노드를 visited로 표시한다."
  },
  {
    "category": "자료구조",
    "en": "We use union-find to group connected components.",
    "ko": "연결 컴포넌트를 묶기 위해 union-find를 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a trie for prefix lookup.",
    "ko": "prefix 검색을 위해 trie를 사용한다."
  },
  {
    "category": "자료구조",
    "en": "We use a bitmask to represent state.",
    "ko": "상태를 표현하기 위해 bitmask를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use two pointers.",
    "ko": "two pointers를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use a sliding window.",
    "ko": "sliding window를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We expand the right pointer.",
    "ko": "오른쪽 포인터를 확장한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We shrink the window from the left.",
    "ko": "왼쪽에서 window를 줄인다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The invariant is X.",
    "ko": "유지되는 조건은 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use prefix sums to compute ranges efficiently.",
    "ko": "구간을 효율적으로 계산하기 위해 prefix sum을 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use binary search because X is sorted.",
    "ko": "X가 정렬되어 있으므로 binary search를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The search space is X.",
    "ko": "탐색 범위는 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We move left or right based on X.",
    "ko": "X에 따라 왼쪽 또는 오른쪽으로 이동한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use DFS to explore all paths.",
    "ko": "모든 경로를 탐색하기 위해 DFS를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use BFS to find the shortest path.",
    "ko": "최단 경로를 찾기 위해 BFS를 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The base case is X.",
    "ko": "base case는 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The recursive case is X.",
    "ko": "recursive case는 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We backtrack by undoing the previous choice.",
    "ko": "이전 선택을 되돌리면서 backtrack한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We prune invalid branches.",
    "ko": "유효하지 않은 가지를 잘라낸다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use memoization.",
    "ko": "memoization을 사용한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The DP state is X.",
    "ko": "DP 상태는 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "The transition is X.",
    "ko": "점화식/전이는 X이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "This is a greedy choice because X.",
    "ko": "X 때문에 이것은 greedy 선택이다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We sort first so that X.",
    "ko": "X를 위해 먼저 정렬한다."
  },
  {
    "category": "알고리즘 패턴",
    "en": "We use topological sort because there are dependencies.",
    "ko": "의존성이 있으므로 topological sort를 사용한다."
  },
  {
    "category": "API 기본",
    "en": "The client sends a request to the API layer.",
    "ko": "클라이언트가 API 계층에 요청을 보낸다."
  },
  {
    "category": "API 기본",
    "en": "The API layer validates the request.",
    "ko": "API 계층이 요청을 검증한다."
  },
  {
    "category": "API 기본",
    "en": "The request payload contains X.",
    "ko": "요청 payload에는 X가 들어 있다."
  },
  {
    "category": "API 기본",
    "en": "The response body includes X.",
    "ko": "응답 body에는 X가 포함된다."
  },
  {
    "category": "API 기본",
    "en": "The token is passed in the headers.",
    "ko": "token은 header로 전달된다."
  },
  {
    "category": "API 기본",
    "en": "We use query parameters for filtering.",
    "ko": "필터링에는 query parameter를 사용한다."
  },
  {
    "category": "API 기본",
    "en": "The user ID is a path parameter.",
    "ko": "user ID는 path parameter다."
  },
  {
    "category": "API 기본",
    "en": "We return 404 if the user doesn’t exist.",
    "ko": "사용자가 없으면 404를 반환한다."
  },
  {
    "category": "API 기본",
    "en": "We return 400 for invalid input.",
    "ko": "잘못된 입력이면 400을 반환한다."
  },
  {
    "category": "API 기본",
    "en": "We return 500 for unexpected server errors.",
    "ko": "예상치 못한 서버 에러면 500을 반환한다."
  },
  {
    "category": "API 기본",
    "en": "Client-side validation improves UX.",
    "ko": "클라이언트 검증은 UX를 개선한다."
  },
  {
    "category": "API 기본",
    "en": "Server-side validation is still required.",
    "ko": "서버 검증은 여전히 필요하다."
  },
  {
    "category": "API 기본",
    "en": "We use pagination to avoid loading too much data.",
    "ko": "너무 많은 데이터를 한 번에 로드하지 않기 위해 pagination을 사용한다."
  },
  {
    "category": "API 기본",
    "en": "Cursor-based pagination is better for large datasets.",
    "ko": "큰 데이터셋에는 cursor 기반 pagination이 더 낫다."
  },
  {
    "category": "API 기본",
    "en": "Offset-based pagination can be slow for deep pages.",
    "ko": "깊은 페이지에서는 offset 기반 pagination이 느릴 수 있다."
  },
  {
    "category": "Wire / Serialization",
    "en": "In memory, X is represented as Y.",
    "ko": "메모리에서는 X가 Y로 표현된다."
  },
  {
    "category": "Wire / Serialization",
    "en": "On the wire, X is serialized as Y.",
    "ko": "네트워크로는 X가 Y로 직렬화된다."
  },
  {
    "category": "Wire / Serialization",
    "en": "The wire format is JSON over HTTP.",
    "ko": "wire format은 HTTP 위의 JSON이다."
  },
  {
    "category": "Wire / Serialization",
    "en": "The wire protocol is X.",
    "ko": "wire protocol은 X이다."
  },
  {
    "category": "Wire / Serialization",
    "en": "We serialize the object as JSON.",
    "ko": "객체를 JSON으로 직렬화한다."
  },
  {
    "category": "Wire / Serialization",
    "en": "The server deserializes the request body.",
    "ko": "서버가 request body를 역직렬화한다."
  },
  {
    "category": "Wire / Serialization",
    "en": "The value is encoded as UTF-8.",
    "ko": "값은 UTF-8로 인코딩된다."
  },
  {
    "category": "Wire / Serialization",
    "en": "The client decodes the token.",
    "ko": "클라이언트가 token을 디코딩한다."
  },
  {
    "category": "Wire / Serialization",
    "en": "JSON is human-readable.",
    "ko": "JSON은 사람이 읽기 쉽다."
  },
  {
    "category": "Wire / Serialization",
    "en": "Protobuf is more compact than JSON.",
    "ko": "Protobuf는 JSON보다 더 compact하다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "This is part of the API contract.",
    "ko": "이것은 API 계약의 일부다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "This is an implementation detail, not part of the API contract.",
    "ko": "이것은 구현 세부사항이지 API 계약의 일부가 아니다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "Removing this field would be a breaking change.",
    "ko": "이 필드를 제거하면 breaking change가 된다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "This change is backward compatible.",
    "ko": "이 변경은 하위 호환된다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "The client should ignore unknown fields for forward compatibility.",
    "ko": "forward compatibility를 위해 클라이언트는 모르는 필드를 무시해야 한다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "This field is optional for backward compatibility.",
    "ko": "이 필드는 하위 호환성을 위해 optional이다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "This is a required field.",
    "ko": "이것은 필수 필드다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "We use a default value if the field is missing.",
    "ko": "필드가 없으면 기본값을 사용한다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "The schema defines the fields and types.",
    "ko": "schema가 필드와 타입을 정의한다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "Schema evolution needs to be backward compatible.",
    "ko": "schema evolution은 하위 호환되어야 한다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "The internal model can change, but the external representation should stay stable.",
    "ko": "내부 모델은 바뀔 수 있지만 외부 표현은 안정적이어야 한다."
  },
  {
    "category": "Contract / Compatibility",
    "en": "We need API versioning to avoid breaking clients.",
    "ko": "클라이언트를 깨지 않기 위해 API versioning이 필요하다."
  },
  {
    "category": "Idempotency / Retry-safe API",
    "en": "This endpoint should be idempotent.",
    "ko": "이 endpoint는 idempotent해야 한다."
  },
  {
    "category": "Idempotency / Retry-safe API",
    "en": "This request needs to be safe to retry.",
    "ko": "이 요청은 재시도해도 안전해야 한다."
  },
  {
    "category": "Idempotency / Retry-safe API",
    "en": "We use an idempotency key to prevent duplicate processing.",
    "ko": "중복 처리를 막기 위해 idempotency key를 사용한다."
  },
  {
    "category": "Idempotency / Retry-safe API",
    "en": "The same request can be sent multiple times without changing the result.",
    "ko": "같은 요청을 여러 번 보내도 결과가 바뀌지 않는다."
  },
  {
    "category": "Idempotency / Retry-safe API",
    "en": "Retries can create duplicate requests.",
    "ko": "retry는 중복 요청을 만들 수 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The database is the source of truth.",
    "ko": "DB가 기준 데이터다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "We should have a single source of truth.",
    "ko": "단일 기준 데이터가 있어야 한다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The cache contains derived data.",
    "ko": "cache에는 파생 데이터가 들어 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The cache can be stale.",
    "ko": "cache는 오래된 값일 수 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The user may see stale data for a few seconds.",
    "ko": "사용자는 몇 초 동안 stale data를 볼 수 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The data can get out of sync.",
    "ko": "데이터가 서로 안 맞을 수 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "We need to sync up the cache with the database.",
    "ko": "cache와 DB를 동기화해야 한다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "This system is eventually consistent.",
    "ko": "이 시스템은 eventual consistency를 가진다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "This requires strong consistency.",
    "ko": "이것은 strong consistency가 필요하다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "Users expect read-after-write consistency.",
    "ko": "사용자는 쓰고 나서 바로 읽을 수 있기를 기대한다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "Duplicate data can cause inconsistency.",
    "ko": "중복 데이터는 inconsistency를 만들 수 있다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "Each service should own its data.",
    "ko": "각 서비스는 자기 데이터를 소유해야 한다."
  },
  {
    "category": "데이터 기준 / 일관성",
    "en": "The data model is too tightly coupled to the API.",
    "ko": "데이터 모델이 API에 너무 강하게 결합되어 있다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The user ID is the primary key.",
    "ko": "user ID가 primary key다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The order table has a foreign key to users.",
    "ko": "order table은 users에 대한 foreign key를 가진다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "Adding an index reduced query time.",
    "ko": "index 추가가 query time을 줄였다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The root cause was a missing index.",
    "ko": "근본 원인은 missing index였다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The query caused a full table scan.",
    "ko": "query가 full table scan을 유발했다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We checked the query plan.",
    "ko": "query plan을 확인했다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The endpoint had an N+1 query problem.",
    "ko": "endpoint에 N+1 query 문제가 있었다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The connection pool was exhausted.",
    "ko": "connection pool이 고갈됐다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We wrap the update in a transaction.",
    "ko": "update를 transaction으로 감싼다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The transaction commits after validation.",
    "ko": "validation 후 transaction이 commit된다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We roll back the transaction if anything fails.",
    "ko": "무엇이든 실패하면 transaction을 rollback한다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "The isolation level affects consistency.",
    "ko": "isolation level은 consistency에 영향을 준다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "Lock contention caused high latency.",
    "ko": "lock contention이 high latency를 유발했다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We use optimistic locking to avoid lost updates.",
    "ko": "lost update를 피하기 위해 optimistic locking을 사용한다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "Pessimistic locking can reduce concurrency.",
    "ko": "pessimistic locking은 concurrency를 줄일 수 있다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "Two transactions caused a deadlock.",
    "ko": "두 transaction이 deadlock을 만들었다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We need a database migration.",
    "ko": "database migration이 필요하다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "We backfilled the new column.",
    "ko": "새 column의 기존 데이터를 backfill했다."
  },
  {
    "category": "DB / Query / Transaction",
    "en": "Schema drift caused deployment issues.",
    "ko": "schema drift가 deployment issue를 유발했다."
  },
  {
    "category": "Cache",
    "en": "A cache hit avoids a database call.",
    "ko": "cache hit이면 DB call을 피한다."
  },
  {
    "category": "Cache",
    "en": "On a cache miss, we query the database.",
    "ko": "cache miss이면 DB를 조회한다."
  },
  {
    "category": "Cache",
    "en": "Cache invalidation is the hard part.",
    "ko": "어려운 부분은 cache invalidation이다."
  },
  {
    "category": "Cache",
    "en": "The cache entry has a TTL of five minutes.",
    "ko": "cache entry는 5분 TTL을 가진다."
  },
  {
    "category": "Cache",
    "en": "The stale cache caused incorrect results.",
    "ko": "stale cache가 잘못된 결과를 유발했다."
  },
  {
    "category": "Cache",
    "en": "We warm up the cache before peak traffic.",
    "ko": "peak traffic 전에 cache를 warm up한다."
  },
  {
    "category": "Cache",
    "en": "A cold cache can cause high latency.",
    "ko": "cold cache는 high latency를 유발할 수 있다."
  },
  {
    "category": "Cache",
    "en": "We use the cache-aside pattern.",
    "ko": "cache-aside pattern을 사용한다."
  },
  {
    "category": "Cache",
    "en": "Write-through caching keeps the cache fresh.",
    "ko": "write-through caching은 cache를 최신으로 유지한다."
  },
  {
    "category": "Cache",
    "en": "Write-behind caching improves write latency but adds risk.",
    "ko": "write-behind caching은 write latency를 줄이지만 risk를 추가한다."
  },
  {
    "category": "Cache",
    "en": "We need to prevent a cache stampede.",
    "ko": "cache stampede를 막아야 한다."
  },
  {
    "category": "Cache",
    "en": "The cache key should include X.",
    "ko": "cache key에는 X가 포함되어야 한다."
  },
  {
    "category": "Cache",
    "en": "We evict old cache entries.",
    "ko": "오래된 cache entry를 제거한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "The order service is the producer.",
    "ko": "order service가 producer다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "The email service is the consumer.",
    "ko": "email service가 consumer다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Events are published to a Kafka topic.",
    "ko": "event는 Kafka topic에 publish된다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Kafka uses partitions for scalability.",
    "ko": "Kafka는 scalability를 위해 partition을 사용한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Consumers in the same group share the load.",
    "ko": "같은 consumer group의 consumer들이 load를 나눠 처리한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "The consumer stores its offset.",
    "ko": "consumer는 offset을 저장한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "The consumer sends an ack after processing.",
    "ko": "consumer는 처리 후 ack를 보낸다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "We nack the message if processing fails.",
    "ko": "처리 실패 시 message를 nack한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Poison messages go to a dead-letter queue.",
    "ko": "poison message는 dead-letter queue로 간다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "A poison message can block processing.",
    "ko": "poison message는 처리를 막을 수 있다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Failed messages go to a retry queue.",
    "ko": "실패한 message는 retry queue로 간다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "At-least-once delivery can create duplicates.",
    "ko": "at-least-once delivery는 중복을 만들 수 있다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "At-most-once delivery can lose messages.",
    "ko": "at-most-once delivery는 message를 잃을 수 있다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Exactly-once semantics are hard to guarantee.",
    "ko": "exactly-once semantics는 보장하기 어렵다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "We use deduplication to handle duplicate events.",
    "ko": "중복 event를 처리하기 위해 deduplication을 사용한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Ordering guarantees matter for payment events.",
    "ko": "payment event에서는 ordering guarantee가 중요하다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Event-driven systems are often eventually consistent.",
    "ko": "event-driven system은 보통 eventually consistent하다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "We use a queue to decouple X from Y.",
    "ko": "X와 Y를 분리하기 위해 queue를 사용한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "The consumer processes events asynchronously.",
    "ko": "consumer가 event를 비동기로 처리한다."
  },
  {
    "category": "5. Messaging / Queue / Event",
    "en": "Async processing takes work off the critical path.",
    "ko": "비동기 처리는 작업을 critical path에서 빼준다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The functional requirements are X.",
    "ko": "기능 요구사항은 X다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The non-functional requirements are X.",
    "ko": "비기능 요구사항은 X다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The main constraints are X.",
    "ko": "주요 제약조건은 X다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "At a high level, X is responsible for Y.",
    "ko": "큰 그림에서 X는 Y를 담당한다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The system has three main components: A, B, and C.",
    "ko": "시스템은 A, B, C 세 주요 컴포넌트로 구성된다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The read path goes through X.",
    "ko": "read path는 X를 거친다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The write path updates X.",
    "ko": "write path는 X를 업데이트한다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "This service depends on X.",
    "ko": "이 서비스는 X에 의존한다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The service calls a downstream service.",
    "ko": "서비스가 downstream service를 호출한다."
  },
  {
    "category": "큰 그림 / 요구사항",
    "en": "The request goes through the load balancer.",
    "ko": "요청은 load balancer를 거친다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "The upstream service is timing out.",
    "ko": "upstream service가 timeout되고 있다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "A downstream service failed.",
    "ko": "downstream service가 실패했다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Redis is a dependency of this service.",
    "ko": "Redis는 이 서비스의 dependency다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "This database is a single point of failure.",
    "ko": "이 DB는 single point of failure다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Replication improves fault tolerance.",
    "ko": "replication은 fault tolerance를 개선한다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "We need high availability for this service.",
    "ko": "이 서비스는 high availability가 필요하다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Leader election prevents multiple writers.",
    "ko": "leader election은 multiple writer를 막는다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Replication improves read scalability.",
    "ko": "replication은 read scalability를 개선한다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Sharding helps distribute load.",
    "ko": "sharding은 load를 분산하는 데 도움이 된다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Partitioning improves query performance.",
    "ko": "partitioning은 query performance를 개선한다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Split brain can cause data corruption.",
    "ko": "split brain은 data corruption을 유발할 수 있다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "The system must handle network partitions.",
    "ko": "시스템은 network partition을 처리해야 한다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Clock skew can break time-based logic.",
    "ko": "clock skew는 시간 기반 로직을 깨뜨릴 수 있다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Consensus is expensive but provides safety.",
    "ko": "consensus는 비용이 크지만 safety를 제공한다."
  },
  {
    "category": "분산 시스템 핵심",
    "en": "Writes require a quorum.",
    "ko": "write에는 quorum이 필요하다."
  },
  {
    "category": "Architecture",
    "en": "Services should be loosely coupled.",
    "ko": "서비스는 느슨하게 결합되어야 한다."
  },
  {
    "category": "Architecture",
    "en": "This design is too tightly coupled.",
    "ko": "이 설계는 너무 강하게 결합되어 있다."
  },
  {
    "category": "Architecture",
    "en": "This improves separation of concerns.",
    "ko": "이것은 책임 분리를 개선한다."
  },
  {
    "category": "Architecture",
    "en": "This abstraction hides the implementation detail.",
    "ko": "이 abstraction은 구현 세부사항을 숨긴다."
  },
  {
    "category": "Architecture",
    "en": "Clients should not depend on implementation details.",
    "ko": "client는 구현 세부사항에 의존하면 안 된다."
  },
  {
    "category": "Architecture",
    "en": "The public interface should remain stable.",
    "ko": "public interface는 안정적으로 유지되어야 한다."
  },
  {
    "category": "Architecture",
    "en": "This is only used by internal services.",
    "ko": "이것은 내부 서비스에서만 사용된다."
  },
  {
    "category": "Architecture",
    "en": "The service boundary is unclear.",
    "ko": "service boundary가 불명확하다."
  },
  {
    "category": "Architecture",
    "en": "Ownership should be clear.",
    "ko": "ownership은 명확해야 한다."
  },
  {
    "category": "Architecture",
    "en": "A monolith is simpler to operate at small scale.",
    "ko": "작은 규모에서는 monolith가 운영하기 더 단순하다."
  },
  {
    "category": "Architecture",
    "en": "Microservices add operational complexity.",
    "ko": "microservices는 운영 복잡도를 추가한다."
  },
  {
    "category": "Architecture",
    "en": "The workflow service handles orchestration.",
    "ko": "workflow service가 orchestration을 처리한다."
  },
  {
    "category": "Architecture",
    "en": "Each service reacts to events using choreography.",
    "ko": "각 서비스가 choreography 방식으로 event에 반응한다."
  },
  {
    "category": "Architecture",
    "en": "The control plane manages configuration.",
    "ko": "control plane은 configuration을 관리한다."
  },
  {
    "category": "Architecture",
    "en": "The data plane handles user traffic.",
    "ko": "data plane은 user traffic을 처리한다."
  },
  {
    "category": "Scaling",
    "en": "The system needs to handle X requests per second.",
    "ko": "시스템은 초당 X 요청을 처리해야 한다."
  },
  {
    "category": "Scaling",
    "en": "The service handles X requests per second.",
    "ko": "서비스는 초당 X 요청을 처리한다."
  },
  {
    "category": "Scaling",
    "en": "Traffic is read-heavy.",
    "ko": "traffic은 read-heavy다."
  },
  {
    "category": "Scaling",
    "en": "Traffic is write-heavy.",
    "ko": "traffic은 write-heavy다."
  },
  {
    "category": "Scaling",
    "en": "Peak traffic is X times higher than normal traffic.",
    "ko": "peak traffic은 평소보다 X배 높다."
  },
  {
    "category": "Scaling",
    "en": "We need enough headroom for traffic spikes.",
    "ko": "traffic spike에 대비한 여유 capacity가 필요하다."
  },
  {
    "category": "Scaling",
    "en": "We can scale horizontally by adding more instances.",
    "ko": "instance를 더 추가해 horizontal scaling할 수 있다."
  },
  {
    "category": "Scaling",
    "en": "Vertical scaling has limits.",
    "ko": "vertical scaling에는 한계가 있다."
  },
  {
    "category": "Scaling",
    "en": "Stateless services are easier to scale horizontally.",
    "ko": "stateless service는 horizontal scaling하기 쉽다."
  },
  {
    "category": "Scaling",
    "en": "Stateful services are harder to scale.",
    "ko": "stateful service는 scaling이 어렵다."
  },
  {
    "category": "Scaling",
    "en": "The load balancer distributes traffic across instances.",
    "ko": "load balancer가 traffic을 instance들에 분산한다."
  },
  {
    "category": "Scaling",
    "en": "Autoscaling kicks in when CPU usage crosses the threshold.",
    "ko": "CPU 사용량이 threshold를 넘으면 autoscaling이 작동한다."
  },
  {
    "category": "Scaling",
    "en": "We need capacity planning before launch.",
    "ko": "launch 전에 capacity planning이 필요하다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "The database is the bottleneck.",
    "ko": "DB가 병목이다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "The bottleneck moves from X to Y.",
    "ko": "병목이 X에서 Y로 이동한다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "This workload is CPU-bound.",
    "ko": "이 workload는 CPU-bound다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "This endpoint is I/O-bound.",
    "ko": "이 endpoint는 I/O-bound다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "This workload is memory-bound.",
    "ko": "이 workload는 memory-bound다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "The connection pool is exhausted.",
    "ko": "connection pool이 고갈됐다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "The queue backlog is growing.",
    "ko": "queue backlog가 증가하고 있다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "This call is on the critical path.",
    "ko": "이 call은 critical path에 있다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "This code is on the hot path.",
    "ko": "이 코드는 hot path에 있다."
  },
  {
    "category": "Bottleneck / Bound",
    "en": "We use async processing to take work off the critical path.",
    "ko": "critical path에서 작업을 빼기 위해 async processing을 사용한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "We shard the data by user ID.",
    "ko": "user ID 기준으로 데이터를 shard한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "X is a good partition key because Y.",
    "ko": "Y 때문에 X는 좋은 partition key다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "A hot key can overload one partition.",
    "ko": "hot key는 한 partition에 과부하를 줄 수 있다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "A hot partition can become a bottleneck.",
    "ko": "hot partition이 병목이 될 수 있다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "Fan-out on write improves read performance.",
    "ko": "fan-out on write는 read performance를 개선한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "Fan-out on read keeps writes simple.",
    "ko": "fan-out on read는 write를 단순하게 유지한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "We cache read-heavy data.",
    "ko": "read-heavy data를 caching한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "We replicate data for availability.",
    "ko": "availability를 위해 data를 replicate한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "We separate read and write traffic.",
    "ko": "read traffic과 write traffic을 분리한다."
  },
  {
    "category": "Partition / Fan-out / CDN",
    "en": "We use a CDN for static content.",
    "ko": "static content에는 CDN을 사용한다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Latency increased after deployment.",
    "ko": "배포 후 latency가 증가했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Throughput improved by 30%.",
    "ko": "throughput이 30% 개선됐다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Throughput dropped after X.",
    "ko": "X 이후 throughput이 떨어졌다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "We monitor p50, p95, and p99 latency.",
    "ko": "p50, p95, p99 latency를 모니터링한다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "p99 latency shows tail behavior.",
    "ko": "p99 latency는 tail behavior를 보여준다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Tail latency matters for user experience.",
    "ko": "tail latency는 사용자 경험에 중요하다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "X went from A to B.",
    "ko": "X가 A에서 B로 변했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "X increased by N%.",
    "ko": "X가 N% 증가했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "X decreased by N%.",
    "ko": "X가 N% 감소했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Traffic doubled.",
    "ko": "traffic이 두 배가 됐다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Traffic tripled during peak hours.",
    "ko": "peak hour에 traffic이 세 배가 됐다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Latency peaked at X milliseconds.",
    "ko": "latency가 X ms까지 치솟았다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Latency averaged around X milliseconds.",
    "ko": "latency가 평균 X ms 정도였다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "CPU usage stayed above 90%.",
    "ko": "CPU 사용량이 90% 이상으로 유지됐다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Memory usage kept climbing.",
    "ko": "memory usage가 계속 증가했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "GC pressure increased.",
    "ko": "GC pressure가 증가했다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Disk I/O was saturated.",
    "ko": "disk I/O가 포화 상태였다."
  },
  {
    "category": "Metrics / Numbers",
    "en": "Network I/O spiked.",
    "ko": "network I/O가 급증했다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "The main failure mode is timeout.",
    "ko": "주요 failure mode는 timeout이다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We missed an edge case.",
    "ko": "edge case를 놓쳤다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "This is a corner case, but we should handle it.",
    "ko": "rare case지만 처리해야 한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "The happy path is simple.",
    "ko": "정상 흐름은 단순하다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "The failure path needs better handling.",
    "ko": "실패 흐름은 더 나은 처리가 필요하다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We use graceful degradation when Redis is down.",
    "ko": "Redis가 down되면 graceful degradation을 사용한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "If the cache fails, we fall back to the database.",
    "ko": "cache가 실패하면 DB로 fallback한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We should fail fast instead of waiting forever.",
    "ko": "계속 기다리기보다 fail fast해야 한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "Retries without backoff can cause a retry storm.",
    "ko": "backoff 없는 retry는 retry storm을 유발할 수 있다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "A circuit breaker protects downstream services.",
    "ko": "circuit breaker는 downstream service를 보호한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "Every network call should have a timeout.",
    "ko": "모든 network call에는 timeout이 있어야 한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "The deadline applies to the whole request.",
    "ko": "deadline은 전체 request에 적용된다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We retry with exponential backoff.",
    "ko": "exponential backoff로 retry한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "Jitter prevents all clients from retrying at once.",
    "ko": "jitter는 모든 client가 동시에 retry하는 것을 막는다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We use load shedding under heavy traffic.",
    "ko": "high traffic에서 load shedding을 사용한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "Backpressure prevents the queue from growing forever.",
    "ko": "backpressure는 queue가 끝없이 증가하는 것을 막는다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We need to throttle requests.",
    "ko": "request를 제한해야 한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "We use rate limiting to protect the system.",
    "ko": "시스템 보호를 위해 rate limiting을 사용한다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "This prevents cascading failures.",
    "ko": "이것은 cascading failure를 막는다."
  },
  {
    "category": "8. Reliability / Failure Handling",
    "en": "The failure is isolated to X.",
    "ko": "failure가 X에 격리되어 있다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "The logs show X.",
    "ko": "로그에 X가 나온다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "The logs don’t have enough context.",
    "ko": "로그에 충분한 context가 없다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "We added structured logging.",
    "ko": "structured logging을 추가했다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "Each request has a correlation ID.",
    "ko": "각 request에는 correlation ID가 있다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "The trace ID lets us follow the request across services.",
    "ko": "trace ID로 여러 서비스에 걸친 request를 추적할 수 있다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "The trace shows where the request slowed down.",
    "ko": "trace를 보면 request가 어디서 느려졌는지 알 수 있다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "Each downstream call creates a span.",
    "ko": "각 downstream call은 span을 만든다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "We sample traces to reduce overhead.",
    "ko": "overhead를 줄이기 위해 trace를 sampling한다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "The dashboard shows X.",
    "ko": "dashboard에 X가 보인다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "Metrics show the error rate increased.",
    "ko": "metrics상 error rate가 증가했다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "This metric dropped to zero.",
    "ko": "이 metric이 0으로 떨어졌다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "We use tags to break down metrics by region.",
    "ko": "region별로 metric을 나누기 위해 tag를 사용한다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "High cardinality can make metrics expensive.",
    "ko": "high cardinality는 metrics 비용을 높일 수 있다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "We need to drill down by region, user, and service.",
    "ko": "region/user/service 기준으로 drill down해야 한다."
  },
  {
    "category": "Logging / Tracing / Metrics",
    "en": "This metric is not actionable.",
    "ko": "이 metric은 실제 조치로 이어지기 어렵다."
  },
  {
    "category": "Alerts / SLO",
    "en": "The alert fired at X.",
    "ko": "alert가 X시에 울렸다."
  },
  {
    "category": "Alerts / SLO",
    "en": "This alert is noisy.",
    "ko": "이 alert는 noise가 많다."
  },
  {
    "category": "Alerts / SLO",
    "en": "This was a false positive.",
    "ko": "이것은 false positive였다."
  },
  {
    "category": "Alerts / SLO",
    "en": "We need to reduce alert noise.",
    "ko": "alert noise를 줄여야 한다."
  },
  {
    "category": "Alerts / SLO",
    "en": "p95 latency crossed the threshold.",
    "ko": "p95 latency가 threshold를 넘었다."
  },
  {
    "category": "Alerts / SLO",
    "en": "p99 latency is too high.",
    "ko": "p99 latency가 너무 높다."
  },
  {
    "category": "Alerts / SLO",
    "en": "We monitor latency, traffic, errors, and saturation.",
    "ko": "latency, traffic, errors, saturation을 모니터링한다."
  },
  {
    "category": "Alerts / SLO",
    "en": "We use SLI, SLO, and SLA to measure reliability.",
    "ko": "reliability 측정에 SLI/SLO/SLA를 사용한다."
  },
  {
    "category": "Alerts / SLO",
    "en": "We burned through the error budget.",
    "ko": "error budget을 소진했다."
  },
  {
    "category": "Alerts / SLO",
    "en": "The burn rate is too high.",
    "ko": "burn rate가 너무 높다."
  },
  {
    "category": "Alerts / SLO",
    "en": "The baseline changed after deployment.",
    "ko": "배포 후 baseline이 바뀌었다."
  },
  {
    "category": "Alerts / SLO",
    "en": "We need better monitoring for X.",
    "ko": "X에 대해 더 나은 monitoring이 필요하다."
  },
  {
    "category": "Debugging",
    "en": "I can reproduce the issue locally.",
    "ko": "로컬에서 이슈를 재현할 수 있다."
  },
  {
    "category": "Debugging",
    "en": "I can’t reproduce it locally.",
    "ko": "로컬에서는 재현되지 않는다."
  },
  {
    "category": "Debugging",
    "en": "This only happens in production.",
    "ko": "운영환경에서만 발생한다."
  },
  {
    "category": "Debugging",
    "en": "What are the repro steps?",
    "ko": "재현 절차가 무엇인가?"
  },
  {
    "category": "Debugging",
    "en": "The issue is intermittent.",
    "ko": "이슈가 간헐적으로 발생한다."
  },
  {
    "category": "Debugging",
    "en": "This looks like a regression.",
    "ko": "regression처럼 보인다."
  },
  {
    "category": "Debugging",
    "en": "The symptom is X.",
    "ko": "증상은 X다."
  },
  {
    "category": "Debugging",
    "en": "The root cause is X.",
    "ko": "근본 원인은 X다."
  },
  {
    "category": "Debugging",
    "en": "I suspect X is the culprit.",
    "ko": "X가 원인으로 의심된다."
  },
  {
    "category": "Debugging",
    "en": "The stack trace points to X.",
    "ko": "stack trace가 X를 가리킨다."
  },
  {
    "category": "Debugging",
    "en": "I added more logging around X.",
    "ko": "X 주변에 logging을 더 추가했다."
  },
  {
    "category": "Debugging",
    "en": "I set a breakpoint here.",
    "ko": "여기에 breakpoint를 걸었다."
  },
  {
    "category": "Debugging",
    "en": "I stepped through the code.",
    "ko": "코드를 한 줄씩 따라갔다."
  },
  {
    "category": "Debugging",
    "en": "I inspected the value of X.",
    "ko": "X 값을 확인했다."
  },
  {
    "category": "Debugging",
    "en": "X is null when it reaches this method.",
    "ko": "이 method에 도달했을 때 X가 null이다."
  },
  {
    "category": "Debugging",
    "en": "The exception is thrown before X.",
    "ko": "X 전에 exception이 던져진다."
  },
  {
    "category": "Debugging",
    "en": "The request times out after X seconds.",
    "ko": "request가 X초 후 timeout된다."
  },
  {
    "category": "Debugging",
    "en": "The failure happens only when X.",
    "ko": "실패는 X일 때만 발생한다."
  },
  {
    "category": "Debugging",
    "en": "I isolated the issue to X.",
    "ko": "이슈를 X로 분리했다."
  },
  {
    "category": "Debugging",
    "en": "I narrowed it down to X.",
    "ko": "원인을 X로 좁혔다."
  },
  {
    "category": "Debugging",
    "en": "I ruled out X.",
    "ko": "X를 원인에서 배제했다."
  },
  {
    "category": "Debugging",
    "en": "I compared the working version with the broken version.",
    "ko": "정상 버전과 깨진 버전을 비교했다."
  },
  {
    "category": "Debugging",
    "en": "I bisected the commits to find the bad change.",
    "ko": "문제 commit을 찾기 위해 commit을 bisect했다."
  },
  {
    "category": "Debugging",
    "en": "The bug was introduced in X.",
    "ko": "bug는 X에서 들어왔다."
  },
  {
    "category": "Debugging",
    "en": "This is caused by a race condition.",
    "ko": "race condition 때문에 발생한다."
  },
  {
    "category": "Debugging",
    "en": "This is caused by an off-by-one error.",
    "ko": "off-by-one error 때문에 발생한다."
  },
  {
    "category": "Debugging",
    "en": "This is caused by missing validation.",
    "ko": "validation 누락 때문에 발생한다."
  },
  {
    "category": "Debugging",
    "en": "This is caused by a timing issue.",
    "ko": "timing issue 때문에 발생한다."
  },
  {
    "category": "Testing",
    "en": "I wrote a unit test for X.",
    "ko": "X에 대한 unit test를 작성했다."
  },
  {
    "category": "Testing",
    "en": "I added an integration test for X.",
    "ko": "X에 대한 integration test를 추가했다."
  },
  {
    "category": "Testing",
    "en": "We need an end-to-end test for this flow.",
    "ko": "이 flow에는 E2E test가 필요하다."
  },
  {
    "category": "Testing",
    "en": "The test uses a mock for X.",
    "ko": "test는 X에 대한 mock을 사용한다."
  },
  {
    "category": "Testing",
    "en": "The test uses a stubbed response.",
    "ko": "test는 stubbed response를 사용한다."
  },
  {
    "category": "Testing",
    "en": "The assertion checks that X.",
    "ko": "assertion은 X인지 확인한다."
  },
  {
    "category": "Testing",
    "en": "We need to cover the edge case where X.",
    "ko": "X인 edge case를 cover해야 한다."
  },
  {
    "category": "Testing",
    "en": "This improves test coverage.",
    "ko": "test coverage를 개선한다."
  },
  {
    "category": "Testing",
    "en": "This test is flaky.",
    "ko": "이 test는 flaky하다."
  },
  {
    "category": "Testing",
    "en": "The test is flaky because it depends on timing.",
    "ko": "timing에 의존해서 flaky하다."
  },
  {
    "category": "Testing",
    "en": "We need a smoke test for this flow.",
    "ko": "이 flow에는 smoke test가 필요하다."
  },
  {
    "category": "Testing",
    "en": "We need a load test before launch.",
    "ko": "launch 전에 load test가 필요하다."
  },
  {
    "category": "Testing",
    "en": "The workaround is X.",
    "ko": "workaround는 X다."
  },
  {
    "category": "Testing",
    "en": "The hotfix is to X.",
    "ko": "hotfix는 X하는 것이다."
  },
  {
    "category": "PR / Review",
    "en": "I opened a PR for X.",
    "ko": "X에 대한 PR을 열었다."
  },
  {
    "category": "PR / Review",
    "en": "This PR changes X.",
    "ko": "이 PR은 X를 변경한다."
  },
  {
    "category": "PR / Review",
    "en": "This PR is focused on X.",
    "ko": "이 PR은 X에 집중한다."
  },
  {
    "category": "PR / Review",
    "en": "This is out of scope for this PR.",
    "ko": "이것은 이 PR 범위 밖이다."
  },
  {
    "category": "PR / Review",
    "en": "This should be a separate PR.",
    "ko": "이것은 별도 PR로 해야 한다."
  },
  {
    "category": "PR / Review",
    "en": "I addressed the review comments.",
    "ko": "review comment를 반영했다."
  },
  {
    "category": "PR / Review",
    "en": "I pushed a new commit.",
    "ko": "새 commit을 push했다."
  },
  {
    "category": "PR / Review",
    "en": "I updated the PR description.",
    "ko": "PR 설명을 업데이트했다."
  },
  {
    "category": "PR / Review",
    "en": "I added tests for X.",
    "ko": "X에 대한 test를 추가했다."
  },
  {
    "category": "PR / Review",
    "en": "I updated the documentation.",
    "ko": "문서를 업데이트했다."
  },
  {
    "category": "PR / Review",
    "en": "This is a nit.",
    "ko": "사소한 지적이다."
  },
  {
    "category": "PR / Review",
    "en": "This is non-blocking.",
    "ko": "merge를 막지는 않는다."
  },
  {
    "category": "PR / Review",
    "en": "This is blocking.",
    "ko": "merge 전에 반드시 처리해야 한다."
  },
  {
    "category": "PR / Review",
    "en": "LGTM.",
    "ko": "좋아 보인다."
  },
  {
    "category": "PR / Review",
    "en": "I’d rename X to Y for clarity.",
    "ko": "명확성을 위해 X를 Y로 rename하겠다."
  },
  {
    "category": "PR / Review",
    "en": "I’d extract this into a helper method.",
    "ko": "이것을 helper method로 분리하겠다."
  },
  {
    "category": "PR / Review",
    "en": "I’d avoid duplicating this logic.",
    "ko": "이 로직 중복은 피하겠다."
  },
  {
    "category": "PR / Review",
    "en": "This makes the code easier to read.",
    "ko": "코드를 읽기 쉽게 만든다."
  },
  {
    "category": "PR / Review",
    "en": "This makes the code harder to maintain.",
    "ko": "코드를 유지보수하기 어렵게 만든다."
  },
  {
    "category": "PR / Review",
    "en": "This changes the behavior of X.",
    "ko": "X의 동작을 바꾼다."
  },
  {
    "category": "PR / Review",
    "en": "This might break existing clients.",
    "ko": "기존 client를 깨뜨릴 수 있다."
  },
  {
    "category": "PR / Review",
    "en": "Can we add a test for this case?",
    "ko": "이 case에 대한 test를 추가할 수 있을까?"
  },
  {
    "category": "PR / Review",
    "en": "Can we keep this backward compatible?",
    "ko": "backward compatible하게 유지할 수 있을까?"
  },
  {
    "category": "PR / Review",
    "en": "Can we simplify this?",
    "ko": "이것을 단순화할 수 있을까?"
  },
  {
    "category": "PR / Review",
    "en": "Let’s handle this in a follow-up PR.",
    "ko": "이것은 follow-up PR에서 처리하자."
  },
  {
    "category": "Git / CI",
    "en": "I rebased my branch on main.",
    "ko": "branch를 main 위로 rebase했다."
  },
  {
    "category": "Git / CI",
    "en": "I fixed the merge conflict.",
    "ko": "merge conflict를 해결했다."
  },
  {
    "category": "Git / CI",
    "en": "I squashed the commits.",
    "ko": "commit들을 squash했다."
  },
  {
    "category": "Git / CI",
    "en": "I cherry-picked the fix.",
    "ko": "fix commit을 cherry-pick했다."
  },
  {
    "category": "Git / CI",
    "en": "I reverted the commit.",
    "ko": "commit을 revert했다."
  },
  {
    "category": "Git / CI",
    "en": "I pulled the latest changes.",
    "ko": "최신 변경사항을 pull했다."
  },
  {
    "category": "Git / CI",
    "en": "I pushed the branch.",
    "ko": "branch를 push했다."
  },
  {
    "category": "Git / CI",
    "en": "I merged the PR.",
    "ko": "PR을 merge했다."
  },
  {
    "category": "Git / CI",
    "en": "The build is failing.",
    "ko": "build가 실패하고 있다."
  },
  {
    "category": "Git / CI",
    "en": "The CI check is failing.",
    "ko": "CI check가 실패하고 있다."
  },
  {
    "category": "Git / CI",
    "en": "The test failed in CI.",
    "ko": "test가 CI에서 실패했다."
  },
  {
    "category": "Git / CI",
    "en": "This failure looks unrelated.",
    "ko": "이 실패는 관련 없어 보인다."
  },
  {
    "category": "Deployment / Release",
    "en": "We rolled out the change gradually.",
    "ko": "변경사항을 점진적으로 배포했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We rolled back the deployment.",
    "ko": "deployment를 rollback했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We rolled forward with a hotfix.",
    "ko": "hotfix로 roll forward했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We used a canary release.",
    "ko": "canary release를 사용했다."
  },
  {
    "category": "Deployment / Release",
    "en": "Blue-green deployment reduces downtime.",
    "ko": "blue-green deployment는 downtime을 줄인다."
  },
  {
    "category": "Deployment / Release",
    "en": "We put the new feature behind a flag.",
    "ko": "새 feature를 feature flag 뒤에 두었다."
  },
  {
    "category": "Deployment / Release",
    "en": "We disabled the feature flag.",
    "ko": "feature flag를 껐다."
  },
  {
    "category": "Deployment / Release",
    "en": "We used the kill switch.",
    "ko": "kill switch를 사용했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We dark-launched the feature.",
    "ko": "feature를 dark launch했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We tested the new service with shadow traffic.",
    "ko": "shadow traffic으로 새 service를 테스트했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We need zero-downtime deployment.",
    "ko": "zero-downtime deployment가 필요하다."
  },
  {
    "category": "Deployment / Release",
    "en": "The deployment pipeline runs tests automatically.",
    "ko": "deployment pipeline은 test를 자동 실행한다."
  },
  {
    "category": "Deployment / Release",
    "en": "CI/CD reduces manual release steps.",
    "ko": "CI/CD는 수동 release step을 줄인다."
  },
  {
    "category": "Deployment / Release",
    "en": "Environment parity prevents staging-only bugs.",
    "ko": "environment parity는 staging에서만 나는 bug를 줄인다."
  },
  {
    "category": "Deployment / Release",
    "en": "Config drift caused the production issue.",
    "ko": "config drift가 production issue를 유발했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We need a rollback plan before release.",
    "ko": "release 전에 rollback plan이 필요하다."
  },
  {
    "category": "Deployment / Release",
    "en": "We deployed during the maintenance window.",
    "ko": "maintenance window 동안 배포했다."
  },
  {
    "category": "Deployment / Release",
    "en": "We stopped the rollout.",
    "ko": "rollout을 중단했다."
  },
  {
    "category": "Incident / Operations",
    "en": "We had a production incident.",
    "ko": "production incident가 있었다."
  },
  {
    "category": "Incident / Operations",
    "en": "We had a partial outage.",
    "ko": "partial outage가 있었다."
  },
  {
    "category": "Incident / Operations",
    "en": "The service was degraded.",
    "ko": "service가 degraded 상태였다."
  },
  {
    "category": "Incident / Operations",
    "en": "The customer impact was limited to X.",
    "ko": "customer impact는 X에 제한됐다."
  },
  {
    "category": "Incident / Operations",
    "en": "The blast radius was limited to one region.",
    "ko": "blast radius는 한 region에 제한됐다."
  },
  {
    "category": "Incident / Operations",
    "en": "We triaged the issue.",
    "ko": "issue를 triage했다."
  },
  {
    "category": "Incident / Operations",
    "en": "We declared a Sev 2 incident.",
    "ko": "Sev 2 incident로 선언했다."
  },
  {
    "category": "Incident / Operations",
    "en": "The incident commander coordinated the response.",
    "ko": "incident commander가 대응을 조율했다."
  },
  {
    "category": "Incident / Operations",
    "en": "We escalated this to the infra team.",
    "ko": "infra team에 escalate했다."
  },
  {
    "category": "Incident / Operations",
    "en": "The on-call engineer got paged.",
    "ko": "on-call engineer가 page를 받았다."
  },
  {
    "category": "Incident / Operations",
    "en": "I was on call.",
    "ko": "내가 on-call이었다."
  },
  {
    "category": "Incident / Operations",
    "en": "I got paged for X.",
    "ko": "X 때문에 page를 받았다."
  },
  {
    "category": "Incident / Operations",
    "en": "We followed the runbook.",
    "ko": "runbook을 따랐다."
  },
  {
    "category": "Incident / Operations",
    "en": "The mitigation was to disable the feature flag.",
    "ko": "mitigation은 feature flag를 끄는 것이었다."
  },
  {
    "category": "Incident / Operations",
    "en": "The remediation is to fix the retry logic.",
    "ko": "remediation은 retry logic을 고치는 것이다."
  },
  {
    "category": "Incident / Operations",
    "en": "A downstream service timed out.",
    "ko": "downstream service가 timeout됐다."
  },
  {
    "category": "Incident / Operations",
    "en": "The upstream service returned 500.",
    "ko": "upstream service가 500을 반환했다."
  },
  {
    "category": "Incident / Operations",
    "en": "A dependency failure caused the outage.",
    "ko": "dependency failure가 outage를 유발했다."
  },
  {
    "category": "Incident / Operations",
    "en": "A traffic spike triggered the incident.",
    "ko": "traffic spike가 incident를 촉발했다."
  },
  {
    "category": "Incident / Operations",
    "en": "The deployment changed the config.",
    "ko": "deployment가 config를 바꿨다."
  },
  {
    "category": "Incident / Operations",
    "en": "Recovery took X minutes.",
    "ko": "recovery에 X분 걸렸다."
  },
  {
    "category": "Incident / Operations",
    "en": "The root cause analysis showed X.",
    "ko": "RCA 결과 X가 나왔다."
  },
  {
    "category": "Incident / Operations",
    "en": "We wrote a postmortem.",
    "ko": "postmortem을 작성했다."
  },
  {
    "category": "Incident / Operations",
    "en": "The action item is to add better monitoring.",
    "ko": "action item은 더 나은 monitoring을 추가하는 것이다."
  },
  {
    "category": "Incident / Operations",
    "en": "Each action item has an owner and a due date.",
    "ko": "각 action item에는 owner와 due date가 있다."
  },
  {
    "category": "Incident / Operations",
    "en": "We sent status updates every X minutes.",
    "ko": "X분마다 status update를 보냈다."
  },
  {
    "category": "Incident / Operations",
    "en": "The system recovered after X.",
    "ko": "X 이후 system이 recovery됐다."
  },
  {
    "category": "Cloud / Infra",
    "en": "This runs on X instances.",
    "ko": "이것은 X instance에서 실행된다."
  },
  {
    "category": "Cloud / Infra",
    "en": "We use object storage for files.",
    "ko": "file 저장에는 object storage를 사용한다."
  },
  {
    "category": "Cloud / Infra",
    "en": "We use a managed database.",
    "ko": "managed database를 사용한다."
  },
  {
    "category": "Cloud / Infra",
    "en": "The service runs in multiple availability zones.",
    "ko": "service는 여러 AZ에서 실행된다."
  },
  {
    "category": "Cloud / Infra",
    "en": "The region failed over to X.",
    "ko": "region이 X로 failover했다."
  },
  {
    "category": "Cloud / Infra",
    "en": "The VPC contains public and private subnets.",
    "ko": "VPC에는 public/private subnet이 있다."
  },
  {
    "category": "Cloud / Infra",
    "en": "IAM controls access to resources.",
    "ko": "IAM이 resource access를 제어한다."
  },
  {
    "category": "Cloud / Infra",
    "en": "The service account needs permission to X.",
    "ko": "service account는 X 권한이 필요하다."
  },
  {
    "category": "Cloud / Infra",
    "en": "Secrets should not be stored in source code.",
    "ko": "secret은 source code에 저장하면 안 된다."
  },
  {
    "category": "Cloud / Infra",
    "en": "We rotate secrets regularly.",
    "ko": "secret을 정기적으로 rotate한다."
  },
  {
    "category": "Kubernetes",
    "en": "The service runs in a container.",
    "ko": "service는 container에서 실행된다."
  },
  {
    "category": "Kubernetes",
    "en": "The image is built by the CI pipeline.",
    "ko": "image는 CI pipeline에서 build된다."
  },
  {
    "category": "Kubernetes",
    "en": "The pod was restarted.",
    "ko": "pod가 재시작됐다."
  },
  {
    "category": "Kubernetes",
    "en": "The pod was OOMKilled.",
    "ko": "pod가 memory 초과로 OOMKilled됐다."
  },
  {
    "category": "Kubernetes",
    "en": "The pod exceeded the memory limit.",
    "ko": "pod가 memory limit을 초과했다."
  },
  {
    "category": "Kubernetes",
    "en": "The readiness probe failed.",
    "ko": "readiness probe가 실패했다."
  },
  {
    "category": "Kubernetes",
    "en": "The liveness probe restarted the pod.",
    "ko": "liveness probe가 pod를 재시작했다."
  },
  {
    "category": "Kubernetes",
    "en": "The pod stopped receiving traffic.",
    "ko": "pod가 traffic을 받지 않게 됐다."
  },
  {
    "category": "Kubernetes",
    "en": "Autoscaling kicked in when CPU usage went above the threshold.",
    "ko": "CPU usage가 threshold를 넘자 autoscaling이 작동했다."
  },
  {
    "category": "Kubernetes",
    "en": "The HPA scaled the deployment from A to B replicas.",
    "ko": "HPA가 deployment를 A에서 B replica로 scale했다."
  },
  {
    "category": "Kubernetes",
    "en": "The config is stored in a ConfigMap.",
    "ko": "config는 ConfigMap에 저장된다."
  },
  {
    "category": "Kubernetes",
    "en": "Sensitive values are stored in Secrets.",
    "ko": "민감한 값은 Secrets에 저장된다."
  },
  {
    "category": "Kubernetes",
    "en": "The service is exposed through an ingress.",
    "ko": "service는 ingress를 통해 노출된다."
  },
  {
    "category": "Kubernetes",
    "en": "Ingress handles external traffic.",
    "ko": "ingress는 외부 traffic을 처리한다."
  },
  {
    "category": "Kubernetes",
    "en": "Egress traffic goes through X.",
    "ko": "egress traffic은 X를 거친다."
  },
  {
    "category": "Kubernetes",
    "en": "A network policy blocks X.",
    "ko": "network policy가 X를 차단한다."
  },
  {
    "category": "Kubernetes",
    "en": "The service uses a persistent volume.",
    "ko": "service는 persistent volume을 사용한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Authentication verifies who the user is.",
    "ko": "authentication은 사용자가 누구인지 확인한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Authorization checks what the user can access.",
    "ko": "authorization은 사용자가 무엇에 접근할 수 있는지 확인한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We pass a JWT in the Authorization header.",
    "ko": "Authorization header에 JWT를 전달한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "OAuth lets users grant access without sharing passwords.",
    "ko": "OAuth는 password 공유 없이 access를 위임하게 해준다."
  },
  {
    "category": "14. Security / Auth",
    "en": "CORS is enforced by the browser.",
    "ko": "CORS는 browser가 강제한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "TLS protects data in transit.",
    "ko": "TLS는 이동 중인 데이터를 보호한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "mTLS authenticates both client and server.",
    "ko": "mTLS는 client와 server를 모두 인증한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We encrypt sensitive data at rest.",
    "ko": "민감한 데이터는 저장 시 암호화한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We encrypt data in transit using TLS.",
    "ko": "이동 중인 데이터는 TLS로 암호화한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Secrets should not be logged.",
    "ko": "secret은 log에 남기면 안 된다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Services should run with least privilege.",
    "ko": "service는 least privilege로 실행되어야 한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We should avoid logging PII.",
    "ko": "PII는 log에 남기지 않아야 한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We mask sensitive fields in logs.",
    "ko": "log에서 민감한 field를 mask한다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Audit logs help track sensitive operations.",
    "ko": "audit log는 민감한 작업 추적에 도움 된다."
  },
  {
    "category": "14. Security / Auth",
    "en": "Token rotation reduces security risk.",
    "ko": "token rotation은 security risk를 줄인다."
  },
  {
    "category": "14. Security / Auth",
    "en": "This could lead to privilege escalation.",
    "ko": "이것은 privilege escalation으로 이어질 수 있다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We need to validate input to prevent injection attacks.",
    "ko": "injection attack을 막기 위해 input validation이 필요하다."
  },
  {
    "category": "14. Security / Auth",
    "en": "We should sanitize user input.",
    "ko": "user input을 sanitize해야 한다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "I need more context.",
    "ko": "context가 더 필요하다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "For context, X.",
    "ko": "배경 설명을 하자면 X다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "Just to confirm, X.",
    "ko": "확인차 말하면 X다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "To clarify, X.",
    "ko": "명확히 하자면 X다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "What’s the expected behavior?",
    "ko": "기대 동작이 무엇인가?"
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "What’s the actual behavior?",
    "ko": "실제 동작이 무엇인가?"
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "What are the repro steps?",
    "ko": "재현 절차가 무엇인가?"
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "What’s the priority?",
    "ko": "우선순위가 무엇인가?"
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "What’s the ETA?",
    "ko": "예상 완료 시간이 언제인가?"
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "I don’t have bandwidth this sprint.",
    "ko": "이번 sprint에는 여력이 없다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "This is a blocker.",
    "ko": "이것은 진행을 막는 이슈다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "This is not blocking.",
    "ko": "이것은 진행을 막지는 않는다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "This is out of scope.",
    "ko": "이것은 scope 밖이다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "This changed the scope.",
    "ko": "이것이 scope를 바꿨다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "The acceptance criteria are X.",
    "ko": "acceptance criteria는 X다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "The open question is X.",
    "ko": "아직 열려 있는 질문은 X다."
  },
  {
    "category": "확인 / 요구사항 / 일정",
    "en": "My assumption is X.",
    "ko": "내 가정은 X다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We need alignment on X.",
    "ko": "X에 대해 방향을 맞춰야 한다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "The owner is X.",
    "ko": "owner는 X다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "The DRI is X.",
    "ko": "DRI는 X다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We need stakeholder sign-off.",
    "ko": "stakeholder sign-off가 필요하다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "I’ll follow up on this.",
    "ko": "이 건 follow up하겠다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "I’ll get back to you after I check X.",
    "ko": "X 확인 후 다시 말하겠다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Let’s sync up on X.",
    "ko": "X에 대해 sync up하자."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Async update: X.",
    "ko": "비동기 업데이트: X."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "I’ll hand this off to X.",
    "ko": "이것을 X에게 hand off하겠다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Can you take over X?",
    "ko": "X를 take over해줄 수 있나?"
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "This depends on X.",
    "ko": "이것은 X에 의존한다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We’re blocked by X.",
    "ko": "X 때문에 막혀 있다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Let’s split this into smaller tasks.",
    "ko": "이것을 더 작은 task로 나누자."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Let’s defer this.",
    "ko": "이것은 미루자."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Let’s park this for now.",
    "ko": "이것은 일단 보류하자."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "Let’s circle back after X.",
    "ko": "X 이후 다시 논의하자."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "I want to push back on the timeline.",
    "ko": "timeline에 대해 이의를 제기하고 싶다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We need to negotiate the scope.",
    "ko": "scope를 조정해야 한다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We should prioritize X over Y.",
    "ko": "Y보다 X를 우선해야 한다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "My proposal is to X.",
    "ko": "내 제안은 X하는 것이다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "The main risk is X.",
    "ko": "주요 risk는 X다."
  },
  {
    "category": "조율 / 소유권 / follow-up",
    "en": "We should de-risk this by X.",
    "ko": "X를 해서 risk를 줄여야 한다."
  },
  {
    "category": "Project 설명",
    "en": "This project was about X.",
    "ko": "이 프로젝트는 X에 관한 것이었다."
  },
  {
    "category": "Project 설명",
    "en": "The business problem was X.",
    "ko": "비즈니스 문제는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "The user-facing impact was X.",
    "ko": "사용자 영향은 X였다."
  },
  {
    "category": "Project 설명",
    "en": "The technical problem was X.",
    "ko": "기술적 문제는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "The existing system had X.",
    "ko": "기존 시스템에는 X가 있었다."
  },
  {
    "category": "Project 설명",
    "en": "The old approach didn’t scale because X.",
    "ko": "기존 접근은 X 때문에 scale되지 않았다."
  },
  {
    "category": "Project 설명",
    "en": "We redesigned X to Y.",
    "ko": "X를 Y로 재설계했다."
  },
  {
    "category": "Project 설명",
    "en": "We migrated from X to Y.",
    "ko": "X에서 Y로 migration했다."
  },
  {
    "category": "Project 설명",
    "en": "We introduced X to solve Y.",
    "ko": "Y를 해결하기 위해 X를 도입했다."
  },
  {
    "category": "Project 설명",
    "en": "We removed X because Y.",
    "ko": "Y 때문에 X를 제거했다."
  },
  {
    "category": "Project 설명",
    "en": "The main component I built was X.",
    "ko": "내가 만든 주요 component는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "X talks to Y through Z.",
    "ko": "X는 Z를 통해 Y와 통신한다."
  },
  {
    "category": "Project 설명",
    "en": "X stores Y in Z.",
    "ko": "X는 Y를 Z에 저장한다."
  },
  {
    "category": "Project 설명",
    "en": "X publishes an event when Y happens.",
    "ko": "Y가 발생하면 X가 event를 publish한다."
  },
  {
    "category": "Project 설명",
    "en": "X consumes events from Y.",
    "ko": "X는 Y에서 event를 consume한다."
  },
  {
    "category": "Project 설명",
    "en": "The main failure mode was X.",
    "ko": "주요 failure mode는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "We handled failure by X.",
    "ko": "X해서 failure를 처리했다."
  },
  {
    "category": "Project 설명",
    "en": "We added monitoring for X.",
    "ko": "X에 대한 monitoring을 추가했다."
  },
  {
    "category": "Project 설명",
    "en": "We added alerts for X.",
    "ko": "X에 대한 alert를 추가했다."
  },
  {
    "category": "Project 설명",
    "en": "We validated the change by X.",
    "ko": "X해서 변경사항을 검증했다."
  },
  {
    "category": "Project 설명",
    "en": "We rolled it out gradually.",
    "ko": "점진적으로 배포했다."
  },
  {
    "category": "Project 설명",
    "en": "We kept it behind a feature flag.",
    "ko": "feature flag 뒤에 두었다."
  },
  {
    "category": "Project 설명",
    "en": "We had a rollback plan.",
    "ko": "rollback plan이 있었다."
  },
  {
    "category": "Project 설명",
    "en": "The migration had to be backward compatible.",
    "ko": "migration은 backward compatible해야 했다."
  },
  {
    "category": "Project 설명",
    "en": "The biggest risk was X.",
    "ko": "가장 큰 risk는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "We reduced the risk by X.",
    "ko": "X해서 risk를 줄였다."
  },
  {
    "category": "Project 설명",
    "en": "The main limitation was X.",
    "ko": "주요 한계는 X였다."
  },
  {
    "category": "Project 설명",
    "en": "Long term, I would improve X.",
    "ko": "장기적으로는 X를 개선하겠다."
  },
  {
    "category": "Project 설명",
    "en": "This project shows that I can X.",
    "ko": "이 프로젝트는 내가 X할 수 있음을 보여준다."
  },
  {
    "category": "Project 설명",
    "en": "This is relevant to this role because X.",
    "ko": "X 때문에 이 role과 관련 있다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "One project I’m proud of is X.",
    "ko": "자랑스럽게 생각하는 프로젝트는 X다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The goal was to X.",
    "ko": "목표는 X하는 것이었다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The main challenge was X.",
    "ko": "주요 어려움은 X였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "My role was to X.",
    "ko": "내 역할은 X하는 것이었다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I was responsible for X.",
    "ko": "X를 담당했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I worked closely with X.",
    "ko": "X와 긴밀히 협업했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I had to balance X and Y.",
    "ko": "X와 Y 사이에서 균형을 잡아야 했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The main trade-off was X.",
    "ko": "주요 trade-off는 X였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I chose X over Y because Z.",
    "ko": "Z 때문에 Y보다 X를 선택했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I made this decision because X.",
    "ko": "X 때문에 이 결정을 했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The result was X.",
    "ko": "결과는 X였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "This improved X by Y%.",
    "ko": "X를 Y% 개선했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "This reduced X from A to B.",
    "ko": "X를 A에서 B로 줄였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "We measured success by X.",
    "ko": "X로 성공을 측정했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I made a mistake by X.",
    "ko": "X해서 실수했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The mistake caused X.",
    "ko": "그 실수는 X를 유발했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I fixed it by X.",
    "ko": "X해서 고쳤다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I learned that X.",
    "ko": "X라는 것을 배웠다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "Next time, I would X.",
    "ko": "다음에는 X하겠다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "In hindsight, I should have X.",
    "ko": "돌이켜보면 X했어야 했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I disagreed with X because Y.",
    "ko": "Y 때문에 X에 동의하지 않았다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I pushed back on X.",
    "ko": "X에 이의를 제기했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I explained my concern by X.",
    "ko": "X를 통해 우려를 설명했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "We eventually aligned on X.",
    "ko": "결국 X에 대해 방향을 맞췄다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I handled the conflict by X.",
    "ko": "X해서 갈등을 처리했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I took ownership of X.",
    "ko": "X에 대한 ownership을 가졌다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I unblocked the team by X.",
    "ko": "X해서 팀이 막힌 것을 풀었다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I helped the team by X.",
    "ko": "X해서 팀을 도왔다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I received feedback that X.",
    "ko": "X라는 feedback을 받았다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I changed my approach by X.",
    "ko": "X해서 접근 방식을 바꿨다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The hardest part was X.",
    "ko": "가장 어려운 부분은 X였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "The most important lesson was X.",
    "ko": "가장 중요한 교훈은 X였다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I had to work under ambiguity.",
    "ko": "불확실한 상황에서 일해야 했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I clarified the requirements by X.",
    "ko": "X해서 요구사항을 명확히 했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I prioritized X over Y.",
    "ko": "Y보다 X를 우선했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "I escalated X to Y.",
    "ko": "X를 Y에게 escalate했다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "This experience taught me X.",
    "ko": "이 경험은 X를 가르쳐줬다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "That’s why I now X.",
    "ko": "그래서 이제 X한다."
  },
  {
    "category": "Behavioral / STAR",
    "en": "To summarize, X.",
    "ko": "요약하면 X다."
  }
];
