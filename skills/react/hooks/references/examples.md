# Examples — React Hooks

## Example 1 — Missing Dependencies

**Input**
```ts
useEffect(() => {
  fetchData(userId);
}, []);
```

**Output**
```ts
useEffect(() => {
  fetchData(userId);
}, [userId]);
```

**Why**
- Avoids stale values and hidden bugs.

---

## Example 2 — Memoize Handler

**Input**
```ts
const onClick = () => doHeavyThing(items);
```

**Output**
```ts
const onClick = useCallback(() => doHeavyThing(items), [items]);
```

**Why**
- Prevents child re-renders when passing callbacks.
