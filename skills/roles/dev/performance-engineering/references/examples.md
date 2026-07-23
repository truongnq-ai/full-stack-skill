# Examples — Performance Engineering

## Example 1 — Fixing N+1 Query (Node.js / Prisma)

**Bad** (N+1 — 51 queries for 50 users):
```typescript
const users = await prisma.user.findMany({ take: 50 });
for (const user of users) {
  user.avatar = await prisma.avatar.findUnique({ where: { userId: user.id } });
}
```

**Good** (Eager loading — 1 query):
```typescript
const users = await prisma.user.findMany({
  take: 50,
  include: { avatar: true }
});
```

**Why**: Eager loading resolves 51 DB round-trips into 1 JOIN query.

---

## Example 2 — EXPLAIN ANALYZE Workflow

**Scenario**: `GET /api/orders?status=active` takes 3 seconds.

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'active' AND user_id = 123;
```

**Output (Before)**:
```
Seq Scan on orders  (cost=0.00..48230.00 rows=50 width=256) (actual time=0.015..2847.123 rows=50 loops=1)
  Filter: ((status = 'active') AND (user_id = 123))
  Rows Removed by Filter: 1999950
Planning Time: 0.123 ms
Execution Time: 2847.456 ms
```

**Fix**: Add composite index:
```sql
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

**Output (After)**:
```
Index Scan using idx_orders_user_status on orders (cost=0.43..8.45 rows=50 width=256) (actual time=0.023..0.156 rows=50 loops=1)
Planning Time: 0.089 ms
Execution Time: 0.234 ms
```

**Result**: 2847ms → 0.2ms (14,000x improvement).

---

## Example 3 — Promise.all for Independent Operations

**Bad** (Sequential — 3 seconds total):
```typescript
const user = await getUser(id);           // 1s
const orders = await getOrders(id);       // 1s
const recommendations = await getRecs(id); // 1s
```

**Good** (Parallel — 1 second total):
```typescript
const [user, orders, recommendations] = await Promise.all([
  getUser(id),
  getOrders(id),
  getRecs(id)
]);
```

**Why**: Independent I/O operations should execute concurrently. Sequential awaits waste time.

---

## Example 4 — O(N²) to O(N) with Hash Map

**Bad** (O(N²) — 100M operations for 10K × 10K):
```typescript
const matches = arrayA.filter(a => arrayB.some(b => b.id === a.id));
```

**Good** (O(N) — 20K operations):
```typescript
const setB = new Set(arrayB.map(b => b.id));
const matches = arrayA.filter(a => setB.has(a.id));
```

**Why**: Converting one array to a Set/Map provides O(1) lookup, reducing total complexity from O(N²) to O(N).
