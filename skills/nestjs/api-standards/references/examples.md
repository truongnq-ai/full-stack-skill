# Examples — NestJS API Standards (Refined)

## Example 1 — Pagination Wrapper

**Input**
```ts
return items;
```

**Output**
```ts
return new PageDto(items, meta);
```

**Why**
- Standardized API response shape.

---

## Example 2 — Error Response

**Input**
```ts
throw new Error('Bad')
```

**Output**
```ts
throw new BadRequestException('Invalid input')
```

**Why**
- Correct HTTP semantics.
