# Examples — Spring Boot Architecture

## Example 1 — DTO vs Entity

**Input**
```java
@GetMapping("/users")
List<UserEntity> list() { return repo.findAll(); }
```

**Output**
```java
@GetMapping("/users")
List<UserDto> list() { return service.list(); }
```

**Why**
- Avoids leaking JPA entities.

---

## Example 2 — Layer Dependency

**Input**
```java
@Controller
class UserController { private final UserRepository repo; }
```

**Output**
```java
@Controller
class UserController { private final UserService service; }
```

**Why**
- Controller depends on Service, not Repository.
