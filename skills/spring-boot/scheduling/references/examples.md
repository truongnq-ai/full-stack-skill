# Examples — Spring Boot Scheduling (Refined)

## Example 1 — Cron

**Input**
```java
new Timer().schedule(...)
```

**Output**
```java
@Scheduled(cron = "0 0 * * * *")
```

**Why**
- Uses Spring scheduler.

---

## Example 2 — Locking

**Input**
```java
// multiple instances run job
```

**Output**
```java
// use ShedLock or distributed lock
```

**Why**
- Prevents duplicate jobs.
