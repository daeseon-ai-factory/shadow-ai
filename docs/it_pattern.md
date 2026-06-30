기억한다. 이전에 구조는 이렇게 잡았다.

**1차 130 + 2차 120 + 3차 150 + 4차 100 = 약 500개**로 잡았었다.
아래는 **숫자 맞추기용이 아니라**, 중복 줄이고 실전성이 있는 것만 남긴 **IT 면접/업무 chunk 최종본**이다.

외울 단위는 단어가 아니라 이런 식이다.

**The database is the source of truth.**
**The cache can be stale.**
**This function takes X and returns Y.**
**The trade-off is between consistency and latency.**

---

# 1. 코드 설명 / 코드 리딩

## 함수 / 메서드 / 클래스 설명

* **This function takes X and returns Y.** — 이 함수는 X를 받아 Y를 반환한다.
* **This method is responsible for X.** — 이 메서드는 X를 담당한다.
* **This class handles X.** — 이 클래스는 X를 처리한다.
* **This code checks whether X.** — 이 코드는 X인지 확인한다.
* **This validates the input.** — 입력값을 검증한다.
* **This parses X into Y.** — X를 파싱해서 Y로 만든다.
* **This converts X into Y.** — X를 Y로 변환한다.
* **This maps X to Y.** — X를 Y에 매핑한다.
* **This filters out invalid items.** — 유효하지 않은 항목을 걸러낸다.
* **This groups items by X.** — 항목들을 X 기준으로 묶는다.
* **This sorts the list by X.** — 리스트를 X 기준으로 정렬한다.
* **This iterates over X.** — X를 순회한다.
* **This loops through all X.** — 모든 X를 반복문으로 돈다.
* **This exits early if X.** — X이면 일찍 종료한다.
* **This uses a guard clause.** — guard clause를 사용한다.
* **This throws an exception if X.** — X이면 예외를 던진다.
* **This returns X when Y.** — Y일 때 X를 반환한다.
* **This handles the happy path.** — 정상 흐름을 처리한다.
* **This handles the failure path.** — 실패 흐름을 처리한다.
* **This handles the edge case where X.** — X인 edge case를 처리한다.

## 흐름 / 상태 / 부작용

* **The control flow is simple.** — 실행 흐름은 단순하다.
* **The data flow is hard to follow.** — 데이터 흐름은 따라가기 어렵다.
* **This is the entry point.** — 여기가 진입점이다.
* **This is the call site.** — 여기가 호출 지점이다.
* **The caller passes X into this method.** — 호출자가 X를 이 메서드에 넘긴다.
* **The callee returns Y.** — 호출받은 쪽이 Y를 반환한다.
* **This mutates X in place.** — X를 제자리에서 변경한다.
* **This creates a copy instead of mutating the original.** — 원본을 바꾸지 않고 복사본을 만든다.
* **This has a side effect.** — side effect가 있다.
* **This has no side effects.** — side effect가 없다.
* **This is a pure function.** — 순수 함수다.
* **This depends on X.** — 이것은 X에 의존한다.
* **X is injected through the constructor.** — X는 생성자를 통해 주입된다.
* **This delegates X to Y.** — X 처리를 Y에게 위임한다.
* **This wraps X with Y.** — X를 Y로 감싼다.
* **This abstracts away X.** — X를 추상화해서 숨긴다.
* **This is an implementation detail.** — 이것은 구현 세부사항이다.

## 코드 품질 / 리팩터링

* **This extracts X into a helper method.** — X를 helper method로 분리한다.
* **This removes duplicate logic.** — 중복 로직을 제거한다.
* **This improves readability.** — 가독성을 개선한다.
* **This improves maintainability.** — 유지보수성을 개선한다.
* **This makes the code easier to test.** — 코드를 테스트하기 쉽게 만든다.
* **This introduces unnecessary complexity.** — 불필요한 복잡도를 추가한다.
* **This is too tightly coupled.** — 너무 강하게 결합되어 있다.
* **This should be loosely coupled.** — 느슨하게 결합되어야 한다.
* **This violates single responsibility.** — 단일 책임 원칙을 어긴다.
* **This is dead code.** — 사용되지 않는 코드다.
* **This is legacy code.** — 오래된 기존 코드다.
* **This adds technical debt.** — 기술 부채를 추가한다.
* **This pays down technical debt.** — 기술 부채를 줄인다.
* **This is null-safe.** — null에 안전하다.
* **This is thread-safe.** — 멀티스레드에 안전하다.
* **This can cause a race condition.** — race condition을 유발할 수 있다.
* **This looks like an off-by-one error.** — 인덱스 하나 차이 버그처럼 보인다.

---

# 2. 알고리즘 / 코딩테스트

## 접근 설명

* **The input is X, and the output should be Y.** — 입력은 X이고 출력은 Y여야 한다.
* **The constraint is X, so O(n²) might be too slow.** — 제약조건상 O(n²)은 느릴 수 있다.
* **I’d start with a brute-force solution.** — 완전탐색부터 시작하겠다.
* **Then I’d optimize it.** — 그다음 최적화하겠다.
* **The brute-force approach takes O(n²).** — 완전탐색은 O(n²)이 걸린다.
* **We can reduce it to O(n).** — O(n)으로 줄일 수 있다.
* **This runs in O(n) time.** — 시간복잡도는 O(n)이다.
* **The space complexity is O(n).** — 공간복잡도는 O(n)이다.
* **We trade space for time.** — 공간을 써서 시간을 줄인다.
* **This avoids duplicate work.** — 중복 작업을 피한다.
* **This avoids recomputing the same state.** — 같은 상태를 다시 계산하지 않는다.
* **We need to handle edge cases like empty input.** — 빈 입력 같은 edge case를 처리해야 한다.
* **Let me walk through an example.** — 예시로 따라가 보겠다.
* **Let me dry-run this algorithm.** — 이 알고리즘을 손으로 실행해보겠다.
* **The answer is stored in X.** — 정답은 X에 저장된다.

## 자료구조

* **We use a hash map to store X.** — X를 저장하기 위해 hash map을 사용한다.
* **We use a hash set to avoid duplicates.** — 중복을 피하기 위해 hash set을 사용한다.
* **We use a stack to track X.** — X를 추적하기 위해 stack을 사용한다.
* **We use a queue for BFS.** — BFS에는 queue를 사용한다.
* **We use a heap to get the smallest item efficiently.** — 가장 작은 값을 효율적으로 얻기 위해 heap을 사용한다.
* **We use a priority queue.** — priority queue를 사용한다.
* **We build an adjacency list.** — adjacency list를 만든다.
* **We mark nodes as visited.** — 노드를 visited로 표시한다.
* **We use union-find to group connected components.** — 연결 컴포넌트를 묶기 위해 union-find를 사용한다.
* **We use a trie for prefix lookup.** — prefix 검색을 위해 trie를 사용한다.
* **We use a bitmask to represent state.** — 상태를 표현하기 위해 bitmask를 사용한다.

## 알고리즘 패턴

* **We use two pointers.** — two pointers를 사용한다.
* **We use a sliding window.** — sliding window를 사용한다.
* **We expand the right pointer.** — 오른쪽 포인터를 확장한다.
* **We shrink the window from the left.** — 왼쪽에서 window를 줄인다.
* **The invariant is X.** — 유지되는 조건은 X이다.
* **We use prefix sums to compute ranges efficiently.** — 구간을 효율적으로 계산하기 위해 prefix sum을 사용한다.
* **We use binary search because X is sorted.** — X가 정렬되어 있으므로 binary search를 사용한다.
* **The search space is X.** — 탐색 범위는 X이다.
* **We move left or right based on X.** — X에 따라 왼쪽 또는 오른쪽으로 이동한다.
* **We use DFS to explore all paths.** — 모든 경로를 탐색하기 위해 DFS를 사용한다.
* **We use BFS to find the shortest path.** — 최단 경로를 찾기 위해 BFS를 사용한다.
* **The base case is X.** — base case는 X이다.
* **The recursive case is X.** — recursive case는 X이다.
* **We backtrack by undoing the previous choice.** — 이전 선택을 되돌리면서 backtrack한다.
* **We prune invalid branches.** — 유효하지 않은 가지를 잘라낸다.
* **We use memoization.** — memoization을 사용한다.
* **The DP state is X.** — DP 상태는 X이다.
* **The transition is X.** — 점화식/전이는 X이다.
* **This is a greedy choice because X.** — X 때문에 이것은 greedy 선택이다.
* **We sort first so that X.** — X를 위해 먼저 정렬한다.
* **We use topological sort because there are dependencies.** — 의존성이 있으므로 topological sort를 사용한다.

---

# 3. API / Wire / Contract

## API 기본

* **The client sends a request to the API layer.** — 클라이언트가 API 계층에 요청을 보낸다.
* **The API layer validates the request.** — API 계층이 요청을 검증한다.
* **The request payload contains X.** — 요청 payload에는 X가 들어 있다.
* **The response body includes X.** — 응답 body에는 X가 포함된다.
* **The token is passed in the headers.** — token은 header로 전달된다.
* **We use query parameters for filtering.** — 필터링에는 query parameter를 사용한다.
* **The user ID is a path parameter.** — user ID는 path parameter다.
* **We return 404 if the user doesn’t exist.** — 사용자가 없으면 404를 반환한다.
* **We return 400 for invalid input.** — 잘못된 입력이면 400을 반환한다.
* **We return 500 for unexpected server errors.** — 예상치 못한 서버 에러면 500을 반환한다.
* **Client-side validation improves UX.** — 클라이언트 검증은 UX를 개선한다.
* **Server-side validation is still required.** — 서버 검증은 여전히 필요하다.
* **We use pagination to avoid loading too much data.** — 너무 많은 데이터를 한 번에 로드하지 않기 위해 pagination을 사용한다.
* **Cursor-based pagination is better for large datasets.** — 큰 데이터셋에는 cursor 기반 pagination이 더 낫다.
* **Offset-based pagination can be slow for deep pages.** — 깊은 페이지에서는 offset 기반 pagination이 느릴 수 있다.

## Wire / Serialization

* **In memory, X is represented as Y.** — 메모리에서는 X가 Y로 표현된다.
* **On the wire, X is serialized as Y.** — 네트워크로는 X가 Y로 직렬화된다.
* **The wire format is JSON over HTTP.** — wire format은 HTTP 위의 JSON이다.
* **The wire protocol is X.** — wire protocol은 X이다.
* **We serialize the object as JSON.** — 객체를 JSON으로 직렬화한다.
* **The server deserializes the request body.** — 서버가 request body를 역직렬화한다.
* **The value is encoded as UTF-8.** — 값은 UTF-8로 인코딩된다.
* **The client decodes the token.** — 클라이언트가 token을 디코딩한다.
* **JSON is human-readable.** — JSON은 사람이 읽기 쉽다.
* **Protobuf is more compact than JSON.** — Protobuf는 JSON보다 더 compact하다.

## Contract / Compatibility

* **This is part of the API contract.** — 이것은 API 계약의 일부다.
* **This is an implementation detail, not part of the API contract.** — 이것은 구현 세부사항이지 API 계약의 일부가 아니다.
* **Removing this field would be a breaking change.** — 이 필드를 제거하면 breaking change가 된다.
* **This change is backward compatible.** — 이 변경은 하위 호환된다.
* **The client should ignore unknown fields for forward compatibility.** — forward compatibility를 위해 클라이언트는 모르는 필드를 무시해야 한다.
* **This field is optional for backward compatibility.** — 이 필드는 하위 호환성을 위해 optional이다.
* **This is a required field.** — 이것은 필수 필드다.
* **We use a default value if the field is missing.** — 필드가 없으면 기본값을 사용한다.
* **The schema defines the fields and types.** — schema가 필드와 타입을 정의한다.
* **Schema evolution needs to be backward compatible.** — schema evolution은 하위 호환되어야 한다.
* **The internal model can change, but the external representation should stay stable.** — 내부 모델은 바뀔 수 있지만 외부 표현은 안정적이어야 한다.
* **We need API versioning to avoid breaking clients.** — 클라이언트를 깨지 않기 위해 API versioning이 필요하다.

## Idempotency / Retry-safe API

* **This endpoint should be idempotent.** — 이 endpoint는 idempotent해야 한다.
* **This request needs to be safe to retry.** — 이 요청은 재시도해도 안전해야 한다.
* **We use an idempotency key to prevent duplicate processing.** — 중복 처리를 막기 위해 idempotency key를 사용한다.
* **The same request can be sent multiple times without changing the result.** — 같은 요청을 여러 번 보내도 결과가 바뀌지 않는다.
* **Retries can create duplicate requests.** — retry는 중복 요청을 만들 수 있다.

---

# 4. Database / Data / Cache

## 데이터 기준 / 일관성

* **The database is the source of truth.** — DB가 기준 데이터다.
* **We should have a single source of truth.** — 단일 기준 데이터가 있어야 한다.
* **The cache contains derived data.** — cache에는 파생 데이터가 들어 있다.
* **The cache can be stale.** — cache는 오래된 값일 수 있다.
* **The user may see stale data for a few seconds.** — 사용자는 몇 초 동안 stale data를 볼 수 있다.
* **The data can get out of sync.** — 데이터가 서로 안 맞을 수 있다.
* **We need to sync up the cache with the database.** — cache와 DB를 동기화해야 한다.
* **This system is eventually consistent.** — 이 시스템은 eventual consistency를 가진다.
* **This requires strong consistency.** — 이것은 strong consistency가 필요하다.
* **Users expect read-after-write consistency.** — 사용자는 쓰고 나서 바로 읽을 수 있기를 기대한다.
* **Duplicate data can cause inconsistency.** — 중복 데이터는 inconsistency를 만들 수 있다.
* **Each service should own its data.** — 각 서비스는 자기 데이터를 소유해야 한다.
* **The data model is too tightly coupled to the API.** — 데이터 모델이 API에 너무 강하게 결합되어 있다.

## DB / Query / Transaction

* **The user ID is the primary key.** — user ID가 primary key다.
* **The order table has a foreign key to users.** — order table은 users에 대한 foreign key를 가진다.
* **Adding an index reduced query time.** — index 추가가 query time을 줄였다.
* **The root cause was a missing index.** — 근본 원인은 missing index였다.
* **The query caused a full table scan.** — query가 full table scan을 유발했다.
* **We checked the query plan.** — query plan을 확인했다.
* **The endpoint had an N+1 query problem.** — endpoint에 N+1 query 문제가 있었다.
* **The connection pool was exhausted.** — connection pool이 고갈됐다.
* **We wrap the update in a transaction.** — update를 transaction으로 감싼다.
* **The transaction commits after validation.** — validation 후 transaction이 commit된다.
* **We roll back the transaction if anything fails.** — 무엇이든 실패하면 transaction을 rollback한다.
* **The isolation level affects consistency.** — isolation level은 consistency에 영향을 준다.
* **Lock contention caused high latency.** — lock contention이 high latency를 유발했다.
* **We use optimistic locking to avoid lost updates.** — lost update를 피하기 위해 optimistic locking을 사용한다.
* **Pessimistic locking can reduce concurrency.** — pessimistic locking은 concurrency를 줄일 수 있다.
* **Two transactions caused a deadlock.** — 두 transaction이 deadlock을 만들었다.
* **We need a database migration.** — database migration이 필요하다.
* **We backfilled the new column.** — 새 column의 기존 데이터를 backfill했다.
* **Schema drift caused deployment issues.** — schema drift가 deployment issue를 유발했다.

## Cache

* **A cache hit avoids a database call.** — cache hit이면 DB call을 피한다.
* **On a cache miss, we query the database.** — cache miss이면 DB를 조회한다.
* **Cache invalidation is the hard part.** — 어려운 부분은 cache invalidation이다.
* **The cache entry has a TTL of five minutes.** — cache entry는 5분 TTL을 가진다.
* **The stale cache caused incorrect results.** — stale cache가 잘못된 결과를 유발했다.
* **We warm up the cache before peak traffic.** — peak traffic 전에 cache를 warm up한다.
* **A cold cache can cause high latency.** — cold cache는 high latency를 유발할 수 있다.
* **We use the cache-aside pattern.** — cache-aside pattern을 사용한다.
* **Write-through caching keeps the cache fresh.** — write-through caching은 cache를 최신으로 유지한다.
* **Write-behind caching improves write latency but adds risk.** — write-behind caching은 write latency를 줄이지만 risk를 추가한다.
* **We need to prevent a cache stampede.** — cache stampede를 막아야 한다.
* **The cache key should include X.** — cache key에는 X가 포함되어야 한다.
* **We evict old cache entries.** — 오래된 cache entry를 제거한다.

---

# 5. Messaging / Queue / Event

* **The order service is the producer.** — order service가 producer다.
* **The email service is the consumer.** — email service가 consumer다.
* **Events are published to a Kafka topic.** — event는 Kafka topic에 publish된다.
* **Kafka uses partitions for scalability.** — Kafka는 scalability를 위해 partition을 사용한다.
* **Consumers in the same group share the load.** — 같은 consumer group의 consumer들이 load를 나눠 처리한다.
* **The consumer stores its offset.** — consumer는 offset을 저장한다.
* **The consumer sends an ack after processing.** — consumer는 처리 후 ack를 보낸다.
* **We nack the message if processing fails.** — 처리 실패 시 message를 nack한다.
* **Poison messages go to a dead-letter queue.** — poison message는 dead-letter queue로 간다.
* **A poison message can block processing.** — poison message는 처리를 막을 수 있다.
* **Failed messages go to a retry queue.** — 실패한 message는 retry queue로 간다.
* **At-least-once delivery can create duplicates.** — at-least-once delivery는 중복을 만들 수 있다.
* **At-most-once delivery can lose messages.** — at-most-once delivery는 message를 잃을 수 있다.
* **Exactly-once semantics are hard to guarantee.** — exactly-once semantics는 보장하기 어렵다.
* **We use deduplication to handle duplicate events.** — 중복 event를 처리하기 위해 deduplication을 사용한다.
* **Ordering guarantees matter for payment events.** — payment event에서는 ordering guarantee가 중요하다.
* **Event-driven systems are often eventually consistent.** — event-driven system은 보통 eventually consistent하다.
* **We use a queue to decouple X from Y.** — X와 Y를 분리하기 위해 queue를 사용한다.
* **The consumer processes events asynchronously.** — consumer가 event를 비동기로 처리한다.
* **Async processing takes work off the critical path.** — 비동기 처리는 작업을 critical path에서 빼준다.

---

# 6. System Design / Distributed Systems

## 큰 그림 / 요구사항

* **The functional requirements are X.** — 기능 요구사항은 X다.
* **The non-functional requirements are X.** — 비기능 요구사항은 X다.
* **The main constraints are X.** — 주요 제약조건은 X다.
* **At a high level, X is responsible for Y.** — 큰 그림에서 X는 Y를 담당한다.
* **The system has three main components: A, B, and C.** — 시스템은 A, B, C 세 주요 컴포넌트로 구성된다.
* **The read path goes through X.** — read path는 X를 거친다.
* **The write path updates X.** — write path는 X를 업데이트한다.
* **This service depends on X.** — 이 서비스는 X에 의존한다.
* **The service calls a downstream service.** — 서비스가 downstream service를 호출한다.
* **The request goes through the load balancer.** — 요청은 load balancer를 거친다.

## 분산 시스템 핵심

* **The upstream service is timing out.** — upstream service가 timeout되고 있다.
* **A downstream service failed.** — downstream service가 실패했다.
* **Redis is a dependency of this service.** — Redis는 이 서비스의 dependency다.
* **This database is a single point of failure.** — 이 DB는 single point of failure다.
* **Replication improves fault tolerance.** — replication은 fault tolerance를 개선한다.
* **We need high availability for this service.** — 이 서비스는 high availability가 필요하다.
* **Leader election prevents multiple writers.** — leader election은 multiple writer를 막는다.
* **Replication improves read scalability.** — replication은 read scalability를 개선한다.
* **Sharding helps distribute load.** — sharding은 load를 분산하는 데 도움이 된다.
* **Partitioning improves query performance.** — partitioning은 query performance를 개선한다.
* **Split brain can cause data corruption.** — split brain은 data corruption을 유발할 수 있다.
* **The system must handle network partitions.** — 시스템은 network partition을 처리해야 한다.
* **Clock skew can break time-based logic.** — clock skew는 시간 기반 로직을 깨뜨릴 수 있다.
* **Consensus is expensive but provides safety.** — consensus는 비용이 크지만 safety를 제공한다.
* **Writes require a quorum.** — write에는 quorum이 필요하다.

## Architecture

* **Services should be loosely coupled.** — 서비스는 느슨하게 결합되어야 한다.
* **This design is too tightly coupled.** — 이 설계는 너무 강하게 결합되어 있다.
* **This improves separation of concerns.** — 이것은 책임 분리를 개선한다.
* **This abstraction hides the implementation detail.** — 이 abstraction은 구현 세부사항을 숨긴다.
* **Clients should not depend on implementation details.** — client는 구현 세부사항에 의존하면 안 된다.
* **The public interface should remain stable.** — public interface는 안정적으로 유지되어야 한다.
* **This is only used by internal services.** — 이것은 내부 서비스에서만 사용된다.
* **The service boundary is unclear.** — service boundary가 불명확하다.
* **Ownership should be clear.** — ownership은 명확해야 한다.
* **A monolith is simpler to operate at small scale.** — 작은 규모에서는 monolith가 운영하기 더 단순하다.
* **Microservices add operational complexity.** — microservices는 운영 복잡도를 추가한다.
* **The workflow service handles orchestration.** — workflow service가 orchestration을 처리한다.
* **Each service reacts to events using choreography.** — 각 서비스가 choreography 방식으로 event에 반응한다.
* **The control plane manages configuration.** — control plane은 configuration을 관리한다.
* **The data plane handles user traffic.** — data plane은 user traffic을 처리한다.

---

# 7. Scaling / Capacity / Performance

## Scaling

* **The system needs to handle X requests per second.** — 시스템은 초당 X 요청을 처리해야 한다.
* **The service handles X requests per second.** — 서비스는 초당 X 요청을 처리한다.
* **Traffic is read-heavy.** — traffic은 read-heavy다.
* **Traffic is write-heavy.** — traffic은 write-heavy다.
* **Peak traffic is X times higher than normal traffic.** — peak traffic은 평소보다 X배 높다.
* **We need enough headroom for traffic spikes.** — traffic spike에 대비한 여유 capacity가 필요하다.
* **We can scale horizontally by adding more instances.** — instance를 더 추가해 horizontal scaling할 수 있다.
* **Vertical scaling has limits.** — vertical scaling에는 한계가 있다.
* **Stateless services are easier to scale horizontally.** — stateless service는 horizontal scaling하기 쉽다.
* **Stateful services are harder to scale.** — stateful service는 scaling이 어렵다.
* **The load balancer distributes traffic across instances.** — load balancer가 traffic을 instance들에 분산한다.
* **Autoscaling kicks in when CPU usage crosses the threshold.** — CPU 사용량이 threshold를 넘으면 autoscaling이 작동한다.
* **We need capacity planning before launch.** — launch 전에 capacity planning이 필요하다.

## Bottleneck / Bound

* **The database is the bottleneck.** — DB가 병목이다.
* **The bottleneck moves from X to Y.** — 병목이 X에서 Y로 이동한다.
* **This workload is CPU-bound.** — 이 workload는 CPU-bound다.
* **This endpoint is I/O-bound.** — 이 endpoint는 I/O-bound다.
* **This workload is memory-bound.** — 이 workload는 memory-bound다.
* **The connection pool is exhausted.** — connection pool이 고갈됐다.
* **The queue backlog is growing.** — queue backlog가 증가하고 있다.
* **This call is on the critical path.** — 이 call은 critical path에 있다.
* **This code is on the hot path.** — 이 코드는 hot path에 있다.
* **We use async processing to take work off the critical path.** — critical path에서 작업을 빼기 위해 async processing을 사용한다.

## Partition / Fan-out / CDN

* **We shard the data by user ID.** — user ID 기준으로 데이터를 shard한다.
* **X is a good partition key because Y.** — Y 때문에 X는 좋은 partition key다.
* **A hot key can overload one partition.** — hot key는 한 partition에 과부하를 줄 수 있다.
* **A hot partition can become a bottleneck.** — hot partition이 병목이 될 수 있다.
* **Fan-out on write improves read performance.** — fan-out on write는 read performance를 개선한다.
* **Fan-out on read keeps writes simple.** — fan-out on read는 write를 단순하게 유지한다.
* **We cache read-heavy data.** — read-heavy data를 caching한다.
* **We replicate data for availability.** — availability를 위해 data를 replicate한다.
* **We separate read and write traffic.** — read traffic과 write traffic을 분리한다.
* **We use a CDN for static content.** — static content에는 CDN을 사용한다.

## Metrics / Numbers

* **Latency increased after deployment.** — 배포 후 latency가 증가했다.
* **Throughput improved by 30%.** — throughput이 30% 개선됐다.
* **Throughput dropped after X.** — X 이후 throughput이 떨어졌다.
* **We monitor p50, p95, and p99 latency.** — p50, p95, p99 latency를 모니터링한다.
* **p99 latency shows tail behavior.** — p99 latency는 tail behavior를 보여준다.
* **Tail latency matters for user experience.** — tail latency는 사용자 경험에 중요하다.
* **X went from A to B.** — X가 A에서 B로 변했다.
* **X increased by N%.** — X가 N% 증가했다.
* **X decreased by N%.** — X가 N% 감소했다.
* **Traffic doubled.** — traffic이 두 배가 됐다.
* **Traffic tripled during peak hours.** — peak hour에 traffic이 세 배가 됐다.
* **Latency peaked at X milliseconds.** — latency가 X ms까지 치솟았다.
* **Latency averaged around X milliseconds.** — latency가 평균 X ms 정도였다.
* **CPU usage stayed above 90%.** — CPU 사용량이 90% 이상으로 유지됐다.
* **Memory usage kept climbing.** — memory usage가 계속 증가했다.
* **GC pressure increased.** — GC pressure가 증가했다.
* **Disk I/O was saturated.** — disk I/O가 포화 상태였다.
* **Network I/O spiked.** — network I/O가 급증했다.

---

# 8. Reliability / Failure Handling

* **The main failure mode is timeout.** — 주요 failure mode는 timeout이다.
* **We missed an edge case.** — edge case를 놓쳤다.
* **This is a corner case, but we should handle it.** — rare case지만 처리해야 한다.
* **The happy path is simple.** — 정상 흐름은 단순하다.
* **The failure path needs better handling.** — 실패 흐름은 더 나은 처리가 필요하다.
* **We use graceful degradation when Redis is down.** — Redis가 down되면 graceful degradation을 사용한다.
* **If the cache fails, we fall back to the database.** — cache가 실패하면 DB로 fallback한다.
* **We should fail fast instead of waiting forever.** — 계속 기다리기보다 fail fast해야 한다.
* **Retries without backoff can cause a retry storm.** — backoff 없는 retry는 retry storm을 유발할 수 있다.
* **A circuit breaker protects downstream services.** — circuit breaker는 downstream service를 보호한다.
* **Every network call should have a timeout.** — 모든 network call에는 timeout이 있어야 한다.
* **The deadline applies to the whole request.** — deadline은 전체 request에 적용된다.
* **We retry with exponential backoff.** — exponential backoff로 retry한다.
* **Jitter prevents all clients from retrying at once.** — jitter는 모든 client가 동시에 retry하는 것을 막는다.
* **We use load shedding under heavy traffic.** — high traffic에서 load shedding을 사용한다.
* **Backpressure prevents the queue from growing forever.** — backpressure는 queue가 끝없이 증가하는 것을 막는다.
* **We need to throttle requests.** — request를 제한해야 한다.
* **We use rate limiting to protect the system.** — 시스템 보호를 위해 rate limiting을 사용한다.
* **This prevents cascading failures.** — 이것은 cascading failure를 막는다.
* **The failure is isolated to X.** — failure가 X에 격리되어 있다.

---

# 9. Observability / Monitoring / Logging

## Logging / Tracing / Metrics

* **The logs show X.** — 로그에 X가 나온다.
* **The logs don’t have enough context.** — 로그에 충분한 context가 없다.
* **We added structured logging.** — structured logging을 추가했다.
* **Each request has a correlation ID.** — 각 request에는 correlation ID가 있다.
* **The trace ID lets us follow the request across services.** — trace ID로 여러 서비스에 걸친 request를 추적할 수 있다.
* **The trace shows where the request slowed down.** — trace를 보면 request가 어디서 느려졌는지 알 수 있다.
* **Each downstream call creates a span.** — 각 downstream call은 span을 만든다.
* **We sample traces to reduce overhead.** — overhead를 줄이기 위해 trace를 sampling한다.
* **The dashboard shows X.** — dashboard에 X가 보인다.
* **Metrics show the error rate increased.** — metrics상 error rate가 증가했다.
* **This metric dropped to zero.** — 이 metric이 0으로 떨어졌다.
* **We use tags to break down metrics by region.** — region별로 metric을 나누기 위해 tag를 사용한다.
* **High cardinality can make metrics expensive.** — high cardinality는 metrics 비용을 높일 수 있다.
* **We need to drill down by region, user, and service.** — region/user/service 기준으로 drill down해야 한다.
* **This metric is not actionable.** — 이 metric은 실제 조치로 이어지기 어렵다.

## Alerts / SLO

* **The alert fired at X.** — alert가 X시에 울렸다.
* **This alert is noisy.** — 이 alert는 noise가 많다.
* **This was a false positive.** — 이것은 false positive였다.
* **We need to reduce alert noise.** — alert noise를 줄여야 한다.
* **p95 latency crossed the threshold.** — p95 latency가 threshold를 넘었다.
* **p99 latency is too high.** — p99 latency가 너무 높다.
* **We monitor latency, traffic, errors, and saturation.** — latency, traffic, errors, saturation을 모니터링한다.
* **We use SLI, SLO, and SLA to measure reliability.** — reliability 측정에 SLI/SLO/SLA를 사용한다.
* **We burned through the error budget.** — error budget을 소진했다.
* **The burn rate is too high.** — burn rate가 너무 높다.
* **The baseline changed after deployment.** — 배포 후 baseline이 바뀌었다.
* **We need better monitoring for X.** — X에 대해 더 나은 monitoring이 필요하다.

---

# 10. Debugging / Testing

## Debugging

* **I can reproduce the issue locally.** — 로컬에서 이슈를 재현할 수 있다.
* **I can’t reproduce it locally.** — 로컬에서는 재현되지 않는다.
* **This only happens in production.** — 운영환경에서만 발생한다.
* **What are the repro steps?** — 재현 절차가 무엇인가?
* **The issue is intermittent.** — 이슈가 간헐적으로 발생한다.
* **This looks like a regression.** — regression처럼 보인다.
* **The symptom is X.** — 증상은 X다.
* **The root cause is X.** — 근본 원인은 X다.
* **I suspect X is the culprit.** — X가 원인으로 의심된다.
* **The stack trace points to X.** — stack trace가 X를 가리킨다.
* **I added more logging around X.** — X 주변에 logging을 더 추가했다.
* **I set a breakpoint here.** — 여기에 breakpoint를 걸었다.
* **I stepped through the code.** — 코드를 한 줄씩 따라갔다.
* **I inspected the value of X.** — X 값을 확인했다.
* **X is null when it reaches this method.** — 이 method에 도달했을 때 X가 null이다.
* **The exception is thrown before X.** — X 전에 exception이 던져진다.
* **The request times out after X seconds.** — request가 X초 후 timeout된다.
* **The failure happens only when X.** — 실패는 X일 때만 발생한다.
* **I isolated the issue to X.** — 이슈를 X로 분리했다.
* **I narrowed it down to X.** — 원인을 X로 좁혔다.
* **I ruled out X.** — X를 원인에서 배제했다.
* **I compared the working version with the broken version.** — 정상 버전과 깨진 버전을 비교했다.
* **I bisected the commits to find the bad change.** — 문제 commit을 찾기 위해 commit을 bisect했다.
* **The bug was introduced in X.** — bug는 X에서 들어왔다.
* **This is caused by a race condition.** — race condition 때문에 발생한다.
* **This is caused by an off-by-one error.** — off-by-one error 때문에 발생한다.
* **This is caused by missing validation.** — validation 누락 때문에 발생한다.
* **This is caused by a timing issue.** — timing issue 때문에 발생한다.

## Testing

* **I wrote a unit test for X.** — X에 대한 unit test를 작성했다.
* **I added an integration test for X.** — X에 대한 integration test를 추가했다.
* **We need an end-to-end test for this flow.** — 이 flow에는 E2E test가 필요하다.
* **The test uses a mock for X.** — test는 X에 대한 mock을 사용한다.
* **The test uses a stubbed response.** — test는 stubbed response를 사용한다.
* **The assertion checks that X.** — assertion은 X인지 확인한다.
* **We need to cover the edge case where X.** — X인 edge case를 cover해야 한다.
* **This improves test coverage.** — test coverage를 개선한다.
* **This test is flaky.** — 이 test는 flaky하다.
* **The test is flaky because it depends on timing.** — timing에 의존해서 flaky하다.
* **We need a smoke test for this flow.** — 이 flow에는 smoke test가 필요하다.
* **We need a load test before launch.** — launch 전에 load test가 필요하다.
* **The workaround is X.** — workaround는 X다.
* **The hotfix is to X.** — hotfix는 X하는 것이다.

---

# 11. PR / Code Review / Git

## PR / Review

* **I opened a PR for X.** — X에 대한 PR을 열었다.
* **This PR changes X.** — 이 PR은 X를 변경한다.
* **This PR is focused on X.** — 이 PR은 X에 집중한다.
* **This is out of scope for this PR.** — 이것은 이 PR 범위 밖이다.
* **This should be a separate PR.** — 이것은 별도 PR로 해야 한다.
* **I addressed the review comments.** — review comment를 반영했다.
* **I pushed a new commit.** — 새 commit을 push했다.
* **I updated the PR description.** — PR 설명을 업데이트했다.
* **I added tests for X.** — X에 대한 test를 추가했다.
* **I updated the documentation.** — 문서를 업데이트했다.
* **This is a nit.** — 사소한 지적이다.
* **This is non-blocking.** — merge를 막지는 않는다.
* **This is blocking.** — merge 전에 반드시 처리해야 한다.
* **LGTM.** — 좋아 보인다.
* **I’d rename X to Y for clarity.** — 명확성을 위해 X를 Y로 rename하겠다.
* **I’d extract this into a helper method.** — 이것을 helper method로 분리하겠다.
* **I’d avoid duplicating this logic.** — 이 로직 중복은 피하겠다.
* **This makes the code easier to read.** — 코드를 읽기 쉽게 만든다.
* **This makes the code harder to maintain.** — 코드를 유지보수하기 어렵게 만든다.
* **This changes the behavior of X.** — X의 동작을 바꾼다.
* **This might break existing clients.** — 기존 client를 깨뜨릴 수 있다.
* **Can we add a test for this case?** — 이 case에 대한 test를 추가할 수 있을까?
* **Can we keep this backward compatible?** — backward compatible하게 유지할 수 있을까?
* **Can we simplify this?** — 이것을 단순화할 수 있을까?
* **Let’s handle this in a follow-up PR.** — 이것은 follow-up PR에서 처리하자.

## Git / CI

* **I rebased my branch on main.** — branch를 main 위로 rebase했다.
* **I fixed the merge conflict.** — merge conflict를 해결했다.
* **I squashed the commits.** — commit들을 squash했다.
* **I cherry-picked the fix.** — fix commit을 cherry-pick했다.
* **I reverted the commit.** — commit을 revert했다.
* **I pulled the latest changes.** — 최신 변경사항을 pull했다.
* **I pushed the branch.** — branch를 push했다.
* **I merged the PR.** — PR을 merge했다.
* **The build is failing.** — build가 실패하고 있다.
* **The CI check is failing.** — CI check가 실패하고 있다.
* **The test failed in CI.** — test가 CI에서 실패했다.
* **This failure looks unrelated.** — 이 실패는 관련 없어 보인다.

---

# 12. Deployment / Release / Incident

## Deployment / Release

* **We rolled out the change gradually.** — 변경사항을 점진적으로 배포했다.
* **We rolled back the deployment.** — deployment를 rollback했다.
* **We rolled forward with a hotfix.** — hotfix로 roll forward했다.
* **We used a canary release.** — canary release를 사용했다.
* **Blue-green deployment reduces downtime.** — blue-green deployment는 downtime을 줄인다.
* **We put the new feature behind a flag.** — 새 feature를 feature flag 뒤에 두었다.
* **We disabled the feature flag.** — feature flag를 껐다.
* **We used the kill switch.** — kill switch를 사용했다.
* **We dark-launched the feature.** — feature를 dark launch했다.
* **We tested the new service with shadow traffic.** — shadow traffic으로 새 service를 테스트했다.
* **We need zero-downtime deployment.** — zero-downtime deployment가 필요하다.
* **The deployment pipeline runs tests automatically.** — deployment pipeline은 test를 자동 실행한다.
* **CI/CD reduces manual release steps.** — CI/CD는 수동 release step을 줄인다.
* **Environment parity prevents staging-only bugs.** — environment parity는 staging에서만 나는 bug를 줄인다.
* **Config drift caused the production issue.** — config drift가 production issue를 유발했다.
* **We need a rollback plan before release.** — release 전에 rollback plan이 필요하다.
* **We deployed during the maintenance window.** — maintenance window 동안 배포했다.
* **We stopped the rollout.** — rollout을 중단했다.

## Incident / Operations

* **We had a production incident.** — production incident가 있었다.
* **We had a partial outage.** — partial outage가 있었다.
* **The service was degraded.** — service가 degraded 상태였다.
* **The customer impact was limited to X.** — customer impact는 X에 제한됐다.
* **The blast radius was limited to one region.** — blast radius는 한 region에 제한됐다.
* **We triaged the issue.** — issue를 triage했다.
* **We declared a Sev 2 incident.** — Sev 2 incident로 선언했다.
* **The incident commander coordinated the response.** — incident commander가 대응을 조율했다.
* **We escalated this to the infra team.** — infra team에 escalate했다.
* **The on-call engineer got paged.** — on-call engineer가 page를 받았다.
* **I was on call.** — 내가 on-call이었다.
* **I got paged for X.** — X 때문에 page를 받았다.
* **We followed the runbook.** — runbook을 따랐다.
* **The mitigation was to disable the feature flag.** — mitigation은 feature flag를 끄는 것이었다.
* **The remediation is to fix the retry logic.** — remediation은 retry logic을 고치는 것이다.
* **A downstream service timed out.** — downstream service가 timeout됐다.
* **The upstream service returned 500.** — upstream service가 500을 반환했다.
* **A dependency failure caused the outage.** — dependency failure가 outage를 유발했다.
* **A traffic spike triggered the incident.** — traffic spike가 incident를 촉발했다.
* **The deployment changed the config.** — deployment가 config를 바꿨다.
* **Recovery took X minutes.** — recovery에 X분 걸렸다.
* **The root cause analysis showed X.** — RCA 결과 X가 나왔다.
* **We wrote a postmortem.** — postmortem을 작성했다.
* **The action item is to add better monitoring.** — action item은 더 나은 monitoring을 추가하는 것이다.
* **Each action item has an owner and a due date.** — 각 action item에는 owner와 due date가 있다.
* **We sent status updates every X minutes.** — X분마다 status update를 보냈다.
* **The system recovered after X.** — X 이후 system이 recovery됐다.

---

# 13. Cloud / Kubernetes / Infra

## Cloud / Infra

* **This runs on X instances.** — 이것은 X instance에서 실행된다.
* **We use object storage for files.** — file 저장에는 object storage를 사용한다.
* **We use a managed database.** — managed database를 사용한다.
* **The service runs in multiple availability zones.** — service는 여러 AZ에서 실행된다.
* **The region failed over to X.** — region이 X로 failover했다.
* **The VPC contains public and private subnets.** — VPC에는 public/private subnet이 있다.
* **IAM controls access to resources.** — IAM이 resource access를 제어한다.
* **The service account needs permission to X.** — service account는 X 권한이 필요하다.
* **Secrets should not be stored in source code.** — secret은 source code에 저장하면 안 된다.
* **We rotate secrets regularly.** — secret을 정기적으로 rotate한다.

## Kubernetes

* **The service runs in a container.** — service는 container에서 실행된다.
* **The image is built by the CI pipeline.** — image는 CI pipeline에서 build된다.
* **The pod was restarted.** — pod가 재시작됐다.
* **The pod was OOMKilled.** — pod가 memory 초과로 OOMKilled됐다.
* **The pod exceeded the memory limit.** — pod가 memory limit을 초과했다.
* **The readiness probe failed.** — readiness probe가 실패했다.
* **The liveness probe restarted the pod.** — liveness probe가 pod를 재시작했다.
* **The pod stopped receiving traffic.** — pod가 traffic을 받지 않게 됐다.
* **Autoscaling kicked in when CPU usage went above the threshold.** — CPU usage가 threshold를 넘자 autoscaling이 작동했다.
* **The HPA scaled the deployment from A to B replicas.** — HPA가 deployment를 A에서 B replica로 scale했다.
* **The config is stored in a ConfigMap.** — config는 ConfigMap에 저장된다.
* **Sensitive values are stored in Secrets.** — 민감한 값은 Secrets에 저장된다.
* **The service is exposed through an ingress.** — service는 ingress를 통해 노출된다.
* **Ingress handles external traffic.** — ingress는 외부 traffic을 처리한다.
* **Egress traffic goes through X.** — egress traffic은 X를 거친다.
* **A network policy blocks X.** — network policy가 X를 차단한다.
* **The service uses a persistent volume.** — service는 persistent volume을 사용한다.

---

# 14. Security / Auth

* **Authentication verifies who the user is.** — authentication은 사용자가 누구인지 확인한다.
* **Authorization checks what the user can access.** — authorization은 사용자가 무엇에 접근할 수 있는지 확인한다.
* **We pass a JWT in the Authorization header.** — Authorization header에 JWT를 전달한다.
* **OAuth lets users grant access without sharing passwords.** — OAuth는 password 공유 없이 access를 위임하게 해준다.
* **CORS is enforced by the browser.** — CORS는 browser가 강제한다.
* **TLS protects data in transit.** — TLS는 이동 중인 데이터를 보호한다.
* **mTLS authenticates both client and server.** — mTLS는 client와 server를 모두 인증한다.
* **We encrypt sensitive data at rest.** — 민감한 데이터는 저장 시 암호화한다.
* **We encrypt data in transit using TLS.** — 이동 중인 데이터는 TLS로 암호화한다.
* **Secrets should not be logged.** — secret은 log에 남기면 안 된다.
* **Services should run with least privilege.** — service는 least privilege로 실행되어야 한다.
* **We should avoid logging PII.** — PII는 log에 남기지 않아야 한다.
* **We mask sensitive fields in logs.** — log에서 민감한 field를 mask한다.
* **Audit logs help track sensitive operations.** — audit log는 민감한 작업 추적에 도움 된다.
* **Token rotation reduces security risk.** — token rotation은 security risk를 줄인다.
* **This could lead to privilege escalation.** — 이것은 privilege escalation으로 이어질 수 있다.
* **We need to validate input to prevent injection attacks.** — injection attack을 막기 위해 input validation이 필요하다.
* **We should sanitize user input.** — user input을 sanitize해야 한다.

---

# 15. 업무 상황 / 회의 / 협업

## 확인 / 요구사항 / 일정

* **I need more context.** — context가 더 필요하다.
* **For context, X.** — 배경 설명을 하자면 X다.
* **Just to confirm, X.** — 확인차 말하면 X다.
* **To clarify, X.** — 명확히 하자면 X다.
* **What’s the expected behavior?** — 기대 동작이 무엇인가?
* **What’s the actual behavior?** — 실제 동작이 무엇인가?
* **What are the repro steps?** — 재현 절차가 무엇인가?
* **What’s the priority?** — 우선순위가 무엇인가?
* **What’s the ETA?** — 예상 완료 시간이 언제인가?
* **I don’t have bandwidth this sprint.** — 이번 sprint에는 여력이 없다.
* **This is a blocker.** — 이것은 진행을 막는 이슈다.
* **This is not blocking.** — 이것은 진행을 막지는 않는다.
* **This is out of scope.** — 이것은 scope 밖이다.
* **This changed the scope.** — 이것이 scope를 바꿨다.
* **The acceptance criteria are X.** — acceptance criteria는 X다.
* **The open question is X.** — 아직 열려 있는 질문은 X다.
* **My assumption is X.** — 내 가정은 X다.

## 조율 / 소유권 / follow-up

* **We need alignment on X.** — X에 대해 방향을 맞춰야 한다.
* **The owner is X.** — owner는 X다.
* **The DRI is X.** — DRI는 X다.
* **We need stakeholder sign-off.** — stakeholder sign-off가 필요하다.
* **I’ll follow up on this.** — 이 건 follow up하겠다.
* **I’ll get back to you after I check X.** — X 확인 후 다시 말하겠다.
* **Let’s sync up on X.** — X에 대해 sync up하자.
* **Async update: X.** — 비동기 업데이트: X.
* **I’ll hand this off to X.** — 이것을 X에게 hand off하겠다.
* **Can you take over X?** — X를 take over해줄 수 있나?
* **This depends on X.** — 이것은 X에 의존한다.
* **We’re blocked by X.** — X 때문에 막혀 있다.
* **Let’s split this into smaller tasks.** — 이것을 더 작은 task로 나누자.
* **Let’s defer this.** — 이것은 미루자.
* **Let’s park this for now.** — 이것은 일단 보류하자.
* **Let’s circle back after X.** — X 이후 다시 논의하자.
* **I want to push back on the timeline.** — timeline에 대해 이의를 제기하고 싶다.
* **We need to negotiate the scope.** — scope를 조정해야 한다.
* **We should prioritize X over Y.** — Y보다 X를 우선해야 한다.
* **My proposal is to X.** — 내 제안은 X하는 것이다.
* **The main risk is X.** — 주요 risk는 X다.
* **We should de-risk this by X.** — X를 해서 risk를 줄여야 한다.

---

# 16. Behavioral / Project Deep Dive

## Project 설명

* **This project was about X.** — 이 프로젝트는 X에 관한 것이었다.
* **The business problem was X.** — 비즈니스 문제는 X였다.
* **The user-facing impact was X.** — 사용자 영향은 X였다.
* **The technical problem was X.** — 기술적 문제는 X였다.
* **The existing system had X.** — 기존 시스템에는 X가 있었다.
* **The old approach didn’t scale because X.** — 기존 접근은 X 때문에 scale되지 않았다.
* **We redesigned X to Y.** — X를 Y로 재설계했다.
* **We migrated from X to Y.** — X에서 Y로 migration했다.
* **We introduced X to solve Y.** — Y를 해결하기 위해 X를 도입했다.
* **We removed X because Y.** — Y 때문에 X를 제거했다.
* **The main component I built was X.** — 내가 만든 주요 component는 X였다.
* **X talks to Y through Z.** — X는 Z를 통해 Y와 통신한다.
* **X stores Y in Z.** — X는 Y를 Z에 저장한다.
* **X publishes an event when Y happens.** — Y가 발생하면 X가 event를 publish한다.
* **X consumes events from Y.** — X는 Y에서 event를 consume한다.
* **The main failure mode was X.** — 주요 failure mode는 X였다.
* **We handled failure by X.** — X해서 failure를 처리했다.
* **We added monitoring for X.** — X에 대한 monitoring을 추가했다.
* **We added alerts for X.** — X에 대한 alert를 추가했다.
* **We validated the change by X.** — X해서 변경사항을 검증했다.
* **We rolled it out gradually.** — 점진적으로 배포했다.
* **We kept it behind a feature flag.** — feature flag 뒤에 두었다.
* **We had a rollback plan.** — rollback plan이 있었다.
* **The migration had to be backward compatible.** — migration은 backward compatible해야 했다.
* **The biggest risk was X.** — 가장 큰 risk는 X였다.
* **We reduced the risk by X.** — X해서 risk를 줄였다.
* **The main limitation was X.** — 주요 한계는 X였다.
* **Long term, I would improve X.** — 장기적으로는 X를 개선하겠다.
* **This project shows that I can X.** — 이 프로젝트는 내가 X할 수 있음을 보여준다.
* **This is relevant to this role because X.** — X 때문에 이 role과 관련 있다.

## Behavioral / STAR

* **One project I’m proud of is X.** — 자랑스럽게 생각하는 프로젝트는 X다.
* **The goal was to X.** — 목표는 X하는 것이었다.
* **The main challenge was X.** — 주요 어려움은 X였다.
* **My role was to X.** — 내 역할은 X하는 것이었다.
* **I was responsible for X.** — X를 담당했다.
* **I worked closely with X.** — X와 긴밀히 협업했다.
* **I had to balance X and Y.** — X와 Y 사이에서 균형을 잡아야 했다.
* **The main trade-off was X.** — 주요 trade-off는 X였다.
* **I chose X over Y because Z.** — Z 때문에 Y보다 X를 선택했다.
* **I made this decision because X.** — X 때문에 이 결정을 했다.
* **The result was X.** — 결과는 X였다.
* **This improved X by Y%.** — X를 Y% 개선했다.
* **This reduced X from A to B.** — X를 A에서 B로 줄였다.
* **We measured success by X.** — X로 성공을 측정했다.
* **I made a mistake by X.** — X해서 실수했다.
* **The mistake caused X.** — 그 실수는 X를 유발했다.
* **I fixed it by X.** — X해서 고쳤다.
* **I learned that X.** — X라는 것을 배웠다.
* **Next time, I would X.** — 다음에는 X하겠다.
* **In hindsight, I should have X.** — 돌이켜보면 X했어야 했다.
* **I disagreed with X because Y.** — Y 때문에 X에 동의하지 않았다.
* **I pushed back on X.** — X에 이의를 제기했다.
* **I explained my concern by X.** — X를 통해 우려를 설명했다.
* **We eventually aligned on X.** — 결국 X에 대해 방향을 맞췄다.
* **I handled the conflict by X.** — X해서 갈등을 처리했다.
* **I took ownership of X.** — X에 대한 ownership을 가졌다.
* **I unblocked the team by X.** — X해서 팀이 막힌 것을 풀었다.
* **I helped the team by X.** — X해서 팀을 도왔다.
* **I received feedback that X.** — X라는 feedback을 받았다.
* **I changed my approach by X.** — X해서 접근 방식을 바꿨다.
* **The hardest part was X.** — 가장 어려운 부분은 X였다.
* **The most important lesson was X.** — 가장 중요한 교훈은 X였다.
* **I had to work under ambiguity.** — 불확실한 상황에서 일해야 했다.
* **I clarified the requirements by X.** — X해서 요구사항을 명확히 했다.
* **I prioritized X over Y.** — Y보다 X를 우선했다.
* **I escalated X to Y.** — X를 Y에게 escalate했다.
* **This experience taught me X.** — 이 경험은 X를 가르쳐줬다.
* **That’s why I now X.** — 그래서 이제 X한다.
* **To summarize, X.** — 요약하면 X다.

---

# 최종 사용법

이 리스트는 **읽기용이 아니라 말하기용**이다.

하루에 이렇게 하면 된다.

1. **10개 고르기**
2. 각 chunk로 **내 상황 문장 3개씩 만들기**
3. 30문장을 소리 내서 말하기
4. 다음날 한국어 뜻만 보고 다시 영어로 말하기

예:

**The database is the source of truth.**

변형:

**PostgreSQL is the source of truth.**
**Redis is not the source of truth; it’s just a cache.**
**The source of truth should be clear to avoid inconsistency.**

이렇게 변형이 되면 active다.
그냥 뜻만 알면 아직 passive다.
