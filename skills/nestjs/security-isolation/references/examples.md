# Examples — NestJS Security Isolation (Refined)

## Example 1 — Admin Module Guard

**Input**
```ts
@Controller('admin')
export class AdminController {}
```

**Output**
```ts
@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {}
```

**Why**
- Isolates privileged routes.

---

## Example 2 — Separate Secrets

**Input**
```ts
// shared secret for all services
```

**Output**
```ts
// per-service secrets with rotation
```

**Why**
- Reduces blast radius.
