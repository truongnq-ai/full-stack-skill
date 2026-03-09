# Examples — Java Concurrency (Refined)

## Example 1 — Virtual Threads

**Input**
```java
Executors.newFixedThreadPool(100)
```

**Output**
```java
Executors.newVirtualThreadPerTaskExecutor()
```

**Why**
- Scales I/O workloads.

---

## Example 2 — Structured Concurrency

**Input**
```java
var f1 = exec.submit(...); var f2 = exec.submit(...)
```

**Output**
```java
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) { ... }
```

**Why**
- Better cancellation handling.
