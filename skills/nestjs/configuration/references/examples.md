# Examples — NestJS Configuration (Refined)

## Example 1 — Validate Env

**Input**
```ts
process.env.PORT
```

**Output**
```ts
ConfigModule.forRoot({ validationSchema })
```

**Why**
- Fails fast on invalid config.

---

## Example 2 — Namespaced Config

**Input**
```ts
config.get('db')
```

**Output**
```ts
registerAs('db', () => ({ host, port }))
```

**Why**
- Organizes config by domain.
