# Examples — Security Standards

## Example 1 — Input Validation

**Input**
```ts
app.post('/users', async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});
```

**Output**
```ts
app.post('/users', async (req, res) => {
  const payload = userSchema.parse(req.body);
  const user = await createUser(payload);
  res.json(user);
});
```

**Why**
- Validates external input before use.
- Prevents injection and malformed data paths.

---

## Example 2 — Secrets in Logs

**Input**
```ts
logger.info('oauth token', token);
```

**Output**
```ts
logger.info('oauth token present', { hasToken: !!token });
```

**Why**
- Avoids secret leakage in logs.
- Still provides operational visibility.
