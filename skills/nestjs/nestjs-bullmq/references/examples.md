# Examples — NestJS BullMQ (Refined)

## Example 1 — Job Options

**Input**
```ts
queue.add('email', payload)
```

**Output**
```ts
queue.add('email', payload, { attempts: 3, backoff: { type:'exponential', delay: 500 } })
```

**Why**
- Adds retry strategy.

---

## Example 2 — Idempotency

**Input**
```ts
queue.add('invoice', data)
```

**Output**
```ts
queue.add('invoice', data, { jobId: `invoice:${id}` })
```

**Why**
- Prevents duplicate jobs.
