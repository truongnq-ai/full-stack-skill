# Examples — Angular SSR (Refined)

## Example 1 — TransferState

**Input**
```ts
// double fetch
```

**Output**
```ts
TransferState to reuse SSR data
```

**Why**
- Prevents duplicate requests.

---

## Example 2 — Browser Only Code

**Input**
```ts
window.localStorage
```

**Output**
```ts
isPlatformBrowser() guard
```

**Why**
- SSR safe execution.
