# Examples — NestJS Security (Refined)

## Example 1 — DTO Validation

**Input**
```ts
@Post()
create(@Body() body: any) { return this.users.create(body); }
```

**Output**
```ts
@Post()
create(@Body() dto: CreateUserDto) { return this.users.create(dto); }
```

**Why**
- Enforces validation pipeline and typing.

---

## Example 2 — Global Guard

**Input**
```ts
// no auth guard
```

**Output**
```ts
app.useGlobalGuards(new JwtAuthGuard());
```

**Why**
- Centralized protection for all routes.
