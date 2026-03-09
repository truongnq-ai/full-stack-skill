# Examples — Go API Server (Refined)

## Example 1 — Health Check

**Input**
```go
// no health endpoint
```

**Output**
```go
router.GET("/health", healthHandler)
```

**Why**
- Enables monitoring.

---

## Example 2 — Graceful Shutdown

**Input**
```go
http.ListenAndServe(":8080", router)
```

**Output**
```go
srv.Shutdown(ctx)
```

**Why**
- Allows in-flight requests to finish.
