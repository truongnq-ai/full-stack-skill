---
name: Next.js Authentication
description: Secure token storage (HttpOnly Cookies) and Middleware patterns.
metadata:
  labels:
    - nextjs
    - auth
    - security
    - cookies
    - authentication
  triggers:
    priority: medium
    confidence: 0.7
    files:
      - middleware.ts
      - '**/auth.ts'
      - '**/login/page.tsx'
    keywords:
      - cookie
      - jwt
      - session
      - localstorage
      - auth
workflow_ref: deep-security-audit
---

# Authentication & Token Management

## **Priority: P0 (CRITICAL)**

## Output Template

## Output (Strict)

```yaml
summary: "<what was done>"
risks: ["<risk 1>"] # or []
next_checks: ["<check 1>"]
```

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

Use **HttpOnly Cookies** for token storage. **Never** use LocalStorage.

## Key Rules

1. **Storage**: Use `cookies().set()` with `httpOnly: true`, `secure: true`, `sameSite: 'lax'`. (Reference: [Setting Tokens](references/auth-implementation.md))
2. **Access**: Read tokens in Server Components via `cookies().get()`. (Reference: [Reading Tokens](references/auth-implementation.md))
3. **Protection**: Guard routes in `middleware.ts` before rendering. (Reference: [Middleware Protection](references/auth-implementation.md))

## Anti-Pattern: LocalStorage

- **Security Risk**: Vulnerable to XSS.
- **Performance Hit**: Incompatible with Server Components (RSC). Forces client hydration and causes layout shift.

## Related Topics

common/security-standards | server-components | app-router


## References

- [Examples (Input/Output)](references/examples.md)
