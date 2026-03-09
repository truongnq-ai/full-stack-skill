# Examples — NestJS Scheduling (Refined)

## Example 1 — Cron Job

**Input**
```ts
setInterval(run, 60000)
```

**Output**
```ts
@Cron('0 * * * *')
handleHourly(){ run(); }
```

**Why**
- Uses Nest scheduler with lifecycle control.

---

## Example 2 — Locking

**Input**
```ts
// multiple instances run job
```

**Output**
```ts
// use distributed lock (Redis) before job
```

**Why**
- Prevents duplicate execution.
