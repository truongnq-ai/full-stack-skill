# Examples — Next.js Data Access Layer (Refined)

## Example 1 — DAL Function

**Input**
```ts
// fetch directly in route
```

**Output**
```ts
// use dal/user.ts getUserById()
```

**Why**
- Centralizes data logic.

---

## Example 2 — DTO Mapping

**Input**
```ts
return db.user.findMany()
```

**Output**
```ts
return users.map(toUserDto)
```

**Why**
- Avoids leaking DB schema.
