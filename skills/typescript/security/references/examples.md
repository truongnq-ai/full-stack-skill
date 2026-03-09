# Examples — TypeScript Security (Refined)

## Example 1 — Input Validation

**Input**
```ts
function createUser(body: any) { return db.user.create(body); }
```

**Output**
```ts
const payload = schema.parse(body); return db.user.create(payload);
```

**Why**
- Validates untrusted input.

---

## Example 2 — Avoid any

**Input**
```ts
function handler(data: any) {}
```

**Output**
```ts
function handler(data: unknown) { /* narrow */ }
```

**Why**
- Forces safe type narrowing.
