# Examples — Go Architecture (Refined)

## Example 1 — Clean Layers

**Input**
```go
handler -> db directly
```

**Output**
```go
handler -> service -> repository
```

**Why**
- Separation of concerns.

---

## Example 2 — Interfaces at Boundaries

**Input**
```go
type UserService struct{ repo *Repo }
```

**Output**
```go
type UserService struct{ repo UserRepo }
```

**Why**
- Enables mocking and decoupling.
