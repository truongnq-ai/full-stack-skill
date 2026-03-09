# Examples — Angular RxJS Interop (Refined)

## Example 1 — takeUntilDestroyed

**Input**
```ts
subscription = obs.subscribe(...)
```

**Output**
```ts
obs.pipe(takeUntilDestroyed()).subscribe(...)
```

**Why**
- Prevents memory leaks.

---

## Example 2 — toSignal

**Input**
```ts
// manual subscription
```

**Output**
```ts
const data = toSignal(obs)
```

**Why**
- Integrates RxJS with Signals.
