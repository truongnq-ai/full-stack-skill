# Examples — NestJS Performance (Refined)

## Example 1 — DTO Projection

**Input**
```ts
return repo.find();
```

**Output**
```ts
return repo.find({ select: ['id','name'] });
```

**Why**
- Reduces payload size.

---

## Example 2 — Compression

**Input**
```ts
// no compression
```

**Output**
```ts
app.use(compression());
```

**Why**
- Improves response latency.
