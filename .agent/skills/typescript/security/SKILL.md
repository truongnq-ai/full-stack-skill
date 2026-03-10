---
name: TypeScript Security
description: Secure coding practices for TypeScript applications based on OWASP guidelines. Activates on TS/TSX files when working with auth, validation, external input, or secrets.
metadata:
  labels: [security, typescript, validation, sanitization, owasp]
  triggers:
    files: ['**/*.ts', '**/*.tsx', '**/auth/**', '**/middleware/**', '**/api/**']
    keywords: [validate, sanitize, xss, injection, auth, password, secret, token, jwt, oauth, rbac, bcrypt, zod, class-validator]
    negative: ["user asks for general security (not TS-specific) — use security-standards skill", "user asks for TS type syntax — use typescript/language"]
---

# TypeScript Security

## **Priority: P0 (CRITICAL)**

**This skill does NOT**: replace general security standards — use `security-standards` for broad security architecture. Does not cover infrastructure/deployment security — use `deploy` workflow.

**Compatible skills**: `security-standards` (general protocols), `typescript/best-practices` (clean code layer), `code-review` (security review gate), `feedback-reporter` (violation reporting).

## Implementation Guidelines

- **Validation**: Validate all inputs with `zod` / `joi` / `class-validator`. Never trust raw request body.
- **Sanitization**: `DOMPurify` for any HTML rendering. Prevent XSS at output layer.
- **Secrets**: Env vars only. Never hardcode keys, tokens, or passwords in source.
- **SQL Injection**: Parameterized queries or ORM (Prisma/TypeORM). Never string concatenation in queries.
- **Auth**: `bcrypt` (cost ≥12) for passwords. RBAC enforced server-side, not client-side.
- **HTTPS**: `secure: true`, `httpOnly: true`, `sameSite: 'strict'` on all auth cookies.
- **Rate Limiting**: Protect all auth endpoints from brute-force. Use sliding window algorithm.
- **Dependencies**: Run `npm audit` in CI. Block deploy on critical/high vulnerabilities.

> **Fallback**: If `zod` unavailable, use manual validation with explicit type narrowing and throw typed errors.

## Code Reference

```typescript
// Input Validation (Zod)
const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Secure Cookie
res.cookie('session', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3600000,
});
```

> For auth patterns and security headers: `view_file .agent/skills/typescript/security/references/REFERENCE.md`

## 🚫 Anti-Patterns

**`No eval()`**: Never execute dynamic strings. Enables code injection attacks.

**`No Plaintext Secrets`**: All credentials via env vars. Rotate if ever exposed.

**`No Client-Side Auth`**: Never enforce RBAC only in frontend. Always validate server-side.

**`No Broad any in APIs`**: Type all request/response bodies. `any` disables injection detection.

**`No Unvalidated Input`**: Never pass raw `req.body` directly to DB query or render.

## ✅ Verification Checklist

- [ ] All request inputs validated before processing (zod/joi schema applied)
- [ ] No string concatenation in DB queries
- [ ] Auth cookies have `httpOnly`, `secure`, `sameSite` set
- [ ] `npm audit` passes with no high/critical vulnerabilities
- [ ] RBAC enforced server-side (not just frontend route guards)

## 📚 References

- [Authentication Patterns & Security Headers](references/REFERENCE.md)
- [General Security Standards](../../../common/security-standards/SKILL.md)
