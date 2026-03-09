# Examples — NestJS Error Handling (Refined)

## Example 1 — Map Constraint Error

**Input**
```ts
throw err
```

**Output**
```ts
if (isUniqueViolation(err)) throw new ConflictException();
```

**Why**
- Converts DB errors to HTTP semantics.

---

## Example 2 — Global Filter

**Input**
```ts
// no global filter
```

**Output**
```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

**Why**
- Consistent error responses.
