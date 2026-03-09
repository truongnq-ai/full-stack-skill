# Examples — Next.js Testing (Refined)

## Example 1 — Unit Test

**Input**
```ts
// no render test
```

**Output**
```ts
render(<Button />); expect(screen.getByRole('button')).toBeInTheDocument();
```

**Why**
- Validates component behavior.

---

## Example 2 — E2E

**Input**
```ts
// manual checks
```

**Output**
```ts
await page.goto('/login'); await page.click('text=Sign in');
```

**Why**
- Automated flow coverage.
