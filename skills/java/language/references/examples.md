# Examples — Java Language

## Example 1 — Record DTO

**Input**
```java
class UserDto { private final String id; private final String name; }
```

**Output**
```java
public record UserDto(String id, String name) {}
```

**Why**
- Immutable and concise.

---

## Example 2 — Pattern Matching

**Input**
```java
if (obj instanceof String) {
  String s = (String) obj;
}
```

**Output**
```java
if (obj instanceof String s) { /* use s */ }
```

**Why**
- Cleaner, safer casting.
