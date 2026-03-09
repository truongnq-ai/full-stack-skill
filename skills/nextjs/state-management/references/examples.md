# Examples — Next.js State Management (Refined)

## Example 1 — URL State

**Input**
```tsx
const [page, setPage] = useState(1)
```

**Output**
```tsx
const page = Number(searchParams.get('page') ?? 1)
```

**Why**
- Shareable state.

---

## Example 2 — Local State

**Input**
```tsx
// global store for form
```

**Output**
```tsx
const [form, setForm] = useState(...)
```

**Why**
- Avoids global complexity.
