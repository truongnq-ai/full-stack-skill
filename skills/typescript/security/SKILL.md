---
name: TypeScript Security
description: Secure coding practices for building safe TypeScript applications.
metadata:
  labels: [security, typescript, validation, sanitization]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.ts', '**/*.tsx']
    keywords:
      [validate, sanitize, xss, injection, auth, password, secret, token]
workflow_ref: deep-security-audit
---

# TypeScript Security

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

Security standards for TypeScript applications based on OWASP guidelines.

## Implementation Guidelines

- **Validation**: Validate all inputs with `zod`/`joi`/`class-validator`.
- **Sanitization**: Use `DOMPurify` for HTML. Prevent XSS.
- **Secrets**: Use env vars. Never hardcode.
- **SQL Injection**: Use parameterized queries or ORMs (Prisma/TypeORM).
- **Auth**: Use `bcrypt` for hashing. Implement strict RBAC.
- **HTTPS**: Enforce HTTPS. Set `secure`, `httpOnly`, `sameSite` cookies.
- **Rate Limit**: Prevent brute-force/DDoS.
- **Deps**: Audit with `npm audit`.

## Anti-Patterns

- **No `eval()`**: Avoid dynamic execution.
- **No Plaintext**: Never commit secrets.
- **No Trust**: Validate everything server-side.

## Code

```typescript
// Validation (Zod)
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Secure Cookie
const cookieOpts = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'prod',
  sameSite: 'strict' as const,
};
```

## Reference & Examples

For authentication patterns and security headers:
See [references/REFERENCE.md](references/REFERENCE.md).

## Related Topics

common/security-standards | best-practices | language


## References

- [Examples (Input/Output)](references/examples.md)
