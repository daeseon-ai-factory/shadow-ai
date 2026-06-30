. 코드 설명 필수 표현

코드를 영어로 설명할 때 제일 많이 쓰는 뼈대.

표현	뜻
This function takes X and returns Y.	이 함수는 X를 받아서 Y를 반환한다
This method is responsible for X.	이 메서드는 X를 담당한다
This class handles X.	이 클래스는 X를 처리한다
This code checks whether X.	이 코드는 X인지 확인한다
This validates the input.	입력값을 검증한다
This converts X into Y.	X를 Y로 변환한다
This maps X to Y.	X를 Y에 매핑한다
This filters out invalid items.	유효하지 않은 항목을 걸러낸다
This groups items by X.	항목들을 X 기준으로 묶는다
This sorts the list by X.	리스트를 X 기준으로 정렬한다
This iterates over the list.	리스트를 순회한다
This loops through all users.	모든 사용자를 반복문으로 돈다
This exits early if X is null.	X가 null이면 일찍 종료한다
This uses a guard clause.	guard clause를 사용한다
This handles the happy path.	정상 흐름을 처리한다
This handles the failure path.	실패 흐름을 처리한다
This handles edge cases.	예외/경계 케이스를 처리한다
This throws an exception if X.	X이면 예외를 던진다
This returns null if X.	X이면 null을 반환한다
This mutates the object in place.	객체를 제자리에서 변경한다
This creates a new copy instead of mutating the original.	원본을 바꾸지 않고 새 복사본을 만든다
This has a side effect.	side effect가 있다
This is a pure function.	순수 함수다
This delegates X to Y.	X 처리를 Y에게 위임한다
This abstracts away X.	X를 추상화해서 숨긴다
This wraps X with Y.	X를 Y로 감싼다
This is the entry point.	여기가 진입점이다
This is the call site.	여기가 호출 지점이다
The caller passes X into this method.	호출자가 X를 이 메서드에 넘긴다
The callee returns Y.	호출받은 함수가 Y를 반환한다

실제 설명:

This function takes a list of users and returns only active users. It filters out inactive users and sorts the result by created date.
이 함수는 사용자 리스트를 받아 active user만 반환합니다. inactive user를 걸러내고 결과를 생성일 기준으로 정렬합니다.

2. 코드 구조/리딩 용어

이건 코드를 보면서 말할 때 필요하다.

표현	뜻
control flow	실행 흐름
data flow	데이터 흐름
execution path	실행 경로
branch	분기
condition	조건
loop	반복문
nested loop	중첩 반복문
recursion	재귀
base case	재귀 종료 조건
recursive case	재귀 호출 케이스
helper function	보조 함수
utility function	유틸 함수
wrapper	감싸는 코드
adapter	맞춰주는 계층/객체
interface	인터페이스
implementation	구현체
dependency	의존성
side effect	부작용
mutable	변경 가능한
immutable	변경 불가능한
in-place	제자리에서
copy-on-write	쓸 때 복사
null-safe	null에 안전한
thread-safe	멀티스레드에 안전한
off-by-one error	인덱스 하나 차이 버그
race condition	경쟁 상태
dead code	사용되지 않는 코드
legacy code	오래된 기존 코드
technical debt	기술 부채

박을 문장:

The control flow is simple, but the data flow is hard to follow.
실행 흐름은 단순하지만 데이터 흐름은 따라가기 어렵습니다.

This method has a side effect because it updates the object in place.
이 메서드는 객체를 제자리에서 수정하기 때문에 side effect가 있습니다.

3. 코딩테스트 필수 표현

코테에서 말로 설명할 때 필요한 것들.

표현	뜻
brute force	완전탐색
optimize	최적화하다
time complexity	시간복잡도
space complexity	공간복잡도
Big O	빅오 표기
constant time	O(1)
linear time	O(n)
quadratic time	O(n²)
logarithmic time	O(log n)
trade space for time	공간을 써서 시간을 줄이다
hash map	해시맵
hash set	해시셋
two pointers	투 포인터
sliding window	슬라이딩 윈도우
prefix sum	누적합
stack	스택
queue	큐
deque	덱
heap / priority queue	힙 / 우선순위 큐
binary search	이분 탐색
DFS	깊이 우선 탐색
BFS	너비 우선 탐색
backtracking	백트래킹
dynamic programming	동적 계획법
memoization	메모이제이션
tabulation	테이블 기반 DP
greedy	그리디
graph traversal	그래프 순회
adjacency list	인접 리스트
topological sort	위상 정렬
union-find	유니온 파인드
trie	트라이
bitmask	비트마스크
invariant	항상 유지되는 조건
edge case	경계 케이스
base case	기본 케이스
pruning	가지치기

코테 설명 문장:

I’d start with a brute-force solution and then optimize it.
먼저 완전탐색으로 시작하고 그다음 최적화하겠습니다.

The brute-force approach takes O(n²), but we can reduce it to O(n) using a hash map.
완전탐색은 O(n²)이지만, 해시맵을 사용하면 O(n)으로 줄일 수 있습니다.

The invariant is that the window contains at most k distinct characters.
불변 조건은 window 안에 최대 k개의 서로 다른 문자만 있다는 것입니다.

We move the left pointer when the window becomes invalid.
window가 유효하지 않게 되면 left pointer를 이동합니다.

The base case is when the index reaches the end of the array.
base case는 index가 배열 끝에 도달했을 때입니다.

We backtrack by undoing the previous choice.
이전 선택을 되돌려서 backtrack합니다.

4. 디버깅/테스트 실무 표현
표현	뜻
reproduce the issue	이슈를 재현하다
repro steps	재현 절차
reproducible	재현 가능한
intermittent issue	가끔 발생하는 이슈
flaky test	가끔 실패하는 테스트
regression	예전엔 되던 게 다시 깨짐
root cause	근본 원인
symptom	증상
culprit	원인으로 의심되는 것
stack trace	스택 트레이스
log line	로그 한 줄
breakpoint	중단점
inspect a variable	변수 값을 확인하다
step through the code	코드를 한 줄씩 따라가다
isolate the issue	이슈를 분리하다
narrow it down to X	원인을 X로 좁히다
rule out X	X를 원인에서 배제하다
bisect	변경분을 반씩 나눠 원인 찾기
hotfix	긴급 수정
patch	패치
workaround	우회책
smoke test	기본 동작 확인 테스트
unit test	단위 테스트
integration test	통합 테스트
end-to-end test	E2E 테스트
test fixture	테스트 준비 데이터/환경
mock	가짜 객체
stub	고정 응답 가짜 구현
assertion	검증문
test coverage	테스트 커버리지

박을 문장:

I can reproduce the issue locally.
로컬에서 이슈를 재현할 수 있습니다.

I can’t reproduce it locally, but it happens in production.
로컬에서는 재현이 안 되지만 운영환경에서는 발생합니다.

I checked the stack trace and narrowed it down to the cache layer.
스택 트레이스를 확인했고 원인을 캐시 계층으로 좁혔습니다.

This looks like a regression from the last deployment.
이건 지난 배포로 인한 regression처럼 보입니다.

The test is flaky because it depends on timing.
이 테스트는 타이밍에 의존해서 flaky합니다.

5. 시스템디자인 필수 표현

이건 면접에서 바로 써야 한다.

표현	뜻
functional requirements	기능 요구사항
non-functional requirements	비기능 요구사항
constraints	제약조건
scale estimate	규모 추정
QPS	초당 요청 수
read/write ratio	읽기/쓰기 비율
latency requirement	지연 시간 요구사항
availability	가용성
durability	내구성
consistency	일관성
scalability	확장성
reliability	신뢰성
SLA	서비스 계약 수준
SLO	내부 목표 수준
load balancer	로드밸런서
stateless service	상태 없는 서비스
stateful service	상태 있는 서비스
database	데이터베이스
cache	캐시
message queue	메시지 큐
object storage	객체 스토리지
CDN	콘텐츠 전송 네트워크
sharding	샤딩
partitioning	파티셔닝
partition key	파티션 키
hot key	특정 키에 트래픽 몰림
hot partition	특정 파티션에 부하 몰림
replication	복제
leader/follower	리더/팔로워 구조
quorum	과반 합의
failover	장애 시 전환
read path	읽기 경로
write path	쓰기 경로
critical path	전체 지연에 직접 영향 주는 경로
bottleneck	병목
fan-out on write	쓸 때 여러 곳에 퍼뜨림
fan-out on read	읽을 때 여러 곳에서 모음
push model	서버가 밀어주는 모델
pull model	클라이언트가 가져가는 모델
rate limiting	요청 제한
idempotency	여러 번 호출해도 안전함
eventual consistency	결과적 일관성
strong consistency	강한 일관성
single point of failure	단일 장애 지점
backpressure	처리 속도 제어
load shedding	일부 요청 버려서 전체 보호
circuit breaker	장애 전파 차단

박을 문장:

At a high level, I would split the system into an API layer, a database, a cache, and a message queue.
큰 그림에서는 API 계층, 데이터베이스, 캐시, 메시지 큐로 나누겠습니다.

The read path goes through the cache first, then falls back to the database on a cache miss.
읽기 경로는 먼저 캐시를 거치고, cache miss가 나면 DB로 fallback합니다.

The write path updates the database first and then publishes an event.
쓰기 경로는 먼저 DB를 업데이트하고 그다음 이벤트를 발행합니다.

The main trade-off is between consistency and latency.
주요 트레이드오프는 일관성과 지연 시간 사이에 있습니다.

The main bottleneck would be the database, so we need caching and proper indexing.
주요 병목은 DB일 가능성이 크므로 캐싱과 적절한 인덱싱이 필요합니다.

6. API / wire / contract 실무 표현

아까 목록에 있었지만, 이건 다시 박아야 한다.

표현	뜻
on the wire	네트워크로 실제 전송되는 형태
over the wire	네트워크를 통해
wire format	전송 포맷
wire protocol	전송 프로토콜
in memory	메모리 안에서
on disk	디스크에 저장된 형태
at rest	저장된 상태
in transit	이동 중인 상태
API contract	API 약속/계약
breaking change	기존 클라이언트를 깨는 변경
backward compatible	하위 호환
forward compatible	상위 호환
request payload	요청 본문
response body	응답 본문
headers	헤더
metadata	부가 정보
schema evolution	스키마 변경/진화
required field	필수 필드
optional field	선택 필드
unknown field	모르는 필드
implementation detail	구현 세부사항
public interface	외부에 드러난 인터페이스
internal representation	내부 표현
external representation	외부 표현

박을 문장:

In memory, it’s a Java object. On the wire, it’s serialized as JSON.
메모리에서는 Java 객체이고, 네트워크로는 JSON으로 직렬화됩니다.

The internal model can change, but the API contract should remain stable.
내부 모델은 바뀔 수 있지만 API 계약은 안정적으로 유지되어야 합니다.

Removing this field would be a breaking change for existing clients.
이 필드를 제거하면 기존 클라이언트에게 breaking change가 됩니다.

The client should ignore unknown fields for forward compatibility.
클라이언트는 forward compatibility를 위해 모르는 필드를 무시해야 합니다.

7. PR / code review 실무 표현
표현	뜻
PR / pull request	코드 변경 요청
code review	코드 리뷰
review comment	리뷰 코멘트
address comments	코멘트를 반영하다
LGTM	Looks good to me
nit	사소한 지적
non-blocking	merge를 막지는 않는 의견
blocking	merge 전에 반드시 고쳐야 함
follow-up PR	후속 PR
scope	범위
out of scope	범위 밖
scope creep	범위가 점점 커짐
refactor	리팩터링
readability	가독성
maintainability	유지보수성
duplication	중복
dead code	죽은 코드
cleanup	정리
tech debt	기술 부채
migration plan	마이그레이션 계획
rollback plan	롤백 계획
merge conflict	머지 충돌
rebase	리베이스
squash commits	커밋 합치기
cherry-pick	특정 커밋만 가져오기

박을 문장:

This is a nit, but I’d rename this variable for clarity.
사소한 의견이지만, 명확성을 위해 이 변수명을 바꾸겠습니다.

This is non-blocking, but we should clean it up in a follow-up PR.
merge를 막지는 않지만, 후속 PR에서 정리하는 게 좋습니다.

This change is out of scope for this PR.
이 변경은 이 PR의 범위 밖입니다.

I addressed the review comments and pushed a new commit.
리뷰 코멘트를 반영하고 새 커밋을 푸시했습니다.

8. 실무 회의/업무 조율 표현
표현	뜻
blocker	진행을 막는 이슈
dependency	의존성
ETA	예상 완료 시간
timeline	일정
priority	우선순위
ownership	담당/소유권
owner	담당자
DRI	최종 책임자
stakeholder	이해관계자
alignment	방향 맞춤
action item	후속 조치
follow up	후속 확인
handoff	인계
sync up	상황 맞추기
heads-up	미리 알림
context	배경
scope	범위
trade-off	트레이드오프
risk	리스크
mitigation	완화책
escalate	상위/다른 팀에 올리다
defer	미루다
park this	일단 보류하다
circle back	나중에 다시 논의하다
sanity check	말이 되는지 빠르게 확인

박을 문장:

This is a blocker for deployment.
이건 배포를 막는 이슈입니다.

I need to sync up with the infra team first.
먼저 인프라 팀과 상황을 맞춰야 합니다.

Just a heads-up, this change may affect existing clients.
미리 말씀드리면, 이 변경은 기존 클라이언트에 영향을 줄 수 있습니다.

Let’s park this for now and circle back after we confirm the requirements.
이건 일단 보류하고 요구사항 확인 후 다시 논의합시다.

9. 운영/배포/장애 대응 표현
표현	뜻
production	운영환경
staging	스테이징
dev environment	개발환경
roll out	배포하다
roll back	롤백하다
canary release	일부 트래픽에 먼저 배포
blue-green deployment	두 환경 전환 배포
feature flag	기능 플래그
kill switch	긴급 차단 스위치
dark launch	사용자에게 안 보이게 배포
shadow traffic	실제 트래픽 복사 테스트
zero-downtime deployment	무중단 배포
incident	장애
outage	서비스 중단
degradation	성능 저하
mitigation	임시 완화
remediation	근본 해결
root cause analysis	근본 원인 분석
postmortem	장애 회고
runbook	장애 대응 절차서
on-call	장애 대응 당번
page	장애 알림 호출
alert fatigue	알림 피로
false positive	잘못 울린 알림
blast radius	장애 영향 범위

박을 문장:

We rolled out the change behind a feature flag.
변경사항을 feature flag 뒤에 두고 배포했습니다.

The error rate spiked, so we rolled back the deployment.
에러율이 급증해서 배포를 롤백했습니다.

The mitigation was to disable the feature flag.
임시 완화책은 feature flag를 끄는 것이었습니다.

The blast radius was limited to one region.
장애 영향 범위는 한 리전에 제한되었습니다.

10. 클라우드/인프라/Kubernetes 기본 표현

백엔드 실무면 이것도 점점 필요하다.

표현	뜻
instance	서버 인스턴스
container	컨테이너
image	컨테이너 이미지
pod	Kubernetes pod
node	클러스터 노드
cluster	클러스터
service discovery	서비스 탐색
ingress	외부 트래픽 진입
egress	외부로 나가는 트래픽
load balancer	로드밸런서
autoscaling	자동 확장
horizontal pod autoscaler	HPA
resource limits	리소스 제한
CPU limit	CPU 제한
memory limit	메모리 제한
OOMKilled	메모리 초과로 종료됨
health check	상태 확인
liveness probe	살아있는지 확인
readiness probe	트래픽 받을 준비됐는지 확인
config map	설정 저장
secret	비밀값 저장
volume	볼륨
persistent volume	영구 볼륨
network policy	네트워크 정책