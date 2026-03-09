# Examples — Next.js Authentication (Refined)

## Example 1 — Middleware Guard

**Input**
```ts
// auth in component
```

**Output**
```ts
// auth in middleware.ts
```

**Why**
- Centralized route protection.

---

## Example 2 — Session DTO

**Input**
```ts
return session
```

**Output**
```ts
return toSessionDto(session)
```

**Why**
- Avoids leaking sensitive fields.
