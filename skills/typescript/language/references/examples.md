# Examples — TypeScript Language (Refined)

## Example 1 — Narrowing

**Input**
```ts
function f(x: string | number) { return x.toFixed(2); }
```

**Output**
```ts
function f(x: string | number) { return typeof x === 'number' ? x.toFixed(2) : x; }
```

**Why**
- Correct type handling.

---

## Example 2 — const assertions

**Input**
```ts
const roles = ['admin','user'];
```

**Output**
```ts
const roles = ['admin','user'] as const;
```

**Why**
- Preserves literal types.
