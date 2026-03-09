# Examples — Java Best Practices

## Example 1 — Static Factory

**Input**
```java
new User("id", "name");
```

**Output**
```java
User.of("id", "name");
```

**Why**
- Clear intent and flexibility.

---

## Example 2 — Fail Fast

**Input**
```java
void save(User u) { repo.save(u); }
```

**Output**
```java
void save(User u) { Objects.requireNonNull(u); repo.save(u); }
```

**Why**
- Prevents hidden null errors.
