# Examples — Go Testing (Refined)

## Example 1 — Table Tests

**Input**
```go
func TestX(t *testing.T) { /* single case */ }
```

**Output**
```go
for _, tc := range cases { t.Run(tc.name, func(t *testing.T){...}) }
```

**Why**
- Covers multiple scenarios.

---

## Example 2 — Testcontainers

**Input**
```go
// mock DB
```

**Output**
```go
// spin dockerized postgres for integration
```

**Why**
- Realistic integration tests.
