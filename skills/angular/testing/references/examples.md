# Examples — Angular Testing (Refined)

## Example 1 — TestBed

**Input**
```ts
new Service()
```

**Output**
```ts
TestBed.configureTestingModule({ providers:[Service] })
```

**Why**
- Uses DI container.

---

## Example 2 — Harness

**Input**
```ts
querySelector('.btn')
```

**Output**
```ts
MatButtonHarness.with({ text: 'Save' })
```

**Why**
- Robust UI tests.
