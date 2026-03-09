# Examples — Next.js Rendering (Refined)

## Example 1 — Dynamic Rendering

**Input**
```ts
fetch(url)
```

**Output**
```ts
fetch(url, { cache: 'no-store' })
```

**Why**
- Forces request-time rendering.

---

## Example 2 — ISR

**Input**
```ts
fetch(url)
```

**Output**
```ts
fetch(url, { next: { revalidate: 60 } })
```

**Why**
- Enables incremental static regeneration.
