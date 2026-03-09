# Examples — Spring Boot Microservices (Refined)

## Example 1 — Circuit Breaker

**Input**
```java
restTemplate.getForObject(url, String.class);
```

**Output**
```java
@CircuitBreaker(name="user")
public String call(){...}
```

**Why**
- Prevents cascading failures.

---

## Example 2 — Retry w/ Backoff

**Input**
```java
callRemote();
```

**Output**
```java
@Retry(name="user", fallbackMethod="fallback")
```

**Why**
- Handles transient failures.
