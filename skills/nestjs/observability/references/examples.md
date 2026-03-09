# Examples — NestJS Observability (Refined)

## Example 1 — Request ID

**Input**
```ts
// logs without correlation
```

**Output**
```ts
app.use((req,res,next)=>{ req.id = uuid(); next(); });
```

**Why**
- Enables trace across services.

---

## Example 2 — Structured Logs

**Input**
```ts
logger.log('error', err)
```

**Output**
```ts
logger.error('db_error', { requestId, err })
```

**Why**
- Machine-parsable logs.
