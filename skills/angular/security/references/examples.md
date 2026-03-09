# Examples — Angular Security (Refined)

## Example 1 — Sanitization

**Input**
```ts
<div [innerHTML]="html"></div>
```

**Output**
```ts
<div [innerHTML]="sanitizer.bypassSecurityTrustHtml(html)"></div>
```

**Why**
- Prevents XSS.

---

## Example 2 — HttpOnly Tokens

**Input**
```ts
localStorage.setItem('token', token)
```

**Output**
```ts
// store in httpOnly cookie via backend
```

**Why**
- Reduces token theft.
