# Examples — Angular HTTP Client (Refined)

## Example 1 — Interceptor

**Input**
```ts
http.get(url)
```

**Output**
```ts
providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
```

**Why**
- Centralized auth headers.

---

## Example 2 — Typed Response

**Input**
```ts
http.get('/users')
```

**Output**
```ts
http.get<User[]>('/users')
```

**Why**
- Type-safe API calls.
