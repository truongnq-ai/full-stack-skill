# Examples — React Native Testing (Refined)

## Example 1 — RTL Query

**Input**
```ts
getByTestId('login')
```

**Output**
```ts
getByRole('button', { name: /login/i })
```

**Why**
- User-centric tests.

---

## Example 2 — Detox

**Input**
```ts
// manual QA
```

**Output**
```ts
await element(by.id('login')).tap();
```

**Why**
- Automated e2e.
