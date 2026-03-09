# Examples — Angular State Management (Refined)

## Example 1 — Signals

**Input**
```ts
let count = 0
```

**Output**
```ts
const count = signal(0)
```

**Why**
- Reactive state updates.

---

## Example 2 — Store

**Input**
```ts
// multiple services manage state
```

**Output**
```ts
// centralized store (NgRx/Signals store)
```

**Why**
- Single source of truth.
