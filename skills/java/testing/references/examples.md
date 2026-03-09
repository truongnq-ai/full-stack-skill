# Examples — Java Testing (Refined)

## Example 1 — Parameterized Test

**Input**
```java
@Test void test(){...}
```

**Output**
```java
@ParameterizedTest @ValueSource(strings={"a","b"})
```

**Why**
- Covers multiple inputs.

---

## Example 2 — Testcontainers

**Input**
```java
// mock DB
```

**Output**
```java
@Container static PostgreSQLContainer<?> db = new PostgreSQLContainer<>("postgres:16");
```

**Why**
- Real integration tests.
