# Examples — Spring Boot API Design (Refined)

## Example 1 — DTO Response

**Input**
```java
return entity;
```

**Output**
```java
return mapper.toDto(entity);
```

**Why**
- Avoids leaking JPA entities.

---

## Example 2 — ProblemDetails

**Input**
```java
throw new RuntimeException("bad");
```

**Output**
```java
throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "bad");
```

**Why**
- Proper HTTP semantics.
