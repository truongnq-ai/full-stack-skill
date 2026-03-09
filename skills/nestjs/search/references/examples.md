# Examples — NestJS Search (Refined)

## Example 1 — Full-text Search

**Input**
```ts
repo.find({ name: Like(`%${q}%`) })
```

**Output**
```ts
// use search engine (Elastic/Meilisearch)
```

**Why**
- Scales better than DB LIKE.

---

## Example 2 — Pagination

**Input**
```ts
return results;
```

**Output**
```ts
return new PageDto(results, meta);
```

**Why**
- Standard response shape.
