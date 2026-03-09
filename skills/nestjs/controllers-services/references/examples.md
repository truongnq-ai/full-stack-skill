# Examples — Controllers & Services

## Example 1 — Custom Decorator

**Input**
```ts
@Get('me')
me(@Request() req) { return req.user; }
```

**Output**
```ts
@Get('me')
me(@CurrentUser() user: User) { return user; }
```

**Why**
- Strong typing and clearer intent.

---

## Example 2 — Validation Pipe

**Input**
```ts
@Post()
create(@Body() dto: CreateUserDto) { ... }
```

**Output**
```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
```

**Why**
- Blocks unknown fields and enforces DTO contract.
