# Examples — NestJS Deployment (Refined)

## Example 1 — Health Checks

**Input**
```ts
// no health endpoint
```

**Output**
```ts
/health and /ready endpoints
```

**Why**
- Required for orchestration.

---

## Example 2 — Env Validation

**Input**
```ts
process.env.DATABASE_URL
```

**Output**
```ts
ConfigModule.forRoot({ validationSchema })
```

**Why**
- Prevents invalid config at boot.
