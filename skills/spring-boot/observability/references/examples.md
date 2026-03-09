# Examples — Spring Boot Observability (Refined)

## Example 1 — Structured Logs

**Input**
```java
log.info("error " + err);
```

**Output**
```java
log.error("db_error", kv("requestId", id), kv("err", err));
```

**Why**
- Machine-parsable logs.

---

## Example 2 — Metrics

**Input**
```java
// no metrics
```

**Output**
```java
meterRegistry.counter("user.created").increment();
```

**Why**
- Enables monitoring.
