# Examples — Go Database (Refined)

## Example 1 — Context in Queries

**Input**
```go
rows, _ := db.Query("SELECT ...")
```

**Output**
```go
rows, _ := db.QueryContext(ctx, "SELECT ...")
```

**Why**
- Supports deadlines and cancellation.

---

## Example 2 — Prepared Statements

**Input**
```go
db.Query("SELECT * FROM users WHERE id="+id)
```

**Output**
```go
db.Query("SELECT * FROM users WHERE id=$1", id)
```

**Why**
- Prevents injection.
