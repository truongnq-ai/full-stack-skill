# Examples — NestJS Architecture

## Example 1 — Thin Controller

**Input**
```ts
@Get(':id')
find(@Param('id') id: string) {
  // business logic here
}
```

**Output**
```ts
@Get(':id')
find(@Param('id') id: string) {
  return this.usersService.findById(id);
}
```

**Why**
- Keeps controller thin; logic in service.

---

## Example 2 — Config Access

**Input**
```ts
const dbUrl = process.env.DATABASE_URL;
```

**Output**
```ts
const dbUrl = this.configService.get('DATABASE_URL');
```

**Why**
- Centralized config + validation.
