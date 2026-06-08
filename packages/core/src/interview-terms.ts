// Developer/CS vocabulary fed to iOS speech recognition as `contextualStrings` so it biases toward
// dev jargon instead of mishearing it as general English ("deque" → "deck", "HashMap" → "hashtag",
// "idempotency" → garbage). These are phrases the learner is likely to SAY while explaining code.
export const INTERVIEW_DEV_TERMS: string[] = [
  // data structures
  "HashMap", "HashSet", "ArrayList", "LinkedList", "ArrayDeque", "deque", "PriorityQueue",
  "TreeMap", "LinkedHashMap", "trie", "stack", "queue", "heap", "binary search tree", "BST",
  "adjacency list", "graph", "node", "pointer", "linked list", "hash table", "bucket", "Map", "Set",
  // algorithms
  "BFS", "DFS", "breadth first search", "depth first search", "two pointers", "sliding window",
  "binary search", "dynamic programming", "memoization", "backtracking", "recursion", "greedy",
  "merge sort", "quicksort", "top K", "union find", "lower bound", "upper bound", "merge intervals",
  "in place", "divide and conquer",
  // complexity
  "O of one", "O of n", "O of log n", "O of n log n", "big O", "constant time", "linear time",
  "logarithmic time", "amortized", "time complexity", "space complexity",
  // backend concepts
  "idempotency", "idempotent", "idempotency key", "reconciliation", "reconcile", "optimistic locking",
  "pessimistic locking", "transaction", "ACID", "isolation level", "race condition", "deadlock",
  "mutex", "concurrency", "thread safe", "unique constraint", "upsert", "foreign key", "index",
  "indexing", "query plan", "full table scan", "throughput", "latency", "deduplication", "dedupe",
  "outbox", "dead letter queue", "DLQ", "at least once", "exactly once", "source of truth",
  "audit log", "event sourcing", "state machine", "observability", "trace id", "structured log",
  "version column", "eventual consistency", "sharding", "partition",
  // OOP / design patterns
  "Strategy pattern", "Factory pattern", "Singleton", "Observer pattern", "Builder", "Adapter",
  "Decorator", "Template Method", "dependency injection", "interface", "abstract class",
  "polymorphism", "encapsulation", "inheritance", "open closed principle", "SOLID", "composition",
  // infra / common dev speech
  "API", "endpoint", "microservice", "schema", "migration", "cache", "Redis", "Postgres", "Kafka",
  "load balancer", "rate limiter", "token bucket", "LRU cache", "TTL", "payload", "serialize",
  "deserialize", "null pointer", "stack trace", "refactor", "rollback", "deploy", "retry", "backoff",
  // Opendoor domain
  "Opendoor", "inventory", "ledger", "listing", "escrow", "valuation",
];
