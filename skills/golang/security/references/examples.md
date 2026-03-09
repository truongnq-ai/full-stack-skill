# Examples — Go Security (Refined)

## Example 1 — Validate Input

**Input**
```go
json.NewDecoder(r.Body).Decode(&req)
```

**Output**
```go
if err := validate.Struct(req); err != nil { ... }
```

**Why**
- Rejects invalid payloads.

---

## Example 2 — SQL Injection

**Input**
```go
db.Query("SELECT * FROM users WHERE id="+id)
```

**Output**
```go
db.Query("SELECT * FROM users WHERE id=$1", id)
```

**Why**
- Parameterized queries.
