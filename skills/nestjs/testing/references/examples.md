# Examples — NestJS Testing (Refined)

## Example 1 — TestingModule

**Input**
```ts
const service = new UsersService();
```

**Output**
```ts
const module = await Test.createTestingModule({ providers:[UsersService] }).compile();
```

**Why**
- Uses DI container for consistency.

---

## Example 2 — e2e Test

**Input**
```ts
// manual curl checks
```

**Output**
```ts
await request(app.getHttpServer()).get('/users').expect(200)
```

**Why**
- Automated integration coverage.
