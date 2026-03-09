# Examples — NestJS Caching (Refined)

## Example 1 — Cache Interceptor

**Input**
```ts
@Get('profile')
getProfile() { return this.service.getProfile(); }
```

**Output**
```ts
@UseInterceptors(CacheInterceptor)
@Get('profile')
getProfile() { return this.service.getProfile(); }
```

**Why**
- Enables response caching consistently.

---

## Example 2 — TTL per Route

**Input**
```ts
// default TTL
```

**Output**
```ts
@CacheTTL(60)
```

**Why**
- Controls freshness explicitly.
