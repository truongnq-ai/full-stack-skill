# Examples — PostgreSQL (Refined)

## Example 1 — N+1 Fix

**Input**
```ts
for (const u of users) repo.find({ userId: u.id })
```

**Output**
```ts
repo.find({ where: { userId: In(userIds) } })
```

**Why**
- Reduces queries.

---

## Example 2 — Expand/Contract Migration

**Input**
```sql
ALTER TABLE users DROP COLUMN legacy;
```

**Output**
```sql
ADD COLUMN legacy_new; backfill; drop later;
```

**Why**
- Avoids downtime.
