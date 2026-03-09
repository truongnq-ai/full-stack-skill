# Examples — Go Concurrency (Refined)

## Example 1 — Context Cancellation

**Input**
```go
go doWork()
```

**Output**
```go
go doWork(ctx)
```

**Why**
- Allows cancellation and timeout.

---

## Example 2 — Worker Pool

**Input**
```go
for _, job := range jobs { go handle(job) }
```

**Output**
```go
jobsCh := make(chan Job); for i:=0;i<n;i++ { go worker(jobsCh) }
```

**Why**
- Limits concurrency.
