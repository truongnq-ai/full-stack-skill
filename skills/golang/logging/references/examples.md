# Examples — Go Logging (Refined)

## Example 1 — Structured Log

**Input**
```go
log.Printf("error: %v", err)
```

**Output**
```go
logger.Error("db_error", "err", err, "requestId", id)
```

**Why**
- Machine-parsable logs.

---

## Example 2 — Request ID

**Input**
```go
// no request id
```

**Output**
```go
ctx = context.WithValue(ctx, "requestId", id)
```

**Why**
- Traceability across services.
