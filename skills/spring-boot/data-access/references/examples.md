# Examples — Spring Boot Data Access (Refined)

## Example 1 — Transaction Boundary

**Input**
```java
public void create(){ repo.save(a); repo.save(b); }
```

**Output**
```java
@Transactional public void create(){ repo.save(a); repo.save(b); }
```

**Why**
- Ensures atomicity.

---

## Example 2 — DTO Mapping

**Input**
```java
return entity;
```

**Output**
```java
return mapper.toDto(entity);
```

**Why**
- Avoids leaking entities.
