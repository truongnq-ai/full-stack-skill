# Examples — Angular Architecture

## Example 1 — Feature Module

**Input**
```ts
// all components in AppModule
```

**Output**
```ts
// user.module.ts with UserComponent, UserService
```

**Why**
- Keeps features isolated and scalable.

---

## Example 2 — Shared Module

**Input**
```ts
// duplicate pipes in multiple modules
```

**Output**
```ts
// shared.module.ts exporting common pipes
```

**Why**
- Avoids duplication.
