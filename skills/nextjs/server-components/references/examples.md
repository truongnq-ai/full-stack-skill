# Examples — Next.js Server Components (Refined)

## Example 1 — Client Boundary

**Input**
```tsx
'use client'
// entire page
```

**Output**
```tsx
// server page + client widget
```

**Why**
- Keeps server benefits.

---

## Example 2 — Fetch on Server

**Input**
```tsx
useEffect(() => fetch(...))
```

**Output**
```tsx
const data = await fetch(...)
```

**Why**
- Faster and cache-aware.
