# Examples — Security Basics

## Example 1 — SQL Injection Prevention

**Bad** (Concatenation):
```typescript
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;
// Input: ' OR '1'='1' -- → Returns ALL users
```

**Good** (Parameterized):
```typescript
const user = await prisma.user.findUnique({ where: { email: req.body.email } });
// ORM safely parameterizes — input is always treated as a string literal
```

---

## Example 2 — IDOR Prevention

**Bad** (No ownership check):
```typescript
app.get('/invoices/:id', async (req, res) => {
  const invoice = await db.invoice.findById(req.params.id);
  // Any authenticated user can access ANY invoice by changing the URL ID
  res.json(invoice);
});
```

**Good** (Ownership enforced):
```typescript
app.get('/invoices/:id', async (req, res) => {
  const invoice = await db.invoice.findFirst({
    where: { id: req.params.id, userId: req.user.id } // Scoped to current user
  });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  res.json(invoice);
});
```

---

## Example 3 — Secure Session Configuration

**Bad** (localStorage):
```typescript
localStorage.setItem('token', jwt); // XSS can steal this via document.cookie
```

**Good** (HttpOnly cookie):
```typescript
res.cookie('session', jwt, {
  httpOnly: true,   // JavaScript cannot read this cookie
  secure: true,     // Only sent over HTTPS
  sameSite: 'strict', // Prevents CSRF
  maxAge: 3600000   // 1 hour
});
```

**Why**: HttpOnly cookies are invisible to JavaScript, eliminating the XSS token theft vector entirely.
