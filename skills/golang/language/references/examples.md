# Examples — Go Language (Refined)

## Example 1 — Error Handling

**Input**
```go
if err != nil { return nil }
```

**Output**
```go
if err != nil { return nil, err }
```

**Why**
- Avoids swallowing errors.

---

## Example 2 — Slices

**Input**
```go
var items []T; for _, x := range src { items = append(items, x) }
```

**Output**
```go
items := make([]T, 0, len(src))
```

**Why**
- Reduces allocations.
