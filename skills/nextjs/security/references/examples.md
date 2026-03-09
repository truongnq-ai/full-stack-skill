# Examples — Next.js Security

## Example 1 — Action Input Validation

**Input**
```ts
export async function createUser(data: any) {
  return db.user.create({ data });
}
```

**Output**
```ts
export async function createUser(data: unknown) {
  const payload = createUserSchema.parse(data);
  return db.user.create({ data: payload });
}
```

**Why**
- Prevents unsafe input reaching database.

---

## Example 2 — No Auth on Protected Route

**Input**
```ts
export async function GET() {
  return NextResponse.json(await getAdminStats());
}
```

**Output**
```ts
export async function GET(req: NextRequest) {
  await requireAdmin(req);
  return NextResponse.json(await getAdminStats());
}
```

**Why**
- Enforces auth for privileged data.
