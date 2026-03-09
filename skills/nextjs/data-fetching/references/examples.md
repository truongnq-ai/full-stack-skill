# Examples — Next.js Data Fetching

## Example 1 — Cache Control

**Input**
```ts
const res = await fetch(url);
```

**Output**
```ts
const res = await fetch(url, { cache: 'no-store' });
```

**Why**
- Prevents stale data when freshness is required.

---

## Example 2 — Parallel Fetches

**Input**
```ts
const a = await fetchA();
const b = await fetchB();
```

**Output**
```ts
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

**Why**
- Reduces latency by fetching concurrently.
