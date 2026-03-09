# Examples — Spring Boot Best Practices (Refined)

## Example 1 — Service Layer

**Input**
```java
@Controller
class UserController { @Autowired UserRepository repo; }
```

**Output**
```java
@Controller
class UserController { private final UserService service; }
```

**Why**
- Clean layering.

---

## Example 2 — Validation

**Input**
```java
public record CreateUser(String email) {}
```

**Output**
```java
public record CreateUser(@Email String email) {}
```

**Why**
- Enforces input constraints.
