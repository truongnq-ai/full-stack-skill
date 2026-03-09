# Examples — Spring Boot Testing (Refined)

## Example 1 — Slice Test

**Input**
```java
// full context for controller test
```

**Output**
```java
@WebMvcTest(UserController.class)
```

**Why**
- Faster focused tests.

---

## Example 2 — Testcontainers

**Input**
```java
// mock DB for integration
```

**Output**
```java
@Testcontainers
static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16");
```

**Why**
- Realistic integration tests.
