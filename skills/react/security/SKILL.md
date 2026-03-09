---
name: React Security
description: Security practices for React (XSS, Auth, Dependencies).
metadata:
  labels: [react, security, xss, auth]
  triggers:
    priority: medium
    confidence: 0.7
    files: ['**/*.tsx', '**/*.jsx']
    keywords: [dangerouslySetInnerHTML, token, auth, xss]
workflow_ref: deep-security-audit
---

# React Security

## **Priority: P0 (CRITICAL)**

## Output Template

- **Summary**: <what changed / what was done>
- **Risks**: <known risks or "none">
- **Next Checks**: <tests/verification steps>

Preventing vulnerabilities in client-side apps.

## Implementation Guidelines

- **XSS**: Avoid `dangerouslySetInnerHTML`. Sanitize via `DOMPurify` if needed.
- **URLs**: Validate `javascript:` protocols in user links.
- **Auth**: Store tokens in `HttpOnly` cookies. Avoid `localStorage`.
- **Deps**: Run `npm audit`. Pin versions.
- **Secrets**: Server-side only. No `.env` secrets in build.
- **CSP**: Strict Content-Security-Policy headers.

## Anti-Patterns

- **No `eval()`**: RCE risk.
- **No Serialized State**: Don't inject JSON into DOM without escaping.
- **No Client Logic for Permissions**: Backend must validate.

## Code

```tsx
import DOMPurify from 'dompurify';

// Safe HTML Injection
function SafeHtml({ content }) {
  const clean = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}

// Bad Link Prevention
const safeUrl = url.startsWith('javascript:') ? '#' : url;
<a href={safeUrl}>Link</a>;
```

## References

- [Examples (Input/Output)](references/examples.md)

## Related Topics

common/security-standards | typescript/security | component-patterns
