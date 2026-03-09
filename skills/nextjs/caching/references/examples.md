# Examples — Next.js Caching (Refined)

## Example 1 — Cache Tag

**Input**
```ts
fetch(url)
```

**Output**
```ts
fetch(url, { next: { tags: ['users'] } })
```

**Why**
- Enables targeted revalidation.

---

## Example 2 — Revalidate Tag

**Input**
```ts
// no cache bust
```

**Output**
```ts
revalidateTag('users')
```

**Why**
- Refreshes cached data after mutation.
