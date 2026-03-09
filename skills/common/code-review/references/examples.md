# Examples — Code Review

## Example 1 — Missing Null Guard

**Input**
```ts
const name = user.profile.name.toUpperCase();
```

**Output**
```
[MAJOR] [src/user.ts] Potential null deref on user.profile
Why: profile can be null for new users; will crash request.
Fix: Guard before access or use optional chaining + fallback.
```

**Why**
- Highlights correctness risk and gives minimal fix guidance.

---

## Example 2 — SQL Injection Risk

**Input**
```ts
const rows = await db.query(`SELECT * FROM users WHERE id = ${id}`);
```

**Output**
```
[BLOCKER] [src/userRepo.ts] Raw SQL string concatenation
Why: id is user-controlled; risk of injection.
Fix: Use parameterized query (e.g., WHERE id = $1).
```

**Why**
- Surfaces security risk with precise fix.
