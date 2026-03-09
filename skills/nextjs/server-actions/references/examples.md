# Examples — Next.js Server Actions (Refined)

## Example 1 — Validation

**Input**
```ts
export async function createUser(fd: FormData) { /* raw */ }
```

**Output**
```ts
const data = schema.parse(Object.fromEntries(fd));
```

**Why**
- Validates input.

---

## Example 2 — useActionState

**Input**
```tsx
// manual state
```

**Output**
```tsx
const [state, action] = useActionState(createUser, initial)
```

**Why**
- Standard action state.
