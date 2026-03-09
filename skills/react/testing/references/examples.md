# Examples — React Testing (Refined)

## Example 1 — RTL Query

**Input**
```tsx
getByTestId('btn')
```

**Output**
```tsx
getByRole('button', { name: /save/i })
```

**Why**
- More user-centric tests.

---

## Example 2 — Mock API

**Input**
```tsx
// hit real API
```

**Output**
```tsx
msw.use(rest.get('/api', ...))
```

**Why**
- Deterministic tests.
