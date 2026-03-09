# Examples — Go Configuration (Refined)

## Example 1 — Env Validation

**Input**
```go
os.Getenv("PORT")
```

**Output**
```go
cfg := config.Load(); cfg.Validate()
```

**Why**
- Fails fast on invalid config.

---

## Example 2 — Default Values

**Input**
```go
port := os.Getenv("PORT")
```

**Output**
```go
port := getenv("PORT", "8080")
```

**Why**
- Safe defaults.
