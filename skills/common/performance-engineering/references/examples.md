# Examples — Performance Engineering

## Example 1 — N+1 Queries

**Input**
```ts
for (const order of orders) {
  const items = await db.items.findMany({ where: { orderId: order.id } });
  // ...
}
```

**Output**
```ts
const itemsByOrder = await db.items.findMany({ where: { orderId: { in: ids } } });
const grouped = groupBy(itemsByOrder, 'orderId');
```

**Why**
- Reduces N queries to 1.
- Improves latency and DB load.

---

## Example 2 — Memoization of Heavy Calc

**Input**
```ts
const total = expensiveCalc(data);
```

**Output**
```ts
const total = useMemo(() => expensiveCalc(data), [data]);
```

**Why**
- Avoids recomputation on re-render.
