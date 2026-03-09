# Examples — NestJS Documentation (Refined)

## Example 1 — Swagger Decorators

**Input**
```ts
// no @ApiProperty
```

**Output**
```ts
@ApiProperty() name: string;
```

**Why**
- Proper schema generation.

---

## Example 2 — Versioning

**Input**
```ts
@Controller('users')
```

**Output**
```ts
@Controller({ path:'users', version:'1' })
```

**Why**
- Enables API evolution.
