# Examples — Go Error Handling (Refined)

## Example 1 — Wrap Error

**Input**
```go
return err
```

**Output**
```go
return fmt.Errorf("db lookup: %w", err)
```

**Why**
- Preserves context.

---

## Example 2 — Sentinel

**Input**
```go
if err != nil { ... }
```

**Output**
```go
if errors.Is(err, ErrNotFound) { ... }
```

**Why**
- Consistent error checks.
